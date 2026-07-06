import { RequestHandler } from 'express';
import * as fs from 'fs';
import * as path from 'path';

interface SaveOverridesBody {
  /** E.g. "/styles/themes/wcp/semantic.css" — used to derive the folder */
  cssFilePath: string;
  /** { "--ld-semantic-color-action-fill-primary": "var(--ld-primitive-color-red-100)" } */
  overrides: Record<string, string>;
  /** Display name for the comment header */
  themeName?: string;
  themeId?: string;
}

/**
 * POST /api/theme/save-overrides
 *
 * Writes a `overrides.css` file into the active theme's folder so that
 * overrides persist across server restarts and page reloads.
 *
 * Security: Only paths under /styles/themes/ that end in .css are allowed.
 */
export const handleSaveOverrides: RequestHandler = (req, res) => {
  const { cssFilePath, overrides, themeName = 'Unknown', themeId = 'unknown' } =
    req.body as SaveOverridesBody;

  // ── Validate ──────────────────────────────────────────────────────────────
  if (!cssFilePath || typeof cssFilePath !== 'string') {
    res.status(400).json({ success: false, error: 'cssFilePath is required' });
    return;
  }

  // Only allow paths inside /styles/themes/  and ending in .css
  if (!cssFilePath.startsWith('/styles/themes/') || !cssFilePath.endsWith('.css')) {
    res.status(400).json({ success: false, error: 'Invalid cssFilePath' });
    return;
  }

  // Validate overrides object
  if (!overrides || typeof overrides !== 'object' || Array.isArray(overrides)) {
    res.status(400).json({ success: false, error: 'overrides must be an object' });
    return;
  }

  // Only allow semantic token names as keys
  for (const key of Object.keys(overrides)) {
    if (!key.startsWith('--ld-semantic-') && !key.startsWith('--wcp-semantic-')) {
      res.status(400).json({
        success: false,
        error: `Invalid token key: ${key}. Only --ld-semantic-* and --wcp-semantic-* are allowed.`,
      });
      return;
    }
    const value = overrides[key];
    if (typeof value !== 'string') {
      res.status(400).json({ success: false, error: `Value for ${key} must be a string` });
      return;
    }
  }

  // ── Derive output path ────────────────────────────────────────────────────
  // e.g. "/styles/themes/wcp/semantic.css" → folder = "/styles/themes/wcp"
  const themeFolder = cssFilePath.substring(0, cssFilePath.lastIndexOf('/'));
  const publicDir = path.join(process.cwd(), 'public');
  const outputPath = path.join(publicDir, themeFolder, 'overrides.css');

  // Double-check the resolved path is still inside public/styles/themes/
  const stylesRoot = path.join(publicDir, 'styles', 'themes');
  if (!outputPath.startsWith(stylesRoot)) {
    res.status(400).json({ success: false, error: 'Path traversal rejected' });
    return;
  }

  // ── Generate CSS content ──────────────────────────────────────────────────
  const entries = Object.entries(overrides);

  const cssLines = entries.map(([token, value]) => `  ${token}: ${value};`).join('\n');

  const css = `/**
 * Theme Editor Overrides
 * Theme: ${themeName} (${themeId})
 * Updated: ${new Date().toISOString()}
 * Generated automatically — do not edit by hand.
 */

:root {
${cssLines}
}
`;

  // If there are no overrides, delete the file (no-op if it doesn't exist)
  if (entries.length === 0) {
    try {
      if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
    } catch {
      // Ignore
    }
    res.json({ success: true, cleared: true });
    return;
  }

  // ── Write file ────────────────────────────────────────────────────────────
  try {
    // Ensure the directory exists
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(outputPath, css, 'utf-8');
    res.json({ success: true, path: `${themeFolder}/overrides.css` });
  } catch (err) {
    console.error('[theme-overrides] Failed to write file:', err);
    res.status(500).json({ success: false, error: 'Failed to write overrides.css' });
  }
};
