import React from 'react';
import StarRating from './StarRating';

function ProductCard({ product, onNavigate, onAddToCart, onToggleWishlist, isInWishlist, viewMode = 'grid' }) {
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  if (viewMode === 'list') {
    return (
      <div className="product-card bg-white rounded-xl shadow-md overflow-hidden flex animate-fadeIn">
        <div className="relative w-48 h-48 flex-shrink-0 cursor-pointer" onClick={() => onNavigate(product.id)}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {discount > 0 && (
            <span className="absolute top-2 left-2 bg-noor-highlight text-white text-xs px-2 py-1 rounded-full font-semibold">
              -{discount}%
            </span>
          )}
        </div>
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-lg text-gray-800 cursor-pointer hover:text-noor-gold transition-colors" onClick={() => onNavigate(product.id)}>
              {product.name}
            </h3>
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>
            <div className="flex items-center mt-2">
              <StarRating rating={product.rating} />
              <span className="text-sm text-gray-500 ml-2">({product.reviewCount})</span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-3">
            <div>
              <span className="text-xl font-bold text-noor-dark">${product.price}</span>
              {product.originalPrice > product.price && (
                <span className="text-sm text-gray-400 line-through ml-2">${product.originalPrice}</span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onToggleWishlist(product)}
                className="heart-btn p-2 rounded-full hover:bg-gray-100"
              >
                <svg className="w-5 h-5" fill={isInWishlist ? '#e94560' : 'none'} stroke={isInWishlist ? '#e94560' : 'currentColor'} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              <button
                onClick={() => onAddToCart(product)}
                className="bg-noor-gold text-noor-dark px-4 py-2 rounded-lg text-sm font-semibold hover:bg-opacity-90 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-card bg-white rounded-xl shadow-md overflow-hidden animate-fadeIn">
      <div className="relative cursor-pointer" onClick={() => onNavigate(product.id)}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover"
        />
        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-noor-highlight text-white text-xs px-2 py-1 rounded-full font-semibold">
            -{discount}%
          </span>
        )}
        {product.tags?.includes('bestseller') && (
          <span className="absolute top-3 right-3 bg-noor-gold text-noor-dark text-xs px-2 py-1 rounded-full font-semibold">
            Bestseller
          </span>
        )}
      </div>
      <div className="p-4">
        <h3
          className="font-semibold text-gray-800 cursor-pointer hover:text-noor-gold transition-colors line-clamp-1"
          onClick={() => onNavigate(product.id)}
        >
          {product.name}
        </h3>
        <div className="flex items-center mt-1">
          <StarRating rating={product.rating} size="sm" />
          <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div>
            <span className="text-lg font-bold text-noor-dark">${product.price}</span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-gray-400 line-through ml-1">${product.originalPrice}</span>
            )}
          </div>
          <button
            onClick={() => onToggleWishlist(product)}
            className="heart-btn p-1.5 rounded-full hover:bg-gray-100"
          >
            <svg className="w-5 h-5" fill={isInWishlist ? '#e94560' : 'none'} stroke={isInWishlist ? '#e94560' : 'currentColor'} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
        <button
          onClick={() => onAddToCart(product)}
          className="w-full mt-3 bg-noor-dark text-white py-2 rounded-lg text-sm font-medium hover:bg-noor-accent transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
