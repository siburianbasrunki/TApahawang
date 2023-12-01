/*
  Warnings:

  - You are about to drop the column `createAt` on the `donasi` table. All the data in the column will be lost.
  - You are about to drop the column `nama` on the `donasi` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `donasi` table. All the data in the column will be lost.
  - Added the required column `tanggalDonasi` to the `Donasi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Donasi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `donasi` DROP COLUMN `createAt`,
    DROP COLUMN `nama`,
    DROP COLUMN `updateAt`,
    ADD COLUMN `tanggalDonasi` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;
