"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  Printer,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  MapPin,
  Mail,
  FileText,
} from "lucide-react";
import { CURRENCIES } from "@/app/context/StoreContext";

interface OrderItemData {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  craftHours: number;
  fiber: string;
  colorway: string;
  dimension: string;
  quantity: number;
  unitPriceUSD: number;
}

interface OrderData {
  id: string;
  customerName: string;
  customerEmail: string;
  currency: "NGN" | "USD" | "EUR" | "GBP";
  fxRate: number;
  subtotalUSD: number;
  status: "PENDING" | "PAID" | "FULFILLED" | "CANCELLED";
  shippingLine1: string;
  shippingLine2?: string | null;
  shippingCity: string;
  shippingRegion?: string | null;
  shippingPostal?: string | null;
  shippingCountry: string;
  createdAt: string;
  items: OrderItemData[];
}

export default function OrderConfirmationClient({ order }: { order: OrderData }) {
  const shortId = order.id.slice(-8).toUpperCase();
  const currencySymbol = CURRENCIES[order.currency]?.symbol || "$";
  const formattedDate = new Date(order.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formatOrderCurrency = (amountUSD: number) => {
    const converted = amountUSD * order.fxRate;
    if (order.currency === "NGN") {
      return `₦${Math.round(converted).toLocaleString("en-NG")}`;
    }
    if (order.currency === "USD") {
      return `$${Math.round(converted).toLocaleString("en-US")}`;
    }
    if (order.currency === "EUR") {
      return `€${Math.round(converted).toLocaleString("de-DE")}`;
    }
    if (order.currency === "GBP") {
      return `£${Math.round(converted).toLocaleString("en-GB")}`;
    }
    return `${currencySymbol}${Math.round(converted)}`;
  };

  const deliveryUSD = order.subtotalUSD >= 300 ? 0 : 25;
  const grandTotalUSD = order.subtotalUSD + deliveryUSD;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 font-sans">
      
      {/* Editorial Certificate Container */}
      <div className="bg-white border border-[rgba(138,111,90,0.25)] rounded-sm shadow-lg overflow-hidden print:border-none print:shadow-none">
        
        {/* Certificate Header Banner */}
        <div className="bg-[#242321] text-[#f8f4ed] p-8 sm:p-12 text-center space-y-4 relative">
          <div className="inline-flex max-w-full flex-wrap items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-[10.5px] font-semibold tracking-archival uppercase text-[#d8c8b5]">
            <Sparkles size={12} />
            <span>OFFICIAL ATELIER BATCH CERTIFICATE</span>
          </div>

          <div className="space-y-2">
            <h1 className="font-editorial text-3xl sm:text-5xl text-white tracking-tight">
              Order Preserved in the Archive
            </h1>
            <p className="text-xs sm:text-sm text-[#d8c8b5]/85 max-w-md mx-auto leading-relaxed">
              Merci, {order.customerName}. Your allocation has been officially entered into our Provence studio register.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-[#d8c8b5]/90">
            <span className="bg-white/10 px-3 py-1.5 rounded-sm">
              REF: #EA-{shortId}
            </span>
            <span>•</span>
            <span>{formattedDate}</span>
            <span>•</span>
            <span className="text-[#e2a876] font-semibold">
              STATUS: {order.status === "PENDING" ? "BATCH RESERVED" : order.status}
            </span>
          </div>
        </div>

        {/* Action Bar (Print / Shop) */}
        <div className="p-4 sm:px-8 bg-[#efe7da]/50 border-b border-[rgba(138,111,90,0.18)] flex flex-wrap items-center justify-between gap-4 print:hidden">
          <span className="text-xs text-[#705743] flex items-center gap-1.5">
            <CheckCircle2 size={15} />
            <span>A signed copy will accompany your wax-sealed delivery parcel.</span>
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-[rgba(138,111,90,0.3)] hover:bg-[#f7f3ef] text-[#1c1b1a] rounded-sm text-xs font-semibold tracking-archival uppercase transition-colors"
            >
              <Printer size={13} />
              <span>PRINT CERTIFICATE</span>
            </button>
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#242321] hover:bg-[#8a6f5a] text-[#f8f4ed] rounded-sm text-xs font-semibold tracking-archival uppercase transition-colors"
            >
              <span>RETURN TO SHOP</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        <div className="p-6 sm:p-10 space-y-10">
          
          {/* Production Cadence Tracker */}
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-[rgba(138,111,90,0.15)] pb-3">
              <h2 className="font-editorial text-xl text-[#1c1b1a]">
                Production & Weaving Progression
              </h2>
              <span className="text-[10.5px] font-semibold tracking-archival uppercase text-[#8a6f5a]">
                CIRCADIAN ATELIER PIPELINE
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
              {[
                {
                  step: "01",
                  title: "Batch Reserved",
                  desc: "Entry secured in physical studio registry.",
                  status: "COMPLETED",
                  color: "bg-[#705743] text-white",
                },
                {
                  step: "02",
                  title: "Tension Calibration",
                  desc: "Unbleached fiber prepared on boxwood hooks.",
                  status: "STUDIO ACTIVE",
                  color: "bg-[#8a6f5a] text-white",
                },
                {
                  step: "03",
                  title: "Botanical Baths",
                  desc: "Kettle immersion & structural inspection.",
                  status: "UPCOMING",
                  color: "bg-[#e6e2de] text-[#4f453e]",
                },
                {
                  step: "04",
                  title: "Wax-Sealed Courier",
                  desc: "Tracked DHL Express carbon-neutral handover.",
                  status: "UPCOMING",
                  color: "bg-[#e6e2de] text-[#4f453e]",
                },
              ].map((phase) => (
                <div
                  key={phase.step}
                  className="p-4 bg-[#fdf8f5] border border-[rgba(138,111,90,0.18)] rounded-sm space-y-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-editorial text-lg text-[#705743]">{phase.step}</span>
                    <span className={`text-[8.5px] font-bold tracking-archival uppercase px-2 py-0.5 rounded ${phase.color}`}>
                      {phase.status}
                    </span>
                  </div>
                  <h3 className="font-editorial text-base text-[#1c1b1a]">{phase.title}</h3>
                  <p className="text-[11px] text-[#4f453e] leading-snug">{phase.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Two Columns: Collector Address & Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-[rgba(138,111,90,0.18)]">
            
            {/* Collector Address */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold tracking-archival uppercase text-[#8a6f5a] flex items-center gap-1.5">
                <MapPin size={14} />
                <span>DISPATCH DESTINATION</span>
              </h3>
              <div className="bg-[#fdf8f5] p-5 rounded-sm border border-[rgba(138,111,90,0.15)] text-xs space-y-1 text-[#4f453e]">
                <p className="font-semibold text-[#1c1b1a] text-sm">{order.customerName}</p>
                <p>{order.shippingLine1}</p>
                {order.shippingLine2 && <p>{order.shippingLine2}</p>}
                <p>
                  {order.shippingCity}
                  {order.shippingRegion ? `, ${order.shippingRegion}` : ""}{" "}
                  {order.shippingPostal || ""}
                </p>
                <p className="font-medium text-[#1c1b1a]">{order.shippingCountry}</p>
                <p className="pt-2 text-[11px] text-[#81756d] flex items-center gap-1">
                  <Mail size={12} /> {order.customerEmail}
                </p>
              </div>
            </div>

            {/* Atelier Assurance */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold tracking-archival uppercase text-[#8a6f5a] flex items-center gap-1.5">
                <ShieldCheck size={14} />
                <span>HEIRLOOM CREDENTIALS</span>
              </h3>
              <div className="bg-[#fdf8f5] p-5 rounded-sm border border-[rgba(138,111,90,0.15)] text-xs space-y-2.5 text-[#4f453e]">
                <p className="leading-relaxed">
                  Every loop is inspected by our master knitter in Saint-Rémy-de-Provence before dispatch.
                </p>
                <div className="pt-1 space-y-1 text-[11px] text-[#705743]">
                  <p>• Zero petroleum-derived acrylics or synthetic yarn</p>
                  <p>• Lifetime complimentary stitch restoration advisory</p>
                  <p>• Wax-stamped Maker Registry Certificate enclosed</p>
                </div>
              </div>
            </div>

          </div>

          {/* Itemized Order Table */}
          <section className="space-y-4 pt-4 border-t border-[rgba(138,111,90,0.18)]">
            <h2 className="font-editorial text-xl text-[#1c1b1a] flex items-center gap-2">
              <FileText size={18} className="text-[#8a6f5a]" />
              <span>Allocated Heirlooms ({order.items.length})</span>
            </h2>

            <div className="border border-[rgba(138,111,90,0.2)] rounded-sm overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#efe7da]/60 border-b border-[rgba(138,111,90,0.18)] text-[#705743] font-semibold tracking-archival uppercase text-[10px]">
                  <tr>
                    <th className="p-3.5">Heirloom</th>
                    <th className="p-3.5 hidden sm:table-cell">Specifications</th>
                    <th className="p-3.5 text-center">Qty</th>
                    <th className="p-3.5 text-right">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(138,111,90,0.12)]">
                  {order.items.map((item) => (
                    <tr key={item.id} className="hover:bg-[#fdf8f5] transition-colors">
                      <td className="p-3.5 flex items-center gap-3">
                        {item.productImage && (
                          <div className="w-12 h-14 relative rounded-sm overflow-hidden bg-[#f1ede9] flex-shrink-0 border border-[rgba(138,111,90,0.2)]">
                            <Image
                              src={item.productImage}
                              alt={item.productName}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <p className="font-editorial text-sm text-[#1c1b1a] font-medium">
                            {item.productName}
                          </p>
                          <p className="text-[11px] text-[#81756d]">
                            Color: {item.colorway} • Size: {item.dimension}
                          </p>
                        </div>
                      </td>
                      <td className="p-3.5 hidden sm:table-cell text-[#4f453e]">
                        <p className="text-[11px]">{item.fiber}</p>
                        <p className="text-[10px] text-[#81756d] italic">{item.craftHours}h Handcraft</p>
                      </td>
                      <td className="p-3.5 text-center font-medium text-[#1c1b1a]">
                        {item.quantity}
                      </td>
                      <td className="p-3.5 text-right font-medium text-[#1c1b1a]">
                        {formatOrderCurrency(item.unitPriceUSD * item.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Financial Totals */}
            <div className="max-w-xs ml-auto space-y-2 text-xs pt-3">
              <div className="flex justify-between text-[#4f453e]">
                <span>Batch Subtotal</span>
                <span className="font-medium text-[#1c1b1a]">
                  {formatOrderCurrency(order.subtotalUSD)}
                </span>
              </div>
              <div className="flex justify-between text-[#4f453e]">
                <span>Carbon Courier Delivery</span>
                <span className="font-medium text-[#1c1b1a]">
                  {deliveryUSD === 0 ? "Complimentary" : formatOrderCurrency(deliveryUSD)}
                </span>
              </div>
              <div className="flex justify-between text-[#4f453e]">
                <span>Wax-Stamped Certificate</span>
                <span className="font-medium text-[#1c1b1a]">Complimentary</span>
              </div>
              <div className="pt-2.5 border-t border-[rgba(138,111,90,0.18)] flex justify-between text-base font-semibold text-[#1c1b1a]">
                <span>Total Due</span>
                <span className="text-[#705743]">{formatOrderCurrency(grandTotalUSD)}</span>
              </div>
            </div>
          </section>

        </div>

        {/* Footer Seal */}
        <div className="p-6 bg-[#f7f3ef] border-t border-[rgba(138,111,90,0.18)] text-center text-xs text-[#81756d] space-y-1">
          <p className="font-editorial text-sm text-[#1c1b1a]">
            E&A Atelier • Saint-Rémy-de-Provence & Lagos Studio
          </p>
          <p className="text-[10px] tracking-archival uppercase">
            Slow Luxury Heirlooms Spun With Deliberate Stillness
          </p>
        </div>

      </div>

    </div>
  );
}
