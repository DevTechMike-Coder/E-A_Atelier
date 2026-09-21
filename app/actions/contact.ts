"use server";

import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export interface ContactSubmissionInput {
  name: string;
  email: string;
  classification: string;
  details: string;
}

export async function submitContactInquiry(data: ContactSubmissionInput) {
  const name = data.name.trim();
  const email = data.email.trim().toLowerCase();
  const classification = data.classification.trim();
  const details = data.details.trim();

  if (!name || !email || !email.includes("@")) {
    return { ok: false as const, success: false as const, error: "Please provide your name and a valid correspondence email." };
  }

  if (!details) {
    return { ok: false as const, success: false as const, error: "Please share details regarding your inquiry or bespoke request." };
  }

  try {
    const referenceCode = `EA-CON-${crypto.randomInt(1000, 9999)}`;

    const inquiry = await prisma.contactInquiry.create({
      data: {
        referenceCode,
        name,
        email,
        classification: classification || "Bespoke Commission",
        details,
      },
    });

    return { ok: true as const, success: true as const, referenceCode: inquiry.referenceCode };
  } catch (err: unknown) {
    console.error("Contact inquiry submission error:", err);
    return { ok: false as const, success: false as const, error: "Failed to transmit inquiry to atelier concierge." };
  }
}
