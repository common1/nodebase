/*
  Warnings:

  - Added the required column `updatedAt` to the `Workflow` table without a default value. This is not possible if the table is not empty.
  - Added the required column `useId` to the `Workflow` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Workflow" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "useId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Workflow" ADD CONSTRAINT "Workflow_useId_fkey" FOREIGN KEY ("useId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
