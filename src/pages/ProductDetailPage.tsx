import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProducts } from "../services/Api";
import { useCart } from "../context/CartContext";
import type { Product } from "../models/Types";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const sizeGradients = [
  "from-cyan-500 to-blue-500",
  "from-violet-500 to-purple-600",
  "from-orange-500 to-pink-500",
  "from-emerald-500 to-cyan-500",
  "from-pink-500 to-rose-600",
  "from-amber-500 to-orange-500",
];

export default function ProductDetailPage() {
  const { designId } = useParams<{ designId: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    getProducts()
      .then((all) => {
        const group = all.filter((p) => String(p.design?.id) === designId);
        setProducts(group);
        if (group.length > 0) setSelectedProduct(group[0]);
      })
      .finally(() => setLoading(false));
  }, [designId]);

  const handleAdd = () => {
    if (!selectedProduct) return;
    addItem(selectedProduct);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full flex flex-col overflow-x-hidden">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-purple-300/60 text-base font-semibold tracking-widest animate-pulse">Cargando...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="min-h-screen w-full flex flex-col overflow-x-hidden">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-5">
          <p className="text-gray-500 text-base font-semibold">Producto no encontrado.</p>
          <button onClick={() => navigate("/catalog")}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-sm font-bold rounded-xl hover:shadow-xl hover:shadow-purple-500/30 hover:scale-105 transition-all duration-200"
            style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.1em' }}>
            Volver al catálogo
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const design = products[0].design;

  return (
    <div className="min-h-screen w-full flex flex-col overflow-x-hidden">
      <Navbar />

      <main className="flex-1 w-full px-6 sm:px-8 md:px-16 lg:px-24 py-6 sm:py-8">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 sm:mb-8 text-sm text-gray-500 tracking-wide font-semibold">
          <button onClick={() => navigate("/catalog")}
            className="hover:text-purple-400 hover:scale-105 transition-all duration-200 min-h-[44px] flex items-center">
            Catálogo
          </button>
          <span className="text-white/20">/</span>
          <span className="text-white/60">{design?.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 sm:gap-10 lg:gap-16 items-start">

          {/* Image */}
          <div className="w-full lg:w-2/5 flex-shrink-0">
            <div className="w-full bg-gray-900/80 border border-white/10 overflow-hidden rounded-2xl flex items-center justify-center h-64 sm:h-80 lg:h-[440px] backdrop-blur-sm">
              {design?.imageUrl ? (
                <img
                  src={design.imageUrl}
                  alt={design.name}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900/30 to-blue-900/30">
                  <span className="text-gray-500 text-sm tracking-widest uppercase font-semibold">Sin imagen</span>
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 flex flex-col">
            <p className="text-xs text-purple-400/60 tracking-[0.3em] uppercase mb-2 font-bold">
              Diseño — {design?.name}
            </p>
            <h1 className="text-white font-black leading-none mb-3"
              style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '0.04em' }}>
              Camiseta {design?.name}
            </h1>

            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              {design?.description}
            </p>

            {/* Price */}
            <div className="mb-5 pb-5 border-b border-white/10">
              <span className="font-black bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent"
                style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', letterSpacing: '0.04em' }}>
                ₡{selectedProduct ? Number(selectedProduct.price).toLocaleString("es-CR") : "—"}
              </span>
            </div>

            {/* Size selector */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-gray-400 tracking-[0.25em] uppercase font-bold">Talla</p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {products.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedProduct(p)}
                    className={`w-14 h-14 rounded-xl text-sm font-black tracking-wider transition-all duration-200 hover:scale-110 active:scale-95 border-2 ${
                      selectedProduct?.id === p.id
                        ? `border-transparent bg-gradient-to-br ${sizeGradients[idx % sizeGradients.length]} text-white shadow-lg`
                        : "border-white/15 bg-gray-900/50 text-gray-400 hover:border-purple-500/60 hover:text-purple-300 hover:bg-purple-500/10"
                    }`}>
                    {p.size?.label}
                  </button>
                ))}
              </div>
              {selectedProduct && (
                <p className="text-xs text-gray-500 mt-3 font-medium">{selectedProduct.size?.description}</p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <button onClick={handleAdd} disabled={!selectedProduct}
                className={`flex-1 py-4 min-h-[44px] text-sm font-black tracking-widest rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed ${
                  added
                    ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/30"
                    : "bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-500 hover:via-blue-500 hover:to-cyan-500 text-white shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40"
                }`}
                style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.1em' }}>
                {added ? "✓ Agregado al carrito" : "Agregar al carrito"}
              </button>
              <button onClick={() => navigate("/cart")}
                className="flex-1 py-4 min-h-[44px] border-2 border-white/15 text-gray-400 text-sm font-bold tracking-widest rounded-xl hover:border-purple-500/60 hover:text-purple-300 hover:bg-purple-500/10 hover:scale-[1.02] transition-all duration-200">
                Ver carrito
              </button>
            </div>

            {/* Details */}
            <div className="pt-5 border-t border-white/10">
              <p className="text-xs text-gray-400 tracking-[0.25em] uppercase mb-4 font-bold">Detalles</p>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Material", value: "100% algodón premium" },
                  { label: "Diseño", value: design?.name ?? "—" },
                  { label: "Tallas disponibles", value: products.map((p) => p.size?.label).join(", ") },
                  { label: "Envío", value: "Gratis en todos los pedidos" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex gap-6 text-sm">
                    <span className="text-gray-500 w-36 flex-shrink-0 text-xs tracking-wide font-semibold">{label}</span>
                    <span className="text-gray-300 text-xs font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
