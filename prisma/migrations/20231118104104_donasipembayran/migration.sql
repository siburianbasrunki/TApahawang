/*
  Warnings:

  - Added the required column `buktiPembayaran` to the `Donasi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `donasi` ADD COLUMN `buktiPembayaran` VARCHAR(191) NOT NULL;
