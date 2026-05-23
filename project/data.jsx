// PSTN product catalog
const PRODUCTS = [
  {
    id: "psn-001",
    name: "Atelier Hoodie",
    sub: "Heavyweight 500GSM",
    silhouette: "Boxed crew",
    color: "Bone",
    swatches: ["#e8e2d5", "#0a0a0a", "#5a5a5a"],
    price: 245,
    sizes: [
      { s: "XS", stock: 0 }, { s: "S", stock: 8 }, { s: "M", stock: 3 },
      { s: "L", stock: 12 }, { s: "XL", stock: 5 }, { s: "XXL", stock: 0 }
    ],
    tag: "NEW",
    angle: "Front",
    label: "P.HOOD.001 / BONE",
  },
  {
    id: "psn-002",
    name: "Reverse Quarter-Zip",
    sub: "Brushed loopback",
    silhouette: "Half-zip",
    color: "Ash",
    swatches: ["#8a8378", "#0a0a0a", "#e8e2d5"],
    price: 220,
    sizes: [
      { s: "XS", stock: 4 }, { s: "S", stock: 2 }, { s: "M", stock: 0 },
      { s: "L", stock: 6 }, { s: "XL", stock: 11 }, { s: "XXL", stock: 3 }
    ],
    tag: "LOW",
    angle: "Front",
    label: "P.QZIP.002 / ASH",
  },
  {
    id: "psn-003",
    name: "Type-01 Hoodie",
    sub: "Embroidered wordmark",
    silhouette: "Standard",
    color: "Coal",
    swatches: ["#0a0a0a", "#e8e2d5", "#a68a64"],
    price: 265,
    sizes: [
      { s: "XS", stock: 5 }, { s: "S", stock: 7 }, { s: "M", stock: 4 },
      { s: "L", stock: 2 }, { s: "XL", stock: 0 }, { s: "XXL", stock: 0 }
    ],
    tag: null,
    angle: "Front",
    label: "P.HOOD.003 / COAL",
  },
  {
    id: "psn-004",
    name: "Postal Half-Zip",
    sub: "Garment-dyed",
    silhouette: "Half-zip",
    color: "Tobacco",
    swatches: ["#a68a64", "#0a0a0a", "#e8e2d5"],
    price: 235,
    sizes: [
      { s: "XS", stock: 3 }, { s: "S", stock: 8 }, { s: "M", stock: 5 },
      { s: "L", stock: 4 }, { s: "XL", stock: 7 }, { s: "XXL", stock: 2 }
    ],
    tag: "NEW",
    angle: "Front",
    label: "P.QZIP.004 / TOBACCO",
  },
  {
    id: "psn-005",
    name: "Field Hoodie",
    sub: "Carbon-washed",
    silhouette: "Oversized",
    color: "Carbon",
    swatches: ["#2b2a27", "#8a8378", "#e8e2d5"],
    price: 255,
    sizes: [
      { s: "XS", stock: 6 }, { s: "S", stock: 0 }, { s: "M", stock: 9 },
      { s: "L", stock: 5 }, { s: "XL", stock: 2 }, { s: "XXL", stock: 1 }
    ],
    tag: null,
    angle: "Front",
    label: "P.HOOD.005 / CARBON",
  },
  {
    id: "psn-006",
    name: "Service Quarter-Zip",
    sub: "Twin-needle finish",
    silhouette: "Half-zip",
    color: "Cream",
    swatches: ["#f0e9da", "#2b2a27", "#a68a64"],
    price: 215,
    sizes: [
      { s: "XS", stock: 9 }, { s: "S", stock: 6 }, { s: "M", stock: 8 },
      { s: "L", stock: 2 }, { s: "XL", stock: 0 }, { s: "XXL", stock: 4 }
    ],
    tag: "LOW",
    angle: "Front",
    label: "P.QZIP.006 / CREAM",
  },
];

function stockSummary(p) {
  const total = p.sizes.reduce((a, b) => a + b.stock, 0);
  const low = total <= 12;
  return { total, low };
}

window.PRODUCTS = PRODUCTS;
window.stockSummary = stockSummary;
