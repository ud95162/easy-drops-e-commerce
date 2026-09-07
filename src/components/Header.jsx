'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, User, Languages, Truck } from 'lucide-react';
import { categories } from '../data/catalog';
import { useI18n } from '../i18n/LanguageProvider';
import { useCart } from '../store/CartProvider';
import SearchBar from './SearchBar';
import styles from './Header.module.css';

export default function Header() {
  const { t, toggle } = useI18n();
  const { count } = useCart();

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo}>
            <Image
              src="/logo.png"
              alt="EasyDrops"
              width={150}
              height={66}
              className={styles.logoImg}
              priority
            />
          </Link>

          <SearchBar />

          <div className={styles.actions}>
            <button
              className={styles.langButton}
              onClick={toggle}
              aria-label="Switch language"
            >
              <Languages size={18} />
              {t.switchTo}
            </button>
            <Link href="/account" className={styles.actionButton} aria-label={t.account}>
              <User size={24} />
            </Link>
            <Link href="/cart" className={styles.actionButton} aria-label={t.cart}>
              <ShoppingCart size={24} />
              {count > 0 && <span className={styles.badge}>{count}</span>}
            </Link>
          </div>
        </div>
      </header>

      <nav className={styles.categoriesNav}>
        <ul className={styles.categoriesList}>
          {categories.map((category) => (
            <li key={category.slug} className={styles.categoryItem}>
              <Link href={`/category/${category.slug}`} className={styles.categoryLink}>
                {t.categories[category.slug] || category.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.deliveryBar}>
        <Truck size={15} />
        <span>{t.freeDeliveryAreas}</span>
      </div>
    </>
  );
}
