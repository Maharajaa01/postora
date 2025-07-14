
'use client';

import { useState, useEffect } from 'react';
import Navigation from '../../components/Navigation';

interface Order {
  id: string;
  userEmail: string;
  items: any[];
  totalAmount: number;
  orderDate: string;
  status: string;
}

interface User {
  email: string;
  phone?: string;
  createdAt: string;
}

interface Poster {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  type: 'regular' | 'elite' | 'sticker';
  description?: string;
  features?: string[];
  elitePrice?: { A4: number; A3: number; A2: number };
  stickerCategory?: string;
}

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<'orders' | 'users' | 'posters'>('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [posters, setPosters] = useState<Poster[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showPosterForm, setShowPosterForm] = useState(false);
  const [editingPoster, setEditingPoster] = useState<Poster | null>(null);
  const [posterForm, setPosterForm] = useState({
    title: '',
    price: '',
    image: '',
    category: '',
    type: 'regular' as 'regular' | 'elite' | 'sticker',
    description: '',
    features: '',
    elitePrice: { A4: '', A3: '', A2: '' },
    stickerCategory: ''
  });

  const categories = ['Marvel', 'DC', 'Tamil Cinema', 'Love', 'Motivational', 'Nature', 'Abstract'];
  const stickerCategories = ['Mobile Stickers', 'Wall Stickers', 'Laptop Stickers', 'Bike Stickers'];

  useEffect(() => {
    // Check if user is admin
    const savedUser = localStorage.getItem('postora_user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      
      if (!user.isAdmin) {
        window.location.href = '/';
        return;
      }
    } else {
      window.location.href = '/';
      return;
    }

    loadData();
  }, []);

  const loadData = () => {
    // Load orders
    const savedOrders = localStorage.getItem('postora_orders');
    if (savedOrders) {
      const ordersData = JSON.parse(savedOrders);
      ordersData.sort((a: Order, b: Order) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
      setOrders(ordersData);
    }

    // Load users
    const savedUsers = localStorage.getItem('postora_users');
    if (savedUsers) {
      const usersData = JSON.parse(savedUsers);
      usersData.sort((a: User, b: User) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setUsers(usersData);
    }

    // Load posters
    const savedPosters = localStorage.getItem('postora_posters');
    if (savedPosters) {
      setPosters(JSON.parse(savedPosters));
    } else {
      // Initialize with default posters from home page
      const defaultPosters = [
        { id: '1', title: 'Iron Man Poster', price: 149, image: 'https://readdy.ai/api/search-image?query=Iron%20Man%20superhero%20poster%20with%20red%20and%20gold%20armor%2C%20minimalist%20background%2C%20high%20quality%20design%20perfect%20for%20wall%20decoration&width=400&height=400&seq=ironman1&orientation=squarish', category: 'Marvel', type: 'regular' },
        { id: '2', title: 'Batman Dark Knight', price: 179, image: 'https://readdy.ai/api/search-image?query=Batman%20dark%20knight%20poster%20with%20gothic%20atmosphere%2C%20black%20background%2C%20dramatic%20lighting%2C%20perfect%20wall%20art%20design&width=400&height=400&seq=batman1&orientation=squarish', category: 'DC', type: 'regular' },
        { id: '3', title: 'Vijay Thalapathy', price: 199, image: 'https://readdy.ai/api/search-image?query=Tamil%20cinema%20actor%20Vijay%20stylish%20poster%20with%20vibrant%20colors%2C%20dynamic%20pose%2C%20cinematic%20background%20design%20for%20wall%20decoration&width=400&height=400&seq=vijay1&orientation=squarish', category: 'Tamil Cinema', type: 'regular' },
        { id: '4', title: 'Love Quote Poster', price: 129, image: 'https://readdy.ai/api/search-image?query=Romantic%20love%20quote%20poster%20with%20soft%20pastel%20colors%2C%20elegant%20typography%2C%20heart%20elements%2C%20perfect%20for%20bedroom%20wall%20decor&width=400&height=400&seq=love1&orientation=squarish', category: 'Love', type: 'regular' }
      ];
      setPosters(defaultPosters as Poster[]);
      localStorage.setItem('postora_posters', JSON.stringify(defaultPosters));
    }
  };

  const handlePosterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newPoster: Poster = {
      id: editingPoster ? editingPoster.id : Date.now().toString(),
      title: posterForm.title,
      price: parseInt(posterForm.price),
      image: posterForm.image,
      category: posterForm.category,
      type: posterForm.type,
      description: posterForm.description,
      features: posterForm.features ? posterForm.features.split(',').map(f => f.trim()) : undefined,
      elitePrice: posterForm.type === 'elite' ? {
        A4: parseInt(posterForm.elitePrice.A4),
        A3: parseInt(posterForm.elitePrice.A3),
        A2: parseInt(posterForm.elitePrice.A2)
      } : undefined,
      stickerCategory: posterForm.type === 'sticker' ? posterForm.stickerCategory : undefined
    };

    let updatedPosters;
    if (editingPoster) {
      updatedPosters = posters.map(p => p.id === editingPoster.id ? newPoster : p);
    } else {
      updatedPosters = [...posters, newPoster];
    }

    setPosters(updatedPosters);
    localStorage.setItem('postora_posters', JSON.stringify(updatedPosters));
    
    // Reset form
    setPosterForm({
      title: '',
      price: '',
      image: '',
      category: '',
      type: 'regular',
      description: '',
      features: '',
      elitePrice: { A4: '', A3: '', A2: '' },
      stickerCategory: ''
    });
    setShowPosterForm(false);
    setEditingPoster(null);
  };

  const handleEditPoster = (poster: Poster) => {
    setEditingPoster(poster);
    setPosterForm({
      title: poster.title,
      price: poster.price.toString(),
      image: poster.image,
      category: poster.category,
      type: poster.type,
      description: poster.description || '',
      features: poster.features ? poster.features.join(', ') : '',
      elitePrice: poster.elitePrice ? {
        A4: poster.elitePrice.A4.toString(),
        A3: poster.elitePrice.A3.toString(),
        A2: poster.elitePrice.A2.toString()
      } : { A4: '', A3: '', A2: '' },
      stickerCategory: poster.stickerCategory || ''
    });
    setShowPosterForm(true);
  };

  const handleDeletePoster = (id: string) => {
    if (confirm('Are you sure you want to delete this poster?')) {
      const updatedPosters = posters.filter(p => p.id !== id);
      setPosters(updatedPosters);
      localStorage.setItem('postora_posters', JSON.stringify(updatedPosters));
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('postora_orders', JSON.stringify(updatedOrders));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getOrderItemsCount = (items: any[]) => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  if (!currentUser?.isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">You need admin privileges to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage orders, customers, and posters</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex mb-8 bg-white rounded-lg shadow-sm p-1">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 px-1 py-1 rounded-md text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'orders' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Recent Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`flex-1 px-1 py-1 rounded-md text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'users' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Registered Users ({users.length})
          </button>
          <button
            onClick={() => setActiveTab('posters')}
            className={`flex-1 px-1 py-1 rounded-md text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'posters' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Manage Posters ({posters.length})
          </button>
        </div>

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-lg shadow-md">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
            </div>
            
            {orders.length === 0 ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gray-100 rounded-full">
                  <i className="ri-shopping-bag-line text-2xl text-gray-400"></i>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Orders Yet</h3>
                <p className="text-gray-500">Customer orders will appear here once they start purchasing.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          #{order.id.split('_')[1]}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.userEmail}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {getOrderItemsCount(order.items)} items
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                          ₹{order.totalAmount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(order.orderDate)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            order.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                            order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                            order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                            order.status === 'Delivered' ? 'bg-purple-100 text-purple-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setSelectedOrder(order)}
                              className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                            >
                              View
                            </button>
                            <select
                              value={order.status}
                              onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                              className="text-xs border border-gray-300 rounded px-2 py-1 pr-8"
                            >
                              <option value="Confirmed">Confirmed</option>
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-lg shadow-md">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Registered Users</h2>
            </div>
            
            {users.length === 0 ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gray-100 rounded-full">
                  <i className="ri-user-line text-2xl text-gray-400"></i>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Users Yet</h3>
                <p className="text-gray-500">User registrations will appear here.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registration Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user, index) => {
                      const userOrders = orders.filter(order => order.userEmail === user.email);
                      return (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {user.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.phone || 'Not provided'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(user.createdAt)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs font-medium">
                              {userOrders.length} orders
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Posters Tab */}
        {activeTab === 'posters' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Manage Posters</h2>
                <button
                  onClick={() => {
                    setShowPosterForm(true);
                    setEditingPoster(null);
                    setPosterForm({
                      title: '',
                      price: '',
                      image: '',
                      category: '',
                      type: 'regular',
                      description: '',
                      features: '',
                      elitePrice: { A4: '', A3: '', A2: '' },
                      stickerCategory: ''
                    });
                  }}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Add New Poster
                </button>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {posters.map((poster) => (
                    <div key={poster.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="aspect-square overflow-hidden rounded-lg mb-3 bg-white">
                        <img 
                          src={poster.image} 
                          alt={poster.title}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className={`text-xs px-2 py-1 rounded ${
                            poster.type === 'elite' ? 'bg-yellow-100 text-yellow-800' :
                            poster.type === 'sticker' ? 'bg-purple-100 text-purple-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {poster.type.toUpperCase()}
                          </span>
                          <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                            {poster.category}
                          </span>
                        </div>
                        <h3 className="font-medium text-gray-900 text-sm">{poster.title}</h3>
                        <p className="text-indigo-600 font-bold">
                          ₹{poster.type === 'elite' && poster.elitePrice ? 
                            `${poster.elitePrice.A4}-${poster.elitePrice.A2}` : 
                            poster.price
                          }
                        </p>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditPoster(poster)}
                            className="flex-1 bg-gray-600 text-white px-3 py-1 rounded text-xs font-medium hover:bg-gray-700 transition-colors cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeletePoster(poster.id)}
                            className="flex-1 bg-red-600 text-white px-3 py-1 rounded text-xs font-medium hover:bg-red-700 transition-colors cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl mx-4 max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Order Details</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-gray-700">Order ID:</p>
                  <p className="text-gray-900">#{selectedOrder.id.split('_')[1]}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Customer:</p>
                  <p className="text-gray-900">{selectedOrder.userEmail}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Order Date:</p>
                  <p className="text-gray-900">{formatDate(selectedOrder.orderDate)}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Status:</p>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    selectedOrder.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {selectedOrder.status}
                  </span>
                </div>
              </div>
              
              <div>
                <p className="font-medium text-gray-700 mb-2">Items Ordered:</p>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-12 h-12 object-cover object-top rounded"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          {item.type} {item.size && `• ${item.size}`} • Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium text-indigo-600">₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total Amount:</span>
                  <span className="text-xl font-bold text-indigo-600">₹{selectedOrder.totalAmount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Poster Form Modal */}
      {showPosterForm && (
        <div className="fixed inset-0 bg-black bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl mx-4 max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                {editingPoster ? 'Edit Poster' : 'Add New Poster'}
              </h2>
              <button
                onClick={() => {
                  setShowPosterForm(false);
                  setEditingPoster(null);
                }}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            
            <form onSubmit={handlePosterSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={posterForm.title}
                    onChange={(e) => setPosterForm({...posterForm, title: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={posterForm.type}
                    onChange={(e) => setPosterForm({...posterForm, type: e.target.value as 'regular' | 'elite' | 'sticker'})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm pr-8"
                  >
                    <option value="regular">Regular Poster</option>
                    <option value="elite">Elite Poster</option>
                    <option value="sticker">Sticker</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={posterForm.category}
                    onChange={(e) => setPosterForm({...posterForm, category: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm pr-8"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                {posterForm.type === 'sticker' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sticker Category</label>
                    <select
                      value={posterForm.stickerCategory}
                      onChange={(e) => setPosterForm({...posterForm, stickerCategory: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm pr-8"
                    >
                      <option value="">Select Sticker Category</option>
                      {stickerCategories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                )}
                {posterForm.type === 'regular' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                    <input
                      type="number"
                      value={posterForm.price}
                      onChange={(e) => setPosterForm({...posterForm, price: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                      required
                    />
                  </div>
                )}
              </div>

              {posterForm.type === 'elite' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Elite Pricing (₹)</label>
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="number"
                      placeholder="A4 Price"
                      value={posterForm.elitePrice.A4}
                      onChange={(e) => setPosterForm({...posterForm, elitePrice: {...posterForm.elitePrice, A4: e.target.value}})}
                      className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                      required
                    />
                    <input
                      type="number"
                      placeholder="A3 Price"
                      value={posterForm.elitePrice.A3}
                      onChange={(e) => setPosterForm({...posterForm, elitePrice: {...posterForm.elitePrice, A3: e.target.value}})}
                      className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                      required
                    />
                    <input
                      type="number"
                      placeholder="A2 Price"
                      value={posterForm.elitePrice.A2}
                      onChange={(e) => setPosterForm({...posterForm, elitePrice: {...posterForm.elitePrice, A2: e.target.value}})}
                      className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="url"
                  value={posterForm.image}
                  onChange={(e) => setPosterForm({...posterForm, image: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={posterForm.description}
                  onChange={(e) => setPosterForm({...posterForm, description: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  rows={2}
                  maxLength={500}
                />
              </div>

              {posterForm.type === 'elite' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Features (comma-separated)</label>
                  <input
                    type="text"
                    value={posterForm.features}
                    onChange={(e) => setPosterForm({...posterForm, features: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    placeholder="Premium Paper, Gold Foil, Hand Finished"
                  />
                </div>
              )}

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md font-medium hover:bg-indigo-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  {editingPoster ? 'Update Poster' : 'Add Poster'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowPosterForm(false);
                    setEditingPoster(null);
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md font-medium hover:bg-gray-400 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
