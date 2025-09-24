import type { NextRequest } from "next/server"
import type { ZodType } from "zod"
import { z } from "zod"
import { ApiError, ApiErrorCode } from "./responses"
import { formatZodError } from "./zodUtils"

export const readJson = async <Schema>(
  request: NextRequest,
  schema: ZodType<Schema>,
): Promise<Schema> => {
  const rawText = await request.text()
  let parsedBody: unknown

  try {
    parsedBody = rawText ? JSON.parse(rawText) : {}
  } catch {
    throw new ApiError(400, ApiErrorCode.BAD_REQUEST, "Request body must be valid JSON", {
      reason: "INVALID_JSON",
    })
  }

  try {
    return schema.parse(parsedBody)
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ApiError(400, ApiErrorCode.VALIDATION_FAILED, formatZodError(error))
    }

    throw new ApiError(400, ApiErrorCode.BAD_REQUEST, "Invalid request body")
  }
}

export const queryParsers = {
  integer: (searchParams: URLSearchParams, key: string) => {
    const rawNumber = searchParams.get(key)
    if (!rawNumber) return undefined

    const parsedNumber = Number(rawNumber)
    return Number.isFinite(parsedNumber) && parsedNumber > 0 ? parsedNumber : undefined
  },

  positiveInteger: (searchParams: URLSearchParams, key: string) => {
    const number = queryParsers.integer(searchParams, key)
    return number && number > 0 ? number : undefined
  },

  boolean: (searchParams: URLSearchParams, key: string) => searchParams.get(key) === "true",

  // Validate an enum/string param using any Zod schema
  zodValue: <Schema extends ZodType>(
    searchParams: URLSearchParams,
    key: string,
    schema: Schema,
  ): z.infer<Schema> | undefined => {
    const rawValue = searchParams.get(key)
    if (rawValue == null) return undefined

    const result = schema.safeParse(rawValue)
    return result.success ? result.data : undefined
  },

  date: (searchParams: URLSearchParams, key: string): Date | undefined => {
    const rawValue = searchParams.get(key)
    if (!rawValue) return undefined

    const result = z.coerce.date().safeParse(rawValue)
    return result.success ? result.data : undefined
  },

  zod: <Schema extends ZodType>(
    searchParams: URLSearchParams,
    key: string,
    schema: Schema,
  ): z.infer<Schema> | undefined => {
    const rawValue = searchParams.get(key)
    if (rawValue == null) return undefined

    const parsedResult = schema.safeParse(rawValue)
    return parsedResult.success ? parsedResult.data : undefined
  },
}

interface PaginationOptions {
  defaultTake?: number
  maxTake?: number
}

const DEFAULT_TAKE = 20
const DEFAULT_SKIP = 0
const DEFAULT_MAX_TAKE = 100

const parsePositiveInt = (value: string | null | undefined) => {
  if (value == null) {
    return undefined
  }

  const parsed = Number.parseInt(value, 10)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined
}

const parseNonNegativeInt = (value: string | null | undefined) => {
  if (value == null) {
    return undefined
  }

  const parsed = Number.parseInt(value, 10)
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : undefined
}

export const parsePaginationParams = (
  searchParams: URLSearchParams,
  options: PaginationOptions = {},
) => {
  const { defaultTake = DEFAULT_TAKE, maxTake = DEFAULT_MAX_TAKE } = options

  const takeParam = searchParams.get("take") ?? searchParams.get("limit")
  const skipParam = searchParams.get("skip")
  const cursorParam = searchParams.get("cursor") ?? undefined

  // `take`: how many items to fetch (similar to SQL `LIMIT`)
  const take = Math.min(parsePositiveInt(takeParam) ?? defaultTake, maxTake)

  // `skip`: how many items to skip before starting (similar to SQL `OFFSET`)
  const skip = parseNonNegativeInt(skipParam) ?? DEFAULT_SKIP

  // `cursor`: a pointer to cursor-based pagination (e.g., "start after this ID")
  const cursor = cursorParam && z.uuid().safeParse(cursorParam).success ? cursorParam : undefined

  return { take, skip, cursor }
}

interface PaginationLike {
  take?: number | null
  skip?: number | null
  cursor?: string | null
}

export interface NormalizedPaginationParams {
  take: number
  skip: number
  cursor?: string
  prisma: {
    take: number
    skip: number
    cursor?: { id: string }
  }
}

export const normalizePaginationParams = <Input extends PaginationLike>(
  pagination: Input,
  options: PaginationOptions = {},
): Input & NormalizedPaginationParams => {
  const searchParams = new URLSearchParams()

  if (pagination.take != null) {
    searchParams.set("take", pagination.take.toString())
  }

  if (pagination.skip != null) {
    searchParams.set("skip", pagination.skip.toString())
  }

  if (pagination.cursor) {
    searchParams.set("cursor", pagination.cursor)
  }

  const parsed = parsePaginationParams(searchParams, options)
  const prismaSkip = parsed.skip + (parsed.cursor ? 1 : 0)

  return {
    ...pagination,
    take: parsed.take,
    skip: parsed.skip,
    cursor: parsed.cursor,
    prisma: {
      take: parsed.take,
      skip: prismaSkip,
      ...(parsed.cursor ? { cursor: { id: parsed.cursor } } : {}),
    },
  }
}
