import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWalmartScenario } from '@/contexts/WalmartScenarioContext';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { Button } from '@/components/ui/Button';
import { CartArrow, InfoCircle } from '@/components/icons';
import { WALMART_BASKET_ITEMS, WalmartBasketItem } from '@/data/walmartBasket';
import styles from './EditOrder.module.css';

type EditItem = WalmartBasketItem;
// HMR refresh

export default function EditOrder() {
  const navigate = useNavigate();
  const {
    addedDeliveryItems,
    setDeliveryItemQuantity,
    basketItemOverrides,
    setBasketItemOverrides,
    setShouldExpandLOC,
    setBasketVisible,
  } = useWalmartScenario();

  // Merge added delivery items (at top) with demo basket items
  const allItems = useMemo<EditItem[]>(() => {
    const added: EditItem[] = [...addedDeliveryItems].reverse().map((it) => ({
      id: `added-${it.id}`,
      image: it.image,
      name: it.name,
      price: String(Math.floor(it.price)),
      cents: Math.round((it.price - Math.floor(it.price)) * 100).toString().padStart(2, '0'),
      quantity: it.quantity,
    }));
    return [...added, ...WALMART_BASKET_ITEMS];
  }, [addedDeliveryItems]);

  const [quantities, setQuantities] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    for (const it of allItems) {
      if (it.id.startsWith('added-')) {
        initial[it.id] = it.quantity;
      } else {
        initial[it.id] = basketItemOverrides[it.id] ?? it.quantity;
      }
    }
    return initial;
  });
  const [removed, setRemoved] = useState<Set<string>>(() => {
    const r = new Set<string>();
    for (const [id, q] of Object.entries(basketItemOverrides)) {
      if (q <= 0) r.add(id);
    }
    return r;
  });
  const [allowSubstitutions, setAllowSubstitutions] = useState(true);

  const activeItems = allItems.filter((it) => !removed.has(it.id));
  const itemCount = activeItems.reduce((sum, it) => sum + (quantities[it.id] ?? it.quantity), 0);

  const subtotal = useMemo(() => {
    return activeItems.reduce((sum, it) => {
      const qty = quantities[it.id] ?? it.quantity;
      const price = parseFloat(`${it.price}.${it.cents.padStart(2, '0')}`);
      return sum + price * qty;
    }, 0);
  }, [activeItems, quantities]);

  const handleQuantityChange = (id: string, q: number) => {
    if (q <= 0) {
      setRemoved((prev) => new Set([...prev, id]));
    } else {
      setQuantities((prev) => ({ ...prev, [id]: q }));
    }
  };

  const handleRemove = (id: string) => {
    setRemoved((prev) => new Set([...prev, id]));
  };

  const handleUpdateOrder = () => {
    // Persist all changes (quantities + removals) to the shared scenario state
    // so the LOC reflects them when the user returns.
    const overrides: Record<string, number> = { ...basketItemOverrides };
    for (const it of allItems) {
      const finalQty = removed.has(it.id) ? 0 : quantities[it.id] ?? it.quantity;
      if (it.id.startsWith('added-')) {
        const originalId = it.id.replace('added-', '');
        const original = addedDeliveryItems.find((a) => a.id === originalId);
        if (original) setDeliveryItemQuantity(original, finalQty);
      } else {
        overrides[it.id] = finalQty;
      }
    }
    setBasketItemOverrides(overrides);
    setBasketVisible(true);
    setShouldExpandLOC(true);
    navigate('/walmart/search/coffee', { state: { locExpanded: true } });
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <button
          type="button"
          className={styles.backBtn}
          onClick={() => {
            setBasketVisible(true);
            setShouldExpandLOC(true);
            navigate(-1);
          }}
          aria-label="Go back"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.09467 11.4697C7.82431 11.74 7.80351 12.1655 8.03228 12.4597L8.09467 12.5303L14.8447 19.2803C15.1376 19.5732 15.6124 19.5732 15.9053 19.2803C16.1757 19.01 16.1965 18.5845 15.9677 18.2903L15.9053 18.2197L9.68625 12L15.9053 5.78033C16.1757 5.50997 16.1965 5.08454 15.9677 4.79033L15.9053 4.71967C15.635 4.44931 15.2095 4.42851 14.9153 4.65728L14.8447 4.71967L8.09467 11.4697Z"
              fill="currentColor"
            />
          </svg>
        </button>
        <h1 className={styles.headerTitle}>Edit items ({itemCount})</h1>
        <div className={styles.headerSpacer} />
      </header>

      {/* Scrollable content */}
      <div className={styles.scrollContent}>
        {/* Yellow countdown banner */}
        <div className={styles.countdownBanner}>
          <div className={styles.countdownLeft}>
            <CartArrow width={20} height={20} aria-hidden="true" />
            <span className={styles.countdownText}>
              <strong>4 days left</strong> to add items to delivery
            </span>
          </div>
          <button type="button" className={styles.addItemsLink}>Add items</button>
        </div>

        {/* Substitutions card */}
        <div className={styles.subsCard}>
          <div className={styles.subsRow}>
            <div className={styles.subsLabel}>
              Allow substitutions for this order
              <button type="button" className={styles.infoBtn} aria-label="Substitutions info">
                <InfoCircle width={16} height={16} aria-hidden="true" />
              </button>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={allowSubstitutions}
              className={[styles.toggle, allowSubstitutions ? styles.toggleOn : ''].filter(Boolean).join(' ')}
              onClick={() => setAllowSubstitutions((v) => !v)}
              aria-label="Allow substitutions"
            >
              <span className={styles.toggleThumb} />
            </button>
          </div>
          <p className={styles.subsNote}>You'll be charged the price for items you receive.</p>
        </div>

        {/* Item list */}
        <div className={styles.itemList}>
          {activeItems.map((item) => {
            const qty = quantities[item.id] ?? item.quantity;
            const unitTotal = (parseFloat(`${item.price}.${item.cents.padStart(2, '0')}`) * qty).toFixed(2);
            return (
              <div key={item.id} className={styles.itemCard}>
                <div className={styles.itemTop}>
                  <img src={item.image} alt={item.name} className={styles.itemImage} />
                  <div className={styles.itemMid}>
                    <span className={styles.itemName}>{item.name}</span>
                    {item.unitPrice && (
                      <span className={styles.itemUnitPrice}>{item.unitPrice}</span>
                    )}
                  </div>
                  <span className={styles.itemTotal}>${unitTotal}</span>
                </div>

                <div className={styles.itemActionRow}>
                  <button
                    type="button"
                    className={styles.removeBtn}
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </button>
                  <QuantityStepper
                    variant="tertiary"
                    size="small"
                    defaultCount={qty}
                    startExpanded
                    showTrashOnRemove
                    onChange={(q) => handleQuantityChange(item.id, q)}
                  />
                </div>

                <div className={styles.replaceRow}>
                  <span className={styles.replaceLabel}>If unavailable, replace with:</span>
                  <button type="button" className={styles.replaceSelect}>
                    Best match
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Sticky footer — subtotal + disclaimer + Update order */}
      <div className={styles.footer}>
        <div className={styles.subtotalRow}>
          <span className={styles.subtotalLabel}>Subtotal</span>
          <span className={styles.subtotalValue}>${subtotal.toFixed(2)}</span>
        </div>
        <div className={styles.footerDivider} />
        <p className={styles.disclaimer}>
          <svg
            className={styles.disclaimerIcon}
            width="16"
            height="16"
            viewBox="0 0 32 32"
            fill="none"
            aria-hidden="true"
          >
            <path fill="currentColor" d="M16 2.001c7.732 0 14 6.268 14 14s-6.268 14-14 14-14-6.268-14-14 6.268-14 14-14Zm0 2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12Zm0 15.976c.555 0 1.023.176 1.404.528.397.352.596.808.596 1.368 0 .592-.199 1.056-.596 1.392-.38.32-.849.48-1.404.48-.571 0-1.048-.16-1.429-.48-.38-.336-.57-.8-.571-1.392 0-.56.19-1.016.571-1.368.381-.352.858-.528 1.429-.528Zm1.286-1.584h-2.548L14.167 8.24h3.666l-.547 10.152Z"/>
          </svg>
          <span>
            Any changes to this order's temporary hold will be updated on your order details page.{' '}
            <button type="button" className={styles.disclaimerLink}>What is a temporary hold?</button>
          </span>
        </p>
        <Button variant="primary" size="medium" onClick={handleUpdateOrder}>
          Update order
        </Button>
      </div>
    </div>
  );
}
