import React from "react";
import AdminChrome from "./AdminChrome";
import { getCurrentAdminUser } from "@/app/actions/adminAuth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adminUser = await getCurrentAdminUser();

  // If not authenticated as admin (e.g. on /admin/login or before redirect),
  // do NOT mount AdminChrome / StudioMasterSidebar / TopBar to prevent any
  // momentary flash of the restricted admin portal shell.
  if (!adminUser) {
    return <div className="min-h-screen bg-[#faf6f0]">{children}</div>;
  }

  const topBarUser = {
    name: adminUser.name || adminUser.email,
    email: adminUser.email,
    avatarUrl: adminUser.avatarUrl,
  };

  return <AdminChrome user={topBarUser}>{children}</AdminChrome>;
}
