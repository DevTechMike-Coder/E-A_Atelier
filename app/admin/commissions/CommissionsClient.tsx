"use client";

import React, { useState } from "react";
import { updateCommissionStatus } from "@/app/actions/adminOrders";
import { Palette, Mail, Clock, CheckCircle2, Calendar } from "lucide-react";

export interface CommissionRow {
  id: string;
  referenceCode: string;
  name: string;
  email: string;
  productName?: string | null;
  palette: string;
  notes?: string | null;
  status: "PENDING" | "REVIEWED" | "SCHEDULED" | "COMPLETED";
  createdAt: string;
}

export default function CommissionsClient({
  initialCommissions,
}: {
  initialCommissions: CommissionRow[];
}) {
  const [commissions, setCommissions] = useState<CommissionRow[]>(initialCommissions);
  const [filter, setFilter] = useState<string>("ALL");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleStatusChange = async (
    id: string,
    newStatus: "PENDING" | "REVIEWED" | "SCHEDULED" | "COMPLETED"
  ) => {
    setUpdatingId(id);
    const res = await updateCommissionStatus(id, newStatus);
    setUpdatingId(null);

    if (res.ok) {
      setCommissions((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
      );
    }
  };

  const filtered = commissions.filter((c) => {
    if (filter !== "ALL" && c.status !== filter) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-sans">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-[rgba(138,111,90,0.18)] pb-6">
        <div>
          <span className="text-[10px] font-semibold tracking-archival uppercase text-[#8a6f5a] block">
            INDIVIDUAL TAILORING
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl text-[#1c1b1a] mt-1">
            Bespoke Inquiries Queue ({commissions.length})
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {(["ALL", "PENDING", "REVIEWED", "SCHEDULED", "COMPLETED"] as const).map((s) => (
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

      {/* Table */}
      <div className="bg-white border border-[rgba(138,111,90,0.2)] rounded-sm shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-xs text-[#81756d]">
            No bespoke inquiries in this category.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#efe7da]/60 text-[#705743] text-[10px] font-semibold tracking-archival uppercase border-b border-[rgba(138,111,90,0.18)]">
                <tr>
                  <th className="p-3.5">Ref Code</th>
                  <th className="p-3.5">Patron</th>
                  <th className="p-3.5">Piece Desired</th>
                  <th className="p-3.5">Palette</th>
                  <th className="p-3.5">Client Notes</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Update Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(138,111,90,0.12)]">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-[#fdf8f5] transition-colors">
                    <td className="p-3.5 font-mono text-[#8a6f5a] font-medium">
                      #{c.referenceCode.slice(-6).toUpperCase()}
                    </td>
                    <td className="p-3.5">
                      <p className="font-semibold text-[#1c1b1a]">{c.name}</p>
                      <a href={`mailto:${c.email}`} className="text-[10.5px] text-[#81756d] hover:underline flex items-center gap-1">
                        <Mail size={10} /> {c.email}
                      </a>
                    </td>
                    <td className="p-3.5 text-[#4f453e]">
                      {c.productName || "Haute-Couture Commission"}
                    </td>
                    <td className="p-3.5">
                      <span className="inline-block bg-[#efe7da] px-2 py-0.5 rounded text-[10px] font-medium text-[#705743]">
                        {c.palette}
                      </span>
                    </td>
                    <td className="p-3.5 max-w-xs text-[#4f453e] text-[11px] leading-relaxed">
                      {c.notes || "—"}
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`text-[9px] font-bold tracking-archival uppercase px-2 py-0.5 rounded ${
                          c.status === "COMPLETED"
                            ? "bg-emerald-100 text-emerald-800"
                            : c.status === "SCHEDULED"
                            ? "bg-blue-100 text-blue-800"
                            : c.status === "REVIEWED"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <select
                        disabled={updatingId === c.id}
                        value={c.status}
                        onChange={(e) =>
                          handleStatusChange(
                            c.id,
                            e.target.value as "PENDING" | "REVIEWED" | "SCHEDULED" | "COMPLETED"
                          )
                        }
                        className="bg-[#fdf8f5] border border-[rgba(138,111,90,0.25)] text-xs rounded-sm px-2 py-1 text-[#1c1b1a] focus:outline-none"
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="REVIEWED">REVIEWED</option>
                        <option value="SCHEDULED">SCHEDULED</option>
                        <option value="COMPLETED">COMPLETED</option>
                      </select>
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
