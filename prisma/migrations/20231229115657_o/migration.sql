/*
  Warnings:

  - You are about to drop the column `totalHarga` on the `bookingtransportasilaut` table. All the data in the column will be lost.
  - Added the required column `buktiTranfer` to the `BookingTransportasiLaut` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nama` to the `BookingTransportasiLaut` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bookingtransportasilaut` DROP COLUMN `totalHarga`,
    ADD COLUMN `buktiTranfer` VARCHAR(191) NOT NULL,
    ADD COLUMN `nama` VARCHAR(191) NOT NULL;
