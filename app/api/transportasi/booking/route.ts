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
          validasiPembayaran : body.validasiPembayaran,
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

export const PUT = async (request: Request) => {
  try {
    const body = await request.json();

    const { id, isValid } = body;

    const isPaymentValid = isValid === "Valid";

    await prisma.bookingTransportasiLaut.update({
      where: { id: id },
      data: { validasiPembayaran: isPaymentValid },
    });

    return NextResponse.json({
      message: "Validation status updated successfully",
    });
  } catch (error) {
    console.error("Error updating validation status:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
