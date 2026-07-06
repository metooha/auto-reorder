import React from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { WCPFlag, WCP_FLAG_VARIANTS, type WCPFlagVariant } from '@/components/walmart/WCPFlag';
import {
  Gift,
  Star,
  Hourglass,
  Dollar,
  Tag,
  ShieldCheck,
  CheckCircle,
  Check,
  Lock,
  Spark,
  UsersFill,
  Flash,
} from '@/components/icons';

// ─── Icon size shared across all flag examples ────────────────────────────────

const ICON_SIZE = { width: 16, height: 16 } as const;

// ─── Per-variant icon map ─────────────────────────────────────────────────────

const VARIANT_ICONS: Record<WCPFlagVariant, React.ReactNode> = {
  'holiday-restricted': <Lock        {...ICON_SIZE} />,
  'brand-subtle':       <Star        {...ICON_SIZE} />,
  'scarcity':           <Hourglass   {...ICON_SIZE} />,
  'savings-bold':       <Dollar      {...ICON_SIZE} />,
  'savings-subtle':     <Tag         {...ICON_SIZE} />,
  'confidence-subtle':  <ShieldCheck {...ICON_SIZE} />,
  'confidence-bold':    <ShieldCheck {...ICON_SIZE} />,
  'confidence-alt':     <Check       {...ICON_SIZE} />,
  'confidence':         <CheckCircle {...ICON_SIZE} />,
  'holiday-member':     <Gift        {...ICON_SIZE} />,
  'social':             <UsersFill   {...ICON_SIZE} />,
  'urgent':             <Flash       {...ICON_SIZE} />,
};

// ─── Token reference data ─────────────────────────────────────────────────────

const BG_TOKENS: Record<WCPFlagVariant, string> = {
  'holiday-restricted': '--wcp-semantic-color-fill-holiday-restricted (gray-10)',
  'brand-subtle':       '--ld-semantic-color-fill-brand-subtle *',
  'scarcity':           '--wcp-semantic-color-fill-scarcity (spark-10)',
  'savings-bold':       '--wcp-semantic-color-fill-savings-bold (red-100)',
  'savings-subtle':     '--wcp-semantic-color-fill-savings-subtle (white)',
  'confidence-subtle':  '--wcp-semantic-color-fill-confidence-subtle (blue-10)',
  'confidence-bold':    '--wcp-semantic-color-fill-confidence-bold (blue-180)',
  'confidence-alt':     '--wcp-semantic-color-fill-confidence-alt (blue-160)',
  'confidence':         '--wcp-semantic-color-fill-confidence (blue-160)',
  'holiday-member':     '--wcp-semantic-color-fill-holiday-member (spark-100)',
  'social':             '--wcp-semantic-color-fill-social (white)',
  'urgent':             '--wcp-semantic-color-fill-urgent (yellow-100)',
};

const TEXT_TOKENS: Record<WCPFlagVariant, string> = {
  'holiday-restricted': '--wcp-semantic-color-text-on-fill-holiday-restricted (gray-130)',
  'brand-subtle':       '--ld-semantic-color-text-on-fill-brand-subtle *',
  'scarcity':           '--wcp-semantic-color-text-on-fill-scarcity (spark-160)',
  'savings-bold':       '--wcp-semantic-color-text-on-fill-savings-bold (white)',
  'savings-subtle':     '--wcp-semantic-color-text-on-fill-savings-subtle (red-130)',
  'confidence-subtle':  '--wcp-semantic-color-text-on-fill-confidence-subtle (blue-130)',
  'confidence-bold':    '--wcp-semantic-color-text-on-fill-confidence-bold (white)',
  'confidence-alt':     '--wcp-semantic-color-text-on-fill-confidence-alt (white) / icon: icon-on-fill-confidence-alt (spark-100)',
  'confidence':         '--wcp-semantic-color-text-on-fill-confidence (white)',
  'holiday-member':     '--wcp-semantic-color-text-on-fill-holiday-member (blue-180)',
  'social':             '--wcp-semantic-color-text-on-fill-social (blue-100)',
  'urgent':             '--wcp-semantic-color-text-on-fill-urgent (gray-160)',
};

