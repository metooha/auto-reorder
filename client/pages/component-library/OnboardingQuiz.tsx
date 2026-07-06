import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { Link } from '@/components/ui/Link';
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Rocket,
  BookOpen,
  Clipboard,
  ArrowRight,
  CheckCircle,
} from '@/components/icons';
import styles from './OnboardingQuiz.module.css';

/* ── Data ── */

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

const QUESTIONS: QuizQuestion[] = [
  {
    id: 'projectType',
    question: 'What type of project are you working on?',
    why: 'This tailors component and pattern recommendations — Partner Experiences use specific template structures, while internal tools and consumer apps have different layout needs.',
    options: [
      { value: 'px', label: 'Partner Experience (PX)', desc: 'Ads, supplier portals, partner tools' },
      { value: 'internal', label: 'Internal Tool', desc: 'Associate or team-facing apps' },
      { value: 'consumer', label: 'Consumer-Facing', desc: 'Shopper-facing apps or sites' },
      { value: 'unsure', label: 'Not Sure Yet', desc: "Still figuring it out" },
    ],
  },
  {
    id: 'startingFrom',
    question: 'Where are you starting from?',
    why: 'Knowing your starting point determines whether to focus on initial setup, Figma-to-code migration, PM handoff patterns, or iteration workflows.',
    options: [
      { value: 'blank', label: 'Blank Canvas', desc: 'Starting from scratch' },
      { value: 'existing', label: 'Existing Design', desc: 'Have a Figma design to implement' },
      { value: 'handoff', label: 'Handoff from PM', desc: 'Working from specs or tickets' },
      { value: 'iteration', label: 'Iteration', desc: 'Improving something already built' },
    ],
  },
  {
    id: 'primaryGoal',
    question: "What's your primary goal right now?",
    why: 'Your goal shapes which components to reach for first — fast builds rely on pre-built patterns, high-fidelity work requires close token mapping, and audits need a different checklist entirely.',
    options: [
      { value: 'fast', label: 'Build Fast', desc: 'Ship a working version quickly' },
      { value: 'fidelity', label: 'High Fidelity', desc: 'Match design specs precisely' },
      { value: 'audit', label: 'Audit / Review', desc: 'Assess an existing implementation' },
      { value: 'explore', label: 'Explore Components', desc: "Learn what's available" },
    ],
  },
  {
    id: 'environment',
    question: "What's your environment?",
    why: 'Builder.io Fusion uses live in-browser editing, Figma Make uses design-to-code export, and external editors like Cursor need different prompt patterns and file context.',
    options: [
      { value: 'fusion', label: 'Builder.io Fusion', desc: 'Live dev environment in the browser' },
      { value: 'figma', label: 'Figma Only', desc: 'Working entirely in design tools' },
      { value: 'both', label: 'Both', desc: 'Designing and implementing together' },
      { value: 'other', label: 'Other Tool', desc: 'Cursor, VS Code, or another editor' },
    ],
  },
  {
    id: 'experience',
    question: 'How experienced are you with this design system?',
    why: 'This determines how much scaffolding the AI provides — beginners get component explanations and token guidance, while advanced users get concise, direct output.',
    options: [
      { value: 'new', label: 'New to LD 3.5', desc: 'First time using this system' },
      { value: 'some', label: 'Some Experience', desc: 'Used it a few times' },
      { value: 'advanced', label: 'Advanced', desc: 'Deep familiarity with tokens and components' },
    ],
  },
  {
    id: 'designFocus',
    question: 'What is your design focus?',
    why: 'This tailors recommendations toward page-level composition, new component creation, or design system governance — each requires different tools and reading paths.',
    options: [
      { value: 'pages', label: 'Building Pages', desc: 'Assembling pages from existing components' },
      { value: 'components', label: 'Creating Components', desc: 'Designing and building new reusable components' },
      { value: 'theming', label: 'Theming & Tokens', desc: 'Customizing brand themes and token values' },
      { value: 'review', label: 'Design Review', desc: 'Reviewing implementations against design specs' },
    ],
  },
];

/* ── Prompt generation ── */

