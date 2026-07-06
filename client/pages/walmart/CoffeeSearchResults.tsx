import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ResponsiveLayout } from '@/components/walmart/ResponsiveLayout';
import { Button } from '@/components/ui/Button';
import { Rating } from '@/components/ui/Rating';
import { SearchResultsHeader } from '@/components/walmart/SearchResultsHeader';
import { SearchFilterBar } from '@/components/walmart/SearchFilterBar';
import { ProductCardList } from '@/components/walmart/ProductCardList';
import { ProductCardListDelivery } from '@/components/walmart/ProductCardListDelivery';
import { WCPHeartView } from '@/components/walmart/WCPHeartView';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { FlashFill } from '@/components/icons/FlashFill';
import { WalmartPlusLogoIcon } from '@/components/icons-custom/WalmartPlusLogoIcon';
import { LinkButton } from '@/components/ui/LinkButton';
import { ReplenishmentBasket } from '@/components/walmart/ReplenishmentBasket';
import { WalmartScenarioProvider, useWalmartScenario } from '@/contexts/WalmartScenarioContext';
import { Spinner } from '@/components/ui/Spinner';
import styles from './CoffeeSearchResults.module.css';

const FILTER_CHIPS = ['Sort', 'In-store', 'Price', 'Brand', 'Screen size', 'Special offers'] as const;

// ── Mini card for "You might also like" carousel ─────────────────────────────

interface MiniCardProps {
  image: string;
  name: string;
  price: string;
  cents: string;
  unitPrice?: string;
  wasPrice?: string;
  rating?: number;
  ratingCount?: string;
  expressDelivery?: string;
  wplusDelivery?: string;
  pickup?: string;
  wplusShipping?: string;
  snapEligible?: boolean;
  /** Override the cart CTA label, e.g. "Options" */
  ctaLabel?: string;
  /** Hide the delivery CTA entirely */
  noDelivery?: boolean;
  /** Figma-style layer name applied as data-layer-name on the root */
  layerName?: string;
}

