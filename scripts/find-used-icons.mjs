import fs from 'fs';
import path from 'path';

// Files that are net-new pages/components (not component-library pages)
const dirsToScan = [
  '_builder-export/client/pages/Index.tsx',
  '_builder-export/client/pages/SearchResults.tsx',
  '_builder-export/client/pages/DressesSearchResults.tsx',
  '_builder-export/client/pages/CerealSearchResults.tsx',
  '_builder-export/client/pages/ProductDetail.tsx',
  '_builder-export/client/pages/PharmacyDelivery.tsx',
  '_builder-export/client/pages/PurchaseHistory.tsx',
  '_builder-export/client/pages/LoadingScreen.tsx',
  '_builder-export/client/pages/index/SearchTypeaheadModal.tsx',
  '_builder-export/client/pages/index/IOSKeyboard.tsx',
  '_builder-export/client/pages/search-results/TrendingBrandsSection.tsx',
  '_builder-export/client/pages/search-results/PopularByPriceSection.tsx',
  '_builder-export/client/pages/search-results/FeatureGuideSection.tsx',
  '_builder-export/client/pages/search-results/MoreProductListings.tsx',
  '_builder-export/client/pages/search-results/KnowTypesSection.tsx',
  '_builder-export/client/components/ResponsiveLayout.tsx',
  '_builder-export/client/components/DesktopHeader.tsx',
  '_builder-export/client/components/DesktopFooter.tsx',
  '_builder-export/client/components/SubNav.tsx',
  '_builder-export/client/components/PromoBanner.tsx',
  '_builder-export/client/components/BottomNav.tsx',
  '_builder-export/client/components/OrderStatusBanner.tsx',
  '_builder-export/client/components/SearchBar.tsx',
  '_builder-export/client/components/DesktopSearchTypeahead.tsx',
  '_builder-export/client/components/DesktopGICDropdown.tsx',
  '_builder-export/client/components/DepartmentsDropdown.tsx',
  '_builder-export/client/components/AccountDropdown.tsx',
  '_builder-export/client/components/ServicesDropdown.tsx',
  '_builder-export/client/components/MoreLinksDropdown.tsx',
  '_builder-export/client/components/ReorderDropdown.tsx',
  '_builder-export/client/components/AddToCart.tsx',
  '_builder-export/client/components/NewArrivalsCarousel.tsx',
  '_builder-export/client/components/CameraModal.tsx',
  '_builder-export/client/components/TempoBanner.tsx',
  '_builder-export/client/components/DetailItem.tsx',
  '_builder-export/client/components/PageTemplate.tsx',
  '_builder-export/client/components/LandingSummary.tsx',
  '_builder-export/client/components/LandingConnection.tsx',
  '_builder-export/client/components/SponsoredProductsCard.tsx',
  '_builder-export/client/components/SponsoredBrandsCard.tsx',
  '_builder-export/client/components/SponsoredVideosCard.tsx',
  '_builder-export/client/components/DisplayAdvertisingSidebar.tsx',
  '_builder-export/client/components/MeasurementConsole.tsx',
  '_builder-export/client/components/Reports.tsx',
  '_builder-export/client/components/ImageIcon.tsx',
];

// New icons (from diff)
const newIconFiles = fs.readFileSync('/tmp/export_icons.txt', 'utf8').trim().split('\n');
const currentIcons = fs.readFileSync('/tmp/current_icons.txt', 'utf8').trim().split('\n');
const currentSet = new Set(currentIcons.map(f => f.replace('.tsx', '')));

const newIcons = newIconFiles
  .map(f => f.trim())
  .filter(f => {
    const base = f.replace('Icon.tsx', '').replace('.tsx', '');
    return !currentSet.has(base) && !currentSet.has(base + 'Icon');
  });

// Read all source files and find icon imports
const usedNewIcons = new Set();
for (const filePath of dirsToScan) {
  if (!fs.existsSync(filePath)) continue;
  const content = fs.readFileSync(filePath, 'utf8');
  for (const iconFile of newIcons) {
    const iconName = iconFile.replace('.tsx', '');
    if (content.includes(iconName)) {
      usedNewIcons.add(iconFile);
    }
  }
}

console.log('New icons actually USED by pages we are porting: ' + usedNewIcons.size);
for (const icon of usedNewIcons) {
  console.log(icon);
}
