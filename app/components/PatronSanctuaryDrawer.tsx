"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "../context/StoreContext";
import GoogleSignInModal from "./GoogleSignInModal";
import { updatePatronDossier } from "@/app/actions/auth";
import {
  X,
  Sparkles,
  ShoppingBag,
  Clock,
  CheckCircle2,
  Heart,
  LogOut,
  Edit3,
  Check,
  Loader2,
  Mail,
  Shield,
  Layers,
  ArrowRight,
} from "lucide-react";

interface PatronSanctuaryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PatronSanctuaryDrawer({
  isOpen,
  onClose,
}: PatronSanctuaryDrawerProps) {
  const { patronUser, refreshPatronSession, logoutPatron, wishlistCount } = useStore();
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);

  // Edit Tactile Dossier state
  const [isEditingDossier, setIsEditingDossier] = useState(false);
  const [fiberSensitivities, setFiberSensitivities] = useState("");
  const [silhouetteDimensions, setSilhouetteDimensions] = useState("");
  const [dyePreferences, setDyePreferences] = useState("");
  const [isSavingDossier, setIsSavingDossier] = useState(false);

  // When opening edit mode, populate initial values
  const handleOpenEditDossier = () => {
    setFiberSensitivities(
      patronUser?.fiberSensitivities || "GOTS Cotton, Belgian Flax Only"
    );
    setSilhouetteDimensions(
      patronUser?.silhouetteDimensions || "Relaxed Drape (Bust 88cm)"
    );
    setDyePreferences(
      patronUser?.dyePreferences || "Natural Alum & Oak Gall Nut"
    );
    setIsEditingDossier(true);
  };

  const handleSaveDossier = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingDossier(true);
    await updatePatronDossier({
      fiberSensitivities,
      silhouetteDimensions,
      dyePreferences,
    });
    await refreshPatronSession();
    setIsSavingDossier(false);
    setIsEditingDossier(false);
  };

  if (!isOpen) return null;

  const ordersCount = patronUser?.orders?.length || 0;
  const commissionsCount = patronUser?.commissions?.length || 0;

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
            <button
              onClick={onClose}
              className="p-1 text-[#81756d] hover:text-[#1c1b1a] rounded-full hover:bg-[#efe7da] transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="p-6 space-y-6 flex-1">
            
            {/* GUEST VIEW (Not Logged In) */}
            {!patronUser ? (
              <div className="space-y-6 py-4 animate-fade-in text-center">
                <div className="w-16 h-16 rounded-full bg-[#242321] text-[#f8f4ed] flex items-center justify-center mx-auto shadow-md">
                  <Shield size={26} className="text-[#d8c8b5]" />
                </div>

                <div className="space-y-2 max-w-xs mx-auto">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#8a6f5a] block">
                    PRIVATE CLIENT DOSSIER
                  </span>
                  <h3 className="font-editorial text-2xl text-[#1c1b1a]">
                    Welcome to Your Sanctuary
                  </h3>
                  <p className="text-xs text-[#594d42] leading-relaxed">
                    Sign in with Google to preserve your bespoke measurements, review archival custody certificates, and track loom commissions.
                  </p>
                </div>

                {/* Google Sign In Button for Storefront */}
                <div className="pt-2">
                  <button
                    onClick={() => setIsGoogleModalOpen(true)}
                    className="w-full flex items-center justify-center gap-3 bg-white hover:bg-[#faf6f0] text-[#1c1b1a] border border-[#d8c8b4] hover:border-[#8a6f5a] py-3.5 px-4 rounded-sm text-xs font-semibold tracking-archival uppercase transition-all shadow-xs"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>CONTINUE WITH GOOGLE</span>
                  </button>
                </div>

                {/* Sanctuary Privileges */}
                <div className="pt-6 border-t border-[#e6dbc9] text-left space-y-3">
                  <span className="text-[10.5px] font-bold tracking-archival uppercase text-[#8a6f5a] block text-center">
                    PATRON SANCTUARY PRIVILEGES
                  </span>
                  <div className="space-y-2.5 text-xs text-[#594d42]">
                    <div className="flex items-start gap-2.5">
                      <span className="text-[#8a6f5a] font-bold">01.</span>
                      <p>Real-time live progress tracking on active heirloom commissions in Provence.</p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="text-[#8a6f5a] font-bold">02.</span>
                      <p>Permanent custody certificates with complimentary botanical re-blocking.</p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="text-[#8a6f5a] font-bold">03.</span>
                      <p>Personalized tactile sensitivities and bespoke silhouette vault.</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* AUTHENTICATED PATRON PROFILE VIEW */
              <div className="space-y-6 animate-fade-in">
                
                {/* Profile Card */}
                <div className="p-4 bg-white border border-[#e6dbc9] rounded-sm space-y-3 shadow-2xs">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-full overflow-hidden relative border border-[#d8c8b4] flex-shrink-0 bg-[#efe7da]">
                      <Image
                        src={
                          patronUser.avatarUrl ||
                          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
                        }
                        alt={patronUser.name || "Patron"}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-editorial text-lg text-[#1c1b1a] truncate">
                          {patronUser.name || "Atelier Patron"}
                        </h3>
                        <span className="text-[9px] font-bold text-[#8a6f5a] bg-[#efe7da] px-1.5 py-0.2 rounded uppercase flex-shrink-0">
                          PATRON
                        </span>
                      </div>
                      <p className="text-[11px] text-[#81756d] truncate">
                        {patronUser.email}
                      </p>
                      <p className="text-[9.5px] uppercase tracking-wider text-[#9e8876] font-semibold">
                        {patronUser.memberNumber || "PATRON NO. 042"}
                      </p>
                    </div>
                  </div>

                  {/* 3 User Stats */}
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#f0e6d6] text-center">
                    <div className="p-1.5 bg-[#faf6f0] rounded">
                      <span className="font-editorial text-lg text-[#1c1b1a] block leading-tight">
                        {ordersCount}
                      </span>
                      <span className="text-[9px] text-[#8a6f5a] uppercase font-semibold">
                        IN CUSTODY
                      </span>
                    </div>
                    <div className="p-1.5 bg-[#faf6f0] rounded">
                      <span className="font-editorial text-lg text-emerald-800 block leading-tight">
                        {commissionsCount}
                      </span>
                      <span className="text-[9px] text-emerald-800 uppercase font-semibold">
                        IN LOOM
                      </span>
                    </div>
                    <div className="p-1.5 bg-[#faf6f0] rounded">
                      <span className="font-editorial text-lg text-[#1c1b1a] block leading-tight">
                        {wishlistCount}
                      </span>
                      <span className="text-[9px] text-[#8a6f5a] uppercase font-semibold">
                        SAVED PIECES
                      </span>
                    </div>
                  </div>
                </div>

                {/* Orders & Custody Archive */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[10px] font-bold tracking-archival uppercase text-[#8a6f5a]">
                      ARCHIVAL CUSTODY ({ordersCount})
                    </span>
                    <Link
                      href="/shop"
                      onClick={onClose}
                      className="text-[10.5px] text-[#705743] hover:text-[#1c1b1a] flex items-center gap-1 font-medium"
                    >
                      <span>BROWSE CATALOGUE</span>
                      <ArrowRight size={11} />
                    </Link>
                  </div>

                  {ordersCount === 0 ? (
                    <div className="p-4 bg-white border border-[#e6dbc9] rounded-sm text-center space-y-2">
                      <p className="text-xs text-[#705743]">
                        No heirloom pieces in personal custody yet.
                      </p>
                      <Link
                        href="/shop"
                        onClick={onClose}
                        className="inline-block text-[10px] uppercase font-bold tracking-archival text-[#8a6f5a] hover:underline"
                      >
                        Explore the Capsule &rarr;
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {patronUser.orders.map((order: any) => (
                        <div
                          key={order.id}
                          className="p-3 bg-white border border-[#e6dbc9] rounded-sm flex items-center gap-3 text-xs"
                        >
                          <div className="w-12 h-14 relative bg-[#efe7da] rounded overflow-hidden flex-shrink-0">
                            <Image
                              src={
                                order.items?.[0]?.product?.images?.[0]?.url ||
                                "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=200&auto=format&fit=crop"
                              }
                              alt="Custody Piece"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 space-y-0.5 min-w-0">
                            <div className="flex justify-between items-start">
                              <h5 className="font-editorial text-sm text-[#1c1b1a] truncate">
                                {order.items?.[0]?.product?.name || "Artisanal Heirloom"}
                              </h5>
                              <span className="text-[9px] font-mono text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded font-bold uppercase">
                                {order.status}
                              </span>
                            </div>
                            <p className="text-[10.5px] text-[#705743] truncate">
                              Ref: {order.id.slice(0, 10)}... • {order.items?.length || 1} artifact
                            </p>
                            <div className="flex items-center gap-2 text-[10px] text-[#8a6f5a]">
                              <Link href={`/order/${order.id}`} onClick={onClose} className="hover:underline">
                                View Dossier & Certificate
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Tactile Dossier with Interactive Editing */}
                <div className="p-4 bg-white border border-[#e6dbc9] rounded-sm space-y-3 text-xs shadow-2xs">
                  <div className="flex items-center justify-between text-[10px] font-bold tracking-archival uppercase text-[#8a6f5a]">
                    <span>TACTILE DOSSIER & FIT</span>
                    {!isEditingDossier ? (
                      <button
                        onClick={handleOpenEditDossier}
                        className="hover:underline text-[#705743] flex items-center gap-1"
                      >
                        <Edit3 size={11} />
                        <span>EDIT FIT</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => setIsEditingDossier(false)}
                        className="hover:underline text-[#81756d]"
                      >
                        CANCEL
                      </button>
                    )}
                  </div>

                  {isEditingDossier ? (
                    <form onSubmit={handleSaveDossier} className="space-y-3 pt-1">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-[#705743] block">
                          Fiber Sensitivities
                        </label>
                        <input
                          type="text"
                          value={fiberSensitivities}
                          onChange={(e) => setFiberSensitivities(e.target.value)}
                          className="w-full bg-[#fdfaf7] border border-[#d8c8b4] px-2.5 py-1.5 text-xs text-[#1c1b1a] rounded focus:outline-none focus:border-[#8a6f5a]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-[#705743] block">
                          Bespoke Silhouette Dimensions
                        </label>
                        <input
                          type="text"
                          value={silhouetteDimensions}
                          onChange={(e) => setSilhouetteDimensions(e.target.value)}
                          className="w-full bg-[#fdfaf7] border border-[#d8c8b4] px-2.5 py-1.5 text-xs text-[#1c1b1a] rounded focus:outline-none focus:border-[#8a6f5a]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-[#705743] block">
                          Botanical Dye Mordants
                        </label>
                        <input
                          type="text"
                          value={dyePreferences}
                          onChange={(e) => setDyePreferences(e.target.value)}
                          className="w-full bg-[#fdfaf7] border border-[#d8c8b4] px-2.5 py-1.5 text-xs text-[#1c1b1a] rounded focus:outline-none focus:border-[#8a6f5a]"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isSavingDossier}
                        className="w-full bg-[#242321] hover:bg-[#8a6f5a] text-white py-2 rounded text-[11px] font-semibold tracking-archival uppercase transition-colors flex items-center justify-center gap-1.5"
                      >
                        {isSavingDossier ? (
                          <>
                            <Loader2 size={13} className="animate-spin" />
                            <span>SAVING PREFERENCES...</span>
                          </>
                        ) : (
                          <>
                            <Check size={13} />
                            <span>SAVE TACTILE DOSSIER</span>
                          </>
                        )}
                      </button>
                    </form>
                  ) : (
                    <div className="space-y-1.5 text-[11px] text-[#594d42]">
                      <p>
                        <strong className="text-[#1c1b1a]">Fiber Sensitivities:</strong>{" "}
                        {patronUser.fiberSensitivities || "GOTS Cotton, Belgian Flax Only"}
                      </p>
                      <p>
                        <strong className="text-[#1c1b1a]">Bespoke Gauge Silhouette:</strong>{" "}
                        {patronUser.silhouetteDimensions || "Relaxed Drape (Bust 88cm)"}
                      </p>
                      <p>
                        <strong className="text-[#1c1b1a]">Natural Dye Mordants:</strong>{" "}
                        {patronUser.dyePreferences || "Natural Alum & Oak Gall Nut"}
                      </p>
                    </div>
                  )}
                </div>

              </div>
            )}

          </div>

          {/* CLEAN USER DRAWER FOOTER (Zero admin references, pure patron profile) */}
          <div className="p-5 bg-[#faf6f0] border-t border-[#e6dbc9] text-xs text-[#81756d] space-y-2">
            {patronUser ? (
              <div className="flex items-center justify-between">
                <Link
                  href="/contact"
                  onClick={onClose}
                  className="text-[#705743] hover:text-[#1c1b1a] font-semibold uppercase text-[10.5px] tracking-wider"
                >
                  CONCIERGE INQUIRY &rarr;
                </Link>
                <button
                  onClick={async () => {
                    await logoutPatron();
                  }}
                  className="text-red-700 hover:text-red-900 flex items-center gap-1.5 text-[10.5px] uppercase font-semibold transition-colors"
                >
                  <LogOut size={13} />
                  <span>SIGN OUT</span>
                </button>
              </div>
            ) : (
              <p className="text-[10px] text-center text-[#81756d]">
                Slow-crafted by hand in Provence • E&amp;A Atelier Client Registry
              </p>
            )}
          </div>

        </div>
      </div>

      {/* Google Sign In Modal for Storefront Patron */}
      <GoogleSignInModal
        isOpen={isGoogleModalOpen}
        onClose={() => setIsGoogleModalOpen(false)}
        targetRole="PATRON"
      />
    </div>
  );
}
