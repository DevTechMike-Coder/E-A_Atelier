"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore, CURRENCIES } from "../context/StoreContext";
import { createOrder } from "../actions/orders";
import {
  ShieldCheck,
  Truck,
  Building2,
  Sparkles,
  Lock,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Loader2,
  CreditCard,
  Landmark,
} from "lucide-react";

export default function CheckoutClient() {
  const router = useRouter();
  const {
    cart,
    subtotalUSD,
    formatPrice,
    clearCart,
    currency,
    freeShippingProgress,
  } = useStore();

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [shippingLine1, setShippingLine1] = useState("");
  const [shippingLine2, setShippingLine2] = useState("");
  const [shippingCity, setShippingCity] = useState("");
  const [shippingRegion, setShippingRegion] = useState("");
  const [shippingPostal, setShippingPostal] = useState("");
  const [shippingCountry, setShippingCountry] = useState("Nigeria");
  const [deliveryMethod, setDeliveryMethod] = useState<"courier" | "studio">("courier");
  const [paymentMethod, setPaymentMethod] = useState<"paystack" | "wire">("paystack");
  const [giftNote, setGiftNote] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const deliveryFeeUSD =
    deliveryMethod === "studio" || freeShippingProgress.eligible ? 0 : 25;
  const totalUSD = subtotalUSD + deliveryFeeUSD;
  const currentFxRate = CURRENCIES[currency].rate;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (cart.length === 0) {
      setErrorMessage("Your tote is empty. Please select an heirloom before checking out.");
      return;
    }

    if (!customerName.trim() || !customerEmail.trim()) {
      setErrorMessage("Please provide both your full name and correspondence email.");
      return;
    }

    if (!shippingLine1.trim() || !shippingCity.trim() || !shippingCountry.trim()) {
      setErrorMessage("Please complete your delivery address, city, and country.");
      return;
    }

    setIsSubmitting(true);

    const orderPayload = {
      customerName,
      customerEmail,
      currency,
      fxRate: currentFxRate,
      subtotalUSD,
      shippingLine1,
      shippingLine2: shippingLine2 || undefined,
      shippingCity,
      shippingRegion: shippingRegion || undefined,
      shippingPostal: shippingPostal || undefined,
      shippingCountry,
      items: cart.map((item) => ({
        productId: item.productId,
        colorway: item.colorway,
        dimension: item.dimension,
        quantity: item.quantity,
        unitPriceUSD: item.unitPriceUSD,
      })),
    };

    const res = await createOrder(orderPayload);

    if (res.ok && res.orderId) {
      clearCart();

      // If online settlement chosen, initiate gateway
      if (paymentMethod === "paystack") {
        try {
          const amountNGN = Math.round(totalUSD * (currency === "NGN" ? currentFxRate : 1500));
          const payRes = await fetch("/api/checkout/paystack", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: customerEmail,
              amountNGN,
              orderId: res.orderId,
            }),
          });

          const payData = await payRes.json();
          if (payData.ok && payData.authorization_url) {
            window.location.href = payData.authorization_url;
            return;
          }
        } catch {
          // Fallback to order page on gateway communication issue
        }
      }

      router.push(`/order/${res.orderId}`);
    } else {
      setIsSubmitting(false);
      setErrorMessage(res.error || "Failed to preserve order in atelier database.");
    }
  };

  // Empty cart fallback
  if (cart.length === 0 && !isSubmitting) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-20 font-sans">
        <div className="max-w-md w-full text-center space-y-6 bg-white p-8 sm:p-10 rounded-sm border border-[rgba(138,111,90,0.2)] shadow-sm">
          <div className="w-14 h-14 rounded-full bg-[#efe7da] text-[#705743] flex items-center justify-center mx-auto">
            <Sparkles size={24} />
          </div>
          <div className="space-y-2">
            <h1 className="font-editorial text-3xl text-[#1c1b1a]">Your Tote is Empty</h1>
            <p className="text-xs text-[#4f453e] leading-relaxed">
              No heirlooms have been added to your workshop reservation list yet.
            </p>
          </div>
          <Link
            href="/shop"
            className="inline-block w-full bg-[#242321] text-[#f8f4ed] hover:bg-[#8a6f5a] py-3.5 text-xs font-semibold tracking-archival uppercase rounded-sm transition-colors"
          >
            DISCOVER CATALOGUE
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 font-sans">
      {/* Back Link & Header */}
      <div className="mb-10 space-y-4">
        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-archival uppercase text-[#8a6f5a] hover:text-[#705743] transition-colors"
        >
          <ArrowLeft size={14} />
          <span>RETURN TO CATALOGUE</span>
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[rgba(138,111,90,0.18)] pb-6">
          <div>
            <span className="text-[10px] font-semibold tracking-archival uppercase text-[#8a6f5a] block">
              FINAL ARCHIVE ALLOCATION
            </span>
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[#1c1b1a] mt-1">
              Secure Checkout & Inscription
            </h1>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#81756d]">
            <Lock size={13} className="text-[#705743]" />
            <span>256-Bit Encrypted Atelier Connection</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Form Left, Summary Right */}
      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* LEFT COLUMN: Customer & Shipping */}
        <div className="lg:col-span-7 space-y-10">
          
          {/* Error Banner */}
          {errorMessage && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-sm flex items-start gap-3 text-red-800 text-xs">
              <AlertCircle size={18} className="flex-shrink-0 mt-0.5 text-red-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Section 1: Customer Identity */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-editorial text-2xl text-[#1c1b1a] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#efe7da] text-[#705743] text-xs flex items-center justify-center font-sans font-semibold">
                  1
                </span>
                <span>Collector Identity</span>
              </h2>
              <span className="text-[10px] tracking-archival uppercase text-[#81756d]">
                ARCHIVE REGISTRATION
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold tracking-archival uppercase text-[#4f453e]">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Hélène Laurent"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-white border border-[rgba(138,111,90,0.25)] px-3.5 py-2.5 text-xs text-[#1c1b1a] rounded-sm focus:outline-none focus:border-[#8a6f5a]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold tracking-archival uppercase text-[#4f453e]">
                  Correspondence Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="helene@atelier.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full bg-white border border-[rgba(138,111,90,0.25)] px-3.5 py-2.5 text-xs text-[#1c1b1a] rounded-sm focus:outline-none focus:border-[#8a6f5a]"
                />
              </div>
            </div>
          </section>

          {/* Section 2: Delivery Address */}
          <section className="space-y-4 pt-4 border-t border-[rgba(138,111,90,0.18)]">
            <div className="flex items-center justify-between">
              <h2 className="font-editorial text-2xl text-[#1c1b1a] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#efe7da] text-[#705743] text-xs flex items-center justify-center font-sans font-semibold">
                  2
                </span>
                <span>Delivery Address</span>
              </h2>
              <span className="text-[10px] tracking-archival uppercase text-[#81756d]">
                SECURE DISPATCH
              </span>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold tracking-archival uppercase text-[#4f453e]">
                  Street Address *
                </label>
                <input
                  type="text"
                  required
                  placeholder="14 Rue des Teinturiers"
                  value={shippingLine1}
                  onChange={(e) => setShippingLine1(e.target.value)}
                  className="w-full bg-white border border-[rgba(138,111,90,0.25)] px-3.5 py-2.5 text-xs text-[#1c1b1a] rounded-sm focus:outline-none focus:border-[#8a6f5a]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold tracking-archival uppercase text-[#4f453e]">
                  Apartment, Suite, Unit (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Floor 2, Studio B"
                  value={shippingLine2}
                  onChange={(e) => setShippingLine2(e.target.value)}
                  className="w-full bg-white border border-[rgba(138,111,90,0.25)] px-3.5 py-2.5 text-xs text-[#1c1b1a] rounded-sm focus:outline-none focus:border-[#8a6f5a]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold tracking-archival uppercase text-[#4f453e]">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Lagos / Paris"
                    value={shippingCity}
                    onChange={(e) => setShippingCity(e.target.value)}
                    className="w-full bg-white border border-[rgba(138,111,90,0.25)] px-3.5 py-2.5 text-xs text-[#1c1b1a] rounded-sm focus:outline-none focus:border-[#8a6f5a]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold tracking-archival uppercase text-[#4f453e]">
                    State / Region
                  </label>
                  <input
                    type="text"
                    placeholder="Lagos State / PACA"
                    value={shippingRegion}
                    onChange={(e) => setShippingRegion(e.target.value)}
                    className="w-full bg-white border border-[rgba(138,111,90,0.25)] px-3.5 py-2.5 text-xs text-[#1c1b1a] rounded-sm focus:outline-none focus:border-[#8a6f5a]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold tracking-archival uppercase text-[#4f453e]">
                    Postal / Zip Code
                  </label>
                  <input
                    type="text"
                    placeholder="100001 / 13210"
                    value={shippingPostal}
                    onChange={(e) => setShippingPostal(e.target.value)}
                    className="w-full bg-white border border-[rgba(138,111,90,0.25)] px-3.5 py-2.5 text-xs text-[#1c1b1a] rounded-sm focus:outline-none focus:border-[#8a6f5a]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold tracking-archival uppercase text-[#4f453e]">
                  Country *
                </label>
                <select
                  value={shippingCountry}
                  onChange={(e) => setShippingCountry(e.target.value)}
                  className="w-full bg-white border border-[rgba(138,111,90,0.25)] px-3.5 py-2.5 text-xs text-[#1c1b1a] rounded-sm focus:outline-none focus:border-[#8a6f5a]"
                >
                  <option value="Nigeria">Nigeria</option>
                  <option value="France">France</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Germany">Germany</option>
                  <option value="Italy">Italy</option>
                  <option value="Canada">Canada</option>
                  <option value="Japan">Japan</option>
                  <option value="United Arab Emirates">United Arab Emirates</option>
                  <option value="South Africa">South Africa</option>
                  <option value="Ghana">Ghana</option>
                  <option value="Kenya">Kenya</option>
                </select>
              </div>
            </div>
          </section>

          {/* Section 3: Delivery Protocol */}
          <section className="space-y-4 pt-4 border-t border-[rgba(138,111,90,0.18)]">
            <div className="flex items-center justify-between">
              <h2 className="font-editorial text-2xl text-[#1c1b1a] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#efe7da] text-[#705743] text-xs flex items-center justify-center font-sans font-semibold">
                  3
                </span>
                <span>Disbursement Protocol</span>
              </h2>
              <span className="text-[10px] tracking-archival uppercase text-[#81756d]">
                COURIER METHOD
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() => setDeliveryMethod("courier")}
                className={`p-4 border rounded-sm cursor-pointer transition-all ${
                  deliveryMethod === "courier"
                    ? "border-[#8a6f5a] bg-white shadow-sm ring-1 ring-[#8a6f5a]"
                    : "border-[rgba(138,111,90,0.2)] bg-[#fdf8f5] hover:bg-white"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 font-editorial text-lg text-[#1c1b1a]">
                    <Truck size={18} className="text-[#8a6f5a]" />
                    <span>Carbon-Neutral Courier</span>
                  </div>
                  <span className="text-xs font-semibold text-[#705743]">
                    {freeShippingProgress.eligible ? "Complimentary" : formatPrice(25)}
                  </span>
                </div>
                <p className="text-[11px] text-[#4f453e] leading-relaxed">
                  Tracked international DHL Express in wax-sealed linen packaging with maker certificates.
                </p>
              </div>

              <div
                onClick={() => setDeliveryMethod("studio")}
                className={`p-4 border rounded-sm cursor-pointer transition-all ${
                  deliveryMethod === "studio"
                    ? "border-[#8a6f5a] bg-white shadow-sm ring-1 ring-[#8a6f5a]"
                    : "border-[rgba(138,111,90,0.2)] bg-[#fdf8f5] hover:bg-white"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 font-editorial text-lg text-[#1c1b1a]">
                    <Building2 size={18} className="text-[#8a6f5a]" />
                    <span>Studio Handover</span>
                  </div>
                  <span className="text-xs font-semibold text-[#705743]">
                    Complimentary
                  </span>
                </div>
                <p className="text-[11px] text-[#4f453e] leading-relaxed">
                  Private presentation by appointment at our Saint-Rémy atelier, Paris showroom, or Lagos gallery.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Settlement Protocol */}
          <section className="space-y-4 pt-4 border-t border-[rgba(138,111,90,0.18)]">
            <div className="flex items-center justify-between">
              <h2 className="font-editorial text-2xl text-[#1c1b1a] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#efe7da] text-[#705743] text-xs flex items-center justify-center font-sans font-semibold">
                  4
                </span>
                <span>Settlement Protocol</span>
              </h2>
              <span className="text-[10px] tracking-archival uppercase text-[#81756d]">
                SECURE TRANSACTION
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() => setPaymentMethod("paystack")}
                className={`p-4 border rounded-sm cursor-pointer transition-all ${
                  paymentMethod === "paystack"
                    ? "border-[#8a6f5a] bg-white shadow-sm ring-1 ring-[#8a6f5a]"
                    : "border-[rgba(138,111,90,0.2)] bg-[#fdf8f5] hover:bg-white"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 font-editorial text-lg text-[#1c1b1a]">
                    <CreditCard size={18} className="text-[#8a6f5a]" />
                    <span>Card / Transfer / USSD</span>
                  </div>
                  <span className="text-[10px] font-bold tracking-archival uppercase bg-[#efe7da] text-[#705743] px-2 py-0.5 rounded">
                    ONLINE
                  </span>
                </div>
                <p className="text-[11px] text-[#4f453e] leading-relaxed">
                  Direct debit cards, Paystack checkout, instant Nigerian bank transfer, or USSD gateway.
                </p>
              </div>

              <div
                onClick={() => setPaymentMethod("wire")}
                className={`p-4 border rounded-sm cursor-pointer transition-all ${
                  paymentMethod === "wire"
                    ? "border-[#8a6f5a] bg-white shadow-sm ring-1 ring-[#8a6f5a]"
                    : "border-[rgba(138,111,90,0.2)] bg-[#fdf8f5] hover:bg-white"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 font-editorial text-lg text-[#1c1b1a]">
                    <Landmark size={18} className="text-[#8a6f5a]" />
                    <span>Studio Wire / Invoice</span>
                  </div>
                  <span className="text-[10px] font-semibold tracking-archival uppercase text-[#81756d]">
                    RESERVATION
                  </span>
                </div>
                <p className="text-[11px] text-[#4f453e] leading-relaxed">
                  Reserve your allocation today. Our atelier manager will dispatch formal wire instructions.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: Archival Inscription Note */}
          <section className="space-y-4 pt-4 border-t border-[rgba(138,111,90,0.18)]">
            <div className="flex items-center justify-between">
              <h2 className="font-editorial text-2xl text-[#1c1b1a] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#efe7da] text-[#705743] text-xs flex items-center justify-center font-sans font-semibold">
                  5
                </span>
                <span>Archival Inscription Note</span>
              </h2>
              <span className="text-[10px] tracking-archival uppercase text-[#81756d]">
                COMPLIMENTARY
              </span>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold tracking-archival uppercase text-[#4f453e]">
                Gift Note or Maker Instructions (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="Include a bespoke greeting or specific delivery instructions for the courier..."
                value={giftNote}
                onChange={(e) => setGiftNote(e.target.value)}
                className="w-full bg-white border border-[rgba(138,111,90,0.25)] p-3 text-xs text-[#1c1b1a] rounded-sm focus:outline-none focus:border-[#8a6f5a]"
              />
            </div>
          </section>

        </div>

        {/* RIGHT COLUMN: Order Summary & Place Button */}
        <div className="lg:col-span-5 sticky top-24">
          <div className="bg-white border border-[rgba(138,111,90,0.22)] rounded-sm p-6 sm:p-8 shadow-sm space-y-6">
            
            <div className="border-b border-[rgba(138,111,90,0.18)] pb-4">
              <span className="text-[10px] font-semibold tracking-archival uppercase text-[#8a6f5a] block">
                RESERVATION LEDGER
              </span>
              <h3 className="font-editorial text-2xl text-[#1c1b1a] mt-0.5">
                Batch Allocation Summary
              </h3>
            </div>

            {/* Itemized List */}
            <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 pb-4 border-b border-[rgba(138,111,90,0.12)]">
                  <div className="w-16 h-20 relative bg-[#f1ede9] rounded-sm overflow-hidden flex-shrink-0 border border-[rgba(138,111,90,0.2)]">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between text-xs">
                    <div>
                      <h4 className="font-editorial text-base text-[#1c1b1a] leading-snug">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-[#81756d] mt-0.5">
                        Color: <span className="text-[#4f453e] font-medium">{item.colorway}</span> • Size: <span className="text-[#4f453e] font-medium">{item.dimension}</span>
                      </p>
                      <p className="text-[10px] text-[#81756d]">
                        Qty: {item.quantity} × {formatPrice(item.unitPriceUSD)}
                      </p>
                    </div>
                    <div className="font-semibold text-[#1c1b1a]">
                      {formatPrice(item.unitPriceUSD * item.quantity)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pricing Totals */}
            <div className="space-y-2.5 text-xs pt-2">
              <div className="flex justify-between text-[#4f453e]">
                <span>Batch Subtotal</span>
                <span className="font-medium text-[#1c1b1a]">{formatPrice(subtotalUSD)}</span>
              </div>
              <div className="flex justify-between text-[#4f453e]">
                <span>Disbursement</span>
                <span className="font-medium text-[#1c1b1a]">
                  {deliveryFeeUSD === 0 ? "Complimentary" : formatPrice(deliveryFeeUSD)}
                </span>
              </div>
              <div className="flex justify-between text-[#4f453e]">
                <span>Hand-Lettered Maker Certificate</span>
                <span className="font-medium text-[#1c1b1a]">Complimentary</span>
              </div>
              <div className="pt-3 border-t border-[rgba(138,111,90,0.18)] flex justify-between text-lg font-semibold text-[#1c1b1a]">
                <span>Total Due</span>
                <span className="text-[#705743]">{formatPrice(totalUSD)}</span>
              </div>
              <p className="text-[10.5px] text-[#81756d] italic pt-1">
                Settled in {currency} at current fixed exchange benchmark.
              </p>
            </div>

            {/* Place Order CTA */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#242321] text-[#f8f4ed] hover:bg-[#8a6f5a] disabled:bg-[#81756d] py-4 text-xs font-semibold tracking-archival uppercase rounded-sm transition-colors shadow-md flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>PRESERVING IN ARCHIVE REGISTER...</span>
                  </>
                ) : (
                  <span>PLACE ARTISANAL ORDER &rarr;</span>
                )}
              </button>
            </div>

            {/* Atelier Guarantee Badges */}
            <div className="pt-4 border-t border-[rgba(138,111,90,0.15)] space-y-2 text-[11px] text-[#81756d]">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={13} className="text-[#705743]" />
                <span>Zero synthetic fibers, guaranteed 100% natural linen/cotton.</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={13} className="text-[#705743]" />
                <span>Lifetime atelier repair & stitch restoration warranty.</span>
              </div>
            </div>

          </div>
        </div>

      </form>
    </div>
  );
}
