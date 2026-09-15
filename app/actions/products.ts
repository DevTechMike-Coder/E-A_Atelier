"use server";

import { prisma } from "@/lib/prisma";
import { mapProduct } from "@/lib/mapProduct";

export async function getProductsByIds(ids: string[]) {
  if (ids.length === 0) return [];

  const products = await prisma.product.findMany({
    where: { id: { in: ids } },
    include: { images: true, colorways: true, reviews: true },
  });

  return products.map(mapProduct);
}
