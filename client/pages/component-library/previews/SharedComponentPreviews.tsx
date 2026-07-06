import React from 'react';
import { InfoCircle, Star, ChevronDown, Search, ArrowRight, Check } from '@/components/icons';
import { PreviewFrame } from './PreviewFrame';

export function AccordionPreview() {
  return (
    <PreviewFrame>
      <div style={{ width: '160px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {['Section 1', 'Section 2', 'Section 3'].map((t, i) => (
          <div key={i} style={{
            border: '1px solid var(--ld-semantic-color-separator)',
            borderRadius: i === 0 ? '6px 6px 0 0' : i === 2 ? '0 0 6px 6px' : '0',
            overflow: 'hidden',
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '6px 10px', fontSize: '11px', fontWeight: 600,
              color: 'var(--ld-semantic-color-text, #2E2F32)',
              background: i === 0 ? 'var(--ld-semantic-color-fill-subtle, #F5F5F6)' : 'white',
            }}>
              {t}
              <ChevronDown style={{ width: 10, height: 10, color: 'var(--ld-semantic-color-text-subtle, #74767C)', transform: i === 0 ? 'rotate(180deg)' : 'none' }} />
            </div>
            {i === 0 && (
              <div style={{ padding: '6px 10px', fontSize: '10px', color: 'var(--ld-semantic-color-text-subtle, #74767C)', borderTop: '1px solid var(--ld-semantic-color-separator)' }}>
                Expanded content here
              </div>
            )}
          </div>
        ))}
      </div>
    </PreviewFrame>
  );
}

export function AlertDialogPreview() {
  return (
    <PreviewFrame>
      <div style={{ borderRadius: '8px', padding: '10px 14px', background: 'white', width: '170px', boxShadow: 'var(--ld-semantic-elevation-300)' }}>
        <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ld-semantic-color-text, #2E2F32)', marginBottom: '4px' }}>Are you sure?</div>
        <div style={{ fontSize: '10px', color: 'var(--ld-semantic-color-text-subtle, #74767C)', marginBottom: '8px' }}>This action cannot be undone.</div>
        <div style={{ display: 'flex', gap: '4px', justifyContent: 'flex-end' }}>
          <div style={{ fontSize: '10px', padding: '3px 8px', borderRadius: '9999px', border: '1px solid var(--ld-semantic-color-action-border-secondary, #74767C)' }}>Cancel</div>
          <div style={{ fontSize: '10px', padding: '3px 8px', borderRadius: '9999px', background: 'var(--ld-semantic-color-action-fill-negative, #ea1100)', color: 'white' }}>Delete</div>
        </div>
      </div>
    </PreviewFrame>
  );
}

export function AvatarPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        {[
          { initials: 'AH', bg: 'var(--ld-semantic-color-fill-accent-blue, #0053e2)' },
          { initials: 'JD', bg: 'var(--ld-semantic-color-fill-accent-green, #2a8703)' },
          { initials: 'MK', bg: 'var(--ld-semantic-color-fill-accent-purple, #63327e)' },
        ].map((a, i) => (
          <div key={i} style={{ width: '36px', height: '36px', borderRadius: '50%', background: a.bg, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700 }}>{a.initials}</div>
        ))}
      </div>
    </PreviewFrame>
  );
}

export function CalendarPreview() {
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

export function CarouselPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '1px solid var(--ld-semantic-color-border-subtle, #BABBBE)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ChevronDown style={{ width: 10, height: 10, transform: 'rotate(90deg)', color: 'var(--ld-semantic-color-text-subtle, #74767C)' }} />
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          {[1, 2, 3].map(n => (
            <div key={n} style={{ width: '44px', height: '44px', borderRadius: '6px', background: n === 2 ? 'var(--ld-semantic-color-fill-brand-subtle, #e9f1fe)' : 'var(--ld-semantic-color-fill-subtle, #F5F5F6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 600, color: 'var(--ld-semantic-color-text-subtle, #74767C)' }}>{n}</div>
          ))}
        </div>
        <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '1px solid var(--ld-semantic-color-border-subtle, #BABBBE)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ChevronDown style={{ width: 10, height: 10, transform: 'rotate(-90deg)', color: 'var(--ld-semantic-color-text-subtle, #74767C)' }} />
        </div>
      </div>
    </PreviewFrame>
  );
}

export function ChartPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '60px' }}>
        {[40, 65, 45, 80, 55, 70].map((h, i) => (
          <div key={i} style={{ width: '16px', height: `${h}%`, borderRadius: '3px 3px 0 0', background: i === 3 ? 'var(--ld-semantic-color-action-fill-primary, #0053e2)' : 'var(--ld-semantic-color-fill-brand-subtle, #e9f1fe)' }} />
        ))}
      </div>
    </PreviewFrame>
  );
}

