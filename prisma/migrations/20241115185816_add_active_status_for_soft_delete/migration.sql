/*
  Warnings:

  - You are about to drop the column `status` on the `productions_steps` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "alerts" ADD COLUMN     "active_status" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "clients" ADD COLUMN     "active_status" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "payment_methods" ADD COLUMN     "active_status" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "productions" ADD COLUMN     "active_status" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "productions_responsibilities" ADD COLUMN     "active_status" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "productions_steps" DROP COLUMN "status",
ADD COLUMN     "active_status" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "production_status" TEXT NOT NULL DEFAULT 'Pending';

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "active_status" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "roles" ADD COLUMN     "active_status" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "sellers" ADD COLUMN     "active_status" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "warehouses" ADD COLUMN     "active_status" BOOLEAN NOT NULL DEFAULT true;
