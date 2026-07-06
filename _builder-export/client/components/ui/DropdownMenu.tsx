import React, { useState, useRef, useEffect, createContext, useContext, useCallback } from 'react';

interface DropdownMenuContextValue { open: boolean; setOpen: (open: boolean) => void; }
const DropdownMenuContext = createContext<DropdownMenuContextValue>({ open: false, setOpen: () => {} });

export const DropdownMenu: React.FC<{ children: React.ReactNode; open?: boolean; onOpenChange?: (open: boolean) => void }> = ({ children, open: controlledOpen, onOpenChange }) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = useCallback((v: boolean) => { setInternalOpen(v); onOpenChange?.(v); }, [onOpenChange]);
  return <DropdownMenuContext.Provider value={{ open, setOpen }}><div style={{ position: 'relative', display: 'inline-block' }}>{children}</div></DropdownMenuContext.Provider>;
};

export const DropdownMenuTrigger: React.FC<{ children: React.ReactElement; asChild?: boolean }> = ({ children }) => {
  const { open, setOpen } = useContext(DropdownMenuContext);
  return React.cloneElement(children, { onClick: (e: React.MouseEvent) => { (children.props as any).onClick?.(e); setOpen(!open); } });
};

export const DropdownMenuContent: React.FC<{ children: React.ReactNode; className?: string; align?: string; sideOffset?: number }> = ({ children, className }) => {
  const { open, setOpen } = useContext(DropdownMenuContext);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { if (!open) return; const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); }; document.addEventListener('mousedown', h); return () => document.removeEventListener('mousedown', h); }, [open, setOpen]);
  if (!open) return null;
  return <div ref={ref} className={className} style={{ position: 'absolute', top: '100%', marginTop: 4, right: 0, background: '#fff', border: '1px solid #e6e6e8', borderRadius: 4, boxShadow: '0 2px 8px rgba(0,0,0,0.15)', minWidth: 160, padding: 4, zIndex: 50 }} role="menu">{children}</div>;
};

export const DropdownMenuItem: React.FC<{ children: React.ReactNode; className?: string; onSelect?: () => void; disabled?: boolean; inset?: boolean }> = ({ children, className, onSelect, disabled, inset }) => {
  const { setOpen } = useContext(DropdownMenuContext);
  return <div className={className} onClick={() => { if (!disabled) { onSelect?.(); setOpen(false); } }} style={{ padding: '6px 8px', paddingLeft: inset ? 24 : 8, cursor: disabled ? 'default' : 'pointer', opacity: disabled ? 0.5 : 1, fontSize: 14, borderRadius: 2 }} role="menuitem">{children}</div>;
};

export const DropdownMenuCheckboxItem: React.FC<{ children: React.ReactNode; checked?: boolean; onCheckedChange?: (checked: boolean) => void; className?: string }> = ({ children, checked, onCheckedChange, className }) => (
  <div className={className} onClick={() => onCheckedChange?.(!checked)} style={{ padding: '6px 8px', cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
    <span style={{ width: 16, height: 16 }}>{checked ? '✓' : ''}</span>{children}
  </div>
);

export const DropdownMenuRadioGroup: React.FC<{ children: React.ReactNode; value?: string; onValueChange?: (v: string) => void }> = ({ children }) => <>{children}</>;
export const DropdownMenuRadioItem: React.FC<{ children: React.ReactNode; value: string; className?: string }> = ({ children, className }) => <div className={className} style={{ padding: '6px 8px', fontSize: 14 }}>{children}</div>;
export const DropdownMenuLabel: React.FC<{ children: React.ReactNode; inset?: boolean; className?: string }> = ({ children, className, inset }) => <div className={className} style={{ padding: '6px 8px', paddingLeft: inset ? 24 : 8, fontSize: 12, fontWeight: 600, color: '#515357' }}>{children}</div>;
export const DropdownMenuSeparator: React.FC<{ className?: string }> = ({ className }) => <div className={className} style={{ height: 1, background: '#e6e6e8', margin: '4px 0' }} />;
export const DropdownMenuSub: React.FC<{ children: React.ReactNode }> = ({ children }) => <div style={{ position: 'relative' }}>{children}</div>;
export const DropdownMenuSubTrigger: React.FC<{ children: React.ReactNode; inset?: boolean; className?: string }> = ({ children, className, inset }) => <div className={className} style={{ padding: '6px 8px', paddingLeft: inset ? 24 : 8, fontSize: 14 }}>{children} ▸</div>;
export const DropdownMenuSubContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => <div className={className} style={{ position: 'absolute', left: '100%', top: 0, background: '#fff', border: '1px solid #e6e6e8', borderRadius: 4, boxShadow: '0 2px 8px rgba(0,0,0,0.15)', minWidth: 160, padding: 4 }}>{children}</div>;
export const DropdownMenuShortcut: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => <span className={className} style={{ fontSize: 12, color: '#74767c', marginLeft: 'auto' }}>{children}</span>;
export const DropdownMenuGroup: React.FC<{ children: React.ReactNode }> = ({ children }) => <div role="group">{children}</div>;
export const DropdownMenuPortal: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;

export default DropdownMenu;
