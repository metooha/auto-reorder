import { SparkyLookingDown } from "@/components/icons/SparkyLookingDown";
import { CartIcon } from "@/components/icons/CartIcon";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface SearchBarProps {
  query?: string;
  showBackButton?: boolean;
  onClick?: (e?: React.MouseEvent) => void;
  cartCount?: number;
}

export function SearchBar({ query = "What are you looking for?", showBackButton = false, onClick, cartCount = 0 }: SearchBarProps) {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="flex items-center justify-center w-full gap-1 px-4 pb-3">
      {showBackButton && (
        <button onClick={() => navigate('/')} className="flex-shrink-0">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#2E2F32]">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
      <div className="flex-1 flex items-center w-full gap-1 pr-4">
        <div className={`flex-1 w-[78%] ${isActive ? 'p-[2px] rounded-full border-2 border-black' : 'rainbow-border'}`}>
          <div
            className="bg-white rounded-full px-3 py-2 flex items-center gap-1 h-[42px] cursor-pointer"
            onClick={(e) => {
              setIsActive(true);
              onClick?.(e);
            }}
            onBlur={() => setIsActive(false)}
          >
            <div className="w-6 h-6 flex-shrink-0">
              <SparkyLookingDown />
            </div>
            <div className="flex-1 w-full text-[#74767C] text-[16px] font-light self-center truncate">{query}</div>
            <div className="flex items-center gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="w-8 h-8 rounded-full border border-[#E3E4E5] bg-white flex items-center justify-center overflow-hidden"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#2E2F32]">
                  <path d="M15 13C15 13.2652 14.8946 13.5196 14.7071 13.7071C14.5196 13.8946 14.2652 14 14 14H2C1.73478 14 1.48043 13.8946 1.29289 13.7071C1.10536 13.5196 1 13.2652 1 13V5C1 4.73478 1.10536 4.48043 1.29289 4.29289C1.48043 4.10536 1.73478 4 2 4H5L6 2H10L11 4H14C14.2652 4 14.5196 4.10536 14.7071 4.29289C14.8946 4.48043 15 4.73478 15 5V13Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 11C9.65685 11 11 9.65685 11 8C11 6.34315 9.65685 5 8 5C6.34315 5 5 6.34315 5 8C5 9.65685 6.34315 11 8 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className="w-8 h-8 rounded-full border border-[#E3E4E5] bg-white flex items-center justify-center overflow-hidden">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#2E2F32]">
                  <path d="M8 1C7.46957 1 6.96086 1.21071 6.58579 1.58579C6.21071 1.96086 6 2.46957 6 3V8C6 8.53043 6.21071 9.03914 6.58579 9.41421C6.96086 9.78929 7.46957 10 8 10C8.53043 10 9.03914 9.78929 9.41421 9.41421C9.78929 9.03914 10 8.53043 10 8V3C10 2.46957 9.78929 1.96086 9.41421 1.58579C9.03914 1.21071 8.53043 1 8 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 7V8C12 9.06087 11.5786 10.0783 10.8284 10.8284C10.0783 11.5786 9.06087 12 8 12C6.93913 12 5.92172 11.5786 5.17157 10.8284C4.42143 10.0783 4 9.06087 4 8V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 12V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 15H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <CartIcon count={cartCount} price="$0.00" textColor="#515357" className="flex-shrink-0" />
      </div>
    </div>
  );
}
