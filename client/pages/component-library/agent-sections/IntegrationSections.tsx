import React from 'react';
import { SectionCard, StepCard, NumberedList } from './shared';

export function ExistingProjectSection() {
  return (
    <SectionCard title="Existing Project Integration">
      <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', marginBottom: '16px' }}>
        When the kit is added to a project that already has UI components, icons, or styles,
        the agent must audit the existing codebase and create a migration plan. This is not optional.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <StepCard
          borderColor="var(--ld-semantic-color-border-brand)"
          title="Step 1: Component Audit — Find & Replace"
          description="Scan the entire project for UI components that have an equivalent in the Component Library. Replace them directly — do not keep both versions."
          itemColor="var(--ld-semantic-color-text-brand-bold)"
          items={[
            'Search for custom buttons, inputs, selects, modals, tags, cards, and alerts',
            'Check for third-party UI libraries (MUI, Chakra, Ant Design, etc.) that overlap with LD 3.5 components',
            'Map each existing component to its LD 3.5 equivalent (e.g., custom <PrimaryButton> → <Button variant="primary">)',
            'Replace all usages across the project — update imports, props, and any wrapper logic',
            'Delete the old component files after all references are updated',
            'Run the dev server to verify nothing is broken after each replacement',
          ]}
        />
        <StepCard
          borderColor="var(--ld-semantic-color-border-warning)"
          title="Step 2: Token & Style Migration Plan"
          description="For components unique to the project (no LD 3.5 equivalent), create a migration plan to update them to use the library's tokens, text styles, icons, and theming."
          itemColor="var(--ld-semantic-color-text-warning)"
          items={[
            "Identify all components that don't have a direct LD 3.5 match",
            'Replace hard-coded colors with var(--ld-semantic-color-*) tokens',
            'Replace hard-coded font families, sizes, and weights with var(--ld-semantic-font-*) tokens',
            'Replace hard-coded spacing and border-radius with LD spacing and border-radius tokens',
            'Replace hard-coded elevation/shadows with var(--ld-semantic-elevation-*) tokens',
            "Ensure all components respond to theme switching (Walmart, Sam's Club, dark mode)",
            'Add CSS modules (.module.css) if the component uses global CSS or inline styles',
            'Install any missing dependencies that the token system or theme switching requires',
          ]}
        />
        <StepCard
          borderColor="var(--ld-semantic-color-border-accent-purple)"
          title="Step 3: Icon Deduplication Plan"
          description="Duplicate icons waste bundle size and cause visual inconsistency. The agent must merge all icons into the project's icon library."
          itemColor="var(--ld-semantic-color-text-accent-purple)"
          items={[
            'Scan for inline SVGs, imported SVG files, and third-party icon libraries (react-icons, heroicons, lucide, etc.)',
            'For each icon found, check if an equivalent exists in client/components/icons/',
            'If a match exists: replace the usage with the library icon import and delete the duplicate',
            "If no match: move the SVG into client/components/icons-custom/ following the project's icon format",
            'Remove any third-party icon library dependencies from package.json after migration',
            'Update the icon index file so all new custom icons are importable',
            'Verify icon sizes and colors render correctly via semantic tokens',
          ]}
        />
        <div style={{ padding: '20px', backgroundColor: 'var(--ld-semantic-color-fill-info-subtle)', borderRadius: '8px', borderLeft: '4px solid var(--ld-semantic-color-border-info)' }}>
          <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '8px', color: 'var(--ld-semantic-color-text)' }}>Migration Plan Output</div>
          <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', margin: '0 0 12px' }}>
            After the audit, the agent must produce a migration plan that includes:
          </p>
          <NumberedList color="var(--ld-semantic-color-text-info)" items={[
            'A list of all components to replace with their LD 3.5 equivalents',
            'A list of unique components that need token migration (with specific tokens to apply)',
            'A list of duplicate icons with their replacement mappings',
            'Any dependencies to install or remove',
            'An execution order that avoids breaking the app (replace one component at a time, verify, continue)',
          ]} />
        </div>
      </div>
    </SectionCard>
  );
}

