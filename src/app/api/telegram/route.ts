import { NextRequest, NextResponse } from "next/server";
import bot from "@/bot/index";

export async function POST(req: NextRequest) {
  if (!bot) {
    return NextResponse.json({ ok: false, error: "Bot not configured" }, { status: 503 });
  }
  try {
    const body = await req.json();
    await bot.handleUpdate(body);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Telegram webhook error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
