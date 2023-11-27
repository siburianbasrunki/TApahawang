/*
  Warnings:

  - Added the required column `gambarPaket` to the `Paket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `paket` ADD COLUMN `gambarPaket` VARCHAR(191) NOT NULL;
