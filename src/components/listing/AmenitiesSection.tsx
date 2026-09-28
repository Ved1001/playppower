import { useState } from 'react';
import { Amenity } from '@/types/property';
import styles from './AmenitiesSection.module.css';

interface AmenitiesSectionProps {
  amenities: Amenity[];
}

const getIconSvg = (iconName: string) => {
  switch (iconName) {
    case 'pool':
      return <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 2c-4.42 0-8 3.58-8 8 0 2.25 1.05 4.3 2.76 5.67C8.16 16 10.02 15 12 15s3.84 1 5.24 2.67C18.95 16.3 20 14.25 20 12c0-4.42-3.58-8-8-8zM7 11h10v2H7v-2z" /></svg>;
    case 'hot_tub':
      return <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M7 15h10v2H7v-2zm0-4h10v2H7v-2zm0-4h10v2H7V7zm12-4H5v18h14V3zM3 1h18v22H3V1z" /></svg>;
    case 'wifi':
      return <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M12 3C7.5 3 3.3 4.6.4 7.2l1.4 1.8C4.3 6.6 8 5.2 12 5.2s7.7 1.4 10.2 3.8l1.4-1.8C20.7 4.6 16.5 3 12 3zM12 8C8.9 8 6.1 9 3.8 10.6l1.4 1.8c1.8-1.2 4.1-1.9 6.8-1.9s5 1 6.8 1.9l1.4-1.8C17.9 9 15.1 8 12 8zm0 5c-1.5 0-2.8.5-4 1.2l1.4 1.8C10.2 15.6 11.1 15.3 12 15.3s1.8.3 2.6.7l1.4-1.8C14.8 13.5 13.5 13 12 13zm0 5c-.7 0-1.3.5-1.3 1.3 0 .7.5 1.3 1.3 1.3s1.3-.5 1.3-1.3c0-.7-.5-1.3-1.3-1.3z" /></svg>;
    case 'kitchen':
    case 'fridge':
    case 'microwave':
      return <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M18 4H6C4.9 4 4 4.9 4 6v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H6v-6h12v6zm0-8H6V6h12v4z" /></svg>;
    case 'workspace':
      return <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M20 18v-4h-3v4h-4v-4H7v4H4v-8h16v8h-3zm2-10H2V6h20v2zM6 10h12v2H6v-2z" /></svg>;
    case 'ac':
    case 'heating':
      return <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M17 11h2V9h-2V7h-2v2h-2V7h-2v2H9V7H7v2H5v2h2v2H5v2h2v2h2v-2h2v2h2v-2h2v2h2v-2h2v-2h-2v-2z" /></svg>;
    case 'parking':
      return <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M14 6H7v12h2v-4h5c2.2 0 4-1.8 4-4s-1.8-4-4-4zm0 6H9V8h5c1.1 0 2 .9 2 2s-.9 2-2 2z" /></svg>;
    case 'tv':
      return <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z" /></svg>;
    case 'smoke':
    case 'co':
      return <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" /></svg>;
    case 'patio':
    case 'outdoor_dining':
    case 'bbq':
      return <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M19 13h-4V7H9v6H5v6h14v-6zm-6-4h2v4h-2V9zm-4 0h2v4H9V9z" /></svg>;
    default:
      // Generic checkmark fallback
      return <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" /></svg>;
  }
};

export default function AmenitiesSection({ amenities }: AmenitiesSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const displayedAmenities = amenities.slice(0, 10);

  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.heading}>What this place offers</h2>
        <div className={styles.grid}>
          {displayedAmenities.map((amenity) => (
            <div 
              key={amenity.id} 
              className={`${styles.amenityItem} ${amenity.isStrikethrough ? styles.strikethrough : ''}`}
            >
              <span className={styles.icon} aria-hidden="true">{getIconSvg(amenity.icon)}</span>
              <span className={styles.name}>{amenity.name}</span>
            </div>
          ))}
        </div>
        <button className={styles.showAllButton} onClick={() => setIsModalOpen(true)}>
          Show all {amenities.length} amenities
        </button>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <button className={styles.modalCloseBtn} onClick={() => setIsModalOpen(false)}>✕</button>
            </div>
            <div className={styles.modalBody}>
              <h2 className={styles.modalHeading}>What this place offers</h2>
              <div className={styles.modalList}>
                {amenities.map((amenity) => (
                  <div key={amenity.id} className={`${styles.amenityItem} ${amenity.isStrikethrough ? styles.strikethrough : ''} ${styles.modalAmenityItem}`}>
                    <span className={styles.icon} aria-hidden="true">{getIconSvg(amenity.icon)}</span>
                    <span className={styles.name}>{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
