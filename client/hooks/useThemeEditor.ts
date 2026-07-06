import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'wcp-theme-editor-overrides';

export type TokenOverrides = Record<string, string>;

export interface ThemeEditorExport {
  theme: string;
  exportedAt: string;
  overrides: TokenOverrides;
}

function loadFromStorage(): TokenOverrides {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as TokenOverrides;
  } catch {
    return {};
  }
}

function saveToStorage(overrides: TokenOverrides): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
  } catch {
    // Storage unavailable — fail silently
  }
}

function applyOverride(token: string, value: string): void {
  document.documentElement.style.setProperty(token, value);
}

function removeOverride(token: string): void {
  document.documentElement.style.removeProperty(token);
}

function applyAllOverrides(overrides: TokenOverrides): void {
  Object.entries(overrides).forEach(([token, value]) => {
    applyOverride(token, value);
  });
}

function clearAllOverrides(overrides: TokenOverrides): void {
  Object.keys(overrides).forEach(removeOverride);
}

export function getCurrentValue(token: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(token).trim();
}

export function useThemeEditor() {
  const [overrides, setOverrides] = useState<TokenOverrides>(() => {
    const stored = loadFromStorage();
    // Apply stored overrides on init
    applyAllOverrides(stored);
    return stored;
  });

  const setOverride = useCallback((token: string, value: string) => {
    applyOverride(token, value);
    setOverrides(prev => {
      const next = { ...prev, [token]: value };
      saveToStorage(next);
      return next;
    });
  }, []);

  const resetOverride = useCallback((token: string) => {
    removeOverride(token);
    setOverrides(prev => {
      const next = { ...prev };
      delete next[token];
      saveToStorage(next);
      return next;
    });
  }, []);

  const resetAll = useCallback(() => {
    setOverrides(prev => {
      clearAllOverrides(prev);
      return {};
    });
    saveToStorage({});
  }, []);

  const exportJSON = useCallback((): string => {
    const payload: ThemeEditorExport = {
      theme: localStorage.getItem('ld-theme') ?? 'walmart',
      exportedAt: new Date().toISOString(),
      overrides,
    };
    return JSON.stringify(payload, null, 2);
  }, [overrides]);

  /**
   * Parse a JSON import, apply overrides immediately via CSS setProperty,
   * persist to localStorage, AND write overrides.css to the active theme folder
   * via the server API so they survive page reloads without localStorage.
   *
   * @param jsonString  The imported JSON text.
   * @param cssFilePath The active theme's semanticCSS path from the theme registry
   *                    (e.g. "/styles/themes/wcp/semantic.css"). Required for server write.
   * @param themeId     The active theme id (e.g. "walmart").
   * @param themeName   Display name (e.g. "Walmart").
   */
  const importJSON = useCallback(async (
    jsonString: string,
    cssFilePath?: string,
    themeId?: string,
    themeName?: string,
  ): Promise<{ success: boolean; error?: string }> => {
    // ── 1. Parse & validate ────────────────────────────────────────────────
    let parsed: ThemeEditorExport;
    try {
      parsed = JSON.parse(jsonString) as ThemeEditorExport;
    } catch {
      return { success: false, error: 'Failed to parse JSON.' };
    }

    if (!parsed.overrides || typeof parsed.overrides !== 'object') {
      return { success: false, error: 'Invalid format: missing "overrides" object.' };
    }

    // ── 2. Validate tokens ────────────────────────────────────────────────
    const valid: TokenOverrides = {};
    for (const [token, value] of Object.entries(parsed.overrides)) {
      if (
        (token.startsWith('--ld-semantic-') || token.startsWith('--wcp-semantic-')) &&
        typeof value === 'string'
      ) {
        valid[token] = value;
      }
    }

    // ── 3. Apply immediately via CSS cascade ──────────────────────────────
    setOverrides(prev => { clearAllOverrides(prev); return {}; });
    applyAllOverrides(valid);
    setOverrides(valid);
    saveToStorage(valid);

    // ── 4. Persist to theme CSS file via server ───────────────────────────
    if (cssFilePath) {
      try {
        const res = await fetch('/api/theme/save-overrides', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            cssFilePath,
            overrides: valid,
            themeId: themeId ?? (localStorage.getItem('ld-theme') ?? 'walmart'),
            themeName: themeName ?? 'Unknown',
          }),
        });
        const data = await res.json();
        if (!data.success) {
          console.warn('[theme-editor] Server write failed:', data.error);
          // Still return success — the inline override already works
        }
      } catch (err) {
        console.warn('[theme-editor] Server unreachable, overrides applied inline only:', err);
      }
    }

    return { success: true };
  }, []);

  // Clean up inline overrides when component unmounts (optional: keep them persisted)
  // We intentionally do NOT clean up on unmount — overrides are CSS cascade additions

  return {
    overrides,
    setOverride,
    resetOverride,
    resetAll,
    exportJSON,
    importJSON,
    getCurrentValue,
  };
}
