import { SearchIcon, ChevronDownIcon } from "@/components/icons";
import { CartIcon } from "@/components/icons";
import { FulfillmentShippingIcon } from "@/components/icons/FulfillmentShippingIcon";
import { DesktopGICDropdown } from "@/components/DesktopGICDropdown";
import { DesktopSearchTypeahead } from "@/components/DesktopSearchTypeahead";
import { AccountDropdown } from "@/components/AccountDropdown";
import { ReorderDropdown } from "@/components/ReorderDropdown";
import { SparkyLookingDown } from "@/components/icons/SparkyLookingDown";
import { defaultRecentSearches } from "@/components/search/searchData";
import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { CloseIcon as X } from "@/components/icons";
import styles from "./DesktopHeader.module.css";

export function DesktopHeader() {
  const navigate = useNavigate();
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
            navigate("/");
          }}
          className={styles.logo}
          aria-label="Walmart Homepage"
        >
          <img
            src="https://i5.walmartimages.com/dfw/63fd9f59-14e2/9d304ce6-96de-4331-b8ec-c5191226d378/v1/spark-icon.svg"
            alt="Walmart"
            width="36"
            height="36"
            className={styles.logoImage}
          />
        </a>

        {/* Location/Delivery Selector */}
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
                      <span>21 Los Altos Pl</span>
                      <span className={styles.separator}>•</span>
                      <span className={styles.ellipsis}>Mountain View Supercenter</span>
                    </>
                  ) : selectedDeliveryOption === 'pickup' ? (
                    <span className={styles.ellipsis}>Carrollton Supercenter</span>
                  ) : (
                    <span>3471 Park Ln</span>
                  )}
                </div>
              </div>
              <div className={styles.gicChevron}>
                <ChevronDownIcon />
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

        {/* Search Form */}
        <div ref={searchFormRef} className={`flex-1 ml-6 z-[101] relative ${showTypeahead ? 'border-2 border-[var(--ld-semantic-color-action-focus-outline,#0053E2)] border-b-0 bg-white p-px' : ''}`}>
          <form
            action="/search"
            autoComplete="off"
            role="search"
            aria-label="Walmart Site-Wide"
            className="flex items-center"
            onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim()) {
                navigate(`/loading?q=${encodeURIComponent(searchQuery.trim())}`);
              } else {
                navigate("/search");
              }
              closeTypeahead();
            }}
          >
            <div className={`flex items-center flex-1 relative bg-white ${showTypeahead ? '' : 'rounded-full border border-[var(--ld-semantic-color-border-moderate,#9CA3AF)]'}`}>
              <div className="absolute left-2.5 w-8 h-8 z-10">
                <SparkyLookingDown />
              </div>
              <input
                aria-label="Search"
                name="q"
                placeholder="Search everything at Walmart online and in store"
                type="search"
                autoComplete="off"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowTypeahead(true)}
                className="w-full h-[52px] pl-[54px] pr-[120px] py-px text-[var(--ld-semantic-color-text-brand,#001E60)] bg-transparent focus:outline-none placeholder:font-normal placeholder:text-[var(--ld-semantic-color-text-brand,#001E60)] [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
                style={{ fontFamily: 'inherit', fontSize: 'var(--ld-semantic-font-body-small-size, 14px)', lineHeight: 'var(--ld-semantic-font-body-small-lineheight, 20px)', fontWeight: 400 }}
              />
              <div className="absolute right-2.5 flex items-center gap-1.5">
                {searchQuery ? (
                  <button
                    type="button"
                    aria-label="Clear search"
                    onClick={() => setSearchQuery('')}
                    className="w-8 h-8 rounded-full border border-[var(--ld-semantic-color-border-subtle,#D1D5DB)] bg-white flex items-center justify-center hover:bg-[var(--ld-semantic-color-surface-hovered,#F8F8F8)] transition-colors"
                  >
                    <X className="w-4 h-4 text-[var(--ld-semantic-color-text,#2E2F32)]" />
                  </button>
                ) : (
                  <button
                    aria-label="Search"
                    type="button"
                    onClick={() => setShowTypeahead(true)}
                    className="w-8 h-8 flex items-center justify-center rounded-full transition-all duration-100 hover:opacity-80 relative"
                    style={{ backgroundColor: 'var(--ld-semantic-color-topnav-background-hover)' }}
                  >
                    <SearchIcon className="w-5 h-5" style={{ color: 'var(--ld-semantic-color-topnav-text)' }} />
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
            className="fixed inset-0 bg-black/40 z-[99]"
            onClick={closeTypeahead}
          />,
          document.body
        )}

        {/* Navigation */}
        <nav aria-label="Account and Cart" className={styles.nav}>
          <ul className={styles.navList}>
            {/* Reorder / My Items - custom dropdown */}
            <li className={styles.reorderItem}>
              <ReorderDropdown />
            </li>

            {/* Account Dropdown */}
            <li className={styles.accountItem}>
              <AccountDropdown userName="Hi, Mi H" />
            </li>

            {/* Cart */}
            <li className={styles.cartItem}>
              <button
                type="button"
                aria-label="Cart contains 1 item Total Amount $5.00"
                className={styles.cartButton}
                onClick={() => navigate("/cart")}
              >
                <CartIcon count={1} price="$5.00" textColor="var(--ld-semantic-color-topnav-text)" />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
