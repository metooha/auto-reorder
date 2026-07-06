import * as React from 'react';
import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';
import { WCPButtonGroup } from '@/components/ui/WCPButtonGroup';
import { Plus, ChevronRight, Download, Trash } from '@/components/icons';

/**
 * Example component demonstrating Button usage with Living Design 3.5
 * ✅ Uses icons from centralized icon library
 */
export const ButtonExample: React.FC = () => {
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          Button Variants
        </h2>
        <ButtonGroup>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="tertiary">Tertiary</Button>
          <Button variant="destructive">Destructive</Button>
        </ButtonGroup>
      </section>

      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          Primary Alt — Membership (Walmart+)
        </h2>
        <p style={{ marginBottom: '16px', fontSize: '14px', color: 'var(--ld-semantic-color-text-subtle)', lineHeight: 1.5 }}>
          Use <code style={{ fontFamily: 'var(--ld-semantic-font-family-mono)', fontSize: '13px', backgroundColor: 'var(--ld-semantic-color-fill-subtle)', padding: '2px 6px', borderRadius: '4px' }}>variant="primary-alt"</code> for Walmart+ membership CTAs. Gold fill, navy text.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '13px', color: 'var(--ld-semantic-color-text-subtle)' }}>Sizes</p>
            <ButtonGroup>
              <Button variant="primary-alt" size="small">Button label</Button>
              <Button variant="primary-alt" size="medium">Button label</Button>
              <Button variant="primary-alt" size="large">Button label</Button>
            </ButtonGroup>
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '13px', color: 'var(--ld-semantic-color-text-subtle)' }}>States</p>
            <ButtonGroup>
              <Button variant="primary-alt" size="medium">Default</Button>
              <Button variant="primary-alt" size="medium" disabled>Disabled</Button>
              <Button variant="primary-alt" size="medium" isLoading>Loading</Button>
            </ButtonGroup>
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '13px', color: 'var(--ld-semantic-color-text-subtle)' }}>With leading icon</p>
            <ButtonGroup>
              <Button variant="primary-alt" size="small" leading={<Plus style={{ width: 16, height: 16 }} />}>Join Walmart+</Button>
              <Button variant="primary-alt" size="medium" leading={<Plus style={{ width: 20, height: 20 }} />}>Join Walmart+</Button>
              <Button variant="primary-alt" size="large" leading={<Plus style={{ width: 24, height: 24 }} />}>Join Walmart+</Button>
            </ButtonGroup>
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '13px', color: 'var(--ld-semantic-color-text-subtle)' }}>Full width</p>
            <div style={{ maxWidth: '400px', width: '100%' }}>
              <Button variant="primary-alt" size="large" isFullWidth>Start free trial</Button>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          Button Sizes
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
          <ButtonGroup>
            <Button variant="primary" size="small">Small</Button>
            <Button variant="primary" size="medium">Medium</Button>
            <Button variant="primary" size="large">Large</Button>
          </ButtonGroup>
        </div>
      </section>

      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          Buttons with Icons
        </h2>
        <ButtonGroup>
          <Button
            variant="primary"
            leading={<Plus style={{ width: 20, height: 20 }} />}
          >
            Add Item
          </Button>
          <Button
            variant="secondary"
            trailing={<ChevronRight style={{ width: 20, height: 20 }} />}
          >
            Next
          </Button>
          <Button
            variant="tertiary"
            leading={<Download style={{ width: 20, height: 20 }} />}
          >
            Download
          </Button>
        </ButtonGroup>
      </section>

      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          Disabled State
        </h2>
        <ButtonGroup>
          <Button variant="primary" disabled>Primary Disabled</Button>
          <Button variant="secondary" disabled>Secondary Disabled</Button>
          <Button variant="tertiary" disabled>Tertiary Disabled</Button>
        </ButtonGroup>
      </section>

      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          Full Width Buttons
        </h2>
        <div style={{ maxWidth: '400px' }}>
          <Button variant="primary" size="large" isFullWidth>
            Full Width Primary
          </Button>
        </div>
      </section>

      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          Button as Link
        </h2>
        <ButtonGroup>
          <Button href="https://www.walmart.com" variant="primary" target="_blank">
            Visit Walmart
          </Button>
          <Button href="#section" variant="secondary">
            Jump to Section
          </Button>
          <Button href="/help" variant="tertiary">
            Get Help
          </Button>
        </ButtonGroup>
      </section>

      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          Loading State
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>All variants (large)</p>
            <ButtonGroup>
              <Button variant="primary" size="large" isLoading>Primary</Button>
              <Button variant="secondary" size="large" isLoading>Secondary</Button>
              <Button variant="tertiary" size="large" isLoading>Tertiary</Button>
              <Button variant="destructive" size="large" isLoading>Destructive</Button>
            </ButtonGroup>
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>All sizes (primary)</p>
            <ButtonGroup>
              <Button variant="primary" size="small" isLoading>Small</Button>
              <Button variant="primary" size="medium" isLoading>Medium</Button>
              <Button variant="primary" size="large" isLoading>Large</Button>
            </ButtonGroup>
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Interactive — click to toggle loading</p>
            <ButtonGroup>
              <Button variant="tertiary" type="button" onClick={() => setLoading(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                type="button"
                isLoading={loading}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </section>

      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          Form Actions
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          style={{ maxWidth: '400px' }}
        >
          <div style={{ marginBottom: '16px' }}>
            <input
              type="text"
              placeholder="Enter your name"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d9d9d9',
                borderRadius: '4px',
                fontSize: '16px',
              }}
            />
          </div>
          <ButtonGroup>
            <Button variant="tertiary" type="button">
              Cancel
            </Button>
            <Button variant="primary" type="submit" isLoading={loading}>
              Submit
            </Button>
          </ButtonGroup>
        </form>
      </section>

      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          WCP Button Group — Inline Patterns
        </h2>
        <p style={{ marginBottom: '16px', fontSize: '14px', color: 'var(--ld-semantic-color-text-subtle)', lineHeight: 1.5 }}>
          Standard WCP button group combinations for side-by-side actions. Use <strong>Preferred</strong> for the primary CTA and <strong>Alternate</strong> for the secondary action.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '440px' }}>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '13px', color: 'var(--ld-semantic-color-text-subtle)', fontWeight: 600 }}>Primary + Secondary (full width)</p>
            <WCPButtonGroup
              layout="inline"
              pattern="primary-secondary"
              preferredLabel="Preferred"
              alternateLabel="Alternate"
              fullWidth
            />
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '13px', color: 'var(--ld-semantic-color-text-subtle)', fontWeight: 600 }}>Primary + Secondary (auto width)</p>
            <WCPButtonGroup
              layout="inline"
              pattern="primary-secondary"
              preferredLabel="Preferred"
              alternateLabel="Alternate"
              fullWidth={false}
            />
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '13px', color: 'var(--ld-semantic-color-text-subtle)', fontWeight: 600 }}>Primary + Tertiary (link left, primary right)</p>
            <WCPButtonGroup
              layout="inline"
              pattern="primary-tertiary"
              preferredLabel="Preferred"
              alternateLabel="Alternate"
              preferredRight
            />
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '13px', color: 'var(--ld-semantic-color-text-subtle)', fontWeight: 600 }}>Secondary + Tertiary (link left, secondary right)</p>
            <WCPButtonGroup
              layout="inline"
              pattern="secondary-tertiary"
              preferredLabel="Preferred"
              alternateLabel="Alternate"
              preferredRight
            />
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '13px', color: 'var(--ld-semantic-color-text-subtle)', fontWeight: 600 }}>Secondary + Tertiary (secondary left, link right)</p>
            <WCPButtonGroup
              layout="inline"
              pattern="secondary-tertiary"
              preferredLabel="Preferred"
              alternateLabel="Alternate"
              preferredRight={false}
            />
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '13px', color: 'var(--ld-semantic-color-text-subtle)', fontWeight: 600 }}>Tertiary + Tertiary (centered)</p>
            <WCPButtonGroup
              layout="inline"
              pattern="tertiary-tertiary"
              preferredLabel="Preferred"
              alternateLabel="Alternate"
              fullWidth
            />
          </div>
        </div>
      </section>

      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          WCP Button Group — Stacked Patterns
        </h2>
        <p style={{ marginBottom: '16px', fontSize: '14px', color: 'var(--ld-semantic-color-text-subtle)', lineHeight: 1.5 }}>
          Vertically stacked button groups where all buttons expand to full width. Preferred action always appears on top.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '343px' }}>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '13px', color: 'var(--ld-semantic-color-text-subtle)', fontWeight: 600 }}>Primary + Secondary</p>
            <WCPButtonGroup
              layout="stacked"
              pattern="primary-secondary"
              preferredLabel="Preferred"
              alternateLabel="Alternate"
            />
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '13px', color: 'var(--ld-semantic-color-text-subtle)', fontWeight: 600 }}>Primary + Tertiary</p>
            <WCPButtonGroup
              layout="stacked"
              pattern="primary-tertiary"
              preferredLabel="Preferred"
              alternateLabel="Alternate"
            />
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '13px', color: 'var(--ld-semantic-color-text-subtle)', fontWeight: 600 }}>Secondary + Tertiary</p>
            <WCPButtonGroup
              layout="stacked"
              pattern="secondary-tertiary"
              preferredLabel="Preferred"
              alternateLabel="Alternate"
            />
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '13px', color: 'var(--ld-semantic-color-text-subtle)', fontWeight: 600 }}>Three Options (Primary + Secondary inline, link below)</p>
            <WCPButtonGroup
              layout="stacked"
              pattern="three-options"
              preferredLabel="Preferred"
              alternateLabel="Alternate"
              thirdLabel="Alternate"
            />
          </div>
        </div>
      </section>

      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          With Sub-label
        </h2>
        <p style={{ marginBottom: '16px', fontSize: '14px', color: 'var(--ld-semantic-color-text-subtle)', lineHeight: 1.5 }}>
          Use <code style={{ fontFamily: 'var(--ld-semantic-font-family-mono)', fontSize: '13px', backgroundColor: 'var(--ld-semantic-color-fill-subtle)', padding: '2px 6px', borderRadius: '4px' }}>subLabel</code> for a secondary caption line below the main label.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '13px', color: 'var(--ld-semantic-color-text-subtle)' }}>All sizes (secondary)</p>
            <ButtonGroup>
              <Button variant="secondary" size="small" subLabel="sub-label">Button label</Button>
              <Button variant="secondary" size="medium" subLabel="sub-label">Button label</Button>
              <Button variant="secondary" size="large" subLabel="sub-label">Button label</Button>
            </ButtonGroup>
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '13px', color: 'var(--ld-semantic-color-text-subtle)' }}>All variants (medium)</p>
            <ButtonGroup>
              <Button variant="primary" size="medium" subLabel="sub-label">Button label</Button>
              <Button variant="secondary" size="medium" subLabel="sub-label">Button label</Button>
              <Button variant="tertiary" size="medium" subLabel="sub-label">Button label</Button>
              <Button variant="destructive" size="medium" subLabel="sub-label">Button label</Button>
            </ButtonGroup>
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '13px', color: 'var(--ld-semantic-color-text-subtle)' }}>Disabled</p>
            <ButtonGroup>
              <Button variant="secondary" size="small" subLabel="sub-label" disabled>Button label</Button>
              <Button variant="secondary" size="medium" subLabel="sub-label" disabled>Button label</Button>
              <Button variant="secondary" size="large" subLabel="sub-label" disabled>Button label</Button>
            </ButtonGroup>
          </div>
        </div>
      </section>

      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          Animated Stroke (<code style={{ fontFamily: 'var(--ld-semantic-font-family-mono)', fontSize: '16px' }}>strokeOn</code>)
        </h2>
        <p style={{ marginBottom: '16px', fontSize: '14px', color: 'var(--ld-semantic-color-text-subtle)', lineHeight: 1.5 }}>
          A rotating conic-gradient glow stroke orbits the button border. Automatically disabled under <code style={{ fontFamily: 'var(--ld-semantic-font-family-mono)', fontSize: '13px', backgroundColor: 'var(--ld-semantic-color-fill-subtle)', padding: '2px 6px', borderRadius: '4px' }}>prefers-reduced-motion</code>.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '13px', color: 'var(--ld-semantic-color-text-subtle)' }}>Primary (medium)</p>
            <Button variant="primary" size="medium" strokeOn>Save changes</Button>
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '13px', color: 'var(--ld-semantic-color-text-subtle)' }}>All variants</p>
            <ButtonGroup>
              <Button variant="primary" strokeOn>Primary</Button>
              <Button variant="secondary" strokeOn>Secondary</Button>
              <Button variant="tertiary" strokeOn>Tertiary</Button>
            </ButtonGroup>
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '13px', color: 'var(--ld-semantic-color-text-subtle)' }}>All sizes (primary)</p>
            <ButtonGroup>
              <Button variant="primary" size="small" strokeOn>Small</Button>
              <Button variant="primary" size="medium" strokeOn>Medium</Button>
              <Button variant="primary" size="large" strokeOn>Large</Button>
            </ButtonGroup>
          </div>
        </div>
      </section>

      <section>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 700 }}>
          Destructive Actions
        </h2>
        <ButtonGroup>
          <Button variant="secondary">Keep Item</Button>
          <Button
            variant="destructive"
            leading={<Trash style={{ width: 20, height: 20 }} />}
          >
            Delete Permanently
          </Button>
        </ButtonGroup>
      </section>
    </div>
  );
};
