import { NextRequest, NextResponse } from "next/server";
import type { Merchandise } from "@prisma/client";
import { prisma } from "@/lib/prisma";
export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const body: Merchandise = await request.json();
  const merch = await prisma.merchandise.update({
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
  return NextResponse.json(merch, { status: 200 });
};
export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  await prisma.merchandise.delete({
    where: {
      id: params.id,
    },
  });
  return NextResponse.json({ status: 200 });
};
