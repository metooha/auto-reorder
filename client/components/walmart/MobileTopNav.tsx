import { useState, useRef, useCallback } from 'react';
import { Barcode, ChevronDown, ChevronLeft, ChevronUp, Menu, Search, Grid } from '@/components/icons';
import { Spark } from '@/components/icons/Spark';
import { CartIcon, LocationIcon, StoreIcon } from '@/components/icons-custom';
import { CameraModal } from '@/components/walmart/CameraModal';
import { MobileMenuPanel } from '@/components/walmart/MobileMenuPanel';
import { DepartmentsDropdown } from '@/components/walmart/DepartmentsDropdown';
import { ServicesDropdown } from '@/components/walmart/ServicesDropdown';
import { MoreLinksDropdown } from '@/components/walmart/MoreLinksDropdown';
import { SubNavButton } from '@/components/walmart/SubNavButton';
import { SearchTypeaheadModal } from '@/pages/walmart/index/SearchTypeaheadModal';
import { useNavigate } from 'react-router-dom';
import { useLayoutSettings } from '@/contexts/LayoutSettingsContext';
import { useCart } from '@/contexts/CartContext';
import styles from './MobileTopNav.module.css';

const mobileSecondaryLinks = [
  { label: 'Get it Fast', path: '/get-it-fast' },
  { label: 'Rollbacks & More', path: '/rollbacks' },
  { label: 'Pharmacy', path: '/pharmacy' },
  { label: 'New Arrivals', path: '/new-arrivals' },
  { label: 'Dinner Made Easy', path: '/dinner-made-easy' },
  { label: 'Walmart+', path: '/walmart-plus' },
];

export type MobileTopNavVariant = 'blue' | 'white';

interface MobileTopNavProps {
  showHomeExtras?: boolean;
  variant?: MobileTopNavVariant;
  pageTitle?: string;
}

