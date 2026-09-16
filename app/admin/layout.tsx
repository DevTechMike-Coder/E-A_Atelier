import React from "react";
import AdminChrome from "./AdminChrome";
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

  return <AdminChrome user={topBarUser}>{children}</AdminChrome>;
}
