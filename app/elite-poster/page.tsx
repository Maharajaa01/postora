
'use client';

import { useState } from 'react';
import Navigation from '../../components/Navigation';

export default function ElitePoster() {
  const [selectedSize, setSelectedSize] = useState('A3');
  const [showAddedNotification, setShowAddedNotification] = useState(false);
  
  const elitePosters = [
    {
      id: 1,
      title: 'Premium Iron Man Arc Reactor',
      price: { A4: 299, A3: 399, A2: 599 },
      image: 'https://readdy.ai/api/search-image?query=Premium%20Iron%20Man%20arc%20reactor%20poster%20with%20glowing%20blue%20energy%2C%20metallic%20frame%20effect%2C%20high%20resolution%20cinematic%20quality%20wall%20art&width=400&height=500&seq=elite1&orientation=portrait',
      description: 'Museum-quality print with metallic finish and LED-like glow effect',
      features: ['Metallic Finish', 'Glow Effect', 'Premium Paper', 'Ready to Frame']
    },
    {
      id: 2,
      title: 'Luxury Batman Gotham View',
      price: { A4: 349, A3: 449, A2: 649 },
      image: 'https://readdy.ai/api/search-image?query=Luxury%20Batman%20poster%20with%20Gotham%20city%20skyline%20at%20night%2C%20premium%20dark%20knight%20silhouette%2C%20cinematic%20lighting%2C%20high-end%20wall%20art&width=400&height=500&seq=elite2&orientation=portrait',
      description: 'Premium canvas print with textured finish and deep black tones',
      features: ['Canvas Print', 'Textured Finish', 'Deep Colors', 'Gallery Quality']
    },
    {
      id: 3,
      title: 'Elite Rajinikanth Portrait',
      price: { A4: 399, A3: 499, A2: 699 },
      image: 'https://readdy.ai/api/search-image?query=Elite%20Rajinikanth%20superstar%20portrait%20with%20vintage%20film%20grain%20effect%2C%20classic%20pose%20with%20sunglasses%2C%20premium%20Tamil%20cinema%20artwork&width=400&height=500&seq=elite3&orientation=portrait',
      description: 'Hand-finished premium print with vintage film grain texture',
      features: ['Film Grain Effect', 'Hand Finished', 'Vintage Style', 'Collector Quality']
    },
    {
      id: 4,
      title: 'Royal Love Typography',
      price: { A4: 249, A3: 349, A2: 549 },
      image: 'https://readdy.ai/api/search-image?query=Royal%20love%20typography%20poster%20with%20gold%20foil%20effect%2C%20elegant%20script%20lettering%2C%20luxury%20romantic%20design%20for%20premium%20home%20decor&width=400&height=500&seq=elite4&orientation=portrait',
      description: 'Luxury foil-pressed typography with gold accents',
      features: ['Gold Foil', 'Luxury Typography', 'Romantic Design', 'Premium Finish']
    },
    {
      id: 5,
      title: 'Masterpiece Spider-Man',
      price: { A4: 329, A3: 429, A2: 629 },
      image: 'https://readdy.ai/api/search-image?query=Masterpiece%20Spider-Man%20poster%20with%20web%20pattern%20embossed%20effect%2C%20dynamic%20action%20pose%2C%20premium%20superhero%20wall%20art%20with%20texture&width=400&height=500&seq=elite5&orientation=portrait',
      description: 'Embossed web pattern with premium texture finish',
      features: ['Embossed Pattern', 'Texture Finish', 'Dynamic Design', 'Museum Quality']
    },
    {
      id: 6,
      title: 'Elite Wonder Woman',
      price: { A4: 369, A3: 469, A2: 669 },
      image: 'https://readdy.ai/api/search-image?query=Elite%20Wonder%20Woman%20poster%20with%20golden%20armor%20details%2C%20warrior%20princess%20pose%2C%20premium%20DC%20artwork%20with%20metallic%20accents&width=400&height=500&seq=elite6&orientation=portrait',
      description: 'Premium print with metallic gold accent details',
      features: ['Metallic Accents', 'Golden Details', 'Warrior Theme', 'Premium Quality']
    }
  ];

  const handleAddToCart = (posterId: number) => {
    const poster = elitePosters.find(p => p.id === posterId);
    if (!poster) return;

    // Get existing cart items
    const existingCart = JSON.parse(localStorage.getItem('postora_cart') || '[]');
    
    // Create unique ID for elite poster with size
    const uniqueId = `elite-${posterId}-${selectedSize}`;
    const price = poster.price[selectedSize as keyof typeof poster.price];
    
    // Check if poster already exists in cart
    const existingItemIndex = existingCart.findIndex((item: any) => item.id === uniqueId);

    if (existingItemIndex >= 0) {
      // Update quantity if item already exists
      existingCart[existingItemIndex].quantity += 1;
    } else {
      // Add new item to cart
      const cartItem = {
        id: uniqueId,
        name: `${poster.title} (${selectedSize})`,
        price: price,
        quantity: 1,
        image: poster.image,
        type: 'Elite Poster',
        size: selectedSize,
        features: poster.features
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
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Elite Poster Collection</h1>
          <p className="text-xl text-gray-600 mb-6">Premium quality posters with luxury finishes and exclusive designs</p>
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black inline-block px-8 py-3 rounded-full font-bold">
            ✨ Museum Quality • Hand Finished • Limited Edition ✨
          </div>
        </div>

        {/* Size Selector */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-12">
          <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Select Your Preferred Size</h3>
          <div className="flex justify-center space-x-4">
            {['A4', 'A3', 'A2'].map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  selectedSize === size
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {size === 'A4' && '21cm × 29.7cm'}
                {size === 'A3' && '29.7cm × 42cm'}
                {size === 'A2' && '42cm × 59.4cm'}
                <div className="text-xs">{size}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Elite Posters Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {elitePosters.map((poster) => (
            <div key={poster.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative">
                <div className="aspect-[4/5] overflow-hidden bg-gray-100">
                  <img 
                    src={poster.image} 
                    alt={poster.title}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform cursor-pointer"
                  />
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-bold">
                    ELITE
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{poster.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{poster.description}</p>
                
                {/* Features */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {poster.features.map((feature, index) => (
                      <span key={index} className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Price and Cart */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-indigo-600">
                      ₹{poster.price[selectedSize as keyof typeof poster.price]}
                    </span>
                    <span className="text-gray-500 text-sm ml-2">({selectedSize})</span>
                  </div>
                  <button 
                    onClick={() => handleAddToCart(poster.id)}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-md font-medium hover:from-indigo-700 hover:to-purple-700 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Premium Features */}
        <div className="mt-16 bg-gradient-to-r from-indigo-900 to-purple-900 rounded-lg p-8 text-white">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose Elite Posters?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-white/10 rounded-full">
                <i className="ri-award-line text-2xl"></i>
              </div>
              <h3 className="font-bold mb-2">Museum Quality</h3>
              <p className="text-sm text-gray-300">Professional grade materials and printing techniques</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-white/10 rounded-full">
                <i className="ri-hand-heart-line text-2xl"></i>
              </div>
              <h3 className="font-bold mb-2">Hand Finished</h3>
              <p className="text-sm text-gray-300">Each poster is carefully inspected and finished by hand</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-white/10 rounded-full">
                <i className="ri-time-line text-2xl"></i>
              </div>
              <h3 className="font-bold mb-2">Archival Quality</h3>
              <p className="text-sm text-gray-300">Fade-resistant inks and papers for lasting beauty</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-white/10 rounded-full">
                <i className="ri-shield-check-line text-2xl"></i>
              </div>
              <h3 className="font-bold mb-2">Satisfaction Guarantee</h3>
              <p className="text-sm text-gray-300">100% satisfaction or your money back</p>
            </div>
          </div>
        </div>
      </div>

      {/* Added to Cart Notification */}
      {showAddedNotification && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2">
          <i className="ri-check-line text-xl"></i>
          <span>Elite poster added to cart!</span>
        </div>
      )}
    </div>
  );
}
