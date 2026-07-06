import { SparkyAnimation } from "@/components/icons/SparkyAnimation";
import { SearchBar } from "@/components/SearchBar";
import { SparkyLookingDown } from "@/components/icons/SparkyLookingDown";
import { CameraModal } from "@/components/CameraModal";
import { BottomNav } from "@/components/BottomNav";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CloseIcon as X, ClockIcon as Clock, ArrowUpLeftIcon as ArrowUpLeft, InfoIcon as Info } from "@/components/icons";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/Button";

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

// Product data type
type Product = {
  id: string;
  brand: string;
  name: string;
  price: number;
  originalPrice?: number;
  size: string;
  rating: number;
  reviewCount: number;
  badge?: string;
  badgeBg?: string;
  hasDeal?: boolean;
  sponsored?: boolean;
  features?: string[];
  shipping?: string;
  pickup?: string;
  stock?: string;
  image?: string;
};

export default function CerealSearchResults() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [activeTab, setActiveTab] = useState<'shop' | 'heart' | 'user'>('shop');
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(true);
  const [recentSearches, setRecentSearches] = useState(['whole grain cereal', 'frosted flakes', 'cheerios', 'granola', 'oatmeal']);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [selectedFeatureFilter, setSelectedFeatureFilter] = useState('Nutrition');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState('All types');
  const [selectedBrandFilter, setSelectedBrandFilter] = useState("Kellogg's");
  const [selectedPriceFilter, setSelectedPriceFilter] = useState('All prices ($)');

  const scrollRef = useDragScroll();

  return (
    <div className="min-h-screen bg-white font-sans max-w-[430px] mx-auto relative pb-20">
      {/* iOS Status Bar */}
      <div className="flex items-center justify-between bg-white text-foreground h-[47px] px-4 py-2 border-b border-input">
        <div className="text-[17px] font-semibold leading-[25.5px]">9:41</div>
        <div className="flex items-center gap-1">
          <div className="flex gap-[2px] items-end">
            <div className="w-[3px] h-[8px] bg-foreground rounded-sm"></div>
            <div className="w-[3px] h-[11px] bg-foreground rounded-sm"></div>
            <div className="w-[3px] h-[14px] bg-foreground rounded-sm"></div>
            <div className="w-[3px] h-[17px] bg-foreground rounded-sm"></div>
          </div>
          <svg width="18" height="14" viewBox="0 0 18 14" fill="currentColor" className="ml-1 text-foreground">
            <path d="M9 5.5c1.38 0 2.67.47 3.69 1.26l1.06-1.06C12.36 4.56 10.74 4 9 4s-3.36.56-4.75 1.7l1.06 1.06C6.33 5.97 7.62 5.5 9 5.5zm-3.54 3.54C6.39 8.41 7.65 8 9 8s2.61.41 3.54 1.04l1.06-1.06C12.27 7.12 10.68 6.5 9 6.5s-3.27.62-4.6 1.48l1.06 1.06zM12 11c0-1.66-1.34-3-3-3s-3 1.34-3 3c0 .55.45 1 1 1h4c.55 0 1-.45 1-1z"/>
          </svg>
          <div className="ml-1 w-[25px] h-[12px] border-2 border-foreground rounded-sm relative">
            <div className="absolute right-[-3px] top-[2px] w-[2px] h-[4px] bg-foreground rounded-r"></div>
            <div className="bg-foreground h-full w-[90%] rounded-sm"></div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <SearchBar
        query={query}
        showBackButton={true}
        cartCount={0}
      />

      {/* Filter Pills */}
      <div className="px-4 py-3 border-b border-input">
        <div 
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto scrollbar-hide"
        >
          <button className="px-4 py-2 rounded-full border-2 border-foreground bg-background text-foreground text-[14px] font-semibold whitespace-nowrap flex-shrink-0">
            {selectedTypeFilter}
          </button>
          <button className="px-4 py-2 rounded-full border-2 border-foreground bg-background text-foreground text-[14px] font-semibold whitespace-nowrap flex-shrink-0">
            {selectedBrandFilter}
          </button>
          <button className="px-4 py-2 rounded-full border-2 border-input bg-background text-foreground text-[14px] font-semibold whitespace-nowrap flex-shrink-0">
            {selectedFeatureFilter}
          </button>
          <button className="px-4 py-2 rounded-full border-2 border-input bg-background text-foreground text-[14px] font-semibold whitespace-nowrap flex-shrink-0">
            {selectedPriceFilter}
          </button>
        </div>
      </div>

      {/* Results Count and Sort */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-input">
        <div className="text-[14px] text-muted-foreground">
          <span className="font-bold text-foreground">48 results</span> for "cereal"
        </div>
        <button className="flex items-center gap-1 text-[14px] text-foreground font-semibold">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6L8 2L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4 10L8 14L12 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Sort & filter
        </button>
      </div>

      {/* Product Listings */}
      <div className="flex flex-col">
        {/* Product 1 - Frosted Flakes */}
        <div 
          className="flex gap-3 px-2 py-3 border-b border-input cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => navigate('/product/1')}
        >
          <div className="w-[173px] h-[233px] flex-shrink-0 relative rounded-l-lg">
            <div className="absolute top-1 left-2 z-10">
              <div style={{ backgroundColor: 'var(--ld-semantic-color-fill-accent-blue-subtle)' }} className="px-2 py-1 rounded text-[12px] font-bold text-primary">Best seller</div>
            </div>
            <div className="relative">
              <img src="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fda1e0b72a05145f4bc4cce4790f8096b?format=webp&width=320" alt="Frosted Flakes" className="w-[160px] h-[160px] object-contain mx-auto" />
              <div className="absolute bottom-2 left-2 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 2L6 6H2L5.5 9L4 13L8 10.5L12 13L10.5 9L14 6H10L8 2Z" fill="currentColor" className="text-foreground"/>
                </svg>
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <div className="text-[12px] text-muted-foreground">Sponsored</div>
            <div className="text-[24px] font-bold text-foreground leading-5">
              <span className="text-[14px] align-top">$</span>3<span className="text-[14px] align-top">68</span>
            </div>
            <div className="text-[14px] text-foreground line-clamp-2">
              <span className="font-extrabold">Kellogg's</span> Frosted Flakes, Breakfast Cereal, Original, Family Size, 13.5 oz
            </div>
            <div className="flex items-center gap-1">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 2L6 6H2L5.5 9L4 13L8 10.5L12 13L10.5 9L14 6H10L8 2Z" fill="#FFC220"/>
              </svg>
              <span className="text-[12px] text-foreground">Whole grain</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="flex gap-[2px]">
                {[1, 2, 3, 4].map((i) => (
                  <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M6.21273 0.0530012C6.30351 0.100832 6.37718 0.177984 6.42286 0.273051L8.0405 3.64013L11.5982 4.21078C11.8566 4.25224 12.0341 4.50524 11.9945 4.77589C11.9791 4.88108 11.9318 4.9783 11.8596 5.05317L9.30162 7.70479L10.0569 11.4004C10.1116 11.6681 9.94869 11.9316 9.69303 11.9889C9.58941 12.0121 9.48135 11.9983 9.38613 11.9496L5.99997 10.2169L2.6138 11.9496C2.37889 12.0698 2.09541 11.9678 1.98063 11.7218C1.93411 11.6221 1.92088 11.5089 1.94306 11.4004L2.69832 7.70479L0.140365 5.05317C-0.045448 4.86055 -0.0469752 4.54666 0.136954 4.35207C0.208444 4.27643 0.301276 4.2269 0.401726 4.21078L3.95944 3.64013L5.57708 0.273051C5.69458 0.0284626 5.97918 -0.0700572 6.21273 0.0530012Z" fill="#FFC220"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M7.36564 4.54466L5.99997 1.70204L4.63429 4.54466L1.52101 5.04403L3.78346 7.38933L3.13563 10.5592L5.99997 9.09359L8.8643 10.5592L8.21648 7.38933L10.4789 5.04403L7.36564 4.54466Z" fill="#CC851A"/>
                  </svg>
                ))}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.53436 4.31853L5.99997 1.12474L4.46558 4.31853L1.00867 4.87302L3.51217 7.4682L2.78657 11.0187L5.99997 9.37441L9.21337 11.0187L8.48776 7.4682L10.9913 4.87302L7.53436 4.31853Z" fill="#CC851A"/>
                </svg>
              </div>
              <span className="text-[12px] text-muted-foreground">12234</span>
            </div>
            <div className="text-[12px] font-extrabold text-primary">2K bought since yesterday</div>
            <div className="text-[12px] text-foreground">
              Free shipping, arrives <span className="font-bold">in 3+ days</span>
            </div>
            <div className="text-[12px] text-foreground">
              Pickup as soon as <span className="font-bold">8 pm</span>
            </div>
            <Button
              variant="primary"
              size="small"
              className="w-[164px]"
              onClick={(e) => e.stopPropagation()}
            >
              Add to cart
            </Button>
          </div>
        </div>

        {/* Product 2 - Cheerios */}
        <div className="flex gap-3 px-2 py-3 border-b border-input">
          <div className="w-[173px] h-[233px] flex-shrink-0 relative rounded-l-lg">
            <div className="relative">
              <img src="https://i5.walmartimages.com/seo/Cheerios-Cereal-Gluten-Free-Breakfast-Cereal-Original-Flavor-18-oz_8c5e2039-9c67-4c6a-92d4-f7e2e5d5e8e8.jpg?odnHeight=640&odnWidth=640&odnBg=FFFFFF" alt="Cheerios" className="w-[160px] h-[160px] object-contain mx-auto" />
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <div className="text-[24px] font-bold text-foreground leading-5">
              <span className="text-[14px] align-top">$</span>4<span className="text-[14px] align-top">98</span>
            </div>
            <div className="text-[14px] text-foreground line-clamp-2">
              <span className="font-extrabold">Cheerios</span> Cereal, Gluten Free, Breakfast Cereal, Original Flavor, 18 oz
            </div>
            <div className="flex items-center gap-1">
              <div className="flex gap-[2px]">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M6.21273 0.0530012C6.30351 0.100832 6.37718 0.177984 6.42286 0.273051L8.0405 3.64013L11.5982 4.21078C11.8566 4.25224 12.0341 4.50524 11.9945 4.77589C11.9791 4.88108 11.9318 4.9783 11.8596 5.05317L9.30162 7.70479L10.0569 11.4004C10.1116 11.6681 9.94869 11.9316 9.69303 11.9889C9.58941 12.0121 9.48135 11.9983 9.38613 11.9496L5.99997 10.2169L2.6138 11.9496C2.37889 12.0698 2.09541 11.9678 1.98063 11.7218C1.93411 11.6221 1.92088 11.5089 1.94306 11.4004L2.69832 7.70479L0.140365 5.05317C-0.045448 4.86055 -0.0469752 4.54666 0.136954 4.35207C0.208444 4.27643 0.301276 4.2269 0.401726 4.21078L3.95944 3.64013L5.57708 0.273051C5.69458 0.0284626 5.97918 -0.0700572 6.21273 0.0530012Z" fill="#FFC220"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M7.36564 4.54466L5.99997 1.70204L4.63429 4.54466L1.52101 5.04403L3.78346 7.38933L3.13563 10.5592L5.99997 9.09359L8.8643 10.5592L8.21648 7.38933L10.4789 5.04403L7.36564 4.54466Z" fill="#CC851A"/>
                  </svg>
                ))}
              </div>
              <span className="text-[12px] text-muted-foreground">8542</span>
            </div>
            <div className="text-[12px] text-foreground">
              Free shipping, arrives <span className="font-bold">tomorrow</span>
            </div>
            <div className="text-[12px] text-foreground">
              Pickup as soon as <span className="font-bold">2 pm</span>
            </div>
            <Button
              variant="primary"
              size="small"
              className="w-[164px]"
            >
              Add to cart
            </Button>
          </div>
        </div>

        {/* Product 3 - Honey Nut Cheerios */}
        <div className="flex gap-3 px-2 py-3 border-b border-input">
          <div className="w-[173px] h-[233px] flex-shrink-0 relative rounded-l-lg">
            <div className="absolute top-1 left-2 z-10">
              <div className="bg-[var(--ld-semantic-color-fill-warning-subtle,#FEF6DE)] px-2 py-1 rounded text-[12px] font-bold" style={{ color: 'var(--ld-semantic-color-fill-warning)' }}>Rollback</div>
            </div>
            <div className="relative">
              <img src="https://i5.walmartimages.com/seo/Honey-Nut-Cheerios-Gluten-Free-Cereal-with-Oats-Heart-Healthy-Cereal-10-8-oz_a6f65b9e-6315-4a64-8c8e-f6e3b5b5e5e5.jpg?odnHeight=640&odnWidth=640&odnBg=FFFFFF" alt="Honey Nut Cheerios" className="w-[160px] h-[160px] object-contain mx-auto" />
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <div className="flex items-baseline gap-2">
              <div className="text-[24px] font-bold text-foreground leading-5">
                <span className="text-[14px] align-top">$</span>3<span className="text-[14px] align-top">24</span>
              </div>
              <div className="text-[14px] text-muted-foreground line-through">$3.98</div>
            </div>
            <div className="text-[14px] text-foreground line-clamp-2">
              <span className="font-extrabold">Honey Nut Cheerios</span> Gluten Free Cereal with Oats, Heart Healthy Cereal, 10.8 oz
            </div>
            <div className="flex items-center gap-1">
              <div className="flex gap-[2px]">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M6.21273 0.0530012C6.30351 0.100832 6.37718 0.177984 6.42286 0.273051L8.0405 3.64013L11.5982 4.21078C11.8566 4.25224 12.0341 4.50524 11.9945 4.77589C11.9791 4.88108 11.9318 4.9783 11.8596 5.05317L9.30162 7.70479L10.0569 11.4004C10.1116 11.6681 9.94869 11.9316 9.69303 11.9889C9.58941 12.0121 9.48135 11.9983 9.38613 11.9496L5.99997 10.2169L2.6138 11.9496C2.37889 12.0698 2.09541 11.9678 1.98063 11.7218C1.93411 11.6221 1.92088 11.5089 1.94306 11.4004L2.69832 7.70479L0.140365 5.05317C-0.045448 4.86055 -0.0469752 4.54666 0.136954 4.35207C0.208444 4.27643 0.301276 4.2269 0.401726 4.21078L3.95944 3.64013L5.57708 0.273051C5.69458 0.0284626 5.97918 -0.0700572 6.21273 0.0530012Z" fill="#FFC220"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M7.36564 4.54466L5.99997 1.70204L4.63429 4.54466L1.52101 5.04403L3.78346 7.38933L3.13563 10.5592L5.99997 9.09359L8.8643 10.5592L8.21648 7.38933L10.4789 5.04403L7.36564 4.54466Z" fill="#CC851A"/>
                  </svg>
                ))}
              </div>
              <span className="text-[12px] text-muted-foreground">6789</span>
            </div>
            <div className="text-[12px] font-bold" style={{ color: 'var(--ld-semantic-color-text-accent-green)' }}>Save $0.74</div>
            <div className="text-[12px] text-foreground">
              Free shipping, arrives <span className="font-bold">in 2 days</span>
            </div>
            <div className="text-[12px] text-foreground">
              Pickup as soon as <span className="font-bold">today</span>
            </div>
            <Button
              variant="primary"
              size="small"
              className="w-[164px]"
            >
              Add to cart
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Camera Modal */}
      <CameraModal isOpen={showCameraModal} onClose={() => setShowCameraModal(false)} />
    </div>
  );
}