export function PackageVersionSection() {
  return (
    <SectionCard title="Package Version Upgrade">
      <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', marginBottom: '16px' }}>
        When a project already has an older version of the kit, the agent must not overwrite blindly.
        It must review what exists, compare against the latest version, and produce a merge plan.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <StepCard
          borderColor="var(--ld-semantic-color-border-brand)"
          title="Phase 1: Inventory What Exists"
          description="Before touching any files, catalog the current state of the installed package."
          itemColor="var(--ld-semantic-color-text-brand-bold)"
          items={[
            'List all components in client/components/ui/ and record which ones exist',
            'List all icons in client/components/icons/ and client/components/icons-custom/',
            'Record the current token files: semantic.css, primitive.css, and any theme overrides',
            'Check for local modifications — components or tokens the team has customized',
            'Note any components the project added that are not part of the kit',
            'Record the current guidelines/ and rules/ files and their contents',
          ]}
        />
        <StepCard
          borderColor="var(--ld-semantic-color-border-warning)"
          title="Phase 2: Compare Against Latest Version"
          description="Diff the existing package files against the latest version to identify what changed."
          itemColor="var(--ld-semantic-color-text-warning)"
          items={[
            'Identify new components added in the latest version that the project does not have',
            'Identify components that were updated — new props, variants, bug fixes, or accessibility improvements',
            'Identify new or updated design tokens (new colors, spacing values, elevation levels)',
            'Identify new or updated icons in the icon library',
            'Identify changes to theme files that affect theming behavior',
            'Flag any breaking changes — renamed props, removed components, changed token names',
          ]}
        />
        <StepCard
          borderColor="var(--ld-semantic-color-border-negative)"
          title="Phase 3: Handle Local Modifications & Conflicts"
          description="If the team has customized any kit files, those changes must be preserved or reconciled."
          itemColor="var(--ld-semantic-color-text-negative)"
          items={[
            'If a component was locally modified AND updated in the new version — flag it as a conflict',
            'For conflicts: apply the new version first, then re-apply the local customizations on top',
            'If local customizations conflict with new behavior, document both and ask for a decision',
            'Never silently overwrite a file that has local changes — always flag and resolve explicitly',
            'Project-specific components (not part of the kit) should not be touched during the upgrade',
          ]}
        />
        <StepCard
          borderColor="var(--ld-semantic-color-border-positive)"
          title="Phase 4: Execute the Merge"
          description="Apply updates in a safe order, verifying after each step."
          itemColor="var(--ld-semantic-color-text-positive)"
          items={[
            'Update token files first (semantic.css, primitive.css) — these have no dependencies',
            'Update theme files next — verify theme switching still works',
            'Update existing components one at a time — verify the dev server after each',
            'Add new components that did not exist before — register routes and update overview',
            'Update the icon library — add new icons, keep custom icons untouched',
            'Update guidelines/ and rules/ files to match the latest documentation',
            'Run a full build to catch any TypeScript or import errors',
          ]}
        />
        <div style={{ padding: '20px', backgroundColor: 'var(--ld-semantic-color-fill-info-subtle)', borderRadius: '8px', borderLeft: '4px solid var(--ld-semantic-color-border-info)' }}>
          <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '8px', color: 'var(--ld-semantic-color-text)' }}>Upgrade Plan Output</div>
          <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', margin: '0 0 12px' }}>
            Before executing, the agent must present the upgrade plan for review:
          </p>
          <NumberedList color="var(--ld-semantic-color-text-info)" items={[
            'Summary: number of components to update, add, or skip',
            'List of updated components with a brief description of what changed',
            'List of new components being added',
            'List of token changes (new tokens, renamed tokens, removed tokens)',
            'List of conflicts requiring manual decision',
            'Dependencies to install or update',
            'Execution order with verification checkpoints',
          ]} />
        </div>
      </div>
    </SectionCard>
  );
}

export function EnvironmentCompatibilitySection() {
  return (
    <SectionCard title="Environment Compatibility">
      <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', marginBottom: '16px' }}>
        When integrating the kit into a target project, the agent must check for and resolve
        these common compatibility issues.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <StepCard
          borderColor="var(--ld-semantic-color-border-negative)"
          title="CSS Framework Conflicts"
          description="If the target project uses Tailwind, Bootstrap, MUI, or another CSS framework, styles can clash with the kit's semantic tokens and component CSS modules."
          itemColor="var(--ld-semantic-color-text-negative)"
          items={[
            "Check for global CSS resets that override the kit's base styles (e.g., Tailwind's preflight)",
            "If Tailwind is present, add the kit's component folders to Tailwind's content config",
            "Ensure Tailwind's @layer base does not reset font-family, line-height, or color on elements the kit styles",
            'If Bootstrap is present, check for conflicting .btn, .card, .modal class names',
            'Test all kit components visually after integration — look for unexpected padding, margins, or font changes',
          ]}
        />
        <StepCard
          borderColor="var(--ld-semantic-color-border-brand)"
          title="Package Manager Adaptation"
          description="The kit ships with pnpm, but the target project may use npm or yarn. The agent must adapt."
          itemColor="var(--ld-semantic-color-text-brand-bold)"
          items={[
            'Detect the package manager: check for package-lock.json (npm), yarn.lock (yarn), or pnpm-lock.yaml (pnpm)',
            'If npm: run npm install instead of pnpm install, and remove pnpm-lock.yaml',
            'If yarn: run yarn install instead, and remove pnpm-lock.yaml',
            'Update any scripts in package.json that reference pnpm',
            'If no lockfile, ask the user which package manager they prefer',
          ]}
        />
        <StepCard
          borderColor="var(--ld-semantic-color-border-warning)"
          title="React Version Compatibility"
          description="The kit is built on React 18. Check the target project's React version and handle mismatches."
          itemColor="var(--ld-semantic-color-text-warning)"
          items={[
            'Check the target project\'s React version in package.json',
            'React 18: fully compatible — no changes needed',
            'React 19: test all components — some APIs may have deprecation warnings',
            'React 17 or earlier: upgrade the target project to React 18+ before integrating',
            'If using Next.js, Remix, or Gatsby, verify client-side components work with the framework\'s rendering model',
          ]}
        />
        <StepCard
          borderColor="var(--ld-semantic-color-border-info)"
          title="Version Tracking"
          description="The kit includes versioning files so teams know which version they have."
          itemColor="var(--ld-semantic-color-text-info)"
          items={[
            'The VERSION file in the project root contains the current kit version (e.g., 1.0.0)',
            'The CHANGELOG.md file documents what changed in each version',
            'When upgrading, compare the VERSION file against the new zip to determine what changed',
            'After a successful upgrade, update the VERSION file to match the new version',
            'Never delete the VERSION or CHANGELOG.md files during integration',
          ]}
        />
      </div>
    </SectionCard>
  );
}

