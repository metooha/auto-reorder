import React, { useState, useCallback } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/Accordion';

/* ── Prompt data ── */

interface Prompt {
  label: string;
  full: string;
}

const PROMPT_CATEGORIES: { category: string; value: string; prompts: Prompt[] }[] = [
  {
    category: 'Project Setup',
    value: 'setup',
    prompts: [
      { label: 'New project with LD 3.5', full: 'Set up a new project using the Living Design 3.5 Portable Kit. Install dependencies, start the dev server, and navigate to the component library so I can start building.' },
      { label: 'React + routing + theme', full: 'Create a new React project with the LD 3.5 design system, set up routing with react-router, add the Walmart theme, and create a blank home page with the MastHead and AppSidebar components.' },
      { label: 'Add i18n (EN/ES/FR)', full: 'Add i18n support to my project with English, Spanish, and French. Set up the translation files and wrap the app with the i18n provider.' },
      { label: 'Theme switcher', full: 'Set up the theme switcher so I can toggle between Walmart, Sam\'s Club, and custom themes. Add the ThemeSwitcher component to the masthead.' },
      { label: 'Netlify deployment', full: 'Configure the project for Netlify deployment. Make sure the build command, publish directory, and API redirects are all set up correctly.' },
      { label: 'Remove template pages', full: "I'm not using this for Partner Experiences. Remove the template application pages (Landing Summary, Catalog, Detail Item, Page Template, Home) from the project, clean up the routes in App.tsx, and point the home route to the Component Library." },
    ],
  },
  {
    category: 'Generate Pages',
    value: 'pages',
    prompts: [
      { label: 'Campaign dashboard', full: 'Create a new dashboard page with a page header titled "Campaign Overview", a row of 4 metric cards showing impressions, clicks, spend, and CTR, and a data table below with campaign data.' },
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
      { label: 'Switch to Sam\'s Club', full: 'Switch the current theme to Sam\'s Club and verify all components render correctly with the new brand colors.' },
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
      { label: 'Form validation', full: 'Add form validation to the current form. Show error states on required fields with helper text when the user clicks submit without filling them in.' },
      { label: 'Empty state for table', full: 'Add an empty state to the data table with an illustration area, a heading saying "No results found", a description, and a primary action Button to reset filters.' },
    ],
  },
  {
    category: 'Accessibility & Polish',
    value: 'a11y',
    prompts: [
      { label: 'A11y review', full: 'Review the current page for accessibility issues. Make sure all interactive elements have proper aria-labels, focus states are visible, and color contrast meets WCAG 2.1 AA.' },
      { label: 'Keyboard nav for cards', full: 'Add keyboard navigation support to the card grid so users can tab between cards and press Enter to select them.' },
      { label: 'Loading skeletons', full: 'Add loading skeleton states to all the cards and the data table on this page so content doesn\'t flash in.' },
      { label: 'Modal focus trap', full: 'Add proper focus management to the modal dialog. Focus should trap inside the modal when open and return to the trigger button when closed.' },
    ],
  },
];

/* ── Prompt chip with copy ── */

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
          fontStyle: 'italic',
        }}>
          &ldquo;{prompt.full}&rdquo;
        </div>
      )}
    </div>
  );
}

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

/* ── Main ── */

