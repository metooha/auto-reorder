import * as React from 'react';
import { Menu } from '@/components/ui/Menu';
import { MenuItem } from '@/components/ui/MenuItem';
import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';
import * as Icons from '@/components/icons';

/**
 * Example component demonstrating Menu usage with Living Design 3.5
 */
export const MenuExample: React.FC = () => {
  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
      
      {/* Basic Menu with Icons */}
      <section>
        <h2 style={{ 
          marginBottom: '8px', 
          fontSize: '20px', 
          fontWeight: 700,
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text)'
        }}>
          Basic Menu with Icons
        </h2>
        <p style={{ 
          marginBottom: '16px', 
          fontSize: '14px', 
          color: 'var(--ld-semantic-color-text-subtle)',
          fontFamily: 'var(--ld-semantic-font-family-sans)'
        }}>
          Menu items with leading icons. Each item uses LD 3.5 semantic tokens for padding (4px 8px), gap (4px), and small icon size (16x16).
        </p>
        <div style={{ position: 'relative', height: '140px' }}>
          <Menu isOpen={true} onClose={() => {}}>
            <MenuItem leadingIcon={<Icons.Edit />}>
              Edit
            </MenuItem>
            <MenuItem leadingIcon={<Icons.Plus />}>
              Duplicate
            </MenuItem>
            <MenuItem leadingIcon={<Icons.Trash />}>
              Delete
            </MenuItem>
          </Menu>
        </div>
      </section>

      {/* Menu with Selected State */}
      <section>
        <h2 style={{ 
          marginBottom: '8px', 
          fontSize: '20px', 
          fontWeight: 700,
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text)'
        }}>
          Menu with Selected State
        </h2>
        <p style={{ 
          marginBottom: '16px', 
          fontSize: '14px', 
          color: 'var(--ld-semantic-color-text-subtle)',
          fontFamily: 'var(--ld-semantic-font-family-sans)'
        }}>
          Menu item in selected state shows active background color using LD 3.5 semantic tokens.
        </p>
        <div style={{ position: 'relative', height: '140px' }}>
          <Menu isOpen={true} onClose={() => {}}>
            <MenuItem leadingIcon={<Icons.Check />} selected>
              All Campaigns
            </MenuItem>
            <MenuItem>
              Active Only
            </MenuItem>
            <MenuItem>
              Paused Only
            </MenuItem>
          </Menu>
        </div>
      </section>

      {/* Menu with Disabled Items */}
      <section>
        <h2 style={{ 
          marginBottom: '8px', 
          fontSize: '20px', 
          fontWeight: 700,
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text)'
        }}>
          Menu with Disabled Items
        </h2>
        <p style={{ 
          marginBottom: '16px', 
          fontSize: '14px', 
          color: 'var(--ld-semantic-color-text-subtle)',
          fontFamily: 'var(--ld-semantic-font-family-sans)'
        }}>
          Disabled menu items use LD 3.5 disabled text color and cannot be interacted with.
        </p>
        <div style={{ position: 'relative', height: '160px' }}>
          <Menu isOpen={true} onClose={() => {}}>
            <MenuItem leadingIcon={<Icons.Download />}>
              Save
            </MenuItem>
            <MenuItem leadingIcon={<Icons.Upload />} disabled>
              Export (unavailable)
            </MenuItem>
            <MenuItem leadingIcon={<Icons.Printer />}>
              Print
            </MenuItem>
            <MenuItem leadingIcon={<Icons.Download />}>
              Download
            </MenuItem>
          </Menu>
        </div>
      </section>

      {/* Menu with Footer */}
      <section>
        <h2 style={{ 
          marginBottom: '8px', 
          fontSize: '20px', 
          fontWeight: 700,
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text)'
        }}>
          Menu with Footer (Custom Extension)
        </h2>
        <p style={{ 
          marginBottom: '16px', 
          fontSize: '14px', 
          color: 'var(--ld-semantic-color-text-subtle)',
          fontFamily: 'var(--ld-semantic-font-family-sans)'
        }}>
          Menu can include a footer section with action buttons. This is a custom extension beyond the base LD 3.5 spec, useful for filter menus.
        </p>
        <div style={{ position: 'relative', height: '200px' }}>
          <Menu
            isOpen={true}
            onClose={() => {}}
            footer={
              <ButtonGroup>
                <Button variant="secondary" size="small">Cancel</Button>
                <Button variant="primary" size="small">Apply</Button>
              </ButtonGroup>
            }
          >
            <MenuItem leadingIcon={<Icons.Filter />}>
              Filter by date
            </MenuItem>
            <MenuItem leadingIcon={<Icons.SortingArrows />}>
              Sort by name
            </MenuItem>
            <MenuItem leadingIcon={<Icons.Sliders />}>
              Advanced options
            </MenuItem>
          </Menu>
        </div>
      </section>

      {/* Menu Variants (2-7 actions) */}
      <section>
        <h2 style={{ 
          marginBottom: '8px', 
          fontSize: '20px', 
          fontWeight: 700,
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text)'
        }}>
          Menu Variants (2-7 Actions)
        </h2>
        <p style={{ 
          marginBottom: '16px', 
          fontSize: '14px', 
          color: 'var(--ld-semantic-color-text-subtle)',
          fontFamily: 'var(--ld-semantic-font-family-sans)'
        }}>
          According to LD 3.5 Figma spec, Menu supports 2-7 action items. Here are examples of different sizes.
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
          {/* 2 Actions */}
          <div>
            <h3 style={{ 
              marginBottom: '12px', 
              fontSize: '16px', 
              fontWeight: 600,
              fontFamily: 'var(--ld-semantic-font-family-sans)',
              color: 'var(--ld-semantic-color-text)'
            }}>
              2 Actions
            </h3>
            <div style={{ position: 'relative', height: '100px' }}>
              <Menu isOpen={true} onClose={() => {}}>
                <MenuItem leadingIcon={<Icons.Edit />}>Edit</MenuItem>
                <MenuItem leadingIcon={<Icons.Trash />}>Delete</MenuItem>
              </Menu>
            </div>
          </div>

          {/* 3 Actions */}
          <div>
            <h3 style={{ 
              marginBottom: '12px', 
              fontSize: '16px', 
              fontWeight: 600,
              fontFamily: 'var(--ld-semantic-font-family-sans)',
              color: 'var(--ld-semantic-color-text)'
            }}>
              3 Actions
            </h3>
            <div style={{ position: 'relative', height: '120px' }}>
              <Menu isOpen={true} onClose={() => {}}>
                <MenuItem leadingIcon={<Icons.Edit />}>Edit</MenuItem>
                <MenuItem leadingIcon={<Icons.Plus />}>Duplicate</MenuItem>
                <MenuItem leadingIcon={<Icons.Trash />}>Delete</MenuItem>
              </Menu>
            </div>
          </div>

          {/* 5 Actions */}
          <div>
            <h3 style={{ 
              marginBottom: '12px', 
              fontSize: '16px', 
              fontWeight: 600,
              fontFamily: 'var(--ld-semantic-font-family-sans)',
              color: 'var(--ld-semantic-color-text)'
            }}>
              5 Actions
            </h3>
            <div style={{ position: 'relative', height: '180px' }}>
              <Menu isOpen={true} onClose={() => {}}>
                <MenuItem leadingIcon={<Icons.Eye />}>View</MenuItem>
                <MenuItem leadingIcon={<Icons.Edit />}>Edit</MenuItem>
                <MenuItem leadingIcon={<Icons.Plus />}>Duplicate</MenuItem>
                <MenuItem leadingIcon={<Icons.Download />}>Download</MenuItem>
                <MenuItem leadingIcon={<Icons.Trash />}>Delete</MenuItem>
              </Menu>
            </div>
          </div>
        </div>
      </section>

      {/* Props Documentation */}
      <section>
        <h2 style={{ 
          marginBottom: '16px', 
          fontSize: '20px', 
          fontWeight: 700,
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text)'
        }}>
          Menu Props
        </h2>
        <div style={{
          backgroundColor: 'var(--ld-semantic-color-surface)',
          borderRadius: 'var(--ld-primitive-scale-border-radius-100)',
          padding: '24px',
          border: '1px solid var(--ld-semantic-color-border-subtlest)'
        }}>
          <div style={{ display: 'grid', gap: '12px', fontSize: '14px', fontFamily: 'var(--ld-semantic-font-family-sans)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: '8px', padding: '8px', borderBottom: '1px solid var(--ld-semantic-color-border-subtlest)' }}>
              <strong>isOpen</strong>
              <span>boolean - Controls menu visibility</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: '8px', padding: '8px', borderBottom: '1px solid var(--ld-semantic-color-border-subtlest)' }}>
              <strong>onClose</strong>
              <span>function - Called when menu should close (Escape key)</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: '8px', padding: '8px', borderBottom: '1px solid var(--ld-semantic-color-border-subtlest)' }}>
              <strong>position</strong>
              <span>'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight'</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: '8px', padding: '8px' }}>
              <strong>footer</strong>
              <span>ReactNode - Optional footer content</span>
            </div>
          </div>
        </div>
      </section>

      {/* MenuItem Props Documentation */}
      <section>
        <h2 style={{ 
          marginBottom: '16px', 
          fontSize: '20px', 
          fontWeight: 700,
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text)'
        }}>
          MenuItem Props
        </h2>
        <div style={{
          backgroundColor: 'var(--ld-semantic-color-surface)',
          borderRadius: 'var(--ld-primitive-scale-border-radius-100)',
          padding: '24px',
          border: '1px solid var(--ld-semantic-color-border-subtlest)'
        }}>
          <div style={{ display: 'grid', gap: '12px', fontSize: '14px', fontFamily: 'var(--ld-semantic-font-family-sans)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: '8px', padding: '8px', borderBottom: '1px solid var(--ld-semantic-color-border-subtlest)' }}>
              <strong>leadingIcon</strong>
              <span>ReactNode - Icon displayed before text</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: '8px', padding: '8px', borderBottom: '1px solid var(--ld-semantic-color-border-subtlest)' }}>
              <strong>selected</strong>
              <span>boolean - Highlights item as selected</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: '8px', padding: '8px', borderBottom: '1px solid var(--ld-semantic-color-border-subtlest)' }}>
              <strong>disabled</strong>
              <span>boolean - Disables interaction</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: '8px', padding: '8px' }}>
              <strong>onClick</strong>
              <span>function - Click handler</span>
            </div>
          </div>

          <div style={{ 
            marginTop: '24px', 
            padding: '16px', 
            backgroundColor: 'var(--ld-semantic-color-surface-informational)',
            borderRadius: 'var(--ld-primitive-scale-border-radius-100)',
            fontSize: '14px',
            fontFamily: 'var(--ld-semantic-font-family-sans)'
          }}>
            <strong>Keyboard Navigation:</strong> Arrow keys to navigate items, Escape to close, Home/End to jump to first/last item.
          </div>

          <div style={{ 
            marginTop: '12px', 
            padding: '16px', 
            backgroundColor: 'var(--ld-semantic-color-surface-informational)',
            borderRadius: 'var(--ld-primitive-scale-border-radius-100)',
            fontSize: '14px',
            fontFamily: 'var(--ld-semantic-font-family-sans)'
          }}>
            <strong>LD 3.5 Documentation:</strong>{' '}
            <a 
              href="https://digitaltoolkit.livingdesign.walmart.com/components/menu/" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: 'var(--ld-semantic-color-action-text-link)', textDecoration: 'underline' }}
            >
              View in Digital Toolkit
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
