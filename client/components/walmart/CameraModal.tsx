import { useEffect, useRef, useState } from 'react';
import { X } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';
import styles from './CameraModal.module.css';

interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture?: (imageData: string) => void;
}

export function CameraModal({ isOpen, onClose, onCapture }: CameraModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [error, setError] = useState<string>('');
  const [capturedImage, setCapturedImage] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => { stopCamera(); };
  }, [isOpen]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      setStream(mediaStream);
      setHasPermission(true);
      setError('');
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Unable to access camera. Please ensure you have granted camera permissions.');
      setHasPermission(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setHasPermission(false);
    setCapturedImage('');
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        setCapturedImage(canvas.toDataURL('image/jpeg', 0.95));
      }
    }
  };

  const handleUsePhoto = () => {
    if (capturedImage && onCapture) onCapture(capturedImage);
    handleClose();
  };

  const handleRetake = () => setCapturedImage('');

  const handleClose = () => {
    stopCamera();
    setCapturedImage('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        {/* Top bar */}
        <div className={styles.topBar}>
          <h2 className={styles.topBarTitle}>
            {capturedImage ? 'Photo Preview' : 'Take Photo'}
          </h2>
          <button className={styles.closeButton} onClick={handleClose} aria-label="Close camera">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Viewfinder */}
        <div className={styles.viewfinder}>
          {error ? (
            <div className={styles.errorContent}>
              <p className={styles.errorText}>{error}</p>
              <Button variant="primary" size="medium" onClick={startCamera}>
                Try Again
              </Button>
            </div>
          ) : capturedImage ? (
            <img src={capturedImage} alt="Captured" className={styles.capturedImage} />
          ) : (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={styles.video}
            />
          )}
        </div>

        <canvas ref={canvasRef} style={{ display: 'none' }} />

        {/* Bottom controls */}
        {hasPermission && !error && (
          <div className={styles.bottomBar}>
            {capturedImage ? (
              <ButtonGroup>
                <Button variant="secondary" size="medium" onClick={handleRetake}>
                  Retake
                </Button>
                <Button variant="primary" size="medium" onClick={handleUsePhoto}>
                  Use Photo
                </Button>
              </ButtonGroup>
            ) : (
              <div className={styles.shutterWrap}>
                <button
                  className={styles.shutterButton}
                  onClick={capturePhoto}
                  aria-label="Capture photo"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
