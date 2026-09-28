'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './GlobalHeader.module.css';

import InteractiveCalendar from '@/components/ui/InteractiveCalendar';
import GuestSelector from '@/components/ui/GuestSelector';
import { useBooking, formatGuestString } from '@/context/BookingContext';

export default function GlobalHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSearchMenu, setActiveSearchMenu] = useState<'destination' | 'dates' | 'guests' | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const { checkIn, checkOut, setCheckIn, setCheckOut, guests, totalGuestCount } = useBooking();

  // ... (rest of the component state hooks remain same)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      if (window.scrollY > 50) {
        setActiveSearchMenu(null);
        setIsProfileOpen(false);
      }
    };
    
    // Close dropdowns on click outside
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(`.${styles.searchBar}`) && !target.closest(`.${styles.expandedSearchOverlay}`)) {
        setActiveSearchMenu(null);
      }
      if (!target.closest(`.${styles.profileDropdown}`) && !target.closest(`.${styles.profileMenu}`)) {
        setIsProfileOpen(false);
      }
    };

    // Close dropdowns on ESC key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveSearchMenu(null);
        setIsProfileOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const formatDate = (date: Date | null) => {
    if (!date) return 'Add dates';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/" className={styles.logoGroup}>
          <svg viewBox="0 0 32 32" fill="currentColor" width="32" height="32" className={styles.logoIcon}>
            <path d="M16 1.98l-15.5 14.1 2 2.22L4 16.94V29.5a1.5 1.5 0 001.5 1.5h21a1.5 1.5 0 001.5-1.5V16.94l1.5 1.36 2-2.22L16 1.98zm10 27H6V15.12l10-9.1 10 9.1V28.98zM16 9c-3.31 0-6 2.69-6 6v4h12v-4c0-3.31-2.69-6-6-6zm4 8h-8v-2c0-2.21 1.79-4 4-4s4 1.79 4 4v2z" />
          </svg>
          <span className={styles.brandName}>airbnb</span>
        </Link>

        {/* Dynamic Search Pill */}
        <div className={`${styles.searchBar} ${activeSearchMenu ? styles.searchBarActive : ''}`}>
          <button 
            className={`${styles.searchBtn} ${activeSearchMenu === 'destination' ? styles.activeBtn : ''}`}
            onClick={(e) => { e.stopPropagation(); setActiveSearchMenu('destination'); }}
          >
            Anywhere
          </button>
          <span className={styles.divider}></span>
          <button 
            className={`${styles.searchBtn} ${activeSearchMenu === 'dates' ? styles.activeBtn : ''}`}
            onClick={(e) => { e.stopPropagation(); setActiveSearchMenu('dates'); }}
          >
            {checkIn && checkOut ? `${formatDate(checkIn)} - ${formatDate(checkOut)}` : 'Any week'}
          </button>
          <span className={styles.divider}></span>
          <button 
            className={`${styles.searchBtn} ${styles.addGuests} ${activeSearchMenu === 'guests' ? styles.activeBtn : ''}`}
            onClick={(e) => { e.stopPropagation(); setActiveSearchMenu('guests'); }}
          >
            Add guests
          </button>
          <div className={styles.searchIconWrapper} onClick={() => setActiveSearchMenu('destination')}>
            <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="4" width="12" height="12">
              <path d="M13 24a11 11 0 100-22 11 11 0 000 22zm8-3l9 9" />
            </svg>
          </div>
        </div>

        {/* Right Nav */}
        <div className={styles.rightNav}>
          <Link href="/founder" className={styles.hostLink}>
            Meet the Founder ✨
          </Link>
          <button className={styles.globeBtn} aria-label="Choose language and currency">
            <svg viewBox="0 0 16 16" fill="currentColor" width="16" height="16">
              <path d="M8 .5C3.86.5.5 3.86.5 8s3.36 7.5 7.5 7.5 7.5-3.36 7.5-7.5S12.14.5 8 .5zm0 14c-1.25 0-2.45-.4-3.44-1.09.8-3.08 2.05-5.91 3.44-8.4.38.68.74 1.37 1.07 2.08-.2.03-.4.05-.62.05h-.72c-.22 0-.44.02-.65.05.07.24.14.48.21.72h1.4c.06.24.12.48.17.73h-1.6c-.1.49-.19.98-.27 1.48h1.8c.02.24.04.49.05.74H7.26c-.05.5-.1 1-.13 1.5h1.74c0 .25 0 .5-.01.75H7.07c-.01.25-.01.5-.02.75h1.89c-.06.74-.15 1.48-.26 2.2-.42.06-.86.1-1.3.1zm1.3-3.66c.11-.72.2-1.46.26-2.2h1.6c-.12 1-.31 1.98-.56 2.94-.4.18-.84.32-1.3.42zm2.08-1.5c.34-1.15.58-2.34.72-3.55h1.36c.21.84.32 1.72.32 2.62 0 .32-.02.63-.06.93h-1.3zm.78-4.55c-.15-1.22-.4-2.42-.76-3.58.46.12.89.29 1.3.5.25.96.44 1.95.55 2.94h-1.35C11.96 5.86 11.66 5.33 11.33 4.81c.21.04.43.09.64.15zm-2.12.56c-.34-.74-.71-1.47-1.1-2.17-.4.69-.77 1.41-1.1 2.15l-.22-.72c.4-.74.83-1.47 1.28-2.18h.08c.45.7.87 1.43 1.27 2.18l-.21.74zm-2.82 1.83h1.83c.09-.5.18-1 .27-1.5h-2.38c.1.5.19 1 .28 1.5zm.3-2.5c.34-.74.7-1.46 1.09-2.15.4.69.76 1.42 1.1 2.16l-.23.75h-1.74l-.22-.76zM4.04 6.78c-.28-1-.48-2.02-.58-3.07h1.4c-.16 1.22-.43 2.41-.81 3.56l-.01-.49zm.65 1.05h1.35c0-.3.02-.6.06-.91.31-.05.61-.12.92-.2-.23-.82-.44-1.65-.6-2.5-.47.16-.92.36-1.35.6-.28.98-.5 1.98-.65 3.01h.27zm-.86 2.37c-.1-.7-.17-1.42-.2-2.14H2.4c.01.62.06 1.22.15 1.8.31-.19.64-.34.98-.48.04.28.09.55.15.82z" />
            </svg>
          </button>
          
          <div className={styles.profileWrapper}>
            <div 
              className={styles.profileDropdown} 
              onClick={(e) => { e.stopPropagation(); setIsProfileOpen(!isProfileOpen); }}
            >
              <div className={styles.hamburger}>
                <span></span><span></span><span></span>
              </div>
              <svg viewBox="0 0 32 32" fill="#717171" width="32" height="32">
                <path d="M16 1c8.28 0 15 6.72 15 15s-6.72 15-15 15S1 24.28 1 16 7.72 1 16 1zm0 2c-7.18 0-13 5.82-13 13s5.82 13 13 13 13-5.82 13-13S23.18 3 16 3zm0 4.65c2.4 0 4.35 1.95 4.35 4.35s-1.95 4.35-4.35 4.35-4.35-1.95-4.35-4.35 1.95-4.35 4.35-4.35zm0 2c-1.3 0-2.35 1.05-2.35 2.35s1.05 2.35 2.35 2.35 2.35-1.05 2.35-2.35-1.05-2.35-2.35-2.35zm7.3 12.3c.3.4.6.83.87 1.28-1.9 1.97-4.66 3.27-7.67 3.27-3 0-5.77-1.3-7.67-3.27.27-.45.57-.88.87-1.28 1.4-1.9 3.8-3.05 6.4-3.05 2.6 0 5 1.15 6.4 3.05h.8z" />
              </svg>
            </div>
            {isProfileOpen && (
              <div className={styles.profileMenu}>
                <div className={styles.menuItem}>Sign up</div>
                <div className={styles.menuItem}>Log in</div>
                <hr className={styles.menuDivider} />
                <div className={styles.menuItem}>Airbnb your home</div>
                <div className={styles.menuItem}>Host an experience</div>
                <div className={styles.menuItem}>Help Center</div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Expanded Search State */}
      {activeSearchMenu && (
        <div className={styles.expandedSearchOverlay} onClick={(e) => e.stopPropagation()}>
          <div className={styles.searchPanel}>
            <div className={`${styles.searchField} ${activeSearchMenu === 'destination' ? styles.activeField : ''}`} onClick={() => setActiveSearchMenu('destination')}>
              <label>Where</label>
              <input type="text" placeholder="Search destinations" autoFocus={activeSearchMenu === 'destination'} />
            </div>
            <div className={`${styles.searchField} ${activeSearchMenu === 'dates' ? styles.activeField : ''}`} onClick={() => setActiveSearchMenu('dates')}>
              <label>Check in</label>
              <input type="text" placeholder="Add dates" readOnly value={formatDate(checkIn)} />
            </div>
            <div className={`${styles.searchField} ${activeSearchMenu === 'dates' ? styles.activeField : ''}`} onClick={() => setActiveSearchMenu('dates')}>
              <label>Check out</label>
              <input type="text" placeholder="Add dates" readOnly value={formatDate(checkOut)} />
            </div>
            <div className={`${styles.searchField} ${styles.searchFieldLast} ${activeSearchMenu === 'guests' ? styles.activeField : ''}`} onClick={() => setActiveSearchMenu('guests')}>
              <div className={styles.guestInputWrapper}>
                <label>Guests</label>
                <input 
                  type="text" 
                  placeholder="Add guests" 
                  readOnly 
                  value={totalGuestCount > 0 ? formatGuestString(guests) : ''}
                />
              </div>
              <button className={styles.searchSubmitBtn}>
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'currentcolor', strokeWidth: '4', overflow: 'visible' }}>
                  <g fill="none"><path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"></path></g>
                </svg>
              </button>
            </div>
          </div>
          
          {/* Dropdown Content based on active menu */}
          <div className={styles.dropdownContent}>
            {activeSearchMenu === 'destination' && (
              <div className={styles.destinationDropdown}>
                <h4>Suggested destinations</h4>
                <div className={styles.destinationGrid}>
                  <div className={styles.destinationItem}>
                    <img src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=150&auto=format&fit=crop" alt="Goa" />
                    <span>Goa</span>
                  </div>
                  <div className={styles.destinationItem}>
                    <img src="https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?q=80&w=150&auto=format&fit=crop" alt="Mumbai" />
                    <span>Mumbai</span>
                  </div>
                  <div className={styles.destinationItem}>
                    <img src="https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=150&auto=format&fit=crop" alt="Delhi" />
                    <span>Delhi</span>
                  </div>
                </div>
              </div>
            )}
            {activeSearchMenu === 'dates' && (
              <div className={styles.datesDropdown}>
                <h4>Select Dates</h4>
                <InteractiveCalendar 
                  checkIn={checkIn}
                  checkOut={checkOut}
                  onDatesChange={(start, end) => {
                    setCheckIn(start);
                    setCheckOut(end);
                  }}
                />
              </div>
            )}
            {activeSearchMenu === 'guests' && (
              <div className={styles.guestsDropdownWrapper}>
                <GuestSelector onClose={() => setActiveSearchMenu(null)} />
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
