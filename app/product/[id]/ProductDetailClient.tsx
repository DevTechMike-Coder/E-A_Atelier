"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product, STITCHES } from "../../data/products";
import { useStore } from "../../context/StoreContext";
import ProductCard from "../../components/ProductCard";
import { createProductReview } from "../../actions/reviews";
import {
  Heart,
  Plus,
  Minus,
  Search,
  Sparkles,
  ChevronDown,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
  Clock,
  Layers,
  Leaf,
  Star,
  MessageSquareQuote,
  X,
  Loader2,
} from "lucide-react";

export interface ReviewItem {
  id: string;
  authorName: string;
  rating: number;
  comment: string | null;
  createdAt: string;
}

export default function ProductDetailClient({
  product,
  recommendations,
  reviews = [],
}: {
  product: Product;
  recommendations: Product[];
  reviews?: ReviewItem[];
}) {
  const {
    formatPrice,
    addToCart,
    isWishlisted,
    toggleWishlist,
    openBespokeModal,
    openStitchModal,
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColorway, setSelectedColorway] = useState(product.colorways[0]?.name || "Natural");
  const [selectedDimension, setSelectedDimension] = useState(product.dimensions[0] || "Standard");
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string>("materials");

  // Collector Review Inscription State
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(reviews);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewerName, setReviewerName] = useState("");
  const [reviewerRating, setReviewerRating] = useState(5);
  const [reviewerComment, setReviewerComment] = useState("");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewError, setReviewError] = useState<string | null>(null);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setReviewError(null);
    setIsSubmittingReview(true);

    const res = await createProductReview({
      productId: product.id,
      authorName: reviewerName,
      rating: reviewerRating,
      comment: reviewerComment,
    });

    setIsSubmittingReview(false);

    if (res.ok) {
      setReviewsList((prev) => [
        {
          id: res.reviewId || Date.now().toString(),
          authorName: reviewerName,
          rating: reviewerRating,
          comment: reviewerComment || null,
          createdAt: new Date().toISOString(),
        },
        ...prev,
      ]);
      setReviewSuccess(true);
      setTimeout(() => {
        setIsReviewModalOpen(false);
        setReviewSuccess(false);
        setReviewerName("");
        setReviewerComment("");
        setReviewerRating(5);
      }, 1500);
    } else {
      setReviewError(res.error || "Failed to preserve collector inscription.");
    }
  };

  const wishlisted = isWishlisted(product.id);

  const toggleAccordion = (key: string) => {
    setOpenAccordion(openAccordion === key ? "" : key);
  };

  return (
    <div className="w-full space-y-20 pb-24 font-sans">
      
      {/* 1. BREADCRUMBS & NOTICE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[rgba(138,111,90,0.18)] gap-2 text-xs">
          <div className="text-[#81756d] uppercase tracking-archival flex items-center gap-2">
            <Link href="/" className="hover:text-[#8a6f5a]">ARCHIVE</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-[#8a6f5a]">{product.categoryLabel.toUpperCase()}</Link>
            <span>/</span>
            <span className="text-[#1c1b1a] font-semibold">{product.name.toUpperCase()}</span>
          </div>

          <span className="text-[11px] font-semibold tracking-archival uppercase text-[#8a6f5a]">
            • EDITION BATCH ACTIVE: 11 SLOTS REMAINING
          </span>
        </div>
      </section>

      {/* 2. MAIN HERO PRODUCT SPREAD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: 3:4 Gallery & Fiber Inspect */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Portrait Plate */}
            <div className="relative aspect-[3/4] w-full rounded-sm overflow-hidden bg-[#f7f3ef] border border-[rgba(138,111,90,0.22)] shadow-sm">
              <Image
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />

              {/* Floating "Pinch & Inspect Fibers" Button */}
              <button
                onClick={() => openStitchModal(STITCHES[2])}
                className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm border border-[rgba(138,111,90,0.25)] px-3.5 py-2 rounded-sm text-[10.5px] font-semibold tracking-archival uppercase text-[#242321] hover:text-[#8a6f5a] hover:bg-white transition-all shadow-md flex items-center gap-1.5"
              >
                <Search size={13} className="text-[#8a6f5a]" />
                <span>PINCH & INSPECT FIBERS</span>
              </button>

              <div className="absolute top-4 left-4 bg-white/95 text-[#1c1b1a] text-[9.5px] font-semibold tracking-archival uppercase px-2.5 py-1 rounded-sm border border-[rgba(138,111,90,0.2)]">
                {product.badge}
              </div>
            </div>

            {/* Thumbnail Row */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative aspect-[3/4] rounded-sm overflow-hidden border transition-all ${
                    activeImageIndex === idx
                      ? "border-[#8a6f5a] ring-2 ring-[#8a6f5a]/30"
                      : "border-[rgba(138,111,90,0.2)] opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Zero-Waste Tension Callout */}
            <div className="p-4 bg-[#efe7da]/70 border border-[rgba(138,111,90,0.2)] rounded-sm flex items-start gap-3">
              <span className="text-xl">✨</span>
              <div className="text-xs space-y-0.5">
                <p className="font-semibold text-[#1c1b1a]">Zero-Waste Sculptural Tension</p>
                <p className="text-[#4f453e] leading-snug">
                  Continuous loop design eliminates cut scraps. Botanical mineral dye was sourced from local Provence chalk pits and elderberries.
                </p>
                <p className="text-[10px] text-[#81756d] font-mono pt-1">GOTS-CERTIFICATION: #G-441-EA</p>
              </div>
            </div>
          </div>

          {/* Right Column: Buying Controls & Spec Details */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs text-[#81756d] mb-1">
                <span className="tracking-archival uppercase text-[10px] font-semibold text-[#8a6f5a]">
                  E&A ATELIER PERMANENT COLLECTION
                </span>
                <span className="font-mono text-[10.5px]">{product.refCode}</span>
              </div>

              <h1 className="font-editorial text-3xl sm:text-4xl text-[#1c1b1a] leading-tight">
                {product.name}
              </h1>

              {/* Price Row */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="font-editorial text-3xl text-[#1c1b1a]">
                  {formatPrice(product.priceUSD)}
                </span>
                <span className="text-xs text-[#81756d]">
                  Tax included. Bespoke cotton dust bag included.
                </span>
              </div>

              {/* Installment note */}
              <p className="text-[11px] text-[#81756d] mt-1">
                Or 4 interest-free installments with Klarna / Split Payments.
              </p>
            </div>

            <p className="text-xs sm:text-sm text-[#4f453e] leading-relaxed">
              {product.description}
            </p>

            {/* COLORWAY SELECTOR WITH CONCENTRIC DISCS */}
            <div className="space-y-2 pt-2 border-t border-[rgba(138,111,90,0.18)]">
              <div className="flex justify-between text-xs">
                <span className="text-[10.5px] font-semibold tracking-archival uppercase text-[#81756d]">
                  COLORWAY: <strong className="text-[#1c1b1a]">{selectedColorway.toUpperCase()}</strong>
                </span>
                <span className="text-[10.5px] text-[#81756d]">Plant & Mineral Dye</span>
              </div>

              <div className="flex items-center gap-3">
                {product.colorways.map((swatch) => {
                  const isSelected = selectedColorway === swatch.name;
                  return (
                    <button
                      key={swatch.name}
                      onClick={() => {
                        setSelectedColorway(swatch.name);
                        // find matching image index if possible
                        const matchIndex = product.images.findIndex((img) => img === swatch.image);
                        if (matchIndex > -1) setActiveImageIndex(matchIndex);
                      }}
                      className="group relative p-1"
                      title={swatch.name}
                    >
                      <div
                        className={`w-7 h-7 rounded-full transition-all ${
                          isSelected
                            ? "ring-2 ring-offset-2 ring-[#8a6f5a] ring-offset-[#fdf8f5] scale-105"
                            : "hover:scale-105 opacity-80 hover:opacity-100 border border-[rgba(138,111,90,0.3)]"
                        }`}
                        style={{ backgroundColor: swatch.hex }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* DIMENSION PROFILE */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-xs">
                <span className="text-[10.5px] font-semibold tracking-archival uppercase text-[#81756d]">
                  DIMENSION PROFILE:
                </span>
                <button
                  onClick={() => openBespokeModal(product.name)}
                  className="text-[10.5px] text-[#8a6f5a] hover:underline uppercase tracking-archival font-semibold"
                >
                  Size Guide & Bespoke
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {product.dimensions.map((dim) => (
                  <button
                    key={dim}
                    onClick={() => setSelectedDimension(dim)}
                    className={`p-2.5 text-left rounded-sm border text-xs transition-all ${
                      selectedDimension === dim
                        ? "border-[#8a6f5a] bg-white text-[#1c1b1a] font-semibold shadow-sm"
                        : "border-[rgba(138,111,90,0.2)] bg-[#f7f3ef] text-[#4f453e] hover:bg-white"
                    }`}
                  >
                    {dim}
                  </button>
                ))}
              </div>
            </div>

            {/* QUANTITY & PRIMARY ACTION ROW */}
            <div className="pt-2 flex items-center gap-3">
              {/* Stepper */}
              <div className="flex items-center border border-[rgba(138,111,90,0.25)] rounded-sm bg-white h-12 px-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 text-[#81756d] hover:text-[#1c1b1a]"
                  aria-label="Decrease"
                >
                  <Minus size={14} />
                </button>
                <span className="px-3 text-xs font-semibold text-[#1c1b1a]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 text-[#81756d] hover:text-[#1c1b1a]"
                  aria-label="Increase"
                >
                  <Plus size={14} />
                </button>
              </div>

              {/* Add to Tote Button */}
              <button
                onClick={() =>
                  addToCart(product, selectedColorway, selectedDimension, quantity)
                }
                className="flex-1 h-12 bg-[#242321] text-[#f8f4ed] hover:bg-[#8a6f5a] transition-colors text-xs font-semibold tracking-archival uppercase rounded-sm flex items-center justify-center gap-2 shadow-md"
              >
                <span>ADD TO TOTE • {formatPrice(product.priceUSD * quantity)}</span>
              </button>

              {/* Wishlist button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`h-12 w-12 rounded-sm border flex items-center justify-center transition-all ${
                  wishlisted
                    ? "border-[#8a6f5a] bg-[#efe7da] text-[#8a6f5a]"
                    : "border-[rgba(138,111,90,0.25)] bg-white text-[#242321] hover:border-[#8a6f5a]"
                }`}
                aria-label="Wishlist"
              >
                <Heart size={18} className={wishlisted ? "fill-[#8a6f5a]" : ""} />
              </button>
            </div>

            {/* SECONDARY CTA: BESPOKE GIFT PACK */}
            <button
              onClick={() => openBespokeModal(product.name)}
              className="w-full py-2.5 border border-[rgba(138,111,90,0.3)] bg-white hover:bg-[#efe7da] text-[#242321] transition-colors text-xs font-semibold tracking-archival uppercase rounded-sm"
            >
              ORDER AS BESPOKE CUSTOM GIFT PACK &rarr;
            </button>

            {/* DISPATCH SPECIFICATION BOX */}
            <div className="p-4 bg-white border border-[rgba(138,111,90,0.2)] rounded-sm space-y-1 text-xs">
              <p className="font-semibold text-[#705743] flex items-center gap-1.5">
                <Clock size={13} /> Handmade to order in Provence & Portugal
              </p>
              <p className="text-[#4f453e]">
                Each tote is numbered and signed by its master maker. Please allow 10–14 business days for single-hook completion.
              </p>
            </div>

            {/* ATELIER SPEC SHEET ACCORDIONS */}
            <div className="pt-4 border-t border-[rgba(138,111,90,0.18)] space-y-2">
              <span className="text-[10px] font-semibold tracking-archival uppercase text-[#81756d] block mb-2">
                ATELIER TRACEABILITY SPEC SHEET
              </span>

              {/* Accordion 1: Materials & Fiber Sourcing */}
              <div className="border border-[rgba(138,111,90,0.2)] rounded-sm bg-white overflow-hidden">
                <button
                  onClick={() => toggleAccordion("materials")}
                  className="w-full p-3.5 flex items-center justify-between text-left text-xs font-semibold tracking-archival uppercase text-[#1c1b1a] hover:bg-[#fdf8f5]"
                >
                  <span>Materials & Fiber Sourcing</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 text-[#81756d] ${
                      openAccordion === "materials" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openAccordion === "materials" && (
                  <div className="p-4 pt-0 text-xs text-[#4f453e] space-y-3 border-t border-[rgba(138,111,90,0.1)] mt-2">
                    <div>
                      <strong className="text-[#1c1b1a] block text-[11px] uppercase tracking-archival">Body:</strong>
                      <span>{product.specs.body}</span>
                    </div>
                    <div>
                      <strong className="text-[#1c1b1a] block text-[11px] uppercase tracking-archival">Structural Rope:</strong>
                      <span>{product.specs.structuralRope}</span>
                    </div>
                    <div>
                      <strong className="text-[#1c1b1a] block text-[11px] uppercase tracking-archival">Hardware & Fitting:</strong>
                      <span>{product.specs.hardware}</span>
                    </div>
                    <div>
                      <strong className="text-[#1c1b1a] block text-[11px] uppercase tracking-archival">Dye Chemistry:</strong>
                      <span>{product.specs.dyeChemistry}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Accordion 2: Care & Longevity Routine */}
              <div className="border border-[rgba(138,111,90,0.2)] rounded-sm bg-white overflow-hidden">
                <button
                  onClick={() => toggleAccordion("care")}
                  className="w-full p-3.5 flex items-center justify-between text-left text-xs font-semibold tracking-archival uppercase text-[#1c1b1a] hover:bg-[#fdf8f5]"
                >
                  <span>Care & Longevity Routine</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 text-[#81756d] ${
                      openAccordion === "care" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openAccordion === "care" && (
                  <div className="p-4 pt-0 text-xs text-[#4f453e] space-y-2 border-t border-[rgba(138,111,90,0.1)] mt-2">
                    <p>{product.specs.care}</p>
                    <p className="text-[11px] text-[#81756d] italic">
                      Every order includes a cake of organic olive oil wash flakes and an unbleached linen storage tote.
                    </p>
                  </div>
                )}
              </div>

              {/* Accordion 3: Artisan Workshop Lineage */}
              <div className="border border-[rgba(138,111,90,0.2)] rounded-sm bg-white overflow-hidden">
                <button
                  onClick={() => toggleAccordion("lineage")}
                  className="w-full p-3.5 flex items-center justify-between text-left text-xs font-semibold tracking-archival uppercase text-[#1c1b1a] hover:bg-[#fdf8f5]"
                >
                  <span>Artisan Workshop Lineage</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 text-[#81756d] ${
                      openAccordion === "lineage" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openAccordion === "lineage" && (
                  <div className="p-4 pt-0 text-xs text-[#4f453e] space-y-2 border-t border-[rgba(138,111,90,0.1)] mt-2">
                    <p>{product.specs.lineage}</p>
                    <p className="text-[11px] text-[#81756d]">
                      Registered in the Provence Guild of Handcrafts (#PGH-2026).
                    </p>
                  </div>
                )}
              </div>

              {/* Accordion 4: Carbon-Neutral Shipping & Returns */}
              <div className="border border-[rgba(138,111,90,0.2)] rounded-sm bg-white overflow-hidden">
                <button
                  onClick={() => toggleAccordion("shipping")}
                  className="w-full p-3.5 flex items-center justify-between text-left text-xs font-semibold tracking-archival uppercase text-[#1c1b1a] hover:bg-[#fdf8f5]"
                >
                  <span>Carbon-Neutral Shipping & Returns</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 text-[#81756d] ${
                      openAccordion === "shipping" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openAccordion === "shipping" && (
                  <div className="p-4 pt-0 text-xs text-[#4f453e] space-y-2 border-t border-[rgba(138,111,90,0.1)] mt-2">
                    <p>{product.specs.shipping}</p>
                    <p className="text-[11px] text-[#81756d]">
                      Complimentary 30-day exchange or artisanal adjustment if dimensions need tailor fitting.
                    </p>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 3. ATELIER STORY & ARTISAN QUOTE SPLIT */}
      <section className="w-full bg-[#f7f3ef] border-y border-[rgba(138,111,90,0.18)] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[10px] font-semibold tracking-archival uppercase text-[#8a6f5a]">
                FIBER DEEP PHILOSOPHY
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl text-[#1c1b1a]">
                Rooted in Aegean organic fields and coastal raffia palms.
              </h2>
              <p className="text-xs sm:text-sm text-[#4f453e] leading-relaxed">
                Unlike industrial mass-knitting, crochet can only be performed by human hands. Every knot in {product.name} is an unhurried cadence of time and tension, crafted by artisans in our Provence studio who have perfected this lace-looping lineage across three generations.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <span className="font-editorial text-3xl text-[#705743] block">
                    {product.craftHours}h
                  </span>
                  <span className="text-[10px] font-semibold tracking-archival uppercase text-[#81756d]">
                    ARTISANAL CRAFT TIME
                  </span>
                </div>
                <div>
                  <span className="font-editorial text-3xl text-[#705743] block">
                    100%
                  </span>
                  <span className="text-[10px] font-semibold tracking-archival uppercase text-[#81756d]">
                    BIODEGRADABLE
                  </span>
                </div>
              </div>

              {product.storyQuote && (
                <div className="p-4 bg-white border-l-2 border-[#8a6f5a] rounded-r-sm space-y-1">
                  <p className="font-editorial text-sm italic text-[#1c1b1a]">
                    &ldquo;{product.storyQuote}&rdquo;
                  </p>
                  <p className="text-[9.5px] uppercase tracking-archival text-[#81756d] font-semibold">
                    — ARTISANAL NOTE • {product.refCode}
                  </p>
                </div>
              )}
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] rounded-sm overflow-hidden border border-[rgba(138,111,90,0.2)]">
                <Image
                  src={product.images[1] || product.images[0]}
                  alt="Artisan hands crocheting"
                  fill
                  sizes="300px"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[3/4] rounded-sm overflow-hidden border border-[rgba(138,111,90,0.2)]">
                <Image
                  src={product.images[3] || product.images[0]}
                  alt="Yarn and skeins detail"
                  fill
                  sizes="300px"
                  className="object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. COLLECTOR INSCRIPTIONS & REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[rgba(138,111,90,0.18)] gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] tracking-archival uppercase text-[#8a6f5a] font-semibold">
                COLLECTOR ARCHIVE
              </span>
              <span className="text-xs text-[#81756d]">•</span>
              <div className="flex items-center text-[#8a6f5a]">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={12}
                    className={
                      s <= Math.round(product.rating || 5)
                        ? "fill-[#8a6f5a] text-[#8a6f5a]"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#1c1b1a]">
              Collector Inscriptions ({reviewsList.length})
            </h2>
          </div>

          <button
            onClick={() => setIsReviewModalOpen(true)}
            className="inline-flex items-center gap-2 bg-[#242321] text-[#f8f4ed] hover:bg-[#8a6f5a] px-6 py-3 text-xs font-semibold tracking-archival uppercase rounded-sm transition-colors shadow-sm self-start sm:self-auto"
          >
            <MessageSquareQuote size={14} />
            <span>WRITE AN INSCRIPTION</span>
          </button>
        </div>

        {reviewsList.length === 0 ? (
          <div className="bg-white border border-[rgba(138,111,90,0.2)] rounded-sm p-12 text-center space-y-4 max-w-xl mx-auto">
            <div className="w-12 h-12 rounded-full bg-[#efe7da] text-[#705743] flex items-center justify-center mx-auto">
              <Sparkles size={20} />
            </div>
            <h3 className="font-editorial text-2xl text-[#1c1b1a]">
              First Inscription Awaiting
            </h3>
            <p className="text-xs text-[#4f453e] leading-relaxed">
              No collector evaluations have been preserved for this reference yet. Share your reflections on its drape, tension, and living touch.
            </p>
            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="inline-block bg-[#8a6f5a] text-white hover:bg-[#705743] px-6 py-2.5 text-xs font-semibold tracking-archival uppercase rounded-sm transition-colors"
            >
              PEN THE FIRST INSCRIPTION
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviewsList.map((rev) => (
              <div
                key={rev.id}
                className="bg-white border border-[rgba(138,111,90,0.2)] p-6 rounded-sm space-y-4 shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[#8a6f5a]">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          size={12}
                          className={
                            s <= rev.rating
                              ? "fill-[#8a6f5a] text-[#8a6f5a]"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-[#81756d] font-mono">
                      {new Date(rev.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <p className="text-xs text-[#4f453e] leading-relaxed italic">
                    &ldquo;{rev.comment || "An exquisite, tactile heirloom that softens with each wear."}&rdquo;
                  </p>
                </div>

                <div className="pt-3 border-t border-[rgba(138,111,90,0.15)] flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-[#1c1b1a]">{rev.authorName}</span>
                  <span className="text-[10px] text-[#705743] tracking-archival uppercase font-medium">
                    VERIFIED CUSTODIAN
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-[#fdf8f5] border border-[rgba(138,111,90,0.3)] rounded-sm max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 relative">
            <button
              onClick={() => setIsReviewModalOpen(false)}
              className="absolute top-5 right-5 text-[#81756d] hover:text-[#1c1b1a]"
            >
              <X size={20} />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-semibold tracking-archival uppercase text-[#8a6f5a]">
                ARCHIVAL INSCRIPTION
              </span>
              <h3 className="font-editorial text-2xl text-[#1c1b1a]">
                Evaluate {product.name}
              </h3>
              <p className="text-xs text-[#4f453e]">
                Your evaluation will be recorded permanently in the public collector register.
              </p>
            </div>

            {reviewSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#efe7da] text-[#705743] flex items-center justify-center mx-auto">
                  <CheckCircle2 size={24} />
                </div>
                <h4 className="font-editorial text-xl text-[#1c1b1a]">
                  Inscription Recorded
                </h4>
                <p className="text-xs text-[#4f453e]">
                  Merci. Your provenance reflections have been added to the register.
                </p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                {reviewError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm">
                    {reviewError}
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold tracking-archival uppercase text-[#4f453e] block">
                    Rating Evaluation *
                  </label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setReviewerRating(star)}
                        className="p-1 focus:outline-none"
                      >
                        <Star
                          size={22}
                          className={
                            star <= reviewerRating
                              ? "fill-[#8a6f5a] text-[#8a6f5a]"
                              : "text-gray-300"
                          }
                        />
                      </button>
                    ))}
                    <span className="text-xs font-mono text-[#81756d] ml-2">
                      {reviewerRating} / 5 Stars
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold tracking-archival uppercase text-[#4f453e] block">
                    Collector Name or Monogram *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Camille De Laroche"
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    className="w-full bg-white border border-[rgba(138,111,90,0.25)] px-3.5 py-2.5 text-xs text-[#1c1b1a] rounded-sm focus:outline-none focus:border-[#8a6f5a]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold tracking-archival uppercase text-[#4f453e] block">
                    Collector Reflections & Drape Notes
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe the tactile weight, natural flax handfeel, or living memory of this piece..."
                    value={reviewerComment}
                    onChange={(e) => setReviewerComment(e.target.value)}
                    className="w-full bg-white border border-[rgba(138,111,90,0.25)] p-3 text-xs text-[#1c1b1a] rounded-sm focus:outline-none focus:border-[#8a6f5a]"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsReviewModalOpen(false)}
                    className="px-5 py-2.5 text-xs font-semibold tracking-archival uppercase text-[#81756d] hover:text-[#1c1b1a]"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingReview}
                    className="bg-[#242321] text-[#f8f4ed] hover:bg-[#8a6f5a] px-6 py-2.5 text-xs font-semibold tracking-archival uppercase rounded-sm transition-colors flex items-center gap-2"
                  >
                    {isSubmittingReview && <Loader2 size={14} className="animate-spin" />}
                    <span>PRESERVE INSCRIPTION</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 5. YOU MAY ALSO CHERISH RECOMMENDATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[rgba(138,111,90,0.18)] gap-4">
          <div>
            <span className="text-[10px] tracking-archival uppercase text-[#8a6f5a] font-semibold block mb-1">
              CURATED PAIRINGS
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#1c1b1a]">
              You May Also Cherish
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs font-semibold tracking-archival uppercase text-[#242321] hover:text-[#8a6f5a]"
          >
            VIEW COMPLETE LOOKBOOK &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {recommendations.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>

    </div>
  );
}
