import React, { useState } from 'react';

const mockOrders = [
  { id: 'ORD-001', customer: 'Ahmed K.', product: 'Hazrat Imam Portrait Frame - Golden', amount: 149.99, status: 'Delivered', date: '2024-03-10' },
  { id: 'ORD-002', customer: 'Fatima R.', product: 'Ismaili Calligraphy Art Frame', amount: 89.99, status: 'Shipped', date: '2024-03-12' },
  { id: 'ORD-003', customer: 'Omar S.', product: 'Hazrat Imam Miniature Desktop Frame', amount: 91.98, status: 'Processing', date: '2024-03-14' },
  { id: 'ORD-004', customer: 'Karim A.', product: 'Traditional Ismaili White Silk Dress', amount: 299.99, status: 'Delivered', date: '2024-03-08' },
  { id: 'ORD-005', customer: 'Zainab M.', product: 'Hazrat Imam Portrait Frame - Golden', amount: 149.99, status: 'Processing', date: '2024-03-15' },
];

const mockInventory = [
  { id: 1, name: 'Hazrat Imam Portrait Frame - Golden', price: 149.99, stock: 15, status: 'Active' },
  { id: 2, name: 'Ismaili Calligraphy Art Frame - Silver', price: 89.99, stock: 22, status: 'Active' },
  { id: 3, name: 'Hazrat Imam Miniature Desktop Frame', price: 45.99, stock: 40, status: 'Active' },
];

