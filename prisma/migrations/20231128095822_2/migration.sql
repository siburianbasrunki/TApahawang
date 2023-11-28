/*
  Warnings:

  - Added the required column `bukti` to the `BookingVilla` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bookingvilla` ADD COLUMN `bukti` VARCHAR(191) NOT NULL;
