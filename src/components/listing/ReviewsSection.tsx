import { useState } from 'react';
import { CategoryRating, ReviewKeyword, Review } from '@/types/property';
import styles from './ReviewsSection.module.css';

interface ReviewsSectionProps {
  rating: number;
  reviewCount: number;
  categoryRatings: CategoryRating[];
  reviewKeywords: ReviewKeyword[];
  reviews: Review[];
}

export default function ReviewsSection({ 
  rating, 
  reviewCount, 
  categoryRatings, 
  reviewKeywords, 
  reviews 
}: ReviewsSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const displayedReviews = reviews.slice(0, 6);

  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.heading}>
          ★ {rating} · {reviewCount} reviews
        </h2>
        <p className={styles.howItWorks}>
          <a href="#">How reviews work</a>
        </p>

        <div className={styles.categoriesGrid}>
          {categoryRatings.map((cat, index) => (
            <div key={index} className={styles.categoryRow}>
              <span className={styles.categoryName}>{cat.category}</span>
              <div className={styles.barContainer}>
                <div className={styles.barBackground}>
                  <div 
                    className={styles.barFill} 
                    style={{ width: `${(cat.score / 5) * 100}%` }}
                  />
                </div>
                <span className={styles.score}>{cat.score.toFixed(1)}</span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.keywordsScroll}>
          {reviewKeywords.map((kw, index) => (
            <div key={index} className={styles.keywordPill}>
              <span>{kw.emoji} {kw.label}</span>
              <span className={styles.keywordCount}>{kw.count}</span>
            </div>
          ))}
        </div>

        <div className={styles.reviewsGrid}>
          {displayedReviews.map((review) => (
            <div key={review.id} className={styles.reviewCard}>
              <div className={styles.authorInfo}>
                <div 
                  className={styles.avatar} 
                  style={{ backgroundImage: `url(${review.avatar})` }}
                >
                  {!review.avatar && review.author.charAt(0)}
                </div>
                <div>
                  <div className={styles.authorName}>{review.author}</div>
                  <div className={styles.yearsOnPlatform}>{review.yearsOnPlatform}</div>
                </div>
              </div>
              <div className={styles.reviewMeta}>
                <span className={styles.stars}>{'★'.repeat(review.rating)}</span>
                <span className={styles.dot}>·</span>
                <span className={styles.date}>{review.date}</span>
              </div>
              <p className={styles.content}>{review.content}</p>
              <button className={styles.showMoreBtn} onClick={() => setIsModalOpen(true)}>Show more &gt;</button>
            </div>
          ))}
        </div>

        <button className={styles.showAllReviewsBtn} onClick={() => setIsModalOpen(true)}>
          Show all {reviewCount} reviews
        </button>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <button className={styles.modalCloseBtn} onClick={() => setIsModalOpen(false)}>✕</button>
              <h2 className={styles.modalHeading}>★ {rating} · {reviewCount} reviews</h2>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.modalReviewsList}>
                {reviews.map((review) => (
                  <div key={review.id} className={styles.reviewCard}>
                    <div className={styles.authorInfo}>
                      <div 
                        className={styles.avatar} 
                        style={{ backgroundImage: `url(${review.avatar})` }}
                      >
                        {!review.avatar && review.author.charAt(0)}
                      </div>
                      <div>
                        <div className={styles.authorName}>{review.author}</div>
                        <div className={styles.yearsOnPlatform}>{review.yearsOnPlatform}</div>
                      </div>
                    </div>
                    <div className={styles.reviewMeta}>
                      <span className={styles.stars}>{'★'.repeat(review.rating)}</span>
                      <span className={styles.dot}>·</span>
                      <span className={styles.date}>{review.date}</span>
                    </div>
                    <p className={styles.content}>{review.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
