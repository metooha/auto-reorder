import { SVGProps } from 'react';

/**
 * Oil Change icon — oil can pouring, representing Auto Care oil change service.
 */
export function OilChangeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      {/* Oil can body */}
      <rect x="8" y="28" width="30" height="24" rx="3" fill="#0071DC" />
      {/* Can top / nozzle base */}
      <rect x="12" y="22" width="22" height="8" rx="2" fill="#004C94" />
      {/* Spout */}
      <path d="M34 26 L52 18 L54 22 L36 30 Z" fill="#004C94" />
      {/* Spout tip */}
      <circle cx="53" cy="20" r="3" fill="#0060B8" />
      {/* Oil drop falling */}
      <path
        d="M50 32 C50 32 46 38 46 41 C46 43.2 47.8 45 50 45 C52.2 45 54 43.2 54 41 C54 38 50 32 50 32Z"
        fill="#F7C200"
      />
      {/* Shine on can */}
      <rect x="13" y="30" width="4" height="12" rx="2" fill="white" opacity="0.2" />
      {/* Label line */}
      <rect x="12" y="36" width="22" height="2" rx="1" fill="white" opacity="0.3" />
      {/* Bottom ground line */}
      <rect x="6" y="52" width="34" height="2" rx="1" fill="#E3E4E5" />
    </svg>
  );
}
