import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';
import { WCPFlag, WCP_FLAG_VARIANTS } from '@/components/walmart/WCPFlag';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { useTheme } from '@/contexts/ThemeContext';
import { DesktopFooter } from '@/components/walmart/DesktopFooter';
import { MwebFooter } from '@/components/walmart/MwebFooter';
import { BottomNav } from '@/components/walmart/BottomNav';
import {
  Gift,
  Star,
  Hourglass,
  Dollar,
  Tag,
  ShieldCheck,
  CheckCircle,
  Check,
  Lock,
  UsersFill,
  Flash,
} from '@/components/icons';
import type { WCPFlagVariant } from '@/components/walmart/WCPFlag';
import styles from './PreviewPanel.module.css';

const ICON_SIZE = { width: 16, height: 16 } as const;

const FLAG_ICONS: Record<WCPFlagVariant, React.ReactNode> = {
  'holiday-restricted': <Lock        {...ICON_SIZE} />,
  'brand-subtle':       <Star        {...ICON_SIZE} />,
  'scarcity':           <Hourglass   {...ICON_SIZE} />,
  'savings-bold':       <Dollar      {...ICON_SIZE} />,
  'savings-subtle':     <Tag         {...ICON_SIZE} />,
  'confidence-subtle':  <ShieldCheck {...ICON_SIZE} />,
  'confidence-bold':    <ShieldCheck {...ICON_SIZE} />,
  'confidence-alt':     <Check       {...ICON_SIZE} />,
  'confidence':         <CheckCircle {...ICON_SIZE} />,
  'holiday-member':     <Gift        {...ICON_SIZE} />,
  'social':             <UsersFill   {...ICON_SIZE} />,
  'urgent':             <Flash       {...ICON_SIZE} />,
};

type Platform = 'dweb' | 'mweb' | 'native';

interface PreviewPanelProps {
  /** Number of overrides applied — used to force re-render when tokens change */
  overrideCount: number;
}

/**
 * Live component preview that reacts to token overrides in real time.
 * Because overrides are applied directly to :root via style.setProperty,
 * React renders immediately pick up the new CSS cascade values.
 */
export function PreviewPanel({ overrideCount: _ }: PreviewPanelProps) {
  const { currentThemeData } = useTheme();
  const [platform, setPlatform] = useState<Platform>('dweb');

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h2 className={styles.headerTitle}>Live Preview</h2>
        <p className={styles.headerSub}>Changes apply instantly via CSS cascade</p>
      </div>

      {/* Theme switcher */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Active theme</h3>
        <div className={styles.themeSwitcherWrap}>
          <ThemeSwitcher />
        </div>
        <p className={styles.themeNote}>
          Switch themes to see how your overrides stack on top of different base themes.
          Token overrides remain active across theme switches.
        </p>
      </section>

      {/* Platform / device chooser */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Device &amp; breakpoint</h3>
        <div className={styles.platformRow}>
          <ButtonGroup>
            <Button
              variant={platform === 'dweb' ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setPlatform('dweb')}
            >
              Desktop
            </Button>
            <Button
              variant={platform === 'mweb' ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setPlatform('mweb')}
            >
              Mobile Web
            </Button>
            <Button
              variant={platform === 'native' ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setPlatform('native')}
            >
              Native
            </Button>
          </ButtonGroup>
        </div>
        <p className={styles.themeNote}>
          {platform === 'dweb' && 'Previewing desktop web footer (≥1024px).'}
          {platform === 'mweb' && 'Previewing mobile web footer (<1024px).'}
          {platform === 'native' && 'Previewing native bottom navigation bar.'}
        </p>
      </section>

      {/* Buttons */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Buttons</h3>
        <div className={styles.buttonRows}>
          <div className={styles.buttonRow}>
            <Button variant="primary" size="medium">Primary</Button>
            <Button variant="secondary" size="medium">Secondary</Button>
            <Button variant="tertiary" size="medium">Tertiary</Button>
            <Button variant="destructive" size="medium">Destructive</Button>
          </div>
          <div className={styles.buttonRow}>
            <Button variant="primary" size="small">Primary sm</Button>
            <Button variant="secondary" size="small">Secondary sm</Button>
            <Button variant="primary-alt" size="medium">Walmart+</Button>
          </div>
        </div>
      </section>

      {/* WCP Flags */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>WCP Flags</h3>
        <div className={styles.flagGrid}>
          {WCP_FLAG_VARIANTS.map(({ variant, label }) => (
            <WCPFlag
              key={variant}
              variant={variant}
              label={label}
              leadingIcon={FLAG_ICONS[variant]}
            />
          ))}
        </div>
      </section>

      {/* Text field (field token preview) */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Text field</h3>
        <div className={styles.fieldWrap}>
          <input
            type="text"
            className={styles.previewInput}
            placeholder="Field border tokens preview"
            readOnly
          />
        </div>
      </section>

      {/* Footer / nav pattern preview */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>
          {platform === 'native' ? 'Bottom nav' : 'Footer'}
        </h3>
        <div className={platform === 'native' ? styles.nativePreviewWrap : styles.footerPreviewWrap}>
          {platform === 'dweb' && (
            <div className={styles.footerScaleWrap}>
              <div className={styles.footerScaleInner}>
                <DesktopFooter />
              </div>
            </div>
          )}
          {platform === 'mweb' && (
            <div className={styles.mwebPreviewFrame}>
              <MwebFooter />
            </div>
          )}
          {platform === 'native' && (
            <div className={styles.nativeFrame}>
              <BottomNav activeTab="shop" />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
