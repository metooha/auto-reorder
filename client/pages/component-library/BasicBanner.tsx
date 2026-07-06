import { BasicBanner } from '@/components/ui/BasicBanner';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';

const sectionStyle: React.CSSProperties = {
  backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
  padding: '32px',
  borderRadius: '8px',
  boxShadow: 'var(--ld-semantic-elevation-100)',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--ld-semantic-font-family-sans)',
  fontSize: '12px',
  fontWeight: 600,
  color: 'var(--ld-semantic-color-text-subtle, #74767C)',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  marginBottom: '4px',
};

function VariantRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={labelStyle}>{label}</div>
      {children}
    </div>
  );
}

export default function BasicBannerPage() {
  return (
    <ComponentPageLayout
      section="WCP Components"
      title="Basic Banner"
      description="A generic banner component used to communicate value propositions, branded messages, or contextual callouts. Supports three visual variants and an optional leading icon."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

        {/* All 3 variants */}
        <div style={sectionStyle}>
          <h2 style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: '18px', fontWeight: 700, margin: '0 0 8px', color: 'var(--ld-semantic-color-text)' }}>
            Variants
          </h2>
          <VariantRow label="Default">
            <BasicBanner variant="default" text="Declarative title or body" />
          </VariantRow>
          <VariantRow label="Brand">
            <BasicBanner variant="brand" text="Declarative title or body" />
          </VariantRow>
          <VariantRow label="Inverse">
            <BasicBanner variant="inverse" text="Declarative title or body" />
          </VariantRow>
        </div>

        {/* Custom text */}
        <div style={sectionStyle}>
          <h2 style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: '18px', fontWeight: 700, margin: '0 0 8px', color: 'var(--ld-semantic-color-text)' }}>
            Custom text examples
          </h2>
          <BasicBanner variant="default" text="Free delivery on orders $35+" />
          <BasicBanner variant="brand" text="Walmart+ members save more every day" />
          <BasicBanner variant="inverse" text="Same-day pickup available at your store" />
        </div>

        {/* Clickable */}
        <div style={sectionStyle}>
          <h2 style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: '18px', fontWeight: 700, margin: '0 0 8px', color: 'var(--ld-semantic-color-text)' }}>
            Clickable (renders as button)
          </h2>
          <BasicBanner
            variant="brand"
            text="Join Walmart+ — start your free trial"
            onClick={() => alert('Clicked!')}
          />
        </div>

        {/* Usage */}
        <div style={sectionStyle}>
          <h2 style={{ fontFamily: 'var(--ld-semantic-font-family-sans)', fontSize: '18px', fontWeight: 700, margin: '0 0 8px', color: 'var(--ld-semantic-color-text)' }}>
            Usage
          </h2>
          <pre style={{
            fontFamily: 'monospace',
            fontSize: '13px',
            background: 'var(--ld-semantic-color-fill-subtle, #F2F2F2)',
            padding: '16px',
            borderRadius: '8px',
            overflowX: 'auto',
            margin: 0,
            color: 'var(--ld-semantic-color-text)',
          }}>{`import { BasicBanner } from '@/components/ui/BasicBanner';

// Default variant (blue-subtle background)
<BasicBanner variant="default" text="Declarative title or body" />

// Brand variant (Walmart blue)
<BasicBanner variant="brand" text="Declarative title or body" />

// Inverse variant (dark background)
<BasicBanner variant="inverse" text="Declarative title or body" />

// Clickable version (renders as <button>)
<BasicBanner
  variant="brand"
  text="Join Walmart+"
  onClick={() => navigate('/walmart-plus')}
/>

// Custom icon
<BasicBanner
  variant="default"
  text="Free shipping on $35+"
  icon={<ShippingIcon />}
/>`}</pre>
        </div>
      </div>
    </ComponentPageLayout>
  );
}