export function CommandPreview() {
  return (
    <PreviewFrame>
      <div style={{ width: '170px', borderRadius: '8px', background: 'white', boxShadow: 'var(--ld-semantic-elevation-200)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 10px', borderBottom: '1px solid var(--ld-semantic-color-separator)' }}>
          <Search style={{ width: 12, height: 12, color: 'var(--ld-semantic-color-text-subtle, #74767C)' }} />
          <span style={{ fontSize: '11px', color: 'var(--ld-semantic-color-text-subtle, #74767C)' }}>Type a command...</span>
        </div>
        <div style={{ padding: '4px' }}>
          {['Search', 'Settings'].map((t, i) => (
            <div key={i} style={{ padding: '4px 8px', fontSize: '11px', borderRadius: '4px', color: 'var(--ld-semantic-color-text, #2E2F32)', background: i === 0 ? 'var(--ld-semantic-color-fill-subtle, #F5F5F6)' : 'transparent' }}>{t}</div>
          ))}
        </div>
      </div>
    </PreviewFrame>
  );
}

export function ContextMenuPreview() {
  return (
    <PreviewFrame>
      <div style={{ borderRadius: '6px', padding: '4px', background: 'white', width: '120px', boxShadow: 'var(--ld-semantic-elevation-200)' }}>
        {['Cut', 'Copy', 'Paste'].map((t, i) => (
          <div key={i} style={{ padding: '5px 10px', fontSize: '11px', borderRadius: '4px', color: 'var(--ld-semantic-color-text, #2E2F32)', display: 'flex', justifyContent: 'space-between' }}>
            <span>{t}</span>
            <span style={{ fontSize: '10px', color: 'var(--ld-semantic-color-text-subtle, #74767C)' }}>{['\u2318X','\u2318C','\u2318V'][i]}</span>
          </div>
        ))}
      </div>
    </PreviewFrame>
  );
}

export function DialogPreview() {
  return (
    <PreviewFrame>
      <div style={{ borderRadius: '8px', padding: '10px 14px', background: 'white', width: '160px', boxShadow: 'var(--ld-semantic-elevation-300)' }}>
        <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ld-semantic-color-text, #2E2F32)', marginBottom: '4px' }}>Dialog Title</div>
        <div style={{ fontSize: '10px', color: 'var(--ld-semantic-color-text-subtle, #74767C)', marginBottom: '8px' }}>Dialog content goes here.</div>
        <div style={{ display: 'flex', gap: '4px', justifyContent: 'flex-end' }}>
          <div style={{ fontSize: '10px', padding: '3px 8px', borderRadius: '9999px', border: '1px solid var(--ld-semantic-color-action-border-secondary, #74767C)' }}>Close</div>
          <div style={{ fontSize: '10px', padding: '3px 8px', borderRadius: '9999px', background: 'var(--ld-semantic-color-action-fill-primary, #0071DC)', color: 'white' }}>Save</div>
        </div>
      </div>
    </PreviewFrame>
  );
}

export function DropdownMenuPreview() {
  return (
    <PreviewFrame>
      <div style={{ borderRadius: '6px', padding: '4px', background: 'white', width: '130px', boxShadow: 'var(--ld-semantic-elevation-200)' }}>
        {['Profile', 'Settings', 'Log out'].map((t, i) => (
          <div key={i} style={{ padding: '5px 10px', fontSize: '11px', borderRadius: '4px', color: i === 2 ? 'var(--ld-semantic-color-text-negative, #ea1100)' : 'var(--ld-semantic-color-text, #2E2F32)', borderTop: i === 2 ? '1px solid var(--ld-semantic-color-separator)' : 'none', marginTop: i === 2 ? '2px' : 0, paddingTop: i === 2 ? '6px' : '5px' }}>{t}</div>
        ))}
      </div>
    </PreviewFrame>
  );
}

