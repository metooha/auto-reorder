import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';
import { Divider } from '@/components/ui/Divider';
import { ListBox, Upload, ScanDocument, CheckCircle } from '@/components/icons';
import styles from '@styles/responsive.module.css';

// BUILD RULE: Always search client/components/icons/ for existing icons before importing new ones.
// Map Figma icon names to project icon exports — never add external icon packages.

type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

const todoIcons: IconComponent[] = [ListBox, Upload, ScanDocument, CheckCircle];

export function CatalogTodoList() {
  const { t } = useTranslation();
  return (
    <div className={styles.catalogTodoList}>
      {todoIcons.map((Icon, index) => (
        <div key={index}>
          <TodoItem
            title={t('shared.title')}
            description={t('shared.description')}
            label={t('shared.label')}
            cta={t('shared.buttonLabel')}
            Icon={Icon}
          />
          {index < todoIcons.length - 1 && (
            <div style={{ padding: '12px 0' }}>
              <Divider />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function TodoItem({
  title,
  description,
  label,
  cta,
  Icon,
}: {
  title: string;
  description: string;
  label: string;
  cta: string;
  Icon: IconComponent;
}) {
  return (
    <div className={styles.todoItem}>
      {/* Spot icon — uses icons from client/components/icons/ */}
      <SpotIcon Icon={Icon} />

      {/* Text content */}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <span
          style={{
            fontFamily: "var(--ld-semantic-font-body-medium-family, 'Everyday Sans UI', -apple-system, Roboto, sans-serif)",
            fontSize: 'var(--ld-semantic-font-body-medium-size, 16px)',
            fontWeight: 'var(--ld-semantic-font-body-medium-weight-alt, 700)',
            lineHeight: 'var(--ld-semantic-font-body-medium-lineheight, 1.5)',
            color: 'var(--ld-semantic-color-text, #2E2F32)',
          }}
        >
          {title}
        </span>
        <span
          style={{
            fontFamily: "var(--ld-semantic-font-body-small-family, 'Everyday Sans UI', -apple-system, Roboto, sans-serif)",
            fontSize: 'var(--ld-semantic-font-body-small-size, 14px)',
            fontWeight: 'var(--ld-semantic-font-body-small-weight-default, 400)',
            lineHeight: 'var(--ld-semantic-font-body-small-lineheight, 1.43)',
            color: 'var(--ld-semantic-color-text, #2E2F32)',
          }}
        >
          {description}
        </span>
      </div>

      {/* Trailing: tag + button */}
      <div className={styles.todoTrailing}>
        <Tag color="blue" variant="tertiary">
          {label}
        </Tag>
        <Button variant="secondary" size="small">
          {cta}
        </Button>
      </div>
    </div>
  );
}

function SpotIcon({ Icon }: { Icon: IconComponent }) {
  return (
    <div
      style={{
        display: 'flex',
        width: 48,
        height: 48,
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
        background: 'var(--ld-semantic-color-fill-brand-subtle, #E9F1FE)',
        flexShrink: 0,
      }}
    >
      <Icon
        width={24}
        height={24}
        style={{ color: 'var(--ld-semantic-color-text-onfill-brand-subtle, #002E99)' }}
      />
    </div>
  );
}
