"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check, Loader2 } from "lucide-react";
import { subscribeToNewsletter } from "@/app/actions/newsletter";

export default function Footer() {
  const pathname = usePathname();

  // Strictly prevent Footer from rendering on any admin route
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await subscribeToNewsletter(email, "footer");
      if (res.success) {
        setSubscribed(true);
      } else {
        setError(res.error || "Subscription unsuccessful. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="w-full bg-[#f7f3ef] border-t border-[rgba(138,111,90,0.18)] pt-16 pb-12 text-[#1c1b1a] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Split Section: Brand Note & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-16 border-b border-[rgba(138,111,90,0.18)]">
          {/* Brand Philosophy */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-editorial text-2xl tracking-[0.04em] text-[#1c1b1a]">
                E&A ATELIER
              </span>
            </div>
            <p className="text-[14px] leading-relaxed text-[#4f453e] max-w-lg">
              Slow luxury studio creating hand-looped crochet heirlooms, tactile artifacts, and artisanal wearable sculptures designed to age with deliberate grace.
            </p>
            <div className="flex flex-wrap items-center gap-6 pt-2 text-[11px] font-semibold tracking-archival uppercase text-[#685d4d]">
              <span className="flex items-center gap-1.5">
                <span className="text-[#8a6f5a]">🌱</span> ETHICALLY SOURCED NATURAL FIBERS
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-[#8a6f5a]">✂️</span> ZERO-WASTE HANDCRAFTED
              </span>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-3">
            <h3 className="font-editorial text-xl text-[#1c1b1a]">
              Join the Atelier Circle
            </h3>
            <p className="text-xs text-[#4f453e]">
              Receive seasonal lookbooks, textile pamphlets, and private edition releases directly from our loom room.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 bg-[#efe7da] text-[#705743] px-4 py-2.5 rounded-sm text-xs font-medium border border-[rgba(138,111,90,0.25)]">
                <Check size={16} />
                <span>Merci. You are registered for our private seasonal dispatch.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2 pt-1">
                {error && (
                  <p className="text-[11px] text-rose-700">{error}</p>
                )}
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    disabled={isSubmitting}
                    placeholder="Enter your correspondence email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-white border border-[rgba(138,111,90,0.25)] px-4 py-2.5 text-xs text-[#1c1b1a] placeholder-[#81756d] focus:outline-none focus:border-[#8a6f5a] rounded-sm disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#242321] text-[#f8f4ed] hover:bg-[#8a6f5a] disabled:opacity-60 transition-colors text-[11px] font-semibold tracking-archival uppercase px-6 py-2.5 rounded-sm flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={13} className="animate-spin" />
                        <span>SUBSCRIBING...</span>
                      </>
                    ) : (
                      <span>SUBSCRIBE</span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* 5-Column Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 py-12 text-xs border-b border-[rgba(138,111,90,0.18)]">
          {/* Col 1 */}
          <div className="space-y-3">
            <h4 className="font-semibold tracking-archival uppercase text-[11px] text-[#8a6f5a]">
              COLLECTION
            </h4>
            <ul className="space-y-2 text-[#4f453e]">
              <li><Link href="/shop?category=bags" className="hover:text-[#8a6f5a] transition-colors">Artisanal Handbags</Link></li>
              <li><Link href="/wearables" className="hover:text-[#8a6f5a] transition-colors">Sculpted Cardigans (Coming Soon)</Link></li>
              <li><Link href="/wearables" className="hover:text-[#8a6f5a] transition-colors">Tonal Camisoles</Link></li>
              <li><Link href="/shop?category=home" className="hover:text-[#8a6f5a] transition-colors">Woven Vessels</Link></li>
              <li><Link href="/shop" className="hover:text-[#8a6f5a] transition-colors">Archival Editions</Link></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <h4 className="font-semibold tracking-archival uppercase text-[11px] text-[#8a6f5a]">
              SUSTAINABLE CRAFT
            </h4>
            <ul className="space-y-2 text-[#4f453e]">
              <li><Link href="/craft" className="hover:text-[#8a6f5a] transition-colors">Raw Fiber Provenance</Link></li>
              <li><Link href="/craft" className="hover:text-[#8a6f5a] transition-colors">Plant & Mineral Dyes</Link></li>
              <li><Link href="/craft" className="hover:text-[#8a6f5a] transition-colors">Artisan Preservation</Link></li>
              <li><Link href="/craft" className="hover:text-[#8a6f5a] transition-colors">Carbon Transparency</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <h4 className="font-semibold tracking-archival uppercase text-[11px] text-[#8a6f5a]">
              ATELIER STUDIO
            </h4>
            <ul className="space-y-2 text-[#4f453e]">
              <li><Link href="/craft" className="hover:text-[#8a6f5a] transition-colors">About Hélène & Studio</Link></li>
              <li><button onClick={() => window.location.href='/shop'} className="hover:text-[#8a6f5a] transition-colors text-left">Bespoke Commissions</button></li>
              <li><Link href="/craft#stockists" className="hover:text-[#8a6f5a] transition-colors">Exhibition Showroom</Link></li>
              <li><Link href="/craft#stockists" className="hover:text-[#8a6f5a] transition-colors">Stockists & Galleries</Link></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-3">
            <h4 className="font-semibold tracking-archival uppercase text-[11px] text-[#8a6f5a]">
              CLIENT SERVICES
            </h4>
            <ul className="space-y-2 text-[#4f453e]">
              <li><Link href="/craft#stockists" className="hover:text-[#8a6f5a] transition-colors">Private Consultation</Link></li>
              <li><span className="text-[#81756d]">Heirloom Repair Service</span></li>
              <li><span className="text-[#81756d]">Order Tracking</span></li>
              <li><span className="text-[#81756d]">Gift Concierge</span></li>
            </ul>
          </div>

          {/* Col 5 */}
          <div className="space-y-3">
            <h4 className="font-semibold tracking-archival uppercase text-[11px] text-[#8a6f5a]">
              SHIPPING & CARE
            </h4>
            <ul className="space-y-2 text-[#4f453e]">
              <li><Link href="/craft" className="hover:text-[#8a6f5a] transition-colors">Circular Fiber Care</Link></li>
              <li><span className="text-[#81756d]">Carbon-Neutral Shipping</span></li>
              <li><span className="text-[#81756d]">Artisanal Returns</span></li>
              <li><span className="text-[#81756d]">Authentication Certificate</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Line */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#81756d]">
          <p>© 2026 E&A Atelier. Handcrafted slowly with natural fibers. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span className="hover:underline cursor-pointer">Terms of Craft</span>
            <span className="hover:underline cursor-pointer">Accessibility</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
