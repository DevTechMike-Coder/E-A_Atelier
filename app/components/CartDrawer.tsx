"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "../context/StoreContext";
import { X, Plus, Minus, Trash2, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";

export default function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    cartCount,
    subtotalUSD,
    formatPrice,
    updateQuantity,
    removeFromCart,
    freeShippingProgress,
  } = useStore();

  const [giftNoteOpen, setGiftNoteOpen] = useState(false);
  const [giftNote, setGiftNote] = useState("");
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState<"courier" | "studio">("courier");

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setCheckoutComplete(true);
  };

  const handleReset = () => {
    setCheckoutComplete(false);
    setIsCartOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#1c1b1a]/40 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Slide-out Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-[#fdf8f5] shadow-2xl flex flex-col border-l border-[rgba(138,111,90,0.2)]">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-[rgba(138,111,90,0.18)] flex items-center justify-between bg-white">
            <div>
              <span className="text-[10px] tracking-archival uppercase text-[#81756d] block font-semibold">
                WORKSHOP CONDUIT
              </span>
              <h2 className="font-editorial text-2xl text-[#1c1b1a]">
                Your Atelier Tote ({cartCount})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-[#81756d] hover:text-[#1c1b1a] transition-colors rounded-full hover:bg-[#f1ede9]"
            >
              <X size={20} />
            </button>
          </div>

          {/* Checkout Complete View */}
          {checkoutComplete ? (
            <div className="flex-1 p-8 flex flex-col items-center justify-center text-center space-y-5 bg-[#fdf8f5]">
              <div className="w-16 h-16 rounded-full bg-[#f1e0cc] text-[#705743] flex items-center justify-center">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="font-editorial text-2xl text-[#1c1b1a]">
                Batch Reservation Confirmed
              </h3>
              <p className="text-xs text-[#4f453e] leading-relaxed max-w-xs">
                Merci. Your artisanal order has been entered into the active batch register. Our master knitter will begin weaving your loops with dedicated care.
              </p>
              <div className="bg-white p-4 border border-[rgba(138,111,90,0.2)] rounded text-xs space-y-1 text-left w-full">
                <p className="font-semibold text-[#8a6f5a]">BATCH REGISTRATION: #EA-2026-914</p>
                <p className="text-[#4f453e]">Delivery: Carbon-Neutral Courier</p>
                <p className="text-[#4f453e]">Estimated Dispatch: 10–14 Business Days</p>
              </div>
              <button
                onClick={handleReset}
                className="w-full bg-[#242321] text-[#f8f4ed] hover:bg-[#8a6f5a] py-3 text-xs font-semibold tracking-archival uppercase rounded-sm transition-colors"
              >
                RETURN TO ATELIER
              </button>
            </div>
          ) : (
            <>
              {/* Free Courier Progress Bar */}
              <div className="p-4 bg-[#f7f3ef] border-b border-[rgba(138,111,90,0.15)] space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  {freeShippingProgress.eligible ? (
                    <span className="font-semibold text-[#705743] flex items-center gap-1">
                      <Sparkles size={13} /> Complimentary Carbon-Neutral Courier Unlocked!
                    </span>
                  ) : (
                    <span className="text-[#4f453e]">
                      Add <strong className="text-[#1c1b1a]">{formatPrice(freeShippingProgress.remainingUSD)}</strong> for complimentary courier
                    </span>
                  )}
                  <span className="text-[10px] font-mono text-[#81756d]">
                    {freeShippingProgress.percent}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-[#e6e2de] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#8a6f5a] transition-all duration-500 rounded-full"
                    style={{ width: `${freeShippingProgress.percent}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="text-center py-16 space-y-4">
                    <p className="font-editorial text-lg text-[#81756d]">
                      Your tote is currently empty.
                    </p>
                    <Link
                      href="/shop"
                      onClick={() => setIsCartOpen(false)}
                      className="inline-block bg-[#8a6f5a] text-white px-5 py-2.5 text-xs font-semibold tracking-archival uppercase rounded-sm hover:bg-[#705743] transition-colors"
                    >
                      EXPLORE COLLECTION
                    </Link>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 pb-6 border-b border-[rgba(138,111,90,0.15)] relative"
                    >
                      {/* Image Thumbnail */}
                      <div className="w-20 h-24 relative bg-[#f1ede9] rounded-sm overflow-hidden flex-shrink-0 border border-[rgba(138,111,90,0.2)]">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>

                      {/* Info & Actions */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start pr-6">
                            <h4 className="font-editorial text-[16px] text-[#1c1b1a] leading-tight">
                              {item.product.name}
                            </h4>
                          </div>
                          <p className="text-[11px] text-[#81756d] mt-1">
                            Colorway: <span className="text-[#4f453e] font-medium">{item.colorway}</span>
                          </p>
                          <p className="text-[11px] text-[#81756d]">
                            Size: <span className="text-[#4f453e] font-medium">{item.dimension}</span>
                          </p>
                        </div>

                        {/* Stepper and Price */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-[rgba(138,111,90,0.25)] rounded-sm bg-white">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 text-[#81756d] hover:text-[#1c1b1a]"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="px-2.5 text-xs font-semibold text-[#1c1b1a]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 text-[#81756d] hover:text-[#1c1b1a]"
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          <span className="font-semibold text-sm text-[#1c1b1a]">
                            {formatPrice(item.unitPriceUSD * item.quantity)}
                          </span>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="absolute top-0 right-0 text-[#81756d] hover:text-[#ba1a1a] transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))
                )}

                {/* Bespoke Gift Note / Monogramming Accordion */}
                {cart.length > 0 && (
                  <div className="border border-[rgba(138,111,90,0.2)] rounded-sm bg-white p-3">
                    <button
                      onClick={() => setGiftNoteOpen(!giftNoteOpen)}
                      className="w-full flex items-center justify-between text-left text-xs font-semibold tracking-archival uppercase text-[#4f453e]"
                    >
                      <span>+ Complimentary Gift Card & Monogram</span>
                      <span className="text-xs">{giftNoteOpen ? "−" : "+"}</span>
                    </button>
                    {giftNoteOpen && (
                      <div className="mt-3 pt-3 border-t border-[rgba(138,111,90,0.15)] space-y-2">
                        <textarea
                          rows={3}
                          value={giftNote}
                          onChange={(e) => setGiftNote(e.target.value)}
                          placeholder="Compose your handwritten message or initials for the wax-sealed letterpress card..."
                          className="w-full text-xs p-2.5 border border-[rgba(138,111,90,0.25)] rounded-sm focus:outline-none focus:border-[#8a6f5a] bg-[#fdf8f5]"
                        />
                        <p className="text-[10px] text-[#81756d]">
                          Hand-penned on 300gsm cotton rag archival card with dried Provence lavender stem.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Delivery Preference */}
                {cart.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-[11px] font-semibold tracking-archival uppercase text-[#81756d] block">
                      Disbursement Protocol:
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <button
                        onClick={() => setDeliveryMethod("courier")}
                        className={`p-2.5 rounded-sm border text-left transition-all ${
                          deliveryMethod === "courier"
                            ? "border-[#8a6f5a] bg-[#f1e0cc]/40 text-[#1c1b1a] font-medium"
                            : "border-[rgba(138,111,90,0.2)] bg-white text-[#4f453e]"
                        }`}
                      >
                        <p className="font-semibold">Carbon Courier</p>
                        <p className="text-[10px] text-[#81756d]">Tracked DHL Express</p>
                      </button>
                      <button
                        onClick={() => setDeliveryMethod("studio")}
                        className={`p-2.5 rounded-sm border text-left transition-all ${
                          deliveryMethod === "studio"
                            ? "border-[#8a6f5a] bg-[#f1e0cc]/40 text-[#1c1b1a] font-medium"
                            : "border-[rgba(138,111,90,0.2)] bg-white text-[#4f453e]"
                        }`}
                      >
                        <p className="font-semibold">Studio Handover</p>
                        <p className="text-[10px] text-[#81756d]">Paris / Avignon / Lagos</p>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Drawer Footer & Checkout Summary */}
              {cart.length > 0 && (
                <div className="p-6 bg-white border-t border-[rgba(138,111,90,0.18)] space-y-4">
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-[#4f453e]">
                      <span>Batch Subtotal</span>
                      <span className="font-medium text-[#1c1b1a]">{formatPrice(subtotalUSD)}</span>
                    </div>
                    <div className="flex justify-between text-[#4f453e]">
                      <span>Carbon-Neutral Delivery</span>
                      <span className="font-medium text-[#1c1b1a]">
                        {freeShippingProgress.eligible ? "Complimentary" : formatPrice(25)}
                      </span>
                    </div>
                    <div className="flex justify-between text-[#4f453e]">
                      <span>Artisanal Packaging</span>
                      <span className="font-medium text-[#1c1b1a]">Complimentary</span>
                    </div>
                    <div className="pt-2 border-t border-[rgba(138,111,90,0.18)] flex justify-between text-base font-semibold text-[#1c1b1a]">
                      <span>Total Due</span>
                      <span>
                        {formatPrice(
                          subtotalUSD + (freeShippingProgress.eligible ? 0 : 25)
                        )}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full bg-[#242321] text-[#f8f4ed] hover:bg-[#8a6f5a] py-3.5 text-xs font-semibold tracking-archival uppercase rounded-sm transition-colors shadow-md"
                  >
                    PROCEED TO SECURE CHECKOUT
                  </button>

                  <div className="flex items-center justify-center gap-4 text-[10px] text-[#81756d] pt-1">
                    <span className="flex items-center gap-1">
                      <ShieldCheck size={12} className="text-[#705743]" /> Zero Petroleum Synthetics
                    </span>
                    <span>•</span>
                    <span>Signed Maker Certificate</span>
                  </div>
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
}
