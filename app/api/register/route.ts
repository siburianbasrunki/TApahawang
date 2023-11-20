import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function GET(req:NextRequest) {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}
export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();
    const hash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hash,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { status: error, message: error.message },
        { status: 500 }
      );
    }
  }
}
