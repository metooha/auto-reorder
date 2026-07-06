import React from 'react';

export function CodeStandardsTab() {
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
          marginBottom: '24px'
        }}>
          Import Conventions
        </h3>
        <div style={{
          backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
          padding: '20px',
          borderRadius: '6px',
          fontFamily: 'var(--ld-semantic-font-family-mono)',
          fontSize: '13px',
          lineHeight: '1.8',
          marginBottom: '16px'
        }}>
          <div style={{ color: 'var(--ld-semantic-color-text-positive)', marginBottom: '4px' }}>
            // ✅ CORRECT - Import from uppercase path
          </div>
          <div style={{ color: 'var(--ld-semantic-color-text)' }}>
            import &#123; Button &#125; from '@/components/ui/Button';
          </div>
          <div style={{ color: 'var(--ld-semantic-color-text)' }}>
            import &#123; TextField &#125; from '@/components/ui/TextField';
          </div>
          <br />
          <div style={{ color: 'var(--ld-semantic-color-text-negative)', marginBottom: '4px' }}>
            // ❌ WRONG - Deprecated lowercase imports
          </div>
          <div style={{ color: 'var(--ld-semantic-color-text-subtlest)', textDecoration: 'line-through' }}>
            import &#123; Button &#125; from '@/components/ui/button';
          </div>
          <div style={{ color: 'var(--ld-semantic-color-text-subtlest)', textDecoration: 'line-through' }}>
            import &#123; Input &#125; from '@/components/ui/input';
          </div>
        </div>
        <p style={{
          fontSize: '14px',
          lineHeight: '1.6',
          color: 'var(--ld-semantic-color-text-subtle)',
          padding: '16px',
          backgroundColor: 'var(--ld-semantic-color-fill-info-subtle)',
          borderRadius: '6px',
          borderLeft: '4px solid var(--ld-semantic-color-border-info)'
        }}>
          <strong>Note:</strong> Living Design 3.5 components use uppercase filenames (Button.tsx, TextField.tsx).
          Shadcn/radix components use lowercase (popover.tsx, dialog.tsx).
        </p>
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
          marginBottom: '24px'
        }}>
          Component Props Best Practices
        </h3>
        <div style={{
          backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
          padding: '20px',
          borderRadius: '6px',
          fontFamily: 'var(--ld-semantic-font-family-mono)',
          fontSize: '13px',
          lineHeight: '1.8',
          marginBottom: '16px'
        }}>
          <div style={{ color: 'var(--ld-semantic-color-text-positive)', marginBottom: '4px' }}>
            // ✅ CORRECT - Use semantic props
          </div>
          <div style={{ color: 'var(--ld-semantic-color-text)' }}>
            &lt;Button variant="primary" size="medium"&gt;
          </div>
          <div style={{ color: 'var(--ld-semantic-color-text)' }}>
            &nbsp;&nbsp;Click me
          </div>
          <div style={{ color: 'var(--ld-semantic-color-text)' }}>
            &lt;/Button&gt;
          </div>
          <br />
          <div style={{ color: 'var(--ld-semantic-color-text)' }}>
            &lt;TextField
          </div>
          <div style={{ color: 'var(--ld-semantic-color-text)' }}>
            &nbsp;&nbsp;label="Email"
          </div>
          <div style={{ color: 'var(--ld-semantic-color-text)' }}>
            &nbsp;&nbsp;error=&#123;emailError&#125;
          </div>
          <div style={{ color: 'var(--ld-semantic-color-text)' }}>
            &nbsp;&nbsp;helperText="We'll never share your email"
          </div>
          <div style={{ color: 'var(--ld-semantic-color-text)' }}>
            /&gt;
          </div>
          <br />
          <div style={{ color: 'var(--ld-semantic-color-text-negative)', marginBottom: '4px' }}>
            // ❌ WRONG - Don't override with inline styles
          </div>
          <div style={{ color: 'var(--ld-semantic-color-text-subtlest)', textDecoration: 'line-through' }}>
            &lt;Button style=&#123;&#123; backgroundColor: '#0071DC' &#125;&#125;&gt;
          </div>
          <div style={{ color: 'var(--ld-semantic-color-text-subtlest)', textDecoration: 'line-through' }}>
            &nbsp;&nbsp;Click me
          </div>
          <div style={{ color: 'var(--ld-semantic-color-text-subtlest)', textDecoration: 'line-through' }}>
            &lt;/Button&gt;
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
          marginBottom: '24px'
        }}>
          Layout Patterns
        </h3>
        <div style={{ fontSize: '14px', lineHeight: '1.8', color: 'var(--ld-semantic-color-text-subtle)' }}>
          <div style={{ marginBottom: '16px' }}>
            <strong style={{ color: 'var(--ld-semantic-color-text)' }}>Forms</strong><br />
            Use 16px gap between form fields per LD 3.5 spec. Stack fields vertically with consistent spacing.
          </div>
          <div style={{ marginBottom: '16px' }}>
            <strong style={{ color: 'var(--ld-semantic-color-text)' }}>Button Groups</strong><br />
            Always use ButtonGroup component for multiple buttons. Ensures proper spacing and alignment.
          </div>
          <div>
            <strong style={{ color: 'var(--ld-semantic-color-text)' }}>Cards</strong><br />
            Use elevation (box-shadow), not borders. Default to elevation-100 for standard cards.
          </div>
        </div>
      </div>
    </div>
  );
}
