import React from 'react';
import { InfoCircle, Star, ChevronDown, ChevronRight, Search, ArrowRight, Check, Magic } from '@/components/icons';
import { Tag } from '@/components/ui/Tag';
import { Badge } from '@/components/ui/Badge';
import { Alert } from '@/components/ui/Alert';
import { Chip } from '@/components/ui/Chip';
import { FilterChip } from '@/components/ui/FilterChip';
import { Spinner } from '@/components/ui/Spinner';
import { BasicBanner } from '@/components/ui/BasicBanner';
import { PreviewFrame } from './PreviewFrame';

export function AlertsPreview() {
  return (
    <PreviewFrame>
      <div style={{ width: '100%', transform: 'scale(0.85)', transformOrigin: 'center' }}>
        <Alert variant="info">This is an informational alert.</Alert>
      </div>
    </PreviewFrame>
  );
}

export function BadgesPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Badge variant="green" value={5} aria-label="5 items" />
        <Badge variant="blue" value={12} aria-label="12 items" />
        <Badge variant="red" value={3} aria-label="3 items" />
      </div>
    </PreviewFrame>
  );
}

export function BreadcrumbsPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
        <span style={{ color: 'var(--ld-semantic-color-link-text-subtle, #515357)', textDecoration: 'underline' }}>Home</span>
        <span style={{ color: 'var(--ld-semantic-color-text-subtle, #74767C)' }}>/</span>
        <span style={{ color: 'var(--ld-semantic-color-link-text-subtle, #515357)', textDecoration: 'underline' }}>Products</span>
        <span style={{ color: 'var(--ld-semantic-color-text-subtle, #74767C)' }}>/</span>
        <span style={{ color: 'var(--ld-semantic-color-text, #2E2F32)' }}>Current</span>
      </div>
    </PreviewFrame>
  );
}

export function ButtonsPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span style={{ padding: '6px 16px', borderRadius: '9999px', background: 'var(--ld-semantic-color-action-fill-primary, #0071DC)', color: 'white', fontSize: '14px', fontWeight: 700 }}>Primary</span>
        <span style={{ padding: '6px 16px', borderRadius: '9999px', border: '1px solid var(--ld-semantic-color-action-border-secondary, #74767C)', color: 'var(--ld-semantic-color-text, #2E2F32)', fontSize: '14px', fontWeight: 700 }}>Secondary</span>
      </div>
    </PreviewFrame>
  );
}

export function CardsPreview() {
  return (
    <PreviewFrame>
      <div style={{
        borderRadius: '8px', padding: '12px 16px', width: '160px',
        background: 'white', boxShadow: 'var(--ld-semantic-elevation-100)',
      }}>
        <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ld-semantic-color-text, #2E2F32)', marginBottom: '4px' }}>Card Title</div>
        <div style={{ fontSize: '12px', color: 'var(--ld-semantic-color-text-subtle, #74767C)' }}>Card content area</div>
      </div>
    </PreviewFrame>
  );
}

export function CheckboxesPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {[{ checked: true, label: 'Checked' }, { checked: false, label: 'Unchecked' }].map((c, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '18px', height: '18px', borderRadius: '2px', boxSizing: 'border-box',
              border: c.checked ? 'none' : '1px solid var(--ld-semantic-color-input-border, #2e2f32)',
              background: c.checked ? 'var(--ld-semantic-color-input-fill-activated, #2e2f32)' : 'var(--ld-semantic-color-input-fill, #fff)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {c.checked && (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 6L5 8.5L9.5 3.5" stroke="var(--ld-semantic-color-input-indicator-activated, #fff)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span style={{ fontSize: '13px', color: 'var(--ld-semantic-color-text, #2E2F32)' }}>{c.label}</span>
          </div>
        ))}
      </div>
    </PreviewFrame>
  );
}

export function ChipsPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
        <Chip selected size="small">Active</Chip>
        <Chip size="small">Draft</Chip>
        <Chip size="small">Archived</Chip>
      </div>
    </PreviewFrame>
  );
}

export function FilterChipsPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
        <FilterChip selected>Status</FilterChip>
        <FilterChip>Type</FilterChip>
      </div>
    </PreviewFrame>
  );
}

export function TagsPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Tag variant="secondary" color="positive">Active</Tag>
        <Tag variant="primary" color="brand">Brand</Tag>
        <Tag variant="secondary" color="warning">Warning</Tag>
      </div>
    </PreviewFrame>
  );
}

export function DividersPreview() {
  return (
    <PreviewFrame>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
        <div style={{ fontSize: '12px', color: 'var(--ld-semantic-color-text-subtle, #74767C)' }}>Section A</div>
        <hr style={{ width: '100%', border: 'none', borderTop: '1px solid var(--ld-semantic-color-separator)', margin: 0 }} />
        <div style={{ fontSize: '12px', color: 'var(--ld-semantic-color-text-subtle, #74767C)' }}>Section B</div>
      </div>
    </PreviewFrame>
  );
}

