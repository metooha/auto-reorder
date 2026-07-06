import type { SVGProps } from 'react';

export function MenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32">
      <path fill="var(--ld-semantic-color-topnav-text)" d="M30 24.001v2H2v-2h28Zm0-7H2v-2h28v2Zm0-9H2v-2h28v2Z"/>
    </svg>
  );
}