function generatePrompt(answers: Record<string, string>): string {
  const projectLabel: Record<string, string> = {
    px: 'a Partner Experience (PX) project',
    internal: 'an internal tool for associates or teams',
    consumer: 'a consumer-facing application',
    unsure: 'a new project (type TBD)',
  };
  const startLabel: Record<string, string> = {
    blank: 'starting from a blank canvas',
    existing: 'implementing an existing Figma design',
    handoff: 'working from a PM handoff and specs',
    iteration: 'iterating on an existing implementation',
  };
  const goalLabel: Record<string, string> = {
    fast: 'The priority is shipping quickly — use pre-built components and established patterns without custom styling.',
    fidelity: 'The priority is pixel-perfect fidelity — match the design spec precisely, mapping every value to the correct LD semantic token.',
    audit: 'Perform an audit of the current implementation against LD 3.5 standards. Flag any hardcoded values, missing tokens, custom buttons, or accessibility issues.',
    explore: 'Walk me through the components and patterns most relevant to this project type. Show variants, sizes, and usage examples.',
  };
  const envLabel: Record<string, string> = {
    fusion: 'I am working in Builder.io Fusion (live browser-based dev environment).',
    figma: 'I am working in Figma — provide code patterns I can reference for implementation.',
    both: 'I am working across both Figma and Builder.io Fusion.',
    other: 'I am working in an external editor (Cursor, VS Code, or similar).',
  };
  const expLabel: Record<string, string> = {
    new: 'I am new to Living Design 3.5 — explain component choices, token usage, and accessibility patterns as you go.',
    some: 'I have some familiarity with LD 3.5 — brief explanations are helpful but not required for every step.',
    advanced: 'I am experienced with LD 3.5 — keep prompts concise and skip basic explanations.',
  };

  const project = projectLabel[answers.projectType] ?? 'a project';
  const start = startLabel[answers.startingFrom] ?? '';
  const goal = goalLabel[answers.primaryGoal] ?? '';
  const env = envLabel[answers.environment] ?? '';
  const exp = expLabel[answers.experience] ?? '';

  const focusLabel: Record<string, string> = {
    pages: 'My focus is assembling pages from existing LD 3.5 components — prioritize layout patterns, page composition, and responsive breakpoints.',
    components: 'My focus is designing and creating new reusable components — follow WCP component creation rules, use CSS modules, semantic tokens, and include documentation.',
    theming: 'My focus is theming and token customization — guide me through creating or modifying brand themes and mapping design values to semantic tokens.',
    review: 'My focus is design review — compare the current implementation against LD 3.5 standards and flag deviations in tokens, components, and accessibility.',
  };
  const focus = focusLabel[answers.designFocus] ?? '';

  return [
    `I am building ${project}, ${start}.`,
    `${env}`,
    `${exp}`,
    focus ? `${focus}` : '',
    ``,
    `Goal: ${goal}`,
    ``,
    `Requirements:`,
    `- Use Living Design 3.5 components exclusively (Button, Alert, Card, etc.) — no raw HTML elements for UI`,
    `- Use LD semantic design tokens only — no hardcoded hex colors, spacing values, or font sizes`,
    `- Use icons from the LD icon library — no emojis, no inline SVGs`,
    `- All interactive elements must be keyboard accessible with visible focus states`,
    `- No divider lines unless explicitly required by the design`,
  ].join('\n');
}

interface ReadingItem {
  label: string;
  path: string;
}

