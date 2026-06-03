import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // چک می‌کنیم کاربر لاگین کرده یا نه
  const session = await getServerSession();

  // اگه لاگین نکرده، روتین رو ذخیره نمی‌کنیم — ایرادی نداره
  if (!session?.user?.email) {
    return NextResponse.json({ message: "لاگین نیست" }, { status: 200 });
  }

  const { answers, result } = await req.json();

  // کاربر رو پیدا می‌کنیم
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ message: "کاربر پیدا نشد" }, { status: 200 });
  }

  // روتین رو توی دیتابیس ذخیره می‌کنیم
  await prisma.routine.create({
    data: {
      userId: user.id,
      answers: JSON.stringify(answers),
      result,
    },
  });

  return NextResponse.json({ message: "روتین ذخیره شد" });
}