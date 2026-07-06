import { useState, useEffect, useCallback } from 'react';
import { Check } from '@/components/icons';
import styles from './StepAnimation.module.css';

interface FrameData {
  headline: string;
  checkItems?: string[];
}

const FRAMES: FrameData[] = [
  {
    headline: 'Adding what you usually buy',
    checkItems: ['pantry items', 'easy dinners', 'kid-friendly snacks'],
  },
  {
    headline: 'Keeping an eye on discounts',
  },
  {
    headline: 'Getting your cart ready',
  },
];

// 3 frames × 967ms + 2 transitions × (200ms exit + 350ms enter) = ~4000ms total
export const STEP_DISPLAY_DURATION = 967;
export const STEP_ENTER_DURATION = 350;
export const STEP_EXIT_DURATION = 200;
export const STEP_FRAME_COUNT = 3;
// Total time to show all frames once:
// frames × display + (frames-1) × (exit + enter)
export const STEP_TOTAL_DURATION =
  STEP_FRAME_COUNT * STEP_DISPLAY_DURATION +
  (STEP_FRAME_COUNT - 1) * (STEP_EXIT_DURATION + STEP_ENTER_DURATION);

const DISPLAY_DURATION = STEP_DISPLAY_DURATION;
const EXIT_DURATION = STEP_EXIT_DURATION;

function MagicSparkleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="step-magic-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--ld-semantic-color-text-magic-start, #0053E2)" />
          <stop offset="50%" stopColor="var(--ld-semantic-color-text-magic-middle, #3D90EC)" />
          <stop offset="100%" stopColor="var(--ld-semantic-color-text-magic-stop, #79CDF6)" />
        </linearGradient>
      </defs>
      <path
        d="M22.2917 5.58333L24.6667 4.66667L25.5417 2.33333C25.5833 2.125 25.7917 2 26 2C26.1667 2 26.375 2.125 26.4167 2.33333L27.3333 4.66667L29.6667 5.58333C29.875 5.625 30 5.83333 30 6C30 6.20833 29.875 6.41667 29.6667 6.45833L27.3333 7.33333L26.4167 9.70833C26.375 9.875 26.1667 10 26 10C25.7917 10 25.5833 9.875 25.5417 9.70833L24.6667 7.33333L22.2917 6.45833C22.125 6.41667 22 6.20833 22 6C22 5.83333 22.125 5.625 22.2917 5.58333Z"
        fill="url(#step-magic-gradient)"
      />
      <path
        d="M2.56693 17.0576L3.63779 16.6178L4.14173 16.3665H4.20472L9.74803 13.7906L12.3307 8.19895L12.5827 7.69634L13.0866 6.62827C13.2126 6.25131 13.5906 6 13.9685 6C14.3465 6 14.7244 6.25131 14.9134 6.62827L15.4173 7.69634L15.6063 8.19895L15.6693 8.26178L18.189 13.7906L23.7953 16.3665L24.2992 16.6178L25.3701 17.1204C25.748 17.2461 26 17.623 26 18C26 18.377 25.748 18.7539 25.3701 18.9424L24.2992 19.3822L23.7953 19.6335L18.189 22.2094L15.6063 27.7382V27.801L15.3543 28.3037L14.9134 29.3717C14.7244 29.7487 14.3465 30 13.9685 30C13.5906 30 13.2126 29.7487 13.0866 29.3717L12.5827 28.3037L12.3307 27.801V27.7382L9.74803 22.2094L4.20472 19.6335H4.14173L3.63779 19.3822L2.56693 18.9424C2.18898 18.7539 2 18.377 2 18C2 17.623 2.18898 17.2461 2.56693 17.0576Z"
        fill="url(#step-magic-gradient)"
      />
    </svg>
  );
}

type AnimPhase = 'visible' | 'exiting' | 'entering';

export function StepAnimation() {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [phase, setPhase] = useState<AnimPhase>('entering');
  const [checksVisible, setChecksVisible] = useState(false);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const advanceFrame = useCallback(() => {
    if (prefersReducedMotion) {
      setCurrentFrame((prev) => (prev + 1) % FRAMES.length);
      setChecksVisible(true);
      return;
    }

    setPhase('exiting');
    setChecksVisible(false);

    setTimeout(() => {
      setCurrentFrame((prev) => (prev + 1) % FRAMES.length);
      setPhase('entering');

      setTimeout(() => {
        setPhase('visible');
        setChecksVisible(true);
      }, 350);
    }, EXIT_DURATION);
  }, [prefersReducedMotion]);

  useEffect(() => {
    // Show checks after initial enter
    const enterTimer = setTimeout(() => {
      setPhase('visible');
      setChecksVisible(true);
    }, 350);

    return () => clearTimeout(enterTimer);
  }, []);

  useEffect(() => {
    // Only start the display timer when the frame is fully visible
    if (phase !== 'visible') return;
    const timer = setTimeout(advanceFrame, DISPLAY_DURATION);
    return () => clearTimeout(timer);
  }, [currentFrame, phase, advanceFrame]);

  const frame = FRAMES[currentFrame];

  const frameClass = [
    styles.frame,
    phase === 'exiting' ? styles.exiting : '',
    phase === 'entering' ? styles.entering : '',
  ]
    .filter(Boolean)
    .join(' ');

  const iconClass = [styles.icon, phase === 'entering' ? styles.entering : '']
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.container}>
      <div className={frameClass}>
        <MagicSparkleIcon className={iconClass} />
        <div className={styles.headline}>{frame.headline}</div>
        {frame.checkItems && (
          <div className={styles.checkList}>
            {frame.checkItems.map((item) => (
              <div
                key={item}
                className={`${styles.checkItem}${checksVisible ? ` ${styles.visible}` : ''}`}
              >
                <Check className={styles.checkIcon} />
                <span className={styles.checkLabel}>{item}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
