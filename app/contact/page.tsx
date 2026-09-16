import { Metadata } from "next";
import ContactConciergeClient from "./ContactConciergeClient";

export const metadata: Metadata = {
  title: "Atelier Concierge & Private Orders — E&A Atelier",
  description:
    "Initiate a conversation with master artisans Elena & Aurel for custom fiber palettes, bridal headwear, and bespoke architectural commissions.",
};

export default function ContactPage() {
  return <ContactConciergeClient />;
}
