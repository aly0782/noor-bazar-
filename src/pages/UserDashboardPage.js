import React, { useState } from 'react';

function UserDashboardPage({ user, navigate }) {
  const [activeTab, setActiveTab] = useState('orders');
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    newsletter: true
  });

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500 mb-4">Please log in to view your dashboard</p>
        <button onClick={() => navigate('login')} className="bg-noor-gold text-noor-dark px-6 py-2 rounded-lg font-semibold">
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fadeIn">
      {/* User Header */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-noor-gold flex items-center justify-center text-noor-dark text-2xl font-bold">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-noor-dark">{user.name}</h1>
            <p className="text-gray-500">{user.email}</p>
            <p className="text-xs text-gray-400">Member since {new Date(user.joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-8 overflow-x-auto">
        {['orders', 'addresses', 'payments', 'settings'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-colors whitespace-nowrap ${
              activeTab === tab ? 'bg-white shadow text-noor-dark' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Orders */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-noor-dark mb-4">Order History</h2>
          {(user.orders || []).length === 0 ? (
            <p className="text-gray-500 text-center py-8">No orders yet. Start shopping!</p>
          ) : (
            <div className="space-y-4">
              {user.orders.map(order => (
                <div key={order.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">{order.id}</p>
                    <p className="text-sm text-gray-500">{order.date} - {order.items} item(s)</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-noor-dark">${order.total}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Addresses */}
      {activeTab === 'addresses' && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-noor-dark mb-4">Saved Addresses</h2>
          {(user.addresses || []).length === 0 ? (
            <p className="text-gray-500 text-center py-8">No saved addresses</p>
          ) : (
            <div className="space-y-4">
              {user.addresses.map(addr => (
                <div key={addr.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">{addr.label}</p>
                    <p className="text-sm text-gray-500">{addr.address}</p>
                  </div>
                  <button className="text-sm text-noor-gold font-medium">Edit</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Payment Methods */}
      {activeTab === 'payments' && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-noor-dark mb-4">Payment Methods</h2>
          {(user.paymentMethods || []).length === 0 ? (
            <p className="text-gray-500 text-center py-8">No saved payment methods</p>
          ) : (
            <div className="space-y-4">
              {user.paymentMethods.map(pm => (
                <div key={pm.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-7 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center text-white text-xs font-bold">
                      {pm.type}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">**** **** **** {pm.last4}</p>
                      <p className="text-sm text-gray-500">Expires {pm.expiry}</p>
                    </div>
                  </div>
                  <button className="text-sm text-red-500 font-medium">Remove</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Settings */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-noor-dark mb-4">Notification Settings</h2>
          <div className="space-y-4">
            {[
              { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive order updates via email' },
              { key: 'smsNotifications', label: 'SMS Notifications', desc: 'Receive order updates via SMS' },
              { key: 'newsletter', label: 'Newsletter', desc: 'Receive weekly deals and new arrivals' }
            ].map(setting => (
              <div key={setting.key} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">{setting.label}</p>
                  <p className="text-sm text-gray-500">{setting.desc}</p>
                </div>
                <button
                  onClick={() => setSettings(prev => ({ ...prev, [setting.key]: !prev[setting.key] }))}
                  className={`w-12 h-6 rounded-full transition-colors ${settings[setting.key] ? 'bg-noor-gold' : 'bg-gray-300'}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${settings[setting.key] ? 'translate-x-6' : 'translate-x-0.5'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDashboardPage;
