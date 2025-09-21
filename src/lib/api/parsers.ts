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

  paginate: (searchParams: URLSearchParams) => {
    // `take`: how many items to fetch (similar to SQL `LIMIT`)
    const take =
      queryParsers.integer(searchParams, "take") ?? queryParsers.integer(searchParams, "limit")

    // `skip`: how many items to skip before starting (similar to SQL `OFFSET`)
    const skip = queryParsers.integer(searchParams, "skip")

    // `cursor`: a pointer to cursor-based pagination (e.g., "start after this ID")
    const cursor = searchParams.get("cursor") ?? undefined

    return { take, skip, cursor }
  },
}
