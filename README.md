# Noor Marketplace

A complete React marketplace for sacred Hazrat Imam frames and handwoven white sarees.

## Features

- **Home Page** - Hero section, top sellers carousel, product grid with search & filters
- **Product Pages** - Detailed views with images, specs, reviews, and related products
- **Shopping Cart** - Add/remove items, quantity controls, order summary
- **Wishlist** - Save favorites with heart icons, move to cart
- **Search & Filters** - Search by name, filter by category/price, sort, grid/list view
- **Product Reviews** - Star ratings, customer reviews with helpful buttons
- **Seller Profiles** - Ratings, sales counts, verification badges, product listings
- **Seller Dashboard** - Revenue stats, orders, inventory management, analytics
- **User Accounts** - Login/register, order history, addresses, payment methods
- **Checkout** - Multi-step form with shipping and payment
- **Admin Panel** - Products, sellers, orders management with analytics
- **Backend API** - Express.js REST API with all routes
- **MongoDB Schemas** - Product, Seller, Order, User models ready

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The app opens at http://localhost:3000

## Backend Server

```bash
cd server
npm install
npm start
```

API runs on http://localhost:5000

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/products | All products (supports ?category, ?sort, ?minPrice, ?maxPrice) |
| GET | /api/products/:id | Single product |
| GET | /api/sellers | All sellers |
| GET | /api/sellers/:id | Seller with products |
| POST | /api/orders | Create order |
| GET | /api/orders/:id | Get order |
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |

## Tech Stack

- **Frontend**: React 18, Tailwind CSS
- **Backend**: Express.js, Node.js
- **Database**: MongoDB with Mongoose (schemas included)
- **Auth**: JWT + bcrypt (ready to integrate)

## Deploy to Vercel

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repo
3. Set environment variables from `.env.local.example`
4. Deploy

## Project Structure

```
noor-bazar-/
├── public/
├── src/
│   ├── components/     # Header, ProductCard, StarRating, SearchBar, SellerCard
│   ├── data/           # Products, sellers, reviews data
│   ├── pages/          # All page components
│   ├── App.js          # Main app with routing & state
│   └── index.js        # Entry point
├── server/
│   ├── models/         # MongoDB schemas
│   ├── index.js        # Express server
│   └── .env.example    # Environment variables template
├── vercel.json         # Vercel deployment config
└── package.json
```

## License

MIT
