import React from 'react';
import DataTableExample from '@/components/examples/DataTableExample';
import DataTableSubComponentsExample from '@/components/examples/DataTableSubComponentsExample';
import { PageHeader } from '@/components/ui/PageHeader';
import { useTranslation } from 'react-i18next';

// Table primitive components for component library compatibility
export const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => <table ref={ref} className={className} style={{ width: '100%', borderCollapse: 'collapse' }} {...props} />
);
Table.displayName = 'Table';

export const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <thead ref={ref} className={className} {...props} />
);
TableHeader.displayName = 'TableHeader';

export const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <tbody ref={ref} className={className} {...props} />
);
TableBody.displayName = 'TableBody';

export const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => <tr ref={ref} className={className} {...props} />
);
TableRow.displayName = 'TableRow';

export const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => <th ref={ref} className={className} style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 600 }} {...props} />
);
TableHead.displayName = 'TableHead';

export const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => <td ref={ref} className={className} style={{ padding: '8px 12px' }} {...props} />
);
TableCell.displayName = 'TableCell';

export const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) => <caption ref={ref} className={className} style={{ padding: '8px', color: '#74767c', fontSize: 14 }} {...props} />
);
TableCaption.displayName = 'TableCaption';

export default function TablePage() {
  const { t } = useTranslation();
  return (
    <div style={{ padding: '48px', maxWidth: '1400px', margin: '0 auto' }}>
      <PageHeader
        section={t('componentLibrary.sharedSection')}
        title={t('componentLibrary.navTable')}
        description={t('componentLibrary.descTable')}
      />

      {/* Full interactive example */}
      <h2 style={{
        margin: '0 0 16px 0',
        fontFamily: 'var(--ld-semantic-font-heading-small-family)',
        fontSize: '24px',
        fontWeight: 700,
        color: 'var(--ld-semantic-color-text, #2E2F32)',
      }}>
        Full Example
      </h2>
      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)',
        overflow: 'hidden',
        border: '1px solid var(--ld-semantic-color-separator, #E3E4E5)',
        marginBottom: '48px',
      }}>
        <React.Suspense fallback={<div style={{ padding: '32px' }}>{t('componentLibrary.loading')}</div>}>
          <DataTableExample />
        </React.Suspense>
      </div>

      {/* Sub-component showcase */}
      <h2 style={{
        margin: '0 0 16px 0',
        fontFamily: 'var(--ld-semantic-font-heading-small-family)',
        fontSize: '24px',
        fontWeight: 700,
        color: 'var(--ld-semantic-color-text, #2E2F32)',
      }}>
        Sub-Components
      </h2>
      <div style={{
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #ffffff)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)',
      }}>
        <React.Suspense fallback={<div style={{ padding: '32px' }}>{t('componentLibrary.loading')}</div>}>
          <DataTableSubComponentsExample />
        </React.Suspense>
      </div>
    </div>
  );
}
