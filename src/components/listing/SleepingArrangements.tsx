import { SleepingArrangement } from '@/types/property';
import styles from './SleepingArrangements.module.css';

interface SleepingArrangementsProps {
  arrangements: SleepingArrangement[];
}

export default function SleepingArrangements({ arrangements }: SleepingArrangementsProps) {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Where you&apos;ll sleep</h2>
      <div className={styles.cardsContainer}>
        {arrangements.map((arrangement, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.icon} aria-hidden="true">
              🛏️
            </div>
            <div className={styles.room}>{arrangement.room}</div>
            <div className={styles.bedType}>{arrangement.bedType}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
