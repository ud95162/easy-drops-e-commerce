'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Globe, Share2, Send } from 'lucide-react';
import { useI18n } from '../i18n/LanguageProvider';
import styles from './Footer.module.css';

export default function Footer() {
  const { t } = useI18n();
  const f = t.footer;

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div>
            <Link href="/" className={styles.logo}>
              <Image
                src="/logo.png"
                alt="EasyDrops"
                width={150}
                height={66}
                className={styles.logoImg}
              />
            </Link>
            <p className={styles.description}>{f.description}</p>
            <div className={styles.socials}>
              <Link href="#" className={styles.socialIcon}><Globe size={20} /></Link>
              <Link href="#" className={styles.socialIcon}><Share2 size={20} /></Link>
              <Link href="#" className={styles.socialIcon}><Send size={20} /></Link>
            </div>
          </div>

          <div>
            <h3 className={styles.heading}>{f.quickLinks}</h3>
            <ul className={styles.list}>
              <li><Link href="#" className={styles.link}>{f.aboutUs}</Link></li>
              <li><Link href="#" className={styles.link}>{f.shopCategories}</Link></li>
              <li><Link href="#" className={styles.link}>{f.latestOffers}</Link></li>
              <li><Link href="#" className={styles.link}>{f.faq}</Link></li>
              <li><Link href="#" className={styles.link}>{f.contactUs}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className={styles.heading}>{f.customerService}</h3>
            <ul className={styles.list}>
              <li><Link href="#" className={styles.link}>{f.trackOrder}</Link></li>
              <li><Link href="#" className={styles.link}>{f.returns}</Link></li>
              <li><Link href="#" className={styles.link}>{f.shipping}</Link></li>
              <li><Link href="#" className={styles.link}>{f.privacyPolicy}</Link></li>
              <li><Link href="#" className={styles.link}>{f.terms}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className={styles.heading}>{f.contact}</h3>
            <ul className={styles.list}>
              <li className={styles.link}>123 Fresh Lane, Green City</li>
              <li className={styles.link}>support@easydrops.com</li>
              <li className={styles.link}>+1 (800) 123-4567</li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} EasyDrops. {f.rights}</p>
          <div className={styles.bottomLinks}>
            <Link href="#" className={styles.link}>{f.privacy}</Link>
            <Link href="#" className={styles.link}>{f.termsShort}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
