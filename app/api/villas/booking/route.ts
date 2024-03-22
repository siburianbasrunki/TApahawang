import { NextRequest, NextResponse } from "next/server";
import type { BookingVilla } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const POST = async (request: Request) => {
  try {
    const body: BookingVilla = await request.json();

    const bookingVilla = await prisma.bookingVilla.create({
      data: {
        villaId: body.villaId,
        tanggalCheckin: body.tanggalCheckin + "T00:00:00.000Z",
        tanggalCheckout: body.tanggalCheckout + "T00:00:00.000Z",
        bukti: body.bukti,
        userId: body.userId,
        name: body.name,
        totalbayar: body.totalbayar,
        validasiPembayaran: body.validasiPembayaran,
      },
    });

    return NextResponse.json(bookingVilla);
  } catch (error) {
    console.error("Error creating villa booking:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export const GET = async (req: NextRequest) => {
  const bookings = await prisma.bookingVilla.findMany({});
  return NextResponse.json({ bookings });
};

export const PUT = async (request: Request) => {
  try {
    const body = await request.json();

    const { id, isValid } = body;

    const isPaymentValid = isValid === "Valid";

    await prisma.bookingVilla.update({
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
