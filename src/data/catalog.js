// Storefront catalog. Product data is fetched live from the Easy Drops POS
// API; category metadata (names + images) lives here since the POS has no
// images. Products are grouped by the POS product's `category` slug.

export const categories = [
  {
    name: 'Pantry Staples',
    slug: 'pantry-staples',
    image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=220&h=220&fit=crop',
  },
  {
    name: 'Snacks & Sweets',
    slug: 'snacks-sweets',
    image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=220&h=220&fit=crop',
  },
  {
    name: 'Beverages',
    slug: 'beverages',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=220&h=220&fit=crop',
  },
  {
    name: 'Household',
    slug: 'household',
    image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=220&h=220&fit=crop',
  },
  {
    name: 'Personal Care',
    slug: 'personal-care',
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=220&h=220&fit=crop',
  },
  {
    name: 'Dairy Products',
    slug: 'dairy-products',
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=220&h=220&fit=crop',
  },
  {
    name: 'Baby Care',
    slug: 'baby-care',
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=220&h=220&fit=crop',
  },
  {
    name: 'Pet Supplies',
    slug: 'pet-supplies',
    image: 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=220&h=220&fit=crop',
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
async function fetchProducts({ category, inStock } = {}) {
  const params = new URLSearchParams();
  if (category) params.set('category', category);
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

export async function getProductsByCategory(slug) {
  return fetchProducts({ category: slug });
}

export async function getAllProducts() {
  return fetchProducts();
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
  const essentialCats = new Set(['pantry-staples', 'dairy-products']);
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
