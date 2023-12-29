/*
  Warnings:

  - Added the required column `noTelepon` to the `BookingTransportasiLaut` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bookingtransportasilaut` ADD COLUMN `noTelepon` VARCHAR(191) NOT NULL;
