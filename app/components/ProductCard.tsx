"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "../data/products";
import { useStore } from "../context/StoreContext";
import { Heart, Clock } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { formatPrice, isWishlisted, toggleWishlist, addToCart } = useStore();
  const wishlisted = isWishlisted(product.id);

  const productUrl = product.isWearablePreview ? "/wearables" : `/product/${product.id}`;

  return (
    <div className="group flex flex-col bg-white border border-[rgba(138,111,90,0.18)] hover:border-[#8a6f5a]/60 rounded-sm transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md">
      {/* 3:4 Portrait Image Container */}
      <div className="relative aspect-[3/4] w-full bg-[#f7f3ef] overflow-hidden">
        <Link href={productUrl} className="block w-full h-full relative">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between pointer-events-none">
          <span className="bg-white/95 backdrop-blur-sm text-[#1c1b1a] text-[9.5px] font-semibold tracking-archival uppercase px-2.5 py-1 rounded-sm border border-[rgba(138,111,90,0.2)] shadow-sm">
            {product.badge}
          </span>
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product.id);
            }}
            className="pointer-events-auto p-2 rounded-full bg-white/90 hover:bg-white text-[#242321] transition-transform active:scale-90 shadow-sm border border-[rgba(138,111,90,0.15)]"
            aria-label="Save to Wishlist"
          >
            <Heart
              size={15}
              className={wishlisted ? "fill-[#8a6f5a] text-[#8a6f5a]" : "text-[#242321] hover:text-[#8a6f5a]"}
            />
          </button>
        </div>

        {/* Bottom Bar: Crafting Hours Badge */}
        <div className="absolute bottom-3 left-3 pointer-events-none">
          <span className="inline-flex items-center gap-1 bg-[#242321]/80 backdrop-blur-sm text-[#f8f4ed] text-[9px] font-medium tracking-archival uppercase px-2 py-0.5 rounded-sm">
            <Clock size={10} className="text-[#d8c8b5]" /> CRAFTING: {product.craftHours} HRS
          </span>
        </div>
      </div>

      {/* Product Metadata & Actions */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white">
        <div>
          {/* Colorway & Fiber pill */}
          <div className="flex items-center justify-between text-[11px] text-[#81756d] mb-1 font-sans">
            <span className="tracking-archival uppercase text-[10px] font-semibold text-[#8a6f5a]">
              {product.colorways[0]?.name || "NATURAL FLAX"}
            </span>
            <span className="text-[10px] bg-[#f7f3ef] px-2 py-0.5 rounded text-[#685d4d]">
              {product.status}
            </span>
          </div>

          {/* Title */}
          <Link href={productUrl}>
            <h3 className="font-editorial text-lg text-[#1c1b1a] group-hover:text-[#705743] transition-colors line-clamp-1 leading-snug">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Price & Action Row */}
        <div className="mt-4 pt-3 border-t border-[rgba(138,111,90,0.12)] flex items-center justify-between">
          <span className="font-semibold text-[15px] text-[#1c1b1a] font-sans">
            {formatPrice(product.priceUSD)}
          </span>

          {product.isWearablePreview ? (
            <Link
              href="/wearables"
              className="text-[10.5px] font-semibold tracking-archival uppercase text-[#8a6f5a] hover:underline"
            >
              PREVIEW CAPSULE &rarr;
            </Link>
          ) : (
            <button
              onClick={() => addToCart(product)}
              className="text-[10.5px] font-semibold tracking-archival uppercase text-[#242321] hover:text-[#8a6f5a] border border-[rgba(138,111,90,0.25)] hover:border-[#8a6f5a] bg-[#fdf8f5] px-3 py-1 rounded-sm transition-all"
            >
              + ADD TO TOTE
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
