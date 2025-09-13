import {
  Api,
  PathParamSchemas,
  RelationshipQuerySchema,
  RelationshipUpdateSchema,
  ensure,
  requireUserId,
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
  const pathParams = validatePathParams(await context.params, PathParamSchemas.id)
  const { searchParams } = new URL(request.url)
  const query = validateQueryParams(searchParams, RelationshipQuerySchema)

  await ensure.relationship(pathParams.id, userId)

  const item = await prisma.relationship.findFirst({
    where: {
      id: pathParams.id,
      ...where.relationshipAccess(userId),
    },
    select: {
      id: true,
      status: true,
      startDate: true,
      endDate: true,
      createdAt: true,
      updatedAt: true,
      partner1: {
        select: { id: true, name: true, image: true },
      },
      partner2: {
        select: { id: true, name: true, image: true },
      },
      ...(query.includeSettings && {
        settings: {
          select: {
            isPublic: true,
            allowMoodShare: true,
            timezone: true,
          },
        },
      }),
      ...(query.includeSettings && {
        milestones: {
          select: {
            id: true,
            title: true,
            date: true,
            category: true,
            isSpecial: true,
          },
          orderBy: { date: "desc" },
          take: 10,
        },
      }),
      ...(query.includeRecentTimeline && {
        timeline: {
          select: {
            id: true,
            title: true,
            type: true,
            date: true,
            isPrivate: true,
            user: {
              select: { id: true, name: true, image: true },
            },
          },
          where: where.privacyForUser(userId, false),
          orderBy: { date: "desc" },
          take: 5,
        },
      }),
    },
  })

  return Api.success(item)
})

export const PATCH = withErrorHandling(async (request: NextRequest, context: RouteContext) => {
  const userId = await requireUserId()
  const pathParams = validatePathParams(await context.params, PathParamSchemas.id)
  const validatedData = await validateRequestBody(request, RelationshipUpdateSchema)

  await ensure.relationship(pathParams.id, userId)

  const item = await prisma.relationship.update({
    where: { id: pathParams.id },
    data: validatedData,
    select: {
      id: true,
      status: true,
      startDate: true,
      endDate: true,
      updatedAt: true,
      partner1: {
        select: { id: true, name: true, image: true },
      },
      partner2: {
        select: { id: true, name: true, image: true },
      },
    },
  })

  return Api.success(item)
})

export const DELETE = withErrorHandling(async (request: NextRequest, context: RouteContext) => {
  const userId = await requireUserId()
  const pathParams = validatePathParams(await context.params, PathParamSchemas.id)

  await ensure.relationship(pathParams.id, userId)

  await prisma.relationship.delete({
    where: { id: pathParams.id },
  })

  return Api.noContent()
})
