import { redirect } from "next/navigation";
import { Metadata } from "next";
import { isAdminAuthenticated } from "@/app/actions/adminAuth";
import AdminLoginClient from "./AdminLoginClient";

export const metadata: Metadata = {
  title: "Owner Authentication — Atelier Terminal | E&A Atelier",
  description: "Secure gateway for atelier workshop custodians.",
};

export default async function AdminLoginPage() {
  const isAuthed = await isAdminAuthenticated();
  if (isAuthed) {
    redirect("/admin");
  }

  return <AdminLoginClient />;
}
