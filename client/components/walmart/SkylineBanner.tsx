import styles from './SkylineBanner.module.css';

interface SkylineBannerProps {
  logoSrc: string;
  logoAlt: string;
  headline: string;
  subtext: string;
  imageSrc: string;
  imageAlt: string;
}

export function SkylineBanner({ logoSrc, logoAlt, headline, subtext, imageSrc, imageAlt }: SkylineBannerProps) {
  return (
    <div className={styles.banner}>
      <div className={styles.left}>
        <img src={logoSrc} alt={logoAlt} className={styles.logo} />
        <div className={styles.textGroup}>
          <span className={styles.headline}>{headline}</span>
          <span className={styles.subtext}>{subtext}</span>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.sponsored}>
          <span className={styles.sponsoredLabel}>Sponsored</span>
          <button className={styles.infoBtn} aria-label="Ad info">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ color: 'var(--ld-semantic-color-text-subtle)' }}>
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
              <rect x="7.25" y="7" width="1.5" height="5" rx="0.75" fill="currentColor" />
              <rect x="7.25" y="4.5" width="1.5" height="1.5" rx="0.75" fill="currentColor" />
            </svg>
          </button>
        </div>
        <img src={imageSrc} alt={imageAlt} className={styles.productImage} />
      </div>
    </div>
  );
}
