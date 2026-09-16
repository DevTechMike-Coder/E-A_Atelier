import { redirect } from "next/navigation";
import { Metadata } from "next";
import { isAdminAuthenticated } from "@/app/actions/adminAuth";
import { getAdminProductsList } from "@/app/actions/adminProducts";
import AdminProductsClient, { AdminProductItem } from "./AdminProductsClient";

export const metadata: Metadata = {
  title: "Catalogue Management — Studio Control | E&A Atelier",
  description: "Manage product status, prices, and catalogue availability.",
};

export default async function AdminProductsPage() {
  const isAuthed = await isAdminAuthenticated();
  if (!isAuthed) {
    redirect("/admin/login");
  }

  const products = await getAdminProductsList();

  return <AdminProductsClient initialProducts={products as AdminProductItem[]} />;
}
