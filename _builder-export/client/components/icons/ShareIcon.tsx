import type { SVGProps } from 'react';

export function ShareIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32">
  <path fill="#2E2F32" d="M10 10v2H6v16h20V12h-4v-2h4a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V12a2 2 0 0 1 2-2h4Zm5.293-7.707a1 1 0 0 1 1.414 0l5 5-1.414 1.414L17 5.414V20h-2V5.414l-3.293 3.293-1.414-1.414 5-5Z"/>
</svg>
  );
}
