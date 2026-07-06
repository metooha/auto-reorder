import React, { useState, useCallback } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SideNavigation, SideNavigationItem } from '@/components/ui/SideNavigation';
import { DesktopHeader } from '@/components/walmart/DesktopHeader';
import { Menu } from '@/components/icons/Menu';
import { X } from '@/components/icons/X';
import { ChevronDown } from '@/components/icons/ChevronDown';
import styles from './ComponentLibraryLayout.module.css';

const COLLAPSED_STORAGE_KEY = 'cl-collapsed-sections';
// Large sections start collapsed by default
const DEFAULT_COLLAPSED = new Set<string>();

function readCollapsed(): Set<string> {
  try {
    const raw = localStorage.getItem(COLLAPSED_STORAGE_KEY);
    if (raw) return new Set(JSON.parse(raw) as string[]);
  } catch { /* ignore */ }
  return new Set(DEFAULT_COLLAPSED);
}

// Navigation item definition (nameKey references componentLibrary.* translation keys)
interface NavItem {
  id: string;
  nameKey: string;
  path: string;
}

interface NavSection {
  titleKey: string;
  items: NavItem[];
}

const navigationSections: NavSection[] = [
  {
    titleKey: 'componentLibrary.gettingStarted',
    items: [
      { id: 'overview', nameKey: 'componentLibrary.overview', path: '/component-library' },
      { id: 'getting-started', nameKey: 'componentLibrary.gettingStartedNav', path: '/component-library/getting-started' },
      { id: 'guidelines', nameKey: 'componentLibrary.guidelines', path: '/component-library/guidelines' },
      { id: 'foundations', nameKey: 'componentLibrary.navFoundations', path: '/component-library/foundations' },
      { id: 'assets', nameKey: 'componentLibrary.navAssets', path: '/component-library/assets' },
    ]
  },
  {
    titleKey: 'componentLibrary.tools',
    items: [
      { id: 'component-tester', nameKey: 'componentLibrary.componentSandbox', path: '/component-library/component-tester' },
      { id: 'project-settings', nameKey: 'componentLibrary.navProjectSettings', path: '/component-library/project-settings' },
    ]
  },
  {
    titleKey: 'componentLibrary.wcpPatterns',
    items: [
      { id: 'footer-patterns', nameKey: 'componentLibrary.navFooterPatterns', path: '/component-library/footer-patterns' },
      { id: 'top-nav', nameKey: 'componentLibrary.navTopNav', path: '/component-library/top-nav' },
      { id: 'order-card-patterns', nameKey: 'componentLibrary.navOrderCardPatterns', path: '/component-library/order-card-patterns' },
      { id: 'page-templates', nameKey: 'componentLibrary.navPageTemplates', path: '/component-library/page-templates' },
      { id: 'side-nav', nameKey: 'componentLibrary.navSideNav', path: '/component-library/side-nav' },
      { id: 'search-results', nameKey: 'componentLibrary.navSearchResults', path: '/component-library/search-results' },
      { id: 'home-page-widgets', nameKey: 'componentLibrary.navHomePageWidgets', path: '/component-library/home-page-widgets' },
      { id: 'promo-banners', nameKey: 'componentLibrary.navPromoBanners', path: '/component-library/promo-banners' },
      { id: 'wcp-queue', nameKey: 'componentLibrary.navWCPQueue', path: '/component-library/wcp-queue' },
      { id: 'carousels-grids', nameKey: 'componentLibrary.navCarouselsGrids', path: '/component-library/carousels-grids' },
      { id: 'order-status-cards', nameKey: 'componentLibrary.navOrderStatusCards', path: '/component-library/order-status-cards' },
      { id: 'replenishment-basket', nameKey: 'componentLibrary.navReplenishmentBasket', path: '/component-library/replenishment-basket' },
    ]
  },
  {
    titleKey: 'componentLibrary.wcpComponents',
    items: [
      { id: 'wcp-country', nameKey: 'componentLibrary.navWCPCountry', path: '/component-library/wcp-country' },
      { id: 'wcp-flag', nameKey: 'componentLibrary.navWCPFlag', path: '/component-library/wcp-flag' },
      { id: 'basic-banner', nameKey: 'componentLibrary.navBasicBanner', path: '/component-library/basic-banner' },
      { id: 'item-tile', nameKey: 'componentLibrary.navItemTile', path: '/component-library/item-tile' },
      { id: 'dropdowns', nameKey: 'componentLibrary.navDropdowns', path: '/component-library/dropdowns' },
      { id: 'search-utility', nameKey: 'componentLibrary.navSearchUtility', path: '/component-library/search-utility' },
      { id: 'wcp-button-groups', nameKey: 'componentLibrary.navWCPButtonGroups', path: '/component-library/wcp-button-groups' },
      { id: 'wcp-floating-button', nameKey: 'componentLibrary.navWCPFloatingButton', path: '/component-library/wcp-floating-button' },
      { id: 'wcp-heart-view', nameKey: 'componentLibrary.navWCPHeartView', path: '/component-library/wcp-heart-view' },
      { id: 'wcp-rating', nameKey: 'componentLibrary.navWCPRating', path: '/component-library/wcp-rating' },
      { id: 'wcp-search-bar', nameKey: 'componentLibrary.navWCPSearchBar', path: '/component-library/wcp-search-bar' },
      { id: 'wcp-signature-capture', nameKey: 'componentLibrary.navWCPSignatureCapture', path: '/component-library/wcp-signature-capture' },
      { id: 'wcp-rich-media-sheet', nameKey: 'componentLibrary.navWCPRichMediaSheet', path: '/component-library/wcp-rich-media-sheet' },
      { id: 'wcp-rich-snackbar', nameKey: 'componentLibrary.navWCPRichSnackbar', path: '/component-library/wcp-rich-snackbar' },
      { id: 'wcp-timer-view', nameKey: 'componentLibrary.navWCPTimerView', path: '/component-library/wcp-timer-view' },
      { id: 'wcp-upload-image', nameKey: 'componentLibrary.navWCPUploadImage', path: '/component-library/wcp-upload-image' },
    ]
  },
  {
    titleKey: 'componentLibrary.components',
    items: [
      { id: 'icons', nameKey: 'componentLibrary.navIcons', path: '/component-library/icons' },
      { id: 'alerts', nameKey: 'componentLibrary.navAlerts', path: '/component-library/alerts' },
      { id: 'badges', nameKey: 'componentLibrary.navBadges', path: '/component-library/badges' },
      { id: 'bottom-sheet', nameKey: 'componentLibrary.navBottomSheet', path: '/component-library/bottom-sheet' },
      { id: 'breadcrumbs', nameKey: 'componentLibrary.navBreadcrumbs', path: '/component-library/breadcrumbs' },
      { id: 'buttons', nameKey: 'componentLibrary.navButtons', path: '/component-library/buttons' },
      { id: 'callouts', nameKey: 'componentLibrary.navCallouts', path: '/component-library/callouts' },
      { id: 'cards', nameKey: 'componentLibrary.navCards', path: '/component-library/cards' },
      { id: 'checkboxes', nameKey: 'componentLibrary.navCheckboxes', path: '/component-library/checkboxes' },
      { id: 'chips', nameKey: 'componentLibrary.navChips', path: '/component-library/chips' },
      { id: 'content-messages', nameKey: 'componentLibrary.navContentMessages', path: '/component-library/content-messages' },
      { id: 'data-table', nameKey: 'componentLibrary.navDataTable', path: '/component-library/table' },
      { id: 'date-fields', nameKey: 'componentLibrary.navDateFields', path: '/component-library/date-fields' },
      { id: 'date-picker-calendar', nameKey: 'componentLibrary.navDatePickerCalendar', path: '/component-library/calendar' },
      { id: 'date-pickers', nameKey: 'componentLibrary.navDatePickers', path: '/component-library/date-pickers' },
      { id: 'date-range-picker', nameKey: 'componentLibrary.navDateRangePicker', path: '/component-library/date-range-picker' },
      { id: 'dialog', nameKey: 'componentLibrary.navDialog', path: '/component-library/dialog' },
      { id: 'dividers', nameKey: 'componentLibrary.navDividers', path: '/component-library/dividers' },
      { id: 'filter-chips', nameKey: 'componentLibrary.navFilterChips', path: '/component-library/filter-chips' },
      { id: 'form-groups', nameKey: 'componentLibrary.navFormGroups', path: '/component-library/form-groups' },
      { id: 'icon-buttons', nameKey: 'componentLibrary.navIconButtons', path: '/component-library/icon-buttons' },
      { id: 'link-buttons', nameKey: 'componentLibrary.navLinkButtons', path: '/component-library/link-buttons' },
      { id: 'links', nameKey: 'componentLibrary.navLinks', path: '/component-library/links' },
      { id: 'lists', nameKey: 'componentLibrary.navLists', path: '/component-library/lists' },
      { id: 'magic-box', nameKey: 'componentLibrary.navMagicBox', path: '/component-library/magic-box' },
      { id: 'menu', nameKey: 'componentLibrary.navMenu', path: '/component-library/menu' },
      { id: 'metrics', nameKey: 'componentLibrary.navMetrics', path: '/component-library/metrics' },
      { id: 'modals', nameKey: 'componentLibrary.navModals', path: '/component-library/modals' },
      { id: 'nudges', nameKey: 'componentLibrary.navNudges', path: '/component-library/nudges' },
      { id: 'panels', nameKey: 'componentLibrary.navPanels', path: '/component-library/panels' },
      { id: 'popover', nameKey: 'componentLibrary.navPopover', path: '/component-library/popover' },
      { id: 'progress-indicator', nameKey: 'componentLibrary.navProgressIndicator', path: '/component-library/progress-indicator' },
      { id: 'progress-tracker', nameKey: 'componentLibrary.navProgressTracker', path: '/component-library/progress-tracker' },
      { id: 'radio-buttons', nameKey: 'componentLibrary.navRadioButtons', path: '/component-library/radio-buttons' },
      { id: 'select', nameKey: 'componentLibrary.navSelect', path: '/component-library/select' },
      { id: 'skeleton', nameKey: 'componentLibrary.navSkeleton', path: '/component-library/skeleton' },
      { id: 'snackbars', nameKey: 'componentLibrary.navSnackbars', path: '/component-library/snackbars' },
      { id: 'spinners', nameKey: 'componentLibrary.navSpinners', path: '/component-library/spinners' },
      { id: 'spot-icons', nameKey: 'componentLibrary.navSpotIcons', path: '/component-library/spot-icons' },
      { id: 'switches', nameKey: 'componentLibrary.navSwitches', path: '/component-library/switches' },
      { id: 'tab-navigation', nameKey: 'componentLibrary.navTabNavigation', path: '/component-library/tabs' },
      { id: 'tags', nameKey: 'componentLibrary.navTags', path: '/component-library/tags' },
      { id: 'textarea', nameKey: 'componentLibrary.navTextArea', path: '/component-library/textarea' },
      { id: 'text-fields', nameKey: 'componentLibrary.navTextFields', path: '/component-library/text-fields' },
    ]
  },
  {
    titleKey: 'componentLibrary.sharedSection',
    items: [
      { id: 'accordion', nameKey: 'componentLibrary.navAccordion', path: '/component-library/accordion' },
      { id: 'segmented-control', nameKey: 'componentLibrary.navSegmentedControl', path: '/component-library/segmented-control' },
      { id: 'quantity-stepper', nameKey: 'componentLibrary.navQuantityStepper', path: '/component-library/quantity-stepper' },
      { id: 'alert-dialog', nameKey: 'componentLibrary.navAlertDialog', path: '/component-library/alert-dialog' },
      { id: 'avatar', nameKey: 'componentLibrary.navAvatar', path: '/component-library/avatar' },
      { id: 'carousel', nameKey: 'componentLibrary.navCarousel', path: '/component-library/carousel' },
      { id: 'chart', nameKey: 'componentLibrary.navChart', path: '/component-library/chart' },
      { id: 'collapsible', nameKey: 'componentLibrary.navCollapsible', path: '/component-library/collapsible' },
      { id: 'command', nameKey: 'componentLibrary.navCommand', path: '/component-library/command' },
      { id: 'context-menu', nameKey: 'componentLibrary.navContextMenu', path: '/component-library/context-menu' },
      { id: 'dropdown-menu', nameKey: 'componentLibrary.navDropdownMenu', path: '/component-library/dropdown-menu' },
      { id: 'form', nameKey: 'componentLibrary.navForm', path: '/component-library/form' },
      { id: 'menubar', nameKey: 'componentLibrary.navMenubar', path: '/component-library/menubar' },
      { id: 'navigation-menu', nameKey: 'componentLibrary.navNavigationMenu', path: '/component-library/navigation-menu' },
      { id: 'pagination', nameKey: 'componentLibrary.navPagination', path: '/component-library/pagination' },
      { id: 'scroll-area', nameKey: 'componentLibrary.navScrollArea', path: '/component-library/scroll-area' },
      { id: 'slider', nameKey: 'componentLibrary.navSlider', path: '/component-library/slider' },
      { id: 'toggle', nameKey: 'componentLibrary.navToggle', path: '/component-library/toggle' },
    ]
  },
];

