import { useRef, useState, useEffect } from "react";

const useDragScroll = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const element = ref.current;
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
      const walk = (x - startX) * 2;
      element.scrollLeft = scrollLeft - walk;
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

  return ref;
};

const FEATURE_FILTERS = ['Display type', 'Resolution', 'Size', 'Refresh rate', 'HDR', 'Internet services'] as const;

interface FeatureContent {
  title: string;
  image?: string;
  badges?: string[];
  paragraphs: Array<{ bold?: string; text: string }>;
}

const FEATURE_CONTENT: Record<string, FeatureContent> = {
  'Display type': {
    title: 'TV display type',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/d143992c6d26f11fd6b8d8dccd4f3ae258a98c50?width=443',
    badges: ['LED', 'OLED', 'QLED'],
    paragraphs: [
      { bold: 'LED', text: ' is energy-efficient and offer good brightness' },
      { bold: 'OLED', text: ' has superior picture quality with deep blacks, high contrast, and vibrant colors' },
      { bold: 'QLED', text: ' has excellent brightness and color volume, making them suitable for brightly lit rooms' },
    ],
  },
  'Resolution': {
    title: 'Resolution',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/89f108071ecb62cda756ac559cf33877bf909bb9?width=443',
    paragraphs: [
      { text: 'TV resolution depends on factors such as screen size, viewing distance, content availability, and budget' },
      { text: 'Higher resolutions like 4K and 8K offer superior image quality but are more costly and require compatible content to maximize their potential.' },
    ],
  },
  'Size': {
    title: 'Size',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/219ff05d0fbc28d986e9443f08a451c24521ba34?width=443',
    paragraphs: [
      { text: '• The size of TV is measured diagonally from one corner of the screen to the opposite corner' },
      { text: '• Larger TVs require a greater viewing distance to avoid eye strain and to fully appreciate the resolution' },
      { text: '• Larger screens benefit more from higher resolutions (4K, 8k)' },
    ],
  },
  'Refresh rate': {
    title: 'Refresh rate',
    paragraphs: [
      { text: 'Refresh rate is measured in hertz (Hz) and indicates how many times per second the screen updates the image.' },
      { bold: '60Hz', text: ' is standard for most content and suitable for general viewing' },
      { bold: '120Hz', text: ' provides smoother motion, ideal for sports and gaming' },
      { text: 'Higher refresh rates reduce motion blur and provide a more fluid viewing experience' },
    ],
  },
  'HDR': {
    title: 'HDR',
    paragraphs: [
      { text: 'High Dynamic Range (HDR) enhances the contrast and color range of your TV display' },
      { bold: 'HDR10', text: ' is the most common standard, supported by most TVs and streaming services' },
      { bold: 'Dolby Vision', text: ' offers dynamic metadata for scene-by-scene optimization' },
      { text: 'HDR provides brighter highlights, deeper blacks, and more vibrant colors for a more lifelike picture' },
    ],
  },
  'Internet services': {
    title: 'Internet services',
    paragraphs: [
      { text: 'Smart TVs come with built-in streaming platforms and apps for easy access to content' },
      { bold: 'Popular platforms:', text: ' Roku, Fire TV, Google TV, webOS, Tizen' },
      { bold: 'Streaming apps:', text: ' Netflix, Disney+, Hulu, Prime Video, Max, and more' },
      { text: 'Consider which streaming services you use most when choosing a smart TV platform' },
    ],
  },
};

interface ProductGridItem {
  image: string;
  brand: string;
  name: string;
  price: string;
  cents: string;
  isDiscount?: boolean;
  wasPrice?: string;
}

