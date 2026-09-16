"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Truck,
  MessageSquare,
  Scissors,
  Check,
  Building,
  Filter,
  Plus,
} from "lucide-react";

export default function AdminDashboardClient() {
  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-[1550px] mx-auto font-sans">
      
      {/* 1. TOP HEADER & BATCH CYCLE CONTROLS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#e6dbc9]">
        <div>
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#8a6f5a] block mb-0.5">
            ATELIER PULSE • LIVE CHAMBER
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl text-[#1c1b1a] font-normal tracking-tight">
            Studio Master Overview
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-2 bg-[#efe7da] border border-[#d8c8b4] rounded-sm text-xs text-[#3d2e24]">
            <Calendar size={14} className="text-[#8a6f5a]" />
            <span className="text-[11px] uppercase tracking-wider text-[#705743]">ACTIVE CYCLE</span>
            <span className="font-semibold text-[#1c1b1a]">Spring Micro-Batch 04</span>
          </div>

          <button className="bg-[#5c4533] hover:bg-[#433123] text-white px-5 py-2 rounded-sm text-xs font-semibold tracking-archival uppercase transition-colors shadow-xs">
            CONFIGURE BATCH 05
          </button>
        </div>
      </div>

      {/* 2. FOUR PRIMARY METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Metric 1: Revenue */}
        <div className="bg-white p-5 rounded-sm border border-[#e6dbc9] shadow-xs space-y-2 relative">
          <div className="flex items-center justify-between text-[#81756d]">
            <span className="text-[9.5px] font-bold tracking-[0.16em] uppercase text-[#8a6f5a]">
              CURATED REVENUE (SPRING MTD)
            </span>
            <Building size={14} className="text-[#8a6f5a]" />
          </div>
          <div className="flex items-baseline gap-2.5">
            <span className="font-editorial text-3xl text-[#1c1b1a]">€42,850</span>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">
              +18.4%
            </span>
          </div>
          <p className="text-[11px] text-[#705743] pt-1">
            Avg. Order Value: €385 • Carbon-Neutral Offset
          </p>
        </div>

        {/* Metric 2: Loom Capacity */}
        <div className="bg-white p-5 rounded-sm border border-[#e6dbc9] shadow-xs space-y-2 relative">
          <div className="flex items-center justify-between text-[#81756d]">
            <span className="text-[9.5px] font-bold tracking-[0.16em] uppercase text-[#8a6f5a]">
              LOOM CAPACITY & CRAFT
            </span>
            <Scissors size={14} className="text-[#8a6f5a]" />
          </div>
          <div className="flex items-baseline gap-2.5">
            <span className="font-editorial text-3xl text-[#1c1b1a]">
              342 <span className="text-xl text-[#81756d]">/ 400 hrs</span>
            </span>
            <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-1.5 py-0.5 rounded">
              85.5% Booked
            </span>
          </div>
          <p className="text-[11px] text-[#705743] pt-1">
            Across 4 resident master artisans
          </p>
        </div>

        {/* Metric 3: Bespoke Commissions */}
        <div className="bg-white p-5 rounded-sm border border-[#e6dbc9] shadow-xs space-y-2 relative">
          <div className="flex items-center justify-between text-[#81756d]">
            <span className="text-[9.5px] font-bold tracking-[0.16em] uppercase text-[#8a6f5a]">
              BESPOKE COMMISSIONS
            </span>
            <Sparkles size={14} className="text-[#8a6f5a]" />
          </div>
          <div className="flex items-baseline gap-2.5">
            <span className="font-editorial text-3xl text-[#1c1b1a]">6 Active</span>
            <span className="text-[10px] font-medium text-[#705743] bg-[#efe7da] px-1.5 py-0.5 rounded">
              4 In Queue
            </span>
          </div>
          <p className="text-[11px] text-[#705743] pt-1 truncate">
            2 Bridal Veils • 3 Net Totes • 1 Tapestry
          </p>
        </div>

        {/* Metric 4: Micro-Release */}
        <div className="bg-white p-5 rounded-sm border border-[#e6dbc9] shadow-xs space-y-2 relative">
          <div className="flex items-center justify-between text-[#81756d]">
            <span className="text-[9.5px] font-bold tracking-[0.16em] uppercase text-[#8a6f5a]">
              MICRO-RELEASE BATCH NO. 04
            </span>
            <Clock size={14} className="text-[#8a6f5a]" />
          </div>
          <div className="flex items-baseline gap-2.5">
            <span className="font-editorial text-3xl text-[#1c1b1a]">82% Sold</span>
            <span className="text-[10px] font-bold text-[#705743] bg-[#f0e3d2] px-1.5 py-0.5 rounded">
              Micro-Drop
            </span>
          </div>
          <p className="text-[11px] text-[#705743] pt-1">
            14/18 Luna Totes • 9/12 Sienna Vests claimed
          </p>
        </div>

      </div>

      {/* 3. HORIZON CYCLE ALLOCATION BANNER */}
      <div className="bg-[#ede5d8] border border-[#d8c8b4] rounded-sm p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-sm bg-[#5c4533] text-[#f8f4ed] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
            <Sparkles size={18} />
          </div>
          <div className="space-y-1">
            <div className="text-[10px] font-bold tracking-[0.16em] uppercase text-[#8a6f5a]">
              HORIZON CYCLE • 14 Days to Public Unlock
            </div>
            <h2 className="font-editorial text-xl sm:text-2xl text-[#1c1b1a]">
              Spring Solstice Capsule — Batch 05 Allocation
            </h2>
            <p className="text-xs text-[#594d42] max-w-2xl leading-relaxed">
              22 private patron allocations pre-booked • 4 natural dye botanical vats aging • Raw silk arrival pending customs clearance
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 self-end md:self-auto">
          <button className="px-4 py-2 bg-white border border-[#d8c8b4] hover:bg-[#faf6f0] text-[#3d2e24] text-xs font-semibold tracking-archival uppercase rounded-sm transition-colors">
            AUDIT YARDAGE
          </button>
          <button className="px-4 py-2 bg-[#5c4533] hover:bg-[#433123] text-white text-xs font-semibold tracking-archival uppercase rounded-sm transition-colors shadow-xs">
            CONFIGURE BATCH 05 PARAMETERS
          </button>
        </div>
      </div>

      {/* 4. MAIN OPERATIONAL GRID (2 COLUMNS) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Loom Queue + Bespoke Requests */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Active Loom Queue */}
          <div className="bg-white border border-[#e6dbc9] rounded-sm shadow-xs p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-[#f0e6d6] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#8a6f5a]" />
                  <h2 className="font-editorial text-xl text-[#1c1b1a]">
                    Active Loom Queue & Work Orders
                  </h2>
                </div>
                <p className="text-xs text-[#81756d]">
                  Real-time floor tracking across studio timber frames
                </p>
              </div>
              <Link
                href="/admin/orders"
                className="text-xs font-semibold text-[#8a6f5a] hover:text-[#5c4533] inline-flex items-center gap-1"
              >
                <span>VIEW ALL 12 LOOMS</span>
                <ArrowRight size={12} />
              </Link>
            </div>

            <div className="space-y-3.5">
              
              {/* Item 1 */}
              <div className="p-4 bg-[#faf6f0] border border-[#e6dbc9] rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-16 relative bg-[#efe7da] rounded overflow-hidden flex-shrink-0 border border-[#d8c8b4]">
                    <Image
                      src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=200&auto=format&fit=crop"
                      alt="The Luna Net Tote"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-[#8a6f5a] bg-[#efe7da] px-1.5 py-0.2 rounded font-semibold">
                        Loom 02
                      </span>
                      <h3 className="font-editorial text-base text-[#1c1b1a] font-medium">
                        The Luna Net Tote
                      </h3>
                    </div>
                    <p className="text-[11px] text-[#705743]">Batch 04 (#14)</p>
                    <p className="text-[11px] text-[#81756d]">
                      Master Artisan: <span className="text-[#3d2e24] font-medium">Elena Varga</span> • Desert Ecru Aegean Cotton
                    </p>
                    <p className="text-[10.5px] text-[#81756d]">
                      Needlework: 14/16 hrs (Looping Handles)
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1.5 self-end sm:self-center">
                  <span className="text-[10px] font-semibold text-amber-900 bg-amber-100 px-2 py-0.5 rounded">
                    Due Tomorrow
                  </span>
                  <button className="text-[11px] font-bold text-[#5c4533] hover:underline uppercase tracking-wider">
                    LOG PASS
                  </button>
                </div>
              </div>

              {/* Item 2 */}
              <div className="p-4 bg-[#faf6f0] border border-[#e6dbc9] rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-16 relative bg-[#efe7da] rounded overflow-hidden flex-shrink-0 border border-[#d8c8b4]">
                    <Image
                      src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=200&auto=format&fit=crop"
                      alt="Custom Bridal Scallop Veil"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-[#8a6f5a] bg-[#efe7da] px-1.5 py-0.2 rounded font-semibold">
                        Bespoke #B-204
                      </span>
                      <h3 className="font-editorial text-base text-[#1c1b1a] font-medium">
                        Custom Bridal Scallop Veil & Wristlet
                      </h3>
                    </div>
                    <p className="text-[11px] text-[#705743]">
                      Patron: Sophie de Montmirail • Artisan: Camille Laurent
                    </p>
                    <p className="text-[11px] text-[#81756d]">
                      Madder Root Botanical Vat Soak (46h) • (26h elapsed)
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1.5 self-end sm:self-center">
                  <span className="text-[10px] font-semibold text-[#705743] bg-[#efe7da] px-2 py-0.5 rounded">
                    Due May 12
                  </span>
                  <button className="text-[11px] font-bold text-[#5c4533] hover:underline uppercase tracking-wider">
                    VAT STATUS
                  </button>
                </div>
              </div>

              {/* Item 3 */}
              <div className="p-4 bg-[#faf6f0] border border-[#e6dbc9] rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-16 relative bg-[#efe7da] rounded overflow-hidden flex-shrink-0 border border-[#d8c8b4]">
                    <Image
                      src="https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?q=80&w=200&auto=format&fit=crop"
                      alt="Aura Textured Vessel Sleeve"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-[#8a6f5a] bg-[#efe7da] px-1.5 py-0.2 rounded font-semibold">
                        Loom 04
                      </span>
                      <h3 className="font-editorial text-base text-[#1c1b1a] font-medium">
                        Aura Textured Vessel Sleeve
                      </h3>
                    </div>
                    <p className="text-[11px] text-[#705743]">Living Collab #08</p>
                    <p className="text-[11px] text-[#81756d]">
                      Master Artisan: Inès Moreau • Belgian Raw Flax
                    </p>
                    <p className="text-[10.5px] text-[#81756d]">
                      Blocking & Steam Finish (Wax seal inspection ready)
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1.5 self-end sm:self-center">
                  <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    Final QA
                  </span>
                  <button className="text-[11px] font-bold text-[#5c4533] hover:underline uppercase tracking-wider">
                    INSPECT
                  </button>
                </div>
              </div>

              {/* Item 4 */}
              <div className="p-4 bg-[#faf6f0] border border-[#e6dbc9] rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-16 relative bg-[#efe7da] rounded overflow-hidden flex-shrink-0 border border-[#d8c8b4]">
                    <Image
                      src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=200&auto=format&fit=crop"
                      alt="Sienna Scallop Vest"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-[#8a6f5a] bg-[#efe7da] px-1.5 py-0.2 rounded font-semibold">
                        Custom #B-205
                      </span>
                      <h3 className="font-editorial text-base text-[#1c1b1a] font-medium">
                        Sienna Scallop Vest • Custom Sizing
                      </h3>
                    </div>
                    <p className="text-[11px] text-[#81756d]">
                      Artisan: Maria Santos • Raffia & Spun Linen
                    </p>
                    <p className="text-[10.5px] text-[#81756d]">
                      Pattern Draft & Tension Calibration
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1.5 self-end sm:self-center">
                  <span className="text-[10px] font-semibold text-[#705743] bg-[#efe7da] px-2 py-0.5 rounded">
                    Due May 18
                  </span>
                  <button className="text-[11px] font-bold text-[#5c4533] hover:underline uppercase tracking-wider">
                    WARP LOOM
                  </button>
                </div>
              </div>

            </div>

            {/* Bottom Work Order Callout */}
            <div className="pt-3 border-t border-[#f0e6d6] flex items-center justify-between text-xs text-[#705743]">
              <div className="flex items-center gap-2 font-medium">
                <Scissors size={14} className="text-[#8a6f5a]" />
                <span>ASSIGN NEW WORK ORDER</span>
              </div>
              <span className="text-[11px] text-[#81756d]">
                Next scheduled artisan rotation: 16:00 CET
              </span>
            </div>
          </div>

          {/* Bespoke Concierge & Inbound Requests */}
          <div className="bg-white border border-[#e6dbc9] rounded-sm shadow-xs p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-[#f0e6d6] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-editorial text-xl text-[#1c1b1a]">
                    Bespoke Concierge & Inbound Requests
                  </h2>
                  <span className="text-[9px] font-bold text-[#705743] bg-[#efe7da] px-2 py-0.5 rounded">
                    3 Pending
                  </span>
                </div>
                <p className="text-xs text-[#81756d]">
                  Private client commissions awaiting directorial sign-off
                </p>
              </div>
              <Link
                href="/admin/commissions"
                className="text-xs font-semibold text-[#8a6f5a] hover:text-[#5c4533]"
              >
                ALL INQUIRIES (18)
              </Link>
            </div>

            <div className="space-y-4">
              
              {/* Request 1 */}
              <div className="p-4 bg-[#faf6f0] border border-[#e6dbc9] rounded-sm space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#e8dac7] text-[#5c4533] flex items-center justify-center font-editorial font-bold text-xs">
                      LV
                    </div>
                    <div>
                      <h4 className="font-editorial text-base text-[#1c1b1a]">
                        Lady Caroline V.
                      </h4>
                      <p className="text-[11px] text-[#81756d]">London, UK</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-editorial text-lg text-[#1c1b1a]">€950 EUR</span>
                    <span className="text-[10px] text-[#8a6f5a] block uppercase font-semibold">
                      Commission Budget
                    </span>
                  </div>
                </div>

                <div className="text-xs text-[#4f453e] space-y-1">
                  <p className="font-semibold text-[#1c1b1a]">
                    Bespoke Bridal Headpiece & Veil in Organic Bleached Silk
                  </p>
                  <p className="italic text-[#705743] leading-relaxed">
                    &ldquo;Seeking an intricately scalloped chapel-length veil with hand-knotted pearl micro-beads inspired by late 19th-century Norman lace, paired with raw natural ecru silk tones.&rdquo;
                  </p>
                </div>

                <div className="pt-2 border-t border-[#e6dbc9] flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="text-[10.5px] text-[#8a6f5a] font-medium">
                    Palette Swatch Box Dispatched via Courier
                  </span>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1 bg-white border border-[#d8c8b4] text-[#3d2e24] text-[11px] font-semibold rounded-sm hover:bg-[#efe7da]">
                      MESSAGE CLIENT
                    </button>
                    <button className="px-3 py-1 bg-[#5c4533] hover:bg-[#433123] text-white text-[11px] font-semibold rounded-sm shadow-xs">
                      APPROVE QUOTE
                    </button>
                  </div>
                </div>
              </div>

              {/* Request 2 */}
              <div className="p-4 bg-[#faf6f0] border border-[#e6dbc9] rounded-sm space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#e8dac7] text-[#5c4533] flex items-center justify-center font-editorial font-bold text-xs">
                      SL
                    </div>
                    <div>
                      <h4 className="font-editorial text-base text-[#1c1b1a]">
                        Studio Liaigre
                      </h4>
                      <p className="text-[11px] text-[#81756d]">Paris, FR</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-editorial text-lg text-[#1c1b1a]">€3,400 EUR</span>
                    <span className="text-[10px] text-[#8a6f5a] block uppercase font-semibold">
                      Architectural Quote
                    </span>
                  </div>
                </div>

                <div className="text-xs text-[#4f453e]">
                  <p className="font-semibold text-[#1c1b1a]">
                    Architectural Wool & Linen Wall Tapestry (180 × 120 cm)
                  </p>
                  <p className="text-[11px] text-[#81756d] mt-1">
                    Awaiting Dimension Confirmation & Wall Anchor Specs
                  </p>
                </div>

                <div className="pt-2 border-t border-[#e6dbc9] flex justify-end">
                  <button className="px-3 py-1 bg-white border border-[#d8c8b4] text-[#3d2e24] text-[11px] font-semibold rounded-sm hover:bg-[#efe7da]">
                    REVIEW BRIEF
                  </button>
                </div>
              </div>

              {/* Request 3 */}
              <div className="p-4 bg-[#faf6f0] border border-[#e6dbc9] rounded-sm space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#e8dac7] text-[#5c4533] flex items-center justify-center font-editorial font-bold text-xs">
                      MK
                    </div>
                    <div>
                      <h4 className="font-editorial text-base text-[#1c1b1a]">
                        Min-Jae Kim
                      </h4>
                      <p className="text-[11px] text-[#81756d]">Seoul, KR</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-editorial text-lg text-[#1c1b1a]">€460 EUR</span>
                    <span className="text-[10px] text-[#8a6f5a] block uppercase font-semibold">
                      Custom Edition
                    </span>
                  </div>
                </div>

                <div className="text-xs text-[#4f453e]">
                  <p className="font-semibold text-[#1c1b1a]">
                    The Luna Tote in Custom Indigo & Pomegranate Dye
                  </p>
                  <p className="text-[11px] text-emerald-800 mt-1">
                    ✓ Swatch Approved • Ready for Loom Slot
                  </p>
                </div>

                <div className="pt-2 border-t border-[#e6dbc9] flex justify-end">
                  <button className="px-3 py-1 bg-[#5c4533] hover:bg-[#433123] text-white text-[11px] font-semibold rounded-sm shadow-xs">
                    QUEUE TO LOOM
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Provenance Stock + Dispatch + Journal */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Fiber Provenance & Stock */}
          <div className="bg-white border border-[#e6dbc9] rounded-sm shadow-xs p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-[#f0e6d6] pb-3">
              <div>
                <h2 className="font-editorial text-xl text-[#1c1b1a]">
                  Fiber Provenance & Stock
                </h2>
                <p className="text-xs text-[#81756d]">
                  Ecological origins & spinning yields
                </p>
              </div>
              <Filter size={15} className="text-[#8a6f5a]" />
            </div>

            <div className="space-y-4 text-xs">
              
              {/* Item 1 */}
              <div className="p-3.5 bg-[#faf6f0] border border-[#e6dbc9] rounded-sm space-y-1.5">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-[#1c1b1a]">GOTS Organic Aegean Cotton</h4>
                    <p className="text-[10.5px] text-[#81756d]">Origin: Izmir, Turkey • 100% Unbleached</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-sm text-[#1c1b1a]">42.5 kg</span>
                    <span className="text-[9.5px] text-emerald-800 font-semibold block">Comfortable</span>
                  </div>
                </div>
                <div className="w-full bg-[#e6dbc9] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full" style={{ width: "75%" }} />
                </div>
                <p className="text-[10.5px] text-[#705743]">
                  Sufficient for 38 upcoming Luna Net Totes
                </p>
              </div>

              {/* Item 2 */}
              <div className="p-3.5 bg-[#faf6f0] border border-[#e6dbc9] rounded-sm space-y-1.5">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-[#1c1b1a]">Wild Madagascar Raffia</h4>
                    <p className="text-[10.5px] text-[#81756d]">Hand-harvested, Certified Sustainable</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-sm text-red-700">8.2 kg</span>
                    <span className="text-[9.5px] text-red-700 font-bold block flex items-center gap-0.5 justify-end">
                      <AlertTriangle size={10} /> Low Stock Alert
                    </span>
                  </div>
                </div>
                <div className="w-full bg-[#e6dbc9] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-red-600 h-full rounded-full" style={{ width: "22%" }} />
                </div>
                <div className="flex justify-between items-center text-[10.5px] pt-1">
                  <span className="text-[#81756d]">Re-order required for Batch 05 reserve</span>
                  <button className="text-[#5c4533] font-bold hover:underline uppercase">
                    DISPATCH PO
                  </button>
                </div>
              </div>

              {/* Item 3 */}
              <div className="p-3.5 bg-[#faf6f0] border border-[#e6dbc9] rounded-sm space-y-1.5">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-[#1c1b1a]">Belgian Rain-fed Flax Linen</h4>
                    <p className="text-[10.5px] text-[#81756d]">Kortrijk Region • Wet-spun 14 Lea</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-sm text-[#1c1b1a]">19.4 kg</span>
                    <span className="text-[9.5px] text-amber-800 font-semibold block">In Dye Bath</span>
                  </div>
                </div>
                <div className="w-full bg-[#e6dbc9] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-amber-600 h-full rounded-full" style={{ width: "48%" }} />
                </div>
                <p className="text-[10.5px] text-[#705743]">
                  Allocated to Sienna Vests & Architectural Wall Hanging
                </p>
              </div>

              {/* Item 4 */}
              <div className="p-3.5 bg-[#faf6f0] border border-[#e6dbc9] rounded-sm space-y-1.5">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-[#1c1b1a]">Natural Dye Botanicals</h4>
                    <p className="text-[10.5px] text-[#81756d]">Oak bark, pomegranate skins, madder root</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-sm text-[#1c1b1a]">14 Units</span>
                    <span className="text-[9.5px] text-emerald-800 font-semibold block">Optimal</span>
                  </div>
                </div>
                <p className="text-[10.5px] text-[#705743]">
                  Fermentation tanks #2 & #3 at active saturation
                </p>
              </div>

            </div>

            <button className="w-full py-2 bg-[#efe7da] hover:bg-[#e2d5c2] text-[#3d2e24] text-xs font-semibold tracking-archival uppercase rounded-sm transition-colors border border-[#d8c8b4]">
              + LOG FIBER DELIVERY / BATCH INSPECTION
            </button>
          </div>

          {/* Dispatch & Seal Packaging */}
          <div className="bg-white border border-[#e6dbc9] rounded-sm shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#f0e6d6] pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-editorial text-xl text-[#1c1b1a]">
                    Dispatch & Seal Packaging
                  </h2>
                  <span className="text-[9px] font-semibold text-[#705743] bg-[#efe7da] px-2 py-0.5 rounded">
                    3 Rituals Ready
                  </span>
                </div>
                <p className="text-xs text-[#81756d]">
                  Numbered certificates, dustbags & wax sealing
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              
              {/* Dispatch 1 */}
              <div className="p-3.5 bg-[#faf6f0] border border-[#e6dbc9] rounded-sm space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-[#1c1b1a]">Elena R. • Tokyo, JP</h4>
                    <p className="text-[11px] text-[#705743]">Luna Net Tote • No. 014/100</p>
                  </div>
                  <span className="text-[10px] font-mono text-[#8a6f5a] font-semibold">#EA-8843</span>
                </div>
                <div className="flex items-center justify-between pt-1 text-[11px]">
                  <span className="text-emerald-800 font-medium flex items-center gap-1">
                    ✓ Express DHL Green
                  </span>
                  <button className="px-2.5 py-1 bg-[#5c4533] hover:bg-[#433123] text-white text-[10.5px] font-semibold rounded-sm uppercase tracking-wider">
                    PRINT CERTIFICATE
                  </button>
                </div>
              </div>

              {/* Dispatch 2 */}
              <div className="p-3.5 bg-[#faf6f0] border border-[#e6dbc9] rounded-sm space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-[#1c1b1a]">Chloe M. • New York, USA</h4>
                    <p className="text-[11px] text-[#705743]">Solstice Bucket Hat & Silk Scrunchie</p>
                  </div>
                  <span className="text-[10px] font-mono text-[#8a6f5a] font-semibold">#EA-8839</span>
                </div>
                <div className="flex items-center justify-between pt-1 text-[11px]">
                  <span className="text-[#81756d]">FedEx Carbon-Neutral</span>
                  <button className="px-2.5 py-1 bg-white border border-[#d8c8b4] text-[#3d2e24] text-[10.5px] font-semibold rounded-sm uppercase tracking-wider hover:bg-[#efe7da]">
                    GENERATE AIRWAY BILL
                  </button>
                </div>
              </div>

              {/* Dispatch 3 */}
              <div className="p-3.5 bg-[#faf6f0] border border-[#e6dbc9] rounded-sm space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-[#1c1b1a]">Marc V. • Zurich, CH</h4>
                    <p className="text-[11px] text-[#705743]">Aura Ceramic Sleeve & Candle Set</p>
                  </div>
                  <span className="text-[10px] font-mono text-[#8a6f5a] font-semibold">#EA-8835</span>
                </div>
                <div className="flex items-center justify-between pt-1 text-[11px]">
                  <span className="text-[#81756d]">Wax Sealed • Packed</span>
                  <button className="px-2.5 py-1 bg-white border border-[#d8c8b4] text-[#3d2e24] text-[10.5px] font-semibold rounded-sm uppercase tracking-wider hover:bg-[#efe7da]">
                    MARK DISPATCHED
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Weaver's Morning Journal */}
          <div className="p-5 bg-[#ede4d5] border border-[#dacbb7] rounded-sm space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <h3 className="font-editorial text-base text-[#1c1b1a] flex items-center gap-1.5">
                <FileText size={15} className="text-[#705743]" />
                <span>Weaver&apos;s Morning Journal</span>
              </h3>
            </div>
            <p className="text-[11.5px] text-[#4f453e] italic leading-relaxed">
              &ldquo;Natural indigo oxidation vat #1 is demonstrating optimal depth after 72 hours of aeration. Keep loom ambient humidity calibrated at 58% through dusk to protect Aegean cotton elasticity.&rdquo;
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-[#dacbb7] text-[10.5px] text-[#705743]">
              <span>Elena Laurent • 08:30 CET</span>
              <button className="font-semibold uppercase tracking-wider hover:underline text-[#3d2e24]">
                NEW ENTRY
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
