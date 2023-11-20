/*
  Warnings:

  - You are about to drop the column `role` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `role`;

-- CreateTable
CREATE TABLE `Volunteer` (
    `id` VARCHAR(191) NOT NULL,
    `namaOrganisasi` VARCHAR(191) NOT NULL,
    `asal` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `noTelepon` VARCHAR(191) NOT NULL,
    `tanggalKegiatan` DATETIME(3) NOT NULL,
    `surat` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
