import axios from "axios";
import { NextResponse } from "next/server";

const isSandbox = process.env.ZARINPAL_SANDBOX === "true";
const ZARINPAL_URL = isSandbox
  ? "https://sandbox.zarinpal.com/pg/v4/payment/request.json"
  : "https://api.zarinpal.com/pg/v4/payment/request.json";
const GATEWAY_URL = isSandbox
  ? "https://sandbox.zarinpal.com/pg/StartPay"
  : "https://www.zarinpal.com/pg/StartPay";

export async function POST(req: Request) {
  const { amount, description, email, mobile } = await req.json();

  try {
    const response = await axios.post(ZARINPAL_URL, {
      merchant_id: process.env.ZARINPAL_MERCHANT_ID,
      amount: amount * 10,
      description,
      email,
      mobile,
      callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/verify?amount=${amount}`,
    });

    const { code, authority } = response.data.data;

    if (code === 100) {
      return NextResponse.json({
        url: `${GATEWAY_URL}/${authority}`,
        authority,
      });
    }

    return NextResponse.json({ error: "خطا در ایجاد پرداخت" }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "خطا در اتصال به زرین‌پال" }, { status: 500 });
  }
}
