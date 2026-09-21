"use server";

import { prisma } from "@/lib/prisma";

export async function subscribeToNewsletter(email: string, source: string = "footer") {
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedEmail || !normalizedEmail.includes("@")) {
    return { ok: false as const, success: false as const, error: "Please provide a valid correspondence email." };
  }

  try {
    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email: normalizedEmail },
    });

    if (existing) {
      return { ok: true as const, success: true as const, message: "Your email is already preserved in the atelier register." };
    }

    await prisma.newsletterSubscriber.create({
      data: {
        email: normalizedEmail,
        source,
      },
    });

    return { ok: true as const, success: true as const, message: "Merci. You are entered into the Atelier register." };
  } catch (err: unknown) {
    console.error("Newsletter subscription error:", err);
    return { ok: false as const, success: false as const, error: "Failed to record your correspondence in the register." };
  }
}
