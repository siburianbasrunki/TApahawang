/*
  Warnings:

  - Added the required column `buktiTranfer` to the `Pembelian` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nama` to the `Pembelian` table without a default value. This is not possible if the table is not empty.
  - Added the required column `noTelepon` to the `Pembelian` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pembelian` ADD COLUMN `buktiTranfer` VARCHAR(191) NOT NULL,
    ADD COLUMN `nama` VARCHAR(191) NOT NULL,
    ADD COLUMN `noTelepon` VARCHAR(191) NOT NULL;
