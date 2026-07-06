import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CloseIcon as X, CameraIcon as Camera, MicrophoneIcon as Mic, ChevronLeftIcon as ChevronLeft, ClockIcon as Clock, ArrowUpLeftIcon as ArrowUpLeft } from "@/components/icons";
import { SparkyLookingDown } from "@/components/icons/SparkyLookingDown";
import { allSuggestions as sharedSuggestions } from "@/components/search/searchData";
import { IOSKeyboard } from "./IOSKeyboard";

interface SearchTypeaheadModalProps {
  onClose: () => void;
  onCameraClick: () => void;
}

export function SearchTypeaheadModal({ onClose, onCameraClick }: SearchTypeaheadModalProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(true);
  const [recentSearches, setRecentSearches] = useState(['whole grain cereal', 'frosted flakes', 'cheerios', 'granola', 'oatmeal']);

  const allSuggestions = sharedSuggestions;
  const filteredSuggestions = searchQuery
    ? allSuggestions.filter(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const renderHighlightedText = (text: string, query: string) => {
    if (!query) return <span className="font-normal">{text}</span>;
    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const index = lowerText.indexOf(lowerQuery);
    if (index === -1) return <span className="font-normal">{text}</span>;
    const before = text.slice(0, index);
    const match = text.slice(index, index + query.length);
    const after = text.slice(index + query.length);
    return (
      <>
        {before && <span className="font-bold">{before}</span>}
        <span className="font-normal">{match}</span>
        {after && <span className="font-bold">{after}</span>}
      </>
    );
  };

  const handleClose = () => {
    setSearchQuery('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-white z-[100] max-w-[430px] mx-auto animate-fade-in">
      {/* Search Bar */}
      <div className="flex items-center gap-2 px-4 pt-4 pb-3 border-b border-border">
        <button onClick={handleClose} className="flex-shrink-0">
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        <div className="flex-1 rainbow-border animate-search-bar-expand">
          <div className="bg-white rounded-full px-3 py-2 flex items-center gap-2 h-[42px] max-w-[500px] w-full mr-auto">
            <div className="w-6 h-6 flex-shrink-0">
              <SparkyLookingDown />
            </div>
            <div className="flex items-center gap-1 flex-1">
              {isSearchFocused && !searchQuery && (
                <div className="w-[1.5px] h-5 bg-primary animate-pulse"></div>
              )}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder="What are you looking for?"
                autoFocus
                className="flex-1 outline-none text-foreground text-[16px] placeholder:text-muted-foreground bg-transparent"
              />
            </div>
            <div className="flex gap-2 flex-shrink-0">
              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery('')}
                  className="w-8 h-8 flex-shrink-0 rounded-full border border-gray-300 bg-white flex items-center justify-center"
                >
                  <X className="w-4 h-4 text-gray-700" />
                </button>
              ) : (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onCameraClick();
                    }}
                    className="w-8 h-8 flex-shrink-0 rounded-full border border-gray-300 bg-white flex items-center justify-center"
                  >
                    <Camera className="w-4 h-4 text-gray-700" />
                  </button>
                  <button className="w-8 h-8 flex-shrink-0 rounded-full border border-gray-300 bg-white flex items-center justify-center">
                    <Mic className="w-4 h-4 text-gray-700" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="overflow-y-auto" style={{ height: 'calc(100vh - 101px - 335px)' }}>
        {searchQuery && filteredSuggestions.length > 0 ? (
          <div className="px-4 py-4">
            <div className="flex flex-col">
              {filteredSuggestions.map((suggestion, index) => (
                <div key={index}>
                  <button
                    onClick={() => {
                      navigate(`/loading?q=${encodeURIComponent(suggestion)}`);
                    }}
                    className="flex items-center gap-2 py-2 w-full"
                  >
                    <div className="flex-1 text-left text-[14px] text-foreground leading-[20px] overflow-hidden text-ellipsis whitespace-nowrap">
                      {renderHighlightedText(suggestion, searchQuery)}
                    </div>
                    <ArrowUpLeft className="w-4 h-4 text-foreground flex-shrink-0" />
                  </button>
                  {index < filteredSuggestions.length - 1 && (
                    <div className="h-px bg-border" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Keep shopping for */}
            <div className="px-3 py-4">
              <h2 className="text-[16px] font-bold text-foreground mb-2">Keep shopping for</h2>
              <div className="flex gap-2">
                <div className="flex flex-col items-center w-[72px]">
                  <div className="w-[72px] h-[72px] rounded-full bg-gray-100 mb-1 overflow-hidden">
                    <img src="https://api.builder.io/api/v1/image/assets/TEMP/c6cf4ae2ee7df7d73a8d423c511ab68367c47e76?width=120" alt="Snacks" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[12px] text-foreground text-center">Snacks</span>
                </div>
                <div className="flex flex-col items-center w-[72px]">
                  <div className="w-[72px] h-[72px] rounded-full bg-gray-100 mb-1 overflow-hidden">
                    <img src="https://api.builder.io/api/v1/image/assets/TEMP/9845889b1dc0169056690b16fab6c2a890ddd7de?width=120" alt="Sunscreen" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[12px] text-foreground text-center">Sunscreen</span>
                </div>
                <div className="flex flex-col items-center w-[72px]">
                  <div className="w-[72px] h-[72px] rounded-full bg-gray-100 mb-1 overflow-hidden">
                    <img src="https://api.builder.io/api/v1/image/assets/TEMP/3ade65abb0fb85923a3106fca9fcba342b749f09?width=120" alt="Women's pants" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[12px] text-foreground text-center">Women's pants</span>
                </div>
              </div>
            </div>

            {/* Recent Searches */}
            <div className="px-3 py-4">
              <h2 className="text-[16px] font-bold text-foreground mb-3">Your recent searches</h2>
              <div className="space-y-3">
                {recentSearches.map((search, index) => (
                  <div key={index}>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-foreground" />
                      <button
                        onClick={() => {
                          setSearchQuery(search);
                          const updatedSearches = [search, ...recentSearches.filter(s => s !== search)].slice(0, 5);
                          setRecentSearches(updatedSearches);
                        }}
                        className="flex-1 text-[14px] text-foreground text-left"
                      >
                        {search}
                      </button>
                      <button
                        onClick={() => {
                          setRecentSearches(recentSearches.filter((_, i) => i !== index));
                        }}
                      >
                        <X className="w-4 h-4 text-foreground" />
                      </button>
                    </div>
                    {index < recentSearches.length - 1 && <div className="h-px bg-border mt-3" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Trending */}
            <div className="px-3 py-4 border-b border-border">
              <h2 className="text-[16px] font-bold text-foreground mb-3">Trending</h2>
              <div className="flex flex-wrap gap-2">
                {["valentine's gift", 'teddy bear', "valentine's crafts"].map((trend, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSearchQuery(trend);
                      if (!recentSearches.includes(trend)) {
                        setRecentSearches([trend, ...recentSearches].slice(0, 5));
                      }
                    }}
                    className="px-4 py-2 rounded-full border border-muted-foreground bg-white text-[14px] text-black active:bg-gray-100 transition-colors"
                  >
                    {trend}
                  </button>
                ))}
              </div>
            </div>

            {/* Frequent Searches */}
            <div className="px-3 py-4 border-b border-border pb-8">
              <h2 className="text-[16px] font-bold text-foreground mb-3">Your frequent searches</h2>
              <div className="flex flex-wrap gap-2">
                {['makeup remover wipes', 'banana', 'dog food'].map((search, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSearchQuery(search);
                      if (!recentSearches.includes(search)) {
                        setRecentSearches([search, ...recentSearches].slice(0, 5));
                      }
                    }}
                    className="px-4 py-2 rounded-full border border-muted-foreground bg-white text-[14px] text-black active:bg-gray-100 transition-colors"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* iOS Keyboard */}
      <IOSKeyboard
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredSuggestions={filteredSuggestions}
        recentSearches={recentSearches}
        setRecentSearches={setRecentSearches}
      />
    </div>
  );
}
