import React from 'react';

export default function Highlights({ items, onAddToCart }) {
  // Select top 3 chef signatures
  const featured = items.filter(it => it.isChefSpecial).slice(0, 3);

  return (
    <section className="section-padding">
      <div className="container">
        <div className="text-center">
          <div className="section-badge">Chef's Curations</div>
          <h2 className="section-title">
            Signature <span>Creations</span>
          </h2>
          <p className="section-subtitle">
            Every dish is an intimate dialogue between ancestral roots and modern gastronomy, 
            crafted fresh daily with organic seasonal harvests.
          </p>
        </div>

        <div className="highlights-grid">
          {featured.map((item) => (
            <div key={item.id} className="highlight-card">
              <div className="card-media">
                <img src={item.image} alt={item.name} className="card-img" />
                <span className="card-badge-floating">Chef's Signature</span>
                <span className="card-price-tag">${item.price.toFixed(2)}</span>
              </div>
              <div className="card-body">
                <h3 className="card-title">{item.name}</h3>
                <p className="card-desc">{item.description}</p>
                <div className="card-footer">
                  <div className="card-rating">
                    <span>★</span> {item.rating} ({item.reviewsCount} reviews)
                  </div>
                  <button 
                    className="add-bag-btn" 
                    onClick={() => onAddToCart(item)}
                    title={`Add ${item.name} to order`}
                  >
                    <span>+ Add to Bag</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
