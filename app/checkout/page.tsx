import { Metadata } from "next";
import CheckoutClient from "./CheckoutClient";

export const metadata: Metadata = {
  title: "Secure Checkout — Archival Batch Allocation | E&A Atelier",
  description:
    "Review your bespoke tote, configure carbon-neutral courier dispatch, and preserve your handcrafted heirloom in our Provence atelier register.",
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
