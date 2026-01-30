import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../../contexts/CartContext";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart } = useCart();
  const navigate = useNavigate();

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔴 FUNCIÓN CLAVE (arregla CONTACTO / INICIO)
  const handleNavigation = (path: string, sectionId?: string) => {
    const doScroll = () => {
      if (!sectionId) return;

      let tries = 0;
      const maxTries = 30;

      const tick = () => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          setIsMobileMenuOpen(false);
          return;
        }
        tries++;
        if (tries < maxTries) setTimeout(tick, 100);
      };

      tick();
    };

    if (window.location.pathname !== path) {
      navigate(path);
      setTimeout(doScroll, 50);
    } else {
      doScroll();
    }

    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          
          {/* LOGO */}
          <Link to="/" onClick={() => handleNavigation("/", "hero")}>
            <img src={logo} alt="GolfPro" className="h-16 md:h-24 w-auto" />
          </Link>

          {/* MENU DESKTOP */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleNavigation("/", "hero")}
              className={`font-semibold ${
                isScrolled ? "text-gray-700 hover:text-[#2C5F2D]" : "text-white"
              }`}
            >
              INICIO
            </button>

            <Link
              to="/catalogo"
              className={`font-semibold ${
                isScrolled ? "text-gray-700 hover:text-[#2C5F2D]" : "text-white"
              }`}
            >
              PRODUCTOS
            </Link>

            <button
              onClick={() => handleNavigation("/", "nosotros")}
              className={`font-semibold ${
                isScrolled ? "text-gray-700 hover:text-[#2C5F2D]" : "text-white"
              }`}
            >
              NOSOTROS
            </button>

            <button
              onClick={() => handleNavigation("/", "faq")}
              className={`font-semibold ${
                isScrolled ? "text-gray-700 hover:text-[#2C5F2D]" : "text-white"
              }`}
            >
              PREGUNTAS FRECUENTES
            </button>

            <button
              onClick={() => handleNavigation("/", "contacto")}
              className={`font-semibold ${
                isScrolled ? "text-gray-700 hover:text-[#2C5F2D]" : "text-white"
              }`}
            >
              CONTACTO
            </button>
          </div>

          {/* CARRITO */}
          <button onClick={() => navigate("/carrito")} className="relative">
            <i
              className={`ri-shopping-cart-line text-2xl ${
                isScrolled ? "text-gray-900" : "text-white"
              }`}
            ></i>
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#2C5F2D] text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </button>

          {/* BOTÓN MOBILE */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden"
          >
            <i
              className={`ri-menu-line text-2xl ${
                isScrolled ? "text-gray-900" : "text-white"
              }`}
            ></i>
          </button>
        </div>

        {/* MENU MOBILE */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 bg-white rounded-lg shadow-lg">
            <button onClick={() => handleNavigation("/", "hero")} className="block w-full px-4 py-3">
              INICIO
            </button>
            <Link to="/catalogo" className="block w-full px-4 py-3">
              PRODUCTOS
            </Link>
            <button onClick={() => handleNavigation("/", "nosotros")} className="block w-full px-4 py-3">
              NOSOTROS
            </button>
            <button onClick={() => handleNavigation("/", "faq")} className="block w-full px-4 py-3">
              PREGUNTAS FRECUENTES
            </button>
            <button onClick={() => handleNavigation("/", "contacto")} className="block w-full px-4 py-3">
              CONTACTO
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
