
'use client';

import { useState } from 'react';
import Navigation from '../../components/Navigation';

export default function Sticker() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAddedNotification, setShowAddedNotification] = useState(false);
  
  const categories = ['All', 'Mobile Stickers', 'Wall Stickers', 'Laptop Stickers', 'Bike Stickers'];
  
  const stickers = [
    { id: 1, name: 'iPhone Marvel Pack', price: 49, category: 'Mobile Stickers', image: 'https://readdy.ai/api/search-image?query=Marvel%20superhero%20mobile%20phone%20stickers%20pack%20with%20Iron%20Man%20Spider-Man%20Captain%20America%20small%20colorful%20designs&width=300&height=300&seq=mobile1&orientation=squarish' },
    { id: 2, name: 'Quote Wall Sticker', price: 89, category: 'Wall Stickers', image: 'https://readdy.ai/api/search-image?query=Motivational%20quote%20wall%20sticker%20with%20elegant%20typography%20design%2C%20removable%20vinyl%20decal%20for%20home%20decoration&width=300&height=300&seq=wall1&orientation=squarish' },
    { id: 3, name: 'Gaming Laptop Set', price: 59, category: 'Laptop Stickers', image: 'https://readdy.ai/api/search-image?query=Gaming%20laptop%20stickers%20pack%20with%20controller%20joystick%20gaming%20icons%2C%20colorful%20vinyl%20stickers%20for%20gamers&width=300&height=300&seq=laptop1&orientation=squarish' },
    { id: 4, name: 'Royal Enfield Badge', price: 79, category: 'Bike Stickers', image: 'https://readdy.ai/api/search-image?query=Royal%20Enfield%20motorcycle%20bike%20sticker%20with%20vintage%20logo%20design%2C%20weatherproof%20vinyl%20decal%20for%20bikes&width=300&height=300&seq=bike1&orientation=squarish' },
    { id: 5, name: 'DC Heroes Mobile', price: 49, category: 'Mobile Stickers', image: 'https://readdy.ai/api/search-image?query=DC%20Comics%20superhero%20mobile%20stickers%20with%20Batman%20Superman%20Wonder%20Woman%20small%20colorful%20phone%20decorations&width=300&height=300&seq=mobile2&orientation=squarish' },
    { id: 6, name: 'Floral Wall Art', price: 129, category: 'Wall Stickers', image: 'https://readdy.ai/api/search-image?query=Beautiful%20floral%20wall%20sticker%20with%20roses%20and%20leaves%20design%2C%20elegant%20home%20decor%20vinyl%20wall%20art&width=300&height=300&seq=wall2&orientation=squarish' },
    { id: 7, name: 'Tech Brand Logos', price: 39, category: 'Laptop Stickers', image: 'https://readdy.ai/api/search-image?query=Tech%20company%20logo%20laptop%20stickers%20pack%20with%20Apple%20Google%20Microsoft%20brand%20logos%2C%20professional%20look&width=300&height=300&seq=laptop2&orientation=squarish' },
    { id: 8, name: 'KTM Racing Decal', price: 99, category: 'Bike Stickers', image: 'https://readdy.ai/api/search-image?query=KTM%20racing%20motorcycle%20sticker%20with%20orange%20and%20black%20colors%2C%20speed%20design%20for%20sports%20bikes&width=300&height=300&seq=bike2&orientation=squarish' },
    { id: 9, name: 'Cute Animals Pack', price: 29, category: 'Mobile Stickers', image: 'https://readdy.ai/api/search-image?query=Cute%20cartoon%20animals%20mobile%20stickers%20pack%20with%20kawaii%20cats%20dogs%20pandas%2C%20adorable%20phone%20decorations&width=300&height=300&seq=mobile3&orientation=squarish' },
    { id: 10, name: 'World Map Sticker', price: 199, category: 'Wall Stickers', image: 'https://readdy.ai/api/search-image?query=World%20map%20wall%20sticker%20with%20countries%20and%20continents%2C%20educational%20home%20office%20decor%20vinyl%20decal&width=300&height=300&seq=wall3&orientation=squarish' },
    { id: 11, name: 'Coding Stickers', price: 69, category: 'Laptop Stickers', image: 'https://readdy.ai/api/search-image?query=Programming%20coding%20laptop%20stickers%20with%20HTML%20CSS%20JavaScript%20Python%20logos%2C%20developer%20sticker%20pack&width=300&height=300&seq=laptop3&orientation=squarish' },
    { id: 12, name: 'Harley Davidson', price: 149, category: 'Bike Stickers', image: 'https://readdy.ai/api/search-image?query=Harley%20Davidson%20motorcycle%20logo%20sticker%20with%20classic%20eagle%20design%2C%20premium%20bike%20decal%20for%20cruisers&width=300&height=300&seq=bike3&orientation=squarish' }
  ];

  const filteredStickers = selectedCategory === 'All' 
    ? stickers 
    : stickers.filter(sticker => sticker.category === selectedCategory);

  const handleAddToCart = (id: number) => {
    const sticker = stickers.find(s => s.id === id);
    if (!sticker) return;

    // Get existing cart items
    const existingCart = JSON.parse(localStorage.getItem('postora_cart') || '[]');
    
    // Check if sticker already exists in cart
    const existingItemIndex = existingCart.findIndex((item: any) => 
      item.id === `sticker-${id}` && item.type === 'Sticker'
    );

    if (existingItemIndex >= 0) {
      // Update quantity if item already exists
      existingCart[existingItemIndex].quantity += 1;
    } else {
      // Add new item to cart
      const cartItem = {
        id: `sticker-${id}`,
        name: sticker.name,
        price: sticker.price,
        quantity: 1,
        image: sticker.image,
        type: 'Sticker',
        category: sticker.category
      };
      existingCart.push(cartItem);
    }

    // Save updated cart
    localStorage.setItem('postora_cart', JSON.stringify(existingCart));
    
    // Show notification
    setShowAddedNotification(true);
    setTimeout(() => setShowAddedNotification(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Premium Stickers Collection</h1>
          <p className="text-xl text-gray-600">Personalize your devices and spaces with our high-quality stickers</p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Stickers Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {filteredStickers.map((sticker) => (
            <div key={sticker.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4">
              <div className="aspect-square overflow-hidden rounded-lg mb-3 bg-gray-100">
                <img 
                  src={sticker.image} 
                  alt={sticker.name}
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform cursor-pointer"
                />
              </div>
              <h3 className="font-medium text-gray-900 mb-1 text-sm">{sticker.name}</h3>
              <p className="text-xs text-gray-500 mb-2">{sticker.category}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-indigo-600">₹{sticker.price}</span>
                <button 
                  onClick={() => handleAddToCart(sticker.id)}
                  className="bg-indigo-600 text-white px-3 py-1 rounded-md text-xs font-medium hover:bg-indigo-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Special Offers */}
        <div className="mt-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Special Sticker Deals</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-bold mb-2">Buy 5 Get 1 Free</h3>
              <p className="text-sm">On all mobile stickers</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-bold mb-2">Bulk Orders</h3>
              <p className="text-sm">20% off on orders above ₹500</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-bold mb-2">Custom Design</h3>
              <p className="text-sm">Create your own sticker design</p>
            </div>
          </div>
        </div>
      </div>

      {/* Added to Cart Notification */}
      {showAddedNotification && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2">
          <i className="ri-check-line text-xl"></i>
          <span>Sticker added to cart!</span>
        </div>
      )}
    </div>
  );
}
