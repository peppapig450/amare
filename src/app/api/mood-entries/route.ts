import {
  Api,
  MoodEntryCreateSchema,
  MoodEntryListSchema,
  requireUserId,
  validateQueryParams,
  validateRequestBody,
  withErrorHandling,
} from "@/lib/api"
import { prisma } from "@/lib/prisma"
import type { NextRequest } from "next/server"

export const GET = withErrorHandling(async (request: NextRequest) => {
  const userId = await requireUserId()
  const { searchParams } = new URL(request.url)
  const query = validateQueryParams(searchParams, MoodEntryListSchema)

  const entries = await prisma.moodEntry.findMany({
    where: {
      userId,
      ...(query.mood && { mood: query.mood }),
      ...(query.minIntensity && { intensity: { gte: query.minIntensity } }),
      ...(query.maxIntensity && { intensity: { lte: query.maxIntensity } }),
      ...(query.startDate && { date: { gte: query.startDate } }),
      ...(query.endDate && { date: { lte: query.endDate } }),
    },
    select: {
      id: true,
      mood: true,
      intensity: true,
      note: true,
      date: true,
      createdAt: true,
    },
    orderBy: { date: "desc" },
  })

  return Api.success(entries)
})

export const POST = withErrorHandling(async (request: NextRequest) => {
  const userId = await requireUserId()
  const validatedData = await validateRequestBody(request, MoodEntryCreateSchema)

  const entry = await prisma.moodEntry.create({
    data: {
      ...validatedData,
      userId,
      date: validatedData.date ?? new Date(),
    },
    select: {
      id: true,
      mood: true,
      intensity: true,
      note: true,
      date: true,
      createdAt: true,
    },
  })

  return Api.created(entry)
})
