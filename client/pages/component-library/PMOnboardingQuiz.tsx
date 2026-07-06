import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/Button';
import { ProgressTracker } from '@/components/ui/ProgressTracker';
import { Alert } from '@/components/ui/Alert';
import { Link } from '@/components/ui/Link';
import { TextField } from '@/components/ui/TextField';
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Flash,
  BulletList,
  Map,
  Clipboard,
  ArrowRight,
  CheckCircleFill,
  Refresh,
} from '@/components/icons';
import styles from './OnboardingQuiz.module.css';

/* ── Types ── */

interface QuizOption { value: string; label: string; desc: string; }
interface QuizQuestion { id: string; question: string; why: string; options: QuizOption[]; }

/* ── Questions ── */

const QUESTIONS: QuizQuestion[] = [
  {
    id: 'featureType',
    question: 'What type of ecommerce page are you building?',
    why: 'This maps your page to the most relevant LD 3.5 components and pattern pages to read first.',
    options: [
      { value: 'search', label: 'Search results page', desc: 'Product list with filters and AI banner' },
      { value: 'catalog', label: 'Product category / listing', desc: 'Browsable shelf of item tiles' },
      { value: 'pdp', label: 'Product detail page (PDP)', desc: 'Item info, images, Add to cart' },
      { value: 'cart', label: 'Cart or checkout flow', desc: 'Cart items, summary, promo codes' },
      { value: 'orders', label: 'Orders or account', desc: 'Order history, tracking, returns' },
      { value: 'promos', label: 'Promotions or deals', desc: 'Rollback banners, deal sections' },
      { value: 'other', label: 'Something else', desc: 'A different type of page' },
    ],
  },
  {
    id: 'dataVolume',
    question: 'How many item tiles will this page display?',
    why: 'Item count determines whether to use pagination, infinite scroll, or search + filter to keep the grid performant.',
    options: [
      { value: 'few', label: 'A few items (< 20)', desc: 'Simple grid or static list' },
      { value: 'moderate', label: 'Moderate (20–100)', desc: 'Paginated grid or scroll' },
      { value: 'large', label: 'Large catalog (100+)', desc: 'Infinite scroll or search + filter required' },
      { value: 'full', label: 'Full catalog', desc: 'Search, filter, and sort are essential' },
      { value: 'unknown', label: 'Not sure yet', desc: 'Design for moderate, easy to scale' },
    ],
  },
  {
    id: 'hasPRD',
    question: 'Do you have a PRD or requirements document?',
    why: 'If you have a PRD, we can use it as the prompt context. If not, the PRD template below will help you create one.',
    options: [
      { value: 'yes', label: 'Yes — complete PRD', desc: 'Full requirements document ready' },
      { value: 'rough', label: 'Rough notes only', desc: 'Some requirements but not formalized' },
      { value: 'no', label: 'No PRD yet', desc: "Starting from scratch" },
      { value: 'other', label: 'Other', desc: 'A different situation' },
    ],
  },
  {
    id: 'designRef',
    question: 'Do you have a design reference?',
    why: 'A design reference helps the AI match your visual intent. Without one, it will generate based on LD 3.5 defaults.',
    options: [
      { value: 'figma', label: 'Figma design', desc: 'Full Figma spec available' },
      { value: 'screenshot', label: 'Screenshot or wireframe', desc: 'Low-fidelity reference' },
      { value: 'none', label: 'No design reference', desc: 'Generate based on requirements only' },
      { value: 'other', label: 'Other', desc: 'Another type of reference' },
    ],
  },
  {
    id: 'experience',
    question: 'How would you describe your experience level with this design system?',
    why: 'This determines how much component guidance and scaffolding the AI provides.',
    options: [
      { value: 'new', label: 'New to LD 3.5', desc: 'First time working with this system' },
      { value: 'familiar', label: 'Somewhat familiar', desc: 'Used it in a few projects' },
      { value: 'advanced', label: 'Advanced', desc: 'Comfortable with tokens and components' },
      { value: 'other', label: 'Not sure', desc: 'Hard to say' },
    ],
  },
];

