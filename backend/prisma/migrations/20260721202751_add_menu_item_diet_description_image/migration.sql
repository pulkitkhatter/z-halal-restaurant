-- CreateEnum
CREATE TYPE "DietType" AS ENUM ('VEG', 'NON_VEG', 'EGG');

-- AlterTable
ALTER TABLE "MenuItem" ADD COLUMN     "description" TEXT,
ADD COLUMN     "dietType" "DietType" NOT NULL DEFAULT 'VEG',
ADD COLUMN     "imageUrl" TEXT;
