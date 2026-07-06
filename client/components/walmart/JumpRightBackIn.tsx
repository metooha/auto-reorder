import { useDragScroll } from '@/hooks/useDragScroll';
import { WCPItemTile, ItemTileBadgeType } from '@/components/walmart/WCPItemTile';
import { PRODUCT_IMAGES } from '@/components/walmart/productImages';
import styles from './JumpRightBackIn.module.css';


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
    title: 'Trending',
    products: [
      {
        image: PRODUCT_IMAGES.countertopBlender,
        name: 'VAVSEA 3-in-1 Blender Sys...',
        price: '169',
        cents: '98',
        originalPrice: '$200.00',
        pricePrefix: 'Now',
        priceSuffix: '/mo',
        badge: { label: 'Best seller', type: 'bestseller' },
      },
      {
        image: PRODUCT_IMAGES.airFryer,
        name: 'Ninja 4 Qt Air Fryer,...',
        price: '98',
        cents: '00',
        badge: { label: 'Best seller', type: 'bestseller' },
      },
      {
        image: PRODUCT_IMAGES.tablet,
        name: 'Roku 50" Select Series TV',
        price: '228',
        cents: '00',
        badge: { label: 'Rollback', type: 'rollback' },
      },
      {
        image: PRODUCT_IMAGES.digitalCamera,
        name: 'Vivitar Popnap Digital Ca...',
        price: '24',
        cents: '88',
        badge: { label: 'Best seller', type: 'bestseller' },
      },
    ],
  },
  {
    title: "Fashion you'll love",
    products: [
      {
        image: PRODUCT_IMAGES.blackCardigan,
        name: 'Athletic Works Women\'s...',
        price: '12',
        cents: '98',
        badge: { label: 'Best seller', type: 'bestseller' },
      },
      {
        image: PRODUCT_IMAGES.leatherHandbag,
        name: 'Women\'s Leather Satchel...',
        price: '59',
        cents: '99',
        badge: { label: 'Best seller', type: 'bestseller' },
      },
      {
        image: PRODUCT_IMAGES.rattanCabinet,
        name: 'Rattan Storage Cabinet,...',
        price: '89',
        cents: '00',
        originalPrice: '$129.00',
        pricePrefix: 'Now',
        badge: { label: 'Rollback', type: 'rollback' },
      },
      {
        image: PRODUCT_IMAGES.personalBlender,
        name: 'NutriBullet Pro 900W Ble...',
        price: '99',
        cents: '95',
        badge: { label: 'Popular pick', type: 'popular' },
      },
    ],
  },
  {
    title: 'Electronics',
    products: [
      {
        image: PRODUCT_IMAGES.tablet,
        name: 'Apple iPad Pro 11" M4 Chi...',
        price: '999',
        cents: '00',
        originalPrice: '$1,099.00',
        pricePrefix: 'Now',
        badge: { label: 'Deal', type: 'deal' },
      },
      {
        image: PRODUCT_IMAGES.digitalCamera,
        name: 'Canon EOS Rebel T7 DSL...',
        price: '479',
        cents: '00',
        badge: { label: 'Best seller', type: 'bestseller' },
      },
      {
        image: PRODUCT_IMAGES.airFryer,
        name: 'Ninja Foodi 6-in-1 Smart...',
        price: '149',
        cents: '99',
      },
      {
        image: PRODUCT_IMAGES.blenderSystem,
        name: 'Ninja Professional Plus B...',
        price: '278',
        cents: '00',
      },
    ],
  },
  {
    title: 'Up to 40% off home',
    products: [
      {
        image: PRODUCT_IMAGES.rattanCabinet,
        name: 'Beautiful 12 Piece Dinner...',
        price: '49',
        cents: '98',
        originalPrice: '$79.99',
        pricePrefix: 'Now',
        badge: { label: 'Rollback', type: 'rollback' },
      },
      {
        image: PRODUCT_IMAGES.leatherHandbag,
        name: 'Decorative Throw Pillow...',
        price: '19',
        cents: '98',
      },
      {
        image: PRODUCT_IMAGES.blackCardigan,
        name: 'Better Homes & Gardens...',
        price: '34',
        cents: '97',
        badge: { label: 'Best seller', type: 'bestseller' },
      },
      {
        image: PRODUCT_IMAGES.cookwareSet,
        name: 'Keurig K-Express Coffee...',
        price: '59',
        cents: '00',
        originalPrice: '$79.00',
        pricePrefix: 'Now',
        badge: { label: 'Best seller', type: 'bestseller' },
      },
    ],
  },
  {
    title: 'Top-rated picks',
    products: [
      {
        image: PRODUCT_IMAGES.comforterSet,
        name: 'Ultra Soft Comforter Set...',
        price: '49',
        cents: '98',
        badge: { label: 'Best seller', type: 'bestseller' },
      },
      {
        image: PRODUCT_IMAGES.cordlessVacuum,
        name: 'Cordless Stick Vacuum...',
        price: '89',
        cents: '99',
        originalPrice: '$129.99',
        pricePrefix: 'Now',
        badge: { label: 'Rollback', type: 'rollback' },
      },
      {
        image: PRODUCT_IMAGES.mugSet,
        name: 'Stoneware Mug Set of 4',
        price: '28',
        cents: '00',
      },
      {
        image: PRODUCT_IMAGES.laptop1,
        name: 'Lenovo IdeaPad 15.6" Lap...',
        price: '329',
        cents: '00',
        originalPrice: '$399.00',
        pricePrefix: 'Now',
        badge: { label: 'Deal', type: 'deal' },
      },
    ],
  },
];

export function JumpRightBackIn() {
  const scrollRef = useDragScroll();

  return (
    <section className={styles.section}>
      <div className={styles.headerRow}>
        <h2 className={styles.heading}>Jump right back in</h2>
        <a href="#" className={styles.viewAll}>View all</a>
      </div>
      <div className={styles.scrollRow} ref={scrollRef}>
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
