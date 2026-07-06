import type { SVGProps } from 'react';

/**
 * Minimize / Collapse icon — collapse arrows pointing inward.
 * Used for the minimize/collapse action on the replenishment basket panel.
 */
export const MinimizeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M10.5 22.5H9V15H1.5v-1.5h9v9ZM15 9h7.5v1.5h-9v-9H15V9Z"
    />
  </svg>
);
