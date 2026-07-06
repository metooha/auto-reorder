import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Rating } from "@/components/ui/Rating";
import { Spinner } from "@/components/ui/Spinner";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { WCPHeartView } from "./WCPHeartView";
import { WCPTimerView } from "./WCPTimerView";
import { FlashFill } from "@/components/icons/FlashFill";
import { WalmartPlusLogoIcon } from "@/components/icons-custom/WalmartPlusLogoIcon";
import { useWalmartScenario } from "@/contexts/WalmartScenarioContext";
import styles from "./ProductCardList.module.css";

export interface ProductCardListProps {
  image: string;
  name: string;
  price: string;
  cents: string;
  wasPrice?: string;
  flag?: string;
  flagVariant?: 'default' | 'red' | 'lightBlue';
  /** "Sponsored" label shown top-right of image column */
  sponsored?: boolean;
  rating: number;
  ratingCount: string;
  pickup?: string;
  stock?: string;
  cue?: string;
  brand?: string;
  unitPrice?: string;
  ebt?: boolean;
  /** SNAP eligible badge (green) */
  snapEligible?: boolean;
  /** Social proof banner e.g. "1000+ bought since yesterday" */
  socialProof?: string;
  /** "+ N sizes" badge shown bottom-left of image column */
  sizesCount?: number;
  /** ⚡ Express delivery cue, e.g. "1 hour" */
  expressDelivery?: string;
  /** W+ free delivery cue, e.g. "2pm" */
  wplusDelivery?: string;
  /** W+ free shipping cue, e.g. "arrives tomorrow" */
  wplusShipping?: string;
  /** CTA button label — "Add to cart" (default) or "Options" */
  ctaLabel?: string;
  onAddToCart?: () => void;
  /** Optional countdown end time — shows a badge timer over the image */
  timerEndTime?: Date | number | string;
  timerLabel?: string;
}

