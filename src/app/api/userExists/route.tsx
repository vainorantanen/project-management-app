
import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  try {
    const { email } = await req.json();
    const user = await prisma.user.findUnique({ where: { email }})

    if (!user) {
      return NextResponse.json({ userExists: false });
    } else {
      return NextResponse.json({ userExists: true });
    }
  } catch (error) {
    console.log(error);
  }
}