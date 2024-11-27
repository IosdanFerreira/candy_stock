/*
  Warnings:

  - You are about to drop the column `active_status` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "active_status",
ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;
