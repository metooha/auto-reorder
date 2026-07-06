import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@/components/ui/IconButton';
import { ChevronDown, Email, Gear } from '@/components/icons';
import { Breadcrumb, BreadcrumbItem } from '@/components/ui/Breadcrumb';
import { Divider } from '@/components/ui/Divider';
import { ResponsiveLayout } from '@/components/walmart/ResponsiveLayout';
import { SkylineBanner } from '@/components/walmart/SkylineBanner';
import { AccountSideNav } from '@/components/walmart/AccountSideNav';
import {
  PurchaseHistoryFilters,
  FilterState,
  INITIAL_FILTERS,
} from '@/components/walmart/purchase-history/PurchaseHistoryFilters';
import { ReviewPromptBanner } from '@/components/walmart/purchase-history/ReviewPromptBanner';
import { OrderCard, OrderCardProps } from '@/components/walmart/purchase-history/OrderCard';
import { AutoCareOrderCard } from '@/components/walmart/purchase-history/AutoCareOrderCard';
import { CombinedOrderCard } from '@/components/walmart/purchase-history/CombinedOrderCard';
import { CurbsideOrderCard } from '@/components/walmart/purchase-history/CurbsideOrderCard';
import { InlineAdBanner } from '@/components/walmart/purchase-history/InlineAdBanner';
import { DelayedDeliveryCard } from '@/components/walmart/purchase-history/DelayedDeliveryCard';
import styles from './PurchaseHistory.module.css';

const CDN = 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F';

function img(hash: string, alt: string) {
  return { src: `${CDN}${hash}?format=webp&width=800&height=1200`, alt };
}

// ── Product image map ─────────────────────────────────────────────────────────
const P = {
  bananas:        img('3722ac211f454e0e981b44c68bd71f32', 'Organic Bananas'),
  avocado:        img('5d243d5fa5384060878d8e665e30b97a', 'Avocado'),
  blueberries:    img('23fbfba8c5334a6e97499ee2bcbdeeed', 'Blueberries'),
  strawberries:   img('182fe6cfc6cc4e94935dbbe85d069c17', 'Strawberries'),
  blackberries:   img('253d78e864f649acb54e079fbeeb861c', 'Blackberries'),
  grapefruit:     img('32f015c99b914a939d4da0575ea302ef', 'Grapefruit'),
  redOnion:       img('c0aac98a03ab445db944c2155809258d', 'Red Onion'),
  milk:           img('4275c57e09134f118110d61ffaed7f3e', 'Great Value Whole Milk'),
  eggs:           img('78ef20205e3c4c4d89a0402b3651cfaf', 'Great Value Cage Free Eggs'),
  peanutButter:   img('49b526ad3c9e44438dccecf8e3a1f030', 'Adams Peanut Butter'),
  chexMix:        img('3b1c6c21fa734099a7e94fb02336f7a3', 'Chex Mix Traditional Multipack'),
  cereal:         img('2e3ad9b09a894c658b053653b52ae341', 'Great Value Frosted Shredded Wheat'),
  tide:           img('1dc32c7426d2475a943854ef53106014', 'Tide Ultra OXI Detergent'),
  bounce:         img('439fe5b0b4304c4a921ed8602bb1f23c', 'Bounce Mega Sheets'),
  angelSoft:      img('e07a9fb025044c9bb8479349a197c015', 'Angel Soft Toilet Paper'),
  vivaPaperTowels:img('41ab56aab7094eae9aa760136cc98eeb', 'Viva Paper Towels'),
  wateringCan:    img('3807f1f88c0f42ab974b5b59ab07ff8b', 'Black Metal Watering Can'),
  adirondackChair:img('062bc77cad8f44b7b33114eaa7bbaac4', 'Modern Adirondack Chair'),
  rug:            img('e7df4cf2e5c3498291fbdd29d6a604b7', 'Striped Area Rug'),
  firePit:        img('0c564c139118430c914ca80d9fe80dc9', 'Outdoor Fire Pit'),
  jblSpeaker:     img('009b0a2bda494171b74c4d0b9be9467d', 'JBL Clip 3 Bluetooth Speaker'),
  kitchenAid:     img('871a9d01d15e4344aeddd828e6ad96a4', 'KitchenAid Artisan Stand Mixer'),
  nutrBullet:     img('d97202fbf7544db59d1672fca554125c', 'NutriBullet Pro Blender'),
  nintendoSwitch: img('117a3b8c29e94104986149ff470e0f0b', 'Nintendo Switch™'),
  marioKart:      img('f58f628972ee4b62a864595c74d87835', 'Mario Kart 8 Deluxe'),
};

