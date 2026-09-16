import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "./context/StoreContext";
import StorefrontChrome from "./components/StorefrontChrome";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "E&A ATELIER — Artisanal Studio | Handcrafted Luxury Crochet & Heirlooms",
  description:
    "Slow luxury studio creating hand-looped crochet heirlooms, tactile artifacts, and artisanal wearable sculptures designed to age with deliberate grace in Provence.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jakarta.variable} scroll-smooth`}
    >
      <body className="min-h-screen w-full overflow-x-hidden flex flex-col bg-[#fdf8f5] text-[#1c1b1a] antialiased">
        <StoreProvider>
          <StorefrontChrome>{children}</StorefrontChrome>
        </StoreProvider>
      </body>
    </html>
  );
}
