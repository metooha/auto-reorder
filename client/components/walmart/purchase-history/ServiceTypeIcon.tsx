import React from 'react';

export type ServiceType = 'AUTO' | 'BAKERY' | 'OPTICAL' | 'PHARMACY';

const SERVICE_ICONS: Record<ServiceType, { src: string; alt: string }> = {
  AUTO:     { src: '/illustrations/spot-illustration/AutoCare.svg',    alt: 'Auto Care' },
  BAKERY:   { src: '/illustrations/spot-illustration/CakesCustom.svg', alt: 'Custom Cake' },
  OPTICAL:  { src: '/illustrations/spot-illustration/Glasses.svg',     alt: 'Optical' },
  PHARMACY: { src: '/illustrations/spot-illustration/Pharmacy.svg',    alt: 'Prescription' },
};

interface ServiceTypeIconProps {
  type: ServiceType;
  size?: number;
}

export function ServiceTypeIcon({ type, size = 32 }: ServiceTypeIconProps) {
  const { src, alt } = SERVICE_ICONS[type];
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      style={{ objectFit: 'contain', flexShrink: 0 }}
    />
  );
}
