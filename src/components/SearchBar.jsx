'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Loader2, Tag, Image as ImageIcon } from 'lucide-react';
import { categories } from '../data/catalog';
import { api } from '../data/api';
import { formatPrice } from '../data/format';
import { useI18n } from '../i18n/LanguageProvider';
import styles from './SearchBar.module.css';

const norm = (s) => (s || '').toString().toLowerCase().trim();
const MAX_PRODUCTS = 8;
const MAX_CATEGORIES = 4;

export default function SearchBar() {
  const { t, lang, productName } = useI18n();
  const router = useRouter();

  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(-1);

  const boxRef = useRef(null);
  const inputRef = useRef(null);

  // Lazy-load the catalog once (on first focus/type).
  async function ensureLoaded() {
    if (loaded || loading) return;
    setLoading(true);
    const list = await api.products();
    setProducts(list);
    setLoaded(true);
    setLoading(false);
  }

  // Close on outside click / Escape.
  useEffect(() => {
    function onDoc(e) {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  // Category display name in the current language.
  const catName = (slug) => t.categories[slug] || categories.find((c) => c.slug === slug)?.name || '';

  const results = useMemo(() => {
    const q = norm(query);
    if (q.length < 1) return { cats: [], items: [] };

    // Matching categories (by English or localized name).
    const cats = categories
      .filter((c) => norm(c.name).includes(q) || norm(catName(c.slug)).includes(q))
      .slice(0, MAX_CATEGORIES);

    // Matching products by English name, Sinhala name, or category name.
    const items = products
      .filter((p) => {
        const cn = norm(catName(p.category)) + ' ' + norm(p.category);
        return (
          norm(p.title).includes(q) ||
          norm(p.sinhalaName).includes(q) ||
          cn.includes(q)
        );
      })
      .slice(0, MAX_PRODUCTS);

    return { cats, items };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, products, lang]);

  // Flat list for keyboard navigation: categories first, then products.
  const flat = useMemo(
    () => [
      ...results.cats.map((c) => ({ kind: 'cat', href: `/category/${c.slug}`, data: c })),
      ...results.items.map((p) => ({ kind: 'product', href: `/product/${p.id}`, data: p })),
    ],
    [results]
  );

  const hasResults = flat.length > 0;
  const showDropdown = open && query.trim().length >= 1;

  function go(href) {
    setOpen(false);
    setQuery('');
    setActive(-1);
    inputRef.current?.blur();
    router.push(href);
  }

  function onKeyDown(e) {
    if (!showDropdown) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, flat.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      const target = flat[active] || flat[0];
      if (target) {
        e.preventDefault();
        go(target.href);
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  }

  return (
    <div className={styles.wrap} ref={boxRef}>
      <div className={styles.inputRow}>
        <Search className={styles.icon} size={20} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          placeholder={t.searchPlaceholder}
          className={styles.input}
          onFocus={() => {
            ensureLoaded();
            setOpen(true);
          }}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setActive(-1);
            ensureLoaded();
          }}
          onKeyDown={onKeyDown}
          aria-label={t.searchPlaceholder}
          autoComplete="off"
        />
        {query && (
          <button
            className={styles.clear}
            onClick={() => {
              setQuery('');
              setActive(-1);
              inputRef.current?.focus();
            }}
            aria-label="Clear"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {showDropdown && (
        <div className={styles.dropdown} role="listbox">
          {loading && !loaded && (
            <div className={styles.state}>
              <Loader2 size={16} className={styles.spin} /> {t.searchLoading}
            </div>
          )}

          {loaded && !hasResults && (
            <div className={styles.state}>{t.searchNoResults}</div>
          )}

          {results.cats.length > 0 && (
            <div className={styles.group}>
              <div className={styles.groupTitle}>{t.searchCategories}</div>
              {results.cats.map((c, i) => {
                const idx = i;
                return (
                  <button
                    key={c.slug}
                    className={`${styles.row} ${active === idx ? styles.rowActive : ''}`}
                    onMouseEnter={() => setActive(idx)}
                    onClick={() => go(`/category/${c.slug}`)}
                  >
                    <span className={styles.catIcon}><Tag size={16} /></span>
                    <span className={styles.rowName}>{catName(c.slug)}</span>
                  </button>
                );
              })}
            </div>
          )}

          {results.items.length > 0 && (
            <div className={styles.group}>
              <div className={styles.groupTitle}>{t.searchProducts}</div>
              {results.items.map((p, i) => {
                const idx = results.cats.length + i;
                return (
                  <button
                    key={p.id}
                    className={`${styles.row} ${active === idx ? styles.rowActive : ''}`}
                    onMouseEnter={() => setActive(idx)}
                    onClick={() => go(`/product/${p.id}`)}
                  >
                    <span className={styles.thumb}>
                      {p.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.imageUrl} alt="" loading="lazy" decoding="async" />
                      ) : (
                        <ImageIcon size={16} className={styles.thumbPh} />
                      )}
                    </span>
                    <span className={styles.rowMain}>
                      <span className={styles.rowName}>{productName(p)}</span>
                      {p.category && (
                        <span className={styles.rowCat}>{catName(p.category)}</span>
                      )}
                    </span>
                    <span className={styles.rowPrice}>{formatPrice(p.discountedPrice)}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
