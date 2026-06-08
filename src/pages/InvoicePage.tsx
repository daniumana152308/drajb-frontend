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
      <div className="min-h-screen w-full bg-[#f7f7f5] flex flex-col overflow-x-hidden">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-5">
          <p className="text-gray-400 text-base">No hay factura para mostrar.</p>
          <button onClick={() => navigate("/catalog")}
            className="px-8 py-4 bg-[#1e3a5f] text-white text-sm rounded-md hover:bg-[#16304f] hover:scale-105 transition-all duration-200">
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
    <div className="min-h-screen w-full bg-[#f7f7f5] flex flex-col overflow-x-hidden">
      <Navbar />

      <main className="flex-1 w-full flex flex-col px-8 md:px-16 lg:px-24 py-12 md:py-16">

        <div className="w-full max-w-4xl mx-auto">

          <div className="flex justify-between items-center mb-6 print:hidden">
            <button onClick={() => navigate("/catalog")}
              className="text-gray-400 hover:text-gray-700 text-sm tracking-wide transition-all duration-200 hover:scale-105">
              ← Volver al catálogo
            </button>
            <button onClick={handlePrint}
              className="px-6 py-3 border border-gray-200 text-gray-500 text-sm rounded-md hover:border-[#1e3a5f] hover:text-[#1e3a5f] hover:scale-105 transition-all duration-200">
              Imprimir factura
            </button>
          </div>

          <div className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm">

            <div className="bg-[#1e3a5f] px-10 md:px-14 py-8 flex justify-between items-start">
              <div>
                <span className="text-white font-semibold tracking-[0.15em] text-base uppercase select-none"
                  style={{ fontFamily: 'Playfair Display, serif' }}>
                  DRAJB Store
                </span>
                <p className="text-white/30 text-sm mt-1.5">Tienda de Camisetas</p>
              </div>
              <div className="text-right">
                <span className="inline-block border border-white/30 text-white text-xs tracking-[0.2em] uppercase px-4 py-2 mb-3">
                  Factura
                </span>
                <p className="text-white/50 text-sm">N° {String(bill.id).padStart(6, "0")}</p>
                <p className="text-white/50 text-sm mt-1">{issueDate}</p>
                <p className="text-white/50 text-sm mt-1">Venta N° {String(sale.id).padStart(6, "0")}</p>
              </div>
            </div>

            <div className="px-10 md:px-14 py-10">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-10 pb-10 border-b border-gray-100">
                <div>
                  <p className="text-[10px] text-[#1e3a5f] tracking-[0.25em] uppercase font-medium mb-4">Emisor</p>
                  <p className="text-gray-700 font-medium text-base" style={{ fontFamily: 'Playfair Display, serif' }}>DRAJB Store S.A.</p>
                  <p className="text-gray-400 text-sm mt-2">San José, Costa Rica</p>
                  <p className="text-gray-400 text-sm">info@drajbstore.cr</p>
                </div>
                <div>
                  <p className="text-[10px] text-[#1e3a5f] tracking-[0.25em] uppercase font-medium mb-4">Cliente</p>
                  <p className="text-gray-700 font-medium text-base" style={{ fontFamily: 'Playfair Display, serif' }}>{user.firstName} {user.lastName}</p>
                  <p className="text-gray-400 text-sm mt-2">{user.email}</p>
                  <p className="text-gray-400 text-sm">Envío estimado: {shippingDate}</p>
                </div>
              </div>

              <div className="hidden sm:block mb-10">
                <div className="grid grid-cols-12 gap-4 pb-3 border-b border-gray-100 mb-2">
                  {[["Producto", "col-span-4 text-left"], ["Diseño", "col-span-2 text-left"], ["Talla", "col-span-1 text-center"], ["Cant.", "col-span-1 text-center"], ["Precio", "col-span-2 text-right"], ["Subtotal", "col-span-2 text-right"]].map(([h, cls]) => (
                    <span key={h} className={`text-xs text-gray-400 tracking-[0.15em] uppercase font-medium ${cls}`}>{h}</span>
                  ))}
                </div>
                {items.map((item, i) => (
                  <div key={item.product.id} className={`grid grid-cols-12 gap-4 py-4 ${i < items.length - 1 ? "border-b border-gray-50" : ""}`}>
                    <span className="col-span-4 text-gray-700 text-sm" style={{ fontFamily: 'Playfair Display, serif' }}>{item.product.name}</span>
                    <span className="col-span-2 text-gray-400 text-sm">{item.product.design?.name ?? "—"}</span>
                    <span className="col-span-1 text-gray-400 text-sm text-center">{item.product.size?.label ?? "—"}</span>
                    <span className="col-span-1 text-gray-400 text-sm text-center">{item.quantity}</span>
                    <span className="col-span-2 text-gray-400 text-sm text-right">₡{Number(item.product.price).toLocaleString("es-CR")}</span>
                    <span className="col-span-2 text-gray-700 text-sm text-right font-medium">₡{(Number(item.product.price) * item.quantity).toLocaleString("es-CR")}</span>
                  </div>
                ))}
              </div>

              <div className="sm:hidden flex flex-col gap-4 mb-10">
                {items.map((item) => (
                  <div key={item.product.id} className="bg-gray-50 rounded-md p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-gray-700 font-medium text-base" style={{ fontFamily: 'Playfair Display, serif' }}>{item.product.name}</h4>
                      <span className="text-gray-600 font-medium text-base">₡{(Number(item.product.price) * item.quantity).toLocaleString("es-CR")}</span>
                    </div>
                    <p className="text-gray-400 text-sm">{item.product.design?.name} · Talla {item.product.size?.label} · Cant. {item.quantity}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-end mb-10">
                <div className="w-full sm:w-72">
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-400 text-sm">Subtotal</span>
                    <span className="text-gray-500 text-sm">₡{Number(bill.totalAmount).toLocaleString("es-CR")}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-400 text-sm">Envío</span>
                    <span className="text-green-600 text-sm font-medium">Gratis</span>
                  </div>
                  <div className="flex justify-between pt-5 mt-1">
                    <span className="text-gray-700 font-semibold text-base">Total</span>
                    <span className="text-[#1e3a5f] font-semibold text-2xl" style={{ fontFamily: 'Playfair Display, serif' }}>
                      ₡{Number(bill.totalAmount).toLocaleString("es-CR")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-7 border-t border-gray-100">
                <p className="text-gray-400 text-sm italic">{bill.notes}</p>
                <span className="border border-green-200 text-green-600 text-xs tracking-[0.2em] uppercase px-4 py-2 rounded-sm">
                  Completada
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
