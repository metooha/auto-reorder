import * as React from 'react';
import { cn } from '@/lib/utils';
import styles from './Tag.module.css';

export type TagVariant = 'primary' | 'secondary' | 'tertiary' | 'info' | 'neutral' | 'success';

export type TagColor =
  | 'brand'
  | 'positive'
  | 'negative'
  | 'warning'
  | 'info'
  | 'edited'
  | 'blue'
  | 'spark'
  | 'green'
  | 'red'
  | 'purple'
  | 'gray'
  | 'cyan'
  | 'orange'
  | 'pink'
  | 'yellow'
  | 'teal';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: TagVariant;
  color?: TagColor;
  leading?: React.ReactNode;
  children: React.ReactNode;
}

// Map semantic variant aliases to a base variant + color pair
const VARIANT_ALIAS_MAP: Record<string, { variant: 'primary' | 'secondary' | 'tertiary'; color: TagColor }> = {
  info: { variant: 'secondary', color: 'info' },
  neutral: { variant: 'secondary', color: 'gray' },
  success: { variant: 'secondary', color: 'positive' },
};

const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      className,
      variant = 'secondary',
      color = 'brand',
      leading,
      children,
      ...props
    },
    ref
  ) => {
    const alias = VARIANT_ALIAS_MAP[variant];
    const resolvedVariant = alias ? alias.variant : (variant as 'primary' | 'secondary' | 'tertiary');
    const resolvedColor = alias ? alias.color : color;

    const variantClass = styles[`tag${resolvedVariant.charAt(0).toUpperCase() + resolvedVariant.slice(1)}`];
    const colorClass = styles[`color${resolvedColor.charAt(0).toUpperCase() + resolvedColor.slice(1)}`];

    return (
      <span
        ref={ref}
        className={cn(styles.tag, variantClass, colorClass, className)}
        {...props}
      >
        {leading && <span className={styles.leading}>{leading}</span>}
        <span className={styles.label}>{children}</span>
      </span>
    );
  }
);

Tag.displayName = 'Tag';

export { Tag };
