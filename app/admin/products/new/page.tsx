import { redirect } from "next/navigation";
import { Metadata } from "next";
import { isAdminAuthenticated } from "@/app/actions/adminAuth";
import NewProductClient from "./NewProductClient";

export const metadata: Metadata = {
  title: "Inscribe New Heirloom — Studio Control | E&A Atelier",
  description: "Add a new handcrafted artisanal piece to the public atelier catalogue.",
};

export default async function NewProductPage() {
  const isAuthed = await isAdminAuthenticated();
  if (!isAuthed) {
    redirect("/admin/login");
  }

  return <NewProductClient />;
}
