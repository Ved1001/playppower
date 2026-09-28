'use client';

import React from 'react';
import styles from './CategoryBreakdown.module.css';
import { CategoryScore } from '@/types/stayIntelligence';
import { EvidenceAccordion } from './EvidenceAccordion';

interface CategoryBreakdownProps {
  categories: CategoryScore[];
}

export const CategoryBreakdown: React.FC<CategoryBreakdownProps> = ({ categories }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.sectionTitle}>Category Breakdown</h3>
      <div className={styles.list}>
        {categories.map((cat) => {
          let color = 'var(--color-error)';
          if (cat.score >= 85) color = 'var(--color-success)';
          else if (cat.score >= 70) color = 'var(--color-warning)';

          return (
            <div key={cat.category} className={styles.row}>
              <div className={styles.header}>
                <div className={styles.labelGroup}>
                  <span className={styles.icon}>{cat.icon}</span>
                  <span className={styles.label}>{cat.label}</span>
                </div>
                <span className={styles.scoreNum}>{cat.score}%</span>
              </div>
              
              <div className={styles.barContainer}>
                <div 
                  className={styles.barFill} 
                  style={{ width: `${cat.score}%`, backgroundColor: color }}
                />
              </div>

              <EvidenceAccordion evidences={cat.evidences} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
