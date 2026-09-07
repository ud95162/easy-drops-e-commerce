import { notFound } from 'next/navigation';
import { getDailyEssentials, getHotDeals } from '../../../data/catalog';
import CollectionContent from './collection-content';
import styles from './page.module.css';

export const revalidate = 60;

// Home-page sections that have a "View All" → full listing page.
const COLLECTIONS = {
  'daily-essentials': { titleKey: 'dailyEssentials', get: () => getDailyEssentials(1000) },
  'hot-deals': { titleKey: 'hotDeals', get: () => getHotDeals(1000) },
};

export function generateStaticParams() {
  return Object.keys(COLLECTIONS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  if (!COLLECTIONS[slug]) return { title: 'Not Found | EasyDrops' };
  return { title: 'EasyDrops' };
}

export default async function CollectionPage({ params }) {
  const { slug } = await params;
  const c = COLLECTIONS[slug];
  if (!c) notFound();
  const products = await c.get();
  return (
    <div className={styles.page}>
      <CollectionContent titleKey={c.titleKey} products={products} />
    </div>
  );
}