export function CustomBrandThemeSection() {
  return (
    <SectionCard title="Custom Brand Theme Creation">
      <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', marginBottom: '16px' }}>
        The kit ships with Walmart and Sam&rsquo;s Club themes. To create a new brand theme,
        the agent must follow this process.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {[
          { step: 'Copy an existing theme file', detail: 'Duplicate client/styles/themes/walmart.css (or sams-club.css) and rename it to the new brand name.' },
          { step: 'Update token overrides', detail: 'Replace the color values with the new brand\'s colors. At minimum, update action-fill-primary, text-brand, border-brand, fill-brand-subtle, and surface colors.' },
          { step: 'Update typography if needed', detail: 'If the brand uses a different font, update --ld-semantic-font-family-sans and add the font files to public/fonts/.' },
          { step: 'Register the theme', detail: 'Add the new theme to the theme switcher so it can be selected at runtime.' },
          { step: 'Test all components', detail: 'Switch to the new theme and visually verify every component renders correctly. Check WCAG 2.1 AA contrast ratios.' },
          { step: 'Test dark mode (if applicable)', detail: 'If the brand needs dark mode, create a dark variant of the theme file with appropriate dark tokens.' },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: '16px', padding: '16px 20px', backgroundColor: 'var(--ld-semantic-color-fill-subtle)', borderRadius: '8px' }}>
            <div style={{
              minWidth: '32px', height: '32px',
              backgroundColor: 'var(--ld-semantic-color-fill-brand-subtle)',
              borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, fontSize: '14px', color: 'var(--ld-semantic-color-text-brand-bold)',
            }}>{i + 1}</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '4px', color: 'var(--ld-semantic-color-text)' }}>{item.step}</div>
              <div style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)' }}>{item.detail}</div>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

export function ContributingSection() {
  return (
    <SectionCard title="Contributing Components Back">
      <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', marginBottom: '16px' }}>
        If a team builds a reusable component that could benefit other projects using the kit,
        follow this process to contribute it back.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {[
          { step: "Confirm it's generic", detail: 'The component must not contain project-specific logic, data, or API calls. It should work in any project that uses the kit.' },
          { step: 'Follow the component creation checklist', detail: 'The component must have: a TSX file, a CSS module using only semantic tokens, an example file, a guideline doc, a Component Library page, and sandbox registration.' },
          { step: 'Use only kit dependencies', detail: 'The component must not introduce new npm dependencies. It should only use React, existing kit components, semantic tokens, and the icon library.' },
          { step: 'Include all states and variants', detail: 'Default, hover, focus, active, disabled, loading, error, and empty states must all be implemented.' },
          { step: 'Add i18n strings', detail: 'All user-facing text must use translation keys with entries in all 3 locales (en, es, fr).' },
          { step: 'Update the VERSION and CHANGELOG', detail: 'Bump the patch version in the VERSION file and add an entry to CHANGELOG.md describing the new component.' },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: '16px', padding: '16px 20px', backgroundColor: 'var(--ld-semantic-color-fill-subtle)', borderRadius: '8px' }}>
            <div style={{
              minWidth: '32px', height: '32px',
              backgroundColor: 'var(--ld-semantic-color-fill-brand-subtle)',
              borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, fontSize: '14px', color: 'var(--ld-semantic-color-text-brand-bold)',
            }}>{i + 1}</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '4px', color: 'var(--ld-semantic-color-text)' }}>{item.step}</div>
              <div style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)' }}>{item.detail}</div>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
