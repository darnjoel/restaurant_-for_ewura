import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Highlights from './components/Highlights';
import AboutSection from './components/AboutSection';
import MenuSection from './components/MenuSection';
import ReservationSection from './components/ReservationSection';
import ReviewsSection from './components/ReviewsSection';
import ContactSection from './components/ContactSection';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import ReviewModal from './components/ReviewModal';
import Footer from './components/Footer';
import { MENU_ITEMS, INITIAL_REVIEWS } from './data/menuData';

export default function App() {
  const [menuItems, setMenuItems] = useState(MENU_ITEMS);
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutData, setCheckoutData] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Fetch live reviews from backend if available
  useEffect(() => {
    fetch('/api/reviews')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.reviews && data.reviews.length > 0) {
          setReviews(data.reviews);
        }
      })
      .catch(err => {
        // Fallback to initial seed
        console.log('Using initial reviews');
      });
  }, []);

  const showToast = (message) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const handleAddToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    showToast(`Added "${item.name}" to your order bag!`);
  };

  const handleUpdateQty = (itemId, qty) => {
    if (qty <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCart(prev => prev.map(i => i.id === itemId ? { ...i, quantity: qty } : i));
  };

  const handleRemoveItem = (itemId) => {
    setCart(prev => prev.filter(i => i.id !== itemId));
    showToast('Dish removed from bag.');
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app-root">
      {/* Toast Notification Container */}
      <div className="toast-container">
        {toasts.map(t => (
          <div key={t.id} className="toast">
            <span>{t.message}</span>
            <button 
              onClick={() => setToasts(prev => prev.filter(item => item.id !== t.id))}
              style={{ marginLeft: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <Navbar 
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservationModal={() => scrollToSection('reservations')}
      />

      <main>
        {/* Hero Section */}
        <Hero 
          onBookTableClick={() => scrollToSection('reservations')}
          onExploreMenuClick={() => scrollToSection('menu')}
        />

        {/* Signature Highlights */}
        <Highlights 
          items={menuItems} 
          onAddToCart={handleAddToCart}
        />

        {/* About Executive Chef Annah */}
        <AboutSection />

        {/* Full Artisan Menu with Filters */}
        <MenuSection 
          items={menuItems} 
          onAddToCart={handleAddToCart}
        />

        {/* Table Reservation System */}
        <ReservationSection 
          onShowToast={showToast}
        />

        {/* Guest Reviews */}
        <ReviewsSection 
          reviews={reviews}
          onOpenReviewModal={() => setIsReviewModalOpen(true)}
        />

        {/* Hours, Contact Form, FAQs */}
        <ContactSection 
          onShowToast={showToast}
        />
      </main>

      {/* Footer */}
      <Footer 
        onShowToast={showToast}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOpenCheckout={(totals) => setCheckoutData(totals)}
      />

      {/* Checkout Modal */}
      <CheckoutModal 
        isOpen={!!checkoutData}
        totals={checkoutData || {}}
        cartItems={cart}
        onClose={() => setCheckoutData(null)}
        onOrderSuccess={() => {
          handleClearCart();
          showToast('Order confirmed! Annah’s Kitchen is preparing your dishes.');
        }}
        onShowToast={showToast}
      />

      {/* Review Submission Modal */}
      <ReviewModal 
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onReviewAdded={(newRev) => setReviews(prev => [newRev, ...prev])}
        onShowToast={showToast}
      />
    </div>
  );
}
