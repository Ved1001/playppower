'use client';

import React, { useEffect, useState } from 'react';
import styles from './FitScoreGauge.module.css';

interface FitScoreGaugeProps {
  score: number;
  label: string;
  summary: string;
}

export const FitScoreGauge: React.FC<FitScoreGaugeProps> = ({ score, label, summary }) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score);
    }, 100);
    return () => clearTimeout(timer);
  }, [score]);

  // Determine color based on score
  let color = 'var(--color-error)';
  if (score >= 85) color = 'var(--color-success)';
  else if (score >= 70) color = 'var(--color-warning)';

  const size = 160;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  return (
    <div className={styles.container}>
      <div className={styles.gaugeWrapper}>
        <svg
          width={size}
          height={size}
          className={styles.svg}
          style={{ '--progress-circumference': circumference, '--progress-offset': strokeDashoffset } as React.CSSProperties}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className={styles.bgCircle}
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className={styles.progressCircle}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            stroke={color}
          />
        </svg>
        <div className={styles.scoreContent}>
          <span className={styles.scoreText}>{score}%</span>
        </div>
      </div>
      <div className={styles.textContainer}>
        <h2 className={styles.label}>{label}</h2>
        <p className={styles.summary}>{summary}</p>
      </div>
    </div>
  );
};
