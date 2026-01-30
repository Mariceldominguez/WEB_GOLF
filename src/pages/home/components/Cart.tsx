import { useCart } from '../../../contexts/CartContext';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToCheckout: () => void;
}

const Cart = ({ isOpen, onClose, onProceedToCheckout }: CartProps) => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-50 cursor-pointer"
        onClick={onClose}
      ></div>
      
      <div className="fixed right-0 top-0 h-full w-full md:w-[480px] bg-white z-50 shadow-2xl overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Tu Carrito</h2>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <i className="ri-close-line text-2xl text-gray-700"></i>
            </button>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <i className="ri-shopping-bag-line text-5xl text-gray-400"></i>
              </div>
              <p className="text-gray-600 text-lg mb-2">Tu carrito está vacío</p>
              <p className="text-gray-400 text-sm">Agrega productos para comenzar</p>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-white">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 mb-1 truncate">
                        {item.name}
                      </h3>
                      <p className="text-[#2C5F2D] font-bold mb-2">
                        ${item.price.toFixed(2)}
                      </p>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                          <i className="ri-subtract-line text-sm"></i>
                        </button>
                        <span className="w-8 text-center font-semibold text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                          <i className="ri-add-line text-sm"></i>
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                    >
                      <i className="ri-delete-bin-line text-xl"></i>
                    </button>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-6 space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Envío</span>
                  <span className="font-semibold">Gratis</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-900 pt-3 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-[#2C5F2D]">${getCartTotal().toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={onProceedToCheckout}
                className="w-full bg-[#2C5F2D] text-white py-4 rounded-xl font-bold text-base hover:bg-[#234d24] transition-all duration-300 shadow-lg cursor-pointer whitespace-nowrap"
              >
                PROCEDER AL PAGO
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;