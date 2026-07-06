import * as React from 'react';
import styles from './Link.module.css';

export type LinkVariant = 'default' | 'subtle' | 'white';

export interface LinkProps {
  children: React.ReactNode;
  href?: string;
  variant?: LinkVariant;
  underline?: boolean;
  disabled?: boolean;
  className?: string;
  UNSAFE_className?: string;
  onClick?: (e: React.MouseEvent) => void;
  target?: string;
  rel?: string;
  'aria-label'?: string;
}

export const Link: React.FC<LinkProps> = ({
  children,
  href,
  variant = 'default',
  underline = true,
  disabled = false,
  className,
  UNSAFE_className,
  onClick,
  target,
  rel,
  'aria-label': ariaLabel,
}) => {
  const classNames = [
    styles.link,
    styles[`link--variant-${variant}`],
    underline ? styles['link--underlined'] : styles['link--no-underline'],
    UNSAFE_className,
    className,
  ].filter(Boolean).join(' ');

  return (
    <a
      href={href}
      className={classNames}
      onClick={onClick}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      aria-disabled={disabled || undefined}
    >
      {children}
    </a>
  );
};

export default Link;
