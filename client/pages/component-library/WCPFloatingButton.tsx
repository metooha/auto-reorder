import React from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { IconButton } from '@/components/ui/IconButton';
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Search,
  Star,
  X,
} from '@/components/icons';

const sectionStyle: React.CSSProperties = {
  backgroundColor: 'var(--ld-semantic-color-surface)',
  padding: '32px',
  borderRadius: '8px',
  boxShadow: 'var(--ld-semantic-elevation-100)',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
};

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--ld-semantic-font-family-sans)',
  fontSize: '11px',
  fontWeight: 600,
  color: 'var(--ld-semantic-color-text-subtle)',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  marginBottom: '8px',
};

const rowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '16px',
};

function SectionLabel({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ ...labelStyle, ...style }}>{children}</div>;
}

export default function WCPFloatingButtonPage() {
  return (
    <ComponentPageLayout
      section="WCP Components"
      title="Floating Button"
      description="A circular elevated icon button used for carousel controls and floating action scenarios. Use IconButton with the floating prop — it applies LD 3.5 secondary action tokens with an elevation box-shadow."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

        {/* Sizes */}
        <div style={sectionStyle}>
          <h2 style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: '18px', fontWeight: 700, margin: 0, color: 'var(--ld-semantic-color-text)' }}>
            Sizes
          </h2>
          <div>
            <SectionLabel>Small (24–32px)</SectionLabel>
            <div style={rowStyle}>
              <IconButton floating size="small" aria-label="Previous">
                <ArrowLeft width={16} height={16} />
              </IconButton>
              <IconButton floating size="small" aria-label="Next">
                <ArrowRight width={16} height={16} />
              </IconButton>
            </div>
          </div>
          <div>
            <SectionLabel>Medium (32–40px) — default</SectionLabel>
            <div style={rowStyle}>
              <IconButton floating size="medium" aria-label="Previous">
                <ArrowLeft />
              </IconButton>
              <IconButton floating size="medium" aria-label="Next">
                <ArrowRight />
              </IconButton>
            </div>
          </div>
          <div>
            <SectionLabel>Large (40px)</SectionLabel>
            <div style={rowStyle}>
              <IconButton floating size="large" aria-label="Previous">
                <ArrowLeft width={32} height={32} />
              </IconButton>
              <IconButton floating size="large" aria-label="Next">
                <ArrowRight width={32} height={32} />
              </IconButton>
            </div>
          </div>
        </div>

        {/* States */}
        <div style={sectionStyle}>
          <h2 style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: '18px', fontWeight: 700, margin: 0, color: 'var(--ld-semantic-color-text)' }}>
            States
          </h2>
          <div>
            <SectionLabel>Enabled (default)</SectionLabel>
            <div style={rowStyle}>
              <IconButton floating aria-label="Search"><Search /></IconButton>
            </div>
          </div>
          <div>
            <SectionLabel>Disabled</SectionLabel>
            <div style={rowStyle}>
              <IconButton floating aria-label="Search" disabled><Search /></IconButton>
              <IconButton floating size="small" aria-label="Dismiss" disabled><X width={16} height={16} /></IconButton>
              <IconButton floating size="large" aria-label="Star" disabled><Star width={32} height={32} /></IconButton>
            </div>
          </div>
          <div style={{ background: 'var(--ld-semantic-color-background-subtle)', padding: '12px', borderRadius: '8px' }}>
            <p style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: '13px', color: 'var(--ld-semantic-color-text-subtle)', margin: 0 }}>
              Hover and focus states are visible in the browser — hover over any button to see the elevated shadow change, and tab to a button to see the focus ring.
            </p>
          </div>
        </div>

        {/* Common use cases */}
        <div style={sectionStyle}>
          <h2 style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: '18px', fontWeight: 700, margin: 0, color: 'var(--ld-semantic-color-text)' }}>
            Common use cases
          </h2>

          {/* Carousel controls */}
          <div>
            <SectionLabel>Carousel prev / next controls</SectionLabel>
            <div style={{ position: 'relative', background: 'var(--ld-semantic-color-background-subtle)', borderRadius: '8px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <div style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text-subtle)', fontSize: '13px' }}>
                Carousel content area
              </div>
              <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}>
                <IconButton floating size="medium" aria-label="Previous slide">
                  <ArrowLeft />
                </IconButton>
              </div>
              <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)' }}>
                <IconButton floating size="medium" aria-label="Next slide">
                  <ArrowRight />
                </IconButton>
              </div>
            </div>
          </div>

          {/* Scroll-to-top */}
          <div>
            <SectionLabel>Scroll controls / misc</SectionLabel>
            <div style={rowStyle}>
              <IconButton floating aria-label="Scroll to top"><ChevronDown /></IconButton>
              <IconButton floating aria-label="Dismiss"><X /></IconButton>
              <IconButton floating aria-label="Search"><Search /></IconButton>
            </div>
          </div>
        </div>

        {/* Usage */}
        <div style={sectionStyle}>
          <h2 style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: '18px', fontWeight: 700, margin: 0, color: 'var(--ld-semantic-color-text)' }}>
            Usage
          </h2>
          <pre style={{
            fontFamily: 'monospace',
            fontSize: '13px',
            background: 'var(--ld-semantic-color-fill-subtle)',
            padding: '16px',
            borderRadius: '8px',
            overflowX: 'auto',
            margin: 0,
            color: 'var(--ld-semantic-color-text)',
          }}>{`import { IconButton } from '@/components/ui/IconButton';
import { ArrowLeft, ArrowRight } from '@/components/icons';

// Carousel controls (most common) — use floating prop on IconButton
<IconButton floating size="medium" aria-label="Previous slide">
  <ArrowLeft />
</IconButton>

<IconButton floating size="medium" aria-label="Next slide">
  <ArrowRight />
</IconButton>

// Sizes: 'small' | 'medium' (default) | 'large'
<IconButton floating size="small" aria-label="Dismiss">
  <X />
</IconButton>

// Disabled state
<IconButton floating aria-label="Previous slide" disabled>
  <ArrowLeft />
</IconButton>

// With click handler
<IconButton floating aria-label="Next slide" onClick={() => carousel.next()}>
  <ArrowRight />
</IconButton>`}</pre>
        </div>

        {/* Do / Don't */}
        <div style={sectionStyle}>
          <h2 style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: '18px', fontWeight: 700, margin: 0, color: 'var(--ld-semantic-color-text)' }}>
            Do / Don't
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div>
              <SectionLabel style={{ color: 'var(--ld-semantic-color-text-positive)' }}>Do</SectionLabel>
              <ul style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: '14px', color: 'var(--ld-semantic-color-text)', paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>Always provide a descriptive <code>aria-label</code> for each button</li>
                <li>Use <code>floating</code> prop on <code>IconButton</code> for carousel prev/next and FAB contexts</li>
                <li>Match icon size to button size (small → 16px, medium → 24px, large → 32px)</li>
                <li>Ensure tap targets meet 44×44px minimum on touch devices</li>
              </ul>
            </div>
            <div>
              <SectionLabel style={{ color: 'var(--ld-semantic-color-text-negative)' }}>Don't</SectionLabel>
              <ul style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: '14px', color: 'var(--ld-semantic-color-text)', paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>Don't use for inline actions in text or forms — use <code>IconButton</code> without <code>floating</code></li>
                <li>Don't omit <code>aria-label</code> — icons alone are not accessible</li>
                <li>Don't place text inside the button — it is icon-only by design</li>
                <li>Don't override colors with <code>UNSAFE_style</code> hex values — use tokens only</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </ComponentPageLayout>
  );
}
