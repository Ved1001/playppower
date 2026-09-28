'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import styles from './StayIntelligencePanel.module.css';

import { Property } from '@/types/property';
import { UserPreferences, StayInsight } from '@/types/stayIntelligence';
import { calculateStayFit, DEFAULT_PREFERENCES } from '@/engine/stayFitEngine';

import { PreferenceForm } from './PreferenceForm';
import { FitScoreGauge } from './FitScoreGauge';
import { CategoryBreakdown } from './CategoryBreakdown';
import { MatchHighlights } from './MatchHighlights';
import { TradeoffSection } from './TradeoffSection';

interface StayIntelligencePanelProps {
  property: Property;
  onClose: () => void;
}

export default function StayIntelligencePanel({ property, onClose }: StayIntelligencePanelProps) {
  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [insight, setInsight] = useState<StayInsight | null>(null);

  const panelRef = useRef<HTMLDivElement>(null);

  // Recalculate on preference change
  useEffect(() => {
    const result = calculateStayFit(property, preferences);
    setInsight(result);
  }, [preferences, property]);

  // Handle Escape key to close and focus trap
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }

    // Focus trap implementation
    if (e.key === 'Tab' && panelRef.current) {
      const focusableElements = panelRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    // Focus close button on open
    setTimeout(() => {
      if (panelRef.current) {
        const closeBtn = panelRef.current.querySelector('button');
        closeBtn?.focus();
      }
    }, 100);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className={styles.overlay}>
      <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />

      <div
        className={styles.panel}
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Stay Intelligence Panel"
      >
        <div className={styles.header}>
          <h2 className={styles.title}>Stay Intelligence</h2>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close panel"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className={styles.demoBanner}>
          <span className={styles.demoBannerIcon}>ℹ️</span>
          Demo Feature — Rule-based scoring on mock listing data
        </div>

        <div className={styles.content}>
          <PreferenceForm
            preferences={preferences}
            onChange={setPreferences}
          />

          {insight && (
            <>
              <div className={styles.sectionDivider} />
              <FitScoreGauge
                score={insight.overallScore}
                label={insight.overallLabel}
                summary={insight.summary}
              />

              <div className={styles.sectionDivider} />
              <MatchHighlights matches={insight.matches} />

              <div className={styles.sectionDivider} />
              <TradeoffSection
                concerns={insight.concerns}
                tradeoffs={insight.tradeoffs}
              />

              <div className={styles.sectionDivider} />
              <CategoryBreakdown categories={insight.categoryScores} />
            </>
          )}

          <div className={styles.footerSpace} />
        </div>
      </div>
    </div>
  );
}
