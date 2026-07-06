import React, { useState, useCallback } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { Link } from '@/components/ui/Link';

/* ── Helpers ── */

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{
      backgroundColor: 'var(--ld-semantic-color-surface)',
      padding: '32px',
      borderRadius: '8px',
      boxShadow: 'var(--ld-semantic-elevation-100)',
    }}>
      <h3 style={{
        fontSize: '20px',
        fontWeight: 700,
        color: 'var(--ld-semantic-color-text)',
        marginBottom: '20px',
      }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

function CollapsibleSection({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  return (
    <div style={{
      backgroundColor: 'var(--ld-semantic-color-surface)',
      borderRadius: '8px',
      boxShadow: 'var(--ld-semantic-elevation-100)',
      overflow: 'hidden',
    }}>
      <Accordion type="single" collapsible defaultValue={defaultOpen ? 'section' : ''}>
        <AccordionItem value="section" style={{ borderBottom: 'none' }}>
          <AccordionTrigger style={{
            padding: '24px 32px',
            fontSize: '20px',
            fontWeight: 700,
          }}>
            {title}
          </AccordionTrigger>
          <AccordionContent>
            <div style={{ padding: '0 32px 32px' }}>
              {children}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

/* ── Prompt data for Component Designer ── */

interface Prompt {
  label: string;
  full: string;
}

const COMPONENT_PROMPTS: { category: string; value: string; prompts: Prompt[] }[] = [
  {
    category: 'Create New Components',
    value: 'create',
    prompts: [
      { label: 'Status card with icon', full: 'Create a WCP StatusCard component in client/components/walmart/ with variants: success, warning, error, info. Each variant should use semantic tokens for fill and text colors. Include a leading icon slot, title, description, and optional action button. Use CSS modules with variant class mapping. Add it to the Component Library.' },
      { label: 'Metric tile', full: 'Create a WCP MetricTile component with props: label (string), value (string|number), trend ("up"|"down"|"flat"), trendValue (string). Use semantic color tokens for trend colors (positive for up, negative for down, subtle for flat). Include a sparkline placeholder area. Use CSS modules.' },
      { label: 'Step indicator', full: 'Create a WCP StepIndicator component that shows numbered steps with states: completed, active, upcoming. Props: steps (array of {label, description}), currentStep (number). Use semantic tokens for all colors. Include connecting lines between steps that change color based on completion.' },
      { label: 'Info banner', full: 'Create a WCP InfoBanner component with visual-theme variants: default, brand, inverse. Props: title, description, icon (optional), action (optional ReactNode). Use CSS modules with variant class composition pattern: [styles.banner, styles[variant]].filter(Boolean).join(" ").' },
    ],
  },
  {
    category: 'Enhance Existing Components',
    value: 'enhance',
    prompts: [
      { label: 'Add variant to WCPFlag', full: 'Add a new "loyalty" variant to the WCPFlag component. It should use a gold/amber color scheme with dark text. Update the WCP_FLAG_VARIANTS metadata array, add the CSS class in WCPFlag.module.css using semantic tokens, and update the Component Library page to show the new variant.' },
      { label: 'Add size to a component', full: 'Add an "xlarge" size variant to the existing Button component. It should be 56px tall with 20px horizontal padding and 18px font size. Add the CSS class, update the TypeScript type union, and add it to the Component Sandbox.' },
      { label: 'Make component responsive', full: 'Make the existing DataTable component responsive. At 768px and below, switch to a card-based layout where each row becomes a stacked card. Use CSS modules with media queries at the standard breakpoints (1024px, 768px, 480px).' },
      { label: 'Add animation', full: 'Add a subtle entrance animation to the Alert component. Use @keyframes for a slide-down + fade-in effect with 250ms duration and ease-out timing. Include a @media (prefers-reduced-motion: reduce) override that disables the animation.' },
    ],
  },
  {
    category: 'Component Documentation',
    value: 'docs',
    prompts: [
      { label: 'Add to Component Library', full: 'Create a new Component Library documentation page for [ComponentName]. Include: a live rendered example of each variant, a props reference table, import path, and usage guidelines. Register the page in App.tsx and add it to the ComponentLibraryLayout sidebar navigation.' },
      { label: 'Add to Component Sandbox', full: 'Add [ComponentName] to the Component Sandbox (ComponentTester.tsx). Include interactive controls for all major props (variant, size, etc.) using Chip selectors and TextField inputs. Add a live code example that updates as props change.' },
      { label: 'Write component guideline', full: 'Write a component guideline markdown file in guidelines/components/ for [ComponentName]. Include: when to use, when not to use, variant descriptions, prop reference table, accessibility notes, and code examples for each variant.' },
    ],
  },
  {
    category: 'Component Patterns',
    value: 'patterns',
    prompts: [
      { label: 'Compound component', full: 'Create a compound component pattern with a parent container and child sub-components. Example: <CardGroup><CardGroupItem title="..." /><CardGroupItem title="..." /></CardGroup>. The parent should manage layout and spacing, children should be self-contained. Use React.Children or context for communication.' },
      { label: 'Controlled + uncontrolled', full: 'Implement a component that supports both controlled and uncontrolled usage patterns. Accept an optional "value" prop for controlled mode and a "defaultValue" for uncontrolled. Use an internal state that defers to the controlled prop when provided. Follow the WCPHeartView pattern.' },
      { label: 'Portal-based overlay', full: 'Create an overlay component (tooltip, popover, or dropdown) that renders via a React portal to escape overflow:hidden ancestors. Use the existing Popover pattern from @/components/ui/Popover as a reference. Never use absolute positioning without a portal.' },
    ],
  },
];

function PromptChip({ prompt }: { prompt: Prompt }) {
  const [copied, setCopied] = useState(false);
  const [showFull, setShowFull] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(prompt.full);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Fallback: select text for manual copy
    }
  }, [prompt.full]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
        <button
          onClick={handleCopy}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 14px',
            backgroundColor: copied
              ? 'var(--ld-semantic-color-fill-positive-subtle)'
              : 'var(--ld-semantic-color-fill-subtle)',
            border: `1px solid ${copied ? 'var(--ld-semantic-color-border-positive)' : 'var(--ld-semantic-color-border-moderate)'}`,
            borderRadius: '9999px',
            fontSize: '13px',
            fontWeight: 500,
            color: copied
              ? 'var(--ld-semantic-color-text-positive)'
              : 'var(--ld-semantic-color-text)',
            cursor: 'pointer',
            fontFamily: 'var(--ld-semantic-font-family-sans)',
            lineHeight: '20px',
            transition: 'all 150ms ease',
            whiteSpace: 'nowrap',
          }}
          title="Click to copy full prompt"
        >
          <span style={{ fontSize: '12px', flexShrink: 0 }}>
            {copied ? '\u2713' : '\u2398'}
          </span>
          {copied ? 'Copied!' : prompt.label}
        </button>
        <button
          onClick={() => setShowFull(!showFull)}
          style={{
            background: 'none',
            border: 'none',
            padding: '2px',
            cursor: 'pointer',
            color: 'var(--ld-semantic-color-text-subtle)',
            fontSize: '11px',
            fontFamily: 'var(--ld-semantic-font-family-sans)',
            lineHeight: 1,
            opacity: 0.6,
          }}
          title={showFull ? 'Hide full prompt' : 'Show full prompt'}
        >
          {showFull ? '\u25B2' : '\u25BC'}
        </button>
      </div>
      {showFull && (
        <div style={{
          marginTop: '6px',
          marginLeft: '8px',
          padding: '10px 14px',
          backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
          borderRadius: '6px',
          borderLeft: '3px solid var(--ld-semantic-color-border-brand)',
          fontSize: '13px',
          lineHeight: 1.6,
          color: 'var(--ld-semantic-color-text-subtle)',
        }}>
          &ldquo;{prompt.full}&rdquo;
        </div>
      )}
    </div>
  );
}

