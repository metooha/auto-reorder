import * as React from 'react';
import styles from './Tag.module.css';

export type TagVariant = 'primary' | 'secondary' | 'tertiary';
export type TagColor =
  | 'brand' | 'positive' | 'negative' | 'warning' | 'info' | 'edited'
  | 'blue' | 'spark' | 'green' | 'red' | 'purple' | 'gray'
  | 'cyan' | 'orange' | 'pink' | 'yellow' | 'teal';

export interface TagProps {
  children: React.ReactNode;
  variant?: TagVariant;
  color?: TagColor;
  leading?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const colorClassMap: Record<TagColor, string> = {
  brand: styles.colorBrand,
  positive: styles.colorPositive,
  negative: styles.colorNegative,
  warning: styles.colorWarning,
  info: styles.colorInfo,
  edited: styles.colorEdited,
  blue: styles.colorBlue,
  spark: styles.colorSpark,
  green: styles.colorGreen,
  red: styles.colorRed,
  purple: styles.colorPurple,
  gray: styles.colorGray,
  cyan: styles.colorCyan,
  orange: styles.colorOrange,
  pink: styles.colorPink,
  yellow: styles.colorYellow,
  teal: styles.colorTeal,
};

const variantClassMap: Record<TagVariant, string> = {
  primary: styles.tagPrimary,
  secondary: styles.tagSecondary,
  tertiary: styles.tagTertiary,
};

export const Tag: React.FC<TagProps> = ({
  children,
  variant = 'primary',
  color = 'brand',
  leading,
  className,
  style,
}) => {
  const classNames = [
    styles.tag,
    variantClassMap[variant],
    colorClassMap[color],
    className,
  ].filter(Boolean).join(' ');

  return (
    <span className={classNames} style={style}>
      {leading && <span className={styles.leading}>{leading}</span>}
      <span className={styles.label}>{children}</span>
    </span>
  );
};

// Backward-compatible alias
export const LDTag = Tag;

export default Tag;
