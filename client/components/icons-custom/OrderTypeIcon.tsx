import React from 'react';

/**
 * Maps each OrderType to its fulfillment icon image.
 * Centralises the icon URLs that were previously duplicated across
 * OrderCard, CombinedOrderCard, and DelayedDeliveryCard.
 */
const FULFILLMENT_ICONS: Record<string, { src: string; alt: string }> = {
  curbside: {
    src: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Feb8e854b1c2441668631c59d482af3f2',
    alt: 'Curbside pickup',
  },
  delivery: {
    src: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F06ac09fed4534c02b62a8d43e759a824',
    alt: 'Delivery',
  },
  store: {
    src: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F4ed8486e018848678a23689dc195dcd8',
    alt: 'Store purchase',
  },
  shipping: {
    src: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fae074f13699f44c0a142fc357711a02e',
    alt: 'Shipping',
  },
  auto: {
    src: 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F26a934c359774221bf674b2fb62d93da',
    alt: 'Auto Care Center',
  },
};

export interface OrderTypeIconProps {
  /** The order fulfillment type */
  type: string;
  /** Width in pixels. @default 64 */
  width?: number;
  /** Height in pixels. @default 64 */
  height?: number;
  /** Additional className */
  className?: string;
}

/**
 * Renders the fulfillment-type icon image for an order card header.
 * Covers curbside, delivery, store, shipping, and auto care types.
 */
export function OrderTypeIcon({ type, width = 64, height = 64, className }: OrderTypeIconProps) {
  const icon = FULFILLMENT_ICONS[type] ?? FULFILLMENT_ICONS.delivery;
  return (
    <img
      src={icon.src}
      alt=""
      aria-hidden="true"
      width={width}
      height={height}
      className={className}
    />
  );
}

/** Direct access to the icon source URL for a given order type */
export function getOrderTypeIconSrc(type: string): string {
  return (FULFILLMENT_ICONS[type] ?? FULFILLMENT_ICONS.delivery).src;
}
