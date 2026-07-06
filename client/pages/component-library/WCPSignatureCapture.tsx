import React, { useState } from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import {
  WCPSignatureCapture,
  SignatureTrigger,
  SignatureTerms,
  SignatureBase,
  SignatureReauth,
} from '@/components/walmart/WCPSignatureCapture';
import { Button } from '@/components/ui/Button';
import styles from './WCPSignatureCapture.module.css';

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className={styles.sectionTitle}>{children}</h2>;
}

function SectionDesc({ children }: { children: React.ReactNode }) {
  return <p className={styles.sectionDesc}>{children}</p>;
}

function DemoFrame({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className={styles.demoFrame}>
      <div className={styles.demoFrameLabel}>{label}</div>
      <div className={styles.demoFrameContent}>{children}</div>
    </div>
  );
}

export default function WCPSignatureCapturePage() {
  // ── Trigger demo ─────────────────────────────────────────────────────────
  const [showTriggerModal, setShowTriggerModal] = useState(false);

  // ── Terms demo ───────────────────────────────────────────────────────────
  const [termsVariant, setTermsVariant] = useState<'signed' | 'signed-as'>('signed');
  const [showTermsWarning, setShowTermsWarning] = useState(false);

  // ── Base demo ────────────────────────────────────────────────────────────
  const [baseName, setBaseName] = useState('');
  const [baseSignatureState, setBaseSignatureState] = useState<'unsigned' | 'signed'>('unsigned');
  const [baseChecked, setBaseChecked] = useState(false);
  const [showSignBeforeSubmit, setShowSignBeforeSubmit] = useState(false);
  const [showPreviewBeforeSign, setShowPreviewBeforeSign] = useState(false);
  const [showCheckboxError, setShowCheckboxError] = useState(false);
  const [showTechError, setShowTechError] = useState(false);
  const [showPetWarning, setShowPetWarning] = useState(false);

  const handlePreview = () => {
    if (!baseName.trim()) {
      setShowPreviewBeforeSign(true);
      return;
    }
    setShowPreviewBeforeSign(false);
    setBaseSignatureState('signed');
  };

  // ── Reauth demo ───────────────────────────────────────────────────────────
  const [reauthVariant, setReauthVariant] = useState<'agree-sign' | 'signed' | 'signed-as'>('agree-sign');
  const [showReauthError, setShowReauthError] = useState(false);

  return (
    <ComponentPageLayout
      section="WCP Components"
      title="[WCP] Signature Capture"
      description="A set of composable components for capturing a typed signature during subscription flows. Includes Trigger, Terms preview, Base signature form, and Reauth variants — each with appropriate error and warning states."
    >
      <div className={styles.page}>

        {/* ── Overview ─────────────────────────────────────────── */}
        <div className={styles.section}>
          <SectionTitle>Overview</SectionTitle>
          <SectionDesc>
            The WCP Signature Capture component covers the full subscription sign-off journey. It
            has four variants, used in sequence or independently depending on the flow:
          </SectionDesc>
          <ul className={styles.overviewList}>
            <li><strong>Trigger</strong> — A compact "Agree &amp; sign" CTA with subtext. Used to initiate the signing flow.</li>
            <li><strong>Terms</strong> — Displays the user's existing signature and lets them change it. Used when a preview is already available.</li>
            <li><strong>Base</strong> — Full form: name field → preview → signature box → checkbox. The primary capture form.</li>
            <li><strong>Reauth</strong> — A compact variant with a Confirm CTA used for re-authorization flows (e.g. updating a subscription).</li>
          </ul>
          <SectionDesc>
            All variants support error and warning alerts inline using the LD Alert component.
            Signature text is rendered in the "Vujahday Script" script font to simulate a
            handwritten signature.
          </SectionDesc>
        </div>

        {/* ── Trigger variant ───────────────────────────────────── */}
        <div className={styles.section}>
          <SectionTitle>Variant: Trigger</SectionTitle>
          <SectionDesc>
            Shows an "Agree &amp; sign" secondary button with a pencil icon and a subtext
            explaining why a signature is required. Typically placed in a checkout summary or
            subscription card to kick off the signing flow.
          </SectionDesc>

          <DemoFrame label="Trigger — default">
            <SignatureTrigger
              onAgreeAndSign={() => alert('Opening signature flow…')}
            />
          </DemoFrame>
        </div>

        {/* ── Terms variant ─────────────────────────────────────── */}
        <div className={styles.section}>
          <SectionTitle>Variant: Terms</SectionTitle>
          <SectionDesc>
            Shows the user's captured signature (or a "Signed as …" state) alongside a "Change
            signature" link. Used after a signature has already been captured in the current
            session to confirm or change it.
          </SectionDesc>

          <div className={styles.controlRow}>
            <span className={styles.controlLabel}>Signature state:</span>
            <Button
              variant={termsVariant === 'signed' ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setTermsVariant('signed')}
            >
              Signed
            </Button>
            <Button
              variant={termsVariant === 'signed-as' ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setTermsVariant('signed-as')}
            >
              Signed As
            </Button>
            <Button
              variant={showTermsWarning ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setShowTermsWarning(v => !v)}
            >
              {showTermsWarning ? 'Hide' : 'Show'} preview warning
            </Button>
          </div>

          <DemoFrame label={`Terms — ${termsVariant}${showTermsWarning ? ' + warning' : ''}`}>
            <SignatureTerms
              signatureState={termsVariant}
              signedName="Emilia Garcia"
              showPreviewWarning={showTermsWarning}
              onChangeSignature={() => alert('Change signature clicked')}
              onRefreshPage={() => alert('Refresh page clicked')}
            />
          </DemoFrame>
        </div>

        {/* ── Base variant ──────────────────────────────────────── */}
        <div className={styles.section}>
          <SectionTitle>Variant: Base</SectionTitle>
          <SectionDesc>
            The full signature capture form. The user enters their full name, clicks "Preview
            signature" to see the script font rendering, then checks a consent checkbox to sign.
            Multiple inline error and warning states are supported.
          </SectionDesc>

          <div className={styles.controlRow}>
            <span className={styles.controlLabel}>Toggle errors:</span>
            <Button
              variant={showTechError ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setShowTechError(v => !v)}
            >
              Tech error
            </Button>
            <Button
              variant={showPetWarning ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setShowPetWarning(v => !v)}
            >
              Pet name warning
            </Button>
            <Button
              variant={showSignBeforeSubmit ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setShowSignBeforeSubmit(v => !v)}
            >
              Sign before submit
            </Button>
            <Button
              variant={showCheckboxError ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setShowCheckboxError(v => !v)}
            >
              Checkbox error
            </Button>
            <Button
              variant="secondary"
              size="small"
              onClick={() => {
                setBaseName('');
                setBaseSignatureState('unsigned');
                setBaseChecked(false);
                setShowSignBeforeSubmit(false);
                setShowPreviewBeforeSign(false);
                setShowCheckboxError(false);
                setShowTechError(false);
                setShowPetWarning(false);
              }}
            >
              Reset
            </Button>
          </div>

          <DemoFrame label="Base — interactive">
            <SignatureBase
              userName="Emilia Garcia"
              fullName={baseName}
              onFullNameChange={setBaseName}
              signatureState={baseSignatureState}
              signedName={baseName || 'Emilia Garcia'}
              isSignChecked={baseChecked}
              onSignCheckedChange={setBaseChecked}
              onPreviewSignature={handlePreview}
              showTechError={showTechError}
              showPetNameWarning={showPetWarning}
              showSignBeforeSubmitError={showSignBeforeSubmit}
              showPreviewBeforeSignError={showPreviewBeforeSign}
              showCheckboxError={showCheckboxError}
              onRefreshPage={() => alert('Refresh page clicked')}
            />
          </DemoFrame>

          <div className={styles.statesRow}>
            <DemoFrame label="Base — error states only">
              <SignatureBase
                userName="Emilia Garcia"
                fullName=""
                onFullNameChange={() => {}}
                signatureState="unsigned"
                showTechError
                showPetNameWarning
                showSignBeforeSubmitError
                showCheckboxError
                onRefreshPage={() => {}}
              />
            </DemoFrame>
          </div>
        </div>

        {/* ── Reauth variant ────────────────────────────────────── */}
        <div className={styles.section}>
          <SectionTitle>Variant: Reauth</SectionTitle>
          <SectionDesc>
            A condensed variant used when the user needs to re-authorize a subscription (e.g.,
            modifying an existing subscription). Shows either a compact "Agree &amp; sign" CTA
            or the captured signature with a "Change signature" link, followed by temp-hold
            notice and Confirm CTA.
          </SectionDesc>

          <div className={styles.controlRow}>
            <span className={styles.controlLabel}>Sub-variant:</span>
            <Button
              variant={reauthVariant === 'agree-sign' ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setReauthVariant('agree-sign')}
            >
              Agree &amp; Sign
            </Button>
            <Button
              variant={reauthVariant === 'signed' ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setReauthVariant('signed')}
            >
              Signed
            </Button>
            <Button
              variant={reauthVariant === 'signed-as' ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setReauthVariant('signed-as')}
            >
              Signed As
            </Button>
            <Button
              variant={showReauthError ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setShowReauthError(v => !v)}
            >
              {showReauthError ? 'Hide' : 'Show'} error
            </Button>
          </div>

          <DemoFrame label={`Reauth — ${reauthVariant}`}>
            <SignatureReauth
              subVariant={reauthVariant}
              signedName="Emilia Garcia"
              showReauthError={showReauthError}
              onAgreeAndSign={() => alert('Opening signature flow…')}
              onConfirm={() => alert('Confirmed!')}
              onChangeSignature={() => alert('Change signature clicked')}
              onRefreshPage={() => alert('Refresh page clicked')}
            />
          </DemoFrame>
        </div>

        {/* ── Component Props ───────────────────────────────────── */}
        <div className={styles.section}>
          <SectionTitle>Component Props</SectionTitle>
          <SectionDesc>
            The <code>WCPSignatureCapture</code> component is a unified wrapper that selects the
            appropriate sub-component based on the <code>variant</code> prop. Individual
            sub-components (<code>SignatureTrigger</code>, <code>SignatureTerms</code>,{' '}
            <code>SignatureBase</code>, <code>SignatureReauth</code>) can also be used directly.
          </SectionDesc>

          <table className={styles.propsTable}>
            <thead>
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Used by</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>variant</td><td>'trigger' | 'terms' | 'base' | 'reauth'</td><td>All</td><td>Required. Which variant to render.</td></tr>
              <tr><td>userName</td><td>string</td><td>Base, Reauth</td><td>Displayed in the checkbox label and signature preview.</td></tr>
              <tr><td>signatureState</td><td>'unsigned' | 'signed' | 'signed-as'</td><td>Terms, Base, Reauth</td><td>Controls the signature box rendering.</td></tr>
              <tr><td>signedName</td><td>string</td><td>Terms, Base, Reauth</td><td>Name rendered in script font as the signature.</td></tr>
              <tr><td>subText</td><td>string</td><td>Trigger, Reauth</td><td>Explanatory text below the CTA.</td></tr>
              <tr><td>title</td><td>string</td><td>Terms</td><td>Label shown above the signature preview box.</td></tr>
              <tr><td>showPreviewWarning</td><td>boolean</td><td>Terms, Reauth</td><td>Shows a warning alert when the signature preview failed to load.</td></tr>
              <tr><td>showTechError</td><td>boolean</td><td>Base</td><td>Shows a generic tech error alert.</td></tr>
              <tr><td>showPetNameWarning</td><td>boolean</td><td>Base</td><td>Shows a warning when the pet name couldn't be loaded.</td></tr>
              <tr><td>showSignBeforeSubmitError</td><td>boolean</td><td>Base</td><td>Error if user tries to submit without previewing.</td></tr>
              <tr><td>showPreviewBeforeSignError</td><td>boolean</td><td>Base</td><td>Error if user tries to sign without previewing first.</td></tr>
              <tr><td>showCheckboxError</td><td>boolean</td><td>Base</td><td>Error if the consent checkbox is not checked.</td></tr>
              <tr><td>fullName</td><td>string</td><td>Base</td><td>Controlled value for the Full Name text field.</td></tr>
              <tr><td>onFullNameChange</td><td>(name: string) =&gt; void</td><td>Base</td><td>Called on name field change.</td></tr>
              <tr><td>onPreviewSignature</td><td>() =&gt; void</td><td>Base</td><td>Called when "Preview signature" is clicked.</td></tr>
              <tr><td>isSignChecked</td><td>boolean</td><td>Base</td><td>Controlled state of the consent checkbox.</td></tr>
              <tr><td>onSignCheckedChange</td><td>(checked: boolean) =&gt; void</td><td>Base</td><td>Called when checkbox changes.</td></tr>
              <tr><td>reauthSubVariant</td><td>'agree-sign' | 'signed' | 'signed-as'</td><td>Reauth</td><td>Which reauth state to show.</td></tr>
              <tr><td>showReauthError</td><td>boolean</td><td>Reauth</td><td>Shows the "must agree and sign" error alert.</td></tr>
              <tr><td>onAgreeAndSign</td><td>() =&gt; void</td><td>Trigger, Reauth</td><td>Called when "Agree &amp; sign" is clicked.</td></tr>
              <tr><td>onChangeSignature</td><td>() =&gt; void</td><td>Terms, Reauth</td><td>Called when "Change signature" is clicked.</td></tr>
              <tr><td>onRefreshPage</td><td>() =&gt; void</td><td>Base, Terms, Reauth</td><td>Called from alert action links when a refresh is suggested.</td></tr>
              <tr><td>onConfirm</td><td>() =&gt; void</td><td>Reauth</td><td>Called when the "Confirm" primary button is pressed.</td></tr>
            </tbody>
          </table>
        </div>

        {/* ── Usage ─────────────────────────────────────────────── */}
        <div className={styles.section}>
          <SectionTitle>Usage</SectionTitle>
          <pre className={styles.codeBlock}>{`import { WCPSignatureCapture } from '@/components/walmart/WCPSignatureCapture';
// Or use sub-components directly:
import { SignatureTrigger, SignatureBase, SignatureTerms, SignatureReauth } from '@/components/walmart/WCPSignatureCapture';

// Trigger (step 1 — initiate signing)
<SignatureTrigger onAgreeAndSign={openSignatureSheet} />

// Base form (step 2 — full capture)
<SignatureBase
  userName={user.name}
  fullName={typedName}
  onFullNameChange={setTypedName}
  signatureState={sigState}
  signedName={typedName}
  isSignChecked={agreed}
  onSignCheckedChange={setAgreed}
  onPreviewSignature={handlePreview}
/>

// Terms (confirmation step)
<SignatureTerms
  signatureState="signed"
  signedName={typedName}
  onChangeSignature={reopenSignatureFlow}
/>

// Reauth
<SignatureReauth
  subVariant="agree-sign"
  onAgreeAndSign={openSignatureSheet}
  onConfirm={handleConfirm}
/>`}</pre>
        </div>

        {/* ── Do / Don't ───────────────────────────────────────── */}
        <div className={styles.section}>
          <SectionTitle>Guidelines</SectionTitle>
          <div className={styles.guidelineGrid}>
            <div className={styles.guidelineCard}>
              <div className={styles.doLabel}>Do</div>
              <p className={styles.guidelineText}>
                Present the <strong>Trigger</strong> variant in checkout before the user proceeds,
                then open the <strong>Base</strong> form in a bottom sheet or modal when they tap
                "Agree &amp; sign".
              </p>
            </div>
            <div className={styles.guidelineCard}>
              <div className={styles.dontLabel}>Don't</div>
              <p className={styles.guidelineText}>
                Don't skip showing the signature preview before allowing the user to submit. Always
                require the "Preview signature" step so they see what they're signing.
              </p>
            </div>
            <div className={styles.guidelineCard}>
              <div className={styles.doLabel}>Do</div>
              <p className={styles.guidelineText}>
                Use the <strong>Terms</strong> variant to display a previously captured signature
                during an order review so users can see — and change — their signature before
                finalizing.
              </p>
            </div>
            <div className={styles.guidelineCard}>
              <div className={styles.dontLabel}>Don't</div>
              <p className={styles.guidelineText}>
                Don't use this component for non-subscription contexts. It is designed
                specifically for pet med subscriptions and recurring order acknowledgments.
              </p>
            </div>
          </div>
        </div>

      </div>
    </ComponentPageLayout>
  );
}
