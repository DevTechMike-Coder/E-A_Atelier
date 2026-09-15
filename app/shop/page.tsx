import { prisma } from "@/lib/prisma";
import { mapProduct } from "@/lib/mapProduct";
import ShopClient from "./ShopClient";

export default async function ShopPage() {
  const products = await prisma.product.findMany({
    include: { images: true, colorways: true, reviews: true },
    orderBy: { createdAt: "asc" },
  });

  return <ShopClient products={products.map(mapProduct)} />;
}