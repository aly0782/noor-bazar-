import React from 'react';
import StarRating from './StarRating';

function SellerCard({ seller, onNavigate }) {
  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer product-card animate-fadeIn"
      onClick={() => onNavigate(seller.id)}
    >
      <div className="h-32 bg-cover bg-center" style={{ backgroundImage: `url(${seller.coverImage})` }}>
        <div className="h-full bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      <div className="p-4 -mt-10 relative">
        <div className="flex items-end space-x-3 mb-3">
          <img
            src={seller.avatar}
            alt={seller.name}
            className="w-16 h-16 rounded-full border-3 border-white shadow-md object-cover"
          />
          <div>
            <div className="flex items-center space-x-1">
              <h3 className="font-semibold text-gray-800">{seller.name}</h3>
              {seller.verified && (
                <span className="bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full flex items-center">
                  <svg className="w-3 h-3 mr-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Verified
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500">{seller.location}</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{seller.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <StarRating rating={seller.rating} size="sm" />
            <span className="text-sm text-gray-500 ml-1">{seller.rating}</span>
          </div>
          <span className="text-sm text-gray-500">{seller.totalSales.toLocaleString()} sales</span>
        </div>
        <div className="flex flex-wrap gap-1 mt-3">
          {seller.specialties.slice(0, 3).map((specialty, index) => (
            <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
              {specialty}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SellerCard;
