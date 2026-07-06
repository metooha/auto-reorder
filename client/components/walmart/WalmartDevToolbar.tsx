import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  useWalmartScenario,
  WalmartScenario,
  WalmartPrefsMode,
  WalmartErrorState,
} from '@/contexts/WalmartScenarioContext';
import { Chip } from '@/components/ui/Chip';
import { IconButton } from '@/components/ui/IconButton';
import {
  X,
  Home,
  TagFill,
  User,
  Calendar,
  Location,
  CreditCard,
  Wallet,
  Lock,
  ExclamationCircle,
  Box,
  Refresh,
} from '@/components/icons';
import styles from './WalmartDevToolbar.module.css';

interface ScenarioOption {
  id: WalmartScenario;
  label: string;
  icon: ReactNode;
}

interface PrefsOption {
  id: Exclude<WalmartPrefsMode, 'none'>;
  label: string;
  icon: ReactNode;
}

interface ErrorOption {
  id: Exclude<WalmartErrorState, 'none'>;
  label: string;
  icon: ReactNode;
}

const ICON_SIZE = 14;

const SCENARIOS: ScenarioOption[] = [
  { id: 'default', label: 'Onboarding', icon: <Home width={ICON_SIZE} height={ICON_SIZE} /> },
  {
    id: 'associate-discount',
    label: 'Associate Discount',
    icon: <TagFill width={ICON_SIZE} height={ICON_SIZE} />,
  },
];

const PREFS_OPTIONS: PrefsOption[] = [
  { id: 'non-member', label: 'Non-Member', icon: <User width={ICON_SIZE} height={ICON_SIZE} /> },
  {
    id: 'member-inhome',
    label: 'Member+ InHome',
    icon: <Home width={ICON_SIZE} height={ICON_SIZE} />,
  },
];

const ERROR_OPTIONS: ErrorOption[] = [
  {
    id: 'slot-unavailable',
    label: 'Slot unavailable',
    icon: <Calendar width={ICON_SIZE} height={ICON_SIZE} />,
  },
  {
    id: 'missing-address',
    label: 'Missing address',
    icon: <Location width={ICON_SIZE} height={ICON_SIZE} />,
  },
  {
    id: 'missing-payment',
    label: 'Missing payment',
    icon: <CreditCard width={ICON_SIZE} height={ICON_SIZE} />,
  },
  {
    id: 'method-error',
    label: 'Method error',
    icon: <Wallet width={ICON_SIZE} height={ICON_SIZE} />,
  },
  {
    id: 'missing-cvv',
    label: 'Missing CVV',
    icon: <Lock width={ICON_SIZE} height={ICON_SIZE} />,
  },
  {
    id: 'multiple',
    label: 'Multiple errors',
    icon: <ExclamationCircle width={ICON_SIZE} height={ICON_SIZE} />,
  },
  { id: 'oos', label: 'Out of stock', icon: <Box width={ICON_SIZE} height={ICON_SIZE} /> },
];

// Maximum time (ms) between two Escape presses for them to count as a double-tap.
const DOUBLE_ESC_WINDOW_MS = 400;

/**
 * Floating dev-only toolbar that lets the team switch between use-case
 * experiences on the /walmart prototype page.
 *
 * Hidden by default. Press Escape twice in quick succession to toggle visibility.
 */
export function WalmartDevToolbar() {
  const {
    scenario,
    setScenario,
    prefsMode,
    setPrefsMode,
    errorState,
    setErrorState,
    setOnboardingOpen,
    setOnboardingActive,
  } = useWalmartScenario();
  const [visible, setVisible] = useState(false);
  const lastEscAt = useRef<number>(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      const now = Date.now();
      if (now - lastEscAt.current <= DOUBLE_ESC_WINDOW_MS) {
        setVisible((v) => !v);
        lastEscAt.current = 0;
      } else {
        lastEscAt.current = now;
      }
    };
    const onMobileTrigger = () => setVisible((v) => !v);
    document.addEventListener('keydown', onKey);
    document.addEventListener('walmart:toggle-devtools', onMobileTrigger);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('walmart:toggle-devtools', onMobileTrigger);
    };
  }, []);

  if (!visible) return null;

  const handleReset = () => {
    setScenario('default');
    setPrefsMode('none');
    setErrorState('none');
    setOnboardingActive(false);
    setOnboardingOpen(false);
  };

  return (
    <>
      <div
        className={styles.scrim}
        onClick={() => setVisible(false)}
        aria-hidden="true"
      />
      <div
        className={styles.toolbar}
        role="toolbar"
        aria-label="Walmart demo scenarios"
      >
        <div className={styles.header}>
          <div className={styles.headerText}>
            <span className={styles.title}>Demo controls</span>
            <span className={styles.subtitle}>Esc Esc to toggle</span>
          </div>
          <IconButton
            aria-label="Hide demo toolbar"
            variant="ghost"
            size="medium"
            shape="rounded"
            onClick={() => setVisible(false)}
          >
            <X />
          </IconButton>
        </div>

        <section className={styles.row}>
          <span className={styles.label}>Scenario</span>
          <div className={styles.chips}>
            {SCENARIOS.map((s) => (
              <Chip
                key={s.id}
                size="medium"
                variant="primary"
                selected={scenario === s.id}
                onSelectedChange={() => {
                  setScenario(s.id);
                  if (s.id === 'default') {
                    setOnboardingActive(true);
                    setOnboardingOpen(true);
                  } else {
                    setOnboardingActive(false);
                    if (s.id === 'associate-discount') {
                      setOnboardingOpen(true);
                    }
                  }
                  setVisible(false);
                }}
              >
                <span className={styles.chipContent}>
                  {s.icon}
                  {s.label}
                </span>
              </Chip>
            ))}
          </div>
        </section>

        <section className={styles.row}>
          <span className={styles.label}>Update Preferences</span>
          <div className={styles.chips}>
            {PREFS_OPTIONS.map((p) => {
              const isActive = prefsMode === p.id;
              return (
                <Chip
                  key={p.id}
                  size="medium"
                  variant="primary"
                  selected={isActive}
                  onSelectedChange={() => { setPrefsMode(isActive ? 'none' : p.id); setVisible(false); }}
                >
                  <span className={styles.chipContent}>
                    {p.icon}
                    {p.label}
                  </span>
                </Chip>
              );
            })}
          </div>
        </section>

        <section className={styles.row}>
          <span className={styles.label}>Error states</span>
          <div className={styles.chips}>
            {ERROR_OPTIONS.map((e) => {
              const isActive = errorState === e.id;
              return (
                <Chip
                  key={e.id}
                  size="medium"
                  variant="primary"
                  selected={isActive}
                  onSelectedChange={() => { setErrorState(isActive ? 'none' : e.id); setVisible(false); }}
                >
                  <span className={styles.chipContent}>
                    {e.icon}
                    {e.label}
                  </span>
                </Chip>
              );
            })}
          </div>
        </section>

        <div className={styles.footer}>
          <button type="button" className={styles.resetBtn} onClick={handleReset}>
            <Refresh width={14} height={14} />
            Reset all
          </button>
        </div>
      </div>
    </>
  );
}
