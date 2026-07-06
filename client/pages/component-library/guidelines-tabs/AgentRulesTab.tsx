import React from 'react';

const agentSteps = [
  { step: 1, title: 'Search the component inventory', detail: 'Scan client/components/ui/ for an existing Living Design 3.5 component that matches the need. Check design-system-docs/ and guidelines/ for documentation and usage examples.' },
  { step: 2, title: 'Read the component docs', detail: 'Open the matching .mdx or .md file to understand available props, variants, sizes, and states. Never guess -- always reference the documented API.' },
  { step: 3, title: 'Compose before creating', detail: 'If no single component matches, compose existing components together. A card with actions is a <div> with elevation tokens + <Button> -- not a new custom component.' },
  { step: 4, title: 'Resolve all visual values to tokens', detail: 'Every color, spacing value, border-radius, elevation, and font reference must use a var(--ld-semantic-*) token. Zero hard-coded hex, px, or rem values allowed.' },
  { step: 5, title: 'Include all interactive states', detail: 'Generated components must include hover, focus, active, and disabled states using the appropriate token variants (e.g. -hovered, -pressed, -disabled).' },
  { step: 6, title: 'Output accessible markup', detail: 'Use semantic HTML elements, proper ARIA attributes, keyboard handlers, and focus management. WCAG 2.1 AA compliance is non-negotiable.' },
];

const uxFlowCards = [
  { title: 'Page Layout', items: ['Use existing layout primitives (AppLayout, sidebar, main content area)', 'Panels and drawers must be resizable (min 420px, max 800px)', 'Persist user width preferences in localStorage', 'Responsive behavior required for all screen sizes'] },
  { title: 'Navigation & Routing', items: ['Use existing routing structure and sidebar navigation', 'Add new routes to App.tsx following the established pattern', 'Breadcrumbs for hierarchy deeper than 2 levels', 'Maintain consistent back/forward navigation'] },
  { title: 'Data & State', items: ['Break complex pages into smaller focused components', 'Keep state as close to where it\'s used as possible', 'Use loading, empty, and error states via ContentMessage', 'Never leave a flow without a clear action or exit path'] },
  { title: 'Feedback & Confirmation', items: ['Destructive actions require confirmation via AlertDialog', 'Use Alerts for page-level success, warning, and error states', 'Progress indicators for multi-step flows', 'Use MagicBox to indicate AI-generated content while loading'] },
];

const prohibitions = [
  'Hard-code hex colors, arbitrary pixel values, or font families -- always use semantic tokens',
  'Create custom buttons, inputs, or form controls when a Living Design component exists',
  'Use inline SVGs or external icon libraries (react-icons, heroicons) -- use the project icon library in client/components/icons/',
  'Use emojis in UI code -- use icons from the icon library instead',
  'Override built-in component styles with className or inline style overrides',
  'Use placeholder images from external services (unsplash, picsum, placeholder.com)',
  'Skip interactive states (hover, focus, active, disabled) on interactive elements',
  'Create new components without the full registration process (TSX, CSS module, example, guideline doc, route, overview entry)',
];

const newComponentChecklist = [
  'Confirm no existing component fits (search + document why)',
  'Create component file: client/components/ui/ComponentName.tsx',
  'Create CSS module: client/components/ui/ComponentName.module.css',
  'Use only semantic tokens in all styles',
  'Include all variants, sizes, and states from the design spec',
  'Create example: client/components/examples/ComponentNameExample.tsx',
  'Create guideline doc: guidelines/components/ComponentName.md',
  'Add dedicated page in client/pages/component-library/',
  'Register route in App.tsx and add to component library overview',
  'Register in Component Sandbox (property tester) for interactive testing',
];

