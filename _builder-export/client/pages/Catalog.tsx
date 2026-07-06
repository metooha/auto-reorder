import { useTranslation } from 'react-i18next';
import styles from '@styles/responsive.module.css';
import { MastHead } from '@/components/ui/MastHead';
import { AppSidebar } from '@/components/ui/AppSidebar';
import type { SidebarMenuItem } from '@/components/ui/AppSidebar';
import { CatalogHero } from '@/pages/CatalogHero';
import { CatalogTodoList } from '@/pages/CatalogTodoList';
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

function getSellerCenterMenuItems(t: (key: string) => string): SidebarMenuItem[] {
  return [
    { id: 'home', label: t('nav.home'), Icon: Home, route: '/' },
    {
      id: 'catalog',
      label: t('nav.catalog'),
      Icon: ListBox,
      route: '/catalog',
      submenuItems: [
        { id: 'catalog-sub1', label: t('nav.subPage'), route: '/catalog' },
        { id: 'catalog-sub2', label: t('nav.subPage') },
        { id: 'catalog-sub3', label: t('nav.subPage') },
      ],
    },
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

export default function Catalog() {
  const { t } = useTranslation();
  return (
    <div className={styles.root}>
      <MastHead />

      <div className={styles.appRow}>
        <AppSidebar menuItems={getSellerCenterMenuItems(t)} />

        <main className={styles.main}>
          {/* Branded background bar */}
          <div className={styles.catalogBrandBar} />

          {/* Centered page content */}
          <div className={styles.catalogPageInner}>
            {/* Page header — overlaps the branded bar */}
            <div className={styles.catalogHeader}>
              <h1 className={styles.pageTitle}>{t('nav.catalog')}</h1>
            </div>

            {/* Page content — fills available width */}
            <div className={styles.catalogContent}>
              <div className={styles.catalogCard}>
                <CatalogHero />
                <CatalogTodoList />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
