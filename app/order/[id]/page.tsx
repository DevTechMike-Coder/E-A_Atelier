import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getOrderById } from "@/app/actions/orders";
import OrderConfirmationClient from "./OrderConfirmationClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Order #${id.slice(-8).toUpperCase()} — Archival Receipt | E&A Atelier`,
    description: "Official studio certificate and order reservation record for E&A Atelier.",
  };
}

export default async function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await getOrderById(id);

  if (!order) {
    notFound();
  }

  return <OrderConfirmationClient order={order} />;
}
