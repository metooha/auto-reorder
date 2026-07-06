import React from 'react';
import { SectionCard, CodeBlock } from './shared';

export function PreImplementationSection() {
  return (
    <SectionCard title="Pre-Implementation Checklist">
      <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', marginBottom: '16px' }}>
        Before writing any JSX, the agent must complete every step:
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {[
          { step: 'Search the component inventory', detail: 'Scan client/components/ui/ for an existing Living Design 3.5 component. Check guidelines/ for documentation.' },
          { step: 'Read the component docs', detail: 'Open the matching .md file to understand available props, variants, sizes, and states. Never guess the API.' },
          { step: 'Compose before creating', detail: 'If no single component matches, compose existing components together. Do not create a new component when composition works.' },
          { step: 'Resolve all values to tokens', detail: 'Every color, spacing, border-radius, elevation, and font must use a var(--ld-semantic-*) token. Zero hard-coded values.' },
          { step: 'Include all interactive states', detail: 'Hover, focus, active, and disabled states must use the appropriate token variants (-hovered, -pressed, -disabled).' },
          { step: 'Output accessible markup', detail: 'Semantic HTML, ARIA attributes, keyboard handlers, and focus management. WCAG 2.1 AA compliance is mandatory.' },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: '16px', padding: '16px 20px', backgroundColor: 'var(--ld-semantic-color-fill-subtle)', borderRadius: '8px' }}>
            <div style={{
              minWidth: '32px', height: '32px',
              backgroundColor: 'var(--ld-semantic-color-fill-brand-subtle)',
              borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, fontSize: '14px', color: 'var(--ld-semantic-color-text-brand-bold)',
            }}>{i + 1}</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '4px', color: 'var(--ld-semantic-color-text)' }}>{item.step}</div>
              <div style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)' }}>{item.detail}</div>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

export function ProhibitionsSection() {
  return (
    <SectionCard title="What Agents Must Never Do">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {[
          'Hard-code hex colors, pixel values, or font families — always use semantic tokens',
          'Create custom buttons, inputs, or form controls when a library component exists',
          'Use inline SVGs or external icon libraries (react-icons, heroicons) — use project icon library',
          'Use emojis in UI — use icons from the icon library instead',
          'Override component styles with className or inline style overrides on LD components',
          'Use placeholder images from external services (unsplash, picsum, placeholder.com)',
          'Skip interactive states (hover, focus, active, disabled) on interactive elements',
          'Create new components without following the full creation process (TSX, CSS module, example, guideline doc, route)',
          'Write user-facing strings directly — all strings must use i18n translation keys',
          'Invent new breakpoints — use standard 1024px, 768px, 480px only',
        ].map((rule, i) => (
          <div key={i} style={{
            display: 'flex', gap: '12px', padding: '12px 16px',
            backgroundColor: 'var(--ld-semantic-color-fill-negative-subtle)',
            borderRadius: '6px', fontSize: '14px', lineHeight: 1.5,
            color: 'var(--ld-semantic-color-text-subtle)', alignItems: 'flex-start',
          }}>
            <span style={{ color: 'var(--ld-semantic-color-text-negative)', fontWeight: 700, flexShrink: 0 }}>x</span>
            <span>{rule}</span>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

export function TokenUsagePatternSection() {
  return (
    <SectionCard title="Token Usage Pattern">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <div style={{ fontWeight: 700, marginBottom: '8px', fontSize: '14px', color: 'var(--ld-semantic-color-text-positive)' }}>
            Correct — Semantic tokens with fallbacks
          </div>
          <CodeBlock>{`background: var(--ld-semantic-color-action-fill-primary, #0071DC);
color: var(--ld-semantic-color-text, #2E2F32);
border: 1px solid var(--ld-semantic-color-border-strong, #74767C);
box-shadow: var(--ld-semantic-elevation-100);
font-family: var(--ld-semantic-font-family-sans);`}</CodeBlock>
        </div>
        <div>
          <div style={{ fontWeight: 700, marginBottom: '8px', fontSize: '14px', color: 'var(--ld-semantic-color-text-negative)' }}>
            Wrong — Hard-coded values
          </div>
          <CodeBlock>{`background: #0071DC;
color: #2E2F32;
border: 1px solid #74767C;
box-shadow: 0 2px 4px rgba(0,0,0,0.1);
font-family: Arial, sans-serif;`}</CodeBlock>
        </div>
      </div>
    </SectionCard>
  );
}

export function NewComponentChecklistSection() {
  return (
    <SectionCard title="New Component Creation Checklist">
      <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', marginBottom: '16px' }}>
        Only create a new component when no existing component or composition can solve the need.
        If creation is justified, complete every step:
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px' }}>
        {[
          'Confirm no existing component fits (search + document why)',
          'Create component: client/components/ui/ComponentName.tsx',
          'Create CSS module: client/components/ui/ComponentName.module.css',
          'Use only semantic tokens in all styles',
          'Include all variants, sizes, and states from spec',
          'Create example: client/components/examples/ComponentNameExample.tsx',
          'Create guideline: guidelines/components/ComponentName.md',
          'Add page: client/pages/component-library/ComponentName.tsx',
          'Register route in App.tsx and add to Overview',
          'Register in Component Sandbox for interactive testing',
          'Add translation keys for all 3 locales (en, es, fr)',
          'Update GuidelinesDocIndex.tsx with the new doc entry',
        ].map((item, i) => (
          <div key={i} style={{
            display: 'flex', gap: '10px', padding: '10px 14px',
            backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
            borderRadius: '6px', fontSize: '13px', lineHeight: 1.5,
            color: 'var(--ld-semantic-color-text-subtle)', alignItems: 'flex-start',
          }}>
            <span style={{
              minWidth: '18px', height: '18px',
              border: '2px solid var(--ld-semantic-color-border-strong)',
              borderRadius: '4px', flexShrink: 0, marginTop: '1px',
            }} />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

export function FigmaWorkflowSection() {
  return (
    <SectionCard title="Figma-to-Code Workflow">
      <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', marginBottom: '16px' }}>
        When processing Figma imports via the Builder.io plugin, post-process through these validation gates:
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {[
          { label: 'Check .figmaignore', detail: "Before importing, verify the .figmaignore file exists in the project root. This excludes binary fonts, images, build output, lockfiles, and server code that cause parsing errors in Figma Make. If missing, create it." },
          { label: 'Component Mapping', detail: 'Replace raw HTML elements with library components. A Figma "button" must become <Button variant="..." size="...">.' },
          { label: 'Token Resolution', detail: "Map all Figma color, spacing, and typography values to the nearest semantic token. Flag any that don't have an exact match." },
          { label: 'Icon Substitution', detail: 'Replace inline SVGs with matching icons from client/components/icons/. Create new ones in icons-custom/ if needed.' },
          { label: 'State Completeness', detail: 'Figma frames often show only default state. Add hover, focus, active, and disabled states using token variants.' },
          { label: 'Accessibility Audit', detail: "Add ARIA labels, roles, and keyboard handlers that Figma designs don't encode." },
        ].map((gate, i) => (
          <div key={i} style={{ display: 'flex', gap: '16px', padding: '16px 20px', borderLeft: '3px solid var(--ld-semantic-color-border-brand)', marginLeft: '16px' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '4px', color: 'var(--ld-semantic-color-text)' }}>{gate.label}</div>
              <div style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)' }}>{gate.detail}</div>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
