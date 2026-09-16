"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Sparkles, ArrowRight, ShieldCheck, Check, MessageSquare, LogOut, ExternalLink } from "lucide-react";

interface PatronSanctuaryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PatronSanctuaryDrawer({ isOpen, onClose }: PatronSanctuaryDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans select-none">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#1c1b1a]/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Slide-out Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#fdfaf7] shadow-2xl flex flex-col border-l border-[#e6dbc9] overflow-y-auto">
          
          {/* Header */}
          <div className="p-5 border-b border-[#e6dbc9] flex items-center justify-between bg-[#faf6f0]">
            <div className="flex items-center gap-2 text-xs font-bold tracking-archival uppercase text-[#8a6f5a]">
              <Sparkles size={14} />
              <span>PATRON SANCTUARY</span>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/admin/patrons"
                onClick={onClose}
                className="text-xs font-semibold tracking-archival uppercase text-[#3d2e24] hover:text-[#8a6f5a] flex items-center gap-1"
              >
                <span>OPEN VAULT</span>
                <ArrowRight size={12} />
              </Link>
              <button
                onClick={onClose}
                className="p-1 text-[#81756d] hover:text-[#1c1b1a]"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6 flex-1">
            
            {/* Patron Profile Mini Card */}
            <div className="p-4 bg-white border border-[#e6dbc9] rounded-sm space-y-3 shadow-2xs">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full overflow-hidden relative border border-[#d8c8b4] flex-shrink-0 bg-[#efe7da]">
                  <Image
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
                    alt="Camille d'Orsay"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-editorial text-lg text-[#1c1b1a]">
                      Camille d&apos;Orsay
                    </h3>
                    <span className="text-[9px] font-bold text-[#8a6f5a] bg-[#efe7da] px-1.5 py-0.2 rounded uppercase">
                      ARCHIVAL
                    </span>
                  </div>
                  <p className="text-[11px] text-[#81756d]">
                    Patron No. 042 • Paris 7e, France
                  </p>
                  <p className="text-[9.5px] uppercase tracking-wider text-[#9e8876] font-semibold">
                    CUSTODIAN SINCE OCT 2022
                  </p>
                </div>
              </div>

              {/* 3 Stats */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#f0e6d6] text-center">
                <div className="p-1.5 bg-[#faf6f0] rounded">
                  <span className="font-editorial text-lg text-[#1c1b1a] block leading-tight">4</span>
                  <span className="text-[9px] text-[#8a6f5a] uppercase font-semibold">IN CUSTODY</span>
                </div>
                <div className="p-1.5 bg-[#faf6f0] rounded">
                  <span className="font-editorial text-lg text-emerald-800 block leading-tight">1</span>
                  <span className="text-[9px] text-emerald-800 uppercase font-semibold">ACTIVE IN LOOM</span>
                </div>
                <div className="p-1.5 bg-[#faf6f0] rounded">
                  <span className="font-editorial text-lg text-[#1c1b1a] block leading-tight">2</span>
                  <span className="text-[9px] text-[#8a6f5a] uppercase font-semibold">SWITCH LISTS</span>
                </div>
              </div>
            </div>

            {/* Live Loom Commission */}
            <div className="p-4 bg-white border border-[#e6dbc9] rounded-sm space-y-3 shadow-2xs">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[10px] font-bold tracking-archival uppercase text-[#8a6f5a] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
                  LIVE LOOM COMMISSION
                </span>
                <span className="text-[10px] font-mono text-[#81756d]">#B-204</span>
              </div>

              <div className="space-y-1">
                <h4 className="font-editorial text-base text-[#1c1b1a]">
                  Custom Scalloped Bridal Veil
                </h4>
                <p className="text-[11px] text-[#705743]">
                  Madder Root Rose • Belgian Flax
                </p>
              </div>

              {/* Progress bar */}
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-[10px] text-[#705743] font-semibold">
                  <span>STAGE 3 OF 5 / NEEDLE LOOPING</span>
                  <span>69%</span>
                </div>
                <div className="w-full bg-[#e6dbc9] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#8a6f5a] h-full rounded-full" style={{ width: "69%" }} />
                </div>
                <div className="flex justify-between text-[10px] text-[#81756d] pt-0.5">
                  <span>Artisan Camille Laurent assigned</span>
                  <span>Est. Nov 28</span>
                </div>
              </div>

              <Link
                href="/admin/patrons"
                onClick={onClose}
                className="w-full block text-center py-2.5 bg-[#242321] hover:bg-[#8a6f5a] text-white text-xs font-semibold tracking-archival uppercase rounded-sm transition-colors shadow-2xs flex items-center justify-center gap-2"
              >
                <span>TRACK LOOM DISPATCH</span>
                <MessageSquare size={13} />
              </Link>
            </div>

            {/* Archival Custody */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[10px] font-bold tracking-archival uppercase text-[#8a6f5a]">
                  ARCHIVAL CUSTODY
                </span>
                <span className="text-[10px] text-[#81756d]">ALL 4 PIECES</span>
              </div>

              <div className="space-y-2">
                <div className="p-3 bg-white border border-[#e6dbc9] rounded-sm flex items-center gap-3 text-xs">
                  <div className="w-12 h-14 relative bg-[#efe7da] rounded overflow-hidden flex-shrink-0">
                    <Image
                      src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=200&auto=format&fit=crop"
                      alt="The Luna Net Tote"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <div className="flex justify-between items-start">
                      <h5 className="font-editorial text-sm text-[#1c1b1a]">The Luna Net Tote</h5>
                      <span className="text-[9px] font-mono text-[#81756d]">NO. 014/100</span>
                    </div>
                    <p className="text-[10.5px] text-[#705743]">Desert Ecru • Blocked Jan 2024</p>
                    <div className="flex items-center gap-2 text-[10px] text-[#8a6f5a]">
                      <span className="hover:underline cursor-pointer">Request Free Re-Blocking</span>
                      <span>•</span>
                      <span className="hover:underline cursor-pointer">Certificate</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-white border border-[#e6dbc9] rounded-sm flex items-center gap-3 text-xs">
                  <div className="w-12 h-14 relative bg-[#efe7da] rounded overflow-hidden flex-shrink-0">
                    <Image
                      src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=200&auto=format&fit=crop"
                      alt="Sienna Scallop Vest"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <div className="flex justify-between items-start">
                      <h5 className="font-editorial text-sm text-[#1c1b1a]">Sienna Scallop Vest</h5>
                      <span className="text-[9px] font-mono text-[#81756d]">NO. 008/012</span>
                    </div>
                    <p className="text-[10.5px] text-[#705743]">Terracotta Dye • Peruvian Pima</p>
                    <div className="flex items-center gap-2 text-[10px] text-[#8a6f5a]">
                      <span className="hover:underline cursor-pointer">Natural Botanical Guard</span>
                      <span>•</span>
                      <span className="hover:underline cursor-pointer">Care Dossier</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tactile Dossier */}
            <div className="p-4 bg-white border border-[#e6dbc9] rounded-sm space-y-2 text-xs">
              <div className="flex items-center justify-between text-[10px] font-bold tracking-archival uppercase text-[#8a6f5a]">
                <span>TACTILE DOSSIER</span>
                <span className="hover:underline cursor-pointer">EDIT FIT</span>
              </div>
              <div className="space-y-1 text-[11px] text-[#594d42]">
                <p><strong className="text-[#1c1b1a]">Fiber Sensitivities:</strong> GOTS Cotton, Belgian Flax Only</p>
                <p><strong className="text-[#1c1b1a]">Bespoke Gauge Silhouette:</strong> Relaxed Drape (Bust 88cm)</p>
                <p><strong className="text-[#1c1b1a]">Natural Dye Mordants:</strong> Alum &amp; Oak Gall Nut</p>
              </div>
            </div>

          </div>

          {/* Drawer Footer */}
          <div className="p-5 bg-[#faf6f0] border-t border-[#e6dbc9] text-xs text-[#81756d] space-y-2">
            <div className="flex items-center justify-between">
              <Link
                href="/admin"
                onClick={onClose}
                className="text-[#705743] hover:text-[#1c1b1a] flex items-center gap-1 font-semibold uppercase text-[10.5px]"
              >
                <span>ELENA LAURENT (ADMIN VIEW)</span>
                <ExternalLink size={12} />
              </Link>
              <button
                onClick={onClose}
                className="hover:text-red-700 flex items-center gap-1 text-[10.5px] uppercase font-semibold"
              >
                <LogOut size={12} />
                <span>SIGN OUT</span>
              </button>
            </div>
            <p className="text-[9.5px] text-center text-[#9e8876] pt-1">
              PERPETUAL HEIRLOOM GUARANTEE NO. 042 • v2.4 Atelier
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
