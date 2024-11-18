/*
  Warnings:

  - Changed the type of `register_date` on the `warehouses` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "warehouses" DROP COLUMN "register_date",
ADD COLUMN     "register_date" TIMESTAMP(3) NOT NULL;
