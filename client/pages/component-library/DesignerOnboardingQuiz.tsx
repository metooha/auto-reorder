import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { Link } from '@/components/ui/Link';
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

interface QuizOption {
  value: string;
  label: string;
  desc: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  why: string;
  options: QuizOption[];
}

/* ── Questions ── */

const QUESTIONS: QuizQuestion[] = [
  {
    id: 'featureType',
    question: 'What are you working on?',
    why: 'This shapes which components to reach for first and how the AI organizes your reading path.',
    options: [
      { value: 'new-page', label: 'Building a new page', desc: 'Assembling layouts from existing components' },
      { value: 'figma-code', label: 'Figma to code', desc: 'Translating a Figma design into components' },
      { value: 'explore', label: 'Exploring the system', desc: "Learning what's available" },
      { value: 'customize', label: 'Customizing or theming', desc: 'Adjusting tokens, variants, or brand themes' },
      { value: 'other', label: 'Something else', desc: 'A different type of work' },
    ],
  },
  {
    id: 'startingPoint',
    question: 'Where are you starting from?',
    why: 'Your starting point determines whether to focus on setup, design handoff, or iteration workflows.',
    options: [
      { value: 'new', label: 'From scratch', desc: 'Clean slate, no existing files' },
      { value: 'existing', label: 'Existing project', desc: 'Adding to something already built' },
      { value: 'figma', label: 'A Figma design', desc: 'Design is ready, need to implement it' },
      { value: 'other', label: 'Other', desc: 'A different starting situation' },
    ],
  },
  {
    id: 'goal',
    question: "What's your primary goal right now?",
    why: 'Your goal determines how detailed and scaffolded the AI output should be.',
    options: [
      { value: 'build', label: 'Build something fast', desc: 'Ship a working version quickly' },
      { value: 'setup', label: 'Set up the project', desc: 'Install, configure, and get oriented' },
      { value: 'explore', label: 'Explore and learn', desc: "Understand what's possible" },
      { value: 'figma-to-code', label: 'Figma-to-code conversion', desc: 'Match a design spec precisely' },
      { value: 'other', label: 'Other goal', desc: 'A different objective' },
    ],
  },
  {
    id: 'environment',
    question: 'Which tool are you working in?',
    why: 'Each tool has different prompt patterns — Fusion supports live editing, Cursor needs file context, Figma Make needs token mapping.',
    options: [
      { value: 'fusion', label: 'Builder.io Fusion', desc: 'Live browser-based dev environment' },
      { value: 'cursor', label: 'Cursor', desc: 'AI code editor' },
      { value: 'figma-make', label: 'Figma Make', desc: 'Figma-to-code plugin' },
      { value: 'developer', label: 'Another editor', desc: 'VS Code, WebStorm, or similar' },
    ],
  },
  {
    id: 'experience',
    question: 'How would you describe your experience level?',
    why: 'This determines how much scaffolding and explanation the AI provides in its output.',
    options: [
      { value: 'new', label: 'New to LD 3.5', desc: 'First time using this design system' },
      { value: 'familiar', label: 'Somewhat familiar', desc: "Used it a few times" },
      { value: 'advanced', label: 'Advanced', desc: 'Deep familiarity with tokens and components' },
      { value: 'other', label: 'Not sure', desc: "Hard to say" },
    ],
  },
];

/* ── Prompt generation ── */

function generatePrompt(answers: Record<string, string>): string {
  const featureMap: Record<string, string> = {
    'new-page': 'I am building a new page by assembling existing LD 3.5 components. Prioritize layout patterns, page composition, and responsive breakpoints.',
    'figma-code': 'I am converting a Figma design to code. Map every Figma color to an ld-semantic-color-* token. Replace raw elements with LD components (Button, TextField, Card, etc.). Never use hardcoded hex values.',
    'explore': 'I want to explore the design system. Walk me through the most useful components and patterns, with live examples I can interact with.',
    'customize': 'I am customizing or theming the design system. Guide me through token overrides, brand theme structure, and the correct way to create semantic color mappings.',
    'other': 'I am working on a design-system task. Use LD 3.5 components and semantic tokens throughout.',
  };
  const startMap: Record<string, string> = {
    'new': 'I am starting from a blank canvas with no existing files.',
    'existing': 'I am adding to an existing project that already uses LD 3.5.',
    'figma': 'I have a Figma design ready and need to implement it using LD 3.5 components.',
    'other': 'I am in an unusual starting situation — adapt your approach accordingly.',
  };
  const goalMap: Record<string, string> = {
    'build': 'The priority is shipping quickly — use pre-built components and established patterns. Minimize custom styling.',
    'setup': 'The priority is getting set up correctly — cover installation, configuration, and project orientation.',
    'explore': 'Walk me through what is available. Show component variants, token usage, and common patterns.',
    'figma-to-code': 'The priority is pixel-perfect fidelity — every Figma value must map to the correct semantic token.',
    'other': 'Focus on producing clean, correct LD 3.5 output suited to my context.',
  };
  const envMap: Record<string, string> = {
    'fusion': 'I am working in Builder.io Fusion (live browser-based dev environment with real-time preview).',
    'cursor': 'I am working in Cursor. Provide file-level context and reference component paths when relevant.',
    'figma-make': 'I am using Figma Make (Figma-to-code plugin). Map Figma component names to LD 3.5 equivalents.',
    'developer': 'I am using a standard code editor (VS Code, WebStorm, or similar).',
  };
  const expMap: Record<string, string> = {
    'new': 'I am new to Living Design 3.5 — explain component choices, token names, and accessibility requirements as you go.',
    'familiar': 'I have some LD 3.5 experience — brief explanations are helpful but not needed for every step.',
    'advanced': 'I am experienced with LD 3.5 — keep output concise and skip basic explanations.',
    'other': 'Assume moderate familiarity with the design system.',
  };

  const lines = [
    featureMap[answers.featureType] ?? featureMap['other'],
    startMap[answers.startingPoint] ?? '',
    envMap[answers.environment] ?? '',
    expMap[answers.experience] ?? '',
    '',
    goalMap[answers.goal] ?? '',
    '',
    'Requirements:',
    '- Use LD 3.5 components exclusively — no raw HTML elements for UI',
    '- Use LD semantic tokens only — no hardcoded hex, spacing, or font values',
    '- Use icons from @/components/icons — no emojis or inline SVGs',
    '- All interactive elements must be keyboard accessible with visible focus states',
    '- CSS modules for all styling — inline styles only for per-render dynamic values',
  ].filter((l, i, arr) => !(l === '' && arr[i - 1] === ''));

  return lines.join('\n');
}

