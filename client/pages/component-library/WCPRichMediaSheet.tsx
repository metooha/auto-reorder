import React, { useState } from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import {
  WCPRichMediaSheet,
  WCPRichMediaSheetHeaderVariant,
  WCPRichMediaSheetSurfaceVariant,
} from '@/components/walmart/WCPRichMediaSheet';
import { Button } from '@/components/ui/Button';
import styles from './WCPRichMediaSheet.module.css';

// ── Demo Data ─────────────────────────────────────────────────────────────

const HEADER_VARIANTS: { label: string; value: WCPRichMediaSheetHeaderVariant; desc: string }[] = [
  { value: 'title', label: 'Title', desc: '1-line centered title + drag handle + close' },
  { value: 'title-subtitle', label: 'Title + Subtitle', desc: '2-line title + subtitle + divider' },
  { value: 'logo-left', label: 'Logo Left', desc: 'Left-aligned logo/image slot' },
  { value: 'logo-center', label: 'Logo Center', desc: 'Centered logo/image slot' },
  { value: 'inverse', label: 'Inverse', desc: 'Brand-blue background, white text' },
  { value: 'none', label: 'No Title', desc: 'Only close button in corner' },
];

const SURFACE_VARIANTS: { label: string; value: WCPRichMediaSheetSurfaceVariant; desc: string }[] = [
  { value: 'default', label: 'Default', desc: 'White surface overlay' },
  { value: 'brand', label: 'Brand', desc: 'Light brand-blue (#F0F5FF)' },
  { value: 'brand-bold', label: 'Brand Bold', desc: 'Full brand-blue — chrome auto-inverts to white' },
  { value: 'media', label: 'Media', desc: 'Content provides full-bleed color' },
];

// ── Sub-components ────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className={styles.sectionTitle}>{children}</h2>;
}

function SectionDesc({ children }: { children: React.ReactNode }) {
  return <p className={styles.sectionDesc}>{children}</p>;
}

function DemoCard({ title, children, note }: { title: string; children: React.ReactNode; note?: string }) {
  return (
    <div className={styles.demoCard}>
      <div className={styles.cardLabel}>{title}</div>
      {note && <p className={styles.cardNote}>{note}</p>}
      <div className={styles.cardContent}>{children}</div>
    </div>
  );
}

// ── Demo Content Blocks ───────────────────────────────────────────────────

function DefaultContent() {
  return (
    <div className={styles.demoContent}>
      <div className={styles.contentSlotPlaceholder}>
        <span className={styles.contentSlotLabel}>Content slot</span>
      </div>
    </div>
  );
}

