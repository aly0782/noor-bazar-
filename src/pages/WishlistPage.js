import React from 'react';
import StarRating from '../components/StarRating';

function WishlistPage({ wishlist, toggleWishlist, moveToCart, navigateToProduct }) {
  if (wishlist.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center animate-fadeIn">
        <svg className="w-24 h-24 text-gray-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        <h2 className="text-2xl font-display font-bold text-gray-800 mb-2">Your wishlist is empty</h2>
        <p className="text-gray-500 mb-6">Save items you love by clicking the heart icon on any product.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fadeIn">
      <h1 className="text-3xl font-display font-bold text-noor-dark mb-8">
        My Wishlist ({wishlist.length} items)
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map(item => (
          <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden product-card">
            <div className="relative cursor-pointer" onClick={() => navigateToProduct(item.id)}>
              <img src={item.image} alt={item.name} className="w-full h-56 object-cover" />
              <button
                onClick={(e) => { e.stopPropagation(); toggleWishlist(item); }}
                className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md heart-btn"
              >
                <svg className="w-5 h-5 text-noor-highlight" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 line-clamp-1">{item.name}</h3>
              <div className="flex items-center mt-1">
                <StarRating rating={item.rating} size="sm" />
                <span className="text-xs text-gray-500 ml-1">({item.reviewCount})</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-lg font-bold text-noor-dark">${item.price}</span>
                {item.originalPrice > item.price && (
                  <span className="text-sm text-gray-400 line-through">${item.originalPrice}</span>
                )}
              </div>
              <button
                onClick={() => moveToCart(item)}
                className="w-full mt-3 bg-noor-gold text-noor-dark py-2 rounded-lg text-sm font-semibold hover:bg-opacity-90 transition-colors"
              >
                Move to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WishlistPage;