const complianceCards = [
  { title: 'Layout Rules', items: ['Pages must fill the full available width -- never constrain with max-width on content containers', 'Use align-items: stretch (not center) on flex column parents so children expand', 'Content containers must use flex: 1 to fill available height', 'Padding uses LD spacing tokens: var(--ld-semantic-spacing-*) or var(--ld-primitive-scale-space-*)'] },
  { title: 'Token Rules', items: ['Every color must use a semantic token with a hex fallback: var(--ld-semantic-color-text, #2E2F32)', 'Never hard-code hex colors (#0071DC) -- always resolve to the nearest semantic token', 'Elevation uses box-shadow tokens: var(--ld-semantic-elevation-100)', 'Typography uses font tokens: var(--ld-semantic-font-heading-large-family)'] },
  { title: 'Styling Rules', items: ['Use CSS Modules (.module.css) for all layout and component styles', 'No inline styles for colors, spacing, or layout -- only for truly dynamic values', 'No Tailwind utility classes for colors or spacing -- use token-based CSS Modules', 'Responsive breakpoints at 1024px, 768px, 480px with progressive enhancement'] },
  { title: 'Component Rules', items: ['Always import Button from uppercase path: @/components/ui/Button', 'Use ButtonGroup for multiple buttons -- never manual flex containers', 'Use Tag for labels and badges -- never custom styled spans', 'Use existing LD components before creating new ones: Reuse > Adapt > Create'] },
];

const figmaGates = [
  { label: 'Component Mapping', detail: 'Replace raw HTML elements with library components. A Figma "button" must become <Button variant="..." size="..."> -- never a styled <div> or <button>.' },
  { label: 'Token Resolution', detail: 'Map all Figma color, spacing, and typography values to the nearest semantic token. If an exact match doesn\'t exist, use the closest semantic token and flag for review.' },
  { label: 'Icon Substitution', detail: 'Replace any inline SVGs or Figma icon exports with the matching icon from client/components/icons/. If no match exists, create one in client/components/icons-custom/ following the 20x20 viewBox spec.' },
  { label: 'State Completeness', detail: 'Figma frames often show only the default state. The agent must add hover, focus, active, and disabled states using the corresponding token variants.' },
  { label: 'Accessibility Audit', detail: 'Add ARIA labels, roles, and keyboard handlers that Figma designs don\'t encode. Ensure focus order matches visual order.' },
];

