// Storefront catalog. Product data is fetched live from the Easy Drops POS
// API; category metadata (names + images) lives here since the POS has no
// images. Products are grouped by the POS product's `category` slug.

// Storefront taxonomy: 10 top categories, each with hardcoded subcategories.
// Keep the slugs in sync with the POS (src/lib/categories.ts) — products are
// tagged with these category + subcategory slugs.
const img = (id) => `https://images.unsplash.com/photo-${id}?w=220&h=220&fit=crop`;

export const categories = [
  {
    name: 'Beverages & Snacks',
    slug: 'beverages-snacks',
    image: img('1621939514649-280e2ee25f60'),
    subs: [
      { slug: 'soft-drinks', name: 'Soft Drinks' },
      { slug: 'juices-cordials', name: 'Juices & Cordials' },
      { slug: 'water', name: 'Water' },
      { slug: 'tea-coffee', name: 'Tea & Coffee' },
      { slug: 'chips-crisps', name: 'Chips & Crisps' },
      { slug: 'biscuits-cookies', name: 'Biscuits & Cookies' },
      { slug: 'chocolates-candy', name: 'Chocolates & Candy' },
      { slug: 'noodles-pasta', name: 'Noodles & Pasta' },
      { slug: 'nuts-dried-fruit', name: 'Nuts & Dried Fruit' },
    ],
  },
  {
    name: 'Grocery',
    slug: 'grocery',
    image: img('1584568694244-14fbdf83bd30'),
    subs: [
      { slug: 'rice-grains', name: 'Rice & Grains' },
      { slug: 'flour-baking', name: 'Flour & Baking' },
      { slug: 'sugar-sweeteners', name: 'Sugar & Sweeteners' },
      { slug: 'dhal-pulses', name: 'Dhal & Pulses' },
      { slug: 'oil-ghee', name: 'Cooking Oil & Ghee' },
      { slug: 'spices-masala', name: 'Spices & Masala' },
      { slug: 'sauces-condiments', name: 'Sauces & Condiments' },
      { slug: 'canned-jarred', name: 'Canned & Jarred' },
      { slug: 'dairy', name: 'Dairy' },
      { slug: 'eggs', name: 'Eggs' },
      { slug: 'breakfast-cereals', name: 'Breakfast & Cereals' },
    ],
  },
  {
    name: 'Vegetables & Fruits',
    slug: 'vegetables-fruits',
    image: img('1610832958506-aa56368176cf'),
    subs: [
      { slug: 'fresh-vegetables', name: 'Fresh Vegetables' },
      { slug: 'leafy-greens', name: 'Leafy Greens' },
      { slug: 'fresh-fruits', name: 'Fresh Fruits' },
      { slug: 'herbs', name: 'Herbs' },
      { slug: 'exotic-imported', name: 'Exotic & Imported' },
    ],
  },
  {
    name: 'Frozen & Desserts',
    slug: 'frozen-desserts',
    image: img('1567206563064-6f60f40a2b57'),
    subs: [
      { slug: 'ice-cream', name: 'Ice Cream' },
      { slug: 'frozen-snacks', name: 'Frozen Snacks' },
      { slug: 'frozen-meat-seafood', name: 'Frozen Meat & Seafood' },
      { slug: 'frozen-vegetables', name: 'Frozen Vegetables' },
      { slug: 'cakes-pastries', name: 'Cakes & Pastries' },
      { slug: 'yoghurt-curd', name: 'Yoghurt & Curd' },
    ],
  },
  {
    name: 'Gifts & Lifestyle',
    slug: 'gifts-lifestyle',
    image: img('1549465220-1a8b9238cd48'),
    subs: [
      { slug: 'stationery', name: 'Stationery' },
      { slug: 'toys-games', name: 'Toys & Games' },
      { slug: 'books', name: 'Books' },
      { slug: 'greeting-cards', name: 'Greeting Cards' },
      { slug: 'party-supplies', name: 'Party Supplies' },
      { slug: 'flowers', name: 'Flowers' },
    ],
  },
  {
    name: 'Prepared Food',
    slug: 'prepared-food',
    image: img('1568901346375-23c9450c58cd'),
    subs: [
      { slug: 'ready-meals', name: 'Ready Meals' },
      { slug: 'short-eats', name: 'Short Eats' },
      { slug: 'bakery-bread', name: 'Bakery & Bread' },
      { slug: 'sandwiches-wraps', name: 'Sandwiches & Wraps' },
      { slug: 'cafe-beverages', name: 'Cafe & Beverages' },
    ],
  },
  {
    name: 'Health & Personal Care',
    slug: 'health-personal-care',
    image: img('1571781926291-c477ebfd024b'),
    subs: [
      { slug: 'bath-body', name: 'Bath & Body' },
      { slug: 'hair-care', name: 'Hair Care' },
      { slug: 'oral-care', name: 'Oral Care' },
      { slug: 'skin-care', name: 'Skin Care' },
      { slug: 'feminine-care', name: 'Feminine Care' },
      { slug: 'baby-care', name: 'Baby Care' },
      { slug: 'health-wellness', name: 'Health & Wellness' },
      { slug: 'deodorants-fragrance', name: 'Deodorants & Fragrance' },
    ],
  },
  {
    name: 'Household & Essentials',
    slug: 'household-essentials',
    image: img('1563453392212-326f5e854473'),
    subs: [
      { slug: 'cleaning-supplies', name: 'Cleaning Supplies' },
      { slug: 'laundry-care', name: 'Laundry Care' },
      { slug: 'paper-tissues', name: 'Paper & Tissues' },
      { slug: 'air-care', name: 'Air Care' },
      { slug: 'pest-control', name: 'Pest Control' },
      { slug: 'kitchen-essentials', name: 'Kitchen Essentials' },
      { slug: 'pet-supplies', name: 'Pet Supplies' },
    ],
  },
  {
    name: 'Storage and others',
    slug: 'storage-others',
    image: img('1600585152220-90363fe7e115'),
    subs: [
      { slug: 'food-containers', name: 'Food Containers' },
      { slug: 'kitchenware', name: 'Kitchenware' },
      { slug: 'bins-baskets', name: 'Bins & Baskets' },
      { slug: 'bags-wraps', name: 'Bags & Wraps' },
      { slug: 'batteries-bulbs', name: 'Batteries & Bulbs' },
    ],
  },
  {
    name: 'Umbrellas & Accessories',
    slug: 'umbrellas-accessories',
    image: img('1517299321609-52687d1bc55a'),
    subs: [
      { slug: 'umbrellas', name: 'Umbrellas' },
      { slug: 'raincoats', name: 'Raincoats' },
      { slug: 'bags', name: 'Bags' },
      { slug: 'personal-accessories', name: 'Personal Accessories' },
    ],
  },
];

