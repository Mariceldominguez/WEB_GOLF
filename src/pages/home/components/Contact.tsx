import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target as HTMLFormElement;
    const formDataToSend = new URLSearchParams();

    formDataToSend.append('nombre', formData.nombre);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('telefono', formData.telefono);
    formDataToSend.append('mensaje', formData.mensaje);

    try {
      const response = await fetch('https://readdy.ai/api/form/d5rr0lr592clg457kqvg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formDataToSend.toString()
      });

      if (response.ok) {
        setShowSuccess(true);
        setFormData({
          nombre: '',
          email: '',
          telefono: '',
          mensaje: ''
        });
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block bg-[#D4E8D4] text-[#2C5F2D] text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full mb-4">
            CONTACTO
          </span>
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Hablemos
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            ¿Tienes alguna pregunta? Estamos aquí para ayudarte
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div>
            <form id="contact-form" onSubmit={handleSubmit} className="space-y-6" data-readdy-form>
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
                  Teléfono
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F2D] focus:border-transparent outline-none transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mensaje *
                </label>
                <textarea
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                  rows={5}
                  maxLength={500}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F2D] focus:border-transparent outline-none transition-all resize-none text-sm"
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">Máximo 500 caracteres</p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#2C5F2D] text-white py-4 rounded-xl font-bold text-base hover:bg-[#234d24] transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
              >
                {isSubmitting ? 'ENVIANDO...' : 'ENVIAR MENSAJE'}
              </button>
            </form>

            {showSuccess && (
              <div className="mt-4 p-4 bg-[#D4E8D4] text-[#2C5F2D] rounded-lg flex items-center">
                <i className="ri-check-line text-2xl mr-3"></i>
                <span className="font-semibold">¡Mensaje enviado exitosamente!</span>
              </div>
            )}
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Información de Contacto</h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-[#D4E8D4] rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                    <i className="ri-mail-line text-2xl text-[#2C5F2D]"></i>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Email</p>
                    <p className="text-gray-600">golftimerc2015@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-[#D4E8D4] rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                    <i className="ri-phone-line text-2xl text-[#2C5F2D]"></i>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Teléfono</p>
                    <p className="text-gray-600">+54 3584168069</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-[#D4E8D4] rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                    <i className="ri-time-line text-2xl text-[#2C5F2D]"></i>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Horario de Atención</p>
                    <p className="text-gray-600">Martes a viernes 9:00 a 18:00hs</p>
                    <p className="text-gray-600">Sábados: 8:00 - 15:00</p>
                    <p className="text-gray-600">Domingos: 9:00 - 13:00</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#F8F6F3] rounded-xl p-6">
              <h4 className="font-bold text-gray-900 mb-3">¿Necesitas ayuda inmediata?</h4>
              <p className="text-gray-600 text-sm mb-4">
                Contáctanos por WhatsApp y te responderemos en minutos
              </p>
              <a
                href="https://wa.me/5493584168069"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-[#25D366] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#20BA5A] transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-whatsapp-line text-xl mr-2"></i>
                Chatear en WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;