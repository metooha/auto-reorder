import React from 'react';
import { SectionCard, CodeBlock, NumberedList } from './shared';

export function FirstRunSetupSection() {
  return (
    <SectionCard title="First-Run Setup: Template Pages">
      <div style={{
        padding: '20px',
        backgroundColor: 'var(--ld-semantic-color-fill-warning-subtle)',
        borderRadius: '8px',
        borderLeft: '4px solid var(--ld-semantic-color-border-warning)',
        marginBottom: '16px',
      }}>
        <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '8px', color: 'var(--ld-semantic-color-text)' }}>
          Required: Ask before installing
        </div>
        <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', margin: '0 0 16px' }}>
          When a user drags and drops the zip file of this template into a project, or sets up the package
          for the first time, the agent <strong>must immediately ask:</strong>
        </p>
        <div style={{
          padding: '16px 20px',
          backgroundColor: 'var(--ld-semantic-color-surface)',
          borderRadius: '8px',
          border: '2px solid var(--ld-semantic-color-border-brand)',
          marginBottom: '12px',
        }}>
          <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--ld-semantic-color-text)', marginBottom: '12px' }}>
            &ldquo;Are you using this for Partner Experiences?&rdquo;
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '14px', lineHeight: 1.6 }}>
              <span style={{ fontWeight: 700, color: 'var(--ld-semantic-color-text-positive)', flexShrink: 0 }}>Yes</span>
              <span style={{ color: 'var(--ld-semantic-color-text-subtle)' }}>
                Keep the template application pages. They serve as reference implementations
                for Partner Experiences workflows (Landing Summary, Catalog, Detail Item, etc.).
              </span>
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '14px', lineHeight: 1.6 }}>
              <span style={{ fontWeight: 700, color: 'var(--ld-semantic-color-text-negative)', flexShrink: 0 }}>No</span>
              <span style={{ color: 'var(--ld-semantic-color-text-subtle)' }}>
                Delete the template pages. Only keep the Component Library (components, tokens,
                icons, themes, and documentation).
              </span>
            </div>
          </div>
        </div>
        <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', margin: 0 }}>
          This question must be asked <strong>before</strong> any other setup steps. Do not skip it.
          Do not assume the answer. The agent must wait for the user&rsquo;s response before proceeding.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '8px', color: 'var(--ld-semantic-color-text)' }}>
            Template pages to remove (if user declines)
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {[
              { file: 'client/pages/Index.tsx', route: '/' },
              { file: 'client/pages/Catalog.tsx', route: '/catalog' },
              { file: 'client/pages/PageTemplate.tsx', route: '/page-template' },
              { file: 'client/pages/LandingConnection.tsx', route: '/landing-connection' },
              { file: 'client/pages/LandingSummary.tsx', route: '/landing-summary' },
              { file: 'client/pages/DetailItem.tsx', route: '/detail-item' },
              { file: 'client/pages/landing-summary/', route: '(supporting components)' },
            ].map((item) => (
              <div key={item.file} style={{
                display: 'grid',
                gridTemplateColumns: '340px 1fr',
                gap: '12px',
                padding: '8px 14px',
                backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
                borderRadius: '6px',
                fontSize: '13px',
                alignItems: 'center',
              }}>
                <code style={{ fontFamily: 'var(--ld-semantic-font-family-mono)', color: 'var(--ld-semantic-color-text)' }}>
                  {item.file}
                </code>
                <span style={{ color: 'var(--ld-semantic-color-text-subtle)' }}>{item.route}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '8px', color: 'var(--ld-semantic-color-text)' }}>
            After deleting template pages, the agent must also
          </div>
          <NumberedList
            color="var(--ld-semantic-color-text-brand-bold)"
            items={[
              'Remove the corresponding route entries from client/App.tsx',
              'Remove any lazy imports for the deleted pages in App.tsx',
              "Update the home route (/) to point to /component-library or the user's preferred landing page",
              'Delete the client/pages/landing-summary/ folder and all its supporting components',
              'Keep the NotFound page (client/pages/NotFound.tsx) — it is still needed for 404 handling',
              'Keep all Component Library pages under client/pages/component-library/ — these are part of the design system',
              'Verify the dev server still runs without errors after deletion',
            ]}
          />
        </div>
      </div>
    </SectionCard>
  );
}

