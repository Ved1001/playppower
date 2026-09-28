// ============================================================
// Stay Intelligence — Deterministic Scoring Engine
// ============================================================
// IMPORTANT: This is a rule-based demo engine, NOT a real AI model.
// Every score is deterministically calculated from structured mock data.
// In production, this module would be replaced by a backend API call.
// ============================================================

import { Property } from '@/types/property';
import {
  UserPreferences,
  StayInsight,
  CategoryScore,
  CategoryWeights,
  MatchHighlight,
  Concern,
  TradeOff,
  Evidence,
  TripPersona,
  ScoreCategory,
} from '@/types/stayIntelligence';

// ─── Persona-Based Weight Matrices ────────────────────────────

const PERSONA_WEIGHTS: Record<TripPersona, CategoryWeights> = {
  COUPLE_VACATION: {
    location: 0.25,
    cleanliness: 0.22,
    amenities: 0.20,
    value: 0.15,
    safety: 0.08,
    hostReliability: 0.05,
    workFriendly: 0.05,
  },
  REMOTE_WORK: {
    workFriendly: 0.30,
    cleanliness: 0.18,
    location: 0.15,
    value: 0.15,
    hostReliability: 0.10,
    safety: 0.07,
    amenities: 0.05,
  },
  FAMILY_TRIP: {
    safety: 0.28,
    cleanliness: 0.22,
    location: 0.18,
    amenities: 0.15,
    value: 0.10,
    hostReliability: 0.07,
    workFriendly: 0.00,
  },
  SOLO_BUSINESS: {
    workFriendly: 0.32,
    location: 0.22,
    cleanliness: 0.18,
    hostReliability: 0.12,
    value: 0.08,
    safety: 0.05,
    amenities: 0.03,
  },
  GROUP_GETAWAY: {
    amenities: 0.25,
    location: 0.22,
    value: 0.18,
    cleanliness: 0.15,
    safety: 0.10,
    hostReliability: 0.07,
    workFriendly: 0.03,
  },
};

// ─── Individual Category Score Calculators ─────────────────────

function calculateLocationScore(property: Property, prefs: UserPreferences): { score: number; evidences: Evidence[] } {
  const evidences: Evidence[] = [];
  let score = 0;

  // Base location from category rating (4.8/5.0 = 96%)
  const locationRating = property.categoryRatings.find(r => r.category === 'Location');
  if (locationRating) {
    score += (locationRating.score / 5.0) * 60;
    evidences.push({
      text: `Location rated ${locationRating.score}/5.0 by guests`,
      source: 'REVIEWS',
      sourceLabel: 'Guest Ratings',
    });
  }

  // Beach proximity
  if (property.locationHighlights.description.toLowerCase().includes('beach')) {
    score += 20;
    evidences.push({
      text: 'Close to beaches based on neighbourhood description',
      source: 'LISTING',
      sourceLabel: 'Listing Details',
    });
  }

  // Neighbourhood description richness
  if (property.locationHighlights.description.length > 50) {
    score += 10;
    evidences.push({
      text: `Located in ${property.locationHighlights.neighborhood}, ${property.locationHighlights.region}`,
      source: 'LISTING',
      sourceLabel: 'Location',
    });
  }

  // Exact location caveat
  if (!property.locationHighlights.exactLocationBeforeBooking) {
    score -= 5;
    evidences.push({
      text: 'Exact location is only revealed after booking',
      source: 'LISTING',
      sourceLabel: 'Location Policy',
    });
  }

  // Nearby attractions mentioned
  if (property.locationHighlights.description.toLowerCase().includes('restaurant') ||
      property.locationHighlights.description.toLowerCase().includes('café') ||
      property.locationHighlights.description.toLowerCase().includes('attraction')) {
    score += 10;
    evidences.push({
      text: 'Near restaurants, cafés, and popular attractions',
      source: 'LISTING',
      sourceLabel: 'Neighbourhood',
    });
  }

  return { score: Math.min(100, Math.max(0, score)), evidences };
}

