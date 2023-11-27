import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import type { TransportasiLaut } from "@prisma/client";

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const body: TransportasiLaut = await request.json();
  const transportasi = await prisma.transportasiLaut.update({
    where: {
      id:params.id,
    },
    data: {
      nama: body.nama,
      deskripsi: body.deskripsi,
      harga: body.harga,
      gambar: body.gambar,
      ketersediaan: body.ketersediaan,
    },
  });
  return NextResponse.json(transportasi, { status: 200 });
};
export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  await prisma.transportasiLaut.delete({
    where: {
      id: params.id,
    },
  });
  return NextResponse.json({ status: 200 });
};
