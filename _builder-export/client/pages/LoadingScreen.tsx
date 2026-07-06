import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SparklesIcon } from "@/components/icons/SparklesIcon";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/Button";

export default function LoadingScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [activeTab, setActiveTab] = useState<'shop' | 'heart' | 'user'>('shop');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query === 'dresses for women') {
        navigate('/search/dresses', { replace: true });
      } else {
        navigate(`/search?q=${encodeURIComponent(query)}`, { replace: true });
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigate, query]);

  return (
    <div className="min-h-screen bg-white font-sans max-w-[430px] mx-auto relative">
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
      <div className="flex items-center gap-1 px-4 pb-3 border-b border-border">
        <Button
          variant="tertiary"
          size="small"
          onClick={() => navigate('/')}
          className="flex-shrink-0 !p-0 !h-auto"
          aria-label="Go back"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-foreground">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Button>
        <div className="flex-1 flex items-center gap-1">
          <div className="flex-1 border-2 border-primary rounded-full">
            <div className="bg-white rounded-full px-3 py-2 flex items-center gap-2 h-[42px]">
              <div className="w-6 h-6 flex-shrink-0">
                <SparklesIcon />
              </div>
              <div className="flex-1 text-muted-foreground text-[16px]">{query}</div>
              <div className="flex items-center gap-1">
                <button className="w-8 h-8 rounded-full border border-border bg-white flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-foreground">
                    <path d="M15 13C15 13.2652 14.8946 13.5196 14.7071 13.7071C14.5196 13.8946 14.2652 14 14 14H2C1.73478 14 1.48043 13.8946 1.29289 13.7071C1.10536 13.5196 1 13.2652 1 13V5C1 4.73478 1.10536 4.48043 1.29289 4.29289C1.48043 4.10536 1.73478 4 2 4H5L6 2H10L11 4H14C14.2652 4 14.5196 4.10536 14.7071 4.29289C14.8946 4.48043 15 4.73478 15 5V13Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 11C9.65685 11 11 9.65685 11 8C11 6.34315 9.65685 5 8 5C6.34315 5 5 6.34315 5 8C5 9.65685 6.34315 11 8 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button className="w-8 h-8 rounded-full border border-border bg-white flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-foreground">
                    <path d="M8 1C7.46957 1 6.96086 1.21071 6.58579 1.58579C6.21071 1.96086 6 2.46957 6 3V8C6 8.53043 6.21071 9.03914 6.58579 9.41421C6.96086 9.78929 7.46957 10 8 10C8.53043 10 9.03914 9.78929 9.41421 9.41421C9.78929 9.03914 10 8.53043 10 8V3C10 2.46957 9.78929 1.96086 9.41421 1.58579C9.03914 1.21071 8.53043 1 8 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 7V8C12 9.06087 11.5786 10.0783 10.8284 10.8284C10.0783 11.5786 9.06087 12 8 12C6.93913 12 5.92172 11.5786 5.17157 10.8284C4.42143 10.0783 4 9.06087 4 8V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 12V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6 15H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center flex-shrink-0">
            <div className="relative">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-muted-foreground">
                <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" fill="currentColor"/>
                <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" fill="currentColor"/>
                <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className="absolute -top-1 -right-1 bg-warning border border-warning-foreground text-foreground text-[12px] font-semibold rounded-full w-4 h-4 flex items-center justify-center leading-none">
                0
              </div>
            </div>
            <div className="text-muted-foreground text-[10px] text-center leading-4">$0.00</div>
          </div>
        </div>
      </div>

      {/* Filter Skeletons */}
      <div className="flex items-center gap-2 px-3 py-3 border-b border-border">
        <div className="w-8 h-8 rounded-full animate-shimmer"></div>
        <div className="w-[115px] h-8 rounded-full animate-shimmer"></div>
        <div className="w-[115px] h-8 rounded-full animate-shimmer"></div>
        <div className="w-[115px] h-8 rounded-full animate-shimmer"></div>
      </div>

      {/* Loading Message */}
      <div className="flex items-center justify-center h-8 bg-white">
        <p className="text-foreground text-[14px] text-center">Away ge go! Stay tuned...</p>
      </div>

      {/* Line Skeleton */}
      <div className="px-3 py-2 border-b border-border">
        <div className="h-6 rounded animate-shimmer"></div>
      </div>

      {/* Product Skeletons */}
      <div className="flex flex-col">
        {/* Product Skeleton 1 */}
        <div className="flex gap-3 px-2 py-3 border-b border-border">
          <div className="w-[161px] h-[159px] rounded-lg flex-shrink-0 animate-shimmer"></div>
          <div className="flex-1 flex flex-col gap-3">
            <div className="h-6 rounded animate-shimmer"></div>
            <div className="h-6 rounded animate-shimmer"></div>
            <div className="h-6 rounded animate-shimmer"></div>
            <div className="w-[59px] h-6 rounded animate-shimmer"></div>
          </div>
        </div>

        {/* Category Skeleton */}
        <div className="px-2 py-3 border-b border-border">
          <div className="w-[97px] h-6 rounded animate-shimmer mb-3"></div>
          <div className="flex gap-3">
            <div className="w-[161px] h-[159px] rounded-lg flex-shrink-0 animate-shimmer"></div>
            <div className="flex-1 flex flex-col gap-3">
              <div className="h-6 rounded animate-shimmer"></div>
              <div className="h-6 rounded animate-shimmer"></div>
              <div className="h-6 rounded animate-shimmer"></div>
              <div className="w-[59px] h-6 rounded animate-shimmer"></div>
            </div>
          </div>
        </div>

        {/* Product Skeleton 3 */}
        <div className="flex gap-3 px-2 py-3 border-b border-border">
          <div className="w-[161px] h-[159px] rounded-lg flex-shrink-0 animate-shimmer"></div>
          <div className="flex-1 flex flex-col gap-3">
            <div className="h-6 rounded animate-shimmer"></div>
            <div className="h-6 rounded animate-shimmer"></div>
            <div className="h-6 rounded animate-shimmer"></div>
            <div className="w-[59px] h-6 rounded animate-shimmer"></div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
