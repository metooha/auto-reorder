import { useState, useMemo } from 'react';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWalmartScenario } from '@/contexts/WalmartScenarioContext';
import { CondensedItemTile } from './CondensedItemTile';
import { DeliveryScheduler } from './DeliveryScheduler';
import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';
import { Link } from '@/components/ui/Link';
import { FloatingFooter } from './FloatingFooter';
import {
  ChevronDown,
  ChevronRight,
  ChevronUp,
  CartArrow,
  Refresh,
} from '@/components/icons';
import { MinimizeIcon, MaximizeIcon } from '@/components/icons-custom';
import { WALMART_BASKET_ITEMS, computeBasketTotals } from '@/data/walmartBasket';
import styles from './ReplenishmentBasket.module.css';
import tileStyles from './CondensedItemTile.module.css';

type BasketState = 'collapsed' | 'expanded' | 'scheduling';

interface BasketItem {
  id: string;
  image: string;
  price: string;
  cents: string;
  tag?: string;
  name?: string;
  quantity?: number;
}

interface SuggestionItem {
  id: string;
  image: string;
  price: string;
  cents: string;
  originalPrice?: string;
  name: string;
}

export interface ReplenishmentBasketProps {
  deliveryDay?: string;
  deliveryTime?: string;
  address?: string;
  itemCount?: number;
  total?: string;
  items?: BasketItem[];
  onEditItems?: () => void;
  forceVisible?: boolean;
  contained?: boolean;
  forcePill?: boolean;
}

const DEMO_ITEMS: BasketItem[] = WALMART_BASKET_ITEMS.map((it) => ({
  id: it.id,
  image: it.image,
  price: it.price,
  cents: it.cents,
  tag: it.tag,
  name: it.name,
  quantity: it.quantity,
}));

const SUGGESTION_ITEMS: SuggestionItem[] = [
  {
    id: 's1',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F7efa55b82a454e1bb30b1fb9f1985f60?width=200',
    price: '8',
    cents: '05',
    originalPrice: '9.98',
    name: 'Ritz Crackers Family Size',
  },
  {
    id: 's2',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fd90e9369c42a4820a3e9eed9cf617b10?width=200',
    price: '9',
    cents: '25',
    originalPrice: '10.98',
    name: 'Angel Soft Toilet Paper',
  },
  {
    id: 's3',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Faa52a7fdf20d49a494421863f8a1e819?width=200',
    price: '15',
    cents: '80',
    name: 'Dreft Baby Detergent',
  },
  {
    id: 's4',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fd380b7dc612342bd96794e31c02002b8?width=200',
    price: '3',
    cents: '25',
    name: 'Large Eggs, 12 Count',
  },
  {
    id: 's5',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fc9f82aaab7bd43a7b3e682bbe6f7f7bd?width=200',
    price: '9',
    cents: '99',
    originalPrice: '10.98',
    name: 'Fresh Blueberries, 1 pt',
  },
  {
    id: 's6',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fa47f4e68c9df4012903189f6cf074bec?width=200',
    price: '4',
    cents: '16',
    name: 'Bananas, each',
  },
];

