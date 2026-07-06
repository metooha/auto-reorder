import React from 'react';
import NavigationMenuExample from '@/components/examples/NavigationMenuExample';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { useTranslation } from 'react-i18next';

export default function NavigationMenuPage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout section={t('componentLibrary.sharedSection')} title={t('componentLibrary.navNavigationMenu')} description={t('componentLibrary.descNavigationMenu')}>
      <div style={{ backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)', padding: '32px', borderRadius: '8px', boxShadow: 'var(--ld-semantic-elevation-100)' }}>
        <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
          <NavigationMenuExample />
        </React.Suspense>
      </div>
    </ComponentPageLayout>
  );
}
