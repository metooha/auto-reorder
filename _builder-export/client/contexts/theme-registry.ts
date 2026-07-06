export interface Theme {
  id: string;
  name: string;
  description?: string;
  cssFile?: string;
  inherits?: string;
  primitiveCSS?: string;
  semanticCSS?: string;
  hidden?: boolean;
}

export const DEFAULT_THEME: string = 'base';

export const AVAILABLE_THEMES: Theme[] = [
  {
    id: 'base',
    name: 'Base (Default)',
    description: 'Living Design 3.5 base tokens — standard LD blue (#0053E2)',
    primitiveCSS: '/styles/themes/base/primitive.css',
    semanticCSS: '/styles/themes/base/semantic.css',
  },
  {
    id: 'walmart',
    name: 'Walmart.com (WCP)',
    description: 'Walmart Commerce Platform — Walmart blue (#0071DC) with spark yellow accent',
    inherits: 'wcp',
    primitiveCSS: '/styles/themes/wcp/primitive.css',
    semanticCSS: '/styles/themes/wcp/semantic.css',
  },
  {
    id: 'walmart-b2b',
    name: 'Walmart Business (B2B)',
    description: 'Walmart Business — navy brand (#002E99) with cyan accent',
    inherits: 'wcp',
    primitiveCSS: '/styles/themes/walmart-b2b/primitive.css',
    semanticCSS: '/styles/themes/walmart-b2b/semantic.css',
  },
  {
    id: 'sams-club',
    name: "Sam's Club",
    description: "Sam's Club — deep blue (#0060A9) with teal accent",
    inherits: 'wcp',
    primitiveCSS: '/styles/themes/sams-club/primitive.css',
    semanticCSS: '/styles/themes/sams-club/semantic.css',
  },
];

export function getThemeById(id: string): Theme | undefined {
  return AVAILABLE_THEMES.find(t => t.id === id);
}
