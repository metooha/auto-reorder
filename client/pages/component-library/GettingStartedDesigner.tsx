import React, { useState, useCallback } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/Checkbox';
import { DesignerOnboardingQuiz } from './DesignerOnboardingQuiz';

/* ── Prompt data ── */

interface Prompt { label: string; full: string; }

const PROMPT_CATEGORIES: { category: string; value: string; prompts: Prompt[] }[] = [
  {
    category: 'Generate Pages',
    value: 'pages',
    prompts: [
      { label: 'Settings page', full: 'Build a settings page with a sidebar navigation for General, Notifications, and Security sections. Each section should have form fields using TextField and Select components inside Cards.' },
      { label: 'Product detail page', full: 'Create a product detail page with breadcrumbs, a two-column layout (image gallery on left, product info on right), a tabbed section for Description/Reviews/Specs, and a sticky add-to-cart bar at the bottom.' },
      { label: 'Marketing landing page', full: 'Design a landing page with a hero section, a 3-column feature grid using Cards, a testimonial carousel, and a CTA section with a primary Button.' },
    ],
  },
  {
    category: 'Create Components',
    value: 'components',
    prompts: [
      { label: 'Stat card with sparkline', full: 'Create a stat card component that shows a metric label, a large number value, a percentage change badge (positive green or negative red using Tag), and a small sparkline area. Use Card, Heading, and Tag from the design system.' },
      { label: 'User profile header', full: 'Build a user profile header component with an avatar circle, user name heading, role tag, and action buttons (Edit Profile, Settings) in a ButtonGroup. Make it responsive.' },
      { label: 'Notification item', full: 'Create a notification item component with a leading icon, title, description, timestamp, and an unread indicator dot. Use ListItem patterns and semantic tokens for the styling.' },
      { label: 'File upload dropzone', full: 'Build a file upload dropzone component with a dashed border, upload icon, instructional text, and a secondary Button. Show a progress bar state and a completed state with a file name and remove IconButton.' },
    ],
  },
  {
    category: 'Theming & Styling',
    value: 'theming',
    prompts: [
      { label: "Switch to Sam's Club", full: "Switch the current theme to Sam's Club and verify all components render correctly with the new brand colors." },
      { label: 'Custom "Holiday" theme', full: 'Create a new custom theme called "Holiday" with a red primary action color, green accents, and warm neutrals. Apply it to the theme switcher so I can preview it.' },
      { label: 'Dark mode', full: 'Update the current page to use dark mode tokens. Make sure all text, backgrounds, borders, and cards adapt properly.' },
      { label: 'Token audit', full: 'Audit the current page for any hard-coded colors or font sizes and replace them with the correct LD semantic tokens.' },
    ],
  },
  {
    category: 'Edit & Refine',
    value: 'edits',
    prompts: [
      { label: 'Page header + breadcrumbs', full: 'Change the page header to include breadcrumbs, a subtitle description, and move the action buttons into a dropdown menu using the Menu component.' },
      { label: 'Data table with sorting', full: 'Replace the current plain list with an interactive data table that has sortable columns, row selection checkboxes, status tags, pagination, and a search toolbar.' },
      { label: 'Slide-in detail panel', full: 'Add a side panel that slides in from the right when a table row is clicked. It should show item details using a Card with CardHeader and CardContent, and have a close IconButton.' },
      { label: 'Responsive card grid', full: 'Make the cards on this page responsive. On desktop show 3 columns, tablet show 2 columns, and mobile show 1 column. Add proper spacing using semantic tokens.' },
    ],
  },
  {
    category: 'Accessibility & Polish',
    value: 'a11y',
    prompts: [
      { label: 'A11y review', full: 'Review the current page for accessibility issues. Make sure all interactive elements have proper aria-labels, focus states are visible, and color contrast meets WCAG 2.1 AA.' },
      { label: 'Keyboard nav for cards', full: 'Add keyboard navigation support to the card grid so users can tab between cards and press Enter to select them.' },
      { label: 'Loading skeletons', full: "Add loading skeleton states to all the cards and the data table on this page so content doesn't flash in." },
      { label: 'Modal focus trap', full: 'Add proper focus management to the modal dialog. Focus should trap inside the modal when open and return to the trigger button when closed.' },
    ],
  },
  {
    category: 'Other / Ask Freely',
    value: 'other',
    prompts: [
      { label: 'Explain a component', full: 'Explain how the DataTable component works in this project. Show me the available props, variants, and a usage example with sample data.' },
      { label: 'Compare two approaches', full: 'Compare using a Dialog (modal) vs a Panel (side drawer) for showing user details. Which one should I use for a narrow viewport?' },
      { label: 'What components exist?', full: 'List all the available components in client/components/ui/ and group them by category (forms, overlays, data display, navigation, feedback).' },
    ],
  },
];

