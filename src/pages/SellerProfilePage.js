import React from 'react';
import StarRating from '../components/StarRating';
import products from '../data/products';
import sellers from '../data/sellers';

function SellerProfilePage({ sellerId, navigateToProduct }) {
  const seller = sellers.find(s => s.id === sellerId);
  if (!seller) return <div className="text-center py-20">Seller not found</div>;

  const sellerProducts = products.filter(p => seller.productIds.includes(p.id));

  return (
    <div className="animate-fadeIn">
      {/* Cover Image */}
      <div className="h-48 md:h-64 bg-cover bg-center relative" style={{ backgroundImage: `url(${seller.coverImage})` }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-16 relative">
        {/* Seller Info */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <img
              src={seller.avatar}
              alt={seller.name}
              className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover -mt-12 md:-mt-16"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-1">
                <h1 className="text-2xl font-display font-bold text-noor-dark">{seller.name}</h1>
                {seller.verified && (
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Verified Seller
                  </span>
                )}
              </div>
              <p className="text-gray-500 text-sm">{seller.location}</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center">
                  <StarRating rating={seller.rating} size="md" showValue />
                </div>
                <span className="text-sm text-gray-500">{seller.totalSales.toLocaleString()} sales</span>
                <span className="text-sm text-gray-500">Joined {new Date(seller.joinedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
              </div>
            </div>
          </div>
          <p className="text-gray-600 mt-4 leading-relaxed">{seller.description}</p>

          {/* Seller Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-sm text-gray-500">Response Time</p>
              <p className="font-semibold text-gray-800">{seller.responseTime}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-sm text-gray-500">Products</p>
              <p className="font-semibold text-gray-800">{sellerProducts.length}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-sm text-gray-500">Shipping</p>
              <p className="font-semibold text-gray-800 text-xs">{seller.shippingPolicy}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-sm text-gray-500">Returns</p>
              <p className="font-semibold text-gray-800 text-xs">{seller.returnPolicy}</p>
            </div>
          </div>

          {/* Specialties */}
          <div className="flex flex-wrap gap-2 mt-4">
            {seller.specialties.map((spec, i) => (
              <span key={i} className="bg-noor-gold/10 text-noor-dark px-3 py-1 rounded-full text-sm font-medium">
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Seller Products */}
        <h2 className="text-2xl font-display font-bold text-noor-dark mb-6">Products by {seller.name}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
          {sellerProducts.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer product-card"
              onClick={() => navigateToProduct(product.id)}
            >
              <img src={product.image} alt={product.name} className="w-full h-56 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 line-clamp-1">{product.name}</h3>
                <div className="flex items-center mt-1">
                  <StarRating rating={product.rating} size="sm" />
                  <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-lg font-bold text-noor-dark">${product.price}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SellerProfilePage;
