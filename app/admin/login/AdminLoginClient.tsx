"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { verifyAdminPasskey } from "@/app/actions/adminAuth";
import { Lock, Sparkles, KeyRound, AlertCircle, Loader2 } from "lucide-react";

export default function AdminLoginClient() {
  const router = useRouter();
  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
            <span>{error}</span>
          </div>
        )}

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
            <p className="text-[10.5px] text-[#81756d] italic pt-0.5">
              Default development key: <code className="font-mono text-[#705743]">ea-atelier-provenance-2026</code>
            </p>
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
    </div>
  );
}
