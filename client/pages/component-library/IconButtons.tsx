import React from 'react';
import { useTranslation } from 'react-i18next';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
const IconButtonExample = React.lazy(() => import('@/components/examples/IconButtonExample'));

export default function IconButtonsPage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout section={t('componentLibrary.components')} title={t('componentLibrary.navIconButtons')} description={t('componentLibrary.descIconButtons')}>

      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
          <IconButtonExample />
        </React.Suspense>
      </div>
    </ComponentPageLayout>
  );
}
