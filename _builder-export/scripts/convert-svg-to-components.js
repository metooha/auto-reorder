#!/usr/bin/env node

/**
 * Script to convert SVG files in client/components/icons to React components
 * Handles both base64 encoded and plain SVG files
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ICONS_DIR = path.join(__dirname, '../client/components/icons');
const OUTPUT_DIR = ICONS_DIR;

// Helper to convert filename to component name
function toComponentName(filename) {
  // Remove .svg extension
  let name = filename.replace('.svg', '');

  // Remove brackets and their contents but keep the text inside
  name = name.replace(/\[LD 3\.5\]\s*/g, '');
  name = name.replace(/\[LD3\.5\]\s*/g, '');
  name = name.replace(/\[WCP\]\s*/g, '');

  // Remove special characters and replace with nothing or space
  name = name.replace(/[^\w\s-]/g, '');

  // Split by space, hyphen, or underscore and capitalize each word
  name = name
    .split(/[\s-_]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

  // Ensure it starts with a capital letter
  name = name.charAt(0).toUpperCase() + name.slice(1);

  // If name starts with a number, prefix with "Icon"
  if (/^\d/.test(name)) {
    name = 'Icon' + name;
  }

  // Add Icon suffix if not present
  if (!name.endsWith('Icon')) {
    name = name + 'Icon';
  }

  return name;
}

// Helper to decode base64 if needed
function decodeSVG(content) {
  // Check if content is base64
  if (!content.includes('<svg')) {
    try {
      return Buffer.from(content, 'base64').toString('utf-8');
    } catch (e) {
      console.error('Failed to decode base64:', e.message);
      return content;
    }
  }
  return content;
}

// Helper to clean up SVG attributes for React
function cleanSVGForReact(svgContent) {
  return svgContent
    // Replace xmlns:xlink with xmlnsXlink
    .replace(/xmlns:xlink=/g, 'xmlnsXlink=')
    // Replace stroke-width with strokeWidth
    .replace(/stroke-width=/g, 'strokeWidth=')
    // Replace stroke-linecap with strokeLinecap
    .replace(/stroke-linecap=/g, 'strokeLinecap=')
    // Replace stroke-linejoin with strokeLinejoin
    .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
    // Replace fill-rule with fillRule
    .replace(/fill-rule=/g, 'fillRule=')
    // Replace clip-rule with clipRule
    .replace(/clip-rule=/g, 'clipRule=')
    // Replace fill-opacity with fillOpacity
    .replace(/fill-opacity=/g, 'fillOpacity=')
    // Replace stroke-opacity with strokeOpacity
    .replace(/stroke-opacity=/g, 'strokeOpacity=')
    // Replace class with className
    .replace(/\sclass=/g, ' className=')
    // Make it more flexible by adding props spreading
    .replace(/<svg\s/, '<svg {...props} ');
}

// Generate React component from SVG content
function generateComponent(componentName, svgContent) {
  const cleanedSVG = cleanSVGForReact(svgContent.trim());
  
  return `import type { SVGProps } from 'react';

export function ${componentName}(props: SVGProps<SVGSVGElement>) {
  return (
    ${cleanedSVG}
  );
}
`;
}

// Main conversion function
async function convertSVGs() {
  const files = fs.readdirSync(ICONS_DIR);
  const svgFiles = files.filter(f => f.endsWith('.svg'));
  
  console.log(`Found ${svgFiles.length} SVG files to convert`);
  
  const converted = [];
  const skipped = [];
  const errors = [];
  
  for (const file of svgFiles) {
    try {
      const filePath = path.join(ICONS_DIR, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const svgContent = decodeSVG(content);
      
      // Skip if not valid SVG
      if (!svgContent.includes('<svg')) {
        skipped.push({ file, reason: 'Not a valid SVG' });
        continue;
      }
      
      const componentName = toComponentName(file);
      const componentCode = generateComponent(componentName, svgContent);
      const outputPath = path.join(OUTPUT_DIR, `${componentName}.tsx`);
      
      // Check if file already exists and is not an SVG
      if (fs.existsSync(outputPath)) {
        const existing = fs.readFileSync(outputPath, 'utf-8');
        // Skip if it's already a proper component (not just exported from this script)
        if (existing.includes('export') && existing.includes('function')) {
          skipped.push({ file, reason: `Component ${componentName}.tsx already exists` });
          continue;
        }
      }
      
      fs.writeFileSync(outputPath, componentCode, 'utf-8');
      converted.push({ file, componentName, outputPath });
      
    } catch (error) {
      errors.push({ file, error: error.message });
    }
  }
  
  // Generate index.ts
  const indexPath = path.join(OUTPUT_DIR, 'index.ts');
  let indexContent = '// Auto-generated icon exports\n\n';

  // Keep existing manual exports
  const manualExports = [
    "export { SparklesIcon } from './SparklesIcon';",
    "export { SparkyAnimation } from './SparkyAnimation';",
    "export { SparkyLookingDown } from './SparkyLookingDown';",
    "export { CartIcon } from './CartIcon';",
    "export { LocationIcon } from './LocationIcon';"
  ];

  indexContent += manualExports.join('\n') + '\n\n';

  // Find ALL .tsx component files (excluding manual ones)
  const allTsxFiles = fs.readdirSync(OUTPUT_DIR)
    .filter(f => f.endsWith('.tsx') && f.endsWith('Icon.tsx'))
    .filter(f => !['SparklesIcon.tsx', 'SparkyAnimation.tsx', 'SparkyLookingDown.tsx', 'CartIcon.tsx', 'LocationIcon.tsx'].includes(f))
    .map(f => f.replace('.tsx', ''))
    .sort();

  // Add all icon components
  for (const componentName of allTsxFiles) {
    indexContent += `export { ${componentName} } from './${componentName}';\n`;
  }

  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  
  // Print summary
  console.log('\n=== Conversion Summary ===\n');
  console.log(`✅ Converted: ${converted.length} files`);
  console.log(`⏭️  Skipped: ${skipped.length} files`);
  console.log(`❌ Errors: ${errors.length} files`);
  
  if (converted.length > 0) {
    console.log('\n--- Converted Components ---');
    converted.slice(0, 10).forEach(({ file, componentName }) => {
      console.log(`  ${file} → ${componentName}.tsx`);
    });
    if (converted.length > 10) {
      console.log(`  ... and ${converted.length - 10} more`);
    }
  }
  
  if (skipped.length > 0) {
    console.log('\n--- Skipped Files ---');
    skipped.slice(0, 5).forEach(({ file, reason }) => {
      console.log(`  ${file}: ${reason}`);
    });
    if (skipped.length > 5) {
      console.log(`  ... and ${skipped.length - 5} more`);
    }
  }
  
  if (errors.length > 0) {
    console.log('\n--- Errors ---');
    errors.forEach(({ file, error }) => {
      console.log(`  ${file}: ${error}`);
    });
  }
  
  console.log(`\n✨ Generated index.ts with ${allTsxFiles.length + 5} exports\n`);
  
  // Save report
  const report = {
    timestamp: new Date().toISOString(),
    converted,
    skipped,
    errors
  };
  
  fs.writeFileSync(
    path.join(__dirname, 'svg-conversion-report.json'),
    JSON.stringify(report, null, 2)
  );
  
  console.log('📄 Detailed report saved to scripts/svg-conversion-report.json\n');
}

// Run the conversion
convertSVGs().catch(console.error);
