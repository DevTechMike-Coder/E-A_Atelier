import type { Prisma } from "@/app/generated/prisma/client";
import type { Product } from "@/app/data/products";

const STATUS_LABEL: Record<string, Product["status"]> = {
  MADE_ON_DEMAND: "Made on Demand",
  IN_STOCK: "In Stock",
  LIMITED_EDITION: "Limited Edition",
  CAPSULE_PREVIEW: "Capsule Preview",
};

// Matches the include used by both product queries.
export type ProductWithRelations = Prisma.ProductGetPayload<{
  include: { images: true; colorways: true; reviews: true };
}>;

/**
 * Maps a Prisma Product (+ relations) back into the flat `Product` shape
 * from app/data/products.ts, so ProductCard/CartDrawer/StoreContext/etc.
 * need zero changes.
 */
export function mapProduct(p: ProductWithRelations): Product {
  const reviewsCount = p.reviews.length;
  const rating =
    reviewsCount > 0
      ? p.reviews.reduce((sum, r) => sum + r.rating, 0) / reviewsCount
      : 0;

  return {
    id: p.id,
    name: p.name,
    tagline: p.tagline,
    priceUSD: Number(p.priceUSD),
    category: p.category as Product["category"],
    categoryLabel: p.categoryLabel,
    craftHours: p.craftHours,
    fiber: p.fiber,
    badge: p.badge,
    status: STATUS_LABEL[p.status],
    editionNumber: p.editionNumber ?? undefined,
    description: p.description,
    storyQuote: p.storyQuote ?? undefined,
    provenance: p.provenance,
    images: [...p.images]
      .sort((a, b) => a.position - b.position)
      .map((img) => img.url),
    colorways: p.colorways.map((c) => ({
      name: c.name,
      hex: c.hex,
      image: c.image,
    })),
    dimensions: p.dimensions,
    reviewsCount,
    rating,
    refCode: p.refCode,
    specs: {
      body: p.specBody,
      structuralRope: p.specStructuralRope,
      hardware: p.specHardware,
      dyeChemistry: p.specDyeChemistry,
      care: p.specCare,
      lineage: p.specLineage,
      shipping: p.specShipping,
    },
    isWearablePreview: p.isWearablePreview,
  };
}