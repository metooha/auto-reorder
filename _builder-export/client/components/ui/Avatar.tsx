import React, { useState } from 'react';

export interface AvatarProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Avatar: React.FC<AvatarProps> = ({ children, className, style }) => (
  <span className={className} style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: '50%', overflow: 'hidden', ...style }}>
    {children}
  </span>
);

export const AvatarImage: React.FC<{ src?: string; alt?: string; className?: string }> = ({ src, alt, className }) => {
  const [error, setError] = useState(false);
  if (error || !src) return null;
  return <img src={src} alt={alt} className={className} onError={() => setError(true)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />;
};

export const AvatarFallback: React.FC<{ children: React.ReactNode; className?: string; style?: React.CSSProperties }> = ({ children, className, style }) => (
  <span className={className} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', background: 'var(--ld-semantic-color-fill-surface-secondary, #f2f3f3)', fontSize: 14, fontWeight: 600 }}>
    {children}
  </span>
);

export default Avatar;
