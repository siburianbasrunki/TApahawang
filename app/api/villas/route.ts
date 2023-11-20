import { NextRequest, NextResponse } from "next/server";
import type { Villa } from "@prisma/client";
import { prisma } from "@/lib/prisma";
export const POST = async (request: Request) => {
  const body: Villa = await request.json();
  const villa = await prisma.villa.create({
    data: {
      nama: body.nama,
      deskripsi: body.deskripsi,
      hargaPerMalam: body.hargaPerMalam,
      gambar: body.gambar,
      ketersediaan: body.ketersediaan,
    },
  });
  return NextResponse.json(villa);
};


export const GET = async (req:NextRequest ) =>{
  const villas = await prisma.villa.findMany({})
  return NextResponse.json({villas})
}