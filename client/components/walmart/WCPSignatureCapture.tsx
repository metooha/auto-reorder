import * as React from 'react';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { Checkbox } from '@/components/ui/Checkbox';
import { TextField } from '@/components/ui/TextField';
import styles from './WCPSignatureCapture.module.css';

// ── Pencil icon (inline for secondary button) ──────────────────────────────
const PencilIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M11.5589 1.14652L14.8535 4.4411C15.0488 4.63646 15.0488 4.9532 14.8535 5.14856L12.1531 7.84892L10.1746 5.87039L10.1736 5.87137L8.85756 4.55534L2.00051 11.4124V13.9995H4.58761L10.3689 8.21817L11.0764 8.92564L5.14855 14.8535C5.05474 14.9473 4.9275 15 4.79482 15H1.50025C1.22397 15 1 14.776 1 14.4997V11.2052C1 11.0725 1.05271 10.9453 1.14652 10.8515L10.8514 1.14652C11.0468 0.951159 11.3636 0.95116 11.5589 1.14652ZM11.2052 2.20772L9.56503 3.84787L12.1521 6.43498L13.7923 4.79483L11.2052 2.20772Z" fill="currentColor" />
  </svg>
);

// ── Shared sub-components ───────────────────────────────────────────────────

interface AlertRowProps {
  variant: 'error' | 'warning';
  message: string;
  action?: React.ReactNode;
}

function AlertRow({ variant, message, action }: AlertRowProps) {
  return (
    <Alert variant={variant} action={action}>
      {message}
    </Alert>
  );
}

interface SignatureBoxProps {
  /** Label shown at top-left */
  label?: string;
  /** 'unsigned' | 'signed' | 'signed-as' */
  signatureState?: 'unsigned' | 'signed' | 'signed-as';
  signedName?: string;
  /** Height variant */
  size?: 'normal' | 'short';
}

function SignatureBox({ label, signatureState = 'unsigned', signedName = 'Emilia Garcia', size = 'normal' }: SignatureBoxProps) {
  return (
    <div className={[styles.signatureBox, size === 'short' ? styles.signatureBoxShort : styles.signatureBoxNormal].filter(Boolean).join(' ')}>
      {label && <span className={styles.signatureBoxLabel}>{label}</span>}
      <div className={styles.signatureBoxInner}>
        {signatureState === 'signed' && (
          <>
            <span className={styles.signatureName}>{signedName}</span>
            <div className={styles.signatureDivider} />
          </>
        )}
        {signatureState === 'signed-as' && (
          <span className={styles.signedAsText}>Signed as {signedName}</span>
        )}
      </div>
    </div>
  );
}

// ── Variant: Subscription Signature Trigger ────────────────────────────────

export interface SignatureTriggerProps {
  subText?: string;
  onAgreeAndSign?: () => void;
}

export function SignatureTrigger({
  subText = 'Your signature is required to acknowledge your agreement for your pet med subscription.',
  onAgreeAndSign,
}: SignatureTriggerProps) {
  return (
    <div className={styles.triggerWrapper}>
      <div className={styles.ctaSubtext}>
        <Button
          variant="secondary"
          size="small"
          isFullWidth
          onClick={onAgreeAndSign}
        >
          <PencilIcon />
          Agree &amp; sign
        </Button>
        <p className={styles.subText}>{subText}</p>
      </div>
    </div>
  );
}

// ── Variant: Subscription Signature Terms ─────────────────────────────────

export interface SignatureTermsProps {
  title?: string;
  signatureState?: 'unsigned' | 'signed' | 'signed-as';
  signedName?: string;
  showPreviewWarning?: boolean;
  onChangeSignature?: () => void;
  onRefreshPage?: () => void;
  subText?: string;
}

export function SignatureTerms({
  title = 'Your signature',
  signatureState = 'signed',
  signedName = 'Emilia Garcia',
  showPreviewWarning = false,
  onChangeSignature,
  onRefreshPage,
  subText = 'Your signature is required to acknowledge your agreement for your pet med subscription.',
}: SignatureTermsProps) {
  return (
    <div className={styles.termsWrapper}>
      {showPreviewWarning && (
        <AlertRow
          variant="warning"
          message="We couldn't show your signature preview."
          action={
            <button type="button" className={styles.alertAction} onClick={onRefreshPage}>
              Refresh page
            </button>
          }
        />
      )}
      <div className={styles.titleRow}>
        <span className={styles.signatureTitle}>{title}</span>
        <button type="button" className={styles.changeSigBtn} onClick={onChangeSignature}>
          Change signature
        </button>
      </div>
      <SignatureBox
        signatureState={signatureState}
        signedName={signedName}
        size="normal"
      />
      <p className={styles.subText}>{subText}</p>
    </div>
  );
}

// ── Variant: Signature Base (full form) ───────────────────────────────────

