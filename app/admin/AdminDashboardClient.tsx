"use client";

import React from "react";
import Link from "next/link";
import {
  DollarSign,
  Package,
  Palette,
  Sparkles,
  PlusCircle,
  ArrowRight,
  TrendingUp,
  Clock,
  ShieldCheck,
} from "lucide-react";

interface OverviewStats {
  totalOrders: number;
  paidOrders: number;
  totalCommissions: number;
  pendingCommissions: number;
  productsCount: number;
  totalRevenueUSD: number;
  recentOrders: {
    id: string;
    customerName: string;
    customerEmail: string;
    currency: string;
    subtotalUSD: number;
    status: string;
    createdAt: string;
    itemsCount: number;
  }[];
}

export default function AdminDashboardClient({ stats }: { stats: OverviewStats }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 font-sans">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-[rgba(138,111,90,0.18)] pb-6">
        <div>
          <span className="text-[10px] font-semibold tracking-archival uppercase text-[#8a6f5a] block">
            WORKSHOP PULSE
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl text-[#1c1b1a] mt-1">
            Studio Executive Ledger
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 bg-[#8a6f5a] hover:bg-[#705743] text-white px-4 py-2.5 rounded-sm text-xs font-semibold tracking-archival uppercase transition-colors shadow-sm"
          >
            <PlusCircle size={14} />
            <span>INSCRIBE HEIRLOOM</span>
          </Link>
          <Link
            href="/shop"
            target="_blank"
            className="inline-flex items-center gap-1.5 bg-white border border-[rgba(138,111,90,0.3)] hover:bg-[#fdf8f5] text-[#1c1b1a] px-4 py-2.5 rounded-sm text-xs font-semibold tracking-archival uppercase transition-colors"
          >
            <span>LIVE ATELIER</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Revenue */}
        <div className="bg-white p-6 rounded-sm border border-[rgba(138,111,90,0.2)] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-[#81756d]">
            <span className="tracking-archival uppercase text-[10px] font-semibold">REVENUE REALIZED</span>
            <DollarSign size={16} className="text-[#8a6f5a]" />
          </div>
          <div className="font-editorial text-3xl text-[#1c1b1a]">
            ${stats.totalRevenueUSD.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </div>
          <p className="text-[11px] text-[#705743] flex items-center gap-1">
            <TrendingUp size={12} /> {stats.paidOrders} settled batch orders
          </p>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-6 rounded-sm border border-[rgba(138,111,90,0.2)] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-[#81756d]">
            <span className="tracking-archival uppercase text-[10px] font-semibold">ACTIVE BATCH ORDERS</span>
            <Package size={16} className="text-[#8a6f5a]" />
          </div>
          <div className="font-editorial text-3xl text-[#1c1b1a]">
            {stats.totalOrders}
          </div>
          <p className="text-[11px] text-[#81756d]">
            Total orders preserved in database
          </p>
        </div>

        {/* Pending Bespoke */}
        <div className="bg-white p-6 rounded-sm border border-[rgba(138,111,90,0.2)] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-[#81756d]">
            <span className="tracking-archival uppercase text-[10px] font-semibold">BESPOKE QUEUE</span>
            <Palette size={16} className="text-[#8a6f5a]" />
          </div>
          <div className="font-editorial text-3xl text-[#705743]">
            {stats.pendingCommissions}
          </div>
          <p className="text-[11px] text-[#81756d]">
            {stats.totalCommissions} total custom submissions
          </p>
        </div>

        {/* Catalogue Items */}
        <div className="bg-white p-6 rounded-sm border border-[rgba(138,111,90,0.2)] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-[#81756d]">
            <span className="tracking-archival uppercase text-[10px] font-semibold">CATALOGUE EDITIONS</span>
            <Sparkles size={16} className="text-[#8a6f5a]" />
          </div>
          <div className="font-editorial text-3xl text-[#1c1b1a]">
            {stats.productsCount}
          </div>
          <p className="text-[11px] text-[#81756d]">
            Curated pieces active on storefront
          </p>
        </div>

      </div>

      {/* Recent Orders Section */}
      <section className="bg-white border border-[rgba(138,111,90,0.2)] rounded-sm p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-[rgba(138,111,90,0.15)] pb-4">
          <div>
            <h2 className="font-editorial text-2xl text-[#1c1b1a]">
              Recent Batch Inscriptions
            </h2>
            <p className="text-xs text-[#4f453e]">
              Latest orders dispatched or awaiting tension calibration.
            </p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs font-semibold tracking-archival uppercase text-[#8a6f5a] hover:text-[#705743] inline-flex items-center gap-1"
          >
            <span>VIEW FULL LEDGER</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        {stats.recentOrders.length === 0 ? (
          <div className="text-center py-12 text-xs text-[#81756d]">
            No batch orders have been recorded in the atelier register yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#efe7da]/60 text-[#705743] text-[10px] font-semibold tracking-archival uppercase border-b border-[rgba(138,111,90,0.15)]">
                <tr>
                  <th className="p-3">Order Ref</th>
                  <th className="p-3">Collector</th>
                  <th className="p-3">Items</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Date</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(138,111,90,0.12)]">
                {stats.recentOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-[#fdf8f5] transition-colors">
                    <td className="p-3 font-mono font-medium text-[#1c1b1a]">
                      #EA-{o.id.slice(-8).toUpperCase()}
                    </td>
                    <td className="p-3">
                      <p className="font-semibold text-[#1c1b1a]">{o.customerName}</p>
                      <p className="text-[10.5px] text-[#81756d]">{o.customerEmail}</p>
                    </td>
                    <td className="p-3 text-[#4f453e]">
                      {o.itemsCount} piece{o.itemsCount !== 1 ? "s" : ""}
                    </td>
                    <td className="p-3 font-medium text-[#1c1b1a]">
                      ${o.subtotalUSD.toLocaleString()} USD
                    </td>
                    <td className="p-3">
                      <span
                        className={`text-[9px] font-bold tracking-archival uppercase px-2 py-0.5 rounded ${
                          o.status === "PAID"
                            ? "bg-emerald-100 text-emerald-800"
                            : o.status === "FULFILLED"
                            ? "bg-[#8a6f5a] text-white"
                            : o.status === "CANCELLED"
                            ? "bg-red-100 text-red-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {o.status}
                      </span>
                    </td>
                    <td className="p-3 text-[#81756d] text-[11px]">
                      {new Date(o.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="p-3 text-right">
                      <Link
                        href={`/order/${o.id}`}
                        target="_blank"
                        className="text-[11px] font-semibold text-[#8a6f5a] hover:underline"
                      >
                        Certificate &rarr;
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

    </div>
  );
}
