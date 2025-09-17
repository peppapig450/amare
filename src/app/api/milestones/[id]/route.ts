import {
  Api,
  ensure,
  MilestoneUpdateSchema,
  PathParamSchemas,
  requireUserId,
  validatePathParams,
  withErrorHandling,
} from "@/lib/api"
import { prisma } from "@/lib/prisma"
import type { NextRequest } from "next/server"

interface RouteContext {
  params: Promise<{ id: string }>
}

export const GET = withErrorHandling(async (request: NextRequest, context: RouteContext) => {
  const userId = await requireUserId()
  const { id: milestoneId } = validatePathParams(await context.params, PathParamSchemas.id)

  await ensure.milestone(milestoneId, userId)

  const milestone = await prisma.milestone.findFirst({
    where: {
      id: milestoneId,
      relationship: {
        OR: [{ partner1Id: userId }, { partner2Id: userId }],
      },
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
      relationship: {
        select: {
          id: true,
          partner1: { select: { id: true, name: true } },
          partner2: { select: { id: true, name: true } },
        },
      },
    },
  })

  return Api.success(milestone)
})

export const PATCH = withErrorHandling(async (request: NextRequest, context: RouteContext) => {
  const userId = await requireUserId()
  const { id: milestoneId } = validatePathParams(await context.params, PathParamSchemas.id)
  const data = (await request.json()) as unknown
  const validatedData = MilestoneUpdateSchema.parse(data)

  await ensure.milestone(milestoneId, userId)

  const updatedMilestone = await prisma.milestone.update({
    where: { id: milestoneId },
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
      updatedAt: true,
    },
  })

  return Api.success(updatedMilestone)
})

export const DELETE = withErrorHandling(async (request: NextRequest, context: RouteContext) => {
  const userId = await requireUserId()
  const { id: milestoneId } = validatePathParams(await context.params, PathParamSchemas.id)

  await ensure.milestone(milestoneId, userId)

  await prisma.milestone.delete({
    where: { id: milestoneId },
  })

  return Api.noContent()
})