/* ── Prompt generation ── */

function generatePrompt(answers: Record<string, string>, otherTexts: Record<string, string>): string {
  const featureMap: Record<string, string> = {
    search: 'I am building a search results page — product grid with filter chips, sort controls, and an AI-powered results banner.',
    catalog: 'I am building a product category / listing page — a browsable shelf of item tiles with department filters and promotional slots.',
    pdp: 'I am building a product detail page (PDP) — hero images, item info, Add to Cart CTA, ratings, and related products.',
    cart: 'I am building a cart or checkout flow — line items, order summary, promo code entry, and a proceed-to-checkout CTA.',
    orders: 'I am building an orders or account page — order history cards, tracking status, and returns initiation.',
    promos: 'I am building a promotions or deals page — Rollback banners, deal tile grids, and countdown or savings indicators.',
    other: otherTexts.featureType ? `I am building: ${otherTexts.featureType}.` : 'I am building an ecommerce page.',
  };
  const volumeMap: Record<string, string> = {
    few: 'The page shows a small number of item tiles (fewer than 20) — a simple grid or static list is sufficient.',
    moderate: 'The page shows a moderate number of item tiles (20–100) — use a paginated grid or scrollable shelf.',
    large: 'The page shows a large catalog (100+ items) — implement infinite scroll or require search + filter to reduce the visible set.',
    full: 'The page exposes the full catalog — search, filter, and sort controls are essential from the start.',
    unknown: 'Item count is unknown — design for a moderate grid and make pagination easy to add later.',
  };
  const prdMap: Record<string, string> = {
    yes: 'I have a complete PRD — use it as the primary requirements source.',
    rough: 'I have rough notes but not a full PRD — use the PRD template to formalize them and then build.',
    no: 'I do not have a PRD yet — help me fill out the PRD template first, then use it to generate the feature.',
    other: otherTexts.hasPRD ? `PRD status: ${otherTexts.hasPRD}.` : '',
  };
  const designMap: Record<string, string> = {
    figma: 'I have a Figma design — map every color to an ld-semantic-color-* token and every element to an LD 3.5 component.',
    screenshot: 'I have a screenshot or wireframe as reference — match the layout intent using LD 3.5 patterns.',
    none: 'I have no design reference — generate a clean, production-ready layout using LD 3.5 defaults.',
    other: otherTexts.designRef ? `Design reference: ${otherTexts.designRef}.` : '',
  };
  const expMap: Record<string, string> = {
    new: 'I am new to Living Design 3.5 — explain component choices and token usage as you go.',
    familiar: 'I have some LD 3.5 experience — brief explanations are helpful but not required for every step.',
    advanced: 'I am experienced with LD 3.5 — keep output concise and skip basic explanations.',
    other: 'Assume moderate familiarity with the design system.',
  };

  return [
    featureMap[answers.featureType] ?? featureMap['other'],
    volumeMap[answers.dataVolume] ?? '',
    prdMap[answers.hasPRD] ?? '',
    designMap[answers.designRef] ?? '',
    expMap[answers.experience] ?? '',
    '',
    'Requirements:',
    '- Use LD 3.5 components exclusively — DataTable, Card, Button, Select, TextField, etc.',
    '- Use LD semantic tokens only — no hardcoded hex colors, spacing, or font sizes',
    '- All interactive elements must be keyboard accessible',
    '- Responsive at standard breakpoints: 1024px, 768px, 480px',
    '- CSS modules for all styling',
  ].filter(Boolean).join('\n');
}

interface ReadingItem { label: string; path: string; }

