import heroImg from "../../../assets/hero.jpg";

const Hero = () => {
  const scrollToCatalog = () => {
    const element = document.getElementById('catalog');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <img
  src={heroImg}
  alt="Golf Course"
  className="w-full h-full object-cover object-top"
/>

        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/30"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto w-full">
        <h1 className="font-serif text-white text-6xl md:text-7xl lg:text-8xl font-medium tracking-wider mb-6 leading-tight">
          EXCELENCIA EN<br />GOLF & ESTILO
        </h1>
        
        <p className="text-white/85 text-lg md:text-xl font-light tracking-wide mb-12 max-w-2xl mx-auto">
          Equipamiento y vestimenta premium para golfistas exigentes
        </p>

        <button
          onClick={scrollToCatalog}
          className="inline-flex items-center justify-center bg-[#2C5F2D] text-white uppercase text-sm font-semibold tracking-widest px-12 py-4 rounded-full hover:bg-[#234d24] transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer whitespace-nowrap"
        >
          EXPLORAR COLECCIÓN
          <i className="ri-arrow-right-up-line ml-3 text-lg"></i>
        </button>
      </div>
    </section>
  );
};

export default Hero;