// ─── Real-world label → variant map ──────────────────────────────────────────

interface LabelRule {
  label: string;
  variant: WCPFlagVariant;
  category: string;
  context: string;
  icon?: React.ReactNode;
  note?: string;
}

const LABEL_RULES: LabelRule[] = [
  // ── Events & Specific Promotion ──────────────────────────────────────────
  {
    category: 'Events & Promotion',
    label: 'Early Access',
    variant: 'confidence-alt',
    icon: <Spark {...ICON_SIZE} />,
    context: 'Early sale access, loyalty events',
    note: 'Deep navy with gold Spark icon — exclusive access window. Always pair with Spark icon.',
  },
  {
    category: 'Events & Promotion',
    label: 'Black Friday Deal',
    variant: 'confidence-bold',
    context: 'Black Friday sale event',
    note: 'Darkest navy — high-emphasis event badge.',
  },
  {
    category: 'Events & Promotion',
    label: 'Preview Black Friday',
    variant: 'confidence-bold',
    context: 'Pre-Black Friday period',
    note: 'Darkest navy — teaser flag shown before the main event starts.',
  },
  {
    category: 'Events & Promotion',
    label: 'Deal',
    variant: 'confidence-bold',
    context: 'General deal events on product tiles',
    note: 'Darkest navy — generic event deal label.',
  },
  {
    category: 'Events & Promotion',
    label: 'Online only',
    variant: 'social',
    icon: <Check {...ICON_SIZE} />,
    context: 'Items exclusive to walmart.com',
    note: 'Outlined blue — signals digital exclusivity. Pair with Check icon.',
  },
  // ── Pricing & Promo ───────────────────────────────────────────────────────
  {
    category: 'Pricing & Promo',
    label: 'Rollback',
    variant: 'savings-bold',
    context: 'Product tiles, search result rows',
    note: 'Solid red — permanent price reduction. High emphasis, no icon.',
  },
  {
    category: 'Pricing & Promo',
    label: 'Clearance',
    variant: 'urgent',
    context: 'Clearance-priced items',
    note: 'Bright yellow — last-chance clearance pricing.',
  },
  {
    category: 'Pricing & Promo',
    label: 'Reduced price',
    variant: 'confidence-subtle',
    context: 'Sale / reduced pricing',
    note: 'Light blue tint — lower-emphasis price drop. Distinct from Rollback.',
  },
  {
    category: 'Pricing & Promo',
    label: 'Flash deal',
    variant: 'savings-subtle',
    icon: <Flash {...ICON_SIZE} />,
    context: 'Time-limited flash deals carousel',
    note: 'Outlined red — time-sensitive offer. Pair with Flash icon.',
  },
  // ── Trust ─────────────────────────────────────────────────────────────────
  {
    category: 'Trust',
    label: 'Best seller',
    variant: 'confidence-bold',
    context: 'High-selling items on product tiles',
    note: 'Darkest navy — strongest commercial trust signal on a tile.',
  },
  {
    category: 'Trust',
    label: 'Popular pick',
    variant: 'confidence-bold',
    context: 'Editorial or algorithmic popularity',
    note: 'Darkest navy — popularity signal; not a savings indicator.',
  },
  // ── Social Proofing ───────────────────────────────────────────────────────
  {
    category: 'Social Proofing',
    label: 'Bought X+ times',
    variant: 'social',
    context: 'PDP, product tiles',
    note: 'Outlined blue — total purchase count. "X+" is a dynamic formatted number.',
  },
  {
    category: 'Social Proofing',
    label: 'X+ bought since yesterday',
    variant: 'social',
    context: 'PDP, product tiles',
    note: 'Outlined blue — recency-based purchase signal.',
  },
  {
    category: 'Social Proofing',
    label: "In X+ people's carts",
    variant: 'social',
    context: 'PDP, product tiles',
    note: 'Outlined blue — cart demand / interest signal.',
  },
  {
    category: 'Social Proofing',
    label: 'X+ people viewing now',
    variant: 'social',
    context: 'PDP, product tiles',
    note: 'Outlined blue — live browsing interest signal.',
  },
  // ── Availability ──────────────────────────────────────────────────────────
  {
    category: 'Availability',
    label: 'Preorder',
    variant: 'confidence',
    context: 'Not-yet-released products',
    note: 'Deep navy — available to order before the release date.',
  },
];