const GEICO_LOGO = `${CDN}e49854d53dde4904a3644e06872e21b1?format=webp&width=800&height=1200`;
const GEICO_AD   = `${CDN}b7ecbf94d42b4e7aafd823d851677509?format=webp&width=800&height=1200`;
const REVIEW_CTA = `${CDN}76440250dedc40518f93ea76656ae0eb?format=webp&width=800&height=1200`;

const REVIEW_PRODUCTS = [
  { name: P.nintendoSwitch.alt, imageSrc: P.nintendoSwitch.src, rating: 3.5 },
  { name: P.marioKart.alt,      imageSrc: P.marioKart.src,      rating: 4.5 },
];

// ── Card data for prompt-driven card patterns ─────────────────────────────────
// These data objects are referenced by the special cards rendered below ReviewPromptBanner.
// They are NOT part of the filterable ORDERS list.

const COMBINED_CARD_AUTO = {
  orderType: 'auto' as const,
  location: 'Carrollton Supercenter at 1213 Trinity Mills Rd',
  statusHeading: 'Sat, Mar 7, 10:00am–11:00am',
  products: [] as { src: string; alt: string }[],
  serviceDetails: {
    vehicle: '2019 Toyota Camry',
    services: ['Conventional Oil & Filter Change', 'Tire Rotation'],
    serviceItems: [
      {
        name: 'Conventional Oil & Filter Change',
        variant: 'Conventional oil - Pennzoil',
        price: '$29.88',
        capacity: 'Up to 5 qts.',
        notes: [
          'Additional charges may apply if more oil is needed.',
          'Package selections can be changed at the store.',
        ],
      },
      {
        name: 'Tire Rotation',
        variant: 'Standard 4-tire rotation',
        price: '$14.88',
        notes: ['Includes inspection of tread depth and tire pressure.'],
      },
    ],
    appointmentContact: 'Marcus Johnson',
    storePhone: '(972) 466-2228',
    storeHours: '7am to 7pm',
    serviceInstructions: 'Please check the cabin air filter as well. Last replaced about 2 years ago.',
  },
  orderTotal: '$89.88',
  actions: [
    { label: 'Check in', variant: 'primary' as const },
    { label: 'Reschedule', variant: 'secondary' as const },
    { label: 'View details', variant: 'secondary' as const },
  ],
};

const COMBINED_CARD_DELIVERY = {
  orderType: 'curbside' as const,
  location: 'Carrollton Supercenter at 1213 Trinity Mills Rd',
  statusHeading: 'Sat, Mar 7, 12:00pm–1:00pm',
  timelineStep: 'placed' as const,
  timelineVariant: 'pickup' as const,
  addItemsBanner: '1hr 20min left to add to your order',
  products: [P.milk, P.eggs, P.bananas, P.avocado, P.redOnion, P.blueberries],
  orderTotal: '$85.00',
  actions: [
    { label: 'Get it now', variant: 'primary' as const },
    { label: 'Edit items', variant: 'secondary' as const },
    { label: 'View details', variant: 'secondary' as const },
  ],
};

const DELAYED_CARD = {
  orderType: 'delivery' as const,
  statusHeading: 'Delayed, estimated up to 2 hours',
  delayEstimate: 'Estimated up to 2 hours late',
  products: [P.strawberries, P.blueberries, P.bananas] as { src: string; alt: string }[],
  orderTotal: '$32.47',
};

