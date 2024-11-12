/*
  Warnings:

  - You are about to drop the column `admssion_date` on the `sellers` table. All the data in the column will be lost.
  - You are about to drop the column `dimissal_date` on the `sellers` table. All the data in the column will be lost.
  - Added the required column `admission_date` to the `sellers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sellers" DROP COLUMN "admssion_date",
DROP COLUMN "dimissal_date",
ADD COLUMN     "admission_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "dismissal_date" TIMESTAMP(3);