function calculateCleanlinessScore(property: Property): { score: number; evidences: Evidence[] } {
  const evidences: Evidence[] = [];
  let score = 0;

  const cleanlinessRating = property.categoryRatings.find(r => r.category === 'Cleanliness');
  if (cleanlinessRating) {
    score += (cleanlinessRating.score / 5.0) * 70;
    evidences.push({
      text: `Cleanliness rated ${cleanlinessRating.score}/5.0 by guests`,
      source: 'REVIEWS',
      sourceLabel: 'Guest Ratings',
    });
  }

  // Check review keywords for cleanliness mentions
  const cleanlinessKeyword = property.reviewKeywords.find(k => k.label === 'Cleanliness');
  if (cleanlinessKeyword && cleanlinessKeyword.count >= 3) {
    score += 15;
    evidences.push({
      text: `${cleanlinessKeyword.count} reviews specifically mention cleanliness`,
      source: 'REVIEWS',
      sourceLabel: 'Review Analysis',
    });
  }

  // Check review text for cleanliness mentions
  const cleanReviews = property.reviews.filter(r =>
    r.content.toLowerCase().includes('clean') || r.content.toLowerCase().includes('spotless')
  );
  if (cleanReviews.length > 0) {
    score += 15;
    evidences.push({
      text: `${cleanReviews.length} guest reviews mention cleanliness positively`,
      source: 'REVIEWS',
      sourceLabel: 'Guest Reviews',
    });
  }

  return { score: Math.min(100, Math.max(0, score)), evidences };
}

function calculateValueScore(property: Property, prefs: UserPreferences): { score: number; evidences: Evidence[] } {
  const evidences: Evidence[] = [];
  let score = 60; // Base score

  const valueRating = property.categoryRatings.find(r => r.category === 'Value');
  if (valueRating) {
    score += (valueRating.score / 5.0) * 20;
    evidences.push({
      text: `Value rated ${valueRating.score}/5.0 by guests`,
      source: 'REVIEWS',
      sourceLabel: 'Guest Ratings',
    });
  }

  // Budget comparison
  if (prefs.budget && prefs.budget > 0) {
    const totalCost = property.totalPrice;
    if (totalCost <= prefs.budget) {
      const savings = ((prefs.budget - totalCost) / prefs.budget) * 20;
      score += Math.min(20, savings);
      evidences.push({
        text: `${property.currency}${totalCost.toLocaleString('en-IN')} total is within your ${property.currency}${prefs.budget.toLocaleString('en-IN')} budget`,
        source: 'LISTING',
        sourceLabel: 'Pricing',
      });
    } else {
      const overBudget = ((totalCost - prefs.budget) / prefs.budget) * 30;
      score -= Math.min(30, overBudget);
      evidences.push({
        text: `${property.currency}${totalCost.toLocaleString('en-IN')} total exceeds your ${property.currency}${prefs.budget.toLocaleString('en-IN')} budget`,
        source: 'LISTING',
        sourceLabel: 'Pricing',
      });
    }
  }

  // Compare with nearby stays
  const avgNearbyPrice = property.nearbyStays.reduce((sum, s) => sum + s.price, 0) / property.nearbyStays.length;
  if (property.totalPrice < avgNearbyPrice) {
    score += 10;
    evidences.push({
      text: `Priced lower than the average of nearby stays (${property.currency}${Math.round(avgNearbyPrice).toLocaleString('en-IN')})`,
      source: 'LISTING',
      sourceLabel: 'Market Comparison',
    });
  } else {
    evidences.push({
      text: `Average nearby stay costs ${property.currency}${Math.round(avgNearbyPrice).toLocaleString('en-IN')} for comparison`,
      source: 'LISTING',
      sourceLabel: 'Market Comparison',
    });
  }

  return { score: Math.min(100, Math.max(0, score)), evidences };
}

