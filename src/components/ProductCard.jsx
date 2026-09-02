'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Check, Image as ImageIcon } from 'lucide-react';
import { useI18n } from '../i18n/LanguageProvider';
import { useCart } from '../store/CartProvider';
import { qtyRules } from '../data/format';
import styles from './ProductCard.module.css';

const formatPrice = (n) =>
  'Rs ' + Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function ProductCard({ product }) {
  const { t, productName } = useI18n();
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const { originalPrice, discountedPrice, discountPercentage, unit, imageUrl } = product;
  const name = productName(product);

  const onAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    add(product, qtyRules(product.type).min);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className={styles.card}>
      {discountPercentage ? (
        <span className={styles.discountBadge}>
          <span className={styles.discountPct}>{discountPercentage}%</span>
          <span className={styles.discountOff}>{t.off}</span>
        </span>
      ) : null}

      <Link href={`/product/${product.id}`} className={styles.imageContainer}>
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageUrl} alt={name} className={styles.productImage} />
        ) : (
          <ImageIcon className={styles.placeholder} strokeWidth={1} />
        )}
      </Link>

      <button className={styles.addButton} onClick={onAdd} aria-label={`${t.add} — ${name}`}>
        {added ? <Check size={16} strokeWidth={2.5} /> : <Plus size={16} strokeWidth={2.5} />}
        {added ? t.detail.added : t.add}
      </button>

      <div className={styles.priceContainer}>
        <span className={styles.discountedPrice}>
          {formatPrice(discountedPrice)} <span className={styles.perUnit}>{t.perUnit}</span>
        </span>
        {originalPrice && discountedPrice < originalPrice && (
          <span className={styles.originalPrice}>{formatPrice(originalPrice)}</span>
        )}
      </div>

      <Link href={`/product/${product.id}`} className={styles.titleLink}>
        <h3 className={styles.title}>
          {name} {unit}
        </h3>
      </Link>
    </div>
  );
}
