import type { SVGProps } from 'react';

export function ParkingIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32">
  <path fill="#2E2F32" d="M16 2a14 14 0 1 1 0 28 14 14 0 0 1 0-28Zm0 2a12.001 12.001 0 1 0 0 24.002A12.001 12.001 0 0 0 16 4Zm1 4a5.002 5.002 0 0 1 3.536 8.535A5.002 5.002 0 0 1 17 18h-3v6h-2V8h5Zm-3 2v6h3a3 3 0 0 0 0-6h-3Z"/>
</svg>
  );
}
