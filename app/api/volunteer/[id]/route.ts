import { NextRequest, NextResponse } from "next/server";

import type { Volunteer } from "@prisma/client";
import { prisma } from "@/lib/prisma";
export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const body: Volunteer = await request.json();
  const volunteer = await prisma.volunteer.update({
    where: {
      id: params.id,
    },
    data: {
      namaOrganisasi: body.namaOrganisasi,
      asal: body.asal,
      email: body.email,
      noTelepon: body.noTelepon,
      tanggalKegiatan: body.tanggalKegiatan,
      surat: body.surat,
    },
  });
  return NextResponse.json(volunteer, { status: 200 });
};

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const volunteer = await prisma.volunteer.delete({
    where: {
      id: params.id,
    },
  });
  return NextResponse.json(volunteer, { status: 200 });
};
