import type { SVGProps } from 'react';

export function PromoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32">
  <path fill="#2E2F32" d="M19.37 2.01a2 2 0 0 1 1.216.576l4.828 4.828A2 2 0 0 1 26 8.828V29l-.02.201c-.08.391-.388.7-.779.78L25 30H7l-.201-.02c-.391-.08-.7-.388-.78-.779L6 29V8.828a2 2 0 0 1 .453-1.267l.133-.147 4.828-4.828a2 2 0 0 1 1.217-.576l.197-.01h6.344l.197.01ZM8 8.828V28h16V8.828L19.172 4h-6.344L8 8.828Zm13.707 8.879L14 25.414l-3.707-3.707 1.414-1.414L14 22.586l6.293-6.293 1.414 1.414ZM16 7a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"/>
</svg>
  );
}
