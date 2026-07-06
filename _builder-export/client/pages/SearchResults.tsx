import { SearchBar } from "@/components/SearchBar";
import { SparkyLookingDown } from "@/components/icons/SparkyLookingDown";
import { CameraModal } from "@/components/CameraModal";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CloseIcon as X, ClockIcon as Clock, ArrowUpLeftIcon as ArrowUpLeft, InfoIcon as Info } from "@/components/icons";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { allSuggestions as sharedSuggestions } from "@/components/search/searchData";
import { FeatureGuideSection } from "./search-results/FeatureGuideSection";
import { KnowTypesSection } from "./search-results/KnowTypesSection";
import { TrendingBrandsSection } from "./search-results/TrendingBrandsSection";
import { PopularByPriceSection } from "./search-results/PopularByPriceSection";
import { MoreProductListings } from "./search-results/MoreProductListings";

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
  screenSize: number;
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
};

export default function SearchResults() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [activeTab, setActiveTab] = useState<'shop' | 'heart' | 'user'>('shop');
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(true);
  const [recentSearches, setRecentSearches] = useState(['whole grain cereal', 'frosted flakes', 'cheerios', 'granola', 'oatmeal']);
  const [showCameraModal, setShowCameraModal] = useState(false);

  // Filter states
  const [showDealsOnly, setShowDealsOnly] = useState(false);
  const [selectedScreenSizes, setSelectedScreenSizes] = useState<number[]>([]);
  const [priceSort, setPriceSort] = useState<'none' | 'low-to-high' | 'high-to-low'>('none');

  const filtersScrollRef = useDragScroll();

  // All products data
  const allProducts: Product[] = [
    {
      id: '1',
      brand: 'VIZIO',
      name: '55" Class Quantum 4K QLED HDR Smart TV (M55Q6-L4)',
      price: 298,
      screenSize: 55,
      rating: 4.5,
      reviewCount: 3105,
      badge: 'Best seller',
      badgeBg: '#E9F1FE',
      sponsored: true,
      hasDeal: false,
      features: ['Fast scenes look smooth'],
      shipping: 'in 3+ days',
      pickup: '12 pm'
    },
    {
      id: '2',
      brand: 'LG',
      name: '50" 4K UHD UA75 AI Smart TV, 50UA7500',
      price: 278,
      screenSize: 50,
      rating: 4.5,
      reviewCount: 3105,
      hasDeal: false,
      shipping: 'tomorrow',
      pickup: '8 pm',
      stock: 'Low stock'
    },
    {
      id: '3',
      brand: 'LG',
      name: '77" Class 4K UHD OLED Web OS Smart TV with Dolby Vision C3 Series',
      price: 1849,
      screenSize: 77,
      rating: 4.5,
      reviewCount: 3105,
      badge: 'Popular pick',
      badgeBg: '#001E60',
      hasDeal: false,
      features: ['Fast scenes look smooth'],
      shipping: 'tomorrow',
      pickup: '8 pm'
    },
    {
      id: '4',
      brand: 'SAMSUNG',
      name: '55" Class S90C OLED 4K Smart TV QN55S90CAFXZA 2023',
      price: 1179,
      originalPrice: 2499,
      screenSize: 55,
      rating: 4.5,
      reviewCount: 500,
      badge: 'Deal',
      badgeBg: '#0E002E',
      hasDeal: true,
      features: ['TV with bright screen'],
      shipping: 'as soon as 1 hour',
      pickup: '2 pm',
      stock: 'Only 6 left'
    },
    {
      id: '5',
      brand: 'LG',
      name: '55" Class QNED 4K LED QNED85T series TV with webOS 24 - 55QNED85TUA',
      price: 498,
      originalPrice: 699.99,
      screenSize: 55,
      rating: 4.3,
      reviewCount: 151,
      badge: 'Rollback',
      badgeBg: '#EA1100',
      hasDeal: true,
      features: ['TV with bright screen'],
      shipping: 'as soon as 1 hour',
      pickup: '2 pm'
    }
  ];

  // Check if any filters are active
  const hasActiveFilters = showDealsOnly || selectedScreenSizes.length > 0 || priceSort !== 'none';

  // Filter and sort products
  const filteredProducts = allProducts
    .filter(product => {
      // Filter by deals
      if (showDealsOnly && !product.hasDeal) return false;

      // Filter by screen size
      if (selectedScreenSizes.length > 0 && !selectedScreenSizes.includes(product.screenSize)) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      // Sort by price
      if (priceSort === 'low-to-high') {
        return a.price - b.price;
      } else if (priceSort === 'high-to-low') {
        return b.price - a.price;
      }
      return 0;
    });

  // Get unique screen sizes from products
  const availableScreenSizes = Array.from(new Set(allProducts.map(p => p.screenSize))).sort((a, b) => a - b);

  const allSuggestions = sharedSuggestions;

  const filteredSuggestions = searchQuery
    ? allSuggestions.filter(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const renderHighlightedText = (text: string, query: string) => {
    if (!query) return <span className="font-normal">{text}</span>;

    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const index = lowerText.indexOf(lowerQuery);

    if (index === -1) return <span className="font-normal">{text}</span>;

    const before = text.slice(0, index);
    const match = text.slice(index, index + query.length);
    const after = text.slice(index + query.length);

    return (
      <>
        {before && <span className="font-bold">{before}</span>}
        <span className="font-normal">{match}</span>
        {after && <span className="font-bold">{after}</span>}
      </>
    );
  };

  const handleCameraClick = () => {
    setShowCameraModal(true);
  };

  const handleCameraCapture = (imageData: string) => {
    console.log('Photo captured:', imageData);
  };

  return (
    <div className="min-h-screen bg-white font-sans max-w-[430px] mx-auto relative pb-[92px]">
      {/* iOS Status Bar */}
      <div className="bg-white text-foreground px-4 py-2 flex justify-between items-center h-[47px]">
        <span className="text-[17px] font-semibold">9:41</span>
        <div className="flex gap-1 items-center">
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
        onClick={() => setShowSearchModal(true)}
      />

      {/* Filters */}
      <div ref={filtersScrollRef} className="px-3 py-3 border-b border-border overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-2">
          {/* Filter icon - always active when any filter is selected */}
          <button className={`flex items-center gap-2 h-8 px-2 rounded-full flex-shrink-0 ${hasActiveFilters ? 'border-2 border-foreground' : 'border border-muted-foreground'} bg-white`}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M1.5 4H3V3.5C3 2.11926 4.11926 1 5.5 1C6.88074 1 8 2.11926 8 3.5V4H14.5C14.7761 4 15 4.22388 15 4.5C15 4.77612 14.7761 5 14.5 5H8V5.5C8 6.88074 6.88074 8 5.5 8C4.11926 8 3 6.88074 3 5.5V5H1.5C1.22388 5 1 4.77612 1 4.5C1 4.22388 1.22388 4 1.5 4ZM7 3.5C7 2.67163 6.32843 2 5.5 2C4.67157 2 4 2.67163 4 3.5V5.5C4 6.32837 4.67157 7 5.5 7C6.32843 7 7 6.32837 7 5.5V3.5Z" fill="#2E2F32"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M14.5 12H13V12.5C13 13.8807 11.8807 15 10.5 15C9.11926 15 8 13.8807 8 12.5V12H1.5C1.22388 12 1 11.7761 1 11.5C1 11.2239 1.22388 11 1.5 11H8V10.5C8 9.11926 9.11926 8 10.5 8C11.8807 8 13 9.11926 13 10.5V11H14.5C14.7761 11 15 11.2239 15 11.5C15 11.7761 14.7761 12 14.5 12ZM9 12.5C9 13.3284 9.67157 14 10.5 14C11.3284 14 12 13.3284 12 12.5V10.5C12 9.67163 11.3284 9 10.5 9C9.67157 9 9 9.67163 9 10.5V12.5Z" fill="#2E2F32"/>
            </svg>
          </button>

          {/* All deals toggle */}
          <button
            onClick={() => setShowDealsOnly(!showDealsOnly)}
            className={`flex items-center gap-2 h-8 px-3 rounded-full flex-shrink-0 bg-white ${showDealsOnly ? 'border-2 border-foreground' : 'border border-border'}`}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M6.21273 0.0530012C6.30351 0.100832 6.37718 0.177984 6.42286 0.273051L8.0405 3.64013L11.5982 4.21078C11.8566 4.25224 12.0341 4.50524 11.9945 4.77589C11.9791 4.88108 11.9318 4.9783 11.8596 5.05317L9.30162 7.70479L10.0569 11.4004C10.1116 11.6681 9.94869 11.9316 9.69303 11.9889C9.58941 12.0121 9.48135 11.9983 9.38613 11.9496L5.99997 10.2169L2.6138 11.9496C2.37889 12.0698 2.09541 11.9678 1.98063 11.7218C1.93411 11.6221 1.92088 11.5089 1.94306 11.4004L2.69832 7.70479L0.140365 5.05317C-0.045448 4.86055 -0.0469752 4.54666 0.136954 4.35207C0.208444 4.27643 0.301276 4.2269 0.401726 4.21078L3.95944 3.64013L5.57708 0.273051C5.69458 0.0284626 5.97918 -0.0700572 6.21273 0.0530012Z" fill="#2A8703"/>
            </svg>
            <span className={`text-[14px] text-foreground ${showDealsOnly ? 'font-bold' : ''}`}>All deals</span>
          </button>

          {/* Screen Size dropdown - multi-select */}
          <div className="relative flex-shrink-0">
            <button className={`flex items-center gap-2 h-8 px-3 rounded-full bg-white ${selectedScreenSizes.length > 0 ? 'border-2 border-foreground' : 'border border-border'}`}>
              <span className={`text-[14px] text-foreground ${selectedScreenSizes.length > 0 ? 'font-bold' : ''}`}>
                Screen Size {selectedScreenSizes.length > 0 && `(${selectedScreenSizes.length})`}
              </span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {/* Screen size options */}
            <div className="absolute top-full left-0 mt-1 bg-white border border-border rounded-lg shadow-lg p-2 z-10 hidden group-hover:block">
              {availableScreenSizes.map(size => (
                <button
                  key={size}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedScreenSizes(prev =>
                      prev.includes(size)
                        ? prev.filter(s => s !== size)
                        : [...prev, size]
                    );
                  }}
                  className={`block w-full text-left px-3 py-2 text-[14px] hover:bg-gray-100 rounded ${selectedScreenSizes.includes(size) ? 'font-bold text-primary' : 'text-foreground'}`}
                >
                  {size}"
                </button>
              ))}
            </div>
          </div>

          {/* Price sort dropdown */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => {
                // Cycle through sort options
                if (priceSort === 'none') setPriceSort('low-to-high');
                else if (priceSort === 'low-to-high') setPriceSort('high-to-low');
                else setPriceSort('none');
              }}
              className={`flex items-center gap-2 h-8 px-3 rounded-full bg-white ${priceSort !== 'none' ? 'border-2 border-foreground' : 'border border-border'}`}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M8 5V8H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M6 3H10" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              <span className={`text-[14px] text-foreground ${priceSort !== 'none' ? 'font-bold' : ''}`}>
                Price {priceSort === 'low-to-high' ? '↑' : priceSort === 'high-to-low' ? '↓' : ''}
              </span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Results Line */}
      <div className="px-3 py-2">
        <div className="flex justify-between items-center">
          <div className="text-[12px] font-extrabold text-black">{filteredProducts.length} Results</div>
          <div className="flex items-center gap-1">
            <span className="text-[12px] text-muted-foreground">Uses item details. Price when purchased online</span>
            <Info className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* Product Listings */}
      <div className="flex flex-col">
        {/* Product 1 */}
        <div
          className="flex gap-3 px-2 py-3 border-b border-border cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => navigate('/product/1')}
        >
          <div className="w-[173px] h-[233px] flex-shrink-0 relative rounded-l-lg">
            <div className="absolute top-1 left-2 z-10">
              <div className="bg-[var(--ld-semantic-color-fill-accent-blue-subtle,#E9F1FE)] px-2 py-1 rounded text-[12px] font-bold text-primary">Best seller</div>
            </div>
            <div className="relative">
              <img src="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F783f38e6d773461b95706408b1a14434?format=webp&width=320" alt="Frosted Flakes" className="w-[160px] h-[160px] object-contain mx-auto" />
              <div className="absolute bottom-2 left-2 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 2L6 6H2L5.5 9L4 13L8 10.5L12 13L10.5 9L14 6H10L8 2Z" fill="#2E2F32"/>
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

        {/* Product 2 */}
        <div className="flex gap-3 px-2 py-3 border-b border-border">
          <div className="w-[173px] h-[233px] flex-shrink-0 relative rounded-l-lg">
            <div className="absolute top-1 left-2 z-10">
              <div className="border border-primary bg-white px-2 py-1 rounded text-[12px] font-bold text-primary">500+ people viewing now</div>
            </div>
            <div className="relative">
              <img src="https://api.builder.io/api/v1/image/assets/TEMP/730c3fa3990a2b39961a1bc62358650173eca341?width=320" alt="TV" className="w-[160px] h-[160px] object-contain mx-auto" />
              <div className="absolute bottom-2 left-2 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 2L6 6H2L5.5 9L4 13L8 10.5L12 13L10.5 9L14 6H10L8 2Z" fill="#2E2F32"/>
                </svg>
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <div className="text-[24px] font-bold text-foreground leading-5">
              <span className="text-[14px] align-top">$</span>278<span className="text-[14px] align-top">00</span>
            </div>
            <div className="text-[14px] text-foreground line-clamp-2">
              <span className="font-extrabold">LG</span> 50" 4K UHD UA75 AI Smart TV, 50UA7500
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
              <span className="text-[12px] text-muted-foreground">3105</span>
            </div>
            <div className="text-[12px] text-foreground">
              Free shipping, arrives <span className="font-bold">tomorrow</span>
            </div>
            <div className="text-[12px] text-foreground">
              Pickup as soon as <span className="font-bold">8 pm</span>
            </div>
            <div className="text-[12px] font-bold text-[#A20C00]">Low stock</div>
            <Button variant="primary" size="small" className="w-[164px]">
              Add to cart
            </Button>
          </div>
        </div>

        {/* Product 3 */}
        <div className="flex gap-3 px-2 py-3 border-b border-border">
          <div className="w-[173px] h-[233px] flex-shrink-0 relative rounded-l-lg">
            <div className="absolute top-1 left-2 z-10">
              <div className="bg-[#001E60] px-2 py-1 rounded text-[12px] font-bold text-white">Popular pick</div>
            </div>
            <div className="relative">
              <img src="https://api.builder.io/api/v1/image/assets/TEMP/5fd541ab37f1329e0ecb32ec5f6a7113064ec319?width=320" alt="TV" className="w-[160px] h-[160px] object-contain mx-auto" />
              <div className="absolute bottom-2 left-2 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 2L6 6H2L5.5 9L4 13L8 10.5L12 13L10.5 9L14 6H10L8 2Z" fill="#2E2F32"/>
                </svg>
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <div className="text-[24px] font-bold text-foreground leading-5">
              <span className="text-[14px] align-top">$</span>1,849<span className="text-[14px] align-top">00</span>
            </div>
            <div className="text-[14px] text-foreground line-clamp-2">
              <span className="font-extrabold">LG</span> 77" Class 4K UHD OLED Web OS Smart TV with Dolby Vision C3 Series
            </div>
            <div className="flex items-center gap-1">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 2L6 6H2L5.5 9L4 13L8 10.5L12 13L10.5 9L14 6H10L8 2Z" fill="#FFC220"/>
              </svg>
              <span className="text-[12px] text-foreground">Fast scenes look smooth</span>
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
              <span className="text-[12px] text-muted-foreground">3105</span>
            </div>
            <div className="text-[12px] text-foreground">
              Free shipping, arrives <span className="font-bold">tomorrow</span>
            </div>
            <div className="text-[12px] text-foreground">
              Pickup as soon as <span className="font-bold">8 pm</span>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <img src="https://api.builder.io/api/v1/image/assets/TEMP/4e4471d353b599f32a51c3b4fcbf81655740251b?width=32" alt="Apple TV" className="w-4 h-4" />
              <span className="text-[12px] text-foreground">3 free offers from Apple</span>
            </div>
            <Button variant="primary" size="small" className="w-[164px]">
              Add to cart
            </Button>
          </div>
        </div>
      </div>

      {/* Extracted sections */}
      <FeatureGuideSection />
      <KnowTypesSection />
      <TrendingBrandsSection />
      <PopularByPriceSection />
      <MoreProductListings />

      {/* Bottom Navigation removed - now handled by ResponsiveLayout */}

      {/* Search Type-Ahead Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 bg-white z-[100] max-w-[430px] mx-auto animate-fade-in">
          <div className="bg-white text-foreground px-4 py-2 flex justify-between items-center h-[47px]">
            <span className="text-[17px] font-semibold">9:41</span>
            <div className="flex gap-1 items-center">
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

          <div className="flex items-center gap-2 px-4 pb-3 border-b border-border">
            <button
              onClick={() => {
                setShowSearchModal(false);
                setSearchQuery('');
              }}
              className="flex-shrink-0"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-foreground">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="flex-1 rainbow-border animate-search-bar-expand">
              <div className="bg-white rounded-full px-3 py-2 flex items-center gap-2">
                <div className="w-6 h-6 flex-shrink-0">
                  <SparkyLookingDown />
                </div>
                <div className="flex items-center gap-1 flex-1">
                  {isSearchFocused && !searchQuery && (
                    <div className="w-[1.5px] h-5 bg-primary animate-pulse"></div>
                  )}
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    placeholder="What are you looking for?"
                    autoFocus
                    className="flex-1 outline-none text-foreground text-[16px] placeholder:text-muted-foreground bg-transparent"
                  />
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  {searchQuery ? (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="w-8 h-8 flex-shrink-0 rounded-full border border-gray-300 bg-white flex items-center justify-center"
                    >
                      <X className="w-4 h-4 text-gray-700" />
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCameraClick();
                        }}
                        className="w-8 h-8 flex-shrink-0 rounded-full border border-gray-300 bg-white flex items-center justify-center"
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-foreground">
                          <path d="M15 13C15 13.2652 14.8946 13.5196 14.7071 13.7071C14.5196 13.8946 14.2652 14 14 14H2C1.73478 14 1.48043 13.8946 1.29289 13.7071C1.10536 13.5196 1 13.2652 1 13V5C1 4.73478 1.10536 4.48043 1.29289 4.29289C1.48043 4.10536 1.73478 4 2 4H5L6 2H10L11 4H14C14.2652 4 14.5196 4.10536 14.7071 4.29289C14.8946 4.48043 15 4.73478 15 5V13Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M8 11C9.65685 11 11 9.65685 11 8C11 6.34315 9.65685 5 8 5C6.34315 5 5 6.34315 5 8C5 9.65685 6.34315 11 8 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <button className="w-8 h-8 flex-shrink-0 rounded-full border border-gray-300 bg-white flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-foreground">
                          <path d="M8 1C7.46957 1 6.96086 1.21071 6.58579 1.58579C6.21071 1.96086 6 2.46957 6 3V8C6 8.53043 6.21071 9.03914 6.58579 9.41421C6.96086 9.78929 7.46957 10 8 10C8.53043 10 9.03914 9.78929 9.41421 9.41421C9.78929 9.03914 10 8.53043 10 8V3C10 2.46957 9.78929 1.96086 9.41421 1.58579C9.03914 1.21071 8.53043 1 8 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 7V8C12 9.06087 11.5786 10.0783 10.8284 10.8284C10.0783 11.5786 9.06087 12 8 12C6.93913 12 5.92172 11.5786 5.17157 10.8284C4.42143 10.0783 4 9.06087 4 8V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M8 12V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M6 15H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-y-auto" style={{ height: 'calc(100vh - 101px)' }}>
            {searchQuery && filteredSuggestions.length > 0 ? (
              <div className="px-4 py-4">
                <div className="flex flex-col">
                  {filteredSuggestions.map((suggestion, index) => (
                    <div key={index}>
                      <button
                        onClick={() => {
                          navigate(`/loading?q=${encodeURIComponent(suggestion)}`);
                          setShowSearchModal(false);
                          setSearchQuery('');
                        }}
                        className="flex items-center gap-2 py-2 w-full"
                      >
                        <div className="flex-1 text-left text-[14px] text-foreground leading-[20px] overflow-hidden text-ellipsis whitespace-nowrap">
                          {renderHighlightedText(suggestion, searchQuery)}
                        </div>
                        <ArrowUpLeft className="w-4 h-4 text-foreground flex-shrink-0" />
                      </button>
                      {index < filteredSuggestions.length - 1 && (
                        <div className="h-px bg-border" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div className="px-3 py-4">
                  <h2 className="text-[16px] font-bold text-foreground mb-2">Keep shopping for</h2>
                  <div className="flex gap-2">
                    <div className="flex flex-col items-center w-[72px]">
                      <div className="w-[72px] h-[72px] rounded-full bg-gray-100 mb-1 overflow-hidden">
                        <img src="https://api.builder.io/api/v1/image/assets/TEMP/c6cf4ae2ee7df7d73a8d423c511ab68367c47e76?width=120" alt="Snacks" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[12px] text-foreground text-center">Snacks</span>
                    </div>
                    <div className="flex flex-col items-center w-[72px]">
                      <div className="w-[72px] h-[72px] rounded-full bg-gray-100 mb-1 overflow-hidden">
                        <img src="https://api.builder.io/api/v1/image/assets/TEMP/9845889b1dc0169056690b16fab6c2a890ddd7de?width=120" alt="Sunscreen" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[12px] text-foreground text-center">Sunscreen</span>
                    </div>
                    <div className="flex flex-col items-center w-[72px]">
                      <div className="w-[72px] h-[72px] rounded-full bg-gray-100 mb-1 overflow-hidden">
                        <img src="https://api.builder.io/api/v1/image/assets/TEMP/3ade65abb0fb85923a3106fca9fcba342b749f09?width=120" alt="Women's pants" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[12px] text-foreground text-center">Women's pants</span>
                    </div>
                  </div>
                </div>

                <div className="px-3 py-4">
                  <h2 className="text-[16px] font-bold text-foreground mb-3">Your recent searches</h2>
                  <div className="space-y-3">
                    {recentSearches.map((search, index) => (
                      <div key={index}>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-foreground" />
                          <button
                            onClick={() => setSearchQuery(search)}
                            className="flex-1 text-[14px] text-foreground text-left"
                          >
                            {search}
                          </button>
                          <button
                            onClick={() => {
                              setRecentSearches(recentSearches.filter((_, i) => i !== index));
                            }}
                          >
                            <X className="w-4 h-4 text-foreground" />
                          </button>
                        </div>
                        {index < recentSearches.length - 1 && <div className="h-px bg-border mt-3" />}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="px-3 py-4 border-b border-border">
                  <h2 className="text-[16px] font-bold text-foreground mb-3">Trending</h2>
                  <div className="flex flex-wrap gap-2">
                    <button className="px-3 py-2 bg-[#F3F4F5] rounded-full text-[14px] text-foreground">Outdoor furniture</button>
                    <button className="px-3 py-2 bg-[#F3F4F5] rounded-full text-[14px] text-foreground">Swimwear</button>
                    <button className="px-3 py-2 bg-[#F3F4F5] rounded-full text-[14px] text-foreground">Garden tools</button>
                    <button className="px-3 py-2 bg-[#F3F4F5] rounded-full text-[14px] text-foreground">Grilling</button>
                    <button className="px-3 py-2 bg-[#F3F4F5] rounded-full text-[14px] text-foreground">Summer fashion</button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <CameraModal
        isOpen={showCameraModal}
        onClose={() => setShowCameraModal(false)}
        onCapture={handleCameraCapture}
      />
    </div>
  );
}
