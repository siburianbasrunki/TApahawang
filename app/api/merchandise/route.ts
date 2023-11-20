import { NextRequest, NextResponse } from "next/server";
import type { Merchandise } from "@prisma/client";
import { prisma } from "@/lib/prisma";
export const POST = async (request: Request) => {
  const body: Merchandise = await request.json();
  const merch = await prisma.merchandise.create({
    data: {
      nama: body.nama,
      deskripsi: body.deskripsi,
      harga: body.harga,
      gambar: body.gambar,
      ketersediaan: body.ketersediaan,
    },
  });
  return NextResponse.json(merch);
};
export const GET = async (req:NextRequest ) =>{
  const merchs = await prisma.merchandise.findMany({})
  return NextResponse.json({merchs})
}