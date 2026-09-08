import { getAllProducts } from '../../data/catalog';

// Meta (Facebook/Instagram) Commerce catalog data feed, in CSV format.
// Point Commerce Manager → Catalog → Data Sources → Scheduled feed at this URL:
//   https://<your-domain>/catalog.csv
// Meta re-fetches on a schedule and keeps the catalog in sync with the POS.
export const revalidate = 300; // regenerate at most every 5 minutes

function csvEscape(value) {
  const s = String(value ?? '');
  return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
}

const money = (n) => `${Number(n || 0).toFixed(2)} LKR`;

export async function GET(request) {
  // Build the public origin from the request headers (reliable on Vercel),
  // falling back to the request URL.
  const host = request.headers.get('host');
  const proto = request.headers.get('x-forwarded-proto') || 'https';
  const origin = host ? `${proto}://${host}` : new URL(request.url).origin;
  const products = await getAllProducts();

  // Meta required columns + sale_price (optional but recommended for discounts).
  const columns = [
    'id',
    'title',
    'description',
    'availability',
    'condition',
    'price',
    'sale_price',
    'link',
    'image_link',
    'brand',
  ];

  const lines = [columns.join(',')];

  for (const p of products) {
    // Meta requires an image; skip products that don't have one yet.
    if (!p.imageUrl) continue;

    const onSale =
      p.discountedPrice != null && p.discountedPrice < p.originalPrice;
    const description =
      `${p.title}${p.unit ? ` (${p.unit})` : ''} — available for delivery from EasyDrops.`;

    const row = [
      p.id,
      p.title,
      description,
      p.inStock ? 'in stock' : 'out of stock',
      'new',
      money(p.originalPrice),
      onSale ? money(p.discountedPrice) : '',
      `${origin}/product/${p.id}`,
      p.imageUrl,
      'EasyDrops',
    ].map(csvEscape);

    lines.push(row.join(','));
  }

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'inline; filename="easydrops-catalog.csv"',
      'Cache-Control': 'public, max-age=300, s-maxage=300',
    },
  });
}
