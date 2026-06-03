import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

// وقتی کاربر فرم لاگین رو پر می‌کنه، این تابع اجرا میشه
export async function POST(req: Request) {
  const { email, password } = await req.json();

  // چک می‌کنیم همه فیلدها پر شده باشن
  if (!email || !password) {
    return NextResponse.json(
      { error: "ایمیل و رمز رو وارد کن" },
      { status: 400 }
    );
  }

  // کاربر رو توی دیتابیس پیدا می‌کنیم
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return NextResponse.json(
      { error: "ایمیل یا رمز اشتباهه" },
      { status: 401 }
    );
  }

  // رمز وارد شده رو با رمز hash شده توی دیتابیس مقایسه می‌کنیم
  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    return NextResponse.json(
      { error: "ایمیل یا رمز اشتباهه" },
      { status: 401 }
    );
  }

  // لاگین موفق — اطلاعات کاربر رو برمی‌گردونیم
  // (رمز رو برنمی‌گردونیم — امنیته!)
  return NextResponse.json({
    message: "خوش اومدی!",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
}