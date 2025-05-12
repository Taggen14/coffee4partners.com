/*
  Warnings:

  - You are about to drop the column `longDescription` on the `Product` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "SubCategory_name_key";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "longDescription";

-- AlterTable
ALTER TABLE "SubCategory" ADD COLUMN     "image" TEXT;
