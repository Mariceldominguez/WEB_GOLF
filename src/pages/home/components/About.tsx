import aboutImg from "@/assets/about.jpeg";

const About = () => {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="w-full h-[500px] rounded-[40px] overflow-hidden shadow-2xl">
             <img
  src={aboutImg}
  alt="Sobre Nosotros"
  className="w-full h-full object-cover object-top"
/>

            </div>
          </div>

          <div>
            <span className="inline-block bg-[#D4E8D4] text-[#2C5F2D] text-xs font-semibold uppercase tracking-wider px-5 py-2 rounded-full mb-6">
              NUESTRA HISTORIA
            </span>
            
            <h2 className="text-5xl font-bold text-gray-900 mb-8 leading-tight">
              Pasión por el Golf<br />y la Elegancia
            </h2>

            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Somos una tienda especializada en equipamiento y vestimenta de golf premium. Nuestra misión es ofrecer productos de la más alta calidad que combinen rendimiento, estilo y durabilidad para golfistas exigentes.
            </p>

            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              Cada producto en nuestra colección ha sido cuidadosamente seleccionado para garantizar que cumpla con los más altos estándares de calidad. Creemos que el golf es más que un deporte, es un estilo de vida que merece lo mejor.
            </p>

            <div className="grid grid-cols-3 gap-6 mb-10">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#2C5F2D] mb-2">500+</div>
                <div className="text-sm text-gray-600">Clientes Satisfechos</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#2C5F2D] mb-2">100+</div>
                <div className="text-sm text-gray-600">Productos Premium</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#2C5F2D] mb-2">5★</div>
                <div className="text-sm text-gray-600">Calificación</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;