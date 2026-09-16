"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { updateOrderStatus } from "@/app/actions/adminOrders";
import {
  Package,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
  ExternalLink,
  ChevronDown,
  Eye,
  MapPin,
  Mail,
  Loader2,
} from "lucide-react";

export interface OrderItemRow {
  id: string;
  productName: string;
  productImage: string;
  colorway: string;
  dimension: string;
  quantity: number;
  unitPriceUSD: number;
}

export interface OrderRow {
  id: string;
  customerName: string;
  customerEmail: string;
  currency: string;
  fxRate: number;
  subtotalUSD: number;
  status: "PENDING" | "PAID" | "FULFILLED" | "CANCELLED";
  shippingLine1: string;
  shippingLine2?: string | null;
  shippingCity: string;
  shippingRegion?: string | null;
  shippingPostal?: string | null;
  shippingCountry: string;
  createdAt: string;
  items: OrderItemRow[];
}

export default function OrdersLedgerClient({ initialOrders }: { initialOrders: OrderRow[] }) {
  const [orders, setOrders] = useState<OrderRow[]>(initialOrders);
  const [filter, setFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<OrderRow | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleStatusChange = async (
    orderId: string,
    newStatus: "PENDING" | "PAID" | "FULFILLED" | "CANCELLED"
  ) => {
    setUpdatingId(orderId);
    const res = await updateOrderStatus(orderId, newStatus);
    setUpdatingId(null);

    if (res.ok) {
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
    }
  };

  const filteredOrders = orders.filter((o) => {
    if (filter !== "ALL" && o.status !== filter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        o.id.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.customerEmail.toLowerCase().includes(q) ||
        o.shippingCountry.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-sans">
      
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-[rgba(138,111,90,0.18)] pb-6">
        <div>
          <span className="text-[10px] font-semibold tracking-archival uppercase text-[#8a6f5a] block">
            WORKSHOP FULFILLMENT
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl text-[#1c1b1a] mt-1">
            Batch Orders Ledger ({orders.length})
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {(["ALL", "PENDING", "PAID", "FULFILLED", "CANCELLED"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-sm text-xs font-semibold tracking-archival uppercase transition-colors ${
                filter === s
                  ? "bg-[#242321] text-white"
                  : "bg-white border border-[rgba(138,111,90,0.25)] text-[#4f453e] hover:bg-[#f7f3ef]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <input
          type="text"
          placeholder="Filter by customer, email, order ID, or country..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white border border-[rgba(138,111,90,0.25)] pl-9 pr-4 py-2 text-xs text-[#1c1b1a] rounded-sm focus:outline-none focus:border-[#8a6f5a]"
        />
        <Search size={14} className="absolute left-3 top-3 text-[#81756d]" />
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-[rgba(138,111,90,0.2)] rounded-sm shadow-sm overflow-hidden">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-16 text-xs text-[#81756d]">
            No orders match the active filter parameters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#efe7da]/60 text-[#705743] text-[10px] font-semibold tracking-archival uppercase border-b border-[rgba(138,111,90,0.18)]">
                <tr>
                  <th className="p-3.5">Reference</th>
                  <th className="p-3.5">Collector</th>
                  <th className="p-3.5">Destination</th>
                  <th className="p-3.5">Pieces</th>
                  <th className="p-3.5">Amount</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Change Status</th>
                  <th className="p-3.5 text-right">Certificate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(138,111,90,0.12)]">
                {filteredOrders.map((order) => {
                  const itemsCount = order.items.reduce((s, i) => s + i.quantity, 0);
                  const isUpdating = updatingId === order.id;

                  return (
                    <tr key={order.id} className="hover:bg-[#fdf8f5] transition-colors">
                      <td className="p-3.5 font-mono font-medium text-[#1c1b1a]">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="hover:text-[#8a6f5a] underline flex items-center gap-1 text-left"
                        >
                          #EA-{order.id.slice(-8).toUpperCase()}
                        </button>
                      </td>
                      <td className="p-3.5">
                        <p className="font-semibold text-[#1c1b1a]">{order.customerName}</p>
                        <p className="text-[10.5px] text-[#81756d]">{order.customerEmail}</p>
                      </td>
                      <td className="p-3.5 text-[#4f453e]">
                        <p className="font-medium text-[#1c1b1a]">{order.shippingCountry}</p>
                        <p className="text-[10.5px] text-[#81756d]">{order.shippingCity}</p>
                      </td>
                      <td className="p-3.5">
                        <span className="font-mono">{itemsCount}</span> heirloom{itemsCount !== 1 ? "s" : ""}
                      </td>
                      <td className="p-3.5 font-medium text-[#1c1b1a]">
                        ${order.subtotalUSD.toLocaleString()} {order.currency}
                      </td>
                      <td className="p-3.5">
                        <span
                          className={`text-[9px] font-bold tracking-archival uppercase px-2 py-0.5 rounded ${
                            order.status === "PAID"
                              ? "bg-emerald-100 text-emerald-800"
                              : order.status === "FULFILLED"
                              ? "bg-[#8a6f5a] text-white"
                              : order.status === "CANCELLED"
                              ? "bg-red-100 text-red-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <select
                          disabled={isUpdating}
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(
                              order.id,
                              e.target.value as "PENDING" | "PAID" | "FULFILLED" | "CANCELLED"
                            )
                          }
                          className="bg-[#fdf8f5] border border-[rgba(138,111,90,0.25)] text-xs rounded-sm px-2 py-1 text-[#1c1b1a] focus:outline-none"
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="PAID">PAID</option>
                          <option value="FULFILLED">FULFILLED</option>
                          <option value="CANCELLED">CANCELLED</option>
                        </select>
                      </td>
                      <td className="p-3.5 text-right">
                        <Link
                          href={`/order/${order.id}`}
                          target="_blank"
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#8a6f5a] hover:underline"
                        >
                          <span>View</span>
                          <ExternalLink size={12} />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Inspector Drawer */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-[#fdf8f5] border border-[rgba(138,111,90,0.3)] rounded-sm max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-start justify-between border-b border-[rgba(138,111,90,0.18)] pb-4">
              <div>
                <span className="text-[10px] font-semibold tracking-archival uppercase text-[#8a6f5a] block">
                  ORDER SPECIFICATION
                </span>
                <h3 className="font-editorial text-2xl text-[#1c1b1a]">
                  #EA-{selectedOrder.id.slice(-8).toUpperCase()}
                </h3>
                <p className="text-xs text-[#81756d]">
                  Recorded on {new Date(selectedOrder.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-xs font-semibold tracking-archival uppercase text-[#81756d] hover:text-[#1c1b1a]"
              >
                CLOSE [×]
              </button>
            </div>

            {/* Destination Card */}
            <div className="bg-white p-4 border border-[rgba(138,111,90,0.2)] rounded-sm text-xs space-y-1">
              <p className="font-semibold text-sm text-[#1c1b1a]">{selectedOrder.customerName}</p>
              <p>{selectedOrder.shippingLine1}</p>
              {selectedOrder.shippingLine2 && <p>{selectedOrder.shippingLine2}</p>}
              <p>
                {selectedOrder.shippingCity}
                {selectedOrder.shippingRegion ? `, ${selectedOrder.shippingRegion}` : ""}{" "}
                {selectedOrder.shippingPostal || ""}
              </p>
              <p className="font-medium text-[#705743]">{selectedOrder.shippingCountry}</p>
              <p className="text-[11px] text-[#81756d] pt-1">{selectedOrder.customerEmail}</p>
            </div>

            {/* Line items */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold tracking-archival uppercase text-[#8a6f5a]">
                Allocated Heirlooms
              </h4>
              <div className="space-y-2">
                {selectedOrder.items.map((i) => (
                  <div
                    key={i.id}
                    className="bg-white p-3 border border-[rgba(138,111,90,0.15)] rounded-sm flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-3">
                      {i.productImage && (
                        <div className="w-10 h-12 relative bg-[#efe7da] rounded overflow-hidden flex-shrink-0">
                          <Image src={i.productImage} alt={i.productName} fill className="object-cover" />
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-[#1c1b1a]">{i.productName}</p>
                        <p className="text-[11px] text-[#81756d]">
                          Color: {i.colorway} • Size: {i.dimension} • Qty: {i.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="font-semibold text-[#1c1b1a]">
                      ${(i.unitPriceUSD * i.quantity).toLocaleString()} USD
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Status Changer Footer */}
            <div className="pt-4 border-t border-[rgba(138,111,90,0.18)] flex items-center justify-between">
              <span className="text-xs text-[#81756d]">
                Current status: <strong className="text-[#1c1b1a]">{selectedOrder.status}</strong>
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleStatusChange(selectedOrder.id, "PAID")}
                  className="px-3 py-1.5 bg-emerald-700 text-white rounded-sm text-xs font-semibold uppercase"
                >
                  Mark Paid
                </button>
                <button
                  onClick={() => handleStatusChange(selectedOrder.id, "FULFILLED")}
                  className="px-3 py-1.5 bg-[#8a6f5a] text-white rounded-sm text-xs font-semibold uppercase"
                >
                  Mark Fulfilled
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
