import { NextRequest, NextResponse } from "next/server";
import type { BookingTransportasiLaut } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const accountSid = "AC0348070fe97afe239d512048a0d9bffe";
const authToken = "ae39e492e19f2808b761767e1cee15f3";
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
          noTelepon: body.noTelepon,
          validasiPembayaran: body.validasiPembayaran,
        },
      }
    );

    await sendWhatsAppMessage(
      "+6282277611415",
      `🚤 *Pesanan Sewa Kapal !* 🚤

      Transportasi ID: ${body.transportasiId.slice(0, 8)}
      Nama: ${body.nama}
      Jumlah Penumpang: ${body.jumlahPenumpang}
      Tanggal Check-in: ${new Date(
        body.tanggalCheckin + "T00:00:00.000Z"
      ).toLocaleDateString("id-ID")}
      
      
      🔗 Cek detail pesanan dan validasi pembayaran di website: pulaupahawang.id/Admin`
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
