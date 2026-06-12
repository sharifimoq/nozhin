import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  return NextResponse.json({
    session,
    adminEmail: process.env.ADMIN_EMAIL ?? "NOT SET",
    isAdmin: session?.user?.email === (process.env.ADMIN_EMAIL ?? "admin@nozhin.ir"),
  });
}
