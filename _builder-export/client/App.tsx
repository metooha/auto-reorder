import "./global.css";
import "./i18n";

import { createRoot } from "react-dom/client";
import { SnackbarContainer } from "@/components/ui/SnackbarContainer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ResponsiveLayout } from "./components/ResponsiveLayout";
import { useEffect, lazy, Suspense, Component, type ReactNode } from "react";

class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(error: Error) { return { error }; }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 32, fontFamily: 'monospace' }}>
          <h1 style={{ color: 'red' }}>Runtime Error</h1>
          <pre style={{ whiteSpace: 'pre-wrap', background: '#fee', padding: 16, borderRadius: 8 }}>
            {this.state.error.message}
          </pre>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: 12, color: '#666' }}>
            {this.state.error.stack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

import Index from "./pages/Index";
import SearchResults from "./pages/SearchResults";
import DressesSearchResults from "./pages/DressesSearchResults";
import CerealSearchResults from "./pages/CerealSearchResults";
import LoadingScreen from "./pages/LoadingScreen";
import PharmacyDelivery from "./pages/PharmacyDelivery";
import ProductDetail from "./pages/ProductDetail";
import PurchaseHistory from "./pages/PurchaseHistory";
const ComponentLibrary = lazy(() => import("./pages/ComponentLibrary"));
const ComponentLibraryLayout = lazy(() => import("./components/ComponentLibraryLayout").then(m => ({ default: m.ComponentLibraryLayout })));

// Component Library individual pages (lazy-loaded)
const CLAlerts = lazy(() => import("./pages/component-library/Alerts"));
const CLBadges = lazy(() => import("./pages/component-library/Badges"));
const CLBreadcrumbs = lazy(() => import("./pages/component-library/Breadcrumbs"));
const CLButtons = lazy(() => import("./pages/component-library/Buttons"));
const CLCallouts = lazy(() => import("./pages/component-library/Callouts"));
const CLCards = lazy(() => import("./pages/component-library/Cards"));
const CLCheckboxes = lazy(() => import("./pages/component-library/Checkboxes"));
const CLChips = lazy(() => import("./pages/component-library/Chips"));
const CLContentMessages = lazy(() => import("./pages/component-library/ContentMessages"));
const CLDateFields = lazy(() => import("./pages/component-library/DateFields"));
const CLDatePickers = lazy(() => import("./pages/component-library/DatePickers"));
const CLDividers = lazy(() => import("./pages/component-library/Dividers"));
const CLFilterChips = lazy(() => import("./pages/component-library/FilterChips"));
const CLFormGroups = lazy(() => import("./pages/component-library/FormGroups"));
const CLGettingStarted = lazy(() => import("./pages/component-library/GettingStarted"));
const CLGuidelines = lazy(() => import("./pages/component-library/Guidelines"));
const CLIconButtons = lazy(() => import("./pages/component-library/IconButtons"));
const CLIcons = lazy(() => import("./pages/component-library/Icons"));
const CLLinkButtons = lazy(() => import("./pages/component-library/LinkButtons"));
const CLLinks = lazy(() => import("./pages/component-library/Links"));
const CLLists = lazy(() => import("./pages/component-library/Lists"));
const CLMetrics = lazy(() => import("./pages/component-library/Metrics"));
const CLModals = lazy(() => import("./pages/component-library/Modals"));
const CLNudges = lazy(() => import("./pages/component-library/Nudges"));
const CLPanels = lazy(() => import("./pages/component-library/Panels"));
const CLPopovers = lazy(() => import("./pages/component-library/Popovers"));
const CLQuantityStepper = lazy(() => import("./pages/component-library/QuantityStepperPage"));
const CLRadioButtons = lazy(() => import("./pages/component-library/RadioButtons"));
const CLSegmentedControls = lazy(() => import("./pages/component-library/SegmentedControls"));
const CLSnackbars = lazy(() => import("./pages/component-library/Snackbars"));
const CLSpinners = lazy(() => import("./pages/component-library/Spinners"));
const CLSpotIcons = lazy(() => import("./pages/component-library/SpotIcons"));
const CLSwitches = lazy(() => import("./pages/component-library/Switches"));
const CLTags = lazy(() => import("./pages/component-library/Tags"));
const CLTextFields = lazy(() => import("./pages/component-library/TextFields"));
const CLThemes = lazy(() => import("./pages/component-library/Themes"));
const CLDesignTokens = lazy(() => import("./pages/component-library/DesignTokens"));

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function KeyboardShortcuts() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+0 or Ctrl+0 to open component library
      if ((e.metaKey || e.ctrlKey) && e.key === "0") {
        e.preventDefault();
        navigate("/components");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  return null;
}

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>
        <SnackbarContainer />
        <KeyboardShortcuts />
        <Routes>
          <Route path="/" element={<ResponsiveLayout showOrderStatusBanner={true}><Index /></ResponsiveLayout>} />
          <Route path="/loading" element={<ResponsiveLayout showMobileNav={false}><LoadingScreen /></ResponsiveLayout>} />
          <Route path="/search" element={<ResponsiveLayout><SearchResults /></ResponsiveLayout>} />
          <Route path="/search/dresses" element={<ResponsiveLayout><DressesSearchResults /></ResponsiveLayout>} />
          <Route path="/search/cereal" element={<ResponsiveLayout><CerealSearchResults /></ResponsiveLayout>} />
          <Route path="/product/:productId" element={<ResponsiveLayout><ProductDetail /></ResponsiveLayout>} />
          <Route path="/pharmacy-delivery" element={<ResponsiveLayout><PharmacyDelivery /></ResponsiveLayout>} />
          <Route path="/purchase-history" element={<ResponsiveLayout><PurchaseHistory /></ResponsiveLayout>} />
          <Route path="/components" element={<Suspense fallback={<div>Loading...</div>}><ComponentLibrary /></Suspense>} />

          {/* Component Library — individual pages with sidebar layout */}
          <Route path="/component-library" element={<Suspense fallback={<div>Loading...</div>}><ComponentLibraryLayout /></Suspense>}>
            <Route index element={<CLGettingStarted />} />
            <Route path="getting-started" element={<CLGettingStarted />} />
            <Route path="themes" element={<CLThemes />} />
            <Route path="design-tokens" element={<CLDesignTokens />} />
            <Route path="guidelines" element={<CLGuidelines />} />
            <Route path="icons" element={<CLIcons />} />
            <Route path="alerts" element={<CLAlerts />} />
            <Route path="badges" element={<CLBadges />} />
            <Route path="breadcrumbs" element={<CLBreadcrumbs />} />
            <Route path="buttons" element={<CLButtons />} />
            <Route path="callouts" element={<CLCallouts />} />
            <Route path="cards" element={<CLCards />} />
            <Route path="checkboxes" element={<CLCheckboxes />} />
            <Route path="chips" element={<CLChips />} />
            <Route path="content-messages" element={<CLContentMessages />} />
            <Route path="date-fields" element={<CLDateFields />} />
            <Route path="date-pickers" element={<CLDatePickers />} />
            <Route path="dividers" element={<CLDividers />} />
            <Route path="filter-chips" element={<CLFilterChips />} />
            <Route path="form-groups" element={<CLFormGroups />} />
            <Route path="icon-buttons" element={<CLIconButtons />} />
            <Route path="link-buttons" element={<CLLinkButtons />} />
            <Route path="links" element={<CLLinks />} />
            <Route path="lists" element={<CLLists />} />
            <Route path="metrics" element={<CLMetrics />} />
            <Route path="modals" element={<CLModals />} />
            <Route path="nudges" element={<CLNudges />} />
            <Route path="panels" element={<CLPanels />} />
            <Route path="popover" element={<CLPopovers />} />
            <Route path="quantity-stepper" element={<CLQuantityStepper />} />
            <Route path="radio-buttons" element={<CLRadioButtons />} />
            <Route path="segmented-control" element={<CLSegmentedControls />} />
            <Route path="snackbars" element={<CLSnackbars />} />
            <Route path="spinners" element={<CLSpinners />} />
            <Route path="spot-icons" element={<CLSpotIcons />} />
            <Route path="switches" element={<CLSwitches />} />
            <Route path="tags" element={<CLTags />} />
            <Route path="text-fields" element={<CLTextFields />} />
            <Route path="tabs" element={<CLTextFields />} />
          </Route>

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<ResponsiveLayout showMobileNav={false}><NotFound /></ResponsiveLayout>} />
        </Routes>
      </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

let root = (rootElement as any)._reactRoot;
if (!root) {
  root = createRoot(rootElement);
  (rootElement as any)._reactRoot = root;
}
root.render(<App />);
