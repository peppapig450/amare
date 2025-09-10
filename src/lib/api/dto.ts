import {
  MilestoneCategorySchema,
  MoodTypeSchema,
  RelationshipStatusSchema,
  TimelineEntryTypeSchema,
} from "@/generated/zod/schemas"
import { z } from "zod"

// Base DTOs for common patterns

export const PaginationSchema = z.object({
  take: z.number().int().positive().max(100).optional(),
  skip: z.number().int().min(0).optional(),
  cursor: z.uuid().optional(),
})

export const DateRangeSchema = z.object({
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
})

// User DTOs
export const UserPublicSchema = z.object({
  id: z.uuid(),
  name: z.string().nullable(),
  email: z.email().nullable(),
  image: z.url().nullable(),
})

export const UserUpdateProfileSchema = z.object({
  name: z.string().trim().min(1).max(100).optional(),
})

// Relationship DTOs
export const RelationshipCreateSchema = z.object({
  partnerId: z.uuid(),
  status: RelationshipStatusSchema.optional(),
  startDate: z.coerce.date(),
})

export const RelationshipUpdateSchema = z.object({
  status: RelationshipStatusSchema.optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().nullable().optional(),
})

export const RelationshipListSchema = PaginationSchema.extend({
  status: RelationshipStatusSchema.optional(),
  includeEnded: z.coerce.boolean().default(false),
})

export const RelationshipQuerySchema = z.object({
  includeSettings: z.coerce.boolean().default(false),
  includeMilestones: z.coerce.boolean().default(false),
  includeRecentTimeline: z.coerce.boolean().default(false),
})

// Relationship Settings DTOs
export const RelationshipSettingsUpdateSchema = z.object({
  isPublic: z.boolean().optional(),
  allowMoodShare: z.boolean().optional(),
  timezone: z.string().optional(),
})

// Milestone DTOs
export const MilestoneCreateSchema = z.object({
  title: z.string().trim().min(1).max(200),
  description: z.string().trim().max(1000).optional(),
  date: z.coerce.date(),
  category: MilestoneCategorySchema,
  isSpecial: z.boolean().optional(),
  photos: z.array(z.url()).max(10).default([]),
  location: z.string().trim().max(200).optional(),
  relationshipId: z.uuid(),
})

export const MilestoneUpdateSchema = z.object({
  title: z.string().trim().min(1).max(200).optional(),
  description: z.string().trim().max(1000).optional(),
  date: z.coerce.date().optional(),
  category: MilestoneCategorySchema.optional(),
  isSpecial: z.boolean().optional(),
  photos: z.array(z.url()).max(10).optional(),
  location: z.string().trim().max(200).optional(),
})

export const MilestoneListSchema = PaginationSchema.extend({
  relationshipId: z.uuid().optional(),
  category: MilestoneCategorySchema.optional(),
  isSpecial: z.coerce.boolean().optional(),
  ...DateRangeSchema.shape,
})

// Timeline Entry DTOs
export const TimelineEntryCreateSchema = z.object({
  title: z.string().trim().min(1).max(200),
  content: z.string().trim().max(2000).optional(),
  type: TimelineEntryTypeSchema,
  date: z.coerce.date(),
  photos: z.array(z.url()).max(20).default([]),
  location: z.string().trim().max(200).optional(),
  tags: z.array(z.string().trim().min(1).max(50)).max(10).default([]),
  isPrivate: z.boolean().default(false),
  relationshipId: z.uuid(),
})

export const TimelineEntryUpdateSchema = z.object({
  title: z.string().trim().min(1).max(200).optional(),
  content: z.string().trim().max(2000).optional(),
  type: TimelineEntryTypeSchema.optional(),
  date: z.coerce.date().optional(),
  photos: z.array(z.url()).max(20).optional(),
  location: z.string().trim().max(200).optional(),
  tags: z.array(z.string().trim().min(1).max(50)).max(10).optional(),
  isPrivate: z.boolean().optional(),
})

export const TimelineEntryListSchema = PaginationSchema.extend({
  relationshipId: z.uuid().optional(),
  type: TimelineEntryTypeSchema.optional(),
  includePrivate: z.coerce.boolean().default(false),
  tags: z.array(z.string()).optional(),
  ...DateRangeSchema.shape,
})

// Mood entry DtOs
export const MoodEntryCreateSchema = z.object({
  mood: MoodTypeSchema,
  intensity: z.number().int().min(1).max(10),
  note: z.string().trim().max(500).optional(),
  date: z.coerce.date().optional(),
})

export const MoodEntryUpdateSchema = z.object({
  mood: MoodTypeSchema.optional(),
  intensity: z.number().int().min(1).max(10).optional(),
  note: z.string().trim().max(500).optional(),
  date: z.coerce.date().optional(),
})

export const MoodEntryListSchema = z.object({
  mood: MoodTypeSchema.optional(),
  minIntensity: z.number().int().min(1).max(10).optional(),
  maxIntensity: z.number().int().min(1).max(10).optional(),
  ...DateRangeSchema.shape,
})

// Response DTOs
export const ApiErrorSchema = z.object({
  error: z.string(),
  code: z.string(),
  message: z.string(),
  timestamp: z.iso.datetime(),
})

export const ApiSuccessSchema = z.object({
  success: z.literal(true),
  message: z.string().optional(),
})

export const PaginatedResponseSchema = <Schema extends z.ZodType>(itemSchema: Schema) =>
  z.object({
    data: z.array(itemSchema),
    pagination: z.object({
      total: z.number().int().min(0),
      take: z.number().int().positive().optional(),
      skip: z.number().int().min(0).optional(),
      cursor: z.uuid().optional(),
      hasMore: z.boolean(),
    }),
  })

// Type exports
export type PaginationDto = z.infer<typeof PaginationSchema>
export type DateRangeDto = z.infer<typeof DateRangeSchema>
export type UserPublicDto = z.infer<typeof UserPublicSchema>
export type UserUpdateProfileDto = z.infer<typeof UserUpdateProfileSchema>
export type RelationshipCreateDto = z.infer<typeof RelationshipCreateSchema>
export type RelationshipUpdateDto = z.infer<typeof RelationshipUpdateSchema>
export type RelationshipListDto = z.infer<typeof RelationshipListSchema>
export type RelationshipQueryDto = z.infer<typeof RelationshipQuerySchema>
export type RelationshipSettingsUpdateDto = z.infer<typeof RelationshipSettingsUpdateSchema>
export type MilestoneCreateDto = z.infer<typeof MilestoneCreateSchema>
export type MilestoneUpdateDto = z.infer<typeof MilestoneUpdateSchema>
export type MilestoneListDto = z.infer<typeof MilestoneListSchema>
export type TimelineEntryCreateDto = z.infer<typeof TimelineEntryCreateSchema>
export type TimelineEntryUpdateDto = z.infer<typeof TimelineEntryUpdateSchema>
export type TimelineEntryListDto = z.infer<typeof TimelineEntryListSchema>
export type MoodEntryCreateDto = z.infer<typeof MoodEntryCreateSchema>
export type MoodEntryUpdateDto = z.infer<typeof MoodEntryUpdateSchema>
export type MoodEntryListDto = z.infer<typeof MoodEntryListSchema>
export type ApiErrorDto = z.infer<typeof ApiErrorSchema>
export type ApiSuccessDto = z.infer<typeof ApiSuccessSchema>
