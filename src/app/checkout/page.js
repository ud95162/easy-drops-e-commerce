'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Lock, Image as ImageIcon } from 'lucide-react';
import { useI18n } from '../../i18n/LanguageProvider';
import { useCart } from '../../store/CartProvider';
import { useAuth } from '../../store/AuthProvider';
import { api } from '../../data/api';
import { formatPrice, formatQty } from '../../data/format';
import styles from './checkout.module.css';

export default function CheckoutPage() {
  const { t, productName } = useI18n();
  const { items, subtotal, clear, ready } = useCart();
  const { user, token, isLoggedIn, ready: authReady } = useAuth();

  const [form, setForm] = useState({ name: '', phone: '', address: '', note: '' });
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const [done, setDone] = useState(false);

  // Prefill from the signed-in profile once it loads.
  useEffect(() => {
    if (!user) return;
    setForm((f) => ({
      name: f.name || user.name || '',
      phone: f.phone || user.phone || '',
      address: f.address || user.address || '',
      note: f.note,
    }));
  }, [user]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) {
      setError(t.checkout.name + ', ' + t.checkout.phone + ', ' + t.checkout.address);
      return;
    }
    setPending(true);
    try {
      await api.createOrder(token, {
        items: items.map((l) => ({ productId: l.id, quantity: l.quantity })),
        name: form.name.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        note: form.note.trim(),
      });
      clear();
      setDone(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setPending(false);
    }
  };

  if (done) {
    return (
      <div className={styles.page}>
        <div className={styles.success}>
          <CheckCircle2 size={72} className={styles.successIcon} />
          <h1 className={styles.successTitle}>{t.checkout.successTitle}</h1>
          <p className={styles.successBody}>{t.checkout.successBody}</p>
          <div className={styles.successActions}>
            <Link href="/account" className={styles.primaryBtn}>{t.checkout.viewOrders}</Link>
            <Link href="/" className={styles.ghostBtn}>{t.checkout.backHome}</Link>
          </div>
        </div>
      </div>
    );
  }

  if (ready && items.length === 0) {
    return (
      <div className={styles.page}>
        <div className={styles.notice}>
          <p>{t.checkout.emptyCart}</p>
          <Link href="/" className={styles.primaryBtn}>{t.cartPage.startShopping}</Link>
        </div>
      </div>
    );
  }

  if (authReady && !isLoggedIn) {
    return (
      <div className={styles.page}>
        <div className={styles.notice}>
          <Lock size={48} className={styles.lockIcon} />
          <p>{t.checkout.loginRequired}</p>
          <Link href="/account?redirect=/checkout" className={styles.primaryBtn}>{t.checkout.signIn}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{t.checkout.title}</h1>
      <div className={styles.layout}>
        <form className={styles.form} onSubmit={submit}>
          <h2 className={styles.sectionTitle}>{t.checkout.deliveryDetails}</h2>

          <label className={styles.field}>
            <span>{t.checkout.name}</span>
            <input value={form.name} onChange={set('name')} required />
          </label>
          <label className={styles.field}>
            <span>{t.checkout.phone}</span>
            <input value={form.phone} onChange={set('phone')} inputMode="tel" required />
          </label>
          <label className={styles.field}>
            <span>{t.checkout.address}</span>
            <textarea value={form.address} onChange={set('address')} rows={3} required />
          </label>
          <label className={styles.field}>
            <span>{t.checkout.note}</span>
            <input value={form.note} onChange={set('note')} />
          </label>

          {error && <p className={styles.error}>{error}</p>}
          <p className={styles.payNote}>{t.checkout.payNote}</p>

          <button type="submit" className={styles.placeBtn} disabled={pending}>
            {pending ? t.checkout.placing : `${t.checkout.placeOrder} · ${formatPrice(subtotal)}`}
          </button>
        </form>

        <aside className={styles.summary}>
          <h2 className={styles.sectionTitle}>{t.checkout.orderSummary}</h2>
          <div className={styles.lines}>
            {items.map((l) => (
              <div key={l.id} className={styles.line}>
                <span className={styles.lineThumb}>
                  {l.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={l.imageUrl} alt="" />
                  ) : (
                    <ImageIcon size={18} className={styles.linePh} />
                  )}
                </span>
                <span className={styles.lineName}>
                  {productName(l)}
                  <span className={styles.lineQty}>× {formatQty(l.quantity, l.unit, l.type)}</span>
                </span>
                <span className={styles.linePrice}>{formatPrice(l.price * l.quantity)}</span>
              </div>
            ))}
          </div>
          <div className={styles.summaryRow}>
            <span>{t.cartPage.subtotal}</span><span>{formatPrice(subtotal)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>{t.cartPage.delivery}</span><span className={styles.free}>{t.cartPage.free}</span>
          </div>
          <div className={styles.summaryTotal}>
            <span>{t.cartPage.grandTotal}</span><span>{formatPrice(subtotal)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
