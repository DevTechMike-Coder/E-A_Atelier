import { redirect } from "next/navigation";
import { Metadata } from "next";
import { isAdminAuthenticated } from "@/app/actions/adminAuth";
import { getAdminPatrons } from "@/app/actions/adminPatrons";
import PatronVaultClient from "./PatronVaultClient";

export const metadata: Metadata = {
  title: "Patron Archival Vault — Sanctum Dossiers | E&A Atelier",
  description: "Custody register, live loom tracker, and tactile dossier.",
};

export default async function PatronVaultPage() {
  const isAuthed = await isAdminAuthenticated();
  if (!isAuthed) {
    redirect("/admin/login");
  }

  const patrons = await getAdminPatrons();

  return <PatronVaultClient initialPatrons={patrons} />;
}
