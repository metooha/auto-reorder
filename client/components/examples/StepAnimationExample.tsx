import * as React from 'react';
import { StepAnimation } from '@/components/walmart/StepAnimation';
import styles from './StepAnimationExample.module.css';

export const StepAnimationExample: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <section className={styles.liveSection}>
        <h2 className={styles.sectionTitle}>Live Animation</h2>
        <p className={styles.sectionDescription}>
          Cycles through value props with smooth, bouncy transitions. Check items stagger in on Frame 1.
        </p>
        <div className={styles.demoCard}>
          <StepAnimation />
        </div>
      </section>
    </div>
  );
};
