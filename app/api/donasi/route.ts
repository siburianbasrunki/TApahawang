import { NextRequest, NextResponse } from "next/server";
import type { Donasi } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const POST = async (request: Request) => {
  const body: Donasi = await request.json();
  const donasi = await prisma.donasi.create({
    data: {
      id: body.id,
      userId: body.userId,
      terumbuKarangId: body.terumbuKarangId,
      jumlahDonasi: body.jumlahDonasi,
      tanggalDonasi: body.tanggalDonasi,
      buktiPembayaran:body.buktiPembayaran,
      nomortelepon:body.nomortelepon
    },
  });
  return NextResponse.json(donasi);
};

export const GET = async (req: NextRequest) => {
  const donasis = await prisma.donasi.findMany({});
  return NextResponse.json({ donasis });
};