function calculateAmenityScore(property: Property, prefs: UserPreferences): { score: number; evidences: Evidence[] } {
  const evidences: Evidence[] = [];
  const availableAmenities = property.amenities.filter(a => a.isAvailable);
  const totalAmenities = availableAmenities.length;

  // Base score from amenity richness
  let score = Math.min(50, (totalAmenities / 20) * 50);
  evidences.push({
    text: `${totalAmenities} amenities available in this listing`,
    source: 'LISTING',
    sourceLabel: 'Amenity List',
  });

  // Match required amenities
  if (prefs.requiredAmenities.length > 0) {
    const matched = prefs.requiredAmenities.filter(req =>
      availableAmenities.some(a => a.id === req || a.name.toLowerCase().includes(req.toLowerCase()))
    );
    const matchRate = matched.length / prefs.requiredAmenities.length;
    score += matchRate * 50;
    evidences.push({
      text: `${matched.length} of ${prefs.requiredAmenities.length} required amenities matched`,
      source: 'LISTING',
      sourceLabel: 'Amenity Match',
    });
  } else {
    // Default scoring based on common amenities
    const hasPool = availableAmenities.some(a => a.id === 'pool');
    const hasHotTub = availableAmenities.some(a => a.id === 'hot_tub');
    const hasWifi = availableAmenities.some(a => a.id === 'wifi');
    const hasKitchen = availableAmenities.some(a => a.id === 'kitchen');
    const hasAC = availableAmenities.some(a => a.id === 'ac');

    if (hasPool) score += 8;
    if (hasHotTub) score += 8;
    if (hasWifi) score += 10;
    if (hasKitchen) score += 8;
    if (hasAC) score += 8;

    const highlights: string[] = [];
    if (hasPool) highlights.push('Pool');
    if (hasHotTub) highlights.push('Hot tub');
    if (hasWifi) highlights.push('Wi-Fi');
    if (hasKitchen) highlights.push('Kitchen');
    if (hasAC) highlights.push('AC');
    if (highlights.length > 0) {
      evidences.push({
        text: `Key amenities present: ${highlights.join(', ')}`,
        source: 'LISTING',
        sourceLabel: 'Key Amenities',
      });
    }
  }

  return { score: Math.min(100, Math.max(0, score)), evidences };
}

function calculateHostReliabilityScore(property: Property): { score: number; evidences: Evidence[] } {
  const evidences: Evidence[] = [];
  let score = 50;

  // Response rate
  if (property.host.responseRate >= 0.95) {
    score += 25;
    evidences.push({
      text: `Host response rate: ${Math.round(property.host.responseRate * 100)}%`,
      source: 'HOST',
      sourceLabel: 'Host Stats',
    });
  }

  // Response time
  if (property.host.responseTime.includes('hour')) {
    score += 15;
    evidences.push({
      text: `Responds ${property.host.responseTime}`,
      source: 'HOST',
      sourceLabel: 'Host Stats',
    });
  }

  // Total reviews across all properties
  if (property.host.totalReviews > 500) {
    score += 10;
    evidences.push({
      text: `${property.host.totalReviews.toLocaleString('en-IN')} total reviews across all properties`,
      source: 'HOST',
      sourceLabel: 'Host Experience',
    });
  }

  // Communication rating
  const commRating = property.categoryRatings.find(r => r.category === 'Communication');
  if (commRating && commRating.score >= 4.8) {
    score += 5;
    evidences.push({
      text: `Communication rated ${commRating.score}/5.0`,
      source: 'REVIEWS',
      sourceLabel: 'Guest Ratings',
    });
  }

  // Review mentions of host
  const hostMentions = property.reviews.filter(r =>
    r.content.toLowerCase().includes('host') || r.content.toLowerCase().includes('responsive')
  );
  if (hostMentions.length > 0) {
    evidences.push({
      text: `${hostMentions.length} reviews mention the host positively`,
      source: 'REVIEWS',
      sourceLabel: 'Guest Reviews',
    });
  }

  return { score: Math.min(100, Math.max(0, score)), evidences };
}

