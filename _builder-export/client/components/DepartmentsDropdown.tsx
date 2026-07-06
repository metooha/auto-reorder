import React, { useState } from 'react';
import { ChevronDownIcon } from '@/components/icons';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/DropdownMenu';
import { useNavigate } from 'react-router-dom';
import styles from './DepartmentsDropdown.module.css';

const departments = [
  { label: 'Grocery', path: '/departments/grocery' },
  { label: 'Electronics', path: '/departments/electronics' },
  { label: 'Clothing & Accessories', path: '/departments/clothing' },
  { label: 'Home & Garden', path: '/departments/home' },
  { label: 'Sports & Outdoors', path: '/departments/sports' },
  { label: 'Toys', path: '/departments/toys' },
  { label: 'Baby', path: '/departments/baby' },
  { label: 'Beauty', path: '/departments/beauty' },
];

export function DepartmentsDropdown() {
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
          Departments
          <ChevronDownIcon className={styles.icon} aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className={styles.content}>
        <nav role="navigation" aria-label="Department categories">
          {departments.map((dept) => (
            <DropdownMenuItem
              key={dept.path}
              className={styles.item}
              onSelect={() => handleSelect(dept.path)}
            >
              {dept.label}
            </DropdownMenuItem>
          ))}
        </nav>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
