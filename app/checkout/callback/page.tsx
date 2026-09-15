import { Suspense } from "react";
import CallbackClient from "./CallbackClient";
import { Loader2 } from "lucide-react";

export default function CheckoutCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] flex items-center justify-center">
          <Loader2 size={32} className="animate-spin text-[#8a6f5a]" />
        </div>
      }
    >
      <CallbackClient />
    </Suspense>
  );
}
