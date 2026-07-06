import styles from './IOSKeyboard.module.css';

interface IOSKeyboardProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  filteredSuggestions: string[];
  recentSearches: string[];
  setRecentSearches: React.Dispatch<React.SetStateAction<string[]>>;
}

export function IOSKeyboard({
  searchQuery,
  setSearchQuery,
  filteredSuggestions,
  recentSearches,
  setRecentSearches,
}: IOSKeyboardProps) {
  return (
    <div className={`fixed bottom-0 left-0 right-0 z-[110] lg:hidden ${styles.keyboard}`} style={{ height: '335px' }}>
      {/* Suggestion Bar */}
      <div className="flex items-center gap-[2px] px-[1px] pt-[10px] pb-0 h-[44px]">
        {searchQuery ? (
          <>
            <button
              onClick={() => {
                if (searchQuery && !recentSearches.includes(searchQuery)) {
                  setRecentSearches([searchQuery, ...recentSearches].slice(0, 5));
                }
              }}
              className="flex-1 h-[34px] flex items-center justify-center rounded-[4.6px] bg-white bg-opacity-80 active:bg-opacity-60 transition-colors"
            >
              <span className={`${styles.keyboardText} text-[17px] font-normal truncate px-2`}>"{searchQuery}"</span>
            </button>
            <div className="w-px h-6 bg-black opacity-10"></div>

            {filteredSuggestions.slice(0, 2).map((suggestion, idx) => (
              <div key={idx} className="flex items-center flex-1 h-[34px]">
                <button
                  onClick={() => {
                    setSearchQuery(suggestion);
                    if (!recentSearches.includes(suggestion)) {
                      setRecentSearches([suggestion, ...recentSearches].slice(0, 5));
                    }
                  }}
                  className="flex-1 h-full flex items-center justify-center rounded-[4.6px] bg-white bg-opacity-0 active:bg-opacity-60 transition-colors"
                >
                  <span className={`${styles.keyboardText} text-[17px] font-normal truncate px-2`}>{suggestion}</span>
                </button>
                {idx < Math.min(filteredSuggestions.length - 1, 1) && (
                  <div className="w-px h-6 bg-black opacity-10"></div>
                )}
              </div>
            ))}

            {filteredSuggestions.length < 2 && (
              <>
                {filteredSuggestions.length === 0 && (
                  <>
                    <button className="flex-1 h-[34px] flex items-center justify-center rounded-[4.6px]">
                      <span className={`${styles.keyboardText} text-[17px]`}> </span>
                    </button>
                    <div className="w-px h-6 bg-black opacity-10"></div>
                  </>
                )}
                <button className="flex-1 h-[34px] flex items-center justify-center rounded-[4.6px]">
                  <span className={`${styles.keyboardText} text-[17px]`}> </span>
                </button>
              </>
            )}
          </>
        ) : (
          <>
            {['I', 'The', "I'm"].map((word, idx) => (
              <div key={idx} className="flex items-center flex-1 h-[34px]">
                <button
                  onClick={() => {
                    const searchTerm = word.toLowerCase();
                    setSearchQuery(searchTerm);
                  }}
                  className="flex-1 h-full flex items-center justify-center rounded-[4.6px] bg-white bg-opacity-0 active:bg-opacity-60 transition-colors"
                >
                  <span className={`${styles.keyboardText} text-[17px] font-normal`}>{word}</span>
                </button>
                {idx < 2 && <div className="w-px h-6 bg-black opacity-10"></div>}
              </div>
            ))}
          </>
        )}
      </div>

      {/* Keyboard Layout */}
      <div className="px-[3px] py-2 flex flex-col gap-3">
        <div className="flex gap-[5px]">
          {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map((key) => (
            <button
              key={key}
              onClick={() => setSearchQuery(prev => prev + key.toLowerCase())}
              className="flex-1 bg-white rounded-[4.6px] shadow-[0_1px_0_0_#898A8D] px-2 py-[7px] flex items-center justify-center"
            >
              <span className="text-[22px] text-black">{key}</span>
            </button>
          ))}
        </div>

        <div className="flex gap-[5px]">
          {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map((key) => (
            <button
              key={key}
              onClick={() => setSearchQuery(prev => prev + key.toLowerCase())}
              className="flex-1 bg-white rounded-[4.6px] shadow-[0_1px_0_0_#898A8D] px-2 py-[7px] flex items-center justify-center"
            >
              <span className="text-[22px] text-black">{key}</span>
            </button>
          ))}
        </div>

        <div className="flex gap-[1px]">
          <div className="w-[42px] h-[42px] bg-white rounded-[4.6px] shadow-[0_1px_0_0_#898A8D] flex items-center justify-center">
            <span className="text-[16px] text-black">&#x21E7;</span>
          </div>
          <div className="flex-1 flex gap-[5px]">
            {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map((key) => (
              <button
                key={key}
                onClick={() => setSearchQuery(prev => prev + key.toLowerCase())}
                className="flex-1 bg-white rounded-[4.6px] shadow-[0_1px_0_0_#898A8D] px-2 py-[7px] flex items-center justify-center"
              >
                <span className="text-[22px] text-black">{key}</span>
              </button>
            ))}
          </div>
          <button
            onClick={() => setSearchQuery(prev => prev.slice(0, -1))}
            className={`w-[42px] h-[42px] ${styles.modifierKey} rounded-[4.6px] shadow-[0_1px_0_0_#898A8D] flex items-center justify-center`}
          >
            <span className="text-[16px] text-black">&#x232B;</span>
          </button>
        </div>

        <div className="flex gap-[6px]">
          <div className={`w-[87px] h-[42px] ${styles.modifierKey} rounded-[4.6px] shadow-[0_1px_0_0_#898A8D] flex items-center justify-center`}>
            <span className="text-[16px] text-black">123</span>
          </div>
          <button
            onClick={() => setSearchQuery(prev => prev + ' ')}
            className="flex-1 h-[42px] bg-white rounded-[4.6px] shadow-[0_1px_0_0_#898A8D] flex items-center justify-center"
          >
            <span className="text-[16px] text-black">space</span>
          </button>
          <div className={`w-[88px] h-[42px] ${styles.modifierKey} rounded-[4.6px] shadow-[0_1px_0_0_#898A8D] flex items-center justify-center`}>
            <span className="text-[16px] text-black">Go</span>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className={`flex justify-between items-start px-0 ${styles.suggestionBar}`}>
        <div className="w-[47px] h-[47px] flex items-center justify-center">
          <span className={`text-[26px] ${styles.subtleText}`}>&#x1F600;</span>
        </div>
        <div className="w-[47px] h-[47px] flex items-center justify-center">
          <span className={`text-[26px] ${styles.subtleText}`}>&#x1F3A4;</span>
        </div>
      </div>

      {/* Home Indicator */}
      <div className="flex justify-center items-center pb-[9px] pt-[1px]">
        <div className="w-[134px] h-[5px] bg-black opacity-30 rounded-full"></div>
      </div>
    </div>
  );
}
