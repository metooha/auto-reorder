import React from 'react';
import { MagicBoxExample } from '@/components/examples/MagicBoxExample';
import { StepAnimationExample } from '@/components/examples/StepAnimationExample';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { useTranslation } from 'react-i18next';

export default function MagicBoxPage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout section={t('componentLibrary.components')} title={t('componentLibrary.navMagicBox')} description={t('componentLibrary.descMagicBox')}>

      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
          <MagicBoxExample />
        </React.Suspense>
      </div>

      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)',
        marginTop: '32px'
      }}>
        <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
          <StepAnimationExample />
        </React.Suspense>
      </div>
    </ComponentPageLayout>
  );
}
