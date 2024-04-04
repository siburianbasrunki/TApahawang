-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Villa" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "hargaPerMalam" DOUBLE PRECISION NOT NULL,
    "gambar" TEXT NOT NULL,
    "ketersediaan" INTEGER NOT NULL,

    CONSTRAINT "Villa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransportasiLaut" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "harga" DOUBLE PRECISION NOT NULL,
    "gambar" TEXT NOT NULL,
    "ketersediaan" INTEGER NOT NULL,

    CONSTRAINT "TransportasiLaut_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Paket" (
    "id" TEXT NOT NULL,
    "namaPaket" TEXT NOT NULL,
    "asalKomunitas" TEXT NOT NULL,
    "nomorTelepon" TEXT NOT NULL,
    "gambarPaket" TEXT NOT NULL,

    CONSTRAINT "Paket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Merchandise" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "harga" DOUBLE PRECISION NOT NULL,
    "gambar" TEXT NOT NULL,
    "ketersediaan" INTEGER NOT NULL,
    "noTelepon" TEXT NOT NULL,

    CONSTRAINT "Merchandise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookingVilla" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "villaId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tanggalCheckin" TIMESTAMP(3) NOT NULL,
    "tanggalCheckout" TIMESTAMP(3) NOT NULL,
    "bukti" TEXT NOT NULL,
    "totalbayar" TEXT NOT NULL,
    "validasiPembayaran" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "BookingVilla_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookingTransportasiLaut" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "transportasiId" TEXT NOT NULL,
    "tanggalCheckin" TIMESTAMP(3) NOT NULL,
    "nama" TEXT NOT NULL,
    "noTelepon" TEXT NOT NULL,
    "jumlahPenumpang" INTEGER NOT NULL,
    "buktiTranfer" TEXT NOT NULL,
    "validasiPembayaran" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "BookingTransportasiLaut_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TerumbuKarang" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "gambar" TEXT NOT NULL,

    CONSTRAINT "TerumbuKarang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Donasi" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "terumbuKarangId" TEXT NOT NULL,
    "jumlahDonasi" TEXT NOT NULL,
    "tanggalDonasi" TEXT NOT NULL,
    "buktiPembayaran" TEXT NOT NULL,
    "nomortelepon" TEXT NOT NULL,
    "gambar" TEXT NOT NULL,

    CONSTRAINT "Donasi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pembelian" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "merchandiseId" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "jumlahBarang" INTEGER NOT NULL,
    "Alamat" TEXT NOT NULL,
    "totalHarga" INTEGER NOT NULL,
    "buktiTranfer" TEXT NOT NULL,
    "noTelepon" TEXT NOT NULL,
    "tanggalPembelian" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pembelian_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Volunteer" (
    "id" TEXT NOT NULL,
    "namaOrganisasi" TEXT NOT NULL,
    "asal" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "noTelepon" TEXT NOT NULL,
    "surat" TEXT NOT NULL,

    CONSTRAINT "Volunteer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Galery" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "gambar" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Galery_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
