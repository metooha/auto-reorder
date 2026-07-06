import React from 'react';

interface DocEntry {
  name: string;
  path: string;
  purpose: string;
}

interface DocSection {
  title: string;
  description: string;
  docs: DocEntry[];
}

const docSections: DocSection[] = [
  {
    title: 'Component Guidelines',
    description: 'Specifications for each Living Design 3.5 component including purpose, variants, tokens, and usage rules.',
    docs: [
      { name: 'AppSidebar', path: 'guidelines/components/AppSidebar.md', purpose: 'Shared sidebar navigation component' },
      { name: 'Badge', path: 'guidelines/components/Badge.md', purpose: 'Count indicators and status labels' },
      { name: 'Banner', path: 'guidelines/components/Banner.md', purpose: 'Page-level messages for broad user groups' },
      { name: 'Bottom Sheet', path: 'guidelines/components/Bottom-Sheet.md', purpose: 'Modal surface sliding up from viewport bottom' },
      { name: 'Breadcrumb', path: 'guidelines/components/Breadcrumb.md', purpose: 'Secondary navigation showing page hierarchy' },
      { name: 'Button', path: 'guidelines/components/Button.md', purpose: 'Action triggers with primary, secondary, tertiary, destructive variants' },
      { name: 'Callout', path: 'guidelines/components/Callout.md', purpose: 'Coaching/onboarding guidance anchored to UI elements' },
      { name: 'Card', path: 'guidelines/components/Card.md', purpose: 'Elevated surfaces for grouping content and actions' },
      { name: 'Checkbox', path: 'guidelines/components/Checkbox.md', purpose: 'Multi-select form controls with indeterminate state' },
      { name: 'Chip', path: 'guidelines/components/Chip.md', purpose: 'Selectable compact labels with 4px rounded corners' },
      { name: 'Content Message', path: 'guidelines/components/Content-Message.md', purpose: 'Critical states: empty, error, no permission, loading' },
      { name: 'DataTable', path: 'guidelines/components/DataTable.md', purpose: 'Data table component hierarchy and usage' },
      { name: 'DateField', path: 'guidelines/components/DateField.md', purpose: 'Text input for manual date entry (mm/dd/yyyy)' },
      { name: 'DatePicker', path: 'guidelines/components/DatePicker.md', purpose: 'Text input with calendar popup for date selection' },
      { name: 'DatePickerCalendar', path: 'guidelines/components/DatePickerCalendar.md', purpose: 'Calendar date selection component' },
      { name: 'DateRangePicker', path: 'guidelines/components/DateRangePicker.md', purpose: 'Start/end date range selection' },
      { name: 'Divider', path: 'guidelines/components/Divider.md', purpose: 'Visual separator using LD separator token' },
      { name: 'FilterChip', path: 'guidelines/components/FilterChip.md', purpose: 'Pill-shaped buttons for filtering interfaces' },
      { name: 'Form Group', path: 'guidelines/components/Form-Group.md', purpose: 'Groups related form controls under a single label' },
      { name: 'IconButton', path: 'guidelines/components/IconButton.md', purpose: 'Square icon-only buttons' },
      { name: 'Link', path: 'guidelines/components/Link.md', purpose: 'Navigational elements to pages or anchors' },
      { name: 'Link Button', path: 'guidelines/components/Link-Button.md', purpose: 'Button behavior with link-like underlined appearance' },
      { name: 'LinkButton', path: 'guidelines/components/LinkButton.md', purpose: 'Polymorphic link-styled interactive element' },
      { name: 'List', path: 'guidelines/components/List.md', purpose: 'Continuous vertical groups of related information' },
      { name: 'Magic Box', path: 'guidelines/components/Magic-Box.md', purpose: 'Highlights content updated by AI/agents' },
      { name: 'Menu', path: 'guidelines/components/Menu.md', purpose: 'Action list overlay for space-constrained contexts' },
      { name: 'Metric', path: 'guidelines/components/Metric.md', purpose: 'Emphasizes a single critical data point value' },
      { name: 'Modal', path: 'guidelines/components/Modal.md', purpose: 'Focused interactions requiring user attention' },
      { name: 'Nudge', path: 'guidelines/components/Nudge.md', purpose: 'Non-critical supportive information with optional actions' },
      { name: 'Panel', path: 'guidelines/components/Panel.md', purpose: 'Resizable side panels for additional content' },
      { name: 'Popover', path: 'guidelines/components/Popover.md', purpose: 'Overlay anchored to a trigger element' },
      { name: 'Progress Tracker', path: 'guidelines/components/ProgressTracker.md', purpose: 'Visual progress through a set of steps' },
      { name: 'QuantityStepper', path: 'guidelines/components/QuantityStepper.md', purpose: 'Numeric quantity increment/decrement control' },
      { name: 'Radio', path: 'guidelines/components/Radio.md', purpose: 'Mutually exclusive single-selection controls' },
      { name: 'Rating', path: 'guidelines/components/Rating.md', purpose: 'Star ratings with half-star support' },
      { name: 'Select', path: 'guidelines/components/Select.md', purpose: 'Choose one value from a dropdown list' },
      { name: 'Skeleton', path: 'guidelines/components/Skeleton.md', purpose: 'Loading placeholder shapes' },
      { name: 'Spinner', path: 'guidelines/components/Spinner.md', purpose: 'Loading indicators for ongoing processes' },
      { name: 'Switch', path: 'guidelines/components/Switch.md', purpose: 'On/off toggle controls' },
      { name: 'Tab', path: 'guidelines/components/Tab.md', purpose: 'Tab navigation for page-level content switching' },
      { name: 'Tag', path: 'guidelines/components/Tag.md', purpose: 'Labels for status, category, or attribute of an item' },
      { name: 'TextArea', path: 'guidelines/components/TextArea.md', purpose: 'Multi-line text input for free-form content' },
      { name: 'TextField', path: 'guidelines/components/TextField.md', purpose: 'Single-line input for names, emails, etc.' },
      { name: 'Item Tile', path: 'guidelines/components/ItemTile.md', purpose: 'Compact product tile for 2×2 category grids in carousels' },
    ],
  },
  {
    title: 'Design System Foundations',
    description: 'Core design system documentation covering tokens, colors, typography, and component architecture.',
    docs: [
      { name: 'Design Tokens', path: 'guidelines/design-system/DesignTokens.md', purpose: 'Complete design token reference with migration guide and best practices' },
      { name: 'Color System', path: 'guidelines/design-system/Color.md', purpose: 'Color token rules and semantic color usage' },
      { name: 'Typography', path: 'guidelines/design-system/typography.md', purpose: 'Font families, sizes, and weight tokens' },
      { name: 'CSS Variables Source', path: 'guidelines/design-system/css-variables-source.md', purpose: 'Source of truth for all CSS custom properties' },
      { name: 'Component Inventory', path: 'guidelines/design-system/Component-Inventory.md', purpose: 'Single source of truth for all LD components' },
      { name: 'Component Reference', path: 'guidelines/design-system/ComponentReference.md', purpose: 'Quick reference for building UI with LD components' },
      { name: 'Component Visibility', path: 'guidelines/design-system/component-visibility.md', purpose: 'Private vs public component guidelines' },
      { name: 'Component Library Integration', path: 'guidelines/design-system/ComponentLibraryIntegration.md', purpose: 'Checklist for integrating new components' },
      { name: 'FormGroup', path: 'guidelines/design-system/FormGroup.md', purpose: 'FormGroup semantic wrapper for form controls' },
      { name: 'Guidelines', path: 'guidelines/design-system/Guidelines.md', purpose: 'Living Design general and React development guidelines' },
      { name: 'LLM Integration', path: 'guidelines/design-system/LLMIntegration.md', purpose: 'Step-by-step instructions for AI to integrate LD 3.5' },
      { name: 'Terminology', path: 'guidelines/design-system/Terminology.md', purpose: 'Official translations for LD 3.5 terms (EN/ES/FR)' },
    ],
  },
  {
    title: 'Enforcement Rules',
    description: 'Mandatory rules that must be followed by all developers and AI agents when writing code.',
    docs: [
      { name: 'Rules Index', path: 'guidelines/rules/RULES_INDEX.md', purpose: 'Quick reference for all mandatory rules' },
      { name: 'Tag Components', path: 'guidelines/rules/RULE_TagComponents.md', purpose: 'Use Tag and OLQTag — never manual styled divs for status indicators' },
      { name: 'Design System Enforcement', path: 'guidelines/rules/RULE_DesignSystemEnforcement.md', purpose: 'Tokens, icons, and component enforcement (consolidated)' },
      { name: 'Create New Component', path: 'guidelines/rules/RULE_CreateNewComponent.md', purpose: 'Complete process for adding new LD components' },
      { name: 'Component Sandbox', path: 'guidelines/rules/RULE_ComponentPropertyTester.md', purpose: 'All components must be testable in sandbox' },
      { name: 'Standalone Components', path: 'guidelines/rules/RULE_StandaloneComponents.md', purpose: 'No external component library dependencies' },
      { name: 'Icon Usage', path: 'guidelines/rules/RULE_IconUsage.md', purpose: 'Search existing icons first, never create duplicates' },
      { name: 'No Emojis, Use Icons', path: 'guidelines/rules/RULE_NoEmojisUseIcons.md', purpose: 'Use icon library instead of emojis or random images' },
      { name: 'Responsive Layout', path: 'guidelines/rules/RULE_ResponsiveLayout.md', purpose: 'Page shell structure and responsive requirements' },
      { name: 'LinkButton & Spot Icon', path: 'guidelines/rules/RULE_LinkButtonAndSpotIcon.md', purpose: 'Enforce LinkButton component and Spot Icon patterns' },
      { name: 'Figma Asset Extraction', path: 'guidelines/rules/RULE_FigmaAssetExtraction.md', purpose: 'Only use explicitly exportable Figma assets' },
      { name: 'Dev Server Health Check', path: 'guidelines/rules/RULE_DevServerHealthCheck.md', purpose: 'Verify dev server after any code changes' },
      { name: 'Guidelines Page Sync', path: 'guidelines/rules/RULE_GuidelinesPageSync.md', purpose: 'Keep doc index in sync with guidelines folder' },
      { name: 'Internationalization', path: 'guidelines/rules/RULE_Internationalization.md', purpose: 'All user-facing strings must be translatable (en, es, fr)' },
      { name: 'Theme Switcher', path: 'guidelines/rules/RULE_ThemeSwitcher.md', purpose: 'Theme management architecture and requirements' },
      { name: 'Theme Addition', path: 'guidelines/rules/RULE_ThemeAddition.md', purpose: 'Process for adding new brand themes' },
      { name: 'Markdown Organization', path: 'guidelines/rules/RULE_MarkdownOrganization.md', purpose: 'Markdown file directory structure rules' },
      { name: 'Radix Migration Plan', path: 'guidelines/rules/PLAN_RadixMigration.md', purpose: 'Plan to remove Radix UI dependencies' },
      { name: 'WCP Component Creation', path: 'guidelines/rules/RULE_WCPComponentCreation.md', purpose: 'Workflow for creating Walmart Component Platform (WCP) product components' },
      { name: 'Carousel & Scroll Patterns', path: 'guidelines/rules/RULE_CarouselAndScrollPatterns.md', purpose: 'Scroll snap vs auto-advance carousel — when to use each and how to implement' },
      { name: 'Inline Style vs CSS Module', path: 'guidelines/rules/RULE_InlineStyleVsCSSModule.md', purpose: 'When inline styles are allowed vs when CSS modules are required' },
      { name: 'Animation and Motion', path: 'guidelines/rules/RULE_AnimationAndMotion.md', purpose: 'Animation types, standard durations, and prefers-reduced-motion requirements' },
      { name: 'Data-Driven Components', path: 'guidelines/rules/RULE_DataDrivenComponents.md', purpose: 'Static data array naming, TypeScript interfaces, and multi-line text patterns' },
      { name: 'Component Variant Naming', path: 'guidelines/rules/RULE_ComponentVariantNaming.md', purpose: 'Action-intent vs visual-theme vs status variant naming conventions' },
      { name: 'Walmart Page Composition', path: 'guidelines/rules/RULE_WalmartPageComposition.md', purpose: 'Page shell responsibilities, stacking order, and full-bleed layout rules' },
      { name: 'Theme Compliance', path: 'guidelines/rules/RULE_ThemeCompliance.md', purpose: 'Hard rule: every new component/page must pass theme compliance check before completion' },
      { name: 'Item Tile', path: 'guidelines/rules/RULE_ItemTile.md', purpose: 'Rules for creating item tile components and variants — badge types, price layout, heart position' },
    ],
  },
  {
    title: 'Implementation Skills',
    description: 'Step-by-step recipes for common tasks. The "how-to" companion to enforcement rules — copy-paste ready with complete code examples.',
    docs: [
      { name: 'Skills Index', path: 'guidelines/skills/SKILLS_INDEX.md', purpose: 'Overview of all available skills and when to use each' },
      { name: 'Build a WCP Component', path: 'guidelines/skills/SKILL_BuildWCPComponent.md', purpose: 'End-to-end recipe: component file, CSS module, Component Library page, route, i18n' },
      { name: 'Map Figma to Tokens', path: 'guidelines/skills/SKILL_MapFigmaToTokens.md', purpose: 'Translate Figma hex colors, spacing, and font values into semantic tokens' },
      { name: 'Add a Theme Override', path: 'guidelines/skills/SKILL_AddThemeOverride.md', purpose: 'Make one brand look different (e.g., Bodega green) without touching component CSS' },
      { name: 'Build a Scroll Carousel', path: 'guidelines/skills/SKILL_BuildScrollCarousel.md', purpose: 'Copy-paste scroll-snap carousel with hidden scrollbar and responsive tile sizes' },
      { name: 'Fix Token Violations', path: 'guidelines/skills/SKILL_FixTokenViolations.md', purpose: 'Audit and replace hardcoded colors, primitives, and px values with semantic tokens' },
      { name: 'Build a Responsive Page', path: 'guidelines/skills/SKILL_BuildResponsivePage.md', purpose: 'New Walmart page with correct shell, stacking order, full-bleed sections, and breakpoints' },
      { name: 'Add a CSS Animation', path: 'guidelines/skills/SKILL_AddAnimation.md', purpose: 'Keyframes, transitions, insertion glows, and skeletons — with prefers-reduced-motion' },
      { name: 'Add Translatable Strings', path: 'guidelines/skills/SKILL_AddI18nStrings.md', purpose: 'Add i18n keys to en/es/fr locale files and use useTranslation in components' },
      { name: 'Add a Custom Icon', path: 'guidelines/skills/SKILL_AddCustomIcon.md', purpose: 'Create a new SVG icon component when none exists in the 303+ icon library' },
      { name: 'Extract Figma Assets', path: 'guidelines/skills/SKILL_ExtractFigmaAssets.md', purpose: 'Identify exportable assets, reuse local illustrations, avoid CDN URLs and placeholders' },
      { name: 'Write a Design Prompt', path: 'guidelines/skills/SKILL_WriteDesignPrompt.md', purpose: 'Recipes for prompting new pages, cards, banners, and carousels from an AI agent' },
      { name: 'Build a Data-Driven Component', path: 'guidelines/skills/SKILL_BuildDataDrivenComponent.md', purpose: 'Static data arrays, TypeScript interfaces, headlineParts, and objectPosition patterns' },
      { name: 'Use Tag and OLQTag', path: 'guidelines/skills/SKILL_UseTagComponents.md', purpose: 'When to use Tag vs OLQTag, all variants, and how to replace custom styled status divs' },
      { name: 'Build a Card Meta Layout', path: 'guidelines/skills/SKILL_BuildCardMetaLayout.md', purpose: 'Icon + stacked label/sublabel chip pattern with correct nested DOM structure' },
      { name: 'Build an LD Primitive Component', path: 'guidelines/skills/SKILL_BuildLDComponent.md', purpose: 'Complete 10-step process for new design-system primitives in client/components/ui/' },
      { name: 'Use LinkButton and Spot Icon', path: 'guidelines/skills/SKILL_UseLinkButton.md', purpose: 'LinkButton for text-link actions; round brand-colored Spot Icon for todo/action rows' },
    ],
  },
  {
    title: 'Migrations & Implementation History',
    description: 'Active migration checklists and archived implementation summaries. Verbose narrative removed — these are concise status trackers.',
    docs: [
      { name: 'IconButton Migration', path: 'guidelines/migrations/ICONBUTTON_MIGRATION_PLAN.md', purpose: 'Replace custom icon buttons with LD IconButton (in progress, ~6%)' },
      { name: 'Living Design Migration', path: 'guidelines/migrations/LIVING-DESIGN-MIGRATION-ASSESSMENT.md', purpose: 'Anti-patterns to fix, completed work, and remaining typography/component work' },
      { name: 'Table Standardization', path: 'guidelines/migrations/PLAN_TABLE_STANDARDIZATION.md', purpose: 'Per-table checklist: sticky headers, resize handles, Link/Tag/Menu components' },
      { name: 'Theme Switcher Plan', path: 'guidelines/migrations/THEME_SWITCHER_PLAN.md', purpose: 'Archived — implemented. See RULE_ThemeSwitcher.md and RULE_ThemeAddition.md' },
      { name: 'UI Component Replacement', path: 'guidelines/migrations/UI-COMPONENT-REPLACEMENT-PLAN.md', purpose: 'shadcn → LD component mapping table, variant name diffs, active file list' },
      { name: 'Component Consolidation', path: 'guidelines/implementations/COMPONENT-CONSOLIDATION-SUMMARY.md', purpose: 'Button consolidation reference — canonical import path and API diff table' },
      { name: 'Tag Implementation', path: 'guidelines/implementations/LD-TAG-IMPLEMENTATION-SUMMARY.md', purpose: 'Archived — see RULE_TagComponents.md for active rules' },
    ],
  },
];

