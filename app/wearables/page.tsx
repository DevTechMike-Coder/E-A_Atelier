"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Clock, CheckCircle2, ArrowRight, ShieldCheck, Mail } from "lucide-react";
import { useStore } from "../context/StoreContext";

export default function WearablesComingSoonPage() {
  const { openBespokeModal } = useStore();
  const [email, setEmail] = useState("");
  const [waitlistRegistered, setWaitlistRegistered] = useState(false);

  const previewPieces = [
    {
      title: "Sienna Scallop Crochet Vest",
      material: "100% Belgian Long-Line Flax",
      hours: "24 Hours Handcraft",
      status: "Prototype Finalized",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop",
      tagline: "Scalloped hemline engineered with zero synthetic backing for natural fluid motion.",
    },
    {
      title: "Verona Halter Top in Unbleached Linen",
      material: "Raw Normandy Flax Yarn",
      hours: "14 Hours Handcraft",
      status: "Tension Testing",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop",
      tagline: "Cropped architectural geometry featuring open chevron breath-holes and self-tie cords.",
    },
    {
      title: "Provence Ribbed Chevron Cardigan",
      material: "Mulberry Silk & Aegean Cotton",
      hours: "32 Hours Handcraft",
      status: "Dye Immersion Phase",
      image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop",
      tagline: "Relaxed silhouette with horn button closures and memory-retaining ribbed cuffs.",
    },
  ];

  return (
    <div className="w-full space-y-24 sm:space-y-32 pb-24 overflow-hidden font-sans">
      
      {/* 1. EDITORIAL COMING SOON HERO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#efe7da] border border-[rgba(138,111,90,0.2)] rounded-full text-[10.5px] font-semibold tracking-archival uppercase text-[#705743]">
              <Clock size={13} className="text-[#8a6f5a]" />
              <span>CAPSULE IN DEVELOPMENT • COMING SOON</span>
            </div>

            <div className="space-y-4">
              <h1 className="font-editorial text-5xl sm:text-6xl md:text-[68px] leading-[1.08] text-[#1c1b1a] tracking-tight font-normal">
                Sculpted Silhouettes, <br />
                <span className="italic text-[#705743]">Spun for the Form.</span>
              </h1>

              <p className="text-sm sm:text-base text-[#4f453e] leading-relaxed max-w-xl">
                Our master artisans are currently perfecting the drape, bias memory, and tactile weight of our upcoming premiere Wearables capsule. Unlike mass-manufactured garments, every contour is calculated loop by loop to eliminate waste.
              </p>
            </div>

            {/* Waitlist Registration Box */}
            <div className="bg-white border border-[rgba(138,111,90,0.22)] rounded-sm p-6 max-w-lg shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-archival uppercase text-[#8a6f5a]">
                <Sparkles size={14} /> VIP ARCHIVE PRIORITY ACCESS
              </div>
              <p className="text-xs text-[#4f453e]">
                Be the first to view lookbook proofs and reserve an artisanal batch slot before general public opening.
              </p>

              {waitlistRegistered ? (
                <div className="flex items-center gap-2 bg-[#efe7da] text-[#705743] px-4 py-3 rounded-sm text-xs font-medium border border-[rgba(138,111,90,0.25)]">
                  <CheckCircle2 size={18} />
                  <span>You are registered on the Wearables priority dispatch register.</span>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (email) setWaitlistRegistered(true);
                  }}
                  className="flex flex-col sm:flex-row gap-2 pt-1"
                >
                  <input
                    type="email"
                    required
                    placeholder="Enter your correspondence email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-[#fdf8f5] border border-[rgba(138,111,90,0.25)] px-4 py-2.5 text-xs text-[#1c1b1a] focus:outline-none focus:border-[#8a6f5a] rounded-sm"
                  />
                  <button
                    type="submit"
                    className="bg-[#242321] text-[#f8f4ed] hover:bg-[#8a6f5a] transition-colors text-xs font-semibold tracking-archival uppercase px-6 py-2.5 rounded-sm"
                  >
                    JOIN WAITLIST
                  </button>
                </form>
              )}
            </div>

            {/* Key Development Status */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[rgba(138,111,90,0.18)] max-w-lg">
              <div>
                <span className="font-editorial text-2xl text-[#1c1b1a] block">0%</span>
                <span className="text-[10px] tracking-archival uppercase text-[#81756d] font-semibold">
                  Synthetic Yarn
                </span>
              </div>
              <div>
                <span className="font-editorial text-2xl text-[#1c1b1a] block">24h+</span>
                <span className="text-[10px] tracking-archival uppercase text-[#81756d] font-semibold">
                  Weaving Per Top
                </span>
              </div>
              <div>
                <span className="font-editorial text-2xl text-[#1c1b1a] block">Strictly 8</span>
                <span className="text-[10px] tracking-archival uppercase text-[#81756d] font-semibold">
                  Pieces Per Edition
                </span>
              </div>
            </div>
          </div>

          {/* Right Image Feature */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] w-full rounded-sm overflow-hidden border border-[rgba(138,111,90,0.25)] shadow-xl bg-[#efe7da]">
              <Image
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop"
                alt="Wearables Capsule Lookbook Preview"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />

              <div className="absolute top-4 left-4 bg-[#242321]/90 backdrop-blur-sm text-white px-3 py-1 rounded-sm text-[9.5px] tracking-archival uppercase">
                ARCHIVAL PROTOTYPE PREVIEW
              </div>

              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm p-4 rounded-sm border border-[rgba(138,111,90,0.2)] shadow-md">
                <span className="text-[9.5px] font-semibold tracking-archival uppercase text-[#8a6f5a] block">
                  CRAFT SPECIFICATION
                </span>
                <p className="font-editorial text-lg text-[#1c1b1a]">
                  Sienna Scallop Vest
                </p>
                <p className="text-[11px] text-[#4f453e] mt-0.5">
                  100% Belgian flax with openwork scalloped waistline.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. CAPSULE TIMELINE ROADMAP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#efe7da]/60 border border-[rgba(138,111,90,0.22)] rounded-sm p-8 sm:p-12">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <span className="text-[10px] font-semibold tracking-archival uppercase text-[#8a6f5a]">
              ROADMAP TO RELEASE
            </span>
            <h2 className="font-editorial text-3xl text-[#1c1b1a]">
              The Artisanal Trajectory
            </h2>
            <p className="text-xs text-[#4f453e]">
              A timeline governed by harvest seasons and natural dye cycles rather than industrial calendar pressures.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "Phase 01",
                title: "Flax Harvest & Retting",
                status: "COMPLETED",
                statusColor: "bg-[#705743] text-white",
                desc: "Normandy long-line flax dew-retted under open Atlantic skies and spun into fine yarn.",
              },
              {
                step: "Phase 02",
                title: "Tension & Drape Calibration",
                status: "CURRENTLY ACTIVE",
                statusColor: "bg-[#8a6f5a] text-white",
                desc: "Iterative prototype looping on live body forms to establish elasticity memory.",
              },
              {
                step: "Phase 03",
                title: "Botanical Kettle Baths",
                status: "JUNE 2026",
                statusColor: "bg-[#e6e2de] text-[#4f453e]",
                desc: "Wild madder root, elderberry, and French walnut shell low-heat mineral baths.",
              },
              {
                step: "Phase 04",
                title: "Private Batch Reservation",
                status: "AUTUMN 2026",
                statusColor: "bg-[#e6e2de] text-[#4f453e]",
                desc: "Invitation dispatch to registered waitlist custodians before public release.",
              },
            ].map((phase) => (
              <div
                key={phase.step}
                className="bg-white border border-[rgba(138,111,90,0.2)] p-5 rounded-sm space-y-3 shadow-sm"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-editorial text-lg text-[#705743]">{phase.step}</span>
                  <span className={`text-[9px] font-bold tracking-archival uppercase px-2 py-0.5 rounded ${phase.statusColor}`}>
                    {phase.status}
                  </span>
                </div>
                <h3 className="font-editorial text-base text-[#1c1b1a]">
                  {phase.title}
                </h3>
                <p className="text-[11px] text-[#4f453e] leading-relaxed">
                  {phase.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PREVIEW LOOKBOOK GALLERY (NON-FUNCTIONAL CARDS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[rgba(138,111,90,0.18)] gap-4">
          <div>
            <span className="text-[10px] tracking-archival uppercase text-[#8a6f5a] font-semibold block mb-1">
              ARCHIVAL PROOFS
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#1c1b1a]">
              Lookbook Prototypes
            </h2>
          </div>
          <p className="text-xs text-[#81756d] max-w-xs">
            Preview plates from the atelier cutting floor. These garments are currently undergoing fitting refinement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {previewPieces.map((piece) => (
            <div
              key={piece.title}
              className="bg-white border border-[rgba(138,111,90,0.2)] rounded-sm overflow-hidden shadow-sm flex flex-col"
            >
              <div className="relative aspect-[3/4] w-full bg-[#f7f3ef] overflow-hidden">
                <Image
                  src={piece.image}
                  alt={piece.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
                <span className="absolute top-3 left-3 bg-white/95 text-[#1c1b1a] text-[9.5px] font-semibold tracking-archival uppercase px-2.5 py-1 rounded-sm border border-[rgba(138,111,90,0.2)] shadow-sm">
                  {piece.status}
                </span>
                <span className="absolute bottom-3 left-3 bg-[#242321]/80 text-white text-[9px] font-medium tracking-archival uppercase px-2 py-0.5 rounded-sm">
                  {piece.hours}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[10px] font-semibold tracking-archival uppercase text-[#8a6f5a]">
                    {piece.material}
                  </span>
                  <h3 className="font-editorial text-xl text-[#1c1b1a] mt-1">
                    {piece.title}
                  </h3>
                  <p className="text-xs text-[#4f453e] mt-2 leading-relaxed">
                    {piece.tagline}
                  </p>
                </div>

                <div className="pt-3 border-t border-[rgba(138,111,90,0.15)] flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-archival text-[#81756d]">
                    COMING SOON
                  </span>
                  <button
                    onClick={() => openBespokeModal(piece.title)}
                    className="text-[10.5px] font-semibold tracking-archival uppercase text-[#8a6f5a] hover:underline"
                  >
                    INQUIRE BESPOKE &rarr;
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. BESPOKE SIZING CONSULTATION CALLOUT */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#242321] text-[#f8f4ed] p-8 sm:p-12 rounded-sm text-center space-y-4">
          <span className="text-[10px] font-semibold tracking-archival uppercase text-[#d8c8b5]">
            INDIVIDUAL TAILORING
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl text-white">
            Seeking Bespoke Bridal or Ceremonial Wear?
          </h2>
          <p className="text-xs sm:text-sm text-[#d8c8b5]/80 max-w-lg mx-auto leading-relaxed">
            While our standard sizing capsule is in development, we accept two bespoke haute-couture apparel commissions per quarter for custom bridal crochet coats and gala capes.
          </p>
          <div className="pt-2">
            <button
              onClick={() => openBespokeModal("Haute-Couture Wearable Commission")}
              className="bg-white text-[#242321] hover:bg-[#efe7da] px-8 py-3 text-xs font-semibold tracking-archival uppercase rounded-sm transition-colors shadow-md"
            >
              CONSULT WITH MASTER KNITTER &rarr;
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
