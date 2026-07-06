import React from 'react';
import styles from './Skeleton.module.css';

export interface SkeletonProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> {
  /** Width of the skeleton */
  width?: string | number;
  /** Height of the skeleton */
  height?: string | number;
  /** Shape variant */
  variant?: 'rectangle' | 'rounded';
  /** AI-generated content indicator with special animation */
  isMagic?: boolean;
  UNSAFE_className?: string;
  UNSAFE_style?: React.CSSProperties;
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      width,
      height,
      variant = 'rectangle',
      isMagic = false,
      UNSAFE_className,
      UNSAFE_style,
      ...props
    },
    ref
  ) => {
    const classNames = [
      styles.skeleton,
      styles[variant],
      isMagic && styles.magic,
      UNSAFE_className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        className={classNames}
        style={{
          width: typeof width === 'number' ? `${width}px` : width,
          height: typeof height === 'number' ? `${height}px` : height,
          ...UNSAFE_style,
        }}
        aria-hidden="true"
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';
export default Skeleton;
