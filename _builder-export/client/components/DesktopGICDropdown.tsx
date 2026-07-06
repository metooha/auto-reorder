import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { FulfillmentShippingIcon } from "@/components/icons/FulfillmentShippingIcon";
import { LocationIcon } from "@/components/icons/LocationIcon";
import { StoreIcon } from "@/components/icons/StoreIcon";

interface DesktopGICDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  selectedOption: 'none' | 'shipping' | 'pickup' | 'delivery';
  onSelectOption: (option: 'none' | 'shipping' | 'pickup' | 'delivery') => void;
}

export function DesktopGICDropdown({ isOpen, onClose, selectedOption, onSelectOption }: DesktopGICDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const options: Array<{ key: 'shipping' | 'pickup' | 'delivery'; label: string; icon: React.ReactNode }> = [
    {
      key: 'shipping',
      label: 'Shipping',
      icon: <FulfillmentShippingIcon className="w-[50px] h-[50px]" />,
    },
    {
      key: 'pickup',
      label: 'Pickup',
      icon: <img src="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Ff91b889ffddd4a669bd5f5ed913c38df" alt="Pickup" className="w-[50px] h-[50px]" />,
    },
    {
      key: 'delivery',
      label: 'Delivery',
      icon: <img src="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Ff8af2f0cfbbf459b862fcbd867dac70d" alt="Delivery" className="w-[50px] h-[50px]" />,
    },
  ];

  return (
    <>
      {/* Scrim overlay - rendered via portal to sit outside header stacking context */}
      {createPortal(
        <div
          className="fixed inset-0 bg-black/40 z-[99]"
          onClick={onClose}
        />,
        document.body
      )}

      {/* Dropdown panel */}
      <div ref={dropdownRef} className="absolute top-full left-0 mt-2 w-[314px] rounded-b-2xl shadow-none z-[100] overflow-hidden">
        {/* Blue section - icon options */}
        <div className="bg-[var(--ld-semantic-color-action-fill-primary,#0053E2)] pt-6 pb-5 px-0">
          <div className="flex w-full">
            {options.map((opt) => (
              <button
                key={opt.key}
                className="flex-1 flex flex-col items-center px-4"
                onClick={() => onSelectOption(selectedOption === opt.key ? 'none' : opt.key)}
              >
                <div className="relative w-[70px] h-[70px] flex items-center justify-center">
                  {opt.icon}
                  {selectedOption === opt.key && (
                    <>
                      <svg className="absolute inset-[3px]" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="32" cy="32" r="30" stroke="var(--ld-primitive-color-spark-90,#FFC836)" strokeWidth="4"/>
                      </svg>
                      <button
                        onClick={(e) => { e.stopPropagation(); onSelectOption('none'); }}
                        className="absolute top-[2px] right-0 w-6 h-6 flex items-center justify-center"
                        aria-label={`Deselect ${opt.label}`}
                      >
                        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="10.5" cy="10.5" r="10.5" fill="var(--ld-primitive-color-spark-90,#FFC836)"/>
                        </svg>
                        <svg className="absolute" width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M1.20967 0.157278C0.915456 -0.0714902 0.490033 -0.0506931 0.21967 0.21967C-0.0732233 0.512563 -0.0732233 0.987437 0.21967 1.28033L3.43934 4.5L0.21967 7.71967C-0.0732229 8.01256 -0.0732229 8.48744 0.21967 8.78033C0.490033 9.05069 0.915456 9.07149 1.20967 8.84272L1.28033 8.78033L4.5 5.56066L7.71967 8.78033L7.79033 8.84272C8.08454 9.07149 8.50997 9.05069 8.78033 8.78033C9.07322 8.48744 9.07322 8.01256 8.78033 7.71967L5.56066 4.5L8.78033 1.28033C9.07322 0.987437 9.07322 0.512563 8.78033 0.21967C8.50997 -0.0506931 8.08454 -0.0714902 7.79033 0.157278L7.71967 0.21967L4.5 3.43934L1.28033 0.21967L1.20967 0.157278Z" fill="var(--ld-semantic-color-text,#2E2F32)"/>
                        </svg>
                      </button>
                    </>
                  )}
                </div>
                <span className="text-white text-[14px] font-extrabold leading-[17px] text-center mt-0.5">
                  {opt.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* White section - address & store cards */}
        <div className="bg-[var(--ld-semantic-color-action-fill-primary,#0053E2)] px-4 pb-4">
          <div className="flex flex-col gap-2">
            <button className="w-full flex items-center gap-2 p-4 bg-white rounded-lg shadow-[0_-1px_2px_0_rgba(0,0,0,0.1),0_1px_2px_1px_rgba(0,0,0,0.15)]">
              <LocationIcon className="w-4 h-4 flex-shrink-0" />
              <span className="flex-1 text-left text-[var(--ld-semantic-color-text,#2E2F32)] text-[12px] leading-[16px]">
                1213 E Trinity Mills Rd, Dallas, TX 75220
              </span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                <path d="M17.751 12.5652L8.53762 21L7.5 19.8695L16.096 12L7.5 4.13049L8.53762 3L17.751 11.4348C17.9097 11.58 18 11.7851 18 12C18 12.2149 17.9097 12.42 17.751 12.5652Z" fill="black"/>
              </svg>
            </button>
            <button className="w-full flex items-center gap-2 p-4 bg-white rounded-lg shadow-[0_-1px_2px_0_rgba(0,0,0,0.1),0_1px_2px_1px_rgba(0,0,0,0.15)]">
              <StoreIcon className="w-4 h-4 flex-shrink-0 self-start mt-0.5" />
              <div className="flex-1 text-left flex flex-col gap-1">
                <span className="text-[var(--ld-semantic-color-text,#2E2F32)] text-[12px] font-semibold leading-[16px]">Carrollton Supercenter</span>
                <span className="text-[var(--ld-semantic-color-text,#2E2F32)] text-[12px] leading-[16px]">1213 E Trinity Mills Rd, Dallas, TX 75220</span>
              </div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                <path d="M17.751 12.5652L8.53762 21L7.5 19.8695L16.096 12L7.5 4.13049L8.53762 3L17.751 11.4348C17.9097 11.58 18 11.7851 18 12C18 12.2149 17.9097 12.42 17.751 12.5652Z" fill="black"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
