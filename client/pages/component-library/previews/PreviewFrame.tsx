import React from 'react';

/**
 * Wrapper that constrains preview content to a fixed area inside each card.
 * pointer-events:none prevents accidental interaction.
 */
export function PreviewFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        height: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '12px 16px',
        overflow: 'hidden',
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      {children}
    </div>
  );
}
