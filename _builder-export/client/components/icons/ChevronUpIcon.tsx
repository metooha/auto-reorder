import type { SVGProps } from 'react';

export function ChevronUpIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32">
      <path fill="var(--ld-semantic-color-topnav-text)" d="M16 9.001c.287 0 .56.12.754.331L28 21.617l-1.508 1.384L16 11.539 5.507 23 4 21.617 15.246 9.332c.194-.211.467-.331.754-.331Z"/>
    </svg>
  );
}
