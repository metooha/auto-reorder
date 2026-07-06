import React, { useState, createContext, useContext } from 'react';

interface MenubarContextValue { activeMenu: string | null; setActiveMenu: (v: string | null) => void; }
const MenubarContext = createContext<MenubarContextValue>({ activeMenu: null, setActiveMenu: () => {} });

export const Menubar: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  return <MenubarContext.Provider value={{ activeMenu, setActiveMenu }}><div className={className} style={{ display: 'flex', gap: 4, padding: 4, border: '1px solid var(--ld-semantic-color-border-subtle, #e6e6e8)', borderRadius: 4 }} role="menubar">{children}</div></MenubarContext.Provider>;
};

export const MenubarMenu: React.FC<{ children: React.ReactNode; value?: string }> = ({ children }) => <div style={{ position: 'relative' }}>{children}</div>;

export const MenubarTrigger: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <button className={className} style={{ padding: '6px 12px', background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, fontFamily: 'var(--ld-semantic-font-family-sans)', borderRadius: 2 }}>{children}</button>
);

export const MenubarContent: React.FC<{ children: React.ReactNode; className?: string; align?: string; sideOffset?: number; alignOffset?: number; forceMount?: boolean }> = ({ children, className }) => (
  <div className={className} style={{ position: 'absolute', top: '100%', left: 0, marginTop: 4, background: '#fff', border: '1px solid #e6e6e8', borderRadius: 4, boxShadow: '0 2px 8px rgba(0,0,0,0.15)', minWidth: 180, padding: 4, zIndex: 50 }} role="menu">{children}</div>
);

export const MenubarItem: React.FC<{ children: React.ReactNode; className?: string; inset?: boolean; disabled?: boolean; onSelect?: () => void }> = ({ children, className, inset }) => (
  <div className={className} style={{ padding: '6px 8px', paddingLeft: inset ? 24 : 8, fontSize: 14, cursor: 'pointer', borderRadius: 2 }} role="menuitem">{children}</div>
);

export const MenubarSeparator: React.FC<{ className?: string }> = ({ className }) => <div className={className} style={{ height: 1, background: '#e6e6e8', margin: '4px 0' }} />;
export const MenubarLabel: React.FC<{ children: React.ReactNode; className?: string; inset?: boolean }> = ({ children, className, inset }) => <div className={className} style={{ padding: '6px 8px', paddingLeft: inset ? 24 : 8, fontSize: 12, fontWeight: 600, color: '#515357' }}>{children}</div>;
export const MenubarCheckboxItem: React.FC<{ children: React.ReactNode; checked?: boolean; onCheckedChange?: (checked: boolean) => void; className?: string }> = ({ children, checked, onCheckedChange, className }) => (
  <div className={className} onClick={() => onCheckedChange?.(!checked)} style={{ padding: '6px 8px', fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
    <span style={{ width: 16 }}>{checked ? '✓' : ''}</span>{children}
  </div>
);
export const MenubarRadioGroup: React.FC<{ children: React.ReactNode; value?: string; onValueChange?: (v: string) => void }> = ({ children }) => <>{children}</>;
export const MenubarRadioItem: React.FC<{ children: React.ReactNode; value: string; className?: string }> = ({ children, className }) => <div className={className} style={{ padding: '6px 8px', fontSize: 14 }}>{children}</div>;
export const MenubarSub: React.FC<{ children: React.ReactNode }> = ({ children }) => <div style={{ position: 'relative' }}>{children}</div>;
export const MenubarSubTrigger: React.FC<{ children: React.ReactNode; className?: string; inset?: boolean }> = ({ children, className, inset }) => <div className={className} style={{ padding: '6px 8px', paddingLeft: inset ? 24 : 8, fontSize: 14 }}>{children} ▸</div>;
export const MenubarSubContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => <div className={className} style={{ position: 'absolute', left: '100%', top: 0, background: '#fff', border: '1px solid #e6e6e8', borderRadius: 4, minWidth: 180, padding: 4 }}>{children}</div>;
export const MenubarShortcut: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => <span className={className} style={{ fontSize: 12, color: '#74767c', marginLeft: 'auto' }}>{children}</span>;

export default Menubar;
