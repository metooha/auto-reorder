import type { SVGProps } from 'react';

export function BarcodeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32">
  <path fill="#2E2F32" d="M11 6H4v20h7v2H3.4A1.4 1.4 0 0 1 2 26.6V5.4A1.4 1.4 0 0 1 3.4 4H11v2Zm17.6-2A1.4 1.4 0 0 1 30 5.4v21.2a1.4 1.4 0 0 1-1.4 1.4H21v-2h7V6h-7V4h7.6ZM9 12v8H7v-8h2Zm4 8h-2v-8h2v8Zm4 0h-2v-8h2v8Zm4 0h-2v-8h2v8Zm4 0h-2v-8h2v8Z"/>
</svg>
  );
}
