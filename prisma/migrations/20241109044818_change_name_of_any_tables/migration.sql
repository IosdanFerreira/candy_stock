/*
  Warnings:

  - You are about to drop the `productions_responsabilities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `warehouses_prooducts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "productions_responsabilities" DROP CONSTRAINT "productions_responsabilities_production_step_id_fkey";

-- DropForeignKey
ALTER TABLE "productions_responsabilities" DROP CONSTRAINT "productions_responsabilities_responsible_user_id_fkey";

-- DropForeignKey
ALTER TABLE "warehouses_prooducts" DROP CONSTRAINT "warehouses_prooducts_product_id_fkey";

-- DropForeignKey
ALTER TABLE "warehouses_prooducts" DROP CONSTRAINT "warehouses_prooducts_warehouse_id_fkey";

-- DropTable
DROP TABLE "productions_responsabilities";

-- DropTable
DROP TABLE "warehouses_prooducts";

-- CreateTable
CREATE TABLE "warehouses_products" (
    "product_id" INTEGER NOT NULL,
    "warehouse_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "productions_responsibilities" (
    "id" SERIAL NOT NULL,
    "production_step_id" INTEGER NOT NULL,
    "responsible_user_id" INTEGER NOT NULL,
    "deadline" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "productions_responsibilities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "warehouses_products_warehouse_id_product_id_key" ON "warehouses_products"("warehouse_id", "product_id");

-- AddForeignKey
ALTER TABLE "warehouses_products" ADD CONSTRAINT "warehouses_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "warehouses_products" ADD CONSTRAINT "warehouses_products_warehouse_id_fkey" FOREIGN KEY ("warehouse_id") REFERENCES "warehouses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productions_responsibilities" ADD CONSTRAINT "productions_responsibilities_production_step_id_fkey" FOREIGN KEY ("production_step_id") REFERENCES "productions_steps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productions_responsibilities" ADD CONSTRAINT "productions_responsibilities_responsible_user_id_fkey" FOREIGN KEY ("responsible_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
