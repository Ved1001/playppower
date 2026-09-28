'use client';

import React from 'react';
import { useBooking, Guests } from '@/context/BookingContext';
import styles from './GuestSelector.module.css';

interface GuestSelectorProps {
  maxGuests?: number;
  onClose?: () => void;
}

export default function GuestSelector({ maxGuests = 16, onClose }: GuestSelectorProps) {
  const { guests, updateGuests, totalGuestCount } = useBooking();

  const handleIncrement = (type: keyof Guests, e: React.MouseEvent) => {
    e.stopPropagation();
    if (type === 'adults' || type === 'children') {
      if (totalGuestCount >= maxGuests) return;
    }
    updateGuests(type, guests[type] + 1);
  };

  const handleDecrement = (type: keyof Guests, e: React.MouseEvent) => {
    e.stopPropagation();
    if (type === 'adults' && guests.adults <= 1) return; // Min 1 adult
    if (guests[type] <= 0) return;
    updateGuests(type, guests[type] - 1);
  };

  return (
    <div className={styles.guestDropdown}>
      <div className={styles.guestRow}>
        <div className={styles.guestInfo}>
          <strong>Adults</strong>
          <span>Age 13+</span>
        </div>
        <div className={styles.guestControls}>
          <button 
            disabled={guests.adults <= 1} 
            onClick={(e) => handleDecrement('adults', e)}
          >-</button>
          <span>{guests.adults}</span>
          <button 
            disabled={totalGuestCount >= maxGuests} 
            onClick={(e) => handleIncrement('adults', e)}
          >+</button>
        </div>
      </div>
      
      <div className={styles.guestRow}>
        <div className={styles.guestInfo}>
          <strong>Children</strong>
          <span>Ages 2-12</span>
        </div>
        <div className={styles.guestControls}>
          <button 
            disabled={guests.children <= 0} 
            onClick={(e) => handleDecrement('children', e)}
          >-</button>
          <span>{guests.children}</span>
          <button 
            disabled={totalGuestCount >= maxGuests} 
            onClick={(e) => handleIncrement('children', e)}
          >+</button>
        </div>
      </div>
      
      <div className={styles.guestRow}>
        <div className={styles.guestInfo}>
          <strong>Infants</strong>
          <span>Under 2</span>
        </div>
        <div className={styles.guestControls}>
          <button 
            disabled={guests.infants <= 0} 
            onClick={(e) => handleDecrement('infants', e)}
          >-</button>
          <span>{guests.infants}</span>
          <button 
            disabled={guests.infants >= 5} // Arbitrary max for infants
            onClick={(e) => handleIncrement('infants', e)}
          >+</button>
        </div>
      </div>
      
      <div className={styles.guestRow}>
        <div className={styles.guestInfo}>
          <strong>Pets</strong>
          <span>Service animals aren&apos;t pets</span>
        </div>
        <div className={styles.guestControls}>
          <button 
            disabled={guests.pets <= 0} 
            onClick={(e) => handleDecrement('pets', e)}
          >-</button>
          <span>{guests.pets}</span>
          <button 
            disabled={guests.pets >= 3} 
            onClick={(e) => handleIncrement('pets', e)}
          >+</button>
        </div>
      </div>

      <div className={styles.footerInfo}>
        This place has a maximum of {maxGuests} guests, not including infants.
      </div>
      
      {onClose && (
        <div className={styles.closeAction}>
          <button onClick={(e) => { e.stopPropagation(); onClose(); }}>Close</button>
        </div>
      )}
    </div>
  );
}
