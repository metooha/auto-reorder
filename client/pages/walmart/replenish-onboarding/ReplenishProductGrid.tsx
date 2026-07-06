import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/Button';
import { X, Minus, Plus } from '@/components/icons';
import { PRODUCT_IMAGES } from '@/components/walmart/productImages';
import styles from './ReplenishProductGrid.module.css';

interface ProductItem {
  id: number;
  name: string;
  img: string;
  price: string;
  cents: string;
  qty: number;
  size: string;
}

export const DEFAULT_ITEMS: ProductItem[] = [
  { id: 1, name: 'Fresh Envy Apples, Each', img: 'https://i5.walmartimages.com/seo/Fresh-Envy-Apples-Each_32451a10-0563-426a-9a16-a8865b2c3774_3.b3be01fcc4c956f51fe3890589897d31.jpeg?odnHeight=573&odnWidth=573&odnBg=FFFFFF', price: '1', cents: '25', qty: 3, size: '5 oz' },
  { id: 2, name: 'Organic Whole Milk, 1 Gallon', img: PRODUCT_IMAGES.cookwareSet, price: '3', cents: '85', qty: 2, size: '5 oz' },
  { id: 3, name: 'Great Value Sliced Bread', img: PRODUCT_IMAGES.mugSet, price: '8', cents: '86', qty: 1, size: '5 oz' },
  { id: 4, name: 'Bananas, Each', img: PRODUCT_IMAGES.cordlessVacuum, price: '2', cents: '62', qty: 5, size: '5 oz' },
  { id: 5, name: 'Large Eggs, 12 Count', img: PRODUCT_IMAGES.comforterSet, price: '3', cents: '77', qty: 2, size: '5 oz' },
  { id: 6, name: 'Baby Spinach, 5 oz', img: PRODUCT_IMAGES.headphones, price: '3', cents: '47', qty: 1, size: '5 oz' },
  { id: 7, name: 'Greek Yogurt, Plain', img: PRODUCT_IMAGES.tablet, price: '1', cents: '98', qty: 2, size: '5 oz' },
  { id: 8, name: 'Chicken Breast, Fresh', img: PRODUCT_IMAGES.digitalCamera, price: '5', cents: '27', qty: 1, size: '5 oz' },
  { id: 9, name: 'Cheddar Cheese Block', img: PRODUCT_IMAGES.boucleArmchair, price: '4', cents: '75', qty: 2, size: '5 oz' },
  { id: 10, name: 'Pasta Sauce, Marinara', img: PRODUCT_IMAGES.leatherHandbag, price: '4', cents: '22', qty: 1, size: '5 oz' },
  { id: 11, name: 'Brown Rice, 2 lb', img: PRODUCT_IMAGES.blackCardigan, price: '4', cents: '66', qty: 2, size: '5 oz' },
  { id: 12, name: 'Orange Juice, 52 oz', img: PRODUCT_IMAGES.rattanCabinet, price: '3', cents: '24', qty: 1, size: '5 oz' },
];

export type GridView = 'browse' | 'edit' | 'confirm' | 'terms';

interface ReplenishProductGridProps {
  selectedDay: string;
  selectedTime: string;
  gridView: GridView;
  onGridViewChange: (view: GridView) => void;
  onClose: () => void;
}

