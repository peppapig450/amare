import type { NextRequest } from "next/server"
import type { ZodError, ZodType } from "zod"
import { z } from "zod"
import { ApiError, ApiErrorCode } from "./responses"

const handleValidationError = (error: unknown, context: string): never => {
  if (error instanceof z.ZodError) {
    throw new ApiError(400, ApiErrorCode.VALIDATION_FAILED, formatZodError(error))
  }
  throw new ApiError(400, ApiErrorCode.BAD_REQUEST, `Invalid ${context}`)
}

export const formatZodError = (error: ZodError): string => {
  const issues = error.issues.map((issue) => {
    const path = issue.path.join(".")
    const message = issue.message
    return path ? `${path}: ${message}` : message
  })

  return `Validation failed: ${issues.join(", ")}`
}

export const validateRequestBody = async <RequestBody>(
  request: NextRequest,
  schema: ZodType<RequestBody>,
): Promise<RequestBody> => {
  try {
    const rawText = await request.text()
    let parsedBody: unknown

    try {
      parsedBody = rawText ? JSON.parse(rawText) : {}
    } catch {
      throw new ApiError(400, ApiErrorCode.BAD_REQUEST, "Request body must be valid JSON", {
        reason: "INVALID_JSON",
      })
    }

    return schema.parse(parsedBody)
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    handleValidationError(error, "request body")
    return undefined as never
  }
}

export const validateQueryParams = <QueryParams>(
  searchParams: URLSearchParams,
  schema: ZodType<QueryParams>,
): QueryParams => {
  try {
    const queryObject = Object.fromEntries(searchParams.entries())
    return schema.parse(queryObject)
  } catch (error) {
    handleValidationError(error, "query params")
    return undefined as never
  }
}

export const validatePathParams = <PathParams>(
  params: Record<string, string | string[]>,
  schema: ZodType<PathParams>,
): PathParams => {
  try {
    return schema.parse(params)
  } catch (error) {
    handleValidationError(error, "path parameters")
    return undefined as never
  }
}

// Common validation schemas for path parameters
export const PathParamSchemas = {
  id: z.object({
    id: z.uuid("Invalid ID format"),
  }),

  relationshipsId: z.object({
    relationshipId: z.uuid("Invalid relationship ID format"),
  }),

  milestoneId: z.object({
    milestoneId: z.uuid("Invalid milestone ID format"),
  }),

  timelineEntryId: z.object({
    timelineEntryId: z.uuid("Invalid timeline entry ID format"),
  }),

  moodEntryId: z.object({
    moodEntryId: z.uuid("Invalid mood entry ID format"),
  }),
}

// Utility function to validate UUID strings
export const validateUuid = (value: string, fieldName = "ID"): string => {
  const result = z.uuid().safeParse(value)
  if (!result.success) {
    throw new ApiError(400, ApiErrorCode.VALIDATION_FAILED, `${fieldName} must be a valid UUID`)
  }
  return result.data
}

// Utility function to validate enum values
// NOTE: the second type of the Record may be need to be changed in the future
export const validateEnum = <EnumType extends Record<string, string | number>>(
  value: string,
  enumObject: EnumType,
  fieldName = "value",
): EnumType[keyof EnumType] => {
  const enumValues = Object.values(enumObject)
  if (!enumValues.includes(value)) {
    throw new ApiError(
      400,
      ApiErrorCode.VALIDATION_FAILED,
      `${fieldName} must be one of: ${enumValues.join(", ")}`,
    )
  }

  return value as EnumType[keyof EnumType]
}

// Utility function for date validation
export const validateDate = (value: string | Date, fieldName = "date"): Date => {
  const result = z.coerce.date().safeParse(value)
  if (!result.success) {
    throw new ApiError(400, ApiErrorCode.VALIDATION_FAILED, `${fieldName} must be a valid date`)
  }

  return result.data
}

// Utility function for pagination validation
export const validatePagination = (searchParams: URLSearchParams) => {
  const take = searchParams.get("take")
  const skip = searchParams.get("skip")
  const cursor = searchParams.get("cursor")

  return {
    take: take ? Math.min(parseInt(take, 10) || 20, 100) : 20,
    skip: skip ? Math.max(parseInt(skip, 10) || 0, 0) : 0,
    cursor: cursor && z.uuid().safeParse(cursor).success ? cursor : undefined,
  }
}

export type ValidationResult<DataType> =
  | {
      success: true
      data: DataType
    }
  | {
      success: false
      error: ApiError
    }

export const safeValidate = <SchemaType>(
  data: unknown,
  schema: ZodType<SchemaType>,
): ValidationResult<SchemaType> => {
  try {
    const result = schema.parse(data)
    return { success: true, data: result }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: new ApiError(400, ApiErrorCode.VALIDATION_FAILED, formatZodError(error)),
      }
    }
    return {
      success: false,
      error: new ApiError(400, ApiErrorCode.BAD_REQUEST, "Validation failed"),
    }
  }
}
