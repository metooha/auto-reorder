import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SearchIcon, CloseIcon, MenuIcon } from "@/components/icons";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumb, BreadcrumbItem } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { Callout } from "@/components/ui/Callout";
import { Checkbox } from "@/components/ui/Checkbox";
import { Chip } from "@/components/ui/Chip";
import { Tag } from "@/components/ui/Tag";
import { Divider } from "@/components/ui/Divider";
import { SideNavigation, SideNavigationItem } from "@/components/ui/SideNavigation";
import { DesktopFooter } from "@/components/DesktopFooter";
import styles from "./ComponentLibrary.module.css";

import { ButtonsSection } from "./component-library/ButtonsSection";
import { FormSection } from "./component-library/FormSection";
import { LayoutSection } from "./component-library/LayoutSection";
import { NavigationSection } from "./component-library/NavigationSection";
import { OverlaySection } from "./component-library/OverlaySection";
import { FeedbackSection } from "./component-library/FeedbackSection";
import { InteractiveSection } from "./component-library/InteractiveSection";
import { CustomSection } from "./component-library/CustomSection";
import { IconBrowserSection } from "./component-library/IconBrowserSection";

/* ─── Navigation Data ─── */

interface NavItem {
  id: string;
  label: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const GETTING_STARTED_ITEMS: NavItem[] = [
  { id: "overview", label: "Overview" },
  { id: "themes", label: "Themes & Tokens" },
  { id: "sandbox", label: "Component Sandbox" },
  { id: "guidelines", label: "Guidelines" },
];

const COMPONENT_ITEMS: NavItem[] = [
  { id: "alerts", label: "Alerts" },
  { id: "badges", label: "Badges" },
  { id: "breadcrumbs", label: "Breadcrumbs" },
  { id: "buttons", label: "Buttons" },
  { id: "callouts", label: "Callouts" },
  { id: "cards", label: "Cards" },
  { id: "checkboxes", label: "Checkboxes" },
  { id: "chips", label: "Chips" },
  { id: "content-messages", label: "Content Messages" },
  { id: "date-fields", label: "Date Fields" },
  { id: "date-picker-calendar", label: "Date Picker Calendar" },
  { id: "date-pickers", label: "Date Pickers" },
  { id: "date-range-picker", label: "Date Range Picker" },
  { id: "dividers", label: "Dividers" },
  { id: "filter-chips", label: "Filter Chips" },
  { id: "form-groups", label: "Form Groups" },
  { id: "icon-buttons", label: "Icon Buttons" },
  { id: "inputs", label: "Inputs" },
  { id: "link-buttons", label: "Link Buttons" },
  { id: "links", label: "Links" },
  { id: "lists", label: "Lists" },
  { id: "metrics", label: "Metrics" },
  { id: "modals", label: "Modals" },
  { id: "panels", label: "Panels" },
  { id: "popovers", label: "Popovers" },
  { id: "radio", label: "Radio Buttons" },
  { id: "segmented-controls", label: "Segmented Controls" },
  { id: "selects", label: "Selects" },
  { id: "snackbars", label: "Snackbars" },
  { id: "spinners", label: "Spinners" },
  { id: "spot-icons", label: "Spot Icons" },
  { id: "switches", label: "Switches" },
  { id: "tabs", label: "Tabs" },
  { id: "tags", label: "Tags" },
  { id: "text-fields", label: "Text Fields" },
  { id: "toggles", label: "Toggles" },
];

const NAV_SECTIONS: NavSection[] = [
  { title: "GETTING STARTED", items: GETTING_STARTED_ITEMS },
  { title: "COMPONENTS", items: COMPONENT_ITEMS },
];

const ALL_NAV_ITEMS = NAV_SECTIONS.flatMap((s) => s.items);

/* ─── Component Card Preview Data ─── */

interface ComponentCardData {
  id: string;
  title: string;
  description: string;
  preview: React.ReactNode;
}

const COMPONENT_CARDS: ComponentCardData[] = [
  {
    id: "alerts",
    title: "Alerts",
    description: "Banner messages for info, success, warning, and error states",
    preview: <Alert variant="info">This is an informational alert.</Alert>,
  },
  {
    id: "badges",
    title: "Badges",
    description: "Count badges, status indicators, and semantic color variants",
    preview: (
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <Badge variant="success" value={5} />
        <Badge variant="info" value={12} />
        <Badge variant="error" value={3} />
      </div>
    ),
  },
  {
    id: "breadcrumbs",
    title: "Breadcrumbs",
    description: "Navigation breadcrumbs with support for 2-5 levels and custom separators",
    preview: (
      <Breadcrumb>
        <BreadcrumbItem href="#">Home</BreadcrumbItem>
        <BreadcrumbItem href="#">Products</BreadcrumbItem>
        <BreadcrumbItem isCurrent>Current</BreadcrumbItem>
      </Breadcrumb>
    ),
  },
  {
    id: "buttons",
    title: "Buttons",
    description: "Primary, secondary, tertiary, and destructive button variants with full accessibility",
    preview: (
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <Button variant="primary" size="medium">Primary</Button>
        <Button variant="secondary" size="medium">Secondary</Button>
      </div>
    ),
  },
  {
    id: "callouts",
    title: "Callouts",
    description: "Contextual tooltips with directional arrows for onboarding",
    preview: (
      <Callout position="bottomCenter" closable={false}>Helpful tip for the user</Callout>
    ),
  },
  {
    id: "cards",
    title: "Cards",
    description: "Card containers with headers, actions, and content areas",
    preview: (
      <div style={{
        border: "1px solid var(--ld-semantic-color-border-moderate, #E6E6E8)",
        borderRadius: 8,
        padding: "16px 20px",
        background: "#fff",
        minWidth: 180,
      }}>
        <div style={{
          fontWeight: 700,
          fontSize: 14,
          marginBottom: 4,
          fontFamily: "var(--ld-semantic-font-family-sans)",
          color: "var(--ld-semantic-color-text-primary, #2E2F32)",
        }}>Card Title</div>
        <div style={{
          fontSize: 13,
          color: "var(--ld-semantic-color-text-secondary, #74767C)",
          fontFamily: "var(--ld-semantic-font-family-sans)",
        }}>Card content area</div>
      </div>
    ),
  },
  {
    id: "checkboxes",
    title: "Checkboxes",
    description: "Single and group checkbox inputs with labels and states",
    preview: (
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <Checkbox label="Option A" checked onCheckedChange={() => {}} />
        <Checkbox label="Option B" onCheckedChange={() => {}} />
      </div>
    ),
  },
  {
    id: "chips",
    title: "Chips",
    description: "Compact elements for filters, selections, and inputs",
    preview: (
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <Chip>Category</Chip>
        <Chip selected>Active</Chip>
      </div>
    ),
  },
  {
    id: "dividers",
    title: "Dividers",
    description: "Horizontal and vertical dividers for content separation",
    preview: (
      <div style={{ width: "100%" }}>
        <Divider />
      </div>
    ),
  },
  {
    id: "tags",
    title: "Tags",
    description: "Status tags and labels with semantic color coding",
    preview: (
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <Tag color="positive">Active</Tag>
        <Tag color="warning">Pending</Tag>
        <Tag color="negative">Error</Tag>
      </div>
    ),
  },
];

/* ─── Main Component ─── */

export default function ComponentLibrary() {
  const [activeSection, setActiveSection] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const mainRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const externalRoutes: Record<string, string> = {
    themes: "/component-library/themes",
    guidelines: "/component-library/guidelines",
    sandbox: "/component-library/component-tester",
  };

  const scrollToSection = (id: string) => {
    if (externalRoutes[id]) {
      navigate(externalRoutes[id]);
      return;
    }

    setActiveSection(id);
    setSidebarOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const filteredCards = searchQuery
    ? COMPONENT_CARDS.filter((c) =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : COMPONENT_CARDS;

  const filteredNav = searchQuery
    ? NAV_SECTIONS.map((s) => ({
        ...s,
        items: s.items.filter((i) =>
          i.label.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      })).filter((s) => s.items.length > 0)
    : NAV_SECTIONS;

  // Determine what to show: overview or detail section
  const showDetailSection = [
    "buttons", "inputs", "checkboxes", "switches", "radio", "selects", "sliders",
    "cards", "accordion", "table", "carousel", "collapsible", "scroll-area",
    "tabs", "breadcrumbs", "pagination",
    "dialog", "alert-dialog", "tooltip", "popover", "dropdown-menu", "drawer",
    "context-menu", "toast", "modal", "bottom-sheet", "callout", "nudge",
    "scrim", "snackbar",
    "alerts", "badges", "avatars", "progress", "skeletons", "rating",
    "metrics", "content-messages", "spot-icons", "chips", "tags",
    "toggle", "toggle-group",
    "add-to-cart", "search-bar", "bottom-nav", "filter-chip", "camera-modal",
    "desktop-nav", "icon-components", "responsive-layout",
    "icons",
    "text-fields", "date-fields", "date-pickers", "date-range-picker",
    "date-picker-calendar", "form-groups", "link-buttons", "icon-buttons",
    "links", "lists", "modals", "panels", "popovers", "segmented-controls",
    "snackbars", "spinners", "filter-chips", "toggles",
  ].includes(activeSection);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div className={styles.layout}>
      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ""}`}>
        <div className={styles.sidebarHeader}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <h1 className={styles.sidebarTitle}>Component Library</h1>
              <p className={styles.sidebarSubtitle}>Living Design 3.5 Components</p>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className={styles.mobileMenuBtn}
              style={{ display: sidebarOpen ? "flex" : "none" }}
            >
              <CloseIcon style={{ width: 18, height: 18 }} />
            </button>
          </div>
        </div>

        <nav className={styles.sidebarNav}>
          {filteredNav.map((section) => (
            <div key={section.title}>
              <div className={styles.sectionLabel}>{section.title}</div>
              <SideNavigation aria-label={`${section.title} navigation`}>
                {section.items.map((item) => (
                  <SideNavigationItem
                    key={item.id}
                    href={`#${item.id}`}
                    isCurrent={activeSection === item.id}
                    onClick={(event) => {
                      event.preventDefault();
                      scrollToSection(item.id);
                    }}
                  >
                    {item.label}
                  </SideNavigationItem>
                ))}
              </SideNavigation>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main ref={mainRef} className={styles.main}>
        {/* Mobile Header */}
        <div className={styles.mobileHeader}>
          <button className={styles.mobileMenuBtn} onClick={() => setSidebarOpen(true)}>
            <MenuIcon style={{ width: 20, height: 20 }} />
          </button>
          <span className={styles.sidebarTitle} style={{ fontSize: 18 }}>Component Library</span>
        </div>