// ─── Shared text styles ───────────────────────────────────────────────────────

const headingStyle: React.CSSProperties = {
  fontSize: '20px',
  fontWeight: 700,
  fontFamily: 'var(--ld-semantic-font-family-sans)',
  color: 'var(--ld-semantic-color-text-primary, #2e2f32)',
  marginBottom: '8px',
};

const subheadStyle: React.CSSProperties = {
  fontSize: '14px',
  color: 'var(--ld-semantic-color-text-subtle, #74767c)',
  fontFamily: 'var(--ld-semantic-font-family-sans)',
  marginBottom: '24px',
  lineHeight: '1.5',
};

const cardStyle: React.CSSProperties = {
  background: 'var(--ld-semantic-color-fill-surface-primary, #fff)',
  borderRadius: '8px',
  border: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
  overflow: 'hidden',
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WCPFlagPage() {
  return (
    <ComponentPageLayout
      section="WCP Components"
      title="Flag"
      description="Contextual labels for promotions, membership tiers, confidence badges, and more. All variants use WCP semantic tokens and are fully theme-responsive."
    >
      <div>

        {/* ── Variant grid ── */}
        <section style={{ marginBottom: '56px' }}>
          <h2 style={headingStyle}>All Variants</h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
          }}>
            {WCP_FLAG_VARIANTS.map(({ variant, label }) => (
              <div
                key={variant}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  padding: '20px 16px',
                  background: 'var(--ld-semantic-color-fill-surface-primary, #fff)',
                  borderRadius: '8px',
                  border: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
                }}
              >
                <WCPFlag variant={variant} label={label} leadingIcon={VARIANT_ICONS[variant]} />
                <span style={{
                  fontSize: '11px',
                  fontFamily: 'monospace',
                  color: 'var(--ld-semantic-color-text-subtle, #74767c)',
                  textAlign: 'center',
                }}>
                  {variant}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Real-world label → variant mapping ── */}
        <section style={{ marginBottom: '56px' }}>
          <h2 style={headingStyle}>Label → Variant Mapping</h2>
          <p style={subheadStyle}>
            These are the canonical label strings and matching variants used across Walmart.com product tiles,
            search results, and the PDP. Use this as the source of truth when assigning a flag to a product badge.
          </p>

          <div style={cardStyle}>
            {/* Header */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '160px 180px minmax(0,1fr) minmax(0,1.5fr)',
              padding: '10px 16px',
              background: 'var(--ld-semantic-color-fill-surface-secondary, #f5f5f6)',
              borderBottom: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
              gap: '12px',
            }}>
              {['Live preview', 'Label text', 'Variant', 'When to use'].map(h => (
                <span key={h} style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: 'var(--ld-semantic-color-text-subtle, #74767c)',
                  fontFamily: 'var(--ld-semantic-font-family-sans)',
                }}>
                  {h}
                </span>
              ))}
            </div>

            {/* Group rows by category */}
            {(() => {
              const categories = Array.from(new Set(LABEL_RULES.map(r => r.category)));
              return categories.map(cat => {
                const rows = LABEL_RULES.filter(r => r.category === cat);
                return (
                  <React.Fragment key={cat}>
                    {/* Category header row */}
                    <div style={{
                      padding: '8px 16px',
                      background: 'var(--ld-semantic-color-background-subtle, #f5f5f6)',
                      borderBottom: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
                      borderTop: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
                    }}>
                      <span style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: 'var(--ld-semantic-color-text-brand, #0071dc)',
                        fontFamily: 'var(--ld-semantic-font-family-sans)',
                      }}>
                        {cat}
                      </span>
                    </div>

                    {/* Data rows for this category */}
                    {rows.map((rule, i) => (
                      <div
                        key={`${rule.label}-${rule.variant}`}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '160px 180px minmax(0,1fr) minmax(0,1.5fr)',
                          padding: '14px 16px',
                          alignItems: 'start',
                          gap: '12px',
                          borderBottom: i < rows.length - 1
                            ? '1px solid var(--ld-semantic-color-separator, #e3e4e5)'
                            : 'none',
                        }}
                      >
                        {/* Live preview */}
                        <div style={{ paddingTop: '2px' }}>
                          <WCPFlag variant={rule.variant} label={rule.label} leadingIcon={rule.icon} />
                        </div>

                        {/* Label text */}
                        <div style={{
                          fontSize: '13px',
                          fontWeight: 600,
                          fontFamily: 'var(--ld-semantic-font-family-sans)',
                          color: 'var(--ld-semantic-color-text-primary, #2e2f32)',
                          paddingTop: '3px',
                        }}>
                          "{rule.label}"
                        </div>

                        {/* Variant */}
                        <div style={{ paddingTop: '3px' }}>
                          <code style={{
                            fontSize: '12px',
                            fontFamily: 'monospace',
                            fontWeight: 600,
                            color: 'var(--ld-semantic-color-text-primary, #2e2f32)',
                            background: 'var(--ld-semantic-color-fill-surface-secondary, #f5f5f6)',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            display: 'block',
                            width: 'fit-content',
                            marginBottom: '4px',
                          }}>
                            {rule.variant}
                          </code>
                          <span style={{
                            fontSize: '11px',
                            fontFamily: 'var(--ld-semantic-font-family-sans)',
                            color: 'var(--ld-semantic-color-text-subtlest, #9b9ea4)',
                          }}>
                            {rule.context}
                          </span>
                        </div>

                        {/* When to use note */}
                        <div style={{
                          fontSize: '13px',
                          fontFamily: 'var(--ld-semantic-font-family-sans)',
                          color: 'var(--ld-semantic-color-text-subtle, #74767c)',
                          lineHeight: '1.5',
                          paddingTop: '3px',
                        }}>
                          {rule.note}
                        </div>
                      </div>
                    ))}
                  </React.Fragment>
                );
              });
            })()}
          </div>
        </section>

        {/* ── In Context — product tile mockup ── */}
        <section style={{ marginBottom: '56px' }}>
          <h2 style={headingStyle}>In Context — Product Tiles</h2>
          <p style={subheadStyle}>
            Flags appear in the top-left corner of product tiles (WCPItemTile) as an absolute overlay over
            the product image. They should never stack — only one flag per tile.
          </p>

          <div style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            padding: '24px',
            background: 'var(--ld-semantic-color-background-subtle, #f5f5f6)',
            borderRadius: '8px',
            border: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
          }}>
            {[
              { label: 'Best seller', variant: 'confidence-bold' as WCPFlagVariant, icon: undefined },
              { label: 'Rollback',    variant: 'savings-bold' as WCPFlagVariant, icon: undefined },
              { label: 'Deal',        variant: 'confidence-bold' as WCPFlagVariant, icon: undefined },
              { label: 'Popular pick',variant: 'confidence-bold' as WCPFlagVariant, icon: undefined },
              { label: 'Clearance',   variant: 'urgent' as WCPFlagVariant, icon: undefined },
              { label: 'Only 2 left!', variant: 'scarcity' as WCPFlagVariant, icon: <Hourglass {...ICON_SIZE} /> },
            ].map(({ label, variant, icon }) => (
              <MockTile key={`${label}-${variant}`} label={label} variant={variant} icon={icon} />
            ))}
          </div>
        </section>

        {/* ── Rules ── */}
        <section style={{ marginBottom: '56px' }}>
          <h2 style={headingStyle}>Rules</h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <RulesCard
              type="do"
              rules={[
                'Use the canonical label text shown in the mapping table above — label strings are copy-reviewed.',
                'Match the label\'s intent to the variant: savings labels on savings variants, confidence labels on confidence variants.',
                'Use "Rollback" with holiday-restricted (gray) — Rollback is a price restoration, not a bold promotion.',
                'Use "Only X left!" with scarcity (orange) to signal urgency about inventory.',
                'Use urgent (yellow) for clearance in flash-deals contexts only — it communicates heightened urgency.',
                'Use holiday-member (green) exclusively for Walmart+ member benefit pricing.',
                'Keep flags to one per tile — never stack two flags on the same product image.',
              ]}
            />
            <RulesCard
              type="dont"
              rules={[
                'Don\'t use savings-bold (red) for non-savings labels — it signals the highest savings emphasis.',
                'Don\'t use urgent (yellow/dark red) outside of flash-deals — it reads as critical urgency.',
                'Don\'t invent new label strings — all labels are defined by the merchandising copy team.',
                'Don\'t use holiday-member for generic promotions — green is reserved for Walmart+ membership signals.',
                'Don\'t add icons to "Rollback" flags — the Rollback label is icon-free by convention.',
                'Don\'t place a flag on every tile — flags exist to differentiate, not to be the default state.',
              ]}
            />
          </div>
        </section>

        {/* ── Token reference table ── */}
        <section style={{ marginBottom: '56px' }}>
          <h2 style={headingStyle}>Token Reference</h2>
          <p style={subheadStyle}>
            All variants use <code style={{ fontFamily: 'monospace' }}>--wcp-semantic-color-fill-*</code> for background
            and <code style={{ fontFamily: 'monospace' }}>--wcp-semantic-color-text-on-fill-*</code> for text — proper semantic pairs.{' '}
            <strong>brand-subtle</strong> <span style={{ opacity: 0.7 }}>(*)</span> is the lone exception — it uses LD brand tokens
            so it tracks brand-theme overrides (Bodega green, etc.).
          </p>

          <div style={cardStyle}>
            {/* Header row */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '130px minmax(0,1fr) minmax(0,1.6fr) minmax(0,1.6fr)',
              padding: '10px 16px',
              background: 'var(--ld-semantic-color-fill-surface-secondary, #f5f5f6)',
              borderBottom: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
            }}>
              {['Preview', 'Variant', 'Fill token (bg)', 'Text-on-fill token'].map(h => (
                <span key={h} style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: 'var(--ld-semantic-color-text-subtle, #74767c)',
                  fontFamily: 'var(--ld-semantic-font-family-sans)',
                }}>
                  {h}
                </span>
              ))}
            </div>

            {/* Data rows */}
            {WCP_FLAG_VARIANTS.map((meta, i) => (
              <div
                key={meta.variant}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '130px minmax(0,1fr) minmax(0,1.6fr) minmax(0,1.6fr)',
                  padding: '12px 16px',
                  alignItems: 'center',
                  borderBottom: i < WCP_FLAG_VARIANTS.length - 1
                    ? '1px solid var(--ld-semantic-color-separator, #e3e4e5)'
                    : 'none',
                }}
              >
                <div><WCPFlag variant={meta.variant} label="Flag name" /></div>

                <div>
                  <code style={{
                    fontSize: '12px',
                    fontFamily: 'monospace',
                    fontWeight: 600,
                    color: 'var(--ld-semantic-color-text-primary, #2e2f32)',
                  }}>
                    {meta.variant}
                  </code>
                  <span style={{
                    display: 'block',
                    fontSize: '11px',
                    color: 'var(--ld-semantic-color-text-subtle, #74767c)',
                    marginTop: '2px',
                    fontFamily: 'var(--ld-semantic-font-family-sans)',
                  }}>
                    {meta.description}
                  </span>
                </div>

                <div style={{ fontSize: '11px', fontFamily: 'monospace', color: 'var(--ld-semantic-color-text-secondary, #74767c)', paddingRight: '8px' }}>
                  {BG_TOKENS[meta.variant]}
                </div>

                <div style={{ fontSize: '11px', fontFamily: 'monospace', color: 'var(--ld-semantic-color-text-secondary, #74767c)' }}>
                  {TEXT_TOKENS[meta.variant]}
                </div>
              </div>
            ))}
          </div>

          <p style={{ fontSize: '12px', color: 'var(--ld-semantic-color-text-subtle, #74767c)', fontFamily: 'var(--ld-semantic-font-family-sans)', marginTop: '10px' }}>
            * brand-subtle uses LD brand tokens by design — it responds to brand-theme overrides (Bodega: green).
          </p>
        </section>

        {/* ── Inline ── */}
        <section>
          <h2 style={headingStyle}>Inline Display</h2>
          <p style={subheadStyle}>
            Flags are inline elements that size to their content and sit naturally alongside text or within list items.
          </p>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            padding: '24px',
            background: 'var(--ld-semantic-color-fill-surface-primary, #fff)',
            borderRadius: '8px',
            border: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
          }}>
            {WCP_FLAG_VARIANTS.map(m => (
              <WCPFlag key={m.variant} variant={m.variant} label={m.label} leadingIcon={VARIANT_ICONS[m.variant]} />
            ))}
          </div>
        </section>

      </div>
    </ComponentPageLayout>
  );
}

