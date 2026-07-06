import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      templates: {
        componentLibrary: 'Component Library',
      },
      componentLibrary: {
        // Navigation items
        gettingStarted: 'Getting Started',
        components: 'Components',

        // Nav labels (sidebar)
        navAlerts: 'Alerts',
        navBadges: 'Badges',
        navBreadcrumbs: 'Breadcrumbs',
        navButtons: 'Buttons',
        navCallouts: 'Callouts',
        navCards: 'Cards',
        navCheckboxes: 'Checkboxes',
        navChips: 'Chips',
        navContentMessages: 'Content Messages',
        navDateFields: 'Date Fields',
        navDatePickers: 'Date Pickers',
        navDatePickerCalendar: 'Calendar',
        navDividers: 'Dividers',
        navFilterChips: 'Filter Chips',
        navFormGroups: 'Form Groups',
        navIconButtons: 'Icon Buttons',
        navLinkButtons: 'Link Buttons',
        navLinks: 'Links',
        navLists: 'Lists',
        navMetrics: 'Metrics',
        navModals: 'Modals',
        navNudges: 'Nudges',
        navPanels: 'Panels',
        navPopover: 'Popovers',
        navQuantityStepper: 'Quantity Stepper',
        navRadioButtons: 'Radio Buttons',
        navSegmentedControl: 'Segmented Controls',
        navSnackbars: 'Snackbars',
        navSpinners: 'Spinners',
        navSpotIcons: 'Spot Icons',
        navSwitches: 'Switches',
        navTable: 'Table',
        navTags: 'Tags',
        navTextFields: 'Text Fields',

        // Page: Overview
        overviewTitle: 'Component Library',
        overviewDescription: 'Explore our design system components built with Living Design 3.5',

        // Page: Getting Started
        gettingStartedTitle: 'Getting Started',
        gettingStartedDesc: 'Learn how to use the Living Design 3.5 component library in your projects.',

        // Tabs on Getting Started
        tabOverview: 'Overview',
        tabDeveloper: 'Developer',
        tabDesigner: 'Designer',
        tabAgent: 'Agent',
        tabAgentRules: 'Agent Rules',
        tabCodeStandards: 'Code Standards',
        tabComponentUsage: 'Component Usage',
        tabDesignPrinciples: 'Design Principles',
        tabTokenUsage: 'Token Usage',
        tabDocIndex: 'Doc Index',
        tabAccessibility: 'Accessibility',

        // Page: Themes & Tokens
        themesTitle: 'Themes & Tokens',
        themesDesc: 'Explore available themes and semantic design tokens for Living Design 3.5.',
        themesExplanation: 'Themes change how semantic tokens resolve to colors and typography. Switch themes to see tokens update in real time.',
        selectTheme: 'Select Theme',
        currentTheme: 'Current Theme',
        currentThemeDetails: 'Current Theme Details',
        activeFontFamily: 'Active Font Family',
        themeSelector: 'Theme Selector',

        // Token sections
        quickNavigate: 'Quick Navigate',
        colorTokens: 'Color Tokens',
        spaceTokens: 'Space Tokens',
        spacingTokens: 'Spacing Tokens',
        textTokens: 'Typography Tokens',
        typographyTokens: 'Typography Tokens',
        otherTokens: 'Other Tokens',
        borderRadiusTokens: 'Border Radius Tokens',
        howToUseTokens: 'How to Use Tokens',

        // Page: Design Tokens
        designTokensTitle: 'Design Tokens',
        designTokensDesc: 'Reference for all Living Design 3.5 semantic and primitive tokens.',

        // Page: Guidelines
        guidelinesTitle: 'Guidelines',
        guidelinesDesc: 'Design and development guidelines for Living Design 3.5.',
        guidelinesHeading: 'Guidelines',

        // Page: Icons
        iconsTitle: 'Icons',

        // Component Sandbox
        sandboxTitle: 'Component Sandbox',
        sandboxDescription: 'Interactively explore and configure components.',
        selectComponent: 'Select a component',
        selectToConfig: 'Select a component to configure',
        noComponentsFound: 'No components found',
        tryDifferentSearch: 'Try a different search term',
        searchPlaceholder: 'Search components...',
        interactiveExamples: 'Interactive Examples',
        interactiveExamplesDesc: 'Explore components with interactive controls',
        codeExample: 'Code Example',
        preview: 'Preview',
        properties: 'Properties',
        props: 'Props',
        propName: 'Name',
        propType: 'Type',
        propDefault: 'Default',
        propDescription: 'Description',

        // Common
        loading: 'Loading...',
        copy: 'Copy',
        copied: 'Copied!',
        backToTop: 'Back to top',
        backToHome: 'Back to home',
        settingsAriaLabel: 'Settings',

        // Component descriptions
        descAlerts: 'Communicate important messages that require user attention.',
        descBadges: 'Small count and labeling components.',
        descBreadcrumbs: 'Navigation aid showing the user\'s location in the site hierarchy.',
        descCallouts: 'Highlight important information with contextual callout boxes.',
        descCalendar: 'Calendar date picker for selecting dates.',
        descCards: 'Flexible containers for grouping related content.',
        descCheckboxes: 'Allow users to select one or more options from a set.',
        descChips: 'Compact elements representing an input, attribute, or action.',
        descContentMessages: 'Display informational or promotional content messages.',
        descDateFields: 'Input fields for entering dates.',
        descDatePickers: 'Interactive date selection components.',
        descDividers: 'Thin lines that group or separate content.',
        descFilterChips: 'Chips used for filtering content in a list.',
        descFormGroups: 'Group related form fields together.',
        descIconButtons: 'Buttons that display only an icon.',
        descLinkButtons: 'Buttons styled as links for navigation.',
        descLinks: 'Hyperlinks for navigation.',
        descLists: 'Display a set of related items vertically.',
        descMetrics: 'Display key performance indicators and metrics.',
        descModals: 'Dialog overlays that require user interaction.',
        descNudges: 'Subtle prompts to guide user behavior.',
        descPanels: 'Resizable side panels for contextual content.',
        descPopover: 'Floating content panels triggered by user interaction.',
        descRadioButtons: 'Allow users to select one option from a set.',
        descSnackbars: 'Brief messages about app processes at the bottom of the screen.',
        descSpinners: 'Indicate loading or processing states.',
        descSpotIcons: 'Decorative illustration icons for empty states and features.',
        descSwitches: 'Toggle between two states: on and off.',
        descTable: 'Display tabular data in rows and columns.',
        descTags: 'Labels that categorize or organize content.',

        // Component-specific labels
        variant: 'Variant',
        size: 'Size',
        color: 'Color',
        disabled: 'Disabled',
        orientation: 'Orientation',
        whenToUse: 'When to use',
        whenNotToUse: 'When not to use',
        accessibility: 'Accessibility',
        ldSection: 'Living Design',
        sharedSection: 'Shared',
        sharedBadge: 'Shared',

        // Form labels
        buttonTextLabel: 'Button text',
        defaultButtonText: 'Click me',
        badgeContentLabel: 'Badge content',
        checkboxLabel: 'Checkbox label',
        chipLabel: 'Chip label',
        chipTextLabel: 'Chip text',
        countLabel: 'Count',
        dateLabel: 'Date',
        enterText: 'Enter text...',
        errorMessageLabel: 'Error message',
        fieldLabel: 'Label',
        filterLabel: 'Filter',
        filterTextLabel: 'Filter text',
        helperText: 'Helper text',
        labelTextLabel: 'Label text',
        leaveEmptyPlaceholder: 'Leave empty for placeholder',
        option1: 'Option 1',
        option2: 'Option 2',
        option3: 'Option 3',
        ratingNote: 'Note',
        ratingValueLabel: 'Rating value',
        selectOptionLabel: 'Select an option',
        tagLabel: 'Tag label',
        tagTextLabel: 'Tag text',
        toggleOption: 'Toggle option',
        magicAIState: 'Magic AI',

        // Buttons page
        buttonsPageDesc: 'Buttons allow users to take actions, and make choices, with a single tap.',

        // Text fields page
        textFieldsPageDesc: 'Text fields let users enter and edit text.',

        // Quantity stepper
        quantityStepperDesc: 'Allows users to increase or decrease a numeric value.',

        // Popover descriptions
        popoverWhenToUse1: 'Show supplementary information without leaving the current page',
        popoverWhenToUse2: 'Provide contextual help or tooltips',
        popoverWhenToUse3: 'Display a small form or configuration options',
        popoverWhenNotToUse1: 'For critical information that must be acknowledged (use a Modal)',
        popoverWhenNotToUse2: 'For complex workflows (use a Panel or Page)',
        popoverWhenNotToUse3: 'When the content is always visible (use inline content)',
        popoverA11y1: 'Popover content is accessible to screen readers',
        popoverA11y2: 'Escape key closes the popover',
        popoverA11y3: 'Focus returns to trigger after closing',
        popoverA11y4: 'Arrow keys navigate within popover content',
        popoverOpenDesc: 'Controls whether the popover is open',
        popoverAlignDesc: 'Alignment of the popover relative to the trigger',
        popoverArrowDesc: 'Show or hide the arrow pointing to the trigger',
        popoverOffsetDesc: 'Distance from the trigger in pixels',

        // Labels
        labelsHeading: 'Labels',
        labelsDesc: 'Labels provide descriptive text for form elements.',
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
