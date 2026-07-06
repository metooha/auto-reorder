import { QuantityStepper } from "@/components/ui/QuantityStepper";
import styles from "./PromotionalItemTile.module.css";

export interface PromotionalItemTileProps {
  image: string;
  price: string;
  cents: string;
  idx: number;
  onQuantityChange: (idx: number, qty: number) => void;
}

export function PromotionalItemTile({
  image,
  price,
  cents,
  idx,
  onQuantityChange,
}: PromotionalItemTileProps) {
  return (
    <div className={styles.tile}>
      <div className={styles.stepperWrapper}>
        <QuantityStepper
          variant="tertiary"
          size="small"
          showAddLabel={false}
          onChange={(qty) => onQuantityChange(idx, qty)}
        />
      </div>
      <div className={styles.imageWrapper}>
        <img src={image} alt="Product" className={styles.image} />
      </div>
      <div className={styles.footer}>
        <div className={styles.priceRow}>
          <span className={styles.dollarSign}>$</span>
          <span className={styles.price}>{price}</span>
          <span className={styles.cents}>{cents}</span>
        </div>
      </div>
    </div>
  );
}
