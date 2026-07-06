import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Spinner } from '@/components/ui/Spinner';
import { SignInEmail } from './SignInEmail';
import { SignInWelcomeBack } from './SignInWelcomeBack';
import { SignInVerifyCode } from './SignInVerifyCode';
import styles from './SignIn.module.css';

type Step = 'email' | 'welcome-back' | 'verify-code' | 'loading';

export default function SignInPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');

  const handleSignIn = (emailValue: string) => {
    setStep('loading');
    setTimeout(() => {
      login(emailValue);
      navigate('/walmart');
    }, 1500);
  };

  if (step === 'loading') {
    return (
      <div className={styles.loadingPage}>
        <Spinner size="large" a11yLabel="Signing in…" />
      </div>
    );
  }

  if (step === 'email') {
    return (
      <SignInEmail
        onContinue={(e) => {
          setEmail(e);
          setStep('welcome-back');
        }}
      />
    );
  }

  if (step === 'welcome-back') {
    return (
      <SignInWelcomeBack
        email={email}
        onBack={() => setStep('email')}
        onContinue={(method) => {
          if (method === 'password') {
            handleSignIn(email);
          } else {
            setStep('verify-code');
          }
        }}
      />
    );
  }

  return (
    <SignInVerifyCode
      email={email}
      onBack={() => setStep('welcome-back')}
      onSignIn={() => handleSignIn(email)}
    />
  );
}
