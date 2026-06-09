import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../services/Api";
import type { Product } from "../models/Types";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const sizeColorMap: Record<string, string> = {
  XS:  "bg-sky-100 text-sky-700 border-sky-200",
  S:   "bg-emerald-100 text-emerald-700 border-emerald-200",
  M:   "bg-blue-100 text-blue-700 border-blue-200",
  L:   "bg-indigo-100 text-indigo-700 border-indigo-200",
  XL:  "bg-orange-100 text-orange-700 border-orange-200",
  XXL: "bg-amber-100 text-amber-700 border-amber-200",
};
const getSizeBadge = (s: string) => sizeColorMap[s] || "bg-blue-100 text-blue-700 border-blue-200";

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
        <div className="w-full px-8 sm:px-12 md:px-16 lg:px-24 pt-10 sm:pt-12 pb-8 text-center">
          <p className="text-orange-500/60 text-xs tracking-[0.3em] uppercase mb-2 font-bold">✦ Explora ✦</p>
          <h1 className="text-gray-900 font-black leading-none mb-6"
            style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(2.5rem, 7vw, 6rem)', letterSpacing: '0.05em' }}>
            Catálogo
          </h1>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex flex-col gap-1 items-center">
              <label className="text-[10px] text-gray-500 tracking-[0.2em] uppercase font-bold">Filtrar por diseño</label>
              <select
                value={filterDesign}
                onChange={(e) => setFilterDesign(e.target.value)}
                className="bg-white border border-gray-200 text-gray-700 text-sm rounded-xl px-5 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors duration-200 min-w-[180px] min-h-[44px] cursor-pointer shadow-sm">
                {designs.map((d) => <option key={d} value={d}>{d === "all" ? "Todos los diseños" : d}</option>)}
              </select>
            </div>
            <p className="text-gray-400 text-sm font-semibold">{filtered.length} diseños</p>
          </div>
        </div>

        <div className="w-full border-t border-gray-200/80" />

        {loading && (
          <div className="flex-1 flex items-center justify-center py-20">
            <p className="text-blue-500/60 text-sm font-semibold tracking-widest animate-pulse">Cargando productos...</p>
          </div>
        )}
        {error && (
          <div className="flex-1 flex items-center justify-center py-20">
            <p className="text-red-500 text-sm font-semibold">{error}</p>
          </div>
        )}
        {!loading && !error && filtered.length === 0 && (
          <div className="flex-1 flex items-center justify-center py-20">
            <p className="text-gray-400 text-sm font-semibold">No hay productos con ese filtro.</p>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-8 sm:px-12 md:px-16 lg:px-24 py-8">
            {filtered.map((group) => {
              const representative = group[0];
              const sizes = group.map((p) => p.size?.label).filter(Boolean);

              return (
                <div
                  key={representative.design?.id}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden group cursor-pointer hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-500/15 hover:scale-[1.02] transition-all duration-300"
                  onClick={() => navigate(`/product/${representative.design?.id}`)}>

                  {/* Image */}
                  <div className="aspect-square overflow-hidden bg-gray-50 relative">
                    {representative.design?.imageUrl ? (
                      <img
                        src={representative.design.imageUrl}
                        alt={representative.design.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-orange-50">
                        <span className="text-gray-400 text-xs tracking-widest uppercase font-semibold">Sin imagen</span>
                      </div>
                    )}
                    {/* Badges — centered */}
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 flex-wrap px-3">
                      {sizes.slice(0, 4).map((s) => (
                        <span key={s} className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${getSizeBadge(s)}`}>
                          {s}
                        </span>
                      ))}
                      {sizes.length > 4 && (
                        <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded-full border border-gray-200">
                          +{sizes.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card body — all centered */}
                  <div className="p-5 md:p-6 text-center">
                    <p className="text-[10px] text-blue-500/70 tracking-[0.25em] uppercase mb-1 font-bold">
                      {representative.design?.name}
                    </p>
                    <h3 className="text-gray-800 font-bold text-base md:text-lg mb-1 leading-snug group-hover:text-blue-600 transition-colors duration-200">
                      Camiseta {representative.design?.name}
                    </h3>
                    <p className="text-gray-400 text-xs leading-relaxed mb-4 line-clamp-1">
                      {representative.design?.description}
                    </p>
                    <div className="flex flex-col items-center gap-1.5">
                      <span className="font-black text-base text-orange-500">
                        Desde ₡{Math.min(...group.map((p) => Number(p.price))).toLocaleString("es-CR")}
                      </span>
                      <span className="text-blue-600 text-xs font-bold tracking-wide group-hover:text-orange-500 transition-colors duration-200">
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
