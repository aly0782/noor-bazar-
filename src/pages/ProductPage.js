import React, { useState } from 'react';
import StarRating from '../components/StarRating';
import products from '../data/products';
import sellers from '../data/sellers';
import reviewsData from '../data/reviews';

function ProductPage({ productId, addToCart, toggleWishlist, isInWishlist, navigateToSeller, navigateToProduct }) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [helpfulReviews, setHelpfulReviews] = useState({});

  const product = products.find(p => p.id === productId);
  if (!product) return <div className="text-center py-20">Product not found</div>;

  const seller = sellers.find(s => s.id === product.sellerId);
  const productReviews = reviewsData[product.id] || [];
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const markHelpful = (reviewId) => {
    setHelpfulReviews(prev => ({
      ...prev,
      [reviewId]: !prev[reviewId]
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fadeIn">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
        <button onClick={() => navigateToProduct(null)} className="hover:text-noor-gold">Home</button>
        <span>/</span>
        <span className="text-gray-400">{product.category}</span>
        <span>/</span>
        <span className="text-gray-800">{product.name}</span>
      </div>

      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 md:h-[500px] object-cover rounded-xl shadow-lg"
          />
          {discount > 0 && (
            <span className="absolute top-4 left-4 bg-noor-highlight text-white px-3 py-1 rounded-full font-semibold">
              -{discount}% OFF
            </span>
          )}
          {product.tags?.includes('bestseller') && (
            <span className="absolute top-4 right-4 bg-noor-gold text-noor-dark px-3 py-1 rounded-full font-semibold text-sm">
              Bestseller
            </span>
          )}
        </div>

        {/* Info */}
        <div>
          <h1 className="text-3xl font-display font-bold text-noor-dark mb-2">{product.name}</h1>

          <div className="flex items-center space-x-3 mb-4">
            <StarRating rating={product.rating} size="lg" showValue />
            <span className="text-gray-500">({product.reviewCount} reviews)</span>
            <span className={`text-sm px-2 py-1 rounded-full ${product.stock > 10 ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
              {product.stock > 10 ? 'In Stock' : `Only ${product.stock} left`}
            </span>
          </div>

          <div className="flex items-baseline space-x-3 mb-6">
            <span className="text-3xl font-bold text-noor-dark">${product.price}</span>
            {product.originalPrice > product.price && (
              <span className="text-xl text-gray-400 line-through">${product.originalPrice}</span>
            )}
            {discount > 0 && (
              <span className="text-sm text-green-600 font-medium">You save ${(product.originalPrice - product.price).toFixed(2)}</span>
            )}
          </div>

          <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

          {/* Quantity & Add to Cart */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 text-gray-600 hover:bg-gray-100"
              >
                -
              </button>
              <span className="px-4 py-2 font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="px-3 py-2 text-gray-600 hover:bg-gray-100"
              >
                +
              </button>
            </div>
            <button
              onClick={() => addToCart(product, quantity)}
              className="flex-1 bg-noor-gold text-noor-dark py-3 rounded-lg font-semibold text-lg hover:bg-opacity-90 transition-colors"
            >
              Add to Cart - ${(product.price * quantity).toFixed(2)}
            </button>
            <button
              onClick={() => toggleWishlist(product)}
              className="heart-btn p-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <svg className="w-6 h-6" fill={isInWishlist(product.id) ? '#e94560' : 'none'} stroke={isInWishlist(product.id) ? '#e94560' : 'currentColor'} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          {/* Seller Info */}
          {seller && (
            <div
              className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => navigateToSeller(seller.id)}
            >
              <img src={seller.avatar} alt={seller.name} className="w-12 h-12 rounded-full object-cover" />
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-800">{seller.name}</span>
                  {seller.verified && (
                    <span className="bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full">Verified</span>
                  )}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <StarRating rating={seller.rating} size="sm" />
                  <span className="ml-1">{seller.rating}</span>
                  <span className="mx-2">|</span>
                  <span>{seller.totalSales.toLocaleString()} sales</span>
                </div>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Tabs: Description / Specifications / Reviews */}
      <div className="mt-12">
        <div className="flex border-b border-gray-200">
          {['description', 'specifications', 'reviews'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-medium capitalize transition-colors ${
                activeTab === tab
                  ? 'border-b-2 border-noor-gold text-noor-dark'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab} {tab === 'reviews' && `(${productReviews.length})`}
            </button>
          ))}
        </div>

        <div className="py-6">
          {activeTab === 'description' && (
            <div className="prose max-w-none">
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {product.tags?.map((tag, i) => (
                  <span key={i} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm capitalize">{tag}</span>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'specifications' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.specifications || {}).map(([key, value]) => (
                <div key={key} className="flex justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-500 capitalize">{key}</span>
                  <span className="font-medium text-gray-800">{value}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              {/* Rating Summary */}
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="text-4xl font-bold text-noor-dark">{product.rating}</div>
                  <StarRating rating={product.rating} size="lg" />
                  <div className="text-sm text-gray-500 mt-1">{product.reviewCount} reviews</div>
                </div>
              </div>

              {/* Reviews List */}
              {productReviews.map(review => (
                <div key={review.id} className="border-b border-gray-100 pb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-noor-accent text-white flex items-center justify-center font-bold">
                        {review.userName.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-800">{review.userName}</span>
                          {review.verified && (
                            <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Verified Purchase</span>
                          )}
                        </div>
                        <span className="text-xs text-gray-400">{new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                    </div>
                    <StarRating rating={review.rating} size="sm" />
                  </div>
                  <p className="text-gray-600 mt-2">{review.text}</p>
                  <button
                    onClick={() => markHelpful(review.id)}
                    className={`mt-3 text-sm flex items-center space-x-1 ${helpfulReviews[review.id] ? 'text-noor-gold' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <svg className="w-4 h-4" fill={helpfulReviews[review.id] ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                    <span>Helpful ({(helpfulReviews[review.id] ? review.helpful + 1 : review.helpful)})</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-display font-bold text-noor-dark mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map(p => (
              <div
                key={p.id}
                className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer product-card"
                onClick={() => { navigateToProduct(p.id); window.scrollTo(0, 0); }}
              >
                <img src={p.image} alt={p.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 line-clamp-1">{p.name}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-lg font-bold">${p.price}</span>
                    <StarRating rating={p.rating} size="sm" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductPage;