// ─── Internal helpers ─────────────────────────────────────────────────────────

function MockTile({
  label,
  variant,
  icon,
}: {
  label: string;
  variant: WCPFlagVariant;
  icon?: React.ReactNode;
}) {
  return (
    <div style={{
      width: '140px',
      background: 'var(--ld-semantic-color-fill-surface-primary, #fff)',
      borderRadius: '8px',
      border: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
      overflow: 'hidden',
      flexShrink: 0,
    }}>
      {/* Image placeholder with flag overlay */}
      <div style={{ position: 'relative', height: '120px', background: 'var(--ld-semantic-color-fill-surface-secondary, #f5f5f6)' }}>
        <div style={{
          position: 'absolute',
          top: '8px',
          left: '8px',
          zIndex: 1,
        }}>
          <WCPFlag variant={variant} label={label} leadingIcon={icon} />
        </div>
        {/* Placeholder product image */}
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--ld-semantic-color-text-subtlest, #c5c7cb)',
          fontSize: '11px',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
        }}>
          Product image
        </div>
      </div>

      {/* Price + name */}
      <div style={{ padding: '8px' }}>
        <div style={{
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          fontWeight: 700,
          fontSize: '16px',
          color: 'var(--ld-semantic-color-text-primary, #2e2f32)',
          marginBottom: '4px',
        }}>
          $24<sup style={{ fontSize: '10px', fontWeight: 400 }}>98</sup>
        </div>
        <div style={{
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          fontSize: '12px',
          color: 'var(--ld-semantic-color-text-subtle, #74767c)',
          lineHeight: '1.4',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          Product name goes here
        </div>
      </div>
    </div>
  );
}

