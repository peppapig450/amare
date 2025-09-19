import {
  Api,
  ensure,
  PathParamSchemas,
  requireUserId,
  TimelineEntryUpdateSchema,
  validatePathParams,
  validateRequestBody,
  where,
  withErrorHandling,
} from "@/lib/api"
import { prisma } from "@/lib/prisma"
import type { NextRequest } from "next/server"

interface RouteContext {
  params: Promise<{ id: string }>
}

export const GET = withErrorHandling(async (request: NextRequest, context: RouteContext) => {
  const userId = await requireUserId()
  const { id: entryId } = validatePathParams(await context.params, PathParamSchemas.id)

  await ensure.timelineEntry(entryId, userId)

  const entry = await prisma.timelineEntry.findFirst({
    where: {
      id: entryId,
      relationship: where.relationshipAccess(userId),
      ...where.privacyForUser(userId, false),
    },
    select: {
      id: true,
      title: true,
      content: true,
      type: true,
      date: true,
      photos: true,
      location: true,
      tags: true,
      isPrivate: true,
      updatedAt: true,
      user: {
        select: { id: true, name: true, image: true },
      },
    },
  })

  return Api.success(entry)
})

export const PATCH = withErrorHandling(async (request: NextRequest, context: RouteContext) => {
  const userId = await requireUserId()
  const { id: entryId } = validatePathParams(await context.params, PathParamSchemas.id)
  const validatedData = await validateRequestBody(request, TimelineEntryUpdateSchema)

  await ensure.timelineEntry(entryId, userId, true)

  const updatedEntry = await prisma.timelineEntry.update({
    where: { id: entryId },
    data: validatedData,
    select: {
      id: true,
      title: true,
      content: true,
      type: true,
      date: true,
      photos: true,
      location: true,
      tags: true,
      isPrivate: true,
      updatedAt: true,
      user: {
        select: { id: true, name: true, image: true },
      },
    },
  })

  return Api.success(updatedEntry)
})

export const DELETE = withErrorHandling(async (request: NextRequest, context: RouteContext) => {
  const userId = await requireUserId()
  const { id: entryId } = validatePathParams(await context.params, PathParamSchemas.id)

  await ensure.timelineEntry(entryId, userId, true)

  await prisma.timelineEntry.delete({
    where: { id: entryId },
  })

  return Api.noContent()
})
