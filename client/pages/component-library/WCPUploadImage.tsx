import { useState } from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { WCPUploadImage, UploadedImage } from '@/components/walmart/WCPUploadImage';
import styles from './WCPUploadImage.module.css';

function DemoCard({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return (
    <div className={styles.demoCard}>
      <div className={styles.cardLabel}>{title}</div>
      {note && <p className={styles.cardNote}>{note}</p>}
      <div className={styles.cardContent}>{children}</div>
    </div>
  );
}

function InteractiveDemo() {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [invalid, setInvalid] = useState(false);

  return (
    <div className={styles.interactiveDemo}>
      <WCPUploadImage
        images={images}
        onChange={setImages}
        invalid={invalid}
      />
      <div className={styles.controls}>
        <label className={styles.controlLabel}>
          <input
            type="checkbox"
            checked={invalid}
            onChange={(e) => setInvalid(e.target.checked)}
            className={styles.controlCheckbox}
          />
          Show error state
        </label>
        {images.length > 0 && (
          <button
            type="button"
            className={styles.clearBtn}
            onClick={() => setImages([])}
          >
            Clear all ({images.length})
          </button>
        )}
      </div>
    </div>
  );
}

const TWO_IMAGES_INITIAL: UploadedImage[] = [
  { id: '1', src: 'https://placehold.co/96x96/E8F0FE/5B73C8?text=img1', file: new File([], '1.jpg') },
  { id: '2', src: 'https://placehold.co/96x96/F0FEE8/5B8A00?text=img2', file: new File([], '2.jpg') },
];

const FIVE_IMAGES_INITIAL: UploadedImage[] = [
  { id: '1', src: 'https://placehold.co/96x96/E8F0FE/5B73C8?text=1', file: new File([], '1.jpg') },
  { id: '2', src: 'https://placehold.co/96x96/F0FEE8/5B8A00?text=2', file: new File([], '2.jpg') },
  { id: '3', src: 'https://placehold.co/96x96/FEF0E8/C87B00?text=3', file: new File([], '3.jpg') },
  { id: '4', src: 'https://placehold.co/96x96/FEE8E8/C80000?text=4', file: new File([], '4.jpg') },
  { id: '5', src: 'https://placehold.co/96x96/F8E8FE/8A00C8?text=5', file: new File([], '5.jpg') },
];

function TwoImagesDemo() {
  const [images, setImages] = useState<UploadedImage[]>(TWO_IMAGES_INITIAL);
  return <WCPUploadImage images={images} onChange={setImages} />;
}

function FullImagesDemo() {
  const [images, setImages] = useState<UploadedImage[]>(FIVE_IMAGES_INITIAL);
  return <WCPUploadImage images={images} onChange={setImages} />;
}

export default function WCPUploadImagePage() {
  return (
    <ComponentPageLayout
      section="WCP Components"
      title="Upload Image"
      description="Used in customer reviews to collect product photos. Supports up to 5 images with mobile (96px) and desktop (112px) tile sizes."
    >
      <div className={styles.page}>

        {/* ── Interactive demo ── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Interactive Demo</h2>
          <p className={styles.sectionDesc}>
            Click the <strong>+</strong> tile to upload real images. Uploaded thumbnails appear with an × button to remove them. Additional empty slots appear as the queue grows.
          </p>
          <DemoCard title="Live upload — try it">
            <InteractiveDemo />
          </DemoCard>
        </section>

        {/* ── States ── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>States</h2>

          <div className={styles.grid}>
            <DemoCard
              title="Empty"
              note="No images yet — shows a single wide dashed tile."
            >
              <WCPUploadImage images={[]} onChange={() => {}} />
            </DemoCard>

            <DemoCard
              title="Error / Invalid"
              note="Invalid file type error shown above the upload area."
            >
              <WCPUploadImage images={[]} onChange={() => {}} invalid />
            </DemoCard>

            <DemoCard
              title="With 2 images"
              note="Thumbnails with × buttons, remaining empty slots shown."
            >
              <TwoImagesDemo />
            </DemoCard>

            <DemoCard
              title="Full (5 images)"
              note="All 5 slots used — no empty + tiles shown."
            >
              <FullImagesDemo />
            </DemoCard>
          </div>
        </section>

        {/* ── Usage notes ── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Usage Notes</h2>
          <ul className={styles.usageList}>
            <li>Max 5 images (configurable via <code>maxImages</code> prop)</li>
            <li>Accepted: PNG, GIF, JPG, JPEG, HEIC, TIFF</li>
            <li>Mobile tiles: 96×96px | Desktop tiles: 112×112px (900px+)</li>
            <li>Empty state shows one wide full-width tile; uploading transitions to grid of square tiles</li>
            <li>Set <code>invalid</code> to show the red error alert, customize via <code>errorMessage</code></li>
          </ul>
        </section>

      </div>
    </ComponentPageLayout>
  );
}
