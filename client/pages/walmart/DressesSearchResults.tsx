import { useNavigate } from "react-router-dom";
import { AIResultsBanner } from "@/components/walmart/AIResultsBanner";
import { ResponsiveLayout } from "@/components/walmart/ResponsiveLayout";
import { PRODUCT_IMAGES } from "@/components/walmart/productImages";
import { SearchResultsHeader } from "@/components/walmart/SearchResultsHeader";
import { SearchFilterBar } from "@/components/walmart/SearchFilterBar";
import { ProductCardList, ProductCardListProps } from "@/components/walmart/ProductCardList";

const FILTER_CHIPS = ['In-store', 'Size', 'Color', 'Brand', 'Price', 'Customer rating'] as const;

const DRESS_PRODUCTS: ProductCardListProps[] = [
  {
    flag: 'Best seller',
    flagVariant: 'default',
    price: '18',
    cents: '98',
    name: "Time and Tru Women's Sleeveless Tiered Maxi Dress",
    rating: 4.4,
    ratingCount: '1,247',
    pickup: '2 pm',
    image: PRODUCT_IMAGES.blackCardigan,
    cue: 'Flowy and comfortable for everyday wear',
  },
  {
    flag: 'Rollback',
    flagVariant: 'red',
    price: '24',
    cents: '98',
    wasPrice: '$34.00',
    name: "Sofia Jeans Women's Knit Midi Dress with Flutter Sleeves",
    rating: 4.6,
    ratingCount: '3,892',
    pickup: '2 pm',
    image: PRODUCT_IMAGES.flashTankTops,
    cue: 'Stretchy knit, great for work or weekend',
  },
  {
    price: '34',
    cents: '00',
    wasPrice: '$48.00',
    flag: 'Rollback',
    flagVariant: 'red',
    name: "Scoop Women's Printed Mesh Maxi Dress",
    rating: 4.2,
    ratingCount: '856',
    image: PRODUCT_IMAGES.blackCardigan,
    cue: 'Lightweight mesh, perfect for summer',
  },
  {
    price: '22',
    cents: '00',
    name: "Free Assembly Women's Square Neck Mini Dress",
    rating: 4.1,
    ratingCount: '421',
    image: PRODUCT_IMAGES.flashTankTops,
    pickup: '2 pm',
    cue: 'Trendy silhouette, multiple colors available',
  },
  {
    flag: 'Best seller',
    flagVariant: 'default',
    price: '28',
    cents: '50',
    name: "The Pioneer Woman Smocked Bodice Midi Dress",
    rating: 4.7,
    ratingCount: '2,103',
    image: PRODUCT_IMAGES.blackCardigan,
    pickup: 'Tomorrow',
    cue: 'Boho style with elastic smocked top',
  },
  {
    flag: 'Best seller',
    flagVariant: 'default',
    price: '12',
    cents: '98',
    name: "No Boundaries Juniors Ribbed Bodycon Dress",
    rating: 4.3,
    ratingCount: '5,612',
    image: PRODUCT_IMAGES.flashTankTops,
    pickup: '2 pm',
    cue: 'Form-fitting ribbed fabric, junior sizing',
  },
];

export default function DressesSearchResults() {
  const navigate = useNavigate();

  return (
    <ResponsiveLayout maxWidth="full" showMobileTopNav={false} nativeStatusBarVariant="white">
      <div className="bg-white font-sans">
        <SearchResultsHeader query="dresses for women" onBack={() => navigate('/walmart')} />
        <SearchFilterBar chips={FILTER_CHIPS} />
        <div>
          <AIResultsBanner message="Showing top-rated dresses for women based on your search" />

          {/* Product list */}
          <div className="flex flex-col">
            {DRESS_PRODUCTS.map((product, i) => (
              <ProductCardList key={i} {...product} />
            ))}
          </div>
        </div>
      </div>
    </ResponsiveLayout>
  );
}
