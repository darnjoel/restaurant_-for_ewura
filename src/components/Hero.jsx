import React from 'react';

export default function Hero({ onBookTableClick, onExploreMenuClick }) {
  return (
    <section id="home" className="hero-section">
      <div className="hero-background">
        <img 
          src="/images/hero.jpg" 
          alt="Annah's Kitchen culinary spread with steak, prawns, flatbread, and candles" 
          className="hero-bg-img"
        />
        <div className="hero-overlay"></div>
      </div>

      <div className="container">
        <div className="hero-content">
          <div className="section-badge">
            <span>✨</span> Michelin Guide Recommended 2026
          </div>

          <h1 className="hero-title">
            Where Soul Meets <span className="highlight">Flavor</span>
          </h1>

          <p className="hero-description">
            Experience contemporary afro-fusion gastronomy by Executive Chef Annah. 
            Woodfire-charred prime cuts, heritage spices, and vibrant farm-fresh botanicals 
            in an intimate candlelit sanctuary.
          </p>

          <div className="hero-cta-group">
            <button className="btn btn-primary" onClick={onBookTableClick}>
              <span>🍷</span> Reserve a Table
            </button>
            <button className="btn btn-outline" onClick={onExploreMenuClick}>
              <span>📜</span> Explore Menu
            </button>
          </div>

          <div className="hero-stats-row">
            <div className="hero-stat-card">
              <div className="stat-number">4.95★</div>
              <div className="stat-label">Guest Rating</div>
            </div>
            <div className="hero-stat-card">
              <div className="stat-number">15+</div>
              <div className="stat-label">Years Culinary Craft</div>
            </div>
            <div className="hero-stat-card">
              <div className="stat-number">100%</div>
              <div className="stat-label">Farm Fresh Sourcing</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
