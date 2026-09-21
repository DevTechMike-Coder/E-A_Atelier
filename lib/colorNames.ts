/**
 * Atelier Curated Colorway & Natural Botanical Palette Naming Utility
 * Maps any RGB / HEX value to the closest descriptive natural dye name.
 */

interface AtelierColor {
  name: string;
  hex: string;
  r: number;
  g: number;
  b: number;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  let clean = hex.replace("#", "").trim();
  if (clean.length === 3) {
    clean = clean
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const num = parseInt(clean, 16);
  if (isNaN(num)) return { r: 138, g: 111, b: 90 };
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

// Curated artisan natural dye & fiber palette
const ATELIER_PALETTE: AtelierColor[] = [
  { name: "Unbleached Ecru", hex: "#efe7da", ...hexToRgb("#efe7da") },
  { name: "Raw Belgian Flax", hex: "#e5ded4", ...hexToRgb("#e5ded4") },
  { name: "Oatmeal Linen", hex: "#dfd7ca", ...hexToRgb("#dfd7ca") },
  { name: "Alum Bone", hex: "#f5f0e8", ...hexToRgb("#f5f0e8") },
  { name: "Chalk White", hex: "#faf7f2", ...hexToRgb("#faf7f2") },
  { name: "Pure Ivory", hex: "#ffffff", ...hexToRgb("#ffffff") },
  
  // Earth & Clay & Madder
  { name: "Madder Terracotta", hex: "#8a6f5a", ...hexToRgb("#8a6f5a") },
  { name: "Sienna Clay", hex: "#9b5a3c", ...hexToRgb("#9b5a3c") },
  { name: "Provence Rust", hex: "#b4532a", ...hexToRgb("#b4532a") },
  { name: "Burnt Ochre", hex: "#c26d38", ...hexToRgb("#c26d38") },
  { name: "Golden Sand", hex: "#d4a359", ...hexToRgb("#d4a359") },
  { name: "Desert Dune", hex: "#c8b093", ...hexToRgb("#c8b093") },
  { name: "Caramel Twill", hex: "#af7a48", ...hexToRgb("#af7a48") },

  // Walnut & Wood & Bark
  { name: "French Walnut", hex: "#5c4533", ...hexToRgb("#5c4533") },
  { name: "Roasted Chestnut", hex: "#433123", ...hexToRgb("#433123") },
  { name: "Espresso Bark", hex: "#2f2219", ...hexToRgb("#2f2219") },
  { name: "Charcoal Slate", hex: "#2b2927", ...hexToRgb("#2b2927") },
  { name: "Atelier Noir", hex: "#1c1b1a", ...hexToRgb("#1c1b1a") },

  // Botanicals & Flora & Greens
  { name: "Provence Sage", hex: "#8c9986", ...hexToRgb("#8c9986") },
  { name: "Wild Olive", hex: "#5f6b4d", ...hexToRgb("#5f6b4d") },
  { name: "Forest Moss", hex: "#475239", ...hexToRgb("#475239") },
  { name: "Eucalyptus Mist", hex: "#a4b5a0", ...hexToRgb("#a4b5a0") },

  // Mineral & Sky & Indigo
  { name: "Wild Indigo", hex: "#3b4d61", ...hexToRgb("#3b4d61") },
  { name: "Deep Navy Woad", hex: "#232f3e", ...hexToRgb("#232f3e") },
  { name: "Coastal Mist", hex: "#8ea4b2", ...hexToRgb("#8ea4b2") },
  { name: "Slate Mineral", hex: "#5a6872", ...hexToRgb("#5a6872") },

  // Petals & Berries & Madder Rose
  { name: "Elderberry Rose", hex: "#a6686e", ...hexToRgb("#a6686e") },
  { name: "Dried Blush", hex: "#c4928f", ...hexToRgb("#c4928f") },
  { name: "Wild Plum", hex: "#633d4e", ...hexToRgb("#633d4e") },
  { name: "Alabaster Peach", hex: "#eed2be", ...hexToRgb("#eed2be") },
];

/**
 * Returns the nearest atelier color name for a given hex code.
 * Uses Euclidean color difference in RGB space with human perception weights.
 */
export function getClosestColorName(hex: string): string {
  if (!hex) return "Natural";
  const { r, g, b } = hexToRgb(hex);

  let closestName = "Natural Shade";
  let minDistance = Infinity;

  for (const color of ATELIER_PALETTE) {
    // Weighted Euclidean distance (Redmean metric for better human eye approximation)
    const rMean = (r + color.r) / 2;
    const dR = r - color.r;
    const dG = g - color.g;
    const dB = b - color.b;
    const distance = Math.sqrt(
      (2 + rMean / 256) * dR * dR +
      4 * dG * dG +
      (2 + (255 - rMean) / 256) * dB * dB
    );

    if (distance < minDistance) {
      minDistance = distance;
      closestName = color.name;
    }
  }

  return closestName;
}

export const PRESET_ATELIER_SWATCHES = [
  { name: "Unbleached Ecru", hex: "#efe7da" },
  { name: "Madder Terracotta", hex: "#8a6f5a" },
  { name: "Provence Sage", hex: "#8c9986" },
  { name: "French Walnut", hex: "#5c4533" },
  { name: "Wild Indigo", hex: "#3b4d61" },
  { name: "Elderberry Rose", hex: "#a6686e" },
  { name: "Atelier Noir", hex: "#1c1b1a" },
];
