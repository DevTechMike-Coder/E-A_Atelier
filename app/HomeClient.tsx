"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { STITCHES, Product } from "./data/products";
import ProductCard from "./components/ProductCard";
import { useStore } from "./context/StoreContext";
import { Sparkles, ArrowRight, Clock, ShieldCheck, Eye, Quote, Check, Loader2 } from "lucide-react";
import { subscribeToNewsletter } from "@/app/actions/newsletter";

export default function HomeClient({ products }: { products: Product[] }) {
  const { openStitchModal, openBespokeModal } = useStore();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterDone, setNewsletterDone] = useState(false);
  const [newsletterSubmitting, setNewsletterSubmitting] = useState(false);
  const [newsletterError, setNewsletterError] = useState<string | null>(null);

  // Filter curated products for collection tab
  const getFilteredProducts = (): Product[] => {
    if (activeTab === "all") return products.slice(0, 4);
    if (activeTab === "bags") return products.filter((p) => p.category === "bags");
    if (activeTab === "wearables") return products.filter((p) => p.category === "wearables");
    if (activeTab === "accents") return products.filter((p) => p.category === "accessories");
    if (activeTab === "limited") return products.filter((p) => p.status === "Limited Edition" || p.status === "Made on Demand");
    return products.slice(0, 4);
  };

  const categories = [
    {
      title: "Crochet Bags",
      count: "10 Curated Creations",
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop",
      href: "/shop?category=bags",
    },
    {
      title: "Wearables",
      count: "Coming Soon Capsule",
      badge: "Coming Soon",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
      href: "/wearables",
    },
    {
      title: "Accessories",
      count: "Hats, Wraps & Bands",
      image: "https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?q=80&w=800&auto=format&fit=crop",
      href: "/shop?category=accessories",
    },
    {
      title: "Home & Living",
      count: "Vessels, Runners & Decor",
      image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=800&auto=format&fit=crop",
      href: "/shop?category=home",
    },
    {
      title: "Artisanal Gifts",
      count: "Boxed Heirloom Sets",
      image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=800&auto=format&fit=crop",
      href: "/shop?category=accessories",
    },
  ];

  return (
    <div className="w-full space-y-24 sm:space-y-32 pb-24 overflow-hidden font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Hero Left Column */}
          <div className="lg:col-span-6 space-y-8">
            <div className="inline-flex max-w-full flex-wrap items-center gap-2 px-3 py-1 bg-[#efe7da] border border-[rgba(138,111,90,0.2)] rounded-full text-[9.5px] sm:text-[10.5px] font-semibold tracking-archival uppercase text-[#705743] leading-snug">
              <Sparkles size={13} className="text-[#8a6f5a] flex-shrink-0" />
              <span className="min-w-0 break-words">EDITION N° 04 / SPRING RELEASE • PROVENCE 2026</span>
            </div>

            <div className="space-y-4">
              <h1 className="font-editorial text-[2.6rem] sm:text-6xl md:text-[68px] leading-[1.08] text-[#1c1b1a] tracking-tight font-normal">
                Handmade, <br />
                <span className="italic font-normal text-[#705743]">With intention.</span>
              </h1>

              <p className="text-sm sm:text-base text-[#4f453e] leading-relaxed max-w-lg font-normal">
                Slowly spun, individually hand-crocheted heirloom pieces crafted with unhurried care from pure organic materials. From our sunlit Provence studio to your everyday ritual.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/shop"
                className="bg-[#242321] text-[#f8f4ed] hover:bg-[#8a6f5a] transition-all px-7 py-3.5 text-xs font-semibold tracking-archival uppercase rounded-sm shadow-md"
              >
                EXPLORE COLLECTION &rarr;
              </Link>
              <Link
                href="/craft"
                className="border border-[rgba(138,111,90,0.35)] hover:bg-[#efe7da] text-[#242321] transition-all px-7 py-3.5 text-xs font-semibold tracking-archival uppercase rounded-sm"
              >
                THE ATELIER & CRAFT
              </Link>
            </div>

            {/* 3 Metric Pills */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[rgba(138,111,90,0.18)] max-w-lg">
              <div>
                <span className="font-editorial text-2xl text-[#1c1b1a] block">100%</span>
                <span className="text-[10px] tracking-archival uppercase text-[#81756d] font-semibold">
                  Organic Fibers
                </span>
              </div>
              <div>
                <span className="font-editorial text-2xl text-[#1c1b1a] block">14h+</span>
                <span className="text-[10px] tracking-archival uppercase text-[#81756d] font-semibold">
                  Average Per Piece
                </span>
              </div>
              <div>
                <span className="font-editorial text-2xl text-[#1c1b1a] block">Limited</span>
                <span className="text-[10px] tracking-archival uppercase text-[#81756d] font-semibold">
                  12 Pieces per Batch
                </span>
              </div>
            </div>
          </div>

          {/* Hero Right Column: Large Sunlit Portrait */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] w-full rounded-sm overflow-hidden border border-[rgba(138,111,90,0.22)] shadow-xl bg-[#efe7da]">
              <Image
                src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=1200&auto=format&fit=crop"
                alt="Artisan in sunlit Provence atelier crocheting"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />

              {/* Floating Pill: Botanical Dyes */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md border border-[rgba(138,111,90,0.25)] rounded-sm p-3 shadow-lg max-w-[200px] text-left">
                <div className="flex items-center gap-1.5 text-[9.5px] font-bold tracking-archival uppercase text-[#8a6f5a] mb-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8a6f5a]"></span>
                  BOTANICAL DYES
                </div>
                <p className="text-[10.5px] text-[#4f453e] leading-tight">
                  Thistle root and wild madder root organic wash.
                </p>
              </div>

              {/* Floating Bottom Card */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#242321]/90 backdrop-blur-md p-4 rounded-sm border border-white/10 text-white flex items-center justify-between">
                <div>
                  <span className="text-[9px] tracking-archival uppercase text-[#d8c8b5] block">
                    FEATURED SPRING EDITION
                  </span>
                  <p className="font-editorial text-lg text-white">
                    Helen weaving the Luna Tote
                  </p>
                </div>
                <Link
                  href="/product/luna-tote"
                  className="text-[10px] tracking-archival uppercase font-semibold text-[#f8f4ed] hover:text-[#d8c8b5] border-b border-[#d8c8b5] pb-0.5"
                >
                  INSPECT PIECE &rarr;
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. CATEGORY PORTFOLIO: CURATED BY FORM & FUNCTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[rgba(138,111,90,0.18)] gap-4">
          <div>
            <span className="text-[10px] tracking-archival uppercase text-[#8a6f5a] font-semibold block mb-1">
              CATEGORY PORTFOLIO
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#1c1b1a]">
              Curated by Form & Function
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs font-semibold tracking-archival uppercase text-[#242321] hover:text-[#8a6f5a] flex items-center gap-1.5 group"
          >
            <span>VIEW ALL EDITIONS</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 5 Category Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className="group flex flex-col bg-white border border-[rgba(138,111,90,0.18)] hover:border-[#8a6f5a] rounded-sm overflow-hidden transition-all shadow-sm hover:shadow-md"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#f7f3ef]">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 640px) 50vw, 20vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {cat.badge && (
                  <span className="absolute top-2 left-2 bg-[#f1e0cc] text-[#705743] text-[9px] font-semibold tracking-archival uppercase px-2 py-0.5 rounded-sm">
                    {cat.badge}
                  </span>
                )}
              </div>
              <div className="p-3.5 flex items-center justify-between bg-white">
                <div>
                  <h3 className="font-editorial text-base text-[#1c1b1a] group-hover:text-[#8a6f5a] transition-colors leading-tight">
                    {cat.title}
                  </h3>
                  <p className="text-[10px] text-[#81756d] mt-0.5 font-sans">
                    {cat.count}
                  </p>
                </div>
                <span className="text-[#81756d] group-hover:text-[#8a6f5a] group-hover:translate-x-0.5 transition-all text-xs">
                  &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. THE CURATED COLLECTION: SPRING / SUMMER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[rgba(138,111,90,0.18)] gap-4">
          <div>
            <span className="text-[10px] tracking-archival uppercase text-[#8a6f5a] font-semibold block mb-1">
              CURRENT SPOTLIGHT
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#1c1b1a]">
              The Curated Collection — Spring / Summer
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 text-xs">
            {[
              { id: "all", label: "ALL EDITIONS" },
              { id: "bags", label: "BAGS" },
              { id: "wearables", label: "WEARABLES" },
              { id: "accents", label: "LIGHT ACCENTS" },
              { id: "limited", label: "LIMITED BATCH" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-[10.5px] font-semibold tracking-archival uppercase transition-all ${
                  activeTab === tab.id
                    ? "bg-[#242321] text-white shadow-sm"
                    : "bg-[#efe7da] text-[#4f453e] hover:bg-[#d8c8b5]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {getFilteredProducts().map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/shop"
            className="inline-block bg-[#efe7da] hover:bg-[#d8c8b5] text-[#242321] px-8 py-3 text-xs font-semibold tracking-archival uppercase rounded-sm transition-colors border border-[rgba(138,111,90,0.25)]"
          >
            VIEW COMPLETE ARCHIVE (28 PIECES) &rarr;
          </Link>
        </div>
      </section>

      {/* 4. EDITORIAL SPLIT SECTION: MADE SLOWLY, MADE BEAUTIFULLY */}
      <section className="w-full bg-[#f7f3ef] border-y border-[rgba(138,111,90,0.18)] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Photo with Loop Stat */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/5] w-full rounded-sm overflow-hidden border border-[rgba(138,111,90,0.25)] shadow-lg bg-[#efe7da]">
                <Image
                  src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1200&auto=format&fit=crop"
                  alt="Meticulous hand crocheting in studio"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />

                <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs bg-white/95 backdrop-blur-sm p-4 rounded-sm border border-[rgba(138,111,90,0.2)] shadow-md">
                  <span className="font-editorial text-2xl text-[#705743] block">
                    14,100+ Loops
                  </span>
                  <p className="text-[11px] text-[#4f453e] mt-1 leading-snug">
                    Every single loop in our atelier represents a deliberate pause, adjusted to the natural breath of unbleached flax.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Story Copy */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-1">
                <span className="text-[10.5px] font-semibold tracking-archival uppercase text-[#8a6f5a]">
                  THE SLOW CRAFT PHILOSOPHY
                </span>
                <h2 className="font-editorial text-4xl sm:text-5xl text-[#1c1b1a] leading-tight">
                  Made Slowly, <br />
                  <span className="italic text-[#705743]">Made Beautifully.</span>
                </h2>
              </div>

              {/* Pull Quote Box */}
              <div className="p-5 bg-white border-l-2 border-[#8a6f5a] shadow-sm rounded-r-sm space-y-2">
                <p className="font-editorial text-lg sm:text-xl text-[#1c1b1a] italic leading-snug">
                  &ldquo;In an era of fleeting trends, craft-looping is an immortal dialogue between maker and material.&rdquo;
                </p>
                <p className="text-[10px] font-semibold tracking-archival uppercase text-[#81756d]">
                  — HÉLÈNE LAURENT, CHIEF KNITTER
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#4f453e] leading-relaxed">
                Crochet cannot be replicated by industrial machinery. Unlike a knit fabric, no automated needle or resolution loom can reproduce the structured complexity of a true artisanal stitch. Every piece is an irreplaceable record of patience, human touch, and botanical grace.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-3.5 bg-white border border-[rgba(138,111,90,0.2)] rounded-sm space-y-1">
                  <h4 className="font-semibold text-xs text-[#1c1b1a] uppercase tracking-archival">
                    Zero Synthetics
                  </h4>
                  <p className="text-[11px] text-[#81756d]">
                    100% natural organic cotton, flax, and coastal palm fibers.
                  </p>
                </div>
                <div className="p-3.5 bg-white border border-[rgba(138,111,90,0.2)] rounded-sm space-y-1">
                  <h4 className="font-semibold text-xs text-[#1c1b1a] uppercase tracking-archival">
                    Heirloom Longevity
                  </h4>
                  <p className="text-[11px] text-[#81756d]">
                    Handcrafted to be cherished and passed through generations.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/craft"
                  className="inline-block bg-[#242321] text-[#f8f4ed] hover:bg-[#8a6f5a] transition-colors px-7 py-3 text-xs font-semibold tracking-archival uppercase rounded-sm shadow-sm"
                >
                  OUR PHILOSOPHY — READ &rarr;
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. THE ANATOMY OF A STITCH: INTERACTIVE 4-CARD SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-[10px] font-semibold tracking-archival uppercase text-[#8a6f5a]">
            TACTILE INSIGHT
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl text-[#1c1b1a]">
            The Anatomy of a Stitch
          </h2>
          <p className="text-xs sm:text-sm text-[#4f453e] leading-relaxed">
            Explore the architecture of our signature loop formations and the historical provenance of their single-hook creation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STITCHES.map((stitch) => (
            <div
              key={stitch.id}
              onClick={() => openStitchModal(stitch)}
              className="group cursor-pointer bg-white border border-[rgba(138,111,90,0.2)] hover:border-[#8a6f5a] p-4 rounded-sm transition-all shadow-sm hover:shadow-md space-y-4"
            >
              {/* Macro Stitch Image */}
              <div className="relative aspect-square w-full rounded-sm overflow-hidden bg-[#f7f3ef] border border-[rgba(138,111,90,0.15)]">
                <Image
                  src={stitch.image}
                  alt={stitch.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 25vw"
                  className="object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[#1c1b1a]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-white/90 text-[#1c1b1a] text-[10px] tracking-archival uppercase font-semibold px-3 py-1.5 rounded-sm flex items-center gap-1">
                    <Eye size={12} /> INSPECT
                  </span>
                </div>
              </div>

              <div>
                <h3 className="font-editorial text-lg text-[#1c1b1a] group-hover:text-[#8a6f5a] transition-colors">
                  {stitch.name}
                </h3>
                <p className="text-[11px] text-[#81756d] mt-1 line-clamp-2">
                  {stitch.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[rgba(138,111,90,0.15)] text-[10.5px] space-y-1 text-[#685d4d]">
                <div className="flex justify-between">
                  <span className="text-[#81756d]">Gauge:</span>
                  <span className="font-medium">{stitch.gauge}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#81756d]">Pace:</span>
                  <span className="font-medium">{stitch.avgTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. SOPHIE DUVAL QUOTATION SPREAD */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="w-12 h-12 mx-auto rounded-full bg-[#efe7da] text-[#705743] flex items-center justify-center">
          <Quote size={24} />
        </div>

        <blockquote className="font-editorial text-2xl sm:text-3xl md:text-4xl text-[#1c1b1a] italic leading-relaxed max-w-3xl mx-auto">
          &ldquo;The craftsmanship of the Luna tote is breathtaking. You feel the soul and hours put into every stitch. It feels like an art piece rather than an accessory.&rdquo;
        </blockquote>

        <div className="space-y-1">
          <p className="text-xs font-semibold tracking-archival uppercase text-[#8a6f5a]">
            SOPHIE DUVAL
          </p>
          <p className="text-[11px] text-[#81756d] tracking-archival uppercase">
            PARIS, FRANCE • SPRING COLLECTION
          </p>
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-2 pt-2">
          <span className="w-2 h-2 rounded-full bg-[#8a6f5a]" />
          <span className="w-2 h-2 rounded-full bg-[#d8c8b5]" />
          <span className="w-2 h-2 rounded-full bg-[#d8c8b5]" />
        </div>
      </section>

      {/* 7. JOIN THE ATELIER CIRCLE BANNER */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#efe7da]/70 border border-[rgba(138,111,90,0.25)] rounded-sm p-8 sm:p-12 text-center space-y-4">
          <span className="text-[10px] font-semibold tracking-archival uppercase text-[#8a6f5a]">
            SEASONAL DISPATCH
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl text-[#1c1b1a]">
            Join the Atelier Circle
          </h2>
          <p className="text-xs sm:text-sm text-[#4f453e] max-w-lg mx-auto leading-relaxed">
            Receive invitation-only preview notices for upcoming micro-releases, textile pamphlets, and bespoke commission openings directly from our studio.
          </p>

          {newsletterDone ? (
            <div className="inline-flex items-center gap-2 bg-white text-[#705743] px-6 py-3 rounded-sm text-xs font-semibold border border-[rgba(138,111,90,0.25)]">
              <Check size={16} /> Merci. You are entered into the Atelier register.
            </div>
          ) : (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!newsletterEmail) return;
                setNewsletterSubmitting(true);
                setNewsletterError(null);
                try {
                  const res = await subscribeToNewsletter(newsletterEmail, "home");
                  if (res.success) {
                    setNewsletterDone(true);
                  } else {
                    setNewsletterError(res.error || "Subscription unsuccessful. Please try again.");
                  }
                } catch {
                  setNewsletterError("Network error. Please try again.");
                } finally {
                  setNewsletterSubmitting(false);
                }
              }}
              className="space-y-2 max-w-md mx-auto pt-2"
            >
              {newsletterError && (
                <p className="text-[11px] text-rose-700 text-center">{newsletterError}</p>
              )}
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  disabled={newsletterSubmitting}
                  placeholder="Enter your email address..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 bg-white border border-[rgba(138,111,90,0.25)] px-4 py-3 text-xs text-[#1c1b1a] focus:outline-none focus:border-[#8a6f5a] rounded-sm disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={newsletterSubmitting}
                  className="bg-[#242321] text-[#f8f4ed] hover:bg-[#8a6f5a] disabled:opacity-60 transition-colors text-xs font-semibold tracking-archival uppercase px-7 py-3 rounded-sm shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {newsletterSubmitting ? (
                    <>
                      <Loader2 size={13} className="animate-spin" />
                      <span>SUBSCRIBING...</span>
                    </>
                  ) : (
                    <span>SUBSCRIBE</span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

    </div>
  );
}
