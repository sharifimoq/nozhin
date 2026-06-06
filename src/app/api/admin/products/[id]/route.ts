import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// حذف محصول
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await prisma.product.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ message: "محصول حذف شد" });
}