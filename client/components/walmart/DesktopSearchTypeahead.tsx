import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect, useCallback } from "react";
import { Heart, History, ArrowUpLeft, ChevronRight, ChevronLeft } from "@/components/icons";
import { CloseIcon as X } from "@/components/icons-custom";
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
} from "@/components/walmart/searchData";
import styles from "./DesktopSearchTypeahead.module.css";

interface DesktopSearchTypeaheadProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  recentSearches: string[];
  setRecentSearches: (searches: string[]) => void;
  onClose: () => void;
}

function Separator() {
  return <div className={styles.separator} />;
}

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
    <div className={styles.scrollRow}>
      {canScrollLeft && (
        <IconButton aria-label="Scroll left" variant="secondary" size="medium" onClick={() => scrollBy('left')}>
          <ChevronLeft className="w-4 h-4" />
        </IconButton>
      )}
      <div ref={scrollRef} className={styles.scrollList}>
        {children}
      </div>
      {canScrollRight && (
        <IconButton aria-label="Scroll right" variant="secondary" size="medium" onClick={() => scrollBy('right')}>
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
    navigate(`/walmart/loading?q=${encodeURIComponent(suggestion)}`);
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
    <div className={styles.typeahead}>
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
    <div className={styles.suggestionsWrap}>
      <div>
        {suggestions.slice(0, 10).map((suggestion, index) => {
          const parts = renderHighlightedText(suggestion, query);
          return (
            <div key={index}>
              <button
                onClick={() => onSelect(suggestion)}
                className={styles.suggestionRow}
              >
                <div className={styles.suggestionText}>
                  {parts.before && <span style={{ fontWeight: 700 }}>{parts.before}</span>}
                  <span style={{ fontWeight: 400 }}>{parts.match}</span>
                  {parts.after && <span style={{ fontWeight: 700 }}>{parts.after}</span>}
                </div>
                <ArrowUpLeft className={styles.suggestionIcon} />
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
      <section className={styles.section}>
        <h3 className={styles.sectionHeading}>
          Keep shopping for {keepShoppingCategory}
        </h3>
        <HorizontalScrollSection>
          {keepShoppingFor.map((item) => (
            <button key={item.label} className={styles.tileButton}>
              {item.isFilter ? (
                <div className={styles.tileFilter}>
                  <span className={styles.tileFilterLabel}>{item.label}</span>
                </div>
              ) : (
                <div className={styles.tileImage}>
                  <img src={item.image!} alt={item.label} className={styles.tileImageImg} />
                </div>
              )}
              <span className={styles.tileLabel}>{item.label}</span>
            </button>
          ))}
        </HorizontalScrollSection>
      </section>

      <Separator />

      {/* Grab your usuals */}
      <section className={styles.sectionPadded}>
        <div className={styles.sectionHeadingRow}>
          <h3 className={styles.sectionHeading} style={{ margin: 0 }}>Grab your usuals</h3>
          <button className={styles.myItemsLink}>
            <Heart className="w-4 h-4" />
            My items
          </button>
        </div>
        <HorizontalScrollSection>
          {grabYourUsuals.map((term) => (
            <Button key={term} variant="secondary" size="small" onClick={() => onChipClick(term)}>
              {term}
            </Button>
          ))}
        </HorizontalScrollSection>
      </section>

      <Separator />

      {/* Recent searches */}
      {recentSearches.length > 0 && (
        <>
          <section className={styles.sectionPadded}>
            <h3 className={styles.sectionHeading}>Your recent searches</h3>
            <div>
              {recentSearches.map((search, index) => (
                <div key={index}>
                  <div className={styles.recentRow}>
                    <History className={styles.recentIcon} />
                    <button
                      onClick={() => onRecentClick(search)}
                      className={styles.recentButton}
                    >
                      {search}
                    </button>
                    <button
                      onClick={() => onRemoveRecent(index)}
                      className={styles.recentRemoveButton}
                      aria-label={`Remove ${search}`}
                    >
                      <X className="w-3.5 h-3.5" />
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
      <section className={styles.sectionPadded}>
        <h3 className={styles.sectionHeading}>Trending</h3>
        <HorizontalScrollSection>
          {trendingSearches.map((term) => (
            <Button key={term} variant="secondary" size="small" onClick={() => onChipClick(term)}>
              {term}
            </Button>
          ))}
        </HorizontalScrollSection>
      </section>

      <Separator />

      {/* Frequent searches */}
      <section className={styles.sectionPadded}>
        <h3 className={styles.sectionHeading}>Your frequent searches</h3>
        <HorizontalScrollSection>
          {frequentSearches.map((term) => (
            <Button key={term} variant="secondary" size="small" onClick={() => onChipClick(term)}>
              {term}
            </Button>
          ))}
        </HorizontalScrollSection>
      </section>
    </div>
  );
}
