/*
  Warnings:

  - You are about to drop the column `description_unaccent` on the `warehouses` table. All the data in the column will be lost.
  - You are about to drop the column `name_unaccent` on the `warehouses` table. All the data in the column will be lost.
  - Added the required column `description_unaccented` to the `warehouses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_unaccented` to the `warehouses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "warehouses" DROP COLUMN "description_unaccent",
DROP COLUMN "name_unaccent",
ADD COLUMN     "description_unaccented" TEXT NOT NULL,
ADD COLUMN     "name_unaccented" TEXT NOT NULL;
