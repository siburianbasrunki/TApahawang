import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  console.log(body);
  const botransportasi = await prisma.bookingTransportasiLaut.findMany({
    where: {
      userId: body.userId,
    },
    select: {
      id: true,
      transportasiId:true,
      jumlahPenumpang: true,
      tanggalCheckin: true,
      nama: true,
      validasiPembayaran: true
    },
  });
  return NextResponse.json({botransportasi})
};
