-- CreateEnum
CREATE TYPE "AdminRole" AS ENUM ('ADMIN', 'EMPLOYEE');

-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "role" "AdminRole" NOT NULL DEFAULT 'ADMIN';
