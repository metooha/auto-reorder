import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';
import { ChevronLeft, ChevronRight, Pause, PlayFill } from '@/components/icons';
import styles from './NewArrivalsCarousel.module.css';

interface Slide {
  image: string;
  eyebrow: string;
  headline: string;
  headlineParts?: string[];
  ctaText: string;
  objectPosition: string;
}

const SLIDES: Slide[] = [
  {
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/4b39e8f1df8751e16cafff1be17c820421c14da9?width=3224',
    eyebrow: 'Deals too big to miss',
    headline: 'Up to 45% off top brands',
    headlineParts: ['Up to 45% off', 'top brands'],
    ctaText: 'Shop Deals',
    objectPosition: '30% center',
  },
  {
    image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F7941dff9d8b44caea6e922b3def671e8?format=webp&width=1600',
    eyebrow: 'Deals too big to miss',
    headline: 'Last-minute July 4th faves',
    ctaText: 'Shop now',
    objectPosition: 'center center',
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

  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(advance, INTERVAL_MS);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isPaused, advance]);

  const slide = SLIDES[current];

  const headlineContent = slide.headlineParts
    ? slide.headlineParts.map((part, i) => (
        <span key={i} style={{ display: 'block' }}>{part}</span>
      ))
    : slide.headline;

  return (
    <div className={styles.carousel}>
      <img
        src={slide.image}
        alt={slide.headline}
        className={styles.bgImage}
        style={{ objectPosition: slide.objectPosition }}
      />

      <div className={styles.textPanel}>
        <div className={styles.eyebrow}>{slide.eyebrow}</div>
        <div className={styles.headline}>{headlineContent}</div>
        <div>
          <Button variant="secondary" size="small">{slide.ctaText}</Button>
        </div>
      </div>

      <div className={styles.controls}>
        <IconButton
          aria-label="Previous slide"
          floating
          size="small"
          onClick={() => { setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length); setIsPaused(true); }}
          UNSAFE_className={styles.controlBtn}
        >
          <ChevronLeft />
        </IconButton>
        <IconButton
          aria-label={isPaused ? 'Play carousel' : 'Pause carousel'}
          floating
          size="small"
          onClick={() => setIsPaused((p) => !p)}
          UNSAFE_className={styles.controlBtn}
        >
          {isPaused ? <PlayFill /> : <Pause />}
        </IconButton>
        <IconButton
          aria-label="Next slide"
          floating
          size="small"
          onClick={() => { setCurrent((c) => (c + 1) % SLIDES.length); setIsPaused(true); }}
          UNSAFE_className={styles.controlBtn}
        >
          <ChevronRight />
        </IconButton>
      </div>
    </div>
  );
}
