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
