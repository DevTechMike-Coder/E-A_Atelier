import { NextRequest, NextResponse } from "next/server";
import { verifyPaystackTransaction } from "@/lib/payment";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { reference, orderId } = body;

    if (!reference || !orderId) {
      return NextResponse.json(
        { ok: false, error: "Reference and Order ID are required." },
        { status: 400 }
      );
    }

    const result = await verifyPaystackTransaction(reference, orderId);
    return NextResponse.json(result);
  } catch (err: unknown) {
    console.error("Verification route error:", err);
    return NextResponse.json(
      { ok: false, error: "Payment verification failed." },
      { status: 500 }
    );
  }
}
