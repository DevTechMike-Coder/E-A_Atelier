"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, PRODUCTS, StitchAnatomy } from "../data/products";

export type Currency = "NGN" | "USD" | "EUR" | "GBP";

interface CurrencyConfig {
  code: Currency;
  symbol: string;
  rate: number; // relative to USD
  freeShippingThresholdUSD: number;
}

export const CURRENCIES: Record<Currency, CurrencyConfig> = {
  NGN: {
    code: "NGN",
    symbol: "₦",
    rate: 1500,
    freeShippingThresholdUSD: 300,
  },
  USD: {
    code: "USD",
    symbol: "$",
    rate: 1,
    freeShippingThresholdUSD: 300,
  },
  EUR: {
    code: "EUR",
    symbol: "€",
    rate: 0.92,
    freeShippingThresholdUSD: 300,
  },
  GBP: {
    code: "GBP",
    symbol: "£",
    rate: 0.79,
    freeShippingThresholdUSD: 300,
  },
};

export interface CartItem {
  id: string; // unique cart item id
  productId: string;
  product: Product;
  colorway: string;
  dimension: string;
  quantity: number;
  unitPriceUSD: number;
}

interface StoreContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (amountUSD: number) => string;
  cart: CartItem[];
  cartCount: number;
  subtotalUSD: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, colorway?: string, dimension?: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, qty: number) => void;
  freeShippingProgress: {
    eligible: boolean;
    remainingUSD: number;
    percent: number;
    thresholdUSD: number;
  };
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  wishlistCount: number;
  isBespokeOpen: boolean;
  setIsBespokeOpen: (open: boolean) => void;
  bespokeProduct: string | null;
  openBespokeModal: (productName?: string) => void;
  activeStitch: StitchAnatomy | null;
  openStitchModal: (stitch: StitchAnatomy) => void;
  closeStitchModal: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  // Default to NGN as per the user's explicit request for Nigerian customer
  const [currency, setCurrency] = useState<Currency>("NGN");

  // Cart initialized with initial demo item (The Luna Tote) matching the lookbook & screenshot
  const initialLuna = PRODUCTS[0];
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: "demo-luna-item",
      productId: initialLuna.id,
      product: initialLuna,
      colorway: "Desert Ecru",
      dimension: "Standard (38cm x 42cm)",
      quantity: 1,
      unitPriceUSD: 285,
    }
  ]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>(["solstice-bucket-hat", "sienna-vest"]);
  const [isBespokeOpen, setIsBespokeOpen] = useState(false);
  const [bespokeProduct, setBespokeProduct] = useState<string | null>(null);
  const [activeStitch, setActiveStitch] = useState<StitchAnatomy | null>(null);

  // Currency Formatter
  const formatPrice = (amountUSD: number): string => {
    const config = CURRENCIES[currency];
    const converted = amountUSD * config.rate;

    if (currency === "NGN") {
      return `₦${Math.round(converted).toLocaleString("en-NG")}`;
    }
    if (currency === "USD") {
      return `$${Math.round(converted).toLocaleString("en-US")}`;
    }
    if (currency === "EUR") {
      return `€${Math.round(converted).toLocaleString("de-DE")}`;
    }
    if (currency === "GBP") {
      return `£${Math.round(converted).toLocaleString("en-GB")}`;
    }
    return `$${amountUSD}`;
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotalUSD = cart.reduce((acc, item) => acc + item.unitPriceUSD * item.quantity, 0);

  const thresholdUSD = CURRENCIES[currency].freeShippingThresholdUSD;
  const remainingUSD = Math.max(0, thresholdUSD - subtotalUSD);
  const percent = Math.min(100, Math.round((subtotalUSD / thresholdUSD) * 100));

  const freeShippingProgress = {
    eligible: subtotalUSD >= thresholdUSD,
    remainingUSD,
    percent,
    thresholdUSD,
  };

  const addToCart = (
    product: Product,
    colorway?: string,
    dimension?: string,
    quantity = 1
  ) => {
    const selectedColor = colorway || product.colorways[0]?.name || "Natural";
    const selectedDim = dimension || product.dimensions[0] || "Standard";

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.productId === product.id &&
          item.colorway === selectedColor &&
          item.dimension === selectedDim
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        const newItem: CartItem = {
          id: `${product.id}-${Date.now()}`,
          productId: product.id,
          product,
          colorway: selectedColor,
          dimension: selectedDim,
          quantity,
          unitPriceUSD: product.priceUSD,
        };
        return [...prev, newItem];
      }
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: qty } : item))
    );
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const openBespokeModal = (productName?: string) => {
    setBespokeProduct(productName || null);
    setIsBespokeOpen(true);
  };

  const openStitchModal = (stitch: StitchAnatomy) => {
    setActiveStitch(stitch);
  };

  const closeStitchModal = () => {
    setActiveStitch(null);
  };

  return (
    <StoreContext.Provider
      value={{
        currency,
        setCurrency,
        formatPrice,
        cart,
        cartCount,
        subtotalUSD,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        freeShippingProgress,
        wishlist,
        toggleWishlist,
        isWishlisted,
        wishlistCount: wishlist.length,
        isBespokeOpen,
        setIsBespokeOpen,
        bespokeProduct,
        openBespokeModal,
        activeStitch,
        openStitchModal,
        closeStitchModal,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
