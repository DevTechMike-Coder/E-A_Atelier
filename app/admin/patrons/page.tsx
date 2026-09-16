import { Metadata } from "next";
import PatronVaultClient from "./PatronVaultClient";

export const metadata: Metadata = {
  title: "Patron Archival Vault — Camille d'Orsay | E&A Atelier",
  description: "Custody register, live loom tracker, and tactile dossier.",
};

export default function PatronVaultPage() {
  return <PatronVaultClient />;
}
