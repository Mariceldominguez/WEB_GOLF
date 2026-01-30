const Benefits = () => {
  const benefits = [
    {
      icon: 'ri-truck-line',
      title: 'Envío Gratis',
      description: 'En compras superiores a $150'
    },
    {
      icon: 'ri-shield-check-line',
      title: 'Pago Seguro',
      description: 'Protección en todas tus transacciones'
    },
    {
      icon: 'ri-star-line',
      title: 'Calidad Premium',
      description: 'Productos de las mejores marcas'
    },
    {
      icon: 'ri-customer-service-2-line',
      title: 'Asesoramiento Experto',
      description: 'Atención personalizada para ti'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-[#F8F6F3] to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="w-20 h-20 mx-auto bg-white rounded-full shadow-md flex items-center justify-center mb-6">
                <i className={`${benefit.icon} text-4xl text-[#2C5F2D]`}></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;