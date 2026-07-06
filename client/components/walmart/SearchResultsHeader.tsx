import { Barcode, ChevronDown, ChevronLeft, Search } from "@/components/icons";
import { CartIcon } from "@/components/icons-custom/CartIcon";
import { useLayoutSettings } from "@/contexts/LayoutSettingsContext";
import { useWalmartScenario } from "@/contexts/WalmartScenarioContext";
import styles from "./MobileTopNav.module.css";

interface SearchResultsHeaderProps {
  query: string;
  onBack: () => void;
}

export function SearchResultsHeader({ query, onBack }: SearchResultsHeaderProps) {
  const { platform } = useLayoutSettings();
  const isNative = platform === 'ios' || platform === 'android';
  const { cartItems } = useWalmartScenario();
  const cartCount = cartItems.reduce((sum, it) => sum + it.quantity, 0);
  const cartTotal = cartItems.reduce((sum, it) => sum + it.price * it.quantity, 0);
  const cartPrice = `$${cartTotal.toFixed(2)}`;

  return (
    <div
      className={[styles.root, styles.rootNativeBlue, 'lg:hidden'].join(' ')}
      style={{ top: isNative ? 54 : 0, width: '100vw', marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)' }}
    >
      <div className={styles.nativeHomeContainer}>
        {/* Row 1: Back + Search pill (query filled in) */}
        <div className={styles.nativeSearchRow} style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 8 }}>
          <button
            type="button"
            onClick={onBack}
            aria-label="Go back"
            style={{
              background: 'transparent',
              border: 'none',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--ld-semantic-color-text-inverse, #fff)',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className={styles.nativeSearchPill}>
            <Search className={styles.nativeSearchIcon} />
            <span
              className={styles.searchPillText}
              style={{
                color: query
                  ? 'var(--ld-semantic-color-text, #2e2f32)'
                  : 'var(--ld-semantic-color-text-subtle, #5b5c5e)',
              }}
            >
              {query || 'Search Walmart'}
            </span>
            <button
              type="button"
              className={styles.nativeBarcodeBtn}
              aria-label="Scan barcode"
            >
              <Barcode className={styles.nativeBarcodeIcon} />
            </button>
          </div>

          <button
            type="button"
            className={styles.headerCartBtn}
            aria-label="Cart"
          >
            <CartIcon count={cartCount} price={cartPrice} />
          </button>
        </div>

        {/* Row 2: Delivery banner */}
        <div className={[styles.deliveryBanner, styles.deliveryBannerBlue].join(' ')}>
          <button type="button" className={styles.deliveryButton}>
            <div className="flex items-center gap-2">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fe96ba70bf20a4d59aede84cfd5b0636c"
                alt="Global Intent"
                className="w-[24px] h-[24px] flex-shrink-0 rounded-full"
              />
              <span
                className="text-[14px] font-semibold"
                style={{ color: 'var(--ld-semantic-color-text-inverse, #fff)' }}
              >
                How do you want your items?
              </span>
            </div>
            <ChevronDown
              className="w-4 h-4"
              style={{ color: 'var(--ld-semantic-color-text-inverse, #fff)' }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