interface ReadingItem { label: string; path: string; }

function generateReadingPath(answers: Record<string, string>): ReadingItem[] {
  const path: ReadingItem[] = [];

  // Always Themes & Tokens first unless advanced
  if (answers.experience !== 'advanced') {
    path.push({ label: 'Themes & Tokens', path: '/component-library/themes' });
  }

  // featureType-based
  const featureRoutes: Record<string, ReadingItem[]> = {
    'figma-code': [
      { label: 'Icons', path: '/component-library/icons' },
      { label: 'Buttons', path: '/component-library/buttons' },
    ],
    'new-page': [
      { label: 'Cards', path: '/component-library/cards' },
      { label: 'Buttons', path: '/component-library/buttons' },
    ],
    'explore': [
      { label: 'Overview', path: '/component-library' },
      { label: 'Component Sandbox', path: '/component-library/component-tester' },
    ],
    'customize': [
      { label: 'Guidelines', path: '/component-library/guidelines' },
    ],
    'other': [
      { label: 'Overview', path: '/component-library' },
      { label: 'Getting Started', path: '/component-library/getting-started' },
    ],
  };
  (featureRoutes[answers.featureType] ?? featureRoutes['other']).forEach(r => path.push(r));

  // Additional context
  if (answers.environment === 'figma-make') {
    path.push({ label: 'Guidelines', path: '/component-library/guidelines' });
  }
  if (answers.goal === 'build') {
    path.push({ label: 'Data Table', path: '/component-library/table' });
  }
  if (answers.goal === 'figma-to-code') {
    path.push({ label: 'Guidelines', path: '/component-library/guidelines' });
  }

  // Deduplicate
  const seen = new Set<string>();
  return path.filter(p => { if (seen.has(p.path)) return false; seen.add(p.path); return true; });
}

/* ── Sub-components ── */

