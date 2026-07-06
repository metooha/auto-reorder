import styles from './TempoBanner.module.css';

interface TempoBannerProps {
  /** Brand/logo name shown on the left */
  logo: string;
  /** Primary headline */
  headline: string;
  /** Supporting subtext */
  subtext?: string;
  /** Image URL for the right panel */
  imageSrc: string;
  /** Accessible alt text for the image */
  imageAlt: string;
  /** Background color of the image panel */
  imagePanelColor?: string;
  /** CTA link URL — wraps the whole banner */
  href?: string;
  /** Show "Sponsored" label */
  sponsored?: boolean;
  /** Click handler */
  onClick?: () => void;
}

function InfoCircleIcon() {
  return (
    <svg
      className={styles.sponsorIcon}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="7" cy="7" r="6.25" stroke="currentColor" strokeWidth="1.5" />
      <rect x="6.25" y="6" width="1.5" height="4.5" rx="0.75" fill="currentColor" />
      <rect x="6.25" y="3.5" width="1.5" height="1.5" rx="0.75" fill="currentColor" />
    </svg>
  );
}

export function TempoBanner({
  logo,
  headline,
  subtext,
  imageSrc,
  imageAlt,
  imagePanelColor = '#f5a623',
  href,
  sponsored = true,
  onClick,
}: TempoBannerProps) {
  const inner = (
    <>
      <div className={styles.content}>
        <span className={styles.logo}>{logo}</span>
        <div className={styles.text}>
          <span className={styles.headline}>{headline}</span>
          {subtext && <span className={styles.subtext}>{subtext}</span>}
        </div>
        {sponsored && (
          <div className={styles.sponsor}>
            <span className={styles.sponsorLabel}>Sponsored</span>
            <InfoCircleIcon />
          </div>
        )}
      </div>
      <div className={styles.imageWrap} style={{ background: imagePanelColor }}>
        <img src={imageSrc} alt={imageAlt} className={styles.image} />
      </div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={styles.banner}
        role="complementary"
        aria-label="Marketing banner"
        onClick={onClick}
      >
        {inner}
      </a>
    );
  }

  return (
    <div
      className={styles.banner}
      role="complementary"
      aria-label="Marketing banner"
      onClick={onClick}
    >
      {inner}
    </div>
  );
}
