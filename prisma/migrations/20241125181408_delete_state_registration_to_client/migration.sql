/*
  Warnings:

  - You are about to drop the column `state_registration` on the `clients` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "clients_state_registration_key";

-- AlterTable
ALTER TABLE "clients" DROP COLUMN "state_registration";
