/*
  Warnings:

  - You are about to drop the column `adress` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `age` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Product` table. All the data in the column will be lost.
  - Added the required column `description` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vendorCode` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "adress",
DROP COLUMN "age",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "price" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "vendorCode" TEXT NOT NULL;