export function MobileTopNav({ showHomeExtras = false, variant = 'blue', pageTitle }: MobileTopNavProps) {
  const navigate = useNavigate();
  const { platform } = useLayoutSettings();
  const { cartCount, cartPrice } = useCart();
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [showDeliveryOptions, setShowDeliveryOptions] = useState(false);
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState<'none' | 'shipping' | 'pickup' | 'delivery'>('none');
  const [showMenuPanel, setShowMenuPanel] = useState(false);

  // Drag-to-scroll for subNav
  const subNavRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ isDown: false, startX: 0, scrollLeft: 0, hasDragged: false });

  const onSubNavMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = subNavRef.current;
    if (!el) return;
    dragState.current = { isDown: true, startX: e.pageX - el.offsetLeft, scrollLeft: el.scrollLeft, hasDragged: false };
    el.style.cursor = 'grabbing';
  }, []);

  const onSubNavMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = subNavRef.current;
    if (!el || !dragState.current.isDown) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = x - dragState.current.startX;
    if (Math.abs(walk) > 4) dragState.current.hasDragged = true;
    el.scrollLeft = dragState.current.scrollLeft - walk;
  }, []);

  const onSubNavMouseUp = useCallback(() => {
    const el = subNavRef.current;
    if (!el) return;
    dragState.current.isDown = false;
    el.style.cursor = '';
  }, []);

  const onSubNavClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // Cancel click if the user dragged more than 4px
    if (dragState.current.hasDragged) e.stopPropagation();
  }, []);

  const isBlue = variant === 'blue';
  const isNative = platform === 'ios' || platform === 'android';
  const iconVariant = isBlue ? 'white' : undefined;
  const textColor = isBlue ? 'white' : 'var(--ld-semantic-color-text, #2e2f32)';

  // L3 page: show title + back chevron, no search bar
  if (pageTitle) {
    return (
      <>
        <div className={styles.root}>
          <div className={[styles.l3Bar, isBlue ? styles.l3BarBlue : ''].filter(Boolean).join(' ')}>
            <div className={styles.l3Row}>
              <button
                className={styles.l3BackButton}
                style={{ color: isBlue ? 'white' : 'var(--ld-semantic-color-text, #2e2f32)' }}
                aria-label="Go back"
                onClick={() => navigate(-1)}
              >
                <ChevronLeft className={styles.l3BackIcon} />
              </button>
              <h1 className={styles.l3Title} style={{ color: isBlue ? 'white' : 'var(--ld-semantic-color-text, #2e2f32)' }}>{pageTitle}</h1>
              <CartIcon count={cartCount} price={cartPrice} textColor={isBlue ? 'white' : 'var(--ld-semantic-color-text, #2e2f32)'} />
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={`${styles.root} ${isNative && isBlue && showHomeExtras ? styles.rootNativeBlue : ''}`}>
        {/* === NATIVE HOME LAYOUT === */}
        {isNative && isBlue && showHomeExtras ? (
          <div className={styles.nativeHomeContainer}>
            {/* Row 1: Header — greeting / spark / cart */}
            <div className={styles.nativeHeader}>
              <span className={styles.greeting}>Hi, Emilia</span>
              <div className={styles.sparkCenter}>
                <a
                  href="/walmart"
                  onClick={(e) => { e.preventDefault(); navigate('/walmart'); }}
                  aria-label="Walmart Homepage"
                >
                  <img
                    src="https://i5.walmartimages.com/dfw/63fd9f59-14e2/9d304ce6-96de-4331-b8ec-c5191226d378/v1/spark-icon.svg"
                    alt="Walmart"
                    className={styles.sparkImg}
                  />
                </a>
              </div>
              <CartIcon count={cartCount} price={cartPrice} textColor="white" />
            </div>

            {/* Row 2: Search pill */}
            <div className={styles.nativeSearchRow}>
              <div
                className={styles.nativeSearchPill}
                onClick={() => setShowSearchModal(true)}
              >
                <Search className={styles.nativeSearchIcon} />
                <span className={styles.searchPillText}>Search Walmart</span>
                <button
                  onClick={(e) => { e.stopPropagation(); setShowCameraModal(true); }}
                  className={styles.nativeBarcodeBtn}
                  aria-label="Scan barcode"
                >
                  <Barcode className={styles.nativeBarcodeIcon} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* === STANDARD TOP BAR (mweb home / non-home / native non-home) === */
          <div className={`${styles.topBar} ${isBlue ? styles.topBarBlue : styles.topBarWhite}`}>
            <div className={styles.topBarRow} style={{ gap: 16 }}>
              {isBlue && !isNative ? (
                <button className="text-white flex-shrink-0" aria-label="Menu" onClick={() => setShowMenuPanel(true)}>
                  <Menu className="w-6 h-6" />
                </button>
              ) : (
                <button
                  className={`flex-shrink-0 ${styles.backButton}`}
                  style={{ color: isBlue ? 'white' : 'var(--ld-semantic-color-text, #2e2f32)' }}
                  aria-label="Go back"
                  onClick={() => navigate(-1)}
                >
                  <ChevronLeft className={isNative ? styles.nativeBackIcon : 'w-6 h-6'} />
                </button>
              )}

              {isBlue && !isNative && (
                <a href="/walmart" className={styles.logoLink} aria-label="Walmart Homepage">
                  <Spark className={styles.logoImg} aria-label="Walmart" />
                </a>
              )}

              <div
                className={`${styles.searchPill} ${isBlue ? styles.searchPillBlue : styles.searchPillWhite} ${isNative ? styles.searchPillNative : ''}`}
                onClick={() => setShowSearchModal(true)}
              >
                {isNative && (
                  <Search className={styles.nativeSearchIcon} />
                )}
                <span className={styles.searchPillText}>
                  Search Walmart
                </span>
                <div className={styles.searchPillIcons}>
                  {isNative ? (
                    <button
                      onClick={(e) => { e.stopPropagation(); setShowCameraModal(true); }}
                      className={styles.nativeBarcodeBtn}
                      aria-label="Scan barcode"
                    >
                      <Barcode className={styles.nativeBarcodeIcon} />
                    </button>
                  ) : isBlue ? (
                    <button
                      onClick={(e) => { e.stopPropagation(); setShowSearchModal(true); }}
                      className={styles.searchButton}
                      aria-label="Search"
                    >
                      <Search className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={(e) => { e.stopPropagation(); setShowCameraModal(true); }}
                        className={styles.searchPillIconBtn}
                        aria-label="Camera search"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                          <path d="M2 8.5c0-.828.672-1.5 1.5-1.5h2.586a1 1 0 00.707-.293l1.414-1.414A1 1 0 018.914 5h6.172a1 1 0 01.707.293l1.414 1.414a1 1 0 00.707.293H20.5c.828 0 1.5.672 1.5 1.5v10c0 .828-.672 1.5-1.5 1.5h-17c-.828 0-1.5-.672-1.5-1.5v-10z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); setShowSearchModal(true); }}
                        className={styles.searchPillIconBtn}
                        aria-label="Voice search"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                          <path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                        </svg>
                      </button>
                    </>
                  )}
                </div>
              </div>

              <CartIcon count={cartCount} price={cartPrice} textColor={textColor} />
            </div>
          </div>
        )}

        {/* Pickup or Delivery Banner — homepage only */}
        {showHomeExtras && (
          <div className={`${styles.deliveryBanner} ${isBlue ? styles.deliveryBannerBlue : styles.deliveryBannerWhite}`}>
            {!showDeliveryOptions && (
              <button
                onClick={() => setShowDeliveryOptions(true)}
                className={styles.deliveryButton}
              >
                <div className="flex items-center gap-2">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fe96ba70bf20a4d59aede84cfd5b0636c"
                    alt="Global Intent"
                    className="w-[24px] h-[24px] flex-shrink-0 rounded-full"
                  />
                  <span className="text-[14px] font-semibold" style={{ color: textColor }}>
                    {selectedDeliveryOption === 'none' && 'How do you want your items?'}
                    {selectedDeliveryOption === 'delivery' && 'Delivery | 1213 E Trinity Mills Rd'}
                    {selectedDeliveryOption === 'pickup' && 'Pickup | Carrollton Supercenter'}
                    {selectedDeliveryOption === 'shipping' && 'Shipping | 1213 E Trinity Mills Rd'}
                  </span>
                </div>
                <ChevronDown className="w-4 h-4" style={{ color: textColor }} />
              </button>
            )}

            {showDeliveryOptions && (
              <div className="py-2 space-y-4 animate-fade-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fe96ba70bf20a4d59aede84cfd5b0636c"
                      alt="Global Intent"
                      className="w-[24px] h-[24px] flex-shrink-0 rounded-full"
                    />
                    <span className="text-[14px] font-semibold" style={{ color: textColor }}>How do you want your items?</span>
                  </div>
                  <button
                    onClick={() => setShowDeliveryOptions(false)}
                    className="w-6 h-6 flex items-center justify-center"
                  >
                    <ChevronUp className="w-4 h-4" style={{ color: textColor }} />
                  </button>
                </div>

                <div className="flex justify-center gap-6">
                  {([
                    { key: 'shipping', label: 'Shipping', icon: '/illustrations/mono-small/fulfillment-shipping.svg' },
                    { key: 'pickup',   label: 'Pickup',   icon: '/illustrations/mono-small/fulfillment-pickup.svg' },
                    { key: 'delivery', label: 'Delivery', icon: '/illustrations/mono-small/fulfillment-delivery.svg' },
                  ] as const).map((method) => (
                    <button
                      key={method.key}
                      className="flex flex-col items-center gap-2"
                      onClick={() => { setSelectedDeliveryOption(method.key); setShowDeliveryOptions(false); }}
                    >
                      <div className={`w-[60px] h-[60px] rounded-full bg-white flex items-center justify-center ${selectedDeliveryOption === method.key ? 'ring-2 ring-white/80' : ''}`}>
                        <img src={method.icon} alt={method.label} className="w-10 h-10 object-contain" />
                      </div>
                      <span className="text-[14px] font-extrabold leading-[17px] text-center" style={{ color: textColor }}>{method.label}</span>
                    </button>
                  ))}
                </div>

                <div className="flex flex-col gap-2 w-full">
                  <button className="w-full flex items-center gap-2 p-4 bg-white rounded-lg shadow-[0_-1px_2px_0_rgba(0,0,0,0.1),0_1px_2px_1px_rgba(0,0,0,0.15)]">
                    <LocationIcon className="w-4 h-4 flex-shrink-0" />
                    <span className="flex-1 text-left text-foreground text-[12px] leading-[16px]">
                      1213 E Trinity Mills Rd, Dallas, TX 75220
                    </span>
                  </button>
                  <button className="w-full flex items-center gap-2 p-4 bg-white rounded-lg shadow-[0_-1px_2px_0_rgba(0,0,0,0.1),0_1px_2px_1px_rgba(0,0,0,0.15)]">
                    <StoreIcon className="w-4 h-4 flex-shrink-0 self-start mt-0.5" />
                    <div className="flex-1 text-left flex flex-col gap-1">
                      <span className="text-foreground text-[12px] font-semibold leading-[16px]">Carrollton Supercenter</span>
                      <span className="text-foreground text-[12px] leading-[16px]">1213 E Trinity Mills Rd, Dallas, TX 75220</span>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Sub Nav — homepage only */}
        {showHomeExtras && (
          <div
            ref={subNavRef}
            className={`${styles.subNav} ${showDeliveryOptions ? styles.subNavHidden : ''}`}
            onMouseDown={onSubNavMouseDown}
            onMouseMove={onSubNavMouseMove}
            onMouseUp={onSubNavMouseUp}
            onMouseLeave={onSubNavMouseUp}
            onClick={onSubNavClick}
          >
            {isNative ? (
              <div className="flex-shrink-0">
                <DepartmentsDropdown
                  leadingIcon={<Grid />}
                  iconOnly
                  overlayMode
                />
              </div>
            ) : (
              <>
                <div className="flex-shrink-0">
                  <DepartmentsDropdown />
                </div>
                <div className="flex-shrink-0">
                  <ServicesDropdown />
                </div>
              </>
            )}
            {mobileSecondaryLinks.map((link) => (
              <SubNavButton
                key={link.label}
                label={link.label}
                href={link.path}
                onClick={(e) => { e.preventDefault(); navigate(link.path); }}
              />
            ))}
            <div className="flex-shrink-0">
              <MoreLinksDropdown />
            </div>
          </div>
        )}
      </div>

      {showSearchModal && (
        <SearchTypeaheadModal
          onClose={() => setShowSearchModal(false)}
          onCameraClick={() => { setShowSearchModal(false); setShowCameraModal(true); }}
        />
      )}

      <CameraModal
        isOpen={showCameraModal}
        onClose={() => setShowCameraModal(false)}
      />

      <MobileMenuPanel
        isOpen={showMenuPanel}
        onClose={() => setShowMenuPanel(false)}
      />

    </>
  );
}