export function SwitchesPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {[{ on: true, label: 'Enabled' }, { on: false, label: 'Disabled' }].map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '36px', height: '20px', borderRadius: '10px', position: 'relative',
              background: s.on ? 'var(--ld-semantic-color-action-fill-primary, #0071DC)' : 'var(--ld-semantic-color-border-strong, #BABBBE)',
            }}>
              <div style={{
                width: '16px', height: '16px', borderRadius: '50%', background: 'white',
                position: 'absolute', top: '2px', left: s.on ? '18px' : '2px',
              }} />
            </div>
            <span style={{ fontSize: '13px', color: 'var(--ld-semantic-color-text, #2E2F32)' }}>{s.label}</span>
          </div>
        ))}
      </div>
    </PreviewFrame>
  );
}

export function LinksPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center' }}>
        <span style={{ fontSize: '14px', color: 'var(--ld-semantic-color-link-text, #2e2f32)', textDecoration: 'underline' }}>Default link</span>
        <span style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text-subtle, #74767C)', textDecoration: 'underline' }}>Subtle link</span>
      </div>
    </PreviewFrame>
  );
}

export function LinkButtonsPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <span style={{ fontSize: '14px', color: 'var(--ld-semantic-color-link-text, #2e2f32)', textDecoration: 'underline', fontWeight: 600 }}>Action</span>
        <span style={{ fontSize: '12px', color: 'var(--ld-semantic-color-link-text, #2e2f32)', textDecoration: 'underline' }}>Small</span>
      </div>
    </PreviewFrame>
  );
}

export function IconButtonsPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        {[Star, Search, InfoCircle].map((Icon, i) => (
          <div key={i} style={{
            width: '36px', height: '36px', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1px solid var(--ld-semantic-color-border-strong, #BABBBE)',
          }}>
            <Icon style={{ width: 18, height: 18, color: 'var(--ld-semantic-color-text, #2E2F32)' }} />
          </div>
        ))}
      </div>
    </PreviewFrame>
  );
}

export function IconsPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        {[Star, Search, InfoCircle, ArrowRight, Check].map((Icon, i) => (
          <Icon key={i} style={{ width: 20, height: 20, color: 'var(--ld-semantic-color-text-subtle, #74767C)' }} />
        ))}
      </div>
    </PreviewFrame>
  );
}

export function RadioButtonsPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {['Option A', 'Option B'].map((label, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '18px', height: '18px', borderRadius: '50%',
              border: i === 0 ? '5px solid var(--ld-semantic-color-input-fill-activated, #2e2f32)' : '1px solid var(--ld-semantic-color-input-border, #2e2f32)',
              boxSizing: 'border-box',
            }} />
            <span style={{ fontSize: '13px', color: 'var(--ld-semantic-color-text, #2E2F32)' }}>{label}</span>
          </div>
        ))}
      </div>
    </PreviewFrame>
  );
}

export function SelectPreview() {
  return (
    <PreviewFrame>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        border: '1px solid var(--ld-semantic-color-border-strong, #BABBBE)',
        borderRadius: '4px', padding: '8px 12px', width: '180px', background: 'white',
      }}>
        <span style={{ fontSize: '14px', color: 'var(--ld-semantic-color-text, #2E2F32)' }}>Select option</span>
        <ChevronDown style={{ width: 16, height: 16, color: 'var(--ld-semantic-color-text-subtle, #74767C)' }} />
      </div>
    </PreviewFrame>
  );
}

export function TextFieldsPreview() {
  return (
    <PreviewFrame>
      <div style={{ width: '180px' }}>
        <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ld-semantic-color-text, #2E2F32)', marginBottom: '4px' }}>Label</div>
        <div style={{
          border: '1px solid var(--ld-semantic-color-border-strong, #BABBBE)',
          borderRadius: '4px', padding: '8px 12px', background: 'white',
          fontSize: '14px', color: 'var(--ld-semantic-color-text-subtle, #74767C)',
        }}>Placeholder text</div>
      </div>
    </PreviewFrame>
  );
}

export function TextAreaPreview() {
  return (
    <PreviewFrame>
      <div style={{ width: '180px' }}>
        <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ld-semantic-color-text, #2E2F32)', marginBottom: '4px' }}>Label</div>
        <div style={{
          border: '1px solid var(--ld-semantic-color-border-strong, #BABBBE)',
          borderRadius: '4px', padding: '8px 12px', background: 'white', height: '44px',
          fontSize: '14px', color: 'var(--ld-semantic-color-text-subtle, #74767C)',
        }}>Multi-line text...</div>
      </div>
    </PreviewFrame>
  );
}

export function FormGroupsPreview() {
  return (
    <PreviewFrame>
      <div style={{
        border: '1px solid var(--ld-semantic-color-border-strong, #BABBBE)',
        borderRadius: '4px', padding: '10px 12px', width: '160px',
      }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--ld-semantic-color-text, #2E2F32)', marginBottom: '6px' }}>Group Label</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {['Item 1', 'Item 2'].map((t, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '14px', height: '14px', borderRadius: '2px', border: '2px solid var(--ld-semantic-color-border-strong, #BABBBE)' }} />
              <span style={{ fontSize: '12px', color: 'var(--ld-semantic-color-text, #2E2F32)' }}>{t}</span>
            </div>
          ))}
        </div>
      </div>
    </PreviewFrame>
  );
}

