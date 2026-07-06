import { useState } from "react";
import { useWalmartScenario } from '@/contexts/WalmartScenarioContext';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { Rating } from '@/components/ui/Rating';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { Select, SelectItem } from '@/components/ui/Select';
import { WCPHeartView } from './WCPHeartView';
import { FlashFill } from '@/components/icons/FlashFill';
import { Refresh } from '@/components/icons/Refresh';
import { WalmartPlusLogoIcon } from '@/components/icons-custom/WalmartPlusLogoIcon';
import styles from './ProductCardListDelivery.module.css';

export interface ProductCardListDeliveryProps {
  image: string;
  name: string;
  price: string;
  cents: string;
  unitPrice?: string;
  flag?: string;
  flagVariant?: 'default' | 'red' | 'lightBlue';
  rating: number;
  ratingCount: string;
  /** Options available in the "Change option" dropdown, e.g. ['Single', 'Pack'] */
  options?: string[];
  /** Express delivery cue, e.g. "1 hour" */
  expressDelivery?: string;
  /** W+ free delivery time, e.g. "2pm" */
  wplusDelivery?: string;
  /** Pickup time, e.g. "2pm" */
  pickup?: string;
  /** Show subscribe option */
  showSubscribe?: boolean;
  /** Delivery window label shown under "Add to delivery", e.g. "Today, 4pm–5pm" */
  deliveryWindow?: string;
  onAddToCart?: (qty: number) => void;
  onAddToDelivery?: (qty: number) => void;
}

