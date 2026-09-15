import Link from "next/link";
import { Compass, ArrowRight, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 font-sans">
      <div className="max-w-xl w-full text-center space-y-8">
        {/* Subtle Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#efe7da] border border-[rgba(138,111,90,0.22)] rounded-full text-[10.5px] font-semibold tracking-archival uppercase text-[#705743]">
          <Compass size={13} className="text-[#8a6f5a]" />
          <span>REFERENCE NOT LOCATED • ERROR 404</span>
        </div>

        {/* Editorial Heading */}
        <div className="space-y-3">
          <span className="font-editorial text-6xl sm:text-7xl md:text-8xl text-[#8a6f5a]/40 block select-none">
            404
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[#1c1b1a] tracking-tight">
            An Uncharted Knot in the Loom.
          </h1>
          <p className="text-sm sm:text-base text-[#4f453e] leading-relaxed max-w-md mx-auto pt-2">
            The archive reference or heirloom you are seeking has slipped through the warp, or the register entry has moved to another atelier catalogue.
          </p>
        </div>

        {/* Direct Action Pathways */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto bg-[#242321] text-[#f8f4ed] hover:bg-[#8a6f5a] px-7 py-3.5 text-xs font-semibold tracking-archival uppercase rounded-sm transition-colors shadow-sm text-center"
          >
            RETURN TO ATELIER HOME
          </Link>
          <Link
            href="/shop"
            className="w-full sm:w-auto bg-white border border-[rgba(138,111,90,0.3)] text-[#1c1b1a] hover:bg-[#f7f3ef] px-7 py-3.5 text-xs font-semibold tracking-archival uppercase rounded-sm transition-colors text-center inline-flex items-center justify-center gap-1.5"
          >
            <span>EXPLORE HEIRLOOMS</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        {/* Decorative provenance note */}
        <div className="pt-8 border-t border-[rgba(138,111,90,0.18)] max-w-sm mx-auto text-[11px] text-[#81756d] flex items-center justify-center gap-2">
          <Sparkles size={12} className="text-[#8a6f5a]" />
          <span>E&A Atelier • Saint-Rémy-de-Provence</span>
        </div>
      </div>
    </div>
  );
}
