import React from 'react';
import { BreadcrumbExample } from '@/components/examples/BreadcrumbExample';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { useTranslation } from 'react-i18next';

export default function BreadcrumbsPage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout section={t('componentLibrary.components')} title={t('componentLibrary.navBreadcrumbs')} description={t('componentLibrary.descBreadcrumbs')}>

      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
          <BreadcrumbExample />
        </React.Suspense>
      </div>
    </ComponentPageLayout>
  );
}
