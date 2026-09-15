"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export interface CreateReviewInput {
  productId: string;
  authorName: string;
  rating: number;
  comment?: string;
}

export async function createProductReview(data: CreateReviewInput) {
  try {
    const { productId, authorName, rating, comment } = data;

    if (!productId || !productId.trim()) {
      return { ok: false as const, error: "Product reference is required." };
    }

    if (!authorName || authorName.trim().length < 2) {
      return { ok: false as const, error: "Please provide your collector name (at least 2 characters)." };
    }

    const numericRating = Math.round(Number(rating));
    if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
      return { ok: false as const, error: "Please select a rating between 1 and 5 stars." };
    }

    // Verify product exists
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { id: true },
    });

    if (!product) {
      return { ok: false as const, error: "Product was not found in the archive register." };
    }

    const review = await prisma.review.create({
      data: {
        productId,
        authorName: authorName.trim(),
        rating: numericRating,
        comment: comment?.trim() || null,
      },
    });

    // Revalidate product detail page and catalog
    revalidatePath(`/product/${productId}`);
    revalidatePath("/shop");
    revalidatePath("/");

    return { ok: true as const, reviewId: review.id };
  } catch (error: unknown) {
    console.error("Failed to create review:", error);
    return {
      ok: false as const,
      error: "An unexpected error occurred while saving your collector inscription.",
    };
  }
}
