import React from 'react';
import { useTranslation } from 'react-i18next';
import { MastHead } from '@/components/ui/MastHead';
import { AppSidebar } from '@/components/ui/AppSidebar';
import type { SidebarMenuItem } from '@/components/ui/AppSidebar';
import { Button } from '@/components/ui/Button';
import { LinkButton } from '@/components/ui/LinkButton';
import { Card } from '@/components/ui/Card';
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
} from '@/components/icons';
import { PrimaryCard } from './PrimaryCard';
import { SecondaryListCard } from './SecondaryListCard';
import { SecondaryAccordionCard } from './SecondaryAccordionCard';
import styles from '@styles/landingSummary.module.css';

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

export default function LandingSummary() {
  const { t } = useTranslation();
  return (
    <div className={styles.root}>
      <MastHead currentSolution="Landing Summary" />

      <div className={styles.appRow}>
        <AppSidebar menuItems={getSellerCenterMenuItems(t)} />

        <main className={styles.main}>
          <div className={styles.pageInner}>
            {/* Page header */}
            <div className={styles.pageHeader}>
              <div className={styles.pageHeaderContainer}>
                <h1 className={styles.pageTitle}>{t('templates.landingSummary')}</h1>
                <div className={styles.titleActions}>
                  <LinkButton size="medium">{t('shared.buttonLabel')}</LinkButton>
                  <LinkButton size="medium">{t('shared.buttonLabel')}</LinkButton>
                  <Button variant="secondary" size="medium">{t('shared.buttonLabel')}</Button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className={styles.contentArea}>
              <div className={styles.contentContainer}>
                {/* Primary column */}
                <div className={styles.primaryColumn}>
                  <PrimaryCard />
                </div>

                {/* Secondary column */}
                <div className={styles.secondaryColumn}>
                  <SecondaryListCard />
                  <SecondaryAccordionCard />
                  <Card
                    UNSAFE_className={styles.placeholderCard}
                    aria-label={t('shared.placeholder')}
                  >
                    <span />
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
