import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';
import { ChevronLeftIcon } from '@/components/icons/ChevronLeftIcon';
import { ChevronRightIcon } from '@/components/icons/ChevronRightIcon';
import { PauseIcon } from '@/components/icons/PauseIcon';
import { PlayFillIcon } from '@/components/icons/PlayFillIcon';
import styles from './NewArrivalsCarousel.module.css';

const SLIDES = [
  {
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/4b39e8f1df8751e16cafff1be17c820421c14da9?width=3224',
    eyebrow: 'Deals too big to miss',
    headline: 'Up to 45% off top brands',
    ctaText: 'Shop Deals',
    ctaHref: '/deals',
  },
  {
    image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F7941dff9d8b44caea6e922b3def671e8?format=webp&width=1600',
    eyebrow: 'Up to 40% off red, white & so you',
    headline: 'Last-minute July 4th faves',
    ctaText: 'Shop now',
    ctaHref: '/july4th',
  },
];

const INTERVAL_MS = 4000;

export function NewArrivalsCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = useCallback(() => {
    setCurrent((c) => (c + 1) % SLIDES.length);
  }, []);

  const prev = () => {
    setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);
    setIsPaused(true);
  };

  const next = () => {
    setCurrent((c) => (c + 1) % SLIDES.length);
    setIsPaused(true);
  };

  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(advance, INTERVAL_MS);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isPaused, advance]);

  const slide = SLIDES[current];

  return (
    <div className={styles.carousel}>
      {/* Background image */}
      <img
        src={slide.image}
        alt={slide.headline}
        className={styles.bgImage}
      />

      {/* Text overlay — top-left */}
      <div className={styles.textPanel}>
        <div className={styles.eyebrow}>{slide.eyebrow}</div>
        <div className={styles.headline}>{slide.headline}</div>
        <div>
          <Button variant="secondary" size="small">
            {slide.ctaText}
          </Button>
        </div>
      </div>

      {/* Controls — top-right */}
      <div className={styles.controls}>
        <IconButton
          aria-label="Previous slide"
          variant="ghost"
          size="small"
          onClick={prev}
          UNSAFE_className={styles.controlBtn}
        >
          <ChevronLeftIcon />
        </IconButton>
        <IconButton
          aria-label={isPaused ? 'Play carousel' : 'Pause carousel'}
          variant="ghost"
          size="small"
          onClick={() => setIsPaused((p) => !p)}
          UNSAFE_className={styles.controlBtn}
        >
          {isPaused ? <PlayFillIcon /> : <PauseIcon />}
        </IconButton>
        <IconButton
          aria-label="Next slide"
          variant="ghost"
          size="small"
          onClick={next}
          UNSAFE_className={styles.controlBtn}
        >
          <ChevronRightIcon />
        </IconButton>
      </div>
    </div>
  );
}
