import React, { useState, useCallback } from 'react';

export const ContextMenu: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const handleContextMenu = useCallback((e: React.MouseEvent) => { e.preventDefault(); setPos({ x: e.clientX, y: e.clientY }); }, []);
  const close = useCallback(() => setPos(null), []);
  return (
    <div onContextMenu={handleContextMenu}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child) && (child.type as any) === ContextMenuTrigger) return child;
        if (React.isValidElement(child) && (child.type as any) === ContextMenuContent) {
          if (!pos) return null;
          return <div style={{ position: 'fixed', left: pos.x, top: pos.y, zIndex: 50 }} onClick={close}>{child}</div>;
        }
        return child;
      })}
      {pos && <div style={{ position: 'fixed', inset: 0, zIndex: 49 }} onClick={close} />}
    </div>
  );
};
export const ContextMenuTrigger: React.FC<{ children: React.ReactNode; className?: string; asChild?: boolean }> = ({ children, className }) => <div className={className}>{children}</div>;
export const ContextMenuContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={className} style={{ background: '#fff', border: '1px solid var(--ld-semantic-color-border-subtle)', borderRadius: 4, boxShadow: '0 2px 8px rgba(0,0,0,0.15)', minWidth: 160, padding: 4 }}>{children}</div>
);
export const ContextMenuItem: React.FC<{ children: React.ReactNode; inset?: boolean; className?: string; onSelect?: () => void; disabled?: boolean }> = ({ children, className, onSelect, disabled, inset }) => (
  <div className={className} onClick={disabled ? undefined : onSelect} style={{ padding: '6px 8px', paddingLeft: inset ? 24 : 8, cursor: 'pointer', fontSize: 14, borderRadius: 2 }} role="menuitem">{children}</div>
);
export const ContextMenuCheckboxItem: React.FC<{ children: React.ReactNode; checked?: boolean; onCheckedChange?: (checked: boolean) => void; className?: string }> = ({ children, checked, onCheckedChange, className }) => (
  <div className={className} onClick={() => onCheckedChange?.(!checked)} style={{ padding: '6px 8px', cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
    <span style={{ width: 16, height: 16, border: '1px solid #999', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{checked ? '✓' : ''}</span>
    {children}
  </div>
);
export const ContextMenuRadioGroup: React.FC<{ children: React.ReactNode; value?: string; onValueChange?: (v: string) => void }> = ({ children }) => <>{children}</>;
export const ContextMenuRadioItem: React.FC<{ children: React.ReactNode; value: string; className?: string }> = ({ children, className }) => <div className={className} style={{ padding: '6px 8px', fontSize: 14 }}>{children}</div>;
export const ContextMenuLabel: React.FC<{ children: React.ReactNode; inset?: boolean; className?: string }> = ({ children, className, inset }) => (
  <div className={className} style={{ padding: '6px 8px', paddingLeft: inset ? 24 : 8, fontSize: 12, fontWeight: 600, color: '#515357' }}>{children}</div>
);
export const ContextMenuSeparator: React.FC<{ className?: string }> = ({ className }) => <div className={className} style={{ height: 1, background: '#e6e6e8', margin: '4px 0' }} />;
export const ContextMenuSub: React.FC<{ children: React.ReactNode }> = ({ children }) => <div>{children}</div>;
export const ContextMenuSubTrigger: React.FC<{ children: React.ReactNode; inset?: boolean; className?: string }> = ({ children, className, inset }) => <div className={className} style={{ padding: '6px 8px', paddingLeft: inset ? 24 : 8, fontSize: 14 }}>{children} ▸</div>;
export const ContextMenuSubContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => <div className={className}>{children}</div>;
export const ContextMenuShortcut: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => <span className={className} style={{ fontSize: 12, color: '#74767c', marginLeft: 'auto' }}>{children}</span>;

export default ContextMenu;