function RulesCard({ type, rules }: { type: 'do' | 'dont'; rules: string[] }) {
  const isDo = type === 'do';
  return (
    <div style={{
      background: 'var(--ld-semantic-color-fill-surface-primary, #fff)',
      borderRadius: '8px',
      border: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
      overflow: 'hidden',
    }}>
      <div style={{
        padding: '12px 16px',
        background: isDo
          ? 'var(--ld-semantic-color-fill-positive-subtle, #e8f5ed)'
          : 'var(--ld-semantic-color-fill-negative-subtle, #fce8e7)',
        borderBottom: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
      }}>
        <span style={{
          fontSize: '13px',
          fontWeight: 700,
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: isDo
            ? 'var(--ld-semantic-color-text-positive, #1a7a34)'
            : 'var(--ld-semantic-color-text-negative, #b00)',
        }}>
          {isDo ? '✓  Do' : '✕  Don\'t'}
        </span>
      </div>
      <ul style={{
        margin: 0,
        padding: '16px 16px 16px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}>
        {rules.map((r, i) => (
          <li key={i} style={{
            fontSize: '13px',
            fontFamily: 'var(--ld-semantic-font-family-sans)',
            color: 'var(--ld-semantic-color-text-primary, #2e2f32)',
            lineHeight: '1.5',
          }}>
            {r}
          </li>
        ))}
      </ul>
    </div>
  );
}
