import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import Navbar from '../home/components/Navbar';
import Footer from '../home/components/Footer';
import WhatsAppButton from '../home/components/WhatsAppButton';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal } = useCart();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    codigoPostal: '',
    notas: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Preparar datos del pedido para el email
      const productosDetalle = cart.map(item => 
        `${item.name} - Cantidad: ${item.quantity} - Precio: $${(item.price * item.quantity).toFixed(2)}`
      ).join('\n');

      const formDataToSend = new URLSearchParams();
      formDataToSend.append('nombre', formData.nombre);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('telefono', formData.telefono);
      formDataToSend.append('direccion', formData.direccion);
      formDataToSend.append('ciudad', formData.ciudad);
      formDataToSend.append('codigoPostal', formData.codigoPostal);
      formDataToSend.append('notas', formData.notas || 'Sin notas adicionales');
      formDataToSend.append('productos', productosDetalle);
      formDataToSend.append('total', `$${getCartTotal().toFixed(2)}`);
      formDataToSend.append('cantidadProductos', cart.reduce((sum, item) => sum + item.quantity, 0).toString());

      // Enviar email al administrador
      await fetch('https://readdy.ai/api/form/d5rtmdahs78ip5370m8g', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formDataToSend.toString()
      });

      // Abrir Mercado Pago en nueva pestaña
      // IMPORTANTE: Reemplaza este link con tu link de pago de Mercado Pago
      const mercadoPagoLink = 'https://www.mercadopago.com.ar/checkout/v1/payment';
      window.open(mercadoPagoLink, '_blank');

      // Mostrar mensaje de confirmación
      alert('Se ha enviado tu pedido y se abrirá Mercado Pago para completar el pago. El carrito se mantendrá hasta que completes el pago.');
      
    } catch (error) {
      console.error('Error al procesar el pedido:', error);
      alert('Hubo un error al procesar tu pedido. Por favor, intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-8 bg-gray-100 rounded-full flex items-center justify-center">
              <i className="ri-shopping-cart-line text-7xl text-gray-400"></i>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tu carrito está vacío</h2>
            <p className="text-gray-600 mb-8">Agrega productos antes de proceder al pago</p>
            <button
              onClick={() => navigate('/catalogo')}
              className="bg-[#2C5F2D] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#234d24] transition-all duration-300 cursor-pointer whitespace-nowrap"
            >
              VER PRODUCTOS
            </button>
          </div>
        </div>
        <Footer />
        <WhatsAppButton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      
      <div className="flex-1 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <button
              onClick={() => navigate('/carrito')}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors cursor-pointer mb-4"
            >
              <i className="ri-arrow-left-line text-xl mr-2"></i>
              <span className="font-semibold">Volver al carrito</span>
            </button>
            <h1 className="text-4xl font-bold text-gray-900">Finalizar Compra</h1>
            <p className="text-gray-600 mt-2">El pago se realizará de forma segura a través de Mercado Pago</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Formulario */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-gray-200 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Información de Envío</h2>
                
                <form onSubmit={handleSubmit} id="checkout-form" data-readdy-form className="space-y-5">
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F2D] focus:border-transparent outline-none transition-all text-base"
                      placeholder="Juan Pérez"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F2D] focus:border-transparent outline-none transition-all text-base"
                        placeholder="juan@ejemplo.com"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F2D] focus:border-transparent outline-none transition-all text-base"
                        placeholder="+54 11 1234-5678"
                      />
                    </div>
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F2D] focus:border-transparent outline-none transition-all text-base"
                      placeholder="Calle 123, Piso 4, Depto B"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F2D] focus:border-transparent outline-none transition-all text-base"
                        placeholder="Buenos Aires"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F2D] focus:border-transparent outline-none transition-all text-base"
                        placeholder="1234"
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
                      rows={4}
                      maxLength={500}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F2D] focus:border-transparent outline-none transition-all resize-none text-base"
                      placeholder="Instrucciones especiales de entrega..."
                    ></textarea>
                    <p className="text-xs text-gray-500 mt-1">Máximo 500 caracteres</p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start">
                    <i className="ri-information-line text-blue-600 text-xl mr-3 flex-shrink-0 mt-0.5"></i>
                    <div>
                      <p className="text-sm text-blue-900 font-semibold mb-1">Pago Externo con Mercado Pago</p>
                      <p className="text-xs text-blue-800 leading-relaxed">
                        Al hacer clic en "Proceder al Pago", se abrirá Mercado Pago en una nueva pestaña donde podrás completar tu pago de forma segura con tarjeta de crédito, débito y otros medios. Tu carrito se mantendrá guardado hasta que completes el proceso.
                      </p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#2C5F2D] text-white py-4 rounded-xl font-bold text-base hover:bg-[#234d24] transition-all duration-300 shadow-lg cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <i className="ri-loader-4-line animate-spin mr-2"></i>
                        Procesando...
                      </>
                    ) : (
                      <>
                        <i className="ri-secure-payment-line text-xl mr-2"></i>
                        PROCEDER AL PAGO
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Resumen del pedido */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Resumen del Pedido</h2>
                
                <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-3 pb-4 border-b border-gray-200 last:border-0">
                      <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-white">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
                          {item.name}
                        </p>
                        <p className="text-gray-600 text-xs mb-1">Cantidad: {item.quantity}</p>
                        <p className="font-bold text-[#2C5F2D] text-sm">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-4 border-t border-gray-300">
                  <div className="flex justify-between text-gray-700">
                    <span className="text-base">Subtotal</span>
                    <span className="font-semibold text-base">${getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span className="text-base">Envío</span>
                    <span className="font-semibold text-base text-[#2C5F2D]">Gratis</span>
                  </div>
                  <div className="flex justify-between text-2xl font-bold text-gray-900 pt-3 border-t border-gray-300">
                    <span>Total</span>
                    <span className="text-[#2C5F2D]">${getCartTotal().toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-start mb-4">
                    <i className="ri-shield-check-line text-[#2C5F2D] text-2xl mr-3 flex-shrink-0"></i>
                    <div>
                      <p className="font-semibold text-[#2C5F2D] text-sm mb-1">Compra Segura</p>
                      <p className="text-gray-600 text-xs leading-relaxed">
                        Pago procesado por Mercado Pago con encriptación bancaria
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center pt-3 border-t border-gray-200">
                    <img 
                      src="https://readdy.ai/api/search-image?query=mercado%20pago%20logo%20official%20brand%20payment%20method%20icon%20blue%20and%20yellow%20colors%20simple%20clean%20white%20background%20high%20quality%20professional&width=120&height=40&seq=mercadopago001&orientation=landscape" 
                      alt="Mercado Pago" 
                      className="h-8 object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default CheckoutPage;