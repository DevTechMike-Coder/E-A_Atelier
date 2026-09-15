"use client";

import React, { useState } from "react";
import { useStore } from "../context/StoreContext";
import { X, CheckCircle2, Sparkles } from "lucide-react";
import { submitBespokeCommission } from "../actions/bespoke";

export default function BespokeModal() {
  const { isBespokeOpen, setIsBespokeOpen, bespokeProduct } = useStore();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [referenceCode, setReferenceCode] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [palette, setPalette] = useState("Unbleached Organic Flax");
  const [notes, setNotes] = useState("");

  if (!isBespokeOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const result = await submitBespokeCommission({
      name,
      email,
      palette,
      notes,
      productName: bespokeProduct,
    });

    setSubmitting(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setReferenceCode(result.referenceCode);
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setError(null);
    setReferenceCode(null);
    setName("");
    setEmail("");
    setPalette("Unbleached Organic Flax");
    setNotes("");
    setIsBespokeOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto font-sans flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-[#1c1b1a]/50 backdrop-blur-sm transition-opacity" onClick={handleClose} />

      <div className="relative bg-[#fdf8f5] border border-[rgba(138,111,90,0.25)] rounded-sm max-w-lg w-full p-6 sm:p-8 shadow-2xl z-10 animate-fade-in">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-[#81756d] hover:text-[#1c1b1a] p-1"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#f1e0cc] text-[#705743] flex items-center justify-center">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="font-editorial text-2xl text-[#1c1b1a]">
              Commission Request Received
            </h3>
            <p className="text-xs text-[#4f453e] leading-relaxed max-w-sm mx-auto">
              Merci, {name}. Master Knitter Hélène Laurent will review your bespoke parameters and dispatch an archival fiber consultation within 48 hours.
            </p>
            <div className="p-3 bg-white border border-[rgba(138,111,90,0.2)] rounded text-xs text-[#705743] font-medium">
              Reference: #{referenceCode}
            </div>
            <button
              onClick={handleClose}
              className="bg-[#242321] text-white px-6 py-2.5 text-xs font-semibold tracking-archival uppercase rounded-sm hover:bg-[#8a6f5a] transition-colors"
            >
              RETURN TO ATELIER
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-[10px] tracking-archival uppercase font-semibold text-[#8a6f5a]">
                <Sparkles size={13} /> PRIVATE ATELIER COMMISSIONS
              </div>
              <h2 className="font-editorial text-2xl text-[#1c1b1a]">
                Inquire with Master Artisan
              </h2>
              <p className="text-xs text-[#4f453e] leading-relaxed">
                We accept up to six bespoke commissions each month. Inquire for custom colorway extractions, custom proportion tailoring, or bridal heirloom silks.
              </p>
            </div>

            {bespokeProduct && (
              <div className="p-2.5 bg-[#efe7da]/70 border border-[rgba(138,111,90,0.2)] rounded text-xs text-[#1c1b1a]">
                Inquiring regarding: <strong className="font-semibold text-[#705743]">{bespokeProduct}</strong>
              </div>
            )}

            <div className="space-y-3 pt-1">
              <div>
                <label className="block text-[10px] font-semibold tracking-archival uppercase text-[#685d4d] mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Amina Adeleke"
                  className="w-full bg-white border border-[rgba(138,111,90,0.25)] p-2.5 text-xs text-[#1c1b1a] focus:outline-none focus:border-[#8a6f5a] rounded-sm"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold tracking-archival uppercase text-[#685d4d] mb-1">
                  Correspondence Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full bg-white border border-[rgba(138,111,90,0.25)] p-2.5 text-xs text-[#1c1b1a] focus:outline-none focus:border-[#8a6f5a] rounded-sm"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold tracking-archival uppercase text-[#685d4d] mb-1">
                  Desired Botanical Dye / Fiber
                </label>
                <select
                  value={palette}
                  onChange={(e) => setPalette(e.target.value)}
                  className="w-full bg-white border border-[rgba(138,111,90,0.25)] p-2.5 text-xs text-[#1c1b1a] focus:outline-none focus:border-[#8a6f5a] rounded-sm"
                >
                  <option value="Unbleached Organic Flax">Unbleached Organic Flax (Raw Ivory)</option>
                  <option value="Wild Madder Root Rose">Wild Madder Root (Desert Rose / Terracotta)</option>
                  <option value="Elderberry & Walnut">Elderberry & Walnut Husk (Smoky Taupe)</option>
                  <option value="Chamomile & Thistle">Chamomile & Thistle Root (Warm Ochre)</option>
                  <option value="Pure Mulberry Silk">Pure Mulberry Ceremonial Silk (Heirloom White)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-semibold tracking-archival uppercase text-[#685d4d] mb-1">
                  Bespoke Dimensions or Custom Notes
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Specify sizing modifications, monogram requests, or intended ceremonial occasion..."
                  className="w-full bg-white border border-[rgba(138,111,90,0.25)] p-2.5 text-xs text-[#1c1b1a] focus:outline-none focus:border-[#8a6f5a] rounded-sm"
                />
              </div>
            </div>

            {error && (
              <p className="text-xs text-red-600 font-medium">{error}</p>
            )}

            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 border border-[rgba(138,111,90,0.25)] text-[#4f453e] hover:bg-[#efe7da] py-2.5 text-xs font-semibold tracking-archival uppercase rounded-sm transition-colors"
              >
                CANCEL
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-[#242321] text-[#f8f4ed] hover:bg-[#8a6f5a] py-2.5 text-xs font-semibold tracking-archival uppercase rounded-sm transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "SUBMITTING..." : "SUBMIT INQUIRY"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
