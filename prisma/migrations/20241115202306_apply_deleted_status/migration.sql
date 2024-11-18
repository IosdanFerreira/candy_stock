/*
  Warnings:

  - You are about to drop the column `active_status` on the `warehouses` table. All the data in the column will be lost.
  - You are about to drop the column `registration_date` on the `warehouses` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[register_code]` on the table `warehouses` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `warehouses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `register_code` to the `warehouses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `register_date` to the `warehouses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "warehouses" DROP COLUMN "active_status",
DROP COLUMN "registration_date",
ADD COLUMN     "cep" TEXT,
ADD COLUMN     "city_name" TEXT,
ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "house_number" INTEGER,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "neighborhood" TEXT,
ADD COLUMN     "register_code" TEXT NOT NULL,
ADD COLUMN     "register_date" TEXT NOT NULL,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "street_name" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "warehouses_register_code_key" ON "warehouses"("register_code");
