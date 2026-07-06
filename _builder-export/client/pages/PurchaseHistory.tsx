import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from '@/components/ui/Breadcrumb';
import { TempoBanner } from '@/components/TempoBanner';
import styles from '@/styles/PurchaseHistory.module.css';

export default function PurchaseHistory() {
  return (
    <div className={styles.page}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumbRow}>
        <Breadcrumb aria-label="Purchase history navigation">
          <BreadcrumbItem href="/account">Account</BreadcrumbItem>
          <BreadcrumbItem isCurrent>Purchase History</BreadcrumbItem>
        </Breadcrumb>
      </div>

      {/* Marketing Banner */}
      <div className={styles.bannerRow}>
        <TempoBanner
          logo="TANYÉ"
          headline="Enhance your kitchen with top tools"
          subtext="Cook like a pro with the best equipment."
          imageSrc="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F9da629883752404c81be027bfcaa178c?format=webp&width=800&height=1200"
          imageAlt="TANYÉ kitchen product"
          imagePanelColor="#f5a623"
          sponsored
        />
      </div>

      {/* Empty state placeholder — replace with order list content */}
      <div className={styles.emptyState}>
        <p className={styles.emptyStateTitle}>No purchases yet</p>
        <p className={styles.emptyStateSubtext}>
          When you place an order on Walmart.com, it will show up here so you can track, return, or buy it again.
        </p>
      </div>
    </div>
  );
}
