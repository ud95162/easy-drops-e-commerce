'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { useI18n } from '../../i18n/LanguageProvider';
import { useCart } from '../../store/CartProvider';
import { formatPrice, formatQty, qtyRules } from '../../data/format';
import styles from './cart.module.css';

export default function CartPage() {
  const { t, productName } = useI18n();
  const { items, ready, setQty, remove, clear, subtotal, count } = useCart();
  const router = useRouter();

  if (ready && items.length === 0) {
    return (
      <div className={styles.page}>
        <div className={styles.empty}>
          <ShoppingBag size={64} className={styles.emptyIcon} strokeWidth={1.2} />
          <p className={styles.emptyText}>{t.cartPage.empty}</p>
          <Link href="/" className={styles.primaryBtn}>{t.cartPage.startShopping}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>{t.cartPage.title}</h1>
        <span className={styles.count}>{count} {count === 1 ? t.itemOne : t.itemMany}</span>
      </div>

      <div className={styles.layout}>
        <div className={styles.list}>
          {items.map((line) => {
            const rules = qtyRules(line.type);
            const name = productName(line);
            return (
              <div key={line.id} className={styles.row}>
                <Link href={`/product/${line.id}`} className={styles.thumb}>
                  {line.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={line.imageUrl} alt={name} />
                  ) : (
                    <ImageIcon size={28} className={styles.thumbPh} />
                  )}
                </Link>

                <div className={styles.rowMain}>
                  <Link href={`/product/${line.id}`} className={styles.rowName}>
                    {name} <span className={styles.rowUnit}>{line.unit}</span>
                  </Link>
                  <div className={styles.rowPrice}>{formatPrice(line.price)} <span>{t.perUnit}</span></div>

                  <div className={styles.rowControls}>
                    <div className={styles.stepper}>
                      <button
                        onClick={() => setQty(line.id, Math.max(0, +(line.quantity - rules.step).toFixed(2)))}
                        aria-label="decrease"
                        className={styles.stepBtn}
                      >
                        <Minus size={16} />
                      </button>
                      <span className={styles.qtyValue}>{formatQty(line.quantity, line.unit, line.type)}</span>
                      <button
                        onClick={() => setQty(line.id, +(line.quantity + rules.step).toFixed(2))}
                        aria-label="increase"
                        className={styles.stepBtn}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <button onClick={() => remove(line.id)} className={styles.removeBtn} aria-label={t.cartPage.remove}>
                      <Trash2 size={16} /> {t.cartPage.remove}
                    </button>
                  </div>
                </div>

                <div className={styles.rowTotal}>{formatPrice(line.price * line.quantity)}</div>
              </div>
            );
          })}

          <div className={styles.listFooter}>
            <Link href="/" className={styles.continueBtn}>
              <ArrowLeft size={18} /> {t.cartPage.continueShopping}
            </Link>
            <button onClick={clear} className={styles.clearBtn}>{t.cartPage.clear}</button>
          </div>
        </div>

        <aside className={styles.summary}>
          <h2 className={styles.summaryTitle}>{t.cartPage.subtotal}</h2>
          <div className={styles.summaryRow}>
            <span>{t.cartPage.subtotal}</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>{t.cartPage.delivery}</span>
            <span className={styles.free}>{t.cartPage.free}</span>
          </div>
          <div className={styles.summaryTotal}>
            <span>{t.cartPage.grandTotal}</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <button className={styles.checkoutBtn} onClick={() => router.push('/checkout')}>
            {t.cartPage.checkout}
          </button>
        </aside>
      </div>
    </div>
  );
}
