import { useCallback } from 'react';
import { Button } from '@/components/ui/Button';
import { MagicFill } from '@/components/icons';
import styles from './OnboardingBottomSheet.module.css';

interface OnboardingBottomSheetProps {
  selectedDay: string;
  selectedTime: string;
  onChangeDayTime: () => void;
  onViewUsuals: () => void;
}

export function OnboardingBottomSheet({
  selectedDay,
  selectedTime,
  onChangeDayTime,
  onViewUsuals,
}: OnboardingBottomSheetProps) {
  const handleScrimClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) return;
  }, []);

  return (
    <div className={styles.scrim} onClick={handleScrimClick}>
      <div className={styles.sheet}>
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/9b6d8a55f90c242ac141216aed48aeaabde06936?width=750"
          alt=""
          className={styles.background}
        />
        <div className={styles.content}>
          <div className={styles.grabber} />
          <div className={styles.innerContent}>
            <div className={styles.titleBlock}>
              <div className={styles.title}>
                Rest easy—get your groceries delivered every{' '}
                <span className={styles.titleUnderline}>{selectedDay}</span> at{' '}
                <span className={styles.titleUnderline}>{selectedTime}</span>
              </div>
              <button
                className={styles.changeDayTime}
                onClick={onChangeDayTime}
                type="button"
              >
                Change day &amp; time
              </button>
            </div>
            <div className={styles.visual}>
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/171cfbc3f0fc02a2d28dfad5a6afbac8b5eb2c57?width=1038"
                alt="Groceries"
                className={styles.groceriesImage}
              />
              <div className={styles.curatedRow}>
                <MagicFill width={16} height={16} />
                <span className={styles.curatedText}>
                  Curated for you, based on your history
                </span>
              </div>
            </div>
          </div>
          <div className={styles.ctaSection}>
            <div className={styles.subtitle}>Add, edit, or pause anytime.</div>
            <div className={styles.buttonWrapper}>
              <Button
                variant="primary"
                size="medium"
                isFullWidth
                onClick={onViewUsuals}
              >
                View your usuals
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
