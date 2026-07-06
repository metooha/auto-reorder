import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SearchBar } from "@/components/SearchBar";
import { ChevronLeftIcon as ChevronLeft, ShareIcon as Share, ZoomInIcon as ZoomIn, PlayIcon as Play } from "@/components/icons";
import { LocationIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";

export default function ProductDetail() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState<'shipping' | 'pickup' | 'delivery'>('shipping');
  const [purchaseType, setPurchaseType] = useState<'one-time' | 'subscribe'>('one-time');
  const [count, setCount] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);

  // Product data - Kellogg's Frosted Flakes from cereal search
  const product = {
    id: productId || '1',
    name: "Kellogg's Frosted Flakes, Breakfast Cereal, Original, Family Size, 13.5 oz",
    brand: "Kellogg's",
    price: 3.68,
    subscribePrice: 3.50,
    images: [
      "https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F783f38e6d773461b95706408b1a14434?format=webp&width=800", // Top Image - Main box
      "https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F8bc0f7dc642445539d23bdc006c6d5cf?format=webp&width=800", // Preview Image 2
      "https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fb2d031ba9c84489b89975b0dc4953d25?format=webp&width=800", // Preview Image 3
      "https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fc429f3723e394376af97dec1fb657c6d?format=webp&width=800", // Preview Image 4
      "https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fcddca7ae59c148588f0d6e520e3f2604?format=webp&width=800"  // Image 6
    ],
    rating: 4.7,
    reviewCount: 12234,
    inStock: true
  };

  const quantities = [
    { count: 1, price: 3.68 },
    { count: 4, price: 14.72 },
    { count: 6, price: 22.08 }
  ];

  // Calculate current price based on selected count
  const currentQuantity = quantities.find(q => q.count === count) || quantities[0];
  const currentPrice = currentQuantity.price;
  const currentSubscribePrice = currentPrice * 0.95; // 5% discount

  return (
    <div className="min-h-screen bg-white font-sans max-w-[430px] mx-auto relative">
      {/* iOS Status Bar */}
      <div className="flex items-center justify-between bg-white text-foreground h-[47px] px-4 py-2">
        <div className="text-[17px] font-semibold leading-[25.5px]">9:41</div>
        <div className="flex items-center gap-1">
          <div className="flex gap-[2px] items-end">
            <div className="w-[3px] h-[8px] bg-foreground rounded-sm"></div>
            <div className="w-[3px] h-[11px] bg-foreground rounded-sm"></div>
            <div className="w-[3px] h-[14px] bg-foreground rounded-sm"></div>
            <div className="w-[3px] h-[17px] bg-foreground rounded-sm"></div>
          </div>
          <svg width="18" height="14" viewBox="0 0 18 14" fill="currentColor" className="ml-1">
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
        query={product.name}
        showBackButton={true}
        cartCount={0}
      />

      {/* Main Content - Scrollable */}
      <div className="pb-24 overflow-y-auto" style={{ height: 'calc(100vh - 124px)' }}>
        {/* Product Images */}
        <div className="relative">
          <img
            src={product.images[selectedImage]}
            alt={product.name}
            className="w-full aspect-square object-contain bg-white p-4"
          />
          
          {/* Action Buttons Overlay */}
          <div className="absolute top-4 right-4 flex flex-col gap-3">
            <Button
              variant="secondary"
              size="medium"
              className="w-12 h-12 !p-0 shadow-md"
              aria-label="Share"
            >
              <Share className="w-5 h-5" />
            </Button>
            <Button
              variant="secondary"
              size="medium"
              className="w-12 h-12 !p-0 shadow-md"
              onClick={() => setIsFavorited(!isFavorited)}
              aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
            >
              <img
                src={isFavorited
                  ? "https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Feee85397b72744b58d1e2d93e0b3347a"
                  : "https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F5a5c1d37a124458d9d01df5d831c9d65"
                }
                alt=""
                className="w-5 h-5"
              />
            </Button>
            <Button
              variant="secondary"
              size="medium"
              className="w-12 h-12 !p-0 shadow-md"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-5 h-5" />
            </Button>
            <Button
              variant="secondary"
              size="medium"
              className="w-12 h-12 !p-0 shadow-md"
              aria-label="Play video"
            >
              <Play className="w-5 h-5" />
            </Button>
            <Button
              variant="secondary"
              size="medium"
              className="w-12 h-12 !p-0 shadow-md"
              aria-label="View history"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 6V10L13 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Button>
          </div>

          {/* Thumbnail Carousel */}
          <div className="flex gap-2 px-4 py-3 overflow-x-auto scrollbar-hide">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg border-2 overflow-hidden ${
                  selectedImage === index ? 'border-primary' : 'border-border'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
            {product.images.length > 5 && (
              <div className="flex-shrink-0 w-16 h-16 rounded-lg border-2 border-border bg-[var(--ld-semantic-color-fill-brand-subtle,#F5F8FF)] flex items-center justify-center">
                <span className="text-primary text-sm font-bold">+4</span>
              </div>
            )}
          </div>
        </div>

        {/* Count Selector */}
        <div className="px-4 py-3">
          <div className="text-foreground text-[14px] font-semibold mb-2">Count: {count}</div>
          <div className="flex gap-3">
            {quantities.map((q) => (
              <button
                key={q.count}
                onClick={() => {
                  setCount(q.count);
                  setSelectedQuantity(q.count);
                }}
                className="flex-1 py-4 px-4 transition-colors"
                style={{
                  border: count === q.count ? '3px solid rgba(0, 0, 0, 1)' : '1px solid rgba(186, 187, 190, 1)',
                  borderRadius: '12px',
                  backgroundColor: 'var(--input-background)'
                }}
              >
                <div className="text-foreground text-[18px] font-bold">{q.count}</div>
                <div className="text-foreground text-[14px] font-semibold">${q.price.toFixed(2)}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="px-4 py-4 space-y-4">
          {/* Price */}
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-foreground text-[28px] font-bold">${currentPrice.toFixed(2)}</span>
              <span className="text-muted-foreground text-[14px]">Price when purchased online</span>
            </div>
            <div className="text-[18px] mt-1" style={{ color: 'var(--ld-semantic-color-text-accent-green)', fontWeight: '500' }}>
              <span style={{ fontWeight: '500' }}>$</span>
              <span style={{ fontWeight: '500' }}>{currentSubscribePrice.toFixed(2)}</span>
              <span style={{ fontWeight: '500' }}> when subscribed</span>
            </div>
          </div>

          {/* Subscribe Option */}
          <div className="p-4 space-y-3" style={{ border: '1px solid rgba(186, 187, 190, 1)', borderRadius: '20px' }}>
            <button
              onClick={() => setPurchaseType('subscribe')}
              className="w-full flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{
                    border: purchaseType === 'subscribe'
                      ? '8px solid rgb(2, 8, 23)'
                      : '1px solid rgba(0, 0, 0, 1)'
                  }}
                />
                <span className="text-foreground text-[16px] font-semibold">Subscribe to save 5%</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-[16px] font-bold" style={{ color: 'var(--ld-semantic-color-text-accent-green)' }}>${currentSubscribePrice.toFixed(2)}</span>
                <span className="text-muted-foreground text-[14px] line-through">${currentPrice.toFixed(2)}</span>
              </div>
            </button>

            {/* Subscribe Details */}
            <div className="rounded-[12px] p-4 flex items-start gap-3" style={{ backgroundColor: 'var(--ld-semantic-color-fill-brand-subtle)' }}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fefe513f16c9e4a70baa9781ff7f1f95e?format=webp&width=200"
                alt="Subscribe icon"
                className="flex-shrink-0 w-12 h-12"
              />
              <div className="flex-1">
                <h3 className="text-foreground text-[16px] font-bold mb-1">Get 5% off eligible items</h3>
                <Button
                  variant="tertiary"
                  size="small"
                  className="!h-auto !p-0 underline"
                >
                  See details and terms
                </Button>
              </div>
            </div>
          </div>

          {/* One-time Purchase */}
          <button
            onClick={() => setPurchaseType('one-time')}
            className="w-full flex items-center justify-between p-4 transition-colors"
            style={{
              borderRadius: '20px',
              border: purchaseType === 'one-time' ? '2px solid rgb(2, 8, 23)' : '1px solid rgba(186, 187, 190, 1)',
              backgroundColor: purchaseType === 'one-time'
                ? 'var(--background)'
                : 'var(--input-background)'
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{
                  border: purchaseType === 'one-time'
                    ? '8px solid rgb(2, 8, 23)'
                    : '1px solid rgba(186, 187, 190, 1)'
                }}
              />
              <span className="text-foreground text-[16px] font-semibold">One-time purchase</span>
            </div>
            <span className="text-foreground text-[16px] font-bold">${currentPrice.toFixed(2)}</span>
          </button>

          {/* Delivery Options */}
          <div>
            <h3 className="text-foreground text-[16px] font-bold mb-3">How do you want your item?</h3>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setSelectedDeliveryMethod('shipping')}
                className="p-4 transition-colors"
                style={{
                  border: selectedDeliveryMethod === 'shipping' ? '2px solid rgba(0, 0, 0, 1)' : '2px solid rgba(186, 187, 190, 1)',
                  borderRadius: '16px',
                  backgroundColor: 'var(--input-background)'
                }}
              >
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fde08e89ef80c46a4ba6a4c4befb01d8b?format=webp&width=100"
                  alt="Shipping"
                  className="mx-auto mb-2 w-8 h-8"
                />
                <div className="text-foreground text-[14px] font-semibold mb-1">Shipping</div>
                <div className="text-muted-foreground text-[12px]">Arrives Dec 27</div>
                <div className="text-[14px] font-bold mt-1" style={{ color: 'var(--ld-semantic-color-text-accent-green)' }}>Free</div>
              </button>

              <button
                onClick={() => setSelectedDeliveryMethod('pickup')}
                className="p-4 transition-colors"
                style={{
                  border: selectedDeliveryMethod === 'pickup' ? '2px solid rgba(0, 0, 0, 1)' : '2px solid rgba(186, 187, 190, 1)',
                  borderRadius: '16px',
                  backgroundColor: 'var(--input-background)'
                }}
              >
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F4162bcccec8744c8a0d71e03e3be7122?format=webp&width=100"
                  alt="Pickup"
                  className="mx-auto mb-2 w-8 h-8"
                />
                <div className="text-foreground text-[14px] font-semibold mb-1">Pickup</div>
                <div className="text-muted-foreground text-[12px]">as soon as 8 pm</div>
                <div className="text-[14px] font-bold mt-1" style={{ color: 'var(--ld-semantic-color-text-accent-green)' }}>Free</div>
              </button>

              <button
                onClick={() => setSelectedDeliveryMethod('delivery')}
                className="p-4 transition-colors"
                style={{
                  border: selectedDeliveryMethod === 'delivery' ? '2px solid rgba(0, 0, 0, 1)' : '2px solid rgba(186, 187, 190, 1)',
                  borderRadius: '16px',
                  backgroundColor: 'var(--input-background)'
                }}
              >
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fde08e89ef80c46a4ba6a4c4befb01d8b?format=webp&width=100"
                  alt="Delivery"
                  className="mx-auto mb-2 w-8 h-8"
                />
                <div className="text-foreground text-[14px] font-semibold mb-1">Delivery</div>
                <div className="text-muted-foreground text-[12px]">Today</div>
                <div className="text-[14px] font-bold mt-1" style={{ color: 'var(--ld-semantic-color-text-accent-green)' }}>Free</div>
              </button>
            </div>
          </div>

          {/* Location Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-foreground text-[14px]">
              <LocationIcon width={16} height={16} />
              <span className="font-semibold">Pickup from Bentonville Supercenter</span>
              <span className="text-primary underline cursor-pointer">Aisle E24</span>
            </div>
            <div className="text-muted-foreground text-[14px]">Delivery to Bentonville, 72712</div>
          </div>

          {/* Returns Info */}
          <div className="flex items-center gap-2">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fdb68dbbe41964fcf9fdb5a1ba1797a85"
              alt="Returns"
              className="w-5 h-5"
            />
            <span className="text-primary text-[14px] font-semibold">Free 90-day returns</span>
            <Button
              variant="tertiary"
              size="small"
              className="!h-auto !p-0 underline"
            >
              Details
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Action Buttons - Fixed */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-background border-t border-input px-4 py-3 flex gap-3">
        <Button
          variant="secondary"
          size="large"
          className="flex-1"
        >
          Buy now
        </Button>
        <Button
          variant="primary"
          size="large"
          className="flex-1"
        >
          Add to cart
        </Button>
      </div>
    </div>
  );
}
