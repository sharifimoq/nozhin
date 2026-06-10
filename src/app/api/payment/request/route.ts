import axios from "axios";
import { NextResponse } from "next/server";

// آدرس sandbox زرین‌پال برای تست
const ZARINPAL_URL = "https://sandbox.zarinpal.com/pg/v4/payment/request.json";

export async function POST(req: Request) {
  const { amount, description, email, mobile } = await req.json();

  try {
    // درخواست پرداخت به زرین‌پال می‌فرستیم
    const response = await axios.post(ZARINPAL_URL, {
      merchant_id: process.env.ZARINPAL_MERCHANT_ID,
      amount: amount * 10, // تومان به ریال تبدیل می‌کنیم
      description,
      email,
      mobile,
      callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/verify?amount=${amount}`,
    });

    const { code, authority } = response.data.data;

    if (code === 100) {
      // لینک پرداخت رو برمی‌گردونیم
      return NextResponse.json({
        url: `https://sandbox.zarinpal.com/pg/StartPay/${authority}`,
        authority,
      });
    }

    return NextResponse.json(
      { error: "خطا در ایجاد پرداخت" },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "خطا در اتصال به زرین‌پال" },
      { status: 500 }
    );
  }
}