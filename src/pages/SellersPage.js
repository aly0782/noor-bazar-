import React from 'react';
import SellerCard from '../components/SellerCard';
import sellers from '../data/sellers';

function SellersPage({ navigateToSeller }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fadeIn">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-display font-bold text-noor-dark mb-2">Our Trusted Sellers</h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Meet the artisans and craftspeople behind our exquisite collection.
          Each seller is verified and committed to delivering the highest quality.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sellers.map(seller => (
          <SellerCard key={seller.id} seller={seller} onNavigate={navigateToSeller} />
        ))}
      </div>

      {/* Become a Seller */}
      <div className="mt-16 bg-gradient-to-r from-noor-dark to-noor-accent rounded-2xl p-8 md:p-12 text-white text-center">
        <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">Become a Seller on Noor</h2>
        <p className="text-gray-300 max-w-xl mx-auto mb-6">
          Join our marketplace and reach thousands of customers looking for authentic, handcrafted products.
        </p>
        <button className="bg-noor-gold text-noor-dark px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors">
          Apply Now
        </button>
      </div>
    </div>
  );
}

export default SellersPage;
