import React, { Suspense } from 'react';
import { Tabs, TabList, Tab, TabPanel } from '@/components/ui/Tab';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { Spinner } from '@/components/ui/Spinner';
import { useTranslation } from 'react-i18next';

const OverviewTab = React.lazy(() => import('./guidelines-tabs/OverviewTab').then(m => ({ default: m.OverviewTab })));
const PrinciplesTab = React.lazy(() => import('./guidelines-tabs/PrinciplesTab').then(m => ({ default: m.PrinciplesTab })));
const ComponentUsageTab = React.lazy(() => import('./guidelines-tabs/ComponentUsageTab').then(m => ({ default: m.ComponentUsageTab })));
const AccessibilityTab = React.lazy(() => import('./guidelines-tabs/AccessibilityTab').then(m => ({ default: m.AccessibilityTab })));
const CodeStandardsTab = React.lazy(() => import('./guidelines-tabs/CodeStandardsTab').then(m => ({ default: m.CodeStandardsTab })));
const TokenUsageTab = React.lazy(() => import('./guidelines-tabs/TokenUsageTab').then(m => ({ default: m.TokenUsageTab })));
const AgentRulesTab = React.lazy(() => import('./guidelines-tabs/AgentRulesTab').then(m => ({ default: m.AgentRulesTab })));
const GuidelinesDocIndex = React.lazy(() => import('./GuidelinesDocIndex').then(m => ({ default: m.GuidelinesDocIndex })));

const TabFallback = <div style={{ display: 'flex', justifyContent: 'center', padding: '48px' }}><Spinner size="large" /></div>;

export default function GuidelinesPage() {
  const { t } = useTranslation();
  return (
    <ComponentPageLayout section={t('componentLibrary.gettingStarted')} title={t('componentLibrary.guidelinesTitle')} description={t('componentLibrary.guidelinesDesc')}>

      <Tabs defaultValue="overview">
        <TabList>
          <Tab value="overview">{t('componentLibrary.tabOverview')}</Tab>
          <Tab value="docs">{t('componentLibrary.tabDocIndex')}</Tab>
          <Tab value="principles">{t('componentLibrary.tabDesignPrinciples')}</Tab>
          <Tab value="components">{t('componentLibrary.tabComponentUsage')}</Tab>
          <Tab value="accessibility">{t('componentLibrary.tabAccessibility')}</Tab>
          <Tab value="code">{t('componentLibrary.tabCodeStandards')}</Tab>
          <Tab value="tokens">{t('componentLibrary.tabTokenUsage')}</Tab>
          <Tab value="agent">{t('componentLibrary.tabAgentRules')}</Tab>
        </TabList>

        <TabPanel value="overview"><Suspense fallback={TabFallback}><OverviewTab /></Suspense></TabPanel>
        <TabPanel value="docs"><Suspense fallback={TabFallback}><GuidelinesDocIndex /></Suspense></TabPanel>
        <TabPanel value="principles"><Suspense fallback={TabFallback}><PrinciplesTab /></Suspense></TabPanel>
        <TabPanel value="components"><Suspense fallback={TabFallback}><ComponentUsageTab /></Suspense></TabPanel>
        <TabPanel value="accessibility"><Suspense fallback={TabFallback}><AccessibilityTab /></Suspense></TabPanel>
        <TabPanel value="code"><Suspense fallback={TabFallback}><CodeStandardsTab /></Suspense></TabPanel>
        <TabPanel value="tokens"><Suspense fallback={TabFallback}><TokenUsageTab /></Suspense></TabPanel>
        <TabPanel value="agent"><Suspense fallback={TabFallback}><AgentRulesTab /></Suspense></TabPanel>
      </Tabs>
    </ComponentPageLayout>
  );
}