export interface SignatureBaseProps {
  userName?: string;
  showTechError?: boolean;
  showPetNameWarning?: boolean;
  showSignBeforeSubmitError?: boolean;
  showPreviewBeforeSignError?: boolean;
  showCheckboxError?: boolean;
  signatureState?: 'unsigned' | 'signed' | 'signed-as';
  signedName?: string;
  fullName?: string;
  onFullNameChange?: (name: string) => void;
  onPreviewSignature?: () => void;
  isSignChecked?: boolean;
  onSignCheckedChange?: (checked: boolean) => void;
  onRefreshPage?: () => void;
  termsText?: string;
}

export function SignatureBase({
  userName = 'Emilia Garcia',
  showTechError = false,
  showPetNameWarning = false,
  showSignBeforeSubmitError = false,
  showPreviewBeforeSignError = false,
  showCheckboxError = false,
  signatureState = 'unsigned',
  signedName = 'Emilia Garcia',
  fullName = '',
  onFullNameChange,
  onPreviewSignature,
  isSignChecked = false,
  onSignCheckedChange,
  onRefreshPage,
  termsText = "By signing below, you agree that we'll auto-deliver or auto-refill your order, and charge you on a recurring basis at the price then in effect, which may change until the order is processed. To avoid a charge, go to Manage subscriptions and cancel before the order is processed. See the full Terms.",
}: SignatureBaseProps) {
  return (
    <div className={styles.baseWrapper}>
      {showTechError && (
        <AlertRow variant="error" message="We're having technical issues. Please try again." />
      )}
      {showPetNameWarning && (
        <AlertRow
          variant="warning"
          message="We couldn't show the pet name."
          action={
            <button type="button" className={styles.alertAction} onClick={onRefreshPage}>
              Refresh page
            </button>
          }
        />
      )}

      <p className={styles.termsText}>
        {termsText.replace(' See the full Terms.', '')}
        {' '}See the full{' '}
        <button type="button" className={styles.termsLink}>Terms.</button>
      </p>

      {showSignBeforeSubmitError && (
        <AlertRow variant="error" message="Please sign your name before submit" />
      )}

      <div className={styles.signatureSection}>
        <h3 className={styles.signatureSectionTitle}>Signature</h3>

        <div className={styles.requiredFields}>
          <p className={styles.requiredLabel}>*Required fields</p>

          <TextField
            label="Full name*"
            value={fullName}
            onChange={e => onFullNameChange?.(e.target.value)}
            helperText="Enter your name to preview your signature."
            size="large"
          />

          {showPreviewBeforeSignError && (
            <AlertRow variant="error" message="Preview your signature before you agree and sign." />
          )}

          <Button
            variant="secondary"
            size="small"
            isFullWidth
            onClick={onPreviewSignature}
          >
            Preview signature
          </Button>
        </div>

        <SignatureBox
          label="Your signature*"
          signatureState={signatureState}
          signedName={signedName}
          size="normal"
        />

        <div className={styles.checkboxSection}>
          {showCheckboxError && (
            <AlertRow variant="error" message="To continue, you'll need to select the checkbox." />
          )}

          <Checkbox
            checked={isSignChecked}
            label={`Sign as ${userName}*`}
            onCheckedChange={checked => onSignCheckedChange?.(!!checked)}
          />

          <p className={styles.legalText}>
            By checking this box, you agree that this is a legal representation of your signature.
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Variant: Signature Reauth ─────────────────────────────────────────────

export interface SignatureReauthProps {
  subVariant?: 'agree-sign' | 'signed' | 'signed-as';
  signatureState?: 'unsigned' | 'signed' | 'signed-as';
  signedName?: string;
  showReauthError?: boolean;
  showPreviewWarning?: boolean;
  signatureRequired?: string;
  tempHoldText?: string;
  subText?: string;
  onAgreeAndSign?: () => void;
  onConfirm?: () => void;
  onChangeSignature?: () => void;
  onRefreshPage?: () => void;
}

export function SignatureReauth({
  subVariant = 'agree-sign',
  signatureState = 'signed',
  signedName = 'Emilia Garcia',
  showReauthError = false,
  showPreviewWarning = false,
  signatureRequired = 'Your signature is required to acknowledge your agreement for your pet med subscription.',
  tempHoldText = "You'll have an additional temporary hold up to 20% on your payment account but will only be charged for items received.",
  subText,
  onAgreeAndSign,
  onConfirm,
  onChangeSignature,
  onRefreshPage,
}: SignatureReauthProps) {
  const isSigned = subVariant === 'signed' || subVariant === 'signed-as';

  return (
    <div className={styles.reauthWrapper}>
      {showReauthError && !isSigned && (
        <AlertRow
          variant="error"
          message="To place your order, you'll need to agree to and sign the subscription terms."
        />
      )}

      {isSigned && showPreviewWarning && (
        <AlertRow
          variant="warning"
          message="We couldn't show your signature preview."
          action={
            <button type="button" className={styles.alertAction} onClick={onRefreshPage}>
              Refresh page
            </button>
          }
        />
      )}

      {isSigned ? (
        <>
          <div className={styles.titleRow}>
            <span className={styles.signatureTitle}>Your signature</span>
            <button type="button" className={styles.changeSigBtn} onClick={onChangeSignature}>
              Change signature
            </button>
          </div>
          <SignatureBox
            signatureState={subVariant === 'signed-as' ? 'signed-as' : 'signed'}
            signedName={signedName}
            size="short"
          />
          <p className={styles.subText}>{signatureRequired}</p>
        </>
      ) : (
        <div className={styles.ctaSubtext}>
          <Button
            variant="secondary"
            size="small"
            isFullWidth
            onClick={onAgreeAndSign}
          >
            <PencilIcon />
            Agree &amp; sign
          </Button>
          <p className={styles.subText}>{signatureRequired}</p>
        </div>
      )}

      <div className={styles.holdAndConfirm}>
        <p className={styles.subText}>{tempHoldText}</p>
        <Button variant="primary" size="medium" isFullWidth onClick={onConfirm}>
          Confirm
        </Button>
      </div>
    </div>
  );
}

// ── Main WCPSignatureCapture export ───────────────────────────────────────

export type WCPSignatureCaptureVariant = 'trigger' | 'terms' | 'base' | 'reauth';

export interface WCPSignatureCaptureProps {
  variant: WCPSignatureCaptureVariant;
  // Shared
  userName?: string;
  signatureState?: 'unsigned' | 'signed' | 'signed-as';
  signedName?: string;
  onAgreeAndSign?: () => void;
  onChangeSignature?: () => void;
  onRefreshPage?: () => void;
  onConfirm?: () => void;
  // Trigger
  subText?: string;
  // Terms
  title?: string;
  showPreviewWarning?: boolean;
  // Base
  showTechError?: boolean;
  showPetNameWarning?: boolean;
  showSignBeforeSubmitError?: boolean;
  showPreviewBeforeSignError?: boolean;
  showCheckboxError?: boolean;
  fullName?: string;
  onFullNameChange?: (name: string) => void;
  onPreviewSignature?: () => void;
  isSignChecked?: boolean;
  onSignCheckedChange?: (checked: boolean) => void;
  // Reauth
  reauthSubVariant?: 'agree-sign' | 'signed' | 'signed-as';
  showReauthError?: boolean;
  className?: string;
}

export function WCPSignatureCapture({
  variant,
  userName,
  signatureState,
  signedName,
  onAgreeAndSign,
  onChangeSignature,
  onRefreshPage,
  onConfirm,
  subText,
  title,
  showPreviewWarning,
  showTechError,
  showPetNameWarning,
  showSignBeforeSubmitError,
  showPreviewBeforeSignError,
  showCheckboxError,
  fullName,
  onFullNameChange,
  onPreviewSignature,
  isSignChecked,
  onSignCheckedChange,
  reauthSubVariant,
  showReauthError,
  className,
}: WCPSignatureCaptureProps) {
  return (
    <div className={[styles.capture, className].filter(Boolean).join(' ')}>
      {variant === 'trigger' && (
        <SignatureTrigger
          subText={subText}
          onAgreeAndSign={onAgreeAndSign}
        />
      )}
      {variant === 'terms' && (
        <SignatureTerms
          title={title}
          signatureState={signatureState}
          signedName={signedName}
          showPreviewWarning={showPreviewWarning}
          onChangeSignature={onChangeSignature}
          onRefreshPage={onRefreshPage}
          subText={subText}
        />
      )}
      {variant === 'base' && (
        <SignatureBase
          userName={userName}
          showTechError={showTechError}
          showPetNameWarning={showPetNameWarning}
          showSignBeforeSubmitError={showSignBeforeSubmitError}
          showPreviewBeforeSignError={showPreviewBeforeSignError}
          showCheckboxError={showCheckboxError}
          signatureState={signatureState}
          signedName={signedName}
          fullName={fullName}
          onFullNameChange={onFullNameChange}
          onPreviewSignature={onPreviewSignature}
          isSignChecked={isSignChecked}
          onSignCheckedChange={onSignCheckedChange}
          onRefreshPage={onRefreshPage}
        />
      )}
      {variant === 'reauth' && (
        <SignatureReauth
          subVariant={reauthSubVariant}
          signatureState={signatureState}
          signedName={signedName}
          showReauthError={showReauthError}
          showPreviewWarning={showPreviewWarning}
          subText={subText}
          onAgreeAndSign={onAgreeAndSign}
          onConfirm={onConfirm}
          onChangeSignature={onChangeSignature}
          onRefreshPage={onRefreshPage}
        />
      )}
    </div>
  );
}
