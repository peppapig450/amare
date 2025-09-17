import {
  Api,
  ApiError,
  ApiErrorCode,
  ensure,
  MilestoneCreateSchema,
  MilestoneListSchema,
  PathParamSchemas,
  requireUserId,
  validatePathParams,
  validateQueryParams,
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
  const pathParams = validatePathParams(await context.params, PathParamSchemas.relationshipId)
  const { searchParams } = new URL(request.url)
  const query = validateQueryParams(searchParams, MilestoneListSchema)

  await ensure.relationship(pathParams.relationshipId, userId)

  const [items, total] = await Promise.all([
    prisma.milestone.findMany({
      where: {
        relationshipId: pathParams.relationshipId,
        ...(query.category && { category: query.category }),
        ...(query.isSpecial !== undefined && { isSpecial: query.isSpecial }),
        ...(query.startDate && { date: { gte: query.startDate } }),
        ...(query.endDate && { date: { lte: query.endDate } }),
      },
      select: {
        id: true,
        title: true,
        description: true,
        date: true,
        category: true,
        isSpecial: true,
        photos: true,
        location: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { date: "desc" },
      take: query.take,
      skip: query.skip,
      ...(query.cursor && { cursor: { id: query.cursor } }),
    }),
    // TODO: make the where part a variable but figure out how to do it with typing from prisma
    prisma.milestone.count({
      where: {
        relationshipId: pathParams.relationshipId,
        ...(query.category && { category: query.category }),
        ...(query.isSpecial !== undefined && { isSpecial: query.isSpecial }),
        ...(query.startDate && { date: { gte: query.startDate } }),
        ...(query.endDate && { date: { lte: query.endDate } }),
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
  const validatedData = await validateRequestBody(request, MilestoneCreateSchema)

  await ensure.relationship(pathParams.relationshipId, userId)

  if (validatedData.relationshipId !== pathParams.relationshipId) {
    throw new ApiError(
      400,
      ApiErrorCode.BAD_REQUEST,
      "Relationship ID in URL must match request body",
    )
  }

  const milestone = await prisma.milestone.create({
    data: validatedData,
    select: {
      id: true,
      title: true,
      description: true,
      date: true,
      category: true,
      isSpecial: true,
      photos: true,
      location: true,
      createdAt: true,
    },
  })

  return Api.created(milestone)
})
