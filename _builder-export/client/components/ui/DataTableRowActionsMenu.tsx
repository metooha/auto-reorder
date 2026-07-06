import React from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton } from '@/components/ui/IconButton';
import { Menu } from '@/components/ui/Menu';
import { MenuItem } from '@/components/ui/MenuItem';
import { MoreHorizontal } from '@/components/icons';

interface RowActionsMenuProps {
  name: string;
}

/**
 * 3-dot actions button that opens a Menu dropdown for a DataTable row.
 */
export function RowActionsMenu({ name }: RowActionsMenuProps) {
  const { t } = useTranslation('pages');
  const [isOpen, setIsOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  return (
    <div data-menu-open={isOpen || undefined} style={{ position: 'relative', display: 'inline-flex' }}>
      <IconButton
        ref={triggerRef}
        aria-label={t('dataTable.actionsFor', { name })}
        variant="ghost"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <MoreHorizontal />
      </IconButton>
      <div style={{ position: 'absolute', right: 0, top: '100%', marginTop: 4, zIndex: 50 }}>
        <Menu
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          position="bottomRight"
        >
          <MenuItem onClick={() => setIsOpen(false)}>
            {t('dataTable.menuEdit', 'Edit')}
          </MenuItem>
          <MenuItem onClick={() => setIsOpen(false)}>
            {t('dataTable.menuDuplicate', 'Duplicate')}
          </MenuItem>
          <MenuItem onClick={() => setIsOpen(false)}>
            {t('dataTable.menuPause', 'Pause')}
          </MenuItem>
          <MenuItem onClick={() => setIsOpen(false)}>
            {t('dataTable.menuArchive', 'Archive')}
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}
