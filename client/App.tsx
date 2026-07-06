import "./global.css";

import "./i18n";
import { createRoot } from "react-dom/client";
import { SnackbarContainer } from "@/components/ui/SnackbarContainer";
import { WCPRichSnackbarContainer } from "@/components/walmart/WCPRichSnackbarContainer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { MartyProvider } from "@/contexts/MartyContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LayoutSettingsProvider } from "@/contexts/LayoutSettingsContext";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ComponentLibraryLayout } from "./components/ComponentLibraryLayout";

import React from 'react';
import { Navigate } from 'react-router-dom';

const NotFound = React.lazy(() => import("./pages/NotFound"));
const PreviewQR = React.lazy(() => import("./pages/PreviewQR"));

// Walmart pages (lazy loaded)
const WalmartIndex = React.lazy(() => import("./pages/walmart/Index"));
const WalmartLoadingScreen = React.lazy(() => import("./pages/walmart/LoadingScreen"));
const WalmartSearchResults = React.lazy(() => import("./pages/walmart/SearchResults"));
const WalmartDressesSearch = React.lazy(() => import("./pages/walmart/DressesSearchResults"));
const WalmartCerealSearch = React.lazy(() => import("./pages/walmart/CerealSearchResults"));
const WalmartCoffeeSearch = React.lazy(() => import("./pages/walmart/CoffeeSearchResults"));
const WalmartProductDetail = React.lazy(() => import("./pages/walmart/ProductDetail"));
const WalmartPurchaseHistory = React.lazy(() => import("./pages/walmart/PurchaseHistory"));
const WalmartReplenishOnboarding = React.lazy(() => import("./pages/walmart/replenish-onboarding"));
const WalmartSignIn = React.lazy(() => import("./pages/walmart/signin"));
const WalmartEditOrder = React.lazy(() => import("./pages/walmart/EditOrder"));
const WalmartAddMoreItems = React.lazy(() => import("./pages/walmart/AddMoreItems"));

import { WalmartScenarioProvider } from "@/contexts/WalmartScenarioContext";
import { Outlet } from "react-router-dom";
import { ErrorStatesFlow } from "@/components/walmart/ErrorStatesFlow";
function WalmartLayout() {
  return (
    <WalmartScenarioProvider>
      <Outlet />
      <ErrorStatesFlow />
    </WalmartScenarioProvider>
  );
}

// Component library pages (lazy loaded)
const ComponentLibraryOverview = React.lazy(() => import("./pages/component-library/Overview"));
const ComponentTester = React.lazy(() => import("./pages/component-library/ComponentTester"));
const IconsPage = React.lazy(() => import("./pages/component-library/Icons"));
const ButtonsPage = React.lazy(() => import("./pages/component-library/Buttons"));
const BadgesPage = React.lazy(() => import("./pages/component-library/Badges"));
const BreadcrumbsPage = React.lazy(() => import("./pages/component-library/Breadcrumbs"));
const LinksPage = React.lazy(() => import("./pages/component-library/Links"));
const LinkButtonsPage = React.lazy(() => import("./pages/component-library/LinkButtons"));
const IconButtonsPage = React.lazy(() => import("./pages/component-library/IconButtons"));
const CheckboxesPage = React.lazy(() => import("./pages/component-library/Checkboxes"));
const RadioButtonsPage = React.lazy(() => import("./pages/component-library/RadioButtons"));
const SelectPage = React.lazy(() => import("./pages/component-library/Select"));
const FormGroupsPage = React.lazy(() => import("./pages/component-library/FormGroups"));
const ChipsPage = React.lazy(() => import("./pages/component-library/Chips"));
const FilterChipsPage = React.lazy(() => import("./pages/component-library/FilterChips"));
const CalloutsPage = React.lazy(() => import("./pages/component-library/Callouts"));
const CardsPage = React.lazy(() => import("./pages/component-library/Cards"));
const AlertsPage = React.lazy(() => import("./pages/component-library/Alerts"));
const ContentMessagesPage = React.lazy(() => import("./pages/component-library/ContentMessages"));
const DateFieldsPage = React.lazy(() => import("./pages/component-library/DateFields"));
const DatePickersPage = React.lazy(() => import("./pages/component-library/DatePickers"));
const DividersPage = React.lazy(() => import("./pages/component-library/Dividers"));
const ListsPage = React.lazy(() => import("./pages/component-library/Lists"));
const MagicBoxPage = React.lazy(() => import("./pages/component-library/MagicBox"));
const MenuPage = React.lazy(() => import("./pages/component-library/Menu"));
const MetricsPage = React.lazy(() => import("./pages/component-library/Metrics"));
const ModalsPage = React.lazy(() => import("./pages/component-library/Modals"));
const NudgesPage = React.lazy(() => import("./pages/component-library/Nudges"));
const PanelsPage = React.lazy(() => import("./pages/component-library/Panels"));
const GuidelinesPage = React.lazy(() => import("./pages/component-library/Guidelines"));
const DocIndexPage = React.lazy(() => import("./pages/component-library/DocIndexPage"));
const GettingStartedPage = React.lazy(() => import("./pages/component-library/GettingStarted"));