function generateReadingPath(answers: Record<string, string>): ReadingItem[] {
  const path: ReadingItem[] = [];

  if (answers.experience !== 'advanced') {
    path.push({ label: 'Themes & Tokens', path: '/component-library/themes' });
  }

  const featureRoutes: Record<string, ReadingItem[]> = {
    search: [{ label: 'Filter Chips', path: '/component-library/filter-chips' }, { label: 'Cards', path: '/component-library/cards' }, { label: 'Buttons', path: '/component-library/buttons' }],
    catalog: [{ label: 'Cards', path: '/component-library/cards' }, { label: 'Filter Chips', path: '/component-library/filter-chips' }],
    pdp: [{ label: 'Buttons', path: '/component-library/buttons' }, { label: 'Cards', path: '/component-library/cards' }],
    cart: [{ label: 'Buttons', path: '/component-library/buttons' }, { label: 'Select', path: '/component-library/select' }],
    orders: [{ label: 'Cards', path: '/component-library/cards' }, { label: 'Data Table', path: '/component-library/table' }],
    promos: [{ label: 'Cards', path: '/component-library/cards' }, { label: 'Buttons', path: '/component-library/buttons' }],
    other: [{ label: 'Overview', path: '/component-library' }],
  };
  (featureRoutes[answers.featureType] ?? featureRoutes['other']).forEach(r => path.push(r));

  path.push({ label: 'Filter Chips', path: '/component-library/filter-chips' });
  path.push({ label: 'Component Sandbox', path: '/component-library/component-tester' });

  const seen = new Set<string>();
  return path.filter(p => { if (seen.has(p.path)) return false; seen.add(p.path); return true; });
}

/* ── Sub-components ── */

function AnswerOption({ option, selected, onSelect }: { option: QuizOption; selected: boolean; onSelect: () => void; }) {
  return (
    <button type="button" role="radio" aria-checked={selected} onClick={onSelect}
      className={`${styles.option} ${selected ? styles.optionSelected : ''}`}>
      <span className={`${styles.optionCheck} ${selected ? styles.optionCheckSelected : ''}`}>
        {selected && <Check width={12} height={12} aria-hidden="true" />}
      </span>
      <span className={styles.optionText}>
        <span className={styles.optionLabel}>{option.label}</span>
        <span className={styles.optionDesc}>{option.desc}</span>
      </span>
    </button>
  );
}

const QUESTION_LABELS: Record<string, string> = {
  featureType: 'Feature', dataVolume: 'Data volume', hasPRD: 'PRD', designRef: 'Design ref', experience: 'Experience',
};
const OPTION_LABEL_MAP: Record<string, Record<string, string>> = {
  featureType: { search: 'Search results', catalog: 'Category / listing', pdp: 'PDP', cart: 'Cart / checkout', orders: 'Orders / account', promos: 'Promos / deals', other: 'Other' },
  dataVolume: { few: '< 20 items', moderate: '20–100 items', large: '100+ items', full: 'Full catalog', unknown: 'Not sure' },
  hasPRD: { yes: 'Full PRD', rough: 'Rough notes', no: 'No PRD', other: 'Other' },
  designRef: { figma: 'Figma design', screenshot: 'Screenshot', none: 'No design', other: 'Other' },
  experience: { new: 'New to LD', familiar: 'Some experience', advanced: 'Advanced', other: 'Unsure' },
};

/* ── Main component ── */

type Step = 'intro' | number | 'result';

export interface PMOnboardingQuizProps {
  onComplete?: (hasPRD: string | undefined) => void;
}

