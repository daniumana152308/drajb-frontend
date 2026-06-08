import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../services/Api";
import type { Product } from "../models/Types";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const sizeColorMap: Record<string, string> = {
  XS:  "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
  S:   "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
  M:   "bg-blue-500/20 text-blue-300 border-blue-500/40",
  L:   "bg-violet-500/20 text-violet-300 border-violet-500/40",
  XL:  "bg-orange-500/20 text-orange-300 border-orange-500/40",
  XXL: "bg-pink-500/20 text-pink-300 border-pink-500/40",
};
const getSizeBadge = (s: string) => sizeColorMap[s] || "bg-purple-500/20 text-purple-300 border-purple-500/40";

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
    <div className="min-h-screen w-full flex flex-col overflow-x-hidden">
      <Navbar />

      <main className="flex-1 flex flex-col w-full">

        {/* Header */}
        <div className="w-full px-6 sm:px-8 md:px-16 lg:px-24 pt-10 sm:pt-12 pb-8">
          <p className="text-purple-400/60 text-xs tracking-[0.3em] uppercase mb-2 font-bold">✦ Explora ✦</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
            <h1 className="text-white font-black leading-none"
              style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(2.5rem, 7vw, 6rem)', letterSpacing: '0.05em' }}>
              Catálogo
            </h1>
            <div className="flex flex-wrap items-end gap-4 sm:gap-6 pb-1">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-gray-400 tracking-[0.2em] uppercase font-bold">Diseño</label>
                <select
                  value={filterDesign}
                  onChange={(e) => setFilterDesign(e.target.value)}
                  className="bg-gray-900 border border-white/15 text-gray-300 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-purple-500/60 transition-colors duration-200 min-w-[160px] sm:min-w-[180px] min-h-[44px] cursor-pointer">
                  {designs.map((d) => <option key={d} value={d}>{d === "all" ? "Todos los diseños" : d}</option>)}
                </select>
              </div>
              <p className="text-white/20 text-sm pb-1 font-semibold">{filtered.length} diseños</p>
            </div>
          </div>
        </div>

        <div className="w-full border-t border-white/10" />

        {loading && (
          <div className="flex-1 flex items-center justify-center py-20">
            <p className="text-purple-300/60 text-sm font-semibold tracking-widest animate-pulse">Cargando productos...</p>
          </div>
        )}
        {error && (
          <div className="flex-1 flex items-center justify-center py-20">
            <p className="text-rose-400 text-sm font-semibold">{error}</p>
          </div>
        )}
        {!loading && !error && filtered.length === 0 && (
          <div className="flex-1 flex items-center justify-center py-20">
            <p className="text-gray-500 text-sm font-semibold">No hay productos con ese filtro.</p>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 sm:px-8 md:px-16 lg:px-24 py-8">
            {filtered.map((group) => {
              const representative = group[0];
              const sizes = group.map((p) => p.size?.label).filter(Boolean);

              return (
                <div
                  key={representative.design?.id}
                  className="bg-gray-900/70 border border-white/10 rounded-2xl overflow-hidden group cursor-pointer hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/15 hover:scale-[1.02] transition-all duration-300 backdrop-blur-sm"
                  onClick={() => navigate(`/product/${representative.design?.id}`)}>

                  <div className="aspect-square overflow-hidden bg-gray-800/50 relative">
                    {representative.design?.imageUrl ? (
                      <img
                        src={representative.design.imageUrl}
                        alt={representative.design.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900/30 to-blue-900/30">
                        <span className="text-gray-600 text-xs tracking-widest uppercase font-semibold">Sin imagen</span>
                      </div>
                    )}
                    <div className="absolute bottom-3 left-3 flex gap-1.5 flex-wrap">
                      {sizes.slice(0, 4).map((s) => (
                        <span key={s} className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${getSizeBadge(s)}`}>
                          {s}
                        </span>
                      ))}
                      {sizes.length > 4 && (
                        <span className="bg-white/10 text-white/50 text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/20">
                          +{sizes.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-5 md:p-6">
                    <p className="text-[10px] text-purple-400/70 tracking-[0.25em] uppercase mb-1 font-bold">{representative.design?.name}</p>
                    <h3 className="text-white font-bold text-base md:text-lg mb-1 leading-snug group-hover:text-purple-300 transition-colors duration-200">
                      Camiseta {representative.design?.name}
                    </h3>
                    <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-1">
                      {representative.design?.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-black text-sm md:text-base bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                        Desde ₡{Math.min(...group.map((p) => Number(p.price))).toLocaleString("es-CR")}
                      </span>
                      <span className="text-purple-400/70 text-xs font-bold tracking-wide group-hover:text-cyan-400 transition-colors duration-200">
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