// Base URL of the POS app that exposes /api/products.
// Defaults to the deployed POS so production works without extra config;
// set POS_API_URL locally (e.g. http://localhost:4000) to point at a dev POS.
const POS_API_URL = process.env.POS_API_URL || 'https://easy-drops-pos.vercel.app';

/**
 * Fetch products from the POS. Optionally filter by category slug.
 * Revalidates every 60s so price/stock changes in the POS flow through.
 * Returns [] if the POS is unreachable so pages still render.
 */
async function fetchProducts({ category, subcategory, inStock } = {}) {
  const params = new URLSearchParams();
  if (category) params.set('category', category);
  if (subcategory) params.set('subcategory', subcategory);
  if (inStock) params.set('inStock', '1');
  const qs = params.toString();
  const url = `${POS_API_URL}/api/products${qs ? `?${qs}` : ''}`;

  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data.products) ? data.products : [];
  } catch {
    return [];
  }
}

export function getCategoryBySlug(slug) {
  return categories.find((c) => c.slug === slug) || null;
}

/** Hardcoded subcategories for a category slug (empty if unknown). */
export function getSubcategories(slug) {
  return getCategoryBySlug(slug)?.subs ?? [];
}

export async function getProductsByCategory(slug) {
  return fetchProducts({ category: slug });
}

export async function getAllProducts() {
  return fetchProducts();
}

/** A single product by id (the POS exposes only the list, so we filter it). */
export async function getProductById(id) {
  const products = await getAllProducts();
  return products.find((p) => p.id === id) || null;
}

/** Up to `limit` other in-stock products in the same category. */
export async function getRelatedProducts(product, limit = 6) {
  if (!product?.category) return [];
  const products = await fetchProducts({ category: product.category });
  return products.filter((p) => p.id !== product.id && p.inStock).slice(0, limit);
}

/** Top discounted, in-stock products — used for the "Hot Deals" row. */
export async function getHotDeals(limit = 8) {
  const products = await getAllProducts();
  return products
    .filter((p) => p.inStock && p.discountPercentage > 0)
    .sort((a, b) => b.discountPercentage - a.discountPercentage)
    .slice(0, limit);
}

/** Everyday grocery items — used for the "Daily Essentials" row. */
export async function getDailyEssentials(limit = 8) {
  const products = await getAllProducts();
  const essentialCats = new Set(['grocery', 'vegetables-fruits']);
  return products
    .filter((p) => p.inStock && essentialCats.has(p.category))
    .slice(0, limit);
}

/**
 * A representative real product photo per category slug (first product in
 * that category that has an uploaded image). Used on the category tiles.
 */
export async function getCategoryImages() {
  const products = await getAllProducts();
  const map = {};
  for (const p of products) {
    if (p.imageUrl && p.category && !map[p.category]) {
      map[p.category] = p.imageUrl;
    }
  }
  return map;
}
