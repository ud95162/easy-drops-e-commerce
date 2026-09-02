'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { dictionary } from './dictionary';

const LanguageContext = createContext(null);

const STORAGE_KEY = 'easydrops-lang';

export function LanguageProvider({ children }) {
  // Start in English on both server and first client render to avoid a
  // hydration mismatch; adopt the saved choice after mount.
  const [lang, setLangState] = useState('en');

  useEffect(() => {
    const saved = typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY);
    if (saved === 'si' || saved === 'en') setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback(() => {
    setLang(lang === 'en' ? 'si' : 'en');
  }, [lang, setLang]);

  const t = dictionary[lang] || dictionary.en;

  // Product display name: Sinhala name in Sinhala mode, else English.
  const productName = useCallback(
    (product) =>
      lang === 'si' && product?.sinhalaName ? product.sinhalaName : product?.title,
    [lang]
  );

  const value = { lang, setLang, toggle, t, productName };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useI18n must be used within LanguageProvider');
  return ctx;
}
