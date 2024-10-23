/*
  Warnings:

  - You are about to drop the `TodoLabel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TodoLabels` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."TodoLabel" DROP CONSTRAINT "TodoLabel_labelId_fkey";

-- DropForeignKey
ALTER TABLE "public"."TodoLabel" DROP CONSTRAINT "TodoLabel_todoId_fkey";

-- DropForeignKey
ALTER TABLE "public"."_TodoLabels" DROP CONSTRAINT "_TodoLabels_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_TodoLabels" DROP CONSTRAINT "_TodoLabels_B_fkey";

-- AlterTable
ALTER TABLE "public"."todos" ADD COLUMN     "labelId" INTEGER;

-- DropTable
DROP TABLE "public"."TodoLabel";

-- DropTable
DROP TABLE "public"."_TodoLabels";

-- AddForeignKey
ALTER TABLE "public"."todos" ADD CONSTRAINT "todos_labelId_fkey" FOREIGN KEY ("labelId") REFERENCES "public"."labels"("id") ON DELETE SET NULL ON UPDATE CASCADE;
