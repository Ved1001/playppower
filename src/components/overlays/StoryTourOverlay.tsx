'use client';

import React, { useState, useEffect, useCallback } from 'react';
import styles from './StoryTourOverlay.module.css';

interface Story {
  id: string;
  imageSrc: string;
  captionTitle: string;
  captionSubtitle: string;
}

interface StoryTourOverlayProps {
  stories: Story[];
  onClose: () => void;
}

const STORY_DURATION_MS = 5000;

export default function StoryTourOverlay({ stories, onClose }: StoryTourOverlayProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const nextStory = useCallback(() => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setProgress(0);
    } else {
      onClose(); // Close if it's the last story
    }
  }, [currentIndex, stories.length, onClose]);

  const prevStory = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setProgress(0);
    } else {
      setProgress(0); // Restart first story
    }
  }, [currentIndex]);

  // Handle auto-advance and progress bar
  useEffect(() => {
    const updateInterval = 50; // Update progress every 50ms for smoothness
    const increment = (updateInterval / STORY_DURATION_MS) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev + increment >= 100) {
          clearInterval(timer);
          nextStory();
          return 100;
        }
        return prev + increment;
      });
    }, updateInterval);

    return () => clearInterval(timer);
  }, [currentIndex, nextStory]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') nextStory();
      if (e.key === 'ArrowLeft') prevStory();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose, nextStory, prevStory]);

  return (
    <div className={styles.overlay}>
      <div className={styles.backdrop} onClick={onClose}></div>
      
      <div className={styles.storyContainer}>
        {/* Progress Bars */}
        <div className={styles.progressContainer}>
          {stories.map((_, idx) => (
            <div key={idx} className={styles.progressBarWrapper}>
              <div 
                className={styles.progressBarFill} 
                style={{ 
                  width: idx === currentIndex ? `${progress}%` : (idx < currentIndex ? '100%' : '0%'),
                  transition: idx === currentIndex ? 'width 50ms linear' : 'none'
                }}
              />
            </div>
          ))}
        </div>

        {/* Header Controls */}
        <div className={styles.header}>
          <div className={styles.brand}>✨ StoryTours</div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close story">
            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
          </button>
        </div>

        {/* Story Content */}
        <div className={styles.imageWrapper}>
          <img 
            src={stories[currentIndex].imageSrc} 
            alt="Property Story" 
            className={styles.storyImage} 
          />
          <div className={styles.vignette}></div>
          <div className={styles.textOverlay}>
            <h2 className={styles.captionTitle}>{stories[currentIndex].captionTitle}</h2>
            <p className={styles.captionSubtitle}>{stories[currentIndex].captionSubtitle}</p>
          </div>
        </div>

        {/* Tap Zones */}
        <div className={styles.tapZoneLeft} onClick={prevStory}></div>
        <div className={styles.tapZoneRight} onClick={nextStory}></div>
      </div>
    </div>
  );
}
