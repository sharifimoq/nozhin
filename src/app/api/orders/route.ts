import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const orders = await prisma.order.findMany({
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(orders);
}

export async function PATCH(req: Request) {
  const { id, status } = await req.json();
  const order = await prisma.order.update({ where: { id }, data: { status } });
  return NextResponse.json(order);
}

export async function POST(req: Request) {
  const { name, email, mobile, address, total, items, refId, couponCode } = await req.json();

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

  if (couponCode) {
    await prisma.coupon.updateMany({
      where: { code: couponCode.toUpperCase(), active: true },
      data: { usedCount: { increment: 1 } },
    });
  }

  return NextResponse.json(order);
}