        {showDetailSection ? (
          <div style={{ padding: "24px 48px", maxWidth: 960 }}>
            <button
              onClick={() => setActiveSection("overview")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 14,
                color: "var(--ld-semantic-color-text-brand-bold, #0046BE)",
                fontFamily: "var(--ld-semantic-font-family-sans)",
                marginBottom: 16,
                padding: 0,
              }}
            >
              &larr; Back to Overview
            </button>
            <DetailContent activeSection={activeSection} />
          </div>
        ) : (
          <OverviewContent
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filteredCards={filteredCards}
            onCardClick={scrollToSection}
          />
        )}
      </main>

        {/* Mobile overlay */}
        <div
          className={`${styles.overlay} ${sidebarOpen ? styles.overlayVisible : ""}`}
          onClick={() => setSidebarOpen(false)}
        />
      </div>
      <DesktopFooter />
    </div>
  );
}

/* ─── Overview Content ─── */

function OverviewContent({
  searchQuery,
  onSearchChange,
  filteredCards,
  onCardClick,
}: {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  filteredCards: ComponentCardData[];
  onCardClick: (id: string) => void;
}) {
  return (
    <div className={styles.content}>
      <p className={styles.headerLabel}>GETTING STARTED</p>
      <h1 className={styles.headerTitle}>Living Design 3.5</h1>
      <p className={styles.headerDesc}>
        A comprehensive component library for the Walmart Connect Ad Center.
        Each component follows the Living Design 3.5 specification with proper
        accessibility, semantic tokens, and responsive behavior.
      </p>

      {/* Search */}
      <div className={styles.searchWrapper}>
        <SearchIcon className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search components..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      {/* Component Grid */}
      <p className={styles.gridSectionLabel}>LIVING DESIGN 3.5 COMPONENTS</p>
      <div className={styles.componentGrid}>
        {filteredCards.map((card) => (
          <div
            key={card.id}
            className={styles.componentCard}
            onClick={() => onCardClick(card.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter") onCardClick(card.id); }}
          >
            <div className={styles.cardPreview}>
              {card.preview}
            </div>
            <div className={styles.cardInfo}>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardDesc}>{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Detail Content (renders sections) ─── */

function DetailContent({ activeSection }: { activeSection: string }) {
  // Map sections to their rendering components
  const buttonsGroup = ["buttons", "icon-buttons", "link-buttons"];
  const formGroup = [
    "inputs", "text-fields", "checkboxes", "switches", "radio", "selects",
    "sliders", "date-fields", "date-pickers", "date-range-picker",
    "date-picker-calendar", "form-groups",
  ];
  const layoutGroup = [
    "cards", "accordion", "table", "carousel", "collapsible", "scroll-area",
    "lists", "panels", "dividers",
  ];
  const navGroup = ["tabs", "breadcrumbs", "pagination", "segmented-controls", "links"];
  const overlayGroup = [
    "dialog", "alert-dialog", "tooltip", "popover", "dropdown-menu", "drawer",
    "context-menu", "toast", "modal", "bottom-sheet", "callout", "nudge",
    "scrim", "snackbar", "snackbars", "modals", "popovers",
  ];
  const feedbackGroup = [
    "alerts", "badges", "avatars", "progress", "skeletons", "rating",
    "metrics", "content-messages", "spot-icons", "chips", "tags", "spinners",
    "filter-chips",
  ];
  const interactiveGroup = ["toggle", "toggle-group", "toggles"];
  const customGroup = [
    "add-to-cart", "search-bar", "bottom-nav", "filter-chip", "camera-modal",
    "desktop-nav", "icon-components", "responsive-layout",
  ];
  const iconGroup = ["icons"];

  if (buttonsGroup.includes(activeSection)) return <ButtonsSection />;
  if (formGroup.includes(activeSection)) return <FormSection />;
  if (layoutGroup.includes(activeSection)) return <LayoutSection />;
  if (navGroup.includes(activeSection)) return <NavigationSection />;
  if (overlayGroup.includes(activeSection)) return <OverlaySection />;
  if (feedbackGroup.includes(activeSection)) return <FeedbackSection />;
  if (interactiveGroup.includes(activeSection)) return <InteractiveSection />;
  if (customGroup.includes(activeSection)) return <CustomSection />;
  if (iconGroup.includes(activeSection)) return <IconBrowserSection />;

  return <ButtonsSection />;
}
