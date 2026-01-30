import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#0A0A0A] text-white pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-16">

          {/* LOGO + DESCRIPCIÓN */}
          <div>
            <img
              src={logo}
              alt="Golf Time Río Cuarto"
              className="h-16 w-auto object-contain mb-8 brightness-0 invert"
            />

            <p className="text-[#B0B0B0] text-sm leading-relaxed mb-8 max-w-xs">
              Equipamiento e indumentaria de golf premium.
              Calidad, estilo y rendimiento en cada producto.
            </p>

            <div className="flex space-x-4">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/golftimeriocuarto"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all"
              >
                <i className="ri-instagram-line text-xl"></i>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/5493584168069"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all"
              >
                <i className="ri-whatsapp-line text-xl"></i>
              </a>
            </div>
          </div>

          {/* CONTACTO */}
          <div className="space-y-10">
            <div>
              <h4 className="text-white text-xs font-semibold uppercase tracking-widest mb-4">
                DIRECCIÓN
              </h4>
              <p className="text-[#B0B0B0] text-sm leading-relaxed">
                Golf Club Río Cuarto<br />
                Río Cuarto, Córdoba, Argentina
              </p>
            </div>

            <div>
              <h4 className="text-white text-xs font-semibold uppercase tracking-widest mb-4">
                TELÉFONO
              </h4>
              <p className="text-[#B0B0B0] text-sm">
                +54 9 3584 168069
              </p>
            </div>

            <div>
              <h4 className="text-white text-xs font-semibold uppercase tracking-widest mb-4">
                EMAIL
              </h4>
              <p className="text-[#B0B0B0] text-sm">
                golftimerc2015@gmail.com
              </p>
            </div>
          </div>

          {/* COLUMNA DERECHA (opcional – dejamos vacío prolijo) */}
          <div />
        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-[#2A2A2A] pt-8 text-center">
          <p className="text-[#8A8A8A] text-sm">
            © {new Date().getFullYear()} Golf Time Río Cuarto. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
