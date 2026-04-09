import React, { useState } from 'react';

function Header({ cart, wishlistCount, user, sellerMode, navigate, onLogout, setSellerMode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-noor-dark border-b border-noor-dark-3 text-noor-cream sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => navigate('home')}
            className="flex items-center space-x-1.5"
          >
            <span className="text-noor-gold text-lg">&#10022;</span>
            <span className="text-2xl font-display font-bold text-noor-cream tracking-wide">Noor</span>
            <span className="text-2xl font-display font-bold text-noor-gold tracking-wide">Bazaar</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => navigate('home')}
              className="text-xs font-medium tracking-widest-xl uppercase text-noor-cream hover:text-noor-gold transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => navigate('sellers')}
              className="text-xs font-medium tracking-widest-xl uppercase text-noor-cream hover:text-noor-gold transition-colors"
            >
              Artisans
            </button>
            <button
              onClick={() => navigate('wishlist')}
              className="relative text-xs font-medium tracking-widest-xl uppercase text-noor-cream hover:text-noor-gold transition-colors"
            >
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Saved
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-4 bg-noor-gold text-noor-dark text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {wishlistCount}
                  </span>
                )}
              </span>
            </button>
            <button
              onClick={() => navigate('cart')}
              className="relative text-xs font-medium tracking-widest-xl uppercase text-noor-cream hover:text-noor-gold transition-colors"
            >
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
                Cart
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-4 bg-noor-gold text-noor-dark text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </span>
            </button>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 border border-noor-dark-3 px-3 py-1.5 rounded hover:border-noor-gold transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-noor-gold flex items-center justify-center text-noor-dark font-bold text-xs">
                    {user.name.charAt(0)}
                  </div>
                  <span className="text-xs tracking-wide">{user.name}</span>
                  <svg className="w-3 h-3 text-noor-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-noor-dark-2 border border-noor-dark-3 rounded-lg shadow-xl py-2 text-noor-cream">
                    <button
                      onClick={() => { navigate('userDashboard'); setUserMenuOpen(false); }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-noor-dark-3 hover:text-noor-gold transition-colors"
                    >
                      My Dashboard
                    </button>
                    <button
                      onClick={() => { navigate('sellerDashboard'); setSellerMode(true); setUserMenuOpen(false); }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-noor-dark-3 hover:text-noor-gold transition-colors"
                    >
                      Seller Dashboard
                    </button>
                    {user.role === 'admin' && (
                      <button
                        onClick={() => { navigate('admin'); setUserMenuOpen(false); }}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-noor-dark-3 text-noor-gold font-medium"
                      >
                        Admin Panel
                      </button>
                    )}
                    <hr className="my-1 border-noor-dark-3" />
                    <button
                      onClick={() => { onLogout(); setUserMenuOpen(false); }}
                      className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-noor-dark-3"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate('login')}
                className="border border-noor-gold text-noor-gold px-5 py-1.5 text-xs font-medium tracking-widest-xl uppercase hover:bg-noor-gold hover:text-noor-dark transition-colors"
              >
                Sign In
              </button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <button onClick={() => navigate('cart')} className="relative text-noor-cream">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-noor-gold text-noor-dark text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-noor-cream">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-noor-dark-3 mt-2 pt-4 space-y-3">
            <button onClick={() => { navigate('home'); setMenuOpen(false); }} className="block w-full text-left py-2 text-sm tracking-wide text-noor-cream hover:text-noor-gold">Home</button>
            <button onClick={() => { navigate('sellers'); setMenuOpen(false); }} className="block w-full text-left py-2 text-sm tracking-wide text-noor-cream hover:text-noor-gold">Artisans</button>
            <button onClick={() => { navigate('wishlist'); setMenuOpen(false); }} className="block w-full text-left py-2 text-sm tracking-wide text-noor-cream hover:text-noor-gold">
              Saved {wishlistCount > 0 && `(${wishlistCount})`}
            </button>
            <button onClick={() => { navigate('cart'); setMenuOpen(false); }} className="block w-full text-left py-2 text-sm tracking-wide text-noor-cream hover:text-noor-gold">
              Cart {cartCount > 0 && `(${cartCount})`}
            </button>
            {user ? (
              <>
                <button onClick={() => { navigate('userDashboard'); setMenuOpen(false); }} className="block w-full text-left py-2 text-sm tracking-wide text-noor-cream hover:text-noor-gold">My Dashboard</button>
                <button onClick={() => { navigate('sellerDashboard'); setMenuOpen(false); }} className="block w-full text-left py-2 text-sm tracking-wide text-noor-cream hover:text-noor-gold">Seller Dashboard</button>
                <button onClick={() => { onLogout(); setMenuOpen(false); }} className="block w-full text-left py-2 text-sm text-red-400">Logout</button>
              </>
            ) : (
              <button onClick={() => { navigate('login'); setMenuOpen(false); }} className="block w-full text-left py-2 text-sm text-noor-gold font-medium tracking-wide">Sign In</button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
