/*
  Warnings:

  - You are about to drop the `Feature` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Inquiry` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TypingIndicator` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductFeatures` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_inquiryId_fkey";

-- DropForeignKey
ALTER TABLE "TypingIndicator" DROP CONSTRAINT "TypingIndicator_inquiryId_fkey";

-- DropForeignKey
ALTER TABLE "_ProductFeatures" DROP CONSTRAINT "_ProductFeatures_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductFeatures" DROP CONSTRAINT "_ProductFeatures_B_fkey";

-- DropTable
DROP TABLE "Feature";

-- DropTable
DROP TABLE "Inquiry";

-- DropTable
DROP TABLE "Message";

-- DropTable
DROP TABLE "TypingIndicator";

-- DropTable
DROP TABLE "_ProductFeatures";

-- DropEnum
DROP TYPE "InquiryStatus";

-- DropEnum
DROP TYPE "InquiryType";

-- DropEnum
DROP TYPE "MessageRole";

-- CreateTable
CREATE TABLE "NewsletterSubscriber" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NewsletterSubscriber_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NewsletterSubscriber_email_key" ON "NewsletterSubscriber"("email");
