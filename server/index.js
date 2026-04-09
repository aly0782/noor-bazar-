const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ============ MOCK DATABASE ============
const products = [
  {
    id: 1,
    name: "Hazrat Imam Golden Frame - Large",
    description: "Exquisite hand-crafted golden frame featuring the sacred Hazrat Imam mosque.",
    price: 149.99,
    originalPrice: 199.99,
    image: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=600",
    category: "Religious Art",
    rating: 4.9,
    reviewCount: 412,
    stock: 15,
    sellerId: 1
  },
  {
    id: 2,
    name: "Hazrat Imam Silver Calligraphy Frame",
    description: "Beautiful silver-finished frame with Arabic calligraphy.",
    price: 89.99,
    originalPrice: 129.99,
    image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=600",
    category: "Religious Art",
    rating: 4.8,
    reviewCount: 287,
    stock: 22,
    sellerId: 1
  },
  {
    id: 3,
    name: "Hazrat Imam Miniature Desktop Frame",
    description: "Compact and elegant desktop frame showcasing the Hazrat Imam mosque.",
    price: 45.99,
    originalPrice: 59.99,
    image: "https://images.unsplash.com/photo-1590076215667-875c2d3faf29?w=600",
    category: "Religious Art",
    rating: 4.9,
    reviewCount: 356,
    stock: 40,
    sellerId: 1
  },
  {
    id: 4,
    name: "Pure White Banarasi Silk Saree",
    description: "Luxurious pure white Banarasi silk saree with intricate silver zari work.",
    price: 299.99,
    originalPrice: 449.99,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600",
    category: "Fashion",
    rating: 5.0,
    reviewCount: 523,
    stock: 8,
    sellerId: 2
  },
  {
    id: 5,
    name: "Elegant White Chiffon Saree",
    description: "Graceful white chiffon saree with delicate pearl embroidery.",
    price: 129.99,
    originalPrice: 179.99,
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600",
    category: "Fashion",
    rating: 4.8,
    reviewCount: 198,
    stock: 18,
    sellerId: 2
  },
  {
    id: 6,
    name: "White Cotton Handloom Saree",
    description: "Traditional white cotton handloom saree with gold temple border.",
    price: 79.99,
    originalPrice: 99.99,
    image: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600",
    category: "Fashion",
    rating: 4.9,
    reviewCount: 445,
    stock: 30,
    sellerId: 2
  }
];

const sellers = [
  {
    id: 1,
    name: "TASBI Heritage",
    description: "Premium handcrafted Islamic art and frames.",
    location: "Tashkent, Uzbekistan",
    rating: 4.9,
    totalSales: 2847,
    verified: true
  },
  {
    id: 2,
    name: "Elegance Textiles",
    description: "Finest handwoven sarees from master weavers of India.",
    location: "Varanasi, India",
    rating: 5.0,
    totalSales: 4156,
    verified: true
  }
];

const orders = [];
const users = [];

// ============ ROUTES ============

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Noor Marketplace API is running' });
});

// GET all products
app.get('/api/products', (req, res) => {
  const { category, minPrice, maxPrice, sort } = req.query;
  let result = [...products];

  if (category) result = result.filter(p => p.category === category);
  if (minPrice) result = result.filter(p => p.price >= parseFloat(minPrice));
  if (maxPrice) result = result.filter(p => p.price <= parseFloat(maxPrice));

  if (sort === 'priceLow') result.sort((a, b) => a.price - b.price);
  if (sort === 'priceHigh') result.sort((a, b) => b.price - a.price);
  if (sort === 'rating') result.sort((a, b) => b.rating - a.rating);

  res.json({ success: true, count: result.length, data: result });
});

// GET single product
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  res.json({ success: true, data: product });
});

// GET all sellers
app.get('/api/sellers', (req, res) => {
  res.json({ success: true, count: sellers.length, data: sellers });
});

// GET single seller
app.get('/api/sellers/:id', (req, res) => {
  const seller = sellers.find(s => s.id === parseInt(req.params.id));
  if (!seller) {
    return res.status(404).json({ success: false, message: 'Seller not found' });
  }
  const sellerProducts = products.filter(p => p.sellerId === seller.id);
  res.json({ success: true, data: { ...seller, products: sellerProducts } });
});

// POST create order
app.post('/api/orders', (req, res) => {
  const { items, customerEmail, customerName, shippingAddress, paymentMethod } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ success: false, message: 'Order must contain at least one item' });
  }

  const total = items.reduce((sum, item) => {
    const product = products.find(p => p.id === item.productId);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  const order = {
    id: 'NOR-' + Date.now().toString(36).toUpperCase(),
    items,
    total,
    customerEmail,
    customerName,
    shippingAddress,
    paymentMethod,
    status: 'Processing',
    createdAt: new Date().toISOString()
  };

  orders.push(order);
  console.log(`[Email Service] Order confirmation would be sent to: ${customerEmail}`);
  console.log(`[Email Service] Tracking update scheduled for order: ${order.id}`);

  res.status(201).json({ success: true, data: order });
});

// GET order by ID
app.get('/api/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }
  res.json({ success: true, data: order });
});

// POST register user
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  if (users.find(u => u.email === email)) {
    return res.status(400).json({ success: false, message: 'Email already registered' });
  }

  const user = {
    id: users.length + 1,
    name,
    email,
    password, // In production: hash with bcrypt
    role: 'user',
    createdAt: new Date().toISOString()
  };

  users.push(user);
  console.log(`[Email Service] Verification email would be sent to: ${email}`);

  const { password: _, ...userWithoutPassword } = user;
  res.status(201).json({
    success: true,
    data: userWithoutPassword,
    token: 'demo-jwt-token-' + user.id // In production: sign with jsonwebtoken
  });
});

// POST login user
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  const { password: _, ...userWithoutPassword } = user;
  res.json({
    success: true,
    data: userWithoutPassword,
    token: 'demo-jwt-token-' + user.id
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n  Noor Marketplace API Server`);
  console.log(`  Running on: http://localhost:${PORT}`);
  console.log(`  Health check: http://localhost:${PORT}/api/health`);
  console.log(`\n  Available endpoints:`);
  console.log(`    GET    /api/products       - All products`);
  console.log(`    GET    /api/products/:id    - Single product`);
  console.log(`    GET    /api/sellers         - All sellers`);
  console.log(`    GET    /api/sellers/:id     - Single seller with products`);
  console.log(`    POST   /api/orders          - Create order`);
  console.log(`    GET    /api/orders/:id      - Get order`);
  console.log(`    POST   /api/auth/register   - Register user`);
  console.log(`    POST   /api/auth/login      - Login user`);
  console.log('');
});