function calculateWorkFriendlyScore(property: Property): { score: number; evidences: Evidence[] } {
  const evidences: Evidence[] = [];
  let score = 20;

  const availableAmenities = property.amenities.filter(a => a.isAvailable);
  const hasWorkspace = availableAmenities.some(a => a.id === 'workspace');
  const hasWifi = availableAmenities.some(a => a.id === 'wifi');

  if (hasWorkspace) {
    score += 30;
    evidences.push({
      text: 'Dedicated workspace available',
      source: 'LISTING',
      sourceLabel: 'Amenities',
    });
  }

  if (hasWifi) {
    score += 25;
    evidences.push({
      text: 'Wi-Fi available',
      source: 'LISTING',
      sourceLabel: 'Amenities',
    });
  }

  // Check for internet speed info in reviews
  const wifiReviews = property.reviews.filter(r =>
    r.content.toLowerCase().includes('wifi') || r.content.toLowerCase().includes('internet')
  );
  if (wifiReviews.length === 0) {
    score -= 5;
    evidences.push({
      text: 'No reviews mention internet speed or reliability',
      source: 'INFERRED',
      sourceLabel: 'Inferred Insight',
    });
  }

  // Quiet/peaceful environment
  const quietReviews = property.reviews.filter(r =>
    r.content.toLowerCase().includes('peaceful') || r.content.toLowerCase().includes('quiet')
  );
  if (quietReviews.length > 0) {
    score += 15;
    evidences.push({
      text: `${quietReviews.length} reviews mention a peaceful environment`,
      source: 'REVIEWS',
      sourceLabel: 'Guest Reviews',
    });
  }

  // Air conditioning (important for work comfort)
  const hasAC = availableAmenities.some(a => a.id === 'ac');
  if (hasAC) {
    score += 5;
  }

  return { score: Math.min(100, Math.max(0, score)), evidences };
}

function calculateSafetyScore(property: Property): { score: number; evidences: Evidence[] } {
  const evidences: Evidence[] = [];
  let score = 70;

  const missingItems = property.safetyItems.filter(s => s.type === 'MISSING');
  const presentItems = property.safetyItems.filter(s => s.type === 'PRESENT');

  missingItems.forEach(item => {
    score -= 15;
    evidences.push({
      text: item.name,
      source: 'SAFETY',
      sourceLabel: 'Safety Disclosure',
    });
  });

  presentItems.forEach(item => {
    score += 10;
    evidences.push({
      text: item.name,
      source: 'SAFETY',
      sourceLabel: 'Safety Disclosure',
    });
  });

  // Check-in rating
  const checkInRating = property.categoryRatings.find(r => r.category === 'Check-in');
  if (checkInRating && checkInRating.score >= 4.5) {
    score += 10;
    evidences.push({
      text: `Check-in process rated ${checkInRating.score}/5.0`,
      source: 'REVIEWS',
      sourceLabel: 'Guest Ratings',
    });
  }

  return { score: Math.min(100, Math.max(0, score)), evidences };
}

// ─── Match Highlights Generator ──────────────────────────────

function generateMatchHighlights(property: Property, prefs: UserPreferences): MatchHighlight[] {
  const highlights: MatchHighlight[] = [];
  const availableAmenities = property.amenities.filter(a => a.isAvailable);

  // Guest capacity match
  if (prefs.guests <= property.maxGuests) {
    highlights.push({
      icon: '✓',
      text: `Suitable for ${prefs.guests} guest${prefs.guests > 1 ? 's' : ''} (max ${property.maxGuests})`,
      verified: true,
    });
  }

  // Bedroom info
  highlights.push({
    icon: '✓',
    text: `${property.bedrooms}-bedroom private space`,
    verified: true,
  });

  // Key amenity matches
  const keyAmenities = ['hot_tub', 'pool', 'wifi', 'workspace', 'kitchen', 'ac', 'parking', 'pet_friendly'];
  keyAmenities.forEach(id => {
    const amenity = availableAmenities.find(a => a.id === id);
    if (amenity) {
      highlights.push({
        icon: '✓',
        text: amenity.name,
        verified: true,
      });
    }
  });

  // Rating
  if (property.rating >= 4.8) {
    highlights.push({
      icon: '✓',
      text: `Highly rated: ${property.rating}★ from ${property.reviewCount} reviews`,
      verified: true,
    });
  }

  // Cleanliness
  const cleanlinessRating = property.categoryRatings.find(r => r.category === 'Cleanliness');
  if (cleanlinessRating && cleanlinessRating.score >= 4.8) {
    highlights.push({
      icon: '✓',
      text: `Outstanding cleanliness rating (${cleanlinessRating.score}/5.0)`,
      verified: true,
    });
  }

  // Host response
  if (property.host.responseRate >= 0.95) {
    highlights.push({
      icon: '✓',
      text: `Host response rate: ${Math.round(property.host.responseRate * 100)}%`,
      verified: true,
    });
  }

  return highlights;
}

// ─── Concern Generator ──────────────────────────────────────

