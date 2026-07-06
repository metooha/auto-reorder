import { useState, useEffect, useRef } from 'react';
import { Plus, Minus } from '@/components/icons';
import { IconButton } from '@/components/ui/IconButton';
import styles from './AddToCart.module.css';

interface AddToCartProps {
  onQuantityChange?: (quantity: number) => void;
}

export function AddToCart({ onQuantityChange }: AddToCartProps) {
  const [quantity, setQuantity] = useState(0);
  const [mode, setMode] = useState<'initial' | 'expanded' | 'collapsed'>('initial');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

  useEffect(() => {
    if (mode === 'expanded' && quantity > 0) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setMode('collapsed'), 5000);
    }
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [mode, quantity]);

  const update = (newQty: number) => {
    setQuantity(newQty);
    onQuantityChange?.(newQty);
    if (newQty === 0) setMode('initial');
    else setMode('expanded');
  };

  if (mode === 'initial') {
    return (
      <IconButton
        variant="secondary"
        size="small"
        shape="rounded"
        aria-label="Add to cart"
        UNSAFE_className={styles.initialButton}
        onClick={(e) => { e.stopPropagation(); update(1); }}
      >
        <Plus width={16} height={16} />
      </IconButton>
    );
  }

  if (mode === 'collapsed') {
    return (
      <button
        className={styles.collapsedButton}
        onClick={(e) => { e.stopPropagation(); setMode('expanded'); }}
        aria-label={`${quantity} in cart, tap to edit`}
      >
        <span className={styles.countText}>{quantity}</span>
      </button>
    );
  }

  return (
    <div className={styles.stepper}>
      <IconButton
        variant="ghost"
        size="small"
        shape="rounded"
        aria-label="Decrease quantity"
        UNSAFE_className={styles.stepperButton}
        onClick={(e) => { e.stopPropagation(); update(quantity - 1); }}
      >
        <Minus width={16} height={16} />
      </IconButton>
      <div className={styles.stepperCount}>
        <span className={styles.countText}>{quantity}</span>
      </div>
      <IconButton
        variant="ghost"
        size="small"
        shape="rounded"
        aria-label="Increase quantity"
        UNSAFE_className={styles.stepperButton}
        onClick={(e) => { e.stopPropagation(); update(quantity + 1); }}
      >
        <Plus width={16} height={16} />
      </IconButton>
    </div>
  );
}
