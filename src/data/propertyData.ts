// ============================================================
// Mock Property Data — Romantic Jacuzzi 1BHK Candolim
// Based on the reference application screenshots
// ============================================================

import { Property } from '@/types/property';

export const propertyData: Property = {
  id: 'prop-goa-candolim-101',
  title: 'Romantic Jacuzzi 1BHK Candolim',
  subtitle: 'Entire rental unit in Candolim, Goa, India',
  propertyType: 'Entire rental unit',
  location: 'Candolim, Goa, India',
  pricePerNight: 5699,
  totalPrice: 28499,
  totalNights: 5,
  currency: '₹',
  rating: 4.95,
  reviewCount: 19,
  maxGuests: 3,
  bedrooms: 1,
  beds: 1,
  baths: 1,

  images: [
    {
      id: 'img-1',
      src: '/images/hero-1.jpg',
      alt: 'Living room with jacuzzi view at Romantic 1BHK Candolim',
      caption: 'Spacious living area with private jacuzzi',
    },
    {
      id: 'img-2',
      src: '/images/hero-2.jpg',
      alt: 'Bedroom with modern décor',
      caption: 'Cozy bedroom with premium bedding',
    },
    {
      id: 'img-3',
      src: '/images/hero-3.jpg',
      alt: 'Private plunge pool area',
      caption: 'Private plunge pool surrounded by tropical greenery',
    },
    {
      id: 'img-4',
      src: '/images/hero-4.jpg',
      alt: 'Modern bathroom with rain shower',
      caption: 'Modern bathroom with premium fixtures',
    },
    {
      id: 'img-5',
      src: '/images/hero-5.jpg',
      alt: 'Outdoor seating and garden area',
      caption: 'Peaceful outdoor seating area',
    },
  ],

  host: {
    name: 'Mirashya Homes',
    avatar: '/images/host-avatar.jpg',
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
    { name: 'Sharath', avatar: '/images/cohost-1.jpg' },
    { name: 'Aman Dev Pahwa', avatar: '/images/cohost-2.jpg' },
    { name: 'Maria Karen Priyanka', avatar: '/images/cohost-3.jpg' },
    { name: 'Simran', avatar: '/images/cohost-4.jpg' },
    { name: 'Pallavi', avatar: '/images/cohost-5.jpg' },
    { name: 'Sanyukta', avatar: '/images/cohost-6.jpg' },
    { name: 'Shruti', avatar: '' },
    { name: 'Amisha', avatar: '' },
  ],

  description:
    'Welcome to our romantic 1BHK retreat in the heart of Candolim, Goa. This beautifully designed unit features a private jacuzzi, plunge pool, and modern interiors perfect for couples seeking a peaceful getaway. Located just minutes from Candolim Beach, you\'ll enjoy easy access to Goa\'s best restaurants, beach shacks, and nightlife. The space includes a fully equipped kitchen, dedicated workspace, high-speed Wi-Fi, and air conditioning throughout. Whether you\'re looking to unwind by the pool or explore the vibrant Goan culture, this property offers the perfect blend of comfort and convenience.',

  sleepingArrangements: [
    {
      room: 'Bedroom',
      bedType: '1 queen bed',
      icon: 'bed',
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
      avatar: '',
      yearsOnPlatform: '2 months on Airbnb',
      date: '1 week ago',
      rating: 5,
      content:
        'Very helpful and responsive team. Safe and peaceful stay, loved everything about the property.',
    },
    {
      id: 'rev-2',
      author: 'Aheesh',
      avatar: '/images/reviewer-2.jpg',
      yearsOnPlatform: '3 years on Airbnb',
      date: '2 weeks ago',
      rating: 5,
      content:
        'We had a wonderful stay. The apartment was clean, comfortable, and exactly as shown in the photos. The host was very responsive and helpful throughout our stay. We would definitely recommend this place and would love to stay here again.',
    },
    {
      id: 'rev-3',
      author: 'Samiksha',
      avatar: '/images/reviewer-3.jpg',
      yearsOnPlatform: '8 months on Airbnb',
      date: 'May 2026',
      rating: 5,
      content: 'the host nitish was really great help',
    },
    {
      id: 'rev-4',
      author: 'Vedant',
      avatar: '',
      yearsOnPlatform: '4 years on Airbnb',
      date: 'May 2026',
      rating: 5,
      content:
        'We had an amazing stay at this property in Goa! The entire home was spotless and exceptionally well-maintained, making us feel comfortable from the moment we arrived. The cleanliness standards were truly impressive, with every corner of the house looking fresh and pristine....',
    },
    {
      id: 'rev-5',
      author: 'Vaibhav S',
      avatar: '/images/reviewer-5.jpg',
      yearsOnPlatform: '3 years on Airbnb',
      date: 'May 2026',
      rating: 5,
      content:
        'Great great experience living out there, can\'t expect more, will always look for it in the future and will recommend my friends too.',
    },
    {
      id: 'rev-6',
      author: 'Mohd',
      avatar: '/images/reviewer-6.jpg',
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
      image: '/images/nearby-1.jpg',
      price: 23600,
      rating: 4.91,
      currency: '₹',
    },
    {
      id: 'nearby-2',
      title: 'NAQAB - 1bhk with private pool',
      image: '/images/nearby-2.jpg',
      price: 42218,
      rating: 4.95,
      currency: '₹',
    },
    {
      id: 'nearby-3',
      title: 'Greenique Luxury Flat with plunge pool, Calangute',
      image: '/images/nearby-3.jpg',
      price: 44506,
      rating: 4.94,
      currency: '₹',
    },
    {
      id: 'nearby-4',
      title: 'The Tropical Studio | 5 mins to Beach',
      image: '/images/nearby-4.jpg',
      price: 22824,
      rating: 4.96,
      currency: '₹',
    },
    {
      id: 'nearby-5',
      title: 'Luxury Casa Bella 1BHK with plunge pool, Calangute',
      image: '/images/nearby-5.jpg',
      price: 39942,
      rating: 4.95,
      currency: '₹',
    },
  ],
};
