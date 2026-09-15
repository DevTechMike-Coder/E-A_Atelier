"use server";

import { prisma } from "@/lib/prisma";

export interface BespokeSubmission {
  name: string;
  email: string;
  palette: string;
  notes: string;
  productName?: string | null;
}

export async function submitBespokeCommission(data: BespokeSubmission) {
  if (!data.name.trim() || !data.email.trim()) {
    return { ok: false as const, error: "Name and email are required." };
  }

  const commission = await prisma.bespokeCommission.create({
    data: {
      name: data.name.trim(),
      email: data.email.trim(),
      palette: data.palette,
      notes: data.notes || null,
      productName: data.productName || null,
    },
  });

  return { ok: true as const, referenceCode: commission.referenceCode };
}