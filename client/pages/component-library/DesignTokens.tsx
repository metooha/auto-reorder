import React from 'react';
import { Button } from '@/components/ui/Button';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';

// ─── Token data ─────────────────────────────────────────────────────────────
// All tokens listed here are actively referenced across component CSS modules
// and TSX files in this project (as of last audit).

const COLOR_GROUPS = [
  {
    category: 'Text',
    description: 'Used for all text, labels, headings and icon fills.',
    tokens: [
      { name: '--ld-semantic-color-text', description: 'Default body text' },
      { name: '--ld-semantic-color-text-primary', description: 'Primary text — highest contrast' },
      { name: '--ld-semantic-color-text-secondary', description: 'Secondary / subdued text' },
      { name: '--ld-semantic-color-text-tertiary', description: 'Tertiary / faint text' },
      { name: '--ld-semantic-color-text-subtle', description: 'Muted text for descriptions' },
      { name: '--ld-semantic-color-text-subtlest', description: 'Faintest text (separators, meta)' },
      { name: '--ld-semantic-color-text-disabled', description: 'Disabled state text' },
      { name: '--ld-semantic-color-text-brand', description: 'Brand blue text' },
      { name: '--ld-semantic-color-text-brand-bold', description: 'Bold brand navy — headers, nav' },
      { name: '--ld-semantic-color-text-inverse', description: 'Light text on dark surfaces' },
      { name: '--ld-semantic-color-text-inverted', description: 'Alternate inverted text (tooltips)' },
      { name: '--ld-semantic-color-text-positive', description: 'Success / positive feedback' },
      { name: '--ld-semantic-color-text-warning', description: 'Warning state text' },
      { name: '--ld-semantic-color-text-negative', description: 'Error / destructive text' },
      { name: '--ld-semantic-color-text-accent-red', description: 'Red accent text' },
      { name: '--ld-semantic-color-text-accent-green', description: 'Green accent text' },
      { name: '--ld-semantic-color-text-accent-spark', description: 'Amber / spark accent text' },
      { name: '--ld-semantic-color-text-accent-purple', description: 'Purple accent text' },
      { name: '--ld-semantic-color-text-onfill-brand', description: 'Text rendered on brand fills' },
      { name: '--ld-semantic-color-text-onfill-inverse', description: 'Text rendered on inverse fills' },
      { name: '--ld-semantic-color-text-onfill-accent-blue-subtle', description: 'Text on blue subtle fills' },
      { name: '--ld-semantic-color-text-on-fill-primary', description: 'Text on primary action fills' },
    ]
  },
  {
    category: 'Fill / Background',
    description: 'Surface fills, card backgrounds, and state overlays.',
    tokens: [
      { name: '--ld-semantic-color-fill', description: 'Default generic fill' },
      { name: '--ld-semantic-color-fill-subtle', description: 'Subtle background tint' },
      { name: '--ld-semantic-color-fill-hovered', description: 'Generic hovered fill' },
      { name: '--ld-semantic-color-fill-surface-primary', description: 'Primary card / panel surface' },
      { name: '--ld-semantic-color-fill-surface-secondary', description: 'Secondary surface layer' },
      { name: '--ld-semantic-color-fill-surface-tertiary', description: 'Tertiary surface / inset areas' },
      { name: '--ld-semantic-color-fill-surface-hover', description: 'Surface hover state fill' },
      { name: '--ld-semantic-color-fill-brand-subtle', description: 'Brand tinted bg (hero, subnav)' },
      { name: '--ld-semantic-color-fill-info-subtle', description: 'Info alert background' },
      { name: '--ld-semantic-color-fill-success-subtle', description: 'Success alert background' },
      { name: '--ld-semantic-color-fill-warning-subtle', description: 'Warning alert background' },
      { name: '--ld-semantic-color-fill-error-subtle', description: 'Error alert background' },
    ]
  },
  {
    category: 'Surface & Overlay',
    description: 'Modal backdrops, tooltips, sticky surfaces.',
    tokens: [
      { name: '--ld-semantic-color-surface', description: 'Base white surface' },
      { name: '--ld-semantic-color-surface-primary', description: 'Sticky / elevated surface' },
      { name: '--ld-semantic-color-surface-activated', description: 'Selected nav / tab surface' },
      { name: '--ld-semantic-color-surface-overlay', description: 'Dialog / sheet surface' },
      { name: '--ld-semantic-color-surface-inverted', description: 'Dark tooltip surface' },
      { name: '--ld-semantic-color-scrim', description: 'Modal backdrop overlay' },
    ]
  },
  {
    category: 'Border & Separator',
    description: 'Borders, dividers, and separators between content.',
    tokens: [
      { name: '--ld-semantic-color-border', description: 'Default border' },
      { name: '--ld-semantic-color-border-subtle', description: 'Light / de-emphasised border' },
      { name: '--ld-semantic-color-border-strong', description: 'Strong / high-contrast border' },
      { name: '--ld-semantic-color-border-brand', description: 'Brand blue border' },
      { name: '--ld-semantic-color-border-disabled', description: 'Disabled state border' },
      { name: '--ld-semantic-color-border-info', description: 'Info state border' },
      { name: '--ld-semantic-color-border-negative', description: 'Error/danger border' },
      { name: '--ld-semantic-color-border-positive', description: 'Success border' },
      { name: '--ld-semantic-color-border-warning', description: 'Warning state border' },
      { name: '--ld-semantic-color-separator', description: 'Horizontal / vertical separators' },
    ]
  },
  {
    category: 'Action (Buttons)',
    description: 'Primary, secondary, tertiary, and destructive button tokens.',
    tokens: [
      { name: '--ld-semantic-color-action-fill-primary', description: 'Primary button background' },
      { name: '--ld-semantic-color-action-fill-primary-hovered', description: 'Primary button hover' },
      { name: '--ld-semantic-color-action-fill-primary-pressed', description: 'Primary button pressed' },
      { name: '--ld-semantic-color-action-fill-primary-disabled', description: 'Primary button disabled' },
      { name: '--ld-semantic-color-action-fill-secondary', description: 'Secondary button background' },
      { name: '--ld-semantic-color-action-fill-secondary-hovered', description: 'Secondary button hover' },
      { name: '--ld-semantic-color-action-fill-secondary-pressed', description: 'Secondary button pressed' },
      { name: '--ld-semantic-color-action-fill-tertiary', description: 'Tertiary button background' },
      { name: '--ld-semantic-color-action-fill-tertiary-hovered', description: 'Tertiary button hover' },
      { name: '--ld-semantic-color-action-fill-negative', description: 'Destructive button background' },
      { name: '--ld-semantic-color-action-fill-negative-hovered', description: 'Destructive button hover' },
      { name: '--ld-semantic-color-action-border-secondary', description: 'Secondary button border' },
      { name: '--ld-semantic-color-action-border-tertiary', description: 'Tertiary button border' },
      { name: '--ld-semantic-color-action-text-on-fill-primary', description: 'Text on primary button' },
      { name: '--ld-semantic-color-action-text-on-fill-secondary', description: 'Text on secondary button' },
      { name: '--ld-semantic-color-action-text-on-fill-tertiary', description: 'Text on tertiary button' },
      { name: '--ld-semantic-color-action-focus-outline', description: 'Keyboard focus ring' },
    ]
  },
  {
    category: 'Input (Checkbox & Radio)',
    description: 'All interactive checkbox and radio button state tokens.',
    tokens: [
      { name: '--ld-semantic-color-input-fill-hovered', description: 'Input hover fill' },
      { name: '--ld-semantic-color-input-border-hovered', description: 'Input hover border' },
      { name: '--ld-semantic-color-input-fill-focused', description: 'Input focus fill' },
      { name: '--ld-semantic-color-input-border-focused', description: 'Input focus border' },
      { name: '--ld-semantic-color-input-fill-pressed', description: 'Input pressed fill' },
      { name: '--ld-semantic-color-input-border-pressed', description: 'Input pressed border' },
      { name: '--ld-semantic-color-input-border-disabled', description: 'Input disabled border' },
      { name: '--ld-semantic-color-input-fill-activated', description: 'Checked / selected fill' },
      { name: '--ld-semantic-color-input-border-activated', description: 'Checked / selected border' },
      { name: '--ld-semantic-color-input-fill-activated-hovered', description: 'Checked hover fill' },
      { name: '--ld-semantic-color-input-border-activated-hovered', description: 'Checked hover border' },
      { name: '--ld-semantic-color-input-fill-activated-focused', description: 'Checked focus fill' },
      { name: '--ld-semantic-color-input-border-activated-focused', description: 'Checked focus border' },
      { name: '--ld-semantic-color-input-fill-activated-pressed', description: 'Checked pressed fill' },
      { name: '--ld-semantic-color-input-border-activated-pressed', description: 'Checked pressed border' },
      { name: '--ld-semantic-color-input-fill-activated-disabled', description: 'Checked disabled fill' },
      { name: '--ld-semantic-color-input-border-activated-disabled', description: 'Checked disabled border' },
      { name: '--ld-semantic-color-input-indicator-activated', description: 'Radio indicator dot (white)' },
    ]
  },
  {
    category: 'Field (Text Inputs)',
    description: 'Text field, select, and textarea border + fill tokens.',
    tokens: [
      { name: '--ld-semantic-color-field-fill', description: 'Input field background' },
      { name: '--ld-semantic-color-field-fill-disabled', description: 'Disabled field background' },
      { name: '--ld-semantic-color-field-border', description: 'Input field border' },
      { name: '--ld-semantic-color-field-border-hovered', description: 'Field border on hover' },
      { name: '--ld-semantic-color-field-border-focused', description: 'Field border on focus' },
      { name: '--ld-semantic-color-field-border-disabled', description: 'Disabled field border' },
      { name: '--ld-semantic-color-field-border-negative', description: 'Error state field border' },
      { name: '--ld-semantic-color-field-text-on-fill', description: 'Text inside field' },
      { name: '--ld-semantic-color-field-text-on-fill-disabled', description: 'Disabled field text' },
      { name: '--ld-semantic-color-field-text-subtle-on-fill', description: 'Field leading icon color' },
    ]
  },
  {
    category: 'Link',
    description: 'Text link states.',
    tokens: [
      { name: '--ld-semantic-color-link-text', description: 'Default link color' },
      { name: '--ld-semantic-color-link-text-hovered', description: 'Link hover state' },
      { name: '--ld-semantic-color-link-text-pressed', description: 'Link pressed state' },
      { name: '--ld-semantic-color-link-text-subtle', description: 'Subtle / gray link' },
      { name: '--ld-semantic-color-link-text-subtle-hovered', description: 'Subtle link hover' },
      { name: '--ld-semantic-color-link-text-subtle-focused', description: 'Subtle link focus' },
      { name: '--ld-semantic-color-link-text-subtle-pressed', description: 'Subtle link pressed' },
    ]
  },
  {
    category: 'Loading / Skeleton',
    description: 'Skeleton placeholder and AI/magic shimmer colors.',
    tokens: [
      { name: '--ld-semantic-color-loading-subtle', description: 'Skeleton base color' },
      { name: '--ld-semantic-color-loading-subtlest', description: 'Faintest skeleton tint' },
      { name: '--ld-semantic-color-loading-magic-subtle', description: 'AI skeleton base' },
      { name: '--ld-semantic-color-loading-magic', description: 'AI skeleton highlight shimmer' },
    ]
  },
  {
    category: 'Page Navigation',
    description: 'Side navigation item fills and text.',
    tokens: [
      { name: '--ld-semantic-color-page-nav-fill', description: 'Nav item default background' },
      { name: '--ld-semantic-color-page-nav-text-on-fill', description: 'Nav item default text' },
      { name: '--ld-semantic-color-page-nav-fill-hovered', description: 'Nav item hover background' },
      { name: '--ld-semantic-color-page-nav-fill-pressed', description: 'Nav item pressed background' },
      { name: '--ld-semantic-color-page-nav-fill-activated', description: 'Active nav item background' },
      { name: '--ld-semantic-color-page-nav-text-on-fill-activated', description: 'Active nav item text' },
    ]
  },
  {
    category: 'Notice / Toast',
    description: 'Snackbar and toast notification fills.',
    tokens: [
      { name: '--ld-semantic-color-notice-fill-info', description: 'Info snackbar background' },
      { name: '--ld-semantic-color-notice-fill-positive', description: 'Success snackbar background' },
      { name: '--ld-semantic-color-notice-fill-negative', description: 'Error snackbar background' },
      { name: '--ld-semantic-color-notice-fill-warning', description: 'Warning snackbar background' },
      { name: '--ld-semantic-color-notice-text-on-fill-info', description: 'Text on info snackbar' },
      { name: '--ld-semantic-color-notice-text-on-fill-positive', description: 'Text on success snackbar' },
      { name: '--ld-semantic-color-notice-text-on-fill-negative', description: 'Text on error snackbar' },
      { name: '--ld-semantic-color-notice-text-on-fill-warning', description: 'Text on warning snackbar' },
    ]
  },
];

