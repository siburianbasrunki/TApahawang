import { NextRequest, NextResponse } from "next/server";
import type { Galery } from "@prisma/client";
import { prisma } from "@/lib/prisma";
export const POST = async (request: Request) => {
  const body: Galery = await request.json();
  const galeries = await prisma.galery.create({
    data: {
      title: body.title,
      deskripsi: body.deskripsi,
      gambar: body.gambar,
      tanggal: body.tanggal,
    },
  });
  return NextResponse.json(galeries);
};

export const GET = async (req: NextRequest) => {
  const galeries = await prisma.galery.findMany({});
  return NextResponse.json({ galeries });
};
