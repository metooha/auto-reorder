import React from 'react';
import { QuantityStepperExample } from '@/components/examples/QuantityStepperExample';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { useTranslation } from 'react-i18next';

export default function QuantityStepperPage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout
      section={t('componentLibrary.components')}
      title={t('componentLibrary.navQuantityStepper')}
      description={t('componentLibrary.quantityStepperDesc')}
    >

      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
          <QuantityStepperExample />
        </React.Suspense>
      </div>
    </ComponentPageLayout>
  );
}
