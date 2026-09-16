"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  CheckCircle2,
  Calendar,
  Clock,
  Scissors,
  Check,
  MapPin,
  ShieldCheck,
  FileText,
  MessageSquare,
  ArrowRight,
  Download,
  RotateCcw,
  Sliders,
  ChevronRight,
} from "lucide-react";

export default function PatronVaultClient() {
  const [activeTab, setActiveTab] = useState<"all" | "wearables" | "bags" | "living">("all");

  return (
    <div className="p-6 sm:p-10 space-y-10 max-w-[1550px] mx-auto font-sans">
      
      {/* 1. TOP BREADCRUMB & EXPORT LEDGER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs border-b border-[#e6dbc9] pb-4">
        <div className="flex items-center gap-2 text-[#705743]">
          <span className="uppercase tracking-[0.16em] text-[10px] text-[#8a6f5a] font-bold">SANCTUM</span>
          <span>/</span>
          <span className="uppercase tracking-[0.16em] text-[10px] text-[#8a6f5a] font-bold">PATRON ARCHIVAL VAULT</span>
          <span>/</span>
          <span className="font-semibold text-[#1c1b1a]">Camille d&apos;Orsay</span>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="text-[10px] font-bold tracking-archival uppercase text-[#8a6f5a] bg-[#efe7da] border border-[#d8c8b4] px-2.5 py-1 rounded-sm">
            ARCHIVAL PATRON TIER • NO. 042
          </span>
          <button className="px-3 py-1 bg-white border border-[#d8c8b4] text-[#3d2e24] text-xs font-semibold tracking-archival uppercase rounded-sm hover:bg-[#faf6f0] transition-colors">
            Export Ledger
          </button>
        </div>
      </div>

      {/* 2. PATRON PROFILE BANNER */}
      <div className="bg-white border border-[#e6dbc9] rounded-sm p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden relative border-2 border-[#d8c8b4] flex-shrink-0 bg-[#efe7da]">
              <Image
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop"
                alt="Camille d'Orsay"
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="font-editorial text-2xl sm:text-3xl text-[#1c1b1a]">
                  Camille d&apos;Orsay
                </h1>
                <span className="text-[10px] font-mono font-semibold tracking-wider text-[#705743] bg-[#efe7da] px-2 py-0.5 rounded">
                  PARIS, 7ÈME
                </span>
              </div>
              <p className="text-xs text-[#594d42] max-w-2xl leading-relaxed">
                Sustaining Patron since Autumn 2022. Dedicated custodian of slow botanical dyes and zero-waste, single-needle crochet heirlooms.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-[11px] text-[#705743] pt-1">
                <span className="flex items-center gap-1 font-medium">
                  <CheckCircle2 size={13} className="text-emerald-700" />
                  Lifetime Stitch Repair & Annual Re-Blocking Active
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 font-medium">
                  <Sparkles size={13} className="text-[#8a6f5a]" />
                  Priority 48h Loom Window Pre-Access
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 self-start lg:self-center">
            <button className="px-4 py-2 bg-white border border-[#d8c8b4] hover:bg-[#faf6f0] text-[#3d2e24] text-xs font-semibold tracking-archival uppercase rounded-sm transition-colors">
              STUDIO PREFERENCES
            </button>
            <button className="px-4 py-2 bg-[#5c4533] hover:bg-[#433123] text-white text-xs font-semibold tracking-archival uppercase rounded-sm transition-colors shadow-xs">
              BOOK ATELIER VISIT
            </button>
          </div>
        </div>

        {/* 4 Patron Summary Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-[#f0e6d6]">
          <div>
            <span className="text-[9.5px] font-bold tracking-[0.16em] uppercase text-[#8a6f5a] block">
              HEIRLOOMS OWNED
            </span>
            <span className="font-editorial text-2xl text-[#1c1b1a] block mt-0.5">4 pieces</span>
            <span className="text-[10.5px] text-[#81756d]">78 loom hours funded</span>
          </div>

          <div>
            <span className="text-[9.5px] font-bold tracking-[0.16em] uppercase text-[#8a6f5a] block">
              ACTIVE COMMISSION
            </span>
            <span className="font-editorial text-2xl text-[#1c1b1a] block mt-0.5">1 in loom</span>
            <span className="text-[10.5px] text-emerald-800">Est. dispatch May 18</span>
          </div>

          <div>
            <span className="text-[9.5px] font-bold tracking-[0.16em] uppercase text-[#8a6f5a] block">
              EXPLICIT ARCHIVES
            </span>
            <span className="font-editorial text-2xl text-[#1c1b1a] block mt-0.5">2 watchlists</span>
            <span className="text-[10.5px] text-[#81756d]">Madder & Oak Gall</span>
          </div>

          <div>
            <span className="text-[9.5px] font-bold tracking-[0.16em] uppercase text-[#8a6f5a] block">
              ARTISAN LIAISON
            </span>
            <span className="font-editorial text-2xl text-[#1c1b1a] block mt-0.5">Camille L.</span>
            <span className="text-[10.5px] text-[#81756d]">Studio 02 • Luberon</span>
          </div>
        </div>
      </div>

      {/* 3. ACTIVE ATELIER WORK IN PROGRESS — THE LOOM QUEUE & REAL-TIME LEDGER */}
      <div className="bg-white border border-[#e6dbc9] rounded-sm p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#f0e6d6] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
              <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#8a6f5a]">
                ACTIVE ATELIER WORK IN PROGRESS
              </span>
            </div>
            <h2 className="font-editorial text-2xl text-[#1c1b1a] mt-0.5">
              The Loom Queue & Real-Time Ledger
            </h2>
          </div>
          <span className="text-xs font-mono text-[#81756d]">
            Bespoke Commission Ref: #B-204
          </span>
        </div>

        {/* Work Order Hero Details */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-4 bg-[#faf6f0] border border-[#e6dbc9] rounded-sm">
          <div className="flex items-center gap-4">
            <div className="w-16 h-20 relative bg-[#efe7da] rounded overflow-hidden flex-shrink-0 border border-[#d8c8b4]">
              <Image
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=200&auto=format&fit=crop"
                alt="Bridal Scallop Veil"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-semibold text-[#8a6f5a] tracking-wider uppercase bg-[#efe7da] px-2 py-0.5 rounded">
                SPRING MICRO-BATCH 04
              </span>
              <h3 className="font-editorial text-lg text-[#1c1b1a]">
                Custom Scalloped Bridal Veil & Wristlet in Madder Root Rose
              </h3>
              <p className="text-xs text-[#594d42] max-w-xl">
                Hand-spun French wet-flax with mulberry silk filament, artisanal self-tie corded edging and Provençal pattern tension.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end md:self-center">
            <div className="w-10 h-10 rounded-full overflow-hidden relative border border-[#d8c8b4]">
              <Image
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop"
                alt="Camille Laurent"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <span className="text-xs font-semibold text-[#1c1b1a] block leading-tight">
                Camille Laurent
              </span>
              <span className="text-[10.5px] text-[#8a6f5a]">
                Lead Master Weaver • Luberon
              </span>
            </div>
          </div>
        </div>

        {/* 5-Stage Stepper */}
        <div className="py-4">
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            
            {/* Step 1 */}
            <div className="p-3 bg-[#f5efe6] border border-[#d8c8b4] rounded-sm space-y-1 relative">
              <div className="flex items-center justify-between">
                <span className="w-5 h-5 rounded-full bg-emerald-800 text-white text-[10px] flex items-center justify-center font-bold">
                  ✓
                </span>
                <span className="text-[9px] font-mono text-emerald-800 font-semibold">APR 14</span>
              </div>
              <h4 className="text-xs font-semibold text-[#1c1b1a] pt-1">1. Fiber Selection</h4>
              <p className="text-[10.5px] text-[#705743]">GOTS Flax Spun</p>
            </div>

            {/* Step 2 */}
            <div className="p-3 bg-[#f5efe6] border border-[#d8c8b4] rounded-sm space-y-1 relative">
              <div className="flex items-center justify-between">
                <span className="w-5 h-5 rounded-full bg-emerald-800 text-white text-[10px] flex items-center justify-center font-bold">
                  ✓
                </span>
                <span className="text-[9px] font-mono text-emerald-800 font-semibold">APR 22</span>
              </div>
              <h4 className="text-xs font-semibold text-[#1c1b1a] pt-1">2. Botanical Dyeing</h4>
              <p className="text-[10.5px] text-[#705743]">Madder Root Bath</p>
            </div>

            {/* Step 3: Current IN LOOM */}
            <div className="p-3 bg-[#faf6f0] border-2 border-[#8a6f5a] rounded-sm space-y-1 relative shadow-xs">
              <div className="flex items-center justify-between">
                <span className="w-5 h-5 rounded-full bg-[#8a6f5a] text-white text-[10px] flex items-center justify-center font-bold">
                  3
                </span>
                <span className="text-[9px] font-bold text-amber-900 bg-amber-100 px-1.5 py-0.2 rounded uppercase">
                  IN LOOM 69%
                </span>
              </div>
              <h4 className="text-xs font-semibold text-[#1c1b1a] pt-1">3. Needle Looping</h4>
              <p className="text-[10.5px] text-[#705743]">14 / 28 hrs logged</p>
            </div>

            {/* Step 4 */}
            <div className="p-3 bg-[#faf6f0] border border-[#e6dbc9] rounded-sm space-y-1 relative opacity-70">
              <div className="flex items-center justify-between">
                <span className="w-5 h-5 rounded-full bg-[#d8c8b4] text-[#3d2e24] text-[10px] flex items-center justify-center font-bold">
                  4
                </span>
                <span className="text-[9px] font-mono text-[#81756d]">EST MAY 04</span>
              </div>
              <h4 className="text-xs font-semibold text-[#1c1b1a] pt-1">4. Steam Blocking</h4>
              <p className="text-[10.5px] text-[#705743]">Wax seal & dry</p>
            </div>

            {/* Step 5 */}
            <div className="p-3 bg-[#faf6f0] border border-[#e6dbc9] rounded-sm space-y-1 relative opacity-70">
              <div className="flex items-center justify-between">
                <span className="w-5 h-5 rounded-full bg-[#d8c8b4] text-[#3d2e24] text-[10px] flex items-center justify-center font-bold">
                  5
                </span>
                <span className="text-[9px] font-mono text-[#81756d]">EST MAY 08</span>
              </div>
              <h4 className="text-xs font-semibold text-[#1c1b1a] pt-1">5. Archival Cask</h4>
              <p className="text-[10.5px] text-[#705743]">DHL Green Courier</p>
            </div>

          </div>
        </div>

        {/* Master Dispatch Note */}
        <div className="p-4 bg-[#ede5d8] border border-[#d8c8b4] rounded-sm space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-[#5c4533] uppercase tracking-wider text-[10.5px] flex items-center gap-1.5">
              <FileText size={14} /> MASTER DISPATCH NOTE • YESTERDAY 15:48 • Luberon Studio
            </span>
          </div>
          <p className="text-xs text-[#3d2e24] italic leading-relaxed">
            &ldquo;The chapel train on the central scallop holds potential past expected proportions—the silk row tension is gentle fly-drawn under natural morning light. Moving to the delicate outer wristlet edging tomorrow.&rdquo;
          </p>
          <div className="flex items-center justify-between pt-1 text-xs">
            <button className="text-[11px] font-semibold text-[#5c4533] hover:underline uppercase tracking-wider">
              VIEW PHOTO LOG (3)
            </button>
            <button className="px-3 py-1 bg-[#5c4533] hover:bg-[#433123] text-white text-[11px] font-semibold rounded-sm shadow-xs">
              REPLY TO CAMILLE
            </button>
          </div>
        </div>
      </div>

      {/* 4. ACQUISITION REGISTER — THE HEIRLOOM VAULT & CUSTODY ARCHIVE */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e6dbc9] pb-4">
          <div>
            <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#8a6f5a] block">
              ACQUISITION REGISTER
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl text-[#1c1b1a]">
              The Heirloom Vault & Custody Archive
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { label: "All Acquisitions (4)", id: "all" },
              { label: "Wearables (2)", id: "wearables" },
              { label: "Bags & Totes (1)", id: "bags" },
              { label: "Living & Vessels (1)", id: "living" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 text-xs rounded-sm font-semibold tracking-archival uppercase transition-colors ${
                  activeTab === tab.id
                    ? "bg-[#5c4533] text-white"
                    : "bg-white border border-[#d8c8b4] text-[#4f453e] hover:bg-[#faf6f0]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Heirloom Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: The Luna Net Tote */}
          <div className="bg-white border border-[#e6dbc9] rounded-sm overflow-hidden shadow-xs flex flex-col justify-between">
            <div>
              <div className="relative aspect-[4/3] w-full bg-[#faf6f0]">
                <Image
                  src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=600&auto=format&fit=crop"
                  alt="The Luna Net Tote"
                  fill
                  className="object-cover"
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[#1c1b1a] text-[9.5px] font-mono font-semibold px-2 py-0.5 rounded border border-[#e6dbc9]">
                  SERIAL NO. 014/100
                </span>
                <span className="absolute bottom-3 right-3 bg-[#242321]/80 text-white text-[9px] font-semibold px-2 py-0.5 rounded uppercase">
                  SPRING 2023
                </span>
              </div>

              <div className="p-5 space-y-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold tracking-archival uppercase text-[#8a6f5a]">
                    ACCESSORIES • BATCH 01 • 16 Loom Hours
                  </span>
                  <h3 className="font-editorial text-xl text-[#1c1b1a]">
                    The Luna Net Tote
                  </h3>
                </div>

                <div className="text-xs text-[#594d42] space-y-1 pt-1 border-t border-[#f0e6d6]">
                  <p><strong className="text-[#1c1b1a]">Colorway:</strong> Desert Ecru / Undyed Raw</p>
                  <p><strong className="text-[#1c1b1a]">Artisan:</strong> Elena Varga • Workshop A</p>
                  <p><strong className="text-[#1c1b1a]">Fiber:</strong> 100% Aegean Organic Cotton</p>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0 space-y-2">
              <button className="w-full py-2 bg-[#efe7da] hover:bg-[#e2d5c2] text-[#3d2e24] text-xs font-semibold tracking-archival uppercase rounded-sm transition-colors border border-[#d8c8b4]">
                REQUEST RE-BLOCKING / REPAIR
              </button>
              <button className="w-full text-center text-[10.5px] text-[#8a6f5a] hover:underline font-semibold uppercase">
                View Certificate of Authenticity (PDF)
              </button>
            </div>
          </div>

          {/* Card 2: Sienna Scallop Crochet Vest */}
          <div className="bg-white border border-[#e6dbc9] rounded-sm overflow-hidden shadow-xs flex flex-col justify-between">
            <div>
              <div className="relative aspect-[4/3] w-full bg-[#faf6f0]">
                <Image
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop"
                  alt="Sienna Scallop Crochet Vest"
                  fill
                  className="object-cover"
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[#1c1b1a] text-[9.5px] font-mono font-semibold px-2 py-0.5 rounded border border-[#e6dbc9]">
                  EDITION NO. 008/012
                </span>
                <span className="absolute bottom-3 right-3 bg-[#242321]/80 text-white text-[9px] font-semibold px-2 py-0.5 rounded uppercase">
                  AUTUMN 2023
                </span>
              </div>

              <div className="p-5 space-y-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold tracking-archival uppercase text-[#8a6f5a]">
                    WEARABLE PIECE • BATCH 02 • 34 Loom Hours
                  </span>
                  <h3 className="font-editorial text-xl text-[#1c1b1a]">
                    Sienna Scallop Crochet Vest
                  </h3>
                </div>

                <div className="text-xs text-[#594d42] space-y-1 pt-1 border-t border-[#f0e6d6]">
                  <p><strong className="text-[#1c1b1a]">Colorway:</strong> Terracotta Dye • Madder Root</p>
                  <p><strong className="text-[#1c1b1a]">Artisan:</strong> Maria Santos • Workshop C</p>
                  <p><strong className="text-[#1c1b1a]">Fiber:</strong> Single Merino & Peruvian Pima</p>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0 space-y-2">
              <button className="w-full py-2 bg-[#efe7da] hover:bg-[#e2d5c2] text-[#3d2e24] text-xs font-semibold tracking-archival uppercase rounded-sm transition-colors border border-[#d8c8b4]">
                DOWNLOAD CARE & DYE LOT CARD
              </button>
              <button className="w-full text-center text-[10.5px] text-[#8a6f5a] hover:underline font-semibold uppercase">
                View Certificate of Authenticity (PDF)
              </button>
            </div>
          </div>

          {/* Card 3: Aura Ceramic Sleeve & Candle */}
          <div className="bg-white border border-[#e6dbc9] rounded-sm overflow-hidden shadow-xs flex flex-col justify-between">
            <div>
              <div className="relative aspect-[4/3] w-full bg-[#faf6f0]">
                <Image
                  src="https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?q=80&w=600&auto=format&fit=crop"
                  alt="Aura Ceramic Sleeve & Candle"
                  fill
                  className="object-cover"
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[#1c1b1a] text-[9.5px] font-mono font-semibold px-2 py-0.5 rounded border border-[#e6dbc9]">
                  BATCH LIVING #02
                </span>
                <span className="absolute bottom-3 right-3 bg-[#242321]/80 text-white text-[9px] font-semibold px-2 py-0.5 rounded uppercase">
                  WINTER 2023
                </span>
              </div>

              <div className="p-5 space-y-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold tracking-archival uppercase text-[#8a6f5a]">
                    MAISON & OBJET • CAPSULE • 12 Loom Hours
                  </span>
                  <h3 className="font-editorial text-xl text-[#1c1b1a]">
                    Aura Ceramic Sleeve & Candle
                  </h3>
                </div>

                <div className="text-xs text-[#594d42] space-y-1 pt-1 border-t border-[#f0e6d6]">
                  <p><strong className="text-[#1c1b1a]">Colorway:</strong> Smoked Oak & Raw Flax</p>
                  <p><strong className="text-[#1c1b1a]">Artisan:</strong> Camille Laurent & Poterie V.</p>
                  <p><strong className="text-[#1c1b1a]">Wax & Scent:</strong> Wild Fig, Cedarwood & Beeswax</p>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0 space-y-2">
              <button className="w-full py-2 bg-[#efe7da] hover:bg-[#e2d5c2] text-[#3d2e24] text-xs font-semibold tracking-archival uppercase rounded-sm transition-colors border border-[#d8c8b4]">
                ORDER WAX VESSEL REFILL
              </button>
              <button className="w-full text-center text-[10.5px] text-[#8a6f5a] hover:underline font-semibold uppercase">
                View Certificate of Authenticity (PDF)
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 5. TACTILE SENSITIVITIES & ATELIER SILHOUETTE */}
      <div className="space-y-6">
        <div>
          <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#8a6f5a] block">
            BESPOKE FIT DOSSIER
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl text-[#1c1b1a]">
            Tactile Sensitivities & Atelier Silhouette
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Panel: Fiber Preferences & Measurements */}
          <div className="lg:col-span-8 bg-white border border-[#e6dbc9] rounded-sm p-6 sm:p-8 space-y-6 shadow-xs">
            
            {/* Preferred Fibers */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[10.5px] font-bold tracking-archival uppercase text-[#8a6f5a]">
                  PREFERRED ORGANIC FIBERS
                </span>
                <span className="text-[10px] text-emerald-800 font-semibold bg-emerald-100 px-2 py-0.5 rounded">
                  All Natural Certified
                </span>
              </div>

              <div className="flex flex-wrap gap-2 text-xs">
                {["Aegean Organic Cotton", "Belgian Wet-Spun Flax", "Unbleached Mulberry Silk Filament", "Fine Cruelty-Free Alpaca Cloud"].map((f) => (
                  <span key={f} className="px-3 py-1 bg-[#faf6f0] border border-[#d8c8b4] rounded-sm text-[#3d2e24] font-medium flex items-center gap-1.5">
                    <Check size={12} className="text-emerald-700" />
                    <span>{f}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Botanical Dye Sensitivities */}
            <div className="space-y-2 pt-4 border-t border-[#f0e6d6]">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[10.5px] font-bold tracking-archival uppercase text-[#8a6f5a]">
                  BOTANICAL DYE PROFILE & SENSITIVITIES
                </span>
                <span className="text-[10px] text-[#705743]">Synthetic Mordant Intolerant</span>
              </div>
              <div className="p-3.5 bg-[#faf6f0] border border-[#e6dbc9] rounded-sm text-xs text-[#594d42] leading-relaxed">
                Strict Botanical Formula. Exclusively ferment-stabilised madder (Rubia), green walnut husk, oak gall tannin, pomegranate rind, and red onion. Free of heavy metals, copper sulphate, and chemical fixatives.
              </div>
            </div>

            {/* Measurements Grid */}
            <div className="space-y-3 pt-4 border-t border-[#f0e6d6]">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[10.5px] font-bold tracking-archival uppercase text-[#8a6f5a]">
                  TAILORED MEMORY & DRAPE PROFILE
                </span>
                <span className="text-[10px] text-[#81756d]">Calibrated: Feb 2024</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-3 bg-[#faf6f0] border border-[#e6dbc9] rounded-sm text-center space-y-0.5">
                  <span className="text-[9.5px] text-[#81756d] uppercase tracking-wider block">CHEST WIDTH</span>
                  <span className="font-editorial text-xl text-[#1c1b1a] block">88 cm</span>
                </div>
                <div className="p-3 bg-[#faf6f0] border border-[#e6dbc9] rounded-sm text-center space-y-0.5">
                  <span className="text-[9.5px] text-[#81756d] uppercase tracking-wider block">SHOULDER DROP</span>
                  <span className="font-editorial text-xl text-[#1c1b1a] block">38 cm</span>
                </div>
                <div className="p-3 bg-[#faf6f0] border border-[#e6dbc9] rounded-sm text-center space-y-0.5">
                  <span className="text-[9.5px] text-[#81756d] uppercase tracking-wider block">ARMSPAN REACH</span>
                  <span className="font-editorial text-xl text-[#1c1b1a] block">162 cm</span>
                </div>
                <div className="p-3 bg-[#faf6f0] border border-[#e6dbc9] rounded-sm text-center space-y-0.5">
                  <span className="text-[9.5px] text-[#81756d] uppercase tracking-wider block">DRAPE INTENT</span>
                  <span className="font-editorial text-xl text-[#705743] block">Relaxed</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs">
              <span className="text-[#81756d]">Calibrated for custom tension gauges: 14 stitches = 10 cm</span>
              <button className="px-3 py-1.5 bg-white border border-[#d8c8b4] text-[#3d2e24] text-[11px] font-semibold tracking-archival uppercase rounded-sm hover:bg-[#faf6f0]">
                UPDATE FIT DOSSIER
              </button>
            </div>
          </div>

          {/* Right Panel: Delivery Sanctum */}
          <div className="lg:col-span-4 bg-white border border-[#e6dbc9] rounded-sm p-6 sm:p-8 space-y-5 shadow-xs">
            <h3 className="font-editorial text-xl text-[#1c1b1a] flex items-center gap-2">
              <MapPin size={16} className="text-[#8a6f5a]" />
              <span>Delivery Sanctum</span>
            </h3>

            <div className="p-4 bg-[#faf6f0] border border-[#e6dbc9] rounded-sm text-xs space-y-1 text-[#4f453e]">
              <div className="flex items-center justify-between pb-1">
                <span className="text-[10px] font-bold text-[#8a6f5a] uppercase">PRIMARY ADDRESS</span>
                <span className="text-[9px] text-emerald-800 font-bold bg-emerald-100 px-1.5 rounded">VERIFIED</span>
              </div>
              <p className="font-semibold text-sm text-[#1c1b1a]">Camille d&apos;Orsay</p>
              <p>14 Rue de Varenne</p>
              <p>Bâtiment D • 3e Étage</p>
              <p className="font-medium text-[#1c1b1a]">75007 Paris, France</p>
              <p className="text-[10.5px] text-[#81756d] pt-1">Concierge Service Code: L08914</p>
            </div>

            <div className="space-y-2 text-xs text-[#594d42]">
              <div className="flex items-start gap-2">
                <ShieldCheck size={14} className="text-[#8a6f5a] mt-0.5 flex-shrink-0" />
                <span>Packaging Preference: Archival Unbleached Linen Cask</span>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck size={14} className="text-[#8a6f5a] mt-0.5 flex-shrink-0" />
                <span>Eco Delivery: 100% Carbon-Neutral Electric Courier</span>
              </div>
            </div>

            <button className="w-full py-2 bg-white border border-[#d8c8b4] hover:bg-[#faf6f0] text-[#3d2e24] text-xs font-semibold tracking-archival uppercase rounded-sm transition-colors">
              MANAGE DELIVERY SETTINGS
            </button>
          </div>

        </div>
      </div>

      {/* 6. PATRON ALLOCATION PRIVILEGE — SELECTED FOR YOUR FIBER SILHOUETTE */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#e6dbc9] pb-4">
          <div>
            <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#8a6f5a] block">
              PATRON ALLOCATION PRIVILEGE
            </span>
            <h2 className="font-editorial text-2xl text-[#1c1b1a]">
              Selected for Your Fiber Silhouette
            </h2>
          </div>
          <span className="text-xs text-[#81756d]">
            Private Drop allocations Reserved for 48 Hours
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* Alloc 1 */}
          <div className="p-4 bg-white border border-[#e6dbc9] rounded-sm flex gap-4 shadow-xs">
            <div className="w-24 h-28 relative bg-[#efe7da] rounded overflow-hidden flex-shrink-0 border border-[#d8c8b4]">
              <Image
                src="https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?q=80&w=300&auto=format&fit=crop"
                alt="Solstice Open-Knit Bucket Hat"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 flex flex-col justify-between text-xs">
              <div className="space-y-1">
                <span className="text-[9.5px] font-semibold text-[#8a6f5a] uppercase">SUMMER MICRO-DROP 01</span>
                <h4 className="font-editorial text-base text-[#1c1b1a]">
                  Solstice Open-Knit Bucket Hat in Wild Raffia
                </h4>
                <p className="text-[11px] text-[#594d42]">
                  Loom-knotted using raw Madagascar wild palm fronds.
                </p>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="font-editorial text-lg text-[#1c1b1a]">€340 <span className="text-[10px] text-[#81756d] font-sans font-normal">EUR • 14 Loom Hrs</span></span>
                <div className="flex gap-1.5">
                  <button className="px-2.5 py-1 bg-[#5c4533] text-white rounded-sm text-[10px] font-semibold uppercase">
                    RESERVE FROM LOOM
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Alloc 2 */}
          <div className="p-4 bg-white border border-[#e6dbc9] rounded-sm flex gap-4 shadow-xs">
            <div className="w-24 h-28 relative bg-[#efe7da] rounded overflow-hidden flex-shrink-0 border border-[#d8c8b4]">
              <Image
                src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=300&auto=format&fit=crop"
                alt="Ribbon-Weave Architectural Wool Throw"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 flex flex-col justify-between text-xs">
              <div className="space-y-1">
                <span className="text-[9.5px] font-semibold text-[#8a6f5a] uppercase">MAISON • HEIRLOOM 02</span>
                <h4 className="font-editorial text-base text-[#1c1b1a]">
                  Ribbon-Weave Architectural Wool Throw
                </h4>
                <p className="text-[11px] text-[#594d42]">
                  Spun from unbleached Portuguese highland fleece.
                </p>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="font-editorial text-lg text-[#1c1b1a]">€780 <span className="text-[10px] text-[#81756d] font-sans font-normal">EUR • 44 Loom Hrs</span></span>
                <div className="flex gap-1.5">
                  <button className="px-2.5 py-1 bg-[#5c4533] text-white rounded-sm text-[10px] font-semibold uppercase">
                    RESERVE FROM LOOM
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 7. BOTTOM ATELIER SIGNOFF */}
      <div className="text-center py-8 space-y-1 border-t border-[#e6dbc9]">
        <blockquote className="font-editorial text-base sm:text-lg text-[#1c1b1a] italic">
          &ldquo;To honor fiber, artisan hands, and the timeless pace of slow creation.&rdquo;
        </blockquote>
        <p className="text-[10px] tracking-[0.2em] uppercase text-[#8a6f5a] font-semibold">
          E&A ATELIER MASTER GUILD • PARIS & LUBERON • ALL RIGHTS RESERVED
        </p>
      </div>

    </div>
  );
}
