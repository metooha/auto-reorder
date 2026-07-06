import { CartArrow } from '@/components/icons/CartArrow';
import { Link } from '@/components/ui/Link';
import styles from './AmendsBanner.module.css';

interface AmendsBannerProps {
  /** Countdown text e.g. "2hr 35min left to add to your order" */
  message: string;
  /** Optional CTA link label, defaults to "Add items" */
  ctaLabel?: string;
  onCtaClick?: () => void;
}

export function AmendsBanner({ message, ctaLabel = 'Add items', onCtaClick }: AmendsBannerProps) {
  return (
    <div className={styles.banner}>
      <div className={styles.inner}>
        <CartArrow width={20} height={20} aria-hidden="true" />
        <span className={styles.message}>{message}</span>
      </div>
      <Link
        href="#"
        underline
        className={styles.cta}
        onClick={(e) => { e.preventDefault(); onCtaClick?.(); }}
      >
        {ctaLabel}
      </Link>
    </div>
  );
}
