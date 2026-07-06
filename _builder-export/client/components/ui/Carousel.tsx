import React, { useState, useRef, createContext, useContext, useCallback } from 'react';

interface CarouselContextValue {
  currentIndex: number;
  setCurrentIndex: (i: number) => void;
  totalItems: number;
  setTotalItems: (n: number) => void;
}
const CarouselContext = createContext<CarouselContextValue>({ currentIndex: 0, setCurrentIndex: () => {}, totalItems: 0, setTotalItems: () => {} });

export const Carousel: React.FC<{ children: React.ReactNode; className?: string; opts?: any; setApi?: (api: any) => void }> = ({ children, className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  return (
    <CarouselContext.Provider value={{ currentIndex, setCurrentIndex, totalItems, setTotalItems }}>
      <div className={className} style={{ position: 'relative', overflow: 'hidden' }}>{children}</div>
    </CarouselContext.Provider>
  );
};

export const CarouselContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  const { setTotalItems } = useContext(CarouselContext);
  const count = React.Children.count(children);
  React.useEffect(() => setTotalItems(count), [count, setTotalItems]);
  return <div className={className} style={{ display: 'flex', gap: 16, overflow: 'hidden' }}>{children}</div>;
};

export const CarouselItem: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={className} style={{ flex: '0 0 auto', minWidth: 0 }}>{children}</div>
);

export const CarouselPrevious: React.FC<{ className?: string }> = ({ className }) => {
  const { currentIndex, setCurrentIndex } = useContext(CarouselContext);
  return <button className={className} onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))} aria-label="Previous">&lt;</button>;
};

export const CarouselNext: React.FC<{ className?: string }> = ({ className }) => {
  const { currentIndex, setCurrentIndex, totalItems } = useContext(CarouselContext);
  return <button className={className} onClick={() => setCurrentIndex(Math.min(totalItems - 1, currentIndex + 1))} aria-label="Next">&gt;</button>;
};

export default Carousel;