export function ProductCardList({
  image,
  name,
  price,
  cents,
  wasPrice,
  flag,
  flagVariant = 'lightBlue',
  sponsored,
  rating,
  ratingCount,
  pickup,
  stock,
  cue,
  unitPrice,
  ebt,
  snapEligible,
  socialProof,
  sizesCount,
  expressDelivery,
  wplusDelivery,
  wplusShipping,
  ctaLabel = 'Add to cart',
  onAddToCart,
  timerEndTime,
  timerLabel = 'Ends in',
}: ProductCardListProps) {
  const navigate = useNavigate();
  const { setCartItemQuantity, cartItems } = useWalmartScenario();
  const cartId = `cart-pcl-${name}`;
  const slugify = (s: string) =>
    s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
  const inCart = cartItems.find((c) => c.id === cartId)?.quantity ?? 0;
  const [cartQty, setCartQty] = useState(inCart);
  const [cartLoading, setCartLoading] = useState(false);

  const commitCartQty = (qty: number) => {
    setCartQty(qty);
    const priceNum = parseFloat(`${price}.${cents.padStart(2, '0')}`);
    setCartItemQuantity({ id: cartId, image, name, price: priceNum }, qty);
    if (qty > 0) onAddToCart?.();
  };

  const handleAddToCart = () => {
    if (ctaLabel === 'Options') {
      const slug = name.toLowerCase().startsWith('tim hortons')
        ? 'tim-hortons-coffee'
        : slugify(name);
      navigate(`/walmart/product/${slug}`);
      return;
    }
    setCartLoading(true);
    setTimeout(() => {
      setCartLoading(false);
      commitCartQty(1);
    }, 3000);
  };
  return (
    <div className={styles.card}>
      {/* Social proof banner above card */}
      {socialProof && (
        <div className={styles.socialProofBanner}>
          <span className={styles.socialProofText}>{socialProof}</span>
        </div>
      )}

      <div className={styles.cardBody}>
        {/* Image column */}
        <div className={styles.imageCol}>
          {flag && (
            <div className={[
              styles.flag,
              flagVariant === 'red' ? styles.flagRed : '',
              flagVariant === 'lightBlue' ? styles.flagLightBlue : '',
            ].filter(Boolean).join(' ')}>
              {flag}
            </div>
          )}
          <div className={styles.imageWrap}>
            <div className={styles.favoriteButton}>
              <WCPHeartView size="small" calloutPosition="right" />
            </div>
            {sponsored && (
              <span className={styles.sponsored}>Sponsored</span>
            )}
            <img src={image} alt={name} className={styles.productImage} />
            {timerEndTime && (
              <div className={styles.timerBadge}>
                <WCPTimerView endTime={timerEndTime} variant="badge" label={timerLabel} showLabel={false} />
              </div>
            )}
            {sizesCount && (
              <div className={styles.sizesBadge}>+ {sizesCount} sizes</div>
            )}
          </div>
        </div>

        {/* Content column */}
        <div className={styles.contentCol}>
          {/* Price */}
          <div className={[styles.priceRow, wasPrice ? styles.priceRowSavings : ''].filter(Boolean).join(' ')}>
            {wasPrice && (
              <span className={styles.prefix}>Now </span>
            )}
            <span className={styles.dollarSign}>$</span>
            <span className={styles.price}>{price}</span>
            <span className={styles.cents}>{cents}</span>
            {wasPrice && (
              <span className={styles.priceStrike}>{wasPrice}</span>
            )}
          </div>

          {unitPrice && <p className={styles.unitPrice}>{unitPrice}</p>}

          <p className={styles.productName}>{name}</p>

          {cue && <p className={styles.cue}>{cue}</p>}

          <div className={styles.ratingRow}>
            <Rating value={rating} size="small" />
            <span className={styles.ratingCount}>{ratingCount}</span>
          </div>

          {ebt && (
            <span className={styles.ebt}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <rect x="1" y="3" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M1 6h14" stroke="currentColor" strokeWidth="1.2"/>
                <rect x="3" y="8.5" width="4" height="1.5" rx=".5" fill="currentColor"/>
              </svg>
              EBT eligible
            </span>
          )}
          {snapEligible && (
            <span className={styles.ebt}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <rect x="1" y="3" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M1 6h14" stroke="currentColor" strokeWidth="1.2"/>
                <rect x="3" y="8.5" width="4" height="1.5" rx=".5" fill="currentColor"/>
              </svg>
              SNAP eligible
            </span>
          )}

          {/* Delivery cues */}
          {(expressDelivery || wplusDelivery || wplusShipping || pickup) && (
            <div className={styles.deliveryCues}>
              {expressDelivery && (
                <div className={styles.expressBadge}>
                  <FlashFill
                    width={14}
                    height={14}
                    aria-hidden="true"
                    style={{ color: 'var(--wcp-semantic-color-fill-accent-spark, #ffc220)' }}
                  />
                  <span>Delivery as soon as <strong>{expressDelivery}</strong></span>
                </div>
              )}
              {wplusDelivery && (
                <div className={styles.cueRow}>
                  <WalmartPlusLogoIcon width={24} height={16} aria-hidden="true" />
                  <span className={styles.cueWplus}>Free delivery as soon as <strong>{wplusDelivery}</strong></span>
                </div>
              )}
              {wplusShipping && (
                <div className={styles.cueRow}>
                  <WalmartPlusLogoIcon width={24} height={16} aria-hidden="true" />
                  <span className={styles.cueWplus}>
                    Free shipping, {wplusShipping.split(' ').slice(0, -1).join(' ')}{' '}
                    <strong>{wplusShipping.split(' ').slice(-1)[0]}</strong>
                  </span>
                </div>
              )}
              {pickup && (
                <div className={styles.cueRow}>
                  <span className={styles.cueSubtle}>Pickup as soon as <strong>{pickup}</strong></span>
                </div>
              )}
            </div>
          )}

          {/* Legacy pickup / stock */}
          {!expressDelivery && !wplusDelivery && !wplusShipping && pickup && (
            <p className={styles.pickup}>
              Pickup <span className={styles.pickupBold}>{pickup}</span>
            </p>
          )}

          {stock && <p className={styles.stock}>{stock}</p>}

          <div className={styles.addToCart}>
            {cartQty === 0 ? (
              cartLoading ? (
                <div
                  className={styles.cartLoadingPill}
                  aria-label="Adding to cart…"
                  aria-busy="true"
                  role="status"
                >
                  <Spinner size="small" color="white" a11yLabel="Adding to cart…" />
                </div>
              ) : (
                <Button variant="primary" size="small" onClick={handleAddToCart}>
                  {ctaLabel}
                </Button>
              )
            ) : (
              <QuantityStepper
                variant="primary"
                size="small"
                defaultCount={cartQty}
                addLabel={ctaLabel}
                countLabel="cart"
                startExpanded
                inlineLabel
                onChange={commitCartQty}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
