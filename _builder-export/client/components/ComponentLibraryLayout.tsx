import React from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { SideNavigation, SideNavigationItem } from '@/components/ui/SideNavigation';
import { DesktopHeader } from './DesktopHeader';
import { DesktopFooter } from './DesktopFooter';
import styles from './ComponentLibraryLayout.module.css';

interface NavItem {
  id: string;
  label: string;
  path: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navigationSections: NavSection[] = [
  {
    title: 'Getting Started',
    items: [
      { id: 'overview', label: 'Overview', path: '/component-library' },
      { id: 'getting-started', label: 'Getting Started', path: '/component-library/getting-started' },
      { id: 'themes', label: 'Themes & Tokens', path: '/component-library/themes' },
      { id: 'design-tokens', label: 'Design Tokens', path: '/component-library/design-tokens' },
      { id: 'component-tester', label: 'Component Sandbox', path: '/component-library/component-tester' },
      { id: 'guidelines', label: 'Guidelines', path: '/component-library/guidelines' },
    ]
  },
  {
    title: 'Components',
    items: [
      { id: 'icons', label: 'Icons', path: '/component-library/icons' },
      { id: 'accordion', label: 'Accordion', path: '/component-library/accordion' },
      { id: 'alerts', label: 'Alerts', path: '/component-library/alerts' },
      { id: 'badges', label: 'Badges', path: '/component-library/badges' },
      { id: 'bottom-sheet', label: 'Bottom Sheet', path: '/component-library/bottom-sheet' },
      { id: 'breadcrumbs', label: 'Breadcrumbs', path: '/component-library/breadcrumbs' },
      { id: 'buttons', label: 'Buttons', path: '/component-library/buttons' },
      { id: 'callouts', label: 'Callouts', path: '/component-library/callouts' },
      { id: 'cards', label: 'Cards', path: '/component-library/cards' },
      { id: 'checkboxes', label: 'Checkboxes', path: '/component-library/checkboxes' },
      { id: 'chips', label: 'Chips', path: '/component-library/chips' },
      { id: 'content-messages', label: 'Content Messages', path: '/component-library/content-messages' },
      { id: 'data-table', label: 'Data Table', path: '/component-library/table' },
      { id: 'date-fields', label: 'Date Fields', path: '/component-library/date-fields' },
      { id: 'date-picker-calendar', label: 'Date Picker Calendar', path: '/component-library/calendar' },
      { id: 'date-pickers', label: 'Date Pickers', path: '/component-library/date-pickers' },
      { id: 'date-range-picker', label: 'Date Range Picker', path: '/component-library/date-range-picker' },
      { id: 'dialog', label: 'Dialog', path: '/component-library/dialog' },
      { id: 'dividers', label: 'Dividers', path: '/component-library/dividers' },
      { id: 'filter-chips', label: 'Filter Chips', path: '/component-library/filter-chips' },
      { id: 'form-groups', label: 'Form Groups', path: '/component-library/form-groups' },
      { id: 'icon-buttons', label: 'Icon Buttons', path: '/component-library/icon-buttons' },
      { id: 'link-buttons', label: 'Link Buttons', path: '/component-library/link-buttons' },
      { id: 'links', label: 'Links', path: '/component-library/links' },
      { id: 'lists', label: 'Lists', path: '/component-library/lists' },
      { id: 'magic-box', label: 'Magic Box', path: '/component-library/magic-box' },
      { id: 'menu', label: 'Menu', path: '/component-library/menu' },
      { id: 'metrics', label: 'Metrics', path: '/component-library/metrics' },
      { id: 'modals', label: 'Modals', path: '/component-library/modals' },
      { id: 'nudges', label: 'Nudges', path: '/component-library/nudges' },
      { id: 'panels', label: 'Panels', path: '/component-library/panels' },
      { id: 'popover', label: 'Popover', path: '/component-library/popover' },
      { id: 'progress-indicator', label: 'Progress Indicator', path: '/component-library/progress-indicator' },
      { id: 'progress-tracker', label: 'Progress Tracker', path: '/component-library/progress-tracker' },
      { id: 'radio-buttons', label: 'Radio Buttons', path: '/component-library/radio-buttons' },
      { id: 'select', label: 'Select', path: '/component-library/select' },
      { id: 'skeleton', label: 'Skeleton', path: '/component-library/skeleton' },
      { id: 'snackbars', label: 'Snackbars', path: '/component-library/snackbars' },
      { id: 'spinners', label: 'Spinners', path: '/component-library/spinners' },
      { id: 'spot-icons', label: 'Spot Icons', path: '/component-library/spot-icons' },
      { id: 'segmented-control', label: 'Segmented Control', path: '/component-library/segmented-control' },
      { id: 'quantity-stepper', label: 'Quantity Stepper', path: '/component-library/quantity-stepper' },
      { id: 'switches', label: 'Switches', path: '/component-library/switches' },
      { id: 'tab-navigation', label: 'Tab Navigation', path: '/component-library/tabs' },
      { id: 'tags', label: 'Tags', path: '/component-library/tags' },
      { id: 'textarea', label: 'Textarea', path: '/component-library/textarea' },
      { id: 'text-fields', label: 'Text Fields', path: '/component-library/text-fields' },
    ]
  },
  {
    title: 'Shared Section',
    items: [
      { id: 'alert-dialog', label: 'Alert Dialog', path: '/component-library/alert-dialog' },
      { id: 'avatar', label: 'Avatar', path: '/component-library/avatar' },
      { id: 'carousel', label: 'Carousel', path: '/component-library/carousel' },
      { id: 'chart', label: 'Chart', path: '/component-library/chart' },
      { id: 'collapsible', label: 'Collapsible', path: '/component-library/collapsible' },
      { id: 'command', label: 'Command', path: '/component-library/command' },
      { id: 'context-menu', label: 'Context Menu', path: '/component-library/context-menu' },
      { id: 'dropdown-menu', label: 'Dropdown Menu', path: '/component-library/dropdown-menu' },
      { id: 'form', label: 'Form', path: '/component-library/form' },
      { id: 'menubar', label: 'Menubar', path: '/component-library/menubar' },
      { id: 'navigation-menu', label: 'Navigation Menu', path: '/component-library/navigation-menu' },
      { id: 'pagination', label: 'Pagination', path: '/component-library/pagination' },
      { id: 'scroll-area', label: 'Scroll Area', path: '/component-library/scroll-area' },
      { id: 'slider', label: 'Slider', path: '/component-library/slider' },
      { id: 'toggle', label: 'Toggle', path: '/component-library/toggle' },
    ]
  }
];

export function ComponentLibraryLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <div className={styles.shell}>
      <DesktopHeader />

      <div className={styles.body}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarInner}>
            <h1 className={styles.sidebarTitle}>Component Library</h1>
            <p className={styles.sidebarSubtitle}>Explore our design system components</p>

            {navigationSections.map((section) => (
              <div key={section.title} className={styles.section}>
                <p className={styles.sectionTitle}>{section.title}</p>
                <SideNavigation aria-label={`${section.title} Navigation`}>
                  {section.items.map((item) => (
                    <SideNavigationItem
                      key={item.id}
                      href={item.path}
                      isCurrent={location.pathname === item.path}
                      onClick={(e) => handleNavClick(e, item.path)}
                    >
                      {item.label}
                    </SideNavigationItem>
                  ))}
                </SideNavigation>
              </div>
            ))}

            {/* Back to Home */}
            <div className={styles.sidebarFooter}>
              <SideNavigation aria-label="Main Navigation">
                <SideNavigationItem href="/" onClick={(e) => handleNavClick(e, '/')}>
                  ← Back to Home
                </SideNavigationItem>
              </SideNavigation>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>

      <DesktopFooter />
    </div>
  );
}
