import React from 'react';

function OrderConfirmationPage({ order, navigate }) {
  if (!order) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500 mb-4">No order found</p>
        <button onClick={() => navigate('home')} className="bg-noor-gold text-noor-dark px-6 py-2 rounded-lg font-semibold">
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 animate-fadeIn">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-display font-bold text-noor-dark mb-2">Order Confirmed!</h1>
        <p className="text-gray-500">Thank you for your purchase. Your order has been placed successfully.</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-500">Order Number</p>
            <p className="font-bold text-noor-dark">{order.orderId}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Date</p>
            <p className="font-medium text-gray-800">{new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Shipping Address</p>
            <p className="font-medium text-gray-800 text-sm">{order.shippingAddress}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Payment</p>
            <p className="font-medium text-gray-800">{order.paymentMethod}</p>
          </div>
        </div>

        <hr className="mb-4" />

        <h3 className="font-semibold text-gray-800 mb-3">Items Ordered</h3>
        <div className="space-y-3">
          {order.items.map(item => (
            <div key={item.id} className="flex items-center space-x-3">
              <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-lg" />
              <div className="flex-1">
                <p className="font-medium text-gray-800 text-sm">{item.name}</p>
                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
              </div>
              <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <hr className="my-4" />

        <div className="flex justify-between text-lg font-bold">
          <span>Total Paid</span>
          <span className="text-noor-dark">${order.total.toFixed(2)}</span>
        </div>
      </div>

      <div className="bg-blue-50 rounded-xl p-4 mb-6">
        <div className="flex items-start space-x-3">
          <svg className="w-5 h-5 text-blue-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="font-medium text-blue-800 text-sm">What's next?</p>
            <p className="text-sm text-blue-600 mt-1">
              You'll receive a confirmation email shortly. We'll also send tracking information once your order ships.
              Estimated delivery: 5-7 business days.
            </p>
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => navigate('home')}
          className="flex-1 bg-noor-gold text-noor-dark py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
        >
          Continue Shopping
        </button>
        <button
          onClick={() => navigate('userDashboard')}
          className="flex-1 border-2 border-noor-gold text-noor-gold py-3 rounded-lg font-semibold hover:bg-noor-gold hover:text-noor-dark transition-colors"
        >
          View Orders
        </button>
      </div>
    </div>
  );
}

export default OrderConfirmationPage;
