import React from 'react';
import ToggleExample from '@/components/examples/ToggleExample';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { useTranslation } from 'react-i18next';
import { WCPIconToggle, type WCPIconToggleSize, type WCPIconToggleShape, type WCPIconToggleColor } from '@/components/walmart/WCPIconToggle';
import { Heart } from '@/components/icons/Heart';
import { HeartFill } from '@/components/icons/HeartFill';
import { Star } from '@/components/icons/Star';
import { StarFill } from '@/components/icons/StarFill';
import { Pin } from '@/components/icons/Pin';
import { PinFill } from '@/components/icons/PinFill';

export default function TogglePage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout
      section={t('componentLibrary.sharedSection')}
      title={t('componentLibrary.navToggle')}
      description={t('componentLibrary.descToggle')}
    >

      {/* ── Existing Toggle ── */}
      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)',
        marginBottom: '48px',
      }}>
        <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
          <ToggleExample />
        </React.Suspense>
      </div>

      {/* ── WCP Icon Toggle ── */}
      <div style={{ marginBottom: '16px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
          marginBottom: '8px',
        }}>
          WCP Icon Toggle
        </h2>
        <p style={{
          fontSize: '14px',
          lineHeight: '1.6',
          color: 'var(--ld-semantic-color-text-secondary, #74767C)',
          maxWidth: '720px',
        }}>
          A toggleable icon button used across the Walmart.com consumer experience.
          Shows an outline icon in the default (off) state and a filled icon in the selected (on) state.
          Supports 3 sizes, 2 shapes, and 2 color themes.
        </p>
      </div>

      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        padding: '40px 32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)',
      }}>
        <WCPIconToggleShowcase />
      </div>
    </ComponentPageLayout>
  );
}

/* ─────────────────────────────────────────────────────────── */

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 style={{
      fontSize: '18px',
      fontWeight: 700,
      fontFamily: 'var(--ld-semantic-font-family-sans)',
      color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
      marginBottom: '8px',
    }}>
      {children}
    </h3>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      fontSize: '11px',
      fontWeight: 600,
      textTransform: 'uppercase' as const,
      letterSpacing: '0.06em',
      color: 'var(--ld-semantic-color-text-secondary, #74767C)',
    }}>
      {children}
    </span>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      display: 'inline-block',
      padding: '2px 8px',
      fontSize: '12px',
      fontFamily: 'var(--ld-semantic-font-family-sans)',
      background: 'var(--ld-semantic-color-surface-secondary, #F1F1F2)',
      borderRadius: '4px',
      color: 'var(--ld-semantic-color-text-secondary, #74767C)',
    }}>
      {children}
    </span>
  );
}

/* Variants matrix ─ shape × size × color */

const SIZES: WCPIconToggleSize[] = ['small', 'medium', 'large'];
const SHAPES: WCPIconToggleShape[] = ['circle', 'rounded'];

function IconToggleRow({
  shape,
  color,
  label,
}: {
  shape: WCPIconToggleShape;
  color: WCPIconToggleColor;
  label: string;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Label>{label}</Label>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' as const }}>
        {SIZES.map((size) => (
          <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
            <UncontrolledToggle shape={shape} size={size} color={color} />
            <Chip>{size}</Chip>
          </div>
        ))}
      </div>
    </div>
  );
}

function UncontrolledToggle({
  shape,
  size,
  color,
}: {
  shape: WCPIconToggleShape;
  size: WCPIconToggleSize;
  color: WCPIconToggleColor;
}) {
  const [checked, setChecked] = React.useState(false);
  return (
    <WCPIconToggle
      uncheckedIcon={<Heart />}
      checkedIcon={<HeartFill />}
      aria-label="Save to favorites"
      shape={shape}
      size={size}
      color={color}
      checked={checked}
      onChange={setChecked}
    />
  );
}

