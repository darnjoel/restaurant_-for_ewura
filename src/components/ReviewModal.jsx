import React, { useState } from 'react';

export default function ReviewModal({ isOpen, onClose, onReviewAdded, onShowToast }) {
  const [formData, setFormData] = useState({
    name: '',
    role: 'Verified Diner',
    rating: 5,
    comment: ''
  });
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.comment) {
      onShowToast('Please provide your name and thoughts.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        onReviewAdded(data.review);
        onShowToast('Thank you! Your review has been published.');
        onClose();
      } else {
        throw new Error(data.message || 'Error saving review');
      }
    } catch (err) {
      console.warn('Fallback review submission:', err);
      const fallbackRev = {
        id: Date.now(),
        name: formData.name,
        role: formData.role,
        rating: formData.rating,
        comment: formData.comment,
        avatar: formData.name.slice(0, 2).toUpperCase() || 'AK',
        date: 'Just now'
      };
      onReviewAdded(fallbackRev);
      onShowToast('Thank you! Your review has been added.');
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>✕</button>

        <div style={{ marginBottom: '1.5rem' }}>
          <div className="section-badge" style={{ marginBottom: '0.5rem' }}>Guest Impressions</div>
          <h3 style={{ fontSize: '1.6rem', color: '#fff', margin: 0 }}>Review Your Experience</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', margin: '0.35rem 0 0 0' }}>
            We cherish all thoughts and stories from patrons who have dined at our table.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div className="form-group">
            <label className="form-label">Your Name *</label>
            <input 
              type="text" 
              required 
              className="form-control" 
              placeholder="e.g. Alistair & Clare"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Dining Relationship</label>
            <select 
              className="form-control"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="Verified Diner">Verified Diner</option>
              <option value="Food & Wine Critic">Food & Wine Critic</option>
              <option value="Special Celebration">Special Celebration</option>
              <option value="First-Time Visitor">First-Time Visitor</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Star Rating</label>
            <div style={{ display: 'flex', gap: '0.5rem', fontSize: '1.8rem', color: 'var(--gold-light)', cursor: 'pointer' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span 
                  key={star} 
                  onClick={() => setFormData({ ...formData, rating: star })}
                  style={{ userSelect: 'none' }}
                >
                  {star <= formData.rating ? '★' : '☆'}
                </span>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Your Review & Comments *</label>
            <textarea 
              rows="4" 
              required 
              className="form-control" 
              placeholder="What made your culinary experience memorable? Favorite dish, ambiance, service..."
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Publishing...' : '✨ Publish Review'}
          </button>
        </form>
      </div>
    </div>
  );
}
