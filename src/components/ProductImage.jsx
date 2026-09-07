'use client';

import { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

/**
 * Product image that loads lazily (only when scrolled near the viewport, so
 * a grid of many products doesn't fire all image requests at once) and
 * auto-retries with backoff if a request fails — the POS image endpoint can
 * briefly error under load, and this recovers without a manual page refresh.
 */
export default function ProductImage({ src, alt = '', className, placeholderClass }) {
  const [attempt, setAttempt] = useState(0);
  const [dead, setDead] = useState(false);

  if (!src || dead) {
    return <ImageIcon className={placeholderClass || className} strokeWidth={1} />;
  }

  // On retry, add a changing query param to force a fresh request (a failed
  // load is otherwise not retried by the browser).
  const url = attempt === 0 ? src : `${src}${src.includes('?') ? '&' : '?'}r=${attempt}`;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      key={attempt}
      src={url}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => {
        if (attempt < 4) {
          const next = attempt + 1;
          setTimeout(() => setAttempt(next), 500 * next);
        } else {
          setDead(true);
        }
      }}
    />
  );
}
