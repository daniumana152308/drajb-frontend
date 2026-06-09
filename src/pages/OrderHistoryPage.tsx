import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getSalesByClient, getSaleDetails } from "../services/Api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import type { Sales, SaleDetail } from "../models/Types";

function StatusBadge({ status }: { status: string }) {
  if (status?.toUpperCase() === "COMPLETED")
    return (
      <span className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-black tracking-widest uppercase px-3 py-1.5 rounded-lg flex-shrink-0">
        ✓ Completada
      </span>
    );
  return (
    <span className="bg-amber-50 border border-amber-200 text-amber-700 text-xs font-black tracking-widest uppercase px-3 py-1.5 rounded-lg flex-shrink-0">
      ⏳ Pendiente
    </span>
  );
}

export default function OrderHistoryPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sales, setSales] = useState<Sales[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState<number | null>(null);
  const [details, setDetails] = useState<Record<number, SaleDetail[]>>({});
  const [detailLoading, setDetailLoading] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (!user) return;
    getSalesByClient(user.id)
      .then((data) => setSales(data))
      .catch((e: unknown) => setError(e instanceof Error ? e.message : "Error inesperado"))
      .finally(() => setLoading(false));
  }, [user]);

  const handleExpand = async (saleId: number) => {
    if (expanded === saleId) { setExpanded(null); return; }
    setExpanded(saleId);
    if (details[saleId]) return;
    setDetailLoading((prev) => ({ ...prev, [saleId]: true }));
    try {
      const d = await getSaleDetails(saleId);
      setDetails((prev) => ({ ...prev, [saleId]: d }));
    } catch {
      setDetails((prev) => ({ ...prev, [saleId]: [] }));
    } finally {
      setDetailLoading((prev) => ({ ...prev, [saleId]: false }));
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col overflow-x-hidden">
      <Navbar />

      <main className="flex-1 w-full flex flex-col px-8 sm:px-12 md:px-16 lg:px-24 py-10 sm:py-12 md:py-16">

        <div className="mb-8 sm:mb-10 text-center">
          <p className="text-orange-500/60 text-xs tracking-widest uppercase mb-2 font-bold">✦ Historial ✦</p>
          <h1 className="text-gray-900 font-black leading-tight" style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)" }}>
            Mis Pedidos
          </h1>
        </div>

        {loading && (
          <div className="flex-1 flex items-center justify-center py-20">
            <p className="text-gray-400 text-base font-semibold animate-pulse">Cargando pedidos...</p>
          </div>
        )}

        {!loading && error && (
          <div className="text-red-600 text-sm bg-red-50 border border-red-200 px-5 py-4 rounded-xl mb-6 font-semibold text-center max-w-2xl mx-auto w-full">
            {error}
          </div>
        )}

        {!loading && !error && sales.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center bg-white border border-gray-200 rounded-2xl py-32 gap-6 text-center px-6 shadow-sm">
            <div className="text-7xl">📦</div>
            <p className="text-orange-500/60 text-xs tracking-widest uppercase font-black">Sin pedidos</p>
            <h2 className="text-gray-800 font-black" style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}>
              Aún no tienes pedidos
            </h2>
            <p className="text-gray-500 text-base max-w-sm font-medium">
              Explora nuestra colección y realiza tu primera compra.
            </p>
            <button
              onClick={() => navigate("/catalog")}
              className="mt-2 px-10 py-4 bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-500 hover:to-orange-400 text-white text-sm font-extrabold tracking-wide rounded-xl hover:shadow-xl hover:shadow-blue-500/25 hover:scale-105 active:scale-[0.98] transition-all duration-200">
              Ver catálogo
            </button>
          </div>
        )}

        {!loading && !error && sales.length > 0 && (
          <div className="w-full max-w-4xl mx-auto flex flex-col gap-4">
            {sales.map((sale) => {
              const isExpanded = expanded === sale.id;
              const saleDetails = details[sale.id];
              const isDetailLoading = detailLoading[sale.id];
              const saleDate = sale.saleDate
                ? new Date(sale.saleDate).toLocaleDateString("es-CR", { year: "numeric", month: "long", day: "numeric" })
                : "—";
              const saleTotal = Number(sale.totalAmount ?? 0);

              return (
                <div key={sale.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:shadow-blue-500/8 transition-all duration-200">

                  {/* Card header — clickable */}
                  <button
                    onClick={() => handleExpand(sale.id)}
                    className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-5 text-left hover:bg-blue-50/40 transition-colors duration-200 min-h-[72px]">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                      <div>
                        <p className="text-[10px] text-blue-500/70 tracking-widest uppercase mb-1 font-bold">Pedido</p>
                        <p className="text-gray-800 font-black text-lg leading-none">#{String(sale.id).padStart(6, "0")}</p>
                      </div>
                      <div className="hidden sm:block w-px h-10 bg-gray-100 flex-shrink-0" />
                      <div>
                        <p className="text-[10px] text-gray-400 tracking-widest uppercase mb-1 font-bold">Fecha</p>
                        <p className="text-gray-600 font-semibold text-sm">{saleDate}</p>
                      </div>
                      <div className="hidden sm:block w-px h-10 bg-gray-100 flex-shrink-0" />
                      <div>
                        <p className="text-[10px] text-gray-400 tracking-widest uppercase mb-1 font-bold">Total</p>
                        <p className="text-orange-500 font-black text-lg leading-none">
                          ₡{saleTotal.toLocaleString("es-CR")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <StatusBadge status={sale.status} />
                      <span
                        className="text-blue-400 text-xs font-black transition-transform duration-200 select-none"
                        style={{ display: "inline-block", transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}>
                        ▼
                      </span>
                    </div>
                  </button>

                  {/* Expanded detail */}
                  {isExpanded && (
                    <div className="border-t border-gray-100 px-6 py-5 bg-gradient-to-br from-blue-50/50 via-white to-orange-50/30">
                      {isDetailLoading && (
                        <p className="text-gray-400 text-sm font-semibold text-center py-4 animate-pulse">Cargando detalles...</p>
                      )}

                      {!isDetailLoading && saleDetails?.length === 0 && (
                        <p className="text-gray-400 text-sm font-semibold text-center py-4">No hay detalles disponibles.</p>
                      )}

                      {!isDetailLoading && saleDetails && saleDetails.length > 0 && (
                        <div>
                          <p className="text-[10px] text-blue-600 tracking-widest uppercase font-black mb-4">Productos</p>
                          <div className="flex flex-col divide-y divide-gray-100">
                            {saleDetails.map((d, i) => (
                              <div key={d.id ?? i} className="flex items-center justify-between gap-4 py-3">
                                <div className="flex-1 min-w-0">
                                  <p className="text-gray-800 font-bold text-sm truncate">
                                    {d.product?.name ?? `Producto #${d.productId}`}
                                  </p>
                                  {(d.product?.design?.name || d.product?.size?.label) && (
                                    <p className="text-gray-400 text-xs font-medium mt-0.5">
                                      {[d.product?.design?.name, d.product?.size?.label && `Talla ${d.product.size.label}`]
                                        .filter(Boolean)
                                        .join(" · ")}
                                    </p>
                                  )}
                                </div>
                                <div className="flex items-center gap-3 sm:gap-5 flex-shrink-0 text-right">
                                  <span className="text-gray-400 text-xs font-medium">×{d.quantity}</span>
                                  <span className="hidden sm:inline text-gray-500 text-xs font-semibold">
                                    ₡{Number(d.unitPrice).toLocaleString("es-CR")} c/u
                                  </span>
                                  <span className="text-orange-500 font-black text-sm">
                                    ₡{(Number(d.unitPrice) * d.quantity).toLocaleString("es-CR")}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Totals row */}
                          <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end">
                            <div className="flex flex-col gap-2 min-w-[200px]">
                              <div className="flex justify-between items-center gap-6">
                                <span className="text-gray-500 text-sm font-medium">Envío</span>
                                <span className="text-emerald-600 text-sm font-bold">Gratis 🚚</span>
                              </div>
                              <div className="flex justify-between items-center gap-6">
                                <span className="text-gray-800 font-black text-base">Total</span>
                                <span className="text-orange-500 font-black text-xl">
                                  ₡{saleTotal.toLocaleString("es-CR")}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
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