function DocCard({ doc }: { doc: DocEntry }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '180px 1fr',
      gap: '12px',
      padding: '12px 16px',
      backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
      borderRadius: '6px',
      fontSize: '14px',
      alignItems: 'center',
    }}>
      <div style={{
        fontWeight: 600,
        color: 'var(--ld-semantic-color-text)',
        fontFamily: 'var(--ld-semantic-font-family-sans)',
      }}>
        {doc.name}
      </div>
      <div style={{ color: 'var(--ld-semantic-color-text-subtle)', lineHeight: 1.5 }}>
        {doc.purpose}
      </div>
    </div>
  );
}

export function GuidelinesDocIndex() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingTop: '24px' }}>

      {/* Hero totals */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px',
      }}>
        {[
          { label: 'Components, Variants & Patterns', count: 200 },
          { label: 'Icons in Library', count: 303 },
          { label: 'Guideline Documents', count: docSections.reduce((sum, s) => sum + s.docs.length, 0) },
        ].map((stat) => (
          <div key={stat.label} style={{
            padding: '24px 20px',
            backgroundColor: 'var(--ld-semantic-color-surface)',
            borderRadius: '8px',
            boxShadow: 'var(--ld-semantic-elevation-100)',
            textAlign: 'center',
          }}>
            <div style={{
              fontSize: '40px',
              fontWeight: 800,
              color: 'var(--ld-semantic-color-text-brand-bold)',
              marginBottom: '4px',
              lineHeight: 1,
            }}>
              {stat.count}+
            </div>
            <div style={{
              fontSize: '14px',
              color: 'var(--ld-semantic-color-text-subtle)',
              fontWeight: 500,
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Breakdown stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '12px',
      }}>
        {[
          { label: 'LD Components', count: 44 },
          { label: 'WCP Components', count: 16 },
          { label: 'WCP Patterns', count: 12 },
          { label: 'Shared Components', count: 18 },
          { label: 'Image Assets', count: 108 },
          { label: 'Component Docs', count: docSections[0].docs.length },
          { label: 'Design System Docs', count: docSections[1].docs.length },
          { label: 'Enforcement Rules', count: docSections[2].docs.length },
          { label: 'Implementation Skills', count: docSections[3].docs.length },
          { label: 'Migrations & History', count: docSections[4].docs.length },
        ].map((stat) => (
          <div key={stat.label} style={{
            padding: '12px 16px',
            backgroundColor: 'var(--ld-semantic-color-surface)',
            borderRadius: '8px',
            boxShadow: 'var(--ld-semantic-elevation-100)',
            textAlign: 'center',
          }}>
            <div style={{
              fontSize: '22px',
              fontWeight: 700,
              color: 'var(--ld-semantic-color-text)',
              marginBottom: '2px',
            }}>
              {stat.count}
            </div>
            <div style={{
              fontSize: '12px',
              color: 'var(--ld-semantic-color-text-subtle)',
              fontWeight: 500,
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Update notice */}
      <div style={{
        padding: '16px 20px',
        backgroundColor: 'var(--ld-semantic-color-fill-info-subtle)',
        borderRadius: '6px',
        borderLeft: '4px solid var(--ld-semantic-color-border-info)',
        fontSize: '14px',
        lineHeight: 1.6,
        color: 'var(--ld-semantic-color-text-subtle)',
      }}>
        <strong style={{ color: 'var(--ld-semantic-color-text)' }}>Auto-sync rule active:</strong>{' '}
        This page must be updated whenever guideline documents in the <code style={{
          fontFamily: 'var(--ld-semantic-font-family-mono)',
          fontSize: '13px',
          backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
          padding: '2px 6px',
          borderRadius: '4px',
        }}>guidelines/</code> folder are added, removed, or renamed.
        See <code style={{
          fontFamily: 'var(--ld-semantic-font-family-mono)',
          fontSize: '13px',
          backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
          padding: '2px 6px',
          borderRadius: '4px',
        }}>guidelines/rules/RULE_GuidelinesPageSync.md</code> for enforcement details.
      </div>

      {/* Document sections */}
      {docSections.map((section) => (
        <div key={section.title} style={{
          backgroundColor: 'var(--ld-semantic-color-surface)',
          padding: '32px',
          borderRadius: '8px',
          boxShadow: 'var(--ld-semantic-elevation-100)',
        }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: 700,
            color: 'var(--ld-semantic-color-text)',
            marginBottom: '8px',
          }}>
            {section.title}
            <span style={{
              marginLeft: '10px',
              fontSize: '13px',
              fontWeight: 500,
              color: 'var(--ld-semantic-color-text-subtle)',
            }}>
              ({section.docs.length})
            </span>
          </h3>
          <p style={{
            fontSize: '14px',
            lineHeight: 1.6,
            color: 'var(--ld-semantic-color-text-subtle)',
            marginBottom: '16px',
          }}>
            {section.description}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {section.docs.map((doc) => (
              <DocCard key={doc.path} doc={doc} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
