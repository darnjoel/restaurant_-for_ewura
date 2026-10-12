const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const ROOT_DIR = path.resolve(__dirname, '..');
const DATA_DIR = path.join(__dirname, 'data');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Helpers for data storage
function readJsonFile(filename, defaultVal = []) {
  const filePath = path.join(DATA_DIR, filename);
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(defaultVal, null, 2));
      return defaultVal;
    }
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading ${filename}:`, err);
    return defaultVal;
  }
}

function writeJsonFile(filename, data) {
  const filePath = path.join(DATA_DIR, filename);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error(`Error writing ${filename}:`, err);
    return false;
  }
}

// Initialize seed data files if needed
readJsonFile('reservations.json', []);
readJsonFile('orders.json', []);
readJsonFile('messages.json', []);
readJsonFile('reviews.json', [
  {
    id: 1,
    name: "Marcus Vance",
    role: "Food & Wine Critic",
    rating: 5,
    date: "October 2026",
    comment: "Annah's Kitchen is a masterclass in modern Ghanaian gastronomy. The firewood-smoked Jollof Rice with slow-braised goat and house-made black shito has depths of flavor that bring tears of joy. Absolutely transcendent.",
    avatar: "MV"
  },
  {
    id: 2,
    name: "Elena Rostova",
    role: "Verified Diner",
    rating: 5,
    date: "September 2026",
    comment: "The Banku and Charcoal-Grilled Tilapia with fresh green kpakpo shito is extraordinary! Paired with the artisanal Sobolo cocktail, it's easily the most authentic and memorable dining experience.",
    avatar: "ER"
  },
  {
    id: 3,
    name: "Dr. David & Sarah Chen",
    role: "Anniversary Guests",
    rating: 5,
    date: "October 2026",
    comment: "We celebrated our 10th anniversary at the Chef's Counter. Chef Annah presented her Waakye Royal Platter and Ashanti Chocolate Fondant. Exceptional Ghanaian warmth, storytelling, and hospitality.",
    avatar: "DC"
  }
]);

// MIME types dictionary for static assets
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.jsx': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      if (body.length > 1e6) { // 1MB limit
        req.destroy();
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        resolve({});
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(payload));
}

const server = http.createServer(async (req, res) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // API Endpoints
  if (pathname.startsWith('/api/')) {
    // Health check
    if (pathname === '/api/health' && req.method === 'GET') {
      return sendJson(res, 200, {
        status: 'ok',
        service: "Annah's Kitchen API Server",
        timestamp: new Date().toISOString()
      });
    }

    // Reservations
    if (pathname === '/api/reservations') {
      if (req.method === 'GET') {
        const reservations = readJsonFile('reservations.json', []);
        return sendJson(res, 200, { success: true, count: reservations.length, reservations });
      }

      if (req.method === 'POST') {
        const body = await parseBody(req);
        const { name, email, phone, guests, date, time, seating, specialRequests } = body;

        if (!name || !email || !date || !time) {
          return sendJson(res, 400, {
            success: false,
            message: 'Name, email, date, and dining time are required.'
          });
        }

        const reservations = readJsonFile('reservations.json', []);
        const reservationId = 'AK-RES-' + Math.floor(1000 + Math.random() * 9000);
        const newReservation = {
          id: reservationId,
          name: name.trim(),
          email: email.trim(),
          phone: (phone || '').trim(),
          guests: parseInt(guests, 10) || 2,
          date,
          time,
          seating: seating || 'Indoor Dining Room',
          specialRequests: (specialRequests || '').trim(),
          status: 'Confirmed',
          createdAt: new Date().toISOString()
        };

        reservations.unshift(newReservation);
        writeJsonFile('reservations.json', reservations);

        return sendJson(res, 201, {
          success: true,
          message: `Reservation confirmed for ${newReservation.name}! Reference code: ${reservationId}`,
          reservation: newReservation
        });
      }
    }

    // Orders (Takeout / Delivery)
    if (pathname === '/api/orders') {
      if (req.method === 'GET') {
        const orders = readJsonFile('orders.json', []);
        return sendJson(res, 200, { success: true, count: orders.length, orders });
      }

      if (req.method === 'POST') {
        const body = await parseBody(req);
        const { items, customer, deliveryType, notes, tip = 0 } = body;

        if (!items || !Array.isArray(items) || items.length === 0) {
          return sendJson(res, 400, { success: false, message: 'Cart items cannot be empty.' });
        }
        if (!customer || !customer.name || !customer.phone) {
          return sendJson(res, 400, { success: false, message: 'Customer name and phone are required.' });
        }

        const subtotal = items.reduce((acc, it) => acc + (Number(it.price) * Number(it.quantity || 1)), 0);
        const tax = Math.round(subtotal * 0.0825 * 100) / 100;
        const total = Math.round((subtotal + tax + Number(tip)) * 100) / 100;

        const orderId = 'AK-ORD-' + Math.floor(10000 + Math.random() * 90000);
        const newOrder = {
          id: orderId,
          customer,
          deliveryType: deliveryType || 'Pickup',
          items,
          notes: notes || '',
          subtotal,
          tax,
          tip: Number(tip),
          total,
          status: 'Confirmed & Preparing',
          estimatedMinutes: 25,
          createdAt: new Date().toISOString()
        };

        const orders = readJsonFile('orders.json', []);
        orders.unshift(newOrder);
        writeJsonFile('orders.json', orders);

        return sendJson(res, 201, {
          success: true,
          message: `Order #${orderId} received! We are crafting your meal fresh.`,
          order: newOrder
        });
      }
    }

    // Contact messages
    if (pathname === '/api/contact' && req.method === 'POST') {
      const body = await parseBody(req);
      const { name, email, subject, message } = body;

      if (!name || !email || !message) {
        return sendJson(res, 400, { success: false, message: 'Name, email and message are required.' });
      }

      const messages = readJsonFile('messages.json', []);
      const newMsg = {
        id: 'MSG-' + Date.now(),
        name,
        email,
        subject: subject || 'General Inquiry',
        message,
        createdAt: new Date().toISOString()
      };
      messages.unshift(newMsg);
      writeJsonFile('messages.json', messages);

      return sendJson(res, 201, {
        success: true,
        message: 'Thank you for contacting Annah’s Kitchen. Our hospitality team will reply shortly.'
      });
    }

    // Reviews
    if (pathname === '/api/reviews') {
      if (req.method === 'GET') {
        const reviews = readJsonFile('reviews.json', []);
        return sendJson(res, 200, { success: true, reviews });
      }
      if (req.method === 'POST') {
        const body = await parseBody(req);
        const { name, rating, comment, role = 'Verified Diner' } = body;

        if (!name || !comment || !rating) {
          return sendJson(res, 400, { success: false, message: 'Name, rating, and feedback are required.' });
        }

        const reviews = readJsonFile('reviews.json', []);
        const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'AK';
        const newRev = {
          id: Date.now(),
          name,
          role,
          rating: Math.min(5, Math.max(1, parseInt(rating, 10))),
          comment,
          avatar: initials,
          date: 'Just now'
        };
        reviews.unshift(newRev);
        writeJsonFile('reviews.json', reviews);

        return sendJson(res, 201, {
          success: true,
          message: 'Thank you for sharing your experience at Annah’s Kitchen!',
          review: newRev
        });
      }
    }

    // Unknown API
    return sendJson(res, 404, { success: false, message: 'API route not found' });
  }

  // Static File Serving
  let relativeFilePath = pathname === '/' ? 'index.html' : pathname;
  // Prevent directory traversal
  relativeFilePath = path.normalize(relativeFilePath).replace(/^(\.\.[\/\\])+/, '');

  let fullPath = path.join(ROOT_DIR, relativeFilePath);

  // If path doesn't exist, check inside public/ or fallback to index.html
  if (!fs.existsSync(fullPath)) {
    const publicPath = path.join(ROOT_DIR, 'public', relativeFilePath);
    if (fs.existsSync(publicPath)) {
      fullPath = publicPath;
    } else {
      fullPath = path.join(ROOT_DIR, 'index.html');
    }
  }

  // Check if directory
  if (fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory()) {
    fullPath = path.join(fullPath, 'index.html');
  }

  const ext = path.extname(fullPath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(fullPath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    } else {
      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache'
      });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(` ✨ Annah's Kitchen Server Running!`);
  console.log(` 🌐 Local Web App URL: http://localhost:${PORT}`);
  console.log(` 📡 REST API Base:     http://localhost:${PORT}/api`);
  console.log(`====================================================`);
});
