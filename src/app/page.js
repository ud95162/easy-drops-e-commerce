import HeroCarousel from '../components/HeroCarousel';
import CategoryGrid from '../components/CategoryGrid';
import ProductCarousel from '../components/ProductCarousel';
import PromoBanner from '../components/PromoBanner';
import { getHotDeals, getDailyEssentials, getCategoryImages } from '../data/catalog';
import styles from './page.module.css';

// Revalidate the home page every 60s so POS price/stock updates flow through.
export const revalidate = 60;

export default async function Home() {
  const [hotDeals, essentials, categoryImages] = await Promise.all([
    getHotDeals(),
    getDailyEssentials(),
    getCategoryImages(),
  ]);

  return (
    <div className={styles.page}>
      <HeroCarousel />
      <CategoryGrid categoryImages={categoryImages} />
      {hotDeals.length > 0 && (
        <ProductCarousel titleKey="hotDeals" products={hotDeals} />
      )}
      <PromoBanner />
      {essentials.length > 0 && (
        <ProductCarousel titleKey="dailyEssentials" products={essentials} />
      )}
    </div>
  );
}
