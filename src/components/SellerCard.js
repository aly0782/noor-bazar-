import React from 'react';
import StarRating from './StarRating';

function SellerCard({ seller, onNavigate }) {
  return (
    <div
      className="bg-noor-dark-2 border border-noor-dark-3 rounded-lg overflow-hidden cursor-pointer product-card animate-fadeIn"
      onClick={() => onNavigate(seller.id)}
    >
      <div className="h-32 bg-cover bg-center relative" style={{ backgroundImage: `url(${seller.coverImage})` }}>
        <div className="absolute inset-0 bg-gradient-to-t from-noor-dark-2 via-noor-dark/60 to-transparent" />
      </div>
      <div className="p-5 -mt-10 relative">
        <div className="flex items-end space-x-3 mb-3">
          <div className="relative">
            <img
              src={seller.avatar}
              alt={seller.name}
              className="w-16 h-16 rounded-full border-2 border-noor-gold shadow-lg object-cover"
            />
            {seller.verified && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-noor-teal rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-noor-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
          <div>
            <h3 className="font-display font-semibold text-noor-cream">{seller.name}</h3>
            <p className="text-xs text-noor-gold flex items-center">
              <i className="fas fa-map-marker-alt mr-1 text-noor-teal-light"></i>
              {seller.location}
            </p>
          </div>
        </div>
        <p className="text-sm text-noor-cream/70 line-clamp-2 mb-3 leading-relaxed">{seller.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <StarRating rating={seller.rating} size="sm" />
            <span className="text-sm text-noor-gold ml-1">{seller.rating}</span>
          </div>
          <span className="text-xs text-noor-cream/50 tracking-wide">{seller.totalSales.toLocaleString()} sales</span>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {seller.specialties.slice(0, 3).map((specialty, index) => (
            <span key={index} className="text-xs bg-noor-teal/20 text-noor-teal-light px-2.5 py-1 rounded border border-noor-teal/30">
              {specialty}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SellerCard;
