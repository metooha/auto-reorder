import { useNavigate } from 'react-router-dom';
import { useWalmartScenario } from '@/contexts/WalmartScenarioContext';
import { WALMART_BASKET_ITEMS } from '@/data/walmartBasket';
import { CondensedItemTile } from '@/components/walmart/CondensedItemTile';
import { X } from '@/components/icons';
import styles from './AddMoreItems.module.css';

// ── Section data ──────────────────────────────────────────────────────────────

interface AddItem {
  id: string;
  image: string;
  name: string;
  price: string;
  cents: string;
}

// ── Basket items to exclude from suggestions ──────────────────────────────────
// Basket contains: Envy Apples, Bettergoods Salsa, Strawberries, Balsamic Chicken,
// Chobani Yogurt, S'mores Spread, SkinnyPop, Cold Pressed OJ, Oatly Milk,
// Cage Free Brown Eggs, Baby Carrots, Honey Nut Cheerios.
// None of the items below appear in that basket.

const SPRING_CLEANING: AddItem[] = [
  {
    id: 'sc1',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fd90e9369c42a4820a3e9eed9cf617b10?width=200',
    name: 'Angel Soft Toilet Paper, 24 Mega Rolls',
    price: '9',
    cents: '25',
  },
  {
    id: 'sc2',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Faa52a7fdf20d49a494421863f8a1e819?width=200',
    name: 'Dreft Baby Laundry Detergent, 50 fl oz',
    price: '15',
    cents: '80',
  },
  {
    id: 'sc3',
    image: 'https://images.ctfassets.net/mjtsjk88qv6a/5XdQyTFwjR5nk5ulrOvuZA/c6403c24356d2a6ee87e326d11799da3/PNG_for_PowerPoint-clx-us-stv-cdw-canister-cherry-blossom-peach-75ct-product-hero-044600607443_194702.482.png?fm=webp&w=200&q=75',
    name: 'Clorox Scentiva Disinfecting Wipes, Cherry Blossom & Peach, 75 ct',
    price: '4',
    cents: '96',
  },
  {
    id: 'sc4',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F76eb5fcd25004ac295b4b7380eee76d8?format=webp&width=200',
    name: 'Hefty Ultra Strong Trash Bags, 13 gal, 40 ct',
    price: '9',
    cents: '97',
  },
];

const GROCERIES: AddItem[] = [
  {
    id: 'gr1',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fc9f82aaab7bd43a7b3e682bbe6f7f7bd?width=200',
    name: 'Fresh Blueberries, 1 pt',
    price: '4',
    cents: '98',
  },
  {
    id: 'gr2',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fa47f4e68c9df4012903189f6cf074bec?width=200',
    name: 'Fresh Bananas, each',
    price: '0',
    cents: '23',
  },
  {
    id: 'gr3',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F611adfc04751425ea0c1d4d27b589a7f?format=webp&width=200',
    name: 'Marketside Organic Romaine Hearts, 3 ct',
    price: '3',
    cents: '48',
  },
  {
    id: 'gr4',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F817d87905c27422a92efee656f26ff87?format=webp&width=200',
    name: 'Great Value Shredded Mozzarella Cheese, 32 oz',
    price: '8',
    cents: '48',
  },
];

const BREAKFAST: AddItem[] = [
  {
    id: 'br1',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fd380b7dc612342bd96794e31c02002b8?width=200',
    name: 'Great Value Large Eggs, 12 Count',
    price: '3',
    cents: '25',
  },
  {
    id: 'br2',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F9e7ff61bbd44483fbbf9b314462714e3?format=webp&width=200',
    name: 'Thomas Original English Muffins, 6 ct',
    price: '4',
    cents: '27',
  },
  {
    id: 'br3',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F44533e3557be4321a22b53c7fdf00ca6?format=webp&width=200',
    name: 'Jimmy Dean Original Sausage, 16 oz',
    price: '6',
    cents: '98',
  },
  {
    id: 'br4',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Ff22fb0219b6042b087eb696f61171ecb?format=webp&width=200',
    name: 'Yoplait Original Strawberry Yogurt, 6 oz',
    price: '0',
    cents: '98',
  },
];

const SNACKS: AddItem[] = [
  {
    id: 'sn1',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F7efa55b82a454e1bb30b1fb9f1985f60?width=200',
    name: 'Ritz Original Crackers, Family Size',
    price: '5',
    cents: '98',
  },
  {
    id: 'sn2',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F5d92ba87300544b48bf113aadc9676f0?format=webp&width=200',
    name: 'Great Value Trail Mix, 30 oz',
    price: '7',
    cents: '98',
  },
  {
    id: 'sn3',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fb2b58c7a91594686be2cb0913468395e?format=webp&width=200',
    name: 'Oreo Chocolate Sandwich Cookies, 14.3 oz',
    price: '4',
    cents: '28',
  },
  {
    id: 'sn4',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F238c72ec070b4a08baba337c9404c8bf?format=webp&width=200',
    name: "Lay's Classic Potato Chips, 8 oz",
    price: '4',
    cents: '48',
  },
];