export function ComponentLibraryLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [collapsed, setCollapsed] = useState<Set<string>>(readCollapsed);

  const toggleSection = useCallback((titleKey: string) => {
    setCollapsed(prev => {
      const next = new Set(prev);
      if (next.has(titleKey)) next.delete(titleKey);
      else next.add(titleKey);
      try { localStorage.setItem(COLLAPSED_STORAGE_KEY, JSON.stringify([...next])); } catch { /* ignore */ }
      return next;
    });
  }, []);

  const closeNav = useCallback(() => setMobileNavOpen(false), []);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    navigate(path);
    closeNav();
  }, [navigate, closeNav]);

  // Current page name for mobile top bar
  const currentPage = navigationSections
    .flatMap(s => s.items)
    .find(item => item.path === location.pathname);
  const currentPageName = currentPage ? t(currentPage.nameKey) : t('componentLibrary.title');

  return (
    <div className={styles.shell}>
      <DesktopHeader />

      <div className={styles.body}>
        {/* Backdrop for mobile drawer */}
        <div
          className={`${styles.backdrop} ${mobileNavOpen ? styles.backdropVisible : ''}`}
          onClick={closeNav}
          aria-hidden="true"
        />

        {/* Sidebar / Drawer */}
        <aside className={`${styles.sidebar} ${mobileNavOpen ? styles.sidebarOpen : ''}`}>
          <div className={styles.sidebarInner}>
            {/* Close button — mobile only */}
            <div className={styles.drawerCloseRow}>
              <button
                className={styles.drawerCloseBtn}
                onClick={closeNav}
                aria-label="Close navigation"
              >
                <X width={20} height={20} />
              </button>
            </div>

            <h1 className={styles.sidebarTitle}>{t('componentLibrary.title')}</h1>
            <p className={styles.sidebarSubtitle}>{t('componentLibrary.subtitle')}</p>

            {navigationSections.map((section, sectionIndex) => {
              const isCollapsed = collapsed.has(section.titleKey);
              // Auto-expand section if the current page lives inside it
              const hasActiveItem = section.items.some(item => item.path === location.pathname);
              const effectivelyOpen = hasActiveItem || !isCollapsed;

              return (
                <div
                  key={section.titleKey}
                  className={styles.navSection}
                  style={{ marginBottom: sectionIndex < navigationSections.length - 1 ? '8px' : '0' }}
                >
                  <button
                    className={styles.sectionToggle}
                    onClick={() => toggleSection(section.titleKey)}
                    aria-expanded={effectivelyOpen}
                    aria-controls={`section-${section.titleKey}`}
                  >
                    <span className={styles.sectionLabelText}>{t(section.titleKey)}</span>
                    <ChevronDown
                      width={14}
                      height={14}
                      className={[styles.sectionChevron, effectivelyOpen ? styles.sectionChevronOpen : ''].join(' ')}
                    />
                  </button>

                  <div
                    id={`section-${section.titleKey}`}
                    className={[styles.sectionContent, effectivelyOpen ? styles.sectionContentOpen : ''].join(' ')}
                  >
                    <div className={styles.sectionContentInner}>
                      <SideNavigation aria-label={`${t(section.titleKey)} Navigation`}>
                        {section.items.map((item) => {
                          const isActive = location.pathname === item.path;
                          return (
                            <SideNavigationItem
                              key={item.id}
                              href={item.path}
                              isCurrent={isActive}
                              onClick={(e) => handleNavClick(e, item.path)}
                            >
                              {t(item.nameKey)}
                            </SideNavigationItem>
                          );
                        })}
                      </SideNavigation>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Back to Home */}
            <div className={styles.backToHome}>
              <SideNavigation aria-label="Main Navigation">
                <SideNavigationItem
                  href="/"
                  onClick={(e) => handleNavClick(e, '/')}
                >
                  ← {t('componentLibrary.backToHome')}
                </SideNavigationItem>
              </SideNavigation>
            </div>
          </div>
        </aside>

        {/* Main content area */}
        <main className={styles.main}>
          {/* Mobile top bar with hamburger */}
          <div className={styles.mobileTopBar}>
            <button
              className={styles.hamburgerBtn}
              onClick={() => setMobileNavOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileNavOpen}
            >
              <Menu width={24} height={24} />
            </button>
            <span className={styles.mobileTopBarTitle}>{currentPageName}</span>
          </div>

          <Outlet />
        </main>
      </div>
    </div>
  );
}
