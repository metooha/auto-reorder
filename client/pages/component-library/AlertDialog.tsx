import React from 'react';
import AlertDialogExample from '@/components/examples/AlertDialogExample';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { useTranslation } from 'react-i18next';

export default function AlertDialogPage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout section={t('componentLibrary.sharedSection')} title={t('componentLibrary.navAlertDialog')} description={t('componentLibrary.descAlertDialog')}>
      <div style={{ backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)', padding: '32px', borderRadius: '8px', boxShadow: 'var(--ld-semantic-elevation-100)' }}>
        <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
          <AlertDialogExample />
        </React.Suspense>
      </div>
    </ComponentPageLayout>
  );
}
