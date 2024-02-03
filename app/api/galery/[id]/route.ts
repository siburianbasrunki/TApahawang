import { NextRequest, NextResponse } from "next/server";
import type { Galery } from "@prisma/client";
import { prisma } from "@/lib/prisma";
export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const body: Galery = await request.json();
  const galeries = await prisma.galery.update({
    where: {
      id: params.id,
    },
    data: {
      title:body.title,
      deskripsi:body.deskripsi,
      gambar:body.gambar,
      tanggal:body.tanggal
    },
  });
  return NextResponse.json(galeries, { status: 200 });
};
export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  console.log(params.id)
  await prisma.galery.delete({
    where: {
      id: params.id,
    }
  });
  return NextResponse.json({ status: 200 });
};
