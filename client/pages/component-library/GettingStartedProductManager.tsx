import React, { useState, useCallback } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/Checkbox';
import { TextField } from '@/components/ui/TextField';
import { TextArea } from '@/components/ui/TextArea';
import { Button } from '@/components/ui/Button';
import { PMOnboardingQuiz } from './PMOnboardingQuiz';

/* ── Helpers ── */

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{
      backgroundColor: 'var(--ld-semantic-color-surface)',
      padding: '32px', borderRadius: '8px',
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
      borderRadius: '8px', boxShadow: 'var(--ld-semantic-elevation-100)', overflow: 'hidden',
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

function NumberedList({ items }: { items: { label: string; detail: string }[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          <span style={{
            minWidth: 36, height: 36, borderRadius: '50%', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'var(--ld-semantic-color-action-fill-primary)',
            color: 'var(--ld-semantic-color-text-inverse)',
            fontWeight: 700, fontSize: 16,
          }}>{i + 1}</span>
          <div style={{ paddingTop: 6 }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--ld-semantic-color-text)', marginBottom: 4 }}>{item.label}</div>
            <div style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)' }}>{item.detail}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── 2. Resources Card ── */

const RESOURCES = [
  { label: 'PRD Template', desc: 'Copy the structured PRD template to define your feature requirements', href: '#prd-template', external: false },
  { label: 'Builder Academy', desc: 'Video tutorials and guided learning paths', href: 'https://www.builder.io/c/docs', external: true },
  { label: 'Component Library', desc: 'Browse all 50+ LD 3.5 components with live examples', href: '/component-library', external: false },
  { label: 'Component Sandbox', desc: 'Test any component interactively with live controls', href: '/component-library/component-tester', external: false },
];

function ResourcesCard() {
  return (
    <div style={{
      background: 'var(--ld-semantic-color-surface)',
      borderRadius: 8, borderTop: '4px solid var(--ld-semantic-color-border-brand)',
      boxShadow: 'var(--ld-semantic-elevation-100)', padding: 32,
    }}>
      <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--ld-semantic-color-text)', marginBottom: 8 }}>Resources</h3>
      <p style={{ fontSize: 14, color: 'var(--ld-semantic-color-text-subtle)', marginBottom: 20, lineHeight: 1.6 }}>
        Key links to get oriented, write better PRDs, and build with the design system.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
        {RESOURCES.map(r => (
          <a key={r.label} href={r.href} target={r.external ? '_blank' : undefined}
            rel={r.external ? 'noopener noreferrer' : undefined}
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

/* ── 5. PRD Template (conditional) ── */

interface PRDField {
  id: string;
  label: string;
  placeholder: string;
  isTextArea?: boolean;
}

const PRD_FIELDS: PRDField[] = [
  { id: 'name', label: 'Feature name', placeholder: 'e.g. Campaign Performance Dashboard' },
  { id: 'story', label: 'User story', placeholder: 'As a ___, I want to ___, so that ___' },
  { id: 'show', label: 'What to display', placeholder: 'e.g. Table of campaigns, KPI cards' },
  { id: 'fields', label: 'Data fields', placeholder: 'e.g. Campaign name, daily budget, ROAS, status' },
  { id: 'actions', label: 'Actions', placeholder: 'e.g. Sort, filter by status, export CSV' },
  { id: 'filters', label: 'Filters', placeholder: 'e.g. Date range, campaign type' },
  { id: 'volume', label: 'Data volume', placeholder: 'e.g. Up to 500 rows, paginated 20 per page' },
  { id: 'empty', label: 'Empty state', placeholder: 'e.g. "No campaigns found" with CTA button' },
  { id: 'outofscope', label: 'Out of scope', placeholder: 'e.g. No export, no inline editing' },
  { id: 'notes', label: 'Additional notes', placeholder: 'Any edge cases, constraints, or open questions', isTextArea: true },
];

function PRDTemplate() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  const filled = Object.values(values).filter(v => v.trim().length > 0).length;
  const total = PRD_FIELDS.length;

  const handleCopy = useCallback(async () => {
    const text = PRD_FIELDS
      .map(f => `${f.label}:\n${values[f.id] ?? '(not filled)'}`)
      .join('\n\n');
    try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }
    catch { /* silent */ }
  }, [values]);

  return (
    <div id="prd-template" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Progress */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flex: 1, height: 6, borderRadius: 9999, background: 'var(--ld-semantic-color-fill-subtle)', overflow: 'hidden' }}>
          <div style={{
            height: '100%', borderRadius: 9999, transition: 'width 300ms ease',
            background: filled === total ? 'var(--ld-semantic-color-text-positive)' : 'var(--ld-semantic-color-action-fill-primary)',
            width: `${(filled / total) * 100}%`,
          }} />
        </div>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ld-semantic-color-text-subtle)', whiteSpace: 'nowrap' }}>
          {filled} / {total} filled
        </span>
      </div>

      {/* Fields */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
        {PRD_FIELDS.filter(f => !f.isTextArea).map(f => (
          <TextField
            key={f.id}
            label={f.label}
            size="small"
            value={values[f.id] ?? ''}
            placeholder={f.placeholder}
            onChange={e => setValues(prev => ({ ...prev, [f.id]: e.target.value }))}
          />
        ))}
      </div>
      {PRD_FIELDS.filter(f => f.isTextArea).map(f => (
        <TextArea
          key={f.id}
          label={f.label}
          size="small"
          value={values[f.id] ?? ''}
          placeholder={f.placeholder}
          onChange={e => setValues(prev => ({ ...prev, [f.id]: e.target.value }))}
        />
      ))}

      <div>
        <Button variant={copied ? 'secondary' : 'primary'} size="medium" onClick={handleCopy}>
          {copied ? '✓ Copied!' : 'Copy PRD as prompt'}
        </Button>
      </div>
    </div>
  );
}

/* ── 6. Before You Prompt Checklist ── */

const BEFORE_PROMPT_ITEMS = [
  { label: 'Know what data you\'re showing', sub: 'Metrics, list, chart trend, or stats?' },
  { label: 'Know the user action', sub: 'Filter, drill down, export, apply, or read?' },
  { label: 'Have an empty state in mind', sub: 'What shows when there\'s no data?' },
  { label: 'Have a PRD or create one', sub: 'Use the PRD template below' },
];

function BeforeYouPromptChecklist() {
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const total = BEFORE_PROMPT_ITEMS.length;
  const doneCount = checked.size;
  const allDone = doneCount === total;

  const toggle = (i: number) => setChecked(prev => {
    const next = new Set(prev);
    if (next.has(i)) next.delete(i); else next.add(i);
    return next;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Progress */}
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
            Ready to prompt!
          </span>
        )}
      </div>

      {BEFORE_PROMPT_ITEMS.map((item, i) => {
        const done = checked.has(i);
        return (
          <div key={i} onClick={() => toggle(i)} style={{
            display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 16px',
            borderRadius: 8, cursor: 'pointer',
            background: done ? 'var(--ld-semantic-color-fill-positive-subtle)' : 'var(--ld-semantic-color-fill-subtle)',
            border: `1px solid ${done ? 'var(--ld-semantic-color-border-positive)' : 'transparent'}`,
            transition: 'all 200ms ease',
          }}>
            <div style={{ paddingTop: 2 }}>
              <Checkbox checked={done} onCheckedChange={() => toggle(i)} aria-label={item.label} />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: done ? 'var(--ld-semantic-color-text-subtle)' : 'var(--ld-semantic-color-text)', textDecoration: done ? 'line-through' : 'none', lineHeight: 1.4 }}>
                {item.label}
              </div>
              <div style={{ fontSize: 13, color: 'var(--ld-semantic-color-text-subtle)', marginTop: 2 }}>{item.sub}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── PM Quick-Start Prompts ── */

interface Prompt { label: string; full: string; }

const PM_PROMPT_CATEGORIES: { category: string; value: string; prompts: Prompt[] }[] = [
  {
    category: 'Search & Discovery',
    value: 'search',
    prompts: [
      { label: 'Search results page', full: 'Create a search results page for the Walmart app using ResponsiveLayout (maxWidth="full", showMobileTopNav={false}, nativeStatusBarVariant="white"). Include a SearchResultsHeader with back chevron and AI sparkle icon, a SearchFilterBar with chips (In-store, Size, Color, Brand, Price), an AIResultsBanner, and a vertical list of ProductCardList items. Each product card shows image, flag badge (Best seller / Rollback), price, name, star rating, pickup time, and an Add to cart button.' },
      { label: 'Filter chip bar', full: 'Add a sticky horizontal SearchFilterBar below the search header. Chips: All Filters (icon only), Sort (with SortingArrows icon), then In-store, Top rated, Brand, Price, Special offers. Selected chips use the selected/inverse style. The bar scrolls horizontally on mobile and is full-bleed (use lg:-mx-16 to break out of container padding on desktop).' },
      { label: 'AI results banner', full: 'Add an AIResultsBanner row between the SearchFilterBar and the product list. It shows a SparklesIcon on the left (from @/components/icons-custom) and text: "AI-powered results — Showing top-rated [query] based on your search". Use the existing pattern in client/pages/walmart/SearchResults.tsx as reference.' },
    ],
  },
  {
    category: 'Product Cards',
    value: 'products',
    prompts: [
      { label: 'Product card list (row layout)', full: 'Add a ProductCardList item (from @/components/walmart/ProductCardList). Props to pass: flag ("Best seller" or "Rollback"), flagVariant ("default" or "red"), price (dollar string), cents (cents string), wasPrice (optional original price), name, rating (number 1-5), ratingCount (string like "1,247"), pickup ("2 pm" or "Tomorrow"), image (from PRODUCT_IMAGES in @/components/walmart/productImages), cue (one-line descriptive subtitle). The card renders image left + content right with Add to cart button.' },
      { label: 'Product grid (tile layout)', full: 'Create a 2-column product tile grid using ProductCardGrid. Import from @/components/walmart/ProductCardGrid. Each tile shows a product image at top, flag badge, price, star rating with count, and an Add to cart button. The grid is wrapped in a flex-col container and stacks to 1 column on mobile (<480px).' },
      { label: 'Horizontal product carousel', full: 'Build a horizontal-scroll product carousel. Wrap cards in a div with: display: flex; overflow-x: auto; scroll-snap-type: x mandatory; gap: 12px; padding: 0 16px. Each card uses flex: 0 0 72vw on mobile and flex: 0 0 calc(33% - 8px) on tablet+. Cards have scroll-snap-align: start.' },
    ],
  },
  {
    category: 'Cart & Checkout',
    value: 'cart',
    prompts: [
      { label: 'Cart item row', full: 'Create a cart item row component. Shows: product thumbnail (64×64px, object-fit: contain), product name (2 lines max, font-weight 600), price, a QuantityStepper for quantity, and a remove IconButton (variant="ghost", size="small"). Below the item show pickup/delivery options as Radio buttons in a RadioGroup. Add a Divider (1px separator token) between items.' },
      { label: 'Order summary card', full: 'Build an order summary card using Card component. Rows: "Items subtotal" + amount, "Savings" + amount in green (text-positive token), "Estimated tax" + amount, "Delivery" + "Free" in green. Bold "Estimated total" row at bottom with separator above it. Below the card: Button (variant="primary", isFullWidth) "Place order", then a centered Link "Continue shopping".' },
      { label: 'Promo code input', full: 'Add a promo code row to the cart page. Use a TextField (label: "Promo code", size="small", placeholder: "Enter code") with an "Apply" Button (variant="secondary", size="small") inline to the right. On success: show a green Snackbar "Code applied — you saved $5.00". On invalid code: set errorMessage on the TextField.' },
    ],
  },
  {
    category: 'Orders & Account',
    value: 'orders',
    prompts: [
      { label: 'Order history list', full: 'Create an order history page with a list of order summary cards. Each card shows: order date, order number (subtle), status Tag (variant "success" for Delivered, "info" for In transit, "critical" for Cancelled), a row of up to 3 product thumbnails (40×40px) with "+N more" if needed, order total, and two buttons: "Track package" (secondary) and "Buy again" (tertiary). Use Divider between cards.' },
      { label: 'Order detail page', full: 'Build an order detail page. Top: order number (h2), placed date, status with CheckCircleFill icon (green). Then a list of ordered items (thumbnail 64px, name, qty, unit price, line total). Below: two side-by-side Cards — "Shipping address" (name + address lines) and "Payment method" (card brand + last 4 digits). Footer: "Need help with this order?" Link.' },
      { label: 'Account overview', full: 'Create an account overview page with: a profile header (40px avatar circle with initials, full name bold, email subtle, "Edit profile" Button tertiary). Below: a 2×2 grid of shortcut cards (Orders, Lists, Walmart+, Settings) each with an icon, bold label, and arrow. Then a "Recent orders" section with the last 2 order rows.' },
    ],
  },
  {
    category: 'Promotions & Deals',
    value: 'promos',
    prompts: [
      { label: 'Rollback promo banner', full: 'Create a Rollback promotional banner row. Background: var(--ld-semantic-color-fill-accent-yellow-subtle). Left side: a yellow "Rollback" WCPFlag badge + bold headline + short description. Right side: "Shop Rollbacks" Link with ChevronRight icon. Full-bleed width, 16px vertical padding. Add a thin separator below.' },
      { label: 'Deal countdown section', full: 'Build a "Deal of the Day" section with: a bold section header, a live countdown timer (HH:MM:SS using setInterval + useState, clears on unmount). Below: a horizontal-scroll row of deal product cards. Each card has a red "Limited time" Tag, original price struck-through in subtle color, and sale price in bold brand color.' },
      { label: 'Savings summary row', full: 'Add a savings summary banner between the cart items and order summary. Shows a green CheckCircleFill icon + "You\'re saving $X.XX on this order" in text-positive color. Background: var(--ld-semantic-color-fill-positive-subtle). Full-width, 12px 16px padding, 8px border-radius.' },
    ],
  },
  {
    category: 'Starting from Scratch',
    value: 'scratch',
    prompts: [
      { label: 'New Walmart page shell', full: 'Create a new ecommerce page at client/pages/walmart/MyPage.tsx using ResponsiveLayout (maxWidth="full", showMobileTopNav={false}, nativeStatusBarVariant="white"). Add the route to App.tsx. Include a SearchResultsHeader (with back button navigating to /walmart), a SearchFilterBar below it, and a scrollable content area. Follow the pattern in client/pages/walmart/SearchResults.tsx.' },
      { label: 'Generate from PRD notes', full: 'Here are my rough requirements for a Walmart ecommerce feature: [paste your notes here]. Build the page using WCP components (ProductCardList, SearchFilterBar, ResponsiveLayout, etc.) from client/components/walmart/. Use PRODUCT_IMAGES from @/components/walmart/productImages for product images. Follow the pattern in client/pages/walmart/SearchResults.tsx as a reference for page structure.' },
    ],
  },
];

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
          display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 14px',
          backgroundColor: copied ? 'var(--ld-semantic-color-fill-positive-subtle)' : 'var(--ld-semantic-color-fill-subtle)',
          border: `1px solid ${copied ? 'var(--ld-semantic-color-border-positive)' : 'var(--ld-semantic-color-border-moderate)'}`,
          borderRadius: '9999px', fontSize: '13px', fontWeight: 500,
          color: copied ? 'var(--ld-semantic-color-text-positive)' : 'var(--ld-semantic-color-text)',
          cursor: 'pointer', fontFamily: 'var(--ld-semantic-font-family-sans)', lineHeight: '20px',
          transition: 'all 150ms ease', whiteSpace: 'nowrap',
        }}>
          <span style={{ fontSize: '12px', flexShrink: 0 }}>{copied ? '✓' : '⌘'}</span>
          {copied ? 'Copied!' : prompt.label}
        </button>
        <button onClick={() => setShowFull(!showFull)} style={{
          background: 'none', border: 'none', padding: '2px', cursor: 'pointer',
          color: 'var(--ld-semantic-color-text-subtle)', fontSize: '11px',
          fontFamily: 'var(--ld-semantic-font-family-sans)', lineHeight: 1, opacity: 0.6,
        }}>
          {showFull ? '▲' : '▼'}
        </button>
      </div>
      {showFull && (
        <div style={{
          marginTop: '6px', marginLeft: '8px', padding: '10px 14px',
          backgroundColor: 'var(--ld-semantic-color-fill-subtle)', borderRadius: '6px',
          borderLeft: '3px solid var(--ld-semantic-color-border-brand)',
          fontSize: '13px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', fontStyle: 'italic',
        }}>
          &ldquo;{prompt.full}&rdquo;
        </div>
      )}
    </div>
  );
}

/* ── Main ── */

export function GettingStartedProductManager() {
  const [hasPRD, setHasPRD] = useState<string | undefined>(undefined);

  const showPRDTemplate = hasPRD === 'no' || hasPRD === 'rough';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingTop: '24px' }}>

      {/* 1. Intro Banner */}
      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-brand-subtle)',
        padding: '24px 32px', borderRadius: '8px',
        borderLeft: '5px solid var(--ld-semantic-color-border-brand)',
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--ld-semantic-color-text)', marginBottom: '8px' }}>
          For Product Managers
        </h3>
        <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'var(--ld-semantic-color-text-subtle)', margin: 0 }}>
          Write better feature requirements by referencing the design system directly. When you name specific
          LD 3.5 components in your PRD, designers and developers move faster with fewer misunderstandings.
          Use the quiz below to generate an AI prompt tailored to your data feature &mdash; or jump straight to the PRD template.
        </p>
      </div>

      {/* 2. Onboarding Quiz */}
      <PMOnboardingQuiz onComplete={setHasPRD} />

      {/* 3. Resources Card */}
      <ResourcesCard />

      {/* 5. Conditional PRD Template */}
      {showPRDTemplate && (
        <SectionCard title={hasPRD === 'rough' ? 'Formalize Your PRD' : 'Create Your PRD'}>
          <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', marginBottom: 24 }}>
            {hasPRD === 'rough'
              ? 'You have rough notes — fill in the fields below to turn them into a structured PRD you can paste directly into the AI agent.'
              : "You don't have a PRD yet. Fill in as many fields as you can — even partial answers help the AI generate a better feature."}
          </p>
          <PRDTemplate />
        </SectionCard>
      )}

      {/* 6. Before You Prompt Checklist */}
      <SectionCard title="Before You Prompt">
        <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', marginBottom: 20 }}>
          Check these off before pasting your prompt into the AI agent.
        </p>
        <BeforeYouPromptChecklist />
      </SectionCard>

      {/* 7. How It Works */}
      <SectionCard title="How It Works">
        <NumberedList items={[
          { label: 'You describe the feature', detail: 'Via the quiz, PRD template, or plain language — the more specific, the better.' },
          { label: 'The agent analyzes requirements', detail: 'Maps your requirements to LD 3.5 components, checks rule compliance, and flags conflicts.' },
          { label: 'The agent builds the feature', detail: 'Generates production-ready code using semantic tokens, correct components, and accessibility built in.' },
          { label: 'You review and iterate', detail: 'Changes appear in the live preview. Describe adjustments in plain language and the agent updates the code.' },
        ]} />
      </SectionCard>

      {/* 9. Quick-Start Prompts — collapsed */}
      <CollapsibleSection title="Quick-Start Prompts">
        <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', marginBottom: 20 }}>
          Click any chip to copy the full prompt. Use the arrow to preview before copying.
        </p>
        <Accordion type="multiple" defaultValue={['dashboards']}>
          {PM_PROMPT_CATEGORIES.map(({ category, value, prompts }) => (
            <AccordionItem key={value} value={value}>
              <AccordionTrigger>{category}</AccordionTrigger>
              <AccordionContent>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, flexDirection: 'column' }}>
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
          {[
            { title: 'Name components explicitly', bad: 'Show a popup', good: 'Show a Dialog component with a title, description, Cancel (secondary) and Confirm (primary) buttons' },
            { title: 'Specify states — not just the happy path', bad: 'Show the data', good: 'Show a Skeleton while loading, the DataTable when data arrives, and a ContentMessage ("No results found") when the list is empty' },
            { title: 'Reference breakpoints', bad: 'Make it mobile friendly', good: 'Stack the 3 metric cards to 1 column below 768px, hide the secondary chart below 480px' },
            { title: 'Name the user action', bad: 'Add filtering', good: 'Add a FilterChip row (Status, Date range, Type). Clicking a chip filters the DataTable in real time without a submit button' },
          ].map(tip => (
            <div key={tip.title} style={{ padding: '16px 20px', borderRadius: 8, background: 'var(--ld-semantic-color-fill-subtle)' }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--ld-semantic-color-text)', marginBottom: 10 }}>{tip.title}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ display: 'flex', gap: 8 }}>
                  <span style={{ color: 'var(--ld-semantic-color-text-negative)', fontWeight: 700, flexShrink: 0, fontSize: 13 }}>✗</span>
                  <span style={{ fontSize: 13, color: 'var(--ld-semantic-color-text-subtle)', fontStyle: 'italic', lineHeight: 1.5 }}>Instead of: &ldquo;{tip.bad}&rdquo;</span>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <span style={{ color: 'var(--ld-semantic-color-text-positive)', fontWeight: 700, flexShrink: 0, fontSize: 13 }}>✓</span>
                  <span style={{ fontSize: 13, color: 'var(--ld-semantic-color-text)', lineHeight: 1.5 }}>Say: &ldquo;{tip.good}&rdquo;</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* 11. What the Agent Knows — collapsed */}
      <CollapsibleSection title="What the Agent Knows">
        <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', marginBottom: 20 }}>
          The AI agent has full knowledge of all of these — you can reference any of them by name in your prompt.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
          {[
            { label: '50+ LD 3.5 Components', desc: 'Buttons, forms, tables, charts, modals, and more' },
            { label: '303+ Icons', desc: 'Full icon library at /component-library/icons' },
            { label: '624+ Design Tokens', desc: 'Semantic colors, spacing, typography, elevation' },
            { label: '8 Chart Color Tokens', desc: 'ld-semantic-color-data-chart-* series' },
            { label: 'Recharts Library', desc: 'Line, bar, area, pie charts out of the box' },
            { label: '16+ Enforcement Rules', desc: 'Token compliance, component rules, a11y patterns' },
          ].map(item => (
            <div key={item.label} style={{
              padding: '16px', borderRadius: 8, background: 'var(--ld-semantic-color-fill-subtle)',
            }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--ld-semantic-color-text)', marginBottom: 4 }}>{item.label}</div>
              <div style={{ fontSize: 13, color: 'var(--ld-semantic-color-text-subtle)', lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* 12. FAQ — collapsed */}
      <CollapsibleSection title="Frequently Asked Questions">
        <Accordion type="multiple">
          {[
            { q: 'Do I need to know React or code?', a: 'No. You describe what you want in plain English. The AI agent handles all the code — components, tokens, accessibility, and responsive behavior. Your job is to write clear requirements.' },
            { q: 'Can I iterate after it\'s built?', a: 'Yes. Describe the change you want ("make the table sortable", "add a status filter") and the agent updates the code immediately in the live preview.' },
            { q: 'What if I disagree with what the agent built?', a: 'Be specific about what to change. Instead of "that\'s wrong", say "change the metric card to show a line chart instead of the number" — the more precise the feedback, the better the result.' },
            { q: 'How do I see my changes?', a: 'Changes appear in the live preview panel in real time. You can also open the preview in a full browser window using the Open Preview button.' },
            { q: 'How do I share my work?', a: 'Push your changes using the Push button in the top-right corner to send them to the git remote. You can also deploy to Netlify or Vercel via the MCP integrations.' },
            { q: 'What if the component I described doesn\'t exist?', a: 'The agent will use the closest available LD 3.5 component and note the substitution. If a truly custom component is needed, it will build one following the WCP component creation rules.' },
          ].map(({ q, a }) => (
            <AccordionItem key={q} value={q}>
              <AccordionTrigger style={{ fontSize: 15, fontWeight: 600, textAlign: 'left', padding: '20px 0' }}>{q}</AccordionTrigger>
              <AccordionContent>
                <p style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--ld-semantic-color-text-subtle)', margin: 0, paddingBottom: 20 }}>{a}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CollapsibleSection>

    </div>
  );
}
