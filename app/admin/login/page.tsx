import { Metadata } from "next";
import AdminLoginClient from "./AdminLoginClient";

export const metadata: Metadata = {
  title: "Owner Authentication — Atelier Terminal | E&A Atelier",
  description: "Secure gateway for atelier workshop custodians.",
};

export default function AdminLoginPage() {
  return <AdminLoginClient />;
}
