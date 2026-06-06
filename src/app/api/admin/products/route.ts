import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// افزودن محصول جدید
export async function POST(req: Request) {
  const { name, description, price, category, stock, image } = await req.json();

  const product = await prisma.product.create({
    data: { name, description, price, category, stock, image },
  });

  return NextResponse.json(product);
}