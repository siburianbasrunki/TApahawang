import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  console.log(body);
  const bovillas = await prisma.bookingVilla.findMany({
    where: {
      userId: body.userId,
    },
    select: {
      id: true,
      villaId: true,
      tanggalCheckin: true,
      tanggalCheckout: true,
      userId: true,
      validasiPembayaran: true,
    },
  });
  return NextResponse.json({ bovillas });
};