/* ── Helpers ── */

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{
      backgroundColor: 'var(--ld-semantic-color-surface)',
      padding: '32px',
      borderRadius: '8px',
      boxShadow: 'var(--ld-semantic-elevation-100)',
    }}>
      <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--ld-semantic-color-text)', marginBottom: '20px' }}>
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
          <AccordionTrigger style={{ padding: '24px 32px', fontSize: '20px', fontWeight: 700 }}>
            {title}
          </AccordionTrigger>
          <AccordionContent>
            <div style={{ padding: '0 32px 32px' }}>{children}</div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

function NumberedList({ items }: { items: string[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {items.map((step, i) => (
        <div key={i} style={{ display: 'flex', gap: '10px', fontSize: '13px', lineHeight: 1.5, color: 'var(--ld-semantic-color-text-subtle)', alignItems: 'flex-start' }}>
          <span style={{
            minWidth: '22px', height: '22px',
            backgroundColor: 'var(--ld-semantic-color-fill-brand-subtle)',
            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: '11px', color: 'var(--ld-semantic-color-text-brand-bold)',
            flexShrink: 0, marginTop: '1px',
          }}>{i + 1}</span>
          <span>{step}</span>
        </div>
      ))}
    </div>
  );
}

function PromptChip({ prompt }: { prompt: Prompt }) {
  const [copied, setCopied] = useState(false);
  const [showFull, setShowFull] = useState(false);

  const handleCopy = useCallback(async () => {
    try { await navigator.clipboard.writeText(prompt.full); setCopied(true); setTimeout(() => setCopied(false), 1500); }
    catch { /* silent */ }
  }, [prompt.full]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
        <button onClick={handleCopy} style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          padding: '6px 14px',
          backgroundColor: copied ? 'var(--ld-semantic-color-fill-positive-subtle)' : 'var(--ld-semantic-color-fill-subtle)',
          border: `1px solid ${copied ? 'var(--ld-semantic-color-border-positive)' : 'var(--ld-semantic-color-border-moderate)'}`,
          borderRadius: '9999px', fontSize: '13px', fontWeight: 500,
          color: copied ? 'var(--ld-semantic-color-text-positive)' : 'var(--ld-semantic-color-text)',
          cursor: 'pointer', fontFamily: 'var(--ld-semantic-font-family-sans)',
          lineHeight: '20px', transition: 'all 150ms ease', whiteSpace: 'nowrap',
        }} title="Click to copy full prompt">
          <span style={{ fontSize: '12px', flexShrink: 0 }}>{copied ? '✓' : '⌘'}</span>
          {copied ? 'Copied!' : prompt.label}
        </button>
        <button onClick={() => setShowFull(!showFull)} style={{
          background: 'none', border: 'none', padding: '2px', cursor: 'pointer',
          color: 'var(--ld-semantic-color-text-subtle)', fontSize: '11px',
          fontFamily: 'var(--ld-semantic-font-family-sans)', lineHeight: 1, opacity: 0.6,
        }} title={showFull ? 'Hide full prompt' : 'Show full prompt'}>
          {showFull ? '▲' : '▼'}
        </button>
      </div>
      {showFull && (
        <div style={{
          marginTop: '6px', marginLeft: '8px', padding: '10px 14px',
          backgroundColor: 'var(--ld-semantic-color-fill-subtle)', borderRadius: '6px',
          borderLeft: '3px solid var(--ld-semantic-color-border-brand)',
          fontSize: '13px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)',
        }}>
          &ldquo;{prompt.full}&rdquo;
        </div>
      )}
    </div>
  );
}

