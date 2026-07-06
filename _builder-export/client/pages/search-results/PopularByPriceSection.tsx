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

const PRICE_FILTERS = ['All prices ($)', 'Under $250', '$250 to $500', '$500 to $1000', '$1000+'];

const PRODUCTS = [
  { price: 'Now $328.00', wasPrice: '$298.00', name: 'VIZIO 50" Class Quantum 4K QLED HDR Smart TV (VQD50M-08)', rating: '2,204' },
  { price: '$699.99', name: 'Samsung 65" Class 4K UHD OLED Web OS Smart TV with Dolby Vision C4 Series - OLED55C4PUA', rating: '3,369' },
  { price: '$468.00', name: 'Sony 75" Class 4K UHD OLED Web OS Smart TV with Dolby Vision C4 Series - OLED55C4PUA', rating: '3,451' },
  { price: '$346.99', name: 'LG 50" QNED70 Series 4K UHD QNED AI Smart webOS 25 TV, 50QNED70AUA', rating: '1,240' },
];

export function PopularByPriceSection() {
  const [selectedPrice, setSelectedPrice] = useState('All prices ($)');
  const scrollRef = useDragScroll();

  return (
    <div className="px-3 py-4 border-t-8 border-[#F3F4F5]">
      <h2 className="text-[18px] font-bold text-foreground mb-3">Popular TVs by price</h2>
      <div ref={scrollRef} className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-3">
        {PRICE_FILTERS.map((filter) => {
          const isActive = selectedPrice === filter;
          return (
            <button
              key={filter}
              onClick={() => setSelectedPrice(filter)}
              className={`h-[26px] px-4 rounded flex-shrink-0 bg-white ${isActive ? 'border-2 border-foreground' : 'border border-border'}`}
            >
              <span className={`text-[14px] ${isActive ? 'font-bold' : ''} text-foreground`}>{filter}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        {PRODUCTS.map((product, i) => (
          <div key={i} className="border border-border rounded-2xl shadow-sm overflow-hidden">
            <div className="h-[169px] relative bg-gray-50 flex items-center justify-center rounded-tl-lg rounded-bl-lg">
              <img src="https://api.builder.io/api/v1/image/assets/TEMP/25805b85ee9b7ab1a9bb9121e0ef8891b372b99b?width=328" alt="Product" className="w-[156px] h-[156px] object-contain" />
              <div className="absolute bottom-2 left-2 w-6 h-6 bg-white rounded-full shadow flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 3V13M3 8H13" stroke="#0053E2" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
            <div className="p-2">
              <div className="text-[20px] font-bold leading-4 mb-1">
                {product.wasPrice ? (
                  <><span className="text-[14px] align-top text-[var(--ld-semantic-color-text-accent-green,#2A8703)]">{product.price.split('$')[0]}$</span><span className="text-[var(--ld-semantic-color-text-accent-green,#2A8703)]">{product.price.split('$')[1].split('.')[0]}</span><span className="text-[14px] align-top text-[var(--ld-semantic-color-text-accent-green,#2A8703)]">00</span> <span className="text-[14px] text-muted-foreground line-through">{product.wasPrice}</span></>
                ) : (
                  <><span className="text-[14px] align-top">$</span>{product.price.replace('$', '').split('.')[0]}<span className="text-[14px] align-top">{product.price.split('.')[1] || '00'}</span></>
                )}
              </div>
              <p className="text-[14px] text-foreground line-clamp-2 mb-1">{product.name.split(' ').slice(0, 1).map(word => <span key={word} className="font-extrabold">{word} </span>)}{product.name.split(' ').slice(1).join(' ')}</p>
              <div className="flex items-center gap-1">
                <div className="flex gap-[1px]">
                  {[1, 2, 3, 4].map((j) => (
                    <svg key={j} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 1L7.5 4.5L11 5L8.5 7.5L9 11L6 9L3 11L3.5 7.5L1 5L4.5 4.5L6 1Z" fill="#FFC220"/>
                    </svg>
                  ))}
                </div>
                <span className="text-[12px] text-muted-foreground">{product.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        <button className="text-[16px] text-foreground underline">View all</button>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <div className="flex justify-end items-center gap-1 mt-2">
        <span className="text-[12px] text-muted-foreground">Generated by AI</span>
        <Info className="w-4 h-4 text-muted-foreground" />
      </div>
    </div>
  );
}
