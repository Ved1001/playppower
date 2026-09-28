'use client';

import { useEffect, useState } from 'react';
import styles from './Header.module.css';
import { Property } from '@/types/property';

interface HeaderProps {
  property: Property;
}

export default function Header({ property }: HeaderProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('photos');

  useEffect(() => {
    const handleScroll = () => {
      const gallery = document.getElementById('photos');
      if (gallery) {
        const bottom = gallery.getBoundingClientRect().bottom;
        setIsVisible(bottom < 0);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.container}>
        <nav className={styles.nav} aria-label="Page navigation">
          {['Photos', 'Amenities', 'Reviews', 'Location'].map((tab) => {
            const id = tab.toLowerCase();
            return (
              <button
                key={id}
                className={`${styles.tab} ${activeTab === id ? styles.active : ''}`}
                onClick={() => scrollTo(id)}
                aria-label={`Scroll to ${tab}`}
              >
                {tab}
              </button>
            );
          })}
        </nav>
        <div className={styles.bookingInfo}>
          <div className={styles.priceContainer}>
            <div>
              <span className={styles.price}>
                {property.currency}{property.pricePerNight}
              </span>
              <span className={styles.night}> night</span>
            </div>
            <div className={styles.rating}>
              ★ {property.rating} · <span>{property.reviewCount} reviews</span>
            </div>
          </div>
          <button className={styles.reserveButton}>Reserve</button>
        </div>
      </div>
    </header>
  );
}
