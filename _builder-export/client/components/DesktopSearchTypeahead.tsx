import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect, useCallback } from "react";
import { CloseIcon as X, HistoryIcon, ArrowUpLeftIcon as ArrowUpLeft, ChevronRightIcon as ChevronRight, ChevronLeftIcon as ChevronLeft, HeartIcon as Heart } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import {
  filterSuggestions,
  renderHighlightedText,
  keepShoppingFor,
  keepShoppingCategory,
  grabYourUsuals,
  trendingSearches,
  frequentSearches,
} from "@/components/search/searchData";

interface DesktopSearchTypeaheadProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  recentSearches: string[];
  setRecentSearches: (searches: string[]) => void;
  onClose: () => void;
}

// Separator using the LD separator token
function Separator() {
  return <div style={{ height: '1px', background: 'var(--ld-semantic-color-separator, #E3E4E5)' }} />;
}

// Horizontal scroll section with smart prev/next buttons
function HorizontalScrollSection({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener('scroll', updateScrollState);
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      ro.disconnect();
    };
  }, [updateScrollState]);

  const scrollBy = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -200 : 200, behavior: 'smooth' });
  };

  return (
    <div className="flex items-center gap-2">
      {canScrollLeft && (
        <IconButton
          aria-label="Scroll left"
          variant="secondary"
          size="medium"
          onClick={() => scrollBy('left')}
        >
          <ChevronLeft className="w-4 h-4" />
        </IconButton>
      )}
      <div ref={scrollRef} className="flex gap-3 overflow-x-auto scrollbar-hide flex-1 pb-1">
        {children}
      </div>
      {canScrollRight && (
        <IconButton
          aria-label="Scroll right"
          variant="secondary"
          size="medium"
          onClick={() => scrollBy('right')}
        >
          <ChevronRight className="w-4 h-4" />
        </IconButton>
      )}
    </div>
  );
}

export function DesktopSearchTypeahead({
  searchQuery,
  setSearchQuery,
  recentSearches,
  setRecentSearches,
  onClose,
}: DesktopSearchTypeaheadProps) {
  const navigate = useNavigate();
  const filteredSuggestions = filterSuggestions(searchQuery);

  const handleSuggestionClick = (suggestion: string) => {
    navigate(`/loading?q=${encodeURIComponent(suggestion)}`);
    onClose();
  };

  const handleRecentClick = (search: string) => {
    setSearchQuery(search);
    const updated = [search, ...recentSearches.filter(s => s !== search)].slice(0, 5);
    setRecentSearches(updated);
  };

  const handleRemoveRecent = (index: number) => {
    setRecentSearches(recentSearches.filter((_, i) => i !== index));
  };

  const handleChipClick = (term: string) => {
    setSearchQuery(term);
    if (!recentSearches.includes(term)) {
      setRecentSearches([term, ...recentSearches].slice(0, 5));
    }
  };

  return (
    <div className="absolute top-full left-[-3px] right-[-3px] border-2 border-[var(--ld-semantic-color-action-focus-outline,#0053E2)] border-t-0 rounded-b-sm bg-white z-[101] max-h-[80vh] overflow-y-auto scrollbar-hide shadow-lg">
      {searchQuery && filteredSuggestions.length > 0 ? (
        <SuggestionsList
          suggestions={filteredSuggestions}
          query={searchQuery}
          onSelect={handleSuggestionClick}
        />
      ) : (
        <DefaultContent
          recentSearches={recentSearches}
          onRecentClick={handleRecentClick}
          onRemoveRecent={handleRemoveRecent}
          onChipClick={handleChipClick}
        />
      )}
    </div>
  );
}

