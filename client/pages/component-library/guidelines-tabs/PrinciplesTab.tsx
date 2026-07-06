import React from 'react';
import * as Icons from '@/components/icons';

export function PrinciplesTab() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingTop: '24px' }}>
      <div style={{
        backgroundColor: 'var(--ld-semantic-color-surface)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          color: 'var(--ld-semantic-color-text)',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            backgroundColor: 'var(--ld-semantic-color-fill-brand-subtle)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Icons.Check style={{ width: 20, height: 20, color: 'var(--ld-semantic-color-text-brand-bold)' }} />
          </div>
          Accessibility First
        </h3>
        <p style={{
          fontSize: '16px',
          lineHeight: '1.6',
          color: 'var(--ld-semantic-color-text-subtle)',
          marginBottom: '20px'
        }}>
          All components must meet WCAG 2.1 AA standards for accessibility compliance.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px'
        }}>
          {[
            { title: 'Color Contrast', desc: 'Minimum 4.5:1 ratio for text, 3:1 for UI components' },
            { title: 'Keyboard Navigation', desc: 'All interactive elements accessible via Tab, Enter, Space, Arrows' },
            { title: 'Screen Readers', desc: 'Proper ARIA labels, roles, and semantic HTML structure' },
            { title: 'Focus Indicators', desc: '2px visible outline using focus ring tokens' },
          ].map((item) => (
            <div key={item.title} style={{
              padding: '16px',
              backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
              borderRadius: '6px'
            }}>
              <div style={{ fontWeight: '700', marginBottom: '8px', fontSize: '14px' }}>
                {item.title}
              </div>
              <div style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--ld-semantic-color-text-subtle)' }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        backgroundColor: 'var(--ld-semantic-color-surface)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          color: 'var(--ld-semantic-color-text)',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            backgroundColor: 'var(--ld-semantic-color-fill-brand-subtle)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Icons.Grid style={{ width: 20, height: 20, color: 'var(--ld-semantic-color-text-brand-bold)' }} />
          </div>
          Consistency & Reusability
        </h3>
        <p style={{
          fontSize: '16px',
          lineHeight: '1.6',
          color: 'var(--ld-semantic-color-text-subtle)',
          marginBottom: '20px'
        }}>
          Always use existing components from the library. Check the component library before building anything new.
        </p>
        <div style={{
          padding: '16px',
          backgroundColor: 'var(--ld-semantic-color-fill-info-subtle)',
          borderRadius: '6px',
          borderLeft: '4px solid var(--ld-semantic-color-border-info)'
        }}>
          <div style={{ fontWeight: '700', marginBottom: '8px', fontSize: '14px' }}>
            Rule: Reuse &gt; Adapt &gt; Create
          </div>
          <div style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--ld-semantic-color-text-subtle)' }}>
            1. First, search for an existing component that matches your need<br />
            2. If close match, adapt existing component with props<br />
            3. Only create new components when truly unique functionality is needed
          </div>
        </div>
      </div>

      <div style={{
        backgroundColor: 'var(--ld-semantic-color-surface)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          color: 'var(--ld-semantic-color-text)',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            backgroundColor: 'var(--ld-semantic-color-fill-brand-subtle)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Icons.Gear style={{ width: 20, height: 20, color: 'var(--ld-semantic-color-text-brand-bold)' }} />
          </div>
          Responsive Design
        </h3>
        <p style={{
          fontSize: '16px',
          lineHeight: '1.6',
          color: 'var(--ld-semantic-color-text-subtle)'
        }}>
          Components should work across all device sizes. Use responsive tokens and breakpoints,
          not hard-coded pixel values.
        </p>
      </div>
    </div>
  );
}
