"use server";

import { prisma } from "@/lib/prisma";

export interface OrderItemInput {
  productId: string;
  colorway: string;
  dimension: string;
  quantity: number;
  unitPriceUSD: number;
}

export interface CreateOrderInput {
  customerName: string;
  customerEmail: string;
  currency: "NGN" | "USD" | "EUR" | "GBP";
  fxRate: number;
  subtotalUSD: number;
  shippingLine1: string;
  shippingLine2?: string;
  shippingCity: string;
  shippingRegion?: string;
  shippingPostal?: string;
  shippingCountry: string;
  items: OrderItemInput[];
}

export async function createOrder(data: CreateOrderInput) {
  try {
    if (!data.customerName.trim() || !data.customerEmail.trim()) {
      return { ok: false as const, error: "Customer name and email are required." };
    }

    if (!data.shippingLine1.trim() || !data.shippingCity.trim() || !data.shippingCountry.trim()) {
      return { ok: false as const, error: "Delivery address, city, and country are required." };
    }

    if (!data.items || data.items.length === 0) {
      return { ok: false as const, error: "Tote cannot be empty." };
    }

    // Verify products exist in the database
    const productIds = Array.from(new Set(data.items.map((i) => i.productId)));
    const existingProducts = await prisma.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true, priceUSD: true },
    });

    if (existingProducts.length !== productIds.length) {
      return {
        ok: false as const,
        error: "One or more selected heirlooms could not be verified in the archive.",
      };
    }

    // Create the order with nested items in a transaction
    const order = await prisma.order.create({
      data: {
        customerName: data.customerName.trim(),
        customerEmail: data.customerEmail.trim().toLowerCase(),
        currency: data.currency,
        fxRate: data.fxRate,
        subtotalUSD: data.subtotalUSD,
        shippingLine1: data.shippingLine1.trim(),
        shippingLine2: data.shippingLine2?.trim() || null,
        shippingCity: data.shippingCity.trim(),
        shippingRegion: data.shippingRegion?.trim() || null,
        shippingPostal: data.shippingPostal?.trim() || null,
        shippingCountry: data.shippingCountry.trim(),
        status: "PENDING",
        items: {
          create: data.items.map((item) => ({
            productId: item.productId,
            colorway: item.colorway,
            dimension: item.dimension,
            quantity: item.quantity,
            unitPriceUSD: item.unitPriceUSD,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return { ok: true as const, orderId: order.id };
  } catch (err: unknown) {
    console.error("Order creation failed:", err);
    return {
      ok: false as const,
      error: "An unexpected error occurred while preserving your order in the batch register.",
    };
  }
}

export async function getOrderById(orderId: string) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: {
                  orderBy: { position: "asc" },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });

    if (!order) return null;

    return {
      id: order.id,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      currency: order.currency,
      fxRate: Number(order.fxRate),
      subtotalUSD: Number(order.subtotalUSD),
      status: order.status,
      shippingLine1: order.shippingLine1,
      shippingLine2: order.shippingLine2,
      shippingCity: order.shippingCity,
      shippingRegion: order.shippingRegion,
      shippingPostal: order.shippingPostal,
      shippingCountry: order.shippingCountry,
      createdAt: order.createdAt.toISOString(),
      items: order.items.map((item) => ({
        id: item.id,
        productId: item.productId,
        productName: item.product.name,
        productImage: item.product.images[0]?.url || "",
        craftHours: item.product.craftHours,
        fiber: item.product.fiber,
        colorway: item.colorway,
        dimension: item.dimension,
        quantity: item.quantity,
        unitPriceUSD: Number(item.unitPriceUSD),
      })),
    };
  } catch (err: unknown) {
    console.error("Failed to fetch order:", err);
    return null;
  }
}
