import React, { useState } from 'react';

export const Command: React.FC<{ children: React.ReactNode; className?: string; style?: React.CSSProperties }> = ({ children, className, style }) => (
  <div className={className} style={{ border: '1px solid var(--ld-semantic-color-border-subtle, #e6e6e8)', borderRadius: 8, overflow: 'hidden', ...style }}>{children}</div>
);

export const CommandDialog: React.FC<{ children: React.ReactNode; open?: boolean; onOpenChange?: (open: boolean) => void }> = ({ children, open }) => {
  if (!open) return null;
  return <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 100 }}>
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)' }} />
    <div style={{ position: 'relative', background: '#fff', borderRadius: 8, maxWidth: 480, width: '100%', boxShadow: '0 4px 24px rgba(0,0,0,0.15)' }}>{children}</div>
  </div>;
};

export const CommandInput: React.FC<{ placeholder?: string; className?: string; value?: string; onValueChange?: (v: string) => void }> = ({ placeholder, className, value, onValueChange }) => (
  <input className={className} placeholder={placeholder} value={value} onChange={(e) => onValueChange?.(e.target.value)} style={{ width: '100%', padding: '12px 16px', border: 'none', borderBottom: '1px solid var(--ld-semantic-color-border-subtle, #e6e6e8)', outline: 'none', fontSize: 14, fontFamily: 'var(--ld-semantic-font-family-sans)' }} />
);

export const CommandList: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={className} style={{ maxHeight: 300, overflowY: 'auto' }}>{children}</div>
);

export const CommandEmpty: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div style={{ padding: '24px 16px', textAlign: 'center', color: 'var(--ld-semantic-color-text-secondary, #515357)', fontSize: 14 }}>{children || 'No results found.'}</div>
);

export const CommandGroup: React.FC<{ children: React.ReactNode; heading?: string; className?: string }> = ({ children, heading, className }) => (
  <div className={className}>
    {heading && <div style={{ padding: '8px 16px', fontSize: 12, fontWeight: 700, color: 'var(--ld-semantic-color-text-secondary, #515357)', textTransform: 'uppercase' }}>{heading}</div>}
    {children}
  </div>
);

export const CommandItem: React.FC<{ children: React.ReactNode; className?: string; onSelect?: () => void; disabled?: boolean; value?: string }> = ({ children, className, onSelect, disabled }) => (
  <div className={className} onClick={disabled ? undefined : onSelect} style={{ padding: '8px 16px', cursor: disabled ? 'default' : 'pointer', opacity: disabled ? 0.5 : 1, fontSize: 14 }} role="option">
    {children}
  </div>
);

export const CommandSeparator: React.FC<{ className?: string }> = ({ className }) => (
  <div className={className} style={{ height: 1, background: 'var(--ld-semantic-color-border-subtle, #e6e6e8)', margin: '4px 0' }} />
);

export const CommandShortcut: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <span className={className} style={{ fontSize: 12, color: 'var(--ld-semantic-color-text-secondary, #74767c)', marginLeft: 'auto' }}>{children}</span>
);

export default Command;
