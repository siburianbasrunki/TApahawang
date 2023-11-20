/*
  Warnings:

  - You are about to alter the column `jumlahDonasi` on the `donasi` table. The data in that column could be lost. The data in that column will be cast from `Double` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `donasi` MODIFY `jumlahDonasi` VARCHAR(191) NOT NULL;
