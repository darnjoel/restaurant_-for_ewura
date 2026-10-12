import React from 'react';

export default function AboutSection() {
  return (
    <section id="about" className="section-padding about-section">
      <div className="container">
        <div className="about-grid">
          <div className="about-media-wrapper">
            <div className="about-img-frame">
              <img 
                src="/images/chef-annah.jpg" 
                alt="Executive Head Chef Annah smiling in her open kitchen" 
                className="about-img"
              />
            </div>
            <div className="about-badge-card">
              <div className="badge-icon-box">🏆</div>
              <div>
                <h4 style={{ color: '#fff', fontSize: '1.05rem', margin: 0 }}>Executive Chef Annah</h4>
                <p style={{ color: 'var(--gold-light)', fontSize: '0.85rem', margin: 0 }}>Master of Ghanaian Gastronomy</p>
              </div>
            </div>
          </div>

          <div className="about-text-content">
            <div className="section-badge">Our Heritage & Craft</div>
            <h2 className="section-title">
              Crafted With <span>Soul & Fire</span>
            </h2>

            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem', fontSize: '1.05rem' }}>
              Born from a deep reverence for Ghana's culinary heritage—from the bustling seaside smokehouses of Jamestown and Osu to the ancestral hearths of the Ashanti and Northern regions—<strong>Annah's Kitchen</strong> elevates beloved traditional recipes into a world-class fine dining experience.
            </p>

            <div className="about-quote-box">
              “True Ghanaian hospitality is Akwaaba in every bite: welcoming you to our table as family and honoring the earth through soulful food.”
            </div>

            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.8rem', fontSize: '1rem' }}>
              We partner directly with sustainable smallholder farms and coastal fishermen. 
              Our spices are hand-roasted on cast iron, our shito is slow-caramelized over 12 hours with smoked dried fish and scotch bonnets, and our dishes celebrate authentic indigenous ingredients like dawadawa, prekese, and single-origin Ashanti cocoa.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '1.5rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                <h3 style={{ color: 'var(--gold-light)', fontSize: '1.6rem', marginBottom: '0.2rem' }}>14K+</h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Delighted Guests</p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                <h3 style={{ color: 'var(--gold-light)', fontSize: '1.6rem', marginBottom: '0.2rem' }}>100%</h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Ghanaian Roots</p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                <h3 style={{ color: 'var(--gold-light)', fontSize: '1.6rem', marginBottom: '0.2rem' }}>28+</h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Ancestral Spices</p>
              </div>
            </div>

            <div className="chef-signature">
              <img src="/images/chef-annah.jpg" alt="Chef Annah portrait" className="chef-avatar" />
              <div className="chef-meta">
                <h4>Annah Mensah</h4>
                <p>Founder & Chef Patron</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
