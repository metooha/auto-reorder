import React from 'react';
import { WCPAddToCart } from './WCPAddToCart';
import { CheckCircleFill } from '@/components/icons/CheckCircleFill';
import { Circle } from '@/components/icons/Circle';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { Badge } from '@/components/ui/Badge';
import styles from './CondensedItemTile.module.css';

export interface CondensedItemTileProps {
  /** Product image URL */
  image: string;
  /** Dollar portion of the price, e.g. "3" */
  price: string;
  /** Cents portion of the price, e.g. "25" */
  cents: string;
  /** Optional size/options tag text, e.g. "5 oz" */
  tag?: string;
  /** Tile variant: 'primary' (solid), 'tertiary' (bordered), or 'edit' (large edit mode) */
  variant?: 'primary' | 'tertiary' | 'edit';
  /** When true, image area fills its grid cell (for suggestion grids) */
  fillContainer?: boolean;
  /** When true, renders the tile at reduced opacity with no interaction */
  loading?: boolean;
  /** Callback fired when add-to-cart quantity changes */
  onAddToCart?: (count: number) => void;
  /** Product name — shown in edit variant */
  name?: string;
  /** Current quantity — shown in edit variant */
  quantity?: number;
  /** Callback when quantity changes in edit mode */
  onQuantityChange?: (q: number) => void;
  /** Whether item is checked/selected in edit mode */
  isChecked?: boolean;
  /** Toggle check state in edit mode */
  onCheckChange?: (checked: boolean) => void;
  /** Index for staggered animation delay */
  itemIndex?: number;
  /** Animation class name to apply */
  animationClass?: string;
  /** Quantity stepper variant override (edit mode) */
  stepperVariant?: 'primary' | 'secondary' | 'tertiary';
  /** Quantity stepper size override (edit mode) */
  stepperSize?: 'xsmall' | 'small' | 'medium' | 'large';
  /** When true, shows an LD count badge instead of the add-to-cart stepper */
  showQuantityBadge?: boolean;
  /** Variant override for the WCPAddToCart stepper */
  addToCartVariant?: 'primary' | 'primary-alt' | 'secondary' | 'tertiary';
}

export function CondensedItemTile({
  image,
  price,
  cents,
  tag,
  variant = 'primary',
  loading = false,
  onAddToCart,
  name,
  quantity = 0,
  onQuantityChange,
  isChecked = true,
  onCheckChange,
  itemIndex = 0,
  animationClass,
  fillContainer = false,
  stepperVariant = 'primary',
  stepperSize = 'medium',
  showQuantityBadge = false,
  addToCartVariant = 'primary',
}: CondensedItemTileProps) {
  const isEdit = variant === 'edit';

  // Unified tile that renders both states — CSS handles the transition
  return (
    <div
      className={[
        styles.tile,
        isEdit ? styles.tileEdit : '',
        loading ? styles.tileLoading : '',
        animationClass,
      ].filter(Boolean).join(' ')}
      style={{ '--item-delay': `${itemIndex * 41}ms` } as React.CSSProperties}
    >
      {/* Image area — grows from 96px to fill grid column in edit/fill mode */}
      <div className={[
        styles.imageArea,
        isEdit ? styles.imageAreaEdit : '',
        fillContainer ? styles.imageAreaFill : '',
      ].filter(Boolean).join(' ')}>
        {/* Inner clip — rounds the image corners without clipping the stepper overlay */}
        <div className={styles.imageClip}>
          <img
            src={image}
            alt={name || 'Product'}
            className={[
              styles.image,
              isEdit ? styles.imageEdit : '',
              fillContainer ? styles.imageFill : '',
            ].filter(Boolean).join(' ')}
          />

          {/* Checkmark — edit mode only, animated enter */}
          <button
            className={[styles.checkIcon, isEdit ? styles.checkIconVisible : ''].filter(Boolean).join(' ')}
            onClick={() => onCheckChange?.(!isChecked)}
            aria-label={isChecked ? 'Deselect item' : 'Select item'}
            tabIndex={isEdit ? 0 : -1}
          >
            {isChecked ? (
              <CheckCircleFill className={styles.checkSvg} />
            ) : (
              <Circle className={styles.checkSvgUnchecked} />
            )}
          </button>
        </div>

        {/* Quantity overlay — badge or add-to-cart stepper */}
        {!isEdit && onAddToCart && (
          <div className={styles.addToCartWrap}>
            {showQuantityBadge ? (
              quantity > 1 ? (
                <Badge
                  variant="neutral"
                  value={quantity}
                  aria-label={`${quantity} in delivery`}
                  className={styles.quantityBadge}
                />
              ) : null
            ) : (
              <WCPAddToCart variant={addToCartVariant} size="small" defaultCount={quantity} onChange={onAddToCart} />
            )}
          </div>
        )}
      </div>

      {/* Price row */}
      <div className={styles.priceRow}>
        <div className={styles.priceInner}>
          <span className={styles.dollarSign}>$</span>
          <span className={styles.price}>{price}</span>
          <sup className={styles.cents}>{cents}</sup>
        </div>
        {tag && (
          <span className={styles.tagText}>{tag}</span>
        )}
      </div>

      {/* Product name — always visible */}
      {name && !isEdit && (
        <div className={styles.productName}>{name}</div>
      )}

      {/* Edit-only details: name + quantity stepper — animated expand/collapse */}
      <div className={[styles.editDetails, isEdit ? styles.editDetailsVisible : ''].filter(Boolean).join(' ')}>
        {name && <div className={styles.editName}>{name}</div>}

        <QuantityStepper
          key={isChecked ? 'checked' : 'unchecked'}
          variant={stepperVariant}
          size={stepperSize}
          defaultCount={isChecked ? quantity : 0}
          showTrashOnRemove
          onChange={(q) => {
            if (!isChecked && q > 0) onCheckChange?.(true);
            onQuantityChange?.(q);
          }}
        />
      </div>
    </div>
  );
}
