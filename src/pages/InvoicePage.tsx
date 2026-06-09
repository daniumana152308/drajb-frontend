import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import type { Bill, Sales, CartItem } from "../models/Types";

interface InvoiceState {
  bill: Bill; sale: Sales; items: CartItem[];
  user: { id: number; firstName: string; lastName: string; email: string };
}

export default function InvoicePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as InvoiceState | null;

  const handlePrint = () => {
    const prevTitle = document.title;
    document.title = "Factura - DRAJB Store";
    window.print();
    document.title = prevTitle;
  };

  if (!state) {
    return (
      <div className="min-h-screen w-full flex flex-col overflow-x-hidden">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-5">
          <p className="text-gray-500 text-base font-semibold">No hay factura para mostrar.</p>
          <button onClick={() => navigate("/catalog")}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-500 hover:to-orange-400 text-white text-sm font-black rounded-xl hover:shadow-xl hover:shadow-blue-500/25 hover:scale-105 transition-all duration-200"
            style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.1em' }}>
            Ir al catálogo
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const { bill, sale, items, user } = state;
  const issueDate = new Date(bill.issueDate).toLocaleDateString("es-CR", { year: "numeric", month: "long", day: "numeric" });
  const shippingDate = new Date(bill.shippingDate + "T00:00:00").toLocaleDateString("es-CR", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="min-h-screen w-full flex flex-col overflow-x-hidden">
      <Navbar />

      <main className="flex-1 w-full flex flex-col px-8 sm:px-12 md:px-16 lg:px-24 py-10 sm:py-12 md:py-16">

        <div className="w-full max-w-4xl mx-auto">

          <div className="flex justify-between items-center mb-6 print:hidden gap-4">
            <button onClick={() => navigate("/catalog")}
              className="text-gray-500 hover:text-blue-600 text-sm font-semibold tracking-wide transition-all duration-200 hover:scale-105 min-h-[44px] flex items-center gap-2">
              ← Volver al catálogo
            </button>
            <button onClick={handlePrint}
              className="px-4 sm:px-6 py-3 min-h-[44px] border border-gray-200 hover:border-blue-400 text-gray-500 hover:text-blue-600 text-sm font-bold rounded-xl hover:bg-blue-50 hover:scale-105 transition-all duration-200 whitespace-nowrap shadow-sm">
              🖨️ Imprimir factura
            </button>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg shadow-blue-500/8">

            {/* Invoice header */}
            <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-orange-700 px-6 sm:px-10 md:px-14 py-6 sm:py-8 flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-6 relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.06]"
                style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 30px, white 30px, white 31px), repeating-linear-gradient(90deg, transparent, transparent 30px, white 30px, white 31px)' }} />
              <div className="relative">
                <span className="text-white font-black tracking-[0.22em] text-base uppercase select-none block mb-1"
                  style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                  DRAJB Store
                </span>
                <p className="text-white/40 text-sm font-medium">Tienda de Camisetas</p>
              </div>
              <div className="relative text-left sm:text-right">
                <span className="inline-block border-2 border-white/30 text-white text-xs tracking-[0.25em] uppercase px-4 py-2 mb-3 rounded-lg font-black"
                  style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                  Factura
                </span>
                <p className="text-white/55 text-sm font-medium">N° {String(bill.id).padStart(6, "0")}</p>
                <p className="text-white/55 text-sm mt-1 font-medium">{issueDate}</p>
                <p className="text-white/55 text-sm mt-1 font-medium">Venta N° {String(sale.id).padStart(6, "0")}</p>
              </div>
            </div>

            <div className="px-6 sm:px-10 md:px-14 py-8 sm:py-10">

              {/* Issuer / Client */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 mb-8 sm:mb-10 pb-8 sm:pb-10 border-b border-gray-100">
                <div>
                  <p className="text-[10px] text-blue-600 tracking-[0.3em] uppercase font-black mb-4">Emisor</p>
                  <p className="text-gray-800 font-bold text-base">DRAJB Store S.A.</p>
                  <p className="text-gray-500 text-sm mt-2 font-medium">San José, Costa Rica</p>
                  <p className="text-gray-500 text-sm font-medium">info@drajbstore.cr</p>
                </div>
                <div>
                  <p className="text-[10px] text-orange-500 tracking-[0.3em] uppercase font-black mb-4">Cliente</p>
                  <p className="text-gray-800 font-bold text-base">{user.firstName} {user.lastName}</p>
                  <p className="text-gray-500 text-sm mt-2 font-medium">{user.email}</p>
                  <p className="text-gray-500 text-sm font-medium">Envío estimado: {shippingDate}</p>
                </div>
              </div>

              {/* Items table — desktop */}
              <div className="hidden sm:block mb-10">
                <div className="grid grid-cols-12 gap-4 pb-3 border-b border-gray-100 mb-2">
                  {[["Producto", "col-span-4 text-left"], ["Diseño", "col-span-2 text-left"], ["Talla", "col-span-1 text-center"], ["Cant.", "col-span-1 text-center"], ["Precio", "col-span-2 text-right"], ["Subtotal", "col-span-2 text-right"]].map(([h, cls]) => (
                    <span key={h} className={`text-xs text-gray-400 tracking-[0.15em] uppercase font-black ${cls}`}>{h}</span>
                  ))}
                </div>
                {items.map((item, i) => (
                  <div key={item.product.id} className={`grid grid-cols-12 gap-4 py-4 ${i < items.length - 1 ? "border-b border-gray-50" : ""}`}>
                    <span className="col-span-4 text-gray-800 text-sm font-semibold">{item.product.name}</span>
                    <span className="col-span-2 text-gray-500 text-sm font-medium">{item.product.design?.name ?? "—"}</span>
                    <span className="col-span-1 text-gray-500 text-sm font-medium text-center">{item.product.size?.label ?? "—"}</span>
                    <span className="col-span-1 text-gray-500 text-sm font-medium text-center">{item.quantity}</span>
                    <span className="col-span-2 text-gray-500 text-sm font-medium text-right">₡{Number(item.product.price).toLocaleString("es-CR")}</span>
                    <span className="col-span-2 text-gray-800 text-sm font-bold text-right">₡{(Number(item.product.price) * item.quantity).toLocaleString("es-CR")}</span>
                  </div>
                ))}
              </div>

              {/* Items — mobile */}
              <div className="sm:hidden flex flex-col gap-4 mb-10">
                {items.map((item) => (
                  <div key={item.product.id} className="bg-gray-50 border border-gray-100 rounded-xl p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-gray-800 font-bold text-base">{item.product.name}</h4>
                      <span className="text-orange-500 font-black text-base">
                        ₡{(Number(item.product.price) * item.quantity).toLocaleString("es-CR")}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm font-medium">{item.product.design?.name} · Talla {item.product.size?.label} · Cant. {item.quantity}</p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="flex justify-end mb-10">
                <div className="w-full sm:w-72 bg-gradient-to-br from-blue-50 to-orange-50 border border-blue-100 rounded-xl p-5">
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-500 text-sm font-medium">Subtotal</span>
                    <span className="text-gray-700 text-sm font-semibold">₡{Number(bill.totalAmount).toLocaleString("es-CR")}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-500 text-sm font-medium">Envío</span>
                    <span className="text-emerald-600 text-sm font-bold">Gratis 🚚</span>
                  </div>
                  <div className="flex justify-between pt-4 mt-1">
                    <span className="text-gray-800 font-black text-base"
                      style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}>
                      Total
                    </span>
                    <span className="font-black text-2xl text-orange-500"
                      style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.04em' }}>
                      ₡{Number(bill.totalAmount).toLocaleString("es-CR")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer row */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-7 border-t border-gray-100">
                <p className="text-gray-400 text-sm italic font-medium">{bill.notes}</p>
                <span className="border border-emerald-200 bg-emerald-50 text-emerald-700 text-xs tracking-[0.2em] uppercase px-4 py-2 rounded-lg flex-shrink-0 font-black">
                  ✓ Completada
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