export function FormPreview() {
  return (
    <PreviewFrame>
      <div style={{ width: '160px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div>
          <div style={{ fontSize: '10px', fontWeight: 600, color: 'var(--ld-semantic-color-text, #2E2F32)', marginBottom: '2px' }}>Email</div>
          <div style={{ border: '1px solid var(--ld-semantic-color-border-subtle, #BABBBE)', borderRadius: '4px', padding: '4px 8px', background: 'white', fontSize: '10px', color: 'var(--ld-semantic-color-text-subtle, #74767C)' }}>user@email.com</div>
        </div>
        <div>
          <div style={{ fontSize: '10px', fontWeight: 600, color: 'var(--ld-semantic-color-text, #2E2F32)', marginBottom: '2px' }}>Password</div>
          <div style={{ border: '1px solid var(--ld-semantic-color-border-negative, #ea1100)', borderRadius: '4px', padding: '4px 8px', background: 'white', fontSize: '10px', color: 'var(--ld-semantic-color-text, #2E2F32)' }}>&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;</div>
          <div style={{ fontSize: '9px', color: 'var(--ld-semantic-color-text-negative, #ea1100)', marginTop: '2px' }}>Required field</div>
        </div>
      </div>
    </PreviewFrame>
  );
}

export function MenubarPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', gap: '2px', padding: '4px', background: 'white', borderRadius: '6px', border: '1px solid var(--ld-semantic-color-separator)' }}>
        {['File', 'Edit', 'View', 'Help'].map((t, i) => (
          <div key={i} style={{ padding: '4px 10px', fontSize: '11px', borderRadius: '4px', color: 'var(--ld-semantic-color-text, #2E2F32)', background: i === 0 ? 'var(--ld-semantic-color-fill-subtle, #F5F5F6)' : 'transparent', fontWeight: i === 0 ? 600 : 400 }}>{t}</div>
        ))}
      </div>
    </PreviewFrame>
  );
}

export function NavigationMenuPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        {['Home', 'Products', 'About'].map((t, i) => (
          <div key={i} style={{ fontSize: '12px', fontWeight: i === 0 ? 700 : 400, color: i === 0 ? 'var(--ld-semantic-color-text-brand-bold, #0053e2)' : 'var(--ld-semantic-color-text, #2E2F32)', borderBottom: i === 0 ? '2px solid var(--ld-semantic-color-action-fill-primary, #0053e2)' : 'none', paddingBottom: '4px' }}>{t}</div>
        ))}
      </div>
    </PreviewFrame>
  );
}

