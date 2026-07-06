import React, { useState, createContext, useContext, useCallback } from 'react';

interface DrawerContextValue { open: boolean; setOpen: (open: boolean) => void; }
const DrawerContext = createContext<DrawerContextValue>({ open: false, setOpen: () => {} });

export const Drawer: React.FC<{ children: React.ReactNode; open?: boolean; onOpenChange?: (open: boolean) => void }> = ({ children, open: controlledOpen, onOpenChange }) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = useCallback((v: boolean) => { setInternalOpen(v); onOpenChange?.(v); }, [onOpenChange]);
  return <DrawerContext.Provider value={{ open, setOpen }}>{children}</DrawerContext.Provider>;
};

export const DrawerTrigger: React.FC<{ children: React.ReactElement; asChild?: boolean }> = ({ children }) => {
  const { setOpen } = useContext(DrawerContext);
  return React.cloneElement(children, { onClick: (e: React.MouseEvent) => { (children.props as any).onClick?.(e); setOpen(true); } });
};

export const DrawerContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  const { open, setOpen } = useContext(DrawerContext);
  if (!open) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50 }}>
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)' }} onClick={() => setOpen(false)} />
      <div className={className} style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#fff', borderRadius: '16px 16px 0 0', padding: 24, maxHeight: '80vh' }} role="dialog">
        <div style={{ width: 48, height: 4, background: '#e0e0e0', borderRadius: 2, margin: '0 auto 16px' }} />
        {children}
      </div>
    </div>
  );
};

export const DrawerHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => <div className={className} style={{ marginBottom: 8 }}>{children}</div>;
export const DrawerFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => <div className={className} style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16 }}>{children}</div>;
export const DrawerTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => <h2 className={className} style={{ fontSize: 18, fontWeight: 700 }}>{children}</h2>;
export const DrawerDescription: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => <p className={className} style={{ fontSize: 14, color: '#515357' }}>{children}</p>;
export const DrawerClose: React.FC<{ children: React.ReactElement; asChild?: boolean }> = ({ children }) => {
  const { setOpen } = useContext(DrawerContext);
  return React.cloneElement(children, { onClick: (e: React.MouseEvent) => { (children.props as any).onClick?.(e); setOpen(false); } });
};

export default Drawer;