export function ReplenishProductGrid({
  selectedDay,
  selectedTime,
  gridView,
  onGridViewChange,
  onClose,
}: ReplenishProductGridProps) {
  const [items, setItems] = useState<ProductItem[]>(DEFAULT_ITEMS);

  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = items.reduce((sum, item) => sum + (parseFloat(item.price) + parseFloat(item.cents) / 100) * item.qty, 0);

  const updateQty = useCallback((id: number, delta: number) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item
    ).filter(item => item.qty > 0));
  }, []);

  const browseRows = [];
  for (let i = 0; i < items.length; i += 3) {
    browseRows.push(items.slice(i, i + 3));
  }

  const editRows = [];
  for (let i = 0; i < items.length; i += 2) {
    editRows.push(items.slice(i, i + 2));
  }

  return (
    <div className={styles.page}>
      <div className={styles.section}>
        <div className={styles.headerRow}>
          <div className={styles.headerInfo}>
            <div className={styles.headerTitle}>Shop easily with items you buy often</div>
            <div className={styles.headerSub}>
              Get it by <span className={styles.headerSubLink}>{selectedDay}, {selectedTime}</span>
            </div>
          </div>
          <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Close">
            <X width={16} height={16} />
          </button>
        </div>

        <div className={styles.contentProducts}>
          {gridView === 'edit' ? (
            <div className={styles.editContent}>
              {editRows.map((row, rowIdx) => (
                <div key={rowIdx} className={styles.editRow}>
                  {row.map((item) => (
                    <EditTile key={item.id} item={item} onUpdateQty={updateQty} />
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.browseContent}>
              {browseRows.map((row, rowIdx) => (
                <div key={rowIdx} className={styles.browseRow}>
                  {row.map((item) => (
                    <CondensedTile key={item.id} item={item} />
                  ))}
                </div>
              ))}
            </div>
          )}
          {(gridView === 'browse' || gridView === 'confirm' || gridView === 'terms') && (
            <div className={styles.overlay} />
          )}
        </div>
      </div>

      <div className={styles.footer}>
        {gridView === 'browse' && (
          <BrowseFooter
            selectedDay={selectedDay}
            onEdit={() => onGridViewChange('edit')}
            onAdd={() => onGridViewChange('confirm')}
          />
        )}
        {gridView === 'edit' && (
          <EditFooter
            selectedDay={selectedDay}
            onSave={() => onGridViewChange('browse')}
            onAdd={() => onGridViewChange('confirm')}
          />
        )}
        {gridView === 'confirm' && (
          <ConfirmFooter
            totalItems={totalItems}
            totalPrice={totalPrice}
            onEdit={() => onGridViewChange('edit')}
            onConfirm={() => onGridViewChange('terms')}
            onDecline={onClose}
          />
        )}
        {gridView === 'terms' && (
          <TermsFooter
            onAgree={onClose}
            onDecline={onClose}
          />
        )}
      </div>
    </div>
  );
}

function CondensedTile({ item }: { item: ProductItem }) {
  return (
    <div className={styles.condensedTile}>
      <div className={styles.condensedImageWrap}>
        <img src={item.img} alt={item.name} className={styles.condensedImg} />
        <div className={styles.qtyBadge}>
          <span className={styles.qtyBadgeCount}>{item.qty}</span>
          <span className={styles.qtyBadgeX}>x</span>
        </div>
      </div>
      <div className={styles.priceRow}>
        <span className={styles.priceDollar}>${item.price}</span>
        <span className={styles.priceDollar}>{item.cents}</span>
      </div>
    </div>
  );
}

function EditTile({ item, onUpdateQty }: { item: ProductItem; onUpdateQty: (id: number, delta: number) => void }) {
  return (
    <div className={styles.editTile}>
      <div className={styles.editImageWrap}>
        <img src={item.img} alt={item.name} className={styles.editImg} />
      </div>
      <div className={styles.editPriceRow}>
        <span className={styles.priceDollar}>${item.price}</span>
        <span className={styles.priceDollar}>{item.cents}</span>
        <div className={styles.sizeTag}>
          <span className={styles.sizeTagText}>{item.size}</span>
        </div>
      </div>
      <div className={styles.editName}>{item.name}</div>
      <div className={styles.stepper}>
        <button type="button" className={styles.stepperBtn} onClick={() => onUpdateQty(item.id, -1)} aria-label="Decrease quantity">
          <Minus width={16} height={16} />
        </button>
        <span className={styles.stepperCount}>{item.qty}</span>
        <button type="button" className={styles.stepperBtn} onClick={() => onUpdateQty(item.id, 1)} aria-label="Increase quantity">
          <Plus width={16} height={16} />
        </button>
      </div>
    </div>
  );
}

function BrowseFooter({ selectedDay, onEdit, onAdd }: { selectedDay: string; onEdit: () => void; onAdd: () => void }) {
  return (
    <div className={styles.floatingFooter}>
      <Button variant="secondary" size="medium" onClick={onEdit}>Edit</Button>
      <div className={styles.footerPrimary}>
        <Button variant="primary" size="medium" isFullWidth onClick={onAdd}>
          Add to {selectedDay} delivery
        </Button>
      </div>
    </div>
  );
}

function EditFooter({ selectedDay, onSave, onAdd }: { selectedDay: string; onSave: () => void; onAdd: () => void }) {
  return (
    <div className={styles.floatingFooter}>
      <Button variant="secondary" size="medium" onClick={onSave}>Save</Button>
      <div className={styles.footerPrimary}>
        <Button variant="primary" size="medium" isFullWidth onClick={onAdd}>
          Add to {selectedDay} delivery
        </Button>
      </div>
    </div>
  );
}

function ConfirmFooter({
  totalItems,
  totalPrice,
  onEdit,
  onConfirm,
  onDecline,
}: {
  totalItems: number;
  totalPrice: number;
  onEdit: () => void;
  onConfirm: () => void;
  onDecline: () => void;
}) {
  return (
    <div className={styles.confirmFooter}>
      <div className={styles.confirmHeader}>
        <div className={styles.confirmTitle}>Set up weekly delivery?</div>
        <div className={styles.confirmSummary}>
          <span className={styles.confirmSummaryLabel}>Est. total</span>
          <span className={styles.confirmSummaryCount}>({totalItems} items)</span>
          <span className={styles.confirmSummaryCount}>:</span>
          <span className={styles.confirmSummaryPrice}>${totalPrice.toFixed(2)}</span>
        </div>
        <button type="button" className={styles.confirmEditBtn} onClick={onEdit}>Edit</button>
      </div>
      <p className={styles.confirmDesc}>
        <span className={styles.confirmBold}>Never run out of your favorites.</span>{' '}
        You can add items, edit, or pause anytime.
      </p>
      <div className={styles.confirmCtas}>
        <Button variant="primary" size="medium" isFullWidth onClick={onConfirm}>
          Yes, do it every week
        </Button>
        <Button variant="tertiary" size="medium" isFullWidth onClick={onDecline}>
          Not right now
        </Button>
      </div>
    </div>
  );
}

function TermsFooter({ onAgree, onDecline }: { onAgree: () => void; onDecline: () => void }) {
  return (
    <div className={styles.termsFooter}>
      <div className={styles.termsTitle}>Review the terms and conditions</div>
      <p className={styles.termsText}>
        By clicking "I agree" you accept the terms and conditions for recurring weekly delivery of your selected items.
        You can modify or cancel at any time from your account settings.
      </p>
      <div className={styles.termsCtas}>
        <Button variant="primary" size="medium" isFullWidth onClick={onAgree}>
          I agree
        </Button>
        <Button variant="tertiary" size="medium" isFullWidth onClick={onDecline}>
          Not right now
        </Button>
      </div>
    </div>
  );
}