function SellerDashboardPage({ navigate }) {
  const [activeSection, setActiveSection] = useState('overview');
  const [inventory, setInventory] = useState(mockInventory);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '' });

  const totalRevenue = 12847.50;
  const totalOrders = 187;
  const totalProducts = inventory.length;
  const avgRating = 4.9;

  const handleDeleteProduct = (id) => {
    setInventory(prev => prev.filter(p => p.id !== id));
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock) return;
    const product = {
      id: Date.now(),
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock),
      status: 'Active'
    };
    setInventory(prev => [...prev, product]);
    setNewProduct({ name: '', price: '', stock: '' });
  };

  const handleEditSave = () => {
    setInventory(prev => prev.map(p => p.id === editingProduct.id ? editingProduct : p));
    setEditingProduct(null);
  };

  // Simple bar chart with divs
  const salesData = [
    { month: 'Oct', amount: 1800 },
    { month: 'Nov', amount: 2400 },
    { month: 'Dec', amount: 3200 },
    { month: 'Jan', amount: 2100 },
    { month: 'Feb', amount: 2800 },
    { month: 'Mar', amount: 3500 },
  ];
  const maxSales = Math.max(...salesData.map(d => d.amount));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fadeIn">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-noor-dark">Seller Dashboard</h1>
          <p className="text-gray-500 text-sm">Welcome back, Hazrat Imam Heritage Artisans</p>
        </div>
        <button
          onClick={() => navigate('home')}
          className="text-sm text-noor-gold font-medium hover:underline"
        >
          Back to Store
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-8 overflow-x-auto">
        {['overview', 'orders', 'inventory', 'analytics'].map(section => (
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
            <div className="bg-white rounded-xl shadow-md p-6">
              <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
              <p className="text-3xl font-bold text-green-600">${totalRevenue.toLocaleString()}</p>
              <p className="text-xs text-green-500 mt-1">+12.5% from last month</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <p className="text-sm text-gray-500 mb-1">Total Orders</p>
              <p className="text-3xl font-bold text-noor-dark">{totalOrders}</p>
              <p className="text-xs text-green-500 mt-1">+8 new this week</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <p className="text-sm text-gray-500 mb-1">Products</p>
              <p className="text-3xl font-bold text-noor-dark">{totalProducts}</p>
              <p className="text-xs text-gray-400 mt-1">All active</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <p className="text-sm text-gray-500 mb-1">Average Rating</p>
              <p className="text-3xl font-bold text-yellow-500">{avgRating}</p>
              <p className="text-xs text-gray-400 mt-1">Based on 412 reviews</p>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-noor-dark mb-4">Recent Orders</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="pb-3 font-medium">Order ID</th>
                    <th className="pb-3 font-medium">Customer</th>
                    <th className="pb-3 font-medium">Product</th>
                    <th className="pb-3 font-medium">Amount</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockOrders.slice(0, 5).map(order => (
                    <tr key={order.id} className="border-b last:border-0">
                      <td className="py-3 font-medium">{order.id}</td>
                      <td className="py-3">{order.customer}</td>
                      <td className="py-3 truncate max-w-xs">{order.product}</td>
                      <td className="py-3 font-medium">${order.amount}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
                  <th className="pb-3 font-medium">Order ID</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Customer</th>
                  <th className="pb-3 font-medium">Product</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockOrders.map(order => (
                  <tr key={order.id} className="border-b last:border-0">
                    <td className="py-3 font-medium">{order.id}</td>
                    <td className="py-3 text-gray-500">{order.date}</td>
                    <td className="py-3">{order.customer}</td>
                    <td className="py-3 truncate max-w-xs">{order.product}</td>
                    <td className="py-3 font-medium">${order.amount}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Inventory */}
      {activeSection === 'inventory' && (
        <div>
          {/* Add Product Form */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-lg font-semibold text-noor-dark mb-4">Add New Product</h2>
            <div className="flex flex-wrap gap-3">
              <input
                type="text"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className="flex-1 min-w-[200px] px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-noor-gold"
              />
              <input
                type="number"
                placeholder="Price ($)"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                className="w-32 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-noor-gold"
              />
              <input
                type="number"
                placeholder="Stock"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-noor-gold"
              />
              <button
                onClick={handleAddProduct}
                className="bg-noor-gold text-noor-dark px-6 py-2 rounded-lg text-sm font-semibold hover:bg-opacity-90"
              >
                Add Product
              </button>
            </div>
          </div>

          {/* Inventory Table */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-noor-dark mb-4">Inventory ({inventory.length} products)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="pb-3 font-medium">Product</th>
                    <th className="pb-3 font-medium">Price</th>
                    <th className="pb-3 font-medium">Stock</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {inventory.map(product => (
                    <tr key={product.id} className="border-b last:border-0">
                      <td className="py-3">
                        {editingProduct?.id === product.id ? (
                          <input
                            value={editingProduct.name}
                            onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                            className="px-2 py-1 border rounded text-sm w-full"
                          />
                        ) : (
                          <span className="font-medium">{product.name}</span>
                        )}
                      </td>
                      <td className="py-3">
                        {editingProduct?.id === product.id ? (
                          <input
                            type="number"
                            value={editingProduct.price}
                            onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
                            className="px-2 py-1 border rounded text-sm w-20"
                          />
                        ) : (
                          `$${product.price}`
                        )}
                      </td>
                      <td className="py-3">
                        {editingProduct?.id === product.id ? (
                          <input
                            type="number"
                            value={editingProduct.stock}
                            onChange={(e) => setEditingProduct({ ...editingProduct, stock: parseInt(e.target.value) })}
                            className="px-2 py-1 border rounded text-sm w-16"
                          />
                        ) : (
                          product.stock
                        )}
                      </td>
                      <td className="py-3">
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                          {product.status}
                        </span>
                      </td>
                      <td className="py-3">
                        {editingProduct?.id === product.id ? (
                          <div className="flex space-x-2">
                            <button onClick={handleEditSave} className="text-green-600 text-xs font-medium">Save</button>
                            <button onClick={() => setEditingProduct(null)} className="text-gray-400 text-xs">Cancel</button>
                          </div>
                        ) : (
                          <div className="flex space-x-2">
                            <button onClick={() => setEditingProduct({ ...product })} className="text-blue-600 text-xs font-medium">Edit</button>
                            <button onClick={() => handleDeleteProduct(product.id)} className="text-red-500 text-xs font-medium">Delete</button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Analytics */}
      {activeSection === 'analytics' && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-noor-dark mb-6">Sales Analytics (Last 6 Months)</h2>
          <div className="flex items-end space-x-4 h-64">
            {salesData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <span className="text-sm font-medium text-gray-700 mb-2">${data.amount}</span>
                <div
                  className="w-full bg-gradient-to-t from-noor-gold to-yellow-300 rounded-t-lg transition-all duration-500"
                  style={{ height: `${(data.amount / maxSales) * 200}px` }}
                />
                <span className="text-xs text-gray-500 mt-2">{data.month}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SellerDashboardPage;