function SuggestionsList({
  suggestions,
  query,
  onSelect,
}: {
  suggestions: string[];
  query: string;
  onSelect: (suggestion: string) => void;
}) {
  return (
    <div className="px-6 py-3">
      <div className="flex flex-col">
        {suggestions.slice(0, 10).map((suggestion, index) => {
          const parts = renderHighlightedText(suggestion, query);
          return (
            <div key={index}>
              <button
                onClick={() => onSelect(suggestion)}
                className="flex items-center gap-3 py-2.5 w-full hover:bg-[var(--ld-semantic-color-surface-hovered,#F8F8F8)] rounded px-2 transition-colors"
              >
                <div className="flex-1 text-left text-[14px] text-[var(--ld-semantic-color-text,#2E2F32)] leading-[20px] overflow-hidden text-ellipsis whitespace-nowrap">
                  {parts.before && <span className="font-bold">{parts.before}</span>}
                  <span className="font-normal">{parts.match}</span>
                  {parts.after && <span className="font-bold">{parts.after}</span>}
                </div>
                <ArrowUpLeft className="w-4 h-4 text-[var(--ld-semantic-color-text-subtle,#74767C)] flex-shrink-0" />
              </button>
              {index < Math.min(suggestions.length, 10) - 1 && <Separator />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DefaultContent({
  recentSearches,
  onRecentClick,
  onRemoveRecent,
  onChipClick,
}: {
  recentSearches: string[];
  onRecentClick: (search: string) => void;
  onRemoveRecent: (index: number) => void;
  onChipClick: (term: string) => void;
}) {
  return (
    <div>
      {/* Keep shopping for */}
      <section className="px-5 pt-5 pb-4">
        <h3 className="text-[16px] font-bold text-[var(--ld-semantic-color-text,#2E2F32)] mb-3">
          Keep shopping for {keepShoppingCategory}
        </h3>
        <HorizontalScrollSection>
          {keepShoppingFor.map((item) => (
            <button key={item.label} className="flex flex-col items-center gap-1 flex-shrink-0 w-[72px]">
              {item.isFilter ? (
                <div className="w-[72px] h-[72px] rounded-full bg-[var(--ld-semantic-color-fill-subtle,#F1F1F2)] flex items-center justify-center">
                  <span className="text-[11px] text-[var(--ld-semantic-color-text,#2E2F32)] text-center font-medium leading-tight px-1">
                    {item.label}
                  </span>
                </div>
              ) : (
                <div className="w-[72px] h-[72px] rounded-full bg-gray-100 overflow-hidden">
                  <img src={item.image!} alt={item.label} className="w-full h-full object-cover" />
                </div>
              )}
              <span className="text-[12px] text-[var(--ld-semantic-color-text,#2E2F32)] text-center leading-tight line-clamp-2">
                {item.label}
              </span>
            </button>
          ))}
        </HorizontalScrollSection>
      </section>

      <Separator />

      {/* Grab your usuals */}
      <section className="px-5 py-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[16px] font-bold text-[var(--ld-semantic-color-text,#2E2F32)]">Grab your usuals</h3>
          <a
            href="/"
            className="flex items-center gap-1 text-[14px] text-[var(--ld-semantic-color-text,#2E2F32)] underline hover:opacity-80 transition-opacity flex-shrink-0"
          >
            <Heart className="w-4 h-4" />
            My items
          </a>
        </div>
        <HorizontalScrollSection>
          {grabYourUsuals.map((term) => (
            <Button
              key={term}
              variant="secondary"
              size="small"
              onClick={() => onChipClick(term)}
            >
              {term}
            </Button>
          ))}
        </HorizontalScrollSection>
      </section>

      <Separator />

      {/* Recent searches */}
      {recentSearches.length > 0 && (
        <>
          <section className="px-5 py-4">
            <h3 className="text-[16px] font-bold text-[var(--ld-semantic-color-text,#2E2F32)] mb-1">Your recent searches</h3>
            <div>
              {recentSearches.map((search, index) => (
                <div key={index}>
                  <div className="flex items-center gap-3 py-2.5">
                    <HistoryIcon className="w-4 h-4 text-[var(--ld-semantic-color-text-subtle,#74767C)] flex-shrink-0" />
                    <button
                      onClick={() => onRecentClick(search)}
                      className="flex-1 text-[14px] text-[var(--ld-semantic-color-text,#2E2F32)] text-left hover:underline"
                    >
                      {search}
                    </button>
                    <button
                      onClick={() => onRemoveRecent(index)}
                      className="p-1 hover:bg-[var(--ld-semantic-color-surface-hovered,#F8F8F8)] rounded-full transition-colors"
                      aria-label={`Remove ${search}`}
                    >
                      <X className="w-3.5 h-3.5 text-[var(--ld-semantic-color-text-subtle,#74767C)]" />
                    </button>
                  </div>
                  {index < recentSearches.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </section>
          <Separator />
        </>
      )}

      {/* Trending */}
      <section className="px-5 py-4">
        <h3 className="text-[16px] font-bold text-[var(--ld-semantic-color-text,#2E2F32)] mb-3">Trending</h3>
        <HorizontalScrollSection>
          {trendingSearches.map((term) => (
            <Button
              key={term}
              variant="secondary"
              size="small"
              onClick={() => onChipClick(term)}
            >
              {term}
            </Button>
          ))}
        </HorizontalScrollSection>
      </section>

      <Separator />

      {/* Frequent searches */}
      <section className="px-5 py-4">
        <h3 className="text-[16px] font-bold text-[var(--ld-semantic-color-text,#2E2F32)] mb-3">Your frequent searches</h3>
        <HorizontalScrollSection>
          {frequentSearches.map((term) => (
            <Button
              key={term}
              variant="secondary"
              size="small"
              onClick={() => onChipClick(term)}
            >
              {term}
            </Button>
          ))}
        </HorizontalScrollSection>
      </section>
    </div>
  );
}
