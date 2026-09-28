'use client';

import React from 'react';
import styles from './MatchHighlights.module.css';
import { MatchHighlight } from '@/types/stayIntelligence';

interface MatchHighlightsProps {
  matches: MatchHighlight[];
}

export const MatchHighlights: React.FC<MatchHighlightsProps> = ({ matches }) => {
  if (!matches || matches.length === 0) return null;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.headerIcon}>✅</span>
        <h3 className={styles.title}>Why this matches you</h3>
      </div>
      <ul className={styles.list}>
        {matches.map((match, idx) => (
          <li key={idx} className={styles.item}>
            <span className={styles.icon}>{match.icon}</span>
            <span className={styles.text}>{match.text}</span>
            {match.verified && (
              <span className={styles.verifiedBadge} title="Verified based on listing data">
                ✓ Verified
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
