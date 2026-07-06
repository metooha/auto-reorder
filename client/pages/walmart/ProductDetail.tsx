import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// hmr-bump: clear stale CartIcon/WCPFlag refs
import { ResponsiveLayout } from "@/components/walmart/ResponsiveLayout";
import { SearchResultsHeader } from "@/components/walmart/SearchResultsHeader";
import { WalmartPlusLogoIcon } from "@/components/icons-custom/WalmartPlusLogoIcon";
import { Rating } from "@/components/ui/Rating";
import { Spinner } from "@/components/ui/Spinner";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { ReplenishmentBasket } from "@/components/walmart/ReplenishmentBasket";
import { WCPFlag } from "@/components/walmart/WCPFlag";
import { useWalmartScenario } from "@/contexts/WalmartScenarioContext";
import styles from "./ProductDetail.module.css";

// ── Product data ──────────────────────────────────────────────────────────────

const TIM_HORTONS = {
  id: "tim-hortons-coffee",
  brand: "Tim Hortons",
  breadcrumb: "Tim Hortons dark",
  name: "Tim Hortons Dark Roast Ground Coffee, 100% Arabica, 12 oz Bag",
  price: "12",
  cents: "08",
  wasPrice: "$15.00",
  savings: "Save $2.92",
  unitPrice: "67.3¢/oz",
  rating: 4.2,
  reviewCount: "396",
  soldBy: "Walmart.com",
  image: "https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fd24933b779774443959e81e5a668c2c6?format=webp&width=800",
  images: [
    "https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fd24933b779774443959e81e5a668c2c6?format=webp&width=800",
    "https://i5.walmartimages.com/asr/7d0788bd-95b4-4095-9ee1-eed898ea08f3.cf57767294c930373989d9a124a98c88.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
    "https://i5.walmartimages.com/asr/28068e7f-d171-4226-a4fc-95da01da51bb.bd21f125f6ec2471488ebc39208b4070.jpeg?odnHeight=573&odnWidth=573&odnBg=FFFFFF",
    "https://i5.walmartimages.com/asr/37370072-bbfa-413e-a558-16438b79bc4d.e2b7ef8a92f1f1ad63042dc4963a4423.jpeg?odnHeight=573&odnWidth=573&odnBg=FFFFFF",
  ],
};

