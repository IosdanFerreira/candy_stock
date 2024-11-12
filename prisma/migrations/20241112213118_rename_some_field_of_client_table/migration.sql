/*
  Warnings:

  - The `house_number` column on the `clients` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "clients" ALTER COLUMN "registration_date" SET DATA TYPE TEXT,
DROP COLUMN "house_number",
ADD COLUMN     "house_number" INTEGER;