function ProgressDots({ total, current }: { total: number; current: number }) {
  return (
    <div className={styles.dots}>
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`${styles.dot} ${i < current ? styles.dotDone : ''} ${i === current ? styles.dotActive : ''}`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function AnswerOption({ option, selected, onSelect }: { option: QuizOption; selected: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={`${styles.option} ${selected ? styles.optionSelected : ''}`}
    >
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

/* ── Summary tags ── */

const QUESTION_LABELS: Record<string, string> = {
  featureType: 'Working on',
  startingPoint: 'Starting from',
  goal: 'Goal',
  environment: 'Tool',
  experience: 'Experience',
};

const OPTION_LABEL_MAP: Record<string, Record<string, string>> = {
  featureType: { 'new-page': 'New page', 'figma-code': 'Figma to code', explore: 'Exploring', customize: 'Customizing', other: 'Other' },
  startingPoint: { new: 'Scratch', existing: 'Existing project', figma: 'Figma design', other: 'Other' },
  goal: { build: 'Build fast', setup: 'Project setup', explore: 'Explore', 'figma-to-code': 'Figma conversion', other: 'Other' },
  environment: { fusion: 'Fusion', cursor: 'Cursor', 'figma-make': 'Figma Make', developer: 'Other editor' },
  experience: { new: 'New to LD 3.5', familiar: 'Some experience', advanced: 'Advanced', other: 'Unsure' },
};

/* ── Main component ── */

type Step = 'intro' | number | 'result';

export interface DesignerOnboardingQuizProps {
  onComplete?: (keyAnswer: string | undefined) => void;
}

export function DesignerOnboardingQuiz({ onComplete }: DesignerOnboardingQuizProps = {}) {
  const [step, setStep] = useState<Step>('intro');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  const currentIndex = typeof step === 'number' ? step : -1;
  const currentQuestion = currentIndex >= 0 ? QUESTIONS[currentIndex] : null;
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : undefined;

  const goNext = () => {
    if (step === 'intro') { setStep(0); return; }
    if (typeof step === 'number') {
      if (step < QUESTIONS.length - 1) { setStep(step + 1); return; }
      setStep('result');
      onComplete?.(answers.featureType);
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
      else { setStep('result'); onComplete?.(answers.featureType); }
    }
  };

  const skipAll = () => {
    setStep('result');
    onComplete?.(answers.featureType);
  };

  const restart = () => { setStep('intro'); setAnswers({}); setCopied(false); };

  const handleCopy = useCallback(async () => {
    const prompt = generatePrompt(answers);
    try { await navigator.clipboard.writeText(prompt); setCopied(true); setTimeout(() => setCopied(false), 2000); }
    catch { /* silent */ }
  }, [answers]);

  /* ── Intro ── */
  if (step === 'intro') {
    return (
      <div className={styles.card}>
        <div style={{ textAlign: 'center' }}>
          <h3 className={styles.introTitle}>Find your starting point</h3>
          <p className={styles.introDesc} style={{ marginTop: 8 }}>
            Answer 5 quick questions and get a ready-to-paste AI prompt personalized to your workflow.
          </p>
        </div>

        {/* Feature cards */}
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
            Start the quiz
            <ChevronRight width={16} height={16} aria-hidden="true" />
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
    const prompt = generatePrompt(answers);
    const readingPath = generateReadingPath(answers);
    const hasAnswers = Object.keys(answers).length > 0;

    return (
      <div className={styles.card}>
        {/* Success banner */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px',
          borderRadius: 10, background: 'var(--ld-semantic-color-fill-positive-subtle)',
          border: '1px solid var(--ld-semantic-color-border-positive)',
        }}>
          <span style={{ color: 'var(--ld-semantic-color-text-positive)', flexShrink: 0 }}>
            <CheckCircleFill width={24} height={24} aria-hidden="true" />
          </span>
          <span style={{ fontWeight: 700, fontSize: 16, color: 'var(--ld-semantic-color-text-positive)' }}>
            Your personalized designer prompt is ready
          </span>
        </div>

        {/* Summary tags */}
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

        {/* Prompt box */}
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

        {/* Reading path */}
        <div className={styles.resultSection} style={{ background: 'var(--ld-semantic-color-fill-brand-subtle)', border: '1px solid var(--ld-semantic-color-border-brand)' }}>
          <div className={styles.resultSectionHeader}>
            <span className={styles.resultSectionLabel} style={{ color: 'var(--ld-semantic-color-text-brand-bold)' }}>Recommended reading path</span>
          </div>
          <ol className={styles.readingList}>
            {readingPath.map((item, i) => (
              <li key={item.path} className={styles.readingItem}>
                <span className={styles.readingNumber}>{i + 1}</span>
                <Link href={item.path}>
                  {item.label}
                  <ArrowRight width={12} height={12} aria-hidden="true" style={{ marginLeft: 4 }} />
                </Link>
              </li>
            ))}
          </ol>
        </div>

        {/* Reset */}
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
  const progressPct = (currentIndex / QUESTIONS.length) * 100;

  return (
    <div className={styles.card}>
      {/* Progress */}
      <div className={styles.progressHeader}>
        <span className={styles.progressLabel}>Question {currentIndex + 1} of {QUESTIONS.length}</span>
        <ProgressDots total={QUESTIONS.length} current={currentIndex} />
        <Button variant="tertiary" size="small" onClick={skipAll}>Skip quiz</Button>
      </div>
      <div className={styles.progressTrack} role="progressbar" aria-valuenow={currentIndex + 1} aria-valuemax={QUESTIONS.length}>
        <div className={styles.progressFill} style={{ width: `${progressPct}%` }} />
      </div>

      {/* Question */}
      <h4 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: 'var(--ld-semantic-color-text)', lineHeight: 1.4 }}>
        {currentQuestion.question}
      </h4>

      {/* Why this matters */}
      <Alert variant="info">
        <strong>Why this matters: </strong>{currentQuestion.why}
      </Alert>

      {/* Options */}
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

      {/* Nav */}
      <div className={styles.navRow}>
        <Button variant="secondary" size="medium" onClick={goBack} disabled={currentIndex === 0 && step === 0}>
          <ChevronLeft width={16} height={16} aria-hidden="true" /> Back
        </Button>
        <Button variant="tertiary" size="medium" onClick={skip}>Skip this question</Button>
        <Button variant="primary" size="medium" onClick={goNext}>
          {currentIndex === QUESTIONS.length - 1 ? 'Generate prompt' : 'Next'}
          <ChevronRight width={16} height={16} aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
