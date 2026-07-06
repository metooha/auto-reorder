import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { Tabs, TabList, Tab, TabPanel } from '@/components/ui/Tab';
import { Search, Star } from '@/components/icons';
import styles from './Assets.module.css';

// ─── Asset data ─────────────────────────────────────────────────────────────

const SPOT_ILLUSTRATIONS = [
  'Arts&Crafts', 'Auto', 'AutoCare', 'AutoCareSavings', 'Baby', 'Backpack',
  'Beauty', 'Books', 'Bottle', 'BurgerKing', 'CakesCustom', 'CalendarWithClock',
  'CashBack', 'CheckoutCart', 'Clothing', 'Community&Giving', 'Coupons', 'Delivery',
  'DormSupplies', 'Drone', 'EVCharging', 'EarlyAccess', 'Electronics', 'Featured',
  'FreeDelivery', 'FreeReturns', 'FuelSavings', 'Gas', 'GiftCard', 'Glasses',
  'Graduation', 'Groceries', 'Grocery', 'Home', 'HomeImprovement',
  'HouseholdEssentials', 'InHome', 'KidsDrawing', 'LimitedTimeOffer',
  'MoneyServices', 'Movies&TV', 'Music&Vinyl', 'MyOrder', 'OilChange',
  'Patio&Garden', 'PersonalCar', 'PetCare', 'PetRX', 'Pets', 'Pharmacy',
  'Photo', 'Pickup', 'Plant', 'PreScheduled',
  'ProgressTracker', 'ProtectionHome&Tech', 'Registry&Gifts', 'Reorder2',
  'Reorder3', 'ReorderGroceries', 'Returns', 'ScanAndGo', 'School',
  'SchoolSupplies', 'SchoolSupplyLists', 'Search', 'Seasonal',
  'ShapesKindergarten', 'Shipping', 'ShoppingList', 'Sports&Outdoors',
  'StoreFront', 'StoreMap', 'StoreSavings', 'Streaming',
  'SubscriptionManagement', 'Tire', 'VideoGames', 'W+Delivery',
  'WalmartBenefits', 'WalmartBusiness', 'WalmartCashTravel', 'WalmartPay',
  'associate-glasses', 'associate-waving', 'network-issue',
];

const PRODUCT_IMAGES = [
  'airpods-max', 'airpods-pro', 'athletic-sneakers', 'cate-chloe',
  'dinnerware-set', 'gaekeao-hobo', 'huffy-bike', 'ipad-pro',
  'marc-jacobs-daisy', 'meta-quest', 'ninja-air-fryer', 'roku-tv',
  'roomba', 'table-lamp', 'vivitar-camera', 'wood-frame',
];

const LOGOS = [
  { name: 'subscription-logo', path: '/assets/logos/subscription-logo.svg' },
  { name: 'walmart-cash-logo', path: '/assets/logos/walmart-cash-logo.svg' },
  { name: 'walmart-plus-logo', path: '/assets/logos/walmart-plus-logo.svg' },
];

// ─── Shared components ──────────────────────────────────────────────────────

