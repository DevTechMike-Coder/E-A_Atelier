"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore, Currency, CURRENCIES } from "../context/StoreContext";
import { Search, Heart, ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import PatronSanctuaryDrawer from "./PatronSanctuaryDrawer";

export default function Header() {
  const pathname = usePathname();

  // Strictly prevent Header from rendering on any admin route
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const {
    currency,
    setCurrency,
    cartCount,
    setIsCartOpen,
    wishlistCount,
    setIsWishlistOpen,
    patronUser,
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [patronSanctuaryOpen, setPatronSanctuaryOpen] = useState(false);

  const navLinks = [
    { label: "COLLECTION", href: "/shop" },
    { label: "BAGS & ACCESSORIES", href: "/shop?category=bags" },
    { label: "WEARABLES", href: "/wearables" },
    { label: "HOME & LIVING", href: "/shop?category=home" },
    { label: "THE ATELIER & CRAFT", href: "/craft" },
    { label: "CONTACT", href: "/contact" },
  ];

  return (
    <header className="w-full bg-[#fdf8f5] border-b border-[rgba(138,111,90,0.18)] sticky top-0 z-40">
      {/* Top Announcement Bar */}
      <div className="w-full bg-[#242321] text-[#f8f4ed] text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.1em] sm:tracking-[0.14em] py-2 px-3 sm:px-4 text-center font-medium font-sans">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <span>
            Free complimentary gift packaging & carbon-neutral delivery on all
            artisanal orders — Slow-crafted in limited batches
          </span>
        </div>
      </div>

      {/* Spring Batch Slots Banner */}
      <div className="w-full bg-[#efe7da] border-b border-[rgba(138,111,90,0.15)] text-[#504537] text-[10px] sm:text-[11px] py-1.5 px-3 sm:px-4 font-sans tracking-archival-sm text-center flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#8a6f5a] animate-pulse"></span>
        <span className="font-semibold text-[#1c1b1a]">
          SPRING BATCH ACTIVE
        </span>
        <span className="text-[#81756d]">•</span>
        <span>11 Bespoke slots remaining for current moon cycle</span>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto w-full px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 h-16 sm:h-20 min-w-0">
          {/* Mobile menu trigger */}
          <div className="flex items-center 2xl:hidden flex-shrink-0">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#242321] hover:text-[#8a6f5a] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Left Desktop Nav Links */}
          <nav className="hidden 2xl:flex items-center gap-7 text-[12px] font-semibold tracking-[0.08em] uppercase text-[#4f453e] flex-shrink-0">
            {navLinks.slice(0, 3).map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`transition-colors py-1 relative hover:text-[#8a6f5a] flex flex-col items-center justify-center text-center ${
                    isActive ? "text-[#8a6f5a] font-bold" : ""
                  }`}
                >
                  <span className="leading-tight whitespace-nowrap">{link.label}</span>
                  {link.label === "WEARABLES" ? (
                    <span className="text-[8.5px] px-1.5 py-0.5 rounded-full bg-[#f1e0cc] text-[#705743] font-medium tracking-normal lowercase whitespace-nowrap mt-0.5 leading-tight">
                      coming soon
                    </span>
                  ) : (
                    <span
                      className="text-[8.5px] px-1.5 py-0.5 opacity-0 select-none pointer-events-none mt-0.5 leading-tight"
                      aria-hidden="true"
                    >
                      &nbsp;
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#8a6f5a]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Center Brand Mark */}
          <div className="flex flex-col items-center justify-center text-center flex-shrink-0 px-2">
            <Link href="/" className="group inline-block">
              <span className="font-editorial text-lg sm:text-2xl md:text-[28px] tracking-[0.03em] sm:tracking-[0.05em] text-[#1c1b1a] block font-normal whitespace-nowrap group-hover:text-[#705743] transition-colors">
                E&A ATELIER
              </span>
              <span className="hidden sm:block text-[9px] tracking-[0.24em] uppercase text-[#81756d] -mt-1 font-sans">
                PROVENCE • SLOW CRAFT
              </span>
            </Link>
          </div>

          {/* Right Desktop Nav Links & Utility Controls */}
          <div className="flex items-center gap-1.5 sm:gap-4 2xl:gap-6 flex-shrink-0">
            <nav className="hidden 2xl:flex items-center gap-7 text-[12px] font-semibold tracking-[0.08em] uppercase text-[#4f453e] flex-shrink-0">
              {navLinks.slice(3).map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`transition-colors py-1 relative hover:text-[#8a6f5a] flex flex-col items-center justify-center text-center ${
                      isActive ? "text-[#8a6f5a] font-bold" : ""
                    }`}
                  >
                    <span className="leading-tight whitespace-nowrap">{link.label}</span>
                    <span
                      className="text-[8.5px] px-1.5 py-0.5 opacity-0 select-none pointer-events-none mt-0.5 leading-tight"
                      aria-hidden="true"
                    >
                      &nbsp;
                    </span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#8a6f5a]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Currency Selector (Includes Nigerian Naira) */}
            <div className="relative shrink-0 hidden sm:block">
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1.5 whitespace-nowrap flex-nowrap text-[11px] font-semibold tracking-archival uppercase text-[#242321] px-2.5 py-1 rounded border border-[rgba(138,111,90,0.25)] hover:border-[#8a6f5a] bg-white transition-all shrink-0"
                title="Select Currency"
              >
                <span className="whitespace-nowrap">
                  {currency}&nbsp;{CURRENCIES[currency].symbol}
                </span>
                <ChevronDown size={13} className="text-[#81756d] shrink-0" />
              </button>

              {currencyDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white border border-[rgba(138,111,90,0.2)] rounded-sm shadow-xl z-50 py-1 font-sans animate-fade-in">
                  {(Object.keys(CURRENCIES) as Currency[]).map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setCurrency(c);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-[12px] flex items-center justify-between hover:bg-[#f7f3ef] transition-colors ${
                        currency === c
                          ? "text-[#8a6f5a] font-bold bg-[#fdf8f5]"
                          : "text-[#242321]"
                      }`}
                    >
                      <span>{c}</span>
                      <span className="text-[#81756d] font-mono">
                        {CURRENCIES[c].symbol}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Search Trigger */}
            <div className="relative">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-1.5 text-[#242321] hover:text-[#8a6f5a] transition-colors"
                aria-label="Search collection"
              >
                <Search size={18} strokeWidth={1.8} />
              </button>

              {searchOpen && (
                <div className="absolute right-0 mt-2 w-[min(16rem,calc(100vw-2rem))] bg-white border border-[rgba(138,111,90,0.2)] p-2 rounded-sm shadow-xl z-50 animate-fade-in">
                  <div className="flex items-center border border-[rgba(138,111,90,0.25)] px-2 py-1 bg-[#fdf8f5]">
                    <Search size={14} className="text-[#81756d] mr-1.5" />
                    <input
                      type="text"
                      placeholder="Search bags, flax, stitch..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full text-xs bg-transparent focus:outline-none text-[#242321]"
                      autoFocus
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="text-xs text-[#81756d]"
                      >
                        ×
                      </button>
                    )}
                  </div>
                  {searchQuery && (
                    <div className="mt-2 text-[11px] text-[#4f453e]">
                      <Link
                        href={`/shop?q=${encodeURIComponent(searchQuery)}`}
                        onClick={() => setSearchOpen(false)}
                        className="block p-1.5 hover:bg-[#f1ede9] text-[#705743] font-medium"
                      >
                        Search for &ldquo;{searchQuery}&rdquo; in collection
                        &rarr;
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Wishlist Trigger */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-1.5 text-[#242321] hover:text-[#8a6f5a] transition-colors relative"
              aria-label="Open Saved Pieces"
              title="Saved Pieces"
            >
              <Heart
                size={18}
                strokeWidth={1.8}
                className={
                  wishlistCount > 0 ? "text-[#8a6f5a] fill-[#f1e0cc]" : ""
                }
              />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1.5 w-4 h-4 rounded-full bg-[#8a6f5a] text-white text-[9px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-1.5 text-[#242321] hover:text-[#8a6f5a] transition-colors p-1"
              aria-label="Open cart"
            >
              <div className="relative">
                <ShoppingBag size={18} strokeWidth={1.8} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1.5 w-4 h-4 rounded-full bg-[#242321] text-[#f8f4ed] text-[9px] font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-[11px] font-semibold tracking-archival uppercase">
                CART ({cartCount})
              </span>
            </button>

            {/* Patron Sanctuary Drawer Trigger (Screenshot 4) */}
            <button
              onClick={() => setPatronSanctuaryOpen(true)}
              className="flex items-center gap-1.5 pl-1.5 pr-2 py-1 rounded-full border border-[#d8c8b4] hover:border-[#8a6f5a] bg-[#faf6f0] hover:bg-[#f4eee6] transition-all group shadow-2xs"
              title={patronUser ? `Patron Sanctuary: ${patronUser.name || patronUser.email}` : "Open Patron Sanctuary (Archival Dossier)"}
              aria-label="Open Patron Sanctuary"
            >
              <div className="w-6 h-6 rounded-full overflow-hidden relative border border-[#c4b5a2] flex-shrink-0 bg-[#efe7da]">
                <Image
                  src={
                    patronUser?.avatarUrl ||
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop"
                  }
                  alt={patronUser?.name || "Patron Sanctuary"}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="hidden md:inline text-[10px] font-semibold tracking-archival uppercase text-[#5c4533] group-hover:text-[#1c1b1a]">
                {patronUser ? (patronUser.name ? patronUser.name.split(" ")[0] : "PATRON") : "PATRON"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="2xl:hidden border-t border-[rgba(138,111,90,0.18)] bg-[#fdf8f5] px-6 py-6 space-y-4 animate-fade-in font-sans">
          <div className="space-y-3 pb-4 border-b border-[rgba(138,111,90,0.15)]">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-semibold tracking-archival uppercase text-[#242321] hover:text-[#8a6f5a]"
              >
                <div className="flex items-center justify-between">
                  <span>{link.label}</span>
                  {link.label === "WEARABLES" && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#f1e0cc] text-[#705743] whitespace-nowrap">
                      Coming Soon
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>

          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs text-[#81756d] uppercase tracking-archival">
              Select Currency:
            </span>
            <div className="flex gap-2">
              {(Object.keys(CURRENCIES) as Currency[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-2 py-1 text-xs rounded border whitespace-nowrap ${
                    currency === c
                      ? "border-[#8a6f5a] bg-[#8a6f5a] text-white font-bold"
                      : "border-[rgba(138,111,90,0.2)] bg-white text-[#242321]"
                  }`}
                >
                  {c}&nbsp;{CURRENCIES[c].symbol}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Patron Sanctuary Slide-Over Drawer (Screenshot 4) */}
      <PatronSanctuaryDrawer
        isOpen={patronSanctuaryOpen}
        onClose={() => setPatronSanctuaryOpen(false)}
      />
    </header>
  );
}
