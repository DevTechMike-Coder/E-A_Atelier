"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Package,
  Palette,
  Layers,
  Sparkles,
  ExternalLink,
  Hourglass,
  X,
  Users,
  CircleDollarSign,
  Settings,
  Scissors,
  Bookmark,
  type LucideIcon,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  exact?: boolean;
  badge?: string;
  external?: boolean;
}

interface NavSection {
  group: string;
  links: NavItem[];
}

interface StudioMasterSidebarProps {
  /** Mobile drawer state - ignored at lg+ where the rail is always docked. */
  open?: boolean;
  onClose?: () => void;
}

export default function StudioMasterSidebar({
  open = false,
  onClose,
}: StudioMasterSidebarProps) {
  const pathname = usePathname();

  // Hide sidebar on login page
  if (pathname === "/admin/login") return null;

  const sections: NavSection[] = [
    {
      group: "ATELIER OPS",
      links: [
        { label: "Atelier Pulse", href: "/admin", icon: Activity, exact: true },
        { label: "Orders & Dispatch", href: "/admin/orders", icon: Package, badge: "4" },
        { label: "Bespoke Commissions", href: "/admin/commissions", icon: Palette, badge: "6" },
        { label: "Loom Queue & Works", href: "/admin/patrons", icon: Scissors },
      ],
    },
    {
      group: "INVENTORY & MATERIAL",
      links: [
        { label: "Catalog & Batches", href: "/admin/products", icon: Layers },
        { label: "Fiber Provenance", href: "/admin/products", icon: Sparkles },
      ],
    },
    {
      group: "COMMERCE & PATRONS",
      links: [
        { label: "Patrons & Tier", href: "/admin/patrons", icon: Users },
        { label: "Financials & Costing", href: "/admin", icon: CircleDollarSign },
      ],
    },
    {
      group: "ATELIER SYSTEM",
      links: [
        { label: "Studio Settings", href: "/admin", icon: Settings },
        { label: "View Live Storefront", href: "/", icon: ExternalLink, external: true },
      ],
    },
  ];

  return (
    <>
      {/* Mobile scrim */}
      <div
        onClick={onClose}
        aria-hidden={!open}
        className={`fixed inset-0 z-40 bg-[#1c1b1a]/45 backdrop-blur-[2px] lg:hidden transition-opacity duration-200 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      <aside
        className={`w-64 max-w-[82vw] bg-[#f5efe6] border-r border-[#e3d7c5] flex flex-col justify-between flex-shrink-0 select-none font-sans
          fixed inset-y-0 left-0 z-50 overflow-y-auto overscroll-contain shadow-2xl
          transform transition-transform duration-200 ease-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:static lg:translate-x-0 lg:z-auto lg:shadow-none lg:min-h-screen lg:max-w-none`}
      >
      <div className="relative p-5 space-y-6">

        {/* Mobile close */}
        <button
          type="button"
          onClick={onClose}
          className="lg:hidden absolute top-4 right-3 p-1.5 text-[#8a6f5a] hover:text-[#1c1b1a] rounded-sm hover:bg-[#ede4d5] transition-colors"
          aria-label="Close navigation"
        >
          <X size={18} />
        </button>
        
        {/* Brand Crest */}
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#3d2e24] text-[#f5efe6] flex items-center justify-center font-editorial font-bold text-sm shadow-inner">
              EA
            </div>
            <div>
              <span className="font-editorial text-xl tracking-tight text-[#1c1b1a] block leading-none">
                E&A Atelier
              </span>
              <span className="text-[9px] tracking-[0.2em] uppercase font-semibold text-[#8a6f5a] block mt-0.5">
                STUDIO MASTER
              </span>
            </div>
          </div>

          {/* Active Batch Indicator */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#ede4d5] border border-[#dacbb7] rounded-sm text-[11px] text-[#4f453e]">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span className="font-medium text-[#2d251e]">Spring Micro-Batch 04</span>
          </div>
        </div>

        {/* Navigation Sections */}
        <nav className="space-y-5 pt-1">
          {sections.map((sec) => (
            <div key={sec.group} className="space-y-1">
              <span className="text-[9.5px] font-bold tracking-[0.18em] uppercase text-[#9e8876] block px-2.5 mb-1.5">
                {sec.group}
              </span>
              <div className="space-y-0.5">
                {sec.links.map((item) => {
                  const Icon = item.icon;
                  const isActive = item.exact
                    ? pathname === item.href
                    : pathname.startsWith(item.href) && item.href !== "/admin";

                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      onClick={onClose}
                      className={`flex items-center justify-between px-2.5 py-1.5 rounded-sm text-xs transition-colors ${
                        isActive
                          ? "bg-[#e5d5c0] text-[#1c1b1a] font-medium shadow-xs"
                          : "text-[#594d42] hover:bg-[#ede4d5] hover:text-[#1c1b1a]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon size={14} className={isActive ? "text-[#705743]" : "text-[#8a6f5a]"} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${
                            item.badge === "4"
                              ? "bg-[#dacbb7] text-[#3d2e24]"
                              : "bg-[#705743] text-white"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Bottom Batch Capacity Widget */}
      <div className="p-4 m-3 bg-[#ede4d5] border border-[#dacbb7] rounded-sm space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#2d251e]">
          <Hourglass size={14} className="text-[#8a6f5a]" />
          <span>16 Loom Hrs Left</span>
        </div>
        <div className="w-full bg-[#dacbb7] h-1.5 rounded-full overflow-hidden">
          <div className="bg-[#705743] h-full rounded-full" style={{ width: "82%" }} />
        </div>
        <div className="flex justify-between text-[10px] text-[#705743]">
          <span>Batch Capacity</span>
          <span className="font-semibold">82%</span>
        </div>
      </div>
      </aside>
    </>
  );
}