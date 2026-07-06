import React from 'react';
import { Button } from '@/components/ui/Button';
import styles from './FloatingFooter.module.css';

interface FloatingFooterAction {
  label: string;
  subLabel?: string;
  icon?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary';
  strokeOn?: boolean;
  onClick?: () => void;
}

interface FloatingFooterProps {
  secondaryAction: FloatingFooterAction;
  primaryAction: FloatingFooterAction;
  /** false = in-flow (for docs page demo); true = fixed to viewport bottom */
  fixed?: boolean;
}

export function FloatingFooter({
  secondaryAction,
  primaryAction,
  fixed = false,
}: FloatingFooterProps) {
  return (
    <div className={`${styles.bar} ${fixed ? styles.barFixed : ''}`}>
      <Button
        variant={secondaryAction.variant ?? 'secondary'}
        size="medium"
        leading={secondaryAction.icon}
        strokeOn={secondaryAction.strokeOn}
        onClick={secondaryAction.onClick}
      >
        {secondaryAction.label}
      </Button>
      <Button
        variant={primaryAction.variant ?? 'secondary'}
        size="medium"
        leading={primaryAction.icon}
        subLabel={primaryAction.subLabel}
        strokeOn={primaryAction.strokeOn}
        onClick={primaryAction.onClick}
      >
        {primaryAction.label}
      </Button>
    </div>
  );
}
