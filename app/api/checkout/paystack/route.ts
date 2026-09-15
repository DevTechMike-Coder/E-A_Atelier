import { NextRequest, NextResponse } from "next/server";
import { initializePaystackTransaction } from "@/lib/payment";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, amountNGN, orderId } = body;

    if (!email || !amountNGN || !orderId) {
      return NextResponse.json(
        { ok: false, error: "Missing required checkout parameters." },
        { status: 400 }
      );
    }

    const host = req.headers.get("host") || "localhost:3000";
    const protocol = host.includes("localhost") ? "http" : "https";
    const callbackUrl = `${protocol}://${host}/checkout/callback`;

    const result = await initializePaystackTransaction({
      email,
      amountNGN,
      orderId,
      callbackUrl,
    });

    if (!result.ok) {
      return NextResponse.json({ ok: false, error: result.error }, { status: 500 });
    }

    return NextResponse.json(result);
  } catch (err: unknown) {
    console.error("Paystack checkout route error:", err);
    return NextResponse.json(
      { ok: false, error: "Internal payment processing error." },
      { status: 500 }
    );
  }
}