// Auto Care engagement prompt cards (used by prompt injector)
const AUTO_CARE_MAINTENANCE_CARD = {
  vehicle: '2019 Toyota Camry',
  mileage: '22,450 miles',
  healthScore: 62,
  location: 'Carrollton Supercenter · Auto Care Center',
  illustration: `${CDN}f991ec87514645ea86e2480394f1c3fd?format=webp&width=800`,
  items: [
    { name: 'Oil Change', status: 'overdue', detail: '3,200 mi overdue', price: '$29.88' },
    { name: 'Tire Rotation', status: 'due', detail: 'Due in ~800 mi', price: '$14.88' },
    { name: 'Wiper Blades', status: 'good', detail: 'Next: Oct 2026' },
  ],
  bundleSavings: 'Bundle oil change + tire rotation —',
  bundleSavingsAmount: '$12',
  valueStatement:
    'Walmart Auto Care is up to 40% less than dealership prices. Same-day availability. No hidden fees.',
};

const AUTO_CARE_UPSELL_OFFER = {
  vehicle: '2019 Toyota Camry',
  vehicleSub: 'Last serviced 3,200 miles ago',
  serviceName: 'Tire Rotation',
  discountPct: 20,
  regularPrice: '$14.88',
  memberPrice: '$11.90',
  savings: '$2.98',
  expiresInDays: 2,
  terms:
    'Valid at Carrollton Supercenter Auto Care. One vehicle per offer. Walmart+ membership required.',
  illustration: `${CDN}f991ec87514645ea86e2480394f1c3fd?format=webp&width=800`,
  valueBullets: [
    'Walmart-certified technicians',
    'Free multi-point inspection included',
    'Same-day service available',
  ],
};

// ── Order data with filter metadata ──────────────────────────────────────────
interface OrderEntry {
  id: string;
  card: OrderCardProps;
  date: Date;
  orderStatus: 'in-progress' | 'completed';
  hasReturn: boolean;
  isInStore: boolean;
  isOnline: boolean;
  searchText: string;
}

function makeSearchText(card: OrderCardProps): string {
  return [
    card.statusHeading,
    card.orderType,
    card.location ?? '',
    card.seller ?? '',
    ...(card.products?.map(p => p.alt) ?? []),
  ].join(' ').toLowerCase();
}

