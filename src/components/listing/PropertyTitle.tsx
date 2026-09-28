import { useState } from 'react';
import { Property } from '@/types/property';
import styles from './PropertyTitle.module.css';

interface PropertyTitleProps {
  property: Property;
}

export default function PropertyTitle({ property }: PropertyTitleProps) {
  const [isSaved, setIsSaved] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{property.title}</h1>
        <div className={styles.actions}>
          <button className={styles.actionButton} aria-label="Share property" onClick={handleShare}>
            <span aria-hidden="true">📤</span> Share
          </button>
          <button className={styles.actionButton} aria-label="Save property" onClick={handleSave}>
            <span aria-hidden="true" style={{ color: isSaved ? '#FF385C' : 'inherit' }}>{isSaved ? '♥' : '♡'}</span> {isSaved ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>
      <div className={styles.subtitle}>
        <span>{property.maxGuests} guests</span>
        <span className={styles.dot}>·</span>
        <span>{property.bedrooms} bedroom{property.bedrooms > 1 ? 's' : ''}</span>
        <span className={styles.dot}>·</span>
        <span>{property.beds} bed{property.beds > 1 ? 's' : ''}</span>
        <span className={styles.dot}>·</span>
        <span>{property.baths} bath{property.baths > 1 ? 's' : ''}</span>
      </div>
    </div>
  );
}
