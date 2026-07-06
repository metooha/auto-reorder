import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';
import { Switch } from '@/components/ui/Switch';
import { useLayoutSettings } from '@/contexts/LayoutSettingsContext';
import styles from './ProjectSettings.module.css';

export function UISettingsSection() {
  const navigate = useNavigate();
  const { showGICHighlight, setShowGICHighlight } = useLayoutSettings();

  return (
    <div className={styles.navSection}>
      <div className={styles.navSectionHeader}>
        <div className={styles.navSectionLeft}>
          <h2 className={styles.navSectionTitle}>UI/Feature Settings</h2>
          <p className={styles.navSectionDesc}>
            Toggle UI features and callouts across the application. Changes are persisted to <code>localStorage</code> and apply immediately.
          </p>
        </div>
        <Button
          variant="tertiary"
          size="small"
          onClick={() => navigate('/walmart')}
        >
          Preview in app
        </Button>
      </div>

      {/* GIC Highlight Toggle */}
      <div className={styles.navSubsection}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          <div>
            <h3 className={styles.navSubsectionTitle}>GIC Location Highlight</h3>
            <p className={styles.navSubsectionDesc}>
              Show the blue "Is this the right location?" callout on the desktop header's Get It (Checkout) dropdown. Hidden by default.
            </p>
          </div>
          <Switch
            checked={showGICHighlight}
            onCheckedChange={setShowGICHighlight}
            aria-label="Show GIC highlight callout"
          />
        </div>
      </div>
    </div>
  );
}
