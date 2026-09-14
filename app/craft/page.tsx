"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { STOCKISTS } from "../data/products";
import { Sparkles, ArrowRight, Compass, ShieldCheck, HeartHandshake, Leaf, Award } from "lucide-react";

export default function CraftPage() {
  const [activeTensionSample, setActiveTensionSample] = useState<"morning" | "noon" | "dusk">("morning");

  const tensionData = {
    morning: { label: "Morning Breath (Balanced)", path: "M0,35 Q30,10 60,35 T120,35 T180,35 T240,35 T300,35" },
    noon: { label: "Noon Precision (Firm)", path: "M0,35 Q30,20 60,35 T120,35 T180,35 T240,35 T300,35" },
    dusk: { label: "Dusk Ease (Supple)", path: "M0,35 Q30,5 60,35 T120,35 T180,35 T240,35 T300,35" },
  };

  return (
    <div className="w-full space-y-24 sm:space-y-32 pb-24 overflow-hidden font-sans">
      
      {/* 1. HERO: THE ARCHITECTURE OF A SINGLE LOOP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-6 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#efe7da] border border-[rgba(138,111,90,0.2)] rounded-full text-[10.5px] font-semibold tracking-archival uppercase text-[#705743]">
              <Sparkles size={13} className="text-[#8a6f5a]" />
              <span>THE ARCHITECTURE OF A SINGLE LOOP</span>
            </div>

            <div className="space-y-4">
              <h1 className="font-editorial text-5xl sm:text-6xl md:text-[68px] leading-[1.08] text-[#1c1b1a] tracking-tight font-normal">
                Crafted by Hand. <br />
                <span className="italic text-[#705743]">Designed to Last.</span>
              </h1>

              <p className="text-sm sm:text-base text-[#4f453e] leading-relaxed max-w-lg">
                A crocheted knot cannot be created by mechanical loom: every single loop in our atelier represents a deliberate pause, adjusted to the natural breath of unbleached flax.
              </p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[rgba(138,111,90,0.18)] max-w-lg">
              <div>
                <span className="font-editorial text-2xl text-[#1c1b1a] block">14,100+</span>
                <span className="text-[10px] tracking-archival uppercase text-[#81756d] font-semibold">
                  Loops per Garment
                </span>
              </div>
              <div>
                <span className="font-editorial text-2xl text-[#1c1b1a] block">0%</span>
                <span className="text-[10px] tracking-archival uppercase text-[#81756d] font-semibold">
                  Petroleum Synthetics
                </span>
              </div>
              <div>
                <span className="font-editorial text-2xl text-[#1c1b1a] block">140 Yrs</span>
                <span className="text-[10px] tracking-archival uppercase text-[#81756d] font-semibold">
                  Combined Provenance
                </span>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] w-full rounded-sm overflow-hidden border border-[rgba(138,111,90,0.22)] shadow-xl bg-[#efe7da]">
              <Image
                src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=1200&auto=format&fit=crop"
                alt="Artisan at work in Provence Studio"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />

              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm p-4 rounded-sm border border-[rgba(138,111,90,0.2)] shadow-md flex items-center justify-between">
                <div>
                  <span className="text-[9px] tracking-archival uppercase text-[#8a6f5a] font-semibold block">
                    LIVE FROM OUR PROVENCE STUDIO
                  </span>
                  <p className="font-editorial text-base text-[#1c1b1a]">
                    Helen at the Sixth Row loop
                  </p>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-[#8a6f5a] animate-ping" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. PROMINENT QUOTE BANNER */}
      <section className="w-full bg-[#f7f3ef] border-y border-[rgba(138,111,90,0.18)] py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
          <span className="text-[10px] font-semibold tracking-archival uppercase text-[#8a6f5a]">
            PHILOSOPHY OF TENSION
          </span>
          <blockquote className="font-editorial text-2xl sm:text-3xl md:text-4xl text-[#1c1b1a] italic leading-relaxed">
            &ldquo;The machine can count loops in milliseconds, but it has never paused to adjust its breath to the natural grain of unbleached flax.&rdquo;
          </blockquote>
          <p className="text-xs font-semibold tracking-archival uppercase text-[#81756d]">
            — HÉLÈNE LAURENT, FOUNDER & MASTER KNITTER
          </p>
        </div>
      </section>

      {/* 3. ORIGINS & PHILOSOPHY: ASYMMETRICAL EDITORIAL SPREAD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Boxwood Hooks and Dye Pots */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative aspect-[4/3] w-full rounded-sm overflow-hidden border border-[rgba(138,111,90,0.2)] bg-[#f1ede9]">
              <Image
                src="https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?q=80&w=1000&auto=format&fit=crop"
                alt="Boxwood crochet tools"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-[#242321]/80 backdrop-blur-sm text-white text-[10px] px-3 py-1 rounded-sm tracking-archival uppercase">
                Hand-turned boxwood tools passed across three generations
              </div>
            </div>

            <div className="relative aspect-[16/9] w-full rounded-sm overflow-hidden border border-[rgba(138,111,90,0.2)] bg-[#f1ede9]">
              <Image
                src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1000&auto=format&fit=crop"
                alt="Botanical dye clay pots in studio"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-[#242321]/80 backdrop-blur-sm text-white text-[10px] px-3 py-1 rounded-sm tracking-archival uppercase">
                Natural botanical dye kettles in Saint-Rémy-de-Provence
              </div>
            </div>
          </div>

          {/* Right: Narrative Block */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-semibold tracking-archival uppercase text-[#8a6f5a]">
                ORIGINS & PHILOSOPHY
              </span>
              <h2 className="font-editorial text-4xl sm:text-5xl text-[#1c1b1a]">
                From a Sunlit Atelier in Provence
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-[#4f453e] leading-relaxed">
              In the spring of 2018, Hélène Laurent set out to rescue hand-looping from industrial mimicry. While knitting has been mechanized since the 16th century, crochet cannot be performed by any loom: each knot is a solitary, human equation.
            </p>

            {/* Pull Quote Box */}
            <div className="p-5 bg-[#efe7da]/70 border-l-2 border-[#8a6f5a] rounded-r-sm space-y-2">
              <p className="font-editorial text-lg text-[#1c1b1a] italic leading-snug">
                &ldquo;We do not rush the thread. If an artisan&apos;s tension softens from exhaustion or hurry, the stitch registers it immediately. The craft demands emotional stillness.&rdquo;
              </p>
              <p className="text-[10px] font-semibold tracking-archival uppercase text-[#81756d]">
                — CELINE DUPONT, SENIOR DYE MASTER
              </p>
            </div>

            <p className="text-xs sm:text-sm text-[#4f453e] leading-relaxed">
              Every fiber in our collection is sustainably sourced: organic Aegean cotton double-twisted for zero-stretch carry, wild harvested raffia from certified coastal reserves in Madagascar, and unbleached Belgian linen that softens with every contact with sunlight.
            </p>
          </div>

        </div>
      </section>

      {/* 4. THE IRREPLACEABLE GEOMETRY: 3 COMPARATIVE CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-[10px] font-semibold tracking-archival uppercase text-[#8a6f5a]">
            STRUCTURAL INTEGRITY
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl text-[#1c1b1a]">
            The Irreplaceable Geometry
          </h2>
          <p className="text-xs sm:text-sm text-[#4f453e]">
            Unlike industrial knitting, which is mechanized into uniform loops, crochet resists automation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white border border-[rgba(138,111,90,0.2)] p-6 rounded-sm space-y-4">
            <div className="w-10 h-10 rounded-full bg-[#f1e0cc] text-[#705743] flex items-center justify-center">
              <Compass size={20} />
            </div>
            <h3 className="font-editorial text-xl text-[#1c1b1a]">
              The Mechanics of Unease
            </h3>
            <p className="text-xs text-[#4f453e] leading-relaxed">
              Industrial machinery requires predictable friction. Hand crochet thrives on variation: looping around the thumb, adjusting for a knot in the flax, or varying density to give a bag its natural base.
            </p>
            <div className="pt-2 border-t border-[rgba(138,111,90,0.15)] text-[10.5px] text-[#8a6f5a] font-semibold uppercase tracking-archival">
              100% Unmechanized
            </div>
          </div>

          {/* Card 2: Interactive Tension Wave Graph */}
          <div className="bg-white border border-[rgba(138,111,90,0.2)] p-6 rounded-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-full bg-[#f1e0cc] text-[#705743] flex items-center justify-center">
                <Leaf size={20} />
              </div>
              {/* Toggle states */}
              <div className="flex gap-1 text-[9px] font-semibold">
                {(["morning", "noon", "dusk"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTensionSample(t)}
                    className={`px-2 py-0.5 rounded capitalize ${
                      activeTensionSample === t
                        ? "bg-[#8a6f5a] text-white"
                        : "bg-[#f7f3ef] text-[#685d4d]"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <h3 className="font-editorial text-xl text-[#1c1b1a]">
              Breath & Yarn Tension
            </h3>
            <p className="text-xs text-[#4f453e] leading-relaxed">
              The artisan&apos;s heartbeat and posture register in every row. We deliberately celebrate this micro-cadence as artisanal topography.
            </p>

            {/* SVG Tension Wave */}
            <div className="h-16 bg-[#fdf8f5] rounded border border-[rgba(138,111,90,0.15)] flex flex-col justify-center px-2">
              <svg viewBox="0 0 300 70" className="w-full h-12 stroke-[#8a6f5a] fill-none stroke-2">
                <path d={tensionData[activeTensionSample].path} />
              </svg>
              <span className="text-[9px] text-[#81756d] text-center font-mono">
                {tensionData[activeTensionSample].label}
              </span>
            </div>

            <div className="pt-2 border-t border-[rgba(138,111,90,0.15)] text-[10.5px] text-[#8a6f5a] font-semibold uppercase tracking-archival">
              Tactile Self-Correction
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-[rgba(138,111,90,0.2)] p-6 rounded-sm space-y-4">
            <div className="w-10 h-10 rounded-full bg-[#f1e0cc] text-[#705743] flex items-center justify-center">
              <Award size={20} />
            </div>
            <h3 className="font-editorial text-xl text-[#1c1b1a]">
              Embodied Continuity
            </h3>
            <p className="text-xs text-[#4f453e] leading-relaxed">
              Unlike cut-and-sew fast fashion which creates substantial fabric scraps, our crochet pieces are sculpted continuously from a single unbroken spool of thread, generating zero offcut waste.
            </p>
            <div className="pt-2 border-t border-[rgba(138,111,90,0.15)] text-[10.5px] text-[#8a6f5a] font-semibold uppercase tracking-archival">
              Zero Off-Cut Waste
            </div>
          </div>
        </div>
      </section>

      {/* 5. THE FOUR PILLARS OF E&A */}
      <section className="w-full bg-[#f7f3ef] border-y border-[rgba(138,111,90,0.18)] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
            <span className="text-[10px] font-semibold tracking-archival uppercase text-[#8a6f5a]">
              OUR FOUNDATIONAL CODE
            </span>
            <h2 className="font-editorial text-4xl text-[#1c1b1a]">
              The Four Pillars of E&A
            </h2>
            <p className="text-xs text-[#4f453e]">
              Every artifact we dispatch satisfies four non-negotiable standards of environmental ethics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: "01",
                title: "Radical Slowdown",
                desc: "Zero automated machines. Only men, eyes, and tension adjustments that respect the artisan's circadian rhythm. Limited batches preserve quality.",
                tag: "TIME",
              },
              {
                num: "02",
                title: "Earth-Honouring Fibers",
                desc: "We exclusively harvest pure Aegean organic cotton, Belgian linen, and coastal raffia. Zero petroleum-derived acrylics or synthetic blends.",
                tag: "MATERIALS",
              },
              {
                num: "03",
                title: "Heirloom Longevity",
                desc: "Designed to be repairable and to age gracefully alongside its custodian. We offer complimentary lifetime minor restitching and care advice.",
                tag: "CIRCULARITY",
              },
              {
                num: "04",
                title: "Living Wage Artistry",
                desc: "Fair remuneration above regional crafts living standards. Flexible atelier hours, healthcare, and peer-to-peer master apprentice training.",
                tag: "HUMANITY",
              },
            ].map((pillar) => (
              <div
                key={pillar.num}
                className="bg-white border border-[rgba(138,111,90,0.2)] p-6 rounded-sm space-y-3 relative group hover:border-[#8a6f5a] transition-all"
              >
                <div className="flex items-center justify-between text-xs text-[#81756d]">
                  <span className="font-editorial text-3xl text-[#705743]">{pillar.num}</span>
                  <span className="text-[9.5px] font-semibold tracking-archival uppercase bg-[#efe7da] px-2 py-0.5 rounded text-[#705743]">
                    {pillar.tag}
                  </span>
                </div>
                <h3 className="font-editorial text-xl text-[#1c1b1a]">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[#4f453e] leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PHOTOGRAPHIC CRAFT TRIO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative aspect-[4/5] rounded-sm overflow-hidden border border-[rgba(138,111,90,0.2)] group">
            <Image
              src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop"
              alt="Tension and Centering"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 text-white">
              <span className="text-[9px] tracking-archival uppercase text-[#d8c8b5] block">
                01 / TECHNIQUE
              </span>
              <h4 className="font-editorial text-lg text-white">Tension & Centering</h4>
              <p className="text-[11px] text-gray-200 mt-1">
                Every knot balanced against the pull of organic warp.
              </p>
            </div>
          </div>

          <div className="relative aspect-[4/5] rounded-sm overflow-hidden border border-[rgba(138,111,90,0.2)] group">
            <Image
              src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop"
              alt="Botanical Color Infusion"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 text-white">
              <span className="text-[9px] tracking-archival uppercase text-[#d8c8b5] block">
                02 / PIGMENT
              </span>
              <h4 className="font-editorial text-lg text-white">Botanical Color Infusion</h4>
              <p className="text-[11px] text-gray-200 mt-1">
                Plant & mineral extractions in low-temperature baths.
              </p>
            </div>
          </div>

          <div className="relative aspect-[4/5] rounded-sm overflow-hidden border border-[rgba(138,111,90,0.2)] group">
            <Image
              src="https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?q=80&w=800&auto=format&fit=crop"
              alt="Hand-Stamped Numbering"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 text-white">
              <span className="text-[9px] tracking-archival uppercase text-[#d8c8b5] block">
                03 / ARCHIVE
              </span>
              <h4 className="font-editorial text-lg text-white">Hand-Stamped Numbering</h4>
              <p className="text-[11px] text-gray-200 mt-1">
                Each piece registered in our physical workshop registry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CURATED STOCKISTS & GALLERIES */}
      <section id="stockists" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[rgba(138,111,90,0.18)] gap-4">
          <div>
            <span className="text-[10px] tracking-archival uppercase text-[#8a6f5a] font-semibold block mb-1">
              PHYSICAL PRESENCE
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#1c1b1a]">
              Curated Stockists & Galleries
            </h2>
          </div>
          <p className="text-xs text-[#81756d] max-w-xs">
            Experience our pieces tactilely by appointment through selected design spaces across four continents.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STOCKISTS.map((stockist) => (
            <div
              key={stockist.city}
              className="p-5 bg-white border border-[rgba(138,111,90,0.2)] rounded-sm space-y-2 group hover:border-[#8a6f5a] transition-all"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-editorial text-xl text-[#1c1b1a] group-hover:text-[#8a6f5a] transition-colors">
                  {stockist.city}
                </h3>
                <span className="text-[#81756d] group-hover:text-[#8a6f5a]">&rarr;</span>
              </div>
              <p className="text-xs font-semibold text-[#705743]">{stockist.name}</p>
              <p className="text-[11px] text-[#4f453e]">{stockist.address}</p>
              <p className="text-[10px] text-[#81756d] italic pt-1">{stockist.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. CALLOUT BANNER: DARK CHARCOAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#242321] text-[#f8f4ed] rounded-sm p-8 sm:p-14 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 max-w-xl">
            <span className="text-[10px] font-semibold tracking-archival uppercase text-[#d8c8b5] flex items-center gap-1.5">
              <Sparkles size={12} /> SPRING PRODUCTION REGISTER OPEN
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl leading-tight">
              Bring an authentic handcrafted heirloom into your everyday ritual.
            </h2>
            <p className="text-xs sm:text-sm text-[#d8c8b5]/80 leading-relaxed">
              Every edition is tied to solar seasons and strictly capped batch numbers. Once dedicated yarn reserves for a season are consumed, that register is closed for the year.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <Link
              href="/shop"
              className="bg-white text-[#242321] hover:bg-[#efe7da] px-8 py-3.5 text-xs font-semibold tracking-archival uppercase rounded-sm text-center transition-colors shadow-sm"
            >
              EXPLORE COLLECTION &rarr;
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
