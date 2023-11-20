import { NextRequest, NextResponse } from "next/server";
import type { TerumbuKarang } from "@prisma/client";
import { prisma } from "@/lib/prisma";
export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const body: TerumbuKarang = await request.json();
  const karang = await prisma.terumbuKarang.update({
    where: {
      id:params.id,
    },
    data: {
      nama: body.nama,
      deskripsi: body.deskripsi,
    },
  });
  return NextResponse.json(karang, { status: 200 });
};
export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const karang = await prisma.terumbuKarang.delete({
    where: {
      id: params.id,
    },
  });
  return NextResponse.json(karang, { status: 200 });
};
