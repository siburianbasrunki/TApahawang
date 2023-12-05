import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

import type { Volunteer } from "@prisma/client";


export const POST = async (request: Request) => {
  const body: Volunteer = await request.json();
  const volunteer = await prisma.volunteer.create({
    data: {
      namaOrganisasi: body.namaOrganisasi,
      asal: body.asal,
      email: body.email,
      noTelepon: body.noTelepon,
      surat: body.surat,
    },
  });
  return NextResponse.json(volunteer);
};

export const GET = async (req: NextRequest) => {
  const volunteers = await prisma.volunteer.findMany({});
  return NextResponse.json({ volunteers });
};
