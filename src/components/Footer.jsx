import React, { useState } from 'react';
import { RESTAURANT_INFO } from '../data/menuData';

export default function Footer({ onShowToast }) {
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    onShowToast(`Subscribed! Look out for Chef Annah's private seasonal tastings.`);
    setNewsletterEmail('');
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand info */}
          <div className="footer-col">
            <div className="brand-logo" style={{ marginBottom: '1.25rem' }}>
              <div className="brand-icon">✨</div>
              <div className="brand-text">
                <span className="brand-name">ANNAH'S</span>
                <span className="brand-tagline">KITCHEN</span>
              </div>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.5rem', maxWidth: '340px' }}>
              Contemporary afro-fusion dining celebrating woodfire embers, heritage terroir, 
              and soulful connection in an intimate dining sanctuary.
            </p>
            <div style={{ display: 'flex', gap: '0.85rem' }}>
              {['📸 Instagram', '📘 Facebook', '🐦 X (Twitter)'].map((plat, i) => (
                <span 
                  key={i} 
                  style={{ 
                    fontSize: '0.82rem', 
                    padding: '0.35rem 0.75rem', 
                    background: 'rgba(255,255,255,0.05)', 
                    borderRadius: '999px',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-muted)'
                  }}
                >
                  {plat}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Nav */}
          <div className="footer-col">
            <h4>Sanctuary</h4>
            <ul className="footer-links">
              <li><a href="#home">Home Experience</a></li>
              <li><a href="#menu">Artisan Menu</a></li>
              <li><a href="#about">Chef Annah's Story</a></li>
              <li><a href="#reservations">Table Booking</a></li>
              <li><a href="#reviews">Guest Impressions</a></li>
            </ul>
          </div>

          {/* Culinary Hours */}
          <div className="footer-col">
            <h4>Hours & Service</h4>
            <ul className="footer-links">
              <li style={{ color: 'var(--text-secondary)' }}>Tue – Thu: 4:30 PM – 10:30 PM</li>
              <li style={{ color: 'var(--text-secondary)' }}>Fri – Sun: 12:00 PM – 11:30 PM</li>
              <li style={{ color: 'var(--text-muted)' }}>Monday: Culinary Prep & Sourcing</li>
              <li style={{ marginTop: '0.5rem', color: 'var(--gold-light)' }}>Live Jazz: Fri & Sat 8:00 PM</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-col">
            <h4>The Chef's Journal</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1rem' }}>
              Receive exclusive invitations to Chef Annah's secret multi-course tasting dinners and harvest updates.
            </p>
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.5rem' }}>
              <input 
                type="email" 
                required 
                placeholder="your.email@example.com" 
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                style={{
                  flex: 1,
                  padding: '0.65rem 1rem',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '999px',
                  color: '#fff',
                  fontSize: '0.88rem'
                }}
              />
              <button type="submit" className="btn btn-primary btn-sm">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} Annah's Kitchen Hospitality Group. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
            <span>Privacy Policy</span>
            <span>Allergen & Dietary Advisory</span>
            <span>Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
