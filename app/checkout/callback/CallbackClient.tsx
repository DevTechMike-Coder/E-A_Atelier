"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export default function CallbackClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");
  const [errorMessage, setErrorMessage] = useState("");

  const reference = searchParams.get("reference") || searchParams.get("trxref");
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    if (!reference) {
      setStatus("error");
      setErrorMessage("No transaction reference detected in callback.");
      return;
    }

    const verify = async () => {
      try {
        const res = await fetch("/api/checkout/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reference, orderId: orderId || reference.replace("EA_", "") }),
        });

        const data = await res.json();

        if (data.ok) {
          setStatus("success");
          setTimeout(() => {
            if (orderId) {
              router.push(`/order/${orderId}`);
            } else {
              router.push("/shop");
            }
          }, 1200);
        } else {
          setStatus("error");
          setErrorMessage(data.error || "Payment verification could not be confirmed.");
        }
      } catch {
        setStatus("error");
        setErrorMessage("Network error during payment verification.");
      }
    };

    verify();
  }, [reference, orderId, router]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 font-sans">
      <div className="max-w-md w-full bg-white border border-[rgba(138,111,90,0.25)] rounded-sm p-8 text-center space-y-5 shadow-lg">
        {status === "verifying" && (
          <>
            <Loader2 size={36} className="animate-spin text-[#8a6f5a] mx-auto" />
            <div className="space-y-1">
              <h2 className="font-editorial text-2xl text-[#1c1b1a]">
                Verifying Atelier Payment
              </h2>
              <p className="text-xs text-[#4f453e]">
                Authenticating transaction reference with payment gateway...
              </p>
            </div>
          </>
        )}

        {status === "success" && (
          <>
            <div className="w-12 h-12 rounded-full bg-[#efe7da] text-[#705743] flex items-center justify-center mx-auto">
              <CheckCircle2 size={28} />
            </div>
            <div className="space-y-1">
              <h2 className="font-editorial text-2xl text-[#1c1b1a]">
                Payment Confirmed
              </h2>
              <p className="text-xs text-[#4f453e]">
                Preserving receipt in atelier registry. Forwarding to order certificate...
              </p>
            </div>
          </>
        )}

        {status === "error" && (
          <>
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertCircle size={28} />
            </div>
            <div className="space-y-2">
              <h2 className="font-editorial text-2xl text-[#1c1b1a]">
                Verification Incomplete
              </h2>
              <p className="text-xs text-red-700">{errorMessage}</p>
            </div>
            <button
              onClick={() => router.push(orderId ? `/order/${orderId}` : "/shop")}
              className="mt-4 inline-block bg-[#242321] text-[#f8f4ed] px-6 py-2.5 text-xs font-semibold tracking-archival uppercase rounded-sm"
            >
              VIEW ORDER SUMMARY
            </button>
          </>
        )}
      </div>
    </div>
  );
}
