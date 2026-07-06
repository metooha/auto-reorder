import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronUp, ChevronDown } from '@/components/icons';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/Popover';
import { useState } from 'react';

export type MediaSolution =
  | 'Page Template'
  | 'Dashboard Template'
  | 'Catalog Template'
  | 'Detail Item'
  | 'Landing Connection'
  | 'Landing Summary';

interface MediaSolutionsDropdownProps {
  currentSolution?: MediaSolution;
  onSolutionChange?: (solution: MediaSolution) => void;
}

const solutions: { id: MediaSolution; labelKey: string; route: string }[] = [
  { id: 'Page Template',       labelKey: 'templates.pageTemplate',       route: '/page-template' },
  { id: 'Dashboard Template',  labelKey: 'templates.dashboardTemplate',  route: '/' },
  { id: 'Catalog Template',    labelKey: 'templates.catalogTemplate',    route: '/catalog' },
  { id: 'Detail Item',         labelKey: 'templates.detailItem',         route: '/detail-item' },
  { id: 'Landing Connection',  labelKey: 'templates.landingConnection',  route: '/landing-connection' },
  { id: 'Landing Summary',     labelKey: 'templates.landingSummary',     route: '/landing-summary' },
];

export function MediaSolutionsDropdown({
  currentSolution = 'Dashboard Template',
  onSolutionChange,
}: MediaSolutionsDropdownProps) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSolutionClick = (solution: MediaSolution, route: string) => {
    navigate(route);
    onSolutionChange?.(solution);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className="flex items-center gap-1 text-xs px-2 py-1 rounded transition-colors"
          style={{
            color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
            fontFamily: 'var(--ld-semantic-font-family-sans)',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--ld-semantic-color-fill-surface-secondary, #F2F3F3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <span>{t('templates.navigate')}</span>
          {open ? (
            <ChevronUp style={{ width: 16, height: 16 }} />
          ) : (
            <ChevronDown style={{ width: 16, height: 16 }} />
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={8}
        showArrow={false}
        className="w-80 p-0"
      >
        <div style={{ padding: 'var(--ld-semantic-spacing-4, 16px)' }}>
          <h3
            style={{
              fontSize: '14px',
              fontWeight: 800,
              marginBottom: 'var(--ld-semantic-spacing-2, 8px)',
              color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
              fontFamily: 'var(--ld-semantic-font-family-sans)',
            }}
          >
            {t('templates.pageTemplates')}
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {solutions.map((s) => {
              const isActive = currentSolution === s.id;
              const isLastOdd = s.id === solutions[solutions.length - 1]?.id && solutions.length % 2 !== 0;
              return (
                <SolutionCard
                  key={s.id}
                  label={t(s.labelKey)}
                  isActive={isActive}
                  fullWidth={isLastOdd}
                  onClick={() => handleSolutionClick(s.id, s.route)}
                />
              );
            })}
          </div>

          <h3
            style={{
              fontSize: '14px',
              fontWeight: 800,
              margin: 'var(--ld-semantic-spacing-4, 16px) 0 var(--ld-semantic-spacing-2, 8px)',
              color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
              fontFamily: 'var(--ld-semantic-font-family-sans)',
            }}
          >
            {t('templates.toolsAndHelp')}
          </h3>

          <ToolLink
            label={t('templates.componentLibrary')}
            onClick={() => {
              navigate('/component-library');
              setOpen(false);
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}

/* ─── Solution Card ─── */

function SolutionCard({
  label,
  isActive,
  fullWidth,
  onClick,
}: {
  label: string;
  isActive: boolean;
  fullWidth?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--ld-semantic-spacing-3, 12px)',
        minHeight: '100px',
        borderRadius: 'var(--ld-semantic-border-radius-small, 4px)',
        border: `1px solid ${isActive ? 'var(--ld-semantic-color-action-border-primary, #0053E2)' : 'var(--ld-semantic-color-separator, #E3E4E5)'}`,
        backgroundColor: isActive ? 'var(--ld-semantic-color-action-fill-primary-subtle, #E9F1FE)' : 'transparent',
        cursor: 'pointer',
        fontFamily: 'var(--ld-semantic-font-family-sans)',
        transition: 'border-color 150ms, background-color 150ms',
        gridColumn: fullWidth ? 'span 2' : undefined,
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.borderColor = 'var(--ld-semantic-color-action-border-primary, #0053E2)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.borderColor = 'var(--ld-semantic-color-separator, #E3E4E5)';
        }
      }}
    >
      <img
        src="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fabedae4e18b740e6b7363e567a29025e"
        alt={label}
        style={{
          width: 48,
          height: 48,
          borderRadius: 'var(--ld-semantic-border-radius-small, 4px)',
          marginBottom: 'var(--ld-semantic-spacing-2, 8px)',
          objectFit: 'contain',
        }}
      />
      <span
        style={{
          fontSize: '12px',
          textAlign: 'center',
          color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
        }}
      >
        {label}
      </span>
    </button>
  );
}

/* ─── Tool Link ─── */

function ToolLink({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--ld-semantic-spacing-2, 8px)',
        padding: 'var(--ld-semantic-spacing-2, 8px)',
        width: '100%',
        borderRadius: 'var(--ld-semantic-border-radius-small, 4px)',
        border: '1px solid var(--ld-semantic-color-separator, #E3E4E5)',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        fontFamily: 'var(--ld-semantic-font-family-sans)',
        transition: 'border-color 150ms',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--ld-semantic-color-action-border-primary, #0053E2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--ld-semantic-color-separator, #E3E4E5)';
      }}
    >
      <img
        src="https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fe663bb9ecfe245cd8c1cdb8a20fd945c"
        alt={label}
        style={{
          width: 20,
          height: 20,
          borderRadius: 'var(--ld-semantic-border-radius-full, 9999px)',
          flexShrink: 0,
          objectFit: 'contain',
        }}
      />
      <span
        style={{
          fontSize: '12px',
          color: 'var(--ld-semantic-color-text-primary, #2E2F32)',
        }}
      >
        {label}
      </span>
    </button>
  );
}
