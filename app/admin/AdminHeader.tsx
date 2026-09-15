"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logoutAdmin } from "@/app/actions/adminAuth";
import {
  Package,
  Layers,
  Sparkles,
  LogOut,
  PlusCircle,
  FileSpreadsheet,
  Palette,
} from "lucide-react";

export default function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();

  // Don't render admin nav bar on the login page
  if (pathname === "/admin/login") return null;

  const handleLogout = async () => {
    await logoutAdmin();
    router.push("/admin/login");
    router.refresh();
  };

  const navLinks = [
    { label: "Overview", href: "/admin", icon: Layers },
    { label: "Orders Ledger", href: "/admin/orders", icon: Package },
    { label: "Bespoke Commissions", href: "/admin/commissions", icon: Palette },
    { label: "Catalogue Products", href: "/admin/products", icon: FileSpreadsheet },
  ];

  return (
    <header className="bg-[#242321] text-[#f8f4ed] border-b border-[#383431] font-sans sticky top-0 z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand / Crest */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#8a6f5a] text-white flex items-center justify-center font-editorial font-bold text-sm shadow-inner">
              EA
            </div>
            <div>
              <span className="font-editorial text-lg tracking-wide text-white block leading-tight">
                E&A ATELIER
              </span>
              <span className="text-[9px] tracking-archival uppercase text-[#d8c8b5] font-semibold">
                OWNER WORKSHOP CONTROL
              </span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-semibold tracking-archival uppercase transition-colors ${
                    isActive
                      ? "bg-[#8a6f5a] text-white"
                      : "text-[#d8c8b5]/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Icon size={14} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/admin/products/new"
              className="inline-flex items-center gap-1.5 bg-[#8a6f5a] hover:bg-[#705743] text-white px-3.5 py-1.5 rounded-sm text-xs font-semibold tracking-archival uppercase transition-colors shadow-sm"
            >
              <PlusCircle size={14} />
              <span className="hidden sm:inline">INSCRIBE NEW HEIRLOOM</span>
              <span className="sm:hidden">NEW</span>
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1 text-[#d8c8b5]/70 hover:text-white p-2 rounded hover:bg-white/10 transition-colors text-xs"
              title="Exit Studio"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline text-[10.5px] uppercase font-semibold">Exit</span>
            </button>
          </div>

        </div>

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden overflow-x-auto py-2 gap-2 border-t border-[#383431]">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-sm text-[10.5px] font-semibold tracking-archival uppercase whitespace-nowrap ${
                  isActive
                    ? "bg-[#8a6f5a] text-white"
                    : "text-[#d8c8b5]/80 hover:text-white"
                }`}
              >
                <Icon size={12} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

      </div>
    </header>
  );
}
