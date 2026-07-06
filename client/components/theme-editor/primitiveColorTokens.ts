/**
 * Static map of all --ld-primitive-color-* tokens with their hex values.
 * These are the ONLY allowed values when overriding semantic tokens.
 * Hex values match public/styles/themes/base/primitive.css exactly.
 */

export interface PrimitiveColorToken {
  /** CSS custom property name: "--ld-primitive-color-blue-100" */
  name: string;
  /** Short display name: "blue-100" */
  shortName: string;
  /** Color family: "blue" */
  family: string;
  /** Numeric step (5, 10, 20… 180) or 0 for black/white */
  step: number;
  /** Static hex value from primitive.css */
  hex: string;
}

export interface PrimitiveColorFamily {
  /** Internal key */
  family: string;
  /** Display label */
  label: string;
  /** Ordered tokens for this family */
  tokens: PrimitiveColorToken[];
}

// ─── Build helpers ────────────────────────────────────────────────────────────

function makeFamily(
  family: string,
  label: string,
  steps: Array<{ step: number; hex: string }>,
): PrimitiveColorFamily {
  return {
    family,
    label,
    tokens: steps.map(({ step, hex }) => ({
      name: `--ld-primitive-color-${family}-${step}`,
      shortName: `${family}-${step}`,
      family,
      step,
      hex,
    })),
  };
}

// ─── Families ─────────────────────────────────────────────────────────────────

const BLUE = makeFamily('blue', 'Blue', [
  { step: 5,   hex: '#f0f5ff' },
  { step: 10,  hex: '#e9f1fe' },
  { step: 20,  hex: '#c9dcfd' },
  { step: 30,  hex: '#acc8fb' },
  { step: 40,  hex: '#90b5f9' },
  { step: 50,  hex: '#7aa5f6' },
  { step: 60,  hex: '#5e93f3' },
  { step: 70,  hex: '#4380ef' },
  { step: 80,  hex: '#2e70eb' },
  { step: 90,  hex: '#175ee2' },
  { step: 100, hex: '#0053e2' },
  { step: 110, hex: '#114ab6' },
  { step: 120, hex: '#003fb2' },
  { step: 130, hex: '#002e99' },
  { step: 140, hex: '#002185' },
  { step: 150, hex: '#001270' },
  { step: 160, hex: '#001e60' },
  { step: 170, hex: '#080042' },
  { step: 180, hex: '#0e002e' },
]);

const CYAN = makeFamily('cyan', 'Cyan', [
  { step: 5,   hex: '#f0faff' },
  { step: 10,  hex: '#e7f6fe' },
  { step: 20,  hex: '#c9ebfd' },
  { step: 30,  hex: '#90d6f9' },
  { step: 40,  hex: '#79cdf6' },
  { step: 50,  hex: '#4dbdf5' },
  { step: 60,  hex: '#2eacea' },
  { step: 70,  hex: '#189ee2' },
  { step: 80,  hex: '#0092db' },
  { step: 90,  hex: '#0083c7' },
  { step: 100, hex: '#0076b3' },
  { step: 110, hex: '#006599' },
  { step: 120, hex: '#005985' },
  { step: 130, hex: '#004a70' },
  { step: 140, hex: '#003857' },
  { step: 150, hex: '#002e42' },
  { step: 160, hex: '#001e2e' },
  { step: 170, hex: '#00101a' },
  { step: 180, hex: '#000c16' },
]);

const GRAY = makeFamily('gray', 'Gray', [
  { step: 5,   hex: '#f8f8f8' },
  { step: 10,  hex: '#f1f1f2' },
  { step: 20,  hex: '#e3e4e5' },
  { step: 30,  hex: '#d5d6d8' },
  { step: 40,  hex: '#c7c8cb' },
  { step: 50,  hex: '#babbbe' },
  { step: 60,  hex: '#acadb0' },
  { step: 70,  hex: '#9e9fa3' },
  { step: 80,  hex: '#909196' },
  { step: 90,  hex: '#828489' },
  { step: 100, hex: '#74767c' },
  { step: 110, hex: '#686a70' },
  { step: 120, hex: '#5d5e63' },
  { step: 130, hex: '#515357' },
  { step: 140, hex: '#46474a' },
  { step: 150, hex: '#3a3b3e' },
  { step: 160, hex: '#2e2f32' },
  { step: 170, hex: '#232325' },
  { step: 180, hex: '#171819' },
]);

