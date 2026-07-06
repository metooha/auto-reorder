import React from 'react';
import { Button } from '@/components/ui/Button';

export function ComponentUsageTab() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingTop: '24px' }}>
      <div style={{
        backgroundColor: 'var(--ld-semantic-color-surface)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          color: 'var(--ld-semantic-color-text)',
          marginBottom: '24px'
        }}>
          Button Hierarchy
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {[
            { variant: 'primary' as const, label: 'Primary', desc: 'Main action', detail: 'Only one per section/page. Most important action user should take.' },
            { variant: 'secondary' as const, label: 'Secondary', desc: 'Supporting actions', detail: 'Can have multiple. Use for cancel, back, or alternative actions.' },
            { variant: 'tertiary' as const, label: 'Tertiary', desc: 'Low priority', detail: 'Subtle actions, less emphasis. Use sparingly.' },
            { variant: 'destructive' as const, label: 'Delete', desc: 'Destructive actions', detail: 'Delete, remove, cancel operations. Always confirm first.', bg: 'var(--ld-semantic-color-fill-negative-subtle)' },
          ].map((btn) => (
            <div key={btn.variant} style={{
              display: 'grid',
              gridTemplateColumns: '200px 1fr',
              gap: '16px',
              alignItems: 'center',
              padding: '16px',
              backgroundColor: btn.bg || 'var(--ld-semantic-color-fill-subtle)',
              borderRadius: '6px'
            }}>
              <Button variant={btn.variant} size="medium">{btn.label}</Button>
              <div style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text-subtle)' }}>
                <strong>{btn.desc}</strong> - {btn.detail}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        backgroundColor: 'var(--ld-semantic-color-surface)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          color: 'var(--ld-semantic-color-text)',
          marginBottom: '24px'
        }}>
          When to Use Each Component
        </h3>
        <div style={{
          display: 'grid',
          gap: '12px',
          fontSize: '14px'
        }}>
          {[
            { name: 'Alerts', usage: 'Page-level or section-level messages for info, success, warning, error states' },
            { name: 'Badges', usage: 'Count indicators, status labels, notification dots on buttons or icons' },
            { name: 'Breadcrumbs', usage: 'Navigation trail showing current page hierarchy (2-5 levels)' },
            { name: 'Callouts', usage: 'Contextual coaching tips, onboarding guidance, or feature highlights' },
            { name: 'Cards', usage: 'Grouping related content with headers, actions, and content areas' },
            { name: 'Chips', usage: 'Selectable categories or filters (single or multi-select)' },
            { name: 'Content Messages', usage: 'Full-page states: empty, error, no permission, loading' },
            { name: 'Date Fields', usage: 'Text input for dates with mm/dd/yyyy validation' },
            { name: 'Modals', usage: 'Focused interactions requiring user attention or confirmation' },
            { name: 'Nudges', usage: 'Non-critical supportive information with optional actions' },
            { name: 'Text Fields', usage: 'Single-line text input for names, emails, search, etc.' },
            { name: 'Text Area', usage: 'Multi-line text input for descriptions, comments, notes' },
            { name: 'QuantityStepper', usage: 'Increment/decrement control for cart quantities. Use with CartContext for real-time count updates.' },
            { name: 'HeartView', usage: 'Favorite/wishlist toggle. Always position on the right side of product tiles.' },
            { name: 'WCPFlag', usage: 'Product badges (Clearance, Bestseller, Rollback). Clearance always uses "urgent" variant.' },
            { name: 'ItemTile', usage: 'Product tile for carousels and grids. No hover states on container — only interactive elements respond.' },
          ].map((item) => (
            <div
              key={item.name}
              style={{
                padding: '16px',
                backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                borderRadius: '6px',
                display: 'grid',
                gridTemplateColumns: '180px 1fr',
                gap: '16px',
                alignItems: 'center'
              }}
            >
              <strong style={{ color: 'var(--ld-semantic-color-text)' }}>{item.name}</strong>
              <span style={{ color: 'var(--ld-semantic-color-text-subtle)', lineHeight: '1.6' }}>
                {item.usage}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Carousel & Overflow Rules */}
      <div style={{
        backgroundColor: 'var(--ld-semantic-color-surface)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          color: 'var(--ld-semantic-color-text)',
          marginBottom: '24px'
        }}>
          Carousel & Interactive Frame Rules
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
          {[
            {
              title: 'Tooltip clipping prevention',
              detail: 'All scrollable containers (carousels, horizontal scroll rows) must use overflow-y: visible with padding/margin compensation so tooltips and callouts are never clipped.',
              code: '.scrollRow { overflow-x: auto; overflow-y: visible; padding: 40px 0; margin: -40px 0; }',
            },
            {
              title: 'No hover states on tile containers',
              detail: 'Product tiles and item cards should NOT have hover/transition effects on the container. Only interactive elements (buttons, heart icons) should respond to user interaction.',
            },
            {
              title: 'Tile sizing in carousels',
              detail: 'Use flex-based sizing (flex: 0 0 calc((100% - gap) / N)) to show a fixed number of tiles. Responsive: 6 at desktop, 4 at 1024px, 3 at 768px, ~2.3 at 480px.',
            },
          ].map((rule, i) => (
            <div key={i} style={{
              padding: '16px',
              backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
              borderRadius: '6px',
              borderLeft: '4px solid var(--ld-semantic-color-border-brand)',
            }}>
              <strong style={{ color: 'var(--ld-semantic-color-text)' }}>{rule.title}</strong>
              <div style={{ color: 'var(--ld-semantic-color-text-subtle)', marginTop: '4px', lineHeight: '1.6' }}>
                {rule.detail}
              </div>
              {'code' in rule && rule.code && (
                <code style={{
                  display: 'block',
                  marginTop: '8px',
                  padding: '8px 12px',
                  backgroundColor: 'var(--ld-semantic-color-surface)',
                  borderRadius: '4px',
                  fontFamily: 'var(--ld-semantic-font-family-mono)',
                  fontSize: '12px',
                  color: 'var(--ld-semantic-color-text)',
                  border: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
                }}>
                  {rule.code}
                </code>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
