'use client';

import { useState } from 'react';
import styles from './PropertyDescription.module.css';

interface PropertyDescriptionProps {
  description: string;
}

export default function PropertyDescription({ description }: PropertyDescriptionProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>About this space</h2>
      <div className={`${styles.description} ${expanded ? styles.expanded : ''}`}>
        {description.split('\n').map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
      {!expanded && (
        <button 
          className={styles.showMoreButton} 
          onClick={() => setExpanded(true)}
          aria-expanded="false"
        >
          Show more <span aria-hidden="true">&gt;</span>
        </button>
      )}
    </div>
  );
}
