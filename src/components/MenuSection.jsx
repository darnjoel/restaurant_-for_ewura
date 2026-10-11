import React, { useState, useMemo } from 'react';
import { MENU_CATEGORIES } from '../data/menuData';

export default function MenuSection({ items, onAddToCart }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterChefSpecial, setFilterChefSpecial] = useState(false);
  const [filterVegetarian, setFilterVegetarian] = useState(false);
  const [filterGlutenFree, setFilterGlutenFree] = useState(false);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesTags = item.tags && item.tags.some(t => t.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesTags) {
          return false;
        }
      }
      // Dietary filters
      if (filterChefSpecial && !item.isChefSpecial) {
        return false;
      }
      if (filterVegetarian) {
        const isVeg = item.tags && item.tags.some(t => t.toLowerCase().includes('veg'));
        if (!isVeg) return false;
      }
      if (filterGlutenFree) {
        const isGF = item.tags && item.tags.some(t => t.toLowerCase().includes('gluten-free'));
        if (!isGF) return false;
      }

      return true;
    });
  }, [items, selectedCategory, searchQuery, filterChefSpecial, filterVegetarian, filterGlutenFree]);

  return (
    <section id="menu" className="section-padding">
      <div className="container">
        <div className="text-center">
          <div className="section-badge">Gastronomic Selection</div>
          <h2 className="section-title">
            The Artisan <span>Menu</span>
          </h2>
          <p className="section-subtitle">
            Seasonal ingredients thoughtfully curated by Chef Annah. 
            All dishes are prepared freshly to order over embers or in our hearth.
          </p>
        </div>

        <div className="menu-controls">
          {/* Search bar */}
          <div className="menu-search-bar">
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              className="menu-search-input" 
              placeholder="Search dishes, spices, ingredients..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Tabs */}
          <div className="category-tabs">
            {MENU_CATEGORIES.map(cat => (
              <button 
                key={cat.id} 
                className={`category-tab ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Dietary Filters */}
          <div className="dietary-filters">
            <label className="dietary-toggle">
              <input 
                type="checkbox" 
                checked={filterChefSpecial}
                onChange={(e) => setFilterChefSpecial(e.target.checked)}
              />
              <span>⭐ Chef's Specials Only</span>
            </label>

            <label className="dietary-toggle">
              <input 
                type="checkbox" 
                checked={filterVegetarian}
                onChange={(e) => setFilterVegetarian(e.target.checked)}
              />
              <span>🌱 Vegetarian / Vegan</span>
            </label>

            <label className="dietary-toggle">
              <input 
                type="checkbox" 
                checked={filterGlutenFree}
                onChange={(e) => setFilterGlutenFree(e.target.checked)}
              />
              <span>🌾 Gluten-Free</span>
            </label>
          </div>
        </div>

        {/* Results Info */}
        <div style={{ marginBottom: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Showing {filteredItems.length} curated dish{filteredItems.length === 1 ? '' : 'es'}
        </div>

        {/* Menu Cards Grid */}
        {filteredItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
            <p style={{ fontSize: '1.3rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>No culinary creations match your current filters.</p>
            <button 
              className="btn btn-outline btn-sm"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setFilterChefSpecial(false);
                setFilterVegetarian(false);
                setFilterGlutenFree(false);
              }}
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="menu-grid">
            {filteredItems.map(item => (
              <div key={item.id} className="menu-card">
                <div className="menu-card-header">
                  <h3 className="menu-item-name">{item.name}</h3>
                  <div className="menu-item-price">${item.price.toFixed(2)}</div>
                </div>

                <div className="menu-item-tags">
                  {item.isChefSpecial && <span className="tag-pill chef">★ Chef's Choice</span>}
                  {item.tags && item.tags.map((tag, idx) => (
                    <span key={idx} className="tag-pill">{tag}</span>
                  ))}
                  {item.spicyLevel > 0 && (
                    <span className="tag-pill" title={`Spicy Level: ${item.spicyLevel}`}>
                      {'🌶️'.repeat(item.spicyLevel)}
                    </span>
                  )}
                </div>

                <p className="menu-item-desc">{item.description}</p>

                <div className="menu-card-bottom">
                  <div className="menu-meta-info">
                    <span>{item.calories}</span>
                    {item.allergens && item.allergens !== 'None' && (
                      <span style={{ marginLeft: '8px' }}>• Cont: {item.allergens}</span>
                    )}
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
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
