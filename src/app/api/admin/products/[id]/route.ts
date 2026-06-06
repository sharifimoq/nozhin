import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  await prisma.product.delete({
    where: { id },
  });

  return NextResponse.json({ message: "محصول حذف شد" });
}