const NON_COLOR_GROUPS = [
  {
    category: 'Typography',
    description: 'Font families, sizes, weights, and line heights.',
    tokens: [
      { name: '--ld-semantic-font-family-sans', value: 'Everyday Sans UI, system-ui, sans-serif', description: 'Primary sans-serif font' },
      { name: '--ld-semantic-font-body-small-size', value: '14px', description: 'Small body text' },
      { name: '--ld-semantic-font-body-small-lineheight', value: '20px', description: 'Small body line height' },
      { name: '--ld-semantic-font-body-small-weight-default', value: '400', description: 'Small body regular weight' },
      { name: '--ld-semantic-font-body-small-weight-alt', value: '700', description: 'Small body bold weight' },
      { name: '--ld-semantic-font-body-medium-size', value: '16px', description: 'Medium body text' },
      { name: '--ld-semantic-font-body-medium-lineheight', value: '24px', description: 'Medium body line height' },
      { name: '--ld-semantic-font-heading-small-size', value: '18px', description: 'Small heading' },
      { name: '--ld-semantic-font-heading-medium-size', value: '20px', description: 'Medium heading' },
      { name: '--ld-semantic-font-heading-large-size', value: '24px', description: 'Large heading' },
      { name: '--ld-semantic-font-caption-family', value: 'Everyday Sans UI, system-ui', description: 'Caption font (form labels)' },
      { name: '--ld-semantic-font-caption-lineheight', value: '16px', description: 'Caption line height' },
    ]
  },
  {
    category: 'Spacing',
    description: 'Standard spacing scale used for padding, margin, and gap.',
    tokens: [
      { name: '--ld-semantic-spacing-1', value: '4px', description: 'Extra-small spacing' },
      { name: '--ld-semantic-spacing-2', value: '8px', description: 'Small spacing' },
      { name: '--ld-semantic-spacing-3', value: '12px', description: 'Medium spacing' },
      { name: '--ld-semantic-spacing-4', value: '16px', description: 'Large spacing' },
      { name: '--ld-semantic-spacing-5', value: '24px', description: 'Extra-large spacing' },
      { name: '--ld-semantic-spacing-6', value: '32px', description: 'XXL spacing' },
      { name: '--ld-semantic-spacing-7', value: '48px', description: 'XXXL spacing' },
    ]
  },
  {
    category: 'Elevation',
    description: 'Box shadows for cards, popovers, and modals.',
    tokens: [
      { name: '--ld-semantic-elevation-100', value: '0 1px 3px rgba(0,0,0,0.08)', description: 'Low — cards, subtle lift' },
      { name: '--ld-semantic-elevation-200', value: '0px 4px 16px rgba(0,0,0,0.12)', description: 'Medium — popovers, dropdowns' },
      { name: '--ld-semantic-elevation-300', value: '0px 8px 32px rgba(0,0,0,0.16)', description: 'High — modals, dialogs' },
    ]
  },
  {
    category: 'Border Radius',
    description: 'Rounded corner values for components.',
    tokens: [
      { name: '--ld-semantic-border-radius-small', value: '4px', description: 'Small — chips, tags, badges' },
      { name: '--ld-semantic-border-radius-medium', value: '8px', description: 'Medium — cards, inputs, panels' },
      { name: '--ld-semantic-border-radius-large', value: '12px', description: 'Large — dialogs, sheets' },
      { name: 'Button border radius (pill)', value: '9999px', description: 'Pill shape — all buttons' },
    ]
  },
];

