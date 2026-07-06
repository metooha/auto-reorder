import React, { useState } from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';
import { Tag } from '@/components/ui/Tag';
import { DesktopFooter } from '@/components/walmart/DesktopFooter';
import { MwebFooter } from '@/components/walmart/MwebFooter';
import { BottomNav } from '@/components/walmart/BottomNav';
import { AndroidBottomNav } from '@/components/walmart/AndroidBottomNav';
import { FloatingFooter } from '@/components/walmart/FloatingFooter';
import { Pause } from '@/components/icons/Pause';
import { Flash } from '@/components/icons/Flash';
import styles from './FooterPatterns.module.css';

type Platform = 'dweb' | 'mweb' | 'native' | 'android';
type NativeTab = 'shop' | 'heart' | 'user';
type AndroidTab = 'shop' | 'heart' | 'search' | 'services' | 'account';

const PLATFORM_META: Record<Platform, {
  component: string;
  tag: string;
  tagVariant: 'info' | 'success' | 'neutral';
  description: string;
}> = {
  dweb: {
    component: 'WCP Footer (Dweb)',
    tag: '≥ 1024px',
    tagVariant: 'info',
    description: 'The standard desktop footer. Renders below all page content with a feedback section, full link grid, and copyright. Hidden on screens narrower than 1024px.',
  },
  mweb: {
    component: 'WCP Footer (Mweb)',
    tag: '< 1024px',
    tagVariant: 'success',
    description: 'Single-column stacked layout for mobile browsers. Same content as the desktop footer — feedback, full link list, copyright — collapsed into a scannable vertical list.',
  },
  native: {
    component: 'WCP Bottom Nav (iOS)',
    tag: 'iOS',
    tagVariant: 'neutral',
    description: 'Glassmorphic bottom navigation bar with animated spring indicator. Three primary destinations: Shop, My Items, and Account. Includes the Sparky AI button. iOS home indicator included.',
  },
  android: {
    component: 'WCP Bottom Nav (Android)',
    tag: 'Android',
    tagVariant: 'neutral',
    description: 'Material-style bottom navigation bar with five tabs: Shop, My Items, Sparky, Services, and Account. Includes Android gesture bar. Active tab highlighted in brand blue.',
  },
};