export function CalloutsPreview() {
  return (
    <PreviewFrame>
      <div style={{ position: 'relative', maxWidth: '180px' }}>
        <div style={{ background: 'var(--ld-semantic-color-text, #2E2F32)', borderRadius: '6px', padding: '8px 12px', fontSize: '12px', color: '#FFFFFF' }}>
          Helpful tip for the user
        </div>
        <div style={{ position: 'absolute', bottom: '-5px', left: '24px', width: '10px', height: '5px', overflow: 'hidden' }}>
          <div style={{ width: '8px', height: '8px', background: 'var(--ld-semantic-color-text, #2E2F32)', transform: 'rotate(45deg)', position: 'absolute', top: '-4px', left: '1px' }} />
        </div>
      </div>
    </PreviewFrame>
  );
}

export function ContentMessagesPreview() {
  return (
    <PreviewFrame>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', margin: '0 auto 6px', background: 'var(--ld-semantic-color-fill-subtle, #F5F5F6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <InfoCircle style={{ width: 16, height: 16, color: 'var(--ld-semantic-color-text-subtle, #74767C)' }} />
        </div>
        <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ld-semantic-color-text, #2E2F32)' }}>No results found</div>
        <div style={{ fontSize: '11px', color: 'var(--ld-semantic-color-text-subtle, #74767C)' }}>Try adjusting your filters</div>
      </div>
    </PreviewFrame>
  );
}

export function DateFieldsPreview() {
  return (
    <PreviewFrame>
      <div style={{ width: '160px' }}>
        <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ld-semantic-color-text, #2E2F32)', marginBottom: '4px' }}>Date</div>
        <div style={{ border: '1px solid var(--ld-semantic-color-border-strong, #BABBBE)', borderRadius: '4px', padding: '8px 12px', background: 'white', fontSize: '13px', color: 'var(--ld-semantic-color-text, #2E2F32)' }}>02/18/2026</div>
      </div>
    </PreviewFrame>
  );
}

export function DatePickersPreview() {
  return (
    <PreviewFrame>
      <div style={{ borderRadius: '6px', padding: '8px', background: 'white', width: '160px', boxShadow: 'var(--ld-semantic-elevation-100)' }}>
        <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--ld-semantic-color-text, #2E2F32)', textAlign: 'center', marginBottom: '6px' }}>February 2026</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}>
          {['S','M','T','W','T','F','S'].map((d, i) => (
            <div key={`h-${i}`} style={{ fontSize: '9px', textAlign: 'center', color: 'var(--ld-semantic-color-text-subtle, #74767C)' }}>{d}</div>
          ))}
          {Array.from({ length: 7 }, (_, i) => i + 15).map(d => (
            <div key={d} style={{ fontSize: '10px', textAlign: 'center', padding: '2px', borderRadius: '50%', background: d === 18 ? 'var(--ld-semantic-color-action-fill-primary, #0071DC)' : 'transparent', color: d === 18 ? 'white' : 'var(--ld-semantic-color-text, #2E2F32)' }}>{d}</div>
          ))}
        </div>
      </div>
    </PreviewFrame>
  );
}

export function ListsPreview() {
  return (
    <PreviewFrame>
      <div style={{ width: '160px', display: 'flex', flexDirection: 'column' }}>
        {['List item 1', 'List item 2', 'List item 3'].map((t, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 0', borderBottom: i < 2 ? '1px solid var(--ld-semantic-color-separator)' : 'none' }}>
            <ChevronRight style={{ width: 12, height: 12, color: 'var(--ld-semantic-color-text-subtle, #74767C)' }} />
            <span style={{ fontSize: '12px', color: 'var(--ld-semantic-color-text, #2E2F32)' }}>{t}</span>
          </div>
        ))}
      </div>
    </PreviewFrame>
  );
}

export function MagicBoxPreview() {
  return (
    <PreviewFrame>
      <div style={{ position: 'relative', width: '140px', height: '50px' }}>
        <div style={{ position: 'absolute', inset: '-2px', borderRadius: '18px', background: 'linear-gradient(135deg, var(--ld-semantic-color-border-magic-start, #0053E2), var(--ld-semantic-color-border-magic-middle, #3D90EC), var(--ld-semantic-color-border-magic-stop, #79CDF6))', filter: 'blur(1px)', opacity: 0.8 }} />
        <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '16px', background: 'var(--ld-semantic-color-fill-surface-primary, #fff)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: 'var(--ld-semantic-color-text, #2E2F32)' }}>
          <Magic style={{ width: 16, height: 16, color: 'var(--ld-semantic-color-border-magic-start, #0053E2)' }} />
          AI Content
        </div>
      </div>
    </PreviewFrame>
  );
}

export function MenuPreview() {
  return (
    <PreviewFrame>
      <div style={{ borderRadius: '6px', padding: '4px', background: 'white', width: '140px', boxShadow: 'var(--ld-semantic-elevation-200)' }}>
        {['Edit', 'Duplicate', 'Delete'].map((t, i) => (
          <div key={i} style={{ padding: '6px 10px', fontSize: '12px', borderRadius: '4px', color: i === 2 ? 'var(--ld-semantic-color-text-negative, #C5221F)' : 'var(--ld-semantic-color-text, #2E2F32)', background: i === 0 ? 'var(--ld-semantic-color-fill-subtle, #F5F5F6)' : 'transparent' }}>{t}</div>
        ))}
      </div>
    </PreviewFrame>
  );
}

export function MetricsPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--ld-semantic-color-text, #2E2F32)' }}>1.2M</div>
          <div style={{ fontSize: '11px', color: 'var(--ld-semantic-color-text-subtle, #74767C)' }}>Impressions</div>
        </div>
        <div style={{ width: '1px', height: '32px', background: 'var(--ld-semantic-color-separator)' }} />
        <div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--ld-semantic-color-text-positive, #2A8703)' }}>+12%</div>
          <div style={{ fontSize: '11px', color: 'var(--ld-semantic-color-text-subtle, #74767C)' }}>CTR</div>
        </div>
      </div>
    </PreviewFrame>
  );
}

