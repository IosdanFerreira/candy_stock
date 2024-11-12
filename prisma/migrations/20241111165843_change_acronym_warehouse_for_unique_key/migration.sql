/*
  Warnings:

  - A unique constraint covering the columns `[acronym]` on the table `warehouses` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "warehouses_acronym_key" ON "warehouses"("acronym");
