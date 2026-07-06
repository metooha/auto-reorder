import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ResponsiveLayout } from "@/components/walmart/ResponsiveLayout";
import { SearchResultsHeader } from "@/components/walmart/SearchResultsHeader";
import { SearchFilterBar } from "@/components/walmart/SearchFilterBar";
import { Skeleton } from "@/components/ui/Skeleton";

const FILTER_CHIPS = ['In-store', 'Top rated', 'Brand', 'Screen size', 'Price', 'Special offers'] as const;

export default function LoadingScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query === 'dresses for women') {
        navigate('/walmart/search/dresses', { replace: true });
      } else if (query.toLowerCase() === 'coffee') {
        navigate('/walmart/search/coffee', { replace: true });
      } else if (query.toLowerCase() === 'cereal') {
        navigate('/walmart/search/cereal', { replace: true });
      } else {
        navigate(`/walmart/search?q=${encodeURIComponent(query)}`, { replace: true });
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigate, query]);

  return (
    <ResponsiveLayout maxWidth="full" showMobileTopNav={false} nativeStatusBarVariant="white">
      <div className="bg-white font-sans">
        {/* Header — identical to search results page */}
        <SearchResultsHeader query={query} onBack={() => navigate('/walmart')} />

        {/* Filter bar — same component as search results page */}
        <SearchFilterBar chips={FILTER_CHIPS} />

        {/* AI banner skeleton */}
        <div className="flex items-center gap-2 px-4 py-2 border-b border-border">
          <Skeleton isMagic variant="rectangle" width={16} height={16} />
          <Skeleton isMagic variant="rectangle" width={200} height={16} />
        </div>

        {/* Product list skeletons */}
        <div className="flex flex-col">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex gap-3 px-2 py-3 border-b border-border">
              <Skeleton isMagic variant="rectangle" width={161} height={159} UNSAFE_className="flex-shrink-0 rounded-lg" />
              <div className="flex-1 flex flex-col gap-3">
                <Skeleton isMagic variant="rectangle" height={24} />
                <Skeleton isMagic variant="rectangle" height={24} />
                <Skeleton isMagic variant="rectangle" height={24} />
                <Skeleton isMagic variant="rectangle" width={59} height={24} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </ResponsiveLayout>
  );
}
