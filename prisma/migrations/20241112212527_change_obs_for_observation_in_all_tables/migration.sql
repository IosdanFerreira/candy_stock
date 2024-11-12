/*
  Warnings:

  - You are about to drop the column `obs` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `obs` on the `productions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "clients" DROP COLUMN "obs",
ADD COLUMN     "observation" TEXT;

-- AlterTable
ALTER TABLE "productions" DROP COLUMN "obs",
ADD COLUMN     "observation" TEXT;
