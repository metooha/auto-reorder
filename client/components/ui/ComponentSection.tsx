import React from 'react';
import styles from './ComponentSection.module.css';

interface ComponentSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function ComponentSection({ title, description, children }: ComponentSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      <div className={styles.body}>{children}</div>
    </section>
  );
}
