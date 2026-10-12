import React, { useState } from 'react';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onOpenCheckout
}) {
  const [tipPercent, setTipPercent] = useState(15);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = Math.round(subtotal * 0.0825 * 100) / 100;
  const tipAmount = Math.round(subtotal * (tipPercent / 100) * 100) / 100;
  const total = Math.round((subtotal + tax + tipAmount) * 100) / 100;

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '1.3rem' }}>🛍️</span>
            <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#fff' }}>Your Order Bag</h3>
          </div>
          <button className="cart-close-btn" onClick={onClose} aria-label="Close cart">✕</button>
        </div>

        <div className="cart-body">
          {cartItems.length === 0 ? (
            <div className="empty-cart-view">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🍽️</div>
              <h4 style={{ color: '#fff', marginBottom: '0.5rem' }}>Your bag is empty</h4>
              <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Discover our signature firewood Jollof, Banku & Tilapia, and heritage creations.
              </p>
              <button className="btn btn-outline btn-sm" onClick={onClose}>
                Browse Menu
              </button>
            </div>
          ) : (
            <div>
              {cartItems.map(item => (
                <div key={item.id} className="cart-item-row">
                  <div className="cart-item-info">
                    <h4>{item.name}</h4>
                    <div className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div className="cart-qty-ctrl">
                      <button className="qty-btn" onClick={() => onUpdateQty(item.id, item.quantity - 1)}>–</button>
                      <span style={{ fontSize: '0.88rem', fontWeight: 600, minWidth: '18px', textAlign: 'center' }}>
                        {item.quantity}
                      </span>
                      <button className="qty-btn" onClick={() => onUpdateQty(item.id, item.quantity + 1)}>+</button>
                    </div>

                    <button 
                      onClick={() => onRemoveItem(item.id)}
                      style={{ color: '#ef4444', fontSize: '0.9rem', opacity: 0.8 }}
                      title="Remove dish"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}

              {/* Tip Selection */}
              <div style={{ marginTop: '1.5rem', background: 'var(--bg-surface)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', fontSize: '0.88rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Hospitality Tip</span>
                  <span style={{ color: 'var(--gold-light)', fontWeight: 600 }}>${tipAmount.toFixed(2)} ({tipPercent}%)</span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {[10, 15, 20, 25].map(pct => (
                    <button
                      key={pct}
                      onClick={() => setTipPercent(pct)}
                      style={{
                        flex: 1,
                        padding: '0.35rem 0',
                        borderRadius: '6px',
                        background: tipPercent === pct ? 'var(--gold-primary)' : 'rgba(255,255,255,0.06)',
                        color: tipPercent === pct ? '#0d1017' : 'var(--text-secondary)',
                        fontWeight: 600,
                        fontSize: '0.82rem'
                      }}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-summary-line">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="cart-summary-line">
              <span>Estimated Tax (8.25%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="cart-summary-line">
              <span>Hospitality Gratuity</span>
              <span>${tipAmount.toFixed(2)}</span>
            </div>
            <div className="cart-summary-total">
              <span>Estimated Total</span>
              <span style={{ color: 'var(--gold-light)' }}>${total.toFixed(2)}</span>
            </div>

            <button 
              className="btn btn-primary" 
              style={{ width: '100%' }}
              onClick={() => {
                onClose();
                onOpenCheckout({ subtotal, tax, tip: tipAmount, total });
              }}
            >
              Proceed to Checkout (${total.toFixed(2)})
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
