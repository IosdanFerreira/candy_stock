/*
  Warnings:

  - Added the required column `name_unaccented` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description_unaccented` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_unaccented` to the `products` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `name_unaccented` to the `sellers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clients" ADD COLUMN     "name_unaccented" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "description_unaccented" TEXT NOT NULL,
ADD COLUMN     "name_unaccented" TEXT NOT NULL,
ALTER COLUMN "description" SET NOT NULL;

-- AlterTable
ALTER TABLE "sellers" ADD COLUMN     "name_unaccented" TEXT NOT NULL;
