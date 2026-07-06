import { BottomNav } from "@/components/BottomNav";
import { SearchBar } from "@/components/SearchBar";
import { AddToCart } from "@/components/AddToCart";
import { InfoIcon as Info } from "@/components/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SlidersIcon } from "@/components/icons";

interface ProductCardProps {
  hasBadge?: boolean;
  badgeText?: string;
  imageUrl: string;
  title: string;
  brandName?: string;
  sponsoredTag: string;
  price?: string;
  cents?: string;
  hasDiscount?: boolean;
  discountPrice?: string;
  discountCents?: string;
  originalPrice?: string;
  rating: number;
  reviewCount: string;
  fulfillment: string;
  fulfillmentBold?: string;
  productIndex?: number;
  onQuantityChange?: (quantity: number) => void;
  onClick?: () => void;
}

function ProductCard({
  hasBadge = false,
  badgeText = "Best Seller",
  imageUrl,
  title,
  brandName,
  sponsoredTag,
  price,
  cents,
  hasDiscount = false,
  discountPrice,
  discountCents,
  originalPrice,
  rating,
  reviewCount,
  fulfillment,
  fulfillmentBold = "tomorrow",
  productIndex,
  onQuantityChange,
  onClick
}: ProductCardProps) {
  const fullStars = Math.floor(rating);
  const hasEmptyStar = rating < 5;

  return (
    <div className="flex pb-3 flex-col items-start flex-1 self-stretch bg-white">
      {/* Badge Flag Zone - Always render to maintain alignment */}
      <div className="flex pb-1 items-start gap-1 self-stretch h-[28px]">
        {hasBadge && (
          <div className="flex h-6 px-2 py-1 justify-center items-center gap-1 rounded bg-[var(--ld-semantic-color-fill-accent-blue-subtle,#E9F1FE)]">
            <span className="text-primary text-xs font-bold leading-4" style={{ fontFamily: 'Everyday Sans UI, -apple-system, Roboto, Helvetica, sans-serif' }}>
              {badgeText}
            </span>
          </div>
        )}
      </div>

      {/* Visual Zone */}
      <div className="flex w-full pb-4 flex-col justify-center items-center">
        {/* Product Image */}
        <div className="flex pb-2 flex-col items-start relative w-full">
          <img
            src={imageUrl}
            alt={title}
            className="w-full aspect-[3/4] object-cover cursor-pointer"
            onClick={onClick}
          />
          {/* Add to Cart Button */}
          <div className="absolute right-2 bottom-[20px] flex flex-col items-center shadow-[0_-0.75px_2.25px_0_rgba(0,0,0,0.10),0_2.25px_3.75px_1.5px_rgba(0,0,0,0.15)] rounded-full">
            <AddToCart onQuantityChange={onQuantityChange} />
          </div>
          {/* Heart Button */}
          <div className="absolute right-2 top-2 flex flex-col items-center">
            <button className="flex p-1 flex-col items-start rounded-full bg-white shadow-[0_-1px_2px_0_rgba(0,0,0,0.10),0_1px_2px_1px_rgba(0,0,0,0.15)]">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.81 3.03381C11.656 3.03381 12.4674 3.37445 13.0657 3.9808C13.6639 4.58714 14 5.40953 14 6.26703V6.34811C14 7.80761 12.94 9.26712 11.59 10.5138C10.5603 11.4352 9.43738 12.2438 8.24001 12.926C8.16615 12.966 8.08372 12.9868 8.00001 12.9868C7.9163 12.9868 7.83388 12.966 7.76002 12.926C6.56264 12.2438 5.43975 11.4352 4.41002 10.5138C3.06003 9.26712 2.00002 7.80761 2.00002 6.34811V6.26703C1.99292 5.63706 2.16813 5.01878 2.504 4.48865C2.83986 3.95852 3.32165 3.53979 3.88981 3.28422C4.45796 3.02864 5.08756 2.94744 5.70075 3.05065C6.31395 3.15386 6.88385 3.43695 7.34001 3.86492L7.63001 4.13858C7.73226 4.22979 7.8638 4.28012 8.00001 4.28012C8.13622 4.28012 8.26777 4.22979 8.37001 4.13858L8.66001 3.86492C9.2467 3.31906 10.0136 3.01538 10.81 3.01355M10.81 2C9.76771 2.0068 8.76552 2.40804 8.00001 3.12503C7.40066 2.56981 6.65472 2.20354 5.85334 2.07096C5.05196 1.93839 4.22984 2.04525 3.4874 2.3785C2.74497 2.71175 2.11436 3.25695 1.67264 3.9475C1.23091 4.63805 0.997194 5.44405 1.00003 6.26703V6.34811C1.00003 7.93938 1.92002 9.59146 3.74002 11.2638C4.82428 12.2364 6.00761 13.0892 7.27001 13.8078C7.49322 13.9338 7.7445 14 8.00001 14C8.25552 14 8.5068 13.9338 8.73001 13.8078C9.99242 13.0892 11.1757 12.2364 12.26 11.2638C14.08 9.59146 15 7.9191 15 6.34811V6.26703C14.9974 5.14154 14.5551 4.06291 13.7699 3.26707C12.9847 2.47123 11.9204 2.02294 10.81 2.02027V2Z" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Color Variants */}
        <div className="flex w-[164px] justify-center items-center gap-0.5">
          <div className="flex items-center gap-1">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10" cy="10" r="8" fill="#1B161D"/>
              <g style={{ mixBlendMode: 'multiply' }} opacity="0.4">
                <circle cx="10" cy="10" r="7.5" stroke="#2E2F32"/>
              </g>
            </svg>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10" cy="10" r="8" fill="#91305E"/>
              <g style={{ mixBlendMode: 'multiply' }} opacity="0.4">
                <circle cx="10" cy="10" r="7.5" stroke="#2E2F32"/>
              </g>
              <circle cx="10" cy="10" r="9.5" stroke="#2E2F32"/>
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="flex px-1 flex-col items-start self-stretch">
          {/* Sponsored Tag */}
          <div className="flex pb-1 items-start self-stretch">
            <span className="text-muted-foreground text-xs font-normal leading-[14px]" style={{ fontFamily: 'Everyday Sans UI, -apple-system, Roboto, Helvetica, sans-serif' }}>
              {sponsoredTag}
            </span>
          </div>

          {/* Pricing */}
          <div className="flex max-w-[164px] pb-1 items-center content-center flex-wrap">
            {hasDiscount ? (
              <div className="flex max-w-[164px] pr-1 items-center content-center flex-wrap">
                <div className="flex pr-1 items-center">
                  <div className="flex pr-0.5 justify-center items-center gap-1">
                    <span className="text-[var(--ld-semantic-color-text-accent-green,#2A8703)] text-xl font-bold leading-6" style={{ fontFamily: 'Everyday Sans UI, -apple-system, Roboto, Helvetica, sans-serif' }}>Now</span>
                  </div>
                  <div className="flex w-[7px] pb-1.5 flex-col justify-center items-center gap-1 self-stretch">
                    <span className="text-[var(--ld-semantic-color-text-accent-green,#2A8703)] text-sm font-bold leading-4" style={{ fontFamily: 'Everyday Sans UI, -apple-system, Roboto, Helvetica, sans-serif' }}>$</span>
                  </div>
                  <div className="flex justify-center items-end gap-1">
                    <span className="text-[var(--ld-semantic-color-text-accent-green,#2A8703)] text-2xl font-bold leading-5" style={{ fontFamily: 'Everyday Sans UI, -apple-system, Roboto, Helvetica, sans-serif' }}>{discountPrice}</span>
                  </div>
                  <div className="flex h-[17px] pb-2 flex-col justify-center items-center gap-1">
                    <span className="text-[var(--ld-semantic-color-text-accent-green,#2A8703)] text-sm font-bold leading-4" style={{ fontFamily: 'Everyday Sans UI, -apple-system, Roboto, Helvetica, sans-serif' }}>{discountCents}</span>
                  </div>
                </div>
                <div className="flex pt-px items-start">
                  <span className="text-muted-foreground text-sm font-normal leading-5 line-through" style={{ fontFamily: 'Everyday Sans UI, -apple-system, Roboto, Helvetica, sans-serif' }}>
                    ${originalPrice}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex pr-1 items-center">
                <div className="flex w-[7px] h-[17px] pb-1.5 flex-col justify-center items-center gap-1">
                  <span className="self-stretch text-foreground text-sm font-bold leading-4" style={{ fontFamily: 'Everyday Sans UI, -apple-system, Roboto, Helvetica, sans-serif' }}>$</span>
                </div>
                <div className="flex justify-center items-end gap-1 self-stretch">
                  <span className="text-foreground text-2xl font-bold leading-5" style={{ fontFamily: 'Everyday Sans UI, -apple-system, Roboto, Helvetica, sans-serif' }}>{price}</span>
                </div>
                <div className="flex h-[17px] pb-2 flex-col justify-center items-center gap-1">
                  <span className="text-foreground text-sm font-bold leading-4" style={{ fontFamily: 'Everyday Sans UI, -apple-system, Roboto, Helvetica, sans-serif' }}>{cents}</span>
                </div>
              </div>
            )}
          </div>

          {/* Title */}
          <div className="flex pb-1 justify-center items-start gap-2.5 self-stretch">
            <div className="flex-1 text-foreground text-sm font-normal leading-4 line-clamp-2" style={{ fontFamily: 'Everyday Sans UI, -apple-system, Roboto, Helvetica, sans-serif' }}>
              {brandName && <span className="font-semibold">{brandName}</span>}
              {brandName ? ' ' : ''}{title}
            </div>
          </div>

          {/* Ratings */}
          <div className="flex pb-1 items-center gap-1">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: fullStars }).map((_, i) => (
                <svg key={`full-${i}`} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M6.21273 0.0530012C6.30351 0.100832 6.37718 0.177984 6.42286 0.273051L8.0405 3.64013L11.5982 4.21078C11.8566 4.25224 12.0341 4.50524 11.9945 4.77589C11.9791 4.88108 11.9318 4.9783 11.8596 5.05317L9.30162 7.70479L10.0569 11.4004C10.1116 11.6681 9.94869 11.9316 9.69303 11.9889C9.58941 12.0121 9.48135 11.9983 9.38613 11.9496L5.99997 10.2169L2.6138 11.9496C2.37889 12.0698 2.09541 11.9678 1.98063 11.7218C1.93411 11.6221 1.92088 11.5089 1.94306 11.4004L2.69832 7.70479L0.140365 5.05317C-0.045448 4.86055 -0.0469752 4.54666 0.136954 4.35207C0.208444 4.27643 0.301276 4.2269 0.401726 4.21078L3.95944 3.64013L5.57708 0.273051C5.69458 0.0284626 5.97918 -0.0700572 6.21273 0.0530012Z" fill="#FFC220"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.36564 4.54466L5.99997 1.70204L4.63429 4.54466L1.52101 5.04403L3.78346 7.38933L3.13563 10.5592L5.99997 9.09359L8.8643 10.5592L8.21648 7.38933L10.4789 5.04403L7.36564 4.54466ZM8.0405 3.64013L6.42286 0.273051C6.37718 0.177984 6.30351 0.100832 6.21273 0.0530012C5.97918 -0.0700572 5.69458 0.0284626 5.57708 0.273051L3.95944 3.64013L0.401726 4.21078C0.301276 4.2269 0.208444 4.27643 0.136954 4.35207C-0.0469752 4.54666 -0.045448 4.86055 0.140365 5.05317L2.69832 7.70479L1.94306 11.4004C1.92088 11.5089 1.93411 11.6221 1.98063 11.7218C2.09541 11.9678 2.37889 12.0698 2.6138 11.9496L5.99997 10.2169L9.38613 11.9496C9.48135 11.9983 9.58941 12.0121 9.69303 11.9889C9.94869 11.9316 10.1116 11.6681 10.0569 11.4004L9.30162 7.70479L11.8596 5.05317C11.9318 4.9783 11.9791 4.88108 11.9945 4.77589C12.0341 4.50524 11.8566 4.25224 11.5982 4.21078L8.0405 3.64013Z" fill="#CC851A"/>
                </svg>
              ))}
              {hasEmptyStar && (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.53436 4.31853L5.99997 1.12474L4.46558 4.31853L1.00867 4.87302L3.51217 7.4682L2.78657 11.0187L5.99997 9.37441L9.21337 11.0187L8.48776 7.4682L10.9913 4.87302L7.53436 4.31853ZM8.0405 3.64013L6.42286 0.273051C6.37718 0.177984 6.30351 0.100832 6.21273 0.0530012C5.97918 -0.0700572 5.69458 0.0284626 5.57708 0.273051L3.95944 3.64013L0.401726 4.21078C0.301276 4.2269 0.208444 4.27643 0.136954 4.35207C-0.0469752 4.54666 -0.045448 4.86055 0.140365 5.05317L2.69832 7.70479L1.94306 11.4004C1.92088 11.5089 1.93411 11.6221 1.98063 11.7218C2.09541 11.9678 2.37889 12.0698 2.6138 11.9496L5.99997 10.2169L9.38613 11.9496C9.48135 11.9983 9.58941 12.0121 9.69303 11.9889C9.94869 11.9316 10.1116 11.6681 10.0569 11.4004L9.30162 7.70479L11.8596 5.05317C11.9318 4.9783 11.9791 4.88108 11.9945 4.77589C12.0341 4.50524 11.8566 4.25224 11.5982 4.21078L8.0405 3.64013Z" fill="#CC851A"/>
                </svg>
              )}
            </div>
            <span className="text-muted-foreground text-xs font-normal leading-3" style={{ fontFamily: 'Everyday Sans UI, -apple-system, Roboto, Helvetica, sans-serif' }}>
              {reviewCount}
            </span>
          </div>

          {/* Walmart+ Tag */}
          <div className="flex w-[164px] pb-1 items-center gap-0.5">
            <span className="text-primary text-xs font-bold leading-[14px]" style={{ fontFamily: 'Everyday Sans UI, -apple-system, Roboto, Helvetica, sans-serif' }}>Save with</span>
            <svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M11.8765 10.8643C11.8853 11.1331 12.1836 11.395 12.561 11.395C12.9379 11.395 13.2348 11.1331 13.2443 10.8655L13.3018 9.23568L14.9076 9.17524C15.1723 9.16631 15.4302 8.8636 15.4302 8.48005C15.4302 8.09751 15.1723 7.79582 14.9089 7.78613L13.3063 7.72518L13.2448 6.09685C13.236 5.82806 12.9377 5.56641 12.5603 5.56641C12.1834 5.56641 11.8866 5.82806 11.8768 6.09558L11.8205 7.72084L10.2135 7.78587C9.9488 7.7948 9.69116 8.09751 9.69116 8.48081C9.69116 8.8636 9.9488 9.16529 10.2125 9.17498L11.8158 9.23542L11.8765 10.8643Z" fill="#0053E2"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M11.9889 3.95541L11.6974 0.60364C11.6668 0.264969 12.0788 0 12.5589 0C13.0398 0 13.4504 0.27466 13.4212 0.60364L13.129 3.95541C13.1174 4.16784 12.8532 4.31244 12.5579 4.31244C12.2644 4.31244 12.0065 4.15203 11.9889 3.95541Z" fill="#FFC220"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M16.1821 11.2253L18.8943 13.1556C19.167 13.3413 19.5989 13.1212 19.8402 12.6994C20.0798 12.2765 20.0484 11.7828 19.7556 11.6385L16.7521 10.2205C16.5645 10.1484 16.3102 10.2828 16.162 10.5431C16.0156 10.8025 16.0274 11.094 16.1821 11.2253Z" fill="#FFC220"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M16.093 6.33719C16.2401 6.59655 16.5063 6.74931 16.6831 6.66107L19.6866 5.24085C19.9854 5.09447 20.0097 4.6038 19.7712 4.18097C19.5299 3.75814 19.0992 3.53908 18.8253 3.72474L16.1131 5.65705C15.9443 5.77997 15.9456 6.07682 16.093 6.33719Z" fill="#FFC220"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M11.9884 13.0448L11.6968 16.3966C11.6757 16.7128 12.0783 17.0002 12.5584 17.0002C13.0392 17.0002 13.4478 16.7273 13.4207 16.3966L13.1284 13.0448C13.1116 12.84 12.8527 12.6875 12.5574 12.6875C12.2638 12.6888 12.0067 12.8451 11.9884 13.0448Z" fill="#FFC220"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M1.63746 4.62012C1.79013 5.40406 2.22529 7.67912 2.22529 7.67912C2.40759 8.61455 2.57584 9.59536 2.70239 10.3709H2.72449C2.84803 9.54742 3.04214 8.76705 3.24955 7.80051L3.98177 4.62012H5.6019L6.28667 7.88263C6.46646 8.79051 6.60934 9.48953 6.72183 10.3339H6.74393C6.86772 9.48137 7.02793 8.75328 7.20471 7.82142L7.86235 4.62012H9.41744L7.49122 12.0247C6.26432 12.2978 5.79425 11.7962 5.62526 11C5.45676 10.2038 5.12782 8.68748 5.12782 8.68748C4.95907 7.85738 4.82749 7.27159 4.73484 6.41956H4.71148C4.57991 7.26343 4.4423 7.85483 4.23765 8.68442L3.42909 12.0247C2.17658 12.278 1.74217 11.9026 1.50085 10.882C1.29445 10.0075 0 4.62012 0 4.62012H1.63746Z" fill="#0053E2"/>
            </svg>
          </div>

          {/* Fulfillment */}
          <div className="flex flex-col items-start self-stretch">
            <div className="flex items-start">
              <div className="flex max-w-[164px] items-center content-center gap-px flex-wrap">
                <span className="text-foreground text-xs font-normal leading-[14px]" style={{ fontFamily: 'Everyday Sans UI, -apple-system, Roboto, Helvetica, sans-serif' }}>
                  {fulfillment}
                </span>
                <span className="text-foreground text-xs font-bold leading-[14px]" style={{ fontFamily: 'Everyday Sans UI, -apple-system, Roboto, Helvetica, sans-serif' }}>
                  {' '}{fulfillmentBold}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="flex w-[164px] pt-2 flex-col items-start gap-2.5">
        <div className="h-px self-stretch bg-border"></div>
      </div>
    </div>
  );
}

