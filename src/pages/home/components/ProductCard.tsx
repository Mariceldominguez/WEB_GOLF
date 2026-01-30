import { useState } from 'react';
import { useCart } from '../../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  badge: string;
  stock: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();

  const handleQuantityChange = (value: number) => {
    const newQuantity = Math.max(1, Math.min(value, product.stock));
    setQuantity(newQuantity);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, quantity);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleCardClick = () => {
    navigate(`/producto/${product.id}`);
  };

  return (
    <>
      {showNotification && (
        <div className="fixed top-24 right-4 bg-emerald-600 text-white px-6 py-4 rounded-lg shadow-lg z-50 animate-fade-in">
          <div className="flex items-center gap-3">
            <i className="ri-check-line text-2xl"></i>
            <span className="font-medium">Producto agregado al carrito</span>
          </div>
        </div>
      )}

      <div 
        onClick={handleCardClick}
        className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer h-full flex flex-col"
      >
        <div className="relative overflow-hidden aspect-square">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {product.badge && (
            <div className="absolute top-3 left-3 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
              {product.badge}
            </div>
          )}
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-2 flex-grow">{product.description}</p>

          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl font-bold text-emerald-600">
              ${product.price.toFixed(2)}
            </span>
            {product.stock > 0 ? (
              <span className="text-sm text-gray-600">Stock: {product.stock}</span>
            ) : (
              <span className="text-sm text-red-600 font-semibold">Sin stock</span>
            )}
          </div>

          <div className="space-y-3 mt-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <i className="ri-subtract-line"></i>
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => handleQuantityChange(Number(e.target.value))}
                className="w-16 h-10 text-center border-2 border-gray-200 rounded-lg font-semibold focus:outline-none focus:border-emerald-500"
                min="1"
                max={product.stock}
              />
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= product.stock}
                className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <i className="ri-add-line"></i>
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <i className="ri-shopping-cart-line text-xl"></i>
              {product.stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;