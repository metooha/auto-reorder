import React from 'react';
import DropdownMenuExample from '@/components/examples/DropdownMenuExample';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { useTranslation } from 'react-i18next';

export default function DropdownMenuPage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout section={t('componentLibrary.sharedSection')} title={t('componentLibrary.navDropdownMenu')} description={t('componentLibrary.descDropdownMenu')}>
      <div style={{ backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)', padding: '32px', borderRadius: '8px', boxShadow: 'var(--ld-semantic-elevation-100)' }}>
        <React.Suspense fallback={<div>{t('componentLibrary.loading')}</div>}>
          <DropdownMenuExample />
        </React.Suspense>
      </div>
    </ComponentPageLayout>
  );
}
