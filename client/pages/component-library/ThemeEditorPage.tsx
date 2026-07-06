import React, { useRef } from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';
import { TokenSection, type TokenDef } from '@/components/theme-editor/TokenSection';
import { PreviewPanel } from '@/components/theme-editor/PreviewPanel';
import { useThemeEditor } from '@/hooks/useThemeEditor';
import { useTheme } from '@/contexts/ThemeContext';
import { Download } from '@/components/icons/Download';
import { Upload } from '@/components/icons/Upload';
import { RotateCcw } from '@/components/icons/RotateCcw';
import styles from './ThemeEditorPage.module.css';

// ─── Token Group Definitions ──────────────────────────────────────────────────
// Only --ld-semantic-* and --wcp-semantic-* color tokens are exposed.
// Primitive tokens (--ld-primitive-color-*) and scale tokens
// (spacing, type scale, sizing scale) are never shown — they are fixed by design.

const PRIMARY_ACTION_TOKENS: TokenDef[] = [
  { token: '--ld-semantic-color-action-fill-primary',         label: 'Primary fill' },
  { token: '--ld-semantic-color-action-fill-primary-hovered', label: 'Primary fill (hover)' },
  { token: '--ld-semantic-color-action-fill-primary-pressed', label: 'Primary fill (pressed)' },
  { token: '--ld-semantic-color-action-text-on-fill-primary', label: 'Text on primary' },
  { token: '--ld-semantic-color-action-focus-outline',        label: 'Focus ring' },
];

const SECONDARY_ACTION_TOKENS: TokenDef[] = [
  { token: '--ld-semantic-color-action-fill-secondary',           label: 'Secondary fill' },
  { token: '--ld-semantic-color-action-border-secondary',         label: 'Secondary border' },
  { token: '--ld-semantic-color-action-text-on-fill-secondary',   label: 'Text on secondary' },
];

const BRAND_TOKENS: TokenDef[] = [
  { token: '--ld-semantic-color-fill-brand',                  label: 'Brand fill' },
  { token: '--ld-semantic-color-fill-brand-bold',             label: 'Brand fill (bold)' },
  { token: '--ld-semantic-color-fill-brand-subtle',           label: 'Brand fill (subtle)' },
  { token: '--ld-semantic-color-text-brand',                  label: 'Brand text' },
  { token: '--ld-semantic-color-border-brand',                label: 'Brand border' },
  { token: '--ld-semantic-color-text-on-fill-brand-subtle',   label: 'Text on brand subtle' },
];

const DESTRUCTIVE_TOKENS: TokenDef[] = [
  { token: '--ld-semantic-color-action-fill-negative',              label: 'Destructive fill' },
  { token: '--ld-semantic-color-action-fill-negative-hovered',      label: 'Destructive (hover)' },
  { token: '--ld-semantic-color-action-text-on-fill-negative',      label: 'Text on destructive' },
];

const WCP_COMMERCE_TOKENS: TokenDef[] = [
  { token: '--wcp-semantic-color-action-fill-primary-alt',          label: 'Alt primary fill (spark)' },
  { token: '--wcp-semantic-color-action-fill-primary-alt-hovered',  label: 'Alt primary (hover)' },
  { token: '--wcp-semantic-color-action-text-on-fill-primary-alt',  label: 'Text on alt primary' },
  { token: '--wcp-semantic-color-fill-confidence',                  label: 'Confidence fill' },
  { token: '--wcp-semantic-color-fill-confidence-bold',             label: 'Confidence bold fill' },
  { token: '--wcp-semantic-color-fill-savings-bold',                label: 'Savings bold fill' },
  { token: '--wcp-semantic-color-fill-urgent',                      label: 'Urgent fill' },
  { token: '--wcp-semantic-color-fill-holiday-member',              label: 'Holiday member fill' },
  { token: '--wcp-semantic-color-border-social',                    label: 'Social border' },
];

const TOP_NAV_TOKENS: TokenDef[] = [
  { token: '--ld-semantic-color-top-nav-fill',              label: 'Background' },
  { token: '--ld-semantic-color-top-nav-fill-hovered',      label: 'Background (hover)' },
  { token: '--ld-semantic-color-top-nav-fill-pressed',      label: 'Background (pressed)' },
  { token: '--ld-semantic-color-top-nav-text-on-fill',      label: 'Text & icons' },
  { token: '--ld-semantic-color-top-nav-text-on-fill-hovered',  label: 'Text & icons (hover)' },
  { token: '--ld-semantic-color-top-nav-separator',         label: 'Separator' },
];

const BOTTOM_NAV_TOKENS: TokenDef[] = [
  { token: '--ld-semantic-color-bottom-nav-fill',                         label: 'Background' },
  { token: '--ld-semantic-color-bottom-nav-fill-activated',               label: 'Background (active)' },
  { token: '--ld-semantic-color-bottom-nav-separator',                    label: 'Separator' },
  { token: '--ld-semantic-color-bottom-nav-text-on-fill',                 label: 'Icon & text (inactive)' },
  { token: '--ld-semantic-color-bottom-nav-text-on-fill-activated',       label: 'Icon & text (active)' },
  { token: '--ld-semantic-color-bottom-nav-text-on-fill-activated-hovered', label: 'Icon & text (active hover)' },
];

const PAGE_NAV_TOKENS: TokenDef[] = [
  { token: '--ld-semantic-color-page-nav-fill',                  label: 'Item background' },
  { token: '--ld-semantic-color-page-nav-fill-activated',        label: 'Item background (active)' },
  { token: '--ld-semantic-color-page-nav-fill-hovered',          label: 'Item background (hover)' },
  { token: '--ld-semantic-color-page-nav-indicator-activated',   label: 'Active indicator' },
  { token: '--ld-semantic-color-page-nav-text-on-fill',          label: 'Text' },
  { token: '--ld-semantic-color-page-nav-text-on-fill-activated', label: 'Text (active)' },
];

