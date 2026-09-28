'use client';

import { useState, useCallback } from 'react';
import { Property } from '@/types/property';
import PropertyGallery from './PropertyGallery';
import PropertyTitle from './PropertyTitle';
import PropertyDescription from './PropertyDescription';
import SleepingArrangements from './SleepingArrangements';
import AmenitiesSection from './AmenitiesSection';
import BookingCard from './BookingCard';
import ReviewsSection from './ReviewsSection';
import LocationSection from './LocationSection';
import HostSection from './HostSection';
import ThingsToKnow from './ThingsToKnow';
import NearbyStays from './NearbyStays';
import Lightbox from '@/components/overlays/Lightbox';
import styles from './ListingPage.module.css';

interface ListingPageProps {
  property: Property;
}

export default function ListingPage({ property }: ListingPageProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const handleOpenLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
    document.body.classList.add('modal-open');
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setIsLightboxOpen(false);
    document.body.classList.remove('modal-open');
  }, []);

  return (
    <>
      <main className={styles.main}>
        {/* Hero Gallery */}
        <section id="photos" className={styles.gallerySection}>
          <PropertyGallery
            images={property.images}
            onOpenLightbox={handleOpenLightbox}
          />
        </section>

        {/* Two-Column Content Layout */}
        <div className={`container ${styles.contentGrid}`}>
          {/* Left Column */}
          <div className={styles.leftColumn}>
            <PropertyTitle property={property} />
            <hr className="section-divider" />

            <PropertyDescription description={property.description} />
            <hr className="section-divider" />

            <SleepingArrangements arrangements={property.sleepingArrangements} />
            <hr className="section-divider" />

            <section id="amenities">
              <AmenitiesSection amenities={property.amenities} />
            </section>
            <hr className="section-divider" />
          </div>

          {/* Right Column — Sticky Booking Card */}
          <aside className={styles.rightColumn}>
            <BookingCard property={property} />
          </aside>
        </div>

        {/* Full-Width Sections */}
        <div className="container">
          <section id="reviews">
            <ReviewsSection
              rating={property.rating}
              reviewCount={property.reviewCount}
              categoryRatings={property.categoryRatings}
              reviewKeywords={property.reviewKeywords}
              reviews={property.reviews}
            />
          </section>
          <hr className="section-divider" />

          <section id="location">
            <LocationSection locationHighlights={property.locationHighlights} />
          </section>
          <hr className="section-divider" />

          <HostSection
            host={property.host}
            coHosts={property.coHosts}
          />
          <hr className="section-divider" />

          <ThingsToKnow
            cancellationPolicy={property.cancellationPolicy}
            houseRules={property.houseRules}
            safetyItems={property.safetyItems}
          />
          <hr className="section-divider" />

          <NearbyStays stays={property.nearbyStays} />
        </div>
      </main>

      {/* Overlays */}
      {isLightboxOpen && (
        <Lightbox
          images={property.images}
          currentIndex={lightboxIndex}
          onClose={handleCloseLightbox}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
}
