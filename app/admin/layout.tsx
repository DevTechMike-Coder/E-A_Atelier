import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/app/actions/adminAuth";
import AdminHeader from "./AdminHeader";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthed = await isAdminAuthenticated();

  // If not authenticated, the subpages should redirect, but we can't redirect if already on login.
  // Next.js layout runs for all nested routes. In server components, we can check headers/cookies.
  // Note: if user is on /admin/login, we allow rendering. But if not on login, redirect.
  // In Next.js App Router, headers() gives the current URL or x-invoke-path.
  // An even cleaner pattern: we check authentication in the layout, but if not authed, wrap with a check.

  return (
    <div className="min-h-screen bg-[#f7f3ef] text-[#1c1b1a] flex flex-col font-sans">
      <AdminHeader />
      <main className="flex-1 w-full">{children}</main>
    </div>
  );
}