const ORDERS: OrderEntry[] = [
  {
    id: 'delivery-onway-may12',
    date: new Date(2026, 1, 25),
    orderStatus: 'in-progress',
    hasReturn: false,
    isInStore: false,
    isOnline: true,
    card: {
      orderType: 'delivery',
      statusHeading: 'Arrives today, 5pm–6pm',
      timelineStep: 'on-the-way',
      products: [P.tide, P.bounce, P.angelSoft, P.vivaPaperTowels],
      orderTotal: '$67.13',
      actions: [
        { label: 'Track order', variant: 'primary' },
        { label: 'View details', variant: 'secondary' },
      ],
    },
    get searchText() { return makeSearchText(this.card); },
  },
  {
    id: 'delivery-mar4',
    date: new Date(2026, 1, 15),
    orderStatus: 'completed',
    hasReturn: true,
    isInStore: false,
    isOnline: true,
    card: {
      orderType: 'delivery',
      statusHeading: 'Delivered on Feb 15',
      timelineStep: 'delivered',
      products: [P.bananas, P.milk, P.eggs, P.avocado, P.strawberries, P.blueberries, P.redOnion, P.blackberries],
      orderTotal: '$67.43',
      showStartReturn: true,
      actions: [{ label: 'View details', variant: 'secondary' }],
    },
    get searchText() { return makeSearchText(this.card); },
  },
  {
    id: 'delivery-mar8',
    date: new Date(2026, 1, 10),
    orderStatus: 'completed',
    hasReturn: true,
    isInStore: false,
    isOnline: true,
    card: {
      orderType: 'delivery',
      statusHeading: 'Delivered on Feb 10',
      timelineStep: 'delivered',
      products: [P.blueberries, P.strawberries, P.grapefruit, P.bananas, P.milk, P.tide],
      orderTotal: '$67.13',
      returnNotice: 'You still have items to return in this order',
      returnDeadline: 'Jun 22',
      actions: [{ label: 'View details', variant: 'secondary' }],
    },
    get searchText() { return makeSearchText(this.card); },
  },
  {
    id: 'shipping-mar5-electronics',
    date: new Date(2026, 0, 28),
    orderStatus: 'completed',
    hasReturn: true,
    isInStore: false,
    isOnline: true,
    card: {
      orderType: 'shipping',
      seller: 'WorldWide Inc',
      fulfilledBy: 'Walmart',
      statusHeading: 'Delivered on Jan 28',
      timelineStep: 'delivered',
      products: [P.nintendoSwitch, P.marioKart, P.jblSpeaker],
      orderTotal: '$385.00',
      showStartReturn: true,
      actions: [{ label: 'View details', variant: 'secondary' }],
    },
    get searchText() { return makeSearchText(this.card); },
  },
  {
    id: 'shipping-feb28-appliances',
    date: new Date(2026, 0, 20),
    orderStatus: 'completed',
    hasReturn: false,
    isInStore: false,
    isOnline: true,
    card: {
      orderType: 'shipping',
      seller: 'WorldWide Inc',
      fulfilledBy: 'Walmart',
      statusHeading: 'Delivered on Jan 20',
      products: [P.kitchenAid, P.nutrBullet],
      orderTotal: '$289.98',
      actions: [{ label: 'View details', variant: 'secondary' }],
    },
    get searchText() { return makeSearchText(this.card); },
  },
  {
    id: 'curbside-feb25-garden',
    date: new Date(2026, 0, 15),
    orderStatus: 'completed',
    hasReturn: true,
    isInStore: false,
    isOnline: true,
    card: {
      orderType: 'curbside',
      location: 'Carrollton Supercenter at 1213 Trinity Mills Rd',
      statusHeading: 'Picked up on Jan 15',
      timelineVariant: 'pickup',
      products: [P.wateringCan, P.adirondackChair, P.firePit, P.rug],
      orderTotal: '$247.95',
      showStartReturn: true,
      actions: [{ label: 'View details', variant: 'secondary' }],
    },
    get searchText() { return makeSearchText(this.card); },
  },
  {
    id: 'store-feb19-2024',
    date: new Date(2026, 0, 10),
    orderStatus: 'completed',
    hasReturn: true,
    isInStore: true,
    isOnline: false,
    card: {
      orderType: 'store',
      statusHeading: 'Jan 10 purchase',
      products: [P.milk, P.bananas, P.eggs, P.peanutButter, P.cereal, P.chexMix],
      orderTotal: '$45.08',
      showStartReturn: true,
      actions: [{ label: 'View details', variant: 'secondary' }],
    },
    get searchText() { return makeSearchText(this.card); },
  },
];

// ── Filter logic ──────────────────────────────────────────────────────────────
function applyFilters(orders: OrderEntry[], f: FilterState): OrderEntry[] {
  return orders.filter(order => {
    if (f.search.trim()) {
      if (!order.searchText.includes(f.search.trim().toLowerCase())) return false;
    }

    if (f.date) {
      const now = new Date();
      if (f.date === 'last3m') {
        const cutoff = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
        if (order.date < cutoff) return false;
      } else if (f.date === 'last6m') {
        const cutoff = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
        if (order.date < cutoff) return false;
      } else {
        if (order.date.getFullYear().toString() !== f.date) return false;
      }
    }

    if (f.status.length > 0 && !f.status.includes(order.orderStatus)) return false;
    if (f.returnsOnly && !order.hasReturn) return false;
    if (f.inStoreOnly && !order.isInStore) return false;
    if (f.onlineOnly && !order.isOnline) return false;

    return true;
  });
}

