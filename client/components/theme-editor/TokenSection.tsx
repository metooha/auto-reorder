import React, { useState } from 'react';
import { ChevronDown } from '@/components/icons/ChevronDown';
import { ChevronUp } from '@/components/icons/ChevronUp';
import { TokenColorRow } from './TokenColorRow';
import styles from './TokenSection.module.css';

export interface TokenDef {
  token: string;
  label: string;
}

interface TokenSectionProps {
  title: string;
  tokens: TokenDef[];
  overrides: Record<string, string>;
  onSet: (token: string, value: string) => void;
  onReset: (token: string) => void;
  getCurrentValue: (token: string) => string;
  defaultOpen?: boolean;
}

/**
 * Collapsible group of TokenColorRow items under a section heading.
 */
export function TokenSection({
  title,
  tokens,
  overrides,
  onSet,
  onReset,
  getCurrentValue,
  defaultOpen = true,
}: TokenSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  const overriddenCount = tokens.filter(t => overrides[t.token] !== undefined).length;

  return (
    <div className={styles.section}>
      <button
        type="button"
        className={styles.header}
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <div className={styles.headerLeft}>
          <span className={styles.title}>{title}</span>
          {overriddenCount > 0 && (
            <span className={styles.badge} aria-label={`${overriddenCount} overridden`}>
              {overriddenCount}
            </span>
          )}
        </div>
        <span className={styles.chevron} aria-hidden="true">
          {open ? <ChevronUp width={16} height={16} /> : <ChevronDown width={16} height={16} />}
        </span>
      </button>

      {open && (
        <div className={styles.rows}>
          {tokens.map(({ token, label }) => (
            <TokenColorRow
              key={token}
              token={token}
              label={label}
              isOverridden={overrides[token] !== undefined}
              overrideValue={overrides[token]}
              onSet={onSet}
              onReset={onReset}
              getCurrentValue={getCurrentValue}
            />
          ))}
        </div>
      )}
    </div>
  );
}
