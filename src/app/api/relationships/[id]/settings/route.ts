import {
  Api,
  ApiError,
  ApiErrorCode,
  PathParamSchemas,
  RelationshipSettingsUpdateSchema,
  requireUserId,
  validatePathParams,
  validateRequestBody,
  withErrorHandling,
} from "@/lib/api"
import { prisma } from "@/lib/prisma"
import type { NextRequest } from "next/server"

interface RouteContext {
  params: Promise<Record<string, string>>
}

export const relationshipAccessValidation = async (
  params: { id: string },
  userId: string,
): Promise<void> => {
  const relationship = await prisma.relationship.findUnique({
    where: { id: params.id },
    select: { partner1Id: true, partner2Id: true },
  })

  if (!relationship) {
    throw new ApiError(404, ApiErrorCode.NOT_FOUND, "Relationship not found")
  }

  if (relationship.partner1Id !== userId && relationship.partner2Id !== userId) {
    throw new ApiError(403, ApiErrorCode.UNAUTHORIZED, "Access denied")
  }
}

export const GET = withErrorHandling(async (request: NextRequest, context: RouteContext) => {
  const userId = await requireUserId()
  const { id: relationshipId } = validatePathParams(await context.params, PathParamSchemas.id)

  await relationshipAccessValidation({ id: relationshipId }, userId)

  const settings = await prisma.relationshipSettings.findUnique({
    where: { relationshipId },
    select: {
      id: true,
      isPublic: true,
      allowMoodShare: true,
      timezone: true,
    },
  })

  if (!settings) {
    const defaultSettings = await prisma.relationshipSettings.create({
      data: { relationshipId },
      select: {
        id: true,
        isPublic: true,
        allowMoodShare: true,
        timezone: true,
      },
    })

    return Api.success(defaultSettings)
  }

  return Api.success(settings)
})

export const PATCH = withErrorHandling(async (request: NextRequest, context: RouteContext) => {
  const userId = await requireUserId()
  const { id: relationshipId } = validatePathParams(await context.params, PathParamSchemas.id)
  const validatedData = await validateRequestBody(request, RelationshipSettingsUpdateSchema)

  await relationshipAccessValidation({ id: relationshipId }, userId)

  const updatedSettings = await prisma.relationshipSettings.upsert({
    where: { relationshipId },
    create: {
      relationshipId,
      ...validatedData,
    },
    update: validatedData,
    select: {
      id: true,
      isPublic: true,
      allowMoodShare: true,
      timezone: true,
    },
  })

  return Api.success(updatedSettings)
})
