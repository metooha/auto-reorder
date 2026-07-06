interface CartIconProps {
  count?: number;
  price?: string;
  className?: string;
  badgeColor?: string;
  textColor?: string;
}

export function CartIcon({ 
  count = 0, 
  price = "$0.00",
  className = "",
  badgeColor = "#FFC220",
  textColor = "white"
}: CartIconProps) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative">
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 32 32" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          style={{ color: textColor }}
        >
          <path 
            fill="currentColor" 
            d="M12 24a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm13 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM5.702 4a1.4 1.4 0 0 1 1.341.998L7.343 6h21.259a1.4 1.4 0 0 1 1.366 1.704l-1.83 8.233a1.4 1.4 0 0 1-1.211 1.088l-16.308 1.813A.583.583 0 0 0 10.684 20H27v2H10.684a2.583 2.583 0 0 1-.286-5.15l15.881-1.765L27.854 8H7.944l2.014 6.713-1.916.574L5.256 6H2V4h3.702Z"
          />
        </svg>
        <div
          className="absolute -top-1 -right-1 border border-[#662B0D] text-[#2E2F32] text-[10px] font-bold rounded-full min-w-[16px] h-4 px-1 flex items-center justify-center"
          style={{ backgroundColor: badgeColor }}
        >
          {count > 99 ? '99+' : count}
        </div>
      </div>
      <div className="text-center mt-0.5" style={{ color: textColor, fontSize: 'var(--ld-semantic-font-caption-size, 12px)', lineHeight: 'var(--ld-semantic-font-caption-lineheight, 16px)', fontWeight: 'var(--ld-semantic-font-caption-weight-default, 400)' as any }}>
        {price}
      </div>
    </div>
  );
}
