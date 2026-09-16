"use client";

import React from "react";
import { X, ShieldCheck } from "lucide-react";

interface GoogleSignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetRole: "ADMIN" | "PATRON";
}

/**
 * Real Google OAuth trigger.
 *
 * Previously this modal let a caller type ANY email address, pick ADMIN as
 * the target role, and call the authenticateWithGoogle server action
 * directly - no Google identity was ever verified, and a handful of
 * "quick demo account" buttons granted instant admin access. That's a
 * broken-access-control / privilege-escalation bug (self-service admin
 * signup), not a login flow.
 *
 * This now does a full redirect into the real OAuth flow already
 * implemented in app/api/auth/google/route.ts, which exchanges the code
 * with Google and only then calls authenticateWithGoogle server-side with
 * values that actually came from Google's userinfo endpoint.
 */
export default function GoogleSignInModal({ isOpen, onClose, targetRole }: GoogleSignInModalProps) {
  if (!isOpen) return null;

  const handleContinueWithGoogle = () => {
    const role = targetRole === "ADMIN" ? "admin" : "patron";
    const redirect = typeof window !== "undefined" ? window.location.pathname : "/";
    window.location.href = `/api/auth/google?role=${role}&redirect=${encodeURIComponent(redirect)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs font-sans animate-fade-in">
      <div className="bg-white border border-[#e6dbc9] rounded-lg shadow-2xl max-w-md w-full p-6 sm:p-8 relative space-y-5">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[#81756d] hover:text-[#1c1b1a] rounded-full hover:bg-[#faf6f0] transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Google Header */}
        <div className="text-center space-y-2 pt-1">
          <div className="w-12 h-12 rounded-full border border-[#e6dbc9] bg-white flex items-center justify-center mx-auto shadow-xs">
            <svg className="w-6 h-6" viewBox="0 0 24 24">
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
          </div>
          <h2 className="font-editorial text-2xl text-[#1c1b1a]">
            {targetRole === "ADMIN" ? "Atelier Master Sign In" : "Patron Sanctuary Sign In"}
          </h2>
          <p className="text-xs text-[#705743]">
            {targetRole === "ADMIN"
              ? "You'll be redirected to Google to authenticate your custodian credentials."
              : "You'll be redirected to Google to sign in to your private vault and heirloom custody dossier."}
          </p>
        </div>

        <button
          type="button"
          onClick={handleContinueWithGoogle}
          className="w-full flex items-center justify-center gap-3 bg-white hover:bg-[#faf6f0] text-[#1c1b1a] border border-[#d8c8b4] hover:border-[#8a6f5a] py-3 px-4 rounded text-xs font-semibold tracking-archival uppercase transition-all shadow-xs"
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

        <p className="text-[10px] text-center text-[#81756d] italic pt-1 flex items-center justify-center gap-1.5">
          <ShieldCheck size={12} className="text-[#8a6f5a] flex-shrink-0" />
          <span>Authenticated directly by Google. No credentials are entered on this site.</span>
        </p>

      </div>
    </div>
  );
}