const LED_PRODUCTS: ProductGridItem[] = [
  { image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F4733ab924bac4b9e8f1ce93cff10b1b0', brand: 'Sony', name: "75\" Class 4K UHD OLED Web OS", price: '1,196', cents: '00' },
  { image: 'https://api.builder.io/api/v1/image/assets/TEMP/460234cfde5b27273b347998a50d58c4b868bf85?width=203', brand: 'Samsung', name: "65\" Class 4K UHD OLED Web OS", price: '896', cents: '99' },
  { image: 'https://api.builder.io/api/v1/image/assets/TEMP/c614b80078e729c2d286d75ecaa7bbc9b8a2f95b?width=203', brand: 'Hisense', name: '40-Inch Class H4 Series FHD', price: '124', cents: '00', isDiscount: true, wasPrice: '$168.00' },
  { image: 'https://api.builder.io/api/v1/image/assets/TEMP/89bf7ae11235a6dddbeb882c93f574560f9aaa1f?width=216', brand: 'Sony', name: '65" class BRAVIA 2 II LED 4K', price: '648', cents: '00', isDiscount: true, wasPrice: '$699.00' },
];

const QLED_PRODUCTS: ProductGridItem[] = [
  { image: 'https://api.builder.io/api/v1/image/assets/TEMP/460234cfde5b27273b347998a50d58c4b868bf85?width=203', brand: 'Samsung', name: '65" Q80D QLED 4K Smart TV', price: '1,498', cents: '00', isDiscount: true, wasPrice: '$1,799.00' },
  { image: 'https://api.builder.io/api/v1/image/assets/TEMP/c614b80078e729c2d286d75ecaa7bbc9b8a2f95b?width=203', brand: 'TCL', name: '55" Class Q6 QLED 4K HDR Smart TV', price: '548', cents: '00' },
  { image: 'https://api.builder.io/api/v1/image/assets/TEMP/89bf7ae11235a6dddbeb882c93f574560f9aaa1f?width=216', brand: 'Samsung', name: '75" Q90D QLED 4K Smart TV', price: '2,398', cents: '00' },
  { image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F4733ab924bac4b9e8f1ce93cff10b1b0', brand: 'Hisense', name: '50" U6 Series QLED 4K TV', price: '448', cents: '00', isDiscount: true, wasPrice: '$549.00' },
];

const SMART_TV_PRODUCTS: ProductGridItem[] = [
  { image: 'https://api.builder.io/api/v1/image/assets/TEMP/89bf7ae11235a6dddbeb882c93f574560f9aaa1f?width=216', brand: 'LG', name: '65" C4 OLED Smart TV webOS 24', price: '1,796', cents: '99' },
  { image: 'https://api.builder.io/api/v1/image/assets/TEMP/c614b80078e729c2d286d75ecaa7bbc9b8a2f95b?width=203', brand: 'Roku', name: '43" Class Select Series FHD Smart TV', price: '178', cents: '00', isDiscount: true, wasPrice: '$228.00' },
  { image: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F4733ab924bac4b9e8f1ce93cff10b1b0', brand: 'Amazon', name: '40" Omni Series Fire TV', price: '149', cents: '99', isDiscount: true, wasPrice: '$199.99' },
  { image: 'https://api.builder.io/api/v1/image/assets/TEMP/460234cfde5b27273b347998a50d58c4b868bf85?width=203', brand: 'Vizio', name: '50" V-Series 4K Smart TV', price: '398', cents: '00' },
];

function SparkyPrompt() {
  return (
    <div className="px-2 py-2 rounded-lg overflow-hidden flex items-center gap-2 justify-center" style={{ backgroundColor: 'rgb(255, 241, 204)' }}>
      <img src="https://api.builder.io/api/v1/image/assets/TEMP/e6442890e015ad1141f494e8b54033267eef00c5?width=44" alt="Sparky" className="w-[22px] h-[22px]" />
      <span className="text-[12px] text-foreground">Still have a question? Ask Sparky!</span>
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
        <path d="M11 5.5L11 3C11 2.17157 10.3284 1.5 9.5 1.5L3 1.5C2.17157 1.5 1.5 2.17157 1.5 3L1.5 7.5C1.5 8.32843 2.17157 9 3 9H4.5L6 10.5L7.5 9H9.5C10.3284 9 11 8.32843 11 7.5V6.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

function FeatureCard({ filter }: { filter: string }) {
  const content = FEATURE_CONTENT[filter];
  if (!content) return null;

  return (
    <>
      <h3 className="text-[13px] font-bold text-foreground text-left mb-2">{content.title}</h3>
      <div className="bg-white rounded-lg overflow-hidden w-full">
        {content.image && (
          <div className="relative">
            <img src={content.image} alt={content.title} className="w-full h-[119px] object-cover rounded-t-lg" />
            {content.badges && (
              <div className="absolute top-[6px] left-[7px] flex gap-2">
                {content.badges.map((badge) => (
                  <div key={badge} className="inline-flex h-5 px-2 justify-center items-center rounded bg-white">
                    <span className="text-[10px] font-bold text-foreground leading-[12.698px]">{badge}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        <div className="p-2 space-y-2">
          {content.paragraphs.map((p, i) => (
            <p key={i} className="text-[12px] text-foreground">
              {p.bold && <span className="font-bold">{p.bold}</span>}
              {p.text}
            </p>
          ))}
        </div>
        <SparkyPrompt />
      </div>
    </>
  );
}

function MiniProductGrid({ title, products }: { title: string; products: ProductGridItem[] }) {
  return (
    <div
      className="flex flex-col items-start bg-white flex-shrink-0 self-stretch p-3"
      style={{ width: '262px', height: 'auto', borderRadius: '19px', maxWidth: '500px', overflow: 'hidden' }}
    >
      <div className="flex justify-between items-center w-full">
        <h3 className="text-[12px] font-bold text-foreground">{title}</h3>
        <button className="text-[11px] text-foreground underline">View all</button>
      </div>
      <div className="grid w-full" style={{ gridTemplateColumns: '107.934px 107.934px', gap: '6.349px' }}>
        {products.map((product, i) => (
          <div key={i} className="flex flex-col">
            <div className="w-[107.934px] h-[92.062px] relative bg-gray-50 rounded-tl-[5.397px] rounded-bl-[5.397px] overflow-hidden mb-1">
              <img src={product.image} alt={`${product.brand} TV`} className="w-full h-full object-contain" />
              <div className="absolute bottom-1 right-1 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 4V12M4 8H12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            {product.isDiscount ? (
              <div className="flex flex-wrap items-center gap-1 mb-1">
                <div className="text-[16px] font-bold text-[var(--ld-semantic-color-text-accent-green,#2A8703)] leading-none">Now</div>
                <div className="flex items-baseline">
                  <span className="text-[11px] font-bold text-[var(--ld-semantic-color-text-accent-green,#2A8703)] align-top">$</span>
                  <span className="text-[19px] font-bold text-[var(--ld-semantic-color-text-accent-green,#2A8703)] leading-none">{product.price}</span>
                  <span className="text-[11px] font-bold text-[var(--ld-semantic-color-text-accent-green,#2A8703)] align-top">{product.cents}</span>
                </div>
                <span className="text-[11px] text-muted-foreground line-through">{product.wasPrice}</span>
              </div>
            ) : (
              <div className="text-[19px] font-bold text-foreground leading-4 mb-1">
                <span className="text-[11px] align-top">$</span>{product.price}<span className="text-[11px] align-top">{product.cents}</span>
              </div>
            )}
            <p className="text-[12px] text-foreground line-clamp-2">
              <span className="font-bold">{product.brand}</span> {product.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FeatureGuideSection() {
  const [selectedFilter, setSelectedFilter] = useState('Display type');
  const featureFiltersScrollRef = useDragScroll();
  const displayCarouselScrollRef = useDragScroll();

  return (
    <div className="px-3 py-4 border-t-8 border-[#F3F4F5] bg-[var(--ld-semantic-color-fill-accent-blue-subtle,#E9F1FE)]">
      <div className="mb-3">
        <h2 className="text-[16px] font-bold text-foreground mb-2">Features to consider when shopping for TVs</h2>
        <div ref={featureFiltersScrollRef} className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {FEATURE_FILTERS.map((filter, index) => {
            const isActive = selectedFilter === filter;
            const borderClass = isActive ? 'border-2' : 'border';
            const sizeClass = index < 5
              ? `h-auto self-center px-4 pb-0.5 rounded ${borderClass} border-foreground`
              : `h-[26px] px-4 rounded ${borderClass} border-foreground`;

            return (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`flex-shrink-0 bg-white ${sizeClass}`}
              >
                <span className={`text-[14px] ${isActive ? 'font-bold' : ''} text-foreground`}>
                  {filter}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div ref={displayCarouselScrollRef} className="flex gap-2 items-start overflow-x-auto scrollbar-hide pb-2">
        <div className="flex flex-col justify-start items-start bg-white flex-shrink-0 self-stretch rounded-2xl overflow-hidden gap-4 p-4" style={{ width: '300px', maxWidth: '500px' }}>
          <FeatureCard filter={selectedFilter} />
        </div>
        <MiniProductGrid title="LED" products={LED_PRODUCTS} />
        <MiniProductGrid title="QLED" products={QLED_PRODUCTS} />
        <MiniProductGrid title="Smart TV" products={SMART_TV_PRODUCTS} />
      </div>
    </div>
  );
}
