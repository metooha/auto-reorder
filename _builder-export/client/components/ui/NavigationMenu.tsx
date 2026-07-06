import React, { useState, createContext, useContext } from 'react';

interface NavMenuContextValue { activeItem: string; setActiveItem: (v: string) => void; }
const NavMenuContext = createContext<NavMenuContextValue>({ activeItem: '', setActiveItem: () => {} });

export const NavigationMenu: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  const [activeItem, setActiveItem] = useState('');
  return <NavMenuContext.Provider value={{ activeItem, setActiveItem }}><nav className={className} style={{ position: 'relative' }}>{children}</nav></NavMenuContext.Provider>;
};

export const NavigationMenuList: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <ul className={className} style={{ display: 'flex', gap: 4, listStyle: 'none', margin: 0, padding: 0 }}>{children}</ul>
);

export const NavigationMenuItem: React.FC<{ children: React.ReactNode; className?: string; value?: string }> = ({ children, className }) => (
  <li className={className} style={{ position: 'relative' }}>{children}</li>
);

export const NavigationMenuTrigger: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <button className={className} style={{ padding: '8px 12px', background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, fontFamily: 'var(--ld-semantic-font-family-sans)' }}>{children}</button>
);

export const NavigationMenuContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={className} style={{ position: 'absolute', top: '100%', left: 0, background: '#fff', border: '1px solid #e6e6e8', borderRadius: 4, boxShadow: '0 2px 8px rgba(0,0,0,0.15)', padding: 16, minWidth: 200, zIndex: 50 }}>{children}</div>
);

export const NavigationMenuLink: React.FC<{ children: React.ReactNode; className?: string; href?: string; asChild?: boolean }> = ({ children, className, href }) => (
  <a className={className} href={href} style={{ display: 'block', padding: '8px 12px', textDecoration: 'none', color: 'inherit', fontSize: 14 }}>{children}</a>
);

export const NavigationMenuIndicator: React.FC<{ className?: string }> = ({ className }) => <div className={className} />;
export const NavigationMenuViewport: React.FC<{ className?: string }> = ({ className }) => <div className={className} />;

export const navigationMenuTriggerStyle = () => '';

export default NavigationMenu;
