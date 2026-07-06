import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';
import { Tag } from '@/components/ui/Tag';
import { TokenSection, type TokenDef } from '@/components/theme-editor/TokenSection';
import { PreviewPanel } from '@/components/theme-editor/PreviewPanel';
import { useThemeEditor } from '@/hooks/useThemeEditor';
import { useTheme } from '@/contexts/ThemeContext';
import { useLayoutSettings, type MobileFooterMode, type MobileTopNavMode } from '@/contexts/LayoutSettingsContext';
import { Download } from '@/components/icons/Download';
import { Upload } from '@/components/icons/Upload';
import { RotateCcw } from '@/components/icons/RotateCcw';
import { NavSettingsSection } from './ProjectSettingsNavSection';
import { UISettingsSection } from './ProjectSettingsUISection';
import { ThemeEditorSection } from './ProjectSettingsThemeSection';
import styles from './ProjectSettings.module.css';

export default function ProjectSettingsPage() {
  const navigate = useNavigate();

  return (
    <ComponentPageLayout
      section="Tools"
      title="Project Settings"
      description="Configure project-level navigation defaults and theme token overrides. Changes persist across sessions via localStorage."
    >
      {/* Section 1: Navigation Settings */}
      <NavSettingsSection />

      <hr className={styles.divider} />

      {/* Section 2: UI/Feature Settings */}
      <UISettingsSection />

      <hr className={styles.divider} />

      {/* Section 3: Theme Token Editor */}
      <ThemeEditorSection />
    </ComponentPageLayout>
  );
}
