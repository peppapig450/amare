import { Prisma } from "@/generated/prisma"

export const userSelect = {
  id: true,
  name: true,
  email: true,
  image: true,
} satisfies Prisma.UserSelect

export const relationshipInclude = Prisma.validator<Prisma.RelationshipInclude>()({
  partner1: { select: userSelect },
  partner2: { select: userSelect },
})

export const fullRelationshipInclude = Prisma.validator<Prisma.RelationshipInclude>()({
  ...relationshipInclude,
  settings: true,
})

export const relationshipWithPartners = Prisma.validator<Prisma.RelationshipDefaultArgs>()({
  include: relationshipInclude,
})

export type RelationshipWithPartners = Prisma.RelationshipGetPayload<
  typeof relationshipWithPartners
>

export const relationshipWithFull = Prisma.validator<Prisma.RelationshipDefaultArgs>()({
  include: fullRelationshipInclude,
})

export type RelationshipWithFull = Prisma.RelationshipGetPayload<typeof relationshipWithFull>