export function PaginationPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
        <div style={{ width: '24px', height: '24px', borderRadius: '4px', border: '1px solid var(--ld-semantic-color-border-subtle, #BABBBE)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: 'var(--ld-semantic-color-text-subtle, #74767C)' }}>&laquo;</div>
        {[1, 2, 3].map(n => (
          <div key={n} style={{ width: '24px', height: '24px', borderRadius: '4px', background: n === 1 ? 'var(--ld-semantic-color-fill-subtle, #F5F5F6)' : 'transparent', border: '1px solid var(--ld-semantic-color-border-subtle, #BABBBE)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: n === 1 ? 700 : 400, color: 'var(--ld-semantic-color-text, #2E2F32)' }}>{n}</div>
        ))}
        <div style={{ width: '24px', height: '24px', borderRadius: '4px', border: '1px solid var(--ld-semantic-color-border-subtle, #BABBBE)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: 'var(--ld-semantic-color-text-subtle, #74767C)' }}>&raquo;</div>
      </div>
    </PreviewFrame>
  );
}

export function PopoverPreview() {
  return (
    <PreviewFrame>
      <div style={{ position: 'relative' }}>
        <div style={{ borderRadius: '8px', padding: '8px 12px', background: 'white', boxShadow: 'var(--ld-semantic-elevation-200)', fontSize: '11px', color: 'var(--ld-semantic-color-text, #2E2F32)', width: '130px' }}>
          Popover content with details
        </div>
        <div style={{ position: 'absolute', bottom: '-5px', left: '50%', transform: 'translateX(-50%)', width: '10px', height: '5px', overflow: 'hidden' }}>
          <div style={{ width: '8px', height: '8px', background: 'white', transform: 'rotate(45deg)', position: 'absolute', top: '-4px', left: '1px', boxShadow: 'var(--ld-semantic-elevation-200)' }} />
        </div>
      </div>
    </PreviewFrame>
  );
}

export function ProgressPreview() {
  return (
    <PreviewFrame>
      <div style={{ width: '160px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ width: '100%', height: '8px', borderRadius: '4px', background: 'var(--ld-semantic-color-fill-subtle, #E2E2E3)', overflow: 'hidden' }}>
          <div style={{ width: '65%', height: '100%', borderRadius: '4px', background: 'var(--ld-semantic-color-action-fill-primary, #0053e2)' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px' }}>
          <span style={{ color: 'var(--ld-semantic-color-text, #2E2F32)' }}>Uploading...</span>
          <span style={{ color: 'var(--ld-semantic-color-text-subtle, #74767C)' }}>65%</span>
        </div>
      </div>
    </PreviewFrame>
  );
}

export function RadioGroupPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {['Option A', 'Option B', 'Option C'].map((label, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: i === 0 ? '5px solid var(--ld-semantic-color-action-fill-primary, #0053e2)' : '2px solid var(--ld-semantic-color-border-subtle, #BABBBE)', boxSizing: 'border-box' }} />
            <span style={{ fontSize: '12px', color: 'var(--ld-semantic-color-text, #2E2F32)' }}>{label}</span>
          </div>
        ))}
      </div>
    </PreviewFrame>
  );
}

export function ScrollAreaPreview() {
  return (
    <PreviewFrame>
      <div style={{ width: '140px', height: '64px', position: 'relative', border: '1px solid var(--ld-semantic-color-separator)', borderRadius: '6px', overflow: 'hidden' }}>
        <div style={{ padding: '6px 10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'].map((t, i) => (
            <div key={i} style={{ fontSize: '10px', color: 'var(--ld-semantic-color-text, #2E2F32)', whiteSpace: 'nowrap' }}>{t}</div>
          ))}
        </div>
        <div style={{ position: 'absolute', right: '2px', top: '4px', width: '4px', height: '24px', borderRadius: '2px', background: 'var(--ld-semantic-color-border-subtle, #BABBBE)', opacity: 0.6 }} />
      </div>
    </PreviewFrame>
  );
}

export function SeparatorPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '160px' }}>
        <span style={{ fontSize: '12px', color: 'var(--ld-semantic-color-text, #2E2F32)' }}>Left</span>
        <div style={{ flex: 1, height: '1px', background: 'var(--ld-semantic-color-separator)' }} />
        <span style={{ fontSize: '12px', color: 'var(--ld-semantic-color-text, #2E2F32)' }}>Right</span>
      </div>
    </PreviewFrame>
  );
}

export function SheetPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', width: '180px', height: '64px', borderRadius: '6px', overflow: 'hidden', background: 'rgba(0,0,0,0.1)' }}>
        <div style={{ flex: 1 }} />
        <div style={{ width: '80px', background: 'white', padding: '8px', boxShadow: 'var(--ld-semantic-elevation-300)', borderLeft: '1px solid var(--ld-semantic-color-separator)' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--ld-semantic-color-text, #2E2F32)', marginBottom: '4px' }}>Sheet</div>
          <div style={{ fontSize: '9px', color: 'var(--ld-semantic-color-text-subtle, #74767C)' }}>Side content</div>
        </div>
      </div>
    </PreviewFrame>
  );
}

export function SliderPreview() {
  return (
    <PreviewFrame>
      <div style={{ width: '160px', display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
        <div style={{ width: '100%', position: 'relative', height: '16px', display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '100%', height: '4px', borderRadius: '2px', background: 'var(--ld-semantic-color-fill-subtle, #E2E2E3)' }}>
            <div style={{ width: '60%', height: '100%', borderRadius: '2px', background: 'var(--ld-semantic-color-action-fill-primary, #0053e2)' }} />
          </div>
          <div style={{ position: 'absolute', left: '57%', top: '50%', transform: 'translate(-50%, -50%)', width: '14px', height: '14px', borderRadius: '50%', background: 'var(--ld-semantic-color-action-fill-primary, #0053e2)', border: '2px solid white', boxShadow: 'var(--ld-semantic-elevation-100)' }} />
        </div>
        <div style={{ fontSize: '10px', color: 'var(--ld-semantic-color-text-subtle, #74767C)' }}>Value: 60</div>
      </div>
    </PreviewFrame>
  );
}

export function SwitchPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {[{ on: true, label: 'Active' }, { on: false, label: 'Inactive' }].map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '36px', height: '20px', borderRadius: '10px', position: 'relative', background: s.on ? 'var(--ld-semantic-color-action-fill-primary, #0053e2)' : 'var(--ld-semantic-color-border-subtle, #BABBBE)' }}>
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: 'white', position: 'absolute', top: '2px', left: s.on ? '18px' : '2px' }} />
            </div>
            <span style={{ fontSize: '12px', color: 'var(--ld-semantic-color-text, #2E2F32)' }}>{s.label}</span>
          </div>
        ))}
      </div>
    </PreviewFrame>
  );
}

