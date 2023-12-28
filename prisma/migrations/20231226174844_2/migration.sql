-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Villa` (
    `id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `deskripsi` VARCHAR(191) NOT NULL,
    `hargaPerMalam` DOUBLE NOT NULL,
    `gambar` VARCHAR(191) NOT NULL,
    `ketersediaan` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TransportasiLaut` (
    `id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `deskripsi` VARCHAR(191) NOT NULL,
    `harga` DOUBLE NOT NULL,
    `gambar` VARCHAR(191) NOT NULL,
    `ketersediaan` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Paket` (
    `id` VARCHAR(191) NOT NULL,
    `namaPaket` VARCHAR(191) NOT NULL,
    `asalKomunitas` VARCHAR(191) NOT NULL,
    `nomorTelepon` VARCHAR(191) NOT NULL,
    `gambarPaket` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Merchandise` (
    `id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `deskripsi` VARCHAR(191) NOT NULL,
    `harga` DOUBLE NOT NULL,
    `gambar` VARCHAR(191) NOT NULL,
    `ketersediaan` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BookingVilla` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `villaId` VARCHAR(191) NOT NULL,
    `tanggalCheckin` DATETIME(3) NOT NULL,
    `tanggalCheckout` DATETIME(3) NOT NULL,
    `bukti` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BookingTransportasiLaut` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `transportasiId` VARCHAR(191) NOT NULL,
    `tanggalCheckin` DATETIME(3) NOT NULL,
    `jumlahPenumpang` INTEGER NOT NULL,
    `totalHarga` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TerumbuKarang` (
    `id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `deskripsi` VARCHAR(191) NOT NULL,
    `gambar` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Donasi` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `terumbuKarangId` VARCHAR(191) NOT NULL,
    `jumlahDonasi` VARCHAR(191) NOT NULL,
    `tanggalDonasi` VARCHAR(191) NOT NULL,
    `buktiPembayaran` VARCHAR(191) NOT NULL,
    `nomortelepon` VARCHAR(191) NOT NULL,
    `gambar` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pembelian` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `merchandiseId` VARCHAR(191) NOT NULL,
    `jumlahBarang` INTEGER NOT NULL,
    `totalHarga` DOUBLE NOT NULL,
    `tanggalPembelian` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Volunteer` (
    `id` VARCHAR(191) NOT NULL,
    `namaOrganisasi` VARCHAR(191) NOT NULL,
    `asal` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `noTelepon` VARCHAR(191) NOT NULL,
    `surat` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Galery` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `deskripsi` VARCHAR(191) NOT NULL,
    `gambar` VARCHAR(191) NOT NULL,
    `tanggal` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
