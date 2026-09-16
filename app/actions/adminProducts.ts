"use server";

import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "./adminAuth";
import { revalidatePath } from "next/cache";

export interface NewProductInput {
  name: string;
  tagline: string;
  priceUSD: number;
  category: "bags" | "wearables" | "accessories" | "home";
  categoryLabel: string;
  craftHours: number;
  fiber: string;
  badge: string;
  status: "Made on Demand" | "In Stock" | "Limited Edition" | "Capsule Preview";
  editionNumber?: string;
  description: string;
  storyQuote?: string;
  provenance: string;
  dimensions: string[];
  specs: {
    body: string;
    structuralRope: string;
    hardware: string;
    dyeChemistry: string;
    care: string;
    lineage: string;
    shipping: string;
  };
  images: string[];
  colorways: { name: string; hex: string; image: string }[];
}

const STATUS_MAP: Record<string, "MADE_ON_DEMAND" | "IN_STOCK" | "LIMITED_EDITION" | "CAPSULE_PREVIEW"> = {
  "Made on Demand": "MADE_ON_DEMAND",
  "In Stock": "IN_STOCK",
  "Limited Edition": "LIMITED_EDITION",
  "Capsule Preview": "CAPSULE_PREVIEW",
};

export async function createNewProduct(data: NewProductInput) {
  if (!(await isAdminAuthenticated())) {
    return { ok: false as const, error: "Unauthorized atelier session." };
  }

  try {
    if (!data.name.trim() || !data.description.trim()) {
      return { ok: false as const, error: "Product name and description are required." };
    }

    // Generate unique slug ID from name
    const baseSlug = data.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    const id = `${baseSlug}-${Date.now().toString().slice(-4)}`;

    // Generate refCode
    const refCode = `#EA-${data.category.toUpperCase().slice(0, 3)}-${Math.floor(100 + Math.random() * 900)}`;

    const product = await prisma.product.create({
      data: {
        id,
        name: data.name.trim(),
        tagline: data.tagline.trim(),
        priceUSD: data.priceUSD,
        category: data.category,
        categoryLabel: data.categoryLabel || data.category.toUpperCase(),
        craftHours: Math.round(data.craftHours),
        fiber: data.fiber.trim(),
        badge: data.badge.trim() || "Archival Release",
        status: STATUS_MAP[data.status] || "MADE_ON_DEMAND",
        editionNumber: data.editionNumber?.trim() || null,
        description: data.description.trim(),
        storyQuote: data.storyQuote?.trim() || null,
        provenance: data.provenance.trim(),
        dimensions: data.dimensions.length > 0 ? data.dimensions : ["Standard Edition"],
        refCode,
        isWearablePreview: data.category === "wearables",
        specBody: data.specs.body || "100% Unbleached Organic Fiber",
        specStructuralRope: data.specs.structuralRope || "Double-twisted continuous core",
        specHardware: data.specs.hardware || "Hand-forged brass",
        specDyeChemistry: data.specs.dyeChemistry || "Botanical mineral low-heat kettle bath",
        specCare: data.specs.care || "Spot clean with cold mountain spring water and lay flat in shade.",
        specLineage: data.specs.lineage || "Saint-Rémy-de-Provence Studio",
        specShipping: data.specs.shipping || "Wax-sealed custom linen dust bag with numbered Maker Certificate.",
        images: {
          create: data.images.map((url, i) => ({
            url: url.trim(),
            position: i,
          })),
        },
        colorways: {
          create: data.colorways.map((c) => ({
            name: c.name.trim(),
            hex: c.hex.trim(),
            image: c.image.trim() || data.images[0] || "",
          })),
        },
      },
    });

    revalidatePath("/shop");
    revalidatePath("/");
    revalidatePath("/admin/products");

    return { ok: true as const, productId: product.id };
  } catch (err: unknown) {
    console.error("Failed to create product:", err);
    return { ok: false as const, error: "Database error during product creation." };
  }
}

export async function getAdminProductsList() {
  if (!(await isAdminAuthenticated())) {
    throw new Error("Unauthorized atelier session");
  }

  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      images: { orderBy: { position: "asc" }, take: 1 },
      colorways: true,
      reviews: true,
    },
  });

  return products.map((p) => ({
    id: p.id,
    name: p.name,
    category: p.category,
    priceUSD: Number(p.priceUSD),
    craftHours: p.craftHours,
    fiber: p.fiber,
    status: p.status,
    badge: p.badge,
    refCode: p.refCode,
    image: p.images[0]?.url || "",
    colorwaysCount: p.colorways.length,
    reviewsCount: p.reviews.length,
    createdAt: p.createdAt.toISOString(),
  }));
}

export async function updateProductAvailability(
  productId: string,
  status: "Made on Demand" | "In Stock" | "Limited Edition" | "Capsule Preview"
) {
  if (!(await isAdminAuthenticated())) {
    return { ok: false, error: "Unauthorized access." };
  }

  try {
    await prisma.product.update({
      where: { id: productId },
      data: { status: STATUS_MAP[status] || "MADE_ON_DEMAND" },
    });

    revalidatePath("/shop");
    revalidatePath(`/product/${productId}`);
    revalidatePath("/admin/products");

    return { ok: true };
  } catch (err) {
    console.error("Failed to update status:", err);
    return { ok: false, error: "Failed to update product status." };
  }
}
