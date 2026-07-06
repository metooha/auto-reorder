import fs from 'fs';
import path from 'path';

// Create directories
const dirs = [
  'public/assets/navigation',
  'public/assets/logos',
  'public/assets/illustrations',
  'public/assets/products',
  'public/assets/heroes',
];
for (const dir of dirs) {
  fs.mkdirSync(dir, { recursive: true });
}

// Copy files helper
function copyFile(src, dest) {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log('Copied: ' + dest);
  } else {
    console.log('Missing: ' + src);
  }
}

// Navigation icons
copyFile('_builder-export/public/icons/heart-active.png', 'public/assets/navigation/heart-active.png');
copyFile('_builder-export/public/icons/heart-inactive.png', 'public/assets/navigation/heart-inactive.png');
copyFile('_builder-export/public/icons/shop-active.png', 'public/assets/navigation/shop-active.png');
copyFile('_builder-export/public/icons/shop-inactive.png', 'public/assets/navigation/shop-inactive.png');
copyFile('_builder-export/public/icons/user-active.png', 'public/assets/navigation/user-active.png');
copyFile('_builder-export/public/icons/user-inactive.png', 'public/assets/navigation/user-inactive.png');

// Logo SVGs
copyFile('_builder-export/public/icons/walmart-plus-logo.svg', 'public/assets/logos/walmart-plus-logo.svg');
copyFile('_builder-export/public/icons/walmart-cash-logo.svg', 'public/assets/logos/walmart-cash-logo.svg');
copyFile('_builder-export/public/icons/subscription-logo.svg', 'public/assets/logos/subscription-logo.svg');

// Lottie JSON files for Sparky animations
const lottieDir = '_builder-export/client/components/icons';
const lottieFiles = fs.readdirSync(lottieDir).filter(f => f.endsWith('.json'));
for (const file of lottieFiles) {
  // Normalize filename
  const normalized = file
    .replace(/^\d+\s+/, '')
    .replace(/\s+/g, '-')
    .toLowerCase();
  copyFile(path.join(lottieDir, file), path.join('client/components/icons', normalized));
}

// Copy specific new icon components that are truly new (no equivalent in current library)
const newIcons = [
  'FulfillmentShippingIcon.tsx',
  'FulfillmentPickupIcon.tsx',
  'FulfillmentDeliveryIcon.tsx',
  'CartIcon.tsx',
  'SparkyLookingDown.tsx',
  'SparkyAnimation.tsx',
  'SparklesIcon.tsx',
  'WalmartCashLogoIcon.tsx',
  'WalmartPlusLogoIcon.tsx',
  'SubscriptionLogoIcon.tsx',
  'CashLogoIcon.tsx',
  'ListsIcon.tsx',
  'ReorderIcon.tsx',
  'PurchaseHistoryIcon.tsx',
  'CloseIcon.tsx',
  'InfoIcon.tsx',
  'LocationIcon.tsx',
  'StoreIcon.tsx',
  'ShippingIcon.tsx',
];

const iconsCustomDir = 'client/components/icons-custom';
fs.mkdirSync(iconsCustomDir, { recursive: true });

for (const icon of newIcons) {
  const src = path.join('_builder-export/client/components/icons', icon);
  if (fs.existsSync(src)) {
    copyFile(src, path.join(iconsCustomDir, icon));
  }
}

console.log('Done!');
