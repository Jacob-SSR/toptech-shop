/*
  Warnings:

  - The `status` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[sku]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `category` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `condition` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('smartphone', 'tablet', 'notebook', 'monitor', 'earpods', 'desktop', 'gadget', 'accessories', 'console');

-- CreateEnum
CREATE TYPE "Condition" AS ENUM ('new', 'used');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('active', 'inactive', 'draft');

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "category",
ADD COLUMN     "category" "Category" NOT NULL,
DROP COLUMN "condition",
ADD COLUMN     "condition" "Condition" NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'active';

-- CreateIndex
CREATE UNIQUE INDEX "Product_sku_key" ON "Product"("sku");