/* ── Main ── */

export function GettingStartedComponentDesigner() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingTop: '24px' }}>

      {/* Intro */}
      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-brand-subtle)',
        padding: '24px 32px',
        borderRadius: '8px',
        borderLeft: '5px solid var(--ld-semantic-color-border-brand)',
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: 700,
          color: 'var(--ld-semantic-color-text)',
          marginBottom: '8px',
        }}>
          Component Designer
        </h3>
        <p style={{
          fontSize: '15px',
          lineHeight: 1.7,
          color: 'var(--ld-semantic-color-text-subtle)',
          margin: 0,
        }}>
          This guide covers how to design, create, and extend components within the Living Design 3.5
          system. Whether you&rsquo;re building a new WCP component, adding variants to an existing one,
          or documenting components for the library &mdash; these patterns and prompts will help you
          follow the system correctly.
        </p>
      </div>

      {/* Component Anatomy */}
      <SectionCard title="Component Anatomy">
        <p style={{
          fontSize: '14px',
          lineHeight: 1.6,
          color: 'var(--ld-semantic-color-text-subtle)',
          marginBottom: '20px',
        }}>
          Every well-designed component in the LD 3.5 system follows a consistent structure.
          Understanding these layers helps you design components that integrate seamlessly.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '12px',
        }}>
          {[
            { label: 'Props & Variants', desc: 'TypeScript interface with string union types for variants. Optional props with sensible defaults. Named exports only.' },
            { label: 'Semantic Tokens', desc: 'All visual values come from --ld-semantic-color-*, --ld-semantic-font-*, and spacing tokens. Zero hardcoded hex values.' },
            { label: 'CSS Modules', desc: 'One .module.css file per component. Variant classes mapped via styles[variant]. Responsive breakpoints at 1024/768/480px.' },
            { label: 'Accessibility', desc: 'Proper ARIA roles and labels. Keyboard navigation. Visible focus states. prefers-reduced-motion support for animations.' },
            { label: 'Interactive States', desc: 'Hover, focus, active, and disabled states handled via CSS. Never disable buttons — change labels instead.' },
            { label: 'Documentation', desc: 'Component Library page with live examples. Props table. Import path. Optional Component Sandbox entry.' },
          ].map((item) => (
            <div key={item.label} style={{
              padding: '16px',
              backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
              borderRadius: '6px',
            }}>
              <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '4px', color: 'var(--ld-semantic-color-text)' }}>
                {item.label}
              </div>
              <div style={{ fontSize: '14px', lineHeight: 1.5, color: 'var(--ld-semantic-color-text-subtle)' }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Component Types */}
      <SectionCard title="LD vs WCP Components">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '16px',
          }}>
            <div style={{
              padding: '20px',
              backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
              borderRadius: '8px',
              borderTop: '4px solid var(--ld-semantic-color-border-brand)',
            }}>
              <div style={{ fontWeight: 700, fontSize: '16px', marginBottom: '8px', color: 'var(--ld-semantic-color-text)' }}>
                LD Components
              </div>
              <div style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', marginBottom: '12px' }}>
                Design system primitives that live in <code style={{ fontFamily: 'var(--ld-semantic-font-family-mono)', fontSize: '13px' }}>client/components/ui/</code>.
                These are the building blocks: Button, TextField, Card, Modal, etc.
              </div>
              <div style={{ fontSize: '13px', color: 'var(--ld-semantic-color-text-subtle)' }}>
                <strong>Variants:</strong> action-intent (primary, secondary, tertiary, destructive)
              </div>
            </div>
            <div style={{
              padding: '20px',
              backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
              borderRadius: '8px',
              borderTop: '4px solid var(--ld-semantic-color-border-positive)',
            }}>
              <div style={{ fontWeight: 700, fontSize: '16px', marginBottom: '8px', color: 'var(--ld-semantic-color-text)' }}>
                WCP Components
              </div>
              <div style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', marginBottom: '12px' }}>
                Product-level components built on LD primitives, in <code style={{ fontFamily: 'var(--ld-semantic-font-family-mono)', fontSize: '13px' }}>client/components/walmart/</code>.
                These are domain-specific: WCPFlag, WCPHeartView, WCPQueueBanner, etc.
              </div>
              <div style={{ fontSize: '13px', color: 'var(--ld-semantic-color-text-subtle)' }}>
                <strong>Variants:</strong> visual-theme (default, brand, inverse)
              </div>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Variant Naming Rules */}
      <SectionCard title="Variant Naming Rules">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { type: 'Action-intent', values: 'primary | secondary | tertiary | destructive', use: 'Button, IconButton only' },
            { type: 'Visual-theme', values: 'default | brand | inverse', use: 'WCP banners, callouts, promo components' },
            { type: 'Status/sentiment', values: 'success | warning | error | info | neutral', use: 'Tag, Alert, Badge' },
          ].map((rule) => (
            <div key={rule.type} style={{
              display: 'grid',
              gridTemplateColumns: '160px 1fr 1fr',
              gap: '16px',
              padding: '12px 16px',
              backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
              borderRadius: '6px',
              fontSize: '14px',
              alignItems: 'center',
            }}>
              <strong style={{ color: 'var(--ld-semantic-color-text)' }}>{rule.type}</strong>
              <code style={{ fontFamily: 'var(--ld-semantic-font-family-mono)', fontSize: '13px', color: 'var(--ld-semantic-color-text-subtle)' }}>
                {rule.values}
              </code>
              <span style={{ color: 'var(--ld-semantic-color-text-subtle)' }}>{rule.use}</span>
            </div>
          ))}
        </div>
        <div style={{
          marginTop: '16px',
          padding: '12px 16px',
          backgroundColor: 'var(--ld-semantic-color-fill-warning-subtle)',
          borderRadius: '6px',
          fontSize: '13px',
          color: 'var(--ld-semantic-color-text)',
        }}>
          Never mix naming schemes: don&rsquo;t use &ldquo;primary&rdquo; on a visual-theme component or &ldquo;brand&rdquo; on an action component.
        </div>
      </SectionCard>

      {/* Component Designer Prompts */}
      <SectionCard title="Component Designer Prompts">
        <p style={{
          fontSize: '14px',
          lineHeight: 1.6,
          color: 'var(--ld-semantic-color-text-subtle)',
          marginBottom: '20px',
        }}>
          Click any chip to copy a component design prompt to your clipboard. These prompts
          enforce LD 3.5 patterns and will produce components that follow the system rules.
        </p>
        <Accordion type="multiple" defaultValue={['create']}>
          {COMPONENT_PROMPTS.map(({ category, value, prompts }) => (
            <AccordionItem key={value} value={value}>
              <AccordionTrigger>{category}</AccordionTrigger>
              <AccordionContent>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', flexDirection: 'column' }}>
                  {prompts.map((prompt) => (
                    <PromptChip key={prompt.label} prompt={prompt} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </SectionCard>

      {/* Creation Checklist */}
      <SectionCard title="Pre-Creation Checklist">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            'Search existing components in client/components/ui/ and client/components/walmart/ before creating anything new',
            'Search all 303+ icons at /component-library/icons before creating custom icons',
            'Check guidelines/components/ for existing documentation on similar components',
            'Confirm using semantic design tokens only (no hardcoded hex colors or font sizes)',
            'Plan all interactive states: hover, focus, active, disabled',
            'Plan responsive breakpoints: 1024px, 768px, 480px',
            'Plan prefers-reduced-motion override for any animations',
            'Choose the correct variant naming scheme (action-intent vs visual-theme vs status)',
            'Decide file location: client/components/ui/ (LD) or client/components/walmart/ (WCP)',
            'Plan documentation: Component Library page and/or Component Sandbox entry',
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex',
              gap: '12px',
              padding: '10px 16px',
              backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
              borderRadius: '6px',
              fontSize: '14px',
              lineHeight: 1.5,
              color: 'var(--ld-semantic-color-text-subtle)',
              alignItems: 'flex-start',
            }}>
              <span style={{
                minWidth: '20px',
                height: '20px',
                border: '2px solid var(--ld-semantic-color-border-moderate)',
                borderRadius: '4px',
                flexShrink: 0,
                marginTop: '2px',
              }} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* File Structure Template */}
      <CollapsibleSection title="File Structure Template" defaultOpen>
        <p style={{
          fontSize: '14px',
          lineHeight: 1.6,
          color: 'var(--ld-semantic-color-text-subtle)',
          marginBottom: '16px',
        }}>
          A new WCP component follows this file structure:
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {[
            { path: 'client/components/walmart/MyComponent.tsx', desc: 'Component source with TypeScript interface and named export' },
            { path: 'client/components/walmart/MyComponent.module.css', desc: 'CSS module with variant classes and semantic tokens' },
            { path: 'client/pages/component-library/MyComponent.tsx', desc: 'Documentation page with live examples and props table' },
            { path: 'guidelines/components/MyComponent.md', desc: 'Usage guidelines, when to use, accessibility notes' },
          ].map((item) => (
            <div key={item.path} style={{
              display: 'grid',
              gridTemplateColumns: '380px 1fr',
              gap: '16px',
              padding: '10px 16px',
              backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
              borderRadius: '6px',
              fontSize: '14px',
              alignItems: 'center',
            }}>
              <code style={{ fontFamily: 'var(--ld-semantic-font-family-mono)', fontSize: '13px', color: 'var(--ld-semantic-color-text)' }}>
                {item.path}
              </code>
              <span style={{ color: 'var(--ld-semantic-color-text-subtle)' }}>{item.desc}</span>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Token Quick Reference */}
      <CollapsibleSection title="Token Quick Reference">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            {
              title: 'Colors',
              tokens: [
                { token: '--ld-semantic-color-text', use: 'Primary text' },
                { token: '--ld-semantic-color-text-subtle', use: 'Secondary text' },
                { token: '--ld-semantic-color-text-brand', use: 'Brand-colored text' },
                { token: '--ld-semantic-color-surface', use: 'Card/panel background' },
                { token: '--ld-semantic-color-fill-subtle', use: 'Subtle background fill' },
                { token: '--ld-semantic-color-separator', use: 'Divider lines (not border-subtle)' },
              ],
            },
            {
              title: 'Spacing',
              tokens: [
                { token: '--ld-primitive-scale-space-050', use: '4px' },
                { token: '--ld-primitive-scale-space-100', use: '8px' },
                { token: '--ld-primitive-scale-space-150', use: '12px' },
                { token: '--ld-primitive-scale-space-200', use: '16px' },
                { token: '--ld-primitive-scale-space-300', use: '24px' },
                { token: '--ld-primitive-scale-space-400', use: '32px' },
              ],
            },
            {
              title: 'Border Radius',
              tokens: [
                { token: '--ld-primitive-scale-borderradius-050', use: '4px' },
                { token: '--ld-primitive-scale-borderradius-100', use: '8px' },
                { token: '--ld-primitive-scale-borderradius-200', use: '16px' },
                { token: '--ld-primitive-scale-borderradius-round', use: '9999px (pill)' },
              ],
            },
          ].map((group) => (
            <div key={group.title}>
              <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '8px', color: 'var(--ld-semantic-color-text)' }}>
                {group.title}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {group.tokens.map((t) => (
                  <div key={t.token} style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 120px',
                    gap: '16px',
                    padding: '8px 12px',
                    backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                    borderRadius: '4px',
                    fontSize: '13px',
                    alignItems: 'center',
                  }}>
                    <code style={{ fontFamily: 'var(--ld-semantic-font-family-mono)', color: 'var(--ld-semantic-color-text)' }}>
                      {t.token}
                    </code>
                    <span style={{ color: 'var(--ld-semantic-color-text-subtle)' }}>{t.use}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Related Pages */}
      <SectionCard title="Related Pages">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          {[
            { label: 'Component Sandbox', path: '/component-library/component-tester' },
            { label: 'Themes & Tokens', path: '/component-library/themes' },
            { label: 'Icons', path: '/component-library/icons' },
            { label: 'Guidelines', path: '/component-library/guidelines' },
            { label: 'Buttons', path: '/component-library/buttons' },
            { label: 'WCP Queue', path: '/component-library/wcp-queue' },
          ].map((item) => (
            <Link key={item.path} href={item.path} style={{
              padding: '10px 20px',
              backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              textDecoration: 'none',
            }}>
              {item.label}
            </Link>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
