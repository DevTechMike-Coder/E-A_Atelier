"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "../context/StoreContext";
import { PRODUCTS } from "../data/products";
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";

export default function WishlistDrawer() {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    wishlistCount,
    toggleWishlist,
    addToCart,
    formatPrice,
    setIsCartOpen,
  } = useStore();

  if (!isWishlistOpen) return null;

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const handleMoveAllToTote = () => {
    wishlistedProducts.forEach((product) => {
      addToCart(product);
    });
    setIsWishlistOpen(false);
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#1c1b1a]/40 backdrop-blur-sm transition-opacity"
        onClick={() => setIsWishlistOpen(false)}
      />

      {/* Slide-out Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-[#fdf8f5] shadow-2xl flex flex-col border-l border-[rgba(138,111,90,0.2)]">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-[rgba(138,111,90,0.18)] flex items-center justify-between bg-white">
            <div>
              <span className="text-[10px] tracking-archival uppercase text-[#81756d] block font-semibold">
                ARCHIVAL CURATION
              </span>
              <h2 className="font-editorial text-2xl text-[#1c1b1a]">
                Saved Pieces ({wishlistCount})
              </h2>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-2 text-[#81756d] hover:text-[#1c1b1a] transition-colors rounded-full hover:bg-[#f1ede9]"
              aria-label="Close Wishlist"
            >
              <X size={20} />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {wishlistCount === 0 ? (
              <div className="text-center py-20 space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#f1e0cc] text-[#705743] flex items-center justify-center">
                  <Heart size={26} className="text-[#8a6f5a]" />
                </div>
                <h3 className="font-editorial text-2xl text-[#1c1b1a]">
                  Your wishlist is empty
                </h3>
                <p className="text-xs text-[#4f453e] leading-relaxed max-w-xs mx-auto">
                  Bookmark and save pieces as you explore the collection to curate your personal atelier lookbook.
                </p>
                <div className="pt-2">
                  <Link
                    href="/shop"
                    onClick={() => setIsWishlistOpen(false)}
                    className="inline-block bg-[#242321] text-[#f8f4ed] hover:bg-[#8a6f5a] px-6 py-3 text-xs font-semibold tracking-archival uppercase rounded-sm transition-colors shadow-sm"
                  >
                    EXPLORE COLLECTION &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {wishlistedProducts.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 bg-white rounded-sm border border-[rgba(138,111,90,0.18)] hover:border-[#8a6f5a]/60 transition-all shadow-sm relative group"
                  >
                    {/* Thumbnail */}
                    <div className="w-20 h-24 relative bg-[#f7f3ef] rounded-sm overflow-hidden flex-shrink-0 border border-[rgba(138,111,90,0.2)]">
                      <Link
                        href={item.isWearablePreview ? "/wearables" : `/product/${item.id}`}
                        onClick={() => setIsWishlistOpen(false)}
                        className="block w-full h-full relative"
                      >
                        <Image
                          src={item.images[0]}
                          alt={item.name}
                          fill
                          sizes="80px"
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </Link>
                    </div>

                    {/* Metadata & Actions */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[9.5px] font-semibold tracking-archival uppercase text-[#8a6f5a] block">
                          {item.fiber}
                        </span>
                        <Link
                          href={item.isWearablePreview ? "/wearables" : `/product/${item.id}`}
                          onClick={() => setIsWishlistOpen(false)}
                        >
                          <h4 className="font-editorial text-base text-[#1c1b1a] hover:text-[#8a6f5a] transition-colors leading-tight line-clamp-1 mt-0.5">
                            {item.name}
                          </h4>
                        </Link>
                        <p className="text-xs font-semibold text-[#1c1b1a] mt-1 font-sans">
                          {formatPrice(item.priceUSD)}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 pt-2">
                        {item.isWearablePreview ? (
                          <Link
                            href="/wearables"
                            onClick={() => setIsWishlistOpen(false)}
                            className="text-[10px] font-semibold tracking-archival uppercase text-[#8a6f5a] hover:underline"
                          >
                            COMING SOON &rarr;
                          </Link>
                        ) : (
                          <button
                            onClick={() => {
                              addToCart(item);
                              setIsWishlistOpen(false);
                            }}
                            className="flex items-center gap-1 text-[10.5px] font-semibold tracking-archival uppercase bg-[#242321] hover:bg-[#8a6f5a] text-[#f8f4ed] px-3 py-1.5 rounded-sm transition-colors"
                          >
                            <ShoppingBag size={12} />
                            <span>+ ADD TO TOTE</span>
                          </button>
                        )}

                        <button
                          onClick={() => toggleWishlist(item.id)}
                          className="p-1.5 text-[#81756d] hover:text-[#ba1a1a] transition-colors rounded hover:bg-[#f7f3ef]"
                          title="Remove from Wishlist"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Drawer Footer */}
          {wishlistCount > 0 && (
            <div className="p-6 bg-white border-t border-[rgba(138,111,90,0.18)] space-y-3">
              <button
                onClick={handleMoveAllToTote}
                className="w-full bg-[#242321] text-[#f8f4ed] hover:bg-[#8a6f5a] py-3.5 text-xs font-semibold tracking-archival uppercase rounded-sm transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <ShoppingBag size={14} />
                <span>MOVE ALL PIECES TO TOTE</span>
              </button>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="w-full py-2.5 border border-[rgba(138,111,90,0.25)] text-[#4f453e] hover:bg-[#f7f3ef] text-xs font-semibold tracking-archival uppercase rounded-sm transition-colors"
              >
                CONTINUE BROWSING
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
