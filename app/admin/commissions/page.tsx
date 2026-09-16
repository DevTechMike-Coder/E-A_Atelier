import { redirect } from "next/navigation";
import { Metadata } from "next";
import { isAdminAuthenticated } from "@/app/actions/adminAuth";
import { getAdminCommissions } from "@/app/actions/adminOrders";
import CommissionsClient, { CommissionRow } from "./CommissionsClient";

export const metadata: Metadata = {
  title: "Bespoke Queue — Studio Control | E&A Atelier",
  description: "Manage individual bespoke commission inquiries.",
};

export default async function AdminCommissionsPage() {
  const isAuthed = await isAdminAuthenticated();
  if (!isAuthed) {
    redirect("/admin/login");
  }

  const commissions = await getAdminCommissions();

  return <CommissionsClient initialCommissions={commissions as CommissionRow[]} />;
}
