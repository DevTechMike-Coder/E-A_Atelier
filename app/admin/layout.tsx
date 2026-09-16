import React from "react";
import StudioMasterSidebar from "./StudioMasterSidebar";
import StudioMasterTopBar from "./StudioMasterTopBar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#faf6f0] text-[#1c1b1a] flex font-sans antialiased">
      {/* Fixed Left Sidebar */}
      <StudioMasterSidebar />

      {/* Main Studio Viewport */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        <StudioMasterTopBar />
        <main className="flex-1 w-full">{children}</main>
      </div>
    </div>
  );
}
