-- AlterTable
ALTER TABLE "SiteSettings" DROP COLUMN "pricePerPoundLabel",
ADD COLUMN     "smallPlatePrice" TEXT NOT NULL DEFAULT '$10',
ADD COLUMN     "largePlatePrice" TEXT NOT NULL DEFAULT '$15';
