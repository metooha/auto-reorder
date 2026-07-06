import React from 'react';
import {
  FirstRunSetupSection,
  KeyFileLocationsSection,
  ImportConventionsSection,
  EnforcementRulesSection,
} from './agent-sections/SetupSections';
import {
  PreImplementationSection,
  ProhibitionsSection,
  TokenUsagePatternSection,
  NewComponentChecklistSection,
  FigmaWorkflowSection,
} from './agent-sections/ChecklistSections';
import {
  ExistingProjectSection,
  PackageVersionSection,
  EnvironmentCompatibilitySection,
  CustomBrandThemeSection,
  ContributingSection,
} from './agent-sections/IntegrationSections';

export function GettingStartedAgent() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingTop: '24px' }}>

      {/* Intro */}
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
          For AI Agents (Builder.io Fusion)
        </h3>
        <p style={{
          fontSize: '15px',
          lineHeight: 1.7,
          color: 'var(--ld-semantic-color-text-subtle)',
          margin: 0,
        }}>
          This guide covers how AI agents should interact with the Living Design 3.5 Portable Kit
          when generating or modifying code. Agents must follow these rules to produce output that
          is indistinguishable from hand-crafted, library-compliant code.
        </p>
      </div>

      <FirstRunSetupSection />
      <PreImplementationSection />
      <KeyFileLocationsSection />
      <ImportConventionsSection />
      <ProhibitionsSection />
      <TokenUsagePatternSection />
      <NewComponentChecklistSection />
      <FigmaWorkflowSection />
      <ExistingProjectSection />
      <PackageVersionSection />
      <EnvironmentCompatibilitySection />
      <CustomBrandThemeSection />
      <ContributingSection />
      <EnforcementRulesSection />
    </div>
  );
}
