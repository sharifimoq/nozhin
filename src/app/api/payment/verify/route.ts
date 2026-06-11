import axios from "axios";
import { NextResponse } from "next/server";

const isSandbox = process.env.ZARINPAL_SANDBOX === "true";
const ZARINPAL_VERIFY_URL = isSandbox
  ? "https://sandbox.zarinpal.com/pg/v4/payment/verify.json"
  : "https://api.zarinpal.com/pg/v4/payment/verify.json";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const authority = searchParams.get("Authority");
  const status = searchParams.get("Status");

  if (status !== "OK") {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/checkout?status=failed`
    );
  }

  try {
    const response = await axios.post(ZARINPAL_VERIFY_URL, {
      merchant_id: process.env.ZARINPAL_MERCHANT_ID,
      amount: parseInt(searchParams.get("amount") || "0") * 10,
      authority,
    });

    const { code, ref_id } = response.data.data;

    if (code === 100 || code === 101) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/checkout?status=success&ref_id=${ref_id}`
      );
    }

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/checkout?status=failed`
    );
  } catch {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/checkout?status=failed`
    );
  }
}
