"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { updateProductAvailability } from "@/app/actions/adminProducts";
import {
  PlusCircle,
  ExternalLink,
  Sparkles,
  Clock,
  Layers,
  Search,
} from "lucide-react";

export interface AdminProductItem {
  id: string;
  name: string;
  category: string;
  priceUSD: number;
  craftHours: number;
  fiber: string;
  status: string;
  badge: string;
  refCode: string;
  image: string;
  colorwaysCount: number;
  reviewsCount: number;
  createdAt: string;
}

export default function AdminProductsClient({
  initialProducts,
}: {
  initialProducts: AdminProductItem[];
}) {
  const [products, setProducts] = useState<AdminProductItem[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleStatusUpdate = async (
    id: string,
    status: "Made on Demand" | "In Stock" | "Limited Edition" | "Capsule Preview"
  ) => {
    setUpdatingId(id);
    const res = await updateProductAvailability(id, status);
    setUpdatingId(null);

    if (res.ok) {
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status } : p))
      );
    }
  };

  const filtered = products.filter((p) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.refCode.toLowerCase().includes(q) ||
      p.fiber.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-sans">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-[rgba(138,111,90,0.18)] pb-6">
        <div>
          <span className="text-[10px] font-semibold tracking-archival uppercase text-[#8a6f5a] block">
            STUDIO ARCHIVE
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl text-[#1c1b1a] mt-1">
            Catalogue Heirlooms ({products.length})
          </h1>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 bg-[#8a6f5a] hover:bg-[#705743] text-white px-5 py-2.5 rounded-sm text-xs font-semibold tracking-archival uppercase transition-colors shadow-sm self-start sm:self-auto"
        >
          <PlusCircle size={14} />
          <span>INSCRIBE NEW HEIRLOOM</span>
        </Link>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <input
          type="text"
          placeholder="Filter by piece name, fiber, category, or ref code..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-[rgba(138,111,90,0.25)] pl-9 pr-4 py-2 text-xs text-[#1c1b1a] rounded-sm focus:outline-none focus:border-[#8a6f5a]"
        />
        <Search size={14} className="absolute left-3 top-3 text-[#81756d]" />
      </div>

      {/* Table */}
      <div className="bg-white border border-[rgba(138,111,90,0.2)] rounded-sm shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-xs text-[#81756d]">
            No catalogue pieces match your query.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#efe7da]/60 text-[#705743] text-[10px] font-semibold tracking-archival uppercase border-b border-[rgba(138,111,90,0.18)]">
                <tr>
                  <th className="p-3.5">Piece</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Craft Hours</th>
                  <th className="p-3.5">Price</th>
                  <th className="p-3.5">Inscriptions</th>
                  <th className="p-3.5">Status Flag</th>
                  <th className="p-3.5 text-right">Storefront</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(138,111,90,0.12)]">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-[#fdf8f5] transition-colors">
                    <td className="p-3.5 flex items-center gap-3">
                      {p.image && (
                        <div className="w-12 h-14 relative bg-[#efe7da] rounded overflow-hidden flex-shrink-0 border border-[rgba(138,111,90,0.2)]">
                          <Image src={p.image} alt={p.name} fill className="object-cover" />
                        </div>
                      )}
                      <div>
                        <p className="font-editorial text-sm font-semibold text-[#1c1b1a]">
                          {p.name}
                        </p>
                        <p className="text-[10px] font-mono text-[#8a6f5a]">{p.refCode}</p>
                        <p className="text-[10.5px] text-[#81756d] truncate max-w-xs">{p.fiber}</p>
                      </div>
                    </td>
                    <td className="p-3.5">
                      <span className="uppercase text-[10px] font-semibold tracking-archival bg-[#efe7da] text-[#705743] px-2 py-0.5 rounded">
                        {p.category}
                      </span>
                    </td>
                    <td className="p-3.5 text-[#4f453e]">
                      <span className="font-editorial text-sm text-[#1c1b1a]">{p.craftHours}h</span> Handcraft
                    </td>
                    <td className="p-3.5 font-medium text-[#1c1b1a]">
                      ${p.priceUSD.toLocaleString()} USD
                    </td>
                    <td className="p-3.5 text-[#4f453e]">
                      {p.reviewsCount} review{p.reviewsCount !== 1 ? "s" : ""}
                    </td>
                    <td className="p-3.5">
                      <select
                        disabled={updatingId === p.id}
                        value={
                          p.status === "MADE_ON_DEMAND"
                            ? "Made on Demand"
                            : p.status === "IN_STOCK"
                            ? "In Stock"
                            : p.status === "LIMITED_EDITION"
                            ? "Limited Edition"
                            : p.status === "CAPSULE_PREVIEW"
                            ? "Capsule Preview"
                            : p.status
                        }
                        onChange={(e) =>
                          handleStatusUpdate(
                            p.id,
                            e.target.value as "Made on Demand" | "In Stock" | "Limited Edition" | "Capsule Preview"
                          )
                        }
                        className="bg-[#fdf8f5] border border-[rgba(138,111,90,0.25)] text-xs rounded-sm px-2 py-1 text-[#1c1b1a] focus:outline-none"
                      >
                        <option value="Made on Demand">Made on Demand</option>
                        <option value="In Stock">In Stock</option>
                        <option value="Limited Edition">Limited Edition</option>
                        <option value="Capsule Preview">Capsule Preview</option>
                      </select>
                    </td>
                    <td className="p-3.5 text-right">
                      <Link
                        href={`/product/${p.id}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#8a6f5a] hover:underline"
                      >
                        <span>View</span>
                        <ExternalLink size={12} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
