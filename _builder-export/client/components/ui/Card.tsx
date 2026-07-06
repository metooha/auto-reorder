import * as React from 'react';
import styles from './Card.module.css';

export type CardSize = 'small' | 'large';

export const CardSizeContext = React.createContext<CardSize>('small');

export interface CardProps {
  children: React.ReactNode;
  size?: CardSize;
  className?: string;
  UNSAFE_className?: string;
  UNSAFE_style?: React.CSSProperties;
  style?: React.CSSProperties;
  onClick?: () => void;
  'aria-label'?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  size = 'small',
  className,
  UNSAFE_className,
  UNSAFE_style,
  style,
  onClick,
  'aria-label': ariaLabel,
}) => {
  const classNames = [
    styles.card,
    styles[`card--size-${size}`],
    UNSAFE_className,
    className,
  ].filter(Boolean).join(' ');

  return (
    <CardSizeContext.Provider value={size}>
      <div
        className={classNames}
        style={UNSAFE_style || style}
        onClick={onClick}
        aria-label={ariaLabel}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
      >
        {children}
      </div>
    </CardSizeContext.Provider>
  );
};

// Re-exports for backward compatibility
export { CardHeader } from './CardHeader';
export { CardContent } from './CardContent';

// Simple aliases for components used in component library
export const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <h3 className={className} style={{ fontSize: 16, fontWeight: 700, fontFamily: 'var(--ld-semantic-font-family-sans)' }}>{children}</h3>
);
export const CardDescription: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <p className={className} style={{ fontSize: 14, color: 'var(--ld-semantic-color-text-secondary, #515357)' }}>{children}</p>
);
export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={className} style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 8 }}>{children}</div>
);

export default Card;
