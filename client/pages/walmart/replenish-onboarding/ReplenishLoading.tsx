import { useEffect } from 'react';
import { MagicFill, Check } from '@/components/icons';
import { PRODUCT_IMAGES } from '@/components/walmart/productImages';
import styles from './ReplenishLoading.module.css';

const LOADING_PRODUCTS = [
  PRODUCT_IMAGES.airFryer,
  PRODUCT_IMAGES.cookwareSet,
  PRODUCT_IMAGES.mugSet,
  PRODUCT_IMAGES.cordlessVacuum,
  PRODUCT_IMAGES.comforterSet,
  PRODUCT_IMAGES.headphones,
  PRODUCT_IMAGES.tablet,
  PRODUCT_IMAGES.digitalCamera,
  PRODUCT_IMAGES.boucleArmchair,
];

const VALUE_PROPS = ['pantry items', 'easy dinners', 'kid-friendly snacks'];

interface ReplenishLoadingProps {
  selectedDay: string;
  selectedTime: string;
  onLoadingComplete: () => void;
}

export function ReplenishLoading({
  selectedDay,
  selectedTime,
  onLoadingComplete,
}: ReplenishLoadingProps) {
  useEffect(() => {
    const timer = setTimeout(onLoadingComplete, 4000);
    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  const rows = [];
  for (let i = 0; i < LOADING_PRODUCTS.length; i += 3) {
    rows.push(LOADING_PRODUCTS.slice(i, i + 3));
  }

  return (
    <div className={styles.page}>
      <div className={styles.section}>
        <div className={styles.header}>
          <div className={styles.headerTitle}>Shop easily with items you buy often</div>
          <div className={styles.headerSub}>
            Get it by <span className={styles.headerSubLink}>{selectedDay}, {selectedTime}</span>
          </div>
        </div>
        <div className={styles.contentProducts}>
          {rows.map((row, rowIdx) => (
            <div key={rowIdx} className={styles.productRow}>
              {row.map((img, colIdx) => (
                <div key={colIdx} className={styles.tile}>
                  <div className={styles.tileImage}>
                    <img src={img} alt="" className={styles.tileImg} />
                  </div>
                </div>
              ))}
            </div>
          ))}
          <div className={styles.stepAnimation}>
            <MagicFill width={32} height={32} />
            <div className={styles.magicTitle}>Adding what you usually buy</div>
            <div className={styles.valueProps}>
              {VALUE_PROPS.map((prop) => (
                <div key={prop} className={styles.valueProp}>
                  <Check width={16} height={16} />
                  <span className={styles.valuePropText}>{prop}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.skeletonBar}>
          <div className={styles.skeleton}>
            <div className={styles.skeletonGlow} />
          </div>
        </div>
      </div>
    </div>
  );
}
