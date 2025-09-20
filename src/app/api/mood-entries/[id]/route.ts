import {
  Api,
  ensure,
  moodEntrySelect,
  MoodEntryUpdateSchema,
  moodEntryWithUserSelect,
  PathParamSchemas,
  requireUserId,
  validatePathParams,
  validateRequestBody,
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

  await ensure.moodEntry(entryId, userId)

  const entry = await prisma.moodEntry.findUnique({
    where: { id: entryId },
    select: moodEntryWithUserSelect,
  })

  return Api.success(entry)
})

export const PATCH = withErrorHandling(async (request: NextRequest, context: RouteContext) => {
  const userId = await requireUserId()
  const { id: entryId } = validatePathParams(await context.params, PathParamSchemas.id)
  const validatedData = await validateRequestBody(request, MoodEntryUpdateSchema)

  await ensure.moodEntry(entryId, userId)

  const updatedEntry = await prisma.moodEntry.update({
    where: { id: entryId },
    data: validatedData,
    select: moodEntrySelect,
  })

  return Api.success(updatedEntry)
})

export const DELETE = withErrorHandling(async (request: NextRequest, context: RouteContext) => {
  const userId = await requireUserId()
  const { id: entryId } = validatePathParams(await context.params, PathParamSchemas.id)

  await ensure.moodEntry(entryId, userId)

  await prisma.moodEntry.delete({
    where: { id: entryId },
  })

  return Api.noContent()
})
