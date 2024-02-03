import { NextRequest, NextResponse } from "next/server";
import type { Paket } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const body: Paket = await request.json();
  const villa = await prisma.paket.update({
    where: {
      id: params.id,
    },
    data: {
        namaPaket:body.namaPaket,
        asalKomunitas:body.asalKomunitas,
        gambarPaket:body.gambarPaket,
        nomorTelepon:body.nomorTelepon
    },
  });
  return NextResponse.json(villa, { status: 200 });
};
export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  console.log(params.id);
  await prisma.paket.delete({
    where: {
      id: params.id,
    },
  });
  return NextResponse.json({ status: 200 });
};
