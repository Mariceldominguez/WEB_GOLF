import { useEffect, useState, Suspense } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById, getProducts } from '../../services/api';
import { useCart } from '../../contexts/CartContext';
import Navbar from '../home/components/Navbar';
import Footer from '../home/components/Footer';
import ProductCard from '../home/components/ProductCard';
import Cart from '../home/components/Cart';
import Checkout from '../home/components/Checkout';
import WhatsAppButton from '../home/components/WhatsAppButton';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [showNotification, setShowNotification] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState<any[]>([]);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    getProductById(id)
      .then(setProduct)
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    getProducts()
      .then(setAllProducts)
      .catch(console.error);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600">Cargando producto...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Producto no encontrado
          </h2>
          <Link to="/catalogo" className="text-[#2C5F2D] hover:underline">
            Volver al catálogo
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      },
      quantity
    );
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleBackToCart = () => {
    setIsCheckoutOpen(false);
    setIsCartOpen(true);
  };

  const handleBackToCatalog = () => {
    navigate('/catalogo');
  };

  return (
    <div className="min-h-screen bg-white">
<Navbar />

      {showNotification && (
        <div className="fixed top-24 right-6 bg-[#2C5F2D] text-white px-6 py-4 rounded-lg shadow-lg z-50">
          Producto agregado al carrito
        </div>
      )}

      <main className="py-12 max-w-7xl mx-auto px-6">
        <button
          onClick={handleBackToCatalog}
          className="mb-6 text-[#2C5F2D] font-medium"
        >
          ← Volver al catálogo
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <img
            src={product.image}
            alt={product.name}
            className="rounded-xl w-full"
          />

          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-2xl font-bold text-[#2C5F2D] mb-4">
              ${product.price.toLocaleString()}
            </p>
            <p className="mb-6">{product.description}</p>

            <div className="mb-6">
              <span>Stock: {product.stock}</span>
            </div>

            <div className="flex gap-4 mb-6">
              <input
                type="number"
                value={quantity}
                min={1}
                max={product.stock}
                onChange={(e) => handleQuantityChange(Number(e.target.value))}
                className="w-20 border text-center"
              />
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="bg-[#2C5F2D] text-white px-6 py-3 rounded"
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl font-bold mb-8">
              Productos relacionados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onProceedToCheckout={handleProceedToCheckout}
      />
      <Checkout
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onBackToCart={handleBackToCart}
      />
      <WhatsAppButton />
    </div>
  );
};

const ProductDetailPageWrapper = () => (
  <Suspense fallback={<div className="min-h-screen bg-white" />}>
    <ProductDetailPage />
  </Suspense>
);

export default ProductDetailPageWrapper;
