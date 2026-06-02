import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../services/Api";
import type { Product } from "../models/Types";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterDesign, setFilterDesign] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setError("No se pudo cargar el catálogo."))
      .finally(() => setLoading(false));
  }, []);

  const byDesign = products.reduce<Record<number, Product[]>>((acc, p) => {
    const id = p.design?.id;
    if (id == null) return acc;
    if (!acc[id]) acc[id] = [];
    acc[id].push(p);
    return acc;
  }, {});

  const designGroups = Object.values(byDesign);
  const designs = ["all", ...Array.from(new Set(products.map((p) => p.design?.name).filter(Boolean)))];
  const filtered = filterDesign === "all"
    ? designGroups
    : designGroups.filter((g) => g[0].design?.name === filterDesign);

  return (
    <div className="min-h-screen w-full bg-[#f7f7f5] flex flex-col overflow-x-hidden">
      <Navbar />

      <main className="flex-1 flex flex-col w-full">

        <div className="w-full px-8 md:px-16 lg:px-24 pt-12 pb-8">
          <p className="text-xs text-gray-400 tracking-[0.25em] uppercase mb-2">Explora</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h1 className="text-3xl md:text-4xl font-medium text-gray-800" style={{ fontFamily: 'Playfair Display, serif' }}>
              Catálogo
            </h1>
            <div className="flex flex-wrap items-end gap-6 pb-1">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-gray-400 tracking-[0.2em] uppercase">Diseño</label>
                <select
                  value={filterDesign}
                  onChange={(e) => setFilterDesign(e.target.value)}
                  className="bg-white border border-gray-200 text-gray-600 text-sm rounded-md px-4 py-2.5 focus:outline-none focus:border-[#1e3a5f] transition-colors duration-200 min-w-[180px]">
                  {designs.map((d) => <option key={d} value={d}>{d === "all" ? "Todos los diseños" : d}</option>)}
                </select>
              </div>
              <p className="text-gray-300 text-sm pb-1">{filtered.length} diseños</p>
            </div>
          </div>
        </div>

        <div className="w-full border-t border-gray-200" />

        {loading && <div className="flex-1 flex items-center justify-center text-gray-400 text-sm py-20">Cargando productos...</div>}
        {error && <div className="flex-1 flex items-center justify-center text-red-400 text-sm py-20">{error}</div>}
        {!loading && !error && filtered.length === 0 && (
          <div className="flex-1 flex items-center justify-center text-gray-400 text-sm py-20">No hay productos con ese filtro.</div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-gray-200">
            {filtered.map((group) => {
              const representative = group[0];
              const sizes = group.map((p) => p.size?.label).filter(Boolean);

              return (
                <div
                  key={representative.design?.id}
                  className="bg-white group cursor-pointer"
                  onClick={() => navigate(`/product/${representative.design?.id}`)}>
                  <div className="aspect-square overflow-hidden bg-gray-50 relative">
                    {representative.design?.imageUrl ? (
                      <img
                        src={representative.design.imageUrl}
                        alt={representative.design.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-gray-200 text-xs tracking-widest uppercase">Sin imagen</span>
                      </div>
                    )}
                    <div className="absolute bottom-3 left-3 flex gap-1 flex-wrap">
                      {sizes.slice(0, 4).map((s) => (
                        <span key={s} className="bg-white/90 text-[#1e3a5f] text-[10px] font-medium px-2 py-0.5 tracking-wider">
                          {s}
                        </span>
                      ))}
                      {sizes.length > 4 && (
                        <span className="bg-white/90 text-[#1e3a5f] text-[10px] font-medium px-2 py-0.5">
                          +{sizes.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-5 md:p-6">
                    <p className="text-[10px] text-gray-300 tracking-[0.2em] uppercase mb-1">{representative.design?.name}</p>
                    <h3 className="text-gray-800 font-medium text-base md:text-lg mb-1 leading-snug group-hover:text-[#1e3a5f] transition-colors duration-200"
                      style={{ fontFamily: 'Playfair Display, serif' }}>
                      Camiseta {representative.design?.name}
                    </h3>
                    <p className="text-gray-400 text-xs leading-relaxed mb-4 line-clamp-1">
                      {representative.design?.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 font-medium text-sm md:text-base">
                        Desde ₡{Math.min(...group.map((p) => Number(p.price))).toLocaleString("es-CR")}
                      </span>
                      <span className="text-[#1e3a5f] text-xs font-medium tracking-wide group-hover:underline underline-offset-4 transition-all duration-200">
                        Ver tallas →
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
