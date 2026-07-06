/**
 * @deprecated Use `<IconButton floating>` from `@/components/ui/IconButton` instead.
 * The `floating` prop applies the same elevated circular style.
 *
 * Migration:
 *   Before: <WCPFloatingButton size="medium" aria-label="Next"><ArrowRight /></WCPFloatingButton>
 *   After:  <IconButton floating size="medium" aria-label="Next"><ArrowRight /></IconButton>
 *
 * Note: WCPFloatingButton sizes map to IconButton sizes as follows:
 *   xsmall → small, small → small, medium → medium, large → large
 */
import React from 'react';
import { IconButton, type IconButtonButtonProps } from '@/components/ui/IconButton';

export type WCPFloatingButtonSize = 'xsmall' | 'small' | 'medium' | 'large';

export interface WCPFloatingButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'style'> {
  children: React.ReactNode;
  size?: WCPFloatingButtonSize;
  'aria-label': string;
  UNSAFE_className?: string;
  UNSAFE_style?: React.CSSProperties;
}

/**
 * @deprecated Use `<IconButton floating>` instead.
 */
export function WCPFloatingButton({
  children,
  size = 'medium',
  'aria-label': ariaLabel,
  UNSAFE_className,
  UNSAFE_style,
  ...rest
}: WCPFloatingButtonProps) {
  // xsmall and small both map to IconButton's small size
  const iconButtonSize = size === 'large' ? 'large' : size === 'medium' ? 'medium' : 'small';

  return (
    <IconButton
      floating
      size={iconButtonSize}
      aria-label={ariaLabel}
      UNSAFE_className={UNSAFE_className}
      UNSAFE_style={UNSAFE_style}
      {...(rest as Omit<IconButtonButtonProps, 'aria-label' | 'size' | 'children'>)}
    >
      {children}
    </IconButton>
  );
}
