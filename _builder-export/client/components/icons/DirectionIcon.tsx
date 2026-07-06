import type { SVGProps } from 'react';

export function DirectionIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32">
  <path fill="#2E2F32" d="M14.901 2.455a1.553 1.553 0 0 1 2.197 0l12.447 12.446c.606.607.606 1.59 0 2.197L17.098 29.545a1.553 1.553 0 0 1-2.197 0L2.455 17.098a1.553 1.553 0 0 1 0-2.197L14.901 2.455ZM4.185 16 16 27.814 27.814 16 16 4.185 4.185 16Zm17.522-1.707a1 1 0 0 1 0 1.414l-4 4-1.414-1.414L18.586 16H15a1 1 0 0 0-1 1v4h-2v-4a3 3 0 0 1 3-3h3.586l-2.293-2.293 1.414-1.414 4 4Z"/>
</svg>
  );
}