export function GettingStartedDesigner() {
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
          For Designers
        </h3>
        <p style={{
          fontSize: '15px',
          lineHeight: 1.7,
          color: 'var(--ld-semantic-color-text-subtle)',
          margin: 0,
        }}>
          This guide walks you through dropping the Living Design 3.5 Portable Kit into a new or
          existing project &mdash; whether you&rsquo;re using Builder.io, Cursor, Figma Make, or any other
          tool. No coding experience required &mdash; just follow the steps below and the kit handles the rest.
          When you drag and drop this zip into a project, the AI agent will ask:
          &ldquo;Are you using this for Partner Experiences?&rdquo; If yes, the template pages
          (Landing Summary, Catalog, etc.) stay. If no, they get removed automatically.
        </p>
      </div>

      {/* Before You Start */}
      <SectionCard title="Before You Start">
        <p style={{
          fontSize: '14px',
          lineHeight: 1.6,
          color: 'var(--ld-semantic-color-text-subtle)',
          marginBottom: '16px',
        }}>
          Quick checklist before dropping this kit into a project:
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { check: 'Partner Experiences?', detail: 'When you drag and drop the zip, the AI will ask if this is for Partner Experiences. Answer yes to keep the template pages, or no to remove them.' },
            { check: 'Existing UI components?', detail: 'If your project already has buttons, forms, or modals, the AI will find them and replace them with kit equivalents. Custom components get updated to use design tokens.' },
            { check: 'Existing icons?', detail: 'Duplicate icons will be merged into the kit\'s icon library. Third-party icon packages (react-icons, heroicons) will be replaced and removed.' },
            { check: 'CSS framework in use?', detail: 'If your project uses Tailwind, Bootstrap, or another CSS framework, the AI will check for style conflicts and resolve them so the kit renders correctly.' },
            { check: 'Which package manager?', detail: 'The kit ships with pnpm. If your project uses npm or yarn, the AI will adapt the setup commands and lockfiles automatically.' },
            { check: 'React version?', detail: 'The kit requires React 18+. If your project is on an older version, it will need to be upgraded first.' },
            { check: 'Custom brand needed?', detail: 'The kit includes Walmart and Sam\'s Club themes. If you need a different brand, the AI can create a custom theme from your brand colors.' },
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex',
              gap: '14px',
              padding: '14px 18px',
              backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
              borderRadius: '8px',
              alignItems: 'flex-start',
            }}>
              <span style={{
                minWidth: '20px',
                height: '20px',
                border: '2px solid var(--ld-semantic-color-border-brand)',
                borderRadius: '4px',
                flexShrink: 0,
                marginTop: '2px',
              }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '2px', color: 'var(--ld-semantic-color-text)' }}>
                  {item.check}
                </div>
                <div style={{ fontSize: '13px', lineHeight: 1.5, color: 'var(--ld-semantic-color-text-subtle)' }}>
                  {item.detail}
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* What You Get */}
      <SectionCard title="What You Get">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '12px',
        }}>
          {[
            { label: '50+ Components', desc: 'Buttons, forms, cards, modals, tabs, and more — all pre-built and accessible' },
            { label: '600+ Design Tokens', desc: 'Colors, spacing, typography, and elevation — no hard-coded values needed' },
            { label: 'Multi-Theme Support', desc: 'Switch between brand themes (Walmart, Sam\'s Club, etc.) with one click' },
            { label: '3 Languages', desc: 'English, Spanish, and French translations built in for every UI string' },
            { label: 'WCAG 2.1 AA', desc: 'Focus rings, keyboard navigation, ARIA labels, and contrast ratios baked in' },
            { label: 'Component Sandbox', desc: 'Test any component interactively with live property controls' },
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

      {/* Quick-Start Prompts */}
      <SectionCard title="Quick-Start Prompts">
        <p style={{
          fontSize: '14px',
          lineHeight: 1.6,
          color: 'var(--ld-semantic-color-text-subtle)',
          marginBottom: '20px',
        }}>
          Click any chip to copy the full prompt to your clipboard. Use the arrow to preview the prompt before copying.
        </p>
        <Accordion type="multiple" defaultValue={['setup']}>
          {PROMPT_CATEGORIES.map(({ category, value, prompts }) => (
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

      {/* Key Concepts — collapsible */}
      <CollapsibleSection title="Key Concepts">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            { title: 'Design Tokens', desc: 'Instead of picking colors manually, the kit uses design tokens — named values like "primary action color" or "subtle text". When you switch themes, all colors update automatically. You never need to manually change hex values.' },
            { title: 'Component Variants', desc: 'Components come with built-in variants (e.g., primary/secondary/tertiary buttons, info/success/error alerts). Instead of styling from scratch, you pick the variant that matches your intent and the component handles the colors, spacing, and interactions.' },
            { title: 'Figma to Code', desc: 'Use the Builder.io Figma plugin to import designs. The AI agent will automatically map Figma elements to the correct library components, replace colors with tokens, and add accessibility features. Always review the output to confirm the right components were used.' },
            { title: 'Accessibility is Automatic', desc: 'Every component ships with keyboard navigation, focus indicators, screen reader support, and proper color contrast. You do not need to add these manually — they are built into the components themselves.' },
          ].map((item) => (
            <div key={item.title} style={{
              padding: '20px',
              backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
              borderRadius: '6px',
              borderLeft: '4px solid var(--ld-semantic-color-border-brand)',
            }}>
              <div style={{ fontWeight: 700, marginBottom: '8px', fontSize: '15px', color: 'var(--ld-semantic-color-text)' }}>
                {item.title}
              </div>
              <div style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)' }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Using Outside Builder.io — collapsible */}
      <CollapsibleSection title="Using Outside Builder.io & Fusion">
        <p style={{
          fontSize: '14px',
          lineHeight: 1.6,
          color: 'var(--ld-semantic-color-text-subtle)',
          marginBottom: '20px',
        }}>
          This kit is fully portable. You can download the code and use it in any environment
          that supports React. Here are the most common external workflows:
        </p>
        <Accordion type="multiple">
          <AccordionItem value="cursor">
            <AccordionTrigger>Cursor (AI Code Editor)</AccordionTrigger>
            <AccordionContent>
              <div style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', marginBottom: '12px' }}>
                Download the project and open it in Cursor. The AI will read the component library and generate code that uses the design system correctly.
              </div>
              <NumberedList items={[
                'Download the project as a zip and extract it to a local folder',
                'Open the folder in Cursor',
                'Run pnpm install in the terminal to install dependencies',
                'Run pnpm dev to start the dev server and preview in your browser',
                'Point Cursor\'s AI at the guidelines/ folder — add it to your .cursorrules or project context',
                'Copy the contents of design-system-docs/AGENTS.md into your .cursorrules file',
                'When prompting, reference component names (e.g., "use a Button with variant primary")',
              ]} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="figma">
            <AccordionTrigger>Figma Make (Figma-to-Code)</AccordionTrigger>
            <AccordionContent>
              <div style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', marginBottom: '12px' }}>
                Export designs from Figma and use this kit as the target component library.
              </div>
              <NumberedList items={[
                'Download the project and open it in your code editor of choice',
                'In Figma, use the Make plugin or export your designs as code',
                'Map Figma component names to the kit components (e.g., "[LD 3.5] Button" \u2192 Button.tsx)',
                'Replace any hard-coded colors with semantic tokens (var(--ld-semantic-color-*))',
                'Replace raw HTML elements with kit components (<Button>, <TextField>)',
                'Verify all interactive states are handled — the kit components include these automatically',
              ]} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="editor">
            <AccordionTrigger>Any Code Editor (VS Code, WebStorm, etc.)</AccordionTrigger>
            <AccordionContent>
              <div style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)' }}>
                The kit is a standard React + Vite project. Download it, run{' '}
                <code style={{ fontFamily: 'var(--ld-semantic-font-family-mono)', fontSize: '13px', backgroundColor: 'var(--ld-semantic-color-surface)', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--ld-semantic-color-border-moderate)' }}>pnpm install</code>{' '}
                and{' '}
                <code style={{ fontFamily: 'var(--ld-semantic-font-family-mono)', fontSize: '13px', backgroundColor: 'var(--ld-semantic-color-surface)', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--ld-semantic-color-border-moderate)' }}>pnpm dev</code>,{' '}
                and start building. All components, tokens, icons, and translations work identically regardless of your editor.
                Reference the <code style={{ fontFamily: 'var(--ld-semantic-font-family-mono)', fontSize: '13px', backgroundColor: 'var(--ld-semantic-color-surface)', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--ld-semantic-color-border-moderate)' }}>guidelines/</code> folder for documentation.
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CollapsibleSection>

      {/* Key Files — collapsible */}
      <CollapsibleSection title="Key Files to Know (For Any Tool)">
        <p style={{
          fontSize: '14px',
          lineHeight: 1.6,
          color: 'var(--ld-semantic-color-text-subtle)',
          marginBottom: '16px',
        }}>
          Regardless of which tool you use, these are the important locations in the project:
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {[
            { path: 'client/components/ui/', desc: 'All 50+ pre-built components (Button, TextField, Card, Modal, etc.)' },
            { path: 'client/styles/themes/', desc: 'Theme files — switch brands by swapping the active theme CSS' },
            { path: 'client/components/icons/', desc: '300+ icons ready to import and use' },
            { path: 'guidelines/', desc: 'Design system rules, component docs, and enforcement rules' },
            { path: 'design-system-docs/AGENTS.md', desc: 'AI agent reference — paste into .cursorrules or AI system prompts' },
            { path: 'client/locales/', desc: 'Translation files for English, Spanish, and French' },
            { path: 'public/fonts/', desc: 'Brand fonts (Everyday Sans) — must be included for correct rendering' },
          ].map((item) => (
            <div key={item.path} style={{
              display: 'grid',
              gridTemplateColumns: '280px 1fr',
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

      {/* Tips — collapsible */}
      <CollapsibleSection title="Tips for Designers">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            'Browse the Component Library (/component-library) to see what\'s available before asking for custom UI',
            'Use the Component Sandbox to test different variants, sizes, and states interactively',
            'Check the Themes & Tokens page to see how colors and spacing work across brands',
            'When describing UI to the AI agent, reference component names (e.g., "use a Card with a primary Button")',
            'If something doesn\'t look right, check if the correct variant is being used before asking for custom styling',
            'All text should support translation — avoid baking text into images or SVGs',
          ].map((tip, i) => (
            <div key={i} style={{
              display: 'flex',
              gap: '12px',
              padding: '12px 16px',
              backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
              borderRadius: '6px',
              fontSize: '14px',
              lineHeight: 1.5,
              color: 'var(--ld-semantic-color-text-subtle)',
              alignItems: 'flex-start',
            }}>
              <span style={{
                color: 'var(--ld-semantic-color-text-positive)',
                fontWeight: 700,
                flexShrink: 0,
                marginTop: '1px',
              }}>&#10003;</span>
              <span>{tip}</span>
            </div>
          ))}
        </div>
      </CollapsibleSection>
    </div>
  );
}

/* ── Small helper for numbered step lists ── */

function NumberedList({ items }: { items: string[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {items.map((step, i) => (
        <div key={i} style={{
          display: 'flex',
          gap: '10px',
          fontSize: '13px',
          lineHeight: 1.5,
          color: 'var(--ld-semantic-color-text-subtle)',
          alignItems: 'flex-start',
        }}>
          <span style={{
            minWidth: '22px',
            height: '22px',
            backgroundColor: 'var(--ld-semantic-color-fill-brand-subtle)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: '11px',
            color: 'var(--ld-semantic-color-text-brand-bold)',
            flexShrink: 0,
            marginTop: '1px',
          }}>
            {i + 1}
          </span>
          <span>{step}</span>
        </div>
      ))}
    </div>
  );
}
