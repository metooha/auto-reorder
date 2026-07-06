import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';

const sidebarItems = [
  { id: 'home', icon: 'home' },
  { id: 'catalog', icon: 'catalog', active: true, children: [{ id: 'sub1', active: true }, { id: 'sub2' }, { id: 'sub3' }] },
  { id: 'pricing', icon: 'pricing' },
  { id: 'orders', icon: 'orders' },
  { id: 'wfs', icon: 'wfs' },
  { id: 'payments', icon: 'payments' },
  { id: 'performance', icon: 'performance' },
  { id: 'analytics', icon: 'analytics' },
  { id: 'growth', icon: 'growth' },
  { id: 'advertising', icon: 'advertising' },
  { id: 'apps', icon: 'apps' },
];

export function CatalogSidebar() {
  const [collapsed] = useState(true);

  return (
    <nav
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        borderRight: '1px solid var(--ld-semantic-color-separator, #E3E4E5)',
        background: 'var(--ld-semantic-color-fill, #FFFFFF)',
        alignSelf: 'stretch',
        width: 64,
        flexShrink: 0,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
        {sidebarItems.map((item) => (
          <React.Fragment key={item.id}>
            <SideNavIcon id={item.id} icon={item.icon} active={item.active && !item.children} />
            {item.children?.map((child) => (
              <ChildDot key={child.id} active={child.active} />
            ))}
          </React.Fragment>
        ))}
      </div>

      {/* Expand control */}
      <Button
        variant="tertiary"
        UNSAFE_className="p-2.5 min-h-0 h-auto"
        aria-label="Expand navigation"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 1.99902L5 1.99902L5 7.51367L10.3662 7.51269L8.38672 5.4082L9.12305 4.75L11.8691 7.6709C12.0439 7.85698 12.0439 8.14302 11.8691 8.3291L9.12305 11.25L8.38672 10.5918L10.3662 8.48633L5 8.4873L5 14H4L4 1.99902Z" fill="currentColor"/>
        </svg>
      </Button>
    </nav>
  );
}

function SideNavIcon({ id, icon, active }: { id: string; icon: string; active?: boolean }) {
  return (
    <div
      style={{
        display: 'flex',
        height: 36,
        padding: '0 12px',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        background: active ? 'var(--ld-semantic-color-fill-surface-subtle, #F8F8F8)' : 'var(--ld-semantic-color-fill, #FFFFFF)',
        cursor: 'pointer',
      }}
    >
      <PlaceholderIcon />
    </div>
  );
}

function ChildDot({ active }: { active?: boolean }) {
  return (
    <div style={{ display: 'flex', width: 40, justifyContent: 'center', alignItems: 'center' }}>
      <svg width="36" height="28" viewBox="0 0 36 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        {active ? (
          <circle cx="18" cy="14" r="3" fill="var(--ld-semantic-color-text-brand, #0053E2)" />
        ) : (
          <circle cx="18" cy="14" r="2.5" stroke="var(--ld-semantic-color-text, #2E2F32)" />
        )}
      </svg>
    </div>
  );
}

function PlaceholderIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1" fill="none" />
      <line x1="1" y1="1" x2="15" y2="15" stroke="currentColor" strokeWidth="0.75" />
      <line x1="15" y1="1" x2="1" y2="15" stroke="currentColor" strokeWidth="0.75" />
    </svg>
  );
}