const FALLBACK = {
  id: "product",
  brand: "Kellogg's",
  breadcrumb: "Frosted Flakes",
  name: "Kellogg's Frosted Flakes, Breakfast Cereal, Original, Family Size, 13.5 oz",
  price: "3",
  cents: "68",
  rating: 4.7,
  reviewCount: "12,234",
  soldBy: "Walmart.com",
  image: "https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F783f38e6d773461b95706408b1a14434?format=webp&width=800",
  images: [
    "https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F783f38e6d773461b95706408b1a14434?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F8bc0f7dc642445539d23bdc006c6d5cf?format=webp&width=800",
  ],
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function ProductDetail() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { setDeliveryItemQuantity, addedDeliveryItems, setCartItemQuantity, cartItems } = useWalmartScenario();

  const product = productId === "tim-hortons-coffee" ? TIM_HORTONS : FALLBACK;
  const deliveryId = `pdp-delivery-${product.id}`;
  const cartId = `pdp-cart-${product.id}`;

  const persistedDelivery = addedDeliveryItems.find((i) => i.id === deliveryId)?.quantity ?? 0;
  const persistedCart = cartItems.find((i) => i.id === cartId)?.quantity ?? 0;

  const [selectedThumb, setSelectedThumb] = useState(0);
  const [deliveryQty, setDeliveryQty] = useState(persistedDelivery);
  const [deliveryLoading, setDeliveryLoading] = useState(false);
  const [cartQty, setCartQty] = useState(persistedCart);
  const [cartLoading, setCartLoading] = useState(false);

  const priceNum = parseFloat(`${product.price}.${product.cents.padStart(2, "0")}`);

  const commitDelivery = (qty: number) => {
    setDeliveryQty(qty);
    setDeliveryItemQuantity({ id: deliveryId, image: product.image, name: product.name, price: priceNum }, qty);
  };

  const handleDeliveryTap = () => {
    setDeliveryLoading(true);
    setTimeout(() => {
      setDeliveryLoading(false);
      commitDelivery(1);
    }, 3000);
  };

  const commitCart = (qty: number) => {
    setCartQty(qty);
    setCartItemQuantity({ id: cartId, image: product.image, name: product.name, price: priceNum }, qty);
  };

  const handleCartTap = () => {
    setCartLoading(true);
    setTimeout(() => {
      setCartLoading(false);
      commitCart(1);
    }, 3000);
  };

  return (
    <ResponsiveLayout maxWidth="full" showMobileTopNav={false} nativeStatusBarVariant="blue">
      <div className={styles.page}>

        {/* ── Shared blue search header (matches search results page) ── */}
        <SearchResultsHeader query="" onBack={() => navigate(-1)} />

        {/* ── Scrollable content ── */}
        <div className={styles.content}>

          {/* Sponsored row */}
          <div className={styles.sponsored}>
            <svg className={styles.sponsoredLogo} viewBox="0 0 60 60" fill="none" aria-hidden="true" width="36" height="36">
              <circle cx="30" cy="30" r="28" fill="#00704A"/>
              <text x="50%" y="56%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="22" fontWeight="bold" fontFamily="sans-serif">S</text>
            </svg>
            <div>
              <div className={styles.sponsoredText}>Sip a up full of flavor</div>
              <div className={styles.sponsoredLabel}>
                Sponsored
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M8 7v4M8 5.5v-.01" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Meta */}
          <div className={styles.meta}>
            <button type="button" className={styles.breadcrumb}>{product.breadcrumb}</button>

            <div className={styles.ratingRow}>
              <Rating value={product.rating} size="small" />
              <span className={styles.ratingValue}>({product.rating.toFixed(1)})</span>
              <span className={styles.ratingPipe}>|</span>
              <span className={styles.ratingCount}>{product.reviewCount}</span>
            </div>

            <p className={styles.productName}>{product.name}</p>

            {/* Shipping/returns */}
            <div className={styles.shippingRow}>
              <span className={styles.shippingItem}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
                Free shipping
              </span>
              <span className={styles.shippingItem}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Z" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
                Free 90-day returns
              </span>
            </div>

            {/* Badges */}
            <div className={styles.badgesRow}>
              <WCPFlag label="in 200+ people's carts" variant="social" />
              <WCPFlag label="Best seller" variant="confidence" />
            </div>
          </div>

          {/* Image */}
          <div className={styles.imageSection}>
            <img
              src={product.images[selectedThumb]}
              alt={product.name}
              className={styles.productImage}
            />
            <div className={styles.imageActions}>
              <button type="button" className={styles.imageActionBtn} aria-label="Share">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M8.59 13.51L15.42 17.49M15.41 6.51L8.59 10.49" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </button>
              <button type="button" className={styles.imageActionBtn} aria-label="Save to list">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </button>
              <button type="button" className={styles.imageActionBtn} aria-label="Zoom">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
              <button type="button" className={styles.imageActionBtn} aria-label="Play video">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <polygon points="5 3 19 12 5 21 5 3" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Thumbnail strip */}
          <div className={styles.thumbStrip}>
            {product.images.map((img, i) => (
              <button
                key={i}
                type="button"
                className={[styles.thumb, selectedThumb === i ? styles.thumbActive : ''].filter(Boolean).join(' ')}
                onClick={() => setSelectedThumb(i)}
                aria-label={`Image ${i + 1}`}
              >
                <img src={img} alt="" className={styles.thumbImg} />
              </button>
            ))}
          </div>

          {/* Variant picker */}
          <div className={styles.variantSection}>
            <p className={styles.variantLabel}>Size: <strong>3.5 lbs</strong></p>
            <div className={styles.variantGrid}>
              {([
                { label: 'Dark Roast', price: '$5.83', unit: '$1.67/lb', selected: true },
                { label: 'French Vainilla', price: '$16.98', unit: '$1.21/lb', selected: false },
              ] as const).map((v) => (
                <button
                  key={v.label}
                  type="button"
                  className={[styles.variantTile, v.selected ? styles.variantTileSelected : ''].filter(Boolean).join(' ')}
                >
                  <span className={styles.variantTileName}>{v.label}</span>
                  <span className={styles.variantTilePrice}>{v.price}</span>
                  <span className={styles.variantTileUnit}>{v.unit}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className={styles.priceSection}>
            <div className={styles.priceLayout}>
              {/* Left: Now $12.08 */}
              <div className={styles.priceNowBlock}>
                <span className={styles.priceNowLabel}>Now </span>
                <span className={styles.priceNowValue}>
                  <span className={styles.priceDollar}>$</span>
                  <span className={styles.priceMain}>{product.price}</span>
                  <span className={styles.priceCents}>.{product.cents}</span>
                </span>
              </div>

              {/* Right: savings badge + was-price / caption */}
              <div className={styles.priceMetaBlock}>
                {"savings" in product && product.savings && (
                  <div className={styles.priceMetaTop}>
                    <span className={styles.savingsBadge}>{(product as typeof TIM_HORTONS).savings}</span>
                    {"wasPrice" in product && product.wasPrice && (
                      <s className={styles.wasPriceInline}>{(product as typeof TIM_HORTONS).wasPrice}</s>
                    )}
                    <button type="button" className={styles.infoIconBtn} aria-label="Savings info">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.3"/>
                        <path d="M8 7v4M8 5.5v-.01" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                      </svg>
                    </button>
                  </div>
                )}
                <div className={styles.priceMetaBottom}>
                  <span className={styles.priceCaption}>Price when purchased online</span>
                  <button type="button" className={styles.infoIconBtn} aria-label="Price info">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.3"/>
                      <path d="M8 7v4M8 5.5v-.01" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Fulfillment section */}
          <div className={styles.fulfillmentSection}>
            <p className={styles.fulfillmentHeading}>How do you want your item?</p>

            {/* Shipping / Pickup / Delivery tiles */}
            <div className={styles.fulfillmentTiles}>
              {/* Shipping */}
              <button type="button" className={styles.fulfillmentTile}>
                <img
                  src="https://i5.walmartimages.com/dfw/63fd9f59-ffa4/3dd23f45-a749-4acf-ad69-bcb9fff1f382/v1/delivery-truck.svg"
                  alt=""
                  width={32}
                  height={32}
                  aria-hidden="true"
                  style={{ filter: 'grayscale(1)', opacity: 0.6 }}
                />
                <span className={styles.fulfillmentTileTitle}>Shipping</span>
                <span className={[styles.fulfillmentTileSub, styles.fulfillmentTileUnavailable].join(' ')}>Not available</span>
              </button>
              {/* Pickup */}
              <button type="button" className={styles.fulfillmentTile}>
                <img
                  src="https://i5.walmartimages.com/dfw/63fd9f59-4505/fe62ce97-49d1-48eb-a181-4a26f80691a6/v1/CarWithTrunkOpen_Circle_Blue.svg"
                  alt=""
                  width={32}
                  height={32}
                  aria-hidden="true"
                />
                <span className={styles.fulfillmentTileTitle}>Pickup</span>
                <span className={styles.fulfillmentTileSub}>As soon as 2pm</span>
              </button>
              {/* Delivery — active */}
              <button type="button" className={[styles.fulfillmentTile, styles.fulfillmentTileActive].join(' ')}>
                <img
                  src="https://i5.walmartimages.com/dfw/63fd9f59-d930/2bac0e2b-cda4-4053-8a8e-8e8a0195b579/v1/Delivery_GroceryBag_Circle_Blue.svg"
                  alt=""
                  width={32}
                  height={32}
                  aria-hidden="true"
                />
                <span className={styles.fulfillmentTileTitle}>Delivery</span>
                <span className={styles.fulfillmentTileSub}>As soon as 2pm</span>
                <span className={styles.fulfillmentTileWplus}>
                  Free with <WalmartPlusLogoIcon width={28} height={12} aria-hidden="true" />
                </span>
              </button>
            </div>

            {/* Address */}
            <p className={styles.fulfillmentAddress}>
              3741 Park Ln{' '}
              <button type="button" className={styles.fulfillmentChange}>Change</button>
            </p>

            {/* Express delivery row */}
            <div className={styles.expressRow}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M9 2L3 9h5l-1 5 6-7H8L9 2Z" fill="#ffc220"/>
              </svg>
              <span><strong>Express Delivery</strong> as soon as <strong>37 mins</strong></span>
            </div>

            {/* W+ free delivery row */}
            <div className={styles.wplusRow}>
              <WalmartPlusLogoIcon width={28} height={14} aria-hidden="true" />
              <span>Free delivery as soon as <strong>2pm</strong>.</span>
            </div>

            {/* Divider */}
            <div className={styles.fulfillmentDivider} />

            {/* Sold by */}
            <div className={styles.soldByRow}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M9 2L3 9h5l-1 5 6-7H8L9 2Z" fill="#ffc220"/>
              </svg>
              <span>Sold and shipped by <button type="button" className={styles.sellerLink}>{product.soldBy}</button></span>
            </div>

            {/* Returns */}
            <div className={styles.returnsRow}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M1 4v6h6M23 20v-6h-6" stroke="#0071dc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 0 1 3.51 15" stroke="#0071dc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Free 90-day returns <button type="button" className={styles.returnsDetails}>Details</button></span>
            </div>
          </div>
        </div>

        {/* ── Sticky footer CTAs ── */}
        <div className={styles.footer}>
          {deliveryQty === 0 ? (
            deliveryLoading ? (
              <button type="button" className={[styles.deliveryBtn, styles.deliveryBtnLoading].join(' ')} disabled aria-busy="true" aria-label="Adding to delivery">
                <Spinner size="small" />
              </button>
            ) : (
              <button type="button" className={styles.deliveryBtn} onClick={handleDeliveryTap} aria-label="Add to delivery">
                <span className={styles.deliveryBtnMain}>Add to delivery</span>
                <span className={styles.deliveryBtnSub}>Fri, May 28</span>
              </button>
            )
          ) : (
            <div className={styles.footerDeliveryStepper}>
              <QuantityStepper
                variant="primary-alt"
                size="medium"
                defaultCount={deliveryQty}
                addLabel="Add to delivery"
                countLabel="delivery"
                startExpanded
                inlineLabel
                onChange={commitDelivery}
              />
            </div>
          )}

          {cartQty === 0 ? (
            cartLoading ? (
              <button type="button" className={[styles.cartBtn, styles.cartBtnLoading].join(' ')} disabled aria-busy="true" aria-label="Adding to cart">
                <Spinner size="small" color="white" />
              </button>
            ) : (
              <button type="button" className={styles.cartBtn} onClick={handleCartTap} aria-label="Add to cart">
                Add to cart
              </button>
            )
          ) : (
            <div className={styles.footerCartStepper}>
              <QuantityStepper
                variant="primary"
                size="medium"
                defaultCount={cartQty}
                addLabel="Add to cart"
                countLabel="cart"
                startExpanded
                inlineLabel
                onChange={commitCart}
              />
            </div>
          )}
        </div>

        <ReplenishmentBasket forceVisible forcePill />
      </div>
    </ResponsiveLayout>
  );
}
