import { NextRequest, NextResponse } from "next/server";
import type { Donasi } from "@prisma/client";
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
    const body: Donasi = await request.json();

    const donasi = await prisma.donasi.create({
      data: {
        terumbuKarangId: body.terumbuKarangId,
        jumlahDonasi: body.jumlahDonasi,
        buktiPembayaran: body.buktiPembayaran,
        nomortelepon: body.nomortelepon,
        tanggalDonasi: "2023-11-30T00:00:00.000Z",
        userId: body.userId,
        gambar: body.gambar,
        validasiPembayaran: body.validasiPembayaran,
      },
    });
    await sendWhatsAppMessage(
      "+6282277611415",
      `🌊 *Donasi Terumbu Karang Baru!* 🌊

      Terumbu Karang ID: ${body.terumbuKarangId.slice(0, 8)}
      Jumlah Donasi: ${body.jumlahDonasi.toLocaleString()}
      Tanggal Donasi: ${new Date("2023-11-30T00:00:00.000Z").toLocaleDateString(
        "id-ID"
      )}
      
      
      🔗 Cek detail dan Validasi Pembayaran pesanan di website: pulaupahawang.id/Admin`
    );
    return NextResponse.json(donasi);
  } catch (error) {
    console.error("Error creating donasi:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export const GET = async (req: NextRequest) => {
  const donasis = await prisma.donasi.findMany({
    select: {
      id: true,
      user: true,
      terumbuKarangId: true,
      jumlahDonasi: true,
      buktiPembayaran: true,
      nomortelepon: true,
      terumbuKarang: true,
      tanggalDonasi: true,
      userId: true,
      gambar: true,
      validasiPembayaran: true,
    },
  });
  return NextResponse.json({ donasis });
};

export const PUT = async (request: Request) => {
  try {
    const body = await request.json();
    const { id, isValid } = body;
    const isPaymentValid = isValid === "Valid";

    await prisma.donasi.update({
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
