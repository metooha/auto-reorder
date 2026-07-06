import React, { useState } from 'react';
import { ChevronDownIcon } from '@/components/icons';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/DropdownMenu';
import { useNavigate } from 'react-router-dom';
import styles from './ServicesDropdown.module.css';

const services = [
  { label: 'Photo Services', path: '/services/photo' },
  { label: 'Money Services', path: '/services/money' },
  { label: 'Tire & Battery', path: '/services/tire-battery' },
  { label: 'Vision Services', path: '/services/vision' },
  { label: 'Hearing', path: '/services/hearing' },
  { label: 'Pharmacy', path: '/services/pharmacy' },
  { label: 'Travel Services', path: '/services/travel' },
  { label: 'Rental Services', path: '/services/rental' },
];

export function ServicesDropdown() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger>
        <button
          type="button"
          className={styles.trigger}
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          Services
          <ChevronDownIcon className={styles.icon} aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className={styles.content}>
        <nav role="navigation" aria-label="Available services">
          {services.map((service) => (
            <DropdownMenuItem
              key={service.path}
              className={styles.item}
              onSelect={() => handleSelect(service.path)}
            >
              {service.label}
            </DropdownMenuItem>
          ))}
        </nav>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
