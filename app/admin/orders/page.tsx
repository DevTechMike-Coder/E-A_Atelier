import { redirect } from "next/navigation";
import { Metadata } from "next";
import { isAdminAuthenticated } from "@/app/actions/adminAuth";
import { getAdminOrders } from "@/app/actions/adminOrders";
import OrdersLedgerClient, { OrderRow } from "./OrdersLedgerClient";

export const metadata: Metadata = {
  title: "Orders Ledger — Studio Control | E&A Atelier",
  description: "Fulfillment and order status management.",
};

export default async function AdminOrdersPage() {
  const isAuthed = await isAdminAuthenticated();
  if (!isAuthed) {
    redirect("/admin/login");
  }

  const orders = await getAdminOrders();

  return <OrdersLedgerClient initialOrders={orders as OrderRow[]} />;
}
