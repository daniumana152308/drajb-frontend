import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProducts } from "../services/Api";
import { useCart } from "../context/CartContext";
import type { Product } from "../models/Types";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
      <div className="min-h-screen w-full bg-[#f7f7f5] flex flex-col overflow-x-hidden">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-400 text-base">Cargando...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="min-h-screen w-full bg-[#f7f7f5] flex flex-col overflow-x-hidden">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-5">
          <p className="text-gray-400 text-base">Producto no encontrado.</p>
          <button onClick={() => navigate("/catalog")}
            className="px-8 py-4 bg-[#1e3a5f] text-white text-sm rounded-md hover:bg-[#16304f] hover:scale-105 transition-all duration-200">
            Volver al catálogo
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const design = products[0].design;

  return (
    <div className="min-h-screen w-full bg-[#f7f7f5] flex flex-col overflow-x-hidden">
      <Navbar />

      <main className="flex-1 w-full px-8 md:px-16 lg:px-24 py-8">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-400 tracking-wide">
          <button onClick={() => navigate("/catalog")} className="hover:text-[#1e3a5f] hover:scale-105 transition-all duration-200">
            Catálogo
          </button>
          <span>/</span>
          <span className="text-gray-600">{design?.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">

          {/* Image */}
          <div className="lg:w-2/5 flex-shrink-0">
            <div className="w-full bg-gray-50 overflow-hidden rounded-sm flex items-center justify-center" style={{ height: '440px' }}>
              {design?.imageUrl ? (
                <img
                  src={design.imageUrl}
                  alt={design.name}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-300 text-sm tracking-widest uppercase">Sin imagen</span>
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 flex flex-col">
            <p className="text-xs text-gray-400 tracking-[0.3em] uppercase mb-2">
              Diseño — {design?.name}
            </p>
            <h1 className="text-2xl md:text-3xl font-medium text-gray-800 mb-2 leading-snug"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              Camiseta {design?.name}
            </h1>

            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              {design?.description}
            </p>

            {/* Price */}
            <div className="mb-5 pb-5 border-b border-gray-200">
              <span className="text-2xl font-medium text-gray-800" style={{ fontFamily: 'Playfair Display, serif' }}>
                ₡{selectedProduct ? Number(selectedProduct.price).toLocaleString("es-CR") : "—"}
              </span>
            </div>

            {/* Size selector - selected label to the right of the menu title */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-gray-400 tracking-[0.25em] uppercase font-medium">Talla</p>
                
              </div>
              <div className="flex flex-wrap gap-2">
                {products.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedProduct(p)}
                    className={`w-12 h-12 border text-sm font-medium tracking-wider transition-all duration-200 hover:scale-110 active:scale-95 ${
                      selectedProduct?.id === p.id
                        ? "border-[#1e3a5f] bg-[#1e3a5f] text-white"
                        : "border-gray-200 bg-white text-gray-600 hover:border-[#1e3a5f] hover:text-[#1e3a5f]"
                    }`}>
                    {p.size?.label}
                  </button>
                ))}
              </div>
              {selectedProduct && (
                <p className="text-xs text-gray-400 mt-2">{selectedProduct.size?.description}</p>
              )}
            </div>

            {/* Buttons side by side */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <button onClick={handleAdd} disabled={!selectedProduct}
                className={`flex-1 py-4 text-sm font-medium tracking-wide rounded-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed ${
                  added
                    ? "bg-green-600 text-white"
                    : "bg-[#1e3a5f] text-white hover:bg-[#16304f] hover:shadow-lg hover:shadow-[#1e3a5f]/20"
                }`}>
                {added ? "Agregado al carrito" : "Agregar al carrito"}
              </button>
              <button onClick={() => navigate("/cart")}
                className="flex-1 py-4 border border-gray-200 text-gray-500 text-sm font-medium tracking-wide rounded-sm hover:border-[#1e3a5f] hover:text-[#1e3a5f] hover:scale-[1.02] transition-all duration-200">
                Ver carrito
              </button>
            </div>

            {/* Details */}
            <div className="pt-5 border-t border-gray-100">
              <p className="text-xs text-gray-400 tracking-[0.25em] uppercase mb-3">Detalles</p>
              <div className="flex flex-col gap-2.5">
                {[
                  { label: "Material", value: "100% algodón premium" },
                  { label: "Diseño", value: design?.name ?? "—" },
                  { label: "Tallas disponibles", value: products.map((p) => p.size?.label).join(", ") },
                  { label: "Envío", value: "Gratis en todos los pedidos" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex gap-6 text-sm">
                    <span className="text-gray-400 w-36 flex-shrink-0 text-xs tracking-wide">{label}</span>
                    <span className="text-gray-600 text-xs">{value}</span>
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
