# ✨ Annah's Kitchen - Responsive Gourmet Restaurant Website

A responsive restaurant web application created for **Annah's Kitchen** featuring **React 18** on the frontend, warm luxury aesthetics, and dual-backend support in **JavaScript (Node.js)** and **PHP**.

---

## 🍽️ Highlights & Features

### 🎨 Frontend Experience (React 18)
- **Aesthetic Design System**: Warm obsidian & amber-gold palette (`#0d1017`, `#f59e0b`, `#ea580c`), glassmorphic frosted cards, subtle glows, and editorial typography (*Playfair Display*, *Cinzel*, and *Plus Jakarta Sans*).
- **Responsive Mobile Navigation**: Sticky frosted glass navbar, animated hamburger drawer, live order bag counter badge, and quick table booking trigger.
- **Hero Sanctuary**: High-resolution cinematic culinary background, Michelin-guide badge, real-time stats (4.95★ rating, 15+ years craft, 100% organic sourcing).
- **Interactive Artisan Menu**:
  - Category filters (*All Dishes*, *Starters & Bites*, *Chef's Mains*, *Woodfire Grill*, *Artisan Desserts*, *Craft Elixirs*).
  - Real-time search query matching dish names, ingredients, and descriptions.
  - Dietary toggles: ⭐ Chef's Specials, 🌱 Vegetarian/Vegan, 🌾 Gluten-Free.
  - Allergen warnings, calorie estimations, and spicy level indicators (🌶️).
- **Interactive Order Bag & Slide-out Cart**:
  - Quantity controls (`+`, `–`) and item deletion.
  - Real-time calculation of subtotal, tax (8.25%), customizable hospitality tips (10%, 15%, 20%, 25%), and total.
  - Checkout modal with pickup or courier delivery selection.
- **Table Reservation System**:
  - Interactive booking with party size (1 to 10+ guests), calendar date picker, evening time slots, and seating ambiance (*Candlelit Dining Room*, *Garden Patio*, *Chef's Tasting Counter*, *Private Wine Alcove*).
  - Generates unique reservation reference code (e.g. `AK-RES-4351`).
- **Guest Testimonials & Review Modal**:
  - Real-time diner feedback with star ratings.
  - "Share Your Experience" modal submitting directly to backend.
- **Hours & Concierge**:
  - Live "Open Tonight" status indicator.
  - Working concierge contact form.
  - Interactive FAQ accordion (dress code, parking, Halal certification).

---

## ⚡ Dual Backend Architecture

### 1. JavaScript (Node.js) REST API & Server (`backend/server.js`)
- Zero external npm dependencies required! Native HTTP REST engine with JSON persistence.
- Handles static file serving and REST API endpoints:
  - `GET  /api/health` — Service health check
  - `GET  /api/menu` — Complete menu listing
  - `POST /api/reservations` — Book table & generate confirmation code
  - `GET  /api/reservations` — List reservations
  - `POST /api/orders` — Place takeaway/delivery orders
  - `GET  /api/orders` — List orders
  - `POST /api/reviews` — Submit guest reviews
  - `GET  /api/reviews` — Fetch guest reviews
  - `POST /api/contact` — Send hospitality inquiries

### 2. PHP REST API (`backend/api.php`)
- Standard PHP REST backend suitable for Apache, Nginx, XAMPP, or cPanel hosting.
- Identical JSON responses and actions:
  - `GET  /backend/api.php?action=health`
  - `POST /backend/api.php?action=reservations`
  - `POST /backend/api.php?action=orders`
  - `POST /backend/api.php?action=reviews`
  - `POST /backend/api.php?action=contact`

---

## 📂 Project Directory Structure

```text
annahs-kitchen/
├── backend/
│   ├── api.php                  # Complete PHP REST backend
│   ├── server.js                # Complete Node.js REST API & static server
│   └── data/                    # JSON database storage
│       ├── reservations.json
│       ├── orders.json
│       ├── reviews.json
│       └── messages.json
├── public/
│   └── images/                  # High-resolution restaurant assets
│       ├── hero.jpg             # Annah's Kitchen dining table spread
│       ├── chef-annah.jpg       # Executive Chef Annah portrait
│       └── signature-dessert.jpg# 24k Gold molten chocolate dome
├── src/
│   ├── App.jsx                  # Main React application component
│   ├── main.jsx                 # React DOM mount
│   ├── components/
│   │   ├── Navbar.jsx           # Responsive navigation & mobile drawer
│   │   ├── Hero.jsx             # Hero banner & statistics
│   │   ├── Highlights.jsx       # Chef's signature cards
│   │   ├── AboutSection.jsx     # Chef Annah heritage & story
│   │   ├── MenuSection.jsx      # Filterable menu & search
│   │   ├── ReservationSection.jsx# Table booking engine
│   │   ├── ReviewsSection.jsx   # Guest impressions
│   │   ├── ContactSection.jsx   # Operating hours, map, contact form, FAQs
│   │   ├── CartDrawer.jsx       # Slide-out order bag drawer
│   │   ├── CheckoutModal.jsx    # Checkout fulfillment dialog
│   │   ├── ReviewModal.jsx      # Guest review submission modal
│   │   └── Footer.jsx           # Footer & newsletter subscription
│   ├── data/
│   │   └── menuData.js          # Menu catalog & seed reviews
│   └── styles/
│       └── index.css            # Custom CSS luxury design system
├── index.html                   # Entry point with React 18 & live mounting
├── package.json                 # Project configuration
└── README.md                    # Documentation
```

---

## 🚀 Running the Project

### Option A: Using the Node.js Server (Recommended)
From the project folder, run:
```bash
node backend/server.js
```
Then open your browser to **`http://localhost:3000`**.

### Option B: Using PHP (XAMPP / Apache / Built-in PHP server)
From the project root:
```bash
php -S localhost:8000
```
Then visit **`http://localhost:8000`**.
