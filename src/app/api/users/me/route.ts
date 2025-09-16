import {
  Api,
  ApiError,
  ApiErrorCode,
  UserUpdateProfileSchema,
  requireUserId,
  userSelect,
  validateRequestBody,
  withErrorHandling,
} from "@/lib/api"
import { prisma } from "@/lib/prisma"
import type { NextRequest } from "next/server"

const userWithTimestampSelect = {
  ...userSelect,
  createdAt: true,
  updatedAt: true,
} as const

export const GET = withErrorHandling(async () => {
  const userId = await requireUserId()

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: userWithTimestampSelect,
  })

  if (!user) {
    throw new ApiError(404, ApiErrorCode.NOT_FOUND, "User not found")
  }

  return Api.success(user)
})

export const PATCH = withErrorHandling(async (request: NextRequest) => {
  const userId = await requireUserId()
  const body = await validateRequestBody(request, UserUpdateProfileSchema)

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: body,
    select: userSelect,
  })

  return Api.success(updatedUser)
})
