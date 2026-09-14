export interface ProductColorway {
  name: string;
  hex: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  priceUSD: number;
  category: 'bags' | 'wearables' | 'accessories' | 'home';
  categoryLabel: string;
  craftHours: number;
  fiber: string;
  badge: string;
  status: 'Made on Demand' | 'In Stock' | 'Limited Edition' | 'Capsule Preview';
  editionNumber?: string;
  description: string;
  storyQuote?: string;
  provenance: string;
  images: string[];
  colorways: ProductColorway[];
  dimensions: string[];
  reviewsCount: number;
  rating: number;
  refCode: string;
  specs: {
    body: string;
    structuralRope: string;
    hardware: string;
    dyeChemistry: string;
    care: string;
    lineage: string;
    shipping: string;
  };
  isWearablePreview?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: "luna-tote",
    name: "The Luna Raffia-Cotton Net Tote",
    tagline: "Continuous-loop sculptural mesh tote with double-twisted organic fiber",
    priceUSD: 285,
    category: "bags",
    categoryLabel: "Bags & Vessels",
    craftHours: 16,
    fiber: "Aegean Organic Cotton & Raffia",
    badge: "BESTSELLER / RAFFIA & COTTON",
    status: "Made on Demand",
    editionNumber: "Batch N° 04",
    description: "Hand-crocheted over 16 continuous hours using double-twisted GOTS-certified Aegean organic cotton interwoven with natural coastal Madagascar raffia. Designed with a supportive structured base and soft cordwood handles that sit comfortably on the shoulder or crook of the arm.",
    storyQuote: "We weave the botanical tension in near-asymmetry so it never sags, functioning as living sculpture between sea and city.",
    provenance: "Handmade to order in Provence & Portugal. Each tote is numbered and signed by its master maker.",
    images: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop", // woven raffia bag
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1200&auto=format&fit=crop", // detail woven bag
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop", // luxury tote bag on model
      "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?q=80&w=1200&auto=format&fit=crop", // artisan yarn and skeins
    ],
    colorways: [
      { name: "Desert Ecru", hex: "#E8DFC8", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop" },
      { name: "Oatmeal Beige", hex: "#D4C4B1", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1200&auto=format&fit=crop" },
      { name: "Olive Wash", hex: "#7E7C67", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop" },
      { name: "Terracotta Earth", hex: "#9E644D", image: "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?q=80&w=1200&auto=format&fit=crop" },
    ],
    dimensions: [
      "Standard (38cm x 42cm)",
      "Oversized (46cm x 50cm - +$35 / +₦52,500)"
    ],
    reviewsCount: 18,
    rating: 5,
    refCode: "Ref. 04-B-LNT",
    specs: {
      body: "70% GOTS Aegean Organic Cotton, 30% Wild Madagascar Raffia palm fibers.",
      structuralRope: "Double-plied Egyptian long-staple cotton inner core for non-stretch shoulder drop.",
      hardware: "Cast brass numbered artisan coin engraved with individual batch registration.",
      dyeChemistry: "Unbleached raw fibers with wild madder root and limestone kettle bath.",
      care: "Spot clean with tepid water and olive oil soap flakes. Dry flat away from direct tropical sunlight.",
      lineage: "Crafted by Master Knitter Hélène Laurent & Senior Apprentice Marie at the Avignon studio.",
      shipping: "Carbon-neutral DHL express delivery. Arrives in a raw Belgian linen drawstring tote with certificate of authenticity."
    }
  },
  {
    id: "palais-bag",
    name: "The Palais Open-Weave Shoulder Bag",
    tagline: "Scalloped structural handbag with hand-knotted arch straps",
    priceUSD: 310,
    category: "bags",
    categoryLabel: "Bags & Accessories",
    craftHours: 18,
    fiber: "100% GOTS Cotton",
    badge: "100% GOTS COTTON",
    status: "Made on Demand",
    editionNumber: "Edition 03",
    description: "An architectural wonder woven using the raised honeycomb stitch. Every arc is reinforced by hand with raw boxwood needles to ensure structured geometry without synthetic backing.",
    storyQuote: "Geometry without rigidity: a bag that drapes to your movement yet maintains its sculptured silhouette.",
    provenance: "Provence Workshop, France. 18 hours of dedicated handwork.",
    images: [
      "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?q=80&w=1200&auto=format&fit=crop", // textured crochet bag
      "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop",
    ],
    colorways: [
      { name: "Sand Ecru", hex: "#E8DFC8", image: "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?q=80&w=1200&auto=format&fit=crop" },
      { name: "Raw Umber", hex: "#6E523F", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop" },
    ],
    dimensions: ["Standard (32cm x 26cm)", "Grand (40cm x 34cm)"],
    reviewsCount: 14,
    rating: 5,
    refCode: "Ref. 03-B-PAL",
    specs: {
      body: "100% Organic combed Greek cotton.",
      structuralRope: "Braided flax cord underlay.",
      hardware: "Natural horn button clasp.",
      dyeChemistry: "Untreated raw fiber, naturally washed in spring water.",
      care: "Steam gently from 15cm distance. Store stuffed with acid-free tissue paper.",
      lineage: "Constructed by Céline Morat, lace-making specialist of 22 years.",
      shipping: "Complimentary worldwide delivery in wooden gift crate."
    }
  },
  {
    id: "sienna-vest",
    name: "Sienna Scallop Crochet Vest",
    tagline: "Intricate filigree shell vest hand-looped from pure Belgian flax yarn",
    priceUSD: 340,
    category: "wearables",
    categoryLabel: "Wearables",
    craftHours: 24,
    fiber: "Belgian Linen",
    badge: "LOW STOCK (2 LEFT) / BELGIAN LINEN",
    status: "Capsule Preview",
    editionNumber: "Batch N° 04",
    description: "A testament to slow sartorial luxury. Crafted from lightweight Belgian flax with scalloped hems that flutter gracefully with every stride.",
    provenance: "Flanders Flax Mills & Provence Atelier.",
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop", // high fashion linen model
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop",
    ],
    colorways: [
      { name: "Oatmeal Beige", hex: "#D4C4B1", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop" },
      { name: "Desert Rose", hex: "#C79A8B", image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop" },
    ],
    dimensions: ["Size I (EU 34-36 / UK 6-8)", "Size II (EU 38-40 / UK 10-12)", "Bespoke Measurements"],
    reviewsCount: 9,
    rating: 5,
    refCode: "Ref. 04-W-SCV",
    specs: {
      body: "100% certified Normandy & Belgian long-line flax.",
      structuralRope: "Self-tied crochet cord with unpolished river pearl ends.",
      hardware: "Zero synthetic threads or resin clips.",
      dyeChemistry: "Walnut husk mineral soak.",
      care: "Hand wash cold in lavender rinse. Lay flat on linen towel.",
      lineage: "Designed by Hélène Laurent, hand-crocheted over 24 hours.",
      shipping: "Dispatches in custom archival muslin garment bag."
    },
    isWearablePreview: true
  },
  {
    id: "verona-halter",
    name: "Verona Halter Top in Unbleached Linen",
    tagline: "Minimalist cropped halter top with openwork chevron knit",
    priceUSD: 260,
    category: "wearables",
    categoryLabel: "Wearables",
    craftHours: 14,
    fiber: "Raw Belgian Flax",
    badge: "NEW ARRIVAL / RAW FLAX",
    status: "Capsule Preview",
    editionNumber: "Batch N° 04",
    description: "Effortless summer architecture. Features a triangular neckline, delicate scalloped underbust band, and open-back tie closures.",
    provenance: "Artisanal Studio, Saint-Rémy-de-Provence.",
    images: [
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop", // chic knit halter top
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1200&auto=format&fit=crop",
    ],
    colorways: [
      { name: "Natural Cream", hex: "#EBE3D5", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop" },
      { name: "Chalk White", hex: "#FAF8F5", image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1200&auto=format&fit=crop" },
    ],
    dimensions: ["Size I (XS/S)", "Size II (M/L)"],
    reviewsCount: 11,
    rating: 5,
    refCode: "Ref. 04-W-VHT",
    specs: {
      body: "100% unbleached Belgian linen yarn.",
      structuralRope: "Braided halter straps with adjustable back loop.",
      hardware: "None. 100% biodegradable garment.",
      dyeChemistry: "Raw natural flax without bleach or dyes.",
      care: "Cool gentle rinse. Will soften beautifully with each wear.",
      lineage: "Atelier Knitter Béatrice, Marseille studio.",
      shipping: "Archival gift packaging included."
    },
    isWearablePreview: true
  },
  {
    id: "aura-ceramic-sleeve",
    name: "Aura Textured Ceramic Sleeve & Candle",
    tagline: "Tactile open-mesh sleeve wrapping hand-thrown terracotta stoneware",
    priceUSD: 120,
    category: "home",
    categoryLabel: "Home & Living",
    craftHours: 8,
    fiber: "Warm Terracotta & Unbleached Flax",
    badge: "ARTISANAL HOME",
    status: "Limited Edition",
    description: "A dialogue between fired earth and supple looped fiber. Hand-thrown clay vessel paired with an intricate removable crochet sleeve, complete with wild beeswax candle.",
    provenance: "Vallauris Pottery & E&A Provence Studio.",
    images: [
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=1200&auto=format&fit=crop", // ceramic vase candle setup
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1200&auto=format&fit=crop",
    ],
    colorways: [
      { name: "Warm Terracotta", hex: "#A66249", image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=1200&auto=format&fit=crop" },
      { name: "Bone White", hex: "#F3ECE2", image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1200&auto=format&fit=crop" },
    ],
    dimensions: ["Diameter: 12cm, Height: 18cm"],
    reviewsCount: 7,
    rating: 5,
    refCode: "Ref. 02-H-ACS",
    specs: {
      body: "Removable crochet jacket in 100% coarse unbleached flax.",
      structuralRope: "Fired clay vessel made in Vallauris.",
      hardware: "Natural hand-knotted cord cinch.",
      dyeChemistry: "Untreated raw fiber.",
      care: "Slip sleeve off ceramic vessel before hand washing. Wipe ceramic with damp cloth.",
      lineage: "Collaboration with master potter Jean-Luc and Atelier E&A.",
      shipping: "Shock-protected biodegradable molded pulp casing."
    }
  },
  {
    id: "solstice-bucket-hat",
    name: "Solstice Open-Knit Bucket Hat",
    tagline: "Breezy sun hat sculpted loop by loop with a ruffled scalloped brim",
    priceUSD: 165,
    category: "accessories",
    categoryLabel: "Accessories",
    craftHours: 11,
    fiber: "100% GOTS Cotton",
    badge: "100% GOTS COTTON",
    status: "Made on Demand",
    description: "Designed for balmy Mediterranean days. The crown is crocheted in open honeycomb eyelets for constant airflow, while the brim maintains a sun-shading tilt.",
    provenance: "Provence Studio, France.",
    images: [
      "https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?q=80&w=1200&auto=format&fit=crop", // woven summer bucket hat
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=1200&auto=format&fit=crop",
    ],
    colorways: [
      { name: "Desert Dune", hex: "#D9C3A5", image: "https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?q=80&w=1200&auto=format&fit=crop" },
      { name: "Sunlit Ochre", hex: "#CBA358", image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=1200&auto=format&fit=crop" },
    ],
    dimensions: ["Size S/M (54-56cm)", "Size M/L (57-59cm)"],
    reviewsCount: 16,
    rating: 5,
    refCode: "Ref. 04-A-SBH",
    specs: {
      body: "Double-twist Turkish Aegean organic cotton.",
      structuralRope: "Flexible internal crochet wire in brim to allow personalized shaping.",
      hardware: "Brass provenance charm inside crown.",
      dyeChemistry: "Onion skin & chamomile botanical bath.",
      care: "Spot clean or gentle hand wash. Reshape over a round bowl to dry.",
      lineage: "Crafted by Mathilde Roy, millinery crochet artisan.",
      shipping: "Arrives uncrushed in custom hat box."
    }
  },
  {
    id: "botanical-scrunchie-set",
    name: "Botanical Dyed Scrunchie Set",
    tagline: "Trio of ruffled silk-cotton hair adornments tinted with garden pigments",
    priceUSD: 55,
    category: "accessories",
    categoryLabel: "Accessories",
    craftHours: 3,
    fiber: "Silk & Organic Cotton",
    badge: "GIFT FAVORITE",
    status: "In Stock",
    description: "Gentle on hair and wrist alike. Each set is kettle-dyed in small pots using elderberry, avocado pit, and Provence lavender stems.",
    provenance: "Hand-dyed and stitched in Grasse, France.",
    images: [
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=1200&auto=format&fit=crop", // soft silk botanical scrunchie
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200&auto=format&fit=crop",
    ],
    colorways: [
      { name: "Olive & Ecru Trio", hex: "#93917C", image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=1200&auto=format&fit=crop" },
      { name: "Wild Rose Trio", hex: "#C8958E", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200&auto=format&fit=crop" },
    ],
    dimensions: ["Set of 3 (Standard Stretch)"],
    reviewsCount: 29,
    rating: 5,
    refCode: "Ref. 01-A-BSS",
    specs: {
      body: "70% mulberry silk, 30% organic cotton yarn.",
      structuralRope: "Biodegradable natural tree rubber inner elastic.",
      hardware: "None.",
      dyeChemistry: "Certified 100% non-toxic botanical extractions.",
      care: "Hand rinse in cool water with silk wash.",
      lineage: "Atelier studio botanical dye bath collection.",
      shipping: "Wrapped in letterpressed tissue."
    }
  },
  {
    id: "heirloom-table-runner",
    name: "Heirloom Granny-Stitch Table Runner",
    tagline: "Timeless open-lace linen runner that gathers warmth at festive tables",
    priceUSD: 195,
    category: "home",
    categoryLabel: "Home & Living",
    craftHours: 22,
    fiber: "Ivory & Flax",
    badge: "HEIRLOOM",
    status: "Made on Demand",
    description: "Twenty-two hours of meticulous tension looping creates an ethereal heirloom runner designed to be handed down through generations.",
    provenance: "Provence Atelier, France.",
    images: [
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1200&auto=format&fit=crop", // styled rustic table runner
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=1200&auto=format&fit=crop",
    ],
    colorways: [
      { name: "Ivory & Flax", hex: "#ECE4D6", image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1200&auto=format&fit=crop" },
      { name: "Natural Taupe", hex: "#C7B7A4", image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=1200&auto=format&fit=crop" },
    ],
    dimensions: ["220cm x 38cm", "Custom Bespoke Length"],
    reviewsCount: 13,
    rating: 5,
    refCode: "Ref. 03-H-HTR",
    specs: {
      body: "100% natural long-fiber unbleached linen.",
      structuralRope: "Triple-twisted selvedge edge to resist curling.",
      hardware: "Embroidered studio archival crest at corner.",
      dyeChemistry: "Raw flax fiber.",
      care: "Machine wash on delicate cold wool cycle or hand wash. Iron damp.",
      lineage: "Made under the direction of Senior Lace Artisan Giselle.",
      shipping: "Boxed with raw cedar block to deter moths naturally."
    }
  }
];

export interface StitchAnatomy {
  id: string;
  name: string;
  gauge: string;
  avgTime: string;
  yarn: string;
  description: string;
  image: string;
  tensionLevel: string;
}

export const STITCHES: StitchAnatomy[] = [
  {
    id: "raised-treble",
    name: "Raised Treble Cluster",
    gauge: "14 sts x 8 rows = 10cm",
    avgTime: "45 mins per 100cm²",
    yarn: "3-ply Aegean Organic Cotton",
    description: "Creates rich 3D tactile bobbles that capture light and provide cushioned structural resistance without internal foam padding.",
    image: "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?q=80&w=800&auto=format&fit=crop",
    tensionLevel: "High Firmness"
  },
  {
    id: "picot-edge",
    name: "Picot Edge Picot",
    gauge: "18 sts x 12 rows = 10cm",
    avgTime: "30 mins per meter of edge",
    yarn: "Belgian Unbleached Flax",
    description: "Tiny looped peaks that finish borders with sculptural restraint, referencing 18th-century French liturgical lace.",
    image: "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?q=80&w=800&auto=format&fit=crop",
    tensionLevel: "Delicate Scallop"
  },
  {
    id: "waffle-lace",
    name: "Waffle Loop Lace",
    gauge: "12 sts x 10 rows = 10cm",
    avgTime: "55 mins per 100cm²",
    yarn: "Raffia & Combed Cotton",
    description: "Square-set architectural cells that flex when loaded, providing tensile strength while maintaining airy light translucency.",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop",
    tensionLevel: "Spring-like Tensile"
  },
  {
    id: "ribbed-chevron",
    name: "Ribbed Chevron",
    gauge: "16 sts x 14 rows = 10cm",
    avgTime: "40 mins per 100cm²",
    yarn: "Raw Botanical Dyed Linen",
    description: "Directional bias looping that drapes organically across body contours and memory-shapes over time to its wearer.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
    tensionLevel: "Fluid Memory"
  }
];

export interface Stockist {
  city: string;
  name: string;
  address: string;
  note: string;
}

export const STOCKISTS: Stockist[] = [
  {
    city: "Paris",
    name: "Galerie Vivienne E&A Space",
    address: "4 Rue des Petits-Champs, 75002 Paris",
    note: "Archival samples & private appointments"
  },
  {
    city: "Tokyo",
    name: "Aoyama Minimal Space",
    address: "5-7-22 Minami-Aoyama, Minato-ku, Tokyo",
    note: "Exclusive seasonal yarn editions"
  },
  {
    city: "Copenhagen",
    name: "Bredgade Atelier Room",
    address: "Bredgade 24, 1260 København",
    note: "Nordic flax & ceramic collaborations"
  },
  {
    city: "New York",
    name: "Mercer Archive",
    address: "102 Mercer Street, SoHo, NY 10013",
    note: "Bespoke commission consultations"
  }
];
