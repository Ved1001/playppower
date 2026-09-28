'use client';

import { useState } from 'react';
import { PropertyImage } from '@/types/property';
import styles from './PropertyGallery.module.css';
import Image from 'next/image';
import StoryTourOverlay from '@/components/overlays/StoryTourOverlay';

interface PropertyGalleryProps {
  images: PropertyImage[];
  onOpenLightbox: (index: number) => void;
}

export default function PropertyGallery({ images, onOpenLightbox }: PropertyGalleryProps) {
  const [isStoryOpen, setIsStoryOpen] = useState(false);

  // Generate engaging story data based on property images
  const storyData = images.map((img, idx) => {
    const titles = [
      "🌅 Wake up to paradise",
      "🛋️ Ultra luxury living",
      "🏊‍♂️ Your private oasis",
      "🛏️ Dream in comfort",
      "🛁 Spa-like serenity"
    ];
    return {
      id: img.id,
      imageSrc: img.src,
      captionTitle: titles[idx] || "Explore the villa",
      captionSubtitle: img.caption || img.alt
    };
  });

  return (
    <>
      <div className={styles.galleryContainer}>
        <div className={styles.grid}>
          <div className={styles.mainImageWrapper}>
            {images[0] && (
              <img 
                src={images[0].src} 
                alt={""}
                className={styles.imageReal}
                onClick={() => onOpenLightbox(0)}
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=1200&auto=format&fit=crop";
                }}
              />
            )}
            <button 
              className={styles.storyTriggerBtn}
              onClick={() => setIsStoryOpen(true)}
            >
              <span className={styles.storyRing}></span>
              <span className={styles.storyIcon}>✨</span>
              <span>View Story</span>
            </button>
          </div>
          <div className={styles.subGrid}>
            {[1, 2, 3, 4].map((index) => (
              <div 
                key={index} 
                className={styles.subImageWrapper} 
                onClick={() => onOpenLightbox(index)}
              >
                {images[index] && (
                  <img 
                    src={images[index].src} 
                    alt={""}
                    className={styles.imageReal}
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=800&auto=format&fit=crop";
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        <button 
          className={styles.showAllButton} 
          onClick={() => onOpenLightbox(0)}
          aria-label="Show all photos"
        >
          <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', height: '14px', width: '14px', fill: 'currentColor' }} aria-hidden="true" role="presentation" focusable="false"><path d="M3 11h10v2H3v-2zm0-4h10v2H3V7zm0-4h10v2H3V3z"></path></svg>
          <span>Show all photos</span>
        </button>
      </div>

      {isStoryOpen && (
        <StoryTourOverlay 
          stories={storyData} 
          onClose={() => setIsStoryOpen(false)} 
        />
      )}
    </>
  );
}
