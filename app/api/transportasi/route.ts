import { NextRequest, NextResponse } from "next/server";
import type { TransportasiLaut } from "@prisma/client";
import { prisma } from "@/lib/prisma";
export const POST = async (request: Request) => {
  const body: TransportasiLaut = await request.json();
  const transportasi = await prisma.transportasiLaut.create({
    data: {
      nama: body.nama,
      deskripsi: body.deskripsi,
      harga: body.harga,
      gambar: body.gambar,
      ketersediaan: body.ketersediaan,
    },
  });
  return NextResponse.json(transportasi);
};
export const GET = async (req:NextRequest ) =>{
  const transportasis = await prisma.transportasiLaut.findMany({})
  return NextResponse.json({transportasis})
}