import React from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import styles from './ComponentPageLayout.module.css';

interface ComponentPageLayoutProps {
  section: string;
  title: string;
  description: string;
  children: React.ReactNode;
}

export function ComponentPageLayout({ section, title, description, children }: ComponentPageLayoutProps) {
  return (
    <div className={styles.page}>
      {/* Full-width header — no horizontal padding on parent */}
      <PageHeader section={section} title={title} description={description} />
      {/* Content below — separate padded wrapper */}
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}
