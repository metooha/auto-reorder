import React from 'react';
import styles from './SideNavigation.module.css';

/**
 * Props for SideNavigation container component
 */
export interface SideNavigationProps extends Omit<React.ComponentPropsWithoutRef<'nav'>, 'className' | 'style'> {
  /**
   * The navigation items (should be SideNavigationItem components)
   */
  children: React.ReactNode;

  /**
   * ARIA label for the navigation
   */
  'aria-label'?: string;

  /**
   * Whether to render a border around the list.
   * Useful when used inside popovers or dropdowns.
   * @default false
   */
  bordered?: boolean;
}

/**
 * Props for SideNavigationItem component.
 *
 * When `href` is provided the item renders as an `<a>` (link mode).
 * When `href` is omitted the item renders as a `<button>` (button mode,
 * equivalent to the former NavListItem).
 */
export interface SideNavigationItemProps {
  /**
   * The content/label for the navigation item
   */
  children: React.ReactNode;

  /**
   * The URL to navigate to. When omitted, the item renders as a `<button>`.
   */
  href?: string;

  /**
   * Whether this item represents the current page / selected option.
   * Adds `aria-current="page"` for link mode, `aria-current="true"` for button mode.
   * @default false
   */
  isCurrent?: boolean;

  /**
   * Alias for `isCurrent` — preferred when used in button / filter contexts
   * (matches the former NavListItem API).
   * @default false
   */
  selected?: boolean;

  /**
   * Leading content (typically an icon)
   */
  leading?: React.ReactNode;

  /**
   * Click handler
   */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;

  /**
   * Link target (e.g., "_blank" for external links). Only used in link mode.
   */
  target?: string;

  /**
   * Relationship to the linked resource. Only used in link mode.
   */
  rel?: string;

  /**
   * Whether the item is disabled. Only used in button mode.
   * @default false
   */
  disabled?: boolean;
}

/**
 * SideNavigation - A vertical page / list navigation component for Living Design 3.5.
 *
 * Supports two modes determined by the items inside it:
 * - **Link mode** (`href` provided on items): primary page nav with `<a>` elements
 * - **Button mode** (`href` omitted on items): selectable list with `<button>` elements
 *   (equivalent to the former NavList component)
 *
 * @example Link mode
 * ```tsx
 * <SideNavigation aria-label="Main navigation">
 *   <SideNavigationItem href="/home" isCurrent>Home</SideNavigationItem>
 *   <SideNavigationItem href="/campaigns">Campaigns</SideNavigationItem>
 * </SideNavigation>
 * ```
 *
 * @example Button mode (former NavList)
 * ```tsx
 * <SideNavigation aria-label="Filters" bordered>
 *   <SideNavigationItem selected={filter === 'all'} onClick={() => setFilter('all')}>All</SideNavigationItem>
 *   <SideNavigationItem selected={filter === 'active'} onClick={() => setFilter('active')}>Active</SideNavigationItem>
 * </SideNavigation>
 * ```
 */
export const SideNavigation = React.forwardRef<HTMLElement, SideNavigationProps>(
  ({ children, 'aria-label': ariaLabel, bordered = false, ...props }, ref) => {
    const listClassName = [
      styles.sideNavigation,
      bordered && styles['sideNavigation--bordered'],
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <nav ref={ref} aria-label={ariaLabel} {...props}>
        <ul className={listClassName}>
          {React.Children.map(children, (child, index) => (
            <li key={index}>{child}</li>
          ))}
        </ul>
      </nav>
    );
  }
);

SideNavigation.displayName = 'SideNavigation';

/**
 * SideNavigationItem - An individual item within a SideNavigation.
 *
 * Renders as `<a>` when `href` is provided (link mode) or as `<button>` when it is not
 * (button / selectable-list mode — equivalent to the former NavListItem).
 */
export const SideNavigationItem = React.forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  SideNavigationItemProps
>(
  (
    {
      children,
      href,
      isCurrent = false,
      selected = false,
      leading,
      onClick,
      target,
      rel,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const isActive = isCurrent || selected;
    const className = [
      styles.sideNavigationItem,
      isActive && styles['sideNavigationItem--current'],
    ]
      .filter(Boolean)
      .join(' ');

    const content = (
      <>
        {leading && (
          <span className={styles.sideNavigationItem__leading}>{leading}</span>
        )}
        <span className={styles.sideNavigationItem__content}>{children}</span>
      </>
    );

    if (href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={className}
          onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
          aria-current={isActive ? 'page' : undefined}
          target={target}
          rel={rel}
          {...(props as React.HTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        className={className}
        onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
        aria-current={isActive ? 'true' : undefined}
        disabled={disabled}
        {...(props as React.HTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    );
  }
);

SideNavigationItem.displayName = 'SideNavigationItem';
