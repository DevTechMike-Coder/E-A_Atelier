"use server";

import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "./adminAuth";

export interface PatronOrderData {
  id: string;
  subtotalUSD: number;
  status: string;
  currency: string;
  createdAt: string;
  itemsCount: number;
}

export interface PatronRecord {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  memberNumber: string | null;
  fiberSensitivities: string | null;
  silhouetteDimensions: string | null;
  dyePreferences: string | null;
  phone: string | null;
  city: string | null;
  country: string | null;
  createdAt: string;
  orders: PatronOrderData[];
  commissionsCount: number;
  totalSpentUSD: number;
}

export async function getAdminPatrons(): Promise<PatronRecord[]> {
  if (!(await isAdminAuthenticated())) {
    throw new Error("Unauthorized atelier session");
  }

  const patrons = await prisma.user.findMany({
    where: { role: "PATRON" },
    orderBy: { createdAt: "desc" },
  });

  // For each patron, fetch their orders and commissions count
  const results = await Promise.all(
    patrons.map(async (p) => {
      const [orders, commissionsCount] = await Promise.all([
        prisma.order.findMany({
          where: { customerEmail: p.email },
          include: { items: true },
          orderBy: { createdAt: "desc" },
        }),
        prisma.bespokeCommission.count({
          where: { email: p.email },
        }),
      ]);

      const totalSpentUSD = orders
        .filter((o) => o.status === "PAID" || o.status === "FULFILLED")
        .reduce((sum, o) => sum + Number(o.subtotalUSD), 0);

      return {
        id: p.id,
        email: p.email,
        name: p.name,
        avatarUrl: p.avatarUrl,
        memberNumber: p.memberNumber,
        fiberSensitivities: p.fiberSensitivities,
        silhouetteDimensions: p.silhouetteDimensions,
        dyePreferences: p.dyePreferences,
        phone: p.phone,
        city: p.city,
        country: p.country,
        createdAt: p.createdAt.toISOString(),
        orders: orders.map((o) => ({
          id: o.id,
          subtotalUSD: Number(o.subtotalUSD),
          status: o.status,
          currency: o.currency,
          createdAt: o.createdAt.toISOString(),
          itemsCount: o.items.reduce((s, i) => s + i.quantity, 0),
        })),
        commissionsCount,
        totalSpentUSD,
      };
    })
  );

  return results;
}
