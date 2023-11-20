import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import type { TerumbuKarang } from "@prisma/client";

export const POST = async (request: Request) => {
  const body: TerumbuKarang = await request.json();
  const karang = await prisma.terumbuKarang.create({
    data: {
      nama: body.nama,
      deskripsi: body.deskripsi,
    },
  });
  return NextResponse.json(karang);
};
