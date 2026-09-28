import React from 'react';
import styles from './StayIntelligenceTrigger.module.css';

interface StayIntelligenceTriggerProps {
  onOpen: () => void;
}

export const StayIntelligenceTrigger: React.FC<StayIntelligenceTriggerProps> = ({ onOpen }) => {
  return (
    <button
      className={styles.triggerCard}
      onClick={onOpen}
      aria-label="Open Stay Intelligence Panel"
      type="button"
    >
      <div className={styles.iconContainer}>
        <span className={styles.icon}>✨</span>
      </div>
      <div className={styles.textContent}>
        <span className={styles.title}>Understand this stay</span>
        <span className={styles.subtitle}>See how it matches your trip &rarr;</span>
      </div>
    </button>
  );
};
