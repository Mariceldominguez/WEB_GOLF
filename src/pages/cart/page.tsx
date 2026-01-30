import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import Navbar from '../home/components/Navbar';
import Footer from '../home/components/Footer';
import WhatsAppButton from '../home/components/WhatsAppButton';

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();

  const handleProceedToCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      
      <div className="flex-1 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Tu Carrito</h1>

          {cart.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-32 h-32 mx-auto mb-8 bg-gray-100 rounded-full flex items-center justify-center">
                <i className="ri-shopping-bag-line text-7xl text-gray-400"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Tu carrito está vacío</h2>
              <p className="text-gray-600 mb-8">Agrega productos para comenzar tu compra</p>
              <button
                onClick={() => navigate('/catalogo')}
                className="bg-[#2C5F2D] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#234d24] transition-all duration-300 cursor-pointer whitespace-nowrap"
              >
                VER PRODUCTOS
              </button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Lista de productos */}
              <div className="lg:col-span-2 space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-6 p-6 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                    <div className="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gray-50">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {item.name}
                      </h3>
                      <p className="text-2xl text-[#2C5F2D] font-bold mb-4">
                        ${item.price.toFixed(2)}
                      </p>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-10 h-10 flex items-center justify-center bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
                          >
                            <i className="ri-subtract-line text-lg"></i>
                          </button>
                          <span className="w-12 text-center font-bold text-lg">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-10 h-10 flex items-center justify-center bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
                          >
                            <i className="ri-add-line text-lg"></i>
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-auto flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold transition-colors cursor-pointer whitespace-nowrap"
                        >
                          <i className="ri-delete-bin-line text-xl"></i>
                          Eliminar
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-gray-600 mb-1">Subtotal</p>
                      <p className="text-2xl font-bold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Resumen del pedido */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Resumen del Pedido</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-700">
                      <span className="text-base">Subtotal</span>
                      <span className="font-semibold text-lg">${getCartTotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span className="text-base">Envío</span>
                      <span className="font-semibold text-lg text-[#2C5F2D]">Gratis</span>
                    </div>
                    <div className="border-t border-gray-300 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-gray-900">Total</span>
                        <span className="text-3xl font-bold text-[#2C5F2D]">${getCartTotal().toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleProceedToCheckout}
                    className="w-full bg-[#2C5F2D] text-white py-4 rounded-xl font-bold text-base hover:bg-[#234d24] transition-all duration-300 shadow-lg cursor-pointer whitespace-nowrap mb-4"
                  >
                    PROCEDER AL PAGO
                  </button>

                  <button
                    onClick={() => navigate('/catalogo')}
                    className="w-full bg-white text-[#2C5F2D] py-4 rounded-xl font-bold text-base border-2 border-[#2C5F2D] hover:bg-gray-50 transition-all duration-300 cursor-pointer whitespace-nowrap"
                  >
                    SEGUIR COMPRANDO
                  </button>

                  <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
                    <div className="flex items-start">
                      <i className="ri-shield-check-line text-[#2C5F2D] text-2xl mr-3 flex-shrink-0"></i>
                      <div>
                        <p className="font-semibold text-[#2C5F2D] text-sm mb-1">Compra Segura</p>
                        <p className="text-gray-600 text-xs leading-relaxed">
                          Tus datos están protegidos con encriptación de nivel bancario
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default CartPage;