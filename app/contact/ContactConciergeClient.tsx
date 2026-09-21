"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  MapPin,
  Mail,
  Phone,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Send,
  Building,
  Layers,
  Heart,
  Calendar,
  Scissors,
  Loader2,
} from "lucide-react";
import { submitContactInquiry } from "@/app/actions/contact";

export default function ContactConciergeClient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [classification, setClassification] = useState("Bespoke Commission (Custom Colorway / Sizing / Bridal)");
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [referenceCode, setReferenceCode] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await submitContactInquiry({
        name,
        email,
        classification,
        details,
      });

      if (res.success && res.referenceCode) {
        setReferenceCode(res.referenceCode);
      } else {
        setErrorMessage(res.error || "Unable to transmit inquiry. Please try again.");
      }
    } catch {
      setErrorMessage("An unexpected transmission fault occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#fdf8f5] text-[#1c1b1a] font-sans antialiased">
      
      {/* 1. TOP ANNOUNCEMENT SUB-BAR */}
      <div className="border-b border-[#ebdccb] bg-[#f7f2eb] py-2 px-4 text-center text-[11px] text-[#705743]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <span className="font-semibold tracking-archival uppercase text-[10px] text-[#8a6f5a]">
            • ATELIER CONCIERGE & PRIVATE ORDERS
          </span>
          <div className="flex items-center gap-4 text-[10.5px]">
            <span>Average Response: 12 Hours</span>
            <span>•</span>
            <span>Bespoke Craft Guarantee</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-20">
        
        {/* 2. TWO-COLUMN HERO LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          
          {/* LEFT COLUMN: Narrative & Transmission Form */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Header Title Block */}
            <div className="space-y-4">
              <span className="text-[10.5px] font-bold tracking-[0.2em] uppercase text-[#8a6f5a] block">
                HAND CRAFTED UPON REQUEST
              </span>
              <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-[#1c1b1a] font-normal leading-[1.08] tracking-tight">
                Let&apos;s Create <br />
                <span className="italic text-[#705743]">Something Beautiful</span>
              </h1>
              <p className="text-sm sm:text-base text-[#4f453e] max-w-xl leading-relaxed">
                We welcome custom fiber palettes, sculptural bridal headwear, and architectural interior commissions crafted on hand-stretched beechwood looms.
              </p>
            </div>

            {/* Direct Contact Cards (2 Grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Paris Atelier */}
              <div className="p-5 bg-white border border-[#e8dbc9] rounded-sm space-y-2 shadow-2xs">
                <div className="flex items-center gap-2 text-[10.5px] font-bold tracking-archival uppercase text-[#8a6f5a]">
                  <Building size={13} />
                  <span>PARISIAN ATELIER</span>
                </div>
                <h3 className="font-editorial text-lg text-[#1c1b1a]">
                  14 Rue des Artisans
                </h3>
                <p className="text-xs text-[#594d42] leading-relaxed">
                  75003 Paris, France <br />
                  Studio visits by private appointment
                </p>
                <span className="text-[10px] text-emerald-800 font-semibold block pt-1">
                  • WELCOMING SPRING GUESTS
                </span>
              </div>

              {/* Direct Liaison */}
              <div className="p-5 bg-white border border-[#e8dbc9] rounded-sm space-y-2 shadow-2xs">
                <div className="flex items-center gap-2 text-[10.5px] font-bold tracking-archival uppercase text-[#8a6f5a]">
                  <Mail size={13} />
                  <span>DIRECT LIAISON</span>
                </div>
                <p className="font-editorial text-lg text-[#1c1b1a]">
                  atelier@ea-atelier.com
                </p>
                <p className="text-xs text-[#594d42]">
                  Telephone Desk: +33 (0)1 42 68 00 21
                </p>
                <span className="text-[10px] text-[#81756d] block pt-1">
                  Mon–Fri 09:30–18:30 CET
                </span>
              </div>

            </div>

            {/* Artisanal Specialty Fields */}
            <div className="bg-[#f7f2eb] border border-[#e8dbc9] rounded-sm p-6 space-y-4">
              <div className="flex items-center justify-between text-xs border-b border-[#e2d5c2] pb-3">
                <span className="text-[10px] font-bold tracking-[0.16em] uppercase text-[#705743]">
                  ARTISANAL SPECIALTY FIELDS
                </span>
                <span className="text-[10px] text-[#81756d] font-semibold">
                  Turnaround 3–4 Weeks
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <h4 className="text-xs font-semibold text-[#1c1b1a] flex items-center gap-1.5">
                    <Sparkles size={12} className="text-[#8a6f5a]" /> Colorways
                  </h4>
                  <p className="text-[11px] text-[#594d42] leading-relaxed">
                    Vegetal and mineral kettle dye baths tailored to personal swatches.
                  </p>
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs font-semibold text-[#1c1b1a] flex items-center gap-1.5">
                    <Sparkles size={12} className="text-[#8a6f5a]" /> Bridal Accents
                  </h4>
                  <p className="text-[11px] text-[#594d42] leading-relaxed">
                    Bespoke veils, heirloom wristlets, and sculptural coronas in wild silk yarn.
                  </p>
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs font-semibold text-[#1c1b1a] flex items-center gap-1.5">
                    <Sparkles size={12} className="text-[#8a6f5a]" /> Interior Art
                  </h4>
                  <p className="text-[11px] text-[#594d42] leading-relaxed">
                    Textile vessels, textured table runners, and wall hangings for modern sanctums.
                  </p>
                </div>
              </div>
            </div>

            {/* Atelier Space Image Banner */}
            <div className="relative aspect-[16/7] w-full rounded-sm overflow-hidden border border-[#e8dbc9] bg-[#efe7da] shadow-sm">
              <Image
                src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=1200&auto=format&fit=crop"
                alt="The Atelier Space"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-[9.5px] font-bold tracking-archival uppercase text-[#d8c8b5]">
                  THE ATELIER SPACE
                </span>
                <h3 className="font-editorial text-2xl text-white">
                  Open Loom Hours Every Thursday
                </h3>
              </div>
            </div>

            {/* Inquiry Transmission Form */}
            <div className="bg-white border border-[#e8dbc9] rounded-sm p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="border-b border-[#f0e6d6] pb-4 space-y-1">
                <span className="text-[10px] font-bold tracking-archival uppercase text-[#8a6f5a]">
                  INQUIRY TRANSMISSION
                </span>
                <h2 className="font-editorial text-2xl sm:text-3xl text-[#1c1b1a]">
                  Initiate a Conversation
                </h2>
                <p className="text-xs text-[#594d42]">
                  Share your vision, dimensions, or sensible questions with master artisans Elena &amp; Aurel.
                </p>
              </div>

              {referenceCode ? (
                <div className="p-8 bg-[#f7f2eb] border border-[#e8dbc9] text-center space-y-3 rounded-sm animate-in fade-in duration-300">
                  <div className="w-12 h-12 rounded-full bg-[#efe7da] text-[#705743] flex items-center justify-center mx-auto">
                    <CheckCircle2 size={24} />
                  </div>
                  <h3 className="font-editorial text-2xl text-[#1c1b1a]">
                    Transmission Inscribed
                  </h3>
                  <div className="inline-block bg-white border border-[#d8c8b4] px-3 py-1 rounded-sm text-xs font-mono text-[#5c4533] font-bold tracking-wider">
                    REF: {referenceCode}
                  </div>
                  <p className="text-xs text-[#594d42] max-w-sm mx-auto leading-relaxed">
                    Merci, {name || "Patron"}. Our atelier direct liaison has received your brief and inscribed it into our register. We will respond within 12 business hours.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setReferenceCode(null);
                        setName("");
                        setEmail("");
                        setDetails("");
                      }}
                      className="text-[11px] font-semibold tracking-archival uppercase text-[#8a6f5a] hover:underline"
                    >
                      Transmit another brief
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  {errorMessage && (
                    <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-sm">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-semibold tracking-archival uppercase text-[#4f453e]">
                        YOUR FULL NAME *
                      </label>
                      <input
                        type="text"
                        required
                        disabled={isSubmitting}
                        placeholder="e.g. Camille Laurent"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#fdf8f5] border border-[#d8c8b4] px-3.5 py-2.5 text-xs text-[#1c1b1a] rounded-sm focus:outline-none focus:border-[#8a6f5a] disabled:opacity-50"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-semibold tracking-archival uppercase text-[#4f453e]">
                        CORRESPONDENCE EMAIL *
                      </label>
                      <input
                        type="email"
                        required
                        disabled={isSubmitting}
                        placeholder="camille@domain.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#fdf8f5] border border-[#d8c8b4] px-3.5 py-2.5 text-xs text-[#1c1b1a] rounded-sm focus:outline-none focus:border-[#8a6f5a] disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold tracking-archival uppercase text-[#4f453e]">
                      INQUIRY CLASSIFICATION *
                    </label>
                    <select
                      value={classification}
                      disabled={isSubmitting}
                      onChange={(e) => setClassification(e.target.value)}
                      className="w-full bg-[#fdf8f5] border border-[#d8c8b4] px-3.5 py-2.5 text-xs text-[#1c1b1a] rounded-sm focus:outline-none focus:border-[#8a6f5a] disabled:opacity-50"
                    >
                      <option value="Bespoke Commission (Custom Colorway / Sizing / Bridal)">
                        Bespoke Commission (Custom Colorway / Sizing / Bridal)
                      </option>
                      <option value="Curatorial Inquiry & Exhibition Loan">
                        Curatorial Inquiry &amp; Exhibition Loan
                      </option>
                      <option value="Interior Architecture Placement">
                        Interior Architecture Placement
                      </option>
                      <option value="General Atelier Query">General Atelier Query</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <label className="text-[11px] font-semibold tracking-archival uppercase text-[#4f453e]">
                        DESIGN DETAILS &amp; TIMELINE
                      </label>
                      <span className="text-[10px] text-[#81756d]">Optional attachments via return email</span>
                    </div>
                    <textarea
                      rows={4}
                      disabled={isSubmitting}
                      placeholder="Describe your desired palette, garment silhouette, wedding date, or custom dimensions..."
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      className="w-full bg-[#fdf8f5] border border-[#d8c8b4] p-3 text-xs text-[#1c1b1a] rounded-sm focus:outline-none focus:border-[#8a6f5a] disabled:opacity-50"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-[10.5px] text-[#81756d]">
                      🔒 Privacy guaranteed. Zero promotional spam.
                    </span>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-8 py-3 bg-[#1c1b1a] hover:bg-[#8a6f5a] disabled:opacity-60 text-[#f8f4ed] text-xs font-semibold tracking-archival uppercase rounded-sm transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          <span>TRANSMITTING...</span>
                        </>
                      ) : (
                        <span>TRANSMIT INQUIRY &rarr;</span>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Interactive Studio Location Map Box */}
            <div className="p-5 bg-white border border-[#e8dbc9] rounded-sm space-y-3 shadow-2xs">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-editorial text-base text-[#1c1b1a]">
                    Interactive Studio Location
                  </h4>
                  <p className="text-[11px] text-[#81756d]">
                    Upper Marais craft district, 4 minutes from Musée Picasso
                  </p>
                </div>
                <span className="text-[10.5px] font-semibold text-[#8a6f5a] uppercase tracking-wider">
                  DIRECTIONS [↗]
                </span>
              </div>

              {/* Styled Vector Map Mock */}
              <div className="h-44 w-full bg-[#ede5d8] rounded-sm border border-[#d8c8b4] relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#8a6f5a_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className="relative z-10 p-3 bg-white/95 border border-[#d8c8b4] rounded shadow-md text-center space-y-0.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#8a6f5a] animate-ping inline-block mx-auto mb-1" />
                  <p className="font-editorial text-xs font-semibold text-[#1c1b1a]">
                    E&A Atelier Paris
                  </p>
                  <p className="text-[10px] text-[#705743]">14 Rue des Artisans, 75003</p>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: "Your Atelier Bag" (Sticky Commerce Sidebar) */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            
            <div className="bg-white border border-[#e8dbc9] rounded-sm p-6 sm:p-7 shadow-xs space-y-5">
              
              {/* Bag Header */}
              <div className="flex items-center justify-between border-b border-[#f0e6d6] pb-4">
                <div>
                  <h3 className="font-editorial text-xl text-[#1c1b1a]">
                    Your Atelier Bag
                  </h3>
                  <p className="text-[10.5px] text-[#81756d]">
                    3 Limited Batch Items
                  </p>
                </div>
                <span className="text-[10px] font-mono font-semibold text-[#8a6f5a] bg-[#f7f2eb] px-2 py-0.5 rounded border border-[#e8dbc9]">
                  HOLD NO: 2014
                </span>
              </div>

              {/* Express Progress Bar */}
              <div className="p-3 bg-[#faf6f0] border border-[#e8dbc9] rounded-sm space-y-1.5 text-xs">
                <div className="flex justify-between items-center text-[10.5px]">
                  <span className="font-semibold text-[#705743]">EXPRESS PROGRESS</span>
                  <span className="text-[#81756d] font-mono">$15.09 away</span>
                </div>
                <div className="w-full bg-[#e6dbc9] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#8a6f5a] h-full rounded-full" style={{ width: "92%" }} />
                </div>
                <p className="text-[10px] text-[#81756d]">
                  You are <strong className="text-[#1c1b1a]">$15 away</strong> from complimentary worldwide express courier delivery.
                </p>
              </div>

              {/* 3 Cart Items */}
              <div className="space-y-4 divide-y divide-[#f0e6d6]">
                
                {/* Item 1 */}
                <div className="flex gap-3.5 pt-3 first:pt-0">
                  <div className="w-16 h-20 relative bg-[#efe7da] rounded overflow-hidden flex-shrink-0 border border-[#d8c8b4]">
                    <Image
                      src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=200&auto=format&fit=crop"
                      alt="The Luna Raffia-Cotton Net Tote"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between text-xs">
                    <div>
                      <h4 className="font-editorial text-sm font-semibold text-[#1c1b1a]">
                        The Luna Raffia-Cotton Net Tote
                      </h4>
                      <p className="text-[10.5px] text-[#81756d]">Color: Desert Ecru</p>
                      <p className="text-[10px] text-[#705743] uppercase">EMBROIDERED HAND-KNOTTED</p>
                    </div>
                    <div className="flex justify-between items-center pt-1">
                      <span className="text-[10px] text-[#81756d]">Qty: 1</span>
                      <span className="font-semibold text-[#1c1b1a]">$285.00</span>
                    </div>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="flex gap-3.5 pt-4">
                  <div className="w-16 h-20 relative bg-[#efe7da] rounded overflow-hidden flex-shrink-0 border border-[#d8c8b4]">
                    <Image
                      src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=200&auto=format&fit=crop"
                      alt="Sienna Scallop Crochet Vest"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between text-xs">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-editorial text-sm font-semibold text-[#1c1b1a]">
                          Sienna Scallop Crochet Vest
                        </h4>
                      </div>
                      <p className="text-[10.5px] text-[#81756d]">Color: Melange • <span className="bg-[#efe7da] px-1 rounded text-[9.5px]">Size: S/M</span></p>
                      <p className="text-[10px] text-[#705743] uppercase">VIRGIN MERINO & PIMA COTTON</p>
                    </div>
                    <div className="flex justify-between items-center pt-1">
                      <span className="text-[10px] text-[#81756d]">Qty: 1</span>
                      <span className="font-semibold text-[#1c1b1a]">$340.00</span>
                    </div>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="flex gap-3.5 pt-4">
                  <div className="w-16 h-20 relative bg-[#efe7da] rounded overflow-hidden flex-shrink-0 border border-[#d8c8b4]">
                    <Image
                      src="https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?q=80&w=200&auto=format&fit=crop"
                      alt="Botanical Silk-Cotton Scrunchie"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between text-xs">
                    <div>
                      <h4 className="font-editorial text-sm font-semibold text-[#1c1b1a]">
                        Botanical Silk-Cotton Scrunchie
                      </h4>
                      <p className="text-[10.5px] text-[#81756d]">Color: Olive</p>
                      <p className="text-[10px] text-[#705743] uppercase">ZERO-WASTE SILK CUTTING</p>
                    </div>
                    <div className="flex justify-between items-center pt-1">
                      <span className="text-[10px] text-[#81756d]">Qty: 1</span>
                      <span className="font-semibold text-[#1c1b1a]">$55.00</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Packaging Callout */}
              <div className="p-3 bg-[#f7f2eb] border border-[#e8dbc9] rounded-sm text-[11px] text-[#594d42] space-y-0.5">
                <span className="font-semibold text-[#1c1b1a] block">
                  COMPLIMENTARY ATELIER PACKAGING
                </span>
                <p>
                  Includes organic raw unbleached linen dustbag &amp; wax-sealed calligraphy card.
                </p>
              </div>

              {/* Pricing Totals */}
              <div className="space-y-1.5 text-xs pt-1 border-t border-[#f0e6d6]">
                <div className="flex justify-between text-[#594d42]">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#1c1b1a]">$680.00</span>
                </div>
                <div className="flex justify-between text-[#594d42]">
                  <span>Carbon-Neutral Delivery</span>
                  <span className="font-semibold text-emerald-800 uppercase text-[10px]">FREE</span>
                </div>
                <div className="flex justify-between text-[#594d42]">
                  <span>Atelier Linen Dustbag &amp; Gift Note</span>
                  <span className="font-semibold text-[#705743] uppercase text-[10px]">COMPLIMENTARY ($0.00)</span>
                </div>
                <div className="pt-2.5 border-t border-[#e8dbc9] flex justify-between items-baseline">
                  <div>
                    <span className="font-editorial text-xl text-[#1c1b1a]">Total</span>
                    <span className="text-[10px] text-[#81756d] block font-sans">USD INCLUDED DUES</span>
                  </div>
                  <span className="font-editorial text-2xl text-[#1c1b1a] font-semibold">
                    $680.00 USD
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <div className="space-y-2 pt-1">
                <Link
                  href="/checkout"
                  className="w-full block text-center py-3.5 bg-[#5c4533] hover:bg-[#433123] text-white text-xs font-semibold tracking-archival uppercase rounded-sm transition-colors shadow-sm"
                >
                  PROCEED TO SECURE CHECKOUT &rarr;
                </Link>

                <button className="w-full py-2.5 bg-[#f5efe6] border border-[#d8c8b4] text-[#3d2e24] text-[11px] font-semibold tracking-archival uppercase rounded-sm hover:bg-[#efe7da] transition-colors">
                  ⚡ EXPRESS 1-CLICK PAY WITH STORED PROFILE
                </button>
              </div>

              {/* Payment Methods */}
              <div className="pt-1 text-center space-y-1 text-[10px] text-[#81756d]">
                <span className="uppercase tracking-wider block">DIRECT ENCRYPTED CHECKOUT WITH</span>
                <div className="flex justify-center gap-2 font-mono text-[9.5px] text-[#4f453e]">
                  <span>Apple Pay</span> • <span>Google Pay</span> • <span>Visa</span> • <span>Mastercard</span> • <span>Klarna</span>
                </div>
              </div>

              {/* Certificate Note */}
              <div className="p-3 bg-[#faf6f0] border border-[#e8dbc9] rounded-sm text-[10.5px] text-[#594d42] leading-relaxed flex items-start gap-2">
                <ShieldCheck size={14} className="text-[#8a6f5a] flex-shrink-0 mt-0.5" />
                <span>
                  &ldquo;Each piece is freshly examined, steam-finished, and nestled in unbleached organic linen packaging with a master artisan certificate of authenticity.&rdquo;
                </span>
              </div>

              {/* Heirloom Longevity Guarantee */}
              <div className="text-center pt-2 space-y-0.5">
                <div className="text-xs font-semibold text-[#1c1b1a] flex items-center justify-center gap-1.5">
                  <Sparkles size={12} className="text-[#8a6f5a]" />
                  <span>Heirloom Longevity Guarantee</span>
                </div>
                <p className="text-[10px] text-[#81756d]">
                  Every E&amp;A piece includes lifetime stitch maintenance and complimentary botanical re-blocking at our Paris atelier.
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* 3. BOTTOM SECTION: THE ANATOMY OF AN HEIRLOOM */}
        <div className="space-y-8 pt-12 border-t border-[#ebdccb]">
          <div className="max-w-2xl space-y-2">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#8a6f5a] block">
              SLOW CRAFT PHILOSOPHY
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#1c1b1a]">
              The Anatomy of an Heirloom
            </h2>
            <p className="text-xs text-[#594d42] leading-relaxed">
              Our crochet loop sequences cannot be replicated by industrial machinery. Every stitch is formed by human hands using hand-harvested European fibers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* 01 */}
            <div className="p-6 bg-white border border-[#e8dbc9] rounded-sm space-y-3 shadow-2xs">
              <div className="w-10 h-10 rounded-full bg-[#f5efe6] text-[#705743] flex items-center justify-center">
                <Layers size={18} />
              </div>
              <h3 className="font-editorial text-lg text-[#1c1b1a]">
                01. Raw Fibers
              </h3>
              <p className="text-xs text-[#594d42] leading-relaxed">
                Certified GOTS organic cotton from Normandy paired with Peruvian Pima cotton.
              </p>
            </div>

            {/* 02 */}
            <div className="p-6 bg-white border border-[#e8dbc9] rounded-sm space-y-3 shadow-2xs">
              <div className="w-10 h-10 rounded-full bg-[#f5efe6] text-[#705743] flex items-center justify-center">
                <Sparkles size={18} />
              </div>
              <h3 className="font-editorial text-lg text-[#1c1b1a]">
                02. Plant Dyes
              </h3>
              <p className="text-xs text-[#594d42] leading-relaxed">
                Madder root, oak bark, and pomegranate skins brewed slowly in small copper vats.
              </p>
            </div>

            {/* 03 */}
            <div className="p-6 bg-white border border-[#e8dbc9] rounded-sm space-y-3 shadow-2xs">
              <div className="w-10 h-10 rounded-full bg-[#f5efe6] text-[#705743] flex items-center justify-center">
                <Scissors size={18} />
              </div>
              <h3 className="font-editorial text-lg text-[#1c1b1a]">
                03. Hand Loop
              </h3>
              <p className="text-xs text-[#594d42] leading-relaxed">
                18 to 44 continuous hours of manual needlework to engender zero fabric waste.
              </p>
            </div>

            {/* 04 */}
            <div className="p-6 bg-white border border-[#e8dbc9] rounded-sm space-y-3 shadow-2xs">
              <div className="w-10 h-10 rounded-full bg-[#f5efe6] text-[#705743] flex items-center justify-center">
                <Calendar size={18} />
              </div>
              <h3 className="font-editorial text-lg text-[#1c1b1a]">
                04. Signed Edition
              </h3>
              <p className="text-xs text-[#594d42] leading-relaxed">
                Numbered cast-iron heritage seal stamped by Elena &amp; Aurel.
              </p>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