function BankingContent() {
  return (
    <div>
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/deb2fc1a186ad6487f32c1a18f1c3b11914a89f4?width=750"
        alt="ONE Banking hero"
        className={styles.heroImage}
      />
      <div className={styles.bankingBody}>
        <h3 className={styles.bankingHeading}>Banking, simplified</h3>
        <Button variant="primary" size="large" isFullWidth>
          Get Started
        </Button>
        <p className={styles.bankingLink}>Manually enter information instead</p>
        <p className={styles.bankingLegal}>
          By selecting "Get started." I authorize Walmart to share the ONE application information from my Walmart account if available.
        </p>
        <hr className={styles.divider} />
        <div className={styles.benefitsList}>
          {['10% cash back at Walmart on your first purchase.', 'Early paydays with eligible direct deposit.', '5.00% APY on your Savings.'].map((item) => (
            <div key={item} className={styles.benefitItem}>
              <span className={styles.checkmark}>✓</span>
              <span className={styles.benefitText}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function OnePayContent() {
  return (
    <div>
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/aa9f4345ab72c0778b9e02c9303229ef8fbe663f?width=750"
        alt="OnePay hero"
        className={styles.heroImageTall}
      />
      <div className={styles.bankingBody}>
        <h3 className={styles.bankingHeadingLarge}>One Pay is the best way to shop at Walmart</h3>
        <div className={styles.benefitsList}>
          {[
            'Load any debit or credit cards into One Pay',
            'Use One Pay at checkout online or in store',
            'Earn cash back deals every day you shop',
          ].map((item) => (
            <div key={item} className={styles.benefitItem}>
              <span className={styles.checkmark}>✓</span>
              <span className={styles.benefitText}>{item}</span>
            </div>
          ))}
        </div>
        <p className={styles.bankingLegal}>
          By continuing, you authorize Walmart to share your profile information with One to apply for an account. Review Privacy Policies and Terms of Service.
        </p>
      </div>
    </div>
  );
}

function DeliveryContent() {
  return (
    <div className={styles.deliveryContent}>
      <h3 className={styles.deliveryHeading}>Great news! We expanded delivery to your area.</h3>
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/8fb836f3d6344082a725a2ccca96fa3de52f451d?width=654"
        alt="Delivery illustration"
        className={styles.deliveryImage}
      />
      <div className={styles.wPlusCard}>
        <div className={styles.wPlusCardRow}>
          <div className={styles.wPlusLogo}>w+</div>
          <div>
            <p className={styles.wPlusTitle}>You can get free delivery with Walmart+</p>
            <p className={styles.wPlusLink}>Start your 30-day free trial</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkTaskContent() {
  return (
    <div className={styles.taskContent}>
      <h4 className={styles.taskLabel}>Up next</h4>
      <div className={styles.taskCard}>
        <div className={styles.taskCardHeader}>
          <div>
            <p className={styles.taskGoal}>Stock grocery</p>
            <p className={styles.taskTitle}>Stock aisle A5</p>
          </div>
          <span className={styles.taskTag}>Planned</span>
        </div>
        <p className={styles.taskDetail}>⏱ 3h 44m (313 cases)</p>
        <p className={styles.taskDetail}>👤 Bethany Case</p>
        <Button variant="primary" size="medium" isFullWidth>
          View Details
        </Button>
      </div>
      <p className={styles.taskBackLink}>Back to my actions</p>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────

export default function WCPRichMediaSheetPage() {
  const [openDemo, setOpenDemo] = useState<string | null>(null);
  const [activeHeader, setActiveHeader] = useState<WCPRichMediaSheetHeaderVariant>('title');
  const [activeSurface, setActiveSurface] = useState<WCPRichMediaSheetSurfaceVariant>('default');

  const openSheet = (id: string) => setOpenDemo(id);
  const closeSheet = () => setOpenDemo(null);

  return (
    <ComponentPageLayout
      section="WCP Components"
      title="[WCP] Rich Media Sheet"
      description="A slot-driven, themeable bottom sheet for media-rich experiences that require multiple actions and interactions. Different from the LD Bottom Sheet — this WCP component supports multiple header layouts, surface theming, and desktop-centered behavior."
    >
      <div className={styles.page}>

        {/* ── Overview ──────────────────────────────────────────────────── */}
        <section className={styles.section}>
          <SectionTitle>When to use</SectionTitle>
          <div className={styles.dosDonts}>
            <div className={styles.dos}>
              <p className={styles.dosLabel}>✓ DO</p>
              <ul className={styles.dosList}>
                <li>Use for media-rich experiences (hero images, product videos, illustrations)</li>
                <li>When the experience calls for multiple actions and interactions (5+)</li>
                <li>For desktop: use a fixed width (not full screen) to maintain layout consistency</li>
              </ul>
            </div>
            <div className={styles.donts}>
              <p className={styles.dontsLabel}>✗ DON'T</p>
              <ul className={styles.dosList}>
                <li>Simple confirmation messages (use Dialog instead)</li>
                <li>1-3 actionable items (use standard BottomSheet)</li>
                <li>Disclaimer information or privacy notices</li>
                <li>Surface colors beyond what's defined (default, brand, brand-bold, media)</li>
                <li>Primary buttons on brand-bold surface — use secondary or tertiary instead</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── Header Variants ───────────────────────────────────────────── */}
        <section className={styles.section}>
          <SectionTitle>Header Variants</SectionTitle>
          <SectionDesc>
            Six header layouts. Choose based on the content context. The drag handle is always present to signal the sheet is swipeable.
          </SectionDesc>

          <div className={styles.variantSelector}>
            {HEADER_VARIANTS.map((v) => (
              <button
                key={v.value}
                className={[styles.variantBtn, activeHeader === v.value ? styles.variantBtnActive : ''].filter(Boolean).join(' ')}
                onClick={() => setActiveHeader(v.value)}
              >
                {v.label}
              </button>
            ))}
          </div>

          <div className={styles.variantDesc}>
            {HEADER_VARIANTS.find((v) => v.value === activeHeader)?.desc}
          </div>

          <div className={styles.demoRow}>
            <Button
              variant="primary"
              size="medium"
              onClick={() => openSheet('header-demo')}
            >
              Open — {HEADER_VARIANTS.find((v) => v.value === activeHeader)?.label} header
            </Button>
          </div>

          <WCPRichMediaSheet
            isOpen={openDemo === 'header-demo'}
            onClose={closeSheet}
            headerVariant={activeHeader}
            title="Rich Media Sheet title"
            subtitle="Lorem ipsum dolor sit amet consectetur."
            logoSlot={
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/5d1ab07c532e4b9b31955c9bf71ac0850d5e7b26?width=200"
                alt="Logo"
                className={styles.logoSlotImg}
              />
            }
            surfaceVariant={activeHeader === 'inverse' ? 'default' : activeSurface}
            actions={
              <Button
                variant={activeSurface === 'brand-bold' && activeHeader !== 'inverse' ? 'secondary' : 'primary'}
                size="medium"
                isFullWidth
              >
                Button label
              </Button>
            }
          >
            <DefaultContent />
          </WCPRichMediaSheet>
        </section>

        {/* ── Surface Variants ──────────────────────────────────────────── */}
        <section className={styles.section}>
          <SectionTitle>Surface Themes</SectionTitle>
          <SectionDesc>
            Three surface background variants. The "Media" variant lets the content provide a full-bleed background (yellow, image, etc.). Always paired with a matching footer background.
          </SectionDesc>

          <div className={styles.surfaceGrid}>
            {SURFACE_VARIANTS.map((sv) => (
              <DemoCard key={sv.value} title={sv.label} note={sv.desc}>
                <Button
                  variant="secondary"
                  size="small"
                  onClick={() => {
                    setActiveSurface(sv.value);
                    openSheet('surface-demo');
                  }}
                >
                  Open {sv.label}
                </Button>
              </DemoCard>
            ))}
          </div>

          <WCPRichMediaSheet
            isOpen={openDemo === 'surface-demo'}
            onClose={closeSheet}
            headerVariant="title-subtitle"
            title="Rich Media Sheet title"
            subtitle="Lorem ipsum dolor sit amet consectetur."
            surfaceVariant={activeSurface}
            adjustHeight="content"
            actions={
              <Button
                variant={activeSurface === 'brand-bold' ? 'secondary' : 'primary'}
                size="medium"
                isFullWidth
              >
                Button label
              </Button>
            }
          >
            <DefaultContent />
          </WCPRichMediaSheet>
        </section>

        {/* ── Use Case Examples ─────────────────────────────────────────── */}
        <section className={styles.section}>
          <SectionTitle>Use Case Examples</SectionTitle>
          <SectionDesc>
            Real-world usage patterns. Content is fully slottable — the sheet provides the chrome, header, and footer; the product team provides the content.
          </SectionDesc>

          <div className={styles.useCaseGrid}>

            <DemoCard title="ONE Banking" note="Inverse header + hero image + scrollable content + footer button">
              <Button variant="secondary" size="small" onClick={() => openSheet('banking')}>
                Open
              </Button>
            </DemoCard>

            <DemoCard title="One Pay" note="Logo header + hero image + checklist + footer button">
              <Button variant="secondary" size="small" onClick={() => openSheet('onepay')}>
                Open
              </Button>
            </DemoCard>

            <DemoCard title="Delivery Expanded" note="No-title header + illustration + W+ promo card + footer button">
              <Button variant="secondary" size="small" onClick={() => openSheet('delivery')}>
                Open
              </Button>
            </DemoCard>

            <DemoCard title="Work Task" note="2-line header + brand surface + task card + no footer">
              <Button variant="secondary" size="small" onClick={() => openSheet('worktask')}>
                Open
              </Button>
            </DemoCard>

          </div>

          {/* ONE Banking sheet */}
          <WCPRichMediaSheet
            isOpen={openDemo === 'banking'}
            onClose={closeSheet}
            headerVariant="inverse"
            title="Rich Media Sheet title"
            surfaceVariant="default"
            adjustHeight="fixed"
            actions={
              <Button variant="primary" size="medium" isFullWidth>
                Button label
              </Button>
            }
          >
            <BankingContent />
          </WCPRichMediaSheet>

          {/* One Pay sheet */}
          <WCPRichMediaSheet
            isOpen={openDemo === 'onepay'}
            onClose={closeSheet}
            headerVariant="logo-left"
            logoSlot={
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/5d1ab07c532e4b9b31955c9bf71ac0850d5e7b26?width=200"
                alt="One Pay logo"
                className={styles.logoSlotImg}
              />
            }
            surfaceVariant="default"
            adjustHeight="fixed"
            actions={
              <Button variant="primary" size="medium" isFullWidth>
                Button label
              </Button>
            }
          >
            <OnePayContent />
          </WCPRichMediaSheet>

          {/* Delivery sheet */}
          <WCPRichMediaSheet
            isOpen={openDemo === 'delivery'}
            onClose={closeSheet}
            headerVariant="none"
            surfaceVariant="default"
            actions={
              <Button variant="primary" size="medium" isFullWidth>
                Button label
              </Button>
            }
          >
            <DeliveryContent />
          </WCPRichMediaSheet>

          {/* Work Task sheet */}
          <WCPRichMediaSheet
            isOpen={openDemo === 'worktask'}
            onClose={closeSheet}
            headerVariant="title-subtitle"
            title="Rich Media Sheet title"
            subtitle="Lorem ipsum dolor sit amet consectetur."
            surfaceVariant="brand"
          >
            <WorkTaskContent />
          </WCPRichMediaSheet>
        </section>

        {/* ── Desktop Behavior ──────────────────────────────────────────── */}
        <section className={styles.section}>
          <SectionTitle>Desktop Behavior</SectionTitle>
          <SectionDesc>
            At 900px+ the sheet becomes a centered modal with a fixed width of 560px and all-corner border radius. Resize the browser to see it switch between full-width mobile and centered desktop layouts.
          </SectionDesc>
          <div className={styles.infoBox}>
            <strong>Mobile (0–899px)</strong> — Full-width, slides up from bottom, top corners rounded only.<br />
            <strong>Desktop (900px+)</strong> — Centered, 560px wide, all 4 corners rounded.
          </div>
        </section>

        {/* ── Slots reference ───────────────────────────────────────────── */}
        <section className={styles.section}>
          <SectionTitle>Component Architecture</SectionTitle>
          <SectionDesc>
            The sheet is slot-driven. No internal content padding is applied — the consumer controls the layout, background, and spacing of content.
          </SectionDesc>
          <div className={styles.slotTable}>
            <div className={styles.slotRow}>
              <span className={styles.slotName}>Header</span>
              <span className={styles.slotDesc}>Provided by <code>headerVariant</code> prop. Includes drag handle + close button.</span>
            </div>
            <div className={styles.slotRow}>
              <span className={styles.slotName}>Content</span>
              <span className={styles.slotDesc}><code>children</code> — fully slottable, no forced padding.</span>
            </div>
            <div className={styles.slotRow}>
              <span className={styles.slotName}>Footer</span>
              <span className={styles.slotDesc}><code>actions</code> prop — optional, always fixed at bottom with optional divider.</span>
            </div>
          </div>
        </section>

        {/* ── Code Example ──────────────────────────────────────────────── */}
        <section className={styles.section}>
          <SectionTitle>Code Example</SectionTitle>
          <pre className={styles.codeBlock}>{`import { WCPRichMediaSheet } from '@/components/walmart/WCPRichMediaSheet';
import { Button } from '@/components/ui/Button';

function MyFeature() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Sheet</Button>

      <WCPRichMediaSheet
        isOpen={open}
        onClose={() => setOpen(false)}
        headerVariant="title"
        title="Sheet Title"
        surfaceVariant="default"
        actions={
          <Button variant="primary" size="medium" isFullWidth>
            Confirm
          </Button>
        }
      >
        {/* Your content here — no forced padding */}
        <div style={{ padding: 24 }}>
          <p>Rich media content goes here.</p>
        </div>
      </WCPRichMediaSheet>
    </>
  );
}`}</pre>
        </section>

      </div>
    </ComponentPageLayout>
  );
}
