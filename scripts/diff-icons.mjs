import fs from 'fs';

const exportIcons = fs.readdirSync('_builder-export/client/components/icons')
  .filter(f => f.endsWith('.tsx') && f !== 'index.tsx' && f !== 'index.ts');
const currentIcons = fs.readdirSync('client/components/icons')
  .filter(f => f.endsWith('.tsx') && f !== 'index.tsx');

// Current project uses Foo.tsx naming, export uses FooIcon.tsx
const currentSet = new Set(currentIcons.map(f => f.replace('.tsx', '')));

const missing = [];
for (const file of exportIcons) {
  const base = file.replace('Icon.tsx', '').replace('.tsx', '');
  if (!currentSet.has(base) && !currentSet.has(base + 'Icon')) {
    missing.push(file);
  }
}

console.log('Icons in export but NOT in current project: ' + missing.length);
missing.forEach(m => console.log(m));
