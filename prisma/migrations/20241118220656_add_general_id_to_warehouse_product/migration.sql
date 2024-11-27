-- AlterTable
ALTER TABLE "warehouses_products" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "warehouses_products_pkey" PRIMARY KEY ("id");
