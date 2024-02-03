import { NextRequest, NextResponse } from "next/server";
import type { Donasi } from "@prisma/client";
import { prisma } from "@/lib/prisma";
export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const body: Donasi = await request.json();
  console.log(body);
  const karang = await prisma.donasi.update({
    where: {
      id: params.id,
    },
    data: {
      gambar: body.gambar,
    },
  });
  return NextResponse.json(karang, { status: 200 });
};

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  await prisma.donasi.delete({
    where: {
      id: params.id,
    },
  });
  return NextResponse.json({ status: 200 });
};
