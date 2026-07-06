import * as React from 'react';
import styles from './List.module.css';

export interface ListProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  UNSAFE_className?: string;
  'aria-label'?: string;
}

export const List: React.FC<ListProps> = ({
  children,
  className,
  style,
  UNSAFE_className,
  'aria-label': ariaLabel,
}) => {
  const classNames = [styles.list, UNSAFE_className, className].filter(Boolean).join(' ');
  return <ul className={classNames} style={style} aria-label={ariaLabel}>{children}</ul>;
};

export interface ListItemProps {
  children?: React.ReactNode;
  title?: React.ReactNode;
  text?: React.ReactNode;
  leading?: React.ReactNode;
  leadingIcon?: React.ReactNode;
  spotIcon?: React.ReactNode;
  leadingContent?: React.ReactNode;
  leadingVariant?: 'icon' | 'spotIcon' | 'custom';
  trailing?: React.ReactNode;
  trailingVariant?: 'icon' | 'link' | 'custom';
  trailingLink?: { text: string; href: string };
  /** Custom trailing content (alternative to trailing + trailingVariant) */
  trailingContent?: React.ReactNode;
  /** Whether to show the title (defaults to true) */
  showTitle?: boolean;
  className?: string;
  onClick?: () => void;
}

export const ListItem: React.FC<ListItemProps> = ({
  children,
  title,
  text,
  leading,
  leadingIcon,
  spotIcon,
  leadingContent,
  leadingVariant = 'icon',
  trailing,
  trailingVariant = 'icon',
  trailingLink,
  trailingContent,
  showTitle = true,
  className,
  onClick,
}) => {
  const resolvedLeading = leading || leadingIcon || spotIcon || leadingContent;
  const classNames = [styles.listItem, className].filter(Boolean).join(' ');

  const leadingClass =
    leadingVariant === 'spotIcon' ? styles.listItemSpotIcon :
    leadingVariant === 'custom' ? styles.listItemLeadingCustom :
    styles.listItemLeading;

  const leadingInnerClass =
    leadingVariant === 'spotIcon' ? styles.listItemSpotIconInner :
    styles.listItemLeadingIcon;

  const trailingClass =
    trailingVariant === 'link' ? styles.listItemTrailingLink :
    trailingVariant === 'custom' ? styles.listItemTrailingCustom :
    styles.listItemTrailingIcon;

  return (
    <li className={classNames} onClick={onClick} role={onClick ? 'button' : undefined}>
      {resolvedLeading && (
        <span className={leadingClass}>
          <span className={leadingInnerClass}>{resolvedLeading}</span>
        </span>
      )}
      <span className={styles.listItemContent}>
        {showTitle && title && <span className={styles.listItemTitle}>{title}</span>}
        {text && <span className={styles.listItemText}>{text}</span>}
        {children}
      </span>
      {(trailing || trailingContent || trailingLink) && (
        <span className={trailingClass}>
          {trailingContent ? trailingContent : trailingLink ? (
            <a href={trailingLink.href} style={{ fontSize: 14, color: 'var(--ld-semantic-color-text-brand-bold, #0046BE)' }}>{trailingLink.text}</a>
          ) : (
            trailingVariant === 'icon' ? (
              <span className={styles.listItemTrailingIconInner}>{trailing}</span>
            ) : trailing
          )}
        </span>
      )}
    </li>
  );
};

export default List;
