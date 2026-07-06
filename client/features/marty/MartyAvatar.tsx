import React, { useState, useEffect, Suspense } from 'react';

const Lottie = React.lazy(() => import('lottie-react'));

// Cache animation data to avoid re-fetching
const animationCache: Record<string, unknown> = {};

interface MartyAvatarProps {
  size?: number;
  variant?: 'default' | 'glasses';
}

export function MartyAvatar({ size = 38, variant = 'default' }: MartyAvatarProps) {
  const [animData, setAnimData] = useState<unknown>(
    animationCache[variant] ?? null
  );

  useEffect(() => {
    if (animationCache[variant]) {
      setAnimData(animationCache[variant]);
      return;
    }

    const url = variant === 'glasses'
      ? '/animations/marty-glasses.json'
      : '/animations/marty-thinking.json';

    fetch(url)
      .then(r => r.json())
      .then(data => {
        animationCache[variant] = data;
        setAnimData(data);
      });
  }, [variant]);

  const placeholder = <div style={{ width: size, height: size }} />;

  if (!animData) return placeholder;

  return (
    <Suspense fallback={placeholder}>
      <Lottie
        animationData={animData}
        loop={true}
        style={{ width: size, height: size }}
      />
    </Suspense>
  );
}
