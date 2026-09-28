'use client';

import React from 'react';
import styles from './PreferenceForm.module.css';
import { UserPreferences, TripPersona, PriorityTag } from '@/types/stayIntelligence';

interface PreferenceFormProps {
  preferences: UserPreferences;
  onChange: (prefs: UserPreferences) => void;
}

const TRIP_TYPES: { id: TripPersona; label: string }[] = [
  { id: 'COUPLE_VACATION', label: 'Couple Vacation' },
  { id: 'REMOTE_WORK', label: 'Remote Work' },
  { id: 'FAMILY_TRIP', label: 'Family Trip' },
  { id: 'SOLO_BUSINESS', label: 'Solo Business' },
  { id: 'GROUP_GETAWAY', label: 'Group Getaway' },
];

const PRIORITIES: { id: PriorityTag; label: string }[] = [
  { id: 'cleanliness', label: 'Cleanliness' },
  { id: 'location', label: 'Location' },
  { id: 'wifi', label: 'Wi-Fi' },
  { id: 'workspace', label: 'Workspace' },
  { id: 'privacy', label: 'Privacy' },
  { id: 'quiet', label: 'Quiet' },
  { id: 'budget', label: 'Budget' },
  { id: 'pool', label: 'Pool' },
  { id: 'hot_tub', label: 'Hot tub' },
  { id: 'kitchen', label: 'Kitchen' },
  { id: 'parking', label: 'Parking' },
  { id: 'safety', label: 'Safety' },
  { id: 'beach', label: 'Beach' },
  { id: 'transport', label: 'Transport' },
];

export const PreferenceForm: React.FC<PreferenceFormProps> = ({ preferences, onChange }) => {
  const togglePriority = (tag: PriorityTag) => {
    const isSelected = preferences.priorities.includes(tag);
    const newPriorities = isSelected
      ? preferences.priorities.filter((p) => p !== tag)
      : [...preferences.priorities, tag];
    onChange({ ...preferences, priorities: newPriorities });
  };

  const updateGuests = (increment: number) => {
    const newGuests = Math.max(1, Math.min(10, preferences.guests + increment));
    onChange({ ...preferences, guests: newGuests });
  };

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onChange({ ...preferences, budget: val ? parseInt(val, 10) : null });
  };

  const handleReset = () => {
    onChange({
      tripType: 'COUPLE_VACATION',
      guests: 2,
      budget: null,
      priorities: [],
      requiredAmenities: [],
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h3 className={styles.label}>Trip Type</h3>
        <div className={styles.pillGroup}>
          {TRIP_TYPES.map((trip) => (
            <button
              key={trip.id}
              onClick={() => onChange({ ...preferences, tripType: trip.id })}
              className={`${styles.pill} ${
                preferences.tripType === trip.id ? styles.pillSelected : ''
              }`}
            >
              {trip.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.guestSection}>
          <h3 className={styles.label}>Guests</h3>
          <div className={styles.stepper}>
            <button
              className={styles.stepperBtn}
              onClick={() => updateGuests(-1)}
              disabled={preferences.guests <= 1}
              aria-label="Decrease guests"
            >
              -
            </button>
            <span className={styles.guestCount}>{preferences.guests}</span>
            <button
              className={styles.stepperBtn}
              onClick={() => updateGuests(1)}
              disabled={preferences.guests >= 10}
              aria-label="Increase guests"
            >
              +
            </button>
          </div>
        </div>

        <div className={styles.budgetSection}>
          <h3 className={styles.label}>Max total budget (optional)</h3>
          <div className={styles.inputWrapper}>
            <span className={styles.currencyPrefix}>₹</span>
            <input
              type="number"
              className={styles.budgetInput}
              placeholder="e.g. 50000"
              value={preferences.budget || ''}
              onChange={handleBudgetChange}
            />
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.label}>Priorities</h3>
        <div className={styles.tagGroup}>
          {PRIORITIES.map((priority) => (
            <button
              key={priority.id}
              onClick={() => togglePriority(priority.id)}
              className={`${styles.tag} ${
                preferences.priorities.includes(priority.id) ? styles.tagSelected : ''
              }`}
            >
              {priority.label}
            </button>
          ))}
        </div>
      </div>

      <button className={styles.resetBtn} onClick={handleReset}>
        Reset preferences
      </button>
    </div>
  );
};