export function ModalsPreview() {
  return (
    <PreviewFrame>
      <div style={{ borderRadius: '8px', padding: '10px 14px', background: 'white', width: '160px', boxShadow: 'var(--ld-semantic-elevation-300)' }}>
        <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ld-semantic-color-text, #2E2F32)', marginBottom: '4px' }}>Confirm</div>
        <div style={{ fontSize: '11px', color: 'var(--ld-semantic-color-text-subtle, #74767C)', marginBottom: '8px' }}>Are you sure?</div>
        <div style={{ display: 'flex', gap: '4px', justifyContent: 'flex-end' }}>
          <div style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '9999px', border: '1px solid var(--ld-semantic-color-border-strong, #BABBBE)' }}>Cancel</div>
          <div style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '9999px', background: 'var(--ld-semantic-color-action-fill-primary, #0071DC)', color: 'white' }}>OK</div>
        </div>
      </div>
    </PreviewFrame>
  );
}

export function NudgesPreview() {
  return (
    <PreviewFrame>
      <div style={{ background: 'var(--ld-semantic-color-fill-info-subtle, #E5F0FF)', borderRadius: '6px', padding: '8px 12px', maxWidth: '200px', fontSize: '12px', color: 'var(--ld-semantic-color-text, #2E2F32)', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <InfoCircle style={{ width: 14, height: 14, color: 'var(--ld-semantic-color-text-brand-bold, #0071DC)', flexShrink: 0 }} />
        <span>Did you know you can...</span>
      </div>
    </PreviewFrame>
  );
}

export function PanelsPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', width: '180px', height: '64px', borderRadius: '6px', overflow: 'hidden', boxShadow: 'var(--ld-semantic-elevation-100)' }}>
        <div style={{ flex: 1, background: 'var(--ld-semantic-color-fill-subtle, #F5F5F6)', padding: '6px', fontSize: '10px', color: 'var(--ld-semantic-color-text-subtle, #74767C)' }}>Main</div>
        <div style={{ width: '70px', borderLeft: '1px solid var(--ld-semantic-color-separator)', background: 'white', padding: '6px', fontSize: '10px', color: 'var(--ld-semantic-color-text, #2E2F32)' }}>Panel</div>
      </div>
    </PreviewFrame>
  );
}

export function ProgressIndicatorPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '50%', border: '3px solid var(--ld-semantic-color-fill-subtle, #E2E2E3)', borderTopColor: 'var(--ld-semantic-color-action-fill-primary, #0071DC)' }} />
        <div style={{ width: '80px', height: '6px', borderRadius: '3px', background: 'var(--ld-semantic-color-fill-subtle, #E2E2E3)', overflow: 'hidden' }}>
          <div style={{ width: '60%', height: '100%', borderRadius: '3px', background: 'var(--ld-semantic-color-action-fill-primary, #0071DC)' }} />
        </div>
      </div>
    </PreviewFrame>
  );
}

export function ProgressTrackerPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        {[true, true, false].map((done, i) => (
          <React.Fragment key={i}>
            <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: done ? 'var(--ld-semantic-color-action-fill-primary, #0071DC)' : 'var(--ld-semantic-color-fill-subtle, #E2E2E3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: done ? 'white' : 'var(--ld-semantic-color-text-subtle, #74767C)' }}>
              {done ? <Check style={{ width: 12, height: 12 }} /> : i + 1}
            </div>
            {i < 2 && <div style={{ width: '20px', height: '2px', background: done && i < 1 ? 'var(--ld-semantic-color-action-fill-primary, #0071DC)' : 'var(--ld-semantic-color-fill-subtle, #E2E2E3)' }} />}
          </React.Fragment>
        ))}
      </div>
    </PreviewFrame>
  );
}

export function SnackbarsPreview() {
  return (
    <PreviewFrame>
      <div style={{ background: 'var(--ld-semantic-color-text, #2E2F32)', borderRadius: '6px', padding: '8px 14px', fontSize: '12px', color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Check style={{ width: 14, height: 14 }} />
        Changes saved
      </div>
    </PreviewFrame>
  );
}

export function SpinnersPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Spinner size="large" />
        <Spinner size="small" />
      </div>
    </PreviewFrame>
  );
}

