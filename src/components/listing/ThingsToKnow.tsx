import { CancellationPolicy, HouseRule, SafetyItem } from '@/types/property';
import styles from './ThingsToKnow.module.css';

interface ThingsToKnowProps {
  cancellationPolicy: CancellationPolicy;
  houseRules: HouseRule[];
  safetyItems: SafetyItem[];
}

const renderIcon = (name: string) => {
  switch (name) {
    case 'clock':
      return (
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '24px', width: '24px', fill: 'currentcolor' }}>
          <path d="M16 1a15 15 0 1 1 0 30 15 15 0 0 1 0-30zm0 2a13 13 0 1 0 0 26 13 13 0 0 0 0-26zm7.29 16.71l-6.58-6.59V6h2v6.29l6 6-1.42 1.42z"></path>
        </svg>
      );
    case 'guests':
      return (
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '24px', width: '24px', fill: 'currentcolor' }}>
          <path d="M16 1c4.42 0 8 3.58 8 8s-3.58 8-8 8-8-3.58-8-8 3.58-8 8-8zm0 2c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm11.96 22.8c-1.39-4.22-5.38-7.2-10.08-7.75l-.48-.05h-2.8l-.48.05c-4.7.55-8.69 3.53-10.08 7.75L4 26.1V31h24v-4.9l-.04-.3zM26 28H6v-1.12c1.07-3.21 4.14-5.55 7.6-6l.4-.04h4l.4.04c3.46.45 6.53 2.79 7.6 6L26 26.88V28z"></path>
        </svg>
      );
    case 'alert':
      return (
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '24px', width: '24px', fill: 'currentcolor' }}>
          <path d="M16 1a15 15 0 1 1 0 30 15 15 0 0 1 0-30zm0 2a13 13 0 1 0 0 26 13 13 0 0 0 0-26zm1 20v2h-2v-2h2zm0-12v10h-2V11h2z"></path>
        </svg>
      );
    case 'camera':
      return (
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '24px', width: '24px', fill: 'currentcolor' }}>
          <path d="M22 8h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h6L12 4h8l2 4zM16 11a7 7 0 1 0 0 14 7 7 0 0 0 0-14zm0 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10z"></path>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '24px', width: '24px', fill: 'currentcolor' }}>
          <circle cx="16" cy="16" r="4"></circle>
        </svg>
      );
  }
};

export default function ThingsToKnow({ 
  cancellationPolicy, 
  houseRules, 
  safetyItems 
}: ThingsToKnowProps) {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Things to know</h2>
      <div className={styles.grid}>
        <div className={styles.column}>
          <h3 className={styles.columnTitle}>House rules</h3>
          <ul className={styles.list}>
            {houseRules.map((rule, index) => (
              <li key={index} className={styles.listItem}>
                <span className={styles.icon} aria-hidden="true">{renderIcon(rule.icon)}</span>
                <span>{rule.text}</span>
              </li>
            ))}
          </ul>
          <button className={styles.learnMoreBtn}>Show more</button>
        </div>

        <div className={styles.column}>
          <h3 className={styles.columnTitle}>Safety & property</h3>
          <ul className={styles.list}>
            {safetyItems.map((item, index) => (
              <li key={index} className={styles.listItem}>
                <span className={styles.icon} aria-hidden="true">{renderIcon(item.icon)}</span>
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
          <button className={styles.learnMoreBtn}>Show more</button>
        </div>

        <div className={styles.column}>
          <h3 className={styles.columnTitle}>Cancellation policy</h3>
          <ul className={styles.list}>
            {cancellationPolicy.lines.map((line, index) => (
              <li key={index} className={styles.listItem}>
                <span>{line}</span>
              </li>
            ))}
          </ul>
          <button className={styles.learnMoreBtn}>Show more</button>
        </div>
      </div>
    </div>
  );
}