function MiniCard({ image, name, price, cents, unitPrice, wasPrice, rating, ratingCount, expressDelivery, wplusDelivery, pickup, wplusShipping, snapEligible, ctaLabel = 'Add to cart', noDelivery, layerName }: MiniCardProps) {
  const { setDeliveryItemQuantity, addedDeliveryItems, setCartItemQuantity, cartItems } = useWalmartScenario();
  const itemId = `mini-${name}`;
  const cartItemId = `cart-${itemId}`;
  const persistedQty = addedDeliveryItems.find((i) => i.id === itemId)?.quantity ?? 0;
  const persistedCartQty = cartItems.find((i) => i.id === cartItemId)?.quantity ?? 0;
  const [deliveryQty, setDeliveryQty] = useState(persistedQty);
  const [deliveryLoading, setDeliveryLoading] = useState(false);
  const [cartQty, setCartQty] = useState(persistedCartQty);
  const [cartLoading, setCartLoading] = useState(false);

  const commitDeliveryQty = (qty: number) => {
    setDeliveryQty(qty);
    const priceNum = parseFloat(`${price}.${cents.padStart(2, '0')}`);
    setDeliveryItemQuantity({ id: itemId, image, name, price: priceNum }, qty);
  };

  const handleStartAdd = () => {
    setDeliveryLoading(true);
    setTimeout(() => {
      setDeliveryLoading(false);
      commitDeliveryQty(1);
    }, 3000);
  };

  const commitCartQty = (qty: number) => {
    setCartQty(qty);
    const priceNum = parseFloat(`${price}.${cents.padStart(2, '0')}`);
    setCartItemQuantity({ id: cartItemId, image, name, price: priceNum }, qty);
  };

  const handleStartCart = () => {
    setCartLoading(true);
    setTimeout(() => {
      setCartLoading(false);
      commitCartQty(1);
    }, 3000);
  };

  return (
    <div className={styles.miniCard} data-layer-name={layerName}>
      <div className={styles.miniImageWrap}>
        <div className={styles.miniHeart}>
          <WCPHeartView size="small" calloutPosition="right" />
        </div>
        <img src={image} alt={name} className={styles.miniImage} />
      </div>

      <div className={styles.miniContent}>
        {/* CTAs — placed right after image */}
        <div className={styles.miniCtaCol}>
          {cartQty === 0 ? (
            cartLoading ? (
              <div className={styles.miniCartLoadingPill} aria-label="Adding to cart" aria-busy="true" role="status">
                <Spinner size="small" color="white" />
              </div>
            ) : (
              <Button variant="primary" size="small" isFullWidth onClick={handleStartCart}>{ctaLabel}</Button>
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
          {!noDelivery && (expressDelivery || wplusDelivery) ? (
            deliveryLoading ? (
              <div className={styles.miniDeliveryPill} aria-label="Adding to delivery" role="status">
                <Spinner size="small" />
              </div>
            ) : deliveryQty === 0 ? (
              <button
                type="button"
                className={styles.miniDeliveryPill}
                onClick={handleStartAdd}
                aria-label="Add to delivery"
              >
                Add to May 28
              </button>
            ) : (
              <QuantityStepper
                variant="primary-alt"
                size="small"
                defaultCount={deliveryQty}
                addLabel="Add to delivery"
                countLabel="delivery"
                startExpanded
                inlineLabel
                onChange={commitDeliveryQty}
              />
            )
          ) : null}
        </div>

        {/* Price row */}
        <div className={styles.miniPriceRow}>
          {wasPrice && <span className={styles.miniNow}>Now </span>}
          <span className={[styles.miniDollar, wasPrice ? styles.miniPriceSavings : ''].filter(Boolean).join(' ')}>$</span>
          <span className={[styles.miniPrice, wasPrice ? styles.miniPriceSavings : ''].filter(Boolean).join(' ')}>{price}</span>
          <span className={[styles.miniCents, wasPrice ? styles.miniPriceSavings : ''].filter(Boolean).join(' ')}>{cents}</span>
          {wasPrice && <span className={styles.miniStrike}>{wasPrice}</span>}
        </div>
        {unitPrice && <span className={styles.miniUnitPrice}>{unitPrice}</span>}
        <p className={styles.miniName}>{name}</p>
        {rating !== undefined && (
          <div className={styles.miniRating}>
            <Rating value={rating} size="small" />
            {ratingCount && <span className={styles.miniRatingCount}>{ratingCount}</span>}
          </div>
        )}
        {snapEligible && (
          <span className={styles.miniSnap}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <rect x="1" y="3" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M1 6h14" stroke="currentColor" strokeWidth="1.2"/>
              <rect x="3" y="8.5" width="4" height="1.5" rx=".5" fill="currentColor"/>
            </svg>
            SNAP eligible
          </span>
        )}

        {/* Delivery cues */}
        {(expressDelivery || wplusDelivery || wplusShipping || pickup) && (
          <div className={styles.miniCues}>
            {expressDelivery && (
              <div className={styles.miniExpressBadge}>
                <FlashFill
                  width={12}
                  height={12}
                  aria-hidden="true"
                  style={{ color: 'var(--wcp-semantic-color-fill-accent-spark, #ffc220)' }}
                />
                <span>Delivery as soon as <strong>{expressDelivery}</strong></span>
              </div>
            )}
            {wplusDelivery && (
              <div className={styles.miniCueRow}>
                <WalmartPlusLogoIcon width={20} height={14} aria-hidden="true" />
                <span className={styles.miniCueWplus}>Free delivery as soon as <strong>{wplusDelivery}</strong></span>
              </div>
            )}
            {wplusShipping && (
              <div className={styles.miniCueRow}>
                <WalmartPlusLogoIcon width={20} height={14} aria-hidden="true" />
                <span className={styles.miniCueWplus}>
                  Free shipping, {wplusShipping.split(' ').slice(0, -1).join(' ')}{' '}
                  <strong>{wplusShipping.split(' ').slice(-1)[0]}</strong>
                </span>
              </div>
            )}
            {pickup && (
              <div className={styles.miniCueRow}>
                <span className={styles.miniCueSubtle}>Pickup as soon as <strong>{pickup}</strong></span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

function SearchResultsSkeleton() {
  return (
    <div className={styles.skeletonPage}>
      {/* header */}
      <div className={styles.skeletonHeader}>
        <div className={styles.skeletonHeaderRow}>
          <div className={styles.skeletonBackBtn} />
          <div className={styles.skeletonSearchPill}>
            <div className={styles.skeletonSearchPillIcon} />
            <div className={styles.skeletonSearchPillText} />
          </div>
          <div className={styles.skeletonCartBtn} />
        </div>
        <div className={styles.skeletonDeliveryBanner}>
          <div className={styles.skeletonDeliveryLeft}>
            <div className={styles.skeletonDeliveryCircle} />
            <div className={styles.skeletonDeliveryText} />
          </div>
          <div className={styles.skeletonDeliveryChevron} />
        </div>
      </div>
      {/* filter bar */}
      <div className={styles.skeletonFilterBar}>
        {[1,2,3,4].map(i => <div key={i} className={styles.skeletonChip} />)}
      </div>
      {/* results count row */}
      <div className={styles.skeletonResultsRow}>
        <div className={`${styles.skeletonText} ${styles['skeletonLine--80']}`} style={{width:120}} />
      </div>
      {/* card skeletons */}
      <div className={styles.skeletonCardList}>
        {[1,2,3,4].map(i => (
          <div key={i} className={styles.skeletonCard}>
            <div className={styles.skeletonImageCol}>
              <div className={styles.skeletonImage} />
              <div className={styles.skeletonBtn} />
              <div className={styles.skeletonBtn} />
            </div>
            <div className={styles.skeletonContentCol}>
              <div className={styles.skeletonPriceLine} />
              <div className={`${styles.skeletonLine} ${styles['skeletonLine--full']}`} />
              <div className={`${styles.skeletonLine} ${styles['skeletonLine--full']}`} />
              <div className={`${styles.skeletonLine} ${styles['skeletonLine--80']}`} />
              <div className={`${styles.skeletonLine} ${styles['skeletonLine--60']}`} style={{marginTop:8}} />
              <div className={`${styles.skeletonLine} ${styles['skeletonLine--60']}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CoffeeSearchResults() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);
  if (loading) return <SearchResultsSkeleton />;
  return <CoffeeSearchResultsInner />;
}

function CoffeeSearchResultsInner() {
  const navigate = useNavigate();

  return (
    <ResponsiveLayout maxWidth="full" showMobileTopNav={false} nativeStatusBarVariant="blue">
      <div className="bg-white font-sans">
        <SearchResultsHeader query="coffee" onBack={() => navigate('/walmart')} />
        <SearchFilterBar chips={FILTER_CHIPS} />

        {/* Results count */}
        <div className={styles.resultsRow}>
          <span className={styles.resultsCount}>1000+ Results</span>
          <span className={styles.resultsMeta}>
            Uses external data. Price when purchased online
            <button type="button" className={styles.infoBtn} aria-label="Price info">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M8 7v5M8 5.5v-.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </span>
        </div>

        <div className={styles.cardList}>
        {/* ── Card 1: Starbucks – delivery dual CTA ─────────────────────── */}
        <ProductCardListDelivery
          image="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F4739d50d2e794a969b1012ee6c5af737?format=webp&width=800"
          name="Starbucks Pike Place Roast, Ground Coffee, Medium Roast Hot or Iced Coffee,..."
          price="17"
          cents="13"
          unitPrice="84.9¢/lb"
          flag="Best seller"
          rating={4.5}
          ratingCount="31.1k"
          expressDelivery="1 hour"
          wplusDelivery="2pm"
          pickup="2pm"
          showSubscribe={false}
          deliveryWindow="Fri, May 28"
        />

        {/* ── Card 2: New England Coffee – cart only, shipping ───────────── */}
        <ProductCardList
          image="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F9c16221f59f5407e90b65bc133668b5f?format=webp&width=800"
          name="New England Coffee Donut Shop Blend, Medium Roast, Ground Coffee, 11o..."
          price="14"
          cents="99"
          unitPrice="84.9¢/oz"
          flag="Rollback"
          flagVariant="red"
          rating={4.5}
          ratingCount="31.1k"
          wplusShipping="arrives tomorrow"
          pickup="2pm"
        />

        {/* ── Card 3: Maxwell House – change option + dual CTA ───────────── */}
        <ProductCardListDelivery
          image="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F5d377f4f229540ffb069bfe64fcdd375?format=webp&width=800"
          name="Maxwell House Original Roast Ground Coffee, 10.3 oz Canister, Medium..."
          price="6"
          cents="96"
          unitPrice="27.6¢/oz"
          rating={4.5}
          ratingCount="7,154"
          options={['Single', '2 Pack', '4 Pack']}
          wplusDelivery="2pm"
          pickup="2pm"
          showSubscribe
          deliveryWindow="Fri, May 28"
        />

        {/* ── Card 4: Tim Hortons – savings + Options CTA ────────────────── */}
        <ProductCardList
          image="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fd24933b779774443959e81e5a668c2c6?format=webp&width=800"
          name="Tim Hortons Dark Roast Ground Coffee, 100% Arabica Coffee Bag,..."
          price="12"
          cents="08"
          wasPrice="$15.00"
          rating={4.5}
          ratingCount="14k"
          sizesCount={2}
          snapEligible
          expressDelivery="1 hour"
          wplusDelivery="2pm"
          pickup="2pm"
          ctaLabel="Options"
        />

        {/* ── "You might also like" carousel ────────────────────────────── */}
        <div className={styles.carouselSection}>
          <div className={styles.carouselHeader}>
            <span className={styles.carouselTitle}>You might also like</span>
            <LinkButton size="small" color="default">Shop all</LinkButton>
          </div>
          <div className={styles.carouselScroll}>
            <MiniCard
              layerName="Item-Grid-1"
              image="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F15a729a088014adc96bb83c63719e9ce?format=webp&width=400"
              name="Folgers Classic Roast Ground Coffee, Medium..."
              price="15"
              cents="98"
              unitPrice="$13.33/count"
              rating={4.5}
              ratingCount="5,494"
              expressDelivery="1 hour"
              wplusDelivery="2pm"
              pickup="2pm"
            />
            <MiniCard
              layerName="Item-Grid-2"
              image="https://i5.walmartimages.com/seo/Dunkin-Butter-Pecan-Artificially-Flavored-Coffee-Ground-Coffee-11-oz-Bag_f819a828-d669-4287-9c61-e6cae09d9aa2.ea12cc15a61f9c05dda873933459ffc2.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF"
              name="Dunkin' Butter Pecan Artificially Flavored Coffee, Ground Coffee, 11 oz Bag"
              price="12"
              cents="98"
              wasPrice="$20.00"
              unitPrice="26.5¢/oz"
              rating={4.5}
              ratingCount="5,494"
              snapEligible
              wplusShipping="arrives tomorrow"
              pickup="2pm"
            />
            <MiniCard
              layerName="Item-Grid-3"
              image="https://i5.walmartimages.com/seo/Nescaf-Taster-s-Choice-French-Roast-Medium-Dark-Roast-Instant-Coffee-7-oz_3decc6aa-5c5f-4758-8db6-c60868907e6f.9950f386c8b52697f15cc3497f997aae.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF"
              name="NESCAFÉ Taster's Choice French Roast, Dark Roast Coffee, Instant Coffee, 7 oz, 1 Jar"
              price="14"
              cents="48"
              expressDelivery="1 hour"
              wplusDelivery="2pm"
              pickup="2pm"
            />
            <MiniCard
              layerName="Item-Grid-4"
              image="https://i5.walmartimages.com/seo/Great-Value-Donut-Shop-100-Arabica-Medium-Roast-Ground-Coffee-32-oz_31f3df06-ad0b-4250-9621-77b91f166646.4c3b05eeaeca937d0beb268d5a0185e3.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF"
              name="Great Value Donut Shop, 100% Arabica, Medium Roast, Ground Coffee, 32 oz"
              price="12"
              cents="98"
              ctaLabel="Options"
              noDelivery
              pickup="2pm"
            />
            <MiniCard
              layerName="Item-Grid-5"
              image="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F4739d50d2e794a969b1012ee6c5af737?format=webp&width=400"
              name="Starbucks Vanilla Lavender, Hot or Iced Coffee, Flavored Ground Coffee, 11 oz"
              price="19"
              cents="64"
              rating={0}
              ratingCount="0"
              wplusDelivery="2pm"
              pickup="2pm"
              ctaLabel="Options"
              noDelivery
            />
            <MiniCard
              layerName="Item-Grid-6"
              image="https://i5.walmartimages.com/seo/Fire-Department-Coffee-Shellback-Espresso-Premium-Ground-Coffee-Medium-Roast-12-oz_e4950920-a4a2-414c-8bf4-ddb35420c8d0.e5207cd8756ad9293720873d21db0963.jpeg?odnHeight=573&odnWidth=573&odnBg=FFFFFF"
              name="Fire Department Coffee, Shellback Espresso, Premium Ground Coffee, Medium Roast, 12 oz."
              price="9"
              cents="96"
              rating={4}
              ratingCount="1.2k"
              expressDelivery="1 hour"
              wplusDelivery="2pm"
              pickup="2pm"
            />
          </div>
        </div>

        {/* ── Card 5: NESCAFÉ – delivery dual CTA ───────────────────────── */}
        <ProductCardListDelivery
          image="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F7e543a7bb2104294b4f190634e078b1a?format=webp&width=800"
          name="NESCAFÉ Taster's Choice French Roast, Dark Roast Coffee, Ground Coffee, 7 o..."
          price="13"
          cents="48"
          unitPrice="93.64¢/oz"
          rating={4.5}
          ratingCount="31.1k"
          expressDelivery="1 hour"
          wplusDelivery="2pm"
          pickup="2pm"
          showSubscribe={false}
          deliveryWindow="Fri, May 28"
        />

        {/* ── Card 6: Dunkin' – social proof + savings + cart only ──────── */}
        <ProductCardList
          image="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F861dea083fc9408994d4bce32ed5c971?format=webp&width=800"
          name="Dunkin' Original Blend Medium Roast Ground Coffee, 20 oz Bag,..."
          price="16"
          cents="99"
          wasPrice="$21.99"
          unitPrice="96¢/oz"
          rating={4.5}
          ratingCount="14k"
          snapEligible
          wplusShipping="arrives tomorrow"
        />

        {/* ── Card 7: Café La Llave – delivery dual CTA ─────────────────── */}
        <ProductCardListDelivery
          image="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F4739d50d2e794a969b1012ee6c5af737?format=webp&width=800"
          name="Cafe La Llave Dark Roast Ground Espresso Coffee, 10 oz, Cuban-Style B..."
          price="5"
          cents="85"
          unitPrice="$1.67/lb"
          rating={4.5}
          ratingCount="1k"
          expressDelivery="1 hour"
          wplusDelivery="2pm"
          pickup="2pm"
          showSubscribe={false}
          deliveryWindow="Fri, May 28"
        />

        </div>{/* /cardList */}
        {/* Load more */}
        <div className="px-3 py-4">
          <Button variant="secondary" size="medium" isFullWidth>Load more results</Button>
        </div>
      </div>
      {/* Active order — show LOC as the compact pill above the bottom nav */}
      <ReplenishmentBasket forceVisible forcePill />
    </ResponsiveLayout>
  );
}
