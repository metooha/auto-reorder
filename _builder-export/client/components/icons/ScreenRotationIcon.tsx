import type { SVGProps } from 'react';

export function ScreenRotationIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32">
  <path fill="#2E2F32" d="M30 16c0 7.732-6.268 14-14 14v-2c6.627 0 12-5.373 12-12h-2l4-4v4ZM16.708 6.808a3 3 0 0 1 4.242 0l4.243 4.243a3 3 0 0 1 0 4.242l-9.9 9.9a3 3 0 0 1-4.242 0L6.809 20.95a3 3 0 0 1 0-4.243l9.899-9.9Zm2.828 1.414a1 1 0 0 0-1.414 0l-9.9 9.9a1 1 0 0 0 0 1.414l4.243 4.242c.39.39 1.024.39 1.415 0l9.9-9.9a1 1 0 0 0 0-1.413l-4.244-4.243Zm-5.828 12.071-1.414 1.414-2-2 1.414-1.414 2 2ZM16 4C9.373 4 4 9.373 4 16h2l-4 4v-4C2 8.268 8.268 2 16 2v2Z"/>
</svg>
  );
}
