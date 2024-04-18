import { NextRequest, NextResponse } from "next/server";
import type { Donasi } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const POST = async (request: Request) => {
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
  return NextResponse.json(donasi);
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
    console.log("success");
    
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
