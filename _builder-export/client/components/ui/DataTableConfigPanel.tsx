import * as React from 'react';
import styles from './DataTableConfigPanel.module.css';

export interface ColumnConfig {
  id: string;
  label: string;
  visible: boolean;
  locked?: boolean;
  pinned?: boolean;
  alwaysVisible?: boolean;
  alwaysPinned?: boolean;
}

export interface DataTableConfigPanelProps {
  columns: ColumnConfig[];
  onColumnsChange?: (columns: ColumnConfig[]) => void;
  onApply?: (columns: ColumnConfig[]) => void;
  onClose: () => void;
  open?: boolean;
  isOpen?: boolean;
  title?: string;
}

export const DataTableConfigPanel: React.FC<DataTableConfigPanelProps> = ({
  columns,
  onColumnsChange,
  onApply,
  onClose,
  open,
  isOpen,
  title = 'Configure Columns',
}) => {
  const isVisible = open ?? isOpen ?? false;
  if (!isVisible) return null;

  const handleToggle = (id: string) => {
    onColumnsChange(
      columns.map(col =>
        col.id === id && !col.locked ? { ...col, visible: !col.visible } : col
      )
    );
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.panel} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <h3>{title}</h3>
          <button onClick={onClose} aria-label="Close">&times;</button>
        </div>
        <div className={styles.body}>
          {columns.map(col => (
            <label key={col.id} className={styles.columnItem}>
              <input
                type="checkbox"
                checked={col.visible}
                disabled={col.locked}
                onChange={() => handleToggle(col.id)}
              />
              <span>{col.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataTableConfigPanel;