// ─── Components ─────────────────────────────────────────────────────────────

function ColorRow({ name, description, compact }: { name: string; description: string; compact: boolean }) {
  const [copied, setCopied] = React.useState(false);

  const copy = () => {
    navigator.clipboard.writeText(`var(${name})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const swatchSize = compact ? 20 : 40;
  const pad = compact ? '4px 8px' : '10px 12px';
  const gap = compact ? '8px' : '12px';
  const nameSize = compact ? '11px' : '12px';

  return (
    <div
      onClick={copy}
      title={`Click to copy var(${name})`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap,
        padding: pad,
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background 150ms',
      }}
      onMouseEnter={e => (e.currentTarget.style.background = 'var(--ld-semantic-color-fill-surface-secondary, #f5f5f6)')}
      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
    >
      <div
        style={{
          width: `${swatchSize}px`,
          height: `${swatchSize}px`,
          borderRadius: compact ? '4px' : '6px',
          background: `var(${name})`,
          flexShrink: 0,
          border: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
        }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <code style={{
          display: 'block',
          fontSize: nameSize,
          fontFamily: 'monospace',
          fontWeight: 600,
          color: 'var(--ld-semantic-color-text-primary, #2e2f32)',
          marginBottom: compact ? 0 : '2px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {name}
        </code>
        {!compact && (
          <span style={{ fontSize: '11px', color: 'var(--ld-semantic-color-text-subtle, #74767c)' }}>
            {description}
          </span>
        )}
      </div>
      {copied && (
        <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--ld-semantic-color-action-fill-primary, #0053e2)', flexShrink: 0 }}>
          Copied!
        </span>
      )}
    </div>
  );
}

function ValueRow({ name, value, description, compact }: { name: string; value: string; description: string; compact: boolean }) {
  const [copied, setCopied] = React.useState(false);

  const copy = () => {
    navigator.clipboard.writeText(name.startsWith('--') ? `var(${name})` : value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const pad = compact ? '4px 8px' : '10px 12px';
  const nameSize = compact ? '11px' : '12px';

  return (
    <div
      onClick={copy}
      title={`Click to copy ${name.startsWith('--') ? `var(${name})` : value}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: compact ? '8px' : '16px',
        padding: pad,
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background 150ms',
      }}
      onMouseEnter={e => (e.currentTarget.style.background = 'var(--ld-semantic-color-fill-surface-secondary, #f5f5f6)')}
      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <code style={{
          display: 'block',
          fontSize: nameSize,
          fontFamily: 'monospace',
          fontWeight: 600,
          color: 'var(--ld-semantic-color-text-primary, #2e2f32)',
          marginBottom: compact ? 0 : '2px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {name}
        </code>
        {!compact && (
          <span style={{ fontSize: '11px', color: 'var(--ld-semantic-color-text-subtle, #74767c)' }}>
            {description}
          </span>
        )}
      </div>
      <code style={{
        fontSize: compact ? '10px' : '11px',
        fontFamily: 'monospace',
        color: 'var(--ld-semantic-color-text-secondary, #74767c)',
        background: 'var(--ld-semantic-color-fill-surface-tertiary, #f0f0f1)',
        padding: '2px 6px',
        borderRadius: '4px',
        flexShrink: 0,
        whiteSpace: 'nowrap',
      }}>
        {value}
      </code>
      {copied && (
        <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--ld-semantic-color-action-fill-primary, #0053e2)', flexShrink: 0 }}>
          Copied!
        </span>
      )}
    </div>
  );
}

function Section({ title, description, count, compact, children }: {
  title: string;
  description: string;
  count: number;
  compact: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(true);

  return (
    <div style={{ marginBottom: compact ? '16px' : '32px' }}>
      {/* Section header */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          background: 'none',
          border: 'none',
          padding: compact ? '0 0 6px' : '0 0 12px',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <div>
          <h3 style={{
            fontSize: compact ? '13px' : '16px',
            fontWeight: 700,
            fontFamily: 'var(--ld-semantic-font-family-sans)',
            color: 'var(--ld-semantic-color-text-primary, #2e2f32)',
            margin: 0,
          }}>
            {title}
            <span style={{
              marginLeft: '8px',
              fontSize: '11px',
              fontWeight: 400,
              color: 'var(--ld-semantic-color-text-subtle, #74767c)',
            }}>
              {count}
            </span>
          </h3>
          {!compact && (
            <p style={{
              fontSize: '13px',
              color: 'var(--ld-semantic-color-text-subtle, #74767c)',
              margin: '2px 0 0',
              fontFamily: 'var(--ld-semantic-font-family-sans)',
            }}>
              {description}
            </p>
          )}
        </div>
        <span style={{
          fontSize: compact ? '16px' : '20px',
          color: 'var(--ld-semantic-color-text-subtle, #74767c)',
          transform: open ? 'rotate(0deg)' : 'rotate(-90deg)',
          transition: 'transform 200ms',
        }}>
          ▾
        </span>
      </button>

      {open && (
        <div style={{
          background: 'var(--ld-semantic-color-fill-surface-primary, #fff)',
          borderRadius: compact ? '6px' : '8px',
          border: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
          overflow: 'hidden',
          padding: compact ? '2px' : '4px',
          display: 'grid',
          gridTemplateColumns: compact
            ? 'repeat(auto-fill, minmax(240px, 1fr))'
            : 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1px',
        }}>
          {children}
        </div>
      )}
    </div>
  );
}

// ─── Standalone content (for embedding in Foundations page) ─────────────────

const DENSITY_KEY = 'cl-token-density';

export function DesignTokensContent() {
  const totalColor = COLOR_GROUPS.reduce((s, g) => s + g.tokens.length, 0);
  const totalOther = NON_COLOR_GROUPS.reduce((s, g) => s + g.tokens.length, 0);
  const [compact, setCompact] = React.useState(() => {
    try { return localStorage.getItem(DENSITY_KEY) === 'compact'; } catch { return true; }
  });

  const toggleDensity = () => {
    setCompact(prev => {
      const next = !prev;
      try { localStorage.setItem(DENSITY_KEY, next ? 'compact' : 'default'); } catch { /* */ }
      return next;
    });
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div>
      {/* Toolbar: quick nav + density toggle */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        margin: '24px 0 32px',
        alignItems: 'center',
      }}>
        <Button variant="secondary" size="small" onClick={() => scrollTo('color-tokens')}>
          Colors ({totalColor})
        </Button>
        <Button variant="secondary" size="small" onClick={() => scrollTo('other-tokens')}>
          Typography & Spacing ({totalOther})
        </Button>
        <div style={{ flex: 1 }} />
        <Button variant="tertiary" size="small" onClick={toggleDensity}>
          {compact ? 'Expanded view' : 'Compact view'}
        </Button>
      </div>

      {/* ── Color tokens ── */}
      <div id="color-tokens">
        <h2 style={{
          fontSize: compact ? '18px' : '22px',
          fontWeight: 700,
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary, #2e2f32)',
          marginBottom: compact ? '12px' : '24px',
        }}>
          Color Tokens
        </h2>

        {COLOR_GROUPS.map(group => (
          <Section
            key={group.category}
            title={group.category}
            description={group.description}
            count={group.tokens.length}
            compact={compact}
          >
            {group.tokens.map(t => (
              <ColorRow key={t.name} name={t.name} description={t.description} compact={compact} />
            ))}
          </Section>
        ))}
      </div>

      {/* ── Non-color tokens ── */}
      <div id="other-tokens" style={{ marginTop: compact ? '24px' : '48px' }}>
        <h2 style={{
          fontSize: compact ? '18px' : '22px',
          fontWeight: 700,
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary, #2e2f32)',
          marginBottom: compact ? '12px' : '24px',
        }}>
          Typography, Spacing, Elevation & Border Radius
        </h2>

        {NON_COLOR_GROUPS.map(group => (
          <Section
            key={group.category}
            title={group.category}
            description={group.description}
            count={group.tokens.length}
            compact={compact}
          >
            {group.tokens.map(t => (
              <ValueRow key={t.name} name={t.name} value={t.value} description={t.description} compact={compact} />
            ))}
          </Section>
        ))}
      </div>
    </div>
  );
}

// ─── Page (standalone route, kept for backwards compat) ─────────────────────

export default function DesignTokensPage() {
  const totalColor = COLOR_GROUPS.reduce((s, g) => s + g.tokens.length, 0);
  const totalOther = NON_COLOR_GROUPS.reduce((s, g) => s + g.tokens.length, 0);

  return (
    <ComponentPageLayout
      section="Foundation"
      title="Project Token Usage"
      description={`All ${totalColor + totalOther} semantic tokens actively referenced across component CSS and TSX files in this project. Click any token to copy it.`}
    >
      <DesignTokensContent />
    </ComponentPageLayout>
  );
}