export default function DressesSearchResults() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'shop' | 'heart' | 'user'>('shop');
  const [cartItems, setCartItems] = useState<Record<number, number>>({});

  // Calculate total cart count
  const totalCartCount = Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);

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

  const products = [
    {
      hasBadge: true,
      imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/de305f0d49e3b4125e6187e85a11d8e2631e68ca?width=360",
      brandName: "Scoop",
      title: "Women's Jersey Knit Maxi Dress with Side Ruching, Sizes XS-XXL",
      sponsoredTag: "Featured Walmart brand",
      price: "26",
      cents: "00",
      rating: 4,
      reviewCount: "17",
      fulfillment: "Shipping, arrives",
    },
    {
      imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/ec5666ab7002f8efe4a65c2fce1fe74000b757d3?width=360",
      brandName: "Fantaslook",
      title: " Women Dresses V Neck Ruffle Sleeve Casual Flowy Sundresses Button Floral Midi Dress with Pockets",
      sponsoredTag: "Sponsored",
      hasDiscount: true,
      discountPrice: "15",
      discountCents: "39",
      originalPrice: "39.99",
      rating: 4,
      reviewCount: "195",
      fulfillment: "Free shipping, arrives",
    },
    {
      hasBadge: true,
      imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/8319a699f370b2ddf838f643e2b9569b7647f463?width=360",
      brandName: "Scoop",
      title: "Women's Jersey Knit Maxi Dress with Side Ruching, Sizes XS-XXL",
      sponsoredTag: "Featured Walmart brand",
      price: "26",
      cents: "00",
      rating: 4,
      reviewCount: "17",
      fulfillment: "Shipping, arrives",
    },
    {
      imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/598fda4f79def07a17f67c9c4ee4c8683e71a2b8?width=360",
      brandName: "Fantaslook",
      title: " Women Dresses V Neck Ruffle Sleeve Casual Flowy Sundresses Button Floral Midi Dress with Pockets",
      sponsoredTag: "Sponsored",
      hasDiscount: true,
      discountPrice: "15",
      discountCents: "39",
      originalPrice: "39.99",
      rating: 4,
      reviewCount: "195",
      fulfillment: "Free shipping, arrives",
    },
    {
      hasBadge: true,
      imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/c82b67440546fccc2c68e447d9343b112365208b?width=360",
      title: "Time and Tru Women's Lightweight Hooded Utility Jacket, Sizes XS-XXL",
      sponsoredTag: "Featured Walmart brand",
      price: "20",
      cents: "99",
      rating: 4,
      reviewCount: "12",
      fulfillment: "Shipping, arrives",
    },
    {
      imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/ba84adf3d2954a1dfdb34bc427e1c2db0b949307?width=360",
      title: "INSPIRE CHIC Women's Dress Holiday Long Sleeve Tie V Neck Pleated A-Line Midi Dress XL Dark Green",
      sponsoredTag: "Sponsored",
      hasDiscount: true,
      discountPrice: "18",
      discountCents: "99",
      originalPrice: "32.99",
      rating: 4,
      reviewCount: "135",
      fulfillment: "Free shipping, arrives",
    },
    {
      hasBadge: true,
      imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/8319a699f370b2ddf838f643e2b9569b7647f463?width=360",
      title: "Scoop Women's Soft Knit Cardigan, Sizes XS-XXL",
      sponsoredTag: "Featured Walmart brand",
      price: "22",
      cents: "50",
      rating: 4,
      reviewCount: "25",
      fulfillment: "Shipping, arrives",
    },
    {
      imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/07c79b10f060a6ba2d91d965409f184a13ef9647?width=360",
      title: "Fantaslook Women's Casual Button Down Long Sleeve Maxi Dress with Pockets",
      sponsoredTag: "Sponsored",
      hasDiscount: true,
      discountPrice: "19",
      discountCents: "99",
      originalPrice: "34.99",
      rating: 4,
      reviewCount: "150",
      fulfillment: "Free shipping, arrives",
    },
    {
      hasBadge: true,
      imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/ae3c1a36ae334611b8b4af5d2b0bdaf5137e6d26?width=360",
      title: "No Boundaries Women's Fleece Lined Leggings, One Size Fits Most",
      sponsoredTag: "Featured Walmart brand",
      price: "29",
      cents: "99",
      rating: 4,
      reviewCount: "30",
      fulfillment: "Shipping, arrives",
    },
    {
      imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/3ea136a3f9069caccab1f0bdabbc7110aedc23d4?width=360",
      title: "Time and Tru Women's and Women's Plus Ruffle Midi Dress with Flutter Sleeves, Sizes XS-4X",
      sponsoredTag: "Sponsored",
      hasDiscount: true,
      discountPrice: "24",
      discountCents: "99",
      originalPrice: "40.00",
      rating: 4,
      reviewCount: "210",
      fulfillment: "Free shipping, arrives",
    },
  ];

  const visualTypeaheadItems = [
    { image: "https://api.builder.io/api/v1/image/assets/TEMP/8f6fb63363db6b6bc78b964a6419faeb2f38e358?width=76", label: "Get it today" },
    { image: "https://api.builder.io/api/v1/image/assets/TEMP/bd621d01430adcd4f70d8477eaacc4b8208b3ea1?width=76", label: "Under $20" },
    { image: "https://api.builder.io/api/v1/image/assets/TEMP/4617b70ce9e1441c216e78fd3545debc38d0c541?width=76", label: "The dress edit" },
    { image: "https://api.builder.io/api/v1/image/assets/TEMP/b45550f15633bc9e107cd970107b17eb406bbaf2?width=76", label: "Plus size dresses" },
    { image: "https://api.builder.io/api/v1/image/assets/TEMP/a96de2f981e57bc35ae51246c33a45c48426ff6e?width=76", label: "Mini dresses" },
    { image: "https://api.builder.io/api/v1/image/assets/TEMP/b41f716b0b9181329e3f10dc74b36b7ed8d820c0?width=76", label: "Midi dresses" },
    { image: "https://api.builder.io/api/v1/image/assets/TEMP/d6eb42d9348052242d1b800a9787d0d0674827cc?width=76", label: "Maxi dresses" },
    { image: "https://api.builder.io/api/v1/image/assets/TEMP/7b6d40548da3e7731aedc0ed486312d57c1a43dd?width=76", label: "Casual dresses" },
  ];

  return (
    <div className="min-h-screen bg-white font-sans max-w-[430px] mx-auto relative pb-20">
      {/* iOS Status Bar */}
      <div className="flex items-center justify-between bg-white text-foreground h-[47px] px-4 py-2">
        <div className="text-[17px] font-semibold leading-[25.5px]">9:41</div>
        <div className="flex items-center gap-1">
          <div className="flex items-end gap-0.5">
            <div className="w-[3px] h-[8px] bg-foreground rounded-[4px]"></div>
            <div className="w-[3px] h-[11px] bg-foreground rounded-[4px]"></div>
            <div className="w-[3px] h-[14px] bg-foreground rounded-[4px]"></div>
            <div className="w-[3px] h-[17px] bg-foreground rounded-[4px]"></div>
          </div>
          <svg width="18" height="14" viewBox="0 0 18 14" fill="currentColor" className="ml-1">
            <path d="M9 5.5c1.38 0 2.67.47 3.69 1.26l1.06-1.06C12.36 4.56 10.74 4 9 4s-3.36.56-4.75 1.7l1.06 1.06C6.33 5.97 7.62 5.5 9 5.5zm-3.54 3.54C6.39 8.41 7.65 8 9 8s2.61.41 3.54 1.04l1.06-1.06C12.27 7.12 10.68 6.5 9 6.5s-3.27.62-4.6 1.48l1.06 1.06zM12 11c0-1.66-1.34-3-3-3s-3 1.34-3 3c0 .55.45 1 1 1h4c.55 0 1-.45 1-1z" />
          </svg>
          <div className="border-2 border-foreground rounded-[4px] w-[25px] h-[12px] relative ml-1">
            <div className="absolute right-[-3px] top-[2px] w-[2px] h-[4px] bg-foreground rounded-r-[4px]"></div>
            <div className="bg-foreground rounded-[4px] h-full w-[90%]"></div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <SearchBar
        query="dresses for women"
        showBackButton={true}
        cartCount={totalCartCount}
      />

      {/* Main Content */}
      <div className="flex flex-col w-full">
        {/* Walmart Skyline Banner */}
        <div className="flex p-2.5 px-[9px] flex-col items-start gap-2.5 self-stretch border-b border-border overflow-hidden">
          <div className="flex w-full items-center">
            <div className="flex items-center gap-2 flex-1">
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/749d1de0784554414f2ffffc34b5fb0615db35f6?width=74" 
                alt="Time and Trust Logo" 
                className="w-[37px] h-5 flex-shrink-0"
                style={{ mixBlendMode: 'multiply' }}
              />
              <span className="text-foreground text-xs font-normal leading-4" style={{ fontFamily: 'Everyday Sans UI, -apple-system, Roboto, Helvetica, sans-serif' }}>
                Best sellers are back with 20% off
              </span>
            </div>
            <div className="flex justify-end items-center gap-1 flex-shrink-0">
              <span className="text-muted-foreground text-xs font-normal leading-4 text-right" style={{ fontFamily: 'Everyday Sans UI, -apple-system, Roboto, Helvetica, sans-serif' }}>
                Sponsored
              </span>
              <Info className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex py-2 px-0 pl-3 items-start gap-2 self-stretch overflow-x-auto scrollbar-hide">
          <button className="flex min-w-8 min-h-8 p-0 px-2 items-center gap-2 rounded-full border border-muted-foreground bg-white">
            <SlidersIcon className="w-4 h-4" />
          </button>
          
          <button className="flex min-h-8 px-3 py-1 items-center gap-2 rounded-full border border-muted-foreground bg-white">
            <span className="text-foreground text-sm font-normal leading-5 whitespace-nowrap" style={{ fontFamily: 'Everyday Sans UI, -apple-system, Roboto, Helvetica, sans-serif' }}>
              Brand
            </span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.37683 11.3338L14 5.1915L13.2463 4.49976L8 10.2304L2.75366 4.49976L2 5.1915L7.62317 11.3338C7.71999 11.4395 7.85671 11.4998 8 11.4998C8.14329 11.4998 8.28 11.4395 8.37683 11.3338Z" fill="currentColor"/>
            </svg>
          </button>

          <button className="flex min-h-8 px-3 py-1 items-center gap-2 rounded-full border border-muted-foreground bg-white">
            <span className="text-foreground text-sm font-normal leading-5 whitespace-nowrap" style={{ fontFamily: 'Everyday Sans UI, -apple-system, Roboto, Helvetica, sans-serif' }}>
              Dress Length
            </span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.37683 11.3338L14 5.1915L13.2463 4.49976L8 10.2304L2.75366 4.49976L2 5.1915L7.62317 11.3338C7.71999 11.4395 7.85671 11.4998 8 11.4998C8.14329 11.4998 8.28 11.4395 8.37683 11.3338Z" fill="currentColor"/>
            </svg>
          </button>

          <button className="flex min-h-8 px-3 py-1 items-center gap-2 rounded-full border border-muted-foreground bg-white">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 1C4.13 1 1 4.13 1 8C1 11.87 4.13 15 8 15C11.87 15 15 11.87 15 8C15 4.13 11.87 1 8 1ZM8 13.5C4.96 13.5 2.5 11.04 2.5 8C2.5 4.96 4.96 2.5 8 2.5C11.04 2.5 13.5 4.96 13.5 8C13.5 11.04 11.04 13.5 8 13.5ZM8.5 4.5H7V8.75L10.75 11L11.5 9.92L8.5 8.08V4.5Z" fill="currentColor"/>
            </svg>
            <span className="text-foreground text-sm font-normal leading-5 whitespace-nowrap" style={{ fontFamily: 'Everyday Sans UI, -apple-system, Roboto, Helvetica, sans-serif' }}>
              In-store
            </span>
          </button>

          <button className="flex min-h-8 px-3 py-1 items-center gap-2 rounded-full border border-muted-foreground bg-white">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 1C4.13 1 1 4.13 1 8C1 11.87 4.13 15 8 15C11.87 15 15 11.87 15 8C15 4.13 11.87 1 8 1ZM8 13.5C4.96 13.5 2.5 11.04 2.5 8C2.5 4.96 4.96 2.5 8 2.5C11.04 2.5 13.5 4.96 13.5 8C13.5 11.04 11.04 13.5 8 13.5ZM9.5 8C9.5 8.83 8.83 9.5 8 9.5C7.17 9.5 6.5 8.83 6.5 8V5H8V8H9.5Z" fill="currentColor"/>
            </svg>
            <span className="text-foreground text-sm font-normal leading-5 whitespace-nowrap" style={{ fontFamily: 'Everyday Sans UI, -apple-system, Roboto, Helvetica, sans-serif' }}>
              Price
            </span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.37683 11.3338L14 5.1915L13.2463 4.49976L8 10.2304L2.75366 4.49976L2 5.1915L7.62317 11.3338C7.71999 11.4395 7.85671 11.4998 8 11.4998C8.14329 11.4998 8.28 11.4395 8.37683 11.3338Z" fill="currentColor"/>
            </svg>
          </button>
        </div>

        {/* Visual Typeahead Suggestions */}
        <div className="flex w-full px-2 py-0 items-start gap-2 border-b border-border overflow-x-auto scrollbar-hide">
          {visualTypeaheadItems.map((item, index) => (
            <div key={index} className="flex w-[54px] h-[81px] flex-col justify-center items-center gap-2 flex-shrink-0">
              <img 
                src={item.image}
                alt={item.label}
                className="w-[38px] h-[38px] flex-shrink-0 rounded"
              />
              <div className="self-stretch text-foreground text-center text-[7px] font-normal leading-4" style={{ fontFamily: 'Everyday Sans UI, -apple-system, Roboto, Helvetica, sans-serif' }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Results Line */}
        <div className="flex px-4 py-3 flex-col items-start gap-2.5 self-stretch">
          <div className="flex items-start">
            <div className="flex items-end content-end gap-1 flex-wrap bg-white">
              <span className="text-foreground text-xs font-extrabold leading-4" style={{ fontFamily: 'Everyday Sans UI, -apple-system, Roboto, Helvetica, sans-serif' }}>
                1000+ Results
              </span>
            </div>
            <div className="flex items-center gap-1 bg-white ml-2">
              <span className="text-muted-foreground text-xs font-normal leading-4" style={{ fontFamily: 'Everyday Sans UI, -apple-system, Roboto, Helvetica, sans-serif' }}>
                Uses external data. Price when purchased online
              </span>
              <Info className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex w-full px-1 items-start gap-2">
          <div className="grid grid-cols-2 gap-2 w-full">
            {products.map((product, index) => (
              <ProductCard
                key={index}
                {...product}
                productIndex={index}
                onQuantityChange={(qty) => handleQuantityChange(index, qty)}
                onClick={() => navigate(`/product/${index + 1}`)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
