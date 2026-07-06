import { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';

interface MartyContextValue {
  isMinimized: boolean;
  isDocked: boolean;
  initialPosition: { x: number; y: number };
  setIsMinimized: (minimized: boolean) => void;
  setIsDocked: (docked: boolean) => void;
  setInitialPosition: (pos: { x: number; y: number }) => void;
}

const MartyContext = createContext<MartyContextValue | undefined>(undefined);

interface MartyProviderProps {
  children: ReactNode;
}

export function MartyProvider({ children }: MartyProviderProps) {
  // Initialize state from localStorage or defaults
  const [isMinimized, setIsMinimized] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('marty-minimized');
      return saved ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  const [isDocked, setIsDocked] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('marty-docked');
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  const [initialPosition, setInitialPosition] = useState<{ x: number; y: number }>(() => {
    try {
      const saved = localStorage.getItem('marty-position');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignore parse errors
    }
    // Safe window access - use default if window is not available
    const defaultX = typeof window !== 'undefined' ? window.innerWidth - 400 : 800;
    return { x: defaultX, y: 100 };
  });

  // Persist to localStorage when state changes
  useEffect(() => {
    try {
      localStorage.setItem('marty-minimized', JSON.stringify(isMinimized));
    } catch {
      // Ignore localStorage errors
    }
  }, [isMinimized]);

  useEffect(() => {
    try {
      localStorage.setItem('marty-docked', JSON.stringify(isDocked));
    } catch {
      // Ignore localStorage errors
    }
  }, [isDocked]);

  useEffect(() => {
    try {
      localStorage.setItem('marty-position', JSON.stringify(initialPosition));
    } catch {
      // Ignore localStorage errors
    }
  }, [initialPosition]);

  const value = useMemo<MartyContextValue>(() => ({
    isMinimized,
    isDocked,
    initialPosition,
    setIsMinimized,
    setIsDocked,
    setInitialPosition,
  }), [isMinimized, isDocked, initialPosition]);

  return (
    <MartyContext.Provider value={value}>
      {children}
    </MartyContext.Provider>
  );
}

export function useMarty() {
  const context = useContext(MartyContext);
  if (context === undefined) {
    throw new Error('useMarty must be used within a MartyProvider');
  }
  return context;
}
