import React from 'react';

export interface ScrollAreaProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  orientation?: 'vertical' | 'horizontal' | 'both';
}

export const ScrollArea: React.FC<ScrollAreaProps> = ({ children, className, style, orientation = 'vertical' }) => (
  <div
    className={className}
    style={{
      overflow: orientation === 'horizontal' ? 'auto hidden' : orientation === 'both' ? 'auto' : 'hidden auto',
      ...style,
    }}
  >
    {children}
  </div>
);

export const ScrollBar: React.FC<{ orientation?: 'vertical' | 'horizontal'; className?: string }> = () => null;

export default ScrollArea;
