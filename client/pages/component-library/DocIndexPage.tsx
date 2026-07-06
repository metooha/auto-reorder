import React from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { useTranslation } from 'react-i18next';
import { GuidelinesDocIndex } from './GuidelinesDocIndex';

export default function DocIndexPage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout
      section={t('componentLibrary.gettingStarted')}
      title={t('componentLibrary.navDocIndex')}
      description="Complete inventory of all components, patterns, icons, and guideline documents in the design system."
    >
      <GuidelinesDocIndex />
    </ComponentPageLayout>
  );
}