// Shadcn/Radix component pages (lazy loaded to avoid blocking initial render)
const AccordionPage = React.lazy(() => import("./pages/component-library/Accordion"));
const AlertDialogPage = React.lazy(() => import("./pages/component-library/AlertDialog"));
const AvatarPage = React.lazy(() => import("./pages/component-library/Avatar"));
const BottomSheetPage = React.lazy(() => import("./pages/component-library/BottomSheet"));
const CalendarPage = React.lazy(() => import("./pages/component-library/Calendar"));
const DateRangePickerPage = React.lazy(() => import("./pages/component-library/DateRangePicker"));
const CarouselPage = React.lazy(() => import("./pages/component-library/Carousel"));
const ChartPage = React.lazy(() => import("./pages/component-library/Chart"));
const CollapsiblePage = React.lazy(() => import("./pages/component-library/Collapsible"));
const CommandPage = React.lazy(() => import("./pages/component-library/Command"));
const ContextMenuPage = React.lazy(() => import("./pages/component-library/ContextMenu"));
const DialogPage = React.lazy(() => import("./pages/component-library/Dialog"));
const DrawerPage = React.lazy(() => import("./pages/component-library/Drawer"));
const DropdownMenuPage = React.lazy(() => import("./pages/component-library/DropdownMenu"));
const FormPage = React.lazy(() => import("./pages/component-library/Form"));
const MenubarPage = React.lazy(() => import("./pages/component-library/Menubar"));
const NavigationMenuPage = React.lazy(() => import("./pages/component-library/NavigationMenu"));
const PaginationPage = React.lazy(() => import("./pages/component-library/Pagination"));
const PopoverPage = React.lazy(() => import("./pages/component-library/Popover"));
const ProgressIndicatorPage = React.lazy(() => import("./pages/component-library/ProgressIndicator"));
const ProgressTrackerPage = React.lazy(() => import("./pages/component-library/ProgressTracker"));
const ScrollAreaPage = React.lazy(() => import("./pages/component-library/ScrollArea"));
const SkeletonPage = React.lazy(() => import("./pages/component-library/Skeleton"));
const SliderPage = React.lazy(() => import("./pages/component-library/Slider"));
const SegmentedControlsPage = React.lazy(() => import("./pages/component-library/SegmentedControls"));
const QuantityStepperPage = React.lazy(() => import("./pages/component-library/QuantityStepperPage"));
const SnackbarsPage = React.lazy(() => import("./pages/component-library/Snackbars"));
const SpinnersPage = React.lazy(() => import("./pages/component-library/Spinners"));
const SpotIconsPage = React.lazy(() => import("./pages/component-library/SpotIcons"));
const SwitchesPage = React.lazy(() => import("./pages/component-library/Switches"));
const TablePage = React.lazy(() => import("./pages/component-library/Table"));
const TabsPage = React.lazy(() => import("./pages/component-library/Tabs"));
const TagsPage = React.lazy(() => import("./pages/component-library/Tags"));
const TextAreaPage = React.lazy(() => import("./pages/component-library/TextArea"));
const TextFieldsPage = React.lazy(() => import("./pages/component-library/TextFields"));
const ThemesPage = React.lazy(() => import("./pages/component-library/Themes"));
const TogglePage = React.lazy(() => import("./pages/component-library/Toggle"));
const OrderCardPatternsPage = React.lazy(() => import("./pages/component-library/OrderCardPatterns"));
const BasicBannerPage = React.lazy(() => import("./pages/component-library/BasicBanner"));
const WCPCountryComponentsPage = React.lazy(() => import("./pages/component-library/WCPCountryComponents"));
const DesignTokensPage = React.lazy(() => import("./pages/component-library/DesignTokens"));
const WCPFlagPage = React.lazy(() => import("./pages/component-library/WCPFlag"));
const ThemeEditorPage = React.lazy(() => import("./pages/component-library/ThemeEditorPage"));
const FooterPatternsPage = React.lazy(() => import("./pages/component-library/FooterPatterns"));
const TopNavPage = React.lazy(() => import("./pages/component-library/TopNav"));
const SideNavPage = React.lazy(() => import("./pages/component-library/SideNav"));
const PageTemplatesPage = React.lazy(() => import("./pages/component-library/PageTemplates"));
const SearchResultsPatternPage = React.lazy(() => import("./pages/component-library/SearchResults"));
const WCPButtonGroupsPage = React.lazy(() => import("./pages/component-library/WCPButtonGroups"));
const ItemTilePage = React.lazy(() => import("./pages/component-library/ItemTile"));
const HomePageWidgetsPage = React.lazy(() => import("./pages/component-library/HomePageWidgets"));
const PromoBannersPage = React.lazy(() => import("./pages/component-library/PromoBanners"));
const DropdownsPage = React.lazy(() => import("./pages/component-library/Dropdowns"));
const WCPSearchAndUtilityPage = React.lazy(() => import("./pages/component-library/WCPSearchAndUtility"));
const WCPFloatingButtonPage = React.lazy(() => import("./pages/component-library/WCPFloatingButton"));
const WCPHeartViewPage = React.lazy(() => import("./pages/component-library/WCPHeartView"));
const WCPRatingPage = React.lazy(() => import("./pages/component-library/WCPRating"));
const WCPSearchBarPage = React.lazy(() => import("./pages/component-library/WCPSearchBar"));
const WCPSignatureCapturePage = React.lazy(() => import("./pages/component-library/WCPSignatureCapture"));
const WCPRichMediaSheetPage = React.lazy(() => import("./pages/component-library/WCPRichMediaSheet"));
const WCPRichSnackbarPage = React.lazy(() => import("./pages/component-library/WCPRichSnackbar"));
const WCPTimerViewPage = React.lazy(() => import("./pages/component-library/WCPTimerView"));
const WCPQueuePage = React.lazy(() => import("./pages/component-library/WCPQueue"));
const WCPUploadImagePage = React.lazy(() => import("./pages/component-library/WCPUploadImage"));
const CarouselsAndGridsPage = React.lazy(() => import("./pages/component-library/CarouselsAndGrids"));
const OrderStatusCardsPage = React.lazy(() => import("./pages/component-library/OrderStatusCards"));
const ReplenishmentBasketPage = React.lazy(() => import("./pages/component-library/ReplenishmentBasket"));
const ProjectSettingsPage = React.lazy(() => import("./pages/component-library/ProjectSettings"));
const FoundationsPage = React.lazy(() => import("./pages/component-library/Foundations"));
const AssetsPage = React.lazy(() => import("./pages/component-library/Assets"));
const LazyFallback = null;

