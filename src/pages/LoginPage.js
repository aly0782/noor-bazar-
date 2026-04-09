import React, { useState } from 'react';

function LoginPage({ onLogin, navigate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    // Demo login - accept any valid email/password combo
    const users = JSON.parse(localStorage.getItem('noor-users') || '[]');
    const existingUser = users.find(u => u.email === email);

    if (existingUser) {
      if (existingUser.password !== password) {
        setError('Invalid password');
        return;
      }
      onLogin(existingUser);
    } else {
      // Demo: auto-create account for demo purposes
      const newUser = {
        id: Date.now(),
        name: email.split('@')[0],
        email,
        password,
        role: email.includes('admin') ? 'admin' : 'user',
        joinDate: new Date().toISOString(),
        addresses: [
          { id: 1, label: 'Home', address: '123 Main Street, New York, NY 10001' }
        ],
        paymentMethods: [
          { id: 1, type: 'Visa', last4: '4242', expiry: '12/25' }
        ],
        orders: [
          { id: 'NOR-DEMO1', date: '2024-02-15', total: 239.98, status: 'Delivered', items: 2 },
          { id: 'NOR-DEMO2', date: '2024-03-10', total: 149.99, status: 'Shipped', items: 1 },
        ]
      };
      users.push(newUser);
      localStorage.setItem('noor-users', JSON.stringify(users));
      onLogin(newUser);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 animate-fadeIn">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold gradient-text inline-block">Noor</h1>
          <p className="text-gray-500 mt-2">Welcome back! Sign in to your account</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">{error}</div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-noor-gold focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-noor-gold focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-noor-gold text-noor-dark py-3 rounded-lg font-semibold text-lg hover:bg-opacity-90 transition-colors"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{' '}
              <button onClick={() => navigate('register')} className="text-noor-gold font-medium hover:underline">
                Create one
              </button>
            </p>
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-600 text-center">
              Demo: Enter any email and password to sign in. Use "admin@noor.com" for admin access.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
