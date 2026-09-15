import { prisma } from "./prisma";

export interface InitializePaystackParams {
  email: string;
  amountNGN: number; // in NGN
  orderId: string;
  callbackUrl: string;
}

export async function initializePaystackTransaction({
  email,
  amountNGN,
  orderId,
  callbackUrl,
}: InitializePaystackParams) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;

  // Fallback to simulated checkout if key is not configured in local environment
  if (!secretKey || secretKey.trim() === "" || secretKey.includes("your_paystack_secret_key")) {
    return {
      ok: true as const,
      simulated: true,
      authorization_url: `${callbackUrl}?reference=sim_${Date.now()}&orderId=${orderId}`,
      reference: `sim_${Date.now()}`,
    };
  }

  try {
    const amountKobo = Math.round(amountNGN * 100);

    const res = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: amountKobo,
        reference: `EA_${orderId.slice(-8)}_${Date.now()}`,
        callback_url: callbackUrl,
        metadata: {
          orderId,
          source: "ea-atelier-web",
        },
      }),
    });

    const data = await res.json();

    if (!res.ok || !data.status) {
      return {
        ok: false as const,
        error: data.message || "Paystack initialization failed.",
      };
    }

    return {
      ok: true as const,
      simulated: false,
      authorization_url: data.data.authorization_url as string,
      reference: data.data.reference as string,
    };
  } catch (err: unknown) {
    console.error("Paystack API error:", err);
    return {
      ok: false as const,
      error: "Unable to communicate with Paystack payment gateway.",
    };
  }
}

export async function verifyPaystackTransaction(reference: string, orderId: string) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;

  // If simulation reference
  if (reference.startsWith("sim_") || !secretKey) {
    await prisma.order.update({
      where: { id: orderId },
      data: { status: "PAID" },
    });
    return { ok: true, paid: true, simulated: true };
  }

  try {
    const res = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${secretKey}`,
      },
    });

    const data = await res.json();

    if (res.ok && data.status && data.data.status === "success") {
      await prisma.order.update({
        where: { id: orderId },
        data: { status: "PAID" },
      });
      return { ok: true, paid: true };
    }

    return { ok: false, paid: false, error: data.message || "Payment verification incomplete." };
  } catch (err: unknown) {
    console.error("Verification error:", err);
    return { ok: false, paid: false, error: "Network error verifying payment." };
  }
}
