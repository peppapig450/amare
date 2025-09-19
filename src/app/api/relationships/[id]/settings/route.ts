import {
  Api,
  ensure,
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

export const GET = withErrorHandling(async (request: NextRequest, context: RouteContext) => {
  const userId = await requireUserId()
  const { id: relationshipId } = validatePathParams(await context.params, PathParamSchemas.id)

  await ensure.relationship(relationshipId, userId)

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

  await ensure.relationship(relationshipId, userId)

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
