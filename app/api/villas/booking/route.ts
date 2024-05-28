import { NextRequest, NextResponse } from "next/server";
import type { BookingVilla } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const accountSid = "AC0348070fe97afe239d512048a0d9bffe";
const authToken = "623da7a6a4f51afb5abb3e61657d82c7";
const client = require("twilio")(accountSid, authToken);

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

    await sendWhatsAppMessage(
      "+6282277611415",
      `🏡 *Pesanan Villa Baru!* 🏡

      Villa ID: ${body.villaId.slice(0, 8)}
      Nama Pemesan: ${body.name}
      Tanggal Check-in: ${body.tanggalCheckin}
      Tanggal Check-out: ${body.tanggalCheckout}
      Total Bayar: ${body.totalbayar.toLocaleString()}
      
      🔗 Cek detail dan Validasi Pembayaran pesanan di website: pulaupahawang.id/Admin
      
      Terima kasih telah mempercayakan layanan kami!`
    );

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
