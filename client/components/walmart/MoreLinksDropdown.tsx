import { useState } from 'react';
import { ChevronDown } from '@/components/icons';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';
import styles from './MoreLinksDropdown.module.css';

const moreCategories = [
  { label: 'All Departments', path: '/departments' },
  { label: 'Electronics', path: '/categories/electronics' },
  { label: 'Toys', path: '/categories/toys' },
  { label: 'Home', path: '/categories/home' },
  { label: 'Clothing & Accessories', path: '/categories/clothing' },
  { label: 'Seasonal Décor', path: '/categories/seasonal' },
  { label: 'Video Games', path: '/categories/video-games' },
  { label: 'Kitchen & Dining', path: '/categories/kitchen' },
];

export function MoreLinksDropdown() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={styles.trigger}
        >
          More
          <ChevronDown className={styles.icon} aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className={styles.content}>
        <nav role="navigation" aria-label="Additional categories">
          {moreCategories.map((category) => (
            <DropdownMenuItem
              key={category.path}
              className={styles.item}
              onSelect={() => handleSelect(category.path)}
            >
              {category.label}
            </DropdownMenuItem>
          ))}
        </nav>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
