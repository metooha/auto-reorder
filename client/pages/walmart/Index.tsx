import { useRef, useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useLayoutSettings } from "@/contexts/LayoutSettingsContext";
import { NewArrivalsCarousel } from "@/components/walmart/NewArrivalsCarousel";
import { JumpRightBackIn } from "@/components/walmart/JumpRightBackIn";
import { ResponsiveLayout } from "@/components/walmart/ResponsiveLayout";
import { OrderStatusCard } from "@/components/walmart/OrderStatusCard";
import { ActiveCurbsideCard } from "@/components/walmart/ActiveCurbsideCard";
import { PromotionalItemTile } from "@/components/walmart/PromotionalItemTile";
import { ContinueShopping } from "@/components/walmart/ContinueShopping";
import { FlashDealsCarousel } from "@/components/walmart/FlashDealsCarousel";
import { PRODUCT_IMAGES } from "@/components/walmart/productImages";
import { ReplenishmentBasket } from "@/components/walmart/ReplenishmentBasket";
import { WalmartScenarioProvider, useWalmartScenario } from "@/contexts/WalmartScenarioContext";
import { WalmartDevToolbar } from "@/components/walmart/WalmartDevToolbar";
import { UpdatePreferencesFlow } from "@/components/walmart/UpdatePreferencesFlow";
import { ErrorStatesFlow } from "@/components/walmart/ErrorStatesFlow";
import { SplashScreen } from "@/components/walmart/SplashScreen";

interface CarouselItem {
  img: string;
  price: string;
  cents: string;
  idx: number;
}

const GROCERY_ITEMS: CarouselItem[] = [
  { img: PRODUCT_IMAGES.starbucksDoubleshot, price: '9', cents: '00', idx: 0 },
  { img: PRODUCT_IMAGES.bettergooodsFruitSnacks, price: '7', cents: '00', idx: 1 },
  { img: PRODUCT_IMAGES.eggs6Count, price: '11', cents: '00', idx: 2 },
  { img: PRODUCT_IMAGES.oatlyOatMilk, price: '9', cents: '49', idx: 3 },
];

const ANIMAL_PRINT_ITEMS: CarouselItem[] = [
  { img: PRODUCT_IMAGES.leatherHandbag, price: '199', cents: '00', idx: 4 },
  { img: PRODUCT_IMAGES.blackCardigan, price: '79', cents: '00', idx: 5 },
  { img: PRODUCT_IMAGES.headphones, price: '178', cents: '00', idx: 6 },
  { img: PRODUCT_IMAGES.airFryer, price: '99', cents: '00', idx: 7 },
];

const HOME_REFRESH_ITEMS: CarouselItem[] = [
  { img: PRODUCT_IMAGES.boucleArmchair, price: '159', cents: '00', idx: 8 },
  { img: PRODUCT_IMAGES.roomba2, price: '49', cents: '98', idx: 9 },
  { img: PRODUCT_IMAGES.cookwareSet, price: '79', cents: '99', idx: 10 },
  { img: PRODUCT_IMAGES.mugSet, price: '28', cents: '00', idx: 11 },
];

const VACUUM_ITEMS: CarouselItem[] = [
  { img: PRODUCT_IMAGES.roomba2, price: '149', cents: '00', idx: 12 },
  { img: PRODUCT_IMAGES.roomba1, price: '199', cents: '99', idx: 13 },
  { img: PRODUCT_IMAGES.roomba2, price: '249', cents: '00', idx: 14 },
  { img: PRODUCT_IMAGES.roomba3, price: '329', cents: '00', idx: 15 },
];

export default function Index() {
  return (
    <>
      <OnboardingLauncher />
      <IndexInner />
      <UpdatePreferencesFlow />
      <ErrorStatesFlow />
      <WalmartDevToolbar />
    </>
  );
}

// Launches the splash screen on initial app load and hands off to the
// onboarding flow once the splash has finished.
function OnboardingLauncher() {
  const [appReady, setAppReady] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const { setOnboardingActive, setOnboardingOpen } = useWalmartScenario();
  const location = useLocation();

  // Wait for the app to finish its initial render/hydration before showing splash
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const markReady = () => setAppReady(true);
    if (document.readyState === 'complete') {
      markReady();
    } else {
      window.addEventListener('load', markReady, { once: true });
      return () => window.removeEventListener('load', markReady);
    }
  }, []);

  useEffect(() => {
    if (!appReady) return;
    // Skip splash when returning from an internal page (e.g. add-more-items)
    if ((location.state as { skipSplash?: boolean } | null)?.skipSplash) return;
    setShowSplash(true);
  }, [appReady, location.state]);

  if (!showSplash) return null;
  return (
    <SplashScreen
      onFinish={() => {
        setShowSplash(false);
        setOnboardingActive(true);
        setOnboardingOpen(true);
      }}
    />
  );
}

