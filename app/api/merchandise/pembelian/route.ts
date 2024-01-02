import { NextRequest, NextResponse } from "next/server";
import type { Pembelian } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const POST = async (request: Request) => {
  try {
    const body: Pembelian = await request.json();

    const Pembelian = await prisma.pembelian.create({
      data: {
        merchandiseId: body.merchandiseId,
        userId: body.userId,
        tanggalPembelian: body.tanggalPembelian + "T00:00:00.000Z",
        Alamat: body.Alamat,
        jumlahBarang: body.jumlahBarang,
        totalHarga: body.totalHarga,
        noTelepon: body.noTelepon,
        buktiTranfer: body.buktiTranfer,
        nama: body.nama
      },
    });

    return NextResponse.json(Pembelian);
  } catch (error) {
    console.error("Error creating merch pembelian:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export const GET = async (req: NextRequest) => {
  const pembelians = await prisma.pembelian.findMany({});
  return NextResponse.json({ pembelians });
};
