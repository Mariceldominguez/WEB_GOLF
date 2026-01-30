import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProductos, type StrapiProducto } from "@/services/api";
import ProductCard from "./ProductCard";

const Catalog = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    getProductos()
      .then((data: StrapiProducto[]) => {
        // Adaptamos lo que viene de Strapi a lo que usa ProductCard
        const mapped = (data as any[]).map((p: any) => ({
          id: p.id,
          name: p.name,
          description: p.description,
          price: p.price,
          stock: p.stock,
          category: p.category,
          badge: p.badge,
          features: p.features ?? [],
          image: p.image?.url ? p.image.url : null, // con proxy
        }));

        setProducts(mapped);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Mostrar solo productos destacados (con badge). Si no hay, mostramos los primeros 8.
  const featuredProducts = useMemo(() => {
    const conBadge = products.filter((p) => p.badge);
    return (conBadge.length ? conBadge : products).slice(0, 8);
  }, [products]);

  const navigateToCatalog = () => {
    navigate("/catalogo");
  };

  return (
    <section id="catalog" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block bg-[#D4E8D4] text-[#2C5F2D] text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full mb-4">
            DESTACADOS
          </span>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Productos Destacados
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubre nuestros productos más vendidos y las últimas novedades
          </p>
        </div>

        {loading ? (
          <div className="text-center py-16 text-gray-500">Cargando productos...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12" data-product-shop>
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="text-center">
          <button
            onClick={navigateToCatalog}
            className="inline-flex items-center gap-3 bg-[#2C5F2D] text-white px-8 py-4 rounded-lg text-base font-semibold hover:bg-[#234d24] transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer whitespace-nowrap"
          >
            Ver todos los productos
            <div className="w-5 h-5 flex items-center justify-center">
              <i className="ri-arrow-right-line text-xl"></i>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Catalog;