const GREEN = makeFamily('green', 'Green', [
  { step: 5,   hex: '#f4f9f2' },
  { step: 10,  hex: '#eaf3e6' },
  { step: 20,  hex: '#d4e7cd' },
  { step: 30,  hex: '#bfdbb3' },
  { step: 40,  hex: '#aacf9a' },
  { step: 50,  hex: '#95c381' },
  { step: 60,  hex: '#7fb768' },
  { step: 70,  hex: '#6aab4f' },
  { step: 80,  hex: '#559f35' },
  { step: 90,  hex: '#3f931c' },
  { step: 100, hex: '#2a8703' },
  { step: 110, hex: '#267a03' },
  { step: 120, hex: '#226c02' },
  { step: 130, hex: '#1d5f02' },
  { step: 140, hex: '#195102' },
  { step: 150, hex: '#154402' },
  { step: 160, hex: '#113601' },
  { step: 170, hex: '#0d2901' },
  { step: 180, hex: '#081b01' },
]);

const ORANGE = makeFamily('orange', 'Orange', [
  { step: 5,   hex: '#fff7f2' },
  { step: 10,  hex: '#fff0e6' },
  { step: 20,  hex: '#fee0cc' },
  { step: 30,  hex: '#fed1b3' },
  { step: 40,  hex: '#fdc199' },
  { step: 50,  hex: '#fdb280' },
  { step: 60,  hex: '#fca266' },
  { step: 70,  hex: '#fc934d' },
  { step: 80,  hex: '#fb8333' },
  { step: 90,  hex: '#fb741a' },
  { step: 100, hex: '#fa6400' },
  { step: 110, hex: '#e15300' },
  { step: 120, hex: '#c83c00' },
  { step: 130, hex: '#af2f00' },
  { step: 140, hex: '#962300' },
  { step: 150, hex: '#7d1900' },
  { step: 160, hex: '#641100' },
  { step: 170, hex: '#4b0a00' },
  { step: 180, hex: '#320500' },
]);

const PINK = makeFamily('pink', 'Pink', [
  { step: 5,   hex: '#fef6fb' },
  { step: 10,  hex: '#fce9f5' },
  { step: 20,  hex: '#f8d2e3' },
  { step: 30,  hex: '#f4bdd3' },
  { step: 40,  hex: '#f0adcc' },
  { step: 50,  hex: '#ea9ac3' },
  { step: 60,  hex: '#e587ba' },
  { step: 70,  hex: '#df74b1' },
  { step: 80,  hex: '#d95fa7' },
  { step: 90,  hex: '#d3479d' },
  { step: 100, hex: '#cb2c90' },
  { step: 110, hex: '#b62781' },
  { step: 120, hex: '#b1267d' },
  { step: 130, hex: '#8c1e64' },
  { step: 140, hex: '#781a55' },
  { step: 150, hex: '#651648' },
  { step: 160, hex: '#51123a' },
  { step: 170, hex: '#3e0e2c' },
  { step: 180, hex: '#2e0a21' },
]);

const PURPLE = makeFamily('purple', 'Purple', [
  { step: 5,   hex: '#faf6fe' },
  { step: 10,  hex: '#f5eefe' },
  { step: 20,  hex: '#e8d5fc' },
  { step: 30,  hex: '#dabcfb' },
  { step: 40,  hex: '#cda3f9' },
  { step: 50,  hex: '#c090f7' },
  { step: 60,  hex: '#b27cf5' },
  { step: 70,  hex: '#a569f3' },
  { step: 80,  hex: '#9756f1' },
  { step: 90,  hex: '#8a40ef' },
  { step: 100, hex: '#7b29ec' },
  { step: 110, hex: '#6e24d3' },
  { step: 120, hex: '#5f1fb8' },
  { step: 130, hex: '#511ba0' },
  { step: 140, hex: '#43168b' },
  { step: 150, hex: '#361275' },
  { step: 160, hex: '#280e5f' },
  { step: 170, hex: '#1e0f26' },
  { step: 180, hex: '#140a19' },
]);

const RED = makeFamily('red', 'Red', [
  { step: 5,   hex: '#fef2f1' },
  { step: 10,  hex: '#fde9e8' },
  { step: 20,  hex: '#fbd0cc' },
  { step: 30,  hex: '#f9bdb8' },
  { step: 40,  hex: '#f8aca6' },
  { step: 50,  hex: '#f69991' },
  { step: 60,  hex: '#f4857c' },
  { step: 70,  hex: '#f27066' },
  { step: 80,  hex: '#f0594d' },
  { step: 90,  hex: '#ee392b' },
  { step: 100, hex: '#ea1100' },
  { step: 110, hex: '#ce0f00' },
  { step: 120, hex: '#b70d00' },
  { step: 130, hex: '#a20c00' },
  { step: 140, hex: '#8d0a00' },
  { step: 150, hex: '#780900' },
  { step: 160, hex: '#630700' },
  { step: 170, hex: '#500600' },
  { step: 180, hex: '#3d0400' },
]);

