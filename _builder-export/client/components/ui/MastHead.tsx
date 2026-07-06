import { useTranslation } from 'react-i18next';
import { Bell, HelpCircle, User, AppSwitcher } from '@/components/icons';
import { MediaSolutionsDropdown, MediaSolution } from '@/components/MediaSolutionsDropdown';
import { Divider } from './Divider';
import { LanguageSelector } from './LanguageSelector';
import styles from './MastHead.module.css';

interface MastHeadProps {
  appName?: string;
  currentSolution?: MediaSolution;
  onSolutionChange?: (solution: MediaSolution) => void;
}

export function MastHead({
  appName,
  currentSolution = 'Dashboard Template',
  onSolutionChange
}: MastHeadProps) {
  const { t } = useTranslation();
  const displayAppName = appName ?? t('masthead.appName');

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        {/* App Switcher */}
        <button className={styles.iconButton} aria-label={t('masthead.appSwitcher')}>
          <AppSwitcher style={{ width: 16, height: 16 }} />
        </button>
        
        {/* App Name */}
        <span className={styles.appName}>{displayAppName}</span>
      </div>

      <div className={styles.right}>
        <MediaSolutionsDropdown
          currentSolution={currentSolution}
          onSolutionChange={onSolutionChange}
        />
        <Divider orientation="vertical" UNSAFE_className={styles.divider} />
        <LanguageSelector />
        <div className={styles.actions}>
          <button className={styles.iconButton} aria-label={t('masthead.notifications')}>
            <Bell style={{ width: 16, height: 16 }} />
            <span className={styles.notifDot}></span>
          </button>
          <button className={styles.iconButton} aria-label={t('masthead.help')}>
            <HelpCircle style={{ width: 16, height: 16 }} />
          </button>
          <button className={styles.iconButton} aria-label={t('masthead.account')}>
            <User style={{ width: 16, height: 16 }} />
          </button>
        </div>
      </div>
    </header>
  );
}