export function AgentRulesTab() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingTop: '24px' }}>

      {/* Intro callout */}
      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-brand-subtle)',
        padding: '24px 32px',
        borderRadius: '8px',
        borderLeft: '5px solid var(--ld-semantic-color-border-brand)'
      }}>
        <p style={{
          fontSize: '15px',
          lineHeight: '1.7',
          color: 'var(--ld-semantic-color-text-subtle)',
          margin: 0
        }}>
          AI agents (Builder.io Fusion, Copilot, or any code-generation tool) operate under the same design-system
          contract as human developers. The rules below define how an agent must search, compose, and output UI
          so that every generated surface is indistinguishable from hand-crafted, library-compliant code.
        </p>
      </div>

      {/* Section 1 – How an Agent Builds UI */}
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
          How an Agent Builds UI
        </h3>
        <p style={{
          fontSize: '14px',
          lineHeight: '1.6',
          color: 'var(--ld-semantic-color-text-subtle)',
          marginBottom: '20px'
        }}>
          Before writing a single line of JSX, the agent follows a strict pre-implementation checklist:
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {agentSteps.map((item) => (
            <div key={item.step} style={{
              display: 'flex',
              gap: '16px',
              padding: '16px 20px',
              backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
              borderRadius: '8px'
            }}>
              <div style={{
                minWidth: '32px',
                height: '32px',
                backgroundColor: 'var(--ld-semantic-color-fill-brand-subtle)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                fontSize: '14px',
                color: 'var(--ld-semantic-color-text-brand-bold)'
              }}>{item.step}</div>
              <div>
                <div style={{ fontWeight: '700', fontSize: '14px', marginBottom: '4px', color: 'var(--ld-semantic-color-text)' }}>
                  {item.title}
                </div>
                <div style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--ld-semantic-color-text-subtle)' }}>
                  {item.detail}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2 – UX Flow Generation */}
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
          Building UX Flows
        </h3>
        <p style={{
          fontSize: '14px',
          lineHeight: '1.6',
          color: 'var(--ld-semantic-color-text-subtle)',
          marginBottom: '20px'
        }}>
          When an agent generates multi-step flows (wizards, forms, dashboards), it must follow these patterns:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          {uxFlowCards.map((card) => (
            <div key={card.title} style={{
              padding: '20px',
              backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
              borderRadius: '8px'
            }}>
              <div style={{ fontWeight: '700', fontSize: '15px', marginBottom: '12px', color: 'var(--ld-semantic-color-text)' }}>
                {card.title}
              </div>
              <ul style={{
                fontSize: '14px',
                lineHeight: '1.8',
                color: 'var(--ld-semantic-color-text-subtle)',
                paddingLeft: '20px',
                margin: 0
              }}>
                {card.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3 – Strict Prohibitions */}
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
          What an Agent Must Never Do
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {prohibitions.map((rule, i) => (
            <div key={i} style={{
              display: 'flex',
              gap: '12px',
              padding: '14px 20px',
              backgroundColor: 'var(--ld-semantic-color-fill-negative-subtle)',
              borderRadius: '6px',
              fontSize: '14px',
              lineHeight: '1.6',
              color: 'var(--ld-semantic-color-text-subtle)',
              alignItems: 'flex-start'
            }}>
              <span style={{ color: 'var(--ld-semantic-color-text-negative)', fontWeight: '700', flexShrink: 0 }}>x</span>
              <span>{rule}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Section 4 – Component Creation Checklist */}
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
          marginBottom: '12px'
        }}>
          New Component Checklist (When Creation Is Justified)
        </h3>
        <p style={{
          fontSize: '14px',
          lineHeight: '1.6',
          color: 'var(--ld-semantic-color-text-subtle)',
          marginBottom: '20px'
        }}>
          If no existing component or composition can solve the need, agents must follow every step below. Skipping any step is a violation.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '12px'
        }}>
          {newComponentChecklist.map((item, i) => (
            <div key={i} style={{
              display: 'flex',
              gap: '10px',
              padding: '12px 16px',
              backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
              borderRadius: '6px',
              fontSize: '13px',
              lineHeight: '1.5',
              color: 'var(--ld-semantic-color-text-subtle)',
              alignItems: 'flex-start'
            }}>
              <span style={{
                minWidth: '20px',
                height: '20px',
                border: '2px solid var(--ld-semantic-color-border-strong)',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: '1px'
              }} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Section 5 – Design System Compliance */}
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
          Design System Compliance Rules
        </h3>
        <p style={{
          fontSize: '14px',
          lineHeight: '1.6',
          color: 'var(--ld-semantic-color-text-subtle)',
          marginBottom: '20px'
        }}>
          These rules govern how agents handle layout, tokens, styling, and component usage when generating or modifying pages.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          {complianceCards.map((card) => (
            <div key={card.title} style={{
              padding: '20px',
              backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
              borderRadius: '8px'
            }}>
              <div style={{ fontWeight: '700', fontSize: '15px', marginBottom: '12px', color: 'var(--ld-semantic-color-text)' }}>
                {card.title}
              </div>
              <ul style={{
                fontSize: '14px',
                lineHeight: '1.8',
                color: 'var(--ld-semantic-color-text-subtle)',
                paddingLeft: '20px',
                margin: 0
              }}>
                {card.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Section 6 – Figma-to-Code Agent Workflow */}
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
          Figma-to-Code Agent Workflow
        </h3>
        <p style={{
          fontSize: '14px',
          lineHeight: '1.6',
          color: 'var(--ld-semantic-color-text-subtle)',
          marginBottom: '20px'
        }}>
          When an agent processes Figma imports (via Builder.io plugin), it must post-process the output through these validation gates:
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {figmaGates.map((gate, i) => (
            <div key={i} style={{
              display: 'flex',
              gap: '16px',
              padding: '16px 20px',
              borderLeft: '3px solid var(--ld-semantic-color-border-brand)',
              marginLeft: '16px'
            }}>
              <div>
                <div style={{ fontWeight: '700', fontSize: '14px', marginBottom: '4px', color: 'var(--ld-semantic-color-text)' }}>
                  {gate.label}
                </div>
                <div style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--ld-semantic-color-text-subtle)' }}>
                  {gate.detail}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
