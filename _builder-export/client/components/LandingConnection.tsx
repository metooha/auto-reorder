import React from 'react';
import { useTranslation } from 'react-i18next';
import { MastHead } from '@/components/ui/MastHead';
import { AppSidebar } from '@/components/ui/AppSidebar';
import type { SidebarMenuItem } from '@/components/ui/AppSidebar';
import { Button } from '@/components/ui/Button';
import { LinkButton } from '@/components/ui/LinkButton';
import { Card } from '@/components/ui/Card';
import { Tag } from '@/components/ui/Tag';
import {
  Home,
  ListBox,
  Tag as TagIcon,
  Cart,
  BoxSpark,
  CreditCard,
  Speedometer,
  BarGraph,
  Rocket,
  TargetArrow,
  Services,
  Image as ImageIcon,
} from '@/components/icons';
import styles from '@styles/landingConnection.module.css';

function getSellerCenterMenuItems(t: (key: string) => string): SidebarMenuItem[] {
  return [
    { id: 'home', label: t('nav.home'), Icon: Home, route: '/' },
    { id: 'catalog', label: t('nav.catalog'), Icon: ListBox, route: '/catalog' },
    { id: 'pricing', label: t('nav.pricing'), Icon: TagIcon },
    { id: 'orders', label: t('nav.orders'), Icon: Cart },
    { id: 'wfs', label: t('nav.wfs'), Icon: BoxSpark },
    { id: 'payments', label: t('nav.payments'), Icon: CreditCard },
    { id: 'performance', label: t('nav.performance'), Icon: Speedometer },
    { id: 'analytics', label: t('nav.analytics'), Icon: BarGraph },
    { id: 'growth', label: t('nav.growth'), Icon: Rocket },
    { id: 'advertising', label: t('nav.advertising'), Icon: TargetArrow },
    { id: 'apps', label: t('nav.apps'), Icon: Services },
  ];
}

const sectionIds = ['1', '2', '3'];

export default function LandingConnection() {
  const { t } = useTranslation();
  return (
    <div className={styles.root}>
      <MastHead currentSolution="Landing Connection" />

      <div className={styles.appRow}>
        <AppSidebar menuItems={getSellerCenterMenuItems(t)} />

        <main className={styles.main}>
          <div className={styles.pageContent}>
            {/* Page header */}
            <div className={styles.pageHeader}>
              <h1 className={styles.pageTitle}>{t('templates.landingConnection')}</h1>
              <p className={styles.pageSubtitle}>{t('shared.supportingText')}</p>
            </div>

            {/* Sections */}
            {sectionIds.map((id) => (
              <LandingSection key={id} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

/* ─── Landing Section ─── */

function LandingSection() {
  const { t } = useTranslation();
  return (
    <section className={styles.section}>
      {/* Section header */}
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{t('shared.primarySection')}</h2>
        <LinkButton size="medium">{t('shared.linkButton')}</LinkButton>
      </div>

      {/* 3-column card grid */}
      <div className={styles.cardGrid}>
        <LandingCard />
        <LandingCard />
        <LandingCard />
      </div>
    </section>
  );
}

/* ─── Landing Card ─── */

function LandingCard() {
  const { t } = useTranslation();
  return (
    <div className={styles.card}>
      {/* Card image area */}
      <div className={styles.cardImageArea}>
        <ImagePlaceholder />
        <Tag variant="tertiary" color="gray" leading={<ImageIcon style={{ width: 16, height: 16 }} />} className={styles.cardLabelBadge}>{t('shared.label')}</Tag>
      </div>

      {/* Card body */}
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{t('shared.title')}</h3>
        <p className={styles.cardDescription}>
          {t('shared.cardDescription')}{' '}
          <a href="#" className={styles.cardLearnMore}>{t('shared.learnMore')}</a>
        </p>
      </div>

      {/* Card footer */}
      <div className={styles.cardFooter}>
        <div className={styles.cardDivider} />
        <div className={styles.cardActions}>
          <LinkButton size="medium">{t('shared.buttonLabel')}</LinkButton>
          <Button variant="secondary" size="small">{t('shared.buttonLabel')}</Button>
        </div>
      </div>
    </div>
  );
}

/* ─── Image Placeholder ─── */

function ImagePlaceholder() {
  return (
    <div className={styles.imagePlaceholder}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect x="2" y="2" width="28" height="28" rx="2" stroke="#BABBBE" strokeWidth="1.5" />
        <circle cx="11" cy="11" r="3" stroke="#BABBBE" strokeWidth="1.5" />
        <path
          d="M2 22l7-7 5 5 4-4 8 8"
          stroke="#BABBBE"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
