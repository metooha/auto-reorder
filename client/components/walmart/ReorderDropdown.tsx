import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Gift } from '@/components/icons';
import { ReorderIcon, ListsIcon } from '@/components/icons-custom';
import styles from './ReorderDropdown.module.css';

const menuItems = [
  {
    label: 'Reorder',
    path: '/walmart',
    Icon: ReorderIcon,
  },
  {
    label: 'Lists',
    path: '/walmart',
    Icon: ListsIcon,
  },
  {
    label: 'Registries',
    path: '/walmart',
    Icon: Gift,
  },
];

export function ReorderDropdown() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen]);

  return (
    <div ref={containerRef} className={styles.root}>
      <button
        type="button"
        className={styles.trigger}
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Heart className={styles.triggerIcon} aria-hidden="true" />
        <div className={styles.triggerContent}>
          <div className={styles.triggerSubtext}>Reorder</div>
          <div className={styles.triggerLabel}>My Items</div>
        </div>
      </button>

      {isOpen && (
        <div className={styles.panel} role="menu" aria-label="Reorder and My Items">
          {menuItems.map(({ label, path, Icon }) => (
            <button
              key={label}
              type="button"
              role="menuitem"
              className={styles.item}
              onClick={() => {
                setIsOpen(false);
                navigate(path);
              }}
            >
              <Icon className={styles.itemIcon} aria-hidden="true" />
              <span className={styles.itemLabel}>{label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
