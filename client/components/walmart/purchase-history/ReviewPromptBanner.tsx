import { useState, useRef, useCallback, useEffect } from 'react';
import { X } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';
import { Rating } from '@/components/ui/Rating';
import styles from './ReviewPromptBanner.module.css';

/* ── Interactive rating widget (mirrors OrderCard RatingWidget) ── */
function ProductRating({ name }: { name: string }) {
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(0);

  if (selected > 0) {
    return (
      <div className={styles.ratingRow}>
        <Rating value={selected} size="large" className={styles.ratingDisplay} aria-label={`Your rating: ${selected} out of 5 stars`} />
        <span className={styles.ratingThanks}>Thanks!</span>
      </div>
    );
  }

  return (
    <div className={styles.starsWrapper} onMouseLeave={() => setHovered(0)}>
      <Rating
        value={hovered || 0}
        size="large"
        className={styles.ratingDisplay}
        aria-hidden
      />
      <div className={styles.starOverlays} role="radiogroup" aria-label={`Rate ${name}`}>
        {[1, 2, 3, 4, 5].map(n => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={selected === n}
            aria-label={`${n} star${n > 1 ? 's' : ''}`}
            className={styles.starOverlayBtn}
            onMouseEnter={() => setHovered(n)}
            onClick={() => setSelected(n)}
          />
        ))}
      </div>
    </div>
  );
}

export interface ReviewProduct {
  name: string;
  imageSrc: string;
  rating?: number; // 0–5, supports .5
}

interface ReviewPromptBannerProps {
  products: ReviewProduct[];
  ctaIllustration?: string;
}

/* ── Desktop sub-components ── */

function CtaCard({ ctaIllustration }: { ctaIllustration?: string }) {
  return (
    <div className={styles.ctaCard}>
      <div className={styles.ctaText}>
        <p className={styles.ctaHeading}>What&rsquo;d you think?</p>
        <Button variant="secondary" size="small">Review more items</Button>
      </div>
      {ctaIllustration && (
        <img src={ctaIllustration} alt="Review items illustration" className={styles.ctaIllustration} />
      )}
    </div>
  );
}

function ProductReviewCard({ product }: { product: ReviewProduct }) {
  return (
    <div className={styles.productCard}>
      <img src={product.imageSrc} alt={product.name} className={styles.productImg} />
      <div className={styles.productInfo}>
        <p className={styles.productName}>{product.name}</p>
        <ProductRating name={product.name} />
      </div>
    </div>
  );
}

/* ── Mobile card sub-components ── */

function MobileCtaCard({ ctaIllustration }: { ctaIllustration?: string }) {
  return (
    <div className={styles.mobileCard}>
      <div className={styles.mobileCtaInner}>
        <div className={styles.mobileCtaContent}>
          <p className={styles.ctaHeading}>What&rsquo;d you think?</p>
          <Button variant="secondary" size="small">Review more items</Button>
        </div>
        {ctaIllustration && (
          <img src={ctaIllustration} alt="" aria-hidden="true" className={styles.mobileCtaIllustration} />
        )}
      </div>
    </div>
  );
}

function MobileCard({ product }: { product: ReviewProduct }) {
  return (
    <div className={styles.mobileCard}>
      <div className={styles.mobileCardInner}>
        <img src={product.imageSrc} alt={product.name} className={styles.mobileProductImg} />
        <div className={styles.mobileProductInfo}>
          <p className={styles.mobileProductName}>{product.name}</p>
          <ProductRating name={product.name} />
        </div>
      </div>
    </div>
  );
}

/* ── Main component ── */

const AUTO_ADVANCE_MS = 4000;

export function ReviewPromptBanner({ products, ctaIllustration }: ReviewPromptBannerProps) {
  const [dismissed, setDismissed] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isScrollingProgrammatically = useRef(false);

  const totalSlides = products.length + 1; // +1 for CTA card

  /* ── Measure card step (card width + gap) ── */
  const getCardStep = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return 0;
    const first = el.firstElementChild as HTMLElement | null;
    if (!first) return 0;
    // gap is 12px from CSS
    return first.offsetWidth + 12;
  }, []);

  /* ── Scroll to a specific slide index ── */
  const scrollToSlide = useCallback((index: number) => {
    const el = carouselRef.current;
    if (!el) return;
    const step = getCardStep();
    if (!step) return;
    isScrollingProgrammatically.current = true;
    el.scrollTo({ left: index * step, behavior: 'smooth' });
    // Reset flag after scroll animation (~500ms)
    setTimeout(() => { isScrollingProgrammatically.current = false; }, 600);
  }, [getCardStep]);

  /* ── Update active dot on manual scroll ── */
  const handleScroll = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    const step = getCardStep();
    if (!step) return;
    const idx = Math.round(el.scrollLeft / step);
    setActiveIndex(Math.min(idx, totalSlides - 1));
  }, [totalSlides, getCardStep]);

  /* ── Auto-advance ── */
  useEffect(() => {
    if (isPaused || dismissed) return;
    const id = setInterval(() => {
      setActiveIndex(prev => {
        const next = (prev + 1) % totalSlides;
        scrollToSlide(next);
        return next;
      });
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [isPaused, dismissed, totalSlides, scrollToSlide]);

  /* ── Dot click → also reset auto-advance by unpausing ── */
  const handleDotClick = (index: number) => {
    scrollToSlide(index);
    setActiveIndex(index);
    // Briefly pause so the auto-advance timer resets from this point
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), AUTO_ADVANCE_MS);
  };

  if (dismissed) return null;

  return (
    <section className={styles.wrapper}>
      {/* ── Desktop ── */}
      <div className={styles.desktop}>
        <div className={styles.titleRow}>
          <p className={styles.subtitle}>Help other customers by writing a review.</p>
          <IconButton aria-label="Dismiss review prompt" variant="ghost" size="large" onClick={() => setDismissed(true)}>
            <X />
          </IconButton>
        </div>
        <div className={styles.cardRow}>
          <CtaCard ctaIllustration={ctaIllustration} />
          {products.map((p, i) => <ProductReviewCard key={i} product={p} />)}
        </div>
      </div>

      {/* ── Mobile ── */}
      <div className={styles.mobile}>
        <div className={styles.mobileHeader}>
          <h2 className={styles.mobileHeading}>What&rsquo;d you think?</h2>
          <IconButton aria-label="Dismiss review prompt" variant="ghost" size="large" onClick={() => setDismissed(true)}>
            <X />
          </IconButton>
        </div>

        {/* No outer overflow wrapper — vertical padding on the carousel lets shadows breathe */}
        <div
          className={styles.carousel}
          ref={carouselRef}
          onScroll={handleScroll}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setTimeout(() => setIsPaused(false), AUTO_ADVANCE_MS)}
        >
          <MobileCtaCard ctaIllustration={ctaIllustration} />
          {products.map((p, i) => <MobileCard key={i} product={p} />)}
        </div>

        {totalSlides > 1 && (
          <div className={styles.dots}>
            {Array.from({ length: totalSlides }).map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ''}`}
                onClick={() => handleDotClick(i)}
                aria-label={`Go to card ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