export default function FooterPatternsPage() {
  const [platform, setPlatform] = useState<Platform>('dweb');
  const [nativeTab, setNativeTab] = useState<NativeTab>('shop');
  const [androidTab, setAndroidTab] = useState<AndroidTab>('shop');

  const meta = PLATFORM_META[platform];

  return (
    <ComponentPageLayout
      section="WCP Patterns"
      title="Footer & Bottom Nav"
      description="Three navigation patterns — one for each platform. The project-wide mobile default is now configured in Project Settings."
    >

      {/* ── Platform Component Preview ──────────────────────────── */}
      <div className={styles.previewSection}>
        <div className={styles.previewHeader}>
          <h2 className={styles.previewTitle}>Component preview</h2>
          <ButtonGroup>
            <Button
              variant={platform === 'dweb' ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setPlatform('dweb')}
            >
              WCP Footer (Dweb)
            </Button>
            <Button
              variant={platform === 'mweb' ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setPlatform('mweb')}
            >
              WCP Footer (Mweb)
            </Button>
            <Button
              variant={platform === 'native' ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setPlatform('native')}
            >
              WCP Bottom Nav (iOS)
            </Button>
            <Button
              variant={platform === 'android' ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setPlatform('android')}
            >
              Android Bottom Nav
            </Button>
          </ButtonGroup>
        </div>

        {/* Meta row */}
        <div className={styles.metaRow}>
          <span className={styles.metaLabel}>{meta.component}</span>
          <Tag variant={meta.tagVariant}>{meta.tag}</Tag>
          <p className={styles.metaDesc}>{meta.description}</p>
        </div>

        {/* Component frame */}
        <div className={styles.frame}>
          {platform === 'dweb' && (
            <div className={styles.dwebFrame}>
              <DesktopFooter />
            </div>
          )}

          {platform === 'mweb' && (
            <div className={styles.mwebFrame}>
              {/* contained overrides the desktop display:none */}
              <MwebFooter contained />
            </div>
          )}

          {platform === 'android' && (
            <div className={styles.nativeFrame}>
              <div className={styles.androidPhone}>
                <div className={styles.androidScreen}>
                  <div className={styles.nativePageContent}>
                    <p className={styles.nativePageHint}>App content above the nav bar</p>
                  </div>
                  <AndroidBottomNav
                    contained
                    activeTab={androidTab}
                    onTabChange={(tab) => setAndroidTab(tab)}
                  />
                </div>
              </div>

              <div className={styles.nativeTabSwitcher}>
                <p className={styles.nativeTabLabel}>Active tab:</p>
                <ButtonGroup>
                  {(['shop', 'heart', 'search', 'services', 'account'] as AndroidTab[]).map((tab) => (
                    <Button
                      key={tab}
                      variant={androidTab === tab ? 'primary' : 'secondary'}
                      size="small"
                      onClick={() => setAndroidTab(tab)}
                    >
                      {tab === 'shop' ? 'Shop' : tab === 'heart' ? 'My Items' : tab === 'search' ? 'Sparky' : tab === 'services' ? 'Services' : 'Account'}
                    </Button>
                  ))}
                </ButtonGroup>
              </div>
            </div>
          )}

          {platform === 'native' && (
            <div className={styles.nativeFrame}>
              <div className={styles.nativePhone}>
                <div className={styles.nativeScreen}>
                  <div className={styles.nativePageContent}>
                    <p className={styles.nativePageHint}>App content above the nav bar</p>
                  </div>
                  <BottomNav
                    contained
                    activeTab={nativeTab}
                    onTabChange={(tab) => setNativeTab(tab)}
                  />
                </div>
              </div>

              <div className={styles.nativeTabSwitcher}>
                <p className={styles.nativeTabLabel}>Active tab:</p>
                <ButtonGroup>
                  {(['shop', 'heart', 'user'] as NativeTab[]).map((tab) => (
                    <Button
                      key={tab}
                      variant={nativeTab === tab ? 'primary' : 'secondary'}
                      size="small"
                      onClick={() => setNativeTab(tab)}
                    >
                      {tab === 'shop' ? 'Shop' : tab === 'heart' ? 'My Items' : 'Account'}
                    </Button>
                  ))}
                </ButtonGroup>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Usage table ─────────────────────────────────────────── */}
      <div className={styles.usageSection}>
        <h2 className={styles.usageTitle}>Import Reference</h2>
        <div className={styles.usageTable}>
          <div className={styles.usageRowHeader}>
            <span>Component</span>
            <span>Usage</span>
            <span>Import path</span>
          </div>
          <div className={styles.usageRow}>
            <div className={styles.usageCell}>
              <span className={styles.usagePlatform}>WCP Footer (Dweb)</span>
              <Tag variant="info">≥ 1024px</Tag>
            </div>
            <div className={styles.usageCell}>
              <code className={styles.usageCode}>{'<DesktopFooter />'}</code>
            </div>
            <div className={styles.usageCell}>
              <span className={styles.usageImport}>@/components/walmart/DesktopFooter</span>
            </div>
          </div>
          <div className={styles.usageRow}>
            <div className={styles.usageCell}>
              <span className={styles.usagePlatform}>WCP Footer (Mweb)</span>
              <Tag variant="success">{'< 1024px'}</Tag>
            </div>
            <div className={styles.usageCell}>
              <code className={styles.usageCode}>{'<MwebFooter />'}</code>
            </div>
            <div className={styles.usageCell}>
              <span className={styles.usageImport}>@/components/walmart/MwebFooter</span>
            </div>
          </div>
          <div className={styles.usageRow}>
            <div className={styles.usageCell}>
              <span className={styles.usagePlatform}>WCP Bottom Nav (iOS)</span>
              <Tag variant="neutral">iOS</Tag>
            </div>
            <div className={styles.usageCell}>
              <code className={styles.usageCode}>{'<BottomNav activeTab="shop" />'}</code>
            </div>
            <div className={styles.usageCell}>
              <span className={styles.usageImport}>@/components/walmart/BottomNav</span>
            </div>
          </div>
          <div className={styles.usageRow}>
            <div className={styles.usageCell}>
              <span className={styles.usagePlatform}>WCP Bottom Nav (Android)</span>
              <Tag variant="neutral">Android</Tag>
            </div>
            <div className={styles.usageCell}>
              <code className={styles.usageCode}>{'<AndroidBottomNav activeTab="shop" />'}</code>
            </div>
            <div className={styles.usageCell}>
              <span className={styles.usageImport}>@/components/walmart/AndroidBottomNav</span>
            </div>
          </div>
        </div>

        <div className={styles.noteBox}>
          <strong>Responsive pairing:</strong> <code>DesktopFooter</code> and <code>MwebFooter</code> each manage their own breakpoint visibility — render both and CSS handles which one shows. The project-level default for mobile footer is configured in <strong>Project Settings</strong>.
        </div>
      </div>

      {/* ── Floating Action Bar ─────────────────────────────────── */}
      <div className={styles.floatingSection}>
        <div className={styles.previewHeader}>
          <h2 className={styles.previewTitle}>Floating Action Bar</h2>
          <Tag variant="neutral">iOS Glass</Tag>
        </div>
        <p className={styles.metaDesc}>
          A glassmorphic floating pill bar with two action buttons. Uses the same iOS glass kit as the Bottom Nav. Set <code>fixed</code> to pin it to the viewport bottom in production screens.
        </p>
        <div className={styles.floatingDemo}>
          <FloatingFooter
            fixed={false}
            secondaryAction={{ label: 'Pause Delivery', icon: <Pause width={20} height={20} /> }}
            primaryAction={{ label: 'Get it now', subLabel: 'as soon as 37 mins', icon: <Flash width={20} height={20} /> }}
          />
        </div>
      </div>
    </ComponentPageLayout>
  );
}