/* ── First Steps Checklist ── */

const FIRST_STEPS = [
  { label: 'Browse the Component Library to see what\'s available', href: '/component-library' },
  { label: 'Try the Component Sandbox to test a component live', href: '/component-library/component-tester' },
  { label: 'Copy a prompt from the quiz below and paste it into Fusion', href: null },
];

function FirstStepsChecklist() {
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const total = FIRST_STEPS.length;
  const doneCount = checked.size;
  const allDone = doneCount === total;

  const toggle = (i: number) => setChecked(prev => {
    const next = new Set(prev);
    if (next.has(i)) next.delete(i); else next.add(i);
    return next;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Progress bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flex: 1, height: 6, borderRadius: 9999, background: 'var(--ld-semantic-color-fill-subtle)', overflow: 'hidden' }}>
          <div style={{
            height: '100%', borderRadius: 9999, transition: 'width 300ms ease',
            background: allDone ? 'var(--ld-semantic-color-text-positive)' : 'var(--ld-semantic-color-action-fill-primary)',
            width: `${(doneCount / total) * 100}%`,
          }} />
        </div>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ld-semantic-color-text-subtle)', whiteSpace: 'nowrap' }}>
          {doneCount} / {total}
        </span>
        {allDone && (
          <span style={{
            padding: '2px 10px', borderRadius: 9999, fontSize: 12, fontWeight: 700,
            background: 'var(--ld-semantic-color-fill-positive-subtle)',
            color: 'var(--ld-semantic-color-text-positive)',
            border: '1px solid var(--ld-semantic-color-border-positive)',
          }}>
            Great start! 🎉
          </span>
        )}
      </div>

      {/* Items */}
      {FIRST_STEPS.map((step, i) => {
        const done = checked.has(i);
        return (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px',
            borderRadius: 8, cursor: 'pointer',
            background: done ? 'var(--ld-semantic-color-fill-positive-subtle)' : 'var(--ld-semantic-color-fill-subtle)',
            border: `1px solid ${done ? 'var(--ld-semantic-color-border-positive)' : 'transparent'}`,
            transition: 'all 200ms ease',
          }} onClick={() => toggle(i)}>
            <Checkbox
              checked={done}
              onCheckedChange={() => toggle(i)}
              aria-label={step.label}
            />
            <span style={{ fontSize: 14, lineHeight: 1.5, flex: 1, textDecoration: done ? 'line-through' : 'none', color: done ? 'var(--ld-semantic-color-text-subtle)' : 'var(--ld-semantic-color-text)' }}>
              {step.href ? (
                <a href={step.href} onClick={e => e.stopPropagation()} style={{ color: 'var(--ld-semantic-color-link)', textDecoration: done ? 'line-through' : 'underline' }}>
                  {step.label}
                </a>
              ) : step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ── Resources Card ── */

const RESOURCES = [
  { label: 'Builder.io Figma Plugin', desc: 'Import Figma designs directly into your project', href: 'https://www.figma.com/community/plugin/747985167520967365', external: true },
  { label: 'Builder Academy', desc: 'Video tutorials and guided learning paths', href: 'https://www.builder.io/c/docs', external: true },
  { label: 'Figma Lunch & Learns', desc: 'Workshop recordings and session notes', href: 'https://airtable.com/appEGZA2KCbx3A6IP/shr35BhsPf4bNULE1', external: true },
  { label: 'Component Library', desc: 'Browse all 50+ LD 3.5 components with live examples', href: '/component-library', external: false },
  { label: 'Component Sandbox', desc: 'Test any component interactively with live controls', href: '/component-library/component-tester', external: false },
];

function ResourcesCard() {
  return (
    <div style={{
      background: 'var(--ld-semantic-color-surface)',
      borderRadius: 8,
      borderTop: '4px solid var(--ld-semantic-color-border-brand)',
      boxShadow: 'var(--ld-semantic-elevation-100)',
      padding: 32,
    }}>
      <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--ld-semantic-color-text)', marginBottom: 8 }}>Resources</h3>
      <p style={{ fontSize: 14, color: 'var(--ld-semantic-color-text-subtle)', marginBottom: 20, lineHeight: 1.6 }}>
        Everything you need to get oriented and start building with LD 3.5.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
        {RESOURCES.map(r => (
          <a key={r.label} href={r.href} target={r.external ? '_blank' : undefined} rel={r.external ? 'noopener noreferrer' : undefined}
            style={{
              display: 'flex', flexDirection: 'column', gap: 4, padding: '14px 16px',
              borderRadius: 8, textDecoration: 'none', transition: 'background 120ms',
              background: 'var(--ld-semantic-color-fill-subtle)',
              border: '1px solid transparent',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--ld-semantic-color-fill-brand-subtle)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--ld-semantic-color-border-brand)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--ld-semantic-color-fill-subtle)'; (e.currentTarget as HTMLElement).style.borderColor = 'transparent'; }}
          >
            <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--ld-semantic-color-link)', display: 'flex', alignItems: 'center', gap: 4 }}>
              {r.label}{r.external && <span style={{ fontSize: 11 }}>↗</span>}
            </span>
            <span style={{ fontSize: 13, color: 'var(--ld-semantic-color-text-subtle)', lineHeight: 1.5 }}>{r.desc}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

/* ── Tips — bad vs good ── */

const TIPS = [
  {
    title: 'Be specific about which component to use',
    bad: 'Add a popup',
    good: 'Add a Dialog component (from @/components/ui/Dialog) with a title, description, and two buttons: Cancel (secondary) and Confirm (primary)',
  },
  {
    title: 'Reference variants and sizes explicitly',
    bad: 'Make it blue',
    good: 'Use Button variant="primary" size="medium" — the brand color is applied automatically via tokens',
  },
  {
    title: 'Name tokens, not hex values',
    bad: 'Use #0071DC for the border',
    good: 'Use border: 1px solid var(--ld-semantic-color-border-brand) for the border',
  },
  {
    title: 'Describe states explicitly',
    bad: 'Add a loading spinner',
    good: 'Show a Spinner (size="medium") centered in the card while data is loading, then replace it with the content',
  },
  {
    title: 'Describe responsive behavior',
    bad: 'Make it responsive',
    good: 'Stack the 3 columns to 1 column below 768px, reduce card padding from 24px to 16px at 480px',
  },
];

/* ── Main ── */

export function GettingStartedDesigner() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingTop: '24px' }}>

      {/* 1. Intro Banner */}
      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-brand-subtle)',
        padding: '24px 32px', borderRadius: '8px',
        borderLeft: '5px solid var(--ld-semantic-color-border-brand)',
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--ld-semantic-color-text)', marginBottom: '8px' }}>
          For Designers
        </h3>
        <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'var(--ld-semantic-color-text-subtle)', margin: 0 }}>
          This guide helps you drop the Living Design 3.5 Portable Kit into any project &mdash;
          whether you&rsquo;re using Builder.io Fusion, Cursor, Figma Make, or another tool.
          Answer the quiz below to get a personalized AI prompt and reading path tailored to your workflow and experience level.
        </p>
      </div>

      {/* 2. First Steps Checklist */}
      <CollapsibleSection title="First Steps" defaultOpen>
        <FirstStepsChecklist />
      </CollapsibleSection>

      {/* 3. Onboarding Quiz */}
      <DesignerOnboardingQuiz />

      {/* 4. Resources Card */}
      <ResourcesCard />

      {/* 9. Quick-Start Prompts — collapsed */}
      <CollapsibleSection title="Quick-Start Prompts">
        <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', marginBottom: '20px' }}>
          Click any chip to copy the full prompt. Use the arrow to preview before copying.
        </p>
        <Accordion type="multiple" defaultValue={['pages']}>
          {PROMPT_CATEGORIES.map(({ category, value, prompts }) => (
            <AccordionItem key={value} value={value}>
              <AccordionTrigger>{category}</AccordionTrigger>
              <AccordionContent>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', flexDirection: 'column' }}>
                  {prompts.map(prompt => <PromptChip key={prompt.label} prompt={prompt} />)}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CollapsibleSection>

      {/* 10. Tips — collapsed */}
      <CollapsibleSection title="Tips for Better Results">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {TIPS.map(tip => (
            <div key={tip.title} style={{ padding: '16px 20px', borderRadius: 8, background: 'var(--ld-semantic-color-fill-subtle)' }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--ld-semantic-color-text)', marginBottom: 10 }}>{tip.title}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--ld-semantic-color-text-negative)', fontWeight: 700, flexShrink: 0, fontSize: 13 }}>✗</span>
                  <span style={{ fontSize: 13, color: 'var(--ld-semantic-color-text-subtle)', fontStyle: 'italic', lineHeight: 1.5 }}>
                    Instead of: &ldquo;{tip.bad}&rdquo;
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--ld-semantic-color-text-positive)', fontWeight: 700, flexShrink: 0, fontSize: 13 }}>✓</span>
                  <span style={{ fontSize: 13, color: 'var(--ld-semantic-color-text)', lineHeight: 1.5 }}>
                    Say: &ldquo;{tip.good}&rdquo;
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* 11. Key Concepts — collapsed */}
      <CollapsibleSection title="Key Concepts">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            { title: 'Design Tokens', desc: 'Instead of picking colors manually, the kit uses design tokens — named values like "primary action color" or "subtle text". When you switch themes, all colors update automatically. You never need to manually change hex values.' },
            { title: 'Component Variants', desc: 'Components come with built-in variants (e.g., primary/secondary/tertiary buttons, info/success/error alerts). Instead of styling from scratch, pick the variant that matches your intent — the component handles colors, spacing, and interactions.' },
            { title: 'Figma to Code', desc: 'Use the Builder.io Figma plugin to import designs. The AI agent maps Figma elements to the correct library components, replaces colors with tokens, and adds accessibility features. Always review the output to confirm the right components were used.' },
            { title: 'Accessibility is Automatic', desc: 'Every component ships with keyboard navigation, focus indicators, screen reader support, and proper color contrast. You do not need to add these manually — they are built into the components.' },
          ].map(item => (
            <div key={item.title} style={{
              padding: '20px', backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
              borderRadius: '6px', borderLeft: '4px solid var(--ld-semantic-color-border-brand)',
            }}>
              <div style={{ fontWeight: 700, marginBottom: '8px', fontSize: '15px', color: 'var(--ld-semantic-color-text)' }}>{item.title}</div>
              <div style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)' }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* 13a. Using Outside the Tool — collapsed */}
      <CollapsibleSection title="Using Outside Builder.io & Fusion">
        <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', marginBottom: '20px' }}>
          This kit is fully portable. Download it and use it in any React-compatible environment.
        </p>
        <Accordion type="multiple">
          <AccordionItem value="figma">
            <AccordionTrigger>Figma Make (Figma-to-Code)</AccordionTrigger>
            <AccordionContent>
              <div style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', marginBottom: '12px' }}>
                Export designs from Figma and use this kit as the target component library.
              </div>
              <NumberedList items={[
                'Download the project and open it in your code editor',
                'In Figma, use the Make plugin or export your designs as code',
                'Map Figma component names to kit components (e.g., "[LD 3.5] Button" → Button.tsx)',
                'Replace any hardcoded colors with semantic tokens (var(--ld-semantic-color-*))',
                'Replace raw HTML elements with kit components (<Button>, <TextField>)',
                'Verify all interactive states are handled — the kit components include these automatically',
              ]} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="cursor">
            <AccordionTrigger>Cursor (AI Code Editor)</AccordionTrigger>
            <AccordionContent>
              <div style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', marginBottom: '12px' }}>
                Download the project and open it in Cursor. The AI reads the component library and generates correct design system code.
              </div>
              <NumberedList items={[
                'Download the project as a zip and extract it to a local folder',
                'Open the folder in Cursor',
                'Run pnpm install in the terminal to install dependencies',
                'Run pnpm dev to start the dev server',
                'Copy the contents of design-system-docs/AGENTS.md into your .cursorrules file',
                'When prompting, reference component names (e.g., "use a Button with variant primary")',
              ]} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="editor">
            <AccordionTrigger>Any Code Editor (VS Code, WebStorm, etc.)</AccordionTrigger>
            <AccordionContent>
              <div style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)' }}>
                The kit is a standard React + Vite project. Download it, run{' '}
                <code style={{ fontFamily: 'var(--ld-semantic-font-family-mono)', fontSize: '13px', backgroundColor: 'var(--ld-semantic-color-surface)', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--ld-semantic-color-border-moderate)' }}>pnpm install</code>
                {' '}and{' '}
                <code style={{ fontFamily: 'var(--ld-semantic-font-family-mono)', fontSize: '13px', backgroundColor: 'var(--ld-semantic-color-surface)', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--ld-semantic-color-border-moderate)' }}>pnpm dev</code>,
                {' '}and start building. Reference the{' '}
                <code style={{ fontFamily: 'var(--ld-semantic-font-family-mono)', fontSize: '13px', backgroundColor: 'var(--ld-semantic-color-surface)', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--ld-semantic-color-border-moderate)' }}>guidelines/</code>
                {' '}folder for documentation.
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CollapsibleSection>

      {/* 13b. Key Files — collapsed */}
      <CollapsibleSection title="Key Files to Know">
        <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', marginBottom: '16px' }}>
          Regardless of which tool you use, these are the important locations in the project:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 6 }}>
          {[
            { path: 'client/components/ui/', desc: 'All 50+ pre-built components (Button, TextField, Card, Modal, etc.)' },
            { path: 'client/styles/themes/', desc: 'Theme files — switch brands by swapping the active theme CSS' },
            { path: 'client/components/icons/', desc: '300+ icons ready to import and use' },
            { path: 'guidelines/', desc: 'Design system rules, component docs, and enforcement rules' },
            { path: 'design-system-docs/AGENTS.md', desc: 'AI agent reference — paste into .cursorrules or AI system prompts' },
            { path: 'client/locales/', desc: 'Translation files for English, Spanish, and French' },
            { path: 'public/fonts/', desc: 'Brand fonts (Everyday Sans) — must be included for correct rendering' },
          ].map(item => (
            <div key={item.path} style={{
              display: 'grid', gridTemplateColumns: '240px 1fr', gap: '12px',
              padding: '10px 16px', backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
              borderRadius: '6px', fontSize: '14px', alignItems: 'center',
            }}>
              <code style={{ fontFamily: 'var(--ld-semantic-font-family-mono)', fontSize: '13px', color: 'var(--ld-semantic-color-text)' }}>
                {item.path}
              </code>
              <span style={{ color: 'var(--ld-semantic-color-text-subtle)' }}>{item.desc}</span>
            </div>
          ))}
        </div>
      </CollapsibleSection>

    </div>
  );
}
