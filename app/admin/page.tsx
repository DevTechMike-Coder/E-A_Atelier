import { redirect } from "next/navigation";
import { Metadata } from "next";
import { isAdminAuthenticated } from "@/app/actions/adminAuth";
import { getAdminOverviewStats } from "@/app/actions/adminOrders";
import AdminDashboardClient from "./AdminDashboardClient";

export const metadata: Metadata = {
  title: "Owner Workshop Ledger — Studio Control | E&A Atelier",
  description: "Executive workshop administration and batch control.",
};

export default async function AdminOverviewPage() {
  const isAuthed = await isAdminAuthenticated();
  if (!isAuthed) {
    redirect("/admin/login");
  }

  const stats = await getAdminOverviewStats();

  return <AdminDashboardClient stats={stats} />;
}