export function KeyFileLocationsSection() {
  return (
    <SectionCard title="Key File Locations">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {[
          { path: 'client/components/ui/', desc: 'All LD 3.5 components (Button.tsx, TextField.tsx, Tag.tsx, etc.)' },
          { path: 'client/components/ui/*.module.css', desc: 'Component CSS modules using semantic tokens' },
          { path: 'client/components/icons/', desc: 'Icon library (303 icons, 20x20 viewBox, currentColor)' },
          { path: 'client/components/icons-custom/', desc: 'Custom project-specific icons' },
          { path: 'client/styles/semantic.css', desc: 'All semantic tokens (648 lines)' },
          { path: 'client/styles/primitive.css', desc: 'Primitive tokens (364 lines)' },
          { path: 'client/styles/themes/', desc: 'Brand theme overrides (walmart, sams-club, etc.)' },
          { path: 'client/locales/en/common.json', desc: 'English translation strings' },
          { path: 'client/locales/es/common.json', desc: 'Spanish translation strings' },
          { path: 'client/locales/fr/common.json', desc: 'French translation strings' },
          { path: 'guidelines/', desc: 'Design system rules and component documentation' },
          { path: 'guidelines/rules/', desc: 'Enforcement rules (tokens, icons, components, layout)' },
          { path: 'client/App.tsx', desc: 'Route registration for all pages' },
        ].map((item) => (
          <div key={item.path} style={{
            display: 'grid',
            gridTemplateColumns: '320px 1fr',
            gap: '16px',
            padding: '10px 16px',
            backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
            borderRadius: '6px',
            fontSize: '14px',
            alignItems: 'center',
          }}>
            <code style={{ fontFamily: 'var(--ld-semantic-font-family-mono)', fontSize: '13px', color: 'var(--ld-semantic-color-text)' }}>
              {item.path}
            </code>
            <span style={{ color: 'var(--ld-semantic-color-text-subtle)' }}>{item.desc}</span>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

export function ImportConventionsSection() {
  return (
    <SectionCard title="Import Conventions">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <div style={{ fontWeight: 700, marginBottom: '8px', fontSize: '14px', color: 'var(--ld-semantic-color-text)' }}>
            Living Design 3.5 Components (Uppercase filenames)
          </div>
          <CodeBlock>{`import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';
import { TextField } from '@/components/ui/TextField';
import { Tag } from '@/components/ui/tag';
import { PageHeader } from '@/components/ui/PageHeader';`}</CodeBlock>
        </div>
        <div>
          <div style={{ fontWeight: 700, marginBottom: '8px', fontSize: '14px', color: 'var(--ld-semantic-color-text)' }}>
            Shadcn/Radix Components (Lowercase filenames)
          </div>
          <CodeBlock>{`import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { Select, SelectTrigger, SelectContent } from '@/components/ui/select';`}</CodeBlock>
        </div>
        <div>
          <div style={{ fontWeight: 700, marginBottom: '8px', fontSize: '14px', color: 'var(--ld-semantic-color-text)' }}>
            Icons
          </div>
          <CodeBlock>{`import { Check, ChevronDown, Search } from '@/components/icons';
// Custom icons go in icons-custom/, never in icons/`}</CodeBlock>
        </div>
      </div>
    </SectionCard>
  );
}

export function EnforcementRulesSection() {
  return (
    <SectionCard title="Enforcement Rules Reference">
      <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', marginBottom: '16px' }}>
        Agents must read and follow these rule files. They are located in{' '}
        <code style={{ fontFamily: 'var(--ld-semantic-font-family-mono)', fontSize: '13px', backgroundColor: 'var(--ld-semantic-color-fill-subtle)', padding: '2px 6px', borderRadius: '4px' }}>
          guidelines/rules/
        </code>:
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {[
          { file: 'RULE_DesignSystemEnforcement.md', desc: 'Tokens, icons, and component usage' },
          { file: 'RULE_DesignTokenEnforcement.md', desc: 'Semantic tokens are mandatory' },
          { file: 'RULE_TokenUsageEnforcement.md', desc: 'No hardcoded values allowed' },
          { file: 'RULE_CreateNewComponent.md', desc: 'Full component creation process' },
          { file: 'RULE_ComponentPropertyTester.md', desc: 'All components must be in sandbox' },
          { file: 'RULE_IconUsage.md', desc: 'Icon library rules and deduplication' },
          { file: 'RULE_NoEmojisUseIcons.md', desc: 'No emojis or random images' },
          { file: 'RULE_ResponsiveLayout.md', desc: 'Page structure and breakpoints' },
          { file: 'RULE_GuidelinesPageSync.md', desc: 'Keep Guidelines page in sync with docs' },
          { file: 'RULE_DevServerHealthCheck.md', desc: 'Verify dev server after changes' },
        ].map((rule) => (
          <div key={rule.file} style={{
            display: 'grid',
            gridTemplateColumns: '320px 1fr',
            gap: '16px',
            padding: '10px 16px',
            backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
            borderRadius: '6px',
            fontSize: '14px',
            alignItems: 'center',
          }}>
            <code style={{ fontFamily: 'var(--ld-semantic-font-family-mono)', fontSize: '12px', color: 'var(--ld-semantic-color-text)' }}>
              {rule.file}
            </code>
            <span style={{ color: 'var(--ld-semantic-color-text-subtle)' }}>{rule.desc}</span>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