function IndexInner() {
  const { setItemQuantity } = useCart();
  const { platform } = useLayoutSettings();
  const { scenario, basketVisible, setBasketVisible, setOnboardingOpen, setOnboardingActive } = useWalmartScenario();

  // Trigger onboarding only when user performs a pull-to-refresh gesture on the homepage
  useEffect(() => {
    let touchStartY = 0;
    let pulling = false;
    const PULL_THRESHOLD = 80;

    const onTouchStart = (e: TouchEvent) => {
      if (window.scrollY <= 0) {
        touchStartY = e.touches[0].clientY;
        pulling = true;
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!pulling) return;
      const delta = e.touches[0].clientY - touchStartY;
      if (delta > PULL_THRESHOLD) {
        pulling = false;
        setOnboardingActive(true);
        setOnboardingOpen(true);
      }
    };
    const onTouchEnd = () => {
      pulling = false;
    };

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [setOnboardingActive, setOnboardingOpen]);
  const hideCurbsideCard =
    scenario === "default" || scenario === "associate-discount";
  const carouselRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const el = carouselRef.current;
    if (!el) return;
    isDragging.current = true;
    startX.current = e.pageX - el.offsetLeft;
    scrollLeft.current = el.scrollLeft;
    el.style.cursor = 'grabbing';
    el.style.scrollSnapType = 'none';
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const el = carouselRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    el.scrollLeft = scrollLeft.current - walk;
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    const el = carouselRef.current;
    if (!el) return;
    el.style.cursor = '';
    el.style.scrollSnapType = '';
  }, []);

  const handleQuantityChange = (productIndex: number, quantity: number) => {
    setItemQuantity(productIndex, quantity);
  };

  return (
    <ResponsiveLayout maxWidth="full" showHomeExtras>
      <div className="pt-6 pb-32 space-y-4">

        {/* Active Curbside Order — countdown + express upgrade */}
        {!hideCurbsideCard && (
          <ActiveCurbsideCard onFlowComplete={() => setBasketVisible(true)} />
        )}

        {/* Order Status Card — mobile only, dismissible, hidden on iOS */}
        {!hideCurbsideCard && platform !== 'ios' && (
          <OrderStatusCard
            image="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F5f02b529221349099118d275e7e1d748"
            statusLine="Your order is on the way"
            deliveryLine="Arrives tomorrow by 8pm"
            trackHref="/walmart/purchase-history"
          />
        )}

        {/* New Arrivals Carousel */}
        <NewArrivalsCarousel />

        {/* Jump right back in — recently viewed products */}
        <JumpRightBackIn />

        {/* Flash Deals — horizontal scroll of deal cards */}
        <FlashDealsCarousel />

        {/* Promo Carousel Container */}
        <div
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide -mx-4 px-4 touch-pan-x cursor-grab select-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >

          {/* Grocery Bag Carousel */}
          <div className="relative rounded-lg overflow-hidden h-[543px] min-w-[320px] w-[320px] snap-center flex-shrink-0">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/c97966cd0f7092344bbece70c4c8a937bf2a51b3?width=638"
              alt="Grocery carousel background"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2 z-10">
              <div className="grid grid-cols-2 gap-2">
                {GROCERY_ITEMS.slice(0, 2).map((item) => (
                  <PromotionalItemTile
                    key={item.idx}
                    image={item.img}
                    price={item.price}
                    cents={item.cents}
                    idx={item.idx}
                    onQuantityChange={handleQuantityChange}
                  />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {GROCERY_ITEMS.slice(2).map((item) => (
                  <PromotionalItemTile
                    key={item.idx}
                    image={item.img}
                    price={item.price}
                    cents={item.cents}
                    idx={item.idx}
                    onQuantityChange={handleQuantityChange}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Bold Animal Prints Carousel */}
          <div className="relative rounded-lg overflow-hidden h-[543px] min-w-[320px] w-[320px] snap-center flex-shrink-0">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/bd1ca1d98d504c1728ea0b896f93c81704c50bd1?width=640"
              alt="Bold animal prints background"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute top-8 left-4 right-4 z-10">
              <h2 className="text-white text-[36px] font-bold leading-[38px] max-w-[230px]">Bold animal prints</h2>
            </div>
            <div className="absolute bottom-4 left-4 right-4 space-y-2 z-10">
              <div className="grid grid-cols-2 gap-2">
                {ANIMAL_PRINT_ITEMS.slice(0, 2).map((item) => (
                  <PromotionalItemTile
                    key={item.idx}
                    image={item.img}
                    price={item.price}
                    cents={item.cents}
                    idx={item.idx}
                    onQuantityChange={handleQuantityChange}
                  />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {ANIMAL_PRINT_ITEMS.slice(2).map((item) => (
                  <PromotionalItemTile
                    key={item.idx}
                    image={item.img}
                    price={item.price}
                    cents={item.cents}
                    idx={item.idx}
                    onQuantityChange={handleQuantityChange}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Home Refresh Carousel */}
          <div className="relative rounded-lg overflow-hidden h-[543px] min-w-[320px] w-[320px] snap-center flex-shrink-0">
            <div className="absolute inset-0 bg-[#e8f0e4]" />
            <div className="absolute top-8 left-4 right-4 z-10">
              <h2 className="text-[#2e4a22] text-[36px] font-bold leading-[38px] max-w-[200px]">
                Home refresh
              </h2>
              <p className="text-[#2e4a22] text-sm mt-1">Furniture & kitchen finds</p>
            </div>
            <div className="absolute bottom-4 left-4 right-4 space-y-2 z-10">
              <div className="grid grid-cols-2 gap-2">
                {HOME_REFRESH_ITEMS.slice(0, 2).map((item) => (
                  <PromotionalItemTile
                    key={item.idx}
                    image={item.img}
                    price={item.price}
                    cents={item.cents}
                    idx={item.idx}
                    onQuantityChange={handleQuantityChange}
                  />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {HOME_REFRESH_ITEMS.slice(2).map((item) => (
                  <PromotionalItemTile
                    key={item.idx}
                    image={item.img}
                    price={item.price}
                    cents={item.cents}
                    idx={item.idx}
                    onQuantityChange={handleQuantityChange}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* W+ Sponsored Promo Card */}
          <div className="flex flex-col min-w-[320px] w-[320px] snap-center flex-shrink-0">
            <div className="relative rounded-lg overflow-hidden h-[543px]">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F456ff4c02add4328a1b49b441d1346fa?format=webp&width=800&height=1200"
                alt="Walmart+ membership promo"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute top-6 left-4 right-4 z-10">
                <p className="text-[#2e2f32] text-sm font-semibold">Start saving today!</p>
                <h2 className="text-[#2e2f32] text-[32px] font-bold leading-[34px] mt-1 max-w-[260px]">
                  Get 50% of annual membership
                </h2>
                <a href="#" className="text-[#2e2f32] text-sm underline mt-3 inline-block font-semibold">
                  Shop all
                </a>
              </div>
            </div>
            <span className="text-right text-[#2e2f32]/60 text-xs mt-1 pr-1">Sponsored</span>
          </div>

          {/* Shop Vacuums Card */}
          <div className="relative rounded-lg overflow-hidden h-[543px] min-w-[320px] w-[320px] snap-center flex-shrink-0">
            <div className="absolute inset-0 bg-[#1a4d8f]" />
            <div className="absolute top-8 left-4 right-4 z-10">
              <h2 className="text-white text-[36px] font-bold leading-[38px] max-w-[230px]">
                Shop vacuums
              </h2>
              <p className="text-white text-sm mt-1">Robot & cordless finds</p>
            </div>
            <div className="absolute bottom-4 left-4 right-4 space-y-2 z-10">
              <div className="grid grid-cols-2 gap-2">
                {VACUUM_ITEMS.slice(0, 2).map((item) => (
                  <PromotionalItemTile
                    key={item.idx}
                    image={item.img}
                    price={item.price}
                    cents={item.cents}
                    idx={item.idx}
                    onQuantityChange={handleQuantityChange}
                  />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {VACUUM_ITEMS.slice(2).map((item) => (
                  <PromotionalItemTile
                    key={item.idx}
                    image={item.img}
                    price={item.price}
                    cents={item.cents}
                    idx={item.idx}
                    onQuantityChange={handleQuantityChange}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Continue Shopping section */}
        <ContinueShopping />

      </div>

      {/* Replenishment basket — hidden until ReplenishFlow completes */}
      {basketVisible && <ReplenishmentBasket />}
    </ResponsiveLayout>
  );
}