export function ReplenishmentBasket({
  deliveryDay = 'Fri, May 28',
  deliveryTime = '4pm–5pm',
  address = '3743 Park Ln, Dallas, TX 75220',
  itemCount: itemCountProp,
  total: totalProp,
  items: itemsProp = DEMO_ITEMS,
  forceVisible = false,
  contained = false,
  forcePill = false,
}: ReplenishmentBasketProps) {
  const { addedDeliveryItems, setDeliveryItemQuantity, basketItemOverrides, shouldExpandLOC, setShouldExpandLOC } = useWalmartScenario();
  // Merge dynamically added delivery items at the top of the basket.
  // Most-recently-added items appear first so the latest add always becomes
  // the leftmost thumbnail in the LOC.
  const items = useMemo(() => {
    // Apply per-item overrides from the Edit Order page (quantity changes / removals).
    const baseItems = itemsProp
      .map((it) => {
        const override = basketItemOverrides[it.id];
        if (override === undefined) return it;
        return { ...it, quantity: override };
      })
      .filter((it) => (it.quantity ?? 1) > 0);

    if (!addedDeliveryItems.length) return baseItems;
    const mapped: BasketItem[] = [...addedDeliveryItems].reverse().map((it) => {
      const dollars = Math.floor(it.price);
      const cents = Math.round((it.price - dollars) * 100).toString().padStart(2, '0');
      return {
        id: `added-${it.id}`,
        image: it.image,
        name: it.name,
        price: String(dollars),
        cents,
        quantity: it.quantity,
      };
    });
    return [...mapped, ...baseItems];
  }, [addedDeliveryItems, itemsProp, basketItemOverrides]);

  const addedCount = useMemo(
    () => addedDeliveryItems.reduce((sum, it) => sum + it.quantity, 0),
    [addedDeliveryItems],
  );
  const computedTotals = useMemo(() => computeBasketTotals(items.map((it) => ({
    price: it.price,
    cents: it.cents,
    quantity: it.quantity ?? 1,
  }))), [items]);
  const itemCount = itemCountProp ?? computedTotals.count;
  const total = totalProp ?? computedTotals.total.toFixed(2);
  const [state, setState] = useState<BasketState>('collapsed');
  const [showConfirmBanner, setShowConfirmBanner] = useState(true);
  const [scrollCollapsed, setScrollCollapsed] = useState(false);
  const [pillOverride, setPillOverride] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const lastScrollY = useRef(0);

  // Watch for typeahead modal open/close — force compact pill while open
  useEffect(() => {
    const update = () => {
      setSearchModalOpen(document.body.classList.contains('search-modal-open'));
    };
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Search modal always wins; otherwise, forcePill defaults to pill but the
  // user can expand it to the default LOC card via pillOverride.
  const isPillForced = searchModalOpen || (forcePill && !pillOverride);
  const showPill = scrollCollapsed || isPillForced;
  const [isEditing, setIsEditing] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(items.map((item) => [item.id, true]))
  );
  const [quantities, setQuantities] = useState<Record<string, number>>(() =>
    Object.fromEntries(items.map((item) => [item.id, item.quantity ?? 2]))
  );
  const [selectedDay, setSelectedDay] = useState('Fri');
  const [selectedTime, setSelectedTime] = useState('4pm-5pm');
  const [showTipSheet, setShowTipSheet] = useState(false);
  const navigate = useNavigate();

  // Open LOC in expanded state when external code (e.g. Edit Order "Update order")
  // sets the shouldExpandLOC flag. Reset it once consumed.
  useEffect(() => {
    if (shouldExpandLOC) {
      setState('expanded');
      setShouldExpandLOC(false);
    }
  }, [shouldExpandLOC, setShouldExpandLOC]);

  // Morph the collapsed basket between the default card and the compact pill
  // by measuring the target layout's height and animating the shared
  // wrapper to it, so the two states feel like one component reshaping
  // instead of a hard swap.
  const morphCardRef = useRef<HTMLDivElement>(null);
  const morphPillRef = useRef<HTMLButtonElement>(null);
  const [morphHeight, setMorphHeight] = useState<number | undefined>(undefined);

  useLayoutEffect(() => {
    if (state !== 'collapsed') return;
    const target = showPill ? morphPillRef.current : morphCardRef.current;
    if (target) setMorphHeight(target.offsetHeight);
  }, [state, showPill, itemCount, total, showConfirmBanner, items.length]);

  useEffect(() => {
    if (state !== 'collapsed') return;
    const target = showPill ? morphPillRef.current : morphCardRef.current;
    if (!target) return;
    const observer = new ResizeObserver(() => setMorphHeight(target.offsetHeight));
    observer.observe(target);
    return () => observer.disconnect();
  }, [state, showPill]);

  // Collapse to pill when scrolling down, restore full card when scrolling up
  useEffect(() => {
    if (state !== 'collapsed') return;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastScrollY.current && y > 40) {
        setScrollCollapsed(true);
      } else if (y < lastScrollY.current) {
        setScrollCollapsed(false);
      }
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [state]);

  // Compute estimated total and checked item count reactively
  const { estimatedTotal, checkedItemCount } = useMemo(() => {
    let sum = 0;
    let count = 0;
    for (const item of items) {
      if (checkedItems[item.id] === false) continue;
      const qty = quantities[item.id] ?? item.quantity ?? 1;
      const price = parseFloat(`${item.price}.${item.cents.padStart(2, '0')}`);
      sum += price * qty;
      count += qty;
    }
    return { estimatedTotal: sum.toFixed(2), checkedItemCount: count };
  }, [items, quantities, checkedItems]);

  // When a new item is added to delivery, animate the LOC from the compact pill
  // back to the default collapsed card so the new item is visible.
  const prevAddedCount = useRef(addedCount);
  const prevTopItemId = useRef<string | null>(items[0]?.id ?? null);
  const [enteringId, setEnteringId] = useState<string | null>(null);
  useEffect(() => {
    if (addedCount > prevAddedCount.current) {
      setPillOverride(true);
      setScrollCollapsed(false);
    }
    prevAddedCount.current = addedCount;
  }, [addedCount]);

  // Trigger an entrance animation on the leftmost thumbnail when a new
  // unique item is prepended to the basket.
  useEffect(() => {
    const topId = items[0]?.id ?? null;
    if (topId && topId !== prevTopItemId.current) {
      setEnteringId(topId);
      const t = setTimeout(() => setEnteringId(null), 450);
      prevTopItemId.current = topId;
      return () => clearTimeout(t);
    }
    prevTopItemId.current = topId;
  }, [items]);

  const handleExpand = () => {
    setScrollCollapsed(false);
    setState('expanded');
  };

  const handleCollapse = () => {
    setState('collapsed');
    setIsEditing(false);
    setShowAll(false);
  };

  const handleToggleEdit = () => {
    setIsEditing((prev) => !prev);
    setShowAll(false);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleAddToDelivery = () => {
    // Save and collapse — no scheduling modal
    setIsEditing(false);
    setState('collapsed');
  };

  const handleCheckChange = (id: string, checked: boolean) => {
    setCheckedItems((prev) => ({ ...prev, [id]: checked }));
    if (!checked) {
      setQuantities((prev) => ({ ...prev, [id]: 0 }));
    }
  };

  const handleQuantityChange = (id: string, q: number) => {
    setQuantities((prev) => ({ ...prev, [id]: q }));
    if (q === 0) {
      setCheckedItems((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleBackToBasket = () => {
    setState('expanded');
  };

  const handleConfirmDelivery = () => {
    setState('collapsed');
    setIsEditing(false);
  };

  const isPanel = state === 'expanded' || state === 'scheduling';

  // Show only first 6 items unless showAll is true
  const visibleItems = showAll ? items : items.slice(0, 6);

  const deliveryDayShort = deliveryDay.split(',')[0] ?? deliveryDay;

  return (
    <div
      className={[
        styles.wrapper,
        isPanel ? styles.wrapperExpanded : '',
        forceVisible ? styles.wrapperForceVisible : '',
        contained ? styles.wrapperContained : '',
      ].filter(Boolean).join(' ')}
      aria-label="Replenishment basket"
    >
      {/* ── COLLAPSED STATE — full card (default) morphs into the compact pill (when scrolled) ── */}
      {state === 'collapsed' && (
        <div
          className={[styles.collapsedMorphWrap, showPill ? styles.collapsedMorphWrapPill : '']
            .filter(Boolean)
            .join(' ')}
          style={morphHeight !== undefined ? { height: morphHeight } : undefined}
        >
          <div
            ref={morphCardRef}
            className={[styles.collapsedGroup, styles.morphLayer, !showPill ? styles.morphLayerActive : '']
              .filter(Boolean)
              .join(' ')}
            aria-hidden={showPill}
          >
            {showConfirmBanner && (
              <button
                type="button"
                className={styles.confirmBanner}
                onClick={() => setShowConfirmBanner(false)}
                aria-label="Dismiss confirmation"
                tabIndex={showPill ? -1 : 0}
              >
                <CartArrow width={20} height={20} aria-hidden="true" />
                <span>
                  <strong>4 days left</strong> to add items to delivery
                </span>
              </button>
            )}
            <button
              className={styles.collapsedBar}
              onClick={handleExpand}
              aria-label="Expand upcoming delivery basket"
              tabIndex={showPill ? -1 : 0}
            >
              <div className={styles.summaryRow}>
                <div className={styles.summaryLeft}>
                  <div className={styles.cartIconWrap}>
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F5ac1c437b00342a0b54f6649d7d6eeb8?width=80"
                      alt=""
                      className={styles.cartIcon}
                    />
                  </div>
                  <div className={styles.summaryInfo}>
                    <span className={styles.deliveryLabel}>Arrives {deliveryDay}, {deliveryTime}</span>
                    <span className={styles.totalLabel}>
                      Subtotal ({itemCount} items): <strong>${total}</strong>
                    </span>
                  </div>
                </div>
                <span className={styles.floatingIconBtn} aria-hidden="true">
                  <MaximizeIcon width={20} height={20} />
                </span>
              </div>

              <div className={styles.thumbnailRow}>
                {items.slice(0, 4).map((item) => {
                  const qty = item.quantity ?? 1;
                  return (
                    <div
                      key={item.id}
                      className={`${styles.thumbWrap} ${enteringId === item.id ? styles.thumbWrapEnter : ''}`}
                    >
                      <img src={item.image} alt="" className={styles.thumb} />
                      {qty > 1 && (
                        <span className={styles.thumbQtyBadge} aria-label={`${qty} in delivery`}>
                          {qty}
                        </span>
                      )}
                    </div>
                  );
                })}
                {itemCount > 4 && (
                  <div className={styles.thumbMore}>+{itemCount - 4}</div>
                )}
              </div>
            </button>
          </div>

          <button
            ref={morphPillRef}
            className={[styles.collapsedPill, styles.morphLayer, showPill ? styles.morphLayerActive : '']
              .filter(Boolean)
              .join(' ')}
            onClick={() => {
              if (searchModalOpen) return;
              setScrollCollapsed(false);
              setPillOverride(true);
            }}
            aria-label="Show upcoming delivery details"
            aria-hidden={!showPill}
            tabIndex={showPill ? 0 : -1}
          >
            <div className={styles.pillIconWrap}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F5ac1c437b00342a0b54f6649d7d6eeb8?width=80"
                alt=""
                className={styles.pillIcon}
              />
            </div>
            <span className={styles.pillText}>
              Delivery
              <span className={styles.pillSep}>|</span>
              <strong>Arrives {deliveryDay}, {deliveryTime}</strong>
            </span>
            <ChevronUp className={styles.pillChevron} aria-hidden="true" />
          </button>
        </div>
      )}

      {/* ── PANEL STATES (expanded / scheduling) ── */}
      {isPanel && (
        <>
          <div className={`${styles.expandedPanel} ${styles.panelExpanded}`}>

            {/* Grabber handle */}
            <div className={styles.grabberArea} onClick={handleCollapse} role="button" aria-label="Collapse basket">
              <div className={styles.grabber} />
            </div>

            {/* ── Panel header: "Arrives {day}, {time}" ── */}
            {state === 'expanded' && (
              <div className={styles.panelTopHeader}>
                <div className={styles.panelTopHeaderLeft}>
                  <img
                    className={styles.headerIconBadge}
                    src="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F632bd6802323416e985ff8b380c29830"
                    alt=""
                    aria-hidden="true"
                  />
                  <span className={styles.panelTopTitle}>
                    Arrives {deliveryDay}, {deliveryTime}
                  </span>
                </div>
                <button
                  className={styles.closeBtn}
                  onClick={handleCollapse}
                  aria-label="Minimize basket"
                >
                  <MinimizeIcon width={20} height={20} className={styles.closeIcon} />
                </button>
              </div>
            )}

            {state === 'scheduling' && (
              <div className={styles.panelTopHeader}>
                <div className={styles.panelTopHeaderLeft}>
                  <span className={styles.panelTopTitle}>Schedule your delivery</span>
                </div>
                <button
                  className={styles.closeBtn}
                  onClick={handleBackToBasket}
                  aria-label="Back to basket"
                >
                  <ChevronDown className={styles.closeIcon} />
                </button>
              </div>
            )}

            {/* ── Yellow countdown banner ── */}
            {state === 'expanded' && !isEditing && (
              <div className={styles.countdownBanner}>
                <div className={styles.countdownLeft}>
                  <CartArrow width={20} height={20} aria-hidden="true" />
                  <span className={styles.countdownText}>
                    <strong>4 days</strong> to add items
                  </span>
                </div>
                <Link href="/walmart/add-more-items" variant="default" className={styles.countdownLink}>
                  Add items
                </Link>
              </div>
            )}

            {/* ── EXPANDED CONTENT ── */}
            {state === 'expanded' && (
              <div className={styles.contentCard}>
                <div className={[styles.contentCardInner, isEditing ? styles.contentCardInnerEdit : ''].filter(Boolean).join(' ')}>
                  {/* Item count label */}
                  {!isEditing && (
                    <span className={styles.itemCountLabel}>{itemCount} items</span>
                  )}
                  {/* Item grid */}
                  <div className={isEditing ? styles.itemGridEdit : styles.itemGrid}>
                    {visibleItems.map((item, index) => (
                      <CondensedItemTile
                        key={item.id}
                        image={item.image}
                        price={item.price}
                        cents={item.cents}
                        tag={item.tag}
                        variant={isEditing ? 'edit' : 'tertiary'}
                        name={item.name}
                        quantity={quantities[item.id] ?? item.quantity ?? 2}
                        onQuantityChange={(q) => handleQuantityChange(item.id, q)}
                        isChecked={checkedItems[item.id] ?? true}
                        onCheckChange={(checked) => handleCheckChange(item.id, checked)}
                        itemIndex={index}
                        animationClass={isEditing ? tileStyles.itemBounceIn : undefined}
                        onAddToCart={isEditing ? undefined : () => {}}
                        showQuantityBadge={!isEditing}
                        stepperVariant="tertiary"
                        stepperSize="xsmall"
                      />
                    ))}
                  </div>

                  {/* Single "View all and edit" pill */}
                  {!isEditing && (
                    <div className={styles.actionRow}>
                      <Button variant="secondary" size="small" onClick={() => navigate('/walmart/edit-order')}>
                        View all and edit
                      </Button>
                    </div>
                  )}

                  {/* Est total row in edit mode */}
                  {isEditing && (
                    <>
                      <div className={styles.sectionSep} />
                      <div className={styles.estTotalBar}>
                        <span className={styles.estTotalText}>
                          Est. total{' '}
                          <span className={styles.estTotalMeta}>({checkedItemCount} items):</span>{' '}
                          <strong className={styles.estTotalAmount}>${estimatedTotal}</strong>
                        </span>
                        <Button variant="secondary" size="small" onClick={handleSave}>
                          Save
                        </Button>
                      </div>
                    </>
                  )}

                  {/* Separator + change row + suggestions + subtotal (non-edit only) */}
                  {!isEditing && (
                    <>
                      <div className={styles.sectionSepFull} />

                      {/* "Need to make a change?" row */}
                      <button
                        type="button"
                        className={styles.changeRow}
                        aria-label="Need to make a change?"
                      >
                        <span className={styles.changeRowLabel}>Need to make a change?</span>
                        <ChevronRight width={20} height={20} className={styles.changeRowChevron} />
                      </button>

                      {/* Suggestions — horizontal scroll */}
                      <div className={styles.suggestionsSection}>
                        <button
                          type="button"
                          className={styles.suggestionHeader}
                          aria-label="See all suggestions"
                          onClick={() => navigate('/walmart/add-more-items')}
                        >
                          <span className={styles.suggestionTitle}>Other items you might need soon</span>
                          <ChevronRight width={20} height={20} className={styles.changeRowChevron} />
                        </button>
                        <div className={styles.suggestionScroll}>
                          {SUGGESTION_ITEMS.map((s) => {
                            const priceNum = parseFloat(`${s.price}.${s.cents.padStart(2, '0')}`);
                            const added = addedDeliveryItems.find((a) => a.id === s.id);
                            return (
                              <div key={s.id} className={styles.suggestionTileWrap}>
                                <CondensedItemTile
                                  image={s.image}
                                  price={s.price}
                                  cents={s.cents}
                                  variant="primary"
                                  fillContainer
                                  quantity={added?.quantity ?? 0}
                                  addToCartVariant="primary-alt"
                                  onAddToCart={(qty) =>
                                    setDeliveryItemQuantity(
                                      { id: s.id, image: s.image, name: s.name, price: priceNum },
                                      qty,
                                    )
                                  }
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Driver tip section */}
                      <Divider UNSAFE_className={styles.sectionSepFull} />
                      <div className={styles.tipSection}>
                        <span className={styles.tipTitle}>Thank the driver with a tip</span>
                        <span className={styles.tipSubtitle}>100% of tips go to the driver</span>
                        <div className={styles.tipRow}>
                          <span className={styles.tipAmount}>Your tip: $10.84</span>
                          <button
                            type="button"
                            className={styles.tipEditBtn}
                            onClick={() => setShowTipSheet(true)}
                          >
                            Edit
                          </button>
                        </div>
                        <span className={styles.tipInfo}>
                          You can change your tip amount up to 3 hours after delivery.{' '}
                          You won't be charged until 24 hours after delivery.
                        </span>
                      </div>

                      {/* Delivery info section */}
                      <Divider UNSAFE_className={styles.sectionSepFull} />
                      <div className={styles.deliveryInfoSection}>
                        <span className={styles.deliveryInfoTitle}>Delivery info</span>
                        <span className={styles.deliveryInfoName}>Emilia Garcia</span>
                        <span className={styles.deliveryInfoAddress}>{address}</span>
                        <div className={styles.deliveryInfoInnerSep} />
                        <span className={styles.deliveryInstructionsTitle}>Delivery instructions</span>
                        <span className={styles.deliveryInstructionsText}>Leave at my door</span>
                      </div>

                      {/* Payment section */}
                      <Divider UNSAFE_className={styles.sectionSepFull} />
                      <div className={styles.paymentSection}>
                        <span className={styles.paymentTitle}>Payment</span>
                        <div className={styles.paymentRow}>
                          <span className={styles.visaBadge} aria-label="Visa">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 60 20"
                              className={styles.visaImg}
                              aria-hidden="true"
                            >
                              <text
                                x="30"
                                y="15"
                                textAnchor="middle"
                                fill="#ffffff"
                                fontFamily="'Helvetica Neue', Arial, sans-serif"
                                fontWeight="900"
                                fontSize="14"
                                fontStyle="italic"
                                letterSpacing="0.5"
                              >
                                VISA
                              </text>
                            </svg>
                          </span>
                          <span className={styles.paymentCardLabel}>Ending in 5981</span>
                        </div>
                      </div>

                    </>
                  )}
                </div>

                {/* Subtotal — pinned to the bottom of the panel, outside the scroll area */}
                {!isEditing && (
                  <div className={styles.subtotalFooter}>
                    <Divider UNSAFE_className={styles.sectionSepFull} />
                    <div className={styles.subtotalRow}>
                      <span className={styles.subtotalLabel}>Subtotal</span>
                      <span className={styles.subtotalValue}>
                        <span className={styles.subtotalCurrency}>$</span>
                        {estimatedTotal.split('.')[0]}
                        <span className={styles.subtotalCents}>{estimatedTotal.split('.')[1]}</span>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ── SCHEDULING CONTENT ── */}
            {state === 'scheduling' && (
              <div className={styles.contentCard}>
                <div className={styles.contentCardInner}>
                  <DeliveryScheduler
                    selectedDay={selectedDay}
                    selectedTime={selectedTime}
                    onDayChange={setSelectedDay}
                    onTimeChange={setSelectedTime}
                  />
                </div>
              </div>
            )}
          </div>

          {state === 'scheduling' && (
            <div className={styles.footerWrap}>
              <FloatingFooter
                secondaryAction={{ label: 'Back', onClick: handleBackToBasket }}
                primaryAction={{ label: 'Confirm delivery', variant: 'primary', strokeOn: true, onClick: handleConfirmDelivery }}
              />
            </div>
          )}
        </>
      )}

      {/* ── Driver tip bottom sheet ── */}
      {showTipSheet && (
        <div className={styles.tipSheetOverlay} onClick={() => setShowTipSheet(false)}>
          <div className={styles.tipSheet} onClick={(e) => e.stopPropagation()}>
            <div className={styles.tipSheetGrabber} />
            <div className={styles.tipSheetHeader}>
              <span className={styles.tipSheetTitle}>Driver tip details</span>
              <button
                type="button"
                className={styles.tipSheetClose}
                onClick={() => setShowTipSheet(false)}
                aria-label="Close"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <div className={styles.tipSheetBody}>
              <p className={styles.tipSheetText}>
                All tips are transferred to 3rd party delivery providers for distribution to drivers
                according to their contractual agreements on tip payout. Their practices may be
                available on their web sites.
              </p>
              <p className={styles.tipSheetText}>
                Changes to your order total won't affect your tip amount.
              </p>
            </div>
            <Divider UNSAFE_className={styles.sectionSepFull} />
            <div className={styles.tipSheetActions}>
              <Button variant="primary" size="medium" onClick={() => setShowTipSheet(false)}>
                Okay
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
