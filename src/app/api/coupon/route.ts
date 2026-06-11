import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "admin@nozhin.ir";

export async function POST(req: Request) {
  const { code, total } = await req.json();

  const coupon = await prisma.coupon.findUnique({ where: { code: code.trim().toUpperCase() } });

  if (!coupon || !coupon.active) {
    return NextResponse.json({ error: "کد تخفیف معتبر نیست" }, { status: 400 });
  }
  if (coupon.usedCount >= coupon.maxUses) {
    return NextResponse.json({ error: "ظرفیت این کد تخفیف تمام شده" }, { status: 400 });
  }

  const discount = coupon.type === "percent"
    ? Math.floor(total * coupon.discount / 100)
    : Math.min(coupon.discount, total);

  return NextResponse.json({ discount, code: coupon.code, label: `${coupon.discount}${coupon.type === "percent" ? "٪" : " تومان"} تخفیف` });
}

// ادمین: لیست کوپن‌ها
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.email !== ADMIN_EMAIL) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const coupons = await prisma.coupon.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(coupons);
}

// ادمین: ساخت کوپن جدید
export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.email !== ADMIN_EMAIL) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { code, discount, type, maxUses } = await req.json();
  const coupon = await prisma.coupon.create({
    data: { code: code.trim().toUpperCase(), discount: parseInt(discount), type, maxUses: parseInt(maxUses) || 100 },
  });
  return NextResponse.json(coupon);
}

// ادمین: غیرفعال کردن
export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.email !== ADMIN_EMAIL) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await req.json();
  await prisma.coupon.update({ where: { id }, data: { active: false } });
  return NextResponse.json({ ok: true });
}
