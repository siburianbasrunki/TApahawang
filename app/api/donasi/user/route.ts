import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  console.log(body);
  const donasis = await prisma.donasi.findMany({
    where: {
      userId: body.userId,
    },
  });
  return NextResponse.json({ donasis });
};