export function ToastPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'white', borderRadius: '8px', padding: '8px 12px', boxShadow: 'var(--ld-semantic-elevation-200)', border: '1px solid var(--ld-semantic-color-separator)', width: '170px' }}>
        <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: 'var(--ld-semantic-color-fill-positive, #2a8703)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Check style={{ width: 10, height: 10, color: 'white' }} />
        </div>
        <div>
          <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--ld-semantic-color-text, #2E2F32)' }}>Success</div>
          <div style={{ fontSize: '10px', color: 'var(--ld-semantic-color-text-subtle, #74767C)' }}>Changes saved</div>
        </div>
      </div>
    </PreviewFrame>
  );
}

export function TogglePreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', gap: '4px' }}>
        {[{ label: 'B', active: true }, { label: 'I', active: false }, { label: 'U', active: false }].map((t, i) => (
          <div key={i} style={{ width: '32px', height: '32px', borderRadius: '6px', border: '1px solid var(--ld-semantic-color-separator)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: t.active ? 700 : 400, background: t.active ? 'var(--ld-semantic-color-fill-subtle, #F5F5F6)' : 'white', color: 'var(--ld-semantic-color-text, #2E2F32)', fontStyle: t.label === 'I' ? 'italic' : 'normal', textDecoration: t.label === 'U' ? 'underline' : 'none' }}>{t.label}</div>
        ))}
      </div>
    </PreviewFrame>
  );
}

export function DateRangePickerPreview() {
  return (
    <PreviewFrame>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', border: '1px solid var(--ld-semantic-color-border-subtle, #BABBBE)', borderRadius: '4px', padding: '6px 12px', background: 'white' }}>
        <span style={{ fontSize: '12px', color: 'var(--ld-semantic-color-text, #2E2F32)' }}>Feb 1</span>
        <ArrowRight style={{ width: 12, height: 12, color: 'var(--ld-semantic-color-text-subtle, #74767C)' }} />
        <span style={{ fontSize: '12px', color: 'var(--ld-semantic-color-text, #2E2F32)' }}>Feb 18</span>
      </div>
    </PreviewFrame>
  );
}

export function CollapsiblePreview() {
  return (
    <PreviewFrame>
      <div style={{ width: '160px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 10px', borderRadius: '6px', background: 'var(--ld-semantic-color-fill-subtle, #F5F5F6)', fontSize: '12px', fontWeight: 600, color: 'var(--ld-semantic-color-text, #2E2F32)' }}>
          Click to toggle
          <ChevronDown style={{ width: 12, height: 12, color: 'var(--ld-semantic-color-text-subtle, #74767C)', transform: 'rotate(180deg)' }} />
        </div>
        <div style={{ padding: '6px 10px', fontSize: '10px', color: 'var(--ld-semantic-color-text-subtle, #74767C)', borderLeft: '2px solid var(--ld-semantic-color-separator)', marginLeft: '10px', marginTop: '4px' }}>
          Revealed content
        </div>
      </div>
    </PreviewFrame>
  );
}

export function DrawerPreview() {
  return <SheetPreview />;
}
