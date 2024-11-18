/*
  Warnings:

  - Added the required column `description_unaccent` to the `warehouses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_unaccent` to the `warehouses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "warehouses" ADD COLUMN     "description_unaccent" TEXT NOT NULL,
ADD COLUMN     "name_unaccent" TEXT NOT NULL;
