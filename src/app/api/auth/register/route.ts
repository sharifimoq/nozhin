import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

// وقتی کاربر فرم ثبت‌نام رو پر می‌کنه، این تابع اجرا میشه
export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  // چک می‌کنیم همه فیلدها پر شده باشن
  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "همه فیلدها رو پر کن" },
      { status: 400 }
    );
  }

  // چک می‌کنیم این ایمیل قبلاً ثبت نشده باشه
  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    return NextResponse.json(
      { error: "این ایمیل قبلاً ثبت شده" },
      { status: 400 }
    );
  }

  // رمز رو hash می‌کنیم — هیچوقت رمز خام ذخیره نمی‌کنیم
  const hashedPassword = await bcrypt.hash(password, 10);

  // کاربر جدید رو توی دیتابیس ذخیره می‌کنیم
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return NextResponse.json(
    { message: "ثبت‌نام موفق!", userId: user.id },
    { status: 201 }
  );
}