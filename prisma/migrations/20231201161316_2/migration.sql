/*
  Warnings:

  - Added the required column `gambarTerumbuDonasi` to the `Donasi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `donasi` ADD COLUMN `gambarTerumbuDonasi` VARCHAR(191) NOT NULL;
