'use client';

import { useState } from 'react';
import { LocationHighlights } from '@/types/property';
import styles from './LocationSection.module.css';

interface LocationSectionProps {
  locationHighlights: LocationHighlights;
}

export default function LocationSection({ locationHighlights }: LocationSectionProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Where you&apos;ll be</h2>
      <div className={styles.mapContainer}>
        <div className={styles.mapVisual}>
          <img 
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop" 
            alt="" 
            className={styles.mapBackground} 
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop";
            }}
          />
          
          <div className={styles.pinOverlay}>
            <div className={styles.airbnbPin}>
              <div className={styles.pinIcon}>
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'white', height: '16px', width: '16px' }}>
                  <path d="M16 1c-5.523 0-10 4.477-10 10 0 6.666 10 20 10 20s10-13.334 10-20c0-5.523-4.477-10-10-10zm0 15c-2.761 0-5-2.239-5-5s2.239-5 5-5 5 2.239 5 5-2.239 5-5 5z"></path>
                </svg>
              </div>
            </div>
            <div className={styles.pulseRing}></div>
          </div>
          
          <div className={styles.mapLabels}>
            <span className={styles.labelGoa}>Goa</span>
            <span className={styles.labelCandolim}>Candolim Beach</span>
          </div>

          <div className={styles.mapControls}>
            <button aria-label="Zoom in">+</button>
            <button aria-label="Zoom out">-</button>
          </div>
        </div>
      </div>
      
      {!locationHighlights.exactLocationBeforeBooking && (
        <p className={styles.exactLocationNotice}>
          Exact location will be provided after booking
        </p>
      )}

      <div className={styles.highlightsContainer}>
        <h3 className={styles.subheading}>Neighbourhood highlights</h3>
        <p className={`${styles.description} ${expanded ? styles.expanded : ''}`}>
          {locationHighlights.description}
        </p>
        {!expanded && (
          <button 
            className={styles.showMoreButton} 
            onClick={() => setExpanded(true)}
          >
            Show more <span aria-hidden="true">&gt;</span>
          </button>
        )}
      </div>
    </div>
  );
}
