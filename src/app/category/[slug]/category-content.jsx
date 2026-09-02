'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import ProductCard from '../../../components/ProductCard';
import { useI18n } from '../../../i18n/LanguageProvider';
import styles from './page.module.css';

export default function CategoryContent({ slug, fallbackName, products }) {
  const { t } = useI18n();
  const name = t.categories[slug] || fallbackName;

  return (
    <section className={styles.section}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/" className={styles.crumbLink}>{t.home}</Link>
        <ChevronRight size={16} className={styles.crumbSep} />
        <span className={styles.crumbCurrent}>{name}</span>
      </nav>

      <div className={styles.header}>
        <h1 className={styles.title}>{name}</h1>
        <span className={styles.count}>
          {products.length} {products.length === 1 ? t.itemOne : t.itemMany}
        </span>
      </div>

      {products.length > 0 ? (
        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className={styles.empty}>{t.emptyCategory}</p>
      )}
    </section>
  );
}
