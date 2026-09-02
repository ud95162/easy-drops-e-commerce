'use client';

import { Plus, Image as ImageIcon } from 'lucide-react';
import { useI18n } from '../i18n/LanguageProvider';
import styles from './ProductCard.module.css';

const formatPrice = (n) =>
  'Rs ' + Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function ProductCard({ product }) {
  const { t, productName } = useI18n();
  const { originalPrice, discountedPrice, discountPercentage, unit, imageUrl } = product;
  const name = productName(product);

  return (
    <div className={styles.card}>
      {discountPercentage ? (
        <span className={styles.discountBadge}>
          <span className={styles.discountPct}>{discountPercentage}%</span>
          <span className={styles.discountOff}>{t.off}</span>
        </span>
      ) : null}

      <div className={styles.imageContainer}>
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageUrl} alt={name} className={styles.productImage} />
        ) : (
          <ImageIcon className={styles.placeholder} strokeWidth={1} />
        )}
      </div>

      <button className={styles.addButton} aria-label={`${t.add} — ${name}`}>
        <Plus size={16} strokeWidth={2.5} />
        {t.add}
      </button>

      <div className={styles.priceContainer}>
        <span className={styles.discountedPrice}>
          {formatPrice(discountedPrice)} <span className={styles.perUnit}>{t.perUnit}</span>
        </span>
        {originalPrice && discountedPrice < originalPrice && (
          <span className={styles.originalPrice}>{formatPrice(originalPrice)}</span>
        )}
      </div>

      <h3 className={styles.title}>
        {name} {unit}
      </h3>
    </div>
  );
}
