'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AuthModal from './AuthModal';

export default function Navigation() {
  const [logoAnimated, setLogoAnimated] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<{
    email: string;
    isAdmin: boolean;
    name?: string;
  } | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLogoAnimated(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Load user from localStorage on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('postora_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (email: string, password: string, isAdmin = false) => {
    if (isAdmin) {
      // Admin login validation
      if (email === 'Administrator' && password === 'admin') {
        const adminUser = { email: 'Administrator', isAdmin: true, name: 'Admin' };
        setUser(adminUser);
        localStorage.setItem('postora_user', JSON.stringify(adminUser));
        setIsAuthModalOpen(false);
        alert('Admin login successful!');
      } else {
        alert('Invalid admin credentials');
      }
    } else {
      // Regular user login - check if user exists in localStorage
      const users = JSON.parse(localStorage.getItem('postora_users') || '[]');
      const foundUser = users.find((u: any) => 
        (u.email === email || u.phone === email) && u.password === password
      );
      
      if (foundUser) {
        const loggedInUser = { 
          email: foundUser.email, 
          isAdmin: false, 
          name: foundUser.email.split('@')[0] 
        };
        setUser(loggedInUser);
        localStorage.setItem('postora_user', JSON.stringify(loggedInUser));
        setIsAuthModalOpen(false);
        alert('Login successful!');
      } else {
        alert('Invalid credentials. Please check your email/phone and password.');
      }
    }
  };

  const handleRegister = (email: string, password: string, phone?: string) => {
    // Save user to localStorage
    const users = JSON.parse(localStorage.getItem('postora_users') || '[]');
    
    // Check if user already exists
    const existingUser = users.find((u: any) => u.email === email || u.phone === phone);
    if (existingUser) {
      alert('User already exists with this email or phone number');
      return;
    }
    
    const newUser = { email, password, phone, createdAt: new Date().toISOString() };
    users.push(newUser);
    localStorage.setItem('postora_users', JSON.stringify(users));
    
    // Auto login after registration
    const loggedInUser = { 
      email, 
      isAdmin: false, 
      name: email.split('@')[0] 
    };
    setUser(loggedInUser);
    localStorage.setItem('postora_user', JSON.stringify(loggedInUser));
    setIsAuthModalOpen(false);
    alert('Account created successfully!');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('postora_user');
    alert('Logged out successfully!');
  };

  return (
    <>
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Animated Logo */}
            <Link href="/" className="flex items-center">
              <div className="text-2xl font-bold text-indigo-600 font-pacifico">
                <span 
                  className={`inline-block transition-all duration-500 ${
                    logoAnimated ? 'animate-bounce' : 'opacity-0'
                  }`}
                >
                  P
                </span>
                <span 
                  className={`inline-block transition-all duration-700 delay-300 ${
                    logoAnimated ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                  }`}
                >
                  ostora
                </span>
              </div>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer">
                Home
              </Link>
              <Link href="/custom-poster" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer">
                Custom Poster
              </Link>
              <Link href="/bulk-poster" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer">
                Bulk Poster
              </Link>
              <Link href="/sticker" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer">
                Sticker
              </Link>
              <Link href="/elite-poster" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer">
                Elite Poster
              </Link>
            </div>

            {/* Right Side - Cart, Auth, Admin */}
            <div className="flex items-center space-x-4">
              <Link href="/cart" className="text-gray-700 hover:text-indigo-600 cursor-pointer">
                <div className="w-6 h-6 flex items-center justify-center">
                  <i className="ri-shopping-cart-line text-xl"></i>
                </div>
              </Link>

              {user ? (
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-700">
                    Hi, {user.name || user.email}
                  </span>
                  {user.isAdmin && (
                    <Link href="/admin" className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors cursor-pointer whitespace-nowrap">
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="text-gray-700 hover:text-red-600 cursor-pointer whitespace-nowrap"
                  >
                    <div className="w-6 h-6 flex items-center justify-center">
                      <i className="ri-logout-box-line text-xl"></i>
                    </div>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Login / Register
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
    </>
  );
}