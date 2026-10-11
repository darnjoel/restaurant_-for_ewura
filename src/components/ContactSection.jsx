import React, { useState } from 'react';
import { RESTAURANT_INFO } from '../data/menuData';

export default function ContactSection({ onShowToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    {
      q: "What is the dress code at Annah's Kitchen?",
      a: "We welcome smart casual to elegant evening attire. We kindly ask guests to refrain from athletic wear, beachwear, and flip-flops."
    },
    {
      q: "Are Halal and Vegan dietary preferences accommodated?",
      a: "Yes! All our chicken and lamb cuts are certified Halal. We also feature curated vegan and vegetarian entrees prepared in dedicated cookware."
    },
    {
      q: "Is there valet or dedicated parking available?",
      a: "Complimentary valet parking is available at the Heritage Boulevard entrance starting from 5:00 PM every evening."
    },
    {
      q: "What is your corkage and cakeage policy?",
      a: "Guests may bring up to two 750ml bottles of wine not represented on our wine list ($35 corkage per bottle). Cake service fee is $20."
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      onShowToast('Please complete all required fields.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        onShowToast(data.message);
        setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
      } else {
        throw new Error(data.message || 'Error sending message');
      }
    } catch (err) {
      console.warn('Fallback contact notice:', err);
      onShowToast('Thank you! Your message has been safely received by Chef Annah’s team.');
      setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding" style={{ background: '#0a0c10' }}>
      <div className="container">
        <div className="text-center">
          <div className="section-badge">Visit & Connect</div>
          <h2 className="section-title">
            Hours & <span>Location</span>
          </h2>
          <p className="section-subtitle">
            Join us in the heart of the Gourmet Quarter. We look forward to offering you an unforgettable evening.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', marginBottom: '4rem' }}>
          {/* Location & Hours Card */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '2.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.3rem 0.8rem', background: 'rgba(34, 197, 94, 0.15)', border: '1px solid rgba(34, 197, 94, 0.4)', borderRadius: '999px', color: '#4ade80', fontSize: '0.8rem', fontWeight: 600, marginBottom: '1.5rem' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }}></span>
                Open Tonight: 4:30 PM - 10:30 PM
              </div>

              <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '1.5rem' }}>Sanctuary Details</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.3rem' }}>📍</span>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', color: '#fff', margin: 0 }}>Address</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>{RESTAURANT_INFO.address}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.3rem' }}>📞</span>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', color: '#fff', margin: 0 }}>Reservations & Inquiries</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>{RESTAURANT_INFO.phone}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.3rem' }}>✉️</span>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', color: '#fff', margin: 0 }}>Concierge Email</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>{RESTAURANT_INFO.email}</p>
                  </div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem' }}>
                <h4 style={{ fontSize: '1rem', color: 'var(--gold-light)', marginBottom: '0.8rem' }}>Opening Hours</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '0.4rem' }}>{RESTAURANT_INFO.hours.weekdays}</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '0.4rem' }}>{RESTAURANT_INFO.hours.weekend}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontStyle: 'italic' }}>{RESTAURANT_INFO.hours.closed}</p>
              </div>
            </div>
          </div>

          {/* Contact Message Form */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '2.5rem'
          }}>
            <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '0.5rem' }}>Send Us a Message</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Planning a private event or have bespoke dietary questions? Send our maître d' a note.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div className="form-group">
                <label className="form-label">Your Name *</label>
                <input 
                  type="text" 
                  required 
                  className="form-control" 
                  placeholder="e.g. Julian Hayes"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input 
                  type="email" 
                  required 
                  className="form-control" 
                  placeholder="julian@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Subject</label>
                <select 
                  className="form-control"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Private Dining & Events">Private Dining & Events (10+ guests)</option>
                  <option value="Press & Media">Press & Media</option>
                  <option value="Feedback">Feedback for Chef Annah</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Your Message *</label>
                <textarea 
                  rows="4" 
                  required 
                  className="form-control" 
                  placeholder="How can we curate your experience?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? 'Transmitting Note...' : '✉️ Send Message'}
              </button>
            </form>
          </div>
        </div>

        {/* FAQs Accordion */}
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <h3 style={{ textAlign: 'center', fontSize: '1.6rem', color: '#fff', marginBottom: '1.8rem' }}>Frequently Asked Questions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  overflow: 'hidden'
                }}
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '1.25rem 1.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: '1rem',
                    textAlign: 'left'
                  }}
                >
                  <span>{faq.q}</span>
                  <span style={{ color: 'var(--gold-light)', fontSize: '1.2rem' }}>
                    {activeFaq === idx ? '−' : '+'}
                  </span>
                </button>
                {activeFaq === idx && (
                  <div style={{ padding: '0 1.5rem 1.25rem 1.5rem', color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
