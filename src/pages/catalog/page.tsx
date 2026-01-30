import { useEffect, useMemo, useState } from "react";
import { getProductos, type StrapiProducto } from "../../services/api";
import ProductCard from "../home/components/ProductCard";
import Navbar from "../home/components/Navbar";
import Footer from "../home/components/Footer";
import WhatsAppButton from "../home/components/WhatsAppButton";


type SortOption = 'default' | 'name-asc' | 'price-asc' | 'price-desc';

interface Category {
  id: string;
  name: string;
  subcategories?: { id: string; name: string }[];
}

const categories: Category[] = [
  { id: 'all', name: 'Todos los Productos' },
  {
    id: 'palos',
    name: 'Palos',
    subcategories: [
      { id: 'palos-nuevos', name: 'Palos Nuevos' },
      { id: 'palos-usados', name: 'Palos Usados' },
      { id: 'set-hierros', name: 'Set de Hierros' }
    ]
  },
  { id: 'bolsas', name: 'Bolsas' },
  { id: 'pelotas', name: 'Pelotas' },
  { id: 'accesorios', name: 'Accesorios' },
  { id: 'guantes', name: 'Guantes' },
  { id: 'gorras', name: 'Gorras' },
  { id: 'medias', name: 'Medias' },
  { id: 'grips-varas', name: 'Grips/Varas' },
  {
    id: 'indumentaria-hombre',
    name: 'Indumentaria Hombre',
    subcategories: [
      { id: 'remeras-hombre', name: 'Remeras' },
      { id: 'chombas-hombre', name: 'Chombas' },
      { id: 'camperas-hombre', name: 'Camperas' },
      { id: 'pantalones-hombre', name: 'Pantalones' }
    ]
  },
  {
    id: 'indumentaria-mujer',
    name: 'Indumentaria Mujer',
    subcategories: [
      { id: 'remeras-mujer', name: 'Remeras' },
      { id: 'chombas-mujer', name: 'Chombas' },
      { id: 'camperas-mujer', name: 'Camperas' },
      { id: 'pantalones-mujer', name: 'Pantalones' }
    ]
  }
];

