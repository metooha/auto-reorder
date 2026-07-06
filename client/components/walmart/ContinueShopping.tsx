import { useDragScroll } from '@/hooks/useDragScroll';
import { WCPItemTile, ItemTileBadgeType } from '@/components/walmart/WCPItemTile';
import { PRODUCT_IMAGES } from '@/components/walmart/productImages';
import styles from './ContinueShopping.module.css';


interface ProductCard {
  image: string;
  name: string;
  price: string;
  cents: string;
  originalPrice?: string;
  pricePrefix?: string;
  priceSuffix?: string;
  badge?: { label: string; type: ItemTileBadgeType };
}

interface Category {
  title: string;
  products: ProductCard[];
}

const CATEGORIES: Category[] = [
  {
    title: 'Handbags & accessories',
    products: [
      {
        image: PRODUCT_IMAGES.hoboBagGreen,
        name: 'Gaekeao Hobo Shoulder Bag',
        price: '34',
        cents: '99',
        originalPrice: '$49.99',
        pricePrefix: 'Now',
        badge: { label: 'Rollback', type: 'rollback' },
      },
      {
        image: PRODUCT_IMAGES.brownTote,
        name: "Women's Leather Satchel...",
        price: '59',
        cents: '99',
        badge: { label: 'Best seller', type: 'bestseller' },
      },
      {
        image: PRODUCT_IMAGES.ivoryToteSet,
        name: 'MKP Collection Tote Bag Set',
        price: '44',
        cents: '99',
        originalPrice: '$64.99',
        pricePrefix: 'Now',
        badge: { label: 'Rollback', type: 'rollback' },
      },
      {
        image: PRODUCT_IMAGES.hoboBagBrown,
        name: 'Classic Hobo Crossbody Bag',
        price: '29',
        cents: '98',
        badge: { label: 'Popular pick', type: 'popular' },
      },
    ],
  },
  {
    title: 'Furniture finds',
    products: [
      {
        image: PRODUCT_IMAGES.boucleArmchair,
        name: 'Boucle Accent Armchair',
        price: '159',
        cents: '00',
        originalPrice: '$219.00',
        pricePrefix: 'Now',
        badge: { label: 'Rollback', type: 'rollback' },
      },
      {
        image: PRODUCT_IMAGES.pinkSofaBed,
        name: 'Adjustable Folding Sofa Bed...',
        price: '249',
        cents: '99',
        badge: { label: 'Best seller', type: 'bestseller' },
      },
      {
        image: PRODUCT_IMAGES.leatherArmchairDetail,
        name: 'Mid-Century Wood Armchair',
        price: '189',
        cents: '00',
        badge: { label: 'Popular pick', type: 'popular' },
      },
      {
        image: PRODUCT_IMAGES.leatherArmchair,
        name: 'Vintage Leather Accent Chair',
        price: '175',
        cents: '00',
        originalPrice: '$229.00',
        pricePrefix: 'Now',
        badge: { label: 'Deal', type: 'deal' },
      },
    ],
  },
  {
    title: 'Blenders & kitchen',
    products: [
      {
        image: PRODUCT_IMAGES.countertopBlender,
        name: 'VAVSEA Countertop Blender',
        price: '49',
        cents: '99',
        originalPrice: '$69.99',
        pricePrefix: 'Now',
        badge: { label: 'Rollback', type: 'rollback' },
      },
      {
        image: PRODUCT_IMAGES.handBlenderSet,
        name: 'Immersion Hand Blender Set',
        price: '29',
        cents: '99',
        badge: { label: 'Best seller', type: 'bestseller' },
      },
      {
        image: PRODUCT_IMAGES.blenderSystem,
        name: 'Ninja DUO Blender & Pro...',
        price: '129',
        cents: '99',
        originalPrice: '$169.99',
        pricePrefix: 'Now',
        badge: { label: 'Rollback', type: 'rollback' },
      },
      {
        image: PRODUCT_IMAGES.personalBlender,
        name: 'NutriBullet Personal Blender',
        price: '59',
        cents: '99',
      },
    ],
  },
  {
    title: 'Robot vacuums',
    products: [
      {
        image: PRODUCT_IMAGES.roomba1,
        name: 'iRobot Roomba i3+ Self-Em...',
        price: '299',
        cents: '99',
        originalPrice: '$449.99',
        pricePrefix: 'Now',
        badge: { label: 'Rollback', type: 'rollback' },
      },
      {
        image: PRODUCT_IMAGES.roomba2,
        name: 'iRobot Roomba s9+ Robot...',
        price: '599',
        cents: '99',
        badge: { label: 'Best seller', type: 'bestseller' },
      },
      {
        image: PRODUCT_IMAGES.roomba3,
        name: 'iRobot Virtual Wall Barrier',
        price: '39',
        cents: '99',
      },
      {
        image: PRODUCT_IMAGES.roomba4,
        name: 'iRobot Roomba i3+ w/ Bas...',
        price: '349',
        cents: '00',
        originalPrice: '$499.00',
        pricePrefix: 'Now',
        badge: { label: 'Deal', type: 'deal' },
      },
    ],
  },
  {
    title: 'Laptops & tech',
    products: [
      {
        image: PRODUCT_IMAGES.laptop1,
        name: 'Lenovo IdeaPad 15.6" Laptop',
        price: '329',
        cents: '00',
        originalPrice: '$399.00',
        pricePrefix: 'Now',
        badge: { label: 'Rollback', type: 'rollback' },
      },
      {
        image: PRODUCT_IMAGES.laptop2,
        name: 'Acer Chromebook 15.6", 8GB',
        price: '279',
        cents: '00',
        badge: { label: 'Best seller', type: 'bestseller' },
      },
      {
        image: PRODUCT_IMAGES.cordlessVacuum,
        name: 'Cordless Stick Vacuum Clea...',
        price: '89',
        cents: '99',
        originalPrice: '$129.99',
        pricePrefix: 'Now',
        badge: { label: 'Rollback', type: 'rollback' },
      },
      {
        image: PRODUCT_IMAGES.cookwareSet,
        name: 'Carote Nonstick Cookware...',
        price: '79',
        cents: '99',
        badge: { label: 'Popular pick', type: 'popular' },
      },
    ],
  },
];

export function ContinueShopping() {
  const scrollRef = useDragScroll();

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Continue shopping</h2>
        <button className={styles.seeAll}>See all</button>
      </div>
      <div className={styles.carousel} ref={scrollRef}>
        {CATEGORIES.map((category) => (
          <div key={category.title} className={styles.categoryCard}>
            <div className={styles.categoryHeader}>
              <span className={styles.categoryTitle}>{category.title}</span>
              <a href="#" className={styles.shopAll}>Shop all</a>
            </div>
            <div className={styles.productGrid}>
              {category.products.map((product, i) => (
                <WCPItemTile key={i} {...product} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
