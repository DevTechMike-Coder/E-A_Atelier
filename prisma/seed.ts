import "dotenv/config";
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { PRODUCTS } from "../app/data/products";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set — check your .env file.");
}

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const STATUS_MAP: Record<string, string> = {
  "Made on Demand": "MADE_ON_DEMAND",
  "In Stock": "IN_STOCK",
  "Limited Edition": "LIMITED_EDITION",
  "Capsule Preview": "CAPSULE_PREVIEW",
};

async function main() {
  console.log(`Seeding ${PRODUCTS.length} products...`);

  for (const p of PRODUCTS) {
    await prisma.product.upsert({
      where: { id: p.id },
      create: {
        id: p.id,
        name: p.name,
        tagline: p.tagline,
        priceUSD: p.priceUSD,
        category: p.category,
        categoryLabel: p.categoryLabel,
        craftHours: p.craftHours,
        fiber: p.fiber,
        badge: p.badge,
        status: STATUS_MAP[p.status] as any,
        editionNumber: p.editionNumber,
        description: p.description,
        storyQuote: p.storyQuote,
        provenance: p.provenance,
        dimensions: p.dimensions,
        refCode: p.refCode,
        isWearablePreview: p.isWearablePreview ?? false,
        specBody: p.specs.body,
        specStructuralRope: p.specs.structuralRope,
        specHardware: p.specs.hardware,
        specDyeChemistry: p.specs.dyeChemistry,
        specCare: p.specs.care,
        specLineage: p.specs.lineage,
        specShipping: p.specs.shipping,
        images: {
          create: p.images.map((url, i) => ({ url, position: i })),
        },
        colorways: {
          create: p.colorways.map((c) => ({
            name: c.name,
            hex: c.hex,
            image: c.image,
          })),
        },
      },
      // On re-run: update scalar fields, replace nested images/colorways
      // so the seed stays idempotent instead of duplicating rows.
      update: {
        name: p.name,
        tagline: p.tagline,
        priceUSD: p.priceUSD,
        category: p.category,
        categoryLabel: p.categoryLabel,
        craftHours: p.craftHours,
        fiber: p.fiber,
        badge: p.badge,
        status: STATUS_MAP[p.status] as any,
        editionNumber: p.editionNumber,
        description: p.description,
        storyQuote: p.storyQuote,
        provenance: p.provenance,
        dimensions: p.dimensions,
        refCode: p.refCode,
        isWearablePreview: p.isWearablePreview ?? false,
        specBody: p.specs.body,
        specStructuralRope: p.specs.structuralRope,
        specHardware: p.specs.hardware,
        specDyeChemistry: p.specs.dyeChemistry,
        specCare: p.specs.care,
        specLineage: p.specs.lineage,
        specShipping: p.specs.shipping,
        images: {
          deleteMany: {},
          create: p.images.map((url, i) => ({ url, position: i })),
        },
        colorways: {
          deleteMany: {},
          create: p.colorways.map((c) => ({
            name: c.name,
            hex: c.hex,
            image: c.image,
          })),
        },
      },
    });
    console.log(`  ✓ ${p.id}`);
  }

  console.log("Done.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