const TOKEN_GROUPS = [
  { id: 'primary-action',    title: 'Primary Action',    tokens: PRIMARY_ACTION_TOKENS },
  { id: 'secondary-action',  title: 'Secondary Action',  tokens: SECONDARY_ACTION_TOKENS },
  { id: 'brand',             title: 'Brand',             tokens: BRAND_TOKENS },
  { id: 'destructive',       title: 'Destructive',       tokens: DESTRUCTIVE_TOKENS },
  { id: 'wcp-commerce',      title: 'WCP Commerce',      tokens: WCP_COMMERCE_TOKENS },
  { id: 'top-nav',           title: 'Top Navigation',    tokens: TOP_NAV_TOKENS },
  { id: 'bottom-nav',        title: 'Bottom Navigation', tokens: BOTTOM_NAV_TOKENS },
  { id: 'page-nav',          title: 'Page Navigation',   tokens: PAGE_NAV_TOKENS },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ThemeEditorPage() {
  const { overrides, setOverride, resetOverride, resetAll, exportJSON, importJSON, getCurrentValue } = useThemeEditor();
  const { currentTheme, currentThemeData, reloadOverrides } = useTheme();
  const importInputRef = useRef<HTMLInputElement>(null);
  const [importError, setImportError] = React.useState<string | null>(null);
  const [importSuccess, setImportSuccess] = React.useState(false);
  const [importSaving, setImportSaving] = React.useState(false);

  const totalOverrides = Object.keys(overrides).length;

  // ── Export ──────────────────────────────────────────────────────────────────
  function handleExport() {
    const json = exportJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `theme-overrides-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // ── Import ──────────────────────────────────────────────────────────────────
  function handleImportClick() {
    setImportError(null);
    setImportSuccess(false);
    importInputRef.current?.click();
  }

  function handleImportFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const text = ev.target?.result;
      if (typeof text !== 'string') return;

      setImportSaving(true);
      const result = await importJSON(
        text,
        currentThemeData?.semanticCSS,
        currentTheme,
        currentThemeData?.name,
      );
      setImportSaving(false);

      if (result.success) {
        // Reload overrides.css so the file change takes effect in the browser
        reloadOverrides();
        setImportSuccess(true);
        setTimeout(() => setImportSuccess(false), 4000);
      } else {
        setImportError(result.error ?? 'Unknown error');
      }
    };
    reader.readAsText(file);
    // Reset so the same file can be re-imported
    e.target.value = '';
  }

  // ── Reset All ───────────────────────────────────────────────────────────────
  function handleResetAll() {
    resetAll();
  }

  return (
    <ComponentPageLayout
      section="Tools"
      title="Theme Editor"
      description="Override semantic tokens using values from the primitive color palette. Pick any primitive token (e.g. blue-100, spark-100) as the new value — no arbitrary hex. Changes apply instantly via CSS cascade and persist across sessions. Scale and primitive tokens are not editable."
    >
      <div className={styles.pageTop}>

        {/* Toolbar */}
        <div className={styles.toolbar}>
          <div className={styles.toolbarLeft}>
            {totalOverrides > 0 && (
              <span className={styles.overrideBadge}>
                {totalOverrides} override{totalOverrides !== 1 ? 's' : ''} active
              </span>
            )}
            {importSaving && (
              <span className={styles.savingMessage}>Saving to theme file…</span>
            )}
            {importSuccess && !importSaving && (
              <span className={styles.successMessage}>Saved to {currentThemeData?.name ?? 'theme'} — overrides.css updated</span>
            )}
            {importError && (
              <span className={styles.errorMessage}>{importError}</span>
            )}
          </div>
          <div className={styles.toolbarRight}>
            <ButtonGroup>
              <Button
                variant="tertiary"
                size="small"
                leading={<RotateCcw width={16} height={16} />}
                onClick={handleResetAll}
              >
                Reset all
              </Button>
              <Button
                variant="secondary"
                size="small"
                leading={<Upload width={16} height={16} />}
                onClick={handleImportClick}
              >
                Import JSON
              </Button>
              <Button
                variant="secondary"
                size="small"
                leading={<Download width={16} height={16} />}
                onClick={handleExport}
              >
                Export JSON
              </Button>
            </ButtonGroup>
          </div>
        </div>

        {/* Hidden file input for JSON import */}
        <input
          ref={importInputRef}
          type="file"
          accept=".json,application/json"
          className={styles.hiddenFileInput}
          onChange={handleImportFile}
          aria-hidden="true"
          tabIndex={-1}
        />
      </div>

      {/* Two-column layout */}
      <div className={styles.columns}>
        {/* Left: Token editor */}
        <div className={styles.editorColumn}>
          <div className={styles.tokenSections}>
            {TOKEN_GROUPS.map((group) => (
              <TokenSection
                key={group.id}
                title={group.title}
                tokens={group.tokens}
                overrides={overrides}
                onSet={setOverride}
                onReset={resetOverride}
                getCurrentValue={getCurrentValue}
                defaultOpen={group.id === 'primary-action'}
              />
            ))}
          </div>
        </div>

        {/* Right: Live preview (sticky) */}
        <div className={styles.previewColumn}>
          <div className={styles.previewSticky}>
            <PreviewPanel overrideCount={totalOverrides} />
          </div>
        </div>
      </div>
    </ComponentPageLayout>
  );
}
