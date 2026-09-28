'use client';

import React, { createContext, useContext, useState, useMemo } from 'react';

export interface Guests {
  adults: number;
  children: number;
  infants: number;
  pets: number;
}

export interface PricingBreakdown {
  nights: number;
  baseTotal: number;
  cleaningFee: number;
  serviceFee: number;
  taxes: number;
  finalTotal: number;
}

interface BookingContextType {
  checkIn: Date | null;
  checkOut: Date | null;
  guests: Guests;
  setCheckIn: (date: Date | null) => void;
  setCheckOut: (date: Date | null) => void;
  updateGuests: (type: keyof Guests, value: number) => void;
  clearDates: () => void;
  getPricing: (pricePerNight: number) => PricingBreakdown;
  totalGuestCount: number;
}

export const formatGuestString = (guests: Guests): string => {
  const count = guests.adults + guests.children;
  let str = `${count} guest${count !== 1 ? 's' : ''}`;
  if (guests.infants > 0) str += `, ${guests.infants} infant${guests.infants > 1 ? 's' : ''}`;
  if (guests.pets > 0) str += `, ${guests.pets} pet${guests.pets > 1 ? 's' : ''}`;
  return str;
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [checkIn, setCheckIn] = useState<Date | null>(new Date(2026, 9, 10)); // Oct 10, 2026
  const [checkOut, setCheckOut] = useState<Date | null>(new Date(2026, 9, 15)); // Oct 15, 2026
  const [guests, setGuests] = useState<Guests>({
    adults: 2,
    children: 0,
    infants: 0,
    pets: 0
  });

  const updateGuests = (type: keyof Guests, value: number) => {
    setGuests(prev => ({ ...prev, [type]: value }));
  };

  const clearDates = () => {
    setCheckIn(null);
    setCheckOut(null);
  };

  const totalGuestCount = guests.adults + guests.children;

  const getPricing = (pricePerNight: number): PricingBreakdown => {
    let nights = 0;
    if (checkIn && checkOut && checkOut > checkIn) {
      nights = Math.round((checkOut.getTime() - checkIn.getTime()) / (1000 * 3600 * 24));
    }
    
    if (nights === 0) {
      return { nights: 0, baseTotal: 0, cleaningFee: 0, serviceFee: 0, taxes: 0, finalTotal: 0 };
    }

    const base = pricePerNight * nights;
    const cleaning = 1200; // Flat fee
    const service = Math.round(base * 0.14); // 14% service fee
    const tax = Math.round((base + cleaning + service) * 0.18); // 18% tax
    
    return {
      nights,
      baseTotal: base,
      cleaningFee: cleaning,
      serviceFee: service,
      taxes: tax,
      finalTotal: base + cleaning + service + tax
    };
  };

  return (
    <BookingContext.Provider value={{ 
      checkIn, checkOut, guests, setCheckIn, setCheckOut, updateGuests, clearDates, getPricing, totalGuestCount
    }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
