import { auth } from "@/auth"
import type { Prisma } from "@/generated/prisma"
import { prisma } from "@/lib/prisma"
import { ApiError } from "./responses"

export const requireUserId = async () => {
  const session = await auth()
  const userId = session?.user?.id
  if (!userId) throw new ApiError(401, "UNAUTHORIZED", "Unauthorized")
  return userId
}

export const where = {
  relationshipAccess(userId: string) {
    return { OR: [{ partner1Id: userId }, { partner2Id: userId }] }
  },
  privacyForUser(userId: string, includePrivate: boolean) {
    return includePrivate
      ? { OR: [{ isPrivate: false }, { isPrivate: true, userId }] }
      : { isPrivate: false }
  },
}

export const ensure = {
  async relationship(relationshipId: string, userId: string) {
    const relationship = await prisma.relationship.findFirst({
      where: { id: relationshipId, ...where.relationshipAccess(userId) },
      select: { id: true },
    })
    if (!relationship) throw new ApiError(404, "NOT_FOUND", "Relationship not found")
    return relationship
  },

  async milestone(milestoneId: string, userId: string) {
    const milestone = await prisma.milestone.findFirst({
      where: { id: milestoneId, relationship: where.relationshipAccess(userId) },
      select: { id: true, relationshipId: true },
    })
    if (!milestone) throw new ApiError(404, "NOT_FOUND", "Milestone not found")
    return milestone
  },

  async moodEntry(entryId: string, userId: string) {
    const moodEntry = await prisma.moodEntry.findFirst({
      where: { id: entryId, userId },
      select: { id: true },
    })
    if (!moodEntry) throw new ApiError(404, "NOT_FOUND", "Mood entry not found")
    return moodEntry
  },

  async timelineEntry(entryId: string, userId: string, requireOwnership = false) {
    const base = {
      id: entryId,
      relationship: where.relationshipAccess(userId),
      ...(requireOwnership
        ? { userId }
        : { OR: [{ isPrivate: false }, { isPrivate: true, userId }] }),
    } satisfies Prisma.TimelineEntryWhereInput

    const timelineEntry = await prisma.timelineEntry.findFirst({
      where: base,
      select: { id: true, userId: true },
    })

    if (!timelineEntry) {
      const message = requireOwnership
        ? "Timeline entry not found or you don't have permission to edit it"
        : "Timeline entry not found"
      throw new ApiError(404, "NOT_FOUND", message)
    }
    return timelineEntry
  },
}