export function SpotIconsPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        {[Star, Search, InfoCircle].map((Icon, i) => (
          <div key={i} style={{ width: '40px', height: '40px', borderRadius: '9999px', background: 'var(--ld-semantic-color-fill-brand-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon style={{ width: 20, height: 20, color: 'var(--ld-semantic-color-text-onfill-brand-subtle, #0053E2)' }} />
          </div>
        ))}
      </div>
    </PreviewFrame>
  );
}

export function TabsPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', borderBottom: '2px solid var(--ld-semantic-color-separator)' }}>
        {['Tab 1', 'Tab 2', 'Tab 3'].map((t, i) => (
          <div key={i} style={{ padding: '6px 12px', fontSize: '12px', fontWeight: i === 0 ? 700 : 400, color: i === 0 ? 'var(--ld-semantic-color-text, #2e2f32)' : 'var(--ld-semantic-color-text-subtle, #74767C)', borderBottom: i === 0 ? '2px solid var(--ld-semantic-color-action-fill-primary, #0071DC)' : '2px solid transparent', marginBottom: '-2px' }}>{t}</div>
        ))}
      </div>
    </PreviewFrame>
  );
}

export function TablePreview() {
  return (
    <PreviewFrame>
      <div style={{ width: '100%', fontSize: '11px' }}>
        <div style={{ display: 'flex', borderBottom: '1px solid var(--ld-semantic-color-separator)', fontWeight: 700, color: 'var(--ld-semantic-color-text, #2E2F32)', background: 'var(--ld-semantic-color-fill-subtle, #f8f8f8)' }}>
          <div style={{ flex: 1, padding: '4px 6px' }}>Name</div>
          <div style={{ width: '50px', padding: '4px 6px', textAlign: 'right' }}>Value</div>
        </div>
        {[['Item A', '$12'], ['Item B', '$34']].map(([n, v], i) => (
          <div key={i} style={{ display: 'flex', borderBottom: '1px solid var(--ld-semantic-color-separator)', color: 'var(--ld-semantic-color-text, #2E2F32)' }}>
            <div style={{ flex: 1, padding: '4px 6px' }}>{n}</div>
            <div style={{ width: '50px', padding: '4px 6px', textAlign: 'right' }}>{v}</div>
          </div>
        ))}
      </div>
    </PreviewFrame>
  );
}

export function BottomSheetPreview() {
  return (
    <PreviewFrame>
      <div style={{ width: '140px', height: '70px', position: 'relative', background: 'rgba(0,0,0,0.15)', borderRadius: '6px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '45px', background: 'var(--ld-semantic-color-surface-overlay, #fff)', borderTopLeftRadius: '12px', borderTopRightRadius: '12px', boxShadow: 'var(--ld-semantic-elevation-300)', padding: '6px 10px' }}>
          <div style={{ width: '24px', height: '3px', borderRadius: '2px', background: 'var(--ld-semantic-color-border-strong, #BABBBE)', margin: '0 auto 6px' }} />
          <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--ld-semantic-color-text, #2E2F32)', textAlign: 'center' }}>Sheet Title</div>
        </div>
      </div>
    </PreviewFrame>
  );
}

export function SkeletonPreview() {
  return (
    <PreviewFrame>
      <div style={{ width: '160px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ width: '100%', height: '12px', borderRadius: '4px', background: 'var(--ld-semantic-color-loading-subtle, #E2E2E3)' }} />
        <div style={{ width: '75%', height: '12px', borderRadius: '4px', background: 'var(--ld-semantic-color-loading-subtle, #E2E2E3)', opacity: 0.7 }} />
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '9999px', background: 'var(--ld-semantic-color-loading-subtle, #E2E2E3)' }} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px', justifyContent: 'center' }}>
            <div style={{ width: '100%', height: '8px', borderRadius: '4px', background: 'var(--ld-semantic-color-loading-subtle, #E2E2E3)' }} />
            <div style={{ width: '60%', height: '8px', borderRadius: '4px', background: 'var(--ld-semantic-color-loading-subtle, #E2E2E3)', opacity: 0.7 }} />
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}

export function BasicBannerPreview() {
  return (
    <PreviewFrame>
      <div style={{ width: '200px', transform: 'scale(0.9)', transformOrigin: 'center' }}>
        <BasicBanner variant="default" text="Free delivery on orders $35+" />
      </div>
    </PreviewFrame>
  );
}

export function SegmentedControlPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'inline-flex', border: '1px solid var(--ld-semantic-color-border-moderate, #e6e6e8)', borderRadius: '8px', overflow: 'hidden', background: 'var(--ld-semantic-color-fill-subtle, #f8f8f8)' }}>
        {['List', 'Grid', 'Map'].map((label, i) => (
          <div key={label} style={{
            padding: '6px 14px',
            fontSize: '13px',
            fontWeight: i === 0 ? 700 : 400,
            fontFamily: 'var(--ld-semantic-font-family-sans)',
            color: i === 0 ? 'var(--ld-semantic-color-action-text-on-fill-primary, #fff)' : 'var(--ld-semantic-color-text-secondary, #74767C)',
            background: i === 0 ? 'var(--ld-semantic-color-action-fill-primary, #0071DC)' : 'transparent',
            cursor: 'pointer',
            borderRight: i < 2 ? '1px solid var(--ld-semantic-color-border-moderate, #e6e6e8)' : 'none',
          }}>
            {label}
          </div>
        ))}
      </div>
    </PreviewFrame>
  );
}

export function QuantityStepperPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid var(--ld-semantic-color-action-border-secondary, #2e2f32)', borderRadius: '9999px', overflow: 'hidden' }}>
        <div style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 700, color: 'var(--ld-semantic-color-text, #2e2f32)', cursor: 'pointer' }}>−</div>
        <div style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', fontWeight: 700, fontFamily: 'var(--ld-semantic-font-family-sans)', color: 'var(--ld-semantic-color-text, #2e2f32)', borderLeft: '1px solid var(--ld-semantic-color-border-subtle, #e6e6e8)', borderRight: '1px solid var(--ld-semantic-color-border-subtle, #e6e6e8)' }}>2</div>
        <div style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 700, color: 'var(--ld-semantic-color-text, #2e2f32)', cursor: 'pointer' }}>+</div>
      </div>
    </PreviewFrame>
  );
}

