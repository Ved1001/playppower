// ============================================================
// Stay Intelligence Types — Decision Support Engine
// ============================================================

export type TripPersona =
  | 'COUPLE_VACATION'
  | 'REMOTE_WORK'
  | 'FAMILY_TRIP'
  | 'SOLO_BUSINESS'
  | 'GROUP_GETAWAY';

export interface UserPreferences {
  tripType: TripPersona;
  guests: number;
  budget: number | null;
  priorities: PriorityTag[];
  requiredAmenities: string[];
}

export type PriorityTag =
  | 'cleanliness'
  | 'location'
  | 'wifi'
  | 'workspace'
  | 'privacy'
  | 'quiet'
  | 'budget'
  | 'pool'
  | 'hot_tub'
  | 'kitchen'
  | 'parking'
  | 'safety'
  | 'beach'
  | 'transport'
  | 'pet_friendly';

export type ScoreCategory =
  | 'location'
  | 'cleanliness'
  | 'value'
  | 'amenities'
  | 'hostReliability'
  | 'workFriendly'
  | 'safety';

export interface CategoryScore {
  category: ScoreCategory;
  label: string;
  score: number; // 0-100
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  icon: string;
  evidences: Evidence[];
}

export interface Evidence {
  text: string;
  source: 'LISTING' | 'REVIEWS' | 'HOST' | 'SAFETY' | 'POLICY' | 'INFERRED';
  sourceLabel: string;
}

export interface MatchHighlight {
  icon: string;
  text: string;
  verified: boolean;
}

export interface TradeOff {
  icon: string;
  positive: string;
  negative: string;
}

export interface Concern {
  icon: string;
  text: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface StayInsight {
  overallScore: number;
  overallLabel: string;
  categoryScores: CategoryScore[];
  matches: MatchHighlight[];
  concerns: Concern[];
  tradeoffs: TradeOff[];
  summary: string;
  recommendation: 'STRONG_FIT' | 'GOOD_FIT' | 'MODERATE_FIT' | 'WEAK_FIT';
}

export interface CategoryWeights {
  location: number;
  cleanliness: number;
  value: number;
  amenities: number;
  hostReliability: number;
  workFriendly: number;
  safety: number;
}

export interface TelemetryEvent {
  eventName:
    | 'STAY_INTEL_OPENED'
    | 'STAY_INTEL_CLOSED'
    | 'PREFERENCE_CHANGED'
    | 'TRADEOFF_EXPANDED'
    | 'EVIDENCE_VIEWED'
    | 'RESERVATION_CLICKED'
    | 'RESET_PREFERENCES';
  timestamp: number;
  propertyId: string;
  payload: Record<string, unknown>;
}
