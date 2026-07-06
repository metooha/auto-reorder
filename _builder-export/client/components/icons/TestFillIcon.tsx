import type { SVGProps } from 'react';

export function TestFillIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32">
  <path fill="#2E2F32" d="M24 2v2h-4v10l9.6 12.8c.926 1.237.158 2.967-1.3 3.178L28 30H4l-.3-.021c-1.457-.213-2.227-1.942-1.302-3.178L12 14V4H8V2h16Z"/>
</svg>
  );
}
