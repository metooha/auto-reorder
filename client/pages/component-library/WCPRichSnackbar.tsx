import React, { useState } from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { WCPRichSnackbar } from '@/components/walmart/WCPRichSnackbar';
import type {
  WCPRichSnackbarColor,
  WCPRichSnackbarContentVariant,
} from '@/components/walmart/WCPRichSnackbar';
import { wcpRichSnackbar, dismissWCPRichSnackbar } from '@/hooks/use-wcp-rich-snackbar';
import { Button } from '@/components/ui/Button';
import { Cart } from '@/components/icons/Cart';
import { Gift } from '@/components/icons/Gift';
import { CheckCircle } from '@/components/icons/CheckCircle';
import { InfoCircle } from '@/components/icons/InfoCircle';
import styles from './WCPRichSnackbar.module.css';

// ── Static snackbar preview (not fixed-position) ─────────────────────────

function StaticSnackbar(props: React.ComponentProps<typeof WCPRichSnackbar>) {
  return (
    <div className={styles.previewWrap}>
      <WCPRichSnackbar {...props} open inline duration={Infinity} />
    </div>
  );
}

// ── Section helpers ───────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className={styles.sectionTitle}>{children}</h2>;
}

function SectionDesc({ children }: { children: React.ReactNode }) {
  return <p className={styles.sectionDesc}>{children}</p>;
}

function DemoCard({
  label,
  dark,
  children,
}: {
  label: string;
  dark?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={[styles.demoCard, dark ? styles.demoCardDark : ''].filter(Boolean).join(' ')}>
      <div className={[styles.cardLabel, dark ? styles.cardLabelLight : ''].filter(Boolean).join(' ')}>
        {label}
      </div>
      <div className={styles.cardContent}>{children}</div>
    </div>
  );
}

// ── Demo data ─────────────────────────────────────────────────────────────

const COLOR_VARIANTS: { color: WCPRichSnackbarColor; label: string; dark?: boolean }[] = [
  { color: 'primary', label: 'Primary' },
  { color: 'secondary', label: 'Secondary' },
  { color: 'inverse', label: 'Inverse', dark: true },
  { color: 'brand', label: 'Brand', dark: true },
];

const CONTENT_VARIANTS: { variant: WCPRichSnackbarContentVariant; label: string }[] = [
  { variant: 'left-regular', label: 'Left · Regular' },
  { variant: 'left-bold', label: 'Left · Bold' },
  { variant: 'center-regular', label: 'Center · Regular' },
  { variant: 'center-bold', label: 'Center · Bold' },
];

const IconLeading = ({ color }: { color: WCPRichSnackbarColor }) => {
  const isDark = color === 'inverse' || color === 'brand';
  const iconStyle: React.CSSProperties = {
    color: isDark
      ? 'var(--ld-semantic-color-text-inverse, #fff)'
      : color === 'primary'
      ? 'var(--ld-semantic-color-text-onfill-accent-blue-subtle, #002E99)'
      : 'var(--ld-semantic-color-text, #2e2f32)',
  };
  return <Cart width={24} height={24} style={iconStyle} />;
};

const SpotLeading = () => (
  <div
    style={{
      display: 'flex',
      width: 40,
      height: 40,
      padding: 8,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '9999px',
      background: 'var(--ld-semantic-color-fill-brand-subtle, #EBF0FF)',
      flexShrink: 0,
    }}
  >
    <Gift
      width={24}
      height={24}
      style={{ color: 'var(--ld-semantic-color-text-onfill-brand-subtle, #0053E2)' }}
    />
  </div>
);

const ImageLeading = () => (
  <img
    src="https://api.builder.io/api/v1/image/assets/TEMP/88626a3fa4036c0d642723bca865cb48e9d86891?width=80"
    alt=""
    aria-hidden="true"
    style={{
      width: 40,
      height: 40,
      borderRadius: '9999px',
      objectFit: 'cover',
      flexShrink: 0,
    }}
  />
);

// ── Main page ─────────────────────────────────────────────────────────────

