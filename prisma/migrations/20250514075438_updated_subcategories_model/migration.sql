/*
  Warnings:

  - You are about to drop the column `image` on the `SubCategory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SubCategory" DROP COLUMN "image",
ADD COLUMN     "images" TEXT[];
