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

      <main className="flex-1 flex flex-col w-full px-8 sm:px-12 md:px-16 lg:px-24 py-10 sm:py-12 md:py-16">
        <div className="mb-8 sm:mb-10 text-center">
          <p className="text-orange-500/60 text-xs tracking-widest uppercase mb-2 font-bold">✦ Resumen ✦</p>
          <h1 className="text-gray-900 font-black leading-tight"
            style={{ fontSize: 'clamp(2rem, 6vw, 4.5rem)' }}>
            Tu Carrito
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center bg-white border border-gray-200 rounded-2xl py-32 gap-6 text-center px-6 shadow-sm">
            <div className="text-7xl">🛒</div>
            <p className="text-orange-500/60 text-xs tracking-widest uppercase font-black">Vacío</p>
            <h2 className="text-gray-800 font-black"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}>
              No has agregado nada aún
            </h2>
            <p className="text-gray-500 text-base max-w-sm font-medium">Explora nuestra colección y encuentra la camiseta perfecta para ti.</p>
            <button onClick={() => navigate("/catalog")}
              className="mt-2 px-10 py-4 bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-500 hover:to-orange-400 text-white text-sm font-extrabold tracking-wide rounded-xl hover:shadow-xl hover:shadow-blue-500/25 hover:scale-105 active:scale-[0.98] transition-all duration-200">
              Ver catálogo
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 flex-1">

            {/* Items list */}
            <div className="flex-1">
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden divide-y divide-gray-100 shadow-sm">
                {items.map((item) => (
                  <div key={item.product.id} className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-5 sm:p-6 md:p-8 hover:bg-blue-50/40 transition-colors duration-200">
                    <div className="flex gap-4 sm:gap-6 flex-1 min-w-0">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-100">
                        {item.product.design?.imageUrl ? (
                          <img src={item.product.design.imageUrl} alt={item.product.design.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-50 to-orange-50" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] text-blue-500/70 tracking-widest uppercase mb-1 truncate font-bold">
                          {item.product.design?.name} · Talla {item.product.size?.label}
                        </p>
                        <h3 className="text-gray-800 font-bold text-base sm:text-lg mb-2 leading-snug">{item.product.name}</h3>
                        <p className="text-gray-400 text-sm font-medium">₡{Number(item.product.price).toLocaleString("es-CR")} c/u</p>
                      </div>
                    </div>
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-between gap-3 sm:flex-shrink-0 pt-3 sm:pt-0 border-t border-gray-100 sm:border-0">
                      <div className="flex items-center gap-3 sm:gap-4 border border-gray-200 rounded-xl px-3 sm:px-4 py-2 min-h-[44px] bg-gray-50">
                        <button onClick={() => updateQty(item.product.id, item.quantity - 1)}
                          className="text-blue-500 hover:text-blue-700 text-lg w-5 text-center transition-all duration-150 hover:scale-125 font-bold">−</button>
                        <span className="text-gray-800 text-base w-6 text-center font-black">{item.quantity}</span>
                        <button onClick={() => updateQty(item.product.id, item.quantity + 1)}
                          className="text-blue-500 hover:text-blue-700 text-lg w-5 text-center transition-all duration-150 hover:scale-125 font-bold">+</button>
                      </div>
                      <p className="text-orange-500 font-black text-base sm:text-lg">
                        ₡{(Number(item.product.price) * item.quantity).toLocaleString("es-CR")}
                      </p>
                      <button onClick={() => removeItem(item.product.id)}
                        className="text-red-400 hover:text-red-600 text-sm font-bold tracking-wide transition-all duration-200 hover:scale-105 px-2 py-2 min-h-[44px] flex items-center rounded-lg hover:bg-red-50">
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="lg:w-[400px] flex-shrink-0 lg:mr-16">
              <div className="bg-gradient-to-br from-blue-50 via-white to-orange-50 border border-blue-200/60 rounded-2xl p-6 sm:p-8 lg:sticky lg:top-24 shadow-lg shadow-blue-500/10">
                <h2 className="text-gray-900 font-black text-xl sm:text-2xl mb-6 pb-6 border-b border-gray-200 leading-tight">
                  Resumen del pedido
                </h2>
                <div className="flex flex-col gap-3 mb-6 max-h-52 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-sm">
                      <span className="text-gray-500 truncate mr-3 text-sm font-medium">{item.product.name} ×{item.quantity}</span>
                      <span className="text-gray-700 flex-shrink-0 text-sm font-semibold">₡{(Number(item.product.price) * item.quantity).toLocaleString("es-CR")}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-200 pt-5 mb-8">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-500 text-base font-medium">Envío</span>
                    <span className="text-emerald-600 text-base font-bold">Gratis 🚚</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-800 font-bold text-lg">Total</span>
                    <span className="font-black text-2xl sm:text-3xl text-orange-500"
                      style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)' }}>
                      ₡{total.toLocaleString("es-CR")}
                    </span>
                  </div>
                </div>
                {error && (
                  <p className="text-red-600 text-sm bg-red-50 border border-red-200 px-4 py-3 rounded-xl mb-5 font-medium">{error}</p>
                )}
                <button onClick={handleCheckout} disabled={loading}
                  className="w-full py-4 sm:py-5 min-h-[44px] bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-500 hover:to-orange-400 text-white text-base font-extrabold tracking-wide rounded-xl hover:shadow-xl hover:shadow-blue-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mb-4">
                  {loading ? "Procesando..." : "Confirmar compra"}
                </button>
                <button onClick={() => navigate("/catalog")}
                  className="w-full py-4 sm:py-5 min-h-[44px] border-2 border-gray-200 text-gray-500 text-base font-bold tracking-wide rounded-xl hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 hover:scale-[1.02] transition-all duration-200">
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
