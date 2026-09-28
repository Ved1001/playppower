// ============================================================
// Mock Property Data — Romantic Jacuzzi 1BHK Candolim
// Based on the reference application screenshots
// ============================================================

import { Property } from '@/types/property';

export const propertyData: Property = {
  id: 'prop-goa-candolim-luxury-301',
  title: 'Ultra Luxury 3BHK Pool Villa Candolim',
  subtitle: 'Entire villa in Candolim, Goa, India',
  propertyType: 'Entire villa',
  location: 'Candolim, Goa, India',
  pricePerNight: 25000,
  totalPrice: 125000,
  totalNights: 5,
  currency: '₹',
  rating: 4.95,
  reviewCount: 19,
  maxGuests: 6,
  bedrooms: 3,
  beds: 3,
  baths: 3,

  images: [
    {
      id: 'img-1',
      src: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=1200&auto=format&fit=crop',
      alt: 'Luxury villa exterior with private pool in Goa',
      caption: 'Stunning luxury villa with private pool',
    },
    {
      id: 'img-2',
      src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop',
      alt: 'Spacious living room with modern decor',
      caption: 'Spacious open-plan living area',
    },
    {
      id: 'img-3',
      src: 'https://images.unsplash.com/photo-1522771731515-3885172205ba?q=80&w=800&auto=format&fit=crop',
      alt: 'Master bedroom with premium bedding',
      caption: 'Cozy master bedroom',
    },
    {
      id: 'img-4',
      src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop',
      alt: 'Modern bathroom with rain shower',
      caption: 'Modern bathroom with premium fixtures',
    },
    {
      id: 'img-5',
      src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop',
      alt: 'Outdoor seating and garden area',
      caption: 'Peaceful outdoor seating area',
    },
  ],

  host: {
    name: 'Mirashya Homes',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
    isSuperhost: false,
    yearsHosting: 2,
    totalReviews: 1463,
    rating: 4.68,
    responseRate: 1.0,
    responseTime: 'within an hour',
    bornIn: 'Born in the 80s',
    school: 'Where I went to school: NICMAR GOA',
  },

  coHosts: [
    { name: 'Sharath', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop' },
    { name: 'Aman Dev Pahwa', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop' },
    { name: 'Maria Karen Priyanka', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop' },
    { name: 'Simran', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop' },
    { name: 'Pallavi', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop' },
    { name: 'Sanyukta', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=200&auto=format&fit=crop' },
    { name: 'Shruti', avatar: '' },
    { name: 'Amisha', avatar: '' },
  ],

  description:
    'Welcome to our ultra-luxury 3BHK pool villa in the heart of Candolim, Goa. This architectural masterpiece features a massive private infinity pool, a state-of-the-art kitchen, and expansive living areas perfect for group getaways. Enjoy seamless indoor-outdoor living with floor-to-ceiling windows overlooking tropical gardens. Includes daily housekeeping and an on-call chef. Located just 5 minutes from the beach.',

  sleepingArrangements: [
    {
      room: 'Master Bedroom',
      bedType: '1 king bed, Ensuite Bath',
      icon: 'bed',
    },
    {
      room: 'Guest Bedroom',
      bedType: '1 queen bed',
      icon: 'bed',
    },
    {
      room: 'Living Room',
      bedType: '1 sofa bed',
      icon: 'sofa',
    },
  ],

  amenities: [
    { id: 'pool', name: 'Pool', icon: 'pool', category: 'outdoor', isAvailable: true },
    { id: 'hot_tub', name: 'Hot tub', icon: 'hot_tub', category: 'outdoor', isAvailable: true },
    { id: 'patio', name: 'Patio or balcony', icon: 'patio', category: 'outdoor', isAvailable: true },
    { id: 'bbq', name: 'BBQ grill', icon: 'bbq', category: 'outdoor', isAvailable: true },
    { id: 'outdoor_dining', name: 'Outdoor dining area', icon: 'dining', category: 'outdoor', isAvailable: true },
    { id: 'wifi', name: 'Wifi', icon: 'wifi', category: 'internet_office', isAvailable: true },
    { id: 'workspace', name: 'Dedicated workspace', icon: 'workspace', category: 'internet_office', isAvailable: true },
    { id: 'kitchen', name: 'Kitchen', icon: 'kitchen', category: 'kitchen_dining', isAvailable: true },
    { id: 'fridge', name: 'Refrigerator', icon: 'fridge', category: 'kitchen_dining', isAvailable: true },
    { id: 'microwave', name: 'Microwave', icon: 'microwave', category: 'kitchen_dining', isAvailable: true },
    { id: 'cooking_basics', name: 'Cooking basics', icon: 'cooking', category: 'kitchen_dining', isAvailable: true },
    { id: 'dishes', name: 'Dishes and silverware', icon: 'dishes', category: 'kitchen_dining', isAvailable: true },
    { id: 'ac', name: 'Air conditioning', icon: 'ac', category: 'heating_cooling', isAvailable: true },
    { id: 'heating', name: 'Heating', icon: 'heating', category: 'heating_cooling', isAvailable: true },
    { id: 'washer', name: 'Washer', icon: 'washer', category: 'bedroom', isAvailable: true },
    { id: 'dryer', name: 'Dryer', icon: 'dryer', category: 'bedroom', isAvailable: true },
    { id: 'hangers', name: 'Hangers', icon: 'hangers', category: 'bedroom', isAvailable: true },
    { id: 'iron', name: 'Iron', icon: 'iron', category: 'bedroom', isAvailable: true },
    { id: 'essentials', name: 'Essentials', icon: 'essentials', category: 'bedroom', isAvailable: true },
    { id: 'hair_dryer', name: 'Hair dryer', icon: 'hair_dryer', category: 'bathroom', isAvailable: true },
    { id: 'hot_water', name: 'Hot water', icon: 'hot_water', category: 'bathroom', isAvailable: true },
    { id: 'shampoo', name: 'Shampoo', icon: 'shampoo', category: 'bathroom', isAvailable: true },
    { id: 'parking', name: 'Free parking on premises', icon: 'parking', category: 'parking', isAvailable: true },
    { id: 'tv', name: 'TV', icon: 'tv', category: 'entertainment', isAvailable: true },
    { id: 'pet_friendly', name: 'Pets allowed', icon: 'pet', category: 'services', isAvailable: true },
    { id: 'security_cameras', name: 'Exterior security cameras on property', icon: 'camera', category: 'home_safety', isAvailable: true },
    { id: 'smoke_alarm', name: 'Smoke alarm', icon: 'smoke', category: 'home_safety', isAvailable: false, isStrikethrough: true },
    { id: 'co_alarm', name: 'Carbon monoxide alarm', icon: 'co', category: 'home_safety', isAvailable: false, isStrikethrough: true },
  ],

  categoryRatings: [
    { category: 'Cleanliness', score: 5.0, icon: 'sparkle' },
    { category: 'Accuracy', score: 5.0, icon: 'check' },
    { category: 'Check-in', score: 5.0, icon: 'key' },
    { category: 'Communication', score: 5.0, icon: 'chat' },
    { category: 'Location', score: 4.8, icon: 'map' },
    { category: 'Value', score: 4.8, icon: 'tag' },
  ],

  reviewKeywords: [
    { label: 'Comfort', count: 6, emoji: '🛋️' },
    { label: 'Accuracy', count: 5, emoji: '🎯' },
    { label: 'Hot tub', count: 5, emoji: '🛁' },
    { label: 'Condition', count: 4, emoji: '🏠' },
    { label: 'Hospitality', count: 8, emoji: '🤝' },
    { label: 'Cleanliness', count: 4, emoji: '✨' },
    { label: 'Amenities', count: 2, emoji: '🎁' },
  ],

  reviews: [
    {
      id: 'rev-1',
      author: 'Amit',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=150&auto=format&fit=crop',
      yearsOnPlatform: '2 months on Airbnb',
      date: '1 week ago',
      rating: 5,
      content:
        'Very helpful and responsive team. Safe and peaceful stay, loved everything about the property.',
    },
    {
      id: 'rev-2',
      author: 'Aheesh',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop',
      yearsOnPlatform: '3 years on Airbnb',
      date: '2 weeks ago',
      rating: 5,
      content:
        'We had a wonderful stay. The apartment was clean, comfortable, and exactly as shown in the photos. The host was very responsive and helpful throughout our stay. We would definitely recommend this place and would love to stay here again.',
    },
    {
      id: 'rev-3',
      author: 'Samiksha',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
      yearsOnPlatform: '8 months on Airbnb',
      date: 'May 2026',
      rating: 5,
      content: 'the host nitish was really great help',
    },
    {
      id: 'rev-4',
      author: 'Vedant',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
      yearsOnPlatform: '4 years on Airbnb',
      date: 'May 2026',
      rating: 5,
      content:
        'We had an amazing stay at this property in Goa! The entire home was spotless and exceptionally well-maintained, making us feel comfortable from the moment we arrived. The cleanliness standards were truly impressive, with every corner of the house looking fresh and pristine....',
    },
    {
      id: 'rev-5',
      author: 'Vaibhav S',
      avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=150&auto=format&fit=crop',
      yearsOnPlatform: '3 years on Airbnb',
      date: 'May 2026',
      rating: 5,
      content:
        'Great great experience living out there, can\'t expect more, will always look for it in the future and will recommend my friends too.',
    },
    {
      id: 'rev-6',
      author: 'Mohd',
      avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=150&auto=format&fit=crop',
      yearsOnPlatform: '5 years on Airbnb',
      date: 'May 2026',
      rating: 5,
      content: 'Great place. Exactly as described in the listing.',
    },
  ],

  safetyItems: [
    {
      id: 'co_alarm',
      name: 'Carbon monoxide alarm not reported',
      type: 'MISSING',
      icon: 'alert',
    },
    {
      id: 'smoke_alarm',
      name: 'Smoke alarm not reported',
      type: 'MISSING',
      icon: 'alert',
    },
    {
      id: 'security_cameras',
      name: 'Exterior security cameras on property',
      type: 'PRESENT',
      icon: 'camera',
    },
  ],

  houseRules: [
    { icon: 'clock', text: 'Check-in after 2:00 pm' },
    { icon: 'clock', text: 'Checkout before 11:00 am' },
    { icon: 'guests', text: '3 guests maximum' },
  ],

  cancellationPolicy: {
    title: 'Cancellation policy',
    lines: [
      'Free cancellation before 17 October.',
      'Cancel before check-in on 18 October for a partial refund.',
      "Review this host's full policy for details.",
    ],
  },

  locationHighlights: {
    neighborhood: 'Candolim',
    region: 'Goa, India',
    description:
      'Located in the heart of Candolim, Amor de Goa offers a peaceful stay with easy access to beaches, cafés, and popular attractions.',
    exactLocationBeforeBooking: false,
  },

  nearbyStays: [
    {
      id: 'nearby-1',
      title: 'Beautiful Studio with a view to die for',
      image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=800&auto=format&fit=crop',
      price: 23600,
      rating: 4.91,
      currency: '₹',
    },
    {
      id: 'nearby-2',
      title: 'NAQAB - 1bhk with private pool',
      image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=800&auto=format&fit=crop',
      price: 42218,
      rating: 4.95,
      currency: '₹',
    },
    {
      id: 'nearby-3',
      title: 'Greenique Luxury Flat with plunge pool, Calangute',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop',
      price: 44506,
      rating: 4.94,
      currency: '₹',
    },
    {
      id: 'nearby-4',
      title: 'The Tropical Studio | 5 mins to Beach',
      image: 'https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=800&auto=format&fit=crop',
      price: 22824,
      rating: 4.96,
      currency: '₹',
    },
    {
      id: 'nearby-5',
      title: 'Luxury Casa Bella 1BHK with plunge pool, Calangute',
      image: 'https://images.unsplash.com/photo-1560185016-bp1e3b62b1b3?q=80&w=800&auto=format&fit=crop',
      price: 39942,
      rating: 4.95,
      currency: '₹',
    },
  ],
};
