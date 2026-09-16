import { redirect } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { isAdminAuthenticated } from "@/app/actions/adminAuth";
import { getPatronUserId } from "@/lib/session";
import AdminLoginClient from "./AdminLoginClient";
import { ShieldAlert, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Owner Authentication — Atelier Terminal | E&A Atelier",
  description: "Secure gateway for atelier workshop custodians.",
};

export default async function AdminLoginPage() {
  const isAuthed = await isAdminAuthenticated();
  if (isAuthed) {
    redirect("/admin");
  }

  // A signed-in storefront patron has no business on the admin login screen
  // at all - block the page itself, not just credential submission. This
  // is a UX/defense-in-depth layer on top of the role-isolation checks in
  // app/actions/auth.ts, which already reject the underlying account from
  // ever becoming an admin.
  const patronId = await getPatronUserId();
  if (patronId) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 font-sans py-16">
        <div className="max-w-md w-full bg-white border border-[rgba(138,111,90,0.25)] rounded-sm p-8 sm:p-10 shadow-xl space-y-6 text-center">
          <div className="w-14 h-14 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto shadow-md">
            <ShieldAlert size={22} />
          </div>
          <div className="space-y-2">
            <span className="text-[10px] font-semibold tracking-archival uppercase text-[#8a6f5a] block">
              RESTRICTED ATELIER ACCESS
            </span>
            <h1 className="font-editorial text-2xl text-[#1c1b1a]">
              Admin Portal Unavailable
            </h1>
            <p className="text-xs text-[#4f453e] leading-relaxed">
              You&apos;re currently signed in to a storefront Patron account in this browser.
              Patron accounts cannot access the atelier admin portal. Head back to the
              storefront to continue browsing the collection.
            </p>
          </div>
          <Link
            href="/"
            className="w-full inline-flex items-center justify-center gap-2 bg-[#242321] text-[#f8f4ed] hover:bg-[#8a6f5a] py-3 text-xs font-semibold tracking-archival uppercase rounded-sm transition-colors shadow-md"
          >
            <ArrowLeft size={14} />
            RETURN TO THE STOREFRONT
          </Link>
        </div>
      </div>
    );
  }

  return <AdminLoginClient />;
}