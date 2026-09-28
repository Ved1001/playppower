'use client';

import { useState, useEffect, useRef } from 'react';
import { Property } from '@/types/property';
import styles from './BookingCard.module.css';
import InteractiveCalendar from '@/components/ui/InteractiveCalendar';
import GuestSelector from '@/components/ui/GuestSelector';
import { useBooking, formatGuestString } from '@/context/BookingContext';

interface BookingCardProps {
  property: Property;
}

export default function BookingCard({ property }: BookingCardProps) {
  const { checkIn, checkOut, setCheckIn, setCheckOut, guests, totalGuestCount, getPricing } = useBooking();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
        setIsCalendarOpen(false);
      }
    };
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsCalendarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const formatDate = (date: Date | null) => {
    if (!date) return 'Add date';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const { nights, baseTotal, cleaningFee, serviceFee, taxes, finalTotal } = getPricing(property.pricePerNight);

  const [bookingStep, setBookingStep] = useState<'idle' | 'review' | 'confirmed'>('idle');
  const [reservationId, setReservationId] = useState('');

  const handleReserve = () => {
    if (nights > 0) setBookingStep('review');
  };

  const handleConfirm = () => {
    setReservationId(`STAY-${Math.random().toString(36).substring(2, 8).toUpperCase()}`);
    setBookingStep('confirmed');
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.priceContainer}>
            <span className={styles.price}>{property.currency}{property.pricePerNight.toLocaleString('en-IN')}</span>
            <span className={styles.night}> night</span>
          </div>
          <div className={styles.rating}>
            ★ {property.rating} · <span>{property.reviewCount} reviews</span>
          </div>
        </div>

        <div className={styles.selectors}>
          <div className={styles.datesWrapper} ref={calendarRef}>
            <div className={styles.dates} onClick={() => setIsCalendarOpen(!isCalendarOpen)}>
              <div className={styles.checkIn}>
                <label className={styles.label}>CHECK-IN</label>
                <div className={styles.dateDisplay}>{formatDate(checkIn)}</div>
              </div>
              <div className={styles.checkOut}>
                <label className={styles.label}>CHECKOUT</label>
                <div className={styles.dateDisplay}>{formatDate(checkOut)}</div>
              </div>
            </div>
            
            {isCalendarOpen && (
              <div className={styles.calendarPopover}>
                <div className={styles.calendarHeader}>
                  <div>
                    <h3>{nights > 0 ? `${nights} nights` : 'Select dates'}</h3>
                    <p>{checkIn && checkOut ? `${formatDate(checkIn)} - ${formatDate(checkOut)}` : 'Minimum stay: 1 night'}</p>
                  </div>
                </div>
                <InteractiveCalendar 
                  checkIn={checkIn}
                  checkOut={checkOut}
                  onDatesChange={(start, end) => {
                    setCheckIn(start);
                    setCheckOut(end);
                    if (start && end) setIsCalendarOpen(false); // auto close when both selected
                  }}
                />
                <div className={styles.calendarFooter}>
                  <button onClick={() => { setCheckIn(null); setCheckOut(null); }} className={styles.clearDatesBtn}>Clear dates</button>
                  <button onClick={() => setIsCalendarOpen(false)} className={styles.closeBtn}>Close</button>
                </div>
              </div>
            )}
          </div>
          <div className={styles.guestsWrapper} style={{position: 'relative'}}>
            <div className={styles.guests} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <div className={styles.label}>GUESTS</div>
              <div className={styles.value}>{totalGuestCount > 0 ? formatGuestString(guests) : 'Add guests'}</div>
              <span className={styles.chevron}>▼</span>
            </div>
            {isDropdownOpen && (
              <div className={styles.dropdownContainer} style={{position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 100, marginTop: '8px'}}>
                <GuestSelector maxGuests={property.maxGuests} onClose={() => setIsDropdownOpen(false)} />
              </div>
            )}
          </div>
        </div>

        <button className={styles.reserveButton} onClick={handleReserve}>
          {nights > 0 ? 'Reserve' : 'Check availability'}
        </button>
        {nights > 0 && <div className={styles.chargeNotice}>You won&apos;t be charged yet</div>}

        {nights > 0 && (
          <div className={styles.priceBreakdown}>
            <div className={styles.priceItem}>
              <span>{property.currency}{property.pricePerNight.toLocaleString('en-IN')} x {nights} nights</span>
              <span>{property.currency}{baseTotal.toLocaleString('en-IN')}</span>
            </div>
            <div className={styles.priceItem}>
              <span>Cleaning fee</span>
              <span>{property.currency}{cleaningFee.toLocaleString('en-IN')}</span>
            </div>
            <div className={styles.priceItem}>
              <span>Service fee</span>
              <span>{property.currency}{serviceFee.toLocaleString('en-IN')}</span>
            </div>
            <div className={styles.priceItem}>
              <span>Taxes</span>
              <span>{property.currency}{taxes.toLocaleString('en-IN')}</span>
            </div>
          </div>
        )}

        {nights > 0 && (
          <>
            <hr className={styles.divider} />
            <div className={styles.total}>
              <span>Total</span>
              <span>{property.currency}{finalTotal.toLocaleString('en-IN')}</span>
            </div>
          </>
        )}
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className={styles.mobileStickyBar}>
        <div className={styles.mobilePriceInfo}>
          <div className={styles.mobilePrice}>
            <span className={styles.price}>{property.currency}{property.pricePerNight.toLocaleString('en-IN')}</span>
            <span className={styles.night}> night</span>
          </div>
          {nights > 0 ? (
            <div className={styles.mobileDates}>{nights} nights · {property.currency}{finalTotal.toLocaleString('en-IN')}</div>
          ) : (
            <div className={styles.mobileDates}>Add dates</div>
          )}
        </div>
        <button className={styles.mobileReserveBtn} onClick={handleReserve}>Reserve</button>
      </div>

      {/* Booking Modal Flow */}
      {bookingStep !== 'idle' && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            {bookingStep === 'review' ? (
              <>
                <div className={styles.modalHeader}>
                  <h2>Review your trip</h2>
                  <button onClick={() => setBookingStep('idle')} className={styles.modalCloseBtn}>✕</button>
                </div>
                <div className={styles.modalBody}>
                  <div className={styles.modalSection}>
                    <h3>{property.title}</h3>
                    <p>{property.location}</p>
                  </div>
                  <hr className={styles.modalDivider} />
                  <div className={styles.modalSection}>
                    <div className={styles.modalRow}>
                      <strong>Dates</strong>
                      <span>{formatDate(checkIn)} - {formatDate(checkOut)} ({nights} nights)</span>
                    </div>
                    <div className={styles.modalRow}>
                      <strong>Guests</strong>
                      <span>{formatGuestString(guests)}</span>
                    </div>
                  </div>
                  <hr className={styles.modalDivider} />
                  <div className={styles.modalSection}>
                    <h3>Price details</h3>
                    <div className={styles.modalRow}>
                      <span>{property.currency}{property.pricePerNight.toLocaleString('en-IN')} x {nights} nights</span>
                      <span>{property.currency}{baseTotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className={styles.modalRow}>
                      <span>Cleaning fee</span>
                      <span>{property.currency}{cleaningFee.toLocaleString('en-IN')}</span>
                    </div>
                    <div className={styles.modalRow}>
                      <span>Service fee</span>
                      <span>{property.currency}{serviceFee.toLocaleString('en-IN')}</span>
                    </div>
                    <div className={styles.modalRow}>
                      <span>Taxes</span>
                      <span>{property.currency}{taxes.toLocaleString('en-IN')}</span>
                    </div>
                    <hr className={styles.modalDivider} />
                    <div className={styles.modalRow}>
                      <strong>Total (INR)</strong>
                      <strong>{property.currency}{finalTotal.toLocaleString('en-IN')}</strong>
                    </div>
                  </div>
                </div>
                <div className={styles.modalFooter}>
                  <button className={styles.confirmBtn} onClick={handleConfirm}>Confirm Reservation</button>
                </div>
              </>
            ) : (
              <div className={styles.successState}>
                <div className={styles.successIcon}>✓</div>
                <h2>Reservation confirmed!</h2>
                <p>You&apos;re going to Goa.</p>
                
                <div className={styles.receiptCard}>
                  <p><strong>Reservation ID:</strong> {reservationId}</p>
                  <p><strong>Property:</strong> {property.title}</p>
                  <p><strong>Dates:</strong> {formatDate(checkIn)} - {formatDate(checkOut)}</p>
                  <p><strong>Guests:</strong> {formatGuestString(guests)}</p>
                  <p><strong>Total Paid:</strong> {property.currency}{finalTotal.toLocaleString('en-IN')}</p>
                </div>
                
                <button className={styles.doneBtn} onClick={() => setBookingStep('idle')}>Done</button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
