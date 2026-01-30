import { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: '¿Cuál es el tiempo de envío?',
      answer: 'Realizamos envíos en 3-5 días hábiles para todo el país. Los envíos son gratuitos para compras superiores a $150.'
    },
    {
      question: '¿Qué métodos de pago aceptan?',
      answer: 'Aceptamos todas las tarjetas de crédito y débito, transferencias bancarias y pagos en efectivo contra entrega en zonas seleccionadas.'
    },
    {
      question: '¿Puedo devolver un producto?',
      answer: 'Sí, aceptamos devoluciones dentro de los 30 días posteriores a la compra. El producto debe estar en perfectas condiciones y con su empaque original.'
    },
    {
      question: '¿Los productos tienen garantía?',
      answer: 'Todos nuestros productos cuentan con garantía del fabricante. La duración varía según el producto, pero generalmente es de 6 a 12 meses.'
    },
    {
      question: '¿Ofrecen asesoramiento personalizado?',
      answer: 'Sí, nuestro equipo de expertos está disponible para ayudarte a elegir el equipamiento perfecto según tu nivel y necesidades. Contáctanos por WhatsApp o email.'
    },
    {
      question: '¿Tienen tienda física?',
      answer: 'Actualmente operamos de forma online para ofrecerte los mejores precios. Sin embargo, puedes coordinar una cita para ver productos seleccionados.'
    }
  ];

  return (
    <section id="faq" className="py-24 bg-[#F8F6F3]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block bg-[#D4E8D4] text-[#2C5F2D] text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full mb-4">
            PREGUNTAS FRECUENTES
          </span>
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            ¿Tienes Dudas?
          </h2>
          <p className="text-gray-600 text-lg">
            Aquí encontrarás respuestas a las preguntas más comunes
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <h4 className="font-bold text-gray-900 text-lg pr-4">
                  {faq.question}
                </h4>
                <div className={`w-8 h-8 flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}>
                  <i className="ri-arrow-down-s-line text-2xl text-[#2C5F2D]"></i>
                </div>
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-48' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-5">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;