// ── Page component ────────────────────────────────────────────────────────────
export default function PurchaseHistory() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [openSection, setOpenSection] = useState<'settings' | null>(null);

  const visibleOrders = useMemo(() => applyFilters(ORDERS, filters), [filters]);

  return (
    <ResponsiveLayout maxWidth="full" mobileActiveTab="user">
      <div className={styles.page}>
        {/* Breadcrumbs */}
        <div className={styles.breadcrumbRow}>
          <Breadcrumb aria-label="Purchase history navigation">
            <BreadcrumbItem href="/account">Account</BreadcrumbItem>
            <BreadcrumbItem isCurrent>Purchase History</BreadcrumbItem>
          </Breadcrumb>
          <div className={styles.breadcrumbActions}>
            <IconButton variant="ghost" size="medium" aria-label="Messages" onClick={() => navigate('/walmart/purchase-history')}>
              <Email style={{ width: 20, height: 20 }} />
            </IconButton>
            <IconButton variant="ghost" size="medium" aria-label="Settings" onClick={() => setOpenSection(s => s === 'settings' ? null : 'settings')}>
              <Gear style={{ width: 20, height: 20 }} />
            </IconButton>
          </div>
        </div>
        <Divider />

        {/* Desktop-only: ad banner */}
        <div className={styles.topSection}>
          <div className={styles.bannerRow}>
            <SkylineBanner
              logoSrc="https://api.builder.io/api/v1/image/assets/TEMP/b1a26e66a9f2b9c467e29b2c6bb339ed58cbcd54?width=154"
              logoAlt="TANYÉ"
              headline="Enhance your kitchen with top tools"
              subtext="Cook like a pro with the best equipment."
              imageSrc={`${CDN}b9a1addd35da48df88f41a3052039cd0?format=webp&width=800&height=1200`}
              imageAlt="TANYÉ product"
            />
          </div>
          <Divider />
        </div>

        {/* Body: side nav + main content */}
        <div className={styles.body}>
          <AccountSideNav openSection={openSection ?? undefined} onSectionChange={setOpenSection} />

          <main className={styles.main}>
            <div className={styles.content}>
              <h1 className={styles.pageTitle}>Purchase History</h1>

              {/* Search + Filters */}
              <PurchaseHistoryFilters filters={filters} onFiltersChange={setFilters} />

              {/* Review Prompt */}
              <ReviewPromptBanner products={REVIEW_PRODUCTS} ctaIllustration={REVIEW_CTA} />

              {/* ── Prompt-driven card patterns ──────────────────────────────
                  Cards below are added/removed here in response to user prompts.
                  Each card is wrapped in styles.newCard to trigger the green glow
                  animation on insert. Remove the wrapper + component to hide.
              ─────────────────────────────────────────────────────────────── */}
              {/* ── Standard order list ───────────────────────────────────── */}
              <div className={styles.orderList}>
                {visibleOrders.length === 0 ? (
                  <p style={{ color: 'var(--ld-semantic-color-text-subtle)', fontSize: 14 }}>
                    No orders match your filters.
                  </p>
                ) : (
                  visibleOrders.map((order, i) => (
                    <div key={order.id}>
                      {i === 3 && (
                        <div style={{ marginBottom: 16 }}>
                          <InlineAdBanner
                            logoSrc={GEICO_LOGO}
                            logoAlt="GEICO"
                            headline="15 minutes could save you on car insurance. Really..."
                            ctaLabel="Get a quote"
                            imageSrc={GEICO_AD}
                            imageAlt="GEICO gecko"
                          />
                        </div>
                      )}
                      {order.card.orderType === 'auto'
                        ? <AutoCareOrderCard {...order.card} />
                        : order.card.orderType === 'curbside'
                          ? <CurbsideOrderCard {...order.card} />
                          : <OrderCard {...order.card} />
                      }
                    </div>
                  ))
                )}
              </div>

              {/* Pagination */}
              <div className={styles.pagination}>
                <IconButton variant="secondary" size="large" aria-label="Next page">
                  <ChevronDown style={{ transform: 'rotate(-90deg)' }} />
                </IconButton>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ResponsiveLayout>
  );
}
