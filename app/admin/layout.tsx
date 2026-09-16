import React from "react";
import StudioMasterSidebar from "./StudioMasterSidebar";
import StudioMasterTopBar from "./StudioMasterTopBar";
import { getCurrentAdminUser } from "@/app/actions/adminAuth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Resolve the actual authenticated admin from the signed session (re-checked
  // against the database) instead of hardcoding a name/avatar in the top bar.
  // This is null pre-login (e.g. on /admin/login), which StudioMasterTopBar
  // handles by not rendering the profile pill at all.
  const adminUser = await getCurrentAdminUser();
  const topBarUser = adminUser
    ? {
        name: adminUser.name || adminUser.email,
        email: adminUser.email,
        avatarUrl: adminUser.avatarUrl,
      }
    : null;

  return (
    <div className="min-h-screen bg-[#faf6f0] text-[#1c1b1a] flex font-sans antialiased">
      {/* Fixed Left Sidebar */}
      <StudioMasterSidebar />

      {/* Main Studio Viewport */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        <StudioMasterTopBar user={topBarUser} />
        <main className="flex-1 w-full">{children}</main>
      </div>
    </div>
  );
}
