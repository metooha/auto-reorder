import { useState, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { LinkButton } from '@/components/ui/LinkButton';
import { Link } from '@/components/ui/Link';
import { Checkbox } from '@/components/ui/Checkbox';
import { Divider } from '@/components/ui/Divider';
import { Alert } from '@/components/ui/Alert';
import styles from './SignIn.module.css';

const DUMMY_CODE = ['5', '8', '3', '0', '8', '6'];

interface Props {
  email: string;
  onBack: () => void;
  onSignIn: () => void;
}

export function SignInVerifyCode({ email, onBack, onSignIn }: Props) {
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [keepSignedIn, setKeepSignedIn] = useState(true);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const autoFill = () => {
    setDigits(new Array(6).fill(''));
    DUMMY_CODE.forEach((digit, i) => {
      setTimeout(() => {
        setDigits((prev) => {
          const next = [...prev];
          next[i] = digit;
          return next;
        });
        if (i < 5) inputRefs.current[i + 1]?.focus();
      }, i * 120);
    });
  };

  const handleBoxClick = (index: number) => {
    if (digits.every((d) => d === '')) {
      autoFill();
    } else {
      inputRefs.current[index]?.focus();
    }
  };

  const handleChange = (index: number, value: string) => {
    const char = value.replace(/\D/g, '').slice(-1);
    const next = [...digits];
    next[index] = char;
    setDigits(next);
    if (char && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSignIn = () => {
    onSignIn();
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <img
          src="https://i5.walmartimages.com/dfw/63fd9f59-14e2/9d304ce6-96de-4331-b8ec-c5191226d378/v1/spark-icon.svg"
          alt="Walmart"
          className={styles.spark}
        />
        <h1 className={styles.heading}>Enter verification code</h1>

        <div className={styles.emailRow}>
          <div className={styles.emailLabel}>Email</div>
          <div className={styles.emailValueRow}>
            <span className={styles.emailValue}>{email}</span>
            <LinkButton onClick={onBack}>Change</LinkButton>
          </div>
        </div>

        <Divider UNSAFE_className={styles.rule} />

        <div className={styles.warningBox}>
          <Alert variant="warning">
            This phone number is associated with another account. If you verify this number,
            it will be removed from the other account.
          </Alert>
        </div>

        <p className={styles.codePrompt}>
          Please enter the 6-digit verification code we sent to{' '}
          <strong>+1 (xxx) xxx-1720</strong>
        </p>

        {/* OTP digit boxes */}
        <div className={styles.otpRow}>
          {digits.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { inputRefs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              className={`${styles.otpBox} ${digit !== '' || i === digits.findIndex((d) => d === '') ? styles.otpBoxFocused : ''}`}
              onClick={() => handleBoxClick(i)}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              aria-label={`Digit ${i + 1}`}
            />
          ))}
        </div>

        <div className={styles.resendRow}>
          Didn't receive it?{' '}
          <LinkButton size="small" onClick={autoFill}>Text me</LinkButton>
          {' '}or{' '}
          <LinkButton size="small" onClick={autoFill}>Call me instead</LinkButton>
        </div>

        <div className={styles.keepSignedInWrap}>
          <Checkbox
            label="Keep me signed in"
            checked={keepSignedIn}
            onCheckedChange={(c) => setKeepSignedIn(!!c)}
          />
        </div>
        <p className={styles.keepSignedInNote}>
          Uncheck if using a public device.{' '}
          <Link href="#">More</Link>
        </p>

        <div className={styles.buttonStack}>
          <Button variant="primary" size="large" isFullWidth onClick={onSignIn}>
            Sign in
          </Button>
        </div>

        <div className={styles.orDivider}>
          <span className={styles.orText}>or</span>
        </div>

        <div style={{ width: '100%', marginBottom: '16px' }}>
          <Button variant="secondary" size="large" isFullWidth onClick={onSignIn}>
            Sign in with passkey
          </Button>
        </div>

        <div className={styles.tryAnotherWay}>
          Code not working?{' '}
          <LinkButton size="small" onClick={onBack}>Try another way</LinkButton>
        </div>
      </div>
    </div>
  );
}
