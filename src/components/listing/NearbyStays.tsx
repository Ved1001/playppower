import { NearbyStay } from '@/types/property';
import styles from './NearbyStays.module.css';

interface NearbyStaysProps {
  stays: NearbyStay[];
}

export default function NearbyStays({ stays }: NearbyStaysProps) {
  const gradients = [
    'linear-gradient(135deg, #f5af19 0%, #f12711 100%)',
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.heading}>More stays nearby</h2>
        <div className={styles.pagination}>
          <span className={styles.pageInfo}>1 / 2</span>
          <button className={styles.navButton} aria-label="Previous">&lt;</button>
          <button className={styles.navButton} aria-label="Next">&gt;</button>
        </div>
      </div>

      <div className={styles.staysGrid}>
        {stays.map((stay) => (
          <div key={stay.id} className={styles.stayCard}>
            <div className={styles.imageContainer}>
              <img 
                src={stay.image || "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=600&auto=format&fit=crop"} 
                alt={""} /* Remove alt text to avoid displaying ugly text on broken loads before JS kicks in */
                className={styles.stayImage} 
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=600&auto=format&fit=crop";
                }}
              />
              <button className={styles.saveButton} aria-label="Save this stay">
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'rgba(0, 0, 0, 0.5)', height: '24px', width: '24px', stroke: 'white', strokeWidth: '2', overflow: 'visible' }}>
                  <path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"></path>
                </svg>
              </button>
            </div>
            <div className={styles.stayInfo}>
              <div className={styles.stayHeaderRow}>
                <h3 className={styles.stayTitle}>{stay.title}</h3>
                <div className={styles.stayRating}>★ {stay.rating}</div>
              </div>
              <div className={styles.stayPrice}>
                <span className={styles.priceValue}>{stay.currency}{stay.price.toLocaleString('en-IN')}</span>
                <span className={styles.priceNight}> night</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