function generateConcerns(property: Property, prefs: UserPreferences): Concern[] {
  const concerns: Concern[] = [];

  // Safety concerns
  property.safetyItems.forEach(item => {
    if (item.type === 'MISSING') {
      concerns.push({
        icon: '⚠',
        text: item.name,
        severity: 'HIGH',
      });
    }
  });

  // Location hidden
  if (!property.locationHighlights.exactLocationBeforeBooking) {
    concerns.push({
      icon: '⚠',
      text: 'Exact location revealed only after booking',
      severity: 'MEDIUM',
    });
  }

  // Guest capacity
  if (prefs.guests > property.maxGuests) {
    concerns.push({
      icon: '⚠',
      text: `Property accommodates max ${property.maxGuests} guests — you specified ${prefs.guests}`,
      severity: 'HIGH',
    });
  }

  // Budget overrun
  if (prefs.budget && prefs.budget > 0 && property.totalPrice > prefs.budget) {
    concerns.push({
      icon: '⚠',
      text: `Total cost (${property.currency}${property.totalPrice.toLocaleString('en-IN')}) exceeds your budget (${property.currency}${prefs.budget.toLocaleString('en-IN')})`,
      severity: 'HIGH',
    });
  }

  // Limited rooms for groups/families
  if ((prefs.tripType === 'FAMILY_TRIP' || prefs.tripType === 'GROUP_GETAWAY') && property.bedrooms === 1) {
    concerns.push({
      icon: '⚠',
      text: 'Only 1 bedroom — may not be ideal for families or groups',
      severity: 'MEDIUM',
    });
  }

  return concerns;
}

// ─── Trade-Off Generator ────────────────────────────────────

function generateTradeoffs(property: Property, prefs: UserPreferences): TradeOff[] {
  const tradeoffs: TradeOff[] = [];

  // Price vs location
  const avgNearbyPrice = property.nearbyStays.reduce((sum, s) => sum + s.price, 0) / property.nearbyStays.length;
  if (property.totalPrice < avgNearbyPrice * 0.85) {
    tradeoffs.push({
      icon: '⚖',
      positive: 'Significantly lower price than nearby alternatives',
      negative: 'May lack some premium features of pricier options',
    });
  } else if (property.totalPrice > avgNearbyPrice) {
    tradeoffs.push({
      icon: '⚖',
      positive: 'Premium amenities including hot tub and plunge pool',
      negative: `Higher price than some nearby stays (avg ${property.currency}${Math.round(avgNearbyPrice).toLocaleString('en-IN')})`,
    });
  }

  // Safety vs amenities
  const missingSafety = property.safetyItems.filter(s => s.type === 'MISSING');
  if (missingSafety.length > 0 && property.amenities.filter(a => a.isAvailable).length > 20) {
    tradeoffs.push({
      icon: '⚖',
      positive: 'Excellent range of amenities available',
      negative: `${missingSafety.length} safety feature(s) not reported`,
    });
  }

  // Reviews vs depth
  if (property.rating >= 4.9 && property.reviewCount < 30) {
    tradeoffs.push({
      icon: '⚖',
      positive: `Outstanding ${property.rating}★ rating from guests`,
      negative: `Limited review volume (${property.reviewCount} reviews) for statistical confidence`,
    });
  }

  // Couple-friendly vs group
  if (property.bedrooms === 1 && property.maxGuests <= 3) {
    tradeoffs.push({
      icon: '⚖',
      positive: 'Intimate 1-bedroom ideal for couples',
      negative: 'Not suitable for large groups (max 3 guests)',
    });
  }

  // Work-friendly analysis
  const hasWorkspace = property.amenities.some(a => a.id === 'workspace' && a.isAvailable);
  const hasWifi = property.amenities.some(a => a.id === 'wifi' && a.isAvailable);
  if (hasWorkspace && hasWifi) {
    const wifiReviews = property.reviews.filter(r =>
      r.content.toLowerCase().includes('wifi') || r.content.toLowerCase().includes('internet')
    );
    if (wifiReviews.length === 0) {
      tradeoffs.push({
        icon: '⚖',
        positive: 'Dedicated workspace and Wi-Fi available',
        negative: 'No guest reviews mention internet speed or reliability',
      });
    }
  }

  return tradeoffs;
}

// ─── Overall Score Label ────────────────────────────────────