function AssetCard({ src, label, copyText }: { src: string; label: string; copyText: string }) {
  const [copied, setCopied] = useState(false);

  const handleClick = useCallback(() => {
    navigator.clipboard.writeText(copyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [copyText]);

  return (
    <div className={styles.assetCard} onClick={handleClick} title={`Click to copy: ${copyText}`}>
      {copied && <span className={styles.copiedBadge}>Copied!</span>}
      <img src={src} alt={label} className={styles.assetImage} loading="lazy" />
      <span className={styles.assetName}>{label}</span>
    </div>
  );
}

function ProductCard({ src, label, copyText }: { src: string; label: string; copyText: string }) {
  const [copied, setCopied] = useState(false);

  const handleClick = useCallback(() => {
    navigator.clipboard.writeText(copyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [copyText]);

  return (
    <div className={`${styles.assetCard}`} onClick={handleClick} title={`Click to copy: ${copyText}`}>
      {copied && <span className={styles.copiedBadge}>Copied!</span>}
      <img src={src} alt={label} className={styles.assetImageLarge} loading="lazy" />
      <span className={styles.assetName}>{label}</span>
    </div>
  );
}

function SearchFilter({ value, onChange, count }: { value: string; onChange: (v: string) => void; count: number }) {
  return (
    <>
      <div className={styles.searchBar}>
        <Search style={{ width: 18, height: 18 }} className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Filter assets..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={styles.searchInput}
        />
      </div>
      {value.trim() && (
        <div className={styles.resultCount}>{count} result{count !== 1 ? 's' : ''}</div>
      )}
    </>
  );
}

// ─── Tab content ────────────────────────────────────────────────────────────

function IllustrationsTab() {
  const [query, setQuery] = useState('');
  const filtered = SPOT_ILLUSTRATIONS.filter(name =>
    name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className={styles.tabContent}>
      <SearchFilter value={query} onChange={setQuery} count={filtered.length} />
      {filtered.length > 0 ? (
        <div className={styles.grid}>
          {filtered.map(name => (
            <AssetCard
              key={name}
              src={`/illustrations/spot-illustration/${name}.svg`}
              label={name}
              copyText={`/illustrations/spot-illustration/${name}.svg`}
            />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>No illustrations match your search.</div>
      )}
    </div>
  );
}

function ProductImagesTab() {
  const [query, setQuery] = useState('');
  const filtered = PRODUCT_IMAGES.filter(name =>
    name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className={styles.tabContent}>
      <SearchFilter value={query} onChange={setQuery} count={filtered.length} />
      {filtered.length > 0 ? (
        <div className={`${styles.grid} ${styles.gridLarge}`}>
          {filtered.map(name => (
            <ProductCard
              key={name}
              src={`/images/products/${name}.jpeg`}
              label={name}
              copyText={`/images/products/${name}.jpeg`}
            />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>No product images match your search.</div>
      )}

      {/* Logos section */}
      <h3 style={{
        fontSize: '16px',
        fontWeight: 700,
        fontFamily: 'var(--ld-semantic-font-family-sans)',
        color: 'var(--ld-semantic-color-text, #2e2f32)',
        margin: '32px 0 16px',
      }}>
        Logos
      </h3>
      <div className={styles.grid}>
        {LOGOS.map(logo => (
          <AssetCard
            key={logo.name}
            src={logo.path}
            label={logo.name}
            copyText={logo.path}
          />
        ))}
      </div>
    </div>
  );
}

function IconsTab() {
  return (
    <div className={styles.tabContent}>
      <Link to="/component-library/icons" className={styles.linkCard}>
        <Star style={{ width: 32, height: 32, color: 'var(--ld-semantic-color-text-brand, #0071dc)', flexShrink: 0 }} />
        <div className={styles.linkCardText}>
          <div className={styles.linkCardTitle}>Icon Library (313 icons)</div>
          <div className={styles.linkCardDesc}>
            Browse and search all Living Design 3.5 icons with a searchable grid, copy import statements, and preview at multiple sizes.
          </div>
        </div>
      </Link>
    </div>
  );
}

// ─── Main page ──────────────────────────────────────────────────────────────

export default function AssetsPage() {
  return (
    <ComponentPageLayout
      section="Getting Started"
      title="Assets"
      description={`Browse ${SPOT_ILLUSTRATIONS.length} illustrations, ${PRODUCT_IMAGES.length} product images, ${LOGOS.length} logos, and 313 icons. Click any asset to copy its path.`}
    >
      <Tabs defaultValue="illustrations">
        <TabList>
          <Tab value="illustrations">Illustrations ({SPOT_ILLUSTRATIONS.length})</Tab>
          <Tab value="products">Product Images & Logos</Tab>
          <Tab value="icons">Icons</Tab>
        </TabList>

        <TabPanel value="illustrations">
          <IllustrationsTab />
        </TabPanel>

        <TabPanel value="products">
          <ProductImagesTab />
        </TabPanel>

        <TabPanel value="icons">
          <IconsTab />
        </TabPanel>
      </Tabs>
    </ComponentPageLayout>
  );
}
