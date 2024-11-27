/*
  Warnings:

  - You are about to drop the column `active_status` on the `alerts` table. All the data in the column will be lost.
  - You are about to drop the column `active_status` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `active_status` on the `payment_methods` table. All the data in the column will be lost.
  - You are about to drop the column `active_status` on the `productions` table. All the data in the column will be lost.
  - You are about to drop the column `active_status` on the `productions_responsibilities` table. All the data in the column will be lost.
  - You are about to drop the column `active_status` on the `productions_steps` table. All the data in the column will be lost.
  - You are about to drop the column `active_status` on the `roles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "alerts" DROP COLUMN "active_status",
ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "clients" DROP COLUMN "active_status",
ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "payment_methods" DROP COLUMN "active_status",
ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "productions" DROP COLUMN "active_status",
ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "productions_responsibilities" DROP COLUMN "active_status",
ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "productions_steps" DROP COLUMN "active_status",
ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "roles" DROP COLUMN "active_status",
ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "warehouses_products" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;
