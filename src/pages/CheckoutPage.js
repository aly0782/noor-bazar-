import React, { useState } from 'react';

function CheckoutPage({ cart, user, onCheckout, navigate }) {
  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ').slice(1).join(' ') || '',
    email: user?.email || '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'US',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  });
  const [step, setStep] = useState(1);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500 mb-4">Your cart is empty</p>
        <button onClick={() => navigate('home')} className="bg-noor-gold text-noor-dark px-6 py-2 rounded-lg font-semibold">
          Continue Shopping
        </button>
      </div>
    );
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.address || !formData.city || !formData.zip) {
      setError('Please fill in all required fields');
      return;
    }
    setError('');
    setStep(2);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (!formData.cardNumber || !formData.cardName || !formData.expiry || !formData.cvv) {
      setError('Please fill in all payment fields');
      return;
    }
    setError('');
    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      console.log('[Stripe] Payment processed for amount:', total.toFixed(2));
      console.log('[Stripe] Card ending in:', formData.cardNumber.slice(-4));
      onCheckout({
        shippingAddress: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}`,
        paymentMethod: `Card ending in ${formData.cardNumber.slice(-4)}`,
        customerEmail: formData.email,
        customerName: `${formData.firstName} ${formData.lastName}`
      });
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fadeIn">
      <h1 className="text-3xl font-display font-bold text-noor-dark mb-8">Checkout</h1>

      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-10">
        <div className={`flex items-center ${step >= 1 ? 'text-noor-gold' : 'text-gray-400'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 1 ? 'bg-noor-gold text-noor-dark' : 'bg-gray-200'}`}>1</div>
          <span className="ml-2 text-sm font-medium">Shipping</span>
        </div>
        <div className={`w-16 h-0.5 mx-2 ${step >= 2 ? 'bg-noor-gold' : 'bg-gray-200'}`} />
        <div className={`flex items-center ${step >= 2 ? 'text-noor-gold' : 'text-gray-400'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 2 ? 'bg-noor-gold text-noor-dark' : 'bg-gray-200'}`}>2</div>
          <span className="ml-2 text-sm font-medium">Payment</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Step 1: Shipping */}
          {step === 1 && (
            <form onSubmit={handleShippingSubmit} className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-semibold text-noor-dark mb-4">Shipping Information</h2>
              {error && <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm mb-4">{error}</div>}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                  <input type="text" value={formData.firstName} onChange={(e) => handleChange('firstName', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-noor-gold" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input type="text" value={formData.lastName} onChange={(e) => handleChange('lastName', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-noor-gold" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input type="email" value={formData.email} onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-noor-gold" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                  <input type="text" value={formData.address} onChange={(e) => handleChange('address', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-noor-gold" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                  <input type="text" value={formData.city} onChange={(e) => handleChange('city', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-noor-gold" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input type="text" value={formData.state} onChange={(e) => handleChange('state', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-noor-gold" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code *</label>
                  <input type="text" value={formData.zip} onChange={(e) => handleChange('zip', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-noor-gold" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <select value={formData.country} onChange={(e) => handleChange('country', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-noor-gold">
                    <option value="US">United States</option>
                    <option value="IN">India</option>
                    <option value="UZ">Uzbekistan</option>
                    <option value="UK">United Kingdom</option>
                    <option value="AE">UAE</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full mt-6 bg-noor-gold text-noor-dark py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors">
                Continue to Payment
              </button>
            </form>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <form onSubmit={handlePaymentSubmit} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-noor-dark">Payment Information</h2>
                <button type="button" onClick={() => setStep(1)} className="text-sm text-noor-gold font-medium">
                  Edit Shipping
                </button>
              </div>
              {error && <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm mb-4">{error}</div>}

              <div className="p-3 bg-gray-50 rounded-lg mb-4 text-sm text-gray-600">
                <p className="font-medium text-gray-800">Shipping to:</p>
                <p>{formData.firstName} {formData.lastName}</p>
                <p>{formData.address}, {formData.city}, {formData.state} {formData.zip}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Card Number *</label>
                  <input type="text" placeholder="4242 4242 4242 4242" value={formData.cardNumber}
                    onChange={(e) => handleChange('cardNumber', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-noor-gold" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card *</label>
                  <input type="text" value={formData.cardName} onChange={(e) => handleChange('cardName', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-noor-gold" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date *</label>
                    <input type="text" placeholder="MM/YY" value={formData.expiry}
                      onChange={(e) => handleChange('expiry', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-noor-gold" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CVV *</label>
                    <input type="text" placeholder="123" value={formData.cvv}
                      onChange={(e) => handleChange('cvv', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-noor-gold" />
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-green-50 rounded-lg flex items-center text-sm text-green-700">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Your payment information is encrypted and secure
              </div>

              <button
                type="submit"
                disabled={processing}
                className={`w-full mt-6 py-3 rounded-lg font-semibold text-lg transition-colors ${
                  processing
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-noor-gold text-noor-dark hover:bg-opacity-90'
                }`}
              >
                {processing ? 'Processing Payment...' : `Pay $${total.toFixed(2)}`}
              </button>
            </form>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="bg-white rounded-xl shadow-md p-6 h-fit sticky top-24">
          <h2 className="text-lg font-semibold text-noor-dark mb-4">Order Summary</h2>
          <div className="space-y-3 mb-4">
            {cart.map(item => (
              <div key={item.id} className="flex items-center space-x-3">
                <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
                  <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                </div>
                <span className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <hr className="my-3" />
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Shipping</span><span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Tax</span><span>${tax.toFixed(2)}</span></div>
            <hr />
            <div className="flex justify-between text-lg font-bold"><span>Total</span><span>${total.toFixed(2)}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
