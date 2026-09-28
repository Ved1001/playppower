'use client';

import { useEffect, useCallback, useRef } from 'react';
import { PropertyImage } from '@/types/property';
import styles from './Lightbox.module.css';

interface LightboxProps {
  images: PropertyImage[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({
  images,
  currentIndex,
  onClose,
  onNavigate,
}: LightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePrev = useCallback(() => {
    onNavigate(currentIndex > 0 ? currentIndex - 1 : images.length - 1);
  }, [currentIndex, images.length, onNavigate]);

  const handleNext = useCallback(() => {
    onNavigate(currentIndex < images.length - 1 ? currentIndex + 1 : 0);
  }, [currentIndex, images.length, onNavigate]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          handlePrev();
          break;
        case 'ArrowRight':
          handleNext();
          break;
      }
    },
    [onClose, handlePrev, handleNext]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // Gradient backgrounds for placeholder images
  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  ];

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label="Photo lightbox"
      ref={containerRef}
    >
      {/* Header */}
      <div className={styles.header}>
        <button
          ref={closeButtonRef}
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close lightbox"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
          <span>Close</span>
        </button>
        <span className={styles.counter}>
          {currentIndex + 1} / {images.length}
        </span>
      </div>

      {/* Image Display */}
      <div className={styles.imageContainer}>
        <button
          className={`${styles.navButton} ${styles.navPrev}`}
          onClick={handlePrev}
          aria-label="Previous image"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div
          className={styles.imageWrapper}
        >
          {images[currentIndex] && (
            <img 
              src={images[currentIndex].src} 
              alt={images[currentIndex].alt || 'Property Image'} 
              className={styles.fullScreenImage}
            />
          )}
          <div className={styles.imageCaptionOverlay}>
            <span className={styles.imageCaption}>
              {images[currentIndex]?.caption || images[currentIndex]?.alt}
            </span>
          </div>
        </div>

        <button
          className={`${styles.navButton} ${styles.navNext}`}
          onClick={handleNext}
          aria-label="Next image"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Thumbnail Strip */}
      <div className={styles.thumbnailStrip} role="tablist" aria-label="Image thumbnails">
        {images.map((image, index) => (
          <button
            key={image.id}
            className={`${styles.thumbnail} ${index === currentIndex ? styles.thumbnailActive : ''}`}
            onClick={() => onNavigate(index)}
            style={{ background: gradients[index % gradients.length] }}
            role="tab"
            aria-selected={index === currentIndex}
            aria-label={`View image ${index + 1}: ${image.alt}`}
          />
        ))}
      </div>
    </div>
  );
}
