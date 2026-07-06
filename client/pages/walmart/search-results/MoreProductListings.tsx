import { ProductCardList } from "@/components/walmart/ProductCardList";
import { PRODUCT_IMAGES } from "@/components/walmart/productImages";
import styles from "./MoreProductListings.module.css";

const PRODUCTS = [
  {
    flag: 'Deal' as const,
    flagVariant: 'default' as const,
    image: PRODUCT_IMAGES.laptop1,
    price: '1,179',
    cents: '00',
    wasPrice: '$2,499.00',
    name: 'SAMSUNG 55" Class S90C OLED 4K Smart TV QN55S90CAFXZA 2023',
    cue: 'TV with bright screen',
    rating: 4.2,
    ratingCount: '500',
    pickup: '2 pm',
    stock: 'Only 6 left',
  },
  {
    flag: 'Rollback' as const,
    flagVariant: 'red' as const,
    image: PRODUCT_IMAGES.laptop2,
    price: '498',
    cents: '00',
    wasPrice: '$699.99',
    name: 'LG 55" Class QNED 4K LED QNED85T series TV with webOS 24',
    cue: 'TV with bright screen',
    rating: 4.5,
    ratingCount: '151',
    pickup: '2 pm',
    stock: '',
  },
];

export function MoreProductListings() {
  return (
    <div className={styles.wrapper}>
      {PRODUCTS.map((product, i) => (
        <ProductCardList key={i} {...product} />
      ))}
    </div>
  );
}