function generateReadingPath(answers: Record<string, string>): ReadingItem[] {
  const path: ReadingItem[] = [];

  // Always start here
  path.push({ label: 'Getting Started', path: '/component-library/getting-started' });

  // Experience-based
  if (answers.experience === 'new') {
    path.push({ label: 'Themes & Tokens', path: '/component-library/themes' });
    path.push({ label: 'Buttons', path: '/component-library/buttons' });
    path.push({ label: 'Alerts', path: '/component-library/alerts' });
  }

  // Goal-based
  if (answers.primaryGoal === 'fast') {
    path.push({ label: 'Buttons', path: '/component-library/buttons' });
    path.push({ label: 'Cards', path: '/component-library/cards' });
    path.push({ label: 'Data Table', path: '/component-library/table' });
  }
  if (answers.primaryGoal === 'fidelity') {
    path.push({ label: 'Themes & Tokens', path: '/component-library/themes' });
    path.push({ label: 'Guidelines', path: '/component-library/guidelines' });
    path.push({ label: 'Tags', path: '/component-library/tags' });
  }
  if (answers.primaryGoal === 'audit') {
    path.push({ label: 'Themes & Tokens', path: '/component-library/themes' });
    path.push({ label: 'Guidelines', path: '/component-library/guidelines' });
    path.push({ label: 'Buttons', path: '/component-library/buttons' });
  }
  if (answers.primaryGoal === 'explore') {
    path.push({ label: 'Component Sandbox', path: '/component-library/component-tester' });
    path.push({ label: 'Icons', path: '/component-library/icons' });
  }

  // Project type-based
  if (answers.projectType === 'px') {
    path.push({ label: 'Cards', path: '/component-library/cards' });
    path.push({ label: 'Data Table', path: '/component-library/table' });
  }
  if (answers.projectType === 'consumer') {
    path.push({ label: 'Navigation Menu', path: '/component-library/navigation-menu' });
    path.push({ label: 'Form Groups', path: '/component-library/form-groups' });
    path.push({ label: 'Text Fields', path: '/component-library/text-fields' });
  }
  if (answers.projectType === 'internal') {
    path.push({ label: 'Data Table', path: '/component-library/table' });
    path.push({ label: 'Modals', path: '/component-library/modals' });
    path.push({ label: 'Filter Chips', path: '/component-library/filter-chips' });
  }

  // Environment-based
  if (answers.environment === 'figma' || answers.environment === 'both') {
    path.push({ label: 'Guidelines', path: '/component-library/guidelines' });
  }

  // Design focus-based
  if (answers.designFocus === 'components') {
    path.push({ label: 'Component Designer', path: '/component-library/getting-started' });
    path.push({ label: 'Component Sandbox', path: '/component-library/component-tester' });
    path.push({ label: 'WCP Queue (reference)', path: '/component-library/wcp-queue' });
  }
  if (answers.designFocus === 'theming') {
    path.push({ label: 'Themes & Tokens', path: '/component-library/themes' });
    path.push({ label: 'Foundations', path: '/component-library/foundations' });
  }
  if (answers.designFocus === 'review') {
    path.push({ label: 'Guidelines', path: '/component-library/guidelines' });
    path.push({ label: 'Themes & Tokens', path: '/component-library/themes' });
  }
  if (answers.designFocus === 'pages') {
    path.push({ label: 'Component Sandbox', path: '/component-library/component-tester' });
    path.push({ label: 'Cards', path: '/component-library/cards' });
  }

  // Always end with icons if not already there
  if (!path.find((p) => p.path === '/component-library/icons')) {
    path.push({ label: 'Icons', path: '/component-library/icons' });
  }

  // Deduplicate
  const seen = new Set<string>();
  return path.filter((p) => {
    if (seen.has(p.path)) return false;
    seen.add(p.path);
    return true;
  });
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

function AnswerOption({
  option,
  selected,
  onSelect,
}: {
  option: QuizOption;
  selected: boolean;
  onSelect: () => void;
}) {
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

/* ── Main Component ── */

type Step = 'intro' | number | 'result';

export function OnboardingQuiz() {
  const [step, setStep] = useState<Step>('intro');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  const currentIndex = typeof step === 'number' ? step : -1;
  const currentQuestion = currentIndex >= 0 ? QUESTIONS[currentIndex] : null;
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : undefined;

  const goNext = () => {
    if (step === 'intro') { setStep(0); return; }
    if (typeof step === 'number') {
      if (step < QUESTIONS.length - 1) setStep(step + 1);
      else setStep('result');
    }
  };

  const goBack = () => {
    if (typeof step === 'number') {
      if (step === 0) setStep('intro');
      else setStep(step - 1);
    }
    if (step === 'result') setStep(QUESTIONS.length - 1);
  };

  const selectAnswer = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const restart = () => {
    setStep('intro');
    setAnswers({});
    setCopied(false);
  };

  const handleCopy = useCallback(async () => {
    const prompt = generatePrompt(answers);
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* silent */ }
  }, [answers]);

  /* ── Intro ── */
  if (step === 'intro') {
    return (
      <div className={styles.card}>
        <div className={styles.introIconRow}>
          <span className={styles.introIcon}>
            <Rocket width={28} height={28} aria-hidden="true" />
          </span>
        </div>
        <h3 className={styles.introTitle}>Find Your Starting Point</h3>
        <p className={styles.introDesc}>
          Answer 5 quick questions and we'll generate a personalized AI prompt and recommended
          reading path tailored to your project, environment, and experience level.
        </p>
        <div className={styles.introMeta}>
          <span className={styles.metaItem}>
            <CheckCircle width={14} height={14} aria-hidden="true" />
            5 questions
          </span>
          <span className={styles.metaItem}>
            <CheckCircle width={14} height={14} aria-hidden="true" />
            Copy-ready AI prompt
          </span>
          <span className={styles.metaItem}>
            <CheckCircle width={14} height={14} aria-hidden="true" />
            Personalized reading path
          </span>
        </div>
        <Button variant="primary" size="medium" onClick={goNext}>
          Start Quiz
          <ChevronRight width={16} height={16} aria-hidden="true" />
        </Button>
      </div>
    );
  }

  /* ── Result ── */
  if (step === 'result') {
    const prompt = generatePrompt(answers);
    const readingPath = generateReadingPath(answers);

    return (
      <div className={styles.card}>
        <div className={styles.resultHeader}>
          <span className={styles.resultIcon}>
            <CheckCircle width={24} height={24} aria-hidden="true" />
          </span>
          <h3 className={styles.resultTitle}>Your Personalized Setup</h3>
        </div>

        {/* Generated prompt */}
        <section className={styles.resultSection}>
          <div className={styles.resultSectionHeader}>
            <Clipboard width={16} height={16} aria-hidden="true" />
            <span className={styles.resultSectionLabel}>Copy-Ready AI Prompt</span>
          </div>
          <pre className={styles.promptBox}>{prompt}</pre>
          <Button
            variant={copied ? 'secondary' : 'primary'}
            size="medium"
            onClick={handleCopy}
          >
            {copied
              ? <><Check width={16} height={16} aria-hidden="true" /> Copied!</>
              : <><Clipboard width={16} height={16} aria-hidden="true" /> Copy Prompt</>
            }
          </Button>
        </section>

        {/* Reading path */}
        <section className={styles.resultSection}>
          <div className={styles.resultSectionHeader}>
            <BookOpen width={16} height={16} aria-hidden="true" />
            <span className={styles.resultSectionLabel}>Recommended Reading Path</span>
          </div>
          <ol className={styles.readingList}>
            {readingPath.map((item, i) => (
              <li key={item.path} className={styles.readingItem}>
                <span className={styles.readingNumber}>{i + 1}</span>
                <Link href={item.path} className={styles.readingLink}>
                  {item.label}
                  <ArrowRight width={12} height={12} aria-hidden="true" style={{ marginLeft: 4 }} />
                </Link>
              </li>
            ))}
          </ol>
        </section>

        {/* Actions */}
        <div className={styles.navRow}>
          <Button variant="secondary" size="medium" onClick={goBack}>
            <ChevronLeft width={16} height={16} aria-hidden="true" />
            Back
          </Button>
          <Button variant="secondary" size="medium" onClick={restart}>
            Retake Quiz
          </Button>
        </div>
      </div>
    );
  }

  /* ── Question ── */
  if (!currentQuestion) return null;
  const progressPct = ((currentIndex) / QUESTIONS.length) * 100;

  return (
    <div className={styles.card}>
      {/* Progress */}
      <div className={styles.progressHeader}>
        <span className={styles.progressLabel}>
          Question {currentIndex + 1} of {QUESTIONS.length}
        </span>
        <ProgressDots total={QUESTIONS.length} current={currentIndex} />
      </div>
      <div className={styles.progressTrack} role="progressbar" aria-valuenow={currentIndex + 1} aria-valuemax={QUESTIONS.length}>
        <div className={styles.progressFill} style={{ width: `${progressPct}%` }} />
      </div>

      {/* Question */}
      <h3 className={styles.questionText}>{currentQuestion.question}</h3>

      {/* Options */}
      <div className={styles.optionList} role="radiogroup" aria-label={currentQuestion.question}>
        {currentQuestion.options.map((opt) => (
          <AnswerOption
            key={opt.value}
            option={opt}
            selected={currentAnswer === opt.value}
            onSelect={() => selectAnswer(currentQuestion.id, opt.value)}
          />
        ))}
      </div>

      {/* Why this matters */}
      <Alert variant="info">
        <strong>Why this matters: </strong>{currentQuestion.why}
      </Alert>

      {/* Nav */}
      <div className={styles.navRow}>
        <Button variant="secondary" size="medium" onClick={goBack}>
          <ChevronLeft width={16} height={16} aria-hidden="true" />
          Back
        </Button>
        <Button
          variant="primary"
          size="medium"
          onClick={goNext}
          disabled={!currentAnswer}
        >
          {currentIndex === QUESTIONS.length - 1 ? 'See Results' : 'Next'}
          <ChevronRight width={16} height={16} aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
