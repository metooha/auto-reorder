import { useNavigate } from "react-router-dom";
import { ResponsiveLayout } from "@/components/walmart/ResponsiveLayout";
import { Button } from "@/components/ui/Button";
import { SearchResultsHeader } from "@/components/walmart/SearchResultsHeader";
import { SearchFilterBar } from "@/components/walmart/SearchFilterBar";
import { ProductCardList, ProductCardListProps } from "@/components/walmart/ProductCardList";

const FILTER_CHIPS = ['In-store', 'EBT eligible', 'Brand', 'Flavor', 'Price', 'Special offers'] as const;

const CEREAL_PRODUCTS: ProductCardListProps[] = [
  {
    name: "Kellogg's Frosted Flakes, Breakfast Cereal, Original, Family Size, 13.5 oz",
    price: "3",
    cents: "68",
    unitPrice: "$4.36/lb",
    flag: "Best seller",
    flagVariant: 'default',
    rating: 4.7,
    ratingCount: "12,234",
    image: "https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F783f38e6d773461b95706408b1a14434?format=webp&width=400",
    pickup: "2 pm",
    ebt: true,
  },
  {
    name: "General Mills Cheerios Heart Healthy Cereal, Gluten Free, 8.9 oz",
    price: "3",
    cents: "98",
    unitPrice: "$7.15/lb",
    rating: 4.6,
    ratingCount: "8,901",
    image: "https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F783f38e6d773461b95706408b1a14434?format=webp&width=400",
    pickup: "2 pm",
    ebt: true,
  },
  {
    name: "Post Honey Bunches of Oats with Almonds Cereal, 18 oz",
    price: "3",
    cents: "48",
    unitPrice: "$3.09/lb",
    flag: "Rollback",
    flagVariant: 'red',
    wasPrice: "$4.28",
    rating: 4.5,
    ratingCount: "6,442",
    image: "https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F783f38e6d773461b95706408b1a14434?format=webp&width=400",
    pickup: "Tomorrow",
    ebt: true,
  },
  {
    name: "Kellogg's Froot Loops Breakfast Cereal, Original, 10.1 oz",
    price: "3",
    cents: "68",
    unitPrice: "$5.83/lb",
    rating: 4.6,
    ratingCount: "9,312",
    image: "https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F783f38e6d773461b95706408b1a14434?format=webp&width=400",
    pickup: "2 pm",
    ebt: true,
  },
  {
    name: "Quaker Oats Cap'n Crunch Cereal, 14 oz",
    price: "3",
    cents: "78",
    unitPrice: "$4.32/lb",
    rating: 4.4,
    ratingCount: "4,567",
    image: "https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F783f38e6d773461b95706408b1a14434?format=webp&width=400",
    pickup: "2 pm",
    ebt: true,
  },
  {
    name: "General Mills Cinnamon Toast Crunch Cereal, 12 oz",
    price: "3",
    cents: "98",
    unitPrice: "$5.31/lb",
    flag: "Best seller",
    flagVariant: 'default',
    rating: 4.8,
    ratingCount: "15,221",
    image: "https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F783f38e6d773461b95706408b1a14434?format=webp&width=400",
    pickup: "2 pm",
    ebt: true,
  },
];

export default function CerealSearchResults() {
  const navigate = useNavigate();

  return (
    <ResponsiveLayout maxWidth="full" showMobileTopNav={false}>
      <div className="bg-white font-sans">
        <SearchResultsHeader query="cereal" onBack={() => navigate('/walmart')} />
        <SearchFilterBar chips={FILTER_CHIPS} />

        {/* Results count */}
        <div className="px-3 py-2 border-b border-border">
          <p className="text-[14px] text-muted-foreground">1,000+ results for "cereal"</p>
        </div>

        {/* Product List */}
        <div className="flex flex-col">
          {CEREAL_PRODUCTS.map((product, i) => (
            <ProductCardList key={i} {...product} />
          ))}
        </div>

        {/* Load more */}
        <div className="px-3 py-4">
          <Button variant="secondary" size="medium" isFullWidth>Load more results</Button>
        </div>
      </div>
    </ResponsiveLayout>
  );
}
