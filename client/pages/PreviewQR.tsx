import { useEffect, useState } from 'react';

import { Spark } from '@/components/icons/Spark';

const BASE_URL = window.location.origin;
const PREVIEW_URL = `${BASE_URL}/walmart`;
const QR_SRC = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&color=001e60&bgcolor=ffffff&data=${encodeURIComponent(PREVIEW_URL)}`;

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const s: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100dvh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '28px',
    padding: '40px 24px',
    background: 'linear-gradient(160deg, #0053e2 0%, #001e60 100%)',
    fontFamily: "'Everyday Sans UI', -apple-system, sans-serif",
    color: '#fff',
    textAlign: 'center',
  },
  logo: { display: 'block' },
  heading: { fontSize: '26px', fontWeight: 700, margin: 0, letterSpacing: '-0.3px' },
  sub: { fontSize: '15px', opacity: 0.8, margin: '6px 0 0' },
  qrWrap: {
    background: '#fff',
    borderRadius: '24px',
    padding: '20px',
    boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
  },
  installBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    background: '#FFC220',
    color: '#001e60',
    border: 'none',
    borderRadius: '100px',
    padding: '14px 28px',
    fontSize: '16px',
    fontWeight: 700,
    cursor: 'pointer',
    width: '100%',
    maxWidth: '320px',
    fontFamily: 'inherit',
  },
  dividerRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    width: '100%',
    maxWidth: '320px',
    opacity: 0.5,
  },
  dividerLine: { flex: 1, height: '1px', background: 'rgba(255,255,255,0.4)' },
  dividerText: { fontSize: '12px', whiteSpace: 'nowrap' },
  stepsCard: {
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '20px',
    padding: '20px',
    width: '100%',
    maxWidth: '320px',
    textAlign: 'left',
  },
  stepTitle: { fontWeight: 700, fontSize: '14px', margin: '0 0 14px' },
  step: { display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '10px' },
  stepNum: {
    background: 'rgba(255,255,255,0.2)',
    borderRadius: '50%',
    width: '22px', height: '22px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0, fontWeight: 700, fontSize: '11px',
  },
  stepText: { fontSize: '13px', lineHeight: '1.5', opacity: 0.9 },
  urlBox: {
    background: 'rgba(255,255,255,0.12)',
    borderRadius: '12px',
    padding: '10px 16px',
    maxWidth: '320px',
    wordBreak: 'break-all',
    width: '100%',
  },
};

export default function PreviewQR() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('appinstalled', () => setInstalled(true));
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') setInstalled(true);
  };

  return (
    <div style={s.page}>
      {/* Logo */}
      <Spark width={52} height={52} aria-label="Walmart" style={{ ...s.logo, color: 'var(--ld-primitive-color-spark-100, #ffc220)' }} />

      <div>
        <h1 style={s.heading}>Install the app</h1>
        <p style={s.sub}>Full-screen, works offline — feels native</p>
      </div>

      {/* Android: one-tap install button */}
      {installPrompt && !installed && (
        <button style={s.installBtn} onClick={handleInstall}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 16l-4-4h2.5V8h3v4H16l-4 4zm-6 2h12v2H6v-2z"/>
          </svg>
          Install App
        </button>
      )}
      {installed && (
        <div style={{ ...s.installBtn, background: '#4caf50', cursor: 'default' }}>
          ✓ App installed! Open it from your home screen
        </div>
      )}

      {/* QR code (for desktop → scan with phone) */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        {installPrompt && (
          <div style={s.dividerRow}>
            <div style={s.dividerLine} />
            <span style={s.dividerText}>or scan to open on another device</span>
            <div style={s.dividerLine} />
          </div>
        )}
        <div style={s.qrWrap}>
          <img src={QR_SRC} alt="QR code" width={220} height={220} style={{ display: 'block', borderRadius: '4px' }} />
        </div>
        <div style={s.urlBox}>
          <p style={{ fontSize: '11px', opacity: 0.7, margin: '0 0 3px' }}>Preview URL</p>
          <p style={{ fontSize: '13px', fontWeight: 600, margin: 0 }}>{PREVIEW_URL}</p>
        </div>
      </div>

      {/* Manual install steps */}
      <div style={s.stepsCard}>
        <p style={s.stepTitle}>After opening in your phone browser:</p>
        <div style={s.step}>
          <span style={s.stepNum}>1</span>
          <span style={s.stepText}><strong>iOS Safari</strong> → tap the Share icon (□↑) → "Add to Home Screen" → Add</span>
        </div>
        <div style={{ ...s.step, marginBottom: 0 }}>
          <span style={s.stepNum}>2</span>
          <span style={s.stepText}><strong>Android Chrome</strong> → tap ⋮ → "Add to Home Screen" → Install</span>
        </div>
      </div>
    </div>
  );
}
