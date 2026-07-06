import React, { useState, createContext, useContext, useCallback } from 'react';

interface TabsContextValue { value: string; onValueChange: (v: string) => void; }
const TabsContext = createContext<TabsContextValue>({ value: '', onValueChange: () => {} });

export interface TabsProps { children: React.ReactNode; defaultValue?: string; value?: string; onValueChange?: (v: string) => void; className?: string; }
export const Tabs: React.FC<TabsProps> = ({ children, defaultValue = '', value: controlledValue, onValueChange, className }) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = controlledValue ?? internalValue;
  const handleChange = useCallback((v: string) => { setInternalValue(v); onValueChange?.(v); }, [onValueChange]);
  return <TabsContext.Provider value={{ value, onValueChange: handleChange }}><div className={className}>{children}</div></TabsContext.Provider>;
};

export const TabsList: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={className} role="tablist" style={{ display: 'flex', gap: 0, borderBottom: '2px solid var(--ld-semantic-color-border-subtle, #e6e6e8)' }}>{children}</div>
);
// Alias
export const TabList = TabsList;

export const TabsTrigger: React.FC<{ children: React.ReactNode; value: string; className?: string; disabled?: boolean }> = ({ children, value: tabValue, className, disabled }) => {
  const { value, onValueChange } = useContext(TabsContext);
  const isActive = value === tabValue;
  return (
    <button
      className={className}
      role="tab"
      aria-selected={isActive}
      disabled={disabled}
      onClick={() => !disabled && onValueChange(tabValue)}
      style={{
        padding: '10px 16px', background: 'none', border: 'none', borderBottom: isActive ? '2px solid var(--ld-semantic-color-action-fill-primary, #0071DC)' : '2px solid transparent',
        marginBottom: -2, cursor: disabled ? 'default' : 'pointer', fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: 14,
        fontWeight: isActive ? 700 : 400, color: isActive ? 'var(--ld-semantic-color-action-fill-primary, #0071DC)' : 'var(--ld-semantic-color-text-secondary, #515357)',
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {children}
    </button>
  );
};
// Alias
export const Tab = TabsTrigger;

export const TabsContent: React.FC<{ children: React.ReactNode; value: string; className?: string }> = ({ children, value: tabValue, className }) => {
  const { value } = useContext(TabsContext);
  if (value !== tabValue) return null;
  return <div className={className} role="tabpanel" style={{ padding: '16px 0' }}>{children}</div>;
};
// Alias
export const TabPanel = TabsContent;

export default Tabs;
