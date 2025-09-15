import {
  Api,
  ApiError,
  ApiErrorCode,
  ensure,
  PathParamSchemas,
  requireUserId,
  TimelineEntryCreateSchema,
  TimelineEntryListSchema,
  validatePathParams,
  validateQueryParams,
  validateRequestBody,
  where,
  withErrorHandling,
} from "@/lib/api"
import { prisma } from "@/lib/prisma"
import type { NextRequest } from "next/server"

interface RouteContext {
  params: Promise<Record<string, string>>
}

export const GET = withErrorHandling(async (request: NextRequest, context: RouteContext) => {
  const userId = await requireUserId()
  const pathParams = validatePathParams(await context.params, PathParamSchemas.relationshipId)
  const { searchParams } = new URL(request.url)
  const query = validateQueryParams(searchParams, TimelineEntryListSchema)

  await ensure.relationship(pathParams.relationshipId, userId)

  const [items, total] = await Promise.all([
    prisma.timelineEntry.findMany({
      where: {
        relationshipId: pathParams.relationshipId,
        ...(query.type && { type: query.type }),
        ...(query.tags &&
          query.tags.length > 0 && {
            tags: { hasSome: query.tags },
          }),
        ...(query.startDate && { date: { gte: query.startDate } }),
        ...(query.endDate && { date: { lte: query.endDate } }),
        ...where.privacyForUser(userId, query.includePrivate),
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
        createdAt: true,
        updatedAt: true,
        user: {
          select: { id: true, name: true, image: true },
        },
      },
      orderBy: { date: "desc" },
      take: query.take,
      skip: query.skip,
      ...(query.cursor && { cursor: { id: query.cursor } }),
    }),
    prisma.timelineEntry.count({
      where: {
        relationshipId: pathParams.relationshipId,
        ...(query.type && { type: query.type }),
        ...(query.tags &&
          query.tags.length > 0 && {
            tags: { hasSome: query.tags },
          }),
        ...(query.startDate && { date: { gte: query.startDate } }),
        ...(query.endDate && { date: { lte: query.endDate } }),
        ...where.privacyForUser(userId, query.includePrivate),
      },
    }),
  ])

  return Api.paginated(items, {
    total,
    take: query.take,
    skip: query.skip,
    cursor: query.cursor,
    hasMore: (query.skip ?? 0) + (query.take ?? 20) < total,
  })
})

export const POST = withErrorHandling(async (request: NextRequest, context: RouteContext) => {
  const userId = await requireUserId()
  const pathParams = validatePathParams(await context.params, PathParamSchemas.relationshipId)
  const validatedData = await validateRequestBody(request, TimelineEntryCreateSchema)

  await ensure.relationship(pathParams.relationshipId, userId)

  if (validatedData.relationshipId !== pathParams.relationshipId) {
    throw new ApiError(
      400,
      ApiErrorCode.BAD_REQUEST,
      "Relationship ID in URL must match request body",
    )
  }

  const timelineEntry = await prisma.timelineEntry.create({
    data: {
      ...validatedData,
      userId,
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
      createdAt: true,
      user: {
        select: { id: true, name: true, image: true },
      },
    },
  })

  return Api.created(timelineEntry)
})
