import { NextResponse } from "next/server"
import type { infer as ZodInfer, ZodType } from "zod"
import { ZodError } from "zod"

export interface ApiSuccess<DataType> {
  ok: true
  data: DataType
}

export interface ApiFailure {
  ok: false
  error: {
    code: ApiErrorCode
    message: string
    details?: unknown
  }
  timestamp: string
}

export type ApiResponse<DataType> = ApiSuccess<DataType> | ApiFailure

export enum ApiErrorCode {
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  UNAUTHORIZED = "UNAUTHORIZED",
  NOT_FOUND = "NOT_FOUND",
  CONFLICT = "CONFLICT",
  BAD_REQUEST = "BAD_REQUEST",
  UNPROCESSABLE_ENTITY = "UNPROCESSABLE_ENTITY",
  VALIDATION_FAILED = "VALIDATION_FAILED",
}

export class ApiError extends Error {
  constructor(
    public status: number,
    public code: ApiErrorCode,
    message: string,
    public details?: unknown,
  ) {
    super(message)
    this.name = "ApiError"
  }
}

export const Api = {
  success<DataType>(data: DataType, statusCode = 200) {
    return NextResponse.json<ApiSuccess<DataType>>({ ok: true, data }, { status: statusCode })
  },

  failure(code: ApiErrorCode, message: string, statusCode = 400, details?: unknown) {
    return NextResponse.json<ApiFailure>(
      { ok: false, error: { code, message, details }, timestamp: new Date().toISOString() },
      { status: statusCode },
    )
  },

  fromError(error: unknown) {
    if (error instanceof ApiError) {
      return Api.failure(error.code, error.message, error.status, error.details)
    }
    if (error instanceof ZodError) {
      return Api.unprocessable(ApiErrorCode.VALIDATION_FAILED, error.issues)
    }
    return Api.failure(ApiErrorCode.INTERNAL_SERVER_ERROR, "Internal server error", 500)
  },

  created<DataType>(data: DataType) {
    return Api.success(data, 201)
  },

  noContent() {
    return new NextResponse(null, { status: 204 })
  },

  unauthorized(message = "Unauthorized") {
    return Api.failure(ApiErrorCode.UNAUTHORIZED, message, 401)
  },

  notFound(message = "Not found") {
    return Api.failure(ApiErrorCode.NOT_FOUND, message, 404)
  },

  conflict(message = "Conflict", details?: unknown) {
    return Api.failure(ApiErrorCode.CONFLICT, message, 409, details)
  },

  badRequest(message = "Bad request", details?: unknown) {
    return Api.failure(ApiErrorCode.BAD_REQUEST, message, 400, details)
  },

  unprocessable(message = "Unprocessable entity", details?: unknown) {
    return Api.failure(ApiErrorCode.UNPROCESSABLE_ENTITY, message, 422, details)
  },

  paginated<DataType>(
    items: DataType[],
    // TODO: draw this out into its own interface
    pagination: { total: number; take?: number; skip?: number; cursor?: string; hasMore: boolean },
  ) {
    return Api.success({ data: items, pagination })
  },

  successValidated<Schema extends ZodType>(data: unknown, schema: Schema, status = 200) {
    const parsedData = schema.parse(data) as ZodInfer<Schema>
    return Api.success(parsedData, status)
  },
}

type Thunk<Result> = () => Promise<Result>

export const wrap = async <Result>(thunk: Thunk<Result>, status = 200) => {
  try {
    const result = await thunk()
    if (result instanceof NextResponse) {
      return result
    }

    return Api.success(result as Result, status)
  } catch (error) {
    return Api.fromError(error)
  }
}
