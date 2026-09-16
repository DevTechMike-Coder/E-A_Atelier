"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logoutAdmin } from "@/app/actions/adminAuth";
import { Bell, ChevronDown, Plus, LogOut, Sparkles, UserCircle2 } from "lucide-react";

interface AdminTopBarUser {
  name: string;
  email: string;
  avatarUrl: string | null;
}

export default function StudioMasterTopBar({ user }: { user: AdminTopBarUser | null }) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") return null;

  const handleLogout = async () => {
    await logoutAdmin();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <header className="h-16 bg-[#faf6f0] border-b border-[#e6dbc9] px-6 sm:px-8 flex items-center justify-between font-sans flex-shrink-0 select-none">
      
      {/* Left Info Pills */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-[#efe7da] border border-[#d8c8b4] rounded-sm text-xs text-[#3d2e24]">
          <span className="w-2 h-2 rounded-full bg-emerald-600" />
          <span className="font-medium">Spring Micro-Batch 04</span>
          <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded">
            ACTIVE
          </span>
        </div>

        <div className="text-xs text-[#705743] flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#e6dbc9] rounded-sm shadow-2xs">
          <span className="font-semibold text-[#1c1b1a]">16 Loom Hours</span>
          <span className="text-[#8a6f5a]">Remaining</span>
        </div>
      </div>

      {/* Right Controls & Profile */}
      <div className="flex items-center gap-3 sm:gap-4">
        
        {/* Currency Picker */}
        <div className="flex items-center gap-1 px-2.5 py-1 bg-white border border-[#e6dbc9] rounded-sm text-xs text-[#3d2e24] cursor-pointer hover:bg-[#faf6f0]">
          <span className="font-medium">EUR €</span>
          <ChevronDown size={12} className="text-[#8a6f5a]" />
        </div>

        {/* Notification Bell */}
        <button
          className="relative p-2 text-[#705743] hover:text-[#1c1b1a] bg-white border border-[#e6dbc9] rounded-sm hover:bg-[#faf6f0] transition-colors"
          aria-label="Notifications"
        >
          <Bell size={15} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-600 rounded-full" />
        </button>

        {/* New Commission Button */}
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-1.5 bg-[#5c4533] hover:bg-[#433123] text-white px-3.5 py-1.5 rounded-sm text-xs font-semibold tracking-archival uppercase transition-colors shadow-xs"
        >
          <Plus size={14} />
          <span className="hidden sm:inline">NEW COMMISSION</span>
          <span className="sm:hidden">NEW</span>
        </Link>

        {/* Authenticated Admin Profile - reflects whoever is actually logged in */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-[#e6dbc9]">
          <div className="w-8 h-8 rounded-full overflow-hidden relative border border-[#d8c8b4] bg-[#efe7da] flex-shrink-0 flex items-center justify-center">
            {user?.avatarUrl ? (
              <Image src={user.avatarUrl} alt={user.name} fill className="object-cover" />
            ) : (
              <UserCircle2 size={20} className="text-[#8a6f5a]" />
            )}
          </div>
          <div className="hidden lg:block text-left">
            <span className="text-xs font-semibold text-[#1c1b1a] block leading-tight">
              {user?.name || "Unknown Custodian"}
            </span>
            <span className="text-[10px] text-[#8a6f5a] block">
              {user?.email || "Not signed in"}
            </span>
          </div>
        </div>

        {/* Logout Exit */}
        <button
          onClick={handleLogout}
          className="text-[#9e8876] hover:text-[#1c1b1a] p-1.5 rounded transition-colors"
          title="Exit Studio"
        >
          <LogOut size={15} />
        </button>

      </div>

    </header>
  );
}
