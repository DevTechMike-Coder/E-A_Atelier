"use client";

import React from "react";
import Image from "next/image";
import { useStore } from "../context/StoreContext";
import { X, SearchCheck, Layers, Gauge, Clock, Compass } from "lucide-react";

export default function StitchInspectModal() {
  const { activeStitch, closeStitchModal } = useStore();

  if (!activeStitch) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto font-sans flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-[#1c1b1a]/60 backdrop-blur-sm transition-opacity"
        onClick={closeStitchModal}
      />

      <div className="relative bg-[#fdf8f5] border border-[rgba(138,111,90,0.3)] rounded-sm max-w-2xl w-full p-6 sm:p-8 shadow-2xl z-10 animate-fade-in overflow-hidden">
        <button
          onClick={closeStitchModal}
          className="absolute top-4 right-4 text-[#81756d] hover:text-[#1c1b1a] p-1.5 rounded-full hover:bg-[#efe7da]"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-2 text-[10px] tracking-archival uppercase font-semibold text-[#8a6f5a] mb-2">
          <SearchCheck size={14} /> FIBER ANATOMY & MICRO-INSPECTION
        </div>

        <h2 className="font-editorial text-2xl sm:text-3xl text-[#1c1b1a] mb-2">
          {activeStitch.name}
        </h2>
        <p className="text-xs text-[#4f453e] mb-6 leading-relaxed max-w-xl">
          {activeStitch.description}
        </p>

        {/* Split Macro View */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Macro Image */}
          <div className="relative aspect-square w-full rounded-sm overflow-hidden border border-[rgba(138,111,90,0.25)] bg-[#f1ede9] shadow-inner">
            <Image
              src={activeStitch.image}
              alt={activeStitch.name}
              fill
              className="object-cover scale-110 hover:scale-125 transition-transform duration-500 cursor-crosshair"
            />
            <div className="absolute bottom-2 left-2 bg-[#242321]/80 backdrop-blur-sm text-[#f8f4ed] text-[9px] uppercase px-2 py-0.5 rounded tracking-archival">
              100X FIBER TENSION INSPECTION
            </div>
          </div>

          {/* Technical Spec Sheet */}
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-white border border-[rgba(138,111,90,0.2)] rounded-sm space-y-1">
              <div className="flex items-center gap-1.5 text-[10px] font-semibold tracking-archival uppercase text-[#8a6f5a]">
                <Gauge size={12} /> Stitch Gauge
              </div>
              <p className="font-medium text-[#1c1b1a]">{activeStitch.gauge}</p>
            </div>

            <div className="p-3 bg-white border border-[rgba(138,111,90,0.2)] rounded-sm space-y-1">
              <div className="flex items-center gap-1.5 text-[10px] font-semibold tracking-archival uppercase text-[#8a6f5a]">
                <Clock size={12} /> Artisanal Cadence
              </div>
              <p className="font-medium text-[#1c1b1a]">{activeStitch.avgTime}</p>
            </div>

            <div className="p-3 bg-white border border-[rgba(138,111,90,0.2)] rounded-sm space-y-1">
              <div className="flex items-center gap-1.5 text-[10px] font-semibold tracking-archival uppercase text-[#8a6f5a]">
                <Layers size={12} /> Applied Fiber
              </div>
              <p className="font-medium text-[#1c1b1a]">{activeStitch.yarn}</p>
            </div>

            <div className="p-3 bg-white border border-[rgba(138,111,90,0.2)] rounded-sm space-y-1">
              <div className="flex items-center gap-1.5 text-[10px] font-semibold tracking-archival uppercase text-[#8a6f5a]">
                <Compass size={12} /> Elasticity Profile
              </div>
              <p className="font-medium text-[#1c1b1a]">{activeStitch.tensionLevel}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[rgba(138,111,90,0.18)] flex justify-end">
          <button
            onClick={closeStitchModal}
            className="bg-[#242321] text-white px-6 py-2 text-xs font-semibold tracking-archival uppercase rounded-sm hover:bg-[#8a6f5a] transition-colors"
          >
            CLOSE INSPECTOR
          </button>
        </div>
      </div>
    </div>
  );
}
