import { BottomSheet } from '@/components/ui/BottomSheet';
import { Button } from '@/components/ui/Button';
import styles from './OutOfStockSheet.module.css';

interface OosItem {
  id: string;
  image: string;
  name: string;
  detail: string;
}

const OOS_ITEMS: OosItem[] = [
  {
    id: '1',
    image:
      'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F76eb5fcd25004ac295b4b7380eee76d8?format=webp&width=200',
    name: 'Crystal Whole Milk, 1 gal',
    detail: 'Out of stock at this store',
  },
];

interface OutOfStockSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OutOfStockSheet({ isOpen, onClose }: OutOfStockSheetProps) {
  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="1 item update"
      actions={
        <Button variant="primary" size="medium" isFullWidth strokeOn onClick={onClose}>
          Got it
        </Button>
      }
    >
      <p className={styles.intro}>
        This item is currently unavailable and will be removed from your order.
      </p>
      <ul className={styles.list}>
        {OOS_ITEMS.map((item) => (
          <li key={item.id} className={styles.item}>
            <img src={item.image} alt="" className={styles.thumb} />
            <div className={styles.info}>
              <span className={styles.name}>{item.name}</span>
              <span className={styles.detail}>{item.detail}</span>
            </div>
          </li>
        ))}
      </ul>
    </BottomSheet>
  );
}
