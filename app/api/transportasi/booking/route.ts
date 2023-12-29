import { NextRequest, NextResponse } from "next/server";
import type { BookingTransportasiLaut } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const POST = async (request: Request) => {
  try {
    const body: BookingTransportasiLaut = await request.json();

    const bookingTransportasiLaut = await prisma.bookingTransportasiLaut.create(
      {
        data: {
          transportasiId: body.transportasiId,
          jumlahPenumpang: body.jumlahPenumpang,
          tanggalCheckin: body.tanggalCheckin + "T00:00:00.000Z",
          userId: body.userId,
          buktiTranfer: body.buktiTranfer,
          nama: body.nama,
          noTelepon : body.noTelepon,
        },
      }
    );

    return NextResponse.json(bookingTransportasiLaut);
  } catch (error) {
    console.error("Error creating Tranportasi booking:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export const GET = async (req: NextRequest) => {
  const bookings = await prisma.bookingTransportasiLaut.findMany({});
  return NextResponse.json({ bookings });
};
