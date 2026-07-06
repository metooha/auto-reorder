import { useNavigate } from 'react-router-dom';
import type React from 'react';
import { DepartmentsDropdown } from '@/components/walmart/DepartmentsDropdown';
import { ServicesDropdown } from '@/components/walmart/ServicesDropdown';
import { MoreLinksDropdown } from '@/components/walmart/MoreLinksDropdown';
import { SubNavButton } from '@/components/walmart/SubNavButton';
import styles from './SubNav.module.css';

interface SecondaryLink {
  label: string;
  path: string;
  icon?: React.ReactNode;
}

const secondaryLinks: SecondaryLink[] = [
  { label: 'Get it Fast', path: '/get-it-fast' },
  { label: 'Rollbacks & More', path: '/rollbacks' },
  { label: 'Pharmacy', path: '/pharmacy' },
  { label: 'New Arrivals', path: '/new-arrivals' },
  { label: 'Dinner Made Easy', path: '/dinner-made-easy' },
  { label: 'Walmart+', path: '/walmart-plus' },
];

export function SubNav() {
  const navigate = useNavigate();

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        {/* Primary Navigation */}
        <nav aria-label="Primary" className={styles.primaryNav}>
          <ul className={styles.primaryList}>
            <li>
              <DepartmentsDropdown />
            </li>
            <li className={styles.servicesPadding}>
              <ServicesDropdown />
            </li>
          </ul>
        </nav>

        {/* Secondary Navigation */}
        <section className={styles.secondarySection}>
          <nav aria-label="Secondary">
            <ul className={styles.secondaryList}>
              {secondaryLinks.map((link) => (
                <li key={link.label}>
                  <SubNavButton
                    label={link.label}
                    href={link.path}
                    leadingIcon={link.icon}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(link.path);
                    }}
                  />
                </li>
              ))}
            </ul>
          </nav>
        </section>
      </div>

      {/* More Button */}
      <section className={styles.moreSection}>
        <MoreLinksDropdown />
      </section>
    </div>
  );
}
