import { Host, CoHost } from '@/types/property';
import styles from './HostSection.module.css';

interface HostSectionProps {
  host: Host;
  coHosts: CoHost[];
}

export default function HostSection({ host, coHosts }: HostSectionProps) {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Meet your host</h2>
      
      <div className={styles.hostCard}>
        <div className={styles.hostInfo}>
          <div className={styles.avatarContainer}>
            <div 
              className={styles.avatar} 
              style={{ backgroundImage: `url(${host.avatar})` }}
            >
              {!host.avatar && host.name.charAt(0)}
            </div>
            {host.isSuperhost && (
              <div className={styles.badge} aria-label="Superhost">🛡️</div>
            )}
          </div>
          <div className={styles.hostDetails}>
            <h3 className={styles.hostName}>{host.name}</h3>
            <p className={styles.hostRole}>Host</p>
          </div>
        </div>

        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{host.totalReviews}</span>
            <span className={styles.statLabel}>Reviews</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{host.rating}★</span>
            <span className={styles.statLabel}>Rating</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{host.yearsHosting}</span>
            <span className={styles.statLabel}>Years hosting</span>
          </div>
        </div>
      </div>

      <div className={styles.contentGrid}>
        <div className={styles.leftColumn}>
          <div className={styles.hostFacts}>
            {host.bornIn && (
              <div className={styles.fact}>
                <span className={styles.icon}>🎈</span>
                <span>{host.bornIn}</span>
              </div>
            )}
            {host.school && (
              <div className={styles.fact}>
                <span className={styles.icon}>🎓</span>
                <span>{host.school}</span>
              </div>
            )}
          </div>

          <div className={styles.coHostsSection}>
            <h4>Co-hosts</h4>
            <div className={styles.coHostsGrid}>
              {coHosts.map((coHost, index) => (
                <div key={index} className={styles.coHostItem}>
                  <div 
                    className={styles.coHostAvatar} 
                    style={{ backgroundImage: `url(${coHost.avatar})` }}
                  >
                    {!coHost.avatar && coHost.name.charAt(0)}
                  </div>
                  <span className={styles.coHostName}>{coHost.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.rightColumn}>
          <p className={styles.responseInfo}>
            Response rate: {Math.round(host.responseRate * 100)}%<br />
            Responds {host.responseTime}
          </p>
          
          <button 
            className={styles.messageButton} 
            onClick={() => {
              const msg = window.prompt(`What would you like to ask ${host.name}?`);
              if (msg) alert('Message sent successfully!');
            }}
          >
            Message host
          </button>
          
          <p className={styles.securityDisclaimer}>
            To protect your payment, never transfer money or communicate outside of the Airbnb website or app.
          </p>
        </div>
      </div>
    </div>
  );
}
