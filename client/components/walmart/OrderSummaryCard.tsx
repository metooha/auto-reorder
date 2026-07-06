import React from 'react';
import { Button } from '@/components/ui/Button';
import styles from './OrderSummaryCard.module.css';

export interface OrderSummaryCardProps {
  itemCount?: number;
  total?: string;
  estimatedTaxes?: string;
  paymentLast4?: string;
  onEdit?: () => void;
  hideHeader?: boolean;
}

/**
 * OrderSummaryCard
 *
 * Displays an order summary with estimated total, line items, and payment method.
 * Features an animated gradient stroke border (the "magic stroke" from LD 3.5).
 * Used when grouped item tiles need a checkout summary footer.
 *
 * When `hideHeader` is true, renders in compact mode: no animated border,
 * reduced padding, and no header row.
 */
export function OrderSummaryCard({
  itemCount = 14,
  total = '55.59',
  estimatedTaxes = '$0.00',
  paymentLast4 = '1234',
  onEdit,
  hideHeader = false,
}: OrderSummaryCardProps) {
  const [dollars, cents] = total.includes('.') ? total.split('.') : [total, '00'];
  const paddedCents = cents.padEnd(2, '0').slice(0, 2);

  if (hideHeader) {
    return (
      <div className={styles.compactWrapper}>
        {/* ── Line items ── */}
        <div className={styles.lineItems}>
          <div className={styles.lineRow}>
            <span className={styles.lineLabel}>
              <strong className={styles.lineLabelBold}>Total</strong>{' '}
              <span className={styles.lineMeta}>({itemCount} items)</span>
            </span>
            <span className={styles.lineValue}>${total}</span>
          </div>
          <div className={styles.lineRow}>
            <span className={styles.lineLabel}>Estimated taxes</span>
            <span className={styles.lineValue}>{estimatedTaxes}</span>
          </div>
        </div>

        <div className={styles.separator} />

        {/* ── Payment details ── */}
        <div className={styles.paymentRow}>
          <div className={styles.paymentLeft}>
            <span className={styles.paymentTitle}>Payment details</span>
            <div className={styles.paymentMethod}>
              {/* VISA logo SVG */}
              <svg width="38" height="12" viewBox="0 0 38 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Visa">
                <path d="M14.526 0.359375L9.71 11.6406H6.526L4.158 2.61719C4.013 2.03906 3.885 1.82031 3.437 1.58594C2.703 1.19531 1.484 0.828125 0.416 0.601562L0.483 0.359375H5.442C6.087 0.359375 6.668 0.804688 6.816 1.57031L8.041 8.39844L11.357 0.359375H14.526ZM27.3 7.85156C27.313 4.65625 22.949 4.48438 22.978 3.05469C22.987 2.625 23.389 2.16406 24.271 2.04688C24.709 1.98828 25.914 1.94531 27.327 2.63672L27.873 0.671875C27.14 0.398438 26.197 0.136719 25.025 0.136719C22.041 0.136719 19.924 1.75 19.907 4.08984C19.889 5.79688 21.414 6.74609 22.558 7.30469C23.735 7.87891 24.137 8.24609 24.131 8.76172C24.122 9.55469 23.172 9.90234 22.284 9.91797C20.703 9.94531 19.776 9.49219 19.038 9.14062L18.473 11.1758C19.214 11.5234 20.583 11.8281 22.001 11.8438C25.171 11.8438 27.289 10.25 27.3 7.85156ZM35.298 11.6406H38.116L35.638 0.359375H33.06C32.489 0.359375 32.005 0.695312 31.787 1.21875L27.352 11.6406H30.519L31.164 9.82422H35.041L35.298 11.6406ZM32.012 7.5L33.559 3.17969L34.44 7.5H32.012ZM18.695 0.359375L16.175 11.6406H13.157L15.679 0.359375H18.695Z" fill="#1A1F71"/>
              </svg>
              <span className={styles.paymentMask}>···· {paymentLast4}</span>
            </div>
          </div>

          <div className={styles.paymentAmount}>
            <span className={styles.paymentDollar}>$</span>
            <span className={styles.paymentDollars}>{dollars}</span>
            <span className={styles.paymentCents}>{paddedCents}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      {/* Animated gradient stroke border */}
      <div className={styles.strokeBorder} aria-hidden="true" />

      <div className={styles.card}>
        {/* ── Header row ── */}
        <div className={styles.headerRow}>
          <p className={styles.headerLabel}>
            Est.total{' '}
            <span className={styles.headerMeta}>({itemCount} items):</span>{' '}
            <strong className={styles.headerTotal}>${total}</strong>
          </p>
          <Button variant="secondary" size="small" onClick={onEdit}>
            Edit
          </Button>
        </div>

        <div className={styles.separator} />

        {/* ── Line items ── */}
        <div className={styles.lineItems}>
          <div className={styles.lineRow}>
            <span className={styles.lineLabel}>
              <strong className={styles.lineLabelBold}>Total</strong>{' '}
              <span className={styles.lineMeta}>({itemCount} items)</span>
            </span>
            <span className={styles.lineValue}>${total}</span>
          </div>
          <div className={styles.lineRow}>
            <span className={styles.lineLabel}>Estimated taxes</span>
            <span className={styles.lineValue}>{estimatedTaxes}</span>
          </div>
        </div>

        <div className={styles.separator} />

        {/* ── Payment details ── */}
        <div className={styles.paymentRow}>
          <div className={styles.paymentLeft}>
            <span className={styles.paymentTitle}>Payment details</span>
            <div className={styles.paymentMethod}>
              {/* VISA logo SVG */}
              <svg width="38" height="12" viewBox="0 0 38 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Visa">
                <path d="M14.526 0.359375L9.71 11.6406H6.526L4.158 2.61719C4.013 2.03906 3.885 1.82031 3.437 1.58594C2.703 1.19531 1.484 0.828125 0.416 0.601562L0.483 0.359375H5.442C6.087 0.359375 6.668 0.804688 6.816 1.57031L8.041 8.39844L11.357 0.359375H14.526ZM27.3 7.85156C27.313 4.65625 22.949 4.48438 22.978 3.05469C22.987 2.625 23.389 2.16406 24.271 2.04688C24.709 1.98828 25.914 1.94531 27.327 2.63672L27.873 0.671875C27.14 0.398438 26.197 0.136719 25.025 0.136719C22.041 0.136719 19.924 1.75 19.907 4.08984C19.889 5.79688 21.414 6.74609 22.558 7.30469C23.735 7.87891 24.137 8.24609 24.131 8.76172C24.122 9.55469 23.172 9.90234 22.284 9.91797C20.703 9.94531 19.776 9.49219 19.038 9.14062L18.473 11.1758C19.214 11.5234 20.583 11.8281 22.001 11.8438C25.171 11.8438 27.289 10.25 27.3 7.85156ZM35.298 11.6406H38.116L35.638 0.359375H33.06C32.489 0.359375 32.005 0.695312 31.787 1.21875L27.352 11.6406H30.519L31.164 9.82422H35.041L35.298 11.6406ZM32.012 7.5L33.559 3.17969L34.44 7.5H32.012ZM18.695 0.359375L16.175 11.6406H13.157L15.679 0.359375H18.695Z" fill="#1A1F71"/>
              </svg>
              <span className={styles.paymentMask}>···· {paymentLast4}</span>
            </div>
          </div>

          <div className={styles.paymentAmount}>
            <span className={styles.paymentDollar}>$</span>
            <span className={styles.paymentDollars}>{dollars}</span>
            <span className={styles.paymentCents}>{paddedCents}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
