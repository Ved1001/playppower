'use client';

import React, { useState } from 'react';
import styles from './EvidenceAccordion.module.css';
import { Evidence } from '@/types/stayIntelligence';

interface EvidenceAccordionProps {
  evidences: Evidence[];
}

export const EvidenceAccordion: React.FC<EvidenceAccordionProps> = ({ evidences }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!evidences || evidences.length === 0) return null;

  const getSourceClass = (source: Evidence['source']) => {
    switch (source) {
      case 'LISTING': return styles.badgeListing;
      case 'REVIEWS': return styles.badgeReviews;
      case 'HOST': return styles.badgeHost;
      case 'SAFETY': return styles.badgeSafety;
      case 'POLICY': return styles.badgePolicy;
      case 'INFERRED': return styles.badgeInferred;
      default: return styles.badgeDefault;
    }
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.header}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className={styles.headerText}>
          {isOpen ? 'Hide' : 'Show'} details ({evidences.length})
        </span>
        <svg
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
          viewBox="0 0 24 24"
          width="16"
          height="16"
        >
          <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>

      <div
        className={`${styles.contentWrapper} ${isOpen ? styles.contentOpen : ''}`}
      >
        <ul className={styles.list}>
          {evidences.map((evidence, idx) => (
            <li key={idx} className={styles.listItem}>
              <span className={`${styles.badge} ${getSourceClass(evidence.source)}`}>
                {evidence.sourceLabel}
              </span>
              <span className={styles.evidenceText}>{evidence.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
