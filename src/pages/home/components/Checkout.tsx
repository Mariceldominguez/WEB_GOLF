import { useState } from 'react';
import { useCart } from '../../../contexts/CartContext';

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  onBackToCart: () => void;
}

const Checkout = ({ isOpen, onClose, onBackToCart }: CheckoutProps) => {
  const { cart, getCartTotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    codigoPostal: '',
    notas: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      clearCart();
      setShowSuccess(false);
      onClose();
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        direccion: '',
        ciudad: '',
        codigoPostal: '',
        notas: ''
      });
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-50 cursor-pointer"
        onClick={onClose}
      ></div>
      
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl my-8" onClick={(e) => e.stopPropagation()}>
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={onBackToCart}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
              >
                <i className="ri-arrow-left-line text-xl mr-2"></i>
                <span className="font-semibold">Volver al carrito</span>
              </button>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <i className="ri-close-line text-2xl text-gray-700"></i>
              </button>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-8">Finalizar Compra</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Información de Envío</h3>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F2D] focus:border-transparent outline-none transition-all text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F2D] focus:border-transparent outline-none transition-all text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F2D] focus:border-transparent outline-none transition-all text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Dirección *
                    </label>
                    <input
                      type="text"
                      name="direccion"
                      value={formData.direccion}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F2D] focus:border-transparent outline-none transition-all text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Ciudad *
                      </label>
                      <input
                        type="text"
                        name="ciudad"
                        value={formData.ciudad}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F2D] focus:border-transparent outline-none transition-all text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Código Postal *
                      </label>
                      <input
                        type="text"
                        name="codigoPostal"
                        value={formData.codigoPostal}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F2D] focus:border-transparent outline-none transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Notas del Pedido (Opcional)
                    </label>
                    <textarea
                      name="notas"
                      value={formData.notas}
                      onChange={handleChange}
                      rows={3}
                      maxLength={500}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F2D] focus:border-transparent outline-none transition-all resize-none text-sm"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#2C5F2D] text-white py-4 rounded-xl font-bold text-base hover:bg-[#234d24] transition-all duration-300 shadow-lg cursor-pointer whitespace-nowrap"
                  >
                    CONFIRMAR PEDIDO
                  </button>
                </form>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Resumen del Pedido</h3>
                
                <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-start pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 text-sm">{item.name}</p>
                        <p className="text-gray-600 text-xs mt-1">Cantidad: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-gray-900 text-sm">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}

                  <div className="pt-4 space-y-3">
                    <div className="flex justify-between text-gray-600 text-sm">
                      <span>Subtotal</span>
                      <span className="font-semibold">${getCartTotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600 text-sm">
                      <span>Envío</span>
                      <span className="font-semibold text-[#2C5F2D]">Gratis</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-gray-900 pt-3 border-t border-gray-300">
                      <span>Total</span>
                      <span className="text-[#2C5F2D]">${getCartTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-[#D4E8D4] rounded-lg">
                  <div className="flex items-start">
                    <i className="ri-shield-check-line text-[#2C5F2D] text-2xl mr-3 flex-shrink-0"></i>
                    <div>
                      <p className="font-semibold text-[#2C5F2D] text-sm mb-1">Compra Segura</p>
                      <p className="text-gray-700 text-xs leading-relaxed">
                        Tus datos están protegidos con encriptación de nivel bancario
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
            <div className="w-20 h-20 bg-[#2C5F2D] rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-check-line text-5xl text-white"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">¡Pedido Confirmado!</h3>
            <p className="text-gray-600 mb-2">Tu pedido ha sido procesado exitosamente</p>
            <p className="text-sm text-gray-500">Recibirás un email de confirmación pronto</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Checkout;