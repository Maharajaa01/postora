'use client';

import { useState } from 'react';
import Navigation from '../../components/Navigation';

export default function CustomPoster() {
  const [selectedSize, setSelectedSize] = useState('A3');
  const [selectedTemplate, setSelectedTemplate] = useState(1);
  const [customText, setCustomText] = useState('');
  const [selectedColor, setSelectedColor] = useState('#4F46E5');
  const [showAddedNotification, setShowAddedNotification] = useState(false);

  const sizes = [
    { name: 'A4', dimensions: '21cm × 29.7cm', price: 199 },
    { name: 'A3', dimensions: '29.7cm × 42cm', price: 299 },
    { name: 'A2', dimensions: '42cm × 59.4cm', price: 499 }
  ];

  const templates = [
    {
      id: 1,
      name: 'Motivational Quote',
      image: 'https://readdy.ai/api/search-image?query=Custom%20motivational%20quote%20poster%20template%20with%20elegant%20typography%2C%20inspirational%20design%2C%20customizable%20text%20space%20for%20personal%20quotes&width=400&height=500&seq=custom1&orientation=portrait',
      description: 'Perfect for inspiring quotes and motivational text'
    },
    {
      id: 2,
      name: 'Love & Romance',
      image: 'https://readdy.ai/api/search-image?query=Custom%20romantic%20poster%20template%20with%20heart%20elements%2C%20soft%20colors%2C%20personalized%20love%20quote%20design%20for%20couples&width=400&height=500&seq=custom2&orientation=portrait',
      description: 'Ideal for romantic messages and couple names'
    },
    {
      id: 3,
      name: 'Family Photo',
      image: 'https://readdy.ai/api/search-image?query=Custom%20family%20photo%20poster%20template%20with%20decorative%20frames%2C%20family%20tree%20design%2C%20personalized%20text%20space%20for%20names&width=400&height=500&seq=custom3&orientation=portrait',
      description: 'Great for family photos with custom text'
    },
    {
      id: 4,
      name: 'Birthday Special',
      image: 'https://readdy.ai/api/search-image?query=Custom%20birthday%20poster%20template%20with%20celebration%20elements%2C%20balloons%2C%20cake%20design%2C%20personalized%20birthday%20message%20space&width=400&height=500&seq=custom4&orientation=portrait',
      description: 'Perfect for birthday celebrations and wishes'
    },
    {
      id: 5,
      name: 'Business Branding',
      image: 'https://readdy.ai/api/search-image?query=Custom%20business%20poster%20template%20with%20professional%20design%2C%20company%20logo%20space%2C%20branded%20colors%2C%20corporate%20style&width=400&height=500&seq=custom5&orientation=portrait',
      description: 'Professional design for business use'
    },
    {
      id: 6,
      name: 'Sports Team',
      image: 'https://readdy.ai/api/search-image?query=Custom%20sports%20poster%20template%20with%20team%20colors%2C%20athletic%20design%2C%20player%20name%20and%20number%20customization%20space&width=400&height=500&seq=custom6&orientation=portrait',
      description: 'Perfect for sports teams and athletes'
    }
  ];

  const colors = [
    '#4F46E5', '#DC2626', '#059669', '#D97706', 
    '#7C3AED', '#DB2777', '#0891B2', '#65A30D'
  ];

  const handleAddToCart = () => {
    const selectedSizeData = sizes.find(s => s.name === selectedSize);
    const selectedTemplateData = templates.find(t => t.id === selectedTemplate);
    
    if (!selectedSizeData || !selectedTemplateData) return;

    // Get existing cart items
    const existingCart = JSON.parse(localStorage.getItem('postora_cart') || '[]');
    
    // Create unique ID for custom poster
    const uniqueId = `custom-${Date.now()}`;
    
    // Add new item to cart
    const cartItem = {
      id: uniqueId,
      name: `Custom ${selectedTemplateData.name} (${selectedSize})`,
      price: selectedSizeData.price,
      quantity: 1,
      image: selectedTemplateData.image,
      type: 'Custom Poster',
      size: selectedSize,
      customization: {
        template: selectedTemplateData.name,
        text: customText || 'Custom Text',
        color: selectedColor
      }
    };
    
    existingCart.push(cartItem);

    // Save updated cart
    localStorage.setItem('postora_cart', JSON.stringify(existingCart));
    
    // Show notification
    setShowAddedNotification(true);
    setTimeout(() => setShowAddedNotification(false), 2000);
  };

  const selectedSizeData = sizes.find(s => s.name === selectedSize);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Custom Poster Designer</h1>
          <p className="text-xl text-gray-600">Create your own personalized posters with custom text and designs</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Design Panel */}
          <div className="lg:col-span-2">
            {/* Template Selection */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Choose Template</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {templates.map((template) => (
                  <div 
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                      selectedTemplate === template.id 
                        ? 'border-indigo-600 ring-2 ring-indigo-200' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="aspect-[4/5] overflow-hidden bg-gray-100">
                      <img 
                        src={template.image} 
                        alt={template.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-gray-900 mb-1">{template.name}</h3>
                      <p className="text-xs text-gray-500">{template.description}</p>
                    </div>
                    {selectedTemplate === template.id && (
                      <div className="absolute top-2 right-2">
                        <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                          <i className="ri-check-line text-white text-sm"></i>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Customization Options */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Customize Your Poster</h2>
              
              {/* Custom Text */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Custom Text</label>
                <textarea
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="Enter your custom text here..."
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  rows={3}
                  maxLength={500}
                />
                <p className="text-xs text-gray-500 mt-1">{customText.length}/500 characters</p>
              </div>

              {/* Color Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Text Color</label>
                <div className="flex space-x-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 cursor-pointer ${
                        selectedColor === color ? 'border-gray-400' : 'border-gray-200'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Size</label>
                <div className="grid grid-cols-3 gap-3">
                  {sizes.map((size) => (
                    <button
                      key={size.name}
                      onClick={() => setSelectedSize(size.name)}
                      className={`p-3 text-center border rounded-lg cursor-pointer transition-colors ${
                        selectedSize === size.name
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="font-medium">{size.name}</div>
                      <div className="text-xs text-gray-500">{size.dimensions}</div>
                      <div className="text-sm font-bold text-indigo-600">₹{size.price}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Preview and Order */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Preview</h2>
              
              {/* Preview Image */}
              <div className="aspect-[4/5] overflow-hidden rounded-lg mb-4 bg-gray-100 border">
                <img 
                  src={templates.find(t => t.id === selectedTemplate)?.image || ''} 
                  alt="Preview"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Order Details */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Template</span>
                  <span className="font-medium">{templates.find(t => t.id === selectedTemplate)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Size</span>
                  <span className="font-medium">{selectedSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Custom Text</span>
                  <span className="font-medium text-right text-sm">
                    {customText ? 'Yes' : 'Standard'}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-xl font-bold text-indigo-600">₹{selectedSizeData?.price}</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleAddToCart}
                className="w-full bg-indigo-600 text-white py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors cursor-pointer whitespace-nowrap mb-4"
              >
                Add to Cart
              </button>

              {/* Features */}
              <div className="text-sm text-gray-600 space-y-2">
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  High-quality printing
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  Fast delivery
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  Custom design support
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Added to Cart Notification */}
      {showAddedNotification && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2">
          <i className="ri-check-line text-xl"></i>
          <span>Custom poster added to cart!</span>
        </div>
      )}
    </div>
  );
}