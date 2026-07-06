import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HomeFill, Home,
  MegaphoneFill, Megaphone,
  ToolboxFill, Toolbox,
  ImageFill, Image,
  CloudUploadFill,
  Settings,
  ArrowRightLine,
} from '@/components/icons';
import styles from './AppSideNav.module.css';

interface NavItem {
  id: string;
  label: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  ActiveIcon: React.FC<React.SVGProps<SVGSVGElement>>;
  path?: string;
}

const defaultNavItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', Icon: Home, ActiveIcon: HomeFill, path: '/' },
  { id: 'campaigns', label: 'Campaigns', Icon: Megaphone, ActiveIcon: MegaphoneFill },
  { id: 'reports', label: 'Reports', Icon: Toolbox, ActiveIcon: ToolboxFill },
  { id: 'tools', label: 'Tools', Icon: Image, ActiveIcon: ImageFill },
  { id: 'bulk', label: 'Bulk operations', Icon: CloudUploadFill, ActiveIcon: CloudUploadFill },
];

interface AppSideNavProps {
  items?: NavItem[];
  activeId?: string;
  onItemClick?: (id: string) => void;
}

export function AppSideNav({
  items = defaultNavItems,
  activeId = 'dashboard',
  onItemClick,
}: AppSideNavProps) {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleClick = (item: NavItem) => {
    onItemClick?.(item.id);
    if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <nav className={styles.nav} aria-label="Main navigation">
      {/* Top items */}
      <div className={styles.topSection}>
        {items.map((item) => {
          const isActive = activeId === item.id;
          const IconComponent = isActive ? item.ActiveIcon : item.Icon;

          return (
            <button
              key={item.id}
              className={`${styles.navButton} ${isActive ? styles.navButtonActive : ''}`}
              onClick={() => handleClick(item)}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
              title={item.label}
            >
              <IconComponent style={{ width: 20, height: 20 }} />
            </button>
          );
        })}
      </div>

      {/* Bottom items */}
      <div className={styles.bottomSection}>
        <button
          className={styles.navButton}
          aria-label="Settings"
          title="Settings"
          onClick={() => navigate('/')}
        >
          <Settings style={{ width: 20, height: 20 }} />
        </button>
        <button
          className={styles.navButton}
          aria-label="Component Library"
          title="Component Library"
          onClick={() => navigate('/component-library')}
        >
          <ArrowRightLine style={{ width: 20, height: 20 }} />
        </button>
      </div>
    </nav>
  );
}