const SPARK = makeFamily('spark', 'Spark', [
  { step: 5,   hex: '#fffcf4' },
  { step: 10,  hex: '#fef6de' },
  { step: 20,  hex: '#fff3d2' },
  { step: 30,  hex: '#ffedbc' },
  { step: 40,  hex: '#ffe7a6' },
  { step: 50,  hex: '#fbe298' },
  { step: 60,  hex: '#ffda79' },
  { step: 70,  hex: '#ffd463' },
  { step: 80,  hex: '#ffce4d' },
  { step: 90,  hex: '#ffc836' },
  { step: 100, hex: '#ffc220' },
  { step: 110, hex: '#e6a31d' },
  { step: 120, hex: '#cc851a' },
  { step: 130, hex: '#b36a16' },
  { step: 140, hex: '#995213' },
  { step: 150, hex: '#803d10' },
  { step: 160, hex: '#662b0d' },
  { step: 170, hex: '#4d1c0a' },
  { step: 180, hex: '#330f06' },
]);

const TEAL = makeFamily('teal', 'Teal', [
  { step: 5,   hex: '#f0f9fb' },
  { step: 10,  hex: '#e1f3f8' },
  { step: 20,  hex: '#c3e7ef' },
  { step: 30,  hex: '#a3dbe9' },
  { step: 40,  hex: '#82cfe1' },
  { step: 50,  hex: '#5dc3da' },
  { step: 60,  hex: '#25b6d3' },
  { step: 70,  hex: '#00a9c6' },
  { step: 80,  hex: '#009ab7' },
  { step: 90,  hex: '#008daa' },
  { step: 100, hex: '#00809e' },
  { step: 110, hex: '#00748f' },
  { step: 120, hex: '#00667f' },
  { step: 130, hex: '#005a6f' },
  { step: 140, hex: '#004d5f' },
  { step: 150, hex: '#00404f' },
  { step: 160, hex: '#00333f' },
  { step: 170, hex: '#00262f' },
  { step: 180, hex: '#001a1f' },
]);

const YELLOW = makeFamily('yellow', 'Yellow', [
  { step: 5,   hex: '#fffef2' },
  { step: 10,  hex: '#fffee6' },
  { step: 20,  hex: '#fffccc' },
  { step: 30,  hex: '#fffbb3' },
  { step: 40,  hex: '#fffa99' },
  { step: 50,  hex: '#fff980' },
  { step: 60,  hex: '#fff766' },
  { step: 70,  hex: '#fff64d' },
  { step: 80,  hex: '#fff533' },
  { step: 90,  hex: '#fff31a' },
  { step: 100, hex: '#fff200' },
  { step: 110, hex: '#e6cb00' },
  { step: 120, hex: '#cca700' },
  { step: 130, hex: '#b38600' },
  { step: 140, hex: '#996900' },
  { step: 150, hex: '#804f00' },
  { step: 160, hex: '#663800' },
  { step: 170, hex: '#4d2500' },
  { step: 180, hex: '#331500' },
]);

/** Special single-value tokens */
const SPECIAL: PrimitiveColorFamily = {
  family: 'special',
  label: 'Special',
  tokens: [
    { name: '--ld-primitive-color-black', shortName: 'black', family: 'special', step: 0, hex: '#000000' },
    { name: '--ld-primitive-color-white', shortName: 'white', family: 'special', step: 0, hex: '#ffffff' },
  ],
};

// ─── Public exports ───────────────────────────────────────────────────────────

export const PRIMITIVE_COLOR_FAMILIES: PrimitiveColorFamily[] = [
  SPECIAL,
  GRAY,
  BLUE,
  CYAN,
  TEAL,
  GREEN,
  SPARK,
  YELLOW,
  ORANGE,
  RED,
  PINK,
  PURPLE,
];

/** Flat list of every primitive color token */
export const ALL_PRIMITIVE_COLOR_TOKENS: PrimitiveColorToken[] = PRIMITIVE_COLOR_FAMILIES.flatMap(f => f.tokens);

/** Token name → hex lookup */
export const PRIMITIVE_HEX_MAP: Record<string, string> = Object.fromEntries(
  ALL_PRIMITIVE_COLOR_TOKENS.map(t => [t.name, t.hex]),
);

/**
 * Given a stored override value (e.g. "var(--ld-primitive-color-blue-100)"),
 * extract the primitive token name. Returns null if not a primitive var().
 */
export function parsePrimitiveVar(value: string): string | null {
  const match = value.trim().match(/^var\((--ld-primitive-color-[^)]+)\)$/);
  return match ? match[1] : null;
}

/**
 * Convert a primitive token name to its `var()` reference string.
 * e.g. "--ld-primitive-color-blue-100" → "var(--ld-primitive-color-blue-100)"
 */
export function toPrimitiveVar(tokenName: string): string {
  return `var(${tokenName})`;
}
