import { NextResponse } from "next/server"

export interface ApiSuccess<DataType> {
  ok: true
  data: DataType
}

export interface ApiFailure {
  ok: false
  error: {
    code: string
    message: string
    details?: unknown
  }
}

export class HttpError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
    public details?: unknown,
  ) {
    super(message)
    this.name = "HttpError"
  }
}

export const Api = {
  success<DataType>(data: DataType, statusCode = 200) {
    return NextResponse.json<ApiSuccess<DataType>>({ ok: true, data }, { status: statusCode })
  },

  failure(code: string, message: string, statusCode = 400, details?: unknown) {
    return NextResponse.json<ApiFailure>(
      { ok: false, error: { code, message, details } },
      { status: statusCode },
    )
  },

  unauthorized(message = "Unauthorized") {
    return Api.failure("UNAUTHORIZED", message, 401)
  },

  notFound(message = "Not found") {
    return Api.failure("NOT_FOUND", message, 404)
  },

  conflict(message = "Conflict") {
    return Api.failure("CONFLICT", message, 409)
  },

  badRequest(message = "Bad request", details?: unknown) {
    return Api.failure("BAD_REQUEST", message, 400, details)
  },
}
