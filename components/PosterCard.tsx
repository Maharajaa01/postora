'use client';

interface PosterCardProps {
  id: string;
  title: string;
  price: number;
  image: string;
  onAddToCart: (id: string) => void;
}

export default function PosterCard({ id, title, price, image, onAddToCart }: PosterCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 min-w-[200px]">
      <div className="aspect-square overflow-hidden rounded-lg mb-3">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover object-top hover:scale-105 transition-transform cursor-pointer"
        />
      </div>
      <h3 className="font-medium text-gray-900 mb-2 text-sm truncate">{title}</h3>
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold text-indigo-600">₹{price}</span>
        <button 
          onClick={() => onAddToCart(id)}
          className="bg-indigo-600 text-white px-3 py-1 rounded-md text-xs font-medium hover:bg-indigo-700 transition-colors cursor-pointer whitespace-nowrap"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}