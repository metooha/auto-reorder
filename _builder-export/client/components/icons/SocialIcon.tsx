import type { SVGProps } from 'react';

export function SocialIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32">
  <path fill="#2E2F32" d="M19.96 3.459c.72 0 1.32.6 1.32 1.32v3.86h-1.739V5.22H3.901V18l3.1-2.58h3.7V11.6c0-.72.6-1.32 1.32-1.32h16.5c.72 0 1.32.6 1.32 1.32v16.94l-5.48-4.56H12.02c-.72 0-1.32-.6-1.32-1.32v-5.5H7.64l-5.48 4.56V4.779c0-.72.6-1.32 1.32-1.32h16.48Zm-7.5 8.56v10.2h12.541l3.1 2.58v-12.78H12.46Z"/>
</svg>
  );
}