export function PMOnboardingQuiz({ onComplete }: PMOnboardingQuizProps = {}) {
  const [step, setStep] = useState<Step>('intro');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [otherTexts, setOtherTexts] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  const currentIndex = typeof step === 'number' ? step : -1;
  const currentQuestion = currentIndex >= 0 ? QUESTIONS[currentIndex] : null;
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : undefined;

  const goNext = () => {
    if (step === 'intro') { setStep(0); return; }
    if (typeof step === 'number') {
      if (step < QUESTIONS.length - 1) { setStep(step + 1); return; }
      setStep('result');
      onComplete?.(answers.hasPRD);
    }
  };
  const goBack = () => {
    if (typeof step === 'number') {
      if (step === 0) setStep('intro');
      else setStep(step - 1);
    }
    if (step === 'result') setStep(QUESTIONS.length - 1);
  };
  const skip = () => {
    if (typeof step === 'number') {
      if (step < QUESTIONS.length - 1) setStep(step + 1);
      else { setStep('result'); onComplete?.(answers.hasPRD); }
    }
  };
  const skipAll = () => { setStep('result'); onComplete?.(answers.hasPRD); };
  const restart = () => { setStep('intro'); setAnswers({}); setOtherTexts({}); setCopied(false); };

  const handleCopy = useCallback(async () => {
    const prompt = generatePrompt(answers, otherTexts);
    try { await navigator.clipboard.writeText(prompt); setCopied(true); setTimeout(() => setCopied(false), 2000); }
    catch { /* silent */ }
  }, [answers, otherTexts]);

  /* ── Intro ── */
  if (step === 'intro') {
    return (
      <div className={styles.card}>
        <div>
          <h3 className={styles.introTitle}>Build a better prompt</h3>
          <p className={styles.introDesc} style={{ marginTop: 8 }}>
            5 quick questions → a copy-ready AI prompt tailored to your data feature and requirements.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { Icon: Flash, label: '5 quick questions', sub: 'Takes about 60 seconds' },
            { Icon: BulletList, label: 'Ready-to-paste prompt', sub: 'Copy directly into any AI agent' },
            { Icon: Map, label: 'Reading path', sub: 'Know exactly which pages to visit first' },
          ].map(({ Icon, label, sub }) => (
            <div key={label} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
              padding: '16px 12px', borderRadius: 10, textAlign: 'center',
              background: 'var(--ld-semantic-color-fill-brand-subtle)',
            }}>
              <span style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 40, height: 40, borderRadius: '50%',
                background: 'var(--ld-semantic-color-surface)',
                color: 'var(--ld-semantic-color-text-brand-bold)',
              }}>
                <Icon width={20} height={20} aria-hidden="true" />
              </span>
              <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--ld-semantic-color-text)', lineHeight: 1.3 }}>{label}</span>
              <span style={{ fontSize: 12, color: 'var(--ld-semantic-color-text-subtle)', lineHeight: 1.4 }}>{sub}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button variant="primary" size="medium" onClick={goNext}>
            Start the quiz <ChevronRight width={16} height={16} aria-hidden="true" />
          </Button>
          <Button variant="tertiary" size="medium" onClick={skipAll}>
            Skip — generate a generic prompt
          </Button>
        </div>
      </div>
    );
  }

  /* ── Result ── */
  if (step === 'result') {
    const prompt = generatePrompt(answers, otherTexts);
    const readingPath = generateReadingPath(answers);
    const hasAnswers = Object.keys(answers).length > 0;

    return (
      <div className={styles.card}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px',
          borderRadius: 10, background: 'var(--ld-semantic-color-fill-positive-subtle)',
          border: '1px solid var(--ld-semantic-color-border-positive)',
        }}>
          <span style={{ color: 'var(--ld-semantic-color-text-positive)', flexShrink: 0 }}>
            <CheckCircleFill width={24} height={24} aria-hidden="true" />
          </span>
          <span style={{ fontWeight: 700, fontSize: 16, color: 'var(--ld-semantic-color-text-positive)' }}>
            Your personalized PM prompt is ready
          </span>
        </div>

        {hasAnswers && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {QUESTIONS.filter(q => answers[q.id]).map(q => (
              <span key={q.id} style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                padding: '4px 12px', borderRadius: 9999,
                border: '1px solid var(--ld-semantic-color-border-moderate)',
                background: 'var(--ld-semantic-color-fill-subtle)',
                fontSize: 13, color: 'var(--ld-semantic-color-text)',
              }}>
                <span style={{ color: 'var(--ld-semantic-color-text-subtle)', fontSize: 12 }}>{QUESTION_LABELS[q.id]}:</span>
                {' '}{OPTION_LABEL_MAP[q.id]?.[answers[q.id]] ?? answers[q.id]}
              </span>
            ))}
          </div>
        )}

        <div className={styles.resultSection}>
          <div className={styles.resultSectionHeader}>
            <Clipboard width={16} height={16} aria-hidden="true" />
            <span className={styles.resultSectionLabel}>Copy-Ready AI Prompt</span>
            <div style={{ marginLeft: 'auto' }}>
              <Button variant={copied ? 'secondary' : 'primary'} size="small" onClick={handleCopy}>
                {copied ? <><Check width={14} height={14} aria-hidden="true" /> Copied!</> : <>Copy prompt</>}
              </Button>
            </div>
          </div>
          <pre className={styles.promptBox}>{prompt}</pre>
        </div>

        <div className={styles.resultSection} style={{ background: 'var(--ld-semantic-color-fill-brand-subtle)', border: '1px solid var(--ld-semantic-color-border-brand)' }}>
          <div className={styles.resultSectionHeader}>
            <span className={styles.resultSectionLabel} style={{ color: 'var(--ld-semantic-color-text-brand-bold)' }}>Recommended reading path</span>
          </div>
          <ol className={styles.readingList}>
            {readingPath.map((item, i) => (
              <li key={item.path} className={styles.readingItem}>
                <span className={styles.readingNumber}>{i + 1}</span>
                <Link href={item.path}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap' }}>
                    {item.label}
                    <ArrowRight width={12} height={12} aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="secondary" size="medium" onClick={restart}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Refresh width={16} height={16} aria-hidden="true" />
              Start over
            </span>
          </Button>
        </div>
      </div>
    );
  }

  /* ── Question ── */
  if (!currentQuestion) return null;
  const isOtherSelected = currentAnswer === 'other';
  const stepLabels = QUESTIONS.map(q => QUESTION_LABELS[q.id]);

  return (
    <div className={styles.card}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <span style={{ fontSize: 13, color: 'var(--ld-semantic-color-text-subtle)', whiteSpace: 'nowrap' }}>
          Question {currentIndex + 1} of {QUESTIONS.length}
        </span>
        <Button variant="tertiary" size="small" onClick={skipAll}>Skip quiz</Button>
      </div>
      <ProgressTracker steps={stepLabels} activeStep={currentIndex} status="info" />

      <h4 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: 'var(--ld-semantic-color-text)', lineHeight: 1.4 }}>
        {currentQuestion.question}
      </h4>

      <Alert variant="info">
        <strong>Why this matters: </strong>{currentQuestion.why}
      </Alert>

      <div className={styles.optionList} role="radiogroup" aria-label={currentQuestion.question}>
        {currentQuestion.options.map(opt => (
          <AnswerOption
            key={opt.value}
            option={opt}
            selected={currentAnswer === opt.value}
            onSelect={() => setAnswers(prev => ({ ...prev, [currentQuestion.id]: opt.value }))}
          />
        ))}
      </div>

      {/* Other text field */}
      {isOtherSelected && (
        <div style={{ marginTop: -8 }}>
          <TextField
            label="Please describe"
            size="small"
            value={otherTexts[currentQuestion.id] ?? ''}
            onChange={e => setOtherTexts(prev => ({ ...prev, [currentQuestion.id]: e.target.value }))}
            placeholder="Describe your situation..."
          />
        </div>
      )}

      <div style={{ display: 'flex', gap: 8, justifyContent: 'space-between', alignItems: 'center' }}>
        <Button variant="secondary" size="medium" onClick={goBack}>
          <ChevronLeft width={16} height={16} aria-hidden="true" /> Back
        </Button>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="tertiary" size="medium" onClick={skip}>Skip this question</Button>
          <Button variant="primary" size="medium" onClick={goNext}>
            {currentIndex === QUESTIONS.length - 1 ? 'Generate prompt' : 'Next'}
            <ChevronRight width={16} height={16} aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
}
