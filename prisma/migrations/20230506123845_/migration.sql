/*
  Warnings:

  - You are about to drop the column `total` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `productclass` table. All the data in the column will be lost.
  - Added the required column `totalPrice` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `src` to the `ProductClass` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` DROP COLUMN `total`,
    ADD COLUMN `totalPrice` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `productclass` DROP COLUMN `price`,
    ADD COLUMN `src` VARCHAR(191) NOT NULL;
