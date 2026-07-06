import type { SVGProps } from 'react';

export function AddToCartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32">
  <path fill="#2E2F32" d="M12.5 24a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm12 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM5 4a3 3 0 0 1 3 3v12a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-4h2v4a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V7a1 1 0 0 0-1-1H2V4h3Zm14 9.586 3.293-3.293 1.414 1.414L19.414 16a2 2 0 0 1-2.828 0l-4.293-4.293 1.414-1.414L17 13.586V4h2v9.586Z"/>
</svg>
  );
}
