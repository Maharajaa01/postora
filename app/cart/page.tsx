
'use client';

import { useState, useEffect } from 'react';
import Navigation from '../../components/Navigation';
import Link from 'next/link';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  type: string;
  size?: string;
  category?: string;
  features?: string[];
  bundleDetails?: {
    posters: { name: string; image: string }[];
    originalPrice: number;
    savings: number;
  };
}

interface Order {
  id: string;
  userEmail: string;
  items: CartItem[];
  totalAmount: number;
  orderDate: string;
  status: string;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCheckoutSuccess, setShowCheckoutSuccess] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Load cart items from localStorage
    const savedCart = localStorage.getItem('postora_cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }

    // Load user from localStorage
    const savedUser = localStorage.getItem('postora_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const updateCart = (updatedCart: CartItem[]) => {
    setCartItems(updatedCart);
    localStorage.setItem('postora_cart', JSON.stringify(updatedCart));
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
      return;
    }
    
    const updatedCart = cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    updateCart(updatedCart);
  };

  const removeItem = (itemId: string) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    updateCart(updatedCart);
  };

  const clearCart = () => {
    updateCart([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const saveOrderToStorage = (order: Order) => {
    const existingOrders = JSON.parse(localStorage.getItem('postora_orders') || '[]');
    existingOrders.push(order);
    localStorage.setItem('postora_orders', JSON.stringify(existingOrders));
  };

  const handleCheckout = () => {
    // Check if user is logged in
    if (!user) {
      setShowLoginPrompt(true);
      return;
    }

    // Create order object
    const order: Order = {
      id: 'ORDER_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
      userEmail: user.email,
      items: [...cartItems],
      totalAmount: getTotalPrice(),
      orderDate: new Date().toISOString(),
      status: 'Confirmed'
    };

    // Save order to localStorage
    saveOrderToStorage(order);

    // Show success and clear cart
    setShowCheckoutSuccess(true);
    setTimeout(() => {
      setShowCheckoutSuccess(false);
      clearCart();
    }, 3000);
  };

  const handleLoginPromptClose = () => {
    setShowLoginPrompt(false);
  };

  if (cartItems.length === 0 && !showCheckoutSuccess) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center bg-gray-100 rounded-full">
              <i className="ri-shopping-cart-line text-4xl text-gray-400"></i>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Add some amazing posters and stickers to get started!</p>
            <Link href="/" className="bg-indigo-600 text-white px-8 py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors cursor-pointer whitespace-nowrap">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <button 
            onClick={clearCart}
            className="text-red-600 hover:text-red-700 font-medium cursor-pointer"
          >
            Clear All
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              {cartItems.map((item) => (
                <div key={item.id} className="p-6 border-b border-gray-200 last:border-b-0">
                  <div className="flex items-start space-x-4">
                    <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-gray-900 mb-1">{item.name}</h3>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                          {item.type}
                        </span>
                        {item.size && (
                          <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                            {item.size}
                          </span>
                        )}
                        {item.category && (
                          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                            {item.category}
                          </span>
                        )}
                      </div>
                      
                      {item.features && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {item.features.map((feature, index) => (
                            <span key={index} className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                              {feature}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      {item.bundleDetails && (
                        <div className="bg-green-50 p-3 rounded-lg mb-2">
                          <p className="text-sm font-medium text-green-800 mb-2">
                            Bundle includes {item.bundleDetails.posters.length} posters
                          </p>
                          <div className="grid grid-cols-4 gap-2">
                            {item.bundleDetails.posters.map((poster, index) => (
                              <div key={index} className="text-center">
                                <div className="w-12 h-16 overflow-hidden rounded bg-gray-100 mb-1">
                                  <img 
                                    src={poster.image} 
                                    alt={poster.name}
                                    className="w-full h-full object-cover object-top"
                                  />
                                </div>
                                <p className="text-xs text-gray-600">{poster.name}</p>
                              </div>
                            ))}
                          </div>
                          <p className="text-xs text-green-600 mt-2">
                            You save ₹{item.bundleDetails.savings}!
                          </p>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full cursor-pointer"
                          >
                            <i className="ri-subtract-line text-sm"></i>
                          </button>
                          <span className="text-lg font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full cursor-pointer"
                          >
                            <i className="ri-add-line text-sm"></i>
                          </button>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-lg font-bold text-indigo-600">₹{item.price * item.quantity}</p>
                          <p className="text-sm text-gray-500">₹{item.price} each</p>
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      <i className="ri-delete-bin-line text-xl"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Items ({getTotalItems()})</span>
                  <span className="font-medium">₹{getTotalPrice()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-xl font-bold text-indigo-600">₹{getTotalPrice()}</span>
                  </div>
                </div>
              </div>
              
              {/* Login Status Display */}
              {user ? (
                <div className="bg-green-50 p-3 rounded-lg mb-4">
                  <div className="flex items-center">
                    <i className="ri-user-line text-green-600 mr-2"></i>
                    <span className="text-sm text-green-800">Logged in as {user.name || user.email}</span>
                  </div>
                </div>
              ) : (
                <div className="bg-yellow-50 p-3 rounded-lg mb-4">
                  <div className="flex items-center">
                    <i className="ri-information-line text-yellow-600 mr-2"></i>
                    <span className="text-sm text-yellow-800">Please login to confirm your order</span>
                  </div>
                </div>
              )}
              
              <button 
                onClick={handleCheckout}
                className="w-full bg-indigo-600 text-white py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors cursor-pointer whitespace-nowrap mb-4"
              >
                {user ? 'Confirm Order' : 'Login to Checkout'}
              </button>
              
              <Link 
                href="/"
                className="block w-full text-center bg-gray-100 text-gray-700 py-3 rounded-md font-medium hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Login Required Modal */}
      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md mx-4 text-center">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-yellow-100 rounded-full">
              <i className="ri-lock-line text-3xl text-yellow-600"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Login Required</h2>
            <p className="text-gray-600 mb-6">Please login to your account to confirm this order and track your purchases.</p>
            <div className="flex space-x-3">
              <button 
                onClick={handleLoginPromptClose}
                className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap"
              >
                Continue Shopping
              </button>
              <button 
                onClick={() => {
                  handleLoginPromptClose();
                  // Trigger login modal from Navigation component
                  window.location.reload();
                }}
                className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                Login Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Success Modal */}
      {showCheckoutSuccess && (
        <div className="fixed inset-0 bg-black bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md mx-4 text-center">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-green-100 rounded-full">
              <i className="ri-check-line text-3xl text-green-600"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
            <p className="text-gray-600 mb-4">Thank you {user?.name || user?.email}! Your order has been placed successfully.</p>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-800">
                Order Total: ₹{getTotalPrice()}
              </p>
              <p className="text-xs text-green-600 mt-1">
                Your order has been added to Recent Orders
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
