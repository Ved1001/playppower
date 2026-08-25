// ============================================================
// Property Data Types — Airbnb Listing Clone
// ============================================================

export interface PropertyImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}

export interface Host {
  name: string;
  avatar: string;
  isSuperhost: boolean;
  yearsHosting: number;
  totalReviews: number;
  rating: number;
  responseRate: number;
  responseTime: string;
  school?: string;
  bornIn?: string;
  languages?: string[];
}

export interface CoHost {
  name: string;
  avatar: string;
}

export interface Amenity {
  id: string;
  name: string;
  icon: string;
  category: AmenityCategory;
  isAvailable: boolean;
  isStrikethrough?: boolean;
}

export type AmenityCategory =
  | 'bathroom'
  | 'bedroom'
  | 'entertainment'
  | 'heating_cooling'
  | 'home_safety'
  | 'internet_office'
  | 'kitchen_dining'
  | 'outdoor'
  | 'parking'
  | 'services';

export interface CategoryRating {
  category: string;
  score: number;
  icon: string;
}

export interface ReviewKeyword {
  label: string;
  count: number;
  emoji: string;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  yearsOnPlatform: string;
  date: string;
  rating: number;
  content: string;
}

export interface SafetyItem {
  id: string;
  name: string;
  type: 'PRESENT' | 'MISSING';
  icon: string;
}

export interface HouseRule {
  icon: string;
  text: string;
}

export interface CancellationPolicy {
  title: string;
  lines: string[];
}

export interface SleepingArrangement {
  room: string;
  bedType: string;
  icon: string;
}

export interface NearbyStay {
  id: string;
  title: string;
  image: string;
  price: number;
  rating: number;
  currency: string;
}

export interface LocationHighlights {
  neighborhood: string;
  region: string;
  description: string;
  exactLocationBeforeBooking: boolean;
}

export interface Property {
  id: string;
  title: string;
  subtitle: string;
  propertyType: string;
  location: string;
  pricePerNight: number;
  totalPrice: number;
  totalNights: number;
  currency: string;
  rating: number;
  reviewCount: number;
  maxGuests: number;
  bedrooms: number;
  beds: number;
  baths: number;
  images: PropertyImage[];
  host: Host;
  coHosts: CoHost[];
  description: string;
  sleepingArrangements: SleepingArrangement[];
  amenities: Amenity[];
  categoryRatings: CategoryRating[];
  reviewKeywords: ReviewKeyword[];
  reviews: Review[];
  safetyItems: SafetyItem[];
  houseRules: HouseRule[];
  cancellationPolicy: CancellationPolicy;
  locationHighlights: LocationHighlights;
  nearbyStays: NearbyStay[];
}
