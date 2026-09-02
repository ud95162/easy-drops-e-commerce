"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useI18n } from '../i18n/LanguageProvider';
import styles from './HeroCarousel.module.css';

const slideImages = ['/hero_products.png'];

export default function HeroCarousel() {
  const { t } = useI18n();
  const slides = slideImages.map((image, i) => ({ id: i + 1, image, ...t.hero[i] }));
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={styles.heroSection}>
      <div
        className={styles.carousel}
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={slide.id} className={styles.slide}>
            <Image
              src={slide.image}
              alt=""
              width={613}
              height={407}
              priority={index === 0}
              className={styles.products}
            />
            <div className={styles.overlay}>
              <div className={styles.content}>
                <span className={styles.badge}>{slide.badge}</span>
                <h2 className={styles.title}>{slide.title}</h2>
                <p className={styles.description}>{slide.description}</p>
                <button className={styles.button}>
                  {slide.button}
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.controls}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === currentSlide ? styles.active : ''}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