export function ProductCardListDelivery({
  image,
  name,
  price,
  cents,
  unitPrice,
  flag,
  flagVariant = 'lightBlue',
  rating,
  ratingCount,
  options,
  expressDelivery,
  wplusDelivery,
  pickup,
  showSubscribe = true,
  deliveryWindow = 'Fri, May 28',
  onAddToCart,
  onAddToDelivery,
}: ProductCardListDeliveryProps) {
  const { setDeliveryItemQuantity, setCartItemQuantity, addedDeliveryItems, cartItems } = useWalmartScenario();
  const itemId = `pcld-${name}`;
  const cartItemId = `cart-${itemId}`;
  const persistedDeliveryQty = addedDeliveryItems.find((i) => i.id === itemId)?.quantity ?? 0;
  const persistedCartQty = cartItems.find((i) => i.id === cartItemId)?.quantity ?? 0;
  const [selectedOption, setSelectedOption] = useState(options?.[0] ?? 'Single');
  const [deliveryQty, setDeliveryQty] = useState(persistedDeliveryQty);
  const [cartQty, setCartQty] = useState(persistedCartQty);
  const [deliveryLoading, setDeliveryLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);

  const handleDeliveryChange = (qty: number) => {
    setDeliveryQty(qty);
    onAddToDelivery?.(qty);
    const priceNum = parseFloat(`${price}.${cents.padStart(2, '0')}`);
    setDeliveryItemQuantity({ id: itemId, image, name, price: priceNum }, qty);
  };

  const handleCartChange = (qty: number) => {
    setCartQty(qty);
    onAddToCart?.(qty);
    const priceNum = parseFloat(`${price}.${cents.padStart(2, '0')}`);
    setCartItemQuantity({ id: `cart-${itemId}`, image, name, price: priceNum }, qty);
  };

  const handleDeliveryAdd = () => {
    setDeliveryLoading(true);
    setTimeout(() => {
      setDeliveryLoading(false);
      handleDeliveryChange(1);
    }, 4000);
  };

  const handleCartAdd = () => {
    setCartLoading(true);
    setTimeout(() => {
      setCartLoading(false);
      handleCartChange(1);
    }, 4000);
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardBody}>
      {/* ── Image column ── */}
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
          <img src={image} alt={name} className={styles.productImage} />
        </div>

        {/* "Change option" selector lives under the image */}
        {options && options.length > 0 && (
          <div className={styles.optionSection}>
            <span className={styles.optionLabel}>Change option</span>
            <Select
              value={selectedOption}
              onValueChange={setSelectedOption}
              size="small"
              placeholder="Select"
            >
              {options.map((opt) => (
                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
              ))}
            </Select>
          </div>
        )}
      </div>

      {/* ── Content column ── */}
      <div className={styles.contentCol}>
        {/* Price */}
        <div className={styles.priceRow}>
          <span className={styles.dollarSign}>$</span>
          <span className={styles.price}>{price}</span>
          <span className={styles.cents}>{cents}</span>
        </div>

        {unitPrice && <p className={styles.unitPrice}>{unitPrice}</p>}

        <p className={styles.productName}>{name}</p>

        <div className={styles.ratingRow}>
          <Rating value={rating} size="small" />
          <span className={styles.ratingCount}>{ratingCount}</span>
        </div>

        {/* Delivery cues */}
        <div className={styles.deliveryCues}>
          {expressDelivery && (
            <div className={styles.expressBadge}>
              <FlashFill
                width={14}
                height={14}
                aria-hidden="true"
                style={{ color: 'var(--wcp-semantic-color-fill-accent-spark, #ffc220)' }}
              />
              <span>
                Delivery as soon as <span className={styles.cueBold}>{expressDelivery}</span>
              </span>
            </div>
          )}
          {wplusDelivery && (
            <div className={styles.cueRow}>
              <WalmartPlusLogoIcon width={24} height={16} className={styles.wplusIcon} aria-hidden="true" />
              <span className={styles.cueWplus}>
                Free delivery as soon as <span className={styles.cueBold}>{wplusDelivery}</span>
              </span>
            </div>
          )}
          {pickup && (
            <div className={styles.cueRow}>
              <span className={styles.cueText}>
                Pickup as soon as <span className={styles.cueBold}>{pickup}</span>
              </span>
            </div>
          )}
          {showSubscribe && (
            <button type="button" className={styles.subscribeRow} aria-label="Subscribe for recurring delivery">
              <Refresh width={13} height={13} aria-hidden="true" />
              <span>Subscribe</span>
            </button>
          )}
        </div>

      </div>
      </div>

      {/* ── Full-width CTA row at bottom ── */}
      <div className={styles.ctaRow}>
          {deliveryQty === 0 ? (
            deliveryLoading ? (
              <div className={styles.loadingPillYellow} aria-label="Adding to delivery…" aria-busy="true">
                <Spinner size="small" a11yLabel="Adding to delivery…" />
              </div>
            ) : (
              <button
                type="button"
                className={styles.deliveryAddPill}
                onClick={handleDeliveryAdd}
                aria-label={`Add to delivery. ${deliveryWindow}`}
              >
                <div className={styles.deliveryAddText}>
                  <span className={styles.deliveryAddLabel}>Add to delivery</span>
                  <span className={styles.deliveryAddSub}>{deliveryWindow}</span>
                </div>
              </button>
            )
          ) : (
            <div className={styles.deliveryStepper}>
              <QuantityStepper
                variant="primary-alt"
                size="small"
                defaultCount={deliveryQty}
                addLabel="Add to delivery"
                countLabel="delivery"
                startExpanded
                onChange={handleDeliveryChange}
              />
            </div>
          )}

          {cartQty === 0 ? (
            cartLoading ? (
              <div className={styles.loadingPillBlue} aria-label="Adding to cart…" aria-busy="true">
                <Spinner size="small" color="white" a11yLabel="Adding to cart…" />
              </div>
            ) : (
              <Button variant="primary" size="small" onClick={handleCartAdd}>
                Add to cart
              </Button>
            )
          ) : (
            <div className={styles.cartStepper}>
              <QuantityStepper
                variant="primary"
                size="small"
                defaultCount={cartQty}
                addLabel="Add to cart"
                countLabel="cart"
                startExpanded
                inlineLabel
                onChange={handleCartChange}
              />
            </div>
          )}
      </div>
    </div>
  );
}
