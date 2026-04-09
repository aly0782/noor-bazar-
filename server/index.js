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
  { id: 1, name: "Green Jade Tasbi - 99 Beads", description: "Beautiful green jade tasbi with silver tassel cap.", price: 45, originalPrice: 75, image: "https://images.unsplash.com/photo-1616423640778-28d1b53229bd?w=600&h=600&fit=crop", category: "Sacred Collections", rating: 4.9, reviewCount: 234, stock: 18, sellerId: 1 },
  { id: 2, name: "Blue Aquamarine Tasbi - 33 Beads", description: "Stunning blue aquamarine tasbi with 33 beads.", price: 38, originalPrice: 65, image: "https://images.unsplash.com/photo-1590076215667-875c2d3faf29?w=600&h=600&fit=crop", category: "Sacred Collections", rating: 4.8, reviewCount: 189, stock: 22, sellerId: 2 },
  { id: 3, name: "White Lace Mijalis Gown - Premium", description: "Exquisite white lace Mijalis dress for community gatherings.", price: 185, originalPrice: 320, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=600&fit=crop", category: "Mijalis Fashion", rating: 5.0, reviewCount: 156, stock: 12, sellerId: 2 },
  { id: 4, name: "Blue Bandani Lehenga - Gold Embroidered", description: "Stunning blue bandani lehenga with gold and silver sequin work.", price: 245, originalPrice: 420, image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=600&fit=crop", category: "Mijalis Fashion", rating: 4.9, reviewCount: 267, stock: 8, sellerId: 2 },
  { id: 5, name: "Teal Heritage Dress with Gold Trim", description: "Beautiful teal traditional dress with gold trim.", price: 165, originalPrice: 280, image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&h=600&fit=crop", category: "Mijalis Fashion", rating: 4.7, reviewCount: 198, stock: 15, sellerId: 2 },
  { id: 6, name: "Hazrat Imam Portrait Frame - Premium Black", description: "Beautifully framed portrait of Hazrat Imam.", price: 89, originalPrice: 150, image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=600&h=600&fit=crop", category: "Religious Art", rating: 5.0, reviewCount: 412, stock: 25, sellerId: 1 },
  { id: 7, name: "Niyaz Rose Water Bottle - Crystal Clear", description: "Elegant crystal bottle for blessed niyaz water.", price: 52, originalPrice: 89, image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&h=600&fit=crop", category: "Sacred Keepsakes", rating: 4.9, reviewCount: 298, stock: 30, sellerId: 1 },
  { id: 8, name: "Blue Bandani Saree - Gold & Silver Sequins", description: "Exquisite blue bandani saree with sequin embroidery.", price: 275, originalPrice: 480, image: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600&h=600&fit=crop", category: "Mijalis Fashion", rating: 4.9, reviewCount: 345, stock: 6, sellerId: 2 },
  { id: 9, name: "Beaded Gujarati Niyaz Bottle - Multicolor", description: "Hand-beaded Gujarati niyaz bottle with multicolor beadwork.", price: 78, originalPrice: 135, image: "https://images.unsplash.com/photo-1579187707643-35646d22b596?w=600&h=600&fit=crop", category: "Sacred Keepsakes", rating: 5.0, reviewCount: 267, stock: 14, sellerId: 1 }
];

const sellers = [
  {
    id: 1,
    name: "Hazrat Imam Heritage Artisans",
    description: "Devoted Ismaili artisans crafting sacred Hazrat Imam portraits and religious art for the global Ismaili community.",
    location: "Karachi, Pakistan",
    rating: 4.9,
    totalSales: 2847,
    verified: true
  },
  {
    id: 2,
    name: "Ismaili Sacred Collections",
    description: "Serving the global Ismaili community with traditional garments and community items.",
    location: "Mumbai, India",
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
