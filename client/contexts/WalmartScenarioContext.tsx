import { createContext, useContext, useState, ReactNode } from 'react';

export type WalmartScenario = 'default' | 'associate-discount';
export type WalmartPrefsMode = 'none' | 'non-member' | 'member-inhome';
export type WalmartErrorState =
  | 'none'
  | 'slot-unavailable'
  | 'missing-address'
  | 'missing-payment'
  | 'method-error'
  | 'missing-cvv'
  | 'multiple'
  | 'oos';

export interface AddedDeliveryItem {
  id: string;
  image: string;
  name: string;
  price: number; // dollars (with cents as fraction)
  quantity: number;
}

interface WalmartScenarioContextValue {
  scenario: WalmartScenario;
  setScenario: (s: WalmartScenario) => void;
  prefsMode: WalmartPrefsMode;
  setPrefsMode: (m: WalmartPrefsMode) => void;
  errorState: WalmartErrorState;
  setErrorState: (e: WalmartErrorState) => void;
  onboardingOpen: boolean;
  setOnboardingOpen: (open: boolean) => void;
  onboardingActive: boolean;
  setOnboardingActive: (active: boolean) => void;
  basketVisible: boolean;
  setBasketVisible: (v: boolean) => void;
  /** Items the user has added to delivery from search/product cards */
  addedDeliveryItems: AddedDeliveryItem[];
  setDeliveryItemQuantity: (item: Omit<AddedDeliveryItem, 'quantity'>, quantity: number) => void;
  /** Items in the top-right cart (separate from delivery). */
  cartItems: AddedDeliveryItem[];
  setCartItemQuantity: (item: Omit<AddedDeliveryItem, 'quantity'>, quantity: number) => void;
  /** Per-basket-item quantity overrides set from the Edit Order page. 0 = removed. */
  basketItemOverrides: Record<string, number>;
  setBasketItemOverride: (id: string, quantity: number) => void;
  setBasketItemOverrides: (overrides: Record<string, number>) => void;
  /** When true, the LOC should auto-open in its expanded state on next render. */
  shouldExpandLOC: boolean;
  setShouldExpandLOC: (v: boolean) => void;
}

const WalmartScenarioContext = createContext<WalmartScenarioContextValue | null>(null);

export function WalmartScenarioProvider({ children }: { children: ReactNode }) {
  const [scenario, setScenario] = useState<WalmartScenario>('default');
  const [prefsMode, setPrefsMode] = useState<WalmartPrefsMode>('none');
  const [errorState, setErrorState] = useState<WalmartErrorState>('none');
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [onboardingActive, setOnboardingActive] = useState(true);
  const [basketVisible, setBasketVisible] = useState(false);
  const [addedDeliveryItems, setAddedDeliveryItems] = useState<AddedDeliveryItem[]>([]);
  const [cartItems, setCartItems] = useState<AddedDeliveryItem[]>([]);
  const [basketItemOverrides, setBasketItemOverridesState] = useState<Record<string, number>>({});
  const [shouldExpandLOC, setShouldExpandLOC] = useState(false);

  const setBasketItemOverride = (id: string, quantity: number) => {
    setBasketItemOverridesState((prev) => ({ ...prev, [id]: quantity }));
  };

  const setBasketItemOverrides = (overrides: Record<string, number>) => {
    setBasketItemOverridesState(overrides);
  };

  const setCartItemQuantity = (item: Omit<AddedDeliveryItem, 'quantity'>, quantity: number) => {
    setCartItems((prev) => {
      const idx = prev.findIndex((p) => p.id === item.id);
      if (quantity <= 0) {
        if (idx === -1) return prev;
        const next = [...prev];
        next.splice(idx, 1);
        return next;
      }
      if (idx === -1) return [...prev, { ...item, quantity }];
      const next = [...prev];
      next[idx] = { ...next[idx], quantity };
      return next;
    });
  };

  const setDeliveryItemQuantity = (item: Omit<AddedDeliveryItem, 'quantity'>, quantity: number) => {
    setAddedDeliveryItems((prev) => {
      const idx = prev.findIndex((p) => p.id === item.id);
      if (quantity <= 0) {
        if (idx === -1) return prev;
        const next = [...prev];
        next.splice(idx, 1);
        return next;
      }
      if (idx === -1) {
        return [...prev, { ...item, quantity }];
      }
      const next = [...prev];
      next[idx] = { ...next[idx], quantity };
      return next;
    });
    // Reveal the basket as soon as the user adds the first item
    if (quantity > 0) setBasketVisible(true);
  };

  return (
    <WalmartScenarioContext.Provider
      value={{ scenario, setScenario, prefsMode, setPrefsMode, errorState, setErrorState, onboardingOpen, setOnboardingOpen, onboardingActive, setOnboardingActive, basketVisible, setBasketVisible, addedDeliveryItems, setDeliveryItemQuantity, cartItems, setCartItemQuantity, basketItemOverrides, setBasketItemOverride, setBasketItemOverrides, shouldExpandLOC, setShouldExpandLOC }}
    >
      {children}
    </WalmartScenarioContext.Provider>
  );
}

export function useWalmartScenario(): WalmartScenarioContextValue {
  const ctx = useContext(WalmartScenarioContext);
  if (!ctx) {
    return {
      scenario: 'default',
      setScenario: () => {},
      prefsMode: 'none',
      setPrefsMode: () => {},
      errorState: 'none',
      setErrorState: () => {},
      onboardingOpen: false,
      setOnboardingOpen: () => {},
      onboardingActive: false,
      setOnboardingActive: () => {},
      basketVisible: false,
      setBasketVisible: () => {},
      addedDeliveryItems: [],
      setDeliveryItemQuantity: () => {},
      cartItems: [],
      setCartItemQuantity: () => {},
      basketItemOverrides: {},
      setBasketItemOverride: () => {},
      setBasketItemOverrides: () => {},
      shouldExpandLOC: false,
      setShouldExpandLOC: () => {},
    };
  }
  return ctx;
}

/** Returns true if the given error is currently active (including via 'multiple'). */
export function isErrorActive(state: WalmartErrorState, target: WalmartErrorState): boolean {
  if (state === target) return true;
  if (state === 'multiple') {
    return target === 'slot-unavailable' || target === 'missing-payment';
  }
  return false;
}
