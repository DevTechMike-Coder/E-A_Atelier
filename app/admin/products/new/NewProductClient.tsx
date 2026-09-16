"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createNewProduct, NewProductInput } from "@/app/actions/adminProducts";
import {
  ArrowLeft,
  Sparkles,
  Plus,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Loader2,
  FileText,
  Image as ImageIcon,
  Palette,
  Layers,
} from "lucide-react";

export default function NewProductClient() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [priceUSD, setPriceUSD] = useState<number>(295);
  const [category, setCategory] = useState<"bags" | "wearables" | "accessories" | "home">("bags");
  const [craftHours, setCraftHours] = useState<number>(20);
  const [fiber, setFiber] = useState("100% Unbleached Belgian Linen");
  const [badge, setBadge] = useState("Archival Edition");
  const [status, setStatus] = useState<"Made on Demand" | "In Stock" | "Limited Edition" | "Capsule Preview">("Made on Demand");
  const [editionNumber, setEditionNumber] = useState("");
  const [description, setDescription] = useState("");
  const [storyQuote, setStoryQuote] = useState("");
  const [provenance, setProvenance] = useState("Hand-looped in Saint-Rémy-de-Provence atelier using zero petroleum-based synthetic fibers.");
  const [dimensions, setDimensions] = useState("Standard (36cm × 28cm)");

  // Images (URLs)
  const [imagesText, setImagesText] = useState(
    "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1000&auto=format&fit=crop\nhttps://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1000&auto=format&fit=crop"
  );

  // Colorways
  const [colorways, setColorways] = useState<
    { name: string; hex: string; image: string }[]
  >([
    { name: "Unbleached Ecru", hex: "#efe7da", image: "" },
    { name: "Madder Terracotta", hex: "#8a6f5a", image: "" },
  ]);

  // Specs
  const [specBody, setSpecBody] = useState("100% Organic Double-Twisted Flax Thread");
  const [specStructuralRope, setSpecStructuralRope] = useState("Zero-synthetic continuous core cord");
  const [specHardware, setSpecHardware] = useState("Hand-cast antique brass with atelier seal");
  const [specDyeChemistry, setSpecDyeChemistry] = useState("Wild madder root & Provence mineral bath");
  const [specCare, setSpecCare] = useState("Cold-water sponge clean. Lay flat in shade to dry naturally.");
  const [specLineage, setSpecLineage] = useState("Provence Atelier Master Weave");
  const [specShipping, setSpecShipping] = useState("Complimentary wax-stamped linen dust bag & numbered certificate.");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddColorway = () => {
    setColorways((prev) => [...prev, { name: "", hex: "#8a6f5a", image: "" }]);
  };

  const handleRemoveColorway = (index: number) => {
    setColorways((prev) => prev.filter((_, i) => i !== index));
  };

  const handleColorwayChange = (index: number, field: string, val: string) => {
    setColorways((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: val };
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Please provide a name for the heirloom piece.");
      return;
    }

    const imagesList = imagesText
      .split("\n")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    if (imagesList.length === 0) {
      setError("Please supply at least one photography image URL.");
      return;
    }

    const dimensionsList = dimensions
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    setIsSubmitting(true);

    const payload: NewProductInput = {
      name,
      tagline: tagline || name,
      priceUSD: Number(priceUSD),
      category,
      categoryLabel: category.toUpperCase(),
      craftHours: Number(craftHours),
      fiber,
      badge,
      status,
      editionNumber: editionNumber || undefined,
      description,
      storyQuote: storyQuote || undefined,
      provenance,
      dimensions: dimensionsList.length > 0 ? dimensionsList : ["Standard Edition"],
      specs: {
        body: specBody,
        structuralRope: specStructuralRope,
        hardware: specHardware,
        dyeChemistry: specDyeChemistry,
        care: specCare,
        lineage: specLineage,
        shipping: specShipping,
      },
      images: imagesList,
      colorways: colorways.filter((c) => c.name.trim().length > 0),
    };

    const res = await createNewProduct(payload);

    if (res.ok && res.productId) {
      router.push(`/product/${res.productId}`);
    } else {
      setIsSubmitting(false);
      setError(res.error || "Failed to inscribe product in database.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-sans">
      
      {/* Title */}
      <div className="space-y-3 border-b border-[rgba(138,111,90,0.18)] pb-6">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-archival uppercase text-[#8a6f5a] hover:text-[#705743]"
        >
          <ArrowLeft size={14} />
          <span>RETURN TO CATALOGUE</span>
        </Link>
        <div>
          <span className="text-[10px] font-semibold tracking-archival uppercase text-[#8a6f5a] block">
            ARCHIVAL INSCRIPTION
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl text-[#1c1b1a]">
            Inscribe New Heirloom to Catalogue
          </h1>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm flex items-start gap-2">
          <AlertCircle size={16} className="flex-shrink-0 mt-0.5 text-red-600" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-10">
        
        {/* Section 1: Identification */}
        <section className="bg-white p-6 sm:p-8 border border-[rgba(138,111,90,0.2)] rounded-sm space-y-6 shadow-sm">
          <h2 className="font-editorial text-xl text-[#1c1b1a] flex items-center gap-2">
            <FileText size={18} className="text-[#8a6f5a]" />
            <span>Piece Identification</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold tracking-archival uppercase text-[#4f453e]">
                Heirloom Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. The Arles Scallop Crochet Shoulder Bag"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#fdf8f5] border border-[rgba(138,111,90,0.25)] px-3.5 py-2.5 text-xs text-[#1c1b1a] rounded-sm focus:outline-none focus:border-[#8a6f5a]"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold tracking-archival uppercase text-[#4f453e]">
                Editorial Tagline
              </label>
              <input
                type="text"
                placeholder="e.g. Unbleached Normandy flax with scalloped perimeter"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full bg-[#fdf8f5] border border-[rgba(138,111,90,0.25)] px-3.5 py-2.5 text-xs text-[#1c1b1a] rounded-sm focus:outline-none focus:border-[#8a6f5a]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold tracking-archival uppercase text-[#4f453e]">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-[#fdf8f5] border border-[rgba(138,111,90,0.25)] px-3.5 py-2.5 text-xs text-[#1c1b1a] rounded-sm focus:outline-none"
              >
                <option value="bags">Bags (Sculptural Totes & Clutches)</option>
                <option value="wearables">Wearables (Vests & Tops)</option>
                <option value="accessories">Accessories (Hats & Scarves)</option>
                <option value="home">Home (Vessels & Table Heirlooms)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold tracking-archival uppercase text-[#4f453e]">
                Price (USD $) *
              </label>
              <input
                type="number"
                required
                min={1}
                value={priceUSD}
                onChange={(e) => setPriceUSD(Number(e.target.value))}
                className="w-full bg-[#fdf8f5] border border-[rgba(138,111,90,0.25)] px-3.5 py-2.5 text-xs text-[#1c1b1a] rounded-sm focus:outline-none focus:border-[#8a6f5a]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold tracking-archival uppercase text-[#4f453e]">
                Craft Hours *
              </label>
              <input
                type="number"
                required
                min={1}
                value={craftHours}
                onChange={(e) => setCraftHours(Number(e.target.value))}
                className="w-full bg-[#fdf8f5] border border-[rgba(138,111,90,0.25)] px-3.5 py-2.5 text-xs text-[#1c1b1a] rounded-sm focus:outline-none focus:border-[#8a6f5a]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold tracking-archival uppercase text-[#4f453e]">
                Availability Status *
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full bg-[#fdf8f5] border border-[rgba(138,111,90,0.25)] px-3.5 py-2.5 text-xs text-[#1c1b1a] rounded-sm focus:outline-none"
              >
                <option value="Made on Demand">Made on Demand</option>
                <option value="In Stock">In Stock</option>
                <option value="Limited Edition">Limited Edition</option>
                <option value="Capsule Preview">Capsule Preview</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold tracking-archival uppercase text-[#4f453e]">
                Fiber Genetics *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 100% Belgian Long-Line Flax & Aegean Cotton"
                value={fiber}
                onChange={(e) => setFiber(e.target.value)}
                className="w-full bg-[#fdf8f5] border border-[rgba(138,111,90,0.25)] px-3.5 py-2.5 text-xs text-[#1c1b1a] rounded-sm focus:outline-none focus:border-[#8a6f5a]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold tracking-archival uppercase text-[#4f453e]">
                Archival Badge
              </label>
              <input
                type="text"
                placeholder="e.g. Rare Batch, Limited 12 Pieces"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                className="w-full bg-[#fdf8f5] border border-[rgba(138,111,90,0.25)] px-3.5 py-2.5 text-xs text-[#1c1b1a] rounded-sm focus:outline-none focus:border-[#8a6f5a]"
              />
            </div>
          </div>
        </section>

        {/* Section 2: Narrative & Provenance */}
        <section className="bg-white p-6 sm:p-8 border border-[rgba(138,111,90,0.2)] rounded-sm space-y-6 shadow-sm">
          <h2 className="font-editorial text-xl text-[#1c1b1a] flex items-center gap-2">
            <Sparkles size={18} className="text-[#8a6f5a]" />
            <span>Narrative & Provenance</span>
          </h2>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold tracking-archival uppercase text-[#4f453e]">
                Curator Description *
              </label>
              <textarea
                rows={3}
                required
                placeholder="Describe the silhouette, tension, and living touch of the piece..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-[#fdf8f5] border border-[rgba(138,111,90,0.25)] p-3 text-xs text-[#1c1b1a] rounded-sm focus:outline-none focus:border-[#8a6f5a]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold tracking-archival uppercase text-[#4f453e]">
                Provenance Notes
              </label>
              <textarea
                rows={2}
                placeholder="Harvest location, retting process, and workshop lineage..."
                value={provenance}
                onChange={(e) => setProvenance(e.target.value)}
                className="w-full bg-[#fdf8f5] border border-[rgba(138,111,90,0.25)] p-3 text-xs text-[#1c1b1a] rounded-sm focus:outline-none focus:border-[#8a6f5a]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold tracking-archival uppercase text-[#4f453e]">
                Maker Story Quote (Optional)
              </label>
              <input
                type="text"
                placeholder='e.g. "Every knot is an unhurried equation between flax and skin."'
                value={storyQuote}
                onChange={(e) => setStoryQuote(e.target.value)}
                className="w-full bg-[#fdf8f5] border border-[rgba(138,111,90,0.25)] px-3.5 py-2.5 text-xs text-[#1c1b1a] rounded-sm focus:outline-none focus:border-[#8a6f5a]"
              />
            </div>
          </div>
        </section>

        {/* Section 3: Photography & Colorways */}
        <section className="bg-white p-6 sm:p-8 border border-[rgba(138,111,90,0.2)] rounded-sm space-y-6 shadow-sm">
          <h2 className="font-editorial text-xl text-[#1c1b1a] flex items-center gap-2">
            <ImageIcon size={18} className="text-[#8a6f5a]" />
            <span>Photography & Visual Palette</span>
          </h2>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold tracking-archival uppercase text-[#4f453e]">
                High-Resolution Image URLs (one per line) *
              </label>
              <textarea
                rows={3}
                required
                placeholder="https://images.unsplash.com/..."
                value={imagesText}
                onChange={(e) => setImagesText(e.target.value)}
                className="w-full bg-[#fdf8f5] border border-[rgba(138,111,90,0.25)] p-3 text-xs text-[#1c1b1a] font-mono rounded-sm focus:outline-none focus:border-[#8a6f5a]"
              />
            </div>

            {/* Colorways Dynamic List */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold tracking-archival uppercase text-[#4f453e]">
                  Active Colorways
                </label>
                <button
                  type="button"
                  onClick={handleAddColorway}
                  className="text-xs font-semibold text-[#8a6f5a] hover:underline flex items-center gap-1"
                >
                  <Plus size={12} /> Add Colorway
                </button>
              </div>

              <div className="space-y-2">
                {colorways.map((cw, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <input
                      type="text"
                      placeholder="Color Name (e.g. Terracotta)"
                      value={cw.name}
                      onChange={(e) => handleColorwayChange(i, "name", e.target.value)}
                      className="flex-1 bg-[#fdf8f5] border border-[rgba(138,111,90,0.25)] px-3 py-2 text-xs text-[#1c1b1a] rounded-sm"
                    />
                    <input
                      type="color"
                      value={cw.hex}
                      onChange={(e) => handleColorwayChange(i, "hex", e.target.value)}
                      className="w-10 h-8 border border-[rgba(138,111,90,0.25)] rounded cursor-pointer p-0 bg-transparent"
                    />
                    {colorways.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveColorway(i)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Craft Specifications */}
        <section className="bg-white p-6 sm:p-8 border border-[rgba(138,111,90,0.2)] rounded-sm space-y-6 shadow-sm">
          <h2 className="font-editorial text-xl text-[#1c1b1a] flex items-center gap-2">
            <Layers size={18} className="text-[#8a6f5a]" />
            <span>Technical Specifications</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold tracking-archival uppercase text-[#4f453e]">
                Body Weave Composition
              </label>
              <input
                type="text"
                value={specBody}
                onChange={(e) => setSpecBody(e.target.value)}
                className="w-full bg-[#fdf8f5] border border-[rgba(138,111,90,0.25)] px-3 py-2 text-xs text-[#1c1b1a] rounded-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold tracking-archival uppercase text-[#4f453e]">
                Structural Rope
              </label>
              <input
                type="text"
                value={specStructuralRope}
                onChange={(e) => setSpecStructuralRope(e.target.value)}
                className="w-full bg-[#fdf8f5] border border-[rgba(138,111,90,0.25)] px-3 py-2 text-xs text-[#1c1b1a] rounded-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold tracking-archival uppercase text-[#4f453e]">
                Hardware & Fastenings
              </label>
              <input
                type="text"
                value={specHardware}
                onChange={(e) => setSpecHardware(e.target.value)}
                className="w-full bg-[#fdf8f5] border border-[rgba(138,111,90,0.25)] px-3 py-2 text-xs text-[#1c1b1a] rounded-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold tracking-archival uppercase text-[#4f453e]">
                Dye Chemistry
              </label>
              <input
                type="text"
                value={specDyeChemistry}
                onChange={(e) => setSpecDyeChemistry(e.target.value)}
                className="w-full bg-[#fdf8f5] border border-[rgba(138,111,90,0.25)] px-3 py-2 text-xs text-[#1c1b1a] rounded-sm"
              />
            </div>
          </div>
        </section>

        {/* Submit */}
        <div className="pt-4 flex items-center justify-end gap-4">
          <Link
            href="/admin/products"
            className="px-6 py-3 text-xs font-semibold tracking-archival uppercase text-[#81756d] hover:text-[#1c1b1a]"
          >
            CANCEL
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#242321] text-[#f8f4ed] hover:bg-[#8a6f5a] px-8 py-3.5 text-xs font-semibold tracking-archival uppercase rounded-sm transition-colors shadow-md flex items-center gap-2"
          >
            {isSubmitting && <Loader2 size={16} className="animate-spin" />}
            <span>INSCRIBE HEIRLOOM TO ARCHIVE &rarr;</span>
          </button>
        </div>

      </form>

    </div>
  );
}
