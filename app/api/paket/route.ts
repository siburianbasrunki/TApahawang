import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { Paket } from "@prisma/client";
export const POST = async (request: Request) => {
  const body: Paket = await request.json();
  const villa = await prisma.paket.create({
    data: {
      namaPaket: body.namaPaket,
      asalKomunitas: body.asalKomunitas,
      nomorTelepon: body.nomorTelepon,
      gambarPaket: body.gambarPaket,
    },
  });
  return NextResponse.json(villa);
};

export const GET = async (req: NextRequest) => {
  const pakets = await prisma.paket.findMany({});
  return NextResponse.json({ pakets });
};