// Normaliza texto: minúsculas + sin tildes + trim
const norm = (s: string) =>
  (s ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

export default function CatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([
    'palos',
    'indumentaria-hombre',
    'indumentaria-mujer'
  ]);

  // Productos desde Strapi (ya adaptados a lo que usa ProductCard)
const [products, setProducts] = useState<StrapiProducto[]>([]);

  useEffect(() => {
    getProductos()
      .then((data: StrapiProducto[]) => {
        const mapped = (data as any[]).map((p: any) => ({
          id: p.id,
          name: p.name,
          description: p.description,
          price: p.price,
          stock: p.stock,
          category: p.category, // Ej: "Pelotas"
          badge: p.badge,
          features: p.features ?? [],
image: p.image?.url ? p.image.url : null
        }));
        setProducts(mapped);
      })
      .catch(console.error);
  }, []);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
    );
  };

  const filteredAndSortedProducts = useMemo(() => {
    // Mapeo simple para que ids como "pelotas" matcheen con "Pelotas"
    const mapToStrapiCategory = (id: string) => {
      const m: Record<string, string> = {
        palos: 'Palos',
        bolsas: 'Bolsas',
        pelotas: 'Pelotas',
        accesorios: 'Accesorios',
        guantes: 'Guantes',
        gorras: 'Gorras',
        medias: 'Medias',
        'grips-varas': 'Grips/Varas',
        'indumentaria-hombre': 'Indumentaria Hombre',
        'indumentaria-mujer': 'Indumentaria Mujer',
        // subcategorías (si en Strapi las guardás así, ajustalo)
        'remeras-hombre': 'Remeras',
        'chombas-hombre': 'Chombas',
        'camperas-hombre': 'Camperas',
        'pantalones-hombre': 'Pantalones',
        'remeras-mujer': 'Remeras',
        'chombas-mujer': 'Chombas',
        'camperas-mujer': 'Camperas',
        'pantalones-mujer': 'Pantalones'
      };
      return m[id] ?? id;
    };

    let filtered =
      selectedCategory === 'all'
        ? products
        : products.filter((p) => norm(p.category) === norm(mapToStrapiCategory(selectedCategory)));

    const sorted = [...filtered];

    switch (sortBy) {
      case 'name-asc':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    return sorted;
  }, [products, selectedCategory, sortBy]);

  const CategoryButton = ({
    category,
    isSubcategory = false
  }: {
    category: { id: string; name: string };
    isSubcategory?: boolean;
  }) => (
    <button
      onClick={() => setSelectedCategory(category.id)}
      className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
        isSubcategory ? 'pl-8' : ''
      } ${
        selectedCategory === category.id
          ? 'bg-[#2C5F2D] text-white shadow-md'
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      {category.name}
    </button>
  );

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Header */}
      <div className="bg-gradient-to-r from-[#2C5F2D] to-[#3d7a3e] text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Catálogo de Productos</h1>
          <p className="text-lg text-white/90">
            Explora nuestra colección completa de equipamiento de golf
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex gap-8">
          {/* Sidebar de filtros - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Categorías</h2>
              <div className="space-y-1">
                {categories.map((category) => (
                  <div key={category.id}>
                    {category.subcategories ? (
                      <>
                        <button
                          onClick={() => toggleCategory(category.id)}
                          className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-all"
                        >
                          <span>{category.name}</span>
                          <i
                            className={`ri-arrow-${
                              expandedCategories.includes(category.id) ? 'down' : 'right'
                            }-s-line text-lg`}
                          ></i>
                        </button>
                        {expandedCategories.includes(category.id) && (
                          <div className="mt-1 space-y-1">
                            {category.subcategories.map((sub) => (
                              <CategoryButton key={sub.id} category={sub} isSubcategory />
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <CategoryButton category={category} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Contenido principal */}
          <div className="flex-1">
            {/* Barra de ordenamiento y botón de filtros móvil */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-gray-200">
              {/* Botón de filtros para móvil */}
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-[#2C5F2D] text-white rounded-lg text-sm font-medium whitespace-nowrap"
              >
                <i className="ri-filter-3-line"></i>
                Filtros
              </button>

              <p className="text-gray-600">
                Mostrando{' '}
                <span className="font-semibold text-gray-900">
                  {filteredAndSortedProducts.length}
                </span>{' '}
                productos
              </p>

              <div className="flex items-center gap-3">
                <label htmlFor="sort" className="text-sm text-gray-600 whitespace-nowrap">
                  Ordenar por:
                </label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2C5F2D] focus:border-transparent bg-white cursor-pointer"
                >
                  <option value="default">Predeterminado</option>
                  <option value="name-asc">Nombre (A-Z)</option>
                  <option value="price-asc">Precio (Menor a Mayor)</option>
                  <option value="price-desc">Precio (Mayor a Menor)</option>
                </select>
              </div>
            </div>

            {/* Grid de productos */}
            {filteredAndSortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <i className="ri-inbox-line text-6xl text-gray-300 mb-4"></i>
                <p className="text-xl text-gray-500">No hay productos en esta categoría</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar móvil */}
      {isSidebarOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>

          {/* Sidebar */}
          <div className="fixed top-0 left-0 h-full w-80 bg-white z-50 shadow-2xl lg:hidden overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Filtros</h2>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Categorías</h3>
                <div className="space-y-1">
                  {categories.map((category) => (
                    <div key={category.id}>
                      {category.subcategories ? (
                        <>
                          <button
                            onClick={() => toggleCategory(category.id)}
                            className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-all"
                          >
                            <span>{category.name}</span>
                            <i
                              className={`ri-arrow-${
                                expandedCategories.includes(category.id) ? 'down' : 'right'
                              }-s-line text-lg`}
                            ></i>
                          </button>
                          {expandedCategories.includes(category.id) && (
                            <div className="mt-1 space-y-1">
                              {category.subcategories.map((sub) => (
                                <button
                                  key={sub.id}
                                  onClick={() => {
                                    setSelectedCategory(sub.id);
                                    setIsSidebarOpen(false);
                                  }}
                                  className={`w-full text-left pl-8 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                                    selectedCategory === sub.id
                                      ? 'bg-[#2C5F2D] text-white shadow-md'
                                      : 'text-gray-700 hover:bg-gray-100'
                                  }`}
                                >
                                  {sub.name}
                                </button>
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        <button
                          onClick={() => {
                            setSelectedCategory(category.id);
                            setIsSidebarOpen(false);
                          }}
                          className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                            selectedCategory === category.id
                              ? 'bg-[#2C5F2D] text-white shadow-md'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {category.name}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
