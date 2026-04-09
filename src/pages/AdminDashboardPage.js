import React, { useState } from 'react';
import products from '../data/products';
import sellers from '../data/sellers';

const mockAdminOrders = [
  { id: 'NOR-A001', customer: 'Ahmed K.', seller: 'TASBI Heritage', total: 149.99, status: 'Delivered', date: '2024-03-10' },
  { id: 'NOR-A002', customer: 'Priya S.', seller: 'Elegance Textiles', total: 299.99, status: 'Shipped', date: '2024-03-12' },
  { id: 'NOR-A003', customer: 'Fatima R.', seller: 'TASBI Heritage', total: 89.99, status: 'Processing', date: '2024-03-14' },
  { id: 'NOR-A004', customer: 'Ananya P.', seller: 'Elegance Textiles', total: 129.99, status: 'Delivered', date: '2024-03-08' },
  { id: 'NOR-A005', customer: 'Omar S.', seller: 'TASBI Heritage', total: 45.99, status: 'Shipped', date: '2024-03-15' },
  { id: 'NOR-A006', customer: 'Lakshmi D.', seller: 'Elegance Textiles', total: 79.99, status: 'Processing', date: '2024-03-16' },
];

function AdminDashboardPage({ navigate }) {
  const [activeSection, setActiveSection] = useState('overview');
  const [managedSellers, setManagedSellers] = useState(
    sellers.map(s => ({ ...s, adminStatus: 'approved' }))
  );

  const totalRevenue = 45670.50;
  const totalOrders = 523;
  const totalProducts = products.length;
  const totalSellers = sellers.length;

  const handleSellerStatus = (sellerId, newStatus) => {
    setManagedSellers(prev =>
      prev.map(s => s.id === sellerId ? { ...s, adminStatus: newStatus } : s)
    );
  };

  const salesChartData = [
    { month: 'Sep', revenue: 3200, orders: 42 },
    { month: 'Oct', revenue: 4100, orders: 58 },
    { month: 'Nov', revenue: 5800, orders: 72 },
    { month: 'Dec', revenue: 8200, orders: 95 },
    { month: 'Jan', revenue: 6100, orders: 68 },
    { month: 'Feb', revenue: 7500, orders: 82 },
    { month: 'Mar', revenue: 9200, orders: 106 },
  ];
  const maxRevenue = Math.max(...salesChartData.map(d => d.revenue));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fadeIn">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-noor-dark">Admin Panel</h1>
          <p className="text-gray-500 text-sm">Marketplace management dashboard</p>
        </div>
        <button onClick={() => navigate('home')} className="text-sm text-noor-gold font-medium hover:underline">
          Back to Store
        </button>
      </div>

      {/* Navigation */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-8 overflow-x-auto">
        {['overview', 'products', 'sellers', 'orders', 'analytics', 'settings'].map(section => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-colors whitespace-nowrap ${
              activeSection === section ? 'bg-white shadow text-noor-dark' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {section}
          </button>
        ))}
      </div>

      {/* Overview */}
      {activeSection === 'overview' && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
              <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
              <p className="text-3xl font-bold text-green-600">${totalRevenue.toLocaleString()}</p>
              <p className="text-xs text-green-500 mt-1">+18.2% from last month</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
              <p className="text-sm text-gray-500 mb-1">Total Orders</p>
              <p className="text-3xl font-bold text-blue-600">{totalOrders}</p>
              <p className="text-xs text-blue-500 mt-1">+24 new this week</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
              <p className="text-sm text-gray-500 mb-1">Total Products</p>
              <p className="text-3xl font-bold text-purple-600">{totalProducts}</p>
              <p className="text-xs text-gray-400 mt-1">Across {totalSellers} sellers</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-noor-gold">
              <p className="text-sm text-gray-500 mb-1">Active Sellers</p>
              <p className="text-3xl font-bold text-noor-dark">{totalSellers}</p>
              <p className="text-xs text-gray-400 mt-1">All verified</p>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-noor-dark mb-4">Recent Orders</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="pb-3 font-medium">Order</th>
                    <th className="pb-3 font-medium">Customer</th>
                    <th className="pb-3 font-medium">Seller</th>
                    <th className="pb-3 font-medium">Amount</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {mockAdminOrders.map(order => (
                    <tr key={order.id} className="border-b last:border-0">
                      <td className="py-3 font-medium">{order.id}</td>
                      <td className="py-3">{order.customer}</td>
                      <td className="py-3">{order.seller}</td>
                      <td className="py-3 font-medium">${order.total}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>{order.status}</span>
                      </td>
                      <td className="py-3 text-gray-500">{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Products Management */}
      {activeSection === 'products' && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-noor-dark mb-4">All Products ({products.length})</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="pb-3 font-medium">Product</th>
                  <th className="pb-3 font-medium">Category</th>
                  <th className="pb-3 font-medium">Price</th>
                  <th className="pb-3 font-medium">Stock</th>
                  <th className="pb-3 font-medium">Rating</th>
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id} className="border-b last:border-0">
                    <td className="py-3">
                      <div className="flex items-center space-x-3">
                        <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                        <span className="font-medium truncate max-w-xs">{product.name}</span>
                      </div>
                    </td>
                    <td className="py-3">{product.category}</td>
                    <td className="py-3 font-medium">${product.price}</td>
                    <td className="py-3">{product.stock}</td>
                    <td className="py-3">{product.rating}</td>
                    <td className="py-3">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 text-xs font-medium">Edit</button>
                        <button className="text-red-500 text-xs font-medium">Remove</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Sellers Management */}
      {activeSection === 'sellers' && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-noor-dark mb-4">Manage Sellers</h2>
          <div className="space-y-4">
            {managedSellers.map(seller => (
              <div key={seller.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                <div className="flex items-center space-x-4">
                  <img src={seller.avatar} alt={seller.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-gray-800">{seller.name}</h3>
                      {seller.verified && (
                        <span className="bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full">Verified</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{seller.location} | {seller.totalSales} sales | Rating: {seller.rating}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    seller.adminStatus === 'approved' ? 'bg-green-100 text-green-700' :
                    seller.adminStatus === 'blocked' ? 'bg-red-100 text-red-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {seller.adminStatus}
                  </span>
                  <select
                    value={seller.adminStatus}
                    onChange={(e) => handleSellerStatus(seller.id, e.target.value)}
                    className="text-sm border border-gray-300 rounded-lg px-2 py-1"
                  >
                    <option value="approved">Approve</option>
                    <option value="pending">Pending</option>
                    <option value="blocked">Block</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Orders */}
      {activeSection === 'orders' && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-noor-dark mb-4">All Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="pb-3 font-medium">Order</th>
                  <th className="pb-3 font-medium">Customer</th>
                  <th className="pb-3 font-medium">Seller</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockAdminOrders.map(order => (
                  <tr key={order.id} className="border-b last:border-0">
                    <td className="py-3 font-medium">{order.id}</td>
                    <td className="py-3">{order.customer}</td>
                    <td className="py-3">{order.seller}</td>
                    <td className="py-3 font-medium">${order.total}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>{order.status}</span>
                    </td>
                    <td className="py-3 text-gray-500">{order.date}</td>
                    <td className="py-3">
                      <button className="text-blue-600 text-xs font-medium">View Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Analytics */}
      {activeSection === 'analytics' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-noor-dark mb-6">Revenue Over Time</h2>
            <div className="flex items-end space-x-3 h-64">
              {salesChartData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <span className="text-xs font-medium text-gray-600 mb-1">${(data.revenue / 1000).toFixed(1)}k</span>
                  <div
                    className="w-full bg-gradient-to-t from-noor-accent to-blue-400 rounded-t-lg transition-all duration-500"
                    style={{ height: `${(data.revenue / maxRevenue) * 200}px` }}
                  />
                  <span className="text-xs text-gray-500 mt-2">{data.month}</span>
                  <span className="text-xs text-gray-400">{data.orders} orders</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-semibold text-noor-dark mb-4">Top Selling Products</h3>
              <div className="space-y-3">
                {products.sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 3).map((product, i) => (
                  <div key={product.id} className="flex items-center space-x-3">
                    <span className="w-6 h-6 rounded-full bg-noor-gold text-noor-dark flex items-center justify-center text-xs font-bold">{i + 1}</span>
                    <img src={product.image} alt={product.name} className="w-8 h-8 rounded object-cover" />
                    <span className="text-sm flex-1 truncate">{product.name}</span>
                    <span className="text-sm text-gray-500">{product.reviewCount} sold</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-semibold text-noor-dark mb-4">Seller Performance</h3>
              <div className="space-y-3">
                {sellers.map(seller => (
                  <div key={seller.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img src={seller.avatar} alt={seller.name} className="w-8 h-8 rounded-full object-cover" />
                      <span className="text-sm font-medium">{seller.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{seller.totalSales} sales</p>
                      <p className="text-xs text-yellow-500">{seller.rating} rating</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings */}
      {activeSection === 'settings' && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-noor-dark mb-4">Marketplace Settings</h2>
          <div className="space-y-4">
            <div className="p-4 border border-gray-100 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-1">Marketplace Name</label>
              <input type="text" defaultValue="Noor Marketplace" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
            </div>
            <div className="p-4 border border-gray-100 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-1">Commission Rate (%)</label>
              <input type="number" defaultValue="10" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
            </div>
            <div className="p-4 border border-gray-100 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-1">Support Email</label>
              <input type="email" defaultValue="support@noormarket.com" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
            </div>
            <button className="bg-noor-gold text-noor-dark px-6 py-2 rounded-lg font-semibold text-sm hover:bg-opacity-90">
              Save Settings
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboardPage;
