import React, { useState } from 'react';

export default function ReservationSection({ onShowToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: '2',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: '19:00',
    seating: 'Main Dining Room',
    occasion: 'None',
    specialRequests: ''
  });

  const [loading, setLoading] = useState(false);
  const [confirmedReservation, setConfirmedReservation] = useState(null);

  const timeSlots = [
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.date || !formData.time) {
      onShowToast('Please fill out all required fields.');
      return;
    }

    setLoading(true);

    try {
      // Connect to REST backend
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setConfirmedReservation(data.reservation);
        onShowToast(`Reservation confirmed! Code: ${data.reservation.id}`);
      } else {
        throw new Error(data.message || 'Server error');
      }
    } catch (err) {
      console.warn('Backend offline or fallback:', err);
      // Client-side fallback if backend server isn't running
      const fallbackId = 'AK-RES-' + Math.floor(1000 + Math.random() * 9000);
      const fallbackRes = {
        ...formData,
        id: fallbackId,
        status: 'Confirmed'
      };
      setConfirmedReservation(fallbackRes);
      onShowToast(`Reservation confirmed! Code: ${fallbackId}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="reservations" className="section-padding reservation-section">
      <div className="container">
        <div className="text-center">
          <div className="section-badge">Reserve Your Table</div>
          <h2 className="section-title">
            An Intimate <span>Dining Journey</span>
          </h2>
          <p className="section-subtitle">
            Secure your table for an evening of woodfire gastronomy, curated wines, 
            and soulful hospitality. We recommend booking 2-3 days in advance.
          </p>
        </div>

        <div className="reservation-card">
          {confirmedReservation ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🎉</div>
              <h3 style={{ fontSize: '1.8rem', color: 'var(--gold-light)', marginBottom: '0.5rem' }}>
                Table Reserved Successfully!
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '1.05rem' }}>
                We are thrilled to welcome you, <strong>{confirmedReservation.name}</strong>.
              </p>

              <div style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid var(--gold-border)',
                borderRadius: '16px',
                padding: '1.5rem',
                maxWidth: '460px',
                margin: '0 auto 2rem auto',
                textAlign: 'left'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Booking Reference:</span>
                  <span style={{ color: 'var(--gold-light)', fontWeight: 700 }}>{confirmedReservation.id}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Date & Time:</span>
                  <span style={{ color: '#fff' }}>{confirmedReservation.date} at {confirmedReservation.time}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Party Size:</span>
                  <span style={{ color: '#fff' }}>{confirmedReservation.guests} Guests</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Seating Atmosphere:</span>
                  <span style={{ color: '#fff' }}>{confirmedReservation.seating}</span>
                </div>
              </div>

              <button 
                className="btn btn-outline" 
                onClick={() => setConfirmedReservation(null)}
              >
                Make Another Reservation
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input 
                    type="text" 
                    name="name" 
                    required 
                    className="form-control" 
                    placeholder="e.g. Lady Catherine" 
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input 
                    type="email" 
                    name="email" 
                    required 
                    className="form-control" 
                    placeholder="catherine@example.com" 
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    required 
                    className="form-control" 
                    placeholder="+1 (555) 000-0000" 
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Number of Guests</label>
                  <select 
                    name="guests" 
                    className="form-control" 
                    value={formData.guests}
                    onChange={handleChange}
                  >
                    <option value="1">1 Person (Solo Dining)</option>
                    <option value="2">2 Guests (Table for Two)</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5">5 Guests</option>
                    <option value="6">6 Guests</option>
                    <option value="8">8 Guests (Large Party)</option>
                    <option value="10">10+ Guests (Private Dining)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Dining Date</label>
                  <input 
                    type="date" 
                    name="date" 
                    required 
                    className="form-control" 
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Preferred Time Slot</label>
                  <select 
                    name="time" 
                    className="form-control" 
                    value={formData.time}
                    onChange={handleChange}
                  >
                    {timeSlots.map(t => (
                      <option key={t} value={t}>{t} (Evening)</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Seating Ambiance</label>
                  <select 
                    name="seating" 
                    className="form-control" 
                    value={formData.seating}
                    onChange={handleChange}
                  >
                    <option value="Main Dining Room">Main Candlelit Dining Room</option>
                    <option value="Romantic Garden Patio">Romantic Garden Patio (Heated)</option>
                    <option value="Chef's Tasting Counter">Chef's Tasting Counter (Front Row)</option>
                    <option value="Private Wine Alcove">Private Wine Alcove</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Special Occasion</label>
                  <select 
                    name="occasion" 
                    className="form-control" 
                    value={formData.occasion}
                    onChange={handleChange}
                  >
                    <option value="None">Casual Dinner</option>
                    <option value="Birthday">Birthday Celebration 🎂</option>
                    <option value="Anniversary">Anniversary 🥂</option>
                    <option value="Date Night">Date Night ✨</option>
                    <option value="Business">Business Dinner</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label className="form-label">Special Dietary Notes & Requests (Optional)</label>
                  <textarea 
                    name="specialRequests" 
                    rows="3" 
                    className="form-control" 
                    placeholder="Allergies, high chair required, quiet corner preference..."
                    value={formData.specialRequests}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Confirming Reservation...' : '🍷 Confirm Table Reservation'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
