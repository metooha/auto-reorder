import { SVGProps } from 'react';

export const MaximizeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M4 12h5v1H3V7h1v5Zm9-9v6h-1V4H7V3h6Z" />
  </svg>
);
