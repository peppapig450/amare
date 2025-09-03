-- CreateEnum
CREATE TYPE "public"."RelationshipStatus" AS ENUM ('SINGLE', 'DATING', 'ENGAGED', 'MARRIED', 'COMPLICATED', 'TALKING', 'SITUATIONSHIP', 'SEPARATED', 'DIVORCED', 'JUST_FRIENDS');

-- CreateEnum
CREATE TYPE "public"."MilestoneCategory" AS ENUM ('ANNIVERSARY', 'FIRST_DATE', 'FIRST_KISS', 'FIRST_I_LOVE_YOU', 'ENGAGEMENT', 'MARRIAGE', 'MOVING_IN', 'VACATION', 'ACHIEVEMENT', 'CHALLENGE', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."TimelineEntryType" AS ENUM ('MILESTONE', 'MEMORY', 'PHOTO', 'NOTE', 'ACHIEVEMENT', 'DATE', 'GIFT', 'CONVERSATION', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."MoodType" AS ENUM ('ECSTATIC', 'HAPPY', 'CONTENT', 'LONGING', 'NEUTRAL', 'ANXIOUS', 'SAD', 'FRUSTRATED', 'ANGRY', 'ROMANTIC', 'GRATEFUL');

-- CreateTable
CREATE TABLE "public"."users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "name" TEXT,
    "avatar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."relationships" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "status" "public"."RelationshipStatus" NOT NULL DEFAULT 'DATING',
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "partner1Id" UUID NOT NULL,
    "partner2Id" UUID NOT NULL,

    CONSTRAINT "relationships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."relationship_settings" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "relationshipId" UUID NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "allowMoodShare" BOOLEAN NOT NULL DEFAULT true,
    "timezone" TEXT NOT NULL DEFAULT 'UTC',

    CONSTRAINT "relationship_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."milestones" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "description" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "category" "public"."MilestoneCategory" NOT NULL,
    "isSpecial" BOOLEAN NOT NULL DEFAULT false,
    "photos" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "location" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "relationshipId" UUID NOT NULL,

    CONSTRAINT "milestones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."timeline_entries" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "content" TEXT,
    "type" "public"."TimelineEntryType" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "photos" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "location" TEXT,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "isPrivate" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" UUID NOT NULL,
    "relationshipId" UUID NOT NULL,

    CONSTRAINT "timeline_entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."mood_entries" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "mood" "public"."MoodType" NOT NULL,
    "intensity" INTEGER NOT NULL,
    "note" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" UUID NOT NULL,

    CONSTRAINT "mood_entries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "relationships_partner1Id_partner2Id_key" ON "public"."relationships"("partner1Id", "partner2Id");

-- CreateIndex
CREATE UNIQUE INDEX "relationship_settings_relationshipId_key" ON "public"."relationship_settings"("relationshipId");

-- AddForeignKey
ALTER TABLE "public"."relationships" ADD CONSTRAINT "relationships_partner1Id_fkey" FOREIGN KEY ("partner1Id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."relationships" ADD CONSTRAINT "relationships_partner2Id_fkey" FOREIGN KEY ("partner2Id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."relationship_settings" ADD CONSTRAINT "relationship_settings_relationshipId_fkey" FOREIGN KEY ("relationshipId") REFERENCES "public"."relationships"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."milestones" ADD CONSTRAINT "milestones_relationshipId_fkey" FOREIGN KEY ("relationshipId") REFERENCES "public"."relationships"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."timeline_entries" ADD CONSTRAINT "timeline_entries_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."timeline_entries" ADD CONSTRAINT "timeline_entries_relationshipId_fkey" FOREIGN KEY ("relationshipId") REFERENCES "public"."relationships"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."mood_entries" ADD CONSTRAINT "mood_entries_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
