'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { User, LogOut, Package, ChevronRight } from 'lucide-react';
import { useI18n } from '../../i18n/LanguageProvider';
import { useAuth } from '../../store/AuthProvider';
import { api } from '../../data/api';
import { formatPrice } from '../../data/format';
import styles from './account.module.css';

export default function AccountPage() {
  const { t } = useI18n();
  const { isLoggedIn, ready } = useAuth();

  if (!ready) {
    return <div className={styles.page}><p className={styles.loading}>{t.account.working}</p></div>;
  }
  return (
    <div className={styles.page}>
      {isLoggedIn ? <Dashboard /> : <AuthForms />}
    </div>
  );
}

function AuthForms() {
  const { t } = useI18n();
  const { login, register } = useAuth();
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', address: '' });
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      if (mode === 'login') {
        await login(form.email.trim(), form.password);
      } else {
        await register({
          name: form.name.trim(),
          email: form.email.trim(),
          password: form.password,
          phone: form.phone.trim(),
          address: form.address.trim(),
        });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={styles.authWrap}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${mode === 'login' ? styles.tabActive : ''}`}
          onClick={() => { setMode('login'); setError(null); }}
        >
          {t.account.signIn}
        </button>
        <button
          className={`${styles.tab} ${mode === 'register' ? styles.tabActive : ''}`}
          onClick={() => { setMode('register'); setError(null); }}
        >
          {t.account.register}
        </button>
      </div>

      <form className={styles.card} onSubmit={submit}>
        {mode === 'register' && (
          <label className={styles.field}>
            <span>{t.account.name}</span>
            <input value={form.name} onChange={set('name')} required />
          </label>
        )}
        <label className={styles.field}>
          <span>{t.account.email}</span>
          <input type="email" value={form.email} onChange={set('email')} required />
        </label>
        <label className={styles.field}>
          <span>{t.account.password}</span>
          <input type="password" value={form.password} onChange={set('password')} required minLength={6} />
        </label>
        {mode === 'register' && (
          <>
            <label className={styles.field}>
              <span>{t.account.phone}</span>
              <input value={form.phone} onChange={set('phone')} inputMode="tel" />
            </label>
            <label className={styles.field}>
              <span>{t.account.address}</span>
              <input value={form.address} onChange={set('address')} />
            </label>
          </>
        )}

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className={styles.primaryBtn} disabled={busy}>
          {busy ? t.account.working : mode === 'login' ? t.account.signInCta : t.account.registerCta}
        </button>

        <p className={styles.switch}>
          {mode === 'login' ? t.account.noAccount : t.account.haveAccount}{' '}
          <button type="button" className={styles.switchBtn}
            onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(null); }}>
            {mode === 'login' ? t.account.register : t.account.signIn}
          </button>
        </p>
      </form>
    </div>
  );
}

function Dashboard() {
  const { t, productName } = useI18n();
  const { user, token, logout, refreshUser } = useAuth();
  const [orders, setOrders] = useState(null);
  const [profile, setProfile] = useState({ name: user.name || '', phone: user.phone || '', address: user.address || '' });
  const [saved, setSaved] = useState(false);
  const [savingBusy, setSavingBusy] = useState(false);

  useEffect(() => {
    let active = true;
    api.orders(token).then((d) => active && setOrders(d.orders || [])).catch(() => active && setOrders([]));
    return () => { active = false; };
  }, [token]);

  const set = (k) => (e) => setProfile((p) => ({ ...p, [k]: e.target.value }));

  const saveProfile = async (e) => {
    e.preventDefault();
    setSavingBusy(true);
    setSaved(false);
    try {
      const d = await api.updateMe(token, profile);
      refreshUser(d.user);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      /* ignore */
    } finally {
      setSavingBusy(false);
    }
  };

  const fmtDate = (iso) => new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className={styles.dash}>
      <div className={styles.dashHeader}>
        <div className={styles.avatar}><User size={30} /></div>
        <div className={styles.who}>
          <div className={styles.name}>{user.name}</div>
          <div className={styles.email}>{user.email}</div>
        </div>
        <button className={styles.signOut} onClick={logout}>
          <LogOut size={18} /> {t.account.signOut}
        </button>
      </div>

      <div className={styles.grid}>
        <form className={styles.panel} onSubmit={saveProfile}>
          <h2 className={styles.panelTitle}>{t.account.profile}</h2>
          <label className={styles.field}>
            <span>{t.account.name}</span>
            <input value={profile.name} onChange={set('name')} required />
          </label>
          <label className={styles.field}>
            <span>{t.account.phone}</span>
            <input value={profile.phone} onChange={set('phone')} inputMode="tel" />
          </label>
          <label className={styles.field}>
            <span>{t.account.address}</span>
            <input value={profile.address} onChange={set('address')} />
          </label>
          <button type="submit" className={styles.saveBtn} disabled={savingBusy}>
            {savingBusy ? t.account.working : saved ? t.account.saved : t.account.saveProfile}
          </button>
        </form>

        <div className={styles.panel}>
          <h2 className={styles.panelTitle}>{t.account.myOrders}</h2>
          {orders === null ? (
            <p className={styles.muted}>{t.account.working}</p>
          ) : orders.length === 0 ? (
            <div className={styles.noOrders}>
              <Package size={40} className={styles.noOrdersIcon} />
              <p className={styles.muted}>{t.account.noOrders}</p>
              <Link href="/" className={styles.shopLink}>{t.cartPage.startShopping} <ChevronRight size={16} /></Link>
            </div>
          ) : (
            <div className={styles.orders}>
              {orders.map((o) => (
                <div key={o.id} className={styles.order}>
                  <div className={styles.orderTop}>
                    <span className={styles.orderId}>{t.account.orderNo} #{o.id.slice(-6).toUpperCase()}</span>
                    <span className={`${styles.status} ${styles['s_' + o.status]}`}>{o.status}</span>
                  </div>
                  <div className={styles.orderMeta}>
                    {t.account.placedOn} {fmtDate(o.createdAt)} · {o.items.length} {o.items.length === 1 ? t.itemOne : t.itemMany}
                  </div>
                  <div className={styles.orderItems}>
                    {o.items.map((it) => (
                      <div key={it.id} className={styles.orderItem}>
                        <span>{productName({ title: it.productName }) } × {it.quantity} {it.unit}</span>
                        <span>{formatPrice(it.lineTotal)}</span>
                      </div>
                    ))}
                  </div>
                  <div className={styles.orderTotal}>{t.cartPage.grandTotal}: {formatPrice(o.total)}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
