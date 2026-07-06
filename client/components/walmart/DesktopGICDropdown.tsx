import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { ChevronRight } from "@/components/icons";
import { FulfillmentShippingIcon, LocationIcon, StoreIcon } from "@/components/icons-custom";
import styles from "./DesktopGICDropdown.module.css";

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
      {createPortal(
        <div className={styles.scrim} onClick={onClose} />,
        document.body
      )}

      <div ref={dropdownRef} className={styles.dropdown}>
        {/* Brand-colored section — fulfillment option buttons */}
        <div className={styles.optionsSection}>
          <div className={styles.optionsList}>
            {options.map((opt) => (
              <button
                key={opt.key}
                className={styles.optionButton}
                onClick={() => onSelectOption(selectedOption === opt.key ? 'none' : opt.key)}
              >
                <div className={styles.optionIconWrap}>
                  {opt.icon}
                  {selectedOption === opt.key && (
                    <>
                      {/* Selection ring uses rating-fill token (Spark yellow) */}
                      <svg
                        className={styles.selectionRing}
                        viewBox="0 0 64 64"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="4" />
                      </svg>
                      <button
                        onClick={(e) => { e.stopPropagation(); onSelectOption('none'); }}
                        className={styles.deselectButton}
                        aria-label={`Deselect ${opt.label}`}
                      >
                        <span className={styles.deselectBadge}>
                          {/* Circle background */}
                          <svg className={styles.deselectBadgeCircle} viewBox="0 0 21 21" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <circle cx="10.5" cy="10.5" r="10.5" />
                          </svg>
                          {/* X icon */}
                          <span className={styles.deselectBadgeX} aria-hidden="true">
                            <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" clipRule="evenodd" d="M1.20967 0.157278C0.915456 -0.0714902 0.490033 -0.0506931 0.21967 0.21967C-0.0732233 0.512563 -0.0732233 0.987437 0.21967 1.28033L3.43934 4.5L0.21967 7.71967C-0.0732229 8.01256 -0.0732229 8.48744 0.21967 8.78033C0.490033 9.05069 0.915456 9.07149 1.20967 8.84272L1.28033 8.78033L4.5 5.56066L7.71967 8.78033L7.79033 8.84272C8.08454 9.07149 8.50997 9.05069 8.78033 8.78033C9.07322 8.48744 9.07322 8.01256 8.78033 7.71967L5.56066 4.5L8.78033 1.28033C9.07322 0.987437 9.07322 0.512563 8.78033 0.21967C8.50997 -0.0506931 8.08454 -0.0714902 7.79033 0.157278L7.71967 0.21967L4.5 3.43934L1.28033 0.21967L1.20967 0.157278Z" fill="currentColor" />
                            </svg>
                          </span>
                        </span>
                      </button>
                    </>
                  )}
                </div>
                <span className={styles.optionLabel}>{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Address & store cards */}
        <div className={styles.cardsSection}>
          <div className={styles.cardsList}>
            <button className={styles.card}>
              <LocationIcon className={styles.cardIcon} />
              <span className={styles.cardTextSingle}>
                1213 E Trinity Mills Rd, Dallas, TX 75220
              </span>
              <ChevronRight className={styles.cardChevron} />
            </button>
            <button className={styles.card}>
              <StoreIcon className={styles.cardIconTop} />
              <div className={styles.cardTextStack}>
                <span className={styles.cardStoreName}>Carrollton Supercenter</span>
                <span className={styles.cardStoreAddress}>1213 E Trinity Mills Rd, Dallas, TX 75220</span>
              </div>
              <ChevronRight className={styles.cardChevron} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
