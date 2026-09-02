'use client';

import Link from 'next/link';
import { categories } from '../data/catalog';
import { useI18n } from '../i18n/LanguageProvider';
import styles from './CategoryGrid.module.css';

// Soft pastel backdrop per category tile.
const TILE_COLORS = [
  '#fdeadf', '#e9f1fb', '#eaf6e6', '#e7f2f6',
  '#fdecf0', '#f1ecfb', '#fbf0e2', '#e8f4ee',
];

export default function CategoryGrid({ categoryImages = {} }) {
  const { t } = useI18n();

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{t.sections.shopByCategory}</h2>
      </div>
      <div className={styles.scrollRow}>
        {categories.map((category, i) => {
          const name = t.categories[category.slug] || category.name;
          const imgSrc = categoryImages[category.slug] || category.image;
          return (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className={styles.card}
            >
              <div
                className={styles.imageWrapper}
                style={{ backgroundColor: TILE_COLORS[i % TILE_COLORS.length] }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imgSrc} alt={name} className={styles.categoryImage} />
              </div>
              <span className={styles.categoryName}>{name}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
