import React, { useState, createContext, useContext, useCallback } from 'react';

interface DialogContextValue { open: boolean; setOpen: (open: boolean) => void; }
const DialogContext = createContext<DialogContextValue>({ open: false, setOpen: () => {} });

export const Dialog: React.FC<{ children: React.ReactNode; open?: boolean; onOpenChange?: (open: boolean) => void }> = ({ children, open: controlledOpen, onOpenChange }) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = useCallback((v: boolean) => { setInternalOpen(v); onOpenChange?.(v); }, [onOpenChange]);
  return <DialogContext.Provider value={{ open, setOpen }}>{children}</DialogContext.Provider>;
};

export const DialogTrigger: React.FC<{ children: React.ReactElement; asChild?: boolean }> = ({ children }) => {
  const { setOpen } = useContext(DialogContext);
  return React.cloneElement(children, { onClick: (e: React.MouseEvent) => { (children.props as any).onClick?.(e); setOpen(true); } });
};

export const DialogContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  const { open, setOpen } = useContext(DialogContext);
  if (!open) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)' }} onClick={() => setOpen(false)} />
      <div className={className} style={{ position: 'relative', background: 'var(--ld-semantic-color-fill-surface-primary, #fff)', borderRadius: 8, padding: 24, maxWidth: 512, width: '100%', boxShadow: '0 4px 24px rgba(0,0,0,0.15)' }} role="dialog">
        {children}
        <button onClick={() => setOpen(false)} style={{ position: 'absolute', top: 8, right: 8, background: 'none', border: 'none', cursor: 'pointer', fontSize: 18 }} aria-label="Close">&times;</button>
      </div>
    </div>
  );
};

export const DialogHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => <div className={className} style={{ marginBottom: 8 }}>{children}</div>;
export const DialogFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => <div className={className} style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16 }}>{children}</div>;
export const DialogTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => <h2 className={className} style={{ fontSize: 18, fontWeight: 700 }}>{children}</h2>;
export const DialogDescription: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => <p className={className} style={{ fontSize: 14, color: 'var(--ld-semantic-color-text-secondary, #515357)' }}>{children}</p>;
export const DialogClose: React.FC<{ children: React.ReactElement; asChild?: boolean }> = ({ children }) => {
  const { setOpen } = useContext(DialogContext);
  return React.cloneElement(children, { onClick: (e: React.MouseEvent) => { (children.props as any).onClick?.(e); setOpen(false); } });
};

export default Dialog;
