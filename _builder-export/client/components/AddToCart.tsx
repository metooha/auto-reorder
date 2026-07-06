import { useState, useEffect, useRef } from "react";

interface AddToCartProps {
  onQuantityChange?: (quantity: number) => void;
}

export function AddToCart({ onQuantityChange }: AddToCartProps) {
  const [quantity, setQuantity] = useState(0);
  const [mode, setMode] = useState<'initial' | 'expanded' | 'collapsed'>('initial');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Handle auto-collapse after 5 seconds
  useEffect(() => {
    if (mode === 'expanded' && quantity > 0) {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set new timeout to collapse after 5 seconds
      timeoutRef.current = setTimeout(() => {
        setMode('collapsed');
      }, 5000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [mode, quantity]);

  const handleInitialClick = () => {
    setQuantity(1);
    setMode('expanded');
    onQuantityChange?.(1);
  };

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    setMode('expanded');
    onQuantityChange?.(newQuantity);
  };

  const handleDecrement = () => {
    const newQuantity = Math.max(0, quantity - 1);
    setQuantity(newQuantity);

    if (newQuantity === 0) {
      setMode('initial');
    } else {
      setMode('expanded');
    }

    onQuantityChange?.(newQuantity);
  };

  const handleCollapsedClick = () => {
    setMode('expanded');
  };

  // Initial State: Plus button only
  if (mode === 'initial') {
    return (
      <button
        onClick={handleInitialClick}
        className="flex w-8 h-8 justify-center items-center rounded-full border border-[#74767C] bg-white transition-all duration-200 ease-out hover:scale-105 active:scale-95"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-200"
        >
          <path d="M7.5 8.5V13H8.5V8.5H13V7.5H8.5V3H7.5V7.5H3V8.5H7.5Z" fill="#2E2F32"/>
        </svg>
      </button>
    );
  }

  // Collapsed State: Just the count
  if (mode === 'collapsed') {
    return (
      <button
        onClick={handleCollapsedClick}
        className="flex w-8 h-8 px-2 justify-center items-center rounded-full border border-[#74767C] bg-white transition-all duration-300 ease-out hover:scale-105 active:scale-95"
      >
        <span
          className="text-[#2E2F32] text-center text-sm font-bold leading-5 animate-fade-in"
          style={{ fontFamily: 'Everyday Sans UI, -apple-system, Roboto, Helvetica, sans-serif' }}
        >
          {quantity}
        </span>
      </button>
    );
  }

  // Expanded State: Full stepper (minus, count, plus)
  return (
    <div className="flex min-w-[112px] h-8 px-1 items-center gap-1 rounded-full border border-[#74767C] bg-white transition-all duration-300 ease-out animate-expand-width">
      {/* Decrement Button */}
      <button
        onClick={handleDecrement}
        className="flex w-6 h-6 p-1 justify-center items-center rounded-full bg-white transition-all duration-150 ease-out hover:bg-gray-50 active:scale-90 animate-fade-in"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 8.5H3V7.5H13V8.5Z" fill="#2E2F32"/>
        </svg>
      </button>

      {/* Count Display */}
      <div className="flex flex-1 justify-center items-center">
        <span
          className="text-[#2E2F32] text-center text-sm font-bold leading-5 transition-all duration-200"
          style={{ fontFamily: 'Everyday Sans UI, -apple-system, Roboto, Helvetica, sans-serif' }}
        >
          {quantity}
        </span>
      </div>

      {/* Increment Button */}
      <button
        onClick={handleIncrement}
        className="flex w-6 h-6 p-1 justify-center items-center rounded-full bg-white transition-all duration-150 ease-out hover:bg-gray-50 active:scale-90 animate-fade-in"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.5 8.5V13H8.5V8.5H13V7.5H8.5V3H7.5V7.5H3V8.5H7.5Z" fill="#2E2F32"/>
        </svg>
      </button>
    </div>
  );
}
