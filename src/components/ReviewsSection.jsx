import React, { useState } from 'react';

export default function ReviewsSection({ reviews, onOpenReviewModal }) {
  return (
    <section id="reviews" className="section-padding">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '3rem' }}>
          <div>
            <div className="section-badge">Guest Impressions</div>
            <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>
              Stories From Our <span>Guests</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '550px' }}>
              Read authentic recollections from patrons, critics, and culinary enthusiasts who experienced Annah's hearth.
            </p>
          </div>

          <button className="btn btn-outline" onClick={onOpenReviewModal}>
            <span>✍️</span> Share Your Review
          </button>
        </div>

        <div className="reviews-grid">
          {reviews.map((rev) => (
            <div key={rev.id} className="review-card">
              <div className="review-header">
                <div className="review-avatar">{rev.avatar || 'AK'}</div>
                <div className="review-author">
                  <h4>{rev.name}</h4>
                  <p>{rev.role} • {rev.date}</p>
                </div>
              </div>

              <div className="review-stars">
                {'★'.repeat(rev.rating)}
                {'☆'.repeat(5 - rev.rating)}
              </div>

              <p className="review-quote">
                “{rev.comment}”
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
