import { useState } from "react";
import { CloseIcon } from "@/components/icons-custom";
import { Link } from "@/components/ui/Link";
import { IconButton } from "@/components/ui/IconButton";
import styles from "./OrderStatusCard.module.css";

interface OrderStatusCardProps {
  image: string;
  statusLine: string;
  deliveryLine: string;
  trackHref: string;
}

export function OrderStatusCard({
  image,
  statusLine,
  deliveryLine,
  trackHref,
}: OrderStatusCardProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className={styles.card}>
      <img src={image} alt="Order status" className={styles.productImage} />
      <div className={styles.info}>
        <span className={styles.statusLine}>{statusLine}</span>
        <span className={styles.deliveryLine}>{deliveryLine}</span>
        <Link
          href={trackHref}
          variant="default"
          underline
          className={styles.trackLink}
        >
          Track
        </Link>
      </div>
      <IconButton
        aria-label="Dismiss order status"
        variant="ghost"
        size="small"
        UNSAFE_style={{ flexShrink: 0 }}
        onClick={() => setDismissed(true)}
      >
        <CloseIcon />
      </IconButton>
    </div>
  );
}