function getScoreLabel(score: number): string {
  if (score >= 90) return 'Excellent match for your trip';
  if (score >= 80) return 'Great fit for your priorities';
  if (score >= 70) return 'Good match with some trade-offs';
  if (score >= 60) return 'Moderate fit — review trade-offs carefully';
  return 'This property may not match your needs';
}

function getRecommendation(score: number): StayInsight['recommendation'] {
  if (score >= 88) return 'STRONG_FIT';
  if (score >= 75) return 'GOOD_FIT';
  if (score >= 60) return 'MODERATE_FIT';
  return 'WEAK_FIT';
}

function getConfidence(evidenceCount: number): CategoryScore['confidence'] {
  if (evidenceCount >= 3) return 'HIGH';
  if (evidenceCount >= 2) return 'MEDIUM';
  return 'LOW';
}

// ─── Category Label & Icon Maps ─────────────────────────────

const CATEGORY_LABELS: Record<ScoreCategory, string> = {
  location: 'Location Fit',
  cleanliness: 'Cleanliness Confidence',
  value: 'Value for Money',
  amenities: 'Amenity Match',
  hostReliability: 'Host Reliability',
  workFriendly: 'Work-Friendly',
  safety: 'Safety Confidence',
};

const CATEGORY_ICONS: Record<ScoreCategory, string> = {
  location: '📍',
  cleanliness: '✨',
  value: '💰',
  amenities: '🏠',
  hostReliability: '👤',
  workFriendly: '💻',
  safety: '🛡️',
};

// ─── Main Scoring Engine ────────────────────────────────────

export function calculateStayFit(property: Property, preferences: UserPreferences): StayInsight {
  const weights = PERSONA_WEIGHTS[preferences.tripType];

  // Calculate individual category scores
  const locationResult = calculateLocationScore(property, preferences);
  const cleanlinessResult = calculateCleanlinessScore(property);
  const valueResult = calculateValueScore(property, preferences);
  const amenityResult = calculateAmenityScore(property, preferences);
  const hostResult = calculateHostReliabilityScore(property);
  const workResult = calculateWorkFriendlyScore(property);
  const safetyResult = calculateSafetyScore(property);

  const rawScores: Record<ScoreCategory, { score: number; evidences: Evidence[] }> = {
    location: locationResult,
    cleanliness: cleanlinessResult,
    value: valueResult,
    amenities: amenityResult,
    hostReliability: hostResult,
    workFriendly: workResult,
    safety: safetyResult,
  };

  // Build category score objects
  const categoryScores: CategoryScore[] = (Object.keys(rawScores) as ScoreCategory[]).map(key => ({
    category: key,
    label: CATEGORY_LABELS[key],
    score: Math.round(rawScores[key].score),
    confidence: getConfidence(rawScores[key].evidences.length),
    icon: CATEGORY_ICONS[key],
    evidences: rawScores[key].evidences,
  }));

  // Calculate weighted overall score
  const overallScore = Math.round(
    (Object.keys(weights) as ScoreCategory[]).reduce((sum, key) => {
      return sum + weights[key] * rawScores[key].score;
    }, 0)
  );

  // Generate highlights, concerns, and trade-offs
  const matches = generateMatchHighlights(property, preferences);
  const concerns = generateConcerns(property, preferences);
  const tradeoffs = generateTradeoffs(property, preferences);

  // Build summary sentence
  const tripLabels: Record<TripPersona, string> = {
    COUPLE_VACATION: 'couple vacation',
    REMOTE_WORK: 'remote work stay',
    FAMILY_TRIP: 'family trip',
    SOLO_BUSINESS: 'business trip',
    GROUP_GETAWAY: 'group getaway',
  };

  const summary = `${overallScore}% match for your ${property.totalNights}-night ${tripLabels[preferences.tripType]} in ${property.locationHighlights.neighborhood}.`;

  return {
    overallScore,
    overallLabel: getScoreLabel(overallScore),
    categoryScores,
    matches,
    concerns,
    tradeoffs,
    summary,
    recommendation: getRecommendation(overallScore),
  };
}

// ─── Default Preferences ────────────────────────────────────

export const DEFAULT_PREFERENCES: UserPreferences = {
  tripType: 'COUPLE_VACATION',
  guests: 2,
  budget: null,
  priorities: [],
  requiredAmenities: [],
};
