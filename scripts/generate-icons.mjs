import sharp from 'sharp';
import { writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');
mkdirSync(join(publicDir, 'icons'), { recursive: true });

// Walmart spark SVG on a blue circle background
function makeSVG(size) {
  const pad = size * 0.15;
  const inner = size - pad * 2;
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" rx="${size * 0.22}" fill="#0053E2"/>
  <circle cx="${size/2}" cy="${size/2}" r="${inner/2}" fill="#FFC220"/>
  <path
    transform="translate(${pad},${pad}) scale(${inner/48})"
    d="M24 4L26.4 17.7L34 9L27.7 21.1L42 24L27.7 26.9L34 39L26.4 30.3L24 44L21.6 30.3L14 39L20.3 26.9L6 24L20.3 21.1L14 9L21.6 17.7L24 4Z"
    fill="#0053E2"
  />
</svg>`;
}

const sizes = [180, 192, 512];

for (const size of sizes) {
  const svg = Buffer.from(makeSVG(size));
  const outPath = join(publicDir, 'icons', `icon-${size}.png`);
  await sharp(svg).png().toFile(outPath);
  console.log(`✓ icons/icon-${size}.png`);
}

// Also write apple-touch-icon at root (iOS requires this exact path)
await sharp(Buffer.from(makeSVG(180))).png().toFile(join(publicDir, 'apple-touch-icon.png'));
console.log('✓ apple-touch-icon.png');
