import { useNavigate, useSearchParams } from "react-router-dom";
import { AIResultsBanner } from "@/components/walmart/AIResultsBanner";
import { ResponsiveLayout } from "@/components/walmart/ResponsiveLayout";
import { PRODUCT_IMAGES } from "@/components/walmart/productImages";
import { SearchResultsHeader } from "@/components/walmart/SearchResultsHeader";
import { SearchFilterBar } from "@/components/walmart/SearchFilterBar";
import { ProductCardList, ProductCardListProps } from "@/components/walmart/ProductCardList";
import { FeatureGuideSection } from "./search-results/FeatureGuideSection";
import { KnowTypesSection } from "./search-results/KnowTypesSection";
import { TrendingBrandsSection } from "./search-results/TrendingBrandsSection";
import { PopularByPriceSection } from "./search-results/PopularByPriceSection";
import { MoreProductListings } from "./search-results/MoreProductListings";

const FILTER_CHIPS = ['In-store', 'Top rated', 'Brand', 'Screen size', 'Price', 'Special offers'] as const;

const TOP_PRODUCTS: ProductCardListProps[] = [
  {
    flag: 'Best seller',
    flagVariant: 'default',
    price: '228',
    cents: '00',
    name: 'VIZIO 50" Class V-Series 4K UHD LED Smart TV V4K50M-08',
    rating: 4.5,
    ratingCount: '2,204',
    pickup: '2 pm',
    image: PRODUCT_IMAGES.tablet,
    cue: 'TV with bright screen',
  },
  {
    flag: 'Rollback',
    flagVariant: 'red',
    price: '1,396',
    cents: '99',
    wasPrice: '$2,499.00',
    name: 'LG 65" C5 Series 4K UHD OLED evo AI Smart webOS 25 TV',
    rating: 4.3,
    ratingCount: '1,121',
    pickup: '2 pm',
    image: PRODUCT_IMAGES.laptop1,
  },
  {
    price: '328',
    cents: '00',
    name: 'Philips 55" Class 144Hz QLED+ 4K UltraHD Google Smart TV',
    rating: 4.6,
    ratingCount: '3,567',
    pickup: '2 pm',
    image: PRODUCT_IMAGES.laptop2,
  },
];

export default function SearchResults() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || 'TVs';

  return (
    <ResponsiveLayout maxWidth="full" showMobileTopNav={false} nativeStatusBarVariant="blue">
      <div className="bg-white font-sans">
        <SearchResultsHeader query={query} onBack={() => navigate('/walmart')} />
        <SearchFilterBar chips={FILTER_CHIPS} />
        <div className="lg:-mx-16">
          <AIResultsBanner message="Showing the best TVs based on your search" />

          {/* Top product results */}
          <div className="flex flex-col">
            {TOP_PRODUCTS.map((product, i) => (
              <ProductCardList key={i} {...product} />
            ))}
          </div>
        </div>

        {/* AI-powered sections */}
        <FeatureGuideSection />
        <KnowTypesSection />
        <TrendingBrandsSection />
        <PopularByPriceSection />

        {/* More products */}
        <MoreProductListings />
      </div>
    </ResponsiveLayout>
  );
}
