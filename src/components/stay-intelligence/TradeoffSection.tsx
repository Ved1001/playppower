'use client';

import React from 'react';
import styles from './TradeoffSection.module.css';
import { Concern, TradeOff } from '@/types/stayIntelligence';

interface TradeoffSectionProps {
  concerns: Concern[];
  tradeoffs: TradeOff[];
}

export const TradeoffSection: React.FC<TradeoffSectionProps> = ({ concerns, tradeoffs }) => {
  if (concerns.length === 0 && tradeoffs.length === 0) return null;

  const getSeverityBadge = (severity: Concern['severity']) => {
    switch (severity) {
      case 'HIGH': return <span className={`${styles.badge} ${styles.badgeHigh}`}>High Priority</span>;
      case 'MEDIUM': return <span className={`${styles.badge} ${styles.badgeMedium}`}>Medium</span>;
      case 'LOW': return <span className={`${styles.badge} ${styles.badgeLow}`}>Note</span>;
      default: return null;
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.sectionTitle}>Trade-offs & Concerns</h3>
      
      <div className={styles.columns}>
        {/* Concerns Column */}
        {concerns.length > 0 && (
          <div className={styles.column}>
            <h4 className={styles.subTitle}>Potential concerns</h4>
            <div className={styles.list}>
              {concerns.map((concern, idx) => (
                <div key={idx} className={styles.card}>
                  <div className={styles.cardHeader}>
                    <span className={styles.icon}>{concern.icon}</span>
                    {getSeverityBadge(concern.severity)}
                  </div>
                  <p className={styles.concernText}>{concern.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tradeoffs Column */}
        {tradeoffs.length > 0 && (
          <div className={styles.column}>
            <h4 className={styles.subTitle}>Things to weigh</h4>
            <div className={styles.list}>
              {tradeoffs.map((tradeoff, idx) => (
                <div key={idx} className={styles.tradeoffCard}>
                  <div className={styles.positiveSide}>
                    <span className={styles.positiveIcon}>+</span>
                    <span>{tradeoff.positive}</span>
                  </div>
                  <div className={styles.divider}>
                    <span className={styles.dividerIcon}>{tradeoff.icon}</span>
                  </div>
                  <div className={styles.negativeSide}>
                    <span className={styles.negativeIcon}>-</span>
                    <span>{tradeoff.negative}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
