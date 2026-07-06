import { useRef, useState, useEffect, useCallback } from 'react';
import { FlashDealsItemTile } from '@/components/walmart/FlashDealsItemTile';
import { PRODUCT_IMAGES } from '@/components/walmart/productImages';
import { ItemTileBadgeType } from '@/components/walmart/WCPItemTile';
import { ChevronRight } from '@/components/icons/ChevronRight';
import styles from './FlashDealsCarousel.module.css';

interface FlashDealItem {
  image: string;
  name: string;
  price: string;
  cents: string;
  originalPrice: string;
  pricePrefix: string;
  badge?: { label: string; type: ItemTileBadgeType };
  optionsText?: string;
  actionType: 'add' | 'options';
  idx: number;
}

const FLASH_DEALS_ITEMS: FlashDealItem[] = [
  {
    image: PRODUCT_IMAGES.flashEarrings,
    name: 'Cate & Chloe McKenzie 18k White Gold Plated Drop Dangle Earrings w...',
    price: '16',
    cents: '28',
    originalPrice: '$39.99',
    pricePrefix: 'Now',
    actionType: 'add',
    idx: 100,
  },
  {
    image: PRODUCT_IMAGES.flashShampoo,
    name: 'Botanic Hearth Tea Tree Shampoo and Conditioner Set for Itchy and Dr...',
    price: '12',
    cents: '00',
    originalPrice: '$24.50',
    pricePrefix: 'Now',
    optionsText: 'More options from $15.00',
    actionType: 'options',
    idx: 101,
  },
  {
    image: PRODUCT_IMAGES.flashHumidifier,
    name: 'ALROCKET 6.5L Large Humidifiers Top Fill Cool Mist Humidifier for for...',
    price: '43',
    cents: '99',
    originalPrice: '$135.99',
    pricePrefix: 'Now',
    badge: { label: 'Clearance', type: 'clearance' },
    actionType: 'add',
    idx: 102,
  },
  {
    image: PRODUCT_IMAGES.flashTankTops,
    name: 'NELEUS Womens Tight Fitting Base Layer Dry Fit Tank Top 3 Pack,Black...',
    price: '19',
    cents: '99',
    originalPrice: '$48.00',
    pricePrefix: 'Now',
    optionsText: 'More options from $19.99',
    actionType: 'options',
    idx: 103,
  },
  {
    image: PRODUCT_IMAGES.flashLaptop,
    name: 'AEEZO 15.6 inch Laptop, 16GB RAM 512GB ROM, Intel Celeron Quad-Cor...',
    price: '239',
    cents: '99',
    originalPrice: '$299.99',
    pricePrefix: 'Now',
    actionType: 'add',
    idx: 104,
  },
  {
    image: PRODUCT_IMAGES.flashExerciseBike,
    name: 'MERACH Stationary Exercise bike with Exclusive Free APP, Indoor Cyc...',
    price: '159',
    cents: '99',
    originalPrice: '$299.99',
    pricePrefix: 'Now',
    actionType: 'add',
    idx: 105,
  },
  {
    image: PRODUCT_IMAGES.headphones,
    name: 'Sony WH-1000XM5 Wireless Industry Leading Noise Canceling Headphones...',
    price: '248',
    cents: '00',
    originalPrice: '$399.99',
    pricePrefix: 'Now',
    badge: { label: 'Clearance', type: 'clearance' },
    actionType: 'add',
    idx: 106,
  },
  {
    image: PRODUCT_IMAGES.airFryer,
    name: 'Ninja AF101 4-Quart Air Fryer with Ceramic Coated Nonstick Basket...',
    price: '69',
    cents: '99',
    originalPrice: '$129.99',
    pricePrefix: 'Now',
    actionType: 'add',
    idx: 107,
  },
  {
    image: PRODUCT_IMAGES.roomba1,
    name: 'iRobot Roomba j7+ Self-Emptying Robot Vacuum Identifies and Avoids...',
    price: '299',
    cents: '99',
    originalPrice: '$599.99',
    pricePrefix: 'Now',
    badge: { label: 'Clearance', type: 'clearance' },
    actionType: 'add',
    idx: 108,
  },
  {
    image: PRODUCT_IMAGES.tablet,
    name: 'Samsung Galaxy Tab A9+ 11" Tablet 64GB Wi-Fi with S Pen Included...',
    price: '179',
    cents: '00',
    originalPrice: '$279.99',
    pricePrefix: 'Now',
    optionsText: 'More options from $159.00',
    actionType: 'options',
    idx: 109,
  },
];

export function FlashDealsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      setStartX(e.pageX - element.offsetLeft);
      setScrollLeft(element.scrollLeft);
      element.style.cursor = 'grabbing';
      element.style.userSelect = 'none';
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - element.offsetLeft;
      element.scrollLeft = scrollLeft - (x - startX) * 2;
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      element.style.cursor = 'grab';
      element.style.userSelect = 'auto';
    };

    const handleMouseLeave = () => {
      if (isDragging) {
        setIsDragging(false);
        element.style.cursor = 'grab';
        element.style.userSelect = 'auto';
      }
    };

    element.addEventListener('mousedown', handleMouseDown);
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseup', handleMouseUp);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.style.cursor = 'grab';

    return () => {
      element.removeEventListener('mousedown', handleMouseDown);
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseup', handleMouseUp);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isDragging, startX, scrollLeft]);

  const scrollRight = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: 400, behavior: 'smooth' });
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.headerRow}>
        <h2 className={styles.heading}>Flash Deals</h2>
        <a href="#" className={styles.viewAll}>View all</a>
      </div>
      <p className={styles.subtitle}>Up to 65% off</p>
      <div className={styles.scrollWrapper}>
        <div className={styles.scrollRow} ref={scrollRef}>
          {FLASH_DEALS_ITEMS.map((item) => (
            <FlashDealsItemTile key={item.idx} {...item} />
          ))}
        </div>
        <button
          type="button"
          className={styles.chevronButton}
          onClick={scrollRight}
          aria-label="Scroll right"
        >
          <ChevronRight className={styles.chevronIcon} />
        </button>
      </div>
    </section>
  );
}
