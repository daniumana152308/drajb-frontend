import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { createCart, addCartDetail, createSale, createBill } from "../services/Api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function CartPage() {
  const { user } = useAuth();
  const { items, removeItem, updateQty, clearCart, total } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = async () => {
    if (!user || items.length === 0) return;
    setLoading(true); setError("");
    try {
      const cart = await createCart(user.id);
      for (const item of items) {
        await addCartDetail(cart.id, item.product.id, item.quantity, item.product.price);
      }
      const sale = await createSale(user.id, cart.id, total);
      const bill = await createBill(sale.id, total);
      clearCart();
      navigate("/invoice", { state: { bill, sale, items: [...items], user } });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al procesar la compra");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen w-full flex flex-col overflow-x-hidden">
      <Navbar />

      <main className="flex-1 flex flex-col w-full px-6 sm:px-8 md:px-16 lg:px-24 py-10 sm:py-12 md:py-16">
        <div className="mb-8 sm:mb-10">
          <p className="text-purple-400/60 text-xs tracking-[0.3em] uppercase mb-2 font-bold">✦ Resumen ✦</p>
          <h1 className="text-white font-black leading-none"
            style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(2.5rem, 7vw, 6rem)', letterSpacing: '0.05em' }}>
            Tu Carrito
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center bg-gray-900/60 border border-white/10 rounded-2xl py-32 gap-6 text-center px-6 backdrop-blur-sm">
            <div className="text-7xl">🛒</div>
            <p className="text-purple-400/50 text-xs tracking-[0.35em] uppercase font-black">Vacío</p>
            <h2 className="text-white font-black"
              style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '0.05em' }}>
              No has agregado nada aún
            </h2>
            <p className="text-gray-400 text-base max-w-sm">Explora nuestra colección y encuentra la camiseta perfecta para ti.</p>
            <button onClick={() => navigate("/catalog")}
              className="mt-2 px-10 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-sm font-black tracking-widest rounded-xl hover:shadow-xl hover:shadow-purple-500/30 hover:scale-105 active:scale-[0.98] transition-all duration-200"
              style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.12em' }}>
              Ver catálogo
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 flex-1">

            {/* Items list */}
            <div className="flex-1">
              <div className="bg-gray-900/60 border border-white/10 rounded-2xl overflow-hidden divide-y divide-white/5 backdrop-blur-sm">
                {items.map((item) => (
                  <div key={item.product.id} className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-5 sm:p-6 md:p-8 hover:bg-white/2 transition-colors duration-200">
                    <div className="flex gap-4 sm:gap-6 flex-1 min-w-0">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-xl overflow-hidden bg-gray-800/50 flex-shrink-0 border border-white/10">
                        {item.product.design?.imageUrl ? (
                          <img src={item.product.design.imageUrl} alt={item.product.design.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-purple-900/30 to-blue-900/30" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] text-purple-400/60 tracking-[0.2em] uppercase mb-1 truncate font-bold">
                          {item.product.design?.name} · Talla {item.product.size?.label}
                        </p>
                        <h3 className="text-white font-bold text-base sm:text-lg mb-2 leading-snug">{item.product.name}</h3>
                        <p className="text-gray-500 text-sm font-medium">₡{Number(item.product.price).toLocaleString("es-CR")} c/u</p>
                      </div>
                    </div>
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-between gap-3 sm:flex-shrink-0 pt-3 sm:pt-0 border-t border-white/5 sm:border-0">
                      <div className="flex items-center gap-3 sm:gap-4 border border-white/10 rounded-xl px-3 sm:px-4 py-2 min-h-[44px] bg-gray-900/50">
                        <button onClick={() => updateQty(item.product.id, item.quantity - 1)}
                          className="text-purple-400 hover:text-purple-300 text-lg w-5 text-center transition-all duration-150 hover:scale-125 font-bold">−</button>
                        <span className="text-white text-base w-6 text-center font-black">{item.quantity}</span>
                        <button onClick={() => updateQty(item.product.id, item.quantity + 1)}
                          className="text-purple-400 hover:text-purple-300 text-lg w-5 text-center transition-all duration-150 hover:scale-125 font-bold">+</button>
                      </div>
                      <p className="text-white font-black text-base sm:text-lg bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                        ₡{(Number(item.product.price) * item.quantity).toLocaleString("es-CR")}
                      </p>
                      <button onClick={() => removeItem(item.product.id)}
                        className="text-rose-500/60 hover:text-rose-400 text-sm font-bold tracking-wide transition-all duration-200 hover:scale-105 px-2 py-2 min-h-[44px] flex items-center rounded-lg hover:bg-rose-500/10">
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="lg:w-[400px] flex-shrink-0 lg:mr-16">
              <div className="bg-gradient-to-br from-purple-900/50 via-blue-900/40 to-indigo-900/50 border border-purple-500/25 rounded-2xl p-6 sm:p-8 lg:sticky lg:top-24 backdrop-blur-sm shadow-2xl shadow-purple-500/10">
                <h2 className="text-white font-black text-xl sm:text-2xl mb-6 pb-6 border-b border-white/10 leading-none"
                  style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}>
                  Resumen del pedido
                </h2>
                <div className="flex flex-col gap-3 mb-6 max-h-52 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-sm">
                      <span className="text-gray-400 truncate mr-3 text-sm font-medium">{item.product.name} ×{item.quantity}</span>
                      <span className="text-gray-300 flex-shrink-0 text-sm font-semibold">₡{(Number(item.product.price) * item.quantity).toLocaleString("es-CR")}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/10 pt-5 mb-8">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-400 text-base font-medium">Envío</span>
                    <span className="text-emerald-400 text-base font-bold">Gratis 🚚</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-200 font-bold text-lg">Total</span>
                    <span className="font-black text-2xl sm:text-3xl bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
                      style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.04em' }}>
                      ₡{total.toLocaleString("es-CR")}
                    </span>
                  </div>
                </div>
                {error && (
                  <p className="text-rose-400 text-sm bg-rose-500/10 border border-rose-500/20 px-4 py-3 rounded-xl mb-5 font-medium">{error}</p>
                )}
                <button onClick={handleCheckout} disabled={loading}
                  className="w-full py-4 sm:py-5 min-h-[44px] bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-500 hover:via-blue-500 hover:to-cyan-500 text-white text-base font-black tracking-widest rounded-xl hover:shadow-xl hover:shadow-purple-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
                  style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.12em' }}>
                  {loading ? "Procesando..." : "Confirmar compra"}
                </button>
                <button onClick={() => navigate("/catalog")}
                  className="w-full py-4 sm:py-5 min-h-[44px] border-2 border-white/15 text-gray-400 text-base font-bold tracking-widest rounded-xl hover:border-purple-500/50 hover:text-purple-300 hover:bg-purple-500/10 hover:scale-[1.02] transition-all duration-200">
                  Seguir comprando
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