const BEVERAGES: AddItem[] = [
  {
    id: 'bv1',
    image: 'https://i5.walmartimages.com/seo/Dunkin-Butter-Pecan-Artificially-Flavored-Coffee-Ground-Coffee-11-oz-Bag_f819a828-d669-4287-9c61-e6cae09d9aa2.ea12cc15a61f9c05dda873933459ffc2.jpeg?odnHeight=573&odnWidth=573&odnBg=FFFFFF',
    name: "Dunkin' Butter Pecan Ground Coffee, 11 oz",
    price: '12',
    cents: '98',
  },
  {
    id: 'bv2',
    image: 'https://i5.walmartimages.com/seo/Nescaf-Taster-s-Choice-French-Roast-Medium-Dark-Roast-Instant-Coffee-7-oz_3decc6aa-5c5f-4758-8db6-c60868907e6f.9950f386c8b52697f15cc3497f997aae.jpeg?odnHeight=573&odnWidth=573&odnBg=FFFFFF',
    name: "NESCAFÉ Taster's Choice French Roast, 7 oz",
    price: '14',
    cents: '48',
  },
  {
    id: 'bv3',
    image: 'https://i5.walmartimages.com/seo/Fire-Department-Coffee-Shellback-Espresso-Premium-Ground-Coffee-Medium-Roast-12-oz_e4950920-a4a2-414c-8bf4-ddb35420c8d0.e5207cd8756ad9293720873d21db0963.jpeg?odnHeight=573&odnWidth=573&odnBg=FFFFFF',
    name: 'Fire Department Coffee Shellback Espresso, 12 oz',
    price: '16',
    cents: '99',
  },
  {
    id: 'bv4',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F87885bbbf6f542f0be2b9029cbe010d9?format=webp&width=200',
    name: 'Great Value Spring Water, 24 pk, 16.9 fl oz',
    price: '3',
    cents: '98',
  },
];

// ── Page ─────────────────────────────────────────────────────────────────────

function SuggestionCarousel({ items }: { items: AddItem[] }) {
  const { addedDeliveryItems, setDeliveryItemQuantity } = useWalmartScenario();

  return (
    <div className={styles.carousel}>
      {items.map((item) => {
        const priceNum = parseFloat(`${item.price}.${item.cents.padStart(2, '0')}`);
        const added = addedDeliveryItems.find((a) => a.id === item.id);
        return (
          <div key={item.id} className={styles.tileWrap}>
            <CondensedItemTile
              image={item.image}
              price={item.price}
              cents={item.cents}
              name={item.name}
              variant="primary"
              fillContainer
              quantity={added?.quantity ?? 0}
              addToCartVariant="primary-alt"
              onAddToCart={(qty) =>
                setDeliveryItemQuantity(
                  { id: item.id, image: item.image, name: item.name, price: priceNum },
                  qty,
                )
              }
            />
          </div>
        );
      })}
    </div>
  );
}

export default function AddMoreItems() {
  const navigate = useNavigate();
  const { addedDeliveryItems, setShouldExpandLOC } = useWalmartScenario();

  const handleClose = () => {
    setShouldExpandLOC(true);
    navigate('/walmart', { state: { skipSplash: true } });
  };

  const allItems = [
    ...WALMART_BASKET_ITEMS.map((i) => ({ price: i.price, cents: i.cents, quantity: i.quantity })),
    ...addedDeliveryItems.map((i) => ({
      price: String(Math.floor(i.price)),
      cents: String(Math.round((i.price % 1) * 100)).padStart(2, '0'),
      quantity: i.quantity,
    })),
  ];
  const itemCount = allItems.reduce((s, i) => s + i.quantity, 0);
  const subtotal = allItems
    .reduce((s, i) => s + parseFloat(`${i.price}.${i.cents.padStart(2, '0')}`) * i.quantity, 0)
    .toFixed(2);

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerText}>
          <h1 className={styles.headerTitle}>Add to this week's delivery?</h1>
          <p className={styles.headerSubtitle}>You might be running low on these items.</p>
        </div>
        <button
          type="button"
          className={styles.closeBtn}
          aria-label="Close"
          onClick={handleClose}
        >
          <X width={20} height={20} />
        </button>
      </div>

      {/* Sections — all in one white card with dividers */}
      <div className={styles.sections}>
        <div className={styles.sectionsCard}>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Start spring cleaning early</h2>
            <SuggestionCarousel items={SPRING_CLEANING} />
          </div>

          <div className={styles.divider} />

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Other groceries you might need</h2>
            <SuggestionCarousel items={GROCERIES} />
          </div>

          <div className={styles.divider} />

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Breakfast essentials</h2>
            <SuggestionCarousel items={BREAKFAST} />
          </div>

          <div className={styles.divider} />

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Snacks & treats</h2>
            <SuggestionCarousel items={SNACKS} />
          </div>

          <div className={styles.divider} />

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Coffee & drinks</h2>
            <SuggestionCarousel items={BEVERAGES} />
          </div>
        </div>
      </div>

      {/* Sticky footer */}
      <div className={styles.footer}>
        <span className={styles.footerItems}>{itemCount} items</span>
        <span className={styles.footerSubtotal}>
          <strong>Subtotal: </strong>${subtotal}
        </span>
      </div>
    </div>
  );
}
