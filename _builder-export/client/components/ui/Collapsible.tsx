import React, { useState, createContext, useContext, useCallback } from 'react';

interface CollapsibleContextValue { open: boolean; setOpen: (open: boolean) => void; }
const CollapsibleContext = createContext<CollapsibleContextValue>({ open: false, setOpen: () => {} });

export const Collapsible: React.FC<{ children: React.ReactNode; open?: boolean; onOpenChange?: (open: boolean) => void; className?: string; style?: React.CSSProperties }> = ({ children, open: controlledOpen, onOpenChange, className, style }) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = useCallback((v: boolean) => { setInternalOpen(v); onOpenChange?.(v); }, [onOpenChange]);
  return <CollapsibleContext.Provider value={{ open, setOpen }}><div className={className} style={style}>{children}</div></CollapsibleContext.Provider>;
};

export const CollapsibleTrigger: React.FC<{ children: React.ReactElement; asChild?: boolean }> = ({ children }) => {
  const { open, setOpen } = useContext(CollapsibleContext);
  return React.cloneElement(children, { onClick: (e: React.MouseEvent) => { (children.props as any).onClick?.(e); setOpen(!open); } });
};

export const CollapsibleContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  const { open } = useContext(CollapsibleContext);
  if (!open) return null;
  return <div className={className}>{children}</div>;
};

export default Collapsible;
