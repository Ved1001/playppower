'use client';

import React, { useState, useMemo } from 'react';
import styles from './InteractiveCalendar.module.css';

interface InteractiveCalendarProps {
  checkIn: Date | null;
  checkOut: Date | null;
  onDatesChange: (start: Date | null, end: Date | null) => void;
}

export default function InteractiveCalendar({ checkIn, checkOut, onDatesChange }: InteractiveCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const isSameDay = (d1: Date | null, d2: Date | null) => {
    if (!d1 || !d2) return false;
    return d1.getFullYear() === d2.getFullYear() && 
           d1.getMonth() === d2.getMonth() && 
           d1.getDate() === d2.getDate();
  };

  const isWithinRange = (date: Date) => {
    if (!checkIn || !checkOut) return false;
    return date > checkIn && date < checkOut;
  };

  const handleDateClick = (e: React.MouseEvent, date: Date) => {
    e.stopPropagation();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return; // Prevent past dates

    if (!checkIn || (checkIn && checkOut)) {
      // Start a new range
      onDatesChange(date, null);
    } else {
      // Finish the range
      if (date < checkIn) {
        onDatesChange(date, checkIn); // Swap if selecting backwards
      } else {
        onDatesChange(checkIn, date);
      }
    }
  };

  const renderMonth = (monthOffset: number) => {
    const targetDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + monthOffset, 1);
    const year = targetDate.getFullYear();
    const month = targetDate.getMonth();
    
    const numDays = daysInMonth(year, month);
    const firstDay = firstDayOfMonth(year, month);
    
    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className={styles.emptyDay}></div>);
    }

    for (let d = 1; d <= numDays; d++) {
      const date = new Date(year, month, d);
      const isPast = date < today;
      const isCheckIn = isSameDay(date, checkIn);
      const isCheckOut = isSameDay(date, checkOut);
      const isInRange = isWithinRange(date);

      let className = styles.day;
      if (isPast) className += ` ${styles.dayPast}`;
      if (isCheckIn || isCheckOut) className += ` ${styles.daySelected}`;
      if (isInRange) className += ` ${styles.dayInRange}`;
      if (isCheckIn && checkOut) className += ` ${styles.dayCheckInActive}`;
      if (isCheckOut) className += ` ${styles.dayCheckOutActive}`;

      days.push(
        <button 
          key={d} 
          className={className}
          disabled={isPast}
          onClick={(e) => handleDateClick(e, date)}
        >
          {d}
        </button>
      );
    }

    return (
      <div className={styles.monthWrapper}>
        <div className={styles.monthName}>
          {targetDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </div>
        <div className={styles.weekDays}>
          <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
        </div>
        <div className={styles.daysGrid}>
          {days}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.calendarContainer}>
      <button className={styles.navBtnPrev} onClick={handlePrevMonth}>
        <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="3" width="16" height="16">
          <path d="M20 24L12 16l8-8" />
        </svg>
      </button>
      
      <div className={styles.monthsDisplay}>
        {renderMonth(0)}
        <div className={styles.monthSpacer}></div>
        {renderMonth(1)}
      </div>

      <button className={styles.navBtnNext} onClick={handleNextMonth}>
        <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="3" width="16" height="16">
          <path d="M12 24l8-8-8-8" />
        </svg>
      </button>
    </div>
  );
}