export function OrderCardPatternsPreview() {
  return (
    <PreviewFrame>
      <div style={{ width: '180px', borderRadius: '8px', border: '1px solid var(--ld-semantic-color-separator, #e3e4e5)', background: 'var(--ld-semantic-color-fill-surface-primary, #fff)', overflow: 'hidden' }}>
        <div style={{ background: 'var(--ld-semantic-color-fill-subtle, #f8f8f8)', padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--ld-semantic-color-text-secondary, #74767c)', fontFamily: 'var(--ld-semantic-font-family-sans)' }}>ORDER #12345</span>
          <span style={{ fontSize: '10px', color: 'var(--ld-semantic-color-text-positive, #2a8703)', fontWeight: 600 }}>Delivered</span>
        </div>
        <div style={{ padding: '8px 12px', display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '4px', background: 'var(--ld-semantic-color-fill-subtle, #f0f0f2)' }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--ld-semantic-color-text, #2e2f32)', fontFamily: 'var(--ld-semantic-font-family-sans)' }}>Product Name</div>
            <div style={{ fontSize: '10px', color: 'var(--ld-semantic-color-text-secondary, #74767c)' }}>Qty 1 · $12.99</div>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}

export function FloatingButtonPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        {[28, 36, 28].map((size, i) => (
          <div key={i} style={{
            width: `${size}px`, height: `${size}px`, borderRadius: '50%',
            background: 'var(--ld-semantic-color-fill-surface-primary, #fff)',
            boxShadow: 'var(--ld-semantic-elevation-200)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {i === 0 && <ChevronDown style={{ width: 14, height: 14, color: 'var(--ld-semantic-color-text, #2E2F32)', transform: 'rotate(90deg)' }} />}
            {i === 1 && <ArrowRight style={{ width: 16, height: 16, color: 'var(--ld-semantic-color-text, #2E2F32)' }} />}
            {i === 2 && <ChevronDown style={{ width: 14, height: 14, color: 'var(--ld-semantic-color-text, #2E2F32)', transform: 'rotate(-90deg)' }} />}
          </div>
        ))}
      </div>
    </PreviewFrame>
  );
}

export function QueueBannerPreview() {
  return (
    <PreviewFrame>
      <div style={{
        width: '200px', borderRadius: '6px', padding: '8px 12px',
        background: 'var(--ld-semantic-color-text, #2E2F32)',
        display: 'flex', alignItems: 'center', gap: '8px',
      }}>
        <div style={{
          padding: '2px 8px', borderRadius: '9999px', fontSize: '10px', fontWeight: 700,
          background: 'var(--ld-semantic-color-action-fill-primary, #0071DC)', color: 'white',
        }}>14:59</div>
        <span style={{ fontSize: '11px', color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Your cart is reserved</span>
      </div>
    </PreviewFrame>
  );
}

export function HeartViewPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
          <path d="M16 28S3 20.5 3 11.5C3 7.36 6.36 4 10.5 4c2.54 0 4.78 1.26 6.15 3.19L16 7.5l-.65-.31C16.72 5.26 18.96 4 21.5 4 25.64 4 29 7.36 29 11.5 29 20.5 16 28 16 28Z"
            stroke="var(--ld-semantic-color-text-subtle, #74767C)" strokeWidth="2" />
        </svg>
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
          <path d="M16 28S3 20.5 3 11.5C3 7.36 6.36 4 10.5 4c2.54 0 4.78 1.26 6.15 3.19L16 7.5l-.65-.31C16.72 5.26 18.96 4 21.5 4 25.64 4 29 7.36 29 11.5 29 20.5 16 28 16 28Z"
            fill="var(--ld-semantic-color-text-negative, #C5221F)" stroke="var(--ld-semantic-color-text-negative, #C5221F)" strokeWidth="2" />
        </svg>
      </div>
    </PreviewFrame>
  );
}

export function RichSnackbarPreview() {
  return (
    <PreviewFrame>
      <div style={{
        borderRadius: '8px', padding: '8px 14px', fontSize: '12px', color: 'white',
        background: 'var(--ld-semantic-color-text, #2E2F32)',
        display: 'flex', alignItems: 'center', gap: '8px',
      }}>
        <div style={{
          width: '20px', height: '20px', borderRadius: '50%',
          background: 'var(--ld-semantic-color-text-positive, #2A8703)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <Check style={{ width: 12, height: 12, color: 'white' }} />
        </div>
        Item added to cart
      </div>
    </PreviewFrame>
  );
}

export function TimerViewPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        {[
          { label: '59m', bg: 'var(--ld-semantic-color-fill-info-subtle, #E5F0FF)', color: 'var(--ld-semantic-color-text-brand-bold, #0071DC)' },
          { label: '5m', bg: 'var(--ld-semantic-color-fill-warning-subtle, #FFF3E0)', color: 'var(--ld-semantic-color-text-warning, #F57C00)' },
          { label: '1m', bg: 'var(--ld-semantic-color-fill-negative-subtle, #FDE7E7)', color: 'var(--ld-semantic-color-text-negative, #C5221F)' },
        ].map((t, i) => (
          <div key={i} style={{
            padding: '4px 10px', borderRadius: '9999px', fontSize: '11px', fontWeight: 700,
            background: t.bg, color: t.color,
          }}>{t.label}</div>
        ))}
      </div>
    </PreviewFrame>
  );
}

export function SearchBarPreview() {
  return (
    <PreviewFrame>
      <div style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        border: '1px solid var(--ld-semantic-color-border-strong, #BABBBE)',
        borderRadius: '9999px', padding: '6px 14px', width: '180px', background: 'white',
      }}>
        <Search style={{ width: 14, height: 14, color: 'var(--ld-semantic-color-text-subtle, #74767C)', flexShrink: 0 }} />
        <span style={{ fontSize: '13px', color: 'var(--ld-semantic-color-text-subtle, #74767C)' }}>Search items...</span>
      </div>
    </PreviewFrame>
  );
}

export function SignatureCapturePreview() {
  return (
    <PreviewFrame>
      <div style={{
        width: '160px', height: '56px', borderRadius: '6px',
        border: '1px dashed var(--ld-semantic-color-border-strong, #BABBBE)',
        background: 'var(--ld-semantic-color-fill-surface-primary, #fff)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px',
      }}>
        <span style={{ fontSize: '16px', fontFamily: 'cursive', color: 'var(--ld-semantic-color-text, #2E2F32)', opacity: 0.6 }}>John Doe</span>
        <div style={{ width: '80px', height: '1px', background: 'var(--ld-semantic-color-border-strong, #BABBBE)' }} />
      </div>
    </PreviewFrame>
  );
}

export function UploadImagePreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
        {[0, 1].map(i => (
          <div key={i} style={{
            width: '36px', height: '36px', borderRadius: '6px',
            background: 'var(--ld-semantic-color-fill-subtle, #F5F5F6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Star style={{ width: 14, height: 14, color: 'var(--ld-semantic-color-text-subtle, #74767C)' }} />
          </div>
        ))}
        <div style={{
          width: '36px', height: '36px', borderRadius: '6px',
          border: '1px dashed var(--ld-semantic-color-border-strong, #BABBBE)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '18px', color: 'var(--ld-semantic-color-text-subtle, #74767C)',
        }}>+</div>
      </div>
    </PreviewFrame>
  );
}

export function CountrySelectPreview() {
  return (
    <PreviewFrame>
      <div style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        border: '1px solid var(--ld-semantic-color-border-strong, #BABBBE)',
        borderRadius: '4px', padding: '6px 12px', background: 'white',
      }}>
        <div style={{
          width: '20px', height: '14px', borderRadius: '2px',
          background: 'linear-gradient(180deg, #B22234 0%, #B22234 30%, white 30%, white 45%, #3C3B6E 45%, #3C3B6E 100%)',
        }} />
        <span style={{ fontSize: '13px', color: 'var(--ld-semantic-color-text, #2E2F32)', flex: 1 }}>United States</span>
        <ChevronDown style={{ width: 14, height: 14, color: 'var(--ld-semantic-color-text-subtle, #74767C)' }} />
      </div>
    </PreviewFrame>
  );
}

export function FlagPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
        {[
          { label: 'Save', bg: 'var(--ld-semantic-color-fill-negative-subtle, #FDE7E7)', color: 'var(--ld-semantic-color-text-negative, #C5221F)' },
          { label: 'Best seller', bg: 'var(--ld-semantic-color-fill-info-subtle, #E5F0FF)', color: 'var(--ld-semantic-color-text-brand-bold, #0071DC)' },
          { label: 'Limited', bg: 'var(--ld-semantic-color-fill-warning-subtle, #FFF3E0)', color: 'var(--ld-semantic-color-text-warning, #F57C00)' },
        ].map((f, i) => (
          <div key={i} style={{
            padding: '2px 8px', borderRadius: '9999px', fontSize: '10px', fontWeight: 700,
            background: f.bg, color: f.color,
          }}>{f.label}</div>
        ))}
      </div>
    </PreviewFrame>
  );
}

export function RatingsPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
        {[1, 2, 3, 4, 5].map(n => (
          <Star key={n} style={{
            width: 18, height: 18,
            color: n <= 3 ? 'var(--ld-semantic-color-text-warning, #F57C00)' : 'var(--ld-semantic-color-border-strong, #BABBBE)',
          }} />
        ))}
      </div>
    </PreviewFrame>
  );
}

