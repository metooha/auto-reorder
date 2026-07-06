import type { SVGProps } from 'react';

export function CardIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32">
  <path fill="#2E2F32" d="M27 6a3 3 0 0 1 3 3v5H4v9a1 1 0 0 0 1 1h22a1 1 0 0 0 1-1v-6h2v6a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3h22ZM13 18v2H7v-2h6ZM5 8a1 1 0 0 0-1 1v3h24V9a1 1 0 0 0-1-1H5Z"/>
</svg>
  );
}
