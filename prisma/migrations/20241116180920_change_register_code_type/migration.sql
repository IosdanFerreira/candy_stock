/*
  Warnings:

  - Changed the type of `register_code` on the `warehouses` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "warehouses" DROP COLUMN "register_code",
ADD COLUMN     "register_code" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "warehouses_register_code_key" ON "warehouses"("register_code");
