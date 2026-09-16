"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyAdminPasskey } from "@/app/actions/adminAuth";
import GoogleSignInModal from "@/app/components/GoogleSignInModal";
import { Lock, Sparkles, KeyRound, AlertCircle, Loader2 } from "lucide-react";

export default function AdminLoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error");

  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState<string | null>(urlError || null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const res = await verifyAdminPasskey(passkey);

    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setIsSubmitting(false);
      setError(res.error || "Authentication failed.");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 font-sans py-16">
      <div className="max-w-md w-full bg-white border border-[rgba(138,111,90,0.25)] rounded-sm p-8 sm:p-10 shadow-xl space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-full bg-[#242321] text-[#f8f4ed] flex items-center justify-center mx-auto shadow-md">
            <Lock size={22} className="text-[#d8c8b5]" />
          </div>
          <span className="text-[10px] font-semibold tracking-archival uppercase text-[#8a6f5a] block">
            RESTRICTED ATELIER ACCESS
          </span>
          <h1 className="font-editorial text-3xl text-[#1c1b1a]">
            Owner Studio Portal
          </h1>
          <p className="text-xs text-[#4f453e] leading-relaxed max-w-xs mx-auto">
            This terminal controls workshop batch registers, orders, custom commissions, and catalogue releases.
          </p>
        </div>

        {error && (
          <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm flex items-start gap-2">
            <AlertCircle size={16} className="flex-shrink-0 mt-0.5 text-red-600" />
            <span className="leading-relaxed">{error}</span>
          </div>
        )}

        {/* 1. Primary Google Login for Admin */}
        <div className="space-y-3 pt-2">
          <button
            type="button"
            onClick={() => setIsGoogleModalOpen(true)}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-[#faf6f0] text-[#1c1b1a] border border-[#d8c8b4] hover:border-[#8a6f5a] py-3 px-4 rounded-sm text-xs font-semibold tracking-archival uppercase transition-all shadow-xs"
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
            <span>CONTINUE WITH GOOGLE (ADMIN)</span>
          </button>

          <div className="flex items-center gap-3 pt-2">
            <div className="flex-1 h-px bg-[#e6dbc9]" />
            <span className="text-[10px] tracking-wider uppercase text-[#81756d] font-medium">
              OR MASTER PASSKEY
            </span>
            <div className="flex-1 h-px bg-[#e6dbc9]" />
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold tracking-archival uppercase text-[#4f453e] block">
              Owner Master Passkey
            </label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="Enter master passkey..."
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                className="w-full bg-[#fdf8f5] border border-[rgba(138,111,90,0.25)] pl-10 pr-4 py-2.5 text-xs text-[#1c1b1a] rounded-sm focus:outline-none focus:border-[#8a6f5a]"
              />
              <KeyRound size={16} className="absolute left-3 top-3 text-[#81756d]" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#242321] text-[#f8f4ed] hover:bg-[#8a6f5a] py-3.5 text-xs font-semibold tracking-archival uppercase rounded-sm transition-colors shadow-md flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>AUTHENTICATING MASTER KEY...</span>
              </>
            ) : (
              <span>ENTER ATELIER CONTROL &rarr;</span>
            )}
          </button>
        </form>

        <div className="pt-4 border-t border-[rgba(138,111,90,0.18)] text-center text-[11px] text-[#81756d] flex items-center justify-center gap-1.5">
          <Sparkles size={12} className="text-[#8a6f5a]" />
          <span>Saint-Rémy-de-Provence Workshop Ledger</span>
        </div>

      </div>

      <GoogleSignInModal
        isOpen={isGoogleModalOpen}
        onClose={() => setIsGoogleModalOpen(false)}
        targetRole="ADMIN"
      />
    </div>
  );
}
