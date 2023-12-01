import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  console.log(body);
  const donasis = await prisma.donasi.findMany({
    where: {
      userId: body.userId,
    },
    select: {
      id: true,
      gambar: true,
      terumbuKarangId: true,
      jumlahDonasi: true,
      buktiPembayaran: true,
      nomortelepon: true,
      tanggalDonasi: true,
      userId: true,
      terumbuKarang: true,
    },
  });
  return NextResponse.json({ donasis });
};
