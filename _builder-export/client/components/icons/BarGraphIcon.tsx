import type { SVGProps } from 'react';

export function BarGraphIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32">
  <path fill="#2E2F32" d="M10 26H2v-2h8v2Zm14-6H2v-2h22v2Zm-4-6H2v-2h18v2Zm10-6H2V6h28v2Z"/>
</svg>
  );
}
