'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import ProductCard from '../../../components/ProductCard';
import { useI18n } from '../../../i18n/LanguageProvider';
import styles from './page.module.css';

export default function CategoryContent({ slug, fallbackName, products, subs = [] }) {
  const { t } = useI18n();
  const name = t.categories[slug] || fallbackName;
  const [activeSub, setActiveSub] = useState(''); // '' = All

  const shown = useMemo(
    () => (activeSub ? products.filter((p) => p.subcategory === activeSub) : products),
    [products, activeSub]
  );

  // Only show subcategory chips that actually have products, plus "All".
  const subCounts = useMemo(() => {
    const m = {};
    for (const p of products) if (p.subcategory) m[p.subcategory] = (m[p.subcategory] || 0) + 1;
    return m;
  }, [products]);
  const visibleSubs = subs.filter((s) => subCounts[s.slug] > 0);

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
          {shown.length} {shown.length === 1 ? t.itemOne : t.itemMany}
        </span>
      </div>

      {visibleSubs.length > 0 && (
        <div className={styles.subChips}>
          <button
            className={`${styles.chip} ${activeSub === '' ? styles.chipActive : ''}`}
            onClick={() => setActiveSub('')}
          >
            {t.allProducts || 'All'}
          </button>
          {visibleSubs.map((s) => (
            <button
              key={s.slug}
              className={`${styles.chip} ${activeSub === s.slug ? styles.chipActive : ''}`}
              onClick={() => setActiveSub(s.slug)}
            >
              {s.name} <span className={styles.chipCount}>{subCounts[s.slug]}</span>
            </button>
          ))}
        </div>
      )}

      {shown.length > 0 ? (
        <div className={styles.grid}>
          {shown.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className={styles.empty}>{t.emptyCategory}</p>
      )}
    </section>
  );
}
