// import module twilio
const accountSid = "AC0348070fe97afe239d512048a0d9bffe";
const authToken = "d7f1baea867fe2db11e4cd2025eb2dea";
const client = require('twilio')(accountSid, authToken);

// import prisma
import { NextRequest, NextResponse } from "next/server";
import type { BookingVilla } from "@prisma/client";
import { prisma } from "@/lib/prisma";

// fungsi untuk mengirim pesan WhatsApp
export const sendWhatsAppMessage = async (to: string, message: string) => {
  try {
    await client.messages.create({
      body: message,
      from: "whatsapp:+14155238886",
      to: `whatsapp:${to}`,
    });
    console.log("Pesan WhatsApp berhasil dikirim.");
  } catch (error) { 
    console.error("Error saat mengirim pesan WhatsApp:", error);
  }
};

// POST endpoint
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

    await sendWhatsAppMessage("+6282277611415", "Ada Pemesanan Villa cek website");
    
    return NextResponse.json(bookingVilla);
  } catch (error) {
    console.error("Error creating villa booking:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

// GET endpoint
export const GET = async (req: NextRequest) => {
  const bookings = await prisma.bookingVilla.findMany({});
  return NextResponse.json({ bookings });
};

// PUT endpoint
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
