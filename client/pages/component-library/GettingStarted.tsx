import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { Tabs, TabList, Tab, TabPanel } from '@/components/ui/Tab';
import { Spinner } from '@/components/ui/Spinner';

const GettingStartedDesigner = React.lazy(() => import('./GettingStartedDesigner').then(m => ({ default: m.GettingStartedDesigner })));
const GettingStartedAgent = React.lazy(() => import('./GettingStartedAgent').then(m => ({ default: m.GettingStartedAgent })));
const GettingStartedComponentDesigner = React.lazy(() => import('./GettingStartedComponentDesigner').then(m => ({ default: m.GettingStartedComponentDesigner })));
const GettingStartedProductManager = React.lazy(() => import('./GettingStartedProductManager').then(m => ({ default: m.GettingStartedProductManager })));

const TabFallback = <div style={{ display: 'flex', justifyContent: 'center', padding: '48px' }}><Spinner size="large" /></div>;

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{
      backgroundColor: 'var(--ld-semantic-color-surface)',
      padding: '32px',
      borderRadius: '8px',
      boxShadow: 'var(--ld-semantic-elevation-100)',
    }}>
      <h3 style={{
        fontSize: '20px',
        fontWeight: 700,
        color: 'var(--ld-semantic-color-text)',
        marginBottom: '20px',
      }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

function DepTable({ rows }: { rows: { pkg: string; purpose: string }[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {rows.map((row) => (
        <div key={row.pkg} style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          padding: '12px 16px',
          backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
          borderRadius: '6px',
          fontSize: '14px',
          alignItems: 'center',
        }}>
          <code style={{
            fontFamily: 'var(--ld-semantic-font-family-mono)',
            fontSize: '13px',
            color: 'var(--ld-semantic-color-text)',
          }}>
            {row.pkg}
          </code>
          <span style={{ color: 'var(--ld-semantic-color-text-subtle)' }}>{row.purpose}</span>
        </div>
      ))}
    </div>
  );
}

const coreDeps = [
  { pkg: 'react, react-dom', purpose: 'UI framework' },
  { pkg: 'react-router-dom', purpose: 'Client routing' },
  { pkg: 'typescript', purpose: 'Type safety' },
  { pkg: 'vite, @vitejs/plugin-react-swc', purpose: 'Build tooling' },
];

const designDeps = [
  { pkg: 'Standalone UI primitives (no external deps)', purpose: 'Accessible headless UI components built in-house' },
  { pkg: 'class-variance-authority', purpose: 'Component variant management' },
  { pkg: 'clsx, tailwind-merge', purpose: 'Class name utilities' },
  { pkg: 'tailwindcss, postcss, autoprefixer', purpose: 'Styling framework' },
];

const featureDeps = [
  { pkg: 'i18next, react-i18next', purpose: 'Internationalization (en, es, fr)' },
  { pkg: 'recharts', purpose: 'Charts and graphs' },
  { pkg: 'lottie-react', purpose: 'Lottie animations' },
  { pkg: 'react-day-picker, date-fns', purpose: 'Calendar and date formatting' },
  { pkg: 'react-hook-form', purpose: 'Form management' },
  { pkg: 'embla-carousel-react', purpose: 'Carousel' },
  { pkg: 'vaul', purpose: 'Drawer and bottom sheet' },
  { pkg: 'express, cors', purpose: 'API server' },
];

const projectStructure = [
  { path: 'client/App.tsx', desc: 'Entry point with routing' },
  { path: 'client/components/ui/', desc: 'Living Design 3.5 components' },
  { path: 'client/pages/', desc: 'Application pages and routes' },
  { path: 'client/styles/themes/', desc: 'Theme token CSS files' },
  { path: 'client/contexts/', desc: 'React contexts (Theme, Marty)' },
  { path: 'client/locales/', desc: 'i18n translation files (en, es, fr)' },
  { path: 'client/components/icons/', desc: 'Icon library' },
  { path: 'guidelines/', desc: 'Design system rules and docs' },
  { path: 'server/', desc: 'Express API server' },
  { path: 'public/fonts/', desc: 'Brand fonts (Everyday Sans)' },
];

