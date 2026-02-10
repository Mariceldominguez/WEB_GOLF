import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProductos, type StrapiProducto } from "@/services/api";
import ProductCard from "./ProductCard";
import Container from "../Container";


// deploy fix

const Catalog = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    getProductos()
      .then((data: StrapiProducto[]) => {
        const mapped = (data as any[]).map((p: any) => ({
          id: p.id,
          name: p.name,
          description: p.description,
          price: p.price,
          stock: p.stock,
          category: p.category,
          badge: p.badge,
          features: p.features ?? [],
          image: p.image?.url ? p.image.url : null,
        }));

        setProducts(mapped);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const featuredProducts = useMemo(() => {
    const conBadge = products.filter((p) => p.badge);
    return (conBadge.length ? conBadge : products).slice(0, 8);
  }, [products]);

  return (
    <section id="catalog" className="bg-white py-14 sm:py-20 lg:py-24">
      <Container>
        <div className="text-center mb-10 sm:mb-14 lg:mb-16">
          <span className="inline-block bg-[#D4E8D4] text-[#2C5F2D] text-[11px] sm:text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full mb-4">
            DESTACADOS
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Productos Destacados
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
            Descubre nuestros productos más vendidos y las últimas novedades
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12 sm:py-16 text-gray-500">
            Cargando productos...
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-10 sm:mb-12" data-product-shop>
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="text-center">
          <button
            onClick={() => navigate("/catalogo")}
            className="inline-flex items-center gap-3 bg-[#2C5F2D] text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-lg text-sm sm:text-base font-semibold hover:bg-[#234d24] transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer whitespace-nowrap"
          >
            Ver todos los productos
            <span className="w-5 h-5 flex items-center justify-center">
              <i className="ri-arrow-right-line text-xl"></i>
            </span>
          </button>
        </div>
      </Container>
    </section>
  );
};

export default Catalog;
