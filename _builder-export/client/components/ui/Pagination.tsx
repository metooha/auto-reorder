import React from 'react';

export const Pagination: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <nav className={className} role="navigation" aria-label="pagination" style={{ display: 'flex', justifyContent: 'center' }}>{children}</nav>
);

export const PaginationContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <ul className={className} style={{ display: 'flex', gap: 4, listStyle: 'none', margin: 0, padding: 0, alignItems: 'center' }}>{children}</ul>
);

export const PaginationItem: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <li className={className}>{children}</li>
);

export const PaginationLink: React.FC<{ children: React.ReactNode; className?: string; isActive?: boolean; href?: string; onClick?: () => void; size?: string }> = ({ children, className, isActive, onClick }) => (
  <button className={className} onClick={onClick} aria-current={isActive ? 'page' : undefined} style={{ padding: '6px 12px', border: '1px solid #e6e6e8', borderRadius: 4, background: isActive ? 'var(--ld-semantic-color-action-fill-primary, #0071DC)' : '#fff', color: isActive ? '#fff' : 'inherit', cursor: 'pointer', fontSize: 14 }}>
    {children}
  </button>
);

export const PaginationPrevious: React.FC<{ className?: string; onClick?: () => void; href?: string }> = ({ className, onClick }) => (
  <button className={className} onClick={onClick} style={{ padding: '6px 12px', border: '1px solid #e6e6e8', borderRadius: 4, cursor: 'pointer', fontSize: 14 }}>Previous</button>
);

export const PaginationNext: React.FC<{ className?: string; onClick?: () => void; href?: string }> = ({ className, onClick }) => (
  <button className={className} onClick={onClick} style={{ padding: '6px 12px', border: '1px solid #e6e6e8', borderRadius: 4, cursor: 'pointer', fontSize: 14 }}>Next</button>
);

export const PaginationEllipsis: React.FC<{ className?: string }> = ({ className }) => (
  <span className={className} style={{ padding: '6px 8px' }}>…</span>
);

export default Pagination;
