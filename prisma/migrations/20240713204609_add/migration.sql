-- CreateEnum
CREATE TYPE "Status" AS ENUM ('HIGH', 'MEDIUM', 'LOW');

-- AlterTable
ALTER TABLE "Issue" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'LOW';
