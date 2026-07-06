import React from 'react';

export function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{
      backgroundColor: 'var(--ld-semantic-color-surface)',
      padding: '32px',
      borderRadius: '8px',
      boxShadow: 'var(--ld-semantic-elevation-100)',
    }}>
      <h3 style={{
        fontSize: '20px',
        fontWeight: 700,
        color: 'var(--ld-semantic-color-text)',
        marginBottom: '20px',
      }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

export function CodeBlock({ children }: { children: string }) {
  return (
    <div style={{
      fontFamily: 'var(--ld-semantic-font-family-mono)',
      fontSize: '13px',
      backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
      padding: '16px 20px',
      borderRadius: '6px',
      lineHeight: 1.8,
      whiteSpace: 'pre-wrap',
      color: 'var(--ld-semantic-color-text)',
      overflowX: 'auto',
    }}>
      {children}
    </div>
  );
}

export function NumberedList({ items, color }: { items: string[]; color: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: '10px', fontSize: '13px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)' }}>
          <span style={{ color, fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

export function StepCard({ borderColor, title, description, items, itemColor }: {
  borderColor: string;
  title: string;
  description: string;
  items: string[];
  itemColor: string;
}) {
  return (
    <div style={{
      padding: '20px',
      backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
      borderRadius: '8px',
      borderLeft: `4px solid ${borderColor}`,
    }}>
      <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '8px', color: 'var(--ld-semantic-color-text)' }}>
        {title}
      </div>
      <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)', margin: '0 0 12px' }}>
        {description}
      </p>
      <NumberedList items={items} color={itemColor} />
    </div>
  );
}
