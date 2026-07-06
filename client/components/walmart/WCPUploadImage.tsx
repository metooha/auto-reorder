/**
 * [WCP] Upload Image View
 *
 * A photo-upload field used in customer reviews. Supports up to 5 images.
 *
 * - Empty state: single wide dashed tile
 * - With images: thumbnail tiles + remaining empty square slots
 * - Mobile (0–899px): 96×96px tiles
 * - Desktop (900+px): 112×112px tiles
 *
 * Figma: [WCP] Upload Image View
 */

import { useRef } from 'react';
import { ExclamationCircle } from '@/components/icons';
import styles from './WCPUploadImage.module.css';

const MAX_IMAGES = 5;
const ACCEPTED_TYPES = ['image/png', 'image/gif', 'image/jpg', 'image/jpeg', 'image/heic', 'image/tiff'];

export interface UploadedImage {
  id: string;
  src: string;
  file: File;
}

export interface WCPUploadImageProps {
  /**
   * Currently uploaded images.
   */
  images?: UploadedImage[];

  /**
   * Called when images change (add or remove).
   */
  onChange?: (images: UploadedImage[]) => void;

  /**
   * Maximum number of images allowed.
   * @default 5
   */
  maxImages?: number;

  /**
   * Whether to show the error/invalid state.
   */
  invalid?: boolean;

  /**
   * Custom error message. Defaults to the standard file-type error.
   */
  errorMessage?: string;

  /**
   * Photo tip text shown below the upload area.
   */
  photoTip?: string;

  /**
   * Label prefix. Defaults to "Show us what it looks like".
   */
  label?: string;

  /**
   * Sub-label after the bold label.
   */
  subLabel?: string;

  /**
   * Escape hatch for class name overrides.
   */
  UNSAFE_className?: string;
}

function PlusIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M15 17V26H17V17H26V15H17V6H15V15H6V17H15Z" fill="currentColor" />
    </svg>
  );
}

function ImagePlaceholderIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M28 4C29.1046 4 30 4.89543 30 6V26C30 27.1046 29.1046 28 28 28H4C2.89543 28 2 27.1046 2 26V6C2 4.89543 2.89543 4 4 4H28ZM12 18C9.16578 18 6.88177 19.5007 5.07652 22.625L4 24.76V28H28L27.0018 22.0023C25.7884 22.996 23.9044 23.5 22 23.5C19.7688 23.5 18.3637 22.7285 16.968 21.576L15.7347 20.4474C13.6824 18.5995 12.5963 18 12 18ZM28 6H4L4.00093 19.2878C5.91018 16.1142 8.25382 15 12 15C14.2312 15 15.6363 15.7715 17.0321 16.9239L18.2652 18.0526C20.3177 19.9001 21.4037 21.5 22 21.5C25.7903 21.5 26.3592 20.5257 27.9622 18.5L28 18.364V6ZM22 8C24.2091 8 26 9.79086 26 12C26 14.2091 24.2091 16 22 16C19.7909 16 18 14.2091 18 12C18 9.79086 19.7909 8 22 8Z" fill="currentColor" />
    </svg>
  );
}

function CloseIconSmall() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M7.85355 8.71911L12 12.8656L12.7071 12.1584L8.56066 8.012L12.7071 3.86555L12 3.15845L7.85355 7.30489L3.70711 3.15845L3 3.86555L7.14645 8.012L3 12.1584L3.70711 12.8656L7.85355 8.71911Z" fill="currentColor" />
    </svg>
  );
}

export function WCPUploadImage({
  images = [],
  onChange,
  maxImages = MAX_IMAGES,
  invalid = false,
  errorMessage = "Invalid file type. Choose a file that's a PNG, GIF, JPG, JPEG, HEIC or TIFF.",
  photoTip = 'show us a clear photo of the item, highlighting any notable details.',
  label = 'Show us what it looks like',
  subLabel = 'Add up to 5 photos, 5MB max each.',
  UNSAFE_className,
}: WCPUploadImageProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const isEmpty = images.length === 0;
  const canAddMore = images.length < maxImages;
  const remainingSlots = Math.max(0, maxImages - images.length);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;

    const newImages: UploadedImage[] = [];
    for (const file of files) {
      if (images.length + newImages.length >= maxImages) break;
      const src = URL.createObjectURL(file);
      newImages.push({ id: `${Date.now()}-${file.name}`, src, file });
    }

    onChange?.([...images, ...newImages]);
    // Reset so same file can be re-selected after removing
    e.target.value = '';
  }

  function handleRemove(id: string) {
    const updated = images.filter((img) => img.id !== id);
    onChange?.(updated);
  }

  function openFilePicker() {
    inputRef.current?.click();
  }

  return (
    <div className={[styles.root, UNSAFE_className].filter(Boolean).join(' ')}>
      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/gif,image/jpg,image/jpeg,image/heic,image/tiff,.heic,.tiff"
        multiple
        className={styles.hiddenInput}
        onChange={handleFileChange}
        aria-hidden="true"
        tabIndex={-1}
      />

      {/* ── Header ── */}
      <div className={styles.header}>
        <span className={styles.labelBold}>{label}</span>
        {' '}
        <span className={styles.labelNormal}>{subLabel}</span>
      </div>

      {/* ── Error alert ── */}
      {invalid && (
        <div className={styles.errorAlert} role="alert">
          <div className={styles.errorTab} aria-hidden="true" />
          <div className={styles.errorContent}>
            <ExclamationCircle
              width={16}
              height={16}
              className={styles.errorIcon}
              aria-hidden="true"
            />
            <span className={styles.errorMessage}>{errorMessage}</span>
          </div>
        </div>
      )}

      {/* ── Upload area ── */}
      {isEmpty ? (
        /* Empty state: one wide full-width tile */
        <button
          type="button"
          className={styles.wideTile}
          onClick={openFilePicker}
          aria-label="Add photos"
        >
          <PlusIcon />
        </button>
      ) : (
        /* Has images: thumbnails + remaining square tiles */
        <div className={styles.tilesRow}>
          {/* Uploaded images */}
          {images.map((img) => (
            <div key={img.id} className={styles.uploadedTile}>
              <img src={img.src} alt="Uploaded" className={styles.uploadedImg} />
              <button
                type="button"
                className={styles.removeBtn}
                onClick={() => handleRemove(img.id)}
                aria-label="Remove image"
              >
                <CloseIconSmall />
              </button>
            </div>
          ))}

          {/* Empty upload slots */}
          {canAddMore &&
            Array.from({ length: remainingSlots }).map((_, i) => (
              <button
                key={`empty-${i}`}
                type="button"
                className={`${styles.squareTile} ${i > 0 ? styles.squareTileGhost : ''}`}
                onClick={openFilePicker}
                aria-label="Add photo"
                disabled={i > 0}
                tabIndex={i === 0 ? 0 : -1}
              >
                <PlusIcon />
              </button>
            ))}
        </div>
      )}

      {/* ── Photo tip ── */}
      <p className={styles.photoTip}>
        <strong className={styles.photoTipBold}>Photo tip:</strong>{' '}
        {photoTip}
      </p>
    </div>
  );
}
