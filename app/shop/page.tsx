"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PRODUCTS, Product } from "../data/products";
import ProductCard from "../components/ProductCard";
import { useStore } from "../context/StoreContext";
import { ChevronDown, X, Sparkles, Filter } from "lucide-react";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialQuery = searchParams.get("q") || "";

  const { openBespokeModal, formatPrice, currency } = useStore();

  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [selectedColor, setSelectedColor] = useState<string>("all");
  const [selectedFiber, setSelectedFiber] = useState<string>("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");

  // Filter logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Category filter
      if (activeCategory !== "all" && p.category !== activeCategory) {
        return false;
      }
      // Query filter
      if (initialQuery) {
        const queryLower = initialQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(queryLower);
        const matchesFiber = p.fiber.toLowerCase().includes(queryLower);
        const matchesDesc = p.description.toLowerCase().includes(queryLower);
        if (!matchesName && !matchesFiber && !matchesDesc) return false;
      }
      // Fiber filter
      if (selectedFiber !== "all") {
        if (!p.fiber.toLowerCase().includes(selectedFiber.toLowerCase())) {
          return false;
        }
      }
      // Price range
      if (selectedPriceRange === "under150" && p.priceUSD >= 150) return false;
      if (selectedPriceRange === "150to300" && (p.priceUSD < 150 || p.priceUSD > 300)) return false;
      if (selectedPriceRange === "over300" && p.priceUSD <= 300) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === "priceAsc") return a.priceUSD - b.priceUSD;
      if (sortBy === "priceDesc") return b.priceUSD - a.priceUSD;
      if (sortBy === "craftHours") return b.craftHours - a.craftHours;
      return 0; // default featured
    });
  }, [activeCategory, initialQuery, selectedFiber, selectedPriceRange, sortBy]);

  const activeFiltersCount =
    (selectedColor !== "all" ? 1 : 0) +
    (selectedFiber !== "all" ? 1 : 0) +
    (selectedPriceRange !== "all" ? 1 : 0);

  const clearAllFilters = () => {
    setSelectedColor("all");
    setSelectedFiber("all");
    setSelectedPriceRange("all");
    setActiveCategory("all");
  };

  const categories = [
    { id: "all", label: "ALL PIECES (28)" },
    { id: "bags", label: "BAGS (10)" },
    { id: "wearables", label: "WEARABLES (8)" },
    { id: "accessories", label: "ACCESSORIES (6)" },
    { id: "home", label: "HOME DÉCOR (4)" },
  ];

  return (
    <div className="w-full space-y-16 pb-24 font-sans">
      
      {/* 1. SHOP HEADER & RELEASE BADGE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[rgba(138,111,90,0.18)] gap-4">
          <div className="text-xs text-[#81756d] uppercase tracking-archival flex items-center gap-2">
            <Link href="/" className="hover:text-[#8a6f5a]">HOME</Link>
            <span>/</span>
            <span className="text-[#1c1b1a] font-semibold">SHOP ALL</span>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-semibold tracking-archival uppercase text-[#705743] bg-[#efe7da] px-3 py-1 rounded-full w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8a6f5a] animate-pulse" />
            <span>SPRING BATCH ACTIVE • 11 SLOTS OPEN</span>
          </div>
        </div>

        {/* Title & Description Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 items-end">
          <div className="lg:col-span-8 space-y-3">
            <span className="text-[10px] font-semibold tracking-archival uppercase text-[#8a6f5a]">
              EDITION N° 04 / MICRO-RELEASE
            </span>
            <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-[#1c1b1a]">
              Shop the Collection
            </h1>
            <p className="text-xs sm:text-sm text-[#4f453e] max-w-xl leading-relaxed">
              Every piece is hand-crocheted on demand or produced in micro-batches of twelve. Conscious luxury for everyday beauty, shaped loop by loop with botanical integrity.
            </p>
          </div>

          <div className="lg:col-span-4 bg-[#f7f3ef] border border-[rgba(138,111,90,0.2)] rounded-sm p-4 text-xs space-y-1">
            <div className="flex justify-between font-semibold text-[#705743]">
              <span className="tracking-archival uppercase text-[10px]">FIBER TRACEABILITY</span>
              <span>100% Organic</span>
            </div>
            <p className="text-[11px] text-[#81756d] leading-tight">
              Zero petroleum synthetics. Completely biodegradable natural flax, raffia, and combed Aegean cotton.
            </p>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY TABS & FILTER CONTROLS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[rgba(138,111,90,0.18)] pb-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  if (cat.id === "wearables") {
                    window.location.href = "/wearables";
                  } else {
                    setActiveCategory(cat.id);
                  }
                }}
                className={`px-4 py-2 text-[11px] font-semibold tracking-archival uppercase rounded-sm transition-all ${
                  activeCategory === cat.id
                    ? "bg-[#242321] text-white shadow-sm"
                    : "bg-[#efe7da]/70 text-[#4f453e] hover:bg-[#d8c8b5]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="text-[11px] text-[#81756d] font-semibold tracking-archival uppercase">
            🌱 NATURAL EARTH PIGMENTS
          </div>
        </div>

        {/* Dropdown Filters Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-[#f7f3ef] p-4 rounded-sm border border-[rgba(138,111,90,0.18)]">
          <div className="flex flex-wrap items-center gap-3">
            {/* Fiber Dropdown */}
            <div className="relative">
              <select
                value={selectedFiber}
                onChange={(e) => setSelectedFiber(e.target.value)}
                className="appearance-none bg-white border border-[rgba(138,111,90,0.25)] text-[#1c1b1a] text-xs px-3 py-2 pr-7 rounded-sm focus:outline-none focus:border-[#8a6f5a] font-medium"
              >
                <option value="all">FIBER: ALL FIBERS</option>
                <option value="Cotton">Organic Cotton</option>
                <option value="Linen">Belgian Linen / Flax</option>
                <option value="Raffia">Madagascar Raffia</option>
                <option value="Silk">Mulberry Silk</option>
              </select>
              <ChevronDown size={12} className="absolute right-2.5 top-3 pointer-events-none text-[#81756d]" />
            </div>

            {/* Price Range Dropdown */}
            <div className="relative">
              <select
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                className="appearance-none bg-white border border-[rgba(138,111,90,0.25)] text-[#1c1b1a] text-xs px-3 py-2 pr-7 rounded-sm focus:outline-none focus:border-[#8a6f5a] font-medium"
              >
                <option value="all">PRICE: ALL RANGES</option>
                <option value="under150">Under {formatPrice(150)}</option>
                <option value="150to300">{formatPrice(150)} – {formatPrice(300)}</option>
                <option value="over300">Over {formatPrice(300)}</option>
              </select>
              <ChevronDown size={12} className="absolute right-2.5 top-3 pointer-events-none text-[#81756d]" />
            </div>

            {activeFiltersCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-[#8a6f5a] hover:underline font-semibold tracking-archival uppercase px-2"
              >
                CLEAR ALL ({activeFiltersCount})
              </button>
            )}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#81756d] uppercase tracking-archival">SORT BY:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-[rgba(138,111,90,0.25)] text-[#1c1b1a] text-xs px-3 py-2 pr-7 rounded-sm focus:outline-none focus:border-[#8a6f5a] font-medium"
              >
                <option value="featured">FEATURED / CURATED</option>
                <option value="priceAsc">PRICE: LOW TO HIGH</option>
                <option value="priceDesc">PRICE: HIGH TO LOW</option>
                <option value="craftHours">ARTISANAL HOURS</option>
              </select>
              <ChevronDown size={12} className="absolute right-2.5 top-3 pointer-events-none text-[#81756d]" />
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="text-[11px] text-[#81756d] uppercase tracking-archival">ACTIVE:</span>
            {selectedFiber !== "all" && (
              <span className="inline-flex items-center gap-1 bg-white border border-[rgba(138,111,90,0.25)] px-2.5 py-1 rounded text-xs text-[#1c1b1a]">
                Fiber: {selectedFiber}
                <button onClick={() => setSelectedFiber("all")}><X size={12} /></button>
              </span>
            )}
            {selectedPriceRange !== "all" && (
              <span className="inline-flex items-center gap-1 bg-white border border-[rgba(138,111,90,0.25)] px-2.5 py-1 rounded text-xs text-[#1c1b1a]">
                Price: {selectedPriceRange}
                <button onClick={() => setSelectedPriceRange("all")}><X size={12} /></button>
              </span>
            )}
            <span className="ml-auto text-[11px] text-[#81756d]">
              Showing {filteredProducts.length} Artifacts
            </span>
          </div>
        )}

        {/* 3. PRODUCT GRID */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center space-y-3 bg-white border border-[rgba(138,111,90,0.2)] rounded-sm">
            <h3 className="font-editorial text-2xl text-[#1c1b1a]">No artifacts match your parameters.</h3>
            <p className="text-xs text-[#81756d]">Try adjusting your fiber filters or price parameters.</p>
            <button
              onClick={clearAllFilters}
              className="bg-[#242321] text-white px-5 py-2 text-xs font-semibold tracking-archival uppercase rounded-sm hover:bg-[#8a6f5a]"
            >
              RESET FILTERS
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Pagination bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-[rgba(138,111,90,0.18)] gap-4 text-xs text-[#81756d]">
          <span>DISPLAYING 1 – {filteredProducts.length} OF 28 ARTIFACTS</span>
          <div className="flex items-center gap-1 font-semibold">
            <button className="px-3 py-1 border border-[rgba(138,111,90,0.2)] rounded bg-white">&lsaquo;</button>
            <button className="px-3 py-1 bg-[#242321] text-white rounded">1</button>
            <button className="px-3 py-1 border border-[rgba(138,111,90,0.2)] rounded bg-white">2</button>
            <button className="px-3 py-1 border border-[rgba(138,111,90,0.2)] rounded bg-white">3</button>
            <button className="px-3 py-1 border border-[rgba(138,111,90,0.2)] rounded bg-white">&rsaquo;</button>
          </div>
          <span className="uppercase tracking-archival text-[10px]">MICRO-RELEASE PAGE 1 OF 3</span>
        </div>
      </section>

      {/* 4. BESPOKE COMMISSION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#f7f3ef] border border-[rgba(138,111,90,0.22)] rounded-sm p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <span className="text-[10px] font-semibold tracking-archival uppercase text-[#8a6f5a] flex items-center gap-1.5">
                <Sparkles size={13} /> PRIVATE ATELIER COMMISSIONS
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl text-[#1c1b1a]">
                Seeking a custom colorway or bespoke dimensions?
              </h2>
              <p className="text-xs sm:text-sm text-[#4f453e] leading-relaxed max-w-xl">
                Our atelier accepts up to six bespoke commissions each month. Inquire with our master artisan to request plant dye alterations, custom cradle sizing, or ceremonial bridal pieces crafted from organic heirloom silks.
              </p>

              <div className="flex flex-wrap gap-4 pt-2 text-[11px] font-medium text-[#685d4d]">
                <span>✓ YARN SWATCH BOX INCLUDED</span>
                <span>✓ 1-ON-1 LOOM CONSULTATION</span>
                <span>✓ ARCHIVAL DUST BAG</span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <button
                onClick={() => openBespokeModal()}
                className="w-full bg-[#242321] text-[#f8f4ed] hover:bg-[#8a6f5a] py-3.5 text-xs font-semibold tracking-archival uppercase rounded-sm transition-colors text-center shadow-sm"
              >
                INQUIRE WITH MASTER ARTISAN
              </button>
              <Link
                href="/craft"
                className="w-full border border-[rgba(138,111,90,0.3)] hover:bg-[#efe7da] py-3 text-xs font-semibold tracking-archival uppercase rounded-sm text-center text-[#242321] transition-colors"
              >
                VIEW BESPOKE ARCHIVE
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 5. 3 VALUE PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white border border-[rgba(138,111,90,0.2)] rounded-sm space-y-2">
            <span className="text-xl">🌿</span>
            <h3 className="font-editorial text-xl text-[#1c1b1a]">Slow Made in France</h3>
            <p className="text-xs text-[#4f453e] leading-relaxed">
              Each loop crocheted with conscious cadence. Never rushed, never overproduced in mass warehouses.
            </p>
          </div>

          <div className="p-6 bg-white border border-[rgba(138,111,90,0.2)] rounded-sm space-y-2">
            <span className="text-xl">🌱</span>
            <h3 className="font-editorial text-xl text-[#1c1b1a]">Biodegradable Fibers</h3>
            <p className="text-xs text-[#4f453e] leading-relaxed">
              100% natural organic cotton, unbleached linen, and forest-harvested raffia without harmful synthetics.
            </p>
          </div>

          <div className="p-6 bg-white border border-[rgba(138,111,90,0.2)] rounded-sm space-y-2">
            <span className="text-xl">✨</span>
            <h3 className="font-editorial text-xl text-[#1c1b1a]">Lifetime Repair Promise</h3>
            <p className="text-xs text-[#4f453e] leading-relaxed">
              We mend, re-dye, and preserve every E&A atelier piece for generations of custodians to come.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-16 text-center text-xs">Loading collection archive...</div>}>
      <ShopContent />
    </Suspense>
  );
}
