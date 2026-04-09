import React, { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import SellerCard from '../components/SellerCard';
import products from '../data/products';
import sellers from '../data/sellers';

const testimonials = [
  {
    id: 1,
    name: "Salim A.",
    location: "London, UK",
    rating: 5,
    text: "Ordered the Imam photo frame for my parent's home. Arrived perfectly wrapped with such care. The gold detailing is exquisite. Will definitely order again for our Jamatherana fundraiser gifts.",
  },
  {
    id: 2,
    name: "Fatima K.",
    location: "Toronto, Canada",
    rating: 5,
    text: "The tasbi collection is absolutely beautiful. Purchased a set for Chandrat and everyone at the Jamatkhana was asking where I got them. Truly sacred craftsmanship.",
  },
  {
    id: 3,
    name: "Nadia R.",
    location: "Nairobi, Kenya",
    rating: 5,
    text: "Beautiful mijalis outfit arrived just in time for our community gathering. The quality of the fabric and embroidery exceeded all expectations. Ya Ali Madad!",
  },
  {
    id: 4,
    name: "Amir H.",
    location: "Mumbai, India",
    rating: 5,
    text: "The sacred keepsake box I ordered for niyaz items is stunning. Perfect craftsmanship that honors our Ismaili heritage. Shipping was fast even to India.",
  },
  {
    id: 5,
    name: "Yasmin B.",
    location: "Vancouver, Canada",
    rating: 5,
    text: "Purchased the Mijalis kit for our family and it's been such a blessing. Every piece reflects devotion and care. Noor Bazaar truly understands our community.",
  },
  {
    id: 6,
    name: "Ruksana M.",
    location: "Karachi, Pakistan",
    rating: 5,
    text: "The Hazrat Imam calligraphy frame is now the centerpiece of our prayer room. The artisan's devotion is visible in every stroke. Truly a sacred treasure.",
  },
];

function HomePage({ navigateToProduct, navigateToSeller, addToCart, toggleWishlist, isInWishlist }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchTerm) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== 'all') {
      result = result.filter(p => p.category === categoryFilter);
    }

    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

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
    <div className="bg-noor-dark">
      {/* Hero Section */}
      <section className="relative overflow-hidden islamic-pattern">
        <div className="absolute inset-0 bg-gradient-to-b from-noor-dark via-noor-dark-2/80 to-noor-dark" />
        <div className="relative max-w-4xl mx-auto px-4 py-24 md:py-36 text-center">
          {/* Gold Star */}
          <div className="text-noor-gold text-3xl mb-6 tracking-widest">&#10022;</div>

          {/* Sacred Collections subtitle */}
          <p className="text-noor-gold font-display italic text-lg md:text-xl mb-4 tracking-wide">
            Sacred Collections
          </p>

          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-noor-cream mb-6 leading-tight">
            Where Faith Meets<br />
            <span className="gradient-text">Artful Devotion</span>
          </h1>

          {/* Gold divider */}
          <div className="gold-divider w-24 mx-auto mb-6" />

          {/* Description */}
          <p className="text-noor-cream/70 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed tracking-wide">
            Curated Ismaili gifts, tasbi, imamana artwork, mijalis collections,
            and sacred keepsakes — crafted with love, shipped with care across the globe.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setCategoryFilter('all')}
              className="bg-noor-gold text-noor-dark px-8 py-3 text-sm font-semibold tracking-widest-xl uppercase hover:bg-noor-gold-light transition-colors"
            >
              Explore Collections
            </button>
            <button
              onClick={() => setSortBy('newest')}
              className="border border-noor-gold text-noor-gold px-8 py-3 text-sm font-semibold tracking-widest-xl uppercase hover:bg-noor-gold hover:text-noor-dark transition-colors"
            >
              New Arrivals
            </button>
          </div>
        </div>

        {/* Decorative corner elements */}
        <div className="absolute top-0 left-0 w-32 h-32 border-t border-l border-noor-gold/10" />
        <div className="absolute bottom-0 right-0 w-32 h-32 border-b border-r border-noor-gold/10" />
      </section>

      {/* Trusted Artisans */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <p className="text-noor-gold text-xs tracking-widest-2xl uppercase mb-2">Our Artisans</p>
          <h2 className="text-3xl font-display font-bold text-noor-cream">Trusted by the Community</h2>
          <div className="gold-divider w-16 mx-auto mt-4" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sellers.map(seller => (
            <SellerCard key={seller.id} seller={seller} onNavigate={navigateToSeller} />
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="text-center mb-8">
          <p className="text-noor-gold text-xs tracking-widest-2xl uppercase mb-2">Shop</p>
          <h2 className="text-3xl font-display font-bold text-noor-cream">Our Collection</h2>
          <div className="gold-divider w-16 mx-auto mt-4" />
        </div>

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
            <svg className="w-16 h-16 text-noor-dark-3 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-noor-cream/50 text-lg">No products found matching your criteria</p>
            <button
              onClick={() => { setSearchTerm(''); setCategoryFilter('all'); setPriceRange([0, 500]); }}
              className="mt-4 text-noor-gold font-medium hover:underline tracking-wide"
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

      {/* Testimonials Section */}
      <section className="bg-noor-dark-2 py-16 border-t border-b border-noor-dark-3">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-noor-gold text-xs tracking-widest-2xl uppercase mb-2">Testimonials</p>
            <h2 className="text-3xl font-display font-bold text-noor-cream">Voices from Our Community</h2>
            <div className="gold-divider w-16 mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="bg-noor-dark border border-noor-dark-3 rounded-lg p-6 hover:border-noor-gold/30 transition-colors">
                {/* Stars */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-noor-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                {/* Quote */}
                <p className="font-display text-noor-cream/80 text-sm leading-relaxed mb-5 italic">
                  "{testimonial.text}"
                </p>
                {/* Author */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-noor-gold font-medium text-sm tracking-wide">
                      {testimonial.name}
                    </p>
                    <p className="text-noor-cream/40 text-xs tracking-wide">
                      {testimonial.location}
                    </p>
                  </div>
                  <span className="text-noor-gold text-lg">&#10022;</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { iconClass: 'fas fa-truck', title: 'Global Shipping', desc: 'Worldwide to all Ismaili communities' },
              { iconClass: 'fas fa-lock', title: 'Secure Payment', desc: 'Encrypted & trusted checkout' },
              { iconClass: 'fas fa-undo', title: 'Easy Returns', desc: '30-day return policy' },
              { iconClass: 'fas fa-star', title: 'Sacred Quality', desc: 'Crafted with devotion' },
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 border border-noor-gold/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className={`${feature.iconClass} text-noor-gold`}></i>
                </div>
                <h3 className="font-display font-semibold text-noor-cream mb-1 text-sm tracking-wide">{feature.title}</h3>
                <p className="text-xs text-noor-cream/50 tracking-wide">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
