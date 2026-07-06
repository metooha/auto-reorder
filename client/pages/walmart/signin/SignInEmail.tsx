import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import styles from './SignIn.module.css';

const DUMMY_EMAIL = 'jane.doe@example.com';

function typeIn(setValue: (v: string) => void, fullValue: string, delay = 45) {
  let i = 0;
  const id = setInterval(() => {
    i++;
    setValue(fullValue.slice(0, i));
    if (i >= fullValue.length) clearInterval(id);
  }, delay);
}

interface Props {
  onContinue: (email: string) => void;
}

export function SignInEmail({ onContinue }: Props) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onContinue(email || DUMMY_EMAIL);
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <img
          src="https://i5.walmartimages.com/dfw/63fd9f59-14e2/9d304ce6-96de-4331-b8ec-c5191226d378/v1/spark-icon.svg"
          alt="Walmart"
          className={styles.spark}
        />
        <h1 className={styles.heading}>Sign in or create account</h1>

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <div className={styles.fieldWrap}>
            <TextField
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => { if (!email) typeIn(setEmail, DUMMY_EMAIL); }}
              placeholder={DUMMY_EMAIL}
              inputProps={{ autoComplete: 'email' }}
            />
          </div>

          <div className={styles.buttonStack}>
            <Button type="submit" variant="primary" size="large" isFullWidth>
              Continue
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
