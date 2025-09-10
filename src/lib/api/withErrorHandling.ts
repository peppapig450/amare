import { Prisma } from "@/generated/prisma"
import { Api, ApiError, ApiErrorCode } from "./responses"

export const withErrorHandling = <HandlerArgs extends unknown[]>(
  requestHandler: (...handlerArgs: HandlerArgs) => Promise<Response>,
) => {
  return async (...handlerArgs: HandlerArgs) => {
    try {
      return await requestHandler(...handlerArgs)
    } catch (caughtError) {
      console.error(caughtError)

      // Handle custom ApiError
      if (caughtError instanceof ApiError) {
        return Api.failure(
          caughtError.code,
          caughtError.message,
          caughtError.status,
          caughtError.details,
        )
      }

      // Handle known Prisma error
      if (caughtError instanceof Prisma.PrismaClientKnownRequestError) {
        if (caughtError.code === "P2002") {
          return Api.conflict("Duplicate value", {
            target: caughtError.meta?.target,
          })
        }

        if (caughtError.code === "P2025") {
          return Api.notFound("Record not found")
        }

        // Handle invalid JSON body (TODO: zod probably already covers this)
        if (caughtError instanceof SyntaxError && String(caughtError.message).includes("JSON")) {
          return Api.badRequest("Invalid JSON body")
        }

        return Api.failure(ApiErrorCode.INTERNAL_SERVER_ERROR, "An unexpected error occurred", 500)
      }
    }
  }
}
