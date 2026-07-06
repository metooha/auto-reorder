import React from 'react';
import { CalloutExample } from '@/components/examples/CalloutExample';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { useTranslation } from 'react-i18next';
import { Highlight, type HighlightPosition } from '@/components/ui/Callout';
import { Button } from '@/components/ui/Button';

const TooltipExample = React.lazy(() => import('@/components/examples/TooltipExample'));

export default function CalloutsPage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout section={t('componentLibrary.components')} title={t('componentLibrary.navCallouts')} description={t('componentLibrary.descCallouts')}>

      {/* Nubbin Positions & Static Examples */}
      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)',
        marginBottom: '32px'
      }}>
        <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
          <CalloutExample />
        </React.Suspense>
      </div>

      {/* Interactive Examples */}
      <div style={{ marginBottom: '16px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
          marginBottom: '8px'
        }}>
          {t('componentLibrary.interactiveExamples')}
        </h2>
        <p style={{
          fontSize: '14px',
          lineHeight: '1.6',
          color: 'var(--ld-semantic-color-text-secondary, #74767C)',
          maxWidth: '800px'
        }}>
          {t('componentLibrary.interactiveExamplesDesc')}
        </p>
      </div>
      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
          <TooltipExample />
        </React.Suspense>
      </div>

      {/* Highlight Variant */}
      <div style={{ marginTop: '48px', marginBottom: '16px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
          marginBottom: '8px'
        }}>
          Highlight
        </h2>
        <p style={{
          fontSize: '14px',
          lineHeight: '1.6',
          color: 'var(--ld-semantic-color-text-secondary, #74767C)',
          maxWidth: '800px'
        }}>
          A high-emphasis callout that floats above all other content. Uses the brand-bold fill
          color and a looping bounce animation to attract user attention. Ideal for onboarding
          flows, contextual nudges, or location confirmation prompts.
        </p>
      </div>

      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        padding: '48px 32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <HighlightVariantExamples />
      </div>
    </ComponentPageLayout>
  );
}

/* ── Highlight variant showcase ─────────────────────────────────────────── */

const HIGHLIGHT_POSITIONS: { position: HighlightPosition; label: string }[] = [
  { position: 'bottom-start', label: 'bottom-start' },
  { position: 'bottom',       label: 'bottom' },
  { position: 'bottom-end',   label: 'bottom-end' },
  { position: 'right',        label: 'right' },
  { position: 'left',         label: 'left' },
  { position: 'top-start',    label: 'top-start' },
  { position: 'top',          label: 'top' },
  { position: 'top-end',      label: 'top-end' },
];

function LocationPinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
        fill="currentColor"
      />
    </svg>
  );
}

function HighlightVariantExamples() {
  const [dismissed, setDismissed] = React.useState<Set<string>>(new Set());

  const dismiss = (pos: string) =>
    setDismissed((prev) => new Set([...prev, pos]));

  const reset = () => setDismissed(new Set());

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
      {/* Position grid */}
      <section>
        <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>
          Positions
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text-secondary, #74767C)', marginBottom: '32px' }}>
          The Highlight supports all 8 primary positions. The nubbin always points back at the anchor element.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '64px 32px',
          padding: '32px 0',
        }}>
          {HIGHLIGHT_POSITIONS.map(({ position, label }) => (
            <div key={position} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <span style={{
                fontSize: '11px',
                fontWeight: 600,
                color: 'var(--ld-semantic-color-text-secondary, #74767C)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '4px',
              }}>
                {label}
              </span>

              {dismissed.has(position) ? (
                <button
                  type="button"
                  onClick={() => setDismissed((p) => { const n = new Set(p); n.delete(position); return n; })}
                  style={{
                    padding: '8px 16px',
                    fontSize: '13px',
                    border: '1px dashed var(--ld-semantic-color-border-strong, #BABBBE)',
                    borderRadius: '6px',
                    background: 'none',
                    cursor: 'pointer',
                    color: 'var(--ld-semantic-color-text-secondary, #74767C)',
                  }}
                >
                  Show again
                </button>
              ) : (
                <Highlight
                  message="Is this the right location?"
                  position={position}
                  actionLabel="Update"
                  onAction={() => dismiss(position)}
                  onClose={() => dismiss(position)}
                  icon={<LocationPinIcon />}
                >
                  <Button variant="secondary" size="small">
                    Sacramento, CA
                  </Button>
                </Highlight>
              )}
            </div>
          ))}
        </div>

        {dismissed.size > 0 && (
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: '16px',
              padding: '6px 16px',
              fontSize: '13px',
              border: '1px solid var(--ld-semantic-color-border-strong, #BABBBE)',
              borderRadius: '9999px',
              background: 'none',
              cursor: 'pointer',
              color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
            }}
          >
            Reset all
          </button>
        )}
      </section>

      {/* Without icon */}
      <section>
        <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>
          Without Icon
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text-secondary, #74767C)', marginBottom: '24px' }}>
          The leading icon is optional. Without it the callout still bounces to attract attention.
        </p>
        <Highlight
          message="New feature available"
          position="right"
          actionLabel="Learn more"
          onAction={() => {}}
          onClose={() => {}}
        >
          <Button variant="secondary" size="small">
            My Account
          </Button>
        </Highlight>
      </section>

      {/* Message only */}
      <section>
        <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>
          Message Only
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text-secondary, #74767C)', marginBottom: '24px' }}>
          Omit <code style={{ fontSize: '12px', background: 'var(--ld-semantic-color-surface-secondary, #F1F1F2)', padding: '2px 6px', borderRadius: '4px' }}>actionLabel</code> and
          {' '}<code style={{ fontSize: '12px', background: 'var(--ld-semantic-color-surface-secondary, #F1F1F2)', padding: '2px 6px', borderRadius: '4px' }}>onClose</code> for a
          minimal read-only nudge.
        </p>
        <Highlight
          message="3 items saved to your list"
          position="bottom"
          icon={<LocationPinIcon />}
        >
          <Button variant="secondary" size="small">
            Favorites
          </Button>
        </Highlight>
      </section>
    </div>
  );
}
