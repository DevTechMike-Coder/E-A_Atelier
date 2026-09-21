"use server";

import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "./adminAuth";
import { revalidatePath } from "next/cache";

export async function getAdminOverviewStats() {
  if (!(await isAdminAuthenticated())) {
    throw new Error("Unauthorized atelier session");
  }

  const [totalOrders, paidOrders, totalCommissions, pendingCommissions, productsCount, recentOrders] =
    await Promise.all([
      prisma.order.count(),
      prisma.order.count({ where: { status: { in: ["PAID", "FULFILLED"] } } }),
      prisma.bespokeCommission.count(),
      prisma.bespokeCommission.count({ where: { status: "PENDING" } }),
      prisma.product.count(),
      prisma.order.findMany({
        take: 6,
        orderBy: { createdAt: "desc" },
        include: {
          items: {
            include: { product: { select: { name: true } } },
          },
        },
      }),
    ]);

  // Aggregate total revenue from paid or fulfilled orders
  const paidOrdersData = await prisma.order.findMany({
    where: { status: { in: ["PAID", "FULFILLED"] } },
    select: { subtotalUSD: true },
  });

  const totalRevenueUSD = paidOrdersData.reduce(
    (sum, o) => sum + Number(o.subtotalUSD),
    0
  );

  return {
    totalOrders,
    paidOrders,
    totalCommissions,
    pendingCommissions,
    productsCount,
    totalRevenueUSD,
    recentOrders: recentOrders.map((o) => ({
      id: o.id,
      customerName: o.customerName,
      customerEmail: o.customerEmail,
      currency: o.currency,
      subtotalUSD: Number(o.subtotalUSD),
      status: o.status,
      createdAt: o.createdAt.toISOString(),
      itemsCount: o.items.reduce((sum, item) => sum + item.quantity, 0),
    })),
  };
}

export async function getAdminOrders(statusFilter?: string) {
  if (!(await isAdminAuthenticated())) {
    throw new Error("Unauthorized atelier session");
  }

  const whereClause: Record<string, unknown> = {};
  if (statusFilter && statusFilter !== "ALL") {
    whereClause.status = statusFilter;
  }

  const orders = await prisma.order.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" },
    include: {
      items: {
        include: {
          product: {
            select: { name: true, images: { take: 1, orderBy: { position: "asc" } } },
          },
        },
      },
    },
  });

  return orders.map((o) => ({
    id: o.id,
    customerName: o.customerName,
    customerEmail: o.customerEmail,
    currency: o.currency,
    fxRate: Number(o.fxRate),
    subtotalUSD: Number(o.subtotalUSD),
    status: o.status,
    shippingLine1: o.shippingLine1,
    shippingLine2: o.shippingLine2,
    shippingCity: o.shippingCity,
    shippingRegion: o.shippingRegion,
    shippingPostal: o.shippingPostal,
    shippingCountry: o.shippingCountry,
    giftNote: o.giftNote,
    deliveryMethod: o.deliveryMethod,
    createdAt: o.createdAt.toISOString(),
    items: o.items.map((i) => ({
      id: i.id,
      productName: i.product.name,
      productImage: i.product.images[0]?.url || "",
      colorway: i.colorway,
      dimension: i.dimension,
      quantity: i.quantity,
      unitPriceUSD: Number(i.unitPriceUSD),
    })),
  }));
}

export async function updateOrderStatus(
  orderId: string,
  status: "PENDING" | "PAID" | "FULFILLED" | "CANCELLED"
) {
  if (!(await isAdminAuthenticated())) {
    return { ok: false, error: "Unauthorized access." };
  }

  try {
    await prisma.order.update({
      where: { id: orderId },
      data: { status },
    });

    revalidatePath("/admin");
    revalidatePath("/admin/orders");
    revalidatePath(`/order/${orderId}`);

    return { ok: true };
  } catch (err) {
    console.error("Failed to update order status:", err);
    return { ok: false, error: "Database update error." };
  }
}

export async function getAdminCommissions(statusFilter?: string) {
  if (!(await isAdminAuthenticated())) {
    throw new Error("Unauthorized atelier session");
  }

  const whereClause: Record<string, unknown> = {};
  if (statusFilter && statusFilter !== "ALL") {
    whereClause.status = statusFilter;
  }

  const commissions = await prisma.bespokeCommission.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" },
  });

  return commissions.map((c) => ({
    id: c.id,
    referenceCode: c.referenceCode,
    name: c.name,
    email: c.email,
    productName: c.productName,
    palette: c.palette,
    notes: c.notes,
    status: c.status,
    createdAt: c.createdAt.toISOString(),
  }));
}

export async function updateCommissionStatus(
  commissionId: string,
  status: "PENDING" | "REVIEWED" | "SCHEDULED" | "COMPLETED"
) {
  if (!(await isAdminAuthenticated())) {
    return { ok: false, error: "Unauthorized access." };
  }

  try {
    await prisma.bespokeCommission.update({
      where: { id: commissionId },
      data: { status },
    });

    revalidatePath("/admin");
    revalidatePath("/admin/commissions");

    return { ok: true };
  } catch (err) {
    console.error("Failed to update commission:", err);
    return { ok: false, error: "Database update error." };
  }
}
