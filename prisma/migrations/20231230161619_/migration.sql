/*
  Warnings:

  - Added the required column `Alamat` to the `Pembelian` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pembelian` ADD COLUMN `Alamat` VARCHAR(191) NOT NULL;
