/*
  Warnings:

  - You are about to drop the column `active_status` on the `sellers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "sellers" DROP COLUMN "active_status",
ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;
