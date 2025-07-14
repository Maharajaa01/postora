
'use client';

import { useState } from 'react';
import Navigation from '../components/Navigation';
import PosterCard from '../components/PosterCard';

export default function Home() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [showAddedNotification, setShowAddedNotification] = useState(false);
  
  const filters = ['All', 'Marvel', 'DC', 'Tamil Cinema', 'Love'];
  
  const mockPosters = [
    { id: '1', title: 'Iron Man Poster', price: 149, image: 'https://readdy.ai/api/search-image?query=Iron%20Man%20superhero%20poster%20with%20red%20and%20gold%20armor%2C%20minimalist%20background%2C%20high%20quality%20design%20perfect%20for%20wall%20decoration&width=400&height=400&seq=ironman1&orientation=squarish', category: 'Marvel' },
    { id: '2', title: 'Batman Dark Knight', price: 179, image: 'https://readdy.ai/api/search-image?query=Batman%20dark%20knight%20poster%20with%20gothic%20atmosphere%2C%20black%20background%2C%20dramatic%20lighting%2C%20perfect%20wall%20art%20design&width=400&height=400&seq=batman1&orientation=squarish', category: 'DC' },
    { id: '3', title: 'Vijay Thalapathy', price: 199, image: 'https://readdy.ai/api/search-image?query=Tamil%20cinema%20actor%20Vijay%20stylish%20poster%20with%20vibrant%20colors%2C%20dynamic%20pose%2C%20cinematic%20background%20design%20for%20wall%20decoration&width=400&height=400&seq=vijay1&orientation=squarish', category: 'Tamil Cinema' },
    { id: '4', title: 'Love Quote Poster', price: 129, image: 'https://readdy.ai/api/search-image?query=Romantic%20love%20quote%20poster%20with%20soft%20pastel%20colors%2C%20elegant%20typography%2C%20heart%20elements%2C%20perfect%20for%20bedroom%20wall%20decor&width=400&height=400&seq=love1&orientation=squarish', category: 'Love' },
    { id: '5', title: 'Spider-Man Web', price: 159, image: 'https://readdy.ai/api/search-image?query=Spider-Man%20action%20poster%20with%20web%20shooting%20pose%2C%20city%20background%2C%20red%20and%20blue%20colors%2C%20dynamic%20superhero%20wall%20art&width=400&height=400&seq=spiderman1&orientation=squarish', category: 'Marvel' },
    { id: '6', title: 'Wonder Woman', price: 169, image: 'https://readdy.ai/api/search-image?query=Wonder%20Woman%20powerful%20poster%20with%20golden%20lasso%2C%20warrior%20pose%2C%20heroic%20background%2C%20DC%20comics%20wall%20art%20design&width=400&height=400&seq=wonderwoman1&orientation=squarish', category: 'DC' },
    { id: '7', title: 'Rajinikanth Style', price: 249, image: 'https://readdy.ai/api/search-image?query=Rajinikanth%20superstar%20poster%20with%20iconic%20style%2C%20sunglasses%2C%20cigarette%2C%20Tamil%20cinema%20legend%20wall%20decoration%20art&width=400&height=400&seq=rajini1&orientation=squarish', category: 'Tamil Cinema' },
    { id: '8', title: 'Couple Goals', price: 139, image: 'https://readdy.ai/api/search-image?query=Cute%20couple%20illustration%20poster%20with%20romantic%20theme%2C%20soft%20colors%2C%20love%20symbols%2C%20perfect%20wall%20art%20for%20couples&width=400&height=400&seq=couple1&orientation=squarish', category: 'Love' },
    { id: '9', title: 'Captain America', price: 149, image: 'https://readdy.ai/api/search-image?query=Captain%20America%20shield%20poster%20with%20patriotic%20colors%2C%20star%20design%2C%20heroic%20background%2C%20Marvel%20superhero%20wall%20art&width=400&height=400&seq=cap1&orientation=squarish', category: 'Marvel' },
    { id: '10', title: 'The Flash Speed', price: 159, image: 'https://readdy.ai/api/search-image?query=The%20Flash%20running%20poster%20with%20lightning%20effects%2C%20red%20costume%2C%20speed%20force%20background%2C%20DC%20superhero%20wall%20decoration&width=400&height=400&seq=flash1&orientation=squarish', category: 'DC' },
    { id: '11', title: 'Suriya Mass', price: 189, image: 'https://readdy.ai/api/search-image?query=Suriya%20Tamil%20actor%20poster%20with%20mass%20appeal%2C%20stylish%20look%2C%20cinematic%20background%2C%20Tamil%20cinema%20wall%20art%20design&width=400&height=400&seq=suriya1&orientation=squarish', category: 'Tamil Cinema' },
    { id: '12', title: 'Forever Love', price: 119, image: 'https://readdy.ai/api/search-image?query=Forever%20love%20typography%20poster%20with%20infinity%20symbol%2C%20romantic%20colors%2C%20elegant%20design%2C%20perfect%20bedroom%20wall%20decor&width=400&height=400&seq=forever1&orientation=squarish', category: 'Love' },
    { id: '13', title: 'Thor Hammer', price: 169, image: 'https://readdy.ai/api/search-image?query=Thor%20hammer%20Mjolnir%20poster%20with%20lightning%20effects%2C%20Norse%20mythology%20design%2C%20powerful%20background%2C%20Marvel%20wall%20art&width=400&height=400&seq=thor1&orientation=squarish', category: 'Marvel' },
    { id: '14', title: 'Joker Smile', price: 199, image: 'https://readdy.ai/api/search-image?query=Joker%20villain%20poster%20with%20maniacal%20smile%2C%20purple%20and%20green%20colors%2C%20chaotic%20background%2C%20DC%20comics%20wall%20decoration&width=400&height=400&seq=joker1&orientation=squarish', category: 'DC' }
  ];

  const filteredPosters = selectedFilter === 'All' 
    ? mockPosters 
    : mockPosters.filter(poster => poster.category === selectedFilter);

  const handleAddToCart = (id: string) => {
    const poster = mockPosters.find(p => p.id === id);
    if (!poster) return;

    // Get existing cart items
    const existingCart = JSON.parse(localStorage.getItem('postora_cart') || '[]');
    
    // Check if poster already exists in cart
    const existingItemIndex = existingCart.findIndex((item: any) => item.id === id);

    if (existingItemIndex >= 0) {
      // Update quantity if item already exists
      existingCart[existingItemIndex].quantity += 1;
    } else {
      // Add new item to cart
      const cartItem = {
        id: poster.id,
        name: poster.title,
        price: poster.price,
        quantity: 1,
        image: poster.image,
        type: 'Poster'
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
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Transform Your Walls</h1>
          <p className="text-xl md:text-2xl mb-8">Premium Posters, Stickers & Frames</p>
          <div className="bg-yellow-400 text-black inline-block px-8 py-4 rounded-full text-xl font-bold animate-pulse">
            🎉 Special Offer: Buy 5 Posters for ₹399 🎉
          </div>
        </div>
      </div>

      {/* Poster Showcase */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Posters</h2>
        
        {/* First Row */}
        <div className="overflow-x-auto mb-8">
          <div className="flex space-x-4 pb-4" style={{ width: 'max-content' }}>
            {mockPosters.slice(0, 7).map((poster) => (
              <PosterCard
                key={poster.id}
                id={poster.id}
                title={poster.title}
                price={poster.price}
                image={poster.image}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>

        {/* Second Row */}
        <div className="overflow-x-auto mb-12">
          <div className="flex space-x-4 pb-4" style={{ width: 'max-content' }}>
            {mockPosters.slice(7, 14).map((poster) => (
              <PosterCard
                key={poster.id}
                id={poster.id}
                title={poster.title}
                price={poster.price}
                image={poster.image}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>

        {/* Filter Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Browse by Category</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  selectedFilter === filter
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Filtered Posters Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredPosters.map((poster) => (
            <PosterCard
              key={poster.id}
              id={poster.id}
              title={poster.title}
              price={poster.price}
              image={poster.image}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>

      {/* Added to Cart Notification */}
      {showAddedNotification && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2">
          <i className="ri-check-line text-xl"></i>
          <span>Added to cart!</span>
        </div>
      )}
    </div>
  );
}
