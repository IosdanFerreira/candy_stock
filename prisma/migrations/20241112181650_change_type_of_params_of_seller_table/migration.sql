/*
  Warnings:

  - You are about to drop the column `obs` on the `sellers` table. All the data in the column will be lost.
  - The `house_number` column on the `sellers` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "sellers" DROP COLUMN "obs",
ADD COLUMN     "observation" TEXT,
DROP COLUMN "house_number",
ADD COLUMN     "house_number" INTEGER,
ALTER COLUMN "admission_date" SET DATA TYPE TEXT,
ALTER COLUMN "dismissal_date" SET DATA TYPE TEXT;
