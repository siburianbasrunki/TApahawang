import { NextRequest, NextResponse } from "next/server";
import type { Donasi } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const POST = async (request: Request) => {
  const body: Donasi = await request.json();
  const terumbuKarang = await prisma.terumbuKarang.findUnique({
    where: { id: body.terumbuKarangId },
  });
  const donasi = await prisma.donasi.create({
    data: {
      terumbuKarangId: body.terumbuKarangId,
      jumlahDonasi: body.jumlahDonasi,
      buktiPembayaran: body.buktiPembayaran,
      nomortelepon: body.nomortelepon,
      tanggalDonasi: "2023-11-30T00:00:00.000Z",
      userId: body.userId,
      gambar: body.gambar,
    },
  });
  return NextResponse.json(donasi);
};

export const GET = async (req: NextRequest) => {
  const donasis = await prisma.donasi.findMany({});
  return NextResponse.json({ donasis });
};