export function ButtonGroupsPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span style={{ padding: '6px 16px', borderRadius: '9999px', background: 'var(--ld-semantic-color-action-fill-primary, #0071DC)', color: 'white', fontSize: '13px', fontWeight: 700 }}>Primary</span>
        <span style={{ padding: '6px 16px', borderRadius: '9999px', border: '1px solid var(--ld-semantic-color-action-border-secondary, #74767C)', color: 'var(--ld-semantic-color-text, #2E2F32)', fontSize: '13px', fontWeight: 700 }}>Secondary</span>
      </div>
    </PreviewFrame>
  );
}

export function RichMediaSheetPreview() {
  return (
    <PreviewFrame>
      <div style={{ width: '140px', height: '70px', position: 'relative', background: 'rgba(0,0,0,0.15)', borderRadius: '6px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50px', background: 'var(--ld-semantic-color-fill-surface-primary, #fff)', borderTopLeftRadius: '12px', borderTopRightRadius: '12px', boxShadow: 'var(--ld-semantic-elevation-300)', padding: '6px 10px' }}>
          <div style={{ width: '24px', height: '3px', borderRadius: '2px', background: 'var(--ld-semantic-color-border-strong, #BABBBE)', margin: '0 auto 4px' }} />
          <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--ld-semantic-color-text, #2E2F32)', marginBottom: '4px' }}>Media Sheet</div>
          <div style={{ display: 'flex', gap: '4px' }}>
            <div style={{ width: '24px', height: '16px', borderRadius: '3px', background: 'var(--ld-semantic-color-fill-subtle, #F5F5F6)' }} />
            <div style={{ width: '24px', height: '16px', borderRadius: '3px', background: 'var(--ld-semantic-color-fill-subtle, #F5F5F6)' }} />
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}

export function ItemTilePreview() {
  return (
    <PreviewFrame>
      <div style={{ width: '80px', borderRadius: '6px', overflow: 'hidden', background: 'var(--ld-semantic-color-fill-surface-primary, #fff)', boxShadow: 'var(--ld-semantic-elevation-100)' }}>
        <div style={{ position: 'relative' }}>
          <div style={{ width: '100%', height: '56px', background: 'var(--ld-semantic-color-fill-subtle, #F5F5F6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Star style={{ width: 16, height: 16, color: 'var(--ld-semantic-color-text-subtle, #74767C)' }} />
          </div>
          <div style={{ position: 'absolute', top: '3px', left: '3px', padding: '1px 4px', borderRadius: '2px', fontSize: '8px', fontWeight: 700, background: 'var(--ld-semantic-color-fill-negative-subtle, #FDE7E7)', color: 'var(--ld-semantic-color-text-negative, #C5221F)' }}>Save</div>
        </div>
        <div style={{ padding: '4px 6px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--ld-semantic-color-text, #2E2F32)' }}>$9.99</div>
          <div style={{ fontSize: '9px', color: 'var(--ld-semantic-color-text-subtle, #74767C)' }}>Product</div>
        </div>
      </div>
    </PreviewFrame>
  );
}

export function DropdownsPreview() {
  return (
    <PreviewFrame>
      <div style={{ borderRadius: '6px', padding: '4px', background: 'white', width: '130px', boxShadow: 'var(--ld-semantic-elevation-200)' }}>
        {['Departments', 'Services', 'Account'].map((t, i) => (
          <div key={i} style={{
            padding: '6px 10px', fontSize: '12px', borderRadius: '4px',
            color: 'var(--ld-semantic-color-text, #2E2F32)',
            background: i === 0 ? 'var(--ld-semantic-color-fill-subtle, #F5F5F6)' : 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            {t}
            <ChevronRight style={{ width: 10, height: 10, color: 'var(--ld-semantic-color-text-subtle, #74767C)' }} />
          </div>
        ))}
      </div>
    </PreviewFrame>
  );
}

export function SearchUtilityPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          border: '1px solid var(--ld-semantic-color-border-strong, #BABBBE)',
          borderRadius: '9999px', padding: '6px 12px', background: 'white', flex: 1,
        }}>
          <Search style={{ width: 14, height: 14, color: 'var(--ld-semantic-color-text-subtle, #74767C)' }} />
          <span style={{ fontSize: '12px', color: 'var(--ld-semantic-color-text-subtle, #74767C)' }}>Search...</span>
        </div>
        <div style={{
          width: '28px', height: '28px', borderRadius: '50%',
          border: '1px solid var(--ld-semantic-color-border-strong, #BABBBE)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <InfoCircle style={{ width: 14, height: 14, color: 'var(--ld-semantic-color-text-subtle, #74767C)' }} />
        </div>
      </div>
    </PreviewFrame>
  );
}
