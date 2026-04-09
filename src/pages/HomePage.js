import React, { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import SellerCard from '../components/SellerCard';
import products from '../data/products';
import sellers from '../data/sellers';

function HomePage({ navigateToProduct, navigateToSeller, addToCart, toggleWishlist, isInWishlist }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchTerm) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter !== 'all') {
      result = result.filter(p => p.category === categoryFilter);
    }

    // Price range filter
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    switch (sortBy) {
      case 'priceLow':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'priceHigh':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
      default:
        result.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
        break;
    }

    return result;
  }, [searchTerm, categoryFilter, priceRange, sortBy]);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-noor-dark text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-noor-dark via-noor-purple to-noor-accent opacity-90" />
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
              Discover the <span className="gradient-text">Beauty</span> of Tradition
            </h1>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Explore our curated collection of sacred Hazrat Imam frames and exquisite handwoven white sarees.
              Each piece tells a story of devotion and craftsmanship.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setCategoryFilter('Religious Art')}
                className="bg-noor-gold text-noor-dark px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
              >
                Shop Imam Frames
              </button>
              <button
                onClick={() => setCategoryFilter('Fashion')}
                className="border-2 border-noor-gold text-noor-gold px-6 py-3 rounded-lg font-semibold hover:bg-noor-gold hover:text-noor-dark transition-colors"
              >
                Shop White Sarees
              </button>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-noor-gold opacity-5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-noor-gold opacity-5 rounded-full blur-3xl" />
      </section>

      {/* Top Sellers Carousel */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-display font-bold text-noor-dark">Top Sellers</h2>
          <button
            onClick={() => navigateToSeller && window.scrollTo(0, 0)}
            className="text-sm text-noor-gold font-medium hover:underline"
          >
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sellers.map(seller => (
            <SellerCard key={seller.id} seller={seller} onNavigate={navigateToSeller} />
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <h2 className="text-2xl font-display font-bold text-noor-dark mb-6">Our Collection</h2>

        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          categoryFilter={categoryFilter}
          onCategoryChange={setCategoryFilter}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
          sortBy={sortBy}
          onSortChange={setSortBy}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-gray-500 text-lg">No products found matching your criteria</p>
            <button
              onClick={() => { setSearchTerm(''); setCategoryFilter('all'); setPriceRange([0, 500]); }}
              className="mt-4 text-noor-gold font-medium hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className={viewMode === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
          }>
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onNavigate={navigateToProduct}
                onAddToCart={addToCart}
                onToggleWishlist={toggleWishlist}
                isInWishlist={isInWishlist(product.id)}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: '🚚', title: 'Free Shipping', desc: 'On orders over $100' },
              { icon: '🔒', title: 'Secure Payment', desc: 'SSL encrypted checkout' },
              { icon: '↩️', title: 'Easy Returns', desc: '30-day return policy' },
              { icon: '⭐', title: 'Premium Quality', desc: 'Handcrafted with care' },
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <span className="text-3xl mb-3 block">{feature.icon}</span>
                <h3 className="font-semibold text-gray-800 mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
