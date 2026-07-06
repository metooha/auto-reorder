import { useEffect, useState } from 'react';
import styles from './SplashScreen.module.css';

export interface SplashScreenProps {
  /** Duration in ms the splash stays visible before fading out */
  duration?: number;
  onFinish?: () => void;
}

export function SplashScreen({ duration = 1600, onFinish }: SplashScreenProps) {
  const [exiting, setExiting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setExiting(true), duration);
    const t2 = setTimeout(() => {
      setDone(true);
      onFinish?.();
    }, duration + 350);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [duration, onFinish]);

  if (done) return null;

  return (
    <div
      className={`${styles.splash} ${exiting ? styles.splashExit : ''}`}
      role="status"
      aria-label="Walmart loading"
    >
      <img
        src="https://i5.walmartimages.com/dfw/63fd9f59-14e2/9d304ce6-96de-4331-b8ec-c5191226d378/v1/spark-icon.svg"
        alt=""
        className={styles.sparkIcon}
      />
      <span className={styles.wordmark}>Walmart</span>
    </div>
  );
}
