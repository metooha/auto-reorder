import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from '@/components/ui/Link';
import { IconButton } from '@/components/ui/IconButton';
import { CloseIcon } from '@/components/icons/CloseIcon';
import styles from './OrderStatusBanner.module.css';

export function OrderStatusBanner() {
  const navigate = useNavigate();
  const [isClosed, setIsClosed] = useState(false);

  if (isClosed) return null;

  return (
    <div className={styles.banner}>
      {/* Pickup icon */}
      <img
        src="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F5f02b529221349099118d275e7e1d748"
        alt="Order status"
        width="24"
        height="24"
        className={styles.icon}
      />

      {/* Text content */}
      <div className={styles.content}>
        <span className={styles.text}>Your order is on the way</span>
        <span className={styles.separator}>|</span>
        <span className={styles.emphasis}>Arrives tomorrow by 8pm</span>
        <span className={styles.separator}>|</span>
        <Link
          onClick={(e) => { e.preventDefault(); navigate('/purchase-history'); }}
          href="/purchase-history"
          variant="default"
          underline
        >
          Track
        </Link>
      </div>

      {/* Close */}
      <IconButton
        aria-label="Dismiss order status"
        variant="ghost"
        size="small"
        onClick={(e) => { e.stopPropagation(); setIsClosed(true); }}
        UNSAFE_className={styles.closeButton}
      >
        <CloseIcon />
      </IconButton>
    </div>
  );
}
