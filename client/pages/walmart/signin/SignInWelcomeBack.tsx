import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { LinkButton } from '@/components/ui/LinkButton';
import { Link } from '@/components/ui/Link';
import { TextField } from '@/components/ui/TextField';
import { Checkbox } from '@/components/ui/Checkbox';
import { RadioGroup, Radio } from '@/components/ui/radio-group';
import { Divider } from '@/components/ui/Divider';
import styles from './SignIn.module.css';

function typeIn(setValue: (v: string) => void, fullValue: string, delay = 100) {
  let i = 0;
  const id = setInterval(() => {
    i++;
    setValue(fullValue.slice(0, i));
    if (i >= fullValue.length) clearInterval(id);
  }, delay);
}

type Method = 'phone' | 'email' | 'password';

const DUMMY_PASSWORD = '1234';

interface Props {
  email: string;
  onBack: () => void;
  onContinue: (method: 'phone' | 'email' | 'password') => void;
}

export function SignInWelcomeBack({ email, onBack, onContinue }: Props) {
  const [method, setMethod] = useState<Method>('phone');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(true);

  const handleMethodChange = (v: string) => {
    setMethod(v as Method);
    if (v === 'password') {
      setPassword('');
      typeIn(setPassword, DUMMY_PASSWORD);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <img
          src="https://i5.walmartimages.com/dfw/63fd9f59-14e2/9d304ce6-96de-4331-b8ec-c5191226d378/v1/spark-icon.svg"
          alt="Walmart"
          className={styles.spark}
        />
        <h1 className={styles.heading}>Welcome back!</h1>

        <div className={styles.emailRow}>
          <div className={styles.emailLabel}>Email</div>
          <div className={styles.emailValueRow}>
            <span className={styles.emailValue}>{email}</span>
            <LinkButton onClick={onBack}>Change</LinkButton>
          </div>
        </div>

        <Divider UNSAFE_className={styles.rule} />

        <p className={styles.sectionLabel}>Choose a sign in method</p>

        <div className={styles.radioGroup}>
          <RadioGroup value={method} onValueChange={handleMethodChange}>
            {/* Phone option */}
            <div>
              <Radio
                value="phone"
                label="Send a verification code to +1 (xxx) xxx-1720"
              />
              {method === 'phone' && (
                <p className={styles.radioDisclaimer}>
                  By clicking 'Text Me' or 'Call Me' with a one-time code, you consent to
                  receive an automated text message or voice call to verify your account phone
                  number and agree to the{' '}
                  <Link href="#">Mobile Alert Terms</Link>.
                  {' '}Msg, Data, or other Call Rates may apply.
                </p>
              )}
            </div>

            {/* Email option */}
            <div>
              <Radio value="email" label="Email me a verification code" />
              <p className={styles.radioSublabel}>{email}</p>
            </div>

            {/* Password option */}
            <Radio value="password" label="Password" />
          </RadioGroup>
        </div>

        {/* Password field — shown only when password method selected */}
        {method === 'password' && (
          <>
            <div className={styles.passwordField}>
              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => { if (!password) typeIn(setPassword, DUMMY_PASSWORD); }}
                trailingContent={
                  <LinkButton size="small" onClick={() => setShowPassword((v) => !v)}>
                    {showPassword ? 'Hide' : 'Show'}
                  </LinkButton>
                }
              />
            </div>
            <div className={styles.forgotPassword}>
              <Link href="#">Forgot password?</Link>
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
          </>
        )}

        <div className={styles.buttonStack}>
          {method === 'phone' && (
            <>
              <Button variant="primary" size="large" isFullWidth onClick={() => onContinue('phone')}>
                Text me
              </Button>
              <Button variant="secondary" size="large" isFullWidth onClick={() => onContinue('phone')}>
                Call me instead
              </Button>
            </>
          )}
          {method === 'email' && (
            <Button variant="primary" size="large" isFullWidth onClick={() => onContinue('email')}>
              Send code
            </Button>
          )}
          {method === 'password' && (
            <Button variant="primary" size="large" isFullWidth onClick={() => onContinue('password')}>
              Sign in
            </Button>
          )}
        </div>

        <div className={styles.orDivider}>
          <span className={styles.orText}>or</span>
        </div>

        <div style={{ width: '100%' }}>
          <Button variant="secondary" size="large" isFullWidth onClick={() => onContinue(method)}>
            Sign in with passkey
          </Button>
        </div>
      </div>
    </div>
  );
}
