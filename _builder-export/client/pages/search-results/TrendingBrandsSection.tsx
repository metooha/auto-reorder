import { useRef, useState, useEffect } from "react";
import { InfoIcon as Info } from "@/components/icons";

const useDragScroll = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const handleMouseDown = (e: MouseEvent) => { setIsDragging(true); setStartX(e.pageX - element.offsetLeft); setScrollLeft(element.scrollLeft); element.style.cursor = 'grabbing'; element.style.userSelect = 'none'; };
    const handleMouseMove = (e: MouseEvent) => { if (!isDragging) return; e.preventDefault(); const x = e.pageX - element.offsetLeft; element.scrollLeft = scrollLeft - (x - startX) * 2; };
    const handleMouseUp = () => { setIsDragging(false); element.style.cursor = 'grab'; element.style.userSelect = 'auto'; };
    const handleMouseLeave = () => { if (isDragging) { setIsDragging(false); element.style.cursor = 'grab'; element.style.userSelect = 'auto'; } };
    element.addEventListener('mousedown', handleMouseDown);
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseup', handleMouseUp);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.style.cursor = 'grab';
    return () => { element.removeEventListener('mousedown', handleMouseDown); element.removeEventListener('mousemove', handleMouseMove); element.removeEventListener('mouseup', handleMouseUp); element.removeEventListener('mouseleave', handleMouseLeave); };
  }, [isDragging, startX, scrollLeft]);

  return ref;
};

const BRANDS = ['Vizio', 'Samsung', 'LG', 'Sony', 'Hisense', 'TCL', 'Roku', 'Panasonic'];

const BRAND_PRODUCTS = [
  { price: 'Now $348.00', wasPrice: '$498.00', name: 'VIZIO 75" Class 4K UHD LED HDR Limited Edition Smart TV (NEW) V4K75X-08', rating: '2,204' },
  { price: 'Now $378.00', wasPrice: '$35.000', name: 'VIZIO 65" Class Quantum 4K QLED HDR Smart TV (M65Q6-L4)', rating: '2,204' },
  { price: 'Now $237.00', wasPrice: '$35.000', name: 'VIZIO 55" Class 4K UHD LED HDR Smart TV (V4K55M-08)', rating: '2,204' },
];

export function TrendingBrandsSection() {
  const [selectedBrand, setSelectedBrand] = useState("Vizio");
  const brandFiltersScrollRef = useDragScroll();
  const brandProductsScrollRef = useDragScroll();

  return (
    <div className="px-3 py-4 border-t-8 border-[#F3F4F5]">
      <h2 className="text-[16px] font-bold text-foreground mb-2">TV brands currently trending</h2>
      <div ref={brandFiltersScrollRef} className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-3">
        {BRANDS.map((brand) => {
          const isActive = selectedBrand === brand;
          return (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className={`h-[26px] px-4 rounded flex-shrink-0 bg-white ${isActive ? 'border-2 border-foreground' : 'border border-border'}`}
            >
              <span className={`text-[14px] ${isActive ? 'font-bold' : ''} text-foreground`}>{brand}</span>
            </button>
          );
        })}
      </div>

      <div ref={brandProductsScrollRef} className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
        {/* Brand summary card */}
        <div className="w-[212px] flex-shrink-0 bg-white rounded-2xl p-3 border border-border">
          <div className="flex justify-end mb-2">
            <button className="text-[14px] text-foreground underline">View all</button>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-[12px] font-bold text-foreground mb-1">Average customer rating:</p>
              <div className="flex items-center gap-1">
                <div className="flex gap-[1px]">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 1L7.5 4.5L11 5L8.5 7.5L9 11L6 9L3 11L3.5 7.5L1 5L4.5 4.5L6 1Z" fill="#FFC220"/>
                    </svg>
                  ))}
                </div>
                <span className="text-[10px] text-muted-foreground">4.8</span>
                <span className="text-[10px] text-muted-foreground">(27K ratings)</span>
              </div>
            </div>
            <div className="h-px bg-border"></div>
            <div>
              <p className="text-[12px] font-bold text-foreground mb-1">Reviews summary:</p>
              <p className="text-[12px] text-foreground">Vizio TVs offer a good balance of picture quality and affordability.</p>
            </div>
            <div className="h-px bg-border"></div>
            <div>
              <p className="text-[12px] font-bold text-foreground mb-1">Rated by customer for:</p>
              <ul className="space-y-1">
                <li className="text-[12px] text-foreground">High-quality features</li>
                <li className="text-[12px] text-foreground">User-friendly and intuitive</li>
                <li className="text-[12px] text-foreground">Value for your money</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Brand products */}
        {BRAND_PRODUCTS.map((product, i) => (
          <div key={i} className="w-[140px] flex-shrink-0">
            <div className="h-[143px] relative bg-gray-50 rounded-tl-lg rounded-bl-lg overflow-hidden mb-2">
              <img src="https://api.builder.io/api/v1/image/assets/TEMP/25805b85ee9b7ab1a9bb9121e0ef8891b372b99b?width=264" alt="Product" className="w-[132px] h-full object-contain mx-auto" />
              <div className="absolute bottom-1 left-1 w-6 h-6 bg-white rounded-full shadow flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 3V13M3 8H13" stroke="#0053E2" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
            <div className="text-[18px] font-bold leading-3 mb-2">
              <span className="text-[12px] align-top text-[var(--ld-semantic-color-text-accent-green,#2A8703)]">{product.price.split('$')[0]}$</span>
              <span className="text-[var(--ld-semantic-color-text-accent-green,#2A8703)]">{product.price.split('$')[1].split('.')[0]}</span>
              <span className="text-[12px] align-top text-[var(--ld-semantic-color-text-accent-green,#2A8703)]">00</span>
              {' '}
              <span className="text-[12px] text-muted-foreground line-through">{product.wasPrice}</span>
            </div>
            <p className="text-[12px] text-foreground line-clamp-2 mb-1">{product.name.split(' ').map((word, idx) => idx === 0 ? <span key={idx} className="font-bold">{word} </span> : word + ' ')}</p>
            <div className="flex items-center gap-1">
              <div className="flex gap-[1px]">
                {[1, 2, 3, 4].map((j) => (
                  <svg key={j} width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 1L6 4L9 4.5L7 6.5L7.5 9.5L5 8L2.5 9.5L3 6.5L1 4.5L4 4L5 1Z" fill="#FFC220"/>
                  </svg>
                ))}
              </div>
              <span className="text-[10px] text-muted-foreground">{product.rating}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end items-center gap-1 mt-3">
        <span className="text-[12px] text-muted-foreground">Generated by AI</span>
        <Info className="w-4 h-4 text-muted-foreground" />
      </div>
    </div>
  );
}
