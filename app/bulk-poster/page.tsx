
'use client';

import { useState } from 'react';
import Navigation from '../../components/Navigation';

export default function BulkPoster() {
  const [currentBundle, setCurrentBundle] = useState(0);
  const [showAddedNotification, setShowAddedNotification] = useState(false);

  const bundles = [
    {
      id: 1,
      title: "Marvel Heroes Collection",
      price: 399,
      originalPrice: 596,
      posters: [
        { name: "Iron Man", image: "https://readdy.ai/api/search-image?query=Iron%20Man%20superhero%20poster%20with%20red%20and%20gold%20armor%20flying%20pose%2C%20cinematic%20background%2C%20high%20quality%20marvel%20wall%20art%20design&width=300&height=400&seq=bundle1a&orientation=portrait" },
        { name: "Captain America", image: "https://readdy.ai/api/search-image?query=Captain%20America%20shield%20poster%20with%20patriotic%20red%20white%20blue%20colors%2C%20heroic%20stance%2C%20action%20scene%20background&width=300&height=400&seq=bundle1b&orientation=portrait" },
        { name: "Thor", image: "https://readdy.ai/api/search-image?query=Thor%20god%20of%20thunder%20poster%20with%20hammer%20mjolnir%2C%20lightning%20effects%2C%20asgard%20background%2C%20powerful%20warrior%20pose&width=300&height=400&seq=bundle1c&orientation=portrait" },
        { name: "Spider-Man", image: "https://readdy.ai/api/search-image?query=Spider-Man%20web%20slinging%20poster%20with%20dynamic%20action%20pose%2C%20city%20skyline%20background%2C%20red%20and%20blue%20costume&width=300&height=400&seq=bundle1d&orientation=portrait" }
      ]
    },
    {
      id: 2,
      title: "DC Justice League",
      price: 399,
      originalPrice: 596,
      posters: [
        { name: "Batman", image: "https://readdy.ai/api/search-image?query=Batman%20dark%20knight%20poster%20with%20cape%20flowing%2C%20gotham%20city%20background%2C%20dramatic%20noir%20lighting%2C%20brooding%20hero&width=300&height=400&seq=bundle2a&orientation=portrait" },
        { name: "Superman", image: "https://readdy.ai/api/search-image?query=Superman%20man%20of%20steel%20poster%20with%20cape%20flying%2C%20blue%20and%20red%20costume%2C%20heroic%20pose%2C%20sky%20background&width=300&height=400&seq=bundle2b&orientation=portrait" },
        { name: "Wonder Woman", image: "https://readdy.ai/api/search-image?query=Wonder%20Woman%20warrior%20princess%20poster%20with%20golden%20lasso%2C%20armor%20and%20tiara%2C%20powerful%20stance%2C%20ancient%20background&width=300&height=400&seq=bundle2c&orientation=portrait" }
      ]
    },
    {
      id: 3,
      title: "Tamil Cinema Legends",
      price: 399,
      originalPrice: 676,
      posters: [
        { name: "Rajinikanth", image: "https://readdy.ai/api/search-image?query=Rajinikanth%20superstar%20poster%20with%20iconic%20sunglasses%20and%20style%2C%20cigarette%20pose%2C%20mass%20appeal%20background%20design&width=300&height=400&seq=bundle3a&orientation=portrait" },
        { name: "Vijay", image: "https://readdy.ai/api/search-image?query=Vijay%20thalapathy%20actor%20poster%20with%20stylish%20look%2C%20dynamic%20pose%2C%20colorful%20cinematic%20background%2C%20tamil%20cinema%20star&width=300&height=400&seq=bundle3b&orientation=portrait" },
        { name: "Suriya", image: "https://readdy.ai/api/search-image?query=Suriya%20tamil%20actor%20poster%20with%20intense%20expression%2C%20action%20hero%20pose%2C%20dramatic%20lighting%2C%20mass%20appeal%20design&width=300&height=400&seq=bundle3c&orientation=portrait" },
        { name: "Ajith", image: "https://readdy.ai/api/search-image?query=Ajith%20kumar%20thala%20poster%20with%20cool%20attitude%2C%20stylish%20look%2C%20bike%20background%2C%20ultimate%20star%20design&width=300&height=400&seq=bundle3d&orientation=portrait" }
      ]
    },
    {
      id: 4,
      title: "Love & Romance Set",
      price: 299,
      originalPrice: 516,
      posters: [
        { name: "Forever Love", image: "https://readdy.ai/api/search-image?query=Forever%20love%20typography%20poster%20with%20infinity%20symbol%2C%20romantic%20pink%20and%20gold%20colors%2C%20elegant%20design%20for%20couples&width=300&height=400&seq=bundle4a&orientation=portrait" },
        { name: "Couple Goals", image: "https://readdy.ai/api/search-image?query=Cute%20couple%20illustration%20poster%20with%20heart%20symbols%2C%20soft%20pastel%20colors%2C%20romantic%20theme%20for%20bedroom%20decor&width=300&height=400&seq=bundle4b&orientation=portrait" },
        { name: "You & Me", image: "https://readdy.ai/api/search-image?query=You%20and%20me%20romantic%20quote%20poster%20with%20beautiful%20typography%2C%20flowers%20background%2C%20love%20theme%20wall%20art&width=300&height=400&seq=bundle4c&orientation=portrait" }
      ]
    }
  ];

  const handleAddToCart = (bundleId: number) => {
    const bundle = bundles.find(b => b.id === bundleId);
    if (!bundle) return;

    // Get existing cart items
    const existingCart = JSON.parse(localStorage.getItem('postora_cart') || '[]');
    
    // Check if bundle already exists in cart
    const existingBundleIndex = existingCart.findIndex((item: any) => 
      item.id === `bundle-${bundleId}` && item.type === 'Bundle'
    );

    if (existingBundleIndex >= 0) {
      // Update quantity if bundle already exists
      existingCart[existingBundleIndex].quantity += 1;
    } else {
      // Add new bundle to cart
      const cartItem = {
        id: `bundle-${bundleId}`,
        name: bundle.title,
        price: bundle.price,
        quantity: 1,
        image: bundle.posters[0]?.image || '',
        type: 'Bundle',
        bundleDetails: {
          posters: bundle.posters,
          originalPrice: bundle.originalPrice,
          savings: bundle.originalPrice - bundle.price
        }
      };
      existingCart.push(cartItem);
    }

    // Save updated cart
    localStorage.setItem('postora_cart', JSON.stringify(existingCart));
    
    // Show notification
    setShowAddedNotification(true);
    setTimeout(() => setShowAddedNotification(false), 2000);
  };

  const nextBundle = () => {
    setCurrentBundle((prev) => (prev + 1) % bundles.length);
  };

  const prevBundle = () => {
    setCurrentBundle((prev) => (prev - 1 + bundles.length) % bundles.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Bulk Poster Collections</h1>
          <p className="text-xl text-gray-600">Get amazing poster bundles at unbeatable prices</p>
          <div className="bg-green-100 text-green-800 inline-block px-6 py-2 rounded-full mt-4 font-medium">
            Save up to 33% on bundle purchases!
          </div>
        </div>

        {/* Featured Bundle Carousel */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <div className="flex items-center justify-between mb-6">
            <button 
              onClick={prevBundle}
              className="w-12 h-12 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors cursor-pointer"
            >
              <i className="ri-arrow-left-line text-xl"></i>
            </button>
            
            <div className="flex-1 mx-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{bundles[currentBundle].title}</h2>
                <div className="flex items-center justify-center space-x-4">
                  <span className="text-3xl font-bold text-indigo-600">₹{bundles[currentBundle].price}</span>
                  <span className="text-lg text-gray-500 line-through">₹{bundles[currentBundle].originalPrice}</span>
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                    Save ₹{bundles[currentBundle].originalPrice - bundles[currentBundle].price}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                {bundles[currentBundle].posters.map((poster, index) => (
                  <div key={index} className="text-center">
                    <div className="aspect-[3/4] overflow-hidden rounded-lg mb-2 bg-gray-100">
                      <img 
                        src={poster.image} 
                        alt={poster.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <p className="text-sm font-medium text-gray-700">{poster.name}</p>
                  </div>
                ))}
              </div>
              
              <div className="text-center">
                <button 
                  onClick={() => handleAddToCart(bundles[currentBundle].id)}
                  className="bg-indigo-600 text-white px-8 py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors cursor-pointer whitespace-nowrap text-lg"
                >
                  Add Bundle to Cart
                </button>
              </div>
            </div>
            
            <button 
              onClick={nextBundle}
              className="w-12 h-12 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors cursor-pointer"
            >
              <i className="ri-arrow-right-line text-xl"></i>
            </button>
          </div>
          
          {/* Carousel Indicators */}
          <div className="flex justify-center space-x-2">
            {bundles.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBundle(index)}
                className={`w-3 h-3 rounded-full transition-colors cursor-pointer ${
                  index === currentBundle ? 'bg-indigo-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* All Bundles Grid */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">All Bundle Collections</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bundles.map((bundle) => (
              <div key={bundle.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{bundle.title}</h3>
                
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {bundle.posters.slice(0, 4).map((poster, index) => (
                    <div key={index} className="aspect-square overflow-hidden rounded-md bg-gray-100">
                      <img 
                        src={poster.image} 
                        alt={poster.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-indigo-600">₹{bundle.price}</span>
                    <span className="text-gray-500 line-through ml-2">₹{bundle.originalPrice}</span>
                  </div>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                    {bundle.posters.length} Posters
                  </span>
                </div>
                
                <button 
                  onClick={() => handleAddToCart(bundle.id)}
                  className="w-full bg-indigo-600 text-white py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Added to Cart Notification */}
      {showAddedNotification && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2">
          <i className="ri-check-line text-xl"></i>
          <span>Bundle added to cart!</span>
        </div>
      )}
    </div>
  );
}
