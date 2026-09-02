'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { useI18n } from '../i18n/LanguageProvider';
import styles from './ProductCarousel.module.css';

export default function ProductCarousel({ titleKey, products }) {
  const { t } = useI18n();
  const title = t.sections[titleKey] || titleKey;

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <Link href="#" className={styles.viewAll}>
          {t.viewAll} <ChevronRight size={16} />
        </Link>
      </div>

      <div className={styles.carousel}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
