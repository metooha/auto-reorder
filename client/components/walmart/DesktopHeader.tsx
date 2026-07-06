import { useState, useRef, useEffect, useCallback } from 'react';
import { Highlight } from '@/components/ui/Callout';
import { Search, ChevronDown } from '@/components/icons';
import { Spark } from '@/components/icons/Spark';
import {
  CartIcon,
  FulfillmentShippingIcon, CloseIcon as X,
} from '@/components/icons-custom';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { DesktopGICDropdown } from './DesktopGICDropdown';
import { DesktopSearchTypeahead } from './DesktopSearchTypeahead';
import { ReorderDropdown } from './ReorderDropdown';
import { AccountDropdown } from './AccountDropdown';
import { defaultRecentSearches } from './searchData';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useLayoutSettings } from '@/contexts/LayoutSettingsContext';
import styles from './DesktopHeader.module.css';

export function DesktopHeader() {
  const navigate = useNavigate();
  const { cartCount, cartPrice } = useCart();
  const { isLoggedIn } = useAuth();
  const { showGICHighlight } = useLayoutSettings();
  const [showGIC, setShowGIC] = useState(false);
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState<'none' | 'shipping' | 'pickup' | 'delivery'>('none');
  const [searchQuery, setSearchQuery] = useState('');
  const [showTypeahead, setShowTypeahead] = useState(false);
  const [recentSearches, setRecentSearches] = useState(defaultRecentSearches);
  const searchFormRef = useRef<HTMLDivElement>(null);

  const closeTypeahead = useCallback(() => {
    setShowTypeahead(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeTypeahead();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [closeTypeahead]);

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        {/* Walmart Logo */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate('/walmart');
          }}
          className={styles.logo}
          aria-label="Walmart Homepage"
        >
          <Spark className={styles.logoImage} aria-label="Walmart" />
        </a>

        {/* Location/Delivery Selector */}
        <Highlight
          message="Is this the right location?"
          position="bottom-start"
          actionLabel="Update"
          onAction={() => setShowGIC(true)}
          onClose={() => {}}
          open={showGICHighlight && !showGIC}
          icon={
            <svg width="28" height="28" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              {/* Outer pin — brand blue subtle */}
              <path
                d="M36 4.5C42.2657 4.5 48.2753 6.98864 52.7058 11.4192C57.1364 15.8497 59.625 21.8593 59.625 28.125C59.625 51.75 36 67.5 36 67.5C36 67.5 12.375 51.75 12.375 28.125C12.375 21.8593 14.8636 15.8497 19.2942 11.4192C23.7247 6.98864 29.7343 4.5 36 4.5ZM36 15.75C29.1655 15.75 23.625 21.2905 23.625 28.125C23.625 34.9595 29.1655 40.5 36 40.5C42.8345 40.5 48.375 34.9595 48.375 28.125C48.375 21.2905 42.8345 15.75 36 15.75Z"
                fill="var(--ld-semantic-color-fill-brand-subtle, #C7DBFF)"
              />
              {/* Inner circle — cyan blue */}
              <path
                d="M36 40.5C42.8345 40.5 48.375 34.9595 48.375 28.125C48.375 21.2905 42.8345 15.75 36 15.75C29.1655 15.75 23.625 21.2905 23.625 28.125C23.625 34.9595 29.1655 40.5 36 40.5Z"
                fill="#4DBDF5"
              />
            </svg>
          }
        >
          <section className={styles.gicSection}>
            <button
              type="button"
              className={styles.gicButton}
              onClick={() => setShowGIC(!showGIC)}
            >
              <div className={styles.gicContent}>
                <div className={styles.gicIcon}>
                  {selectedDeliveryOption === 'none' && (
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fe96ba70bf20a4d59aede84cfd5b0636c"
                      alt="Global Intent"
                      width="40"
                      height="40"
                    />
                  )}
                  {selectedDeliveryOption === 'delivery' && (
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Ff8af2f0cfbbf459b862fcbd867dac70d"
                      alt="Delivery"
                    />
                  )}
                  {selectedDeliveryOption === 'pickup' && (
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Ff91b889ffddd4a669bd5f5ed913c38df"
                      alt="Pickup"
                    />
                  )}
                  {selectedDeliveryOption === 'shipping' && (
                    <FulfillmentShippingIcon />
                  )}
                </div>
                <div className={styles.gicText}>
                  <div className={styles.gicLabel}>
                    {selectedDeliveryOption === 'none' && 'Pickup or delivery?'}
                    {selectedDeliveryOption === 'shipping' && 'Shipping'}
                    {selectedDeliveryOption === 'pickup' && 'Pickup'}
                    {selectedDeliveryOption === 'delivery' && 'Delivery'}
                  </div>
                  <div className={styles.gicSubtext}>
                    {selectedDeliveryOption === 'none' ? (
                      <>
                        <span>847 Maple Grove Dr</span>
                        <span className={styles.separator}>•</span>
                        <span className={styles.ellipsis}>Sunnyvale Supercenter</span>
                      </>
                    ) : selectedDeliveryOption === 'pickup' ? (
                      <span className={styles.ellipsis}>Carrollton Supercenter</span>
                    ) : (
                      <span>3471 Park Ln</span>
                    )}
                  </div>
                </div>
                <div className={styles.gicChevron}>
                  <ChevronDown />
                </div>
              </div>
            </button>
            <DesktopGICDropdown
              isOpen={showGIC}
              onClose={() => setShowGIC(false)}
              selectedOption={selectedDeliveryOption}
              onSelectOption={setSelectedDeliveryOption}
            />
          </section>
        </Highlight>

        {/* Search Form */}
        <div
          ref={searchFormRef}
          className={`${styles.searchFormWrap} ${showTypeahead ? styles.searchFormWrapFocused : ''}`}
        >
          <form
            action="/walmart/search"
            autoComplete="off"
            role="search"
            aria-label="Walmart Site-Wide"
            className="flex items-center"
            onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim()) {
                navigate(`/walmart/loading?q=${encodeURIComponent(searchQuery.trim())}`);
              } else {
                navigate('/walmart/search');
              }
              closeTypeahead();
            }}
          >
            <div className={`${styles.searchInputWrap} ${showTypeahead ? styles.searchInputWrapActive : ''}`}>
              <input
                aria-label="Search"
                name="q"
                placeholder="Search everything at Walmart online and in store"
                type="search"
                autoComplete="off"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowTypeahead(true)}
                className={styles.searchInput}
              />
              <div className={styles.searchActions}>
                {searchQuery ? (
                  <button
                    type="button"
                    aria-label="Clear search"
                    onClick={() => setSearchQuery('')}
                    className={styles.clearButton}
                  >
                    <X className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    aria-label="Search"
                    type="button"
                    onClick={() => setShowTypeahead(true)}
                    className={styles.searchButton}
                  >
                    <Search className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </form>
          {showTypeahead && (
            <DesktopSearchTypeahead
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              recentSearches={recentSearches}
              setRecentSearches={setRecentSearches}
              onClose={closeTypeahead}
            />
          )}
        </div>

        {/* Scrim overlay */}
        {showTypeahead && createPortal(
          <div
            className={styles.scrim}
            onClick={closeTypeahead}
          />,
          document.body
        )}

        {/* Navigation */}
        <nav aria-label="Account and Cart" className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.reorderItem}>
              <ReorderDropdown />
            </li>
            <li className={styles.accountItem}>
              <AccountDropdown />
            </li>
            <li className={styles.cartItem}>
              <button
                type="button"
                aria-label="Cart contains 1 item Total Amount $5.00"
                className={styles.cartButton}
                onClick={() => navigate('/cart')}
              >
                <CartIcon count={cartCount} price={cartPrice} textColor="var(--ld-semantic-color-top-nav-text-on-fill)" />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
