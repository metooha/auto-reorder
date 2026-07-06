import React, { Suspense } from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { Tabs, TabList, Tab, TabPanel } from '@/components/ui/Tab';
import { Spinner } from '@/components/ui/Spinner';

const ThemesContentWrapper = React.lazy(() => import('./Themes').then(m => ({ default: m.ThemesContentWrapper })));
const DesignTokensContent = React.lazy(() => import('./DesignTokens').then(m => ({ default: m.DesignTokensContent })));

const TabFallback = <div style={{ display: 'flex', justifyContent: 'center', padding: '48px' }}><Spinner size="large" /></div>;

export default function FoundationsPage() {
  return (
    <ComponentPageLayout
      section="Getting Started"
      title="Foundations"
      description="Theme switching, live token explorer, and the full project token reference — all in one place."
    >
      <Tabs defaultValue="themes">
        <TabList>
          <Tab value="themes">Themes &amp; Tokens</Tab>
          <Tab value="project-tokens">Project Token Usage</Tab>
        </TabList>

        <TabPanel value="themes">
          <Suspense fallback={TabFallback}><ThemesContentWrapper /></Suspense>
        </TabPanel>

        <TabPanel value="project-tokens">
          <Suspense fallback={TabFallback}><DesignTokensContent /></Suspense>
        </TabPanel>
      </Tabs>
    </ComponentPageLayout>
  );
}
