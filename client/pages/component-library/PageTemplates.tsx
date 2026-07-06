import React, { useState } from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';
import { Tag } from '@/components/ui/Tag';
import styles from './PageTemplates.module.css';

type Template = 'full-page' | 'account' | 'search';

const TEMPLATES: Record<Template, { label: string; tag: string; tagVariant: 'info' | 'success' | 'neutral'; description: string }> = {
  'full-page': {
    label: 'Full-Page Template',
    tag: 'Desktop + Mobile',
    tagVariant: 'info',
    description: 'Standard page shell with DesktopHeader on top, main content area filling the viewport, and DesktopFooter / MwebFooter at the bottom. Used for most Walmart browsing and informational pages.',
  },
  'account': {
    label: 'Account Template',
    tag: 'Desktop + Mobile',
    tagVariant: 'success',
    description: 'Two-column layout with AccountSideNav on the left and main content on the right. On mobile, the side nav collapses to a top tab bar or hamburger drawer.',
  },
  'search': {
    label: 'Search Results Template',
    tag: 'Desktop + Mobile',
    tagVariant: 'neutral',
    description: 'Header + filter rail (left) + results grid (center) layout. Supports inline ad banners, sorting controls, and infinite scroll or pagination at the bottom.',
  },
};

const COMPOSITION_ROWS = [
  { zone: 'Top Nav', desktop: 'DesktopHeader', mobile: 'MobileHeader', note: 'Always present' },
  { zone: 'Sub Nav', desktop: 'DepartmentsDropdown', mobile: 'Hidden or drawer', note: 'Optional' },
  { zone: 'Main content', desktop: 'Page-specific layout', mobile: 'Single-column stack', note: 'Required' },
  { zone: 'Footer', desktop: 'DesktopFooter', mobile: 'MwebFooter or BottomNav', note: 'Always present' },
];

export default function PageTemplatesPage() {
  const [active, setActive] = useState<Template>('full-page');
  const meta = TEMPLATES[active];

  return (
    <ComponentPageLayout
      section="WCP Patterns"
      title="Page Templates"
      description="Standard page shell compositions used across Walmart web experiences. Each template defines how the top nav, content area, side nav, and footer are arranged for different page types."
    >

      {/* ── Template Selector ── */}
      <div className={styles.selectorSection}>
        <div className={styles.selectorHeader}>
          <h2 className={styles.selectorTitle}>Template preview</h2>
          <ButtonGroup>
            {(Object.entries(TEMPLATES) as [Template, typeof TEMPLATES[Template]][]).map(([key, val]) => (
              <Button
                key={key}
                variant={active === key ? 'primary' : 'secondary'}
                size="small"
                onClick={() => setActive(key)}
              >
                {val.label}
              </Button>
            ))}
          </ButtonGroup>
        </div>

        <div className={styles.metaRow}>
          <span className={styles.metaLabel}>{meta.label}</span>
          <Tag variant={meta.tagVariant}>{meta.tag}</Tag>
          <p className={styles.metaDesc}>{meta.description}</p>
        </div>

        {/* Visual wireframe */}
        <div className={styles.frame}>
          {active === 'full-page' && (
            <div className={styles.wireframe}>
              <div className={styles.wfHeader}>Top Nav (DesktopHeader / MobileHeader)</div>
              <div className={styles.wfMain}>
                <div className={styles.wfContent}>Main page content</div>
              </div>
              <div className={styles.wfFooter}>Footer (DesktopFooter / MwebFooter)</div>
            </div>
          )}
          {active === 'account' && (
            <div className={styles.wireframe}>
              <div className={styles.wfHeader}>Top Nav (DesktopHeader / MobileHeader)</div>
              <div className={styles.wfTwoCol}>
                <div className={styles.wfSideNav}>Account Side Nav</div>
                <div className={styles.wfContent}>Account page content</div>
              </div>
              <div className={styles.wfFooter}>Footer (DesktopFooter / MwebFooter)</div>
            </div>
          )}
          {active === 'search' && (
            <div className={styles.wireframe}>
              <div className={styles.wfHeader}>Top Nav (DesktopHeader / MobileHeader)</div>
              <div className={styles.wfTwoCol}>
                <div className={styles.wfFilterRail}>Filter Rail</div>
                <div className={styles.wfContent}>Search results grid</div>
              </div>
              <div className={styles.wfFooter}>Footer (DesktopFooter / MwebFooter)</div>
            </div>
          )}
        </div>
      </div>

      {/* ── Page composition table ── */}
      <div className={styles.compositionSection}>
        <h2 className={styles.compositionTitle}>Page composition zones</h2>
        <div className={styles.compositionTable}>
          <div className={styles.compositionRowHeader}>
            <span>Zone</span>
            <span>Desktop</span>
            <span>Mobile</span>
            <span>Notes</span>
          </div>
          {COMPOSITION_ROWS.map((row) => (
            <div key={row.zone} className={styles.compositionRow}>
              <span className={styles.compositionZone}>{row.zone}</span>
              <code className={styles.compositionCode}>{row.desktop}</code>
              <code className={styles.compositionCode}>{row.mobile}</code>
              <span className={styles.compositionNote}>{row.note}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Note box ── */}
      <div className={styles.noteBox}>
        <strong>Responsive shell:</strong> The <code>ResponsiveLayout</code> component in <code>@/components/walmart/</code> wires together the correct header, footer, and bottom nav based on the current viewport and the project-level mobile footer preference set in the Footer & Bottom Nav pattern page.
      </div>
    </ComponentPageLayout>
  );
}
