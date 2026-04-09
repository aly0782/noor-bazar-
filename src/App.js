import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import SellersPage from './pages/SellersPage';
import SellerProfilePage from './pages/SellerProfilePage';
import SellerDashboardPage from './pages/SellerDashboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserDashboardPage from './pages/UserDashboardPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedSellerId, setSelectedSellerId] = useState(null);
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('noor-cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('noor-wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('noor-user');
    return saved ? JSON.parse(saved) : null;
  });
  const [sellerMode, setSellerMode] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    localStorage.setItem('noor-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('noor-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('noor-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('noor-user');
    }
  }, [user]);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    showNotification(`${product.name} added to cart!`);
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        showNotification(`${product.name} removed from wishlist`);
        return prev.filter(item => item.id !== product.id);
      }
      showNotification(`${product.name} added to wishlist!`);
      return [...prev, product];
    });
  };

  const moveToCart = (product) => {
    addToCart(product);
    setWishlist(prev => prev.filter(item => item.id !== product.id));
  };

  const isInWishlist = (productId) => wishlist.some(item => item.id === productId);

  const navigateToProduct = (productId) => {
    setSelectedProductId(productId);
    setCurrentPage('product');
    window.scrollTo(0, 0);
  };

  const navigateToSeller = (sellerId) => {
    setSelectedSellerId(sellerId);
    setCurrentPage('sellerProfile');
    window.scrollTo(0, 0);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    showNotification(`Welcome back, ${userData.name}!`);
    setCurrentPage('home');
  };

  const handleRegister = (userData) => {
    setUser(userData);
    showNotification(`Welcome to Noor, ${userData.name}!`);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setUser(null);
    setSellerMode(false);
    showNotification('Logged out successfully');
    setCurrentPage('home');
  };

  const handleCheckout = (orderData) => {
    setLastOrder({
      ...orderData,
      items: [...cart],
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      date: new Date().toISOString(),
      orderId: 'NOR-' + Date.now().toString(36).toUpperCase()
    });
    clearCart();
    console.log('[Email Service] Order confirmation email would be sent to:', user?.email || 'customer@example.com');
    console.log('[Email Service] Tracking update email scheduled');
    setCurrentPage('orderConfirmation');
  };

  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'product':
        return (
          <ProductPage
            productId={selectedProductId}
            addToCart={addToCart}
            toggleWishlist={toggleWishlist}
            isInWishlist={isInWishlist}
            navigateToSeller={navigateToSeller}
            navigateToProduct={navigateToProduct}
          />
        );
      case 'cart':
        return (
          <CartPage
            cart={cart}
            updateCartQuantity={updateCartQuantity}
            removeFromCart={removeFromCart}
            navigate={navigate}
          />
        );
      case 'wishlist':
        return (
          <WishlistPage
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
            moveToCart={moveToCart}
            navigateToProduct={navigateToProduct}
          />
        );
      case 'sellers':
        return (
          <SellersPage
            navigateToSeller={navigateToSeller}
          />
        );
      case 'sellerProfile':
        return (
          <SellerProfilePage
            sellerId={selectedSellerId}
            navigateToProduct={navigateToProduct}
          />
        );
      case 'sellerDashboard':
        return <SellerDashboardPage navigate={navigate} />;
      case 'login':
        return (
          <LoginPage
            onLogin={handleLogin}
            navigate={navigate}
          />
        );
      case 'register':
        return (
          <RegisterPage
            onRegister={handleRegister}
            navigate={navigate}
          />
        );
      case 'userDashboard':
        return (
          <UserDashboardPage
            user={user}
            navigate={navigate}
          />
        );
      case 'checkout':
        return (
          <CheckoutPage
            cart={cart}
            user={user}
            onCheckout={handleCheckout}
            navigate={navigate}
          />
        );
      case 'orderConfirmation':
        return (
          <OrderConfirmationPage
            order={lastOrder}
            navigate={navigate}
          />
        );
      case 'admin':
        return (
          <AdminDashboardPage
            navigate={navigate}
          />
        );
      default:
        return (
          <HomePage
            navigateToProduct={navigateToProduct}
            navigateToSeller={navigateToSeller}
            addToCart={addToCart}
            toggleWishlist={toggleWishlist}
            isInWishlist={isInWishlist}
          />
        );
    }
  };

  return (
    <div className="App min-h-screen bg-gray-50">
      <Header
        cart={cart}
        wishlistCount={wishlist.length}
        user={user}
        sellerMode={sellerMode}
        navigate={navigate}
        onLogout={handleLogout}
        setSellerMode={setSellerMode}
      />
      {notification && (
        <div className={`fixed top-20 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white font-medium transition-all duration-300 ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`}>
          {notification.message}
        </div>
      )}
      <main>{renderPage()}</main>
      <footer className="bg-noor-dark text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-display font-bold text-noor-gold mb-4">Noor</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your premier marketplace for sacred art and traditional textiles.
              Connecting artisans with admirers worldwide.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><button onClick={() => navigate('home')} className="hover:text-noor-gold transition-colors">Home</button></li>
              <li><button onClick={() => navigate('sellers')} className="hover:text-noor-gold transition-colors">Sellers</button></li>
              <li><button onClick={() => navigate('cart')} className="hover:text-noor-gold transition-colors">Cart</button></li>
              <li><button onClick={() => navigate('wishlist')} className="hover:text-noor-gold transition-colors">Wishlist</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Categories</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-noor-gold transition-colors cursor-pointer">Religious Art</li>
              <li className="hover:text-noor-gold transition-colors cursor-pointer">Fashion</li>
              <li className="hover:text-noor-gold transition-colors cursor-pointer">Home Decor</li>
              <li className="hover:text-noor-gold transition-colors cursor-pointer">Handloom</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>support@noormarket.com</li>
              <li>+1 (555) 123-4567</li>
              <li>Mon - Sat: 9AM - 6PM</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-500">
          &copy; 2024 Noor Marketplace. All rights reserved. Made with care.
        </div>
      </footer>
    </div>
  );
}

export default App;
