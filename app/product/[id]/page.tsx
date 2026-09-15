import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { mapProduct } from "@/lib/mapProduct";
import ProductDetailClient from "./ProductDetailClient";

const include = { images: true, colorways: true, reviews: true } as const;

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [dbProduct, others] = await Promise.all([
    prisma.product.findUnique({ where: { id }, include }),
    prisma.product.findMany({
      where: { id: { not: id } },
      include,
      take: 3,
    }),
  ]);

  if (!dbProduct) notFound();

  return (
    <ProductDetailClient
      product={mapProduct(dbProduct)}
      recommendations={others.map(mapProduct)}
    />
  );
}