function WCPIconToggleShowcase() {
  const [heartOn, setHeartOn] = React.useState(false);
  const [starOn, setStarOn] = React.useState(true);
  const [bookmarkOn, setBookmarkOn] = React.useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>

      {/* ── All variants matrix ── */}
      <section>
        <SectionHeading>Shapes &amp; Sizes — Default color</SectionHeading>
        <p style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text-secondary, #74767C)', marginBottom: '24px' }}>
          Click any button to toggle between outline (off) and filled (on) states.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {SHAPES.map((shape) => (
            <IconToggleRow key={shape} shape={shape} color="default" label={`Shape: ${shape}`} />
          ))}
        </div>
      </section>

      {/* ── White color ── */}
      <section>
        <SectionHeading>White color (for dark backgrounds)</SectionHeading>
        <p style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text-secondary, #74767C)', marginBottom: '24px' }}>
          The <Chip>white</Chip> variant renders a transparent background with a white icon — ideal for use on colored or dark surfaces like the top nav or hero banners.
        </p>
        <div style={{
          display: 'flex',
          gap: '28px',
          padding: '32px',
          background: 'var(--ld-semantic-color-fill-brand-bold, #001e60)',
          borderRadius: '12px',
          flexWrap: 'wrap' as const,
        }}>
          {SHAPES.map((shape) => (
            <div key={shape} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.06em', color: 'rgba(255,255,255,0.6)' }}>
                Shape: {shape}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' as const }}>
                {SIZES.map((size) => (
                  <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                    <UncontrolledToggleWhite shape={shape} size={size} />
                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>{size}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── States ── */}
      <section>
        <SectionHeading>States</SectionHeading>
        <p style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text-secondary, #74767C)', marginBottom: '24px' }}>
          Hover, active (press), checked, and disabled states.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '32px', alignItems: 'flex-start' }}>

          {/* Off */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <WCPIconToggle
              uncheckedIcon={<Heart />}
              checkedIcon={<HeartFill />}
              aria-label="Save to favorites"
              shape="circle"
              size="medium"
              color="default"
              checked={heartOn}
              onChange={setHeartOn}
            />
            <Chip>{heartOn ? 'On' : 'Off'}</Chip>
          </div>

          {/* On */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <WCPIconToggle
              uncheckedIcon={<Star />}
              checkedIcon={<StarFill />}
              aria-label="Star this item"
              shape="rounded"
              size="medium"
              color="default"
              checked={starOn}
              onChange={setStarOn}
            />
            <Chip>{starOn ? 'On' : 'Off'}</Chip>
          </div>

          {/* Disabled off */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <WCPIconToggle
              uncheckedIcon={<Pin />}
              checkedIcon={<PinFill />}
              aria-label="Pin (disabled)"
              shape="circle"
              size="medium"
              color="default"
              checked={false}
              disabled
            />
            <Chip>Disabled off</Chip>
          </div>

          {/* Disabled on */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <WCPIconToggle
              uncheckedIcon={<Pin />}
              checkedIcon={<PinFill />}
              aria-label="Pin (disabled)"
              shape="rounded"
              size="medium"
              color="default"
              checked
              disabled
            />
            <Chip>Disabled on</Chip>
          </div>

          {/* Pin interactive */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <WCPIconToggle
              uncheckedIcon={<Pin />}
              checkedIcon={<PinFill />}
              aria-label="Pin this item"
              shape="rounded"
              size="large"
              color="default"
              checked={bookmarkOn}
              onChange={setBookmarkOn}
            />
            <Chip>Large {bookmarkOn ? 'on' : 'off'}</Chip>
          </div>
        </div>
      </section>

      {/* ── Usage code ── */}
      <section>
        <SectionHeading>Usage</SectionHeading>
        <pre style={{
          background: 'var(--ld-semantic-color-surface-secondary, #F1F1F2)',
          padding: '20px 24px',
          borderRadius: '8px',
          fontSize: '13px',
          fontFamily: 'monospace',
          overflowX: 'auto' as const,
          color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
          lineHeight: 1.6,
        }}>
{`import { WCPIconToggle } from '@/components/walmart/WCPIconToggle';
import { Heart } from '@/components/icons/Heart';
import { HeartFill } from '@/components/icons/HeartFill';

// Uncontrolled
<WCPIconToggle
  uncheckedIcon={<Heart />}
  checkedIcon={<HeartFill />}
  aria-label="Save to favorites"
  shape="circle"        // 'circle' | 'rounded'
  size="medium"         // 'small' | 'medium' | 'large'
  color="default"       // 'default' | 'white'
/>

// Controlled
<WCPIconToggle
  uncheckedIcon={<Heart />}
  checkedIcon={<HeartFill />}
  aria-label="Save to favorites"
  shape="circle"
  size="medium"
  color="white"         // for dark/colored backgrounds
  checked={checked}
  onChange={setChecked}
/>`}
        </pre>
      </section>

    </div>
  );
}

function UncontrolledToggleWhite({
  shape,
  size,
}: {
  shape: WCPIconToggleShape;
  size: WCPIconToggleSize;
}) {
  const [checked, setChecked] = React.useState(false);
  return (
    <WCPIconToggle
      uncheckedIcon={<Heart />}
      checkedIcon={<HeartFill />}
      aria-label="Save to favorites"
      shape={shape}
      size={size}
      color="white"
      checked={checked}
      onChange={setChecked}
    />
  );
}
