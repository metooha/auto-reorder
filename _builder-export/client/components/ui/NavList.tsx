import React from 'react';
import styles from './NavList.module.css';

/**
 * Props for NavList container component
 */
export interface NavListProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> {
  /**
   * The navigation items (should be NavListItem components)
   */
  children: React.ReactNode;
  
  /**
   * Whether to show a border around the list
   * @default false
   */
  bordered?: boolean;
  
  /**
   * ARIA label for the navigation list
   */
  'aria-label'?: string;
}

/**
 * Props for NavListItem component
 */
export interface NavListItemProps extends Omit<React.ComponentPropsWithoutRef<'button'>, 'className' | 'style'> {
  /**
   * The content/label for the navigation item
   */
  children: React.ReactNode;
  
  /**
   * Whether this item is currently selected/active
   * @default false
   */
  selected?: boolean;
  
  /**
   * Leading content (typically an icon)
   */
  leading?: React.ReactNode;
  
  /**
   * Click handler for the item
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  
  /**
   * Whether the item is disabled
   * @default false
   */
  disabled?: boolean;
}

/**
 * NavList - A vertical navigation list component for Living Design 3.5
 * 
 * Used in filter dropdowns, side panels, and other contexts requiring
 * a vertical list of selectable options with proper interactive states.
 */
export const NavList = React.forwardRef<HTMLDivElement, NavListProps>(
  ({ children, bordered = false, 'aria-label': ariaLabel, ...props }, ref) => {
    const className = [
      styles.navList,
      bordered && styles['navList--bordered'],
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        className={className}
        role="list"
        aria-label={ariaLabel}
        {...props}
      >
        {children}
      </div>
    );
  }
);

NavList.displayName = 'NavList';

/**
 * NavListItem - An individual item within a NavList
 * 
 * Renders as a button element with proper interactive states (hover, focus, pressed, selected).
 * Use the `selected` prop to indicate the currently active item.
 */
export const NavListItem = React.forwardRef<HTMLButtonElement, NavListItemProps>(
  ({ children, selected = false, leading, onClick, disabled = false, ...props }, ref) => {
    const className = [
      styles.navListItem,
      selected && styles['navListItem--selected'],
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        type="button"
        className={className}
        onClick={onClick}
        disabled={disabled}
        aria-current={selected ? 'true' : undefined}
        role="listitem"
        {...props}
      >
        {leading && (
          <span className={styles.navListItem__leading}>
            {leading}
          </span>
        )}
        <span className={styles.navListItem__content}>
          {children}
        </span>
      </button>
    );
  }
);

NavListItem.displayName = 'NavListItem';
