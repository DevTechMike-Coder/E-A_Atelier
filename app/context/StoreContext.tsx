"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, StitchAnatomy } from "../data/products";
import { getCurrentPatronUser, logoutPatronUser } from "@/app/actions/auth";

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
  clearCart: () => void;
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
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isBespokeOpen: boolean;
  setIsBespokeOpen: (open: boolean) => void;
  bespokeProduct: string | null;
  openBespokeModal: (productName?: string) => void;
  activeStitch: StitchAnatomy | null;
  openStitchModal: (stitch: StitchAnatomy) => void;
  closeStitchModal: () => void;
  // Patron User session
  patronUser: any;
  setPatronUser: (user: any) => void;
  refreshPatronSession: () => Promise<void>;
  logoutPatron: () => Promise<void>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  // Default to NGN as per the user's explicit request for Nigerian customer
  const [currency, setCurrency] = useState<Currency>("NGN");

  // Cart starts clean and empty — no hard-coded items
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Wishlist starts clean and empty — no hard-coded items
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  const [isBespokeOpen, setIsBespokeOpen] = useState(false);
  const [bespokeProduct, setBespokeProduct] = useState<string | null>(null);
  const [activeStitch, setActiveStitch] = useState<StitchAnatomy | null>(null);

  // Patron user session state
  const [patronUser, setPatronUser] = useState<any>(null);

  const refreshPatronSession = async () => {
    try {
      const user = await getCurrentPatronUser();
      setPatronUser(user);
    } catch {
      setPatronUser(null);
    }
  };

  const logoutPatron = async () => {
    await logoutPatronUser();
    setPatronUser(null);
  };

  // Hydrate from localStorage on client mount if available & check patron session
  useEffect(() => {
    refreshPatronSession();
    try {
      const savedCart = localStorage.getItem("ea_atelier_cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      const savedWishlist = localStorage.getItem("ea_atelier_wishlist");
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
      const savedCurrency = localStorage.getItem("ea_atelier_currency");
      if (savedCurrency && (savedCurrency in CURRENCIES)) {
        setCurrency(savedCurrency as Currency);
      }
    } catch {
      // LocalStorage unavailable in SSR or private mode
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("ea_atelier_cart", JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem("ea_atelier_wishlist", JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem("ea_atelier_currency", currency);
    } catch {}
  }, [currency]);

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
    eligible: subtotalUSD >= thresholdUSD && subtotalUSD > 0,
    remainingUSD,
    percent: subtotalUSD > 0 ? percent : 0,
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

  const clearCart = () => {
    setCart([]);
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
        clearCart,
        freeShippingProgress,
        wishlist,
        toggleWishlist,
        isWishlisted,
        wishlistCount: wishlist.length,
        isWishlistOpen,
        setIsWishlistOpen,
        isBespokeOpen,
        setIsBespokeOpen,
        bespokeProduct,
        openBespokeModal,
        activeStitch,
        openStitchModal,
        closeStitchModal,
        patronUser,
        setPatronUser,
        refreshPatronSession,
        logoutPatron,
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
