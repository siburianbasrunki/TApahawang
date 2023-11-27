/*
  Warnings:

  - You are about to drop the column `userId` on the `donasi` table. All the data in the column will be lost.
  - Added the required column `nama` to the `Donasi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `donasi` DROP COLUMN `userId`,
    ADD COLUMN `nama` VARCHAR(191) NOT NULL;