const setupSteps = [
  {
    title: 'Install dependencies',
    code: 'pnpm install',
    detail: 'Installs all packages including React, Radix UI primitives, Tailwind, and the Express server.',
  },
  {
    title: 'Start the dev server',
    code: 'pnpm dev',
    detail: 'Launches Vite with the Express API server as middleware. The app is available on the local dev port with hot module replacement.',
  },
  {
    title: 'Explore the component library',
    code: null,
    detail: 'Navigate to /component-library to browse all available Living Design 3.5 components, view live examples, and test properties in the Component Sandbox.',
  },
  {
    title: 'Build for production',
    code: 'pnpm build',
    detail: 'Produces a client SPA bundle (dist/spa/) and a server bundle (dist/server/). The client build is optimized with code splitting.',
  },
  {
    title: 'Start the production server',
    code: 'pnpm start',
    detail: 'Runs the built Express server which serves the SPA and handles API routes.',
  },
];

export default function GettingStartedPage() {
  const { t } = useTranslation();

  return (
    <ComponentPageLayout
      section={t('componentLibrary.gettingStarted')}
      title={t('componentLibrary.gettingStartedTitle')}
      description={t('componentLibrary.gettingStartedDesc')}
    >

      <Tabs defaultValue="designer">
        <TabList>
          <Tab value="designer">{t('componentLibrary.tabDesigner')}</Tab>
          <Tab value="product-manager">{t('componentLibrary.tabProductManager')}</Tab>
          <Tab value="developer">{t('componentLibrary.tabDeveloper')}</Tab>
          <Tab value="agent">{t('componentLibrary.tabAgent')}</Tab>
          <Tab value="component-designer">{t('componentLibrary.tabComponentDesigner')}</Tab>
        </TabList>

        {/* Designer Tab */}
        <TabPanel value="designer">
          <Suspense fallback={TabFallback}><GettingStartedDesigner /></Suspense>
        </TabPanel>

        {/* Developer Tab */}
        <TabPanel value="developer">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingTop: '24px' }}>

            {/* Intro Callout */}
            <div style={{
              backgroundColor: 'var(--ld-semantic-color-fill-brand-subtle)',
              padding: '24px 32px',
              borderRadius: '8px',
              borderLeft: '5px solid var(--ld-semantic-color-border-brand)',
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 700,
                color: 'var(--ld-semantic-color-text)',
                marginBottom: '8px',
              }}>
                For Developers
              </h3>
              <p style={{
                fontSize: '15px',
                lineHeight: 1.7,
                color: 'var(--ld-semantic-color-text-subtle)',
                margin: 0,
              }}>
                Technical setup instructions, project structure, dependencies, and everything
                you need to start building with the Living Design 3.5 Portable Kit.
              </p>
            </div>

            {/* Prerequisites */}
            <SectionCard title="Prerequisites">
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                {[
                  { name: 'Node.js', version: '18+', desc: 'JavaScript runtime' },
                  { name: 'pnpm', version: 'See packageManager in package.json', desc: 'Package manager' },
                ].map((p) => (
                  <div key={p.name} style={{
                    flex: '1 1 240px',
                    padding: '16px',
                    backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                    borderRadius: '6px',
                  }}>
                    <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '4px', color: 'var(--ld-semantic-color-text)' }}>
                      {p.name}
                    </div>
                    <div style={{
                      fontFamily: 'var(--ld-semantic-font-family-mono)',
                      fontSize: '13px',
                      color: 'var(--ld-semantic-color-text-brand-bold)',
                      marginBottom: '4px',
                    }}>
                      {p.version}
                    </div>
                    <div style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text-subtle)' }}>{p.desc}</div>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Setup Steps */}
            <SectionCard title="Setup Steps">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {setupSteps.map((step, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    gap: '16px',
                    padding: '20px',
                    backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                    borderRadius: '8px',
                  }}>
                    <div style={{
                      minWidth: '36px',
                      height: '36px',
                      backgroundColor: 'var(--ld-semantic-color-fill-brand-subtle)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '16px',
                      color: 'var(--ld-semantic-color-text-brand-bold)',
                    }}>
                      {i + 1}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '6px', color: 'var(--ld-semantic-color-text)' }}>
                        {step.title}
                      </div>
                      {step.code && (
                        <div style={{
                          fontFamily: 'var(--ld-semantic-font-family-mono)',
                          fontSize: '13px',
                          backgroundColor: 'var(--ld-semantic-color-surface)',
                          padding: '8px 14px',
                          borderRadius: '4px',
                          marginBottom: '8px',
                          color: 'var(--ld-semantic-color-text)',
                          border: '1px solid var(--ld-semantic-color-border-moderate)',
                          display: 'inline-block',
                        }}>
                          $ {step.code}
                        </div>
                      )}
                      <div style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)' }}>
                        {step.detail}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Project Structure */}
            <SectionCard title="Project Structure">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {projectStructure.map((item) => (
                  <div key={item.path} style={{
                    display: 'grid',
                    gridTemplateColumns: '260px 1fr',
                    gap: '16px',
                    padding: '10px 16px',
                    backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                    borderRadius: '6px',
                    fontSize: '14px',
                    alignItems: 'center',
                  }}>
                    <code style={{
                      fontFamily: 'var(--ld-semantic-font-family-mono)',
                      fontSize: '13px',
                      color: 'var(--ld-semantic-color-text)',
                    }}>
                      {item.path}
                    </code>
                    <span style={{ color: 'var(--ld-semantic-color-text-subtle)' }}>{item.desc}</span>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Dependencies */}
            <SectionCard title="Core Dependencies">
              <DepTable rows={coreDeps} />
            </SectionCard>
            <SectionCard title="Design System Primitives">
              <DepTable rows={designDeps} />
            </SectionCard>
            <SectionCard title="Feature Libraries">
              <DepTable rows={featureDeps} />
            </SectionCard>

            {/* Using in Existing Project */}
            <SectionCard title="Using in an Existing Project">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { title: 'Use existing components', detail: 'Check client/components/ui/ before creating anything new. Import with: import { Button } from \'@/components/ui/Button\'' },
                  { title: 'Add new pages', detail: 'Create route files in client/pages/ and register them in client/App.tsx under <Routes>.' },
                  { title: 'Add translations', detail: 'Add strings to client/locales/en/common.json, es/common.json, and fr/common.json.' },
                  { title: 'Add API routes', detail: 'Create handlers in server/routes/ and register them in server/index.ts.' },
                  { title: 'Follow the design system', detail: 'Always use semantic tokens (var(--ld-semantic-color-*)) for colors, spacing, and typography. Never hard-code hex values.' },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    gap: '12px',
                    padding: '16px 20px',
                    backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                    borderRadius: '6px',
                    alignItems: 'flex-start',
                  }}>
                    <div style={{
                      minWidth: '24px',
                      height: '24px',
                      backgroundColor: 'var(--ld-semantic-color-fill-brand-subtle)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '12px',
                      color: 'var(--ld-semantic-color-text-brand-bold)',
                      flexShrink: 0,
                      marginTop: '2px',
                    }}>
                      {i + 1}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '4px', color: 'var(--ld-semantic-color-text)' }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)' }}>
                        {item.detail}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Standalone Setup */}
            <SectionCard title="Standalone Setup (Outside Builder.io)">
              <p style={{
                fontSize: '14px',
                lineHeight: 1.6,
                color: 'var(--ld-semantic-color-text-subtle)',
                marginBottom: '16px',
              }}>
                This kit is a standard React + Vite project that works anywhere. Here's how to use it
                outside of Builder.io and Fusion:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  {
                    title: 'Download the project',
                    detail: 'Use the Download button in Builder.io, or clone the git repo. You\'ll get the full project with all components, tokens, icons, and translations.',
                  },
                  {
                    title: 'Open in your editor',
                    detail: 'Works with any editor: Cursor, VS Code, WebStorm, Zed, etc. Open the root folder as a project.',
                  },
                  {
                    title: 'Install & run',
                    code: 'pnpm install && pnpm dev',
                    detail: 'Standard Node.js setup. The dev server starts with hot module replacement on localhost.',
                  },
                  {
                    title: 'Configure AI context (Cursor / Copilot / Windsurf)',
                    detail: 'Copy the contents of design-system-docs/AGENTS.md and guidelines/rules/ into your AI editor\'s context file (.cursorrules, .github/copilot-instructions.md, etc.). This teaches the AI to use LD 3.5 components and tokens correctly instead of generating raw HTML.',
                  },
                  {
                    title: 'Figma Make integration',
                    detail: 'When using Figma Make to generate code, point it at this project as the target. Map Figma component names (e.g., "[LD 3.5] Button") to the kit components (client/components/ui/Button.tsx). Post-process the output to replace hard-coded colors with semantic tokens.',
                  },
                  {
                    title: 'No Builder.io dependency',
                    detail: 'The kit has zero runtime dependencies on Builder.io. All components, themes, icons, and i18n work standalone. The only Builder.io-specific feature is the Fusion AI agent integration, which is optional.',
                  },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    gap: '16px',
                    padding: '20px',
                    backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                    borderRadius: '8px',
                  }}>
                    <div style={{
                      minWidth: '36px',
                      height: '36px',
                      backgroundColor: 'var(--ld-semantic-color-fill-brand-subtle)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '16px',
                      color: 'var(--ld-semantic-color-text-brand-bold)',
                    }}>
                      {i + 1}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '6px', color: 'var(--ld-semantic-color-text)' }}>
                        {item.title}
                      </div>
                      {'code' in item && item.code && (
                        <div style={{
                          fontFamily: 'var(--ld-semantic-font-family-mono)',
                          fontSize: '13px',
                          backgroundColor: 'var(--ld-semantic-color-surface)',
                          padding: '8px 14px',
                          borderRadius: '4px',
                          marginBottom: '8px',
                          color: 'var(--ld-semantic-color-text)',
                          border: '1px solid var(--ld-semantic-color-border-moderate)',
                          display: 'inline-block',
                        }}>
                          $ {item.code}
                        </div>
                      )}
                      <div style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)' }}>
                        {item.detail}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Deployment */}
            <SectionCard title="Deployment">
              <p style={{
                fontSize: '14px',
                lineHeight: 1.6,
                color: 'var(--ld-semantic-color-text-subtle)',
                marginBottom: '16px',
              }}>
                Pre-configured for Netlify deployment via <code style={{
                  fontFamily: 'var(--ld-semantic-font-family-mono)',
                  fontSize: '13px',
                  backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                  padding: '2px 6px',
                  borderRadius: '4px',
                }}>netlify.toml</code>:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { label: 'Build command', value: 'npm run build:client' },
                  { label: 'Publish directory', value: 'dist/spa' },
                  { label: 'API routes', value: 'Redirected to Netlify Functions via /api/*' },
                ].map((item) => (
                  <div key={item.label} style={{
                    display: 'grid',
                    gridTemplateColumns: '180px 1fr',
                    gap: '16px',
                    padding: '10px 16px',
                    backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                    borderRadius: '6px',
                    fontSize: '14px',
                    alignItems: 'center',
                  }}>
                    <strong style={{ color: 'var(--ld-semantic-color-text)' }}>{item.label}</strong>
                    <code style={{
                      fontFamily: 'var(--ld-semantic-font-family-mono)',
                      fontSize: '13px',
                      color: 'var(--ld-semantic-color-text-subtle)',
                    }}>
                      {item.value}
                    </code>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>
        </TabPanel>

        {/* Product Manager Tab */}
        <TabPanel value="product-manager">
          <Suspense fallback={TabFallback}><GettingStartedProductManager /></Suspense>
        </TabPanel>

        {/* Agent Tab */}
        <TabPanel value="agent">
          <Suspense fallback={TabFallback}><GettingStartedAgent /></Suspense>
        </TabPanel>

        {/* Component Designer Tab */}
        <TabPanel value="component-designer">
          <Suspense fallback={TabFallback}><GettingStartedComponentDesigner /></Suspense>
        </TabPanel>
      </Tabs>
    </ComponentPageLayout>
  );
}
