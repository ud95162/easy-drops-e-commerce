'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronRight, Minus, Plus, ShoppingCart, Check, Image as ImageIcon } from 'lucide-react';
import ProductCard from '../../../components/ProductCard';
import { useI18n } from '../../../i18n/LanguageProvider';
import { useCart } from '../../../store/CartProvider';
import { formatPrice, formatQty, qtyRules } from '../../../data/format';
import styles from './page.module.css';

export default function ProductDetail({ product, related }) {
  const { t, productName } = useI18n();
  const { add } = useCart();
  const router = useRouter();
  const rules = qtyRules(product.type);
  const [qty, setQty] = useState(rules.min);
  const [added, setAdded] = useState(false);

  const name = productName(product);
  const { originalPrice, discountedPrice, discountPercentage, unit, imageUrl, inStock } = product;
  const save = originalPrice > discountedPrice ? originalPrice - discountedPrice : 0;
  const catName = product.category ? t.categories[product.category] : null;

  const dec = () => setQty((q) => Math.max(rules.min, +(q - rules.step).toFixed(2)));
  const inc = () => setQty((q) => +(q + rules.step).toFixed(2));

  const addToCart = () => {
    add(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  const buyNow = () => {
    add(product, qty);
    router.push('/cart');
  };

  return (
    <section className={styles.section}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/" className={styles.crumbLink}>{t.home}</Link>
        <ChevronRight size={16} className={styles.crumbSep} />
        {catName && product.category && (
          <>
            <Link href={`/category/${product.category}`} className={styles.crumbLink}>{catName}</Link>
            <ChevronRight size={16} className={styles.crumbSep} />
          </>
        )}
        <span className={styles.crumbCurrent}>{name}</span>
      </nav>

      <div className={styles.detail}>
        <div className={styles.gallery}>
          {discountPercentage ? (
            <span className={styles.badge}>{discountPercentage}% {t.off}</span>
          ) : null}
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imageUrl} alt={name} className={styles.image} />
          ) : (
            <ImageIcon className={styles.placeholder} strokeWidth={1} />
          )}
        </div>

        <div className={styles.info}>
          <h1 className={styles.title}>{name}</h1>
          <div className={styles.unit}>{unit}</div>

          <div className={`${styles.stock} ${inStock ? styles.inStock : styles.outStock}`}>
            {inStock ? t.detail.inStock : t.detail.outOfStock}
          </div>

          <div className={styles.priceRow}>
            <span className={styles.price}>{formatPrice(discountedPrice)}</span>
            <span className={styles.perUnit}>{t.perUnit}</span>
            {save > 0 && <span className={styles.strike}>{formatPrice(originalPrice)}</span>}
          </div>
          {save > 0 && (
            <div className={styles.save}>{t.detail.youSave} {formatPrice(save)}</div>
          )}

          <p className={styles.desc}>{t.detail.description}</p>

          {inStock && (
            <>
              <div className={styles.qtyLabel}>{t.detail.quantity}</div>
              <div className={styles.qtyRow}>
                <div className={styles.stepper}>
                  <button onClick={dec} aria-label="decrease" className={styles.stepBtn}>
                    <Minus size={18} />
                  </button>
                  <span className={styles.qtyValue}>{formatQty(qty, unit, product.type)}</span>
                  <button onClick={inc} aria-label="increase" className={styles.stepBtn}>
                    <Plus size={18} />
                  </button>
                </div>
                <span className={styles.lineTotal}>{formatPrice(discountedPrice * qty)}</span>
              </div>

              <div className={styles.actions}>
                <button className={styles.addBtn} onClick={addToCart}>
                  {added ? <Check size={20} /> : <ShoppingCart size={20} />}
                  {added ? t.detail.added : t.detail.addToCart}
                </button>
                <button className={styles.buyBtn} onClick={buyNow}>
                  {t.detail.buyNow}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <div className={styles.related}>
          <h2 className={styles.relatedTitle}>{t.detail.related}</h2>
          <div className={styles.relatedGrid}>
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
