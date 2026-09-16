"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import StudioMasterSidebar from "./StudioMasterSidebar";
import StudioMasterTopBar from "./StudioMasterTopBar";

interface AdminTopBarUser {
  name: string;
  email: string;
  avatarUrl: string | null;
}

/**
 * Client shell for the admin area. Owns the mobile off-canvas state so the
 * 256px StudioMasterSidebar no longer forces horizontal overflow on phones:
 * below lg it is translated off-screen and opened from the top bar burger.
 */
export default function AdminChrome({
  user,
  children,
}: {
  user: AdminTopBarUser | null;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close the drawer on route change (mobile nav taps) so the overlay does not
  // stay latched over the newly rendered page.
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    if (!sidebarOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [sidebarOpen]);

  // Escape closes the drawer.
  useEffect(() => {
    if (!sidebarOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen bg-[#faf6f0] text-[#1c1b1a] flex font-sans antialiased overflow-x-hidden">
      <StudioMasterSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Studio Viewport */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        <StudioMasterTopBar
          user={user}
          onMenuClick={() => setSidebarOpen(true)}
        />
        <main className="flex-1 w-full min-w-0">{children}</main>
      </div>
    </div>
  );
}
