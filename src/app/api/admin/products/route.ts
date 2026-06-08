import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, description, price, category, stock, imageUrl } = await req.json();

  const product = await prisma.product.create({
    data: { name, description, price, category, stock, imageUrl },
  });

  return NextResponse.json(product);
}