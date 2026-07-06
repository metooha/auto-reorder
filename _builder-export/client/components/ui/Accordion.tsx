import React, { useState, createContext, useContext, useCallback } from 'react';

// ── Context ──
interface AccordionContextValue {
  expandedItems: string[];
  toggleItem: (value: string) => void;
  type: 'single' | 'multiple';
}
const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordionContext() {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error('Accordion sub-components must be used within <Accordion>');
  return ctx;
}

interface AccordionItemContextValue {
  value: string;
  isOpen: boolean;
}
const AccordionItemContext = createContext<AccordionItemContextValue | null>(null);
function useAccordionItemContext() {
  const ctx = useContext(AccordionItemContext);
  if (!ctx) throw new Error('AccordionTrigger/AccordionContent must be used within <AccordionItem>');
  return ctx;
}

// ── Accordion ──
export interface AccordionProps {
  children: React.ReactNode;
  type?: 'single' | 'multiple';
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  collapsible?: boolean;
  className?: string;
  style?: React.CSSProperties;
  UNSAFE_className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  children,
  type = 'single',
  defaultValue,
  value: controlledValue,
  onValueChange,
  className,
  style: styleProp,
  UNSAFE_className,
}) => {
  const [internalExpanded, setInternalExpanded] = useState<string[]>(() => {
    if (defaultValue) return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    return [];
  });

  const expandedItems = controlledValue !== undefined
    ? (Array.isArray(controlledValue) ? controlledValue : [controlledValue])
    : internalExpanded;

  const toggleItem = useCallback((itemValue: string) => {
    let newExpanded: string[];
    if (type === 'single') {
      newExpanded = expandedItems.includes(itemValue) ? [] : [itemValue];
    } else {
      newExpanded = expandedItems.includes(itemValue)
        ? expandedItems.filter(v => v !== itemValue)
        : [...expandedItems, itemValue];
    }
    setInternalExpanded(newExpanded);
    onValueChange?.(type === 'single' ? (newExpanded[0] || '') : newExpanded);
  }, [expandedItems, type, onValueChange]);

  return (
    <AccordionContext.Provider value={{ expandedItems, toggleItem, type }}>
      <div className={UNSAFE_className || className} data-orientation="vertical" style={styleProp}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

// ── AccordionItem ──
export interface AccordionItemProps {
  children: React.ReactNode;
  value: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  children,
  value,
  disabled = false,
  className,
  style: itemStyle,
}) => {
  const { expandedItems } = useAccordionContext();
  const isOpen = expandedItems.includes(value);

  return (
    <AccordionItemContext.Provider value={{ value, isOpen }}>
      <div
        className={className}
        data-state={isOpen ? 'open' : 'closed'}
        data-disabled={disabled || undefined}
        style={{
          borderBottom: '1px solid var(--ld-semantic-color-border-subtle, #E6E6E8)',
          ...itemStyle,
        }}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
};

// ── AccordionTrigger ──
export interface AccordionTriggerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const AccordionTrigger: React.FC<AccordionTriggerProps> = ({
  children,
  className,
  style: styleProp,
}) => {
  const { toggleItem } = useAccordionContext();
  const { value, isOpen } = useAccordionItemContext();

  return (
    <button
      type="button"
      className={className}
      onClick={() => toggleItem(value)}
      aria-expanded={isOpen}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: 'var(--ld-primitive-scale-space-200, 16px) 0',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontFamily: 'var(--ld-semantic-font-family-sans)',
        fontSize: 'var(--ld-semantic-font-body-medium-size, 16px)',
        fontWeight: 600,
        color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
        textAlign: 'left',
        ...styleProp,
      }}
    >
      {children}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        style={{
          transition: 'transform 0.2s ease',
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          flexShrink: 0,
        }}
      >
        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
};

// ── AccordionContent ──
export interface AccordionContentProps {
  children: React.ReactNode;
  className?: string;
}

export const AccordionContent: React.FC<AccordionContentProps> = ({
  children,
  className,
}) => {
  const { isOpen } = useAccordionItemContext();

  if (!isOpen) return null;

  return (
    <div
      className={className}
      role="region"
      data-state={isOpen ? 'open' : 'closed'}
      style={{
        paddingBottom: 'var(--ld-primitive-scale-space-200, 16px)',
        fontFamily: 'var(--ld-semantic-font-family-sans)',
        fontSize: 'var(--ld-semantic-font-body-small-size, 14px)',
        lineHeight: 'var(--ld-semantic-font-body-small-lineheight, 142.857%)',
        color: 'var(--ld-semantic-color-text-secondary, #515357)',
      }}
    >
      {children}
    </div>
  );
};

export default Accordion;
