import { CloseIcon as X, CameraIcon as Camera, MicrophoneIcon as Mic, ChevronDownIcon as ChevronDown, ChevronUpIcon as ChevronUp, PlusIcon as Plus, BoxIcon as Package, PauseIcon as Pause, MenuIcon as Menu, SearchIcon as Search } from "@/components/icons";
import { CartIcon } from "@/components/icons/CartIcon";
import { FulfillmentShippingIcon } from "@/components/icons/FulfillmentShippingIcon";
import { LocationIcon } from "@/components/icons/LocationIcon";
import { StoreIcon } from "@/components/icons/StoreIcon";
import { CameraModal } from "@/components/CameraModal";
import { useState, useEffect } from "react";
import { AddToCart } from "@/components/AddToCart";
import { Button } from "@/components/ui/Button";
import { Link } from "@/components/ui/Link";
import { IconButton } from "@/components/ui/IconButton";
import { CloseIcon } from "@/components/icons/CloseIcon";
import { NewArrivalsCarousel } from "@/components/NewArrivalsCarousel";
import { SearchTypeaheadModal } from "./index/SearchTypeaheadModal";

export default function Index() {
  const [activeTab, setActiveTab] = useState<'shop' | 'heart' | 'user'>('shop');
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [hasOpenedSearch, setHasOpenedSearch] = useState(false);
  const [searchText, setSearchText] = useState<{ word: string; isBlue: boolean; key?: number }>({
    word: 'What are you looking for?',
    isBlue: false,
    key: -1
  });
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [showDeliveryOptions, setShowDeliveryOptions] = useState(false);
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState<'none' | 'shipping' | 'pickup' | 'delivery'>('none');
  const [cartItems, setCartItems] = useState<Record<number, number>>({});

  // Handle quantity change for a specific product
  const handleQuantityChange = (productIndex: number, quantity: number) => {
    setCartItems(prev => {
      if (quantity === 0) {
        const newItems = { ...prev };
        delete newItems[productIndex];
        return newItems;
      }
      return { ...prev, [productIndex]: quantity };
    });
  };

  const handleCameraClick = () => {
    setShowCameraModal(true);
  };

  const handleCameraCapture = (imageData: string) => {
    console.log('Photo captured:', imageData);
  };

  useEffect(() => {
    const searchOptions = [
      { word: 'photo', isBlue: true, key: 0 },
      { word: 'scan', isBlue: true, key: 1 },
      { word: 'voice', isBlue: true, key: 2 },
      { word: 'What are you looking for?', isBlue: false, key: 3 }
    ];

    let currentIndex = 0;

    // Start cycling after initial display
    const initialTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        setSearchText(searchOptions[currentIndex]);
        currentIndex = (currentIndex + 1) % searchOptions.length;
      }, 6000);

      return () => clearInterval(interval);
    }, 6000);

    return () => clearTimeout(initialTimeout);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans lg:max-w-none mx-auto relative">
      <div className="sticky top-0 z-50">
        {/* Mobile/Tablet Header */}
        <div className="lg:hidden px-4 md:px-6 pt-4 pb-3 md:py-4" style={{ backgroundColor: 'var(--ld-semantic-color-topnav-background)' }}>
          <div className="flex items-center gap-3 md:gap-6">
            {/* Hamburger Menu */}
            <button className="text-white flex-shrink-0" aria-label="Menu">
              <Menu className="w-6 h-6" />
            </button>

            {/* Walmart Spark Logo */}
            <a href="/" className="flex-shrink-0" aria-label="Walmart Homepage">
              <img
                src="https://i5.walmartimages.com/dfw/63fd9f59-14e2/9d304ce6-96de-4331-b8ec-c5191226d378/v1/spark-icon.svg"
                alt="Walmart"
                className="h-8 w-8 md:h-9 md:w-9"
              />
            </a>

            {/* Search Bar */}
            <div
              className="flex-1 bg-white rounded-full h-[52px] flex items-center px-4 md:px-6 cursor-pointer"
              onClick={() => {
                setShowSearchModal(true);
                setHasOpenedSearch(true);
              }}
            >
              <span className="text-muted-foreground text-[14px] md:text-[16px] flex-1 truncate">Search Walmart</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSearchModal(true);
                  setHasOpenedSearch(true);
                }}
                className="w-8 h-8 rounded-full flex items-center justify-center -mr-1"
                style={{ backgroundColor: 'var(--ld-semantic-color-topnav-background-hover)' }}
                aria-label="Search"
              >
                <Search className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </button>
            </div>

            {/* Cart */}
            <CartIcon count={0} price="$0.00" textColor="white" />
          </div>
        </div>

        {/* Pickup or Delivery Banner - Mobile/Tablet */}
        <div className="lg:hidden bg-primary px-4 pt-2 pb-2">
          {/* Main header row - only visible when collapsed, updates based on selection */}
          {!showDeliveryOptions && (
            <button
              onClick={() => setShowDeliveryOptions(true)}
              className="w-full flex items-center justify-between rounded-full px-0 py-2 transition-colors"
            >
              <div className="flex items-center gap-2">
                {selectedDeliveryOption === 'none' && (
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fe96ba70bf20a4d59aede84cfd5b0636c"
                    alt="Global Intent"
                    className="w-[24px] h-[24px] flex-shrink-0 rounded-full"
                  />
                )}
                {selectedDeliveryOption === 'delivery' && (
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Ff8af2f0cfbbf459b862fcbd867dac70d"
                    alt="Delivery"
                    className="w-[24px] h-[24px] flex-shrink-0 rounded-full"
                  />
                )}
                {selectedDeliveryOption === 'pickup' && (
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Ff91b889ffddd4a669bd5f5ed913c38df"
                    alt="Pickup"
                    className="w-[24px] h-[24px] flex-shrink-0 rounded-full"
                  />
                )}
                {selectedDeliveryOption === 'shipping' && (
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fe96ba70bf20a4d59aede84cfd5b0636c"
                    alt="Shipping"
                    className="w-[24px] h-[24px] flex-shrink-0 rounded-full"
                  />
                )}

                <span className="text-white text-[14px] font-semibold">
                  {selectedDeliveryOption === 'none' && 'How do you want your items?'}
                  {selectedDeliveryOption === 'delivery' && 'Delivery | 1213 E Trinity Mills Rd'}
                  {selectedDeliveryOption === 'pickup' && 'Pickup | Carrollton Supercenter'}
                  {selectedDeliveryOption === 'shipping' && 'Shipping | 1213 E Trinity Mills Rd'}
                </span>
              </div>
              <ChevronDown className="w-4 h-4 text-white" />
            </button>
          )}

          {/* Expanded Delivery Options */}
          {showDeliveryOptions && (
            <div className="py-2 space-y-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <span className="text-white text-[14px] font-semibold">How do you want your items?</span>
                <button
                  onClick={() => setShowDeliveryOptions(false)}
                  className="w-6 h-6 flex items-center justify-center"
                >
                  <ChevronUp className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Delivery method selection */}
              <div className="flex justify-center gap-6">
                <button
                  className="flex flex-col items-center gap-2"
                  onClick={() => { setSelectedDeliveryOption('shipping'); setShowDeliveryOptions(false); }}
                >
                  <div className={`w-[60px] h-[60px] rounded-full flex items-center justify-center relative ${selectedDeliveryOption === 'shipping' ? 'bg-white/30' : 'bg-white/10'}`}>
                    <FulfillmentShippingIcon className="w-10 h-10" />
                    {selectedDeliveryOption === 'shipping' && (
                      <>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#FFC836] rounded-full flex items-center justify-center">
                          <svg className="absolute" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="10.5" cy="10.5" r="10.5" fill="#FFC836"/>
                          </svg>
                          <svg className="absolute" width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M1.20967 0.157278C0.915456 -0.0714902 0.490033 -0.0506931 0.21967 0.21967C-0.0732233 0.512563 -0.0732233 0.987437 0.21967 1.28033L3.43934 4.5L0.21967 7.71967C-0.0732229 8.01256 -0.0732229 8.48744 0.21967 8.78033C0.490033 9.05069 0.915456 9.07149 1.20967 8.84272L1.28033 8.78033L4.5 5.56066L7.71967 8.78033L7.79033 8.84272C8.08454 9.07149 8.50997 9.05069 8.78033 8.78033C9.07322 8.48744 9.07322 8.01256 8.78033 7.71967L5.56066 4.5L8.78033 1.28033C9.07322 0.987437 9.07322 0.512563 8.78033 0.21967C8.50997 -0.0506931 8.08454 -0.0714902 7.79033 0.157278L7.71967 0.21967L4.5 3.43934L1.28033 0.21967L1.20967 0.157278Z" fill="currentColor"/>
                          </svg>
                        </div>
                      </>
                    )}
                  </div>
                  <span className="text-white text-[14px] font-extrabold leading-[17px] text-center">Shipping</span>
                </button>

                <button
                  className="flex flex-col items-center gap-2"
                  onClick={() => { setSelectedDeliveryOption('pickup'); setShowDeliveryOptions(false); }}
                >
                  <div className={`w-[60px] h-[60px] rounded-full flex items-center justify-center relative ${selectedDeliveryOption === 'pickup' ? 'bg-white/30' : 'bg-white/10'}`}>
                    <img src="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Ff91b889ffddd4a669bd5f5ed913c38df" alt="Pickup" className="w-10 h-10" />
                    {selectedDeliveryOption === 'pickup' && (
                      <>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#FFC836] rounded-full flex items-center justify-center">
                          <svg className="absolute" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="10.5" cy="10.5" r="10.5" fill="#FFC836"/>
                          </svg>
                          <svg className="absolute" width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M1.20967 0.157278C0.915456 -0.0714902 0.490033 -0.0506931 0.21967 0.21967C-0.0732233 0.512563 -0.0732233 0.987437 0.21967 1.28033L3.43934 4.5L0.21967 7.71967C-0.0732229 8.01256 -0.0732229 8.48744 0.21967 8.78033C0.490033 9.05069 0.915456 9.07149 1.20967 8.84272L1.28033 8.78033L4.5 5.56066L7.71967 8.78033L7.79033 8.84272C8.08454 9.07149 8.50997 9.05069 8.78033 8.78033C9.07322 8.48744 9.07322 8.01256 8.78033 7.71967L5.56066 4.5L8.78033 1.28033C9.07322 0.987437 9.07322 0.512563 8.78033 0.21967C8.50997 -0.0506931 8.08454 -0.0714902 7.79033 0.157278L7.71967 0.21967L4.5 3.43934L1.28033 0.21967L1.20967 0.157278Z" fill="currentColor"/>
                          </svg>
                        </div>
                      </>
                    )}
                  </div>
                  <span className="text-white text-[14px] font-extrabold leading-[17px] text-center">Pickup</span>
                </button>

                <button
                  className="flex flex-col items-center gap-2"
                  onClick={() => { setSelectedDeliveryOption('delivery'); setShowDeliveryOptions(false); }}
                >
                  <div className={`w-[60px] h-[60px] rounded-full flex items-center justify-center relative ${selectedDeliveryOption === 'delivery' ? 'bg-white/30' : 'bg-white/10'}`}>
                    <img src="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Ff8af2f0cfbbf459b862fcbd867dac70d" alt="Delivery" className="w-10 h-10" />
                    {selectedDeliveryOption === 'delivery' && (
                      <>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#FFC836] rounded-full flex items-center justify-center">
                          <svg className="absolute" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="10.5" cy="10.5" r="10.5" fill="#FFC836"/>
                          </svg>
                          <svg className="absolute" width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M1.20967 0.157278C0.915456 -0.0714902 0.490033 -0.0506931 0.21967 0.21967C-0.0732233 0.512563 -0.0732233 0.987437 0.21967 1.28033L3.43934 4.5L0.21967 7.71967C-0.0732229 8.01256 -0.0732229 8.48744 0.21967 8.78033C0.490033 9.05069 0.915456 9.07149 1.20967 8.84272L1.28033 8.78033L4.5 5.56066L7.71967 8.78033L7.79033 8.84272C8.08454 9.07149 8.50997 9.05069 8.78033 8.78033C9.07322 8.48744 9.07322 8.01256 8.78033 7.71967L5.56066 4.5L8.78033 1.28033C9.07322 0.987437 9.07322 0.512563 8.78033 0.21967C8.50997 -0.0506931 8.08454 -0.0714902 7.79033 0.157278L7.71967 0.21967L4.5 3.43934L1.28033 0.21967L1.20967 0.157278Z" fill="currentColor"/>
                          </svg>
                        </div>
                      </>
                    )}
                  </div>
                  <span className="text-white text-[14px] font-extrabold leading-[17px] text-center">Delivery</span>
                </button>
              </div>

              {/* Address & Store Cards */}
              <div className="flex flex-col gap-2 w-full">
                <button className="w-full flex items-center gap-2 p-4 bg-white rounded-lg shadow-[0_-1px_2px_0_rgba(0,0,0,0.1),0_1px_2px_1px_rgba(0,0,0,0.15)]">
                  <LocationIcon className="w-4 h-4 flex-shrink-0" />
                  <span className="flex-1 text-left text-foreground text-[12px] leading-[16px]">
                    1213 E Trinity Mills Rd, Dallas, TX 75220
                  </span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                    <path d="M17.751 12.5652L8.53762 21L7.5 19.8695L16.096 12L7.5 4.13049L8.53762 3L17.751 11.4348C17.9097 11.58 18 11.7851 18 12C18 12.2149 17.9097 12.42 17.751 12.5652Z" fill="black"/>
                  </svg>
                </button>
                <button className="w-full flex items-center gap-2 p-4 bg-white rounded-lg shadow-[0_-1px_2px_0_rgba(0,0,0,0.1),0_1px_2px_1px_rgba(0,0,0,0.15)]">
                  <StoreIcon className="w-4 h-4 flex-shrink-0 self-start mt-0.5" />
                  <div className="flex-1 text-left flex flex-col gap-1">
                    <span className="text-foreground text-[12px] font-semibold leading-[16px]">Carrollton Supercenter</span>
                    <span className="text-foreground text-[12px] leading-[16px]">1213 E Trinity Mills Rd, Dallas, TX 75220</span>
                  </div>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                    <path d="M17.751 12.5652L8.53762 21L7.5 19.8695L16.096 12L7.5 4.13049L8.53762 3L17.751 11.4348C17.9097 11.58 18 11.7851 18 12C18 12.2149 17.9097 12.42 17.751 12.5652Z" fill="black"/>
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Visual Navigation - Mobile/Tablet - hidden when GIC is expanded */}
        <div
          className={`px-4 py-2 flex items-center gap-2 overflow-x-auto scrollbar-hide lg:hidden ${showDeliveryOptions ? 'hidden' : ''}`}
          style={{ backgroundColor: 'var(--ld-semantic-color-fill-accent-blue-subtle)' }}
        >
          <button
            className="flex-shrink-0 h-8 w-8 flex items-center justify-center bg-white rounded-full transition-all duration-100 hover:opacity-80"
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fca32f8144d3e414bafe0be8b4870d869"
              alt="Grid"
              width="20"
              height="20"
            />
          </button>
          {['Get it Fast', 'Rollbacks & More', 'Easter', 'Pharmacy', 'New Arrivals', 'The Baby Event', 'Dinner Made Easy', 'My Items'].map((label) => (
            <button
              key={label}
              className="flex-shrink-0 h-8 px-3 py-1.5 bg-white rounded-full whitespace-nowrap transition-all duration-100 hover:opacity-80"
              style={{
                color: 'var(--ld-semantic-color-topnav-background-active)',
                fontSize: '14px',
                fontWeight: 400
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 pt-6 pb-32 space-y-4">
        {/* Order Status Card — mobile */}
        <div
          className="lg:hidden flex items-center gap-3 p-3 rounded-lg"
          style={{
            background: 'var(--ld-semantic-color-surface, #fff)',
            boxShadow: '0 -1px 2px 0 rgba(0,0,0,0.10), 0 1px 2px 1px rgba(0,0,0,0.15)',
            position: 'relative',
          }}
        >
          {/* Larger image left */}
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F5f02b529221349099118d275e7e1d748"
            alt="Order status"
            className="w-10 h-10 flex-shrink-0"
          />

          {/* Stacked text */}
          <div className="flex-1 flex flex-col gap-0.5">
            <span
              style={{
                fontFamily: 'var(--ld-semantic-font-family-sans, sans-serif)',
                fontSize: '14px',
                color: 'var(--ld-semantic-color-text, #2E2F32)',
              }}
            >
              Your order is on the way
            </span>
            <span
              style={{
                fontFamily: 'var(--ld-semantic-font-family-sans, sans-serif)',
                fontSize: '14px',
                fontWeight: 700,
                color: 'var(--ld-semantic-color-text, #2E2F32)',
              }}
            >
              Arrives tomorrow by 8pm
            </span>
            <Link
              href="/purchase-history"
              variant="default"
              underline
            >
              Track
            </Link>
          </div>

          {/* Close button */}
          <IconButton
            aria-label="Dismiss order status"
            variant="ghost"
            size="small"
            UNSAFE_style={{ flexShrink: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </div>

        {/* New Arrivals Carousel */}
        <NewArrivalsCarousel />

        {/* Carousel Container */}
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide -mx-4 px-4 touch-pan-x">
          {/* Grocery Bag Carousel */}
          <div className="relative rounded-lg overflow-hidden h-[543px] min-w-[320px] w-[320px] snap-center flex-shrink-0">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/c97966cd0f7092344bbece70c4c8a937bf2a51b3?width=638"
              alt="Grocery carousel background"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 w-10 h-6 bg-white/70 backdrop-blur rounded-full flex items-center justify-center z-10">
              <Pause className="w-4 h-4" />
            </div>

            {/* Product Grid at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2 z-10">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                <div className="bg-white rounded-lg p-2 flex flex-col items-end">
                  <img src="https://api.builder.io/api/v1/image/assets/TEMP/bd837058fbddc5901e149fc30b9d42df64f5c469?width=800" alt="Product" className="w-full h-[124px] object-cover rounded self-stretch" />
                  <div className="mt-2 flex items-baseline self-start">
                    <span className="text-[12px] font-bold">$</span>
                    <span className="text-[18px] font-bold">9</span>
                    <span className="text-[12px] font-bold">00</span>
                  </div>
                  <div className="mt-2">
                    <AddToCart onQuantityChange={(qty) => handleQuantityChange(0, qty)} />
                  </div>
                </div>
                <div className="bg-white rounded-lg p-2 flex flex-col items-end">
                  <img src="https://api.builder.io/api/v1/image/assets/TEMP/8a7143f8102e1b6f6b1b897bb77a6eca35110d9e?width=800" alt="Product" className="w-full h-[124px] object-cover rounded self-stretch" />
                  <div className="mt-2 flex items-baseline self-start">
                    <span className="text-[12px] font-bold">$</span>
                    <span className="text-[18px] font-bold">7</span>
                    <span className="text-[12px] font-bold">00</span>
                  </div>
                  <div className="mt-2">
                    <AddToCart onQuantityChange={(qty) => handleQuantityChange(1, qty)} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white rounded-lg p-2 flex flex-col items-end">
                  <img src="https://api.builder.io/api/v1/image/assets/TEMP/323dc30082ef5d7041780a725ebbf4e9d310e7ba?width=800" alt="Product" className="w-full h-[124px] object-cover rounded self-stretch" />
                  <div className="mt-2 flex items-baseline self-start">
                    <span className="text-[12px] font-bold">$</span>
                    <span className="text-[18px] font-bold">11</span>
                    <span className="text-[12px] font-bold">00</span>
                  </div>
                  <AddToCart onQuantityChange={(qty) => handleQuantityChange(2, qty)} />
                </div>
                <div className="bg-white rounded-lg p-2 flex flex-col items-end">
                  <img src="https://api.builder.io/api/v1/image/assets/TEMP/443bdf4d7c71e01c3032f1295a2ffcb0b4edd57d?width=800" alt="Product" className="w-full h-[124px] object-cover rounded self-stretch" />
                  <div className="mt-2 flex items-baseline self-start">
                    <span className="text-[12px] font-bold">$</span>
                    <span className="text-[18px] font-bold">9</span>
                    <span className="text-[12px] font-bold">49</span>
                  </div>
                  <div className="mt-2">
                    <AddToCart onQuantityChange={(qty) => handleQuantityChange(3, qty)} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bold Animal Prints Carousel */}
          <div className="relative rounded-lg overflow-hidden h-[543px] min-w-[320px] w-[320px] snap-center flex-shrink-0">
            <img src="https://api.builder.io/api/v1/image/assets/TEMP/bd1ca1d98d504c1728ea0b896f93c81704c50bd1?width=640" alt="Bold animal prints background" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute top-4 right-4 w-10 h-6 bg-white/70 backdrop-blur rounded-full flex items-center justify-center z-10">
              <Pause className="w-4 h-4" />
            </div>
            <div className="absolute top-8 left-4 right-4 z-10">
              <h2 className="text-white text-[48px] leading-[40px] max-w-[230px]">
                Bold animal prints
              </h2>
            </div>

            <div className="absolute bottom-4 left-4 right-4 space-y-2 z-10">
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white rounded-lg p-2 flex flex-col items-end">
                  <img src="https://api.builder.io/api/v1/image/assets/TEMP/22eb4ceff29b46284693bbf8e8fa100f9d85a82e?width=800" alt="Animal print shoes" className="w-full h-[124px] object-cover rounded self-stretch" />
                  <div className="mt-2 flex items-baseline self-start">
                    <span className="text-[12px] font-bold">$</span><span className="text-[18px] font-bold">199</span><span className="text-[12px] font-bold">00</span>
                  </div>
                  <button className="w-6 h-6 rounded-full border border-black bg-white flex items-center justify-center mt-2"><Plus className="w-3 h-3" /></button>
                </div>
                <div className="bg-white rounded-lg p-2 flex flex-col items-end">
                  <img src="https://api.builder.io/api/v1/image/assets/TEMP/d9ee7b238140973cda377ee6e3f49c9037dfcc6d?width=800" alt="Animal print top" className="w-full h-[124px] object-cover rounded self-stretch" />
                  <div className="mt-2 flex items-baseline self-start">
                    <span className="text-[12px] font-bold">$</span><span className="text-[18px] font-bold">79</span><span className="text-[12px] font-bold">00</span>
                  </div>
                  <button className="w-6 h-6 rounded-full border border-black bg-white flex items-center justify-center mt-2"><Plus className="w-3 h-3" /></button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white rounded-lg p-2 flex flex-col items-end">
                  <img src="https://api.builder.io/api/v1/image/assets/TEMP/475d5bef94fd5d4f97597ae2c5c56bccddc46514?width=800" alt="Animal print bag" className="w-full h-[124px] object-cover rounded self-stretch" />
                  <div className="mt-2 flex items-baseline self-start">
                    <span className="text-[12px] font-bold">$</span><span className="text-[18px] font-bold">178</span><span className="text-[12px] font-bold">00</span>
                  </div>
                  <button className="w-6 h-6 rounded-full border border-black bg-white flex items-center justify-center"><Plus className="w-3 h-3" /></button>
                </div>
                <div className="bg-white rounded-lg p-2 flex flex-col items-end">
                  <img src="https://api.builder.io/api/v1/image/assets/TEMP/fd1e2f2ead763dc721242c668c98d4ee72e664a1?width=800" alt="Animal print heels" className="w-full h-[124px] object-cover rounded self-stretch" />
                  <div className="mt-2 flex items-baseline self-start">
                    <span className="text-[12px] font-bold">$</span><span className="text-[18px] font-bold">99</span><span className="text-[12px] font-bold">00</span>
                  </div>
                  <button className="w-6 h-6 rounded-full border border-black bg-white flex items-center justify-center mt-2"><Plus className="w-3 h-3" /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Type-Ahead Modal */}
      {showSearchModal && (
        <SearchTypeaheadModal
          onClose={() => setShowSearchModal(false)}
          onCameraClick={handleCameraClick}
        />
      )}

      {/* Camera Modal */}
      <CameraModal
        isOpen={showCameraModal}
        onClose={() => setShowCameraModal(false)}
        onCapture={handleCameraCapture}
      />
    </div>
  );
}
