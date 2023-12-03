import { NextRequest, NextResponse } from "next/server";
import type { BookingVilla, Villa } from "@prisma/client";
import { prisma } from "@/lib/prisma";
export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const body: Villa = await request.json();
  const villa = await prisma.villa.update({
    where: {
      id: params.id,
    },
    data: {
      nama: body.nama,
      deskripsi: body.deskripsi,
      hargaPerMalam: body.hargaPerMalam,
      gambar: body.gambar,
      ketersediaan: body.ketersediaan,
    },
  });
  return NextResponse.json(villa, { status: 200 });
};
export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  console.log(params.id)
  await prisma.villa.delete({
    where: {
      id: params.id,
    }
  });
  return NextResponse.json({ status: 200 });
};


export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const villa = await prisma.villa.findUnique({
    where: {
      id: params.id,
    },
  });
  return NextResponse.json(villa, { status: 200 });
};
