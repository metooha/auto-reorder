import React, { useState, createContext, useContext, useCallback } from 'react';

interface AlertDialogContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}
const AlertDialogContext = createContext<AlertDialogContextValue>({ open: false, setOpen: () => {} });

export const AlertDialog: React.FC<{ children: React.ReactNode; open?: boolean; onOpenChange?: (open: boolean) => void }> = ({ children, open: controlledOpen, onOpenChange }) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = useCallback((v: boolean) => { setInternalOpen(v); onOpenChange?.(v); }, [onOpenChange]);
  return <AlertDialogContext.Provider value={{ open, setOpen }}>{children}</AlertDialogContext.Provider>;
};

export const AlertDialogTrigger: React.FC<{ children: React.ReactElement; asChild?: boolean }> = ({ children }) => {
  const { setOpen } = useContext(AlertDialogContext);
  return React.cloneElement(children, { onClick: (e: React.MouseEvent) => { (children.props as any).onClick?.(e); setOpen(true); } });
};

export const AlertDialogContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  const { open, setOpen } = useContext(AlertDialogContext);
  if (!open) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)' }} onClick={() => setOpen(false)} />
      <div className={className} style={{ position: 'relative', background: 'var(--ld-semantic-color-fill-surface-primary, #fff)', borderRadius: 8, padding: 24, maxWidth: 512, width: '100%', boxShadow: '0 4px 24px rgba(0,0,0,0.15)' }} role="alertdialog">
        {children}
      </div>
    </div>
  );
};

export const AlertDialogHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={className} style={{ marginBottom: 8 }}>{children}</div>
);
export const AlertDialogFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={className} style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16 }}>{children}</div>
);
export const AlertDialogTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <h2 className={className} style={{ fontSize: 18, fontWeight: 700, fontFamily: 'var(--ld-semantic-font-family-sans)' }}>{children}</h2>
);
export const AlertDialogDescription: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <p className={className} style={{ fontSize: 14, color: 'var(--ld-semantic-color-text-secondary, #515357)' }}>{children}</p>
);
export const AlertDialogAction: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: string }> = ({ variant, ...props }) => <button {...props} />;
export const AlertDialogCancel: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: string }> = ({ variant, ...props }) => {
  const { setOpen } = useContext(AlertDialogContext);
  return <button {...props} onClick={(e) => { props.onClick?.(e); setOpen(false); }} />;
};

export default AlertDialog;
