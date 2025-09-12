import {
  Api,
  RelationshipCreateSchema,
  RelationshipListSchema,
  requireUserId,
  validateQueryParams,
  validateRequestBody,
  where,
  withErrorHandling,
} from "@/lib/api"

import { userSelect } from "@/lib/api/prismaShapes"
import { prisma } from "@/lib/prisma"
import type { NextRequest } from "next/server"

const relationshipSummarySelect = {
  id: true,
  status: true,
  startDate: true,
  createdAt: true,
  partner1: { select: userSelect },
  partner2: { select: userSelect },
  _count: { select: { milestones: true, timeline: true } },
} as const

export const GET = withErrorHandling(async (request: NextRequest) => {
  const userId = await requireUserId()
  const { searchParams } = new URL(request.url)
  const query = validateQueryParams(searchParams, RelationshipListSchema)

  const whereClause = {
    ...where.relationshipAccess(userId),
    ...(query.status && { status: query.status }),
    ...(query.includeEnded ? {} : { endDate: null }),
  }

  const take = query.take
  const baseSkip = query.skip ?? 0
  const skip = baseSkip + (query.cursor ? 1 : 0)

  const [relationships, total] = await prisma.$transaction([
    prisma.relationship.findMany({
      where: whereClause,
      select: relationshipSummarySelect,
      orderBy: { createdAt: "desc" },
      take,
      skip,
      ...(query.cursor && { cursor: { id: query.cursor } }),
    }),
    prisma.relationship.count({ where: whereClause }),
  ])

  const hasMore = baseSkip + relationships.length < total

  return Api.paginated(relationships, {
    total,
    take: query.take,
    skip: query.skip,
    cursor: query.cursor,
    hasMore,
  })
})

export const POST = withErrorHandling(async (request: NextRequest) => {
  const userId = await requireUserId()
  const body = await validateRequestBody(request, RelationshipCreateSchema)

  if (body.partnerId === userId) {
    return Api.badRequest("Cannot create relationship with yourself")
  }

  // Check partner existence and an active relationship (in either orientation) atomically
  const [partner, existing] = await prisma.$transaction([
    prisma.user.findUnique({
      where: { id: body.partnerId },
      select: { id: true },
    }),
    prisma.relationship.findFirst({
      where: {
        OR: [
          { partner1Id: userId, partner2Id: body.partnerId },
          { partner1Id: body.partnerId, partner2Id: userId },
        ],
        endDate: null,
      },
      select: { id: true },
    }),
  ])

  if (!partner) {
    return Api.notFound("Partner not found")
  }
  if (existing) {
    return Api.conflict("Active relationship already exists with this user")
  }

  const created = await prisma.relationship.create({
    data: {
      partner1Id: userId,
      partner2Id: body.partnerId,
      status: body.status ?? "DATING",
      startDate: body.startDate,
    },
    select: {
      id: true,
      status: true,
      startDate: true,
      endDate: true,
      createdAt: true,
      partner1: { select: userSelect },
      partner2: { select: userSelect },
    },
  })

  return Api.created(created)
})
