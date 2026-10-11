import React, { useState } from 'react';

export default function Navbar({ cartCount, onOpenCart, onOpenReservationModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <a href="#home" className="brand-logo" onClick={closeMenu}>
          <div className="brand-icon">✨</div>
          <div className="brand-text">
            <span className="brand-name">ANNAH'S</span>
            <span className="brand-tagline">KITCHEN</span>
          </div>
        </a>

        <ul className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <li><a href="#home" className="nav-link active" onClick={closeMenu}>Home</a></li>
          <li><a href="#menu" className="nav-link" onClick={closeMenu}>Artisan Menu</a></li>
          <li><a href="#about" className="nav-link" onClick={closeMenu}>Chef's Story</a></li>
          <li><a href="#reservations" className="nav-link" onClick={closeMenu}>Reservations</a></li>
          <li><a href="#reviews" className="nav-link" onClick={closeMenu}>Reviews</a></li>
          <li><a href="#contact" className="nav-link" onClick={closeMenu}>Hours & Location</a></li>
        </ul>

        <div className="nav-actions">
          <button 
            className="cart-toggle-btn" 
            onClick={onOpenCart} 
            aria-label="View Order Bag"
            title="Your Order Bag"
          >
            <span>🛍️</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>

          <button 
            className="btn btn-primary btn-sm" 
            onClick={() => {
              closeMenu();
              onOpenReservationModal();
            }}
          >
            Book Table
          </button>

          <button 
            className="hamburger-btn" 
            onClick={toggleMobileMenu} 
            aria-label="Toggle navigation menu"
          >
            <span style={{ transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></span>
            <span style={{ opacity: mobileMenuOpen ? 0 : 1 }}></span>
            <span style={{ transform: mobileMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }}></span>
          </button>
        </div>
      </div>
    </nav>
  );
}
