import type { SVGProps } from 'react';

export function CalendarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32">
  <path fill="#2E2F32" d="M5 15v11a1 1 0 0 0 1 1h20a1 1 0 0 0 1-1V15h2v11a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V15h2Zm6-13v2h10V2h2v2h5a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5V2h2ZM5 6v5h22V6h-4v2h-2V6H11v2H9V6H5Z"/>
</svg>
  );
}
