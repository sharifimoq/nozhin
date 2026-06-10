import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const orders = await prisma.order.findMany({
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(orders);
}

export async function POST(req: Request) {
  const { name, email, mobile, address, total, items, refId } = await req.json();

  const order = await prisma.order.create({
    data: {
      name,
      email,
      mobile,
      address,
      total,
      refId,
      status: "paid",
      items: {
        create: items.map((item: {
          id: string;
          name: string;
          price: number;
          quantity: number;
        }) => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
      },
    },
  });

  return NextResponse.json(order);
}