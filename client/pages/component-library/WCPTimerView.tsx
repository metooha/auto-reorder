import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { WCPTimerView } from '@/components/walmart/WCPTimerView';
import { Tag } from '@/components/ui/Tag';
import styles from './WCPQueue.module.css';

export default function WCPTimerViewPage() {
  return (
    <ComponentPageLayout
      section="WCP Components"
      title="Timer View"
      description="Urgency-colored countdown timer pill used across queue flows, banners, and product cards. Displays time remaining with color-coded urgency states."
    >
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Variants</h2>
        <p className={styles.sectionDesc}>
          Three variants based on urgency level. Waiting (blue) for estimated
          queue times, Warning (yellow) when time is running low, and Expiring
          (red) for final countdown.
        </p>
        <div className={styles.metaRow}>
          <Tag variant="info">Primitive</Tag>
          <Tag variant="neutral">Timer</Tag>
        </div>

        <div className={styles.demoGrid}>
          <DemoCard label="Waiting (Light Blue)">
            <div className={styles.timerRow}>
              <WCPTimerView timeDisplay="57mins" variant="waiting" size="medium" />
              <span className={styles.metaLabel}>estimated wait</span>
            </div>
          </DemoCard>

          <DemoCard label="Warning (Yellow)">
            <div className={styles.timerRow}>
              <WCPTimerView timeDisplay="10:23" variant="warning" size="medium" />
              <span className={styles.metaLabel}>left to buy</span>
            </div>
          </DemoCard>

          <DemoCard label="Expiring (Red)">
            <div className={styles.timerRow}>
              <WCPTimerView timeDisplay="01:03" variant="expiring" size="medium" />
              <span className={styles.metaLabel}>left to buy</span>
            </div>
          </DemoCard>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Sizes</h2>
        <p className={styles.sectionDesc}>
          Medium (default) for banners and cards, small for compact inline usage.
        </p>

        <div className={styles.demoGrid}>
          <DemoCard label="Medium (default)">
            <div className={styles.timerRow}>
              <WCPTimerView timeDisplay="59mins" variant="waiting" size="medium" />
              <WCPTimerView timeDisplay="10:23" variant="warning" size="medium" />
              <WCPTimerView timeDisplay="01:03" variant="expiring" size="medium" />
            </div>
          </DemoCard>

          <DemoCard label="Small">
            <div className={styles.timerRow}>
              <WCPTimerView timeDisplay="59mins" variant="waiting" size="small" />
              <WCPTimerView timeDisplay="10:23" variant="warning" size="small" />
              <WCPTimerView timeDisplay="01:03" variant="expiring" size="small" />
            </div>
          </DemoCard>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Props</h2>
        <table className={styles.propTable}>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>timeDisplay</code></td>
              <td>string</td>
              <td>—</td>
              <td>Time display string, e.g. "57mins" or "01:03"</td>
            </tr>
            <tr>
              <td><code>variant</code></td>
              <td><code>"waiting" | "warning" | "expiring"</code></td>
              <td>"waiting"</td>
              <td>Color variant based on urgency</td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td><code>"medium" | "small"</code></td>
              <td>"medium"</td>
              <td>Size of the timer pill</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Import</h2>
        <table className={styles.propTable}>
          <thead>
            <tr>
              <th>Component</th>
              <th>Import Path</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>WCPTimerView</code></td>
              <td>@/components/walmart/WCPTimerView</td>
            </tr>
          </tbody>
        </table>
      </div>
    </ComponentPageLayout>
  );
}

function DemoCard({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.demoCard}>
      <div className={styles.cardLabel}>{label}</div>
      <div className={styles.cardContent}>{children}</div>
    </div>
  );
}
