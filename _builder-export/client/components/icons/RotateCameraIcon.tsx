import type { SVGProps } from 'react';

export function RotateCameraIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32">
  <path fill="#2E2F32" d="M26 5a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4h-2.586l1.293 1.293-1.414 1.414-3-3a1 1 0 0 1 0-1.414l3-3 1.414 1.414L23.414 25H26a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H15V5h11Zm-14.293.293a1 1 0 0 1 0 1.414l-3 3-1.414-1.414L8.586 7H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11v2H6a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4h2.586L7.293 3.707l1.414-1.414 3 3ZM16 10a6 6 0 1 1 0 12 6 6 0 0 1 0-12Zm0 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"/>
</svg>
  );
}
