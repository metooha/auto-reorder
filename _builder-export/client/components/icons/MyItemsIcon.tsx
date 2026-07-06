import type { SVGProps } from 'react';

export function MyItemsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32">
  <path fill="#2E2F32" d="M21 2a3 3 0 0 1 3 3v15h-2V5a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v22a1 1 0 0 0 1 1h10v2H7a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h14Zm7 21.7-5 5a.96.96 0 0 1-1.4 0l-3-3 1.4-1.4 2.3 2.28 4.3-4.28 1.4 1.4ZM17 8h-6V6h6v2Z"/>
</svg>
  );
}