export default function WCPRichSnackbarPage() {
  const [liveColor, setLiveColor] = useState<WCPRichSnackbarColor>('primary');
  const [liveVariant, setLiveVariant] = useState<WCPRichSnackbarContentVariant>('left-regular');

  const showLive = () => {
    wcpRichSnackbar({
      color: liveColor,
      contentVariant: liveVariant,
      leadingSlot: <IconLeading color={liveColor} />,
      message: 'Nice find! You\'re saving $30 for your pup\'s first birthday!',
      actionLabel: 'View Cart',
      duration: 4000,
    });
  };

  return (
    <ComponentPageLayout
      section="WCP Components"
      title="[WCP] Rich Snackbar"
      description="The WCP Rich Snackbar extends the LD Snackbar with a leading media slot (icon, spot icon, image, or animation) and 4 color variants. Use it for non-critical, transient messages that include contextual media."
    >
      <div className={styles.page}>

        {/* ── Overview ────────────────────────────────────────────── */}
        <div className={styles.section}>
          <SectionTitle>Overview</SectionTitle>
          <SectionDesc>
            The WCP Rich Snackbar builds on the LD Snackbar with a leading media slot and visual
            color variants. The LD Snackbar remains the correct choice for purely informational
            messages. The Rich Snackbar is for product-level experiences where brand context and
            imagery add value.
          </SectionDesc>
        </div>

        {/* ── Color Variants ──────────────────────────────────────── */}
        <div className={styles.section}>
          <SectionTitle>Color Variants</SectionTitle>
          <SectionDesc>
            Four color variants cover the full range of WCP surface contexts.
          </SectionDesc>
          <div className={styles.demoGrid}>
            {COLOR_VARIANTS.map(({ color, label, dark }) => (
              <DemoCard key={color} label={label} dark={dark}>
                <StaticSnackbar
                  color={color}
                  contentVariant="left-regular"
                  leadingSlot={<IconLeading color={color} />}
                  message="Declarative title or body"
                  actionLabel="Action Button"
                  onClose={() => {}}
                />
              </DemoCard>
            ))}
          </div>
        </div>

        {/* ── Content Variants ────────────────────────────────────── */}
        <div className={styles.section}>
          <SectionTitle>Content Variants</SectionTitle>
          <SectionDesc>
            Four layout variants control text alignment and weight. Bold variants increase message
            emphasis. Center variants work best for short single-line messages.
          </SectionDesc>
          <div className={styles.demoGrid}>
            {CONTENT_VARIANTS.map(({ variant, label }) => (
              <DemoCard key={variant} label={label}>
                <StaticSnackbar
                  color="primary"
                  contentVariant={variant}
                  leadingSlot={<IconLeading color="primary" />}
                  message="Declarative title or body"
                  actionLabel="Action Button"
                  onClose={() => {}}
                />
              </DemoCard>
            ))}
          </div>
        </div>

        {/* ── Leading Media Types ─────────────────────────────────── */}
        <div className={styles.section}>
          <SectionTitle>Leading Media Types</SectionTitle>
          <SectionDesc>
            The leading slot accepts any React node: an icon, spot icon (circle with icon), image
            (circular avatar), or a Lottie animation. Always include descriptive text in the message
            since the icon is decorative.
          </SectionDesc>
          <div className={styles.demoGrid}>
            <DemoCard label="Icon">
              <StaticSnackbar
                color="primary"
                leadingSlot={<IconLeading color="primary" />}
                message="Your item will ship in 12 hrs, be on the look out."
              />
            </DemoCard>

            <DemoCard label="Spot Icon">
              <StaticSnackbar
                color="secondary"
                leadingSlot={<SpotLeading />}
                message="Nice find! You're saving $30 for your pup's first birthday!"
                actionLabel="View Cart"
                onClose={() => {}}
              />
            </DemoCard>

            <DemoCard label="Image (avatar)">
              <StaticSnackbar
                color="primary"
                leadingSlot={<ImageLeading />}
                message="Nice find for your pup's first birthday!"
                actionLabel="View Cart"
                onClose={() => {}}
              />
            </DemoCard>

            <DemoCard label="No leading slot">
              <StaticSnackbar
                color="secondary"
                message="Declarative title or body"
                actionLabel="Action Button"
                onClose={() => {}}
              />
            </DemoCard>
          </div>
        </div>

        {/* ── Trailing options ────────────────────────────────────── */}
        <div className={styles.section}>
          <SectionTitle>Trailing Options</SectionTitle>
          <SectionDesc>
            The trailing section can include an action link, a close button, both, or neither.
          </SectionDesc>
          <div className={styles.demoGrid}>
            <DemoCard label="Action + Close">
              <StaticSnackbar
                color="primary"
                leadingSlot={<IconLeading color="primary" />}
                message="Declarative title or body"
                actionLabel="Action Button"
                onClose={() => {}}
              />
            </DemoCard>

            <DemoCard label="Close only">
              <StaticSnackbar
                color="primary"
                leadingSlot={<IconLeading color="primary" />}
                message="Declarative title or body"
                onClose={() => {}}
              />
            </DemoCard>

            <DemoCard label="Action only">
              <StaticSnackbar
                color="primary"
                leadingSlot={<IconLeading color="primary" />}
                message="Declarative title or body"
                actionLabel="Action Button"
              />
            </DemoCard>

            <DemoCard label="No trailing">
              <StaticSnackbar
                color="primary"
                leadingSlot={<IconLeading color="primary" />}
                message="Declarative title or body"
              />
            </DemoCard>
          </div>
        </div>

        {/* ── Live trigger ────────────────────────────────────────── */}
        <div className={styles.section}>
          <SectionTitle>Live Demo</SectionTitle>
          <SectionDesc>
            Trigger a live snackbar at the bottom of the screen to test animation and auto-dismiss.
          </SectionDesc>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--ld-semantic-color-text-subtle)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Color
              </span>
              <div style={{ display: 'flex', gap: 8 }}>
                {COLOR_VARIANTS.map(({ color, label }) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setLiveColor(color)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: 4,
                      border: `2px solid ${liveColor === color ? 'var(--ld-semantic-color-action-fill-primary, #0071DC)' : 'var(--ld-semantic-color-separator, #e3e4e5)'}`,
                      background: liveColor === color ? 'var(--ld-semantic-color-action-fill-primary, #0071DC)' : 'transparent',
                      color: liveColor === color ? '#fff' : 'var(--ld-semantic-color-text)',
                      fontSize: 13,
                      fontFamily: 'var(--ld-semantic-font-body-small-family)',
                      cursor: 'pointer',
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--ld-semantic-color-text-subtle)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Content Variant
              </span>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {CONTENT_VARIANTS.map(({ variant, label }) => (
                  <button
                    key={variant}
                    type="button"
                    onClick={() => setLiveVariant(variant)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: 4,
                      border: `2px solid ${liveVariant === variant ? 'var(--ld-semantic-color-action-fill-primary, #0071DC)' : 'var(--ld-semantic-color-separator, #e3e4e5)'}`,
                      background: liveVariant === variant ? 'var(--ld-semantic-color-action-fill-primary, #0071DC)' : 'transparent',
                      color: liveVariant === variant ? '#fff' : 'var(--ld-semantic-color-text)',
                      fontSize: 13,
                      fontFamily: 'var(--ld-semantic-font-body-small-family)',
                      cursor: 'pointer',
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.triggerRow}>
            <Button variant="primary" size="medium" onClick={showLive}>
              Show Rich Snackbar
            </Button>
            <Button variant="secondary" size="medium" onClick={dismissWCPRichSnackbar}>
              Dismiss
            </Button>
          </div>
        </div>

        {/* ── Do / Don't ──────────────────────────────────────────── */}
        <div className={styles.section}>
          <SectionTitle>Guidelines</SectionTitle>
          <div className={styles.guidelineGrid}>
            <div className={styles.guidelineCard}>
              <div className={`${styles.guidelineLabel} ${styles.doLabel}`}>
                <CheckCircle width={16} height={16} /> Do
              </div>
              <p className={styles.guidelineText}>
                Keep the content brief. Snackbars disappear after a short time so users should be
                able to read the content quickly.
              </p>
            </div>
            <div className={styles.guidelineCard}>
              <div className={`${styles.guidelineLabel} ${styles.doLabel}`}>
                <CheckCircle width={16} height={16} /> Do
              </div>
              <p className={styles.guidelineText}>
                Keep the content non-critical. Snackbar messages should not require any action from
                users.
              </p>
            </div>
            <div className={styles.guidelineCard}>
              <div className={`${styles.guidelineLabel} ${styles.doLabel}`}>
                <CheckCircle width={16} height={16} /> Do
              </div>
              <p className={styles.guidelineText}>
                Since the icon is marked as decorative in accessibility annotations, make sure that
                the icon's information is included in the text message.
              </p>
            </div>
            <div className={styles.guidelineCard}>
              <div className={`${styles.guidelineLabel} ${styles.dontLabel}`}>
                <InfoCircle width={16} height={16} /> Don't
              </div>
              <p className={styles.guidelineText}>
                Don't apply color tokens or change the colors of any element. All tokens have
                already been applied to all options and are not customizable.
              </p>
            </div>
            <div className={styles.guidelineCard}>
              <div className={`${styles.guidelineLabel} ${styles.dontLabel}`}>
                <InfoCircle width={16} height={16} /> Don't
              </div>
              <p className={styles.guidelineText}>
                Don't use the WCP Rich Snackbar if your message is purely informational. Instead
                use the LD 3.5 Snackbar.
              </p>
            </div>
            <div className={styles.guidelineCard}>
              <div className={`${styles.guidelineLabel} ${styles.doLabel}`}>
                <CheckCircle width={16} height={16} /> Do
              </div>
              <p className={styles.guidelineText}>
                When using Center Bold or Center Regular layout variants, if the number of text
                lines exceeds 1, make sure to keep text concise so it fits within the snackbar.
              </p>
            </div>
          </div>
        </div>

        {/* ── Usage ───────────────────────────────────────────────── */}
        <div className={styles.section}>
          <SectionTitle>Usage</SectionTitle>
          <SectionDesc>
            Use the global <code>wcpRichSnackbar()</code> function from anywhere in your app. The{' '}
            <code>WCPRichSnackbarContainer</code> is already mounted in <code>App.tsx</code> and
            will render it automatically.
          </SectionDesc>
          <pre className={styles.codeBlock}>{`import { wcpRichSnackbar } from '@/hooks/use-wcp-rich-snackbar';
import { Cart } from '@/components/icons/Cart';

// Show a rich snackbar
wcpRichSnackbar({
  color: 'primary',          // 'primary' | 'secondary' | 'inverse' | 'brand'
  contentVariant: 'left-bold', // 'left-regular' | 'left-bold' | 'center-regular' | 'center-bold'
  leadingSlot: <Cart width={24} height={24} />,
  message: "Nice find! You're saving $30 for your pup's birthday!",
  actionLabel: 'View Cart',
  onAction: () => navigate('/cart'),
  duration: 4000,            // ms; Infinity for manual-close only
  position: 'bottom-center', // 'bottom-left' | 'bottom-center' | 'bottom-right'
});`}</pre>

          <SectionDesc>
            You can also use the <code>useWCPRichSnackbar</code> hook for component-level control:
          </SectionDesc>
          <pre className={styles.codeBlock}>{`import { useWCPRichSnackbar } from '@/hooks/use-wcp-rich-snackbar';

function MyComponent() {
  const { show, dismiss } = useWCPRichSnackbar();

  return (
    <button onClick={() => show({ message: 'Added to cart!', color: 'primary' })}>
      Add to cart
    </button>
  );
}`}</pre>
        </div>

      </div>
    </ComponentPageLayout>
  );
}
