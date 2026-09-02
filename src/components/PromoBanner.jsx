import Image from 'next/image';
import styles from './PromoBanner.module.css';

export default function PromoBanner() {
  return (
    <section className={styles.section} aria-label="Discounts on all items promotion">
      <a href="#" className={styles.banner}>
        <Image
          src="/promo_banner_discounts.png"
          alt="EasyDrops — Discounts on all items. Save big on groceries & household essentials."
          width={2000}
          height={1000}
          className={styles.image}
          sizes="(max-width: 1200px) 100vw, 1200px"
          priority={false}
        />
      </a>
    </section>
  );
}