const queryClient = new QueryClient();

// Persist last visited path across full HMR reloads (dev only)
const LAST_PATH_KEY = '__last_visited_path__';
if (typeof window !== 'undefined' && import.meta.env.DEV) {
  try {
    const last = sessionStorage.getItem(LAST_PATH_KEY);
    const current = window.location.pathname + window.location.search + window.location.hash;
    // If the page looks like the dev-server root, restore previous path.
    if (last && (current === '/' || current === '/index.html' || current === '/walmart')) {
      window.history.replaceState(null, '', last);
      sessionStorage.removeItem(LAST_PATH_KEY);
    }
  } catch (e) {
    // ignore sessionStorage errors
  }

  // Save on full unloads
  window.addEventListener('beforeunload', () => {
    try {
      sessionStorage.setItem(LAST_PATH_KEY, window.location.pathname + window.location.search + window.location.hash);
    } catch (e) {}
  });
}

function RouteWatcher() {
  const location = useLocation();
  useEffect(() => {
    try {
      sessionStorage.setItem(LAST_PATH_KEY, location.pathname + location.search + location.hash);
    } catch (e) {}
  }, [location]);
  return null;
}

// Main App component with routing
const App = () => (
  <ThemeProvider>
      <LayoutSettingsProvider>
        <AuthProvider>
        <CartProvider>
        <QueryClientProvider client={queryClient}>
      <SnackbarContainer />
      <WCPRichSnackbarContainer />
      <MartyProvider>
          <BrowserRouter
            basename={import.meta.env.BASE_URL.replace(/\/$/, "") || undefined}
          >
            <React.Suspense fallback={LazyFallback}>
            {import.meta.env.DEV && <RouteWatcher />}
            <Routes>
              {/* Component Library with nested routes */}
              <Route path="/component-library" element={<ComponentLibraryLayout />}>
                <Route index element={<ComponentLibraryOverview />} />
                <Route path="themes" element={<ThemesPage />} />
                <Route path="design-tokens" element={<DesignTokensPage />} />
                <Route path="foundations" element={<FoundationsPage />} />
                <Route path="assets" element={<AssetsPage />} />
                <Route path="component-tester" element={<ComponentTester />} />
                <Route path="icons" element={<IconsPage />} />
                <Route path="buttons" element={<ButtonsPage />} />
                <Route path="badges" element={<BadgesPage />} />
                <Route path="breadcrumbs" element={<BreadcrumbsPage />} />
                <Route path="links" element={<LinksPage />} />
                <Route path="link-buttons" element={<LinkButtonsPage />} />
                <Route path="icon-buttons" element={<IconButtonsPage />} />
                <Route path="checkboxes" element={<CheckboxesPage />} />
                <Route path="radio-buttons" element={<RadioButtonsPage />} />
                <Route path="select" element={<SelectPage />} />
                <Route path="form-groups" element={<FormGroupsPage />} />
                <Route path="chips" element={<ChipsPage />} />
                <Route path="filter-chips" element={<FilterChipsPage />} />
                <Route path="callouts" element={<CalloutsPage />} />
                <Route path="cards" element={<CardsPage />} />
                <Route path="alerts" element={<AlertsPage />} />
                <Route path="content-messages" element={<ContentMessagesPage />} />
                <Route path="date-fields" element={<DateFieldsPage />} />
                <Route path="date-pickers" element={<DatePickersPage />} />
                <Route path="date-range-picker" element={<DateRangePickerPage />} />
                <Route path="dividers" element={<DividersPage />} />
                <Route path="lists" element={<ListsPage />} />
                <Route path="magic-box" element={<MagicBoxPage />} />
                <Route path="menu" element={<MenuPage />} />
                <Route path="metrics" element={<MetricsPage />} />
                <Route path="modals" element={<ModalsPage />} />
                <Route path="nudges" element={<NudgesPage />} />
                <Route path="panels" element={<PanelsPage />} />
                <Route path="text-fields" element={<TextFieldsPage />} />
                <Route path="textarea" element={<TextAreaPage />} />
                <Route path="guidelines" element={<GuidelinesPage />} />
                <Route path="doc-index" element={<DocIndexPage />} />
                <Route path="getting-started" element={<GettingStartedPage />} />
                {/* Shadcn/Radix Components */}
                <Route path="accordion" element={<AccordionPage />} />
                <Route path="alert-dialog" element={<AlertDialogPage />} />
                <Route path="avatar" element={<AvatarPage />} />
                <Route path="bottom-sheet" element={<BottomSheetPage />} />
                <Route path="calendar" element={<CalendarPage />} />
                <Route path="carousel" element={<CarouselPage />} />
                <Route path="chart" element={<ChartPage />} />
                <Route path="collapsible" element={<CollapsiblePage />} />
                <Route path="command" element={<CommandPage />} />
                <Route path="context-menu" element={<ContextMenuPage />} />
                <Route path="dialog" element={<DialogPage />} />
                <Route path="drawer" element={<DrawerPage />} />
                <Route path="dropdown-menu" element={<DropdownMenuPage />} />
                <Route path="form" element={<FormPage />} />
                <Route path="menubar" element={<MenubarPage />} />
                <Route path="navigation-menu" element={<NavigationMenuPage />} />
                <Route path="pagination" element={<PaginationPage />} />
                <Route path="popover" element={<PopoverPage />} />
                <Route path="progress-indicator" element={<ProgressIndicatorPage />} />
                <Route path="progress-tracker" element={<ProgressTrackerPage />} />
                <Route path="scroll-area" element={<ScrollAreaPage />} />
                <Route path="skeleton" element={<SkeletonPage />} />
                <Route path="slider" element={<SliderPage />} />
                <Route path="snackbars" element={<SnackbarsPage />} />
                <Route path="spinners" element={<SpinnersPage />} />
                <Route path="spot-icons" element={<SpotIconsPage />} />
                <Route path="segmented-control" element={<SegmentedControlsPage />} />
                <Route path="quantity-stepper" element={<QuantityStepperPage />} />
                <Route path="switches" element={<SwitchesPage />} />
                <Route path="table" element={<TablePage />} />
                <Route path="tabs" element={<TabsPage />} />
                <Route path="tags" element={<TagsPage />} />
                <Route path="toggle" element={<TogglePage />} />
                <Route path="order-card-patterns" element={<OrderCardPatternsPage />} />
                <Route path="basic-banner" element={<BasicBannerPage />} />
                <Route path="wcp-country" element={<WCPCountryComponentsPage />} />
                <Route path="wcp-flag" element={<WCPFlagPage />} />
                <Route path="theme-editor" element={<ThemeEditorPage />} />
                <Route path="project-settings" element={<ProjectSettingsPage />} />
                <Route path="footer-patterns" element={<FooterPatternsPage />} />
                <Route path="top-nav" element={<TopNavPage />} />
                <Route path="side-nav" element={<SideNavPage />} />
                <Route path="page-templates" element={<PageTemplatesPage />} />
                <Route path="search-results" element={<SearchResultsPatternPage />} />
                <Route path="item-tile" element={<ItemTilePage />} />
                <Route path="product-cards" element={<Navigate to="/component-library/item-tile" replace />} />
                <Route path="home-page-widgets" element={<HomePageWidgetsPage />} />
                <Route path="promo-banners" element={<PromoBannersPage />} />
                <Route path="dropdowns" element={<DropdownsPage />} />
                <Route path="search-utility" element={<WCPSearchAndUtilityPage />} />
                <Route path="wcp-button-groups" element={<WCPButtonGroupsPage />} />
                <Route path="wcp-floating-button" element={<WCPFloatingButtonPage />} />
                <Route path="wcp-heart-view" element={<WCPHeartViewPage />} />
                <Route path="wcp-rating" element={<WCPRatingPage />} />
                <Route path="wcp-search-bar" element={<WCPSearchBarPage />} />
                <Route path="wcp-signature-capture" element={<WCPSignatureCapturePage />} />
                <Route path="wcp-rich-media-sheet" element={<WCPRichMediaSheetPage />} />
                <Route path="wcp-rich-snackbar" element={<WCPRichSnackbarPage />} />
                <Route path="wcp-timer-view" element={<WCPTimerViewPage />} />
                <Route path="wcp-queue-banner" element={<Navigate to="/component-library/wcp-queue" replace />} />
                <Route path="wcp-queue-card" element={<Navigate to="/component-library/wcp-queue" replace />} />
                <Route path="wcp-queue" element={<WCPQueuePage />} />
                <Route path="wcp-upload-image" element={<WCPUploadImagePage />} />
                <Route path="carousels-grids" element={<CarouselsAndGridsPage />} />
                <Route path="order-status-cards" element={<OrderStatusCardsPage />} />
                <Route path="replenishment-basket" element={<ReplenishmentBasketPage />} />
              </Route>

              {/* Walmart pages — share one WalmartScenarioProvider so context state (basket, overrides, LOC expand) survives navigation */}
              <Route element={<WalmartLayout />}>
                <Route path="/walmart" element={<WalmartIndex />} />
                <Route path="/walmart/loading" element={<WalmartLoadingScreen />} />
                <Route path="/walmart/search" element={<WalmartSearchResults />} />
                <Route path="/walmart/search/dresses" element={<WalmartDressesSearch />} />
                <Route path="/walmart/search/cereal" element={<WalmartCerealSearch />} />
                <Route path="/walmart/search/coffee" element={<WalmartCoffeeSearch />} />
                <Route path="/walmart/product/:productId" element={<WalmartProductDetail />} />
                <Route path="/walmart/purchase-history" element={<WalmartPurchaseHistory />} />
                <Route path="/walmart/replenish-onboarding" element={<WalmartReplenishOnboarding />} />
                <Route path="/walmart/signin" element={<WalmartSignIn />} />
                <Route path="/walmart/edit-order" element={<WalmartEditOrder />} />
                <Route path="/walmart/add-more-items" element={<WalmartAddMoreItems />} />
                {/* Dev root also uses the Walmart layout so the onboarding sheet renders */}
                {import.meta.env.DEV && <Route path="/" element={<WalmartIndex />} />}
              </Route>

              {/* Redirect home to Walmart, but only in production to avoid HMR reload issues jumping back to home */}
              {import.meta.env.PROD && <Route path="/" element={<Navigate to="/walmart" replace />} />}

              <Route path="/preview-qr" element={<PreviewQR />} />

              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            </React.Suspense>
          </BrowserRouter>
        </MartyProvider>
    </QueryClientProvider>
        </CartProvider>
        </AuthProvider>
      </LayoutSettingsProvider>
  </ThemeProvider>
);

const rootElement = document.getElementById("root")!;

// Store the root on the DOM element to persist across HMR
if (!(rootElement as any)._reactRoot) {
  (rootElement as any)._reactRoot = createRoot(rootElement);
}

(rootElement as any)._reactRoot.render(<App />);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).catch(() => {});